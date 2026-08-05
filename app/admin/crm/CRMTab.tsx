"use client";

import { useState, useEffect, useCallback } from "react";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc,
  orderBy, query, serverTimestamp, Timestamp
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Users, Search, RefreshCw, Plus, Mail, Trash2, Check,
  UserCheck, Send, Calendar, CheckCircle, XCircle, FileText, Ban, X, Download
} from "lucide-react";
import { Inter_Tight } from "next/font/google";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  status: "read" | "unread";
  createdAt: any;
}

interface Subscriber {
  id: string;
  name?: string;
  email: string;
  status: "active" | "unsubscribed";
  source?: string;
  subscribedAt: any;
}

export default function CRMTab() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"leads" | "subscribers">("leads");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSub, setNewSub] = useState({ name: "", email: "", source: "manual" });
  const [saving, setSaving] = useState(false);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchCRMData = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Fetch leads (contacts)
      const leadsSnap = await getDocs(query(collection(db, "contacts"), orderBy("createdAt", "desc")));
      const leadsList: Lead[] = [];
      leadsSnap.forEach((doc) => {
        leadsList.push({ id: doc.id, ...doc.data() } as Lead);
      });
      setLeads(leadsList);

      // 2. Fetch subscribers
      const subsSnap = await getDocs(query(collection(db, "newsletter"), orderBy("subscribedAt", "desc")));
      const subsList: Subscriber[] = [];
      subsSnap.forEach((doc) => {
        subsList.push({ id: doc.id, ...doc.data() } as Subscriber);
      });
      setSubscribers(subsList);
    } catch (e) {
      console.error("Error fetching CRM data:", e);
      showToast("Failed to load CRM data", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCRMData();
  }, [fetchCRMData]);

  // Stats calculation
  const totalLeads = leads.length;
  const activeSubs = subscribers.filter((s) => s.status === "active").length;
  const totalUniqueContacts = Array.from(
    new Set([...leads.map((l) => l.email), ...subscribers.map((s) => s.email)])
  ).length;

  // Actions
  const handleToggleSubscriberStatus = async (sub: Subscriber) => {
    const nextStatus = sub.status === "active" ? "unsubscribed" : "active";
    try {
      await updateDoc(doc(db, "newsletter", sub.id), { status: nextStatus });
      setSubscribers((prev) =>
        prev.map((s) => (s.id === sub.id ? { ...s, status: nextStatus } : s))
      );
      showToast(`Subscriber status updated to ${nextStatus}`, "success");
    } catch {
      showToast("Failed to update status", "error");
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry lead?")) return;
    try {
      await deleteDoc(doc(db, "contacts", id));
      setLeads((prev) => prev.filter((l) => l.id !== id));
      showToast("Inquiry lead deleted", "success");
    } catch {
      showToast("Failed to delete lead", "error");
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;
    try {
      await deleteDoc(doc(db, "newsletter", id));
      setSubscribers((prev) => prev.filter((s) => s.id !== id));
      showToast("Subscriber deleted", "success");
    } catch {
      showToast("Failed to delete subscriber", "error");
    }
  };

  const handleAddSubscriber = async () => {
    if (!newSub.email.trim()) return;
    setSaving(true);
    try {
      const docRef = await addDoc(collection(db, "newsletter"), {
        name: newSub.name.trim(),
        email: newSub.email.toLowerCase().trim(),
        status: "active",
        source: newSub.source,
        subscribedAt: serverTimestamp(),
      });
      setSubscribers((prev) => [
        {
          id: docRef.id,
          name: newSub.name.trim(),
          email: newSub.email.toLowerCase().trim(),
          status: "active",
          source: newSub.source,
          subscribedAt: new Date(),
        },
        ...prev,
      ]);
      showToast("Subscriber added successfully", "success");
      setShowAddModal(false);
      setNewSub({ name: "", email: "", source: "manual" });
    } catch {
      showToast("Failed to add subscriber", "error");
    } finally {
      setSaving(false);
    }
  };

  // Helper date formatter
  const formatDate = (ts: any) => {
    if (!ts) return "—";
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
  };

  // Search logic
  const searchLower = search.toLowerCase();
  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchLower) ||
      l.email.toLowerCase().includes(searchLower) ||
      (l.company && l.company.toLowerCase().includes(searchLower))
  );

  const filteredSubs = subscribers.filter(
    (s) =>
      (s.name && s.name.toLowerCase().includes(searchLower)) ||
      s.email.toLowerCase().includes(searchLower) ||
      (s.source && s.source.toLowerCase().includes(searchLower))
  );

  // CSV Export — Leads / Inquiries
  const exportLeadsCSV = () => {
    if (filteredLeads.length === 0) return;
    const headers = ["Date", "Name", "Email", "Company", "Message", "Status"];
    const rows = filteredLeads.map((l) => [
      `"${formatDate(l.createdAt)}"`,
      `"${(l.name || "").replace(/"/g, '""')}"`,
      `"${(l.email || "").replace(/"/g, '""')}"`,
      `"${(l.company || "").replace(/"/g, '""')}"`,
      `"${(l.message || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
      `"${l.status || ""}"`
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `crm-leads-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Leads exported to CSV!", "success");
  };

  // CSV Export — Newsletter Subscribers
  const exportSubscribersCSV = () => {
    if (filteredSubs.length === 0) return;
    const headers = ["Joined Date", "Name", "Email", "Source", "Status"];
    const rows = filteredSubs.map((s) => [
      `"${formatDate(s.subscribedAt)}"`,
      `"${(s.name || "").replace(/"/g, '""')}"`,
      `"${(s.email || "").replace(/"/g, '""')}"`,
      `"${(s.source || "Web").replace(/"/g, '""')}"`,
      `"${s.status || ""}"`
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `crm-subscribers-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Subscribers exported to CSV!", "success");
  };

  return (
    <div className={`${interTight.className} p-6 max-w-[1400px] text-admin-text`}>
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[200] flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold shadow-lg transition-all ${
          toast.type === "success"
            ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
            : "bg-red-500/10 border border-red-500/30 text-red-400"
        }`}>
          {toast.type === "success" ? <CheckCircle size={16} /> : <XCircle size={16} />}
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-admin-text flex items-center gap-2">
            <Users size={24} className="text-admin-accent" /> CRM Center
          </h1>
          <p className="text-sm text-admin-text-muted mt-0.5">
            Manage inquiries, leads, and newsletter subscription logs dynamically
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* Export CSV Button */}
          <button
            onClick={activeTab === "leads" ? exportLeadsCSV : exportSubscribersCSV}
            disabled={activeTab === "leads" ? filteredLeads.length === 0 : filteredSubs.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-white text-sm font-semibold rounded-xl transition-all shadow-sm disabled:opacity-40"
          >
            <Download size={15} />
            Export CSV
          </button>

          {/* Add Subscriber Button */}
          {activeTab === "subscribers" && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-admin-accent hover:bg-admin-accent/80 text-white text-sm font-semibold rounded-xl transition-all shadow-sm"
            >
              <Plus size={16} /> Add Subscriber
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Unique Contacts", value: totalUniqueContacts, color: "text-admin-accent", bg: "bg-admin-accent/10", icon: Users },
          { label: "Total Inquiries (Leads)", value: totalLeads, color: "text-purple-400", bg: "bg-purple-500/10", icon: FileText },
          { label: "Active Subscribers", value: activeSubs, color: "text-emerald-400", bg: "bg-emerald-500/10", icon: UserCheck },
        ].map(({ label, value, color, bg, icon: Icon }) => (
          <div key={label} className="bg-admin-card border border-admin-border rounded-2xl p-5 flex items-center gap-4">
            <div className={`${bg} rounded-xl p-3`}>
              <Icon size={20} className={color} />
            </div>
            <div>
              <div className={`text-2xl font-bold ${color}`}>{loading ? "—" : value}</div>
              <div className="text-xs text-admin-text-muted mt-0.5">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Tab Selector */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        {/* Tab switch */}
        <div className="flex gap-1 bg-admin-bg p-1 rounded-xl border border-admin-border self-start">
          <button
            onClick={() => { setActiveTab("leads"); setSearch(""); }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "leads"
                ? "bg-admin-card text-admin-text shadow-sm border border-admin-border"
                : "text-admin-text-muted hover:text-admin-text"
            }`}
          >
            Leads / Inquiries ({totalLeads})
          </button>
          <button
            onClick={() => { setActiveTab("subscribers"); setSearch(""); }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "subscribers"
                ? "bg-admin-card text-admin-text shadow-sm border border-admin-border"
                : "text-admin-text-muted hover:text-admin-text"
            }`}
          >
            Newsletter Subscribers ({subscribers.length})
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${activeTab}...`}
            className="w-full bg-admin-card border border-admin-border rounded-xl pl-9 pr-4 py-2 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent"
          />
        </div>
      </div>

      {/* Leads Table */}
      {activeTab === "leads" && (
        <div className="bg-admin-card border border-admin-border rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-admin-border bg-admin-bg/50">
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Date</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Name</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Email</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Company</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Message</th>
                  <th className="text-right px-5 py-3.5 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-16 text-admin-text-muted">
                      <RefreshCw size={20} className="animate-spin mx-auto mb-2 text-admin-accent" />
                      <p className="text-xs">Loading leads...</p>
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-16 text-admin-text-muted">
                      <FileText size={32} className="mx-auto mb-3 opacity-30" />
                      <p className="text-sm font-semibold">No inquiries logged</p>
                      <p className="text-xs mt-1">Inquiry submissions will automatically populate here.</p>
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-admin-border/50 hover:bg-admin-bg/40 transition-colors">
                      <td className="px-5 py-4 text-xs font-mono text-admin-text-muted whitespace-nowrap">
                        {formatDate(lead.createdAt)}
                      </td>
                      <td className="px-5 py-4 font-semibold text-admin-text">{lead.name}</td>
                      <td className="px-5 py-4">
                        <a href={`mailto:${lead.email}`} className="text-admin-accent hover:underline">{lead.email}</a>
                      </td>
                      <td className="px-5 py-4 text-admin-text-muted">{lead.company || "—"}</td>
                      <td className="px-5 py-4 max-w-[240px] truncate text-admin-text-muted" title={lead.message}>
                        {lead.message}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-1.5 rounded-lg text-admin-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subscribers Table */}
      {activeTab === "subscribers" && (
        <div className="bg-admin-card border border-admin-border rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-admin-border bg-admin-bg/50">
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Joined Date</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Name</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Email</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Source</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Status</th>
                  <th className="text-right px-5 py-3.5 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-16 text-admin-text-muted">
                      <RefreshCw size={20} className="animate-spin mx-auto mb-2 text-admin-accent" />
                      <p className="text-xs">Loading subscribers...</p>
                    </td>
                  </tr>
                ) : filteredSubs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-16 text-admin-text-muted">
                      <Send size={32} className="mx-auto mb-3 opacity-30" />
                      <p className="text-sm font-semibold">No subscribers found</p>
                      <p className="text-xs mt-1">Manual subscribers will appear once added.</p>
                    </td>
                  </tr>
                ) : (
                  filteredSubs.map((sub) => (
                    <tr key={sub.id} className="border-b border-admin-border/50 hover:bg-admin-bg/40 transition-colors">
                      <td className="px-5 py-4 text-xs font-mono text-admin-text-muted whitespace-nowrap">
                        {formatDate(sub.subscribedAt)}
                      </td>
                      <td className="px-5 py-4 font-semibold text-admin-text">{sub.name || "—"}</td>
                      <td className="px-5 py-4">
                        <a href={`mailto:${sub.email}`} className="text-admin-accent hover:underline">{sub.email}</a>
                      </td>
                      <td className="px-5 py-4 capitalize text-admin-text-muted">{sub.source || "Web"}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          sub.status === "active"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sub.status === "active" ? "bg-emerald-400" : "bg-zinc-400"}`} />
                          {sub.status === "active" ? "Active" : "Unsubscribed"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleToggleSubscriberStatus(sub)}
                            title={sub.status === "active" ? "Unsubscribe" : "Activate Subscription"}
                            className={`p-1.5 rounded-lg transition-colors ${
                              sub.status === "active"
                                ? "text-amber-400 hover:bg-amber-500/10"
                                : "text-emerald-400 hover:bg-emerald-500/10"
                            }`}
                          >
                            <Ban size={15} />
                          </button>
                          <button
                            onClick={() => handleDeleteSubscriber(sub.id)}
                            className="p-1.5 rounded-lg text-admin-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Subscriber Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm px-4 py-6 overflow-y-auto">
          <div className="w-full max-w-md bg-admin-card border border-admin-border rounded-2xl shadow-2xl p-6 relative text-admin-text my-auto">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-admin-text-muted hover:text-admin-text transition-colors"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold mb-1 flex items-center gap-2 text-admin-accent">
              <Users size={18} /> Add CRM Subscriber
            </h3>
            <p className="text-xs text-admin-text-muted mb-5">
              Manually add a contact to the Botmartz email newsletter log.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-1.5">Subscriber Name</label>
                <input
                  value={newSub.name}
                  onChange={(e) => setNewSub((p) => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. John Doe"
                  className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-1.5">Email Address *</label>
                <input
                  type="email"
                  value={newSub.email}
                  onChange={(e) => setNewSub((p) => ({ ...p, email: e.target.value }))}
                  placeholder="e.g. john@example.com"
                  className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-1.5">Registration Source</label>
                <select
                  value={newSub.source}
                  onChange={(e) => setNewSub((p) => ({ ...p, source: e.target.value }))}
                  className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-accent"
                >
                  <option value="manual">Manual Entry</option>
                  <option value="import">Bulk Import</option>
                  <option value="partner">Partner Reference</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2.5 border border-admin-border text-admin-text-muted rounded-xl hover:bg-admin-bg text-sm font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubscriber}
                disabled={saving || !newSub.email}
                className="flex items-center gap-2 px-5 py-2.5 bg-admin-accent hover:bg-admin-accent/80 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all shadow-sm"
              >
                {saving ? <RefreshCw size={14} className="animate-spin" /> : <Plus size={14} />}
                {saving ? "Saving..." : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
