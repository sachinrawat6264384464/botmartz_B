"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface ShareButton {
  label: string;
  color: string;
  icon: React.ReactNode;
  fn: () => void;
}

interface FloatingSideBarProps {
  shareButtons: ShareButton[];
  hasLiked: boolean;
  isLiking: boolean;
  likes: number;
  onLike: () => void;
}

const T = {
  border: "rgba(0,0,0,0.08)",
  muted: "#6B7280",
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

export default function FloatingSideBar({
  shareButtons,
  hasLiked,
  isLiking,
  likes,
  onLike,
}: FloatingSideBarProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6, ease: T.ease }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-3"
    >
      <div
        className="flex flex-col items-center gap-2.5 p-2.5 rounded-2xl border"
        style={{
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(20px)",
          borderColor: T.border,
          boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
        }}
      >
        {shareButtons.map(({ label, color, icon, fn }) => (
          <motion.button
            key={label}
            onClick={fn}
            whileHover={{ scale: 1.15, y: -1 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:shadow-md"
            style={{
              color,
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            aria-label={label}
          >
            {icon}
          </motion.button>
        ))}

        <div className="w-6 h-px my-1" style={{ background: T.border }} />

        <motion.button
          onClick={onLike}
          disabled={hasLiked || isLiking}
          whileHover={!hasLiked ? { scale: 1.15 } : {}}
          whileTap={!hasLiked ? { scale: 0.9 } : {}}
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{
            color: hasLiked ? "#EF4444" : T.muted,
            background: "transparent",
            border: "none",
            cursor: hasLiked ? "default" : "pointer",
          }}
          aria-label={hasLiked ? "Liked" : "Like"}
        >
          <Heart size={16} className={hasLiked ? "fill-current" : ""} />
        </motion.button>

        <span className="text-[11px] font-bold" style={{ color: T.muted }}>
          {likes}
        </span>
      </div>
    </motion.aside>
  );
}
