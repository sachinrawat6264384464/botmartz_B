"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Sparkles,
  Calendar,
} from "lucide-react";
import CommentForm from "./CommentForm";

/* ─── Design tokens (mirror BlogPostClient) ───────────────────────────── */
const T = {
  org: "#F97316",
  orgLight: "#FDBA74",
  orgGlow: "rgba(249,115,22,0.15)",
  blk: "#0A0A0A",
  ink: "#111111",
  muted: "#6B7280",
  subtle: "#9CA3AF",
  surface: "#FAFAF9",
  card: "#FFFFFF",
  border: "rgba(0,0,0,0.06)",
  fontDisplay: "'Syne', sans-serif",
  fontBody: "'DM Sans', sans-serif",
  fontSerif: "'Instrument Serif', serif",
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

interface Comment {
  id: string;
  blogId: string;
  authorName: string;
  authorEmail: string;
  content: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface CommentSectionProps {
  blogId: string;
}

function formatDate(dateString: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateString));
  } catch {
    return "";
  }
}

export default function CommentSection({ blogId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalComments, setTotalComments] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const commentsPerPage = 5;
  const commentsListRef = useRef<HTMLDivElement>(null);

  const fetchComments = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/comments/${blogId}?page=${page}&limit=${commentsPerPage}`,
      );
      const data = await response.json();
      if (data.success) {
        setComments(data.comments);
        setTotalComments(data.total);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  // Scroll to comment list after page change
  useEffect(() => {
    if (!loading && comments.length > 0 && currentPage > 1) {
      const timer = setTimeout(() => {
        const el = commentsListRef.current;
        if (el) {
          window.scrollTo({
            top: el.getBoundingClientRect().top + window.pageYOffset - 100,
            behavior: "smooth",
          });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading, comments, currentPage]);

  useEffect(() => {
    fetchComments(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, blogId, refreshTrigger]);

  const totalPages = Math.ceil(totalComments / commentsPerPage);

  const handleCommentSubmitted = () => {
    setCurrentPage(1);
    setRefreshTrigger((prev) => prev + 1);
  };

  const scrollToComments = () => {
    setTimeout(() => {
      const el = commentsListRef.current;
      if (el) {
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.pageYOffset - 100,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: T.surface, borderTop: `1px solid ${T.border}` }}
      aria-labelledby="comments-heading"
    >
      {/* Dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.025,
          backgroundImage: "radial-gradient(#111 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* Ghost text decoration */}
      <div
        className="absolute pointer-events-none select-none font-black leading-none -right-4 bottom-0 text-[24vw]"
        style={{
          color: "transparent",
          WebkitTextStroke: "1px rgba(249,115,22,0.04)",
          fontFamily: T.fontDisplay,
        }}
      >
        03
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 relative">

        {/* ── Header ────────────────────────────────────────────────── */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: T.ease }}
          className="mb-16"
        >
          {/* Section label */}
          <div className="flex items-center gap-4 mb-5">
            <span
              className="text-[11px] font-black opacity-40 tracking-[0.2em]"
              style={{ fontFamily: T.fontDisplay, color: T.org }}
            >
              03
            </span>
            <div className="w-10 h-px" style={{ background: T.org }} />
            <span
              className="text-[11px] font-bold tracking-[0.14em] uppercase"
              style={{ fontFamily: T.fontDisplay, color: T.org }}
            >
              Discussion
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2
                id="comments-heading"
                style={{
                  fontFamily: T.fontDisplay,
                  fontWeight: 900,
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  color: T.ink,
                }}
              >
                Join the Conversation
              </h2>
              <p className="mt-3 text-base" style={{ color: T.muted }}>
                Share your thoughts and engage with our community.
              </p>
            </div>

            {/* Comment count badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl flex-shrink-0 self-start sm:self-auto"
              style={{
                background: T.blk,
                boxShadow: `0 8px 32px rgba(0,0,0,0.12)`,
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${T.org}, ${T.orgLight})` }}
              >
                <MessageCircle size={15} className="text-white" />
              </div>
              <div>
                <p
                  className="text-[10px] font-black uppercase tracking-[0.14em] leading-none"
                  style={{ fontFamily: T.fontDisplay, color: "rgba(255,255,255,0.75)" }}
                >
                  Comments
                </p>
                <p
                  className="text-base font-black leading-tight"
                  style={{ fontFamily: T.fontDisplay, color: "#fff" }}
                >
                  {totalComments}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.header>

        {/* ── Comment Form ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: T.ease }}
          className="max-w-4xl mb-16"
        >
          <CommentForm blogId={blogId} onCommentSubmitted={handleCommentSubmitted} />
        </motion.div>

        {/* ── Comments List ─────────────────────────────────────────── */}
        <div ref={commentsListRef}>
          {loading ? (
            <div
              className="flex flex-col items-center justify-center py-24"
              role="status"
              aria-live="polite"
              aria-label="Loading comments"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: `linear-gradient(135deg, ${T.org}, ${T.orgLight})` }}
              >
                <Loader2 size={28} className="text-white animate-spin" aria-hidden="true" />
              </div>
              <p className="text-base font-medium" style={{ color: T.muted, fontFamily: T.fontDisplay }}>
                Loading comments…
              </p>
            </div>
          ) : comments.length > 0 ? (
            <div className="max-w-4xl space-y-5" role="list" aria-label="Comments">
              <AnimatePresence mode="wait">
                {comments.map((comment, i) => (
                  <motion.div
                    key={comment.id}
                    role="listitem"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, delay: i * 0.07, ease: T.ease }}
                    className="group rounded-2xl p-6 md:p-7 transition-all duration-300"
                    style={{
                      background: T.card,
                      border: `1px solid ${T.border}`,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px ${T.orgGlow}`;
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.18)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.03)";
                      (e.currentTarget as HTMLElement).style.borderColor = T.border;
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 3 }}
                        className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${T.org}, ${T.orgLight})`,
                          fontFamily: T.fontDisplay,
                          boxShadow: `0 6px 20px ${T.orgGlow}`,
                        }}
                        aria-hidden="true"
                      >
                        {comment.authorName.charAt(0).toUpperCase()}
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <h3
                            className="font-black text-base"
                            style={{ fontFamily: T.fontDisplay, color: T.ink }}
                          >
                            {comment.authorName}
                          </h3>

                          {/* Thin separator */}
                          <span
                            className="w-1 h-1 rounded-full"
                            style={{ background: T.subtle }}
                            aria-hidden="true"
                          />

                          {/* Date */}
                          <div
                            className="flex items-center gap-1.5 text-xs"
                            style={{ color: T.subtle }}
                          >
                            <Calendar size={11} aria-hidden="true" />
                            <time dateTime={comment.createdAt}>
                              {formatDate(comment.createdAt)}
                            </time>
                          </div>

                          {/* Verified badge */}
                          <span
                            className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider"
                            style={{
                              fontFamily: T.fontDisplay,
                              background: "rgba(249,115,22,0.06)",
                              color: T.org,
                              border: "1px solid rgba(249,115,22,0.15)",
                            }}
                          >
                            <Sparkles size={9} aria-hidden="true" />
                            Verified
                          </span>
                        </div>

                        {/* Left border accent line + text */}
                        <div
                          className="pl-4 border-l-2 transition-all duration-300"
                          style={{ borderColor: "rgba(249,115,22,0.15)" }}
                        >
                          <p
                            className="text-[15px] leading-relaxed whitespace-pre-wrap break-words"
                            style={{ color: T.ink, fontFamily: T.fontBody, fontWeight: 300 }}
                          >
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.nav
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-center gap-4 pt-6"
                  role="navigation"
                  aria-label="Comments pagination"
                >
                  <motion.button
                    onClick={() => {
                      setCurrentPage((prev) => Math.max(1, prev - 1));
                      scrollToComments();
                    }}
                    disabled={currentPage === 1}
                    whileHover={currentPage !== 1 ? { scale: 1.05, x: -2 } : {}}
                    whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                      fontFamily: T.fontDisplay,
                      background: T.card,
                      border: `1px solid ${T.border}`,
                      color: T.ink,
                      cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    }}
                    aria-label="Go to previous page"
                  >
                    <ChevronLeft size={16} aria-hidden="true" />
                    <span className="hidden sm:inline">Previous</span>
                  </motion.button>

                  {/* Page indicator */}
                  <div
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl"
                    style={{
                      background: T.blk,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    <span
                      className="text-sm font-bold"
                      style={{ fontFamily: T.fontDisplay, color: T.org }}
                    >
                      {currentPage}
                    </span>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
                      /
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ fontFamily: T.fontDisplay, color: "rgba(255,255,255,0.5)" }}
                    >
                      {totalPages}
                    </span>
                  </div>

                  <motion.button
                    onClick={() => {
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                      scrollToComments();
                    }}
                    disabled={currentPage === totalPages}
                    whileHover={currentPage !== totalPages ? { scale: 1.05, x: 2 } : {}}
                    whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                      fontFamily: T.fontDisplay,
                      background: `linear-gradient(135deg, ${T.org}, ${T.orgLight})`,
                      color: "#fff",
                      border: "none",
                      boxShadow: currentPage !== totalPages ? `0 4px 16px ${T.orgGlow}` : "none",
                      cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    }}
                    aria-label="Go to next page"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight size={16} aria-hidden="true" />
                  </motion.button>
                </motion.nav>
              )}
            </div>
          ) : (
            /* Empty state */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: T.ease }}
              className="max-w-2xl"
            >
              <div
                className="relative overflow-hidden text-center py-20 px-8 rounded-3xl"
                style={{
                  background: T.card,
                  border: `1.5px dashed rgba(249,115,22,0.2)`,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                }}
              >
                {/* Glow orb */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.45, 0.2] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${T.orgGlow}, transparent 70%)` }}
                />

                <div
                  className="relative w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "rgba(249,115,22,0.06)",
                    border: "1px solid rgba(249,115,22,0.15)",
                  }}
                >
                  <MessageCircle size={36} style={{ color: T.org }} aria-hidden="true" />
                </div>

                <h3
                  className="text-2xl mb-3"
                  style={{ fontFamily: T.fontDisplay, fontWeight: 900, color: T.ink, letterSpacing: "-0.02em" }}
                >
                  Start the Discussion
                </h3>

                <p className="text-base mb-6" style={{ color: T.muted }}>
                  Be the first to share your thoughts on this article!
                </p>

                <div
                  className="inline-flex items-center gap-2 font-bold text-sm"
                  style={{ fontFamily: T.fontDisplay, color: T.org }}
                >
                  <Sparkles size={15} aria-hidden="true" />
                  <span>Your insight matters</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}