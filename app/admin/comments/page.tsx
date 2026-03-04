"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  MessageCircle,
  CheckCircle2,
  XCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
  Search,
  Download,
  Trash2,
  AlertTriangle,
  Mail,
  ExternalLink,
} from "lucide-react";

interface Comment {
  id: string;
  blogId: string;
  authorName: string;
  authorEmail: string;
  content: string;
  status: "pending" | "approved" | "rejected";
  createdAt: any;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
}

const COMMENTS_PER_PAGE = 10;

export default function CommentsAdminPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [commentToDelete, setCommentToDelete] = useState<Comment | null>(null);
  const [selectedComments, setSelectedComments] = useState<Set<string>>(new Set());
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "blog-posts"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setBlogPosts(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setComments(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Comment[]);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const getBlogTitle = (blogId: string) =>
    blogPosts.find((b) => b.id === blogId)?.title || "Unknown Post";

  const getBlogSlug = (blogId: string) =>
    blogPosts.find((b) => b.id === blogId)?.slug || "";

  const formatDate = (ts: any) => {
    if (!ts) return "N/A";
    try {
      const d = ts.toDate ? ts.toDate() : new Date(ts);
      return new Intl.DateTimeFormat("en-US", {
        month: "short", day: "numeric", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      }).format(d);
    } catch { return "Invalid Date"; }
  };

  const handleApprove = async (id: string) => {
    await updateDoc(doc(db, "comments", id), { status: "approved" });
  };

  const handleReject = async (id: string) => {
    await updateDoc(doc(db, "comments", id), { status: "rejected" });
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "comments", id));
  };

  const handleDeleteConfirm = async () => {
    if (commentToDelete) {
      await handleDelete(commentToDelete.id);
      setCommentToDelete(null);
      if (selectedComment?.id === commentToDelete.id) setSelectedComment(null);
    }
  };

  const handleBulkDelete = async () => {
    await Promise.all([...selectedComments].map((id) => deleteDoc(doc(db, "comments", id))));
    setSelectedComments(new Set());
    setShowBulkDeleteConfirm(false);
  };

  const filtered = comments.filter((c) => {
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    const title = getBlogTitle(c.blogId).toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchSearch =
      c.authorName.toLowerCase().includes(q) ||
      c.authorEmail.toLowerCase().includes(q) ||
      c.content.toLowerCase().includes(q) ||
      title.includes(q);
    return matchStatus && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / COMMENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
  const paginated = filtered.slice(startIndex, startIndex + COMMENTS_PER_PAGE);

  const counts = {
    all: comments.length,
    pending: comments.filter((c) => c.status === "pending").length,
    approved: comments.filter((c) => c.status === "approved").length,
    rejected: comments.filter((c) => c.status === "rejected").length,
  };

  const handleSelectAll = () => {
    if (selectedComments.size === paginated.length) {
      setSelectedComments(new Set());
    } else {
      setSelectedComments(new Set(paginated.map((c) => c.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const s = new Set(selectedComments);
    s.has(id) ? s.delete(id) : s.add(id);
    setSelectedComments(s);
  };

  const handleExportCSV = () => {
    const rows = filtered.map((c, i) => [
      i + 1, c.authorName, c.authorEmail,
      getBlogTitle(c.blogId), c.content.replace(/"/g, '""'),
      c.status, formatDate(c.createdAt),
    ]);
    const csv = [
      ["#", "Author", "Email", "Blog Post", "Comment", "Status", "Date"].join(","),
      ...rows.map((r) => r.map((v) => `"${v}"`).join(",")),
    ].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `comments-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      approved: "bg-green-50 text-green-700 border-green-200",
      rejected: "bg-red-50 text-red-700 border-red-200",
    };
    const dot: Record<string, string> = {
      pending: "bg-amber-500",
      approved: "bg-green-500",
      rejected: "bg-red-500",
    };
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${dot[status]}`} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F9F8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-6 h-6 rounded-full border-2 border-gray-200 border-t-[#F97316] animate-spin"
          />
          <p className="text-xs text-gray-500">Loading comments…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-6">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1
              className="text-xl font-black text-[#111] tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.02em" }}
            >
              Comments
            </h1>

          </div>
          <div className="flex items-center gap-2">
            {selectedComments.size > 0 && (
              <button
                onClick={() => setShowBulkDeleteConfirm(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-all shadow-sm"
              >
                <Trash2 size={13} />
                Delete ({selectedComments.size})
              </button>
            )}
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-[#111] rounded-lg text-xs font-semibold transition-all shadow-sm"
            >
              <Download size={13} />
              Export CSV
            </button>
          </div>
        </div>

        {/* ── Stat Cards ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: counts.all, icon: Mail, iconBg: "bg-blue-50", iconColor: "text-blue-600" },
            { label: "Pending", value: counts.pending, icon: MessageCircle, iconBg: "bg-amber-50", iconColor: "text-amber-600" },
            { label: "Approved", value: counts.approved, icon: CheckCircle2, iconBg: "bg-green-50", iconColor: "text-green-600" },
            { label: "Rejected", value: counts.rejected, icon: XCircle, iconBg: "bg-red-50", iconColor: "text-red-600" },
          ].map(({ label, value, icon: Icon, iconBg, iconColor }) => (
            <div key={label} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.14em]"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  {label}
                </span>
                <div className={`w-7 h-7 ${iconBg} rounded-lg flex items-center justify-center`}>
                  <Icon size={14} className={iconColor} />
                </div>
              </div>
              <div className="text-lg font-black text-[#111]" style={{ fontFamily: "'Syne', sans-serif" }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* ── Main Table Card ─────────────────────────────────────────────────── */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">

          {/* Accent stripe */}
          <div className="h-[2px]" style={{ background: "linear-gradient(90deg, #F97316, #FDBA74)" }} />

          {/* Filters */}
          <div className="p-3 border-b border-gray-100 flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search author, email, content…"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-9 pr-3 py-1.5 bg-[#F9F9F8] border border-gray-200 rounded-lg text-xs text-[#111] placeholder:text-gray-400 focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-orange-200 transition-all"
              />
            </div>
            <div className="flex gap-1 bg-[#F9F9F8] rounded-lg p-1 border border-gray-200">
              {(["all", "pending", "approved", "rejected"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => { setStatusFilter(s); setCurrentPage(1); }}
                  className={`px-2 py-1 rounded text-[10px] font-bold transition-all capitalize ${
                    statusFilter === s
                      ? "bg-[#F97316] text-white shadow-sm shadow-orange-200"
                      : "text-gray-500 hover:text-[#111]"
                  }`}
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {s}
                  {s !== "all" && (
                    <span className={`ml-1 ${statusFilter === s ? "opacity-75" : "opacity-50"}`}>
                      ({counts[s]})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Table or empty */}
          {paginated.length === 0 ? (
            <div className="py-24 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-50 border border-orange-100 rounded-2xl flex items-center justify-center mb-4">
                <MessageCircle size={28} className="text-[#F97316]" />
              </div>
              <p className="text-[#111] font-semibold mb-1">No comments found</p>
              <p className="text-gray-400 text-sm">
                {searchQuery ? "Try a different search" : "Comments will appear here once submitted"}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-100 bg-[#F9F9F8]">
                    <tr>
                      <th className="px-3 py-2 text-left">
                        <input
                          type="checkbox"
                          checked={selectedComments.size === paginated.length && paginated.length > 0}
                          onChange={handleSelectAll}
                          className="w-3.5 h-3.5 accent-[#F97316] cursor-pointer rounded"
                        />
                      </th>
                      {["#", "Author", "Blog Post", "Comment", "Status", "Date", "Actions"].map((h) => (
                        <th
                          key={h}
                          className="px-3 py-2 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.12em]"
                          style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {paginated.map((comment, idx) => (
                      <tr key={comment.id} className="hover:bg-[#F9F9F8] transition-colors">
                        <td className="px-3 py-2">
                          <input
                            type="checkbox"
                            checked={selectedComments.has(comment.id)}
                            onChange={() => toggleSelect(comment.id)}
                            className="w-3.5 h-3.5 accent-[#F97316] cursor-pointer rounded"
                          />
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-400">{startIndex + idx + 1}</td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-black flex-shrink-0"
                              style={{ background: "linear-gradient(135deg, #F97316, #FDBA74)", fontFamily: "'Syne', sans-serif" }}
                            >
                              {comment.authorName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-[#111]">{comment.authorName}</div>
                              <div className="text-[10px] text-gray-400">{comment.authorEmail}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <a
                            href={`https://blog.botmartz.com/${getBlogSlug(comment.blogId)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-600 hover:text-[#F97316] transition-colors max-w-[150px] truncate block"
                          >
                            {getBlogTitle(comment.blogId)}
                          </a>
                        </td>
                        <td className="px-3 py-2">
                          <p className="text-xs text-gray-500 max-w-[180px] truncate">{comment.content}</p>
                        </td>
                        <td className="px-3 py-2 scale-90 origin-left">{statusBadge(comment.status)}</td>
                        <td className="px-3 py-2 text-[10px] text-gray-400 whitespace-nowrap">
                          {formatDate(comment.createdAt)}
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setSelectedComment(comment)}
                              className="p-1 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-lg transition-all"
                              title="View"
                            >
                              <Eye size={13} />
                            </button>
                            {comment.status !== "approved" && (
                              <button
                                onClick={() => handleApprove(comment.id)}
                                className="p-1 hover:bg-green-50 text-gray-400 hover:text-green-600 rounded-lg transition-all"
                                title="Approve"
                              >
                                <CheckCircle2 size={13} />
                              </button>
                            )}
                            {comment.status !== "rejected" && (
                              <button
                                onClick={() => handleReject(comment.id)}
                                className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-all"
                                title="Reject"
                              >
                                <XCircle size={13} />
                              </button>
                            )}
                            <button
                              onClick={() => setCommentToDelete(comment)}
                              className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-all"
                              title="Delete"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-3 py-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">
                    {startIndex + 1}–{Math.min(startIndex + COMMENTS_PER_PAGE, filtered.length)} of {filtered.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-1.5 border border-gray-200 rounded-lg hover:bg-[#F9F9F8] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft size={13} className="text-gray-500" />
                    </button>
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let p = i + 1;
                      if (totalPages > 5) {
                        if (currentPage <= 3) p = i + 1;
                        else if (currentPage >= totalPages - 2) p = totalPages - 4 + i;
                        else p = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={p}
                          onClick={() => setCurrentPage(p)}
                          className={`min-w-[28px] h-7 px-1.5 rounded-lg text-xs font-bold transition-all ${
                            currentPage === p
                              ? "bg-[#F97316] text-white shadow-sm shadow-orange-200"
                              : "border border-gray-200 text-gray-500 hover:bg-[#F9F9F8]"
                          }`}
                          style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                          {p}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-1.5 border border-gray-200 rounded-lg hover:bg-[#F9F9F8] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight size={13} className="text-gray-500" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ── Bulk Delete Modal ─────────────────────────────────────────────────── */}
      {showBulkDeleteConfirm && (
        <AdminModal
          title="Delete Multiple Comments"
          onCancel={() => setShowBulkDeleteConfirm(false)}
          onConfirm={handleBulkDelete}
          confirmLabel={`Delete ${selectedComments.size} Comment${selectedComments.size > 1 ? "s" : ""}`}
          danger
        >
          <p className="text-gray-600 text-xs">
            Delete{" "}
            <span className="font-bold text-[#111]">{selectedComments.size}</span>{" "}
            selected comment{selectedComments.size > 1 ? "s" : ""}? This cannot be undone.
          </p>
        </AdminModal>
      )}

      {/* ── Single Delete Modal ───────────────────────────────────────────────── */}
      {commentToDelete && (
        <AdminModal
          title="Delete Comment"
          onCancel={() => setCommentToDelete(null)}
          onConfirm={handleDeleteConfirm}
          confirmLabel="Delete Comment"
          danger
        >
          <p className="text-gray-500 text-xs mb-3">This action cannot be undone.</p>
          <div className="bg-[#F9F9F8] border border-gray-100 rounded-lg p-3">
            <p className="text-xs font-semibold text-[#111]">{commentToDelete.authorName}</p>
            <p className="text-[10px] text-gray-400 mb-1.5">{commentToDelete.authorEmail}</p>
            <p className="text-xs text-gray-500 line-clamp-3">{commentToDelete.content}</p>
          </div>
        </AdminModal>
      )}

      {/* ── View Detail Modal ─────────────────────────────────────────────────── */}
      {selectedComment && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden">

            {/* Modal header */}
            <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black"
                  style={{ background: "linear-gradient(135deg, #F97316, #FDBA74)", fontFamily: "'Syne', sans-serif" }}
                >
                  {selectedComment.authorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#111]" style={{ fontFamily: "'Syne', sans-serif" }}>
                    Comment Detail
                  </h3>
                  <p className="text-[10px] text-gray-400">{selectedComment.authorEmail}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedComment(null)}
                className="p-1 hover:bg-[#F9F9F8] rounded-lg transition-all"
              >
                <XCircle size={16} className="text-gray-400" />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-5 overflow-y-auto space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-base"
                  style={{ background: "linear-gradient(135deg, #F97316, #FDBA74)", fontFamily: "'Syne', sans-serif" }}
                >
                  {selectedComment.authorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-[#111] text-sm">{selectedComment.authorName}</p>
                  <p className="text-xs text-gray-500">{selectedComment.authorEmail}</p>
                  <div className="mt-1 scale-90 origin-left">{statusBadge(selectedComment.status)}</div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.14em]"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  Blog Post
                </label>
                <a
                  href={`https://blog.botmartz.com/${getBlogSlug(selectedComment.blogId)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 mt-1 text-xs text-[#F97316] hover:underline font-medium"
                >
                  {getBlogTitle(selectedComment.blogId)}
                  <ExternalLink size={10} />
                </a>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.14em]"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  Submitted
                </label>
                <p className="mt-1 text-xs text-gray-600">{formatDate(selectedComment.createdAt)}</p>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.14em]"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  Comment
                </label>
                <div className="mt-1.5 bg-[#F9F9F8] border border-gray-100 rounded-lg p-3">
                  <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {selectedComment.content}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedComment(null)}
                className="px-3 py-1.5 border border-gray-200 hover:bg-[#F9F9F8] text-gray-500 rounded-lg text-xs font-medium transition-all"
              >
                Close
              </button>
              {selectedComment.status !== "approved" && (
                <button
                  onClick={() => { handleApprove(selectedComment.id); setSelectedComment(null); }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-semibold transition-all"
                >
                  <CheckCircle2 size={13} /> Approve
                </button>
              )}
              {selectedComment.status !== "rejected" && (
                <button
                  onClick={() => { handleReject(selectedComment.id); setSelectedComment(null); }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-all"
                >
                  <XCircle size={13} /> Reject
                </button>
              )}
              <button
                onClick={() => { setSelectedComment(null); setCommentToDelete(selectedComment); }}
                className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 hover:bg-[#F9F9F8] text-gray-500 rounded-lg text-xs font-medium transition-all"
              >
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Shared modal shell ─────────────────────────────────────────────────────────
function AdminModal({
  title, children, onCancel, onConfirm, confirmLabel, danger,
}: {
  title: string;
  children: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel: string;
  danger?: boolean;
}) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-gray-100 rounded-xl shadow-2xl max-w-sm w-full overflow-hidden">
        <div className={`px-5 py-3 border-b flex items-center gap-3 ${danger ? "border-red-100 bg-red-50/50" : "border-gray-100"}`}>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${danger ? "bg-red-100" : "bg-orange-50"}`}>
            <AlertTriangle size={15} className={danger ? "text-red-500" : "text-[#F97316]"} />
          </div>
          <h3 className="text-sm font-black text-[#111]" style={{ fontFamily: "'Syne', sans-serif" }}>
            {title}
          </h3>
        </div>
        <div className="p-5">{children}</div>
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 border border-gray-200 hover:bg-[#F9F9F8] text-gray-500 rounded-lg text-xs font-medium transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all ${
              danger ? "bg-red-600 hover:bg-red-700" : "bg-[#F97316] hover:bg-[#EA6000] shadow-sm shadow-orange-200"
            }`}
          >
            <Trash2 size={13} /> {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}