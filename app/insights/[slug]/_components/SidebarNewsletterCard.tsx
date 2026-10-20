"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface NewsletterFormData {
  name: string;
  email: string;
}

type NewsletterStatus = "idle" | "loading" | "success" | "error";

interface SidebarNewsletterCardProps {
  formData: NewsletterFormData;
  newsletterStatus: NewsletterStatus;
  newsletterMessage: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const T = {
  org: "#F97316",
  orgLight: "#FB923C",
  orgGlow: "rgba(249,115,22,0.35)",
  ink: "#0F0F0F",
  border: "rgba(0,0,0,0.08)",
  subtle: "#9CA3AF",
  surface: "#F9FAFB",
  card: "#FFFFFF",
  fontDisplay: "'Syne', sans-serif",
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

export default function SidebarNewsletterCard({
  formData,
  newsletterStatus,
  newsletterMessage,
  onChange,
  onSubmit,
  onKeyPress,
}: SidebarNewsletterCardProps) {
  return (
    <motion.section
      id="newsletter-subscribe"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.35, ease: T.ease }}
      className="rounded-3xl overflow-hidden"
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        boxShadow: "0 8px 40px rgba(0,0,0,0.04)",
      }}
      aria-labelledby="newsletter-heading"
    >
      {/* Accent stripe */}
      <div
        className="h-1"
        style={{ background: `linear-gradient(90deg, ${T.org}, ${T.orgLight})` }}
      />

      <div className="p-7">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "rgba(249,115,22,0.06)",
              border: "1px solid rgba(249,115,22,0.15)",
            }}
          >
            <Mail size={16} style={{ color: T.org }} />
          </div>
          <div>
            <h2
              id="newsletter-heading"
              className="font-black text-sm"
              style={{ fontFamily: T.fontDisplay, color: T.ink }}
            >
              Stay Updated
            </h2>
            <p className="text-[11px]" style={{ color: "#6B7280" }}>
              Get insights in your inbox
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="space-y-3 mb-4"
        >
          <label htmlFor="newsletter-name" className="sr-only">
            Your name
          </label>
          <input
            id="newsletter-name"
            type="text"
            name="name"
            placeholder="Your name (optional)"
            value={formData.name}
            onChange={onChange}
            onKeyPress={onKeyPress}
            disabled={newsletterStatus === "loading"}
            className="w-full px-4 py-3 rounded-xl text-sm transition-all disabled:opacity-50"
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              color: T.ink,
              outline: "none",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = T.org;
              e.currentTarget.style.boxShadow = `0 0 0 3px ${T.orgGlow}`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = T.border;
              e.currentTarget.style.boxShadow = "none";
            }}
            // Name is now optional
          />

          <label htmlFor="newsletter-email" className="sr-only">
            Your email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={onChange}
            onKeyPress={onKeyPress}
            disabled={newsletterStatus === "loading"}
            className="w-full px-4 py-3 rounded-xl text-sm transition-all disabled:opacity-50"
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              color: T.ink,
              outline: "none",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = T.org;
              e.currentTarget.style.boxShadow = `0 0 0 3px ${T.orgGlow}`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = T.border;
              e.currentTarget.style.boxShadow = "none";
            }}
            required
          />

          <motion.button
            type="submit"
            disabled={newsletterStatus === "loading"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 font-bold rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
            style={{
              color: "#111",
              fontFamily: T.fontDisplay,
              background:
                newsletterStatus === "loading"
                  ? "#9CA3AF"
                  : `linear-gradient(135deg, ${T.org}, ${T.orgLight})`,
              boxShadow: newsletterStatus === "loading" ? "none" : `0 6px 24px ${T.orgGlow}`,
              cursor: newsletterStatus === "loading" ? "not-allowed" : "pointer",
              border: "none",
            }}
            aria-label="Subscribe to newsletter"
          >
            {newsletterStatus === "loading" ? (
              <>
                <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                <span>Subscribing…</span>
              </>
            ) : (
              "Subscribe Now"
            )}
          </motion.button>
        </form>

        <AnimatePresence>
          {newsletterMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-3 rounded-xl flex items-start gap-2.5 ${
                newsletterStatus === "success"
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
              role="alert"
              aria-live="polite"
            >
              {newsletterStatus === "success" ? (
                <CheckCircle size={15} className="text-green-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
              ) : (
                <AlertCircle size={15} className="text-red-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
              )}
              <p
                className={`text-[13px] leading-relaxed ${
                  newsletterStatus === "success" ? "text-green-700" : "text-red-700"
                }`}
              >
                {newsletterMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
