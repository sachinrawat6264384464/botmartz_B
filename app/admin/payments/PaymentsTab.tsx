"use client";

import { useState, useEffect } from 'react';
import { Inter_Tight } from 'next/font/google';
import { 
  Search, 
  Eye, 
  X, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Filter,
  Trash2,
  Download,
  FileSpreadsheet,
  Printer
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function PaymentsTab() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [eventFilter, setEventFilter] = useState('all');
  const [eventsList, setEventsList] = useState<string[]>([]);
  const [selectedReg, setSelectedReg] = useState<any | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleting, setDeleting] = useState(false);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "event-registrations"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      
      setRegistrations(data);

      // Extract unique event titles for the dropdown filter
      const uniqueEvents = Array.from(new Set(data.map((r: any) => r.eventTitle || 'Unknown Event'))).filter(Boolean);
      setEventsList(uniqueEvents);
    } catch (e) {
      console.error("Error fetching event registrations:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Filtering Logic
  const filteredRegs = registrations.filter((reg) => {
    const matchesSearch = 
      reg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.utr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.checkInCode?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || reg.paymentStatus === statusFilter;
    const matchesEvent = eventFilter === 'all' || reg.eventTitle === eventFilter;

    return matchesSearch && matchesStatus && matchesEvent;
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  // Selection handlers
  const isAllSelected = filteredRegs.length > 0 && filteredRegs.every(r => selectedIds.includes(r.id));
  
  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredRegs.map(r => r.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  // Delete handler
  const handleDelete = async (idsToDelete: string[]) => {
    if (idsToDelete.length === 0) return;
    const confirmMessage = idsToDelete.length === 1 
      ? "Are you sure you want to delete this payment record?" 
      : `Are you sure you want to delete ${idsToDelete.length} selected payment records?`;
      
    if (!confirm(confirmMessage)) return;

    setDeleting(true);
    try {
      for (const id of idsToDelete) {
        await deleteDoc(doc(db, "event-registrations", id));
      }
      setRegistrations(prev => prev.filter(r => !idsToDelete.includes(r.id)));
      setSelectedIds(prev => prev.filter(id => !idsToDelete.includes(id)));
      if (selectedReg && idsToDelete.includes(selectedReg.id)) {
        setSelectedReg(null);
      }
    } catch (e: any) {
      console.error("Error deleting registration(s):", e);
      if (e?.code === 'permission-denied' || e?.message?.includes('permission')) {
        alert("Permission Denied: Your account does not have Super Admin permissions in Firestore security rules to delete payment records. Run 'node scripts/make-superadmin.js <your-email>' to grant super admin access.");
      } else {
        alert("Failed to delete selected payment registration(s).");
      }
    } finally {
      setDeleting(false);
    }
  };

  // Export CSV
  const exportToCSV = () => {
    const targetData = selectedIds.length > 0 
      ? filteredRegs.filter(r => selectedIds.includes(r.id))
      : filteredRegs;

    if (targetData.length === 0) {
      alert("No payment records available to export.");
      return;
    }

    const headers = ["Name", "Email", "Phone", "Event Title", "Check-in Code", "UTR / Reference", "Amount Paid (INR)", "Payment Status", "Registered Date"];
    
    const rows = targetData.map(r => [
      `"${(r.name || '').replace(/"/g, '""')}"`,
      `"${(r.email || '').replace(/"/g, '""')}"`,
      `"${(r.phone || '').replace(/"/g, '""')}"`,
      `"${(r.eventTitle || '').replace(/"/g, '""')}"`,
      `"${(r.checkInCode || '').replace(/"/g, '""')}"`,
      `"${(r.utr || 'Auto-Captured').replace(/"/g, '""')}"`,
      r.amountPaid || 0,
      `"${(r.paymentStatus || 'pending').replace(/"/g, '""')}"`,
      `"${formatDate(r.createdAt)}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `event_payments_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export / Print PDF Ledger
  const exportToPDF = () => {
    const targetData = selectedIds.length > 0 
      ? filteredRegs.filter(r => selectedIds.includes(r.id))
      : filteredRegs;

    if (targetData.length === 0) {
      alert("No payment records available to print PDF.");
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow popups to export PDF.");
      return;
    }

    const totalPaid = targetData.filter(r => r.paymentStatus === 'paid').reduce((acc, curr) => acc + (curr.amountPaid || 0), 0);

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Event Payments & Registrations Ledger</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 30px; color: #1e293b; }
            h1 { margin-bottom: 5px; color: #0f172a; font-size: 24px; }
            p.sub { color: #64748b; font-size: 13px; margin-top: 0; margin-bottom: 20px; }
            .stats { display: flex; gap: 20px; margin-bottom: 25px; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; }
            .stat-box { background: #f8fafc; border: 1px solid #cbd5e1; padding: 12px 18px; rounded: 8px; font-size: 14px; }
            .stat-box strong { font-size: 18px; display: block; color: #0284c7; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
            th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
            th { background-color: #f1f5f9; color: #334155; text-transform: uppercase; font-size: 10px; }
            tr:nth-child(even) { background-color: #f8fafc; }
            .status-paid { color: #16a34a; font-weight: bold; }
            .status-pending { color: #d97706; font-weight: bold; }
            .status-failed { color: #dc2626; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>Botmartz AI Solutions — Event Registrations & Payments Ledger</h1>
          <p class="sub">Generated on ${new Date().toLocaleString()} | Total Records: ${targetData.length}</p>
          
          <div class="stats">
            <div class="stat-box">Total Records: <strong>${targetData.length}</strong></div>
            <div class="stat-box">Total Earnings: <strong>₹${totalPaid.toLocaleString()}.00 INR</strong></div>
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Registrant</th>
                <th>Email / Phone</th>
                <th>Event</th>
                <th>Check-in Code</th>
                <th>UTR Reference</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${targetData.map((r, idx) => `
                <tr>
                  <td>${idx + 1}</td>
                  <td><strong>${r.name || 'N/A'}</strong></td>
                  <td>${r.email || ''}<br/>${r.phone || ''}</td>
                  <td>${r.eventTitle || 'N/A'}</td>
                  <td style="font-family: monospace;">${r.checkInCode || ''}</td>
                  <td style="font-family: monospace;">${r.utr || 'Auto-Captured'}</td>
                  <td><strong>₹${r.amountPaid || 0}</strong></td>
                  <td class="status-${r.paymentStatus || 'pending'}">${(r.paymentStatus || 'pending').toUpperCase()}</td>
                  <td>${formatDate(r.createdAt)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <div className={`${interTight.className} p-6 w-full space-y-6`}>
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-admin-text">Event Payments & Registrations</h1>
        <p className="text-sm text-admin-text-muted mt-1">Track financial ledger, UPI UTR numbers, payment status, and registrant details.</p>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-admin-card border border-admin-border p-6 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-semibold text-admin-text-muted uppercase tracking-wider">Total Earnings</span>
            <h3 className="text-2xl font-bold text-admin-text mt-1">
              ₹{registrations.filter(r => r.paymentStatus === 'paid').reduce((acc, curr) => acc + (curr.amountPaid || 0), 0).toLocaleString()}.00
            </h3>
          </div>
          <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
            <CreditCard size={24} />
          </div>
        </div>

        <div className="bg-admin-card border border-admin-border p-6 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-semibold text-admin-text-muted uppercase tracking-wider">Paid Registrations</span>
            <h3 className="text-2xl font-bold text-admin-text mt-1">
              {registrations.filter(r => r.paymentStatus === 'paid').length}
            </h3>
          </div>
          <div className="p-3 bg-admin-accent/10 rounded-lg text-admin-accent">
            <CheckCircle size={24} />
          </div>
        </div>

        <div className="bg-admin-card border border-admin-border p-6 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-semibold text-admin-text-muted uppercase tracking-wider">Pending/Failed</span>
            <h3 className="text-2xl font-bold text-admin-text mt-1">
              {registrations.filter(r => r.paymentStatus !== 'paid').length}
            </h3>
          </div>
          <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-500">
            <Clock size={24} />
          </div>
        </div>
      </div>

      {/* Filters & Actions Bar */}
      <div className="bg-admin-card border border-admin-border p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-admin-text-muted w-4 h-4" />
          <input
            type="text"
            placeholder="Search name, email, UTR..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-admin-bg border border-admin-border rounded-lg pl-10 pr-4 py-2 text-sm text-admin-text focus:outline-none focus:border-admin-accent"
          />
        </div>

        {/* Action Buttons + Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Bulk Delete Button */}
          {selectedIds.length > 0 && (
            <button
              onClick={() => handleDelete(selectedIds)}
              disabled={deleting}
              className="flex items-center gap-1.5 px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30 rounded-lg text-sm font-semibold transition-all"
            >
              <Trash2 size={15} />
              <span>Delete Selected ({selectedIds.length})</span>
            </button>
          )}

          {/* CSV Export */}
          <button
            onClick={exportToCSV}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-sm font-medium transition-all"
            title="Export to CSV"
          >
            <FileSpreadsheet size={15} />
            <span>CSV</span>
          </button>

          {/* PDF Export */}
          <button
            onClick={exportToPDF}
            className="flex items-center gap-1.5 px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg text-sm font-medium transition-all"
            title="Export PDF / Print Ledger"
          >
            <Printer size={15} />
            <span>PDF Ledger</span>
          </button>

          <div className="flex items-center gap-2 bg-admin-bg border border-admin-border px-3 py-1.5 rounded-lg text-sm text-admin-text-muted">
            <Filter size={14} /> Filters
          </div>

          <select
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
            className="bg-admin-bg border border-admin-border text-sm text-admin-text rounded-lg px-3 py-2 focus:outline-none focus:border-admin-accent"
          >
            <option value="all">All Events</option>
            {eventsList.map((evtName) => (
              <option key={evtName} value={evtName}>{evtName}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-admin-bg border border-admin-border text-sm text-admin-text rounded-lg px-3 py-2 focus:outline-none focus:border-admin-accent"
          >
            <option value="all">All Payments</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Main Datatable */}
      <div className="bg-admin-card border border-admin-border rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-admin-text-muted">Loading transactions...</div>
        ) : filteredRegs.length === 0 ? (
          <div className="p-12 text-center text-admin-text-muted">
            <CreditCard className="mx-auto w-12 h-12 mb-4 opacity-20" />
            <p>No registrations or payments found matching your criteria.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-admin-bg border-b border-admin-border text-xs font-semibold text-admin-text-muted uppercase tracking-wider">
              <tr>
                <th className="px-4 py-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-admin-border bg-admin-bg text-admin-accent focus:ring-0 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-4">Registrant</th>
                <th className="px-6 py-4">Event Details</th>
                <th className="px-6 py-4">UTR Number</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border">
              {filteredRegs.map((reg) => {
                const isSelected = selectedIds.includes(reg.id);
                return (
                  <tr key={reg.id} className={`hover:bg-admin-bg/50 transition-colors ${isSelected ? 'bg-admin-accent-muted/20' : ''}`}>
                    <td className="px-4 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectOne(reg.id)}
                        className="w-4 h-4 rounded border-admin-border bg-admin-bg text-admin-accent focus:ring-0 cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-admin-text">{reg.name}</div>
                      <div className="text-xs text-admin-text-muted">{reg.email}</div>
                      {reg.phone && <div className="text-[11px] text-admin-text-muted font-mono">{reg.phone}</div>}
                    </td>
                    <td className="px-6 py-4 text-sm text-admin-text">
                      <div className="font-medium text-admin-text">{reg.eventTitle}</div>
                      <div className="text-[11px] text-admin-text-muted font-mono uppercase tracking-wider">{reg.checkInCode}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-admin-text">
                      {reg.utr || 'Auto-Captured'}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-admin-text">
                      ₹{(reg.amountPaid || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded inline-flex items-center gap-1.5 ${
                        reg.paymentStatus === 'paid' 
                          ? 'bg-green-500/20 text-green-500' 
                          : reg.paymentStatus === 'pending' 
                          ? 'bg-yellow-500/20 text-yellow-500' 
                          : 'bg-red-500/20 text-red-500'
                      }`}>
                        {reg.paymentStatus === 'paid' && <CheckCircle size={10} />}
                        {reg.paymentStatus === 'pending' && <Clock size={10} />}
                        {reg.paymentStatus === 'failed' && <AlertCircle size={10} />}
                        {reg.paymentStatus || 'pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-admin-text-muted">
                      {formatDate(reg.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => setSelectedReg(reg)}
                        className="p-2 text-admin-text-muted hover:text-white bg-admin-bg hover:bg-admin-border rounded-lg transition-colors inline-flex items-center"
                        title="View details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete([reg.id])}
                        disabled={deleting}
                        className="p-2 text-admin-text-muted hover:text-rose-400 bg-admin-bg hover:bg-rose-500/10 rounded-lg transition-colors inline-flex items-center"
                        title="Delete record"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Slide-over Detail Panel Modal */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setSelectedReg(null)} />

          {/* Slide-over Panel Content */}
          <div className="relative w-screen max-w-lg bg-admin-card border-l border-admin-border flex flex-col h-full shadow-2xl z-10 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="px-6 py-5 bg-admin-bg border-b border-admin-border flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-admin-text">Registration Details</h2>
                <p className="text-xs text-admin-text-muted font-mono uppercase mt-0.5">{selectedReg.checkInCode}</p>
              </div>
              <button 
                onClick={() => setSelectedReg(null)}
                className="p-2 hover:bg-admin-border text-admin-text-muted hover:text-white rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable details */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Event Block */}
              <div className="bg-admin-bg/50 border border-admin-border p-4 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-admin-accent uppercase tracking-widest">Target Event</span>
                <h4 className="text-base font-bold text-admin-text">{selectedReg.eventTitle}</h4>
                <p className="text-xs text-admin-text-muted font-mono">{selectedReg.eventSlug}</p>
              </div>

              {/* User Block */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-admin-text border-b border-admin-border pb-1.5">User Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-xs text-admin-text-muted block">Full Name</span>
                    <span className="text-admin-text font-medium">{selectedReg.name}</span>
                  </div>
                  <div>
                    <span className="text-xs text-admin-text-muted block">Email Address</span>
                    <span className="text-admin-text font-medium">{selectedReg.email}</span>
                  </div>
                  <div>
                    <span className="text-xs text-admin-text-muted block">Phone Number</span>
                    <span className="text-admin-text font-medium font-mono">{selectedReg.phone || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-admin-text-muted block">Date Registered</span>
                    <span className="text-admin-text font-medium">{formatDate(selectedReg.createdAt)}</span>
                  </div>
                  <div>
                    <span className="text-xs text-admin-text-muted block">Company / College</span>
                    <span className="text-admin-text font-medium">{selectedReg.company || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-admin-text-muted block">Role / Title</span>
                    <span className="text-admin-text font-medium">{selectedReg.role || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-admin-text border-b border-admin-border pb-1.5">Payment details</h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-admin-border/50">
                      <td className="py-2.5 text-admin-text-muted">Payment status</td>
                      <td className="py-2.5 text-right font-medium">
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                          selectedReg.paymentStatus === 'paid' 
                            ? 'bg-green-500/20 text-green-500' 
                            : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {selectedReg.paymentStatus}
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-admin-border/50">
                      <td className="py-2.5 text-admin-text-muted">Amount Paid</td>
                      <td className="py-2.5 text-right font-bold text-admin-text">₹{selectedReg.amountPaid}.00 INR</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 text-admin-text-muted">Bank UTR Reference</td>
                      <td className="py-2.5 text-right font-mono text-admin-text font-semibold">{selectedReg.utr || 'Auto-Captured'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Custom API / Questions Information */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-admin-text border-b border-admin-border pb-1.5">Step 1 Custom Answers / API Info</h3>
                <div className="bg-admin-bg p-4 rounded-xl border border-admin-border">
                  {selectedReg.apiInfo ? (
                    <pre className="text-xs font-mono text-admin-text whitespace-pre-wrap leading-relaxed overflow-x-auto">
                      {selectedReg.apiInfo}
                    </pre>
                  ) : (
                    <span className="text-xs text-admin-text-muted italic">No custom API details provided by registrant.</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
