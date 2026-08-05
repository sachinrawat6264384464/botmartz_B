"use client";

import { useState, useEffect } from "react";
import { Users, FileText, Download, TrendingUp, Settings, Mail, Award, CreditCard, Loader2, CheckCircle, XCircle, Plus, Edit2, Trash2, Calendar } from "lucide-react";
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
        return {
          id: doc.id,
          name: data.name || "Anonymous",
          email: data.email || "",
          phone: data.phone || "",
          plan: data.eventSlug || data.eventTitle || data.plan || "Event Registration",
          amount: data.amountPaid || data.amount || 0,
          status: data.paymentStatus || data.status || "paid",
          attendance: data.attended ?? data.attendance ?? false,
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

  const totalRevenue = registrations.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const aiPasses = registrations.filter(r => r.plan === 'bundle').length;
  const attendedCount = registrations.filter(r => r.attendance).length;

  const toggleAttendance = async (id: string, currentStatus: boolean) => {
    setActionLoading(`att-${id}`);
    try {
      await fetch('/api/admin/toggle-attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationId: id, attendance: !currentStatus })
      });
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

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0B1C2C]">Bootcamp Administration</h1>
          <p className="text-[#64748B] mt-1">Manage AI Frontier 2026 Bootcamps and registrations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-[#E2E8F0] px-4 py-2 rounded-lg text-sm font-semibold text-[#334155] hover:bg-[#F8FAFC]">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-[#E2E8F0] mb-8 overflow-x-auto">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                isActive ? "border-[#0066FF] text-[#0066FF]" : "border-transparent text-[#64748B] hover:text-[#0B1C2C]"
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
              <p className="text-[#64748B] text-sm font-medium mb-2">Total Registrations</p>
              <h3 className="text-3xl font-bold text-[#0B1C2C] mb-2">{registrations.length}</h3>
            </div>
            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
              <p className="text-[#64748B] text-sm font-medium mb-2">Revenue</p>
              <h3 className="text-3xl font-bold text-[#0B1C2C] mb-2">₹{totalRevenue.toLocaleString('en-IN')}</h3>
            </div>
            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
              <p className="text-[#64748B] text-sm font-medium mb-2">AI Eng Passes</p>
              <h3 className="text-3xl font-bold text-[#0B1C2C] mb-2">{aiPasses}</h3>
            </div>
            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
              <p className="text-[#64748B] text-sm font-medium mb-2">Attendees (Checked In)</p>
              <h3 className="text-3xl font-bold text-[#0B1C2C] mb-2">{attendedCount}</h3>
            </div>
          </div>
        </div>
      ) : activeTab === "manage_events" ? (
        <div className="space-y-6">
          <div className="flex justify-end mb-4">
            <Link 
              href="/admin/bootcamps/new"
              className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <Plus size={16} /> Create Bootcamp
            </Link>
          </div>
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  <th className="p-4">Title</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {bootcamps.map((bc) => (
                  <tr key={bc.id} className="hover:bg-[#F8FAFC]">
                    <td className="p-4">
                      <div className="font-semibold text-[#0B1C2C]">{bc.title}</div>
                      <div className="text-sm text-[#64748B]">/{bc.slug}</div>
                    </td>
                    <td className="p-4 text-sm text-[#0B1C2C]">{bc.date}</td>
                    <td className="p-4 text-sm font-medium text-[#0B1C2C]">₹{bc.price}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {bc.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link href={`/admin/bootcamps/${bc.id}`} className="inline-flex p-2 text-[#64748B] hover:text-[#0066FF] hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </Link>
                      <button onClick={() => deleteBootcamp(bc.id)} className="inline-flex p-2 text-[#64748B] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {bootcamps.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[#64748B]">No bootcamps found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === "registrations" ? (
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#E2E8F0]">
            <h3 className="text-lg font-bold text-[#0B1C2C]">Registration & Attendance Table</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  <th className="p-4">Attendee</th>
                  <th className="p-4">Plan</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Attendance</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-[#F8FAFC]">
                    <td className="p-4">
                      <div className="font-semibold text-[#0B1C2C]">{reg.name}</div>
                      <div className="text-sm text-[#64748B]">{reg.email}</div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {reg.plan}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {reg.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleAttendance(reg.id, reg.attendance)}
                        disabled={actionLoading === `att-${reg.id}`}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                          reg.attendance ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {actionLoading === `att-${reg.id}` ? <Loader2 className="w-4 h-4 animate-spin" /> : reg.attendance ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        {reg.attendance ? "Attended" : "Mark Attended"}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {reg.attendance ? (
                        <button
                          onClick={() => sendCertificate(reg)}
                          disabled={actionLoading === `cert-${reg.id}`}
                          className="inline-flex items-center gap-2 bg-[#0066FF] text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-[#0052CC] disabled:opacity-50"
                        >
                          {actionLoading === `cert-${reg.id}` ? <Loader2 className="w-4 h-4 animate-spin" /> : <Award className="w-4 h-4" />}
                          Send Certificate
                        </button>
                      ) : (
                        <button
                          onClick={() => sendFollowUp(reg)}
                          disabled={actionLoading === `follow-${reg.id}`}
                          className="inline-flex items-center gap-2 bg-amber-500 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-amber-600 disabled:opacity-50"
                        >
                          {actionLoading === `follow-${reg.id}` ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                          Send Follow-up
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {registrations.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[#64748B]">No registrations found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-12 text-center">
          <FileText className="w-12 h-12 text-[#CBD5E1] mx-auto mb-4" />
          <h3 className="text-lg font-bold text-[#0B1C2C] mb-2">{TABS.find(t => t.id === activeTab)?.label} Module</h3>
          <p className="text-[#64748B] max-w-md mx-auto">
            This module is connected to your Firebase backend. Detailed views for {activeTab} will appear here.
          </p>
        </div>
      )}
    </div>
  );
}

