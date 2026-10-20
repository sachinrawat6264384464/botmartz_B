'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  User,
  Mail as MailIcon,
  Edit2,
  MessageSquare,
} from 'lucide-react';
const CookieHelper = {
  get: (name: string) => {
    if (typeof document === 'undefined') return undefined;
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : undefined;
  },
  set: (name: string, value: string, options?: { expires?: number }) => {
    if (typeof document === 'undefined') return;
    const days = options?.expires || 365;
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  }
};

/* ─── Design tokens (mirror BlogPostClient) ───────────────────────────── */
const T = {
  org: '#F97316',
  orgLight: '#FDBA74',
  orgGlow: 'rgba(249,115,22,0.15)',
  blk: '#0A0A0A',
  ink: '#111111',
  muted: '#6B7280',
  subtle: '#9CA3AF',
  surface: '#FAFAF9',
  card: '#FFFFFF',
  border: 'rgba(0,0,0,0.06)',
  fontDisplay: "'Syne', sans-serif",
  fontBody: "'DM Sans', sans-serif",
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

interface CommentFormProps {
  blogId: string;
  onCommentSubmitted: () => void;
}

const COOKIE_NAME = 'commentAuthor';
const COOKIE_EXPIRY = 365;

export default function CommentForm({ blogId, onCommentSubmitted }: CommentFormProps) {
  const [formData, setFormData] = useState({
    authorName: '',
    authorEmail: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [hasStoredData, setHasStoredData] = useState(false);
  const [showFullForm, setShowFullForm] = useState(false);

  /* Load saved cookie on mount */
  useEffect(() => {
    const savedData = CookieHelper.get(COOKIE_NAME);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData((prev) => ({
          ...prev,
          authorName: parsed.authorName || '',
          authorEmail: parsed.authorEmail || '',
        }));
        setHasStoredData(true);
      } catch {
        /* ignore parse errors */
      }
    } else {
      setShowFullForm(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.authorName.trim()) { setError('Please enter your name.'); return false; }
    if (formData.authorName.trim().length < 2) { setError('Name must be at least 2 characters.'); return false; }
    if (!formData.authorEmail.trim()) { setError('Please enter your email.'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.authorEmail)) { setError('Please enter a valid email address.'); return false; }
    if (!formData.content.trim()) { setError('Please write a comment.'); return false; }
    if (formData.content.trim().length < 10) { setError('Comment must be at least 10 characters.'); return false; }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, blogId }),
      });
      const data = await response.json();

      if (data.success) {
        CookieHelper.set(
          COOKIE_NAME,
          JSON.stringify({ authorName: formData.authorName, authorEmail: formData.authorEmail }),
          { expires: COOKIE_EXPIRY },
        );
        setSuccess(true);
        setFormData((prev) => ({ ...prev, content: '' }));
        setHasStoredData(true);
        setShowFullForm(false);
        setTimeout(() => {
          setSuccess(false);
          onCommentSubmitted();
        }, 3000);
      } else {
        setError(data.error || 'Failed to submit comment. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Shared input focus/blur inline handlers ─────────────────────── */
  const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = T.org;
    e.currentTarget.style.boxShadow = `0 0 0 3px ${T.orgGlow}`;
  };
  const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = T.border;
    e.currentTarget.style.boxShadow = 'none';
  };

  const sharedInputStyle: React.CSSProperties = {
    background: T.surface,
    border: `1px solid ${T.border}`,
    color: T.ink,
    outline: 'none',
    fontFamily: T.fontBody,
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    transition: 'all 0.2s',
  };

  /* ── Shared status messages ──────────────────────────────────────── */
  const StatusMessage = () => (
    <AnimatePresence>
      {(error || success) && (
        <motion.div
          initial={{ opacity: 0, y: -8, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -8, height: 0 }}
          transition={{ duration: 0.3 }}
          className={`flex items-start gap-3 p-4 rounded-xl ${
            success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}
          role="alert"
          aria-live="polite"
        >
          {success ? (
            <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
          ) : (
            <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
          )}
          <div>
            {success ? (
              <>
                <p className="text-sm font-semibold text-green-700">Comment submitted successfully!</p>
                <p className="text-xs mt-0.5 text-green-600">
                  Your comment will appear after admin approval. Thank you!
                </p>
              </>
            ) : (
              <p className="text-sm font-medium text-red-700">{error}</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  /* ── Submit button ───────────────────────────────────────────────── */
  const SubmitButton = ({ fullWidth = false }: { fullWidth?: boolean }) => (
    <motion.button
      type="submit"
      disabled={loading || success}
      whileHover={!loading && !success ? { scale: 1.03, y: -1 } : {}}
      whileTap={!loading && !success ? { scale: 0.97 } : {}}
      className={`flex items-center justify-center gap-2.5 py-3 text-white font-black text-sm rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
        fullWidth ? 'w-full' : 'px-7'
      }`}
      style={{
        fontFamily: T.fontDisplay,
        background: loading || success
          ? T.subtle
          : `linear-gradient(135deg, ${T.org}, ${T.orgLight})`,
        boxShadow: loading || success ? 'none' : `0 6px 24px ${T.orgGlow}`,
        border: 'none',
        cursor: loading || success ? 'not-allowed' : 'pointer',
        letterSpacing: '-0.01em',
      }}
      aria-label={success ? 'Comment submitted' : 'Post your comment'}
    >
      {loading ? (
        <>
          <Loader2 size={16} className="animate-spin" aria-hidden="true" />
          <span>Posting…</span>
        </>
      ) : success ? (
        <>
          <CheckCircle2 size={16} aria-hidden="true" />
          <span>Submitted!</span>
        </>
      ) : (
        <>
          <Send size={16} aria-hidden="true" />
          <span>Post Comment</span>
        </>
      )}
    </motion.button>
  );

  /* ══════════════════════════════════════════════════════════════════
     RETURNING USER — Quick comment view
     ══════════════════════════════════════════════════════════════════ */
  if (hasStoredData && !showFullForm) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: T.ease }}
        className="relative overflow-hidden rounded-3xl"
        style={{
          background: T.card,
          border: `1px solid ${T.border}`,
          boxShadow: '0 8px 40px rgba(0,0,0,0.04)',
        }}
      >
        {/* Accent top stripe */}
        <div
          className="h-1"
          style={{ background: `linear-gradient(90deg, ${T.org}, ${T.orgLight}, ${T.org})` }}
        />

        <div className="p-7 md:p-8">
          {/* Header row */}
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-4">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${T.org}, ${T.orgLight})`,
                  boxShadow: `0 6px 20px ${T.orgGlow}`,
                }}
              >
                <MessageSquare size={18} className="text-white" />
              </div>
              <div>
                <h3
                  className="font-black text-base"
                  style={{ fontFamily: T.fontDisplay, color: T.ink, letterSpacing: '-0.02em' }}
                >
                  Welcome back, {formData.authorName}!
                </h3>
                <p className="text-xs mt-0.5" style={{ color: T.subtle }}>
                  Ready to share your thoughts?
                </p>
              </div>
            </div>

            <motion.button
              onClick={() => setShowFullForm(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all"
              style={{
                fontFamily: T.fontDisplay,
                color: T.org,
                background: 'rgba(249,115,22,0.06)',
                border: '1px solid rgba(249,115,22,0.15)',
                cursor: 'pointer',
              }}
              aria-label="Edit your details"
            >
              <Edit2 size={12} aria-hidden="true" />
              Edit Details
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Comment textarea */}
            <div>
              <label
                htmlFor="content-quick"
                className="flex items-center justify-between text-xs font-bold mb-2 uppercase tracking-wider"
                style={{ fontFamily: T.fontDisplay, color: T.ink }}
              >
                <span>Your Comment <span style={{ color: T.org }}>*</span></span>
                <span className="font-normal normal-case tracking-normal" style={{ color: T.subtle }}>
                  {formData.content.length} chars
                </span>
              </label>
              <textarea
                id="content-quick"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={5}
                placeholder="Share your thoughts, insights, or questions about this article…"
                disabled={loading || success}
                required
                className="w-full resize-none disabled:opacity-50"
                style={{
                  ...sharedInputStyle,
                  padding: '1rem',
                  lineHeight: 1.7,
                }}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>

            <StatusMessage />

            <div className="flex justify-end pt-1">
              <SubmitButton />
            </div>
          </form>
        </div>
      </motion.div>
    );
  }

  /* ══════════════════════════════════════════════════════════════════
     FULL FORM — New / edit details view
     ══════════════════════════════════════════════════════════════════ */
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: T.ease }}
      className="relative overflow-hidden rounded-3xl"
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        boxShadow: '0 8px 40px rgba(0,0,0,0.04)',
      }}
    >
      {/* Accent top stripe */}
      <div
        className="h-1"
        style={{ background: `linear-gradient(90deg, ${T.org}, ${T.orgLight}, ${T.org})` }}
      />

      <div className="p-7 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${T.org}, ${T.orgLight})`,
              boxShadow: `0 6px 20px ${T.orgGlow}`,
            }}
          >
            <Send size={18} className="text-white" />
          </div>
          <div>
            <h3
              className="font-black text-base"
              style={{ fontFamily: T.fontDisplay, color: T.ink, letterSpacing: '-0.02em' }}
            >
              Share Your Thoughts
            </h3>
            <p className="text-xs mt-0.5" style={{ color: T.subtle }}>
              Your perspective enriches our community
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name + Email grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label
                htmlFor="authorName"
                className="flex items-center gap-2 text-xs font-bold mb-2 uppercase tracking-wider"
                style={{ fontFamily: T.fontDisplay, color: T.ink }}
              >
                <User size={12} style={{ color: T.org }} aria-hidden="true" />
                Your Name <span style={{ color: T.org }}>*</span>
              </label>
              <input
                id="authorName"
                type="text"
                name="authorName"
                value={formData.authorName}
                onChange={handleChange}
                placeholder="John Doe"
                disabled={loading || success}
                required
                style={sharedInputStyle}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="authorEmail"
                className="flex items-center gap-2 text-xs font-bold mb-2 uppercase tracking-wider"
                style={{ fontFamily: T.fontDisplay, color: T.ink }}
              >
                <MailIcon size={12} style={{ color: T.org }} aria-hidden="true" />
                Email <span style={{ color: T.org }}>*</span>
              </label>
              <input
                id="authorEmail"
                type="email"
                name="authorEmail"
                value={formData.authorEmail}
                onChange={handleChange}
                placeholder="john@example.com"
                disabled={loading || success}
                required
                style={sharedInputStyle}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>
          </div>

          {/* Comment textarea */}
          <div>
            <label
              htmlFor="content-full"
              className="flex items-center justify-between text-xs font-bold mb-2 uppercase tracking-wider"
              style={{ fontFamily: T.fontDisplay, color: T.ink }}
            >
              <span>Your Comment <span style={{ color: T.org }}>*</span></span>
              <span className="font-normal normal-case tracking-normal" style={{ color: T.subtle }}>
                {formData.content.length} chars
              </span>
            </label>
            <textarea
              id="content-full"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={5}
              placeholder="Share your thoughts, insights, or questions about this article…"
              disabled={loading || success}
              required
              className="w-full resize-none disabled:opacity-50"
              style={{
                ...sharedInputStyle,
                padding: '1rem',
                lineHeight: 1.7,
              }}
              onFocus={inputFocus}
              onBlur={inputBlur}
            />
          </div>

          <StatusMessage />

          {/* Footer row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
            <p className="text-xs max-w-xs" style={{ color: T.subtle, fontFamily: T.fontBody }}>
              💡 Your email won't be published. All comments are moderated.
            </p>
            <SubmitButton />
          </div>
        </form>
      </div>
    </motion.div>
  );
}