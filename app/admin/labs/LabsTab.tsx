"use client";

import { useState, useEffect, useCallback } from "react";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc,
  orderBy, query, serverTimestamp, Timestamp
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Plus, RefreshCw, Search, Edit2, Trash2, Eye, EyeOff,
  Github, ExternalLink, X, Save, Tag, CheckCircle, XCircle,
  Layers, Activity, Zap, Code
} from "lucide-react";
import { Inter_Tight } from "next/font/google";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

interface Lab {
  id?: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
  repoUrl: string;
  stars: number;
  forks: number;
  badge: "" | "New" | "Live" | "Beta";
  status: "active" | "inactive";
  featured: boolean;
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
}

const EMPTY_LAB: Omit<Lab, "id"> = {
  title: "",
  description: "",
  category: "AI Agents",
  tags: [],
  githubUrl: "",
  demoUrl: "",
  repoUrl: "",
  stars: 0,
  forks: 0,
  badge: "New",
  status: "active",
  featured: false,
  createdAt: null,
  updatedAt: null,
};

const CATEGORIES = ["AI Agents", "Enterprise RAG", "Computer Vision", "Developer Tools", "Infrastructure", "Other"];

export default function LabsTab() {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingLab, setEditingLab] = useState<Lab | null>(null);
  const [form, setForm] = useState<Omit<Lab, "id">>(EMPTY_LAB);
  const [tagInput, setTagInput] = useState("");

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchLabs = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "labs"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const list: Lab[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() } as Lab));
      setLabs(list);
    } catch {
      // fallback: fetch without ordering if index not ready
      try {
        const snap = await getDocs(collection(db, "labs"));
        const list: Lab[] = [];
        snap.forEach((d) => list.push({ id: d.id, ...d.data() } as Lab));
        setLabs(list);
      } catch (e) {
        showToast("Failed to load labs", "error");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLabs(); }, [fetchLabs]);

  // ── Stats ──────────────────────────────────────────────
  const totalLabs = labs.length;
  const activeLabs = labs.filter((l) => l.status === "active").length;
  const inactiveLabs = labs.filter((l) => l.status === "inactive").length;

  // ── Filtered list ──────────────────────────────────────
  const filtered = labs.filter((l) =>
    l.title.toLowerCase().includes(search.toLowerCase()) ||
    l.category.toLowerCase().includes(search.toLowerCase()) ||
    l.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  // ── Modal helpers ──────────────────────────────────────
  const openAdd = () => {
    setEditingLab(null);
    setForm(EMPTY_LAB);
    setTagInput("");
    setShowModal(true);
  };

  const openEdit = (lab: Lab) => {
    setEditingLab(lab);
    setForm({ ...lab });
    setTagInput("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingLab(null);
    setForm(EMPTY_LAB);
    setTagInput("");
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      setForm((p) => ({ ...p, tags: [...p.tags, t] }));
    }
    setTagInput("");
  };

  const removeTag = (t: string) => setForm((p) => ({ ...p, tags: p.tags.filter((x) => x !== t) }));

  // ── Save (create / update) ─────────────────────────────
  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      showToast("Title and Description are required", "error");
      return;
    }
    setSaving(true);
    try {
      if (editingLab?.id) {
        await updateDoc(doc(db, "labs", editingLab.id), {
          ...form,
          updatedAt: serverTimestamp(),
        });
        showToast("Lab updated successfully!", "success");
      } else {
        await addDoc(collection(db, "labs"), {
          ...form,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        showToast("Lab created successfully!", "success");
      }
      closeModal();
      fetchLabs();
    } catch {
      showToast("Failed to save lab. Try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  // ── Toggle status ──────────────────────────────────────
  const toggleStatus = async (lab: Lab) => {
    if (!lab.id) return;
    const newStatus = lab.status === "active" ? "inactive" : "active";
    try {
      await updateDoc(doc(db, "labs", lab.id), { status: newStatus, updatedAt: serverTimestamp() });
      setLabs((prev) => prev.map((l) => (l.id === lab.id ? { ...l, status: newStatus } : l)));
      showToast(`Lab marked as ${newStatus}`, "success");
    } catch {
      showToast("Failed to update status", "error");
    }
  };

  // ── Delete ─────────────────────────────────────────────
  const handleDelete = async (lab: Lab) => {
    if (!lab.id) return;
    if (!confirm(`Delete "${lab.title}"? This cannot be undone.`)) return;
    try {
      await deleteDoc(doc(db, "labs", lab.id));
      setLabs((prev) => prev.filter((l) => l.id !== lab.id));
      showToast("Lab deleted", "success");
    } catch {
      showToast("Failed to delete lab", "error");
    }
  };

  return (
    <div className={`${interTight.className} p-6 max-w-[1400px] text-admin-text`}>

      {/* ── Toast ── */}
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

      {/* ── Header ── */}
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-admin-text flex items-center gap-2">
            <Layers size={24} className="text-admin-accent" /> Labs Manager
          </h1>
          <p className="text-sm text-admin-text-muted mt-0.5">
            Manage all Botmartz Labs projects — visible on the public Labs page
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-admin-accent hover:bg-admin-accent/80 text-white text-sm font-semibold rounded-xl transition-all shadow-sm shrink-0"
        >
          <Plus size={16} /> Add New Lab
        </button>
      </div>

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Labs", value: totalLabs, color: "text-admin-accent", bg: "bg-admin-accent/10", icon: Layers },
          { label: "Active", value: activeLabs, color: "text-emerald-400", bg: "bg-emerald-500/10", icon: Zap },
          { label: "Inactive", value: inactiveLabs, color: "text-zinc-400", bg: "bg-zinc-500/10", icon: EyeOff },
          { label: "All Projects", value: totalLabs, color: "text-purple-400", bg: "bg-purple-500/10", icon: Activity },
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

      {/* ── Search Bar ── */}
      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search labs..."
            className="w-full bg-admin-bg border border-admin-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent"
          />
        </div>
        <button onClick={fetchLabs} className="p-2.5 rounded-xl border border-admin-border hover:bg-admin-bg transition-colors">
          <RefreshCw size={15} className="text-admin-text-muted" />
        </button>
      </div>

      {/* ── Table ── */}
      <div className="bg-admin-card border border-admin-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-admin-border bg-admin-bg/50">
                <th className="text-left px-5 py-3.5 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Title</th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Category</th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Tags</th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Links</th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3.5 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-admin-text-muted">
                    <RefreshCw size={20} className="animate-spin mx-auto mb-2 text-admin-accent" />
                    <p className="text-xs">Loading labs...</p>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-admin-text-muted">
                    <Layers size={32} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-semibold">No labs found</p>
                    <p className="text-xs mt-1">Click "Add New Lab" to create the first one.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((lab) => (
                  <tr key={lab.id} className="border-b border-admin-border/50 hover:bg-admin-bg/40 transition-colors">
                    {/* Title */}
                    <td className="px-5 py-4">
                      <div className="font-semibold text-admin-text">{lab.title}</div>
                      <div className="text-xs text-admin-text-muted mt-0.5 line-clamp-1 max-w-[200px]">{lab.description}</div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold bg-admin-accent/10 text-admin-accent">
                        {lab.category}
                      </span>
                    </td>

                    {/* Tags */}
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1.5 max-w-[160px]">
                        {lab.tags.slice(0, 3).map((t) => (
                          <span key={t} className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-admin-bg border border-admin-border text-admin-text-muted">
                            {t}
                          </span>
                        ))}
                        {lab.tags.length > 3 && (
                          <span className="text-[9px] text-admin-text-muted">+{lab.tags.length - 3}</span>
                        )}
                      </div>
                    </td>

                    {/* Links */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3 text-admin-text-muted">
                        {lab.githubUrl && (
                          <a href={lab.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-admin-accent transition-colors">
                            <Github size={14} />
                          </a>
                        )}
                        {lab.demoUrl && (
                          <a href={lab.demoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-admin-accent transition-colors">
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        lab.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-zinc-500/10 text-zinc-400"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${lab.status === "active" ? "bg-emerald-400" : "bg-zinc-400"}`} />
                        {lab.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* Toggle active/inactive */}
                        <button
                          onClick={() => toggleStatus(lab)}
                          title={lab.status === "active" ? "Deactivate" : "Activate"}
                          className={`p-1.5 rounded-lg transition-colors ${
                            lab.status === "active"
                              ? "text-emerald-400 hover:bg-emerald-500/10"
                              : "text-zinc-400 hover:bg-zinc-500/10"
                          }`}
                        >
                          {lab.status === "active" ? <Eye size={15} /> : <EyeOff size={15} />}
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => openEdit(lab)}
                          title="Edit"
                          className="p-1.5 rounded-lg text-admin-text-muted hover:text-admin-accent hover:bg-admin-accent/10 transition-colors"
                        >
                          <Edit2 size={15} />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(lab)}
                          title="Delete"
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

      {/* ── Add / Edit Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm px-4 py-6 overflow-y-auto">
          <div className="w-full max-w-xl bg-admin-card border border-admin-border rounded-2xl shadow-2xl p-6 relative text-admin-text my-auto">
            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-admin-text-muted hover:text-admin-text transition-colors"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold mb-1 flex items-center gap-2 text-admin-accent">
              <Layers size={18} /> {editingLab ? "Edit Lab" : "Add New Lab"}
            </h3>
            <p className="text-xs text-admin-text-muted mb-5">
              {editingLab ? "Update lab details. Changes reflect live on the Labs page." : "Fill in lab details. It will appear on the public Labs page."}
            </p>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-1.5">Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Enterprise RAG Demo"
                  className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-1.5">Description *</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Short description of the lab project..."
                  className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent resize-none"
                />
              </div>

              {/* Category + Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-1.5">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                    className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-accent"
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-1.5">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as "active" | "inactive" }))}
                    className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-accent"
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="inactive">Inactive (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-1.5">
                  <Tag size={10} className="inline mr-1" />Tags / Tech Stack
                </label>
                <div className="flex gap-2">
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    placeholder="e.g. LangGraph, FastAPI"
                    className="flex-1 bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent"
                  />
                  <button
                    onClick={addTag}
                    className="px-4 py-2 bg-admin-bg border border-admin-border rounded-xl text-sm font-semibold text-admin-text-muted hover:text-admin-accent hover:border-admin-accent transition-colors"
                  >
                    Add
                  </button>
                </div>
                {form.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.tags.map((t) => (
                      <span key={t} className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-admin-accent/10 text-admin-accent border border-admin-accent/20">
                        {t}
                        <button onClick={() => removeTag(t)} className="hover:text-red-400 transition-colors ml-0.5">
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Links */}
              <div>
                <label className="block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-2">Links</label>
                <div className="space-y-2">
                  {[
                    { key: "githubUrl", placeholder: "GitHub URL (https://github.com/...)", icon: Github },
                    { key: "demoUrl", placeholder: "Demo URL (https://demo.example.com)", icon: ExternalLink },
                    { key: "repoUrl", placeholder: "Repo / Docs URL (optional)", icon: ExternalLink },
                  ].map(({ key, placeholder, icon: Icon }) => (
                    <div key={key} className="relative">
                      <Icon size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-muted" />
                      <input
                        value={(form as any)[key]}
                        onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                        placeholder={placeholder}
                        className="w-full bg-admin-bg border border-admin-border rounded-xl pl-9 pr-4 py-3 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Badge + Stars + Forks */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-1.5">Badge</label>
                  <select
                    value={form.badge}
                    onChange={(e) => setForm((p) => ({ ...p, badge: e.target.value as Lab["badge"] }))}
                    className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-accent"
                  >
                    <option value="">None</option>
                    <option value="New">New</option>
                    <option value="Live">Live</option>
                    <option value="Beta">Beta</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-1.5">⭐ Stars</label>
                  <input
                    type="number"
                    min={0}
                    value={form.stars}
                    onChange={(e) => setForm((p) => ({ ...p, stars: Number(e.target.value) }))}
                    className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-1.5">🍴 Forks</label>
                  <input
                    type="number"
                    min={0}
                    value={form.forks}
                    onChange={(e) => setForm((p) => ({ ...p, forks: Number(e.target.value) }))}
                    className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-accent"
                  />
                </div>
              </div>

              {/* Featured */}
              <div className="flex items-center justify-between bg-admin-bg border border-admin-border rounded-xl px-4 py-3">
                <div>
                  <div className="text-sm font-semibold text-admin-text">Featured Lab</div>
                  <div className="text-xs text-admin-text-muted">Highlighted at the top of the Labs page</div>
                </div>
                <button
                  onClick={() => setForm((p) => ({ ...p, featured: !p.featured }))}
                  className={`relative w-11 h-6 rounded-full transition-colors ${form.featured ? "bg-admin-accent" : "bg-admin-border"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.featured ? "translate-x-5" : ""}`} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2.5 border border-admin-border text-admin-text-muted rounded-xl hover:bg-admin-bg text-sm font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.title || !form.description}
                className="flex items-center gap-2 px-5 py-2.5 bg-admin-accent hover:bg-admin-accent/80 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all shadow-sm"
              >
                {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                {saving ? "Saving..." : editingLab ? "Update Lab" : "Create Lab"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
