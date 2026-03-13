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
  ExternalLink,
} from "lucide-react";
import { Inter_Tight } from "next/font/google";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

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

  // Reset page on filter/search change
  useEffect(() => { setCurrentPage(1); }, [statusFilter, searchQuery]);

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
      <div className={`${interTight.className} flex items-center justify-center h-64`}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-gray-200 border-t-gray-600 animate-spin" />
          <p className="text-xs text-gray-400">Loading comments…</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${interTight.className} p-6 max-w-[1400px]`}>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Comments</h1>
            <p className="text-sm text-gray-500 mt-0.5">Moderate and manage reader comments</p>
          </div>
          <div className="flex items-center gap-2">
            {selectedComments.size > 0 && (
              <button
                onClick={() => setShowBulkDeleteConfirm(true)}
                className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition-all shadow-sm"
              >
                <Trash2 size={13} />
                Delete ({selectedComments.size})
              </button>
            )}
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 rounded-xl text-xs font-semibold transition-all shadow-sm"
            >
              <Download size={13} />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Comments", value: counts.all, icon: MessageCircle, bg: "bg-blue-50", border: "border-blue-100", color: "text-blue-600" },
          { label: "Pending", value: counts.pending, icon: MessageCircle, bg: "bg-amber-50", border: "border-amber-100", color: "text-amber-600" },
          { label: "Approved", value: counts.approved, icon: CheckCircle2, bg: "bg-green-50", border: "border-green-100", color: "text-green-600" },
          { label: "Rejected", value: counts.rejected, icon: XCircle, bg: "bg-red-50", border: "border-red-100", color: "text-red-600" },
        ].map(({ label, value, icon: Icon, bg, border, color }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 ${bg} ${border} border rounded-xl flex items-center justify-center`}>
                <Icon size={18} className={color} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
            <p className="text-xs font-semibold text-gray-600 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

        {/* Filters */}
        <div className="px-5 py-4 border-b border-gray-100 flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search author, email, content…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
          </div>
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            {(["all", "pending", "approved", "rejected"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${
                  statusFilter === s
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {s}
                {s !== "all" && (
                  <span className="ml-1 opacity-60">({counts[s]})</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Table or empty */}
        {paginated.length === 0 ? (
          <div className="py-24 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mb-3">
              <MessageCircle size={20} className="text-gray-300" />
            </div>
            <p className="text-sm font-semibold text-gray-500">No comments found</p>
            <p className="text-xs text-gray-400 mt-1">
              {searchQuery ? "Try a different search" : "Comments will appear here once submitted"}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-100 bg-gray-50/70">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedComments.size === paginated.length && paginated.length > 0}
                        onChange={handleSelectAll}
                        className="w-3.5 h-3.5 cursor-pointer rounded accent-gray-900"
                      />
                    </th>
                    {["#", "Author", "Blog Post", "Comment", "Status", "Date", "Actions"].map((h) => (
                      <th
                        key={h}
                        className="px-3 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paginated.map((comment, idx) => (
                    <tr key={comment.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedComments.has(comment.id)}
                          onChange={() => toggleSelect(comment.id)}
                          className="w-3.5 h-3.5 cursor-pointer rounded accent-gray-900"
                        />
                      </td>
                      <td className="px-3 py-3 text-xs text-gray-400">{startIndex + idx + 1}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-[10px] font-bold shrink-0">
                            {comment.authorName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-gray-900">{comment.authorName}</div>
                            <div className="text-[10px] text-gray-400">{comment.authorEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <a
                          href={`https://blog.botmartz.com/${getBlogSlug(comment.blogId)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-600 hover:text-gray-900 transition-colors max-w-[150px] truncate block"
                        >
                          {getBlogTitle(comment.blogId)}
                        </a>
                      </td>
                      <td className="px-3 py-3">
                        <p className="text-xs text-gray-500 max-w-[180px] truncate">{comment.content}</p>
                      </td>
                      <td className="px-3 py-3">{statusBadge(comment.status)}</td>
                      <td className="px-3 py-3 text-[10px] text-gray-400 whitespace-nowrap">
                        {formatDate(comment.createdAt)}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setSelectedComment(comment)}
                            className="p-1.5 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-lg transition-all"
                            title="View"
                          >
                            <Eye size={13} />
                          </button>
                          {comment.status !== "approved" && (
                            <button
                              onClick={() => handleApprove(comment.id)}
                              className="p-1.5 hover:bg-green-50 text-gray-400 hover:text-green-600 rounded-lg transition-all"
                              title="Approve"
                            >
                              <CheckCircle2 size={13} />
                            </button>
                          )}
                          {comment.status !== "rejected" && (
                            <button
                              onClick={() => handleReject(comment.id)}
                              className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-all"
                              title="Reject"
                            >
                              <XCircle size={13} />
                            </button>
                          )}
                          <button
                            onClick={() => setCommentToDelete(comment)}
                            className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-all"
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
              <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  Showing {startIndex + 1}–{Math.min(startIndex + COMMENTS_PER_PAGE, filtered.length)} of {filtered.length}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
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
                        className={`min-w-7 h-7 px-1.5 rounded-lg text-xs font-semibold transition-all ${
                          currentPage === p
                            ? "bg-gray-900 text-white"
                            : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight size={13} className="text-gray-500" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Bulk Delete Modal */}
      {showBulkDeleteConfirm && (
        <ConfirmModal
          title="Delete Multiple Comments"
          onCancel={() => setShowBulkDeleteConfirm(false)}
          onConfirm={handleBulkDelete}
          confirmLabel={`Delete ${selectedComments.size} Comment${selectedComments.size > 1 ? "s" : ""}`}
        >
          <p className="text-sm text-gray-500">
            Delete <span className="font-semibold text-gray-900">{selectedComments.size}</span> selected comment{selectedComments.size > 1 ? "s" : ""}? This cannot be undone.
          </p>
        </ConfirmModal>
      )}

      {/* Single Delete Modal */}
      {commentToDelete && (
        <ConfirmModal
          title="Delete Comment"
          onCancel={() => setCommentToDelete(null)}
          onConfirm={handleDeleteConfirm}
          confirmLabel="Delete Comment"
        >
          <p className="text-sm text-gray-500 mb-3">This action cannot be undone.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
            <p className="text-sm font-semibold text-gray-900">{commentToDelete.authorName}</p>
            <p className="text-xs text-gray-400 mb-1.5">{commentToDelete.authorEmail}</p>
            <p className="text-xs text-gray-500 line-clamp-3">{commentToDelete.content}</p>
          </div>
        </ConfirmModal>
      )}

      {/* View Detail Modal */}
      {selectedComment && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`${interTight.className} bg-white border border-gray-200 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden`}>
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center text-gray-700 text-sm font-bold shrink-0">
                  {selectedComment.authorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Comment Detail</h3>
                  <p className="text-xs text-gray-400">{selectedComment.authorEmail}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedComment(null)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-all"
              >
                <XCircle size={16} className="text-gray-400" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-bold text-base">
                  {selectedComment.authorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{selectedComment.authorName}</p>
                  <p className="text-xs text-gray-500">{selectedComment.authorEmail}</p>
                  <div className="mt-1">{statusBadge(selectedComment.status)}</div>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Blog Post</p>
                <a
                  href={`https://blog.botmartz.com/${getBlogSlug(selectedComment.blogId)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-blue-600 hover:underline font-medium"
                >
                  {getBlogTitle(selectedComment.blogId)}
                  <ExternalLink size={10} />
                </a>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Submitted</p>
                <p className="text-xs text-gray-600">{formatDate(selectedComment.createdAt)}</p>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Comment</p>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {selectedComment.content}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedComment(null)}
                className="px-3 py-2 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-xl text-xs font-medium transition-all"
              >
                Close
              </button>
              {selectedComment.status !== "approved" && (
                <button
                  onClick={() => { handleApprove(selectedComment.id); setSelectedComment(null); }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-semibold transition-all"
                >
                  <CheckCircle2 size={13} /> Approve
                </button>
              )}
              {selectedComment.status !== "rejected" && (
                <button
                  onClick={() => { handleReject(selectedComment.id); setSelectedComment(null); }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition-all"
                >
                  <XCircle size={13} /> Reject
                </button>
              )}
              <button
                onClick={() => { setSelectedComment(null); setCommentToDelete(selectedComment); }}
                className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-xl text-xs font-medium transition-all"
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

function ConfirmModal({
  title, children, onCancel, onConfirm, confirmLabel,
}: {
  title: string;
  children: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel: string;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
        <div className="px-5 py-4 border-b border-red-100 bg-red-50/50 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center">
            <AlertTriangle size={15} className="text-red-500" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="p-5">{children}</div>
        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-2 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-xl text-xs font-medium transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center gap-1.5 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition-all"
          >
            <Trash2 size={13} /> {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
