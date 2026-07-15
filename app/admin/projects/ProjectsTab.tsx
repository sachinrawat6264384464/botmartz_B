"use client";

import { useState, useEffect, useCallback } from "react";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc,
  orderBy, query, serverTimestamp, Timestamp
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Plus, RefreshCw, Search, Edit2, Trash2, ExternalLink, X, Save,
  FolderKanban, Activity, BarChart2, Tag, CheckCircle, XCircle
} from "lucide-react";
import { Inter_Tight } from "next/font/google";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

interface ProjectItem {
  id?: string;
  title: string;
  url: string;
  tag: string;
  result: string;
  createdAt?: Timestamp | null;
}

const EMPTY_PROJECT: Omit<ProjectItem, "id"> = {
  title: "",
  url: "",
  tag: "E-commerce",
  result: "",
  createdAt: null,
};

const TAG_OPTIONS = ["E-commerce", "Retail", "Food & Bev", "Wellness", "Home", "Technology", "Consulting", "Logistics", "Other"];

export default function ProjectsTab() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [form, setForm] = useState<Omit<ProjectItem, "id">>(EMPTY_PROJECT);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const list: ProjectItem[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() } as ProjectItem));
      setProjects(list);
    } catch {
      try {
        const snap = await getDocs(collection(db, "projects"));
        const list: ProjectItem[] = [];
        snap.forEach((d) => list.push({ id: d.id, ...d.data() } as ProjectItem));
        setProjects(list);
      } catch (e) {
        showToast("Failed to load projects", "error");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // ── Stats ──────────────────────────────────────────────
  const totalProjects = projects.length;
  const ecommerceCount = projects.filter((p) => p.tag === "E-commerce").length;
  const techCount = projects.filter((p) => p.tag === "Technology" || p.tag === "Consulting").length;

  // ── Filtered list ──────────────────────────────────────
  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.tag.toLowerCase().includes(search.toLowerCase()) ||
    p.result.toLowerCase().includes(search.toLowerCase())
  );

  // ── Modal Actions ──────────────────────────────────────
  const openAdd = () => {
    setEditingProject(null);
    setForm(EMPTY_PROJECT);
    setShowModal(true);
  };

  const openEdit = (project: ProjectItem) => {
    setEditingProject(project);
    setForm({ ...project });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
    setForm(EMPTY_PROJECT);
  };

  // ── Save Actions ──────────────────────────────────────
  const handleSave = async () => {
    if (!form.title.trim() || !form.url.trim() || !form.tag.trim()) {
      showToast("Title, URL and Category Tag are required", "error");
      return;
    }
    setSaving(true);
    try {
      if (editingProject?.id) {
        await updateDoc(doc(db, "projects", editingProject.id), {
          ...form,
        });
        showToast("Project updated successfully!", "success");
      } else {
        await addDoc(collection(db, "projects"), {
          ...form,
          createdAt: serverTimestamp(),
        });
        showToast("Project created successfully!", "success");
      }
      closeModal();
      fetchProjects();
    } catch {
      showToast("Failed to save project. Try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  // ── Delete Action ─────────────────────────────────────
  const handleDelete = async (project: ProjectItem) => {
    if (!project.id) return;
    if (!confirm(`Delete "${project.title}" from deployment log?`)) return;
    try {
      await deleteDoc(doc(db, "projects", project.id));
      setProjects((prev) => prev.filter((p) => p.id !== project.id));
      showToast("Project deleted", "success");
    } catch {
      showToast("Failed to delete project", "error");
    }
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
            <FolderKanban size={24} className="text-admin-accent" /> Deployment Log
          </h1>
          <p className="text-sm text-admin-text-muted mt-0.5">
            Manage projects displayed in the landing page Deployment Log section
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-admin-accent hover:bg-admin-accent/80 text-white text-sm font-semibold rounded-xl transition-all shadow-sm shrink-0"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Deployments", value: totalProjects, color: "text-admin-accent", bg: "bg-admin-accent/10", icon: FolderKanban },
          { label: "E-commerce Projects", value: ecommerceCount, color: "text-purple-400", bg: "bg-purple-500/10", icon: Tag },
          { label: "Tech & Consulting", value: techCount, color: "text-emerald-400", bg: "bg-emerald-500/10", icon: BarChart2 },
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

      {/* Search and Filters */}
      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-admin-bg border border-admin-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent"
          />
        </div>
        <button onClick={fetchProjects} className="p-2.5 rounded-xl border border-admin-border hover:bg-admin-bg transition-colors">
          <RefreshCw size={15} className="text-admin-text-muted" />
        </button>
      </div>

      {/* Grid Table Card */}
      <div className="bg-admin-card border border-admin-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-admin-border bg-admin-bg/50">
                <th className="text-left px-5 py-3.5 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Title</th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-admin-text-muted uppercase tracking-wider">URL</th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Tag</th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Metric Result</th>
                <th className="text-right px-5 py-3.5 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-16 text-admin-text-muted">
                    <RefreshCw size={20} className="animate-spin mx-auto mb-2 text-admin-accent" />
                    <p className="text-xs">Loading projects...</p>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-16 text-admin-text-muted">
                    <FolderKanban size={32} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-semibold">No projects found</p>
                    <p className="text-xs mt-1">Click "Add Project" to log your first launch.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="border-b border-admin-border/50 hover:bg-admin-bg/40 transition-colors">
                    <td className="px-5 py-4 font-semibold text-admin-text">{p.title}</td>
                    <td className="px-5 py-4">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-admin-accent hover:underline"
                      >
                        {p.url.replace(/^https?:\/\/(www\.)?/, "")} <ExternalLink size={12} />
                      </a>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold bg-admin-accent/10 text-admin-accent">
                        {p.tag}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium text-admin-text-muted">{p.result || "—"}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-1.5 rounded-lg text-admin-text-muted hover:text-admin-accent hover:bg-admin-accent/10 transition-colors"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm px-4 py-6 overflow-y-auto">
          <div className="w-full max-w-md bg-admin-card border border-admin-border rounded-2xl shadow-2xl p-6 relative text-admin-text my-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-admin-text-muted hover:text-admin-text transition-colors"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold mb-1 flex items-center gap-2 text-admin-accent">
              <FolderKanban size={18} /> {editingProject ? "Edit Project" : "Add Project"}
            </h3>
            <p className="text-xs text-admin-text-muted mb-5">
              Specify website launch info to update the live homepage Deployment Log.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-1.5">Project Name *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Lotus Skincare"
                  className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-1.5">Launch URL *</label>
                <input
                  value={form.url}
                  onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
                  placeholder="e.g. https://lotusskin.in/"
                  className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-1.5">Category Tag *</label>
                <select
                  value={form.tag}
                  onChange={(e) => setForm((p) => ({ ...p, tag: e.target.value }))}
                  className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-accent"
                >
                  {TAG_OPTIONS.map((tag) => <option key={tag}>{tag}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-1.5">Result / Metric *</label>
                <input
                  value={form.result}
                  onChange={(e) => setForm((p) => ({ ...p, result: e.target.value }))}
                  placeholder="e.g. Upto 20% Off, Fast Delivery"
                  className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2.5 border border-admin-border text-admin-text-muted rounded-xl hover:bg-admin-bg text-sm font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.title || !form.url}
                className="flex items-center gap-2 px-5 py-2.5 bg-admin-accent hover:bg-admin-accent/80 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all shadow-sm"
              >
                {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                {saving ? "Saving..." : editingProject ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
