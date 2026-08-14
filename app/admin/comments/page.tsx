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

const interTight = { className: "" };

interface Comment {
  id: string;
  blogId?: string;
  postSlug?: string;
  // Support both old admin-created schema and new public form schema
  authorName?: string;
  authorEmail?: string;
  name?: string;
  email?: string;
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

  // ── Normalizer helpers — support both old and new comment schemas
  const getAuthorName = (c: Comment) => c.authorName || c.name || "Anonymous";
  const getAuthorEmail = (c: Comment) => c.authorEmail || c.email || "";
  const getBlogRef = (c: Comment) => c.blogId || c.postSlug || (c as any).blogSlug || (c as any).articleSlug || "";

  const getBlogTitle = (blogRef: string, c?: Comment) => {
    const explicitTitle = (c as any)?.postTitle || (c as any)?.blogTitle;
    if (explicitTitle && explicitTitle !== "Unknown Post") return explicitTitle;

    if (!blogRef) return "General Discussion";

    const found = blogPosts.find(
      (b) => b.id === blogRef || b.slug === blogRef
    );
    if (found) return found.title;

    // Clean fallback: format slug into readable title
    return blogRef
      .replace(/-/g, " ")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getBlogSlug = (blogRef: string, c?: Comment) => {
    if (c?.postSlug) return c.postSlug;
    if (!blogRef) return "";
    const found = blogPosts.find(
      (b) => b.id === blogRef || b.slug === blogRef
    );
    return found?.slug || blogRef;
  };

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
    const blogRef = getBlogRef(c);
    const title = getBlogTitle(blogRef).toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchSearch = !q ||
      getAuthorName(c).toLowerCase().includes(q) ||
      getAuthorEmail(c).toLowerCase().includes(q) ||
      (c.content?.toLowerCase() || "").includes(q) ||
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
      i + 1, getAuthorName(c), getAuthorEmail(c),
      getBlogTitle(getBlogRef(c)), (c.content || "").replace(/"/g, '""'),
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
      pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      approved: "bg-green-500/10 text-green-400 border-green-500/20",
      rejected: "bg-red-500/10 text-red-400 border-red-500/20",
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
          <div className="w-5 h-5 rounded-full border-2 border-admin-border border-t-admin-accent animate-spin" />
          <p className="text-xs text-admin-text-muted">Loading comments…</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${interTight.className} p-6 w-full text-admin-text`}>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-admin-text">Comments</h1>
            <p className="text-sm text-admin-text-muted mt-0.5">Moderate and manage reader comments</p>
          </div>
          <div className="flex items-center gap-2">
            {selectedComments.size > 0 && (
              <button
                onClick={() => setShowBulkDeleteConfirm(true)}
                className="flex items-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl text-xs font-semibold transition-all shadow-sm"
              >
                <Trash2 size={13} />
                Delete ({selectedComments.size})
              </button>
            )}
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-3 py-2 bg-admin-bg border border-admin-border hover:bg-admin-bg/60 text-admin-text-muted hover:text-admin-text rounded-xl text-xs font-semibold transition-all shadow-sm"
            >
              <Download size={13} />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Comments", value: counts.all, icon: MessageCircle, bg: "bg-admin-accent/10", border: "border-admin-accent/20", color: "text-admin-accent" },
          { label: "Pending", value: counts.pending, icon: MessageCircle, bg: "bg-amber-500/10", border: "border-amber-500/20", color: "text-amber-500" },
          { label: "Approved", value: counts.approved, icon: CheckCircle2, bg: "bg-green-500/10", border: "border-green-500/20", color: "text-green-400" },
          { label: "Rejected", value: counts.rejected, icon: XCircle, bg: "bg-red-500/10", border: "border-red-500/20", color: "text-red-400" },
        ].map(({ label, value, icon: Icon, bg, border, color }) => (
          <div key={label} className="bg-admin-card border border-admin-border rounded-2xl p-5 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 ${bg} ${border} border rounded-xl flex items-center justify-center`}>
                <Icon size={18} className={color} />
              </div>
            </div>
            <p className="text-3xl font-bold text-admin-text tracking-tight">{value}</p>
            <p className="text-xs font-semibold text-admin-text-muted mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Main Table Card */}
      <div className="bg-admin-card border border-admin-border rounded-2xl overflow-hidden shadow-sm">

        {/* Filters */}
        <div className="px-5 py-4 border-b border-admin-border flex flex-col md:flex-row gap-3 bg-admin-card">
          <div className="flex-1 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-muted" />
            <input
              type="text"
              placeholder="Search author, email, content…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-admin-bg border border-admin-border rounded-xl text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent transition-all"
            />
          </div>
          <div className="flex gap-1 bg-admin-bg rounded-xl p-1 border border-admin-border">
            {(["all", "pending", "approved", "rejected"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${
                  statusFilter === s
                    ? "bg-admin-card text-admin-text shadow-sm border border-admin-border"
                    : "text-admin-text-muted hover:text-admin-text"
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
            <div className="w-12 h-12 bg-admin-bg border border-admin-border rounded-2xl flex items-center justify-center mb-3">
              <MessageCircle size={20} className="text-admin-text-muted" />
            </div>
            <p className="text-sm font-semibold text-admin-text-muted">No comments found</p>
            <p className="text-xs text-admin-text-muted/70 mt-1">
              {searchQuery ? "Try a different search" : "Comments will appear here once submitted"}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto bg-admin-card">
              <table className="w-full">
                <thead className="border-b border-admin-border bg-admin-bg/50">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedComments.size === paginated.length && paginated.length > 0}
                        onChange={handleSelectAll}
                        className="w-3.5 h-3.5 cursor-pointer rounded accent-admin-accent"
                      />
                    </th>
                    {["#", "Author", "Blog Post", "Comment", "Status", "Date", "Actions"].map((h) => (
                      <th
                        key={h}
                        className="px-3 py-3 text-left text-[10px] font-semibold text-admin-text-muted uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-admin-border bg-admin-card">
                  {paginated.map((comment, idx) => (
                    <tr key={comment.id} className="hover:bg-admin-bg/40 transition-colors">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedComments.has(comment.id)}
                          onChange={() => toggleSelect(comment.id)}
                          className="w-3.5 h-3.5 cursor-pointer rounded accent-admin-accent"
                        />
                      </td>
                      <td className="px-3 py-3 text-xs text-admin-text-muted">{startIndex + idx + 1}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-admin-bg flex items-center justify-center text-admin-text-muted text-[10px] font-bold shrink-0 border border-admin-border">
                            {getAuthorName(comment).charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-admin-text">{getAuthorName(comment)}</div>
                            <div className="text-[10px] text-admin-text-muted">{getAuthorEmail(comment)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <a
                          href={`/insights/${getBlogSlug(getBlogRef(comment), comment)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-admin-text-muted hover:text-admin-accent transition-colors max-w-[150px] truncate block"
                        >
                          {getBlogTitle(getBlogRef(comment), comment)}
                        </a>
                      </td>
                      <td className="px-3 py-3">
                        <p className="text-xs text-admin-text-muted max-w-[180px] truncate">{comment.content}</p>
                      </td>
                      <td className="px-3 py-3">{statusBadge(comment.status)}</td>
                      <td className="px-3 py-3 text-[10px] text-admin-text-muted whitespace-nowrap">
                        {formatDate(comment.createdAt)}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setSelectedComment(comment)}
                            className="p-1.5 hover:bg-admin-accent/10 text-admin-text-muted hover:text-admin-accent rounded-lg transition-all"
                            title="View"
                          >
                            <Eye size={13} />
                          </button>
                          {comment.status !== "approved" && (
                            <button
                              onClick={() => handleApprove(comment.id)}
                              className="p-1.5 hover:bg-green-500/10 text-admin-text-muted hover:text-green-500 rounded-lg transition-all"
                              title="Approve"
                            >
                              <CheckCircle2 size={13} />
                            </button>
                          )}
                          {comment.status !== "rejected" && (
                            <button
                              onClick={() => handleReject(comment.id)}
                              className="p-1.5 hover:bg-red-500/10 text-admin-text-muted hover:text-red-500 rounded-lg transition-all"
                              title="Reject"
                            >
                              <XCircle size={13} />
                            </button>
                          )}
                          <button
                            onClick={() => setCommentToDelete(comment)}
                            className="p-1.5 hover:bg-red-500/10 text-admin-text-muted hover:text-red-500 rounded-lg transition-all"
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
              <div className="px-5 py-3 border-t border-admin-border flex items-center justify-between bg-admin-card">
                <span className="text-xs text-admin-text-muted">
                  Showing {startIndex + 1}–{Math.min(startIndex + COMMENTS_PER_PAGE, filtered.length)} of {filtered.length}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 border border-admin-border rounded-lg hover:bg-admin-bg disabled:opacity-30 disabled:cursor-not-allowed transition-all text-admin-text-muted hover:text-admin-text"
                  >
                    <ChevronLeft size={13} className="text-inherit" />
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
                            ? "bg-admin-accent text-white"
                            : "border border-admin-border text-admin-text-muted hover:bg-admin-bg hover:text-admin-text"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 border border-admin-border rounded-lg hover:bg-admin-bg disabled:opacity-30 disabled:cursor-not-allowed transition-all text-admin-text-muted hover:text-admin-text"
                  >
                    <ChevronRight size={13} className="text-inherit" />
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
          <p className="text-sm text-admin-text-muted">
            Delete <span className="font-semibold text-admin-text">{selectedComments.size}</span> selected comment{selectedComments.size > 1 ? "s" : ""}? This cannot be undone.
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
          <p className="text-sm text-admin-text-muted mb-3">This action cannot be undone.</p>
          <div className="bg-admin-bg border border-admin-border rounded-xl p-3">
            <p className="text-sm font-semibold text-admin-text">{getAuthorName(commentToDelete)}</p>
            <p className="text-xs text-admin-text-muted mb-1.5">{getAuthorEmail(commentToDelete)}</p>
            <p className="text-xs text-admin-text-muted line-clamp-3">{commentToDelete.content}</p>
          </div>
        </ConfirmModal>
      )}

      {/* View Detail Modal */}
      {selectedComment && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`${interTight.className} bg-admin-card border border-admin-border rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden`}>
            <div className="px-5 py-4 border-b border-admin-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-admin-bg rounded-xl border border-admin-border flex items-center justify-center text-admin-text-muted text-sm font-bold shrink-0">
                  {getAuthorName(selectedComment).charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-admin-text">Comment Detail</h3>
                  <p className="text-xs text-admin-text-muted">{getAuthorEmail(selectedComment)}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedComment(null)}
                className="p-1.5 hover:bg-admin-bg text-admin-text-muted hover:text-admin-text rounded-lg transition-all"
              >
                <XCircle size={16} />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-admin-bg border border-admin-border flex items-center justify-center text-admin-text-muted font-bold text-base">
                  {getAuthorName(selectedComment).charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-admin-text text-sm">{getAuthorName(selectedComment)}</p>
                  <p className="text-xs text-admin-text-muted">{getAuthorEmail(selectedComment)}</p>
                  <div className="mt-1">{statusBadge(selectedComment.status)}</div>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-admin-text-muted uppercase tracking-wider mb-1">Blog Post</p>
                <a
                  href={`/insights/${getBlogSlug(getBlogRef(selectedComment), selectedComment)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-admin-accent hover:underline font-medium"
                >
                  {getBlogTitle(getBlogRef(selectedComment), selectedComment)}
                  <ExternalLink size={10} />
                </a>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-admin-text-muted uppercase tracking-wider mb-1">Submitted</p>
                <p className="text-xs text-admin-text-muted">{formatDate(selectedComment.createdAt)}</p>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-admin-text-muted uppercase tracking-wider mb-1.5">Comment</p>
                <div className="bg-admin-bg border border-admin-border rounded-xl p-3">
                  <p className="text-sm text-admin-text-muted leading-relaxed whitespace-pre-wrap">
                    {selectedComment.content}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-admin-border flex items-center justify-end gap-2 bg-admin-bg/10">
              <button
                onClick={() => setSelectedComment(null)}
                className="px-3 py-2 border border-admin-border hover:bg-admin-bg text-admin-text-muted hover:text-admin-text rounded-xl text-xs font-medium transition-all"
              >
                Close
              </button>
              {selectedComment.status !== "approved" && (
                <button
                  onClick={() => { handleApprove(selectedComment.id); setSelectedComment(null); }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/20 rounded-xl text-xs font-semibold transition-all"
                >
                  <CheckCircle2 size={13} /> Approve
                </button>
              )}
              {selectedComment.status !== "rejected" && (
                <button
                  onClick={() => { handleReject(selectedComment.id); setSelectedComment(null); }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl text-xs font-semibold transition-all"
                >
                  <XCircle size={13} /> Reject
                </button>
              )}
              <button
                onClick={() => { setSelectedComment(null); setCommentToDelete(selectedComment); }}
                className="flex items-center gap-1.5 px-3 py-2 border border-admin-border hover:bg-red-500/10 hover:border-red-500/20 text-admin-text-muted hover:text-red-500 rounded-xl text-xs font-medium transition-all"
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-admin-card border border-admin-border rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
        <div className="px-5 py-4 border-b border-red-500/20 bg-red-500/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
            <AlertTriangle size={15} className="text-red-500" />
          </div>
          <h3 className="text-sm font-semibold text-admin-text">{title}</h3>
        </div>
        <div className="p-5 text-admin-text">{children}</div>
        <div className="px-5 py-4 border-t border-admin-border flex items-center justify-end gap-2 bg-admin-bg/10">
          <button
            onClick={onCancel}
            className="px-3 py-2 border border-admin-border hover:bg-admin-bg text-admin-text-muted hover:text-admin-text rounded-xl text-xs font-medium transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center gap-1.5 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl text-xs font-semibold transition-all"
          >
            <Trash2 size={13} /> {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
