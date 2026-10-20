"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail, ChevronRight, Sparkles } from "lucide-react";

interface ShareButton {
  label: string;
  color: string;
  icon: React.ReactNode;
  fn: () => void;
}

interface PostEngagementCardProps {
  likes: number;
  hasLiked: boolean;
  isLiking: boolean;
  onLike: () => void;
  onScrollToSubscribe: () => void;
  shareButtons: ShareButton[];
}

const T = {
  org: "#F97316",
  orgLight: "#FB923C",
  orgGlow: "rgba(249,115,22,0.35)",
  blk: "#0A0A0A",
  fontDisplay: "'Syne', sans-serif",
  fontBody: "'DM Sans', sans-serif",
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

export default function PostEngagementCard({
  likes,
  hasLiked,
  isLiking,
  onLike,
  onScrollToSubscribe,
  shareButtons,
}: PostEngagementCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: T.ease }}
      className="mt-20 relative overflow-hidden rounded-3xl"
      style={{ background: T.blk, boxShadow: "0 40px 100px rgba(0,0,0,0.18)" }}
      aria-labelledby="cta-heading"
    >
      {/* Ambient glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${T.orgGlow}, transparent 70%)` }}
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${T.orgGlow}, transparent 70%)` }}
      />

      {/* Top accent stripe */}
      <div
        className="h-[3px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${T.org}, ${T.orgLight}, ${T.org}, transparent)`,
        }}
      />

      {/* ── TOP HALF: Newsletter CTA ── */}
      <div className="relative z-10 px-8 md:px-12 pt-10 pb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
          {/* Left: icon + copy */}
          <div className="flex items-center gap-5 flex-1">
            <motion.div
              animate={{ rotate: [0, 6, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${T.org}, ${T.orgLight})`,
                boxShadow: `0 8px 32px ${T.orgGlow}`,
              }}
            >
              <Sparkles size={24} className="text-white" />
            </motion.div>
            <div>
              <p
                className="text-[10px] font-black uppercase tracking-[0.2em] mb-1"
                style={{ fontFamily: T.fontDisplay, color: T.org }}
              >
                Newsletter
              </p>
              <h2
                id="cta-heading"
                className="font-black text-white leading-tight"
                style={{
                  fontFamily: T.fontDisplay,
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  letterSpacing: "-0.025em",
                }}
              >
                Enjoyed this article?
              </h2>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                Weekly insights on AI, automation &amp; the future of work.
              </p>
            </div>
          </div>

          {/* Right: CTA button */}
          <motion.button
            onClick={onScrollToSubscribe}
            whileHover={{ scale: 1.05, y: -3, boxShadow: `0 16px 48px ${T.orgGlow}` }}
            whileTap={{ scale: 0.96 }}
            className="group relative overflow-hidden flex items-center gap-3 px-8 py-4 text-white rounded-2xl font-black text-sm whitespace-nowrap flex-shrink-0"
            style={{
              fontFamily: T.fontDisplay,
              background: `linear-gradient(135deg, ${T.org}, ${T.orgLight})`,
              boxShadow: `0 8px 32px ${T.orgGlow}`,
              letterSpacing: "-0.01em",
            }}
          >
            {/* Shine sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
            />
            <Mail size={16} aria-hidden="true" />
            <span>Subscribe Free</span>
            <ChevronRight size={14} aria-hidden="true" />
          </motion.button>
        </div>

        {/* Social proof strip */}
        <div
          className="flex items-center gap-6 mt-7 pt-7"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex -space-x-2">
            {["J", "A", "R", "M", "S"].map((letter, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-black text-white"
                style={{
                  background: `linear-gradient(135deg, ${T.org}, ${T.orgLight})`,
                  borderColor: T.blk,
                  fontFamily: T.fontDisplay,
                  zIndex: 5 - i,
                }}
              >
                {letter}
              </div>
            ))}
          </div>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: T.fontBody }}>
            Join <span style={{ color: T.org, fontWeight: 700 }}>2,400+</span> readers getting weekly insights
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-8 md:mx-12" style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

      {/* ── BOTTOM HALF: Like + Share ── */}
      <div className="relative z-10 px-8 md:px-12 py-7">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">

          {/* Like section */}
          <div className="flex items-center gap-4">
            <motion.button
              onClick={onLike}
              disabled={hasLiked || isLiking}
              whileHover={!hasLiked ? { scale: 1.08, y: -2 } : {}}
              whileTap={!hasLiked ? { scale: 0.92 } : {}}
              className="relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-black text-sm transition-all"
              style={{
                fontFamily: T.fontDisplay,
                background: hasLiked ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.06)",
                color: hasLiked ? "#EF4444" : "rgba(255,255,255,0.7)",
                border: hasLiked ? "1px solid rgba(239,68,68,0.25)" : "1px solid rgba(255,255,255,0.08)",
                cursor: hasLiked ? "default" : "pointer",
              }}
              aria-label={hasLiked ? "You liked this" : "Like this article"}
            >
              {hasLiked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.4, 1] }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{ background: "rgba(239,68,68,0.08)" }}
                />
              )}
              <Heart size={15} className={hasLiked ? "fill-current" : ""} aria-hidden="true" />
              <span>{likes}</span>
              <span className="text-xs font-medium opacity-60">{likes === 1 ? "like" : "likes"}</span>
            </motion.button>

            <AnimatePresence>
              {hasLiked && (
                <motion.p
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.3)", fontFamily: T.fontBody }}
                >
                  Thanks for the love! ❤️
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Share section */}
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-black uppercase tracking-[0.15em] mr-1"
              style={{ fontFamily: T.fontDisplay, color: "rgba(255,255,255,0.2)" }}
            >
              Share
            </span>
            {shareButtons.map(({ label, color, icon, fn }) => (
              <motion.button
                key={label}
                onClick={fn}
                whileHover={{ scale: 1.15, y: -3, backgroundColor: `${color}22` }}
                whileTap={{ scale: 0.88 }}
                className="group flex flex-col items-center justify-center w-11 h-11 rounded-xl transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                }}
                aria-label={label}
              >
                <span style={{ color }}>{icon}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
