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
  Filter
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function PaymentsTab() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [eventFilter, setEventFilter] = useState('all');
  const [eventsList, setEventsList] = useState<string[]>([]);
  const [selectedReg, setSelectedReg] = useState<any | null>(null);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "event-registrations"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
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

  return (
    <div className={`${interTight.className} p-6 max-w-[1200px] mx-auto space-y-6`}>
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

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
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
              {filteredRegs.map((reg) => (
                <tr key={reg.id} className="hover:bg-admin-bg/50 transition-colors">
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
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedReg(reg)}
                      className="p-2 text-admin-text-muted hover:text-white bg-admin-bg hover:bg-admin-border rounded-lg transition-colors inline-flex items-center"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
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
