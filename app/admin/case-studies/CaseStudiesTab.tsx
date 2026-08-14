"use client";

import { useState, useEffect } from "react";
import {
  Search,
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  X,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CaseStudy } from "@/types/admin";
import { formatViewCount } from "@/lib/formatters";

const interTight = { className: "" };

interface CaseStudiesTabProps {
  caseStudies: CaseStudy[];
  onDeleteCaseStudy: (id: string) => Promise<void>;
  onEditCaseStudy: (caseStudy: CaseStudy) => void;
  onNewCaseStudy: () => void;
  formatDate: (timestamp: any) => string;
}

const PAGE_SIZES = [10, 25, 50] as const;

function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${
        type === "success" ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"
      }`}
    >
      {type === "success" ? (
        <CheckCircle size={16} className="text-green-500 shrink-0" />
      ) : (
        <XCircle size={16} className="text-red-500 shrink-0" />
      )}
      <p className="text-sm font-medium text-white">{message}</p>
      <button onClick={onClose} className="text-ink-soft hover:text-white transition-colors ml-1">
        <X size={15} />
      </button>
    </div>
  );
}

function ConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel,
  isLoading,
}: {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={!isLoading ? onCancel : undefined} />
      <div className="relative bg-admin-card rounded-2xl shadow-2xl max-w-md w-full p-6 border border-admin-border">
        <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={18} className="text-red-500" />
        </div>
        <div className="text-center mb-6">
          <h3 className="text-sm font-semibold text-admin-text mb-2">{title}</h3>
          <p className="text-xs text-admin-text-muted">{message}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 bg-admin-bg hover:bg-admin-bg/60 border border-admin-border text-admin-text-muted hover:text-admin-text font-medium rounded-xl text-sm transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Trash2 size={14} />
            )}
            {isLoading ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudiesTab({
  caseStudies,
  onDeleteCaseStudy,
  onEditCaseStudy,
  onNewCaseStudy,
  formatDate,
}: CaseStudiesTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [caseStudyToDelete, setCaseStudyToDelete] = useState<CaseStudy | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const filtered = caseStudies.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.clientName && c.clientName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.excerpt && c.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStatus, pageSize]);

  const totalViews = caseStudies.reduce((sum, p) => sum + (p.views || 0), 0);
  const { formatted: totalViewsFormatted } = formatViewCount(totalViews, "intl");
  const totalLikes = caseStudies.reduce((sum, p) => sum + (p.likes || 0), 0);
  const { formatted: totalLikesFormatted } = formatViewCount(totalLikes, "intl");

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleConfirmDelete = async () => {
    if (!caseStudyToDelete) return;
    setDeletingId(caseStudyToDelete.id);
    try {
      await onDeleteCaseStudy(caseStudyToDelete.id);
      showToast("Case Study deleted successfully", "success");
      setCaseStudyToDelete(null);
    } catch {
      showToast("Failed to delete case study", "error");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className={`${interTight.className} p-6 max-w-[1400px] text-admin-text`}>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-admin-text">Case Studies</h1>
          <p className="text-sm text-admin-text-muted mt-0.5">Manage portfolio projects and case studies</p>
        </div>
        <button
          onClick={onNewCaseStudy}
          className="flex items-center gap-2 px-4 py-2.5 bg-admin-accent hover:bg-admin-accent/80 text-white text-sm font-semibold rounded-xl transition-all shadow-sm"
        >
          <Plus size={15} />
          New Case Study
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Total Studies", value: caseStudies.length, icon: FileText, bg: "bg-sky-500/10", border: "border-sky-500/20", color: "text-sky-400" },
          { label: "Published", value: caseStudies.filter((b) => b.status === "published").length, icon: CheckCircle, bg: "bg-emerald-500/10", border: "border-emerald-500/20", color: "text-emerald-400" },
          { label: "Drafts", value: caseStudies.filter((b) => b.status === "draft").length, icon: FileText, bg: "bg-amber-500/10", border: "border-amber-500/20", color: "text-amber-400" },
          { label: "Total Views", value: totalViewsFormatted, icon: Eye, bg: "bg-purple-500/10", border: "border-purple-500/20", color: "text-purple-400" },
          { label: "Total Likes", value: totalLikesFormatted, icon: Heart, bg: "bg-rose-500/10", border: "border-rose-500/20", color: "text-rose-400" },
        ].map(({ label, value, icon: Icon, bg, border, color }) => (
          <div key={label} className="bg-admin-card border border-admin-border rounded-2xl p-5 flex items-center gap-4">
            <div className={`${bg} ${border} border rounded-xl p-3 shrink-0`}>
              <Icon size={18} className={color} />
            </div>
            <div>
              <p className={`text-2xl font-bold tracking-tight ${color}`}>{value}</p>
              <p className="text-xs font-semibold text-admin-text-muted mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Grid Table Card */}
      <div className="bg-admin-card border border-admin-border rounded-2xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-admin-border flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-muted" />
            <input
              type="text"
              placeholder="Search case studies…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-admin-bg border border-admin-border rounded-xl pl-9 pr-4 py-2 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent transition-all"
            />
          </div>
          <div className="flex gap-1 bg-admin-bg rounded-xl p-1 border border-admin-border">
            {(["all", "published", "draft"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${
                  filterStatus === s ? "bg-admin-card text-admin-text shadow-sm border border-admin-border" : "text-admin-text-muted hover:text-admin-text"
                }`}
              >
                {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-24 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-admin-bg border border-admin-border rounded-2xl flex items-center justify-center mb-3">
              <FileText size={20} className="text-admin-text-muted" />
            </div>
            <p className="text-sm font-semibold text-admin-text-muted">No case studies found</p>
            <p className="text-xs text-admin-text-muted/70 mt-1">Create your first case study to get started</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-admin-border bg-admin-bg/50">
                  <tr>
                    {["Title", "Client", "Category", "Views", "Likes", "Status", "Actions"].map((h) => (
                      <th
                        key={h}
                        className={`px-5 py-3 text-[10px] font-semibold text-admin-text-muted uppercase tracking-wider ${
                          h === "Actions" ? "text-right" : "text-left"
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-admin-border">
                  {paginated.map((c) => {
                    const { formatted: viewsFormatted } = formatViewCount(c.views, "intl");
                    const { formatted: likesFormatted } = formatViewCount(c.likes, "intl");
                    return (
                      <tr key={c.id} className="hover:bg-admin-bg/40 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            {c.featuredImage && (
                              <img
                                src={c.featuredImage}
                                alt={c.title}
                                className="w-10 h-10 object-cover rounded-lg shrink-0"
                              />
                            )}
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-admin-text truncate">{c.title}</p>
                              <p className="text-xs text-admin-text-muted">{formatDate(c.createdAt)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-sm text-admin-text-muted">
                          {c.clientName || "N/A"}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                            {c.category}
                          </span>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-sm font-semibold text-admin-text">
                          {viewsFormatted}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Heart size={13} className="text-rose-500" />
                            <span className="text-sm font-semibold text-admin-text">{likesFormatted}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                              c.status === "published"
                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                c.status === "published" ? "bg-green-500" : "bg-amber-500"
                              }`}
                            />
                            {c.status === "published" ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                               onClick={() => onEditCaseStudy(c)}
                               disabled={deletingId === c.id}
                               className="p-1.5 hover:bg-admin-accent/10 text-admin-text-muted hover:text-admin-accent rounded-lg transition-all disabled:opacity-50"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                               onClick={() => setCaseStudyToDelete(c)}
                               disabled={deletingId === c.id}
                               className="p-1.5 hover:bg-red-500/10 text-admin-text-muted hover:text-red-500 rounded-lg transition-all disabled:opacity-50"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="px-5 py-3 border-t border-admin-border flex items-center justify-end gap-1.5 bg-admin-card">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 border border-admin-border rounded-lg hover:bg-admin-bg/30 disabled:opacity-30 transition-all text-admin-text-muted hover:text-admin-text"
                >
                  <ChevronLeft size={13} />
                </button>
                <span className="text-xs text-admin-text-muted px-3">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 border border-admin-border rounded-lg hover:bg-admin-bg/30 disabled:opacity-30 transition-all text-admin-text-muted hover:text-admin-text"
                >
                  <ChevronRight size={13} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {caseStudyToDelete && (
        <ConfirmDialog
          title="Delete Case Study"
          message={`Are you sure you want to delete "${caseStudyToDelete.title}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setCaseStudyToDelete(null)}
          isLoading={deletingId === caseStudyToDelete.id}
        />
      )}
    </div>
  );
}
