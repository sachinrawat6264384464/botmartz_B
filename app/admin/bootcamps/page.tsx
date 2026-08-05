"use client";

import { useState, useEffect } from "react";
import { Users, FileText, Download, TrendingUp, Mail, Award, CreditCard, Loader2, CheckCircle, XCircle, Plus, Edit2, Trash2, Calendar, Clock, Search, Filter } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: TrendingUp },
  { id: "manage_events", label: "Manage Bootcamps", icon: Calendar },
  { id: "registrations", label: "Registrations", icon: Users },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "emails", label: "Email Logs", icon: Mail },
];

export default function BootcampsAdmin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [bootcamps, setBootcamps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  
  // Filter & Search states
  const [regFilter, setRegFilter] = useState<"all" | "attended" | "pending">("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let bcDocs: any[] = [];
    let evDocs: any[] = [];

    const mergeAll = () => {
      const combined = [...bcDocs, ...evDocs];
      // Deduplicate by checkInCode or id
      const seen = new Set();
      const unique = combined.filter(item => {
        const key = item.checkInCode || item.id;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      // Sort by createdAt descending
      unique.sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return timeB - timeA;
      });
      setRegistrations(unique);
    };

    const qReg = query(collection(db, 'bootcamp_registrations'), orderBy('createdAt', 'desc'));
    const unsubscribeReg = onSnapshot(qReg, (snapshot) => {
      bcDocs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      mergeAll();
    });

    const qEventReg = query(collection(db, 'event-registrations'), orderBy('createdAt', 'desc'));
    const unsubscribeEventReg = onSnapshot(qEventReg, (snapshot) => {
      evDocs = snapshot.docs.map(doc => {
        const data = doc.data();
        const isAttended = Boolean(data.attended ?? data.attendance ?? false);
        return {
          id: doc.id,
          name: data.name || "Anonymous",
          email: data.email || "",
          phone: data.phone || "",
          plan: data.eventSlug || data.eventTitle || data.plan || "Event Registration",
          amount: Number(data.amountPaid || data.amount || 0),
          status: data.paymentStatus || data.status || "paid",
          attendance: isAttended,
          attended: isAttended,
          checkInCode: data.checkInCode || "",
          createdAt: data.createdAt,
          ...data
        };
      });
      mergeAll();
    });

    const qBootcamps = query(collection(db, 'bootcamps'), orderBy('createdAt', 'desc'));
    const unsubscribeBootcamps = onSnapshot(qBootcamps, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBootcamps(docs);
      setLoading(false);
    });

    return () => {
      unsubscribeReg();
      unsubscribeEventReg();
      unsubscribeBootcamps();
    };
  }, []);

  // Dynamic calculations across all live registrations
  const totalRegistrations = registrations.length;
  const totalRevenue = registrations.reduce((acc, curr) => acc + (Number(curr.amount || curr.amountPaid || 0)), 0);
  const aiPasses = registrations.filter(r => (r.plan && String(r.plan).toLowerCase().includes('bundle')) || r.plan === 'ai-engineering-pass').length;
  const attendedCount = registrations.filter(r => Boolean(r.attendance || r.attended)).length;
  const pendingCount = Math.max(0, totalRegistrations - attendedCount);
  const turnoutPercent = totalRegistrations > 0 ? Math.round((attendedCount / totalRegistrations) * 100) : 0;

  const exportCSV = () => {
    if (registrations.length === 0) {
      alert("No registrations available to export.");
      return;
    }
    const headers = ["Name", "Email", "Phone", "Plan", "Amount", "Status", "Attended", "Check-in Code", "Date"];
    const rows = registrations.map(r => [
      `"${r.name || ''}"`,
      `"${r.email || ''}"`,
      `"${r.phone || ''}"`,
      `"${r.plan || ''}"`,
      r.amount || 0,
      `"${r.status || 'paid'}"`,
      Boolean(r.attendance || r.attended) ? "Yes" : "No",
      `"${r.checkInCode || ''}"`,
      `"${r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ''}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `registrations-${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleAttendance = async (id: string, currentStatus: boolean) => {
    const nextStatus = !currentStatus;
    
    // Optimistic UI update
    setRegistrations(prev => prev.map(r => {
      if (r.id === id) {
        return { ...r, attendance: nextStatus, attended: nextStatus };
      }
      return r;
    }));

    setActionLoading(`att-${id}`);
    try {
      const res = await fetch('/api/admin/toggle-attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationId: id, attendance: nextStatus })
      });
      if (!res.ok) {
        // Revert on error
        setRegistrations(prev => prev.map(r => r.id === id ? { ...r, attendance: currentStatus, attended: currentStatus } : r));
      }
    } catch (e) {
      setRegistrations(prev => prev.map(r => r.id === id ? { ...r, attendance: currentStatus, attended: currentStatus } : r));
    } finally {
      setActionLoading(null);
    }
  };

  const sendCertificate = async (reg: any) => {
    if (!confirm(`Send certificate to ${reg.name}?`)) return;
    setActionLoading(`cert-${reg.id}`);
    try {
      const res = await fetch('/api/admin/issue-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: reg.name,
          email: reg.email,
          bootcampName: reg.plan === 'bundle' ? 'AI Engineering Pass' : 'Bootcamp 01: Build Your First AI Full-Stack Application',
          issueDate: new Date().toLocaleDateString()
        })
      });
      if (res.ok) alert("Certificate Sent!");
      else alert("Error sending certificate");
    } finally {
      setActionLoading(null);
    }
  };

  const sendFollowUp = async (reg: any) => {
    if (!confirm(`Send missed event follow-up to ${reg.name}?`)) return;
    setActionLoading(`follow-${reg.id}`);
    try {
      const res = await fetch('/api/admin/send-followup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: reg.name,
          email: reg.email,
          bootcampName: reg.plan === 'bundle' ? 'AI Engineering Pass (Session 1)' : 'Bootcamp 01: Build Your First AI Full-Stack Application'
        })
      });
      if (res.ok) alert("Follow-up Sent!");
      else alert("Error sending follow-up");
    } finally {
      setActionLoading(null);
    }
  };

  const deleteBootcamp = async (id: string) => {
    if (!confirm("Are you sure you want to delete this bootcamp?")) return;
    try {
      await deleteDoc(doc(db, "bootcamps", id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete bootcamp.");
    }
  };

  // Filtered registrations for table
  const filteredRegistrations = registrations.filter(reg => {
    const isAttended = Boolean(reg.attendance || reg.attended);
    if (regFilter === "attended" && !isAttended) return false;
    if (regFilter === "pending" && isAttended) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = reg.name && reg.name.toLowerCase().includes(q);
      const emailMatch = reg.email && reg.email.toLowerCase().includes(q);
      const codeMatch = reg.checkInCode && reg.checkInCode.toLowerCase().includes(q);
      return nameMatch || emailMatch || codeMatch;
    }
    return true;
  });

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
      {/* Top Header Responsiveness Fix */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C2C] dark:text-white tracking-tight">
            Bootcamp Administration
          </h1>
          <p className="text-sm text-[#64748B] dark:text-slate-400 mt-1">
            Manage AI Frontier 2026 Bootcamps and live registrations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={exportCSV}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-[#0E172A] border border-[#E2E8F0] dark:border-white/10 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#334155] dark:text-slate-200 hover:bg-[#F8FAFC] dark:hover:bg-white/5 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-[#0066FF]" /> Export CSV
          </button>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="flex items-center gap-1 sm:gap-2 border-b border-[#E2E8F0] dark:border-white/10 mb-6 sm:mb-8 overflow-x-auto pb-1 scrollbar-none">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                isActive ? "border-[#0066FF] text-[#0066FF] dark:text-[#00B8F0] dark:border-[#00B8F0]" : "border-transparent text-[#64748B] dark:text-slate-400 hover:text-[#0B1C2C] dark:hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-[#0066FF]" /></div>
      ) : activeTab === "dashboard" ? (
        <div className="space-y-6">
          {/* Dynamic Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Card 1: Total Registered */}
            <div className="bg-white dark:bg-[#0E172A] p-5 sm:p-6 rounded-xl border border-[#E2E8F0] dark:border-white/10 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[#64748B] dark:text-slate-400 text-xs sm:text-sm font-medium">Total Registered</p>
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-[#0066FF]">
                  <Users size={18} />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C2C] dark:text-white">{totalRegistrations}</h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 mt-2 font-mono">Live Firestore Sync</p>
            </div>

            {/* Card 2: Revenue */}
            <div className="bg-white dark:bg-[#0E172A] p-5 sm:p-6 rounded-xl border border-[#E2E8F0] dark:border-white/10 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[#64748B] dark:text-slate-400 text-xs sm:text-sm font-medium">Total Revenue</p>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                  <CreditCard size={18} />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C2C] dark:text-white">₹{totalRevenue.toLocaleString('en-IN')}</h3>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">Captured via Razorpay / Direct</p>
            </div>

            {/* Card 3: Checked In (Attendees) */}
            <div className="bg-white dark:bg-[#0E172A] p-5 sm:p-6 rounded-xl border border-[#E2E8F0] dark:border-white/10 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[#64748B] dark:text-slate-400 text-xs sm:text-sm font-medium">Checked In (Attended)</p>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                  {turnoutPercent}% Turnout
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C2C] dark:text-white">{attendedCount}</h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 mt-2 font-mono">Scanner & Admin Validated</p>
            </div>

            {/* Card 4: Pending Entry */}
            <div className="bg-white dark:bg-[#0E172A] p-5 sm:p-6 rounded-xl border border-[#E2E8F0] dark:border-white/10 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[#64748B] dark:text-slate-400 text-xs sm:text-sm font-medium">Pending Entry</p>
                <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
                  <Clock size={18} />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C2C] dark:text-white">{pendingCount}</h3>
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 font-medium">Awaiting Check-in</p>
            </div>

          </div>

          {/* Quick Overview Table preview */}
          <div className="bg-white dark:bg-[#0E172A] rounded-xl border border-[#E2E8F0] dark:border-white/10 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#0B1C2C] dark:text-white">Recent Registrations</h3>
              <button onClick={() => setActiveTab("registrations")} className="text-xs font-semibold text-[#0066FF] hover:underline">View All →</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-[#F8FAFC] dark:bg-white/5 border-b border-[#E2E8F0] dark:border-white/10 text-xs font-semibold text-[#64748B] dark:text-slate-400 uppercase tracking-wider">
                    <th className="p-3">Attendee</th>
                    <th className="p-3">Plan</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Check-in Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] dark:divide-white/10">
                  {registrations.slice(0, 5).map(reg => {
                    const isAttended = Boolean(reg.attendance || reg.attended);
                    return (
                      <tr key={reg.id} className="hover:bg-[#F8FAFC] dark:hover:bg-white/5">
                        <td className="p-3">
                          <div className="font-semibold text-[#0B1C2C] dark:text-white text-sm">{reg.name}</div>
                          <div className="text-xs text-[#64748B] dark:text-slate-400 font-mono">{reg.email}</div>
                        </td>
                        <td className="p-3 text-xs">
                          <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-medium">
                            {reg.plan}
                          </span>
                        </td>
                        <td className="p-3 text-xs">
                          <span className="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 font-medium">
                            {reg.status}
                          </span>
                        </td>
                        <td className="p-3 text-xs">
                          <span className={`px-2 py-0.5 rounded-full font-semibold ${isAttended ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"}`}>
                            {isAttended ? "Checked In" : "Pending Entry"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {registrations.length === 0 && (
                    <tr><td colSpan={4} className="p-6 text-center text-xs text-[#64748B]">No registrations yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : activeTab === "manage_events" ? (
        <div className="space-y-6">
          <div className="flex justify-end mb-4">
            <Link 
              href="/admin/bootcamps/new"
              className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm"
            >
              <Plus size={16} /> Create Bootcamp
            </Link>
          </div>
          <div className="bg-white dark:bg-[#0E172A] rounded-xl border border-[#E2E8F0] dark:border-white/10 shadow-sm overflow-hidden">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-[#F8FAFC] dark:bg-white/5 border-b border-[#E2E8F0] dark:border-white/10 text-xs font-semibold text-[#64748B] dark:text-slate-400 uppercase tracking-wider">
                    <th className="p-4">Title</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] dark:divide-white/10">
                  {bootcamps.map((bc) => (
                    <tr key={bc.id} className="hover:bg-[#F8FAFC] dark:hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-[#0B1C2C] dark:text-white">{bc.title}</div>
                        <div className="text-xs text-[#64748B] dark:text-slate-400 font-mono">/{bc.slug}</div>
                      </td>
                      <td className="p-4 text-sm text-[#0B1C2C] dark:text-slate-200">{bc.date}</td>
                      <td className="p-4 text-sm font-semibold text-[#0B1C2C] dark:text-white">₹{bc.price}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                          {bc.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <Link href={`/admin/bootcamps/${bc.id}`} className="inline-flex p-2 text-[#64748B] hover:text-[#0066FF] hover:bg-blue-50 dark:hover:bg-white/10 rounded-lg transition-colors">
                          <Edit2 size={16} />
                        </Link>
                        <button onClick={() => deleteBootcamp(bc.id)} className="inline-flex p-2 text-[#64748B] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {bootcamps.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-[#64748B] dark:text-slate-400 text-sm">No bootcamps found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : activeTab === "registrations" ? (
        <div className="bg-white dark:bg-[#0E172A] rounded-xl border border-[#E2E8F0] dark:border-white/10 shadow-sm overflow-hidden space-y-4">
          
          {/* Table Header Controls: Search & Filter Tabs */}
          <div className="p-4 sm:p-6 border-b border-[#E2E8F0] dark:border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0B1C2C] dark:text-white">Registration & Attendance Ledger</h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">Total: {totalRegistrations} | Checked In: {attendedCount} | Pending: {pendingCount}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="text"
                  placeholder="Search name, email, code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F8FAFC] dark:bg-white/5 border border-[#CBD5E1] dark:border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-[#0B1C2C] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                />
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center bg-[#F8FAFC] dark:bg-white/5 p-1 rounded-xl border border-[#E2E8F0] dark:border-white/10 w-full sm:w-auto">
                <button
                  onClick={() => setRegFilter("all")}
                  className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${regFilter === "all" ? "bg-white dark:bg-white/15 text-[#0066FF] dark:text-white shadow-sm" : "text-[#64748B] dark:text-slate-400"}`}
                >
                  All ({totalRegistrations})
                </button>
                <button
                  onClick={() => setRegFilter("attended")}
                  className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${regFilter === "attended" ? "bg-emerald-500 text-white shadow-sm" : "text-[#64748B] dark:text-slate-400"}`}
                >
                  Attended ({attendedCount})
                </button>
                <button
                  onClick={() => setRegFilter("pending")}
                  className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${regFilter === "pending" ? "bg-amber-500 text-white shadow-sm" : "text-[#64748B] dark:text-slate-400"}`}
                >
                  Pending ({pendingCount})
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="bg-[#F8FAFC] dark:bg-white/5 border-b border-[#E2E8F0] dark:border-white/10 text-xs font-semibold text-[#64748B] dark:text-slate-400 uppercase tracking-wider">
                  <th className="p-4">Attendee</th>
                  <th className="p-4">Plan / Event</th>
                  <th className="p-4">Check-in Code</th>
                  <th className="p-4">Attendance</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] dark:divide-white/10">
                {filteredRegistrations.map((reg) => {
                  const isAttended = Boolean(reg.attendance || reg.attended);
                  return (
                    <tr key={reg.id} className="hover:bg-[#F8FAFC] dark:hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-[#0B1C2C] dark:text-white text-sm">{reg.name}</div>
                        <div className="text-xs text-[#64748B] dark:text-slate-400 font-mono">{reg.email}</div>
                        {reg.phone && <div className="text-[11px] text-[#64748B] dark:text-slate-400">{reg.phone}</div>}
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-950 dark:text-blue-300 text-blue-800">
                          {reg.plan}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-xs font-mono font-bold text-[#0066FF] dark:text-[#00B8F0] bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                          {reg.checkInCode || "N/A"}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleAttendance(reg.id, isAttended)}
                          disabled={actionLoading === `att-${reg.id}`}
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            isAttended ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-slate-300 hover:bg-gray-200"
                          }`}
                        >
                          {actionLoading === `att-${reg.id}` ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : isAttended ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-gray-400" />}
                          {isAttended ? "Attended (Checked In)" : "Mark Attended"}
                        </button>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {isAttended ? (
                          <button
                            onClick={() => sendCertificate(reg)}
                            disabled={actionLoading === `cert-${reg.id}`}
                            className="inline-flex items-center gap-1.5 bg-[#0066FF] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#0052CC] disabled:opacity-50"
                          >
                            {actionLoading === `cert-${reg.id}` ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Award className="w-3.5 h-3.5" />}
                            Certificate
                          </button>
                        ) : (
                          <button
                            onClick={() => sendFollowUp(reg)}
                            disabled={actionLoading === `follow-${reg.id}`}
                            className="inline-flex items-center gap-1.5 bg-amber-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-amber-600 disabled:opacity-50"
                          >
                            {actionLoading === `follow-${reg.id}` ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Mail className="w-3.5 h-3.5" />}
                            Follow-up
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {filteredRegistrations.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[#64748B] dark:text-slate-400 text-sm">
                      {searchQuery || regFilter !== "all" ? "No matching registrations found for your search/filter criteria." : "No registrations found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#0E172A] rounded-xl border border-[#E2E8F0] dark:border-white/10 shadow-sm p-8 sm:p-12 text-center">
          <FileText className="w-12 h-12 text-[#CBD5E1] dark:text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-[#0B1C2C] dark:text-white mb-2">{TABS.find(t => t.id === activeTab)?.label} Module</h3>
          <p className="text-[#64748B] dark:text-slate-400 max-w-md mx-auto text-sm">
            This module is connected to your Firebase backend. Detailed views for {activeTab} will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
