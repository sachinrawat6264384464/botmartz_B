"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const T = {
  org: "#F97316",
  orgLight: "#FB923C",
  orgGlow: "rgba(249,115,22,0.35)",
  blk: "#0A0A0A",
  fontDisplay: "'Syne', sans-serif",
  fontBody: "'DM Sans', sans-serif",
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

function GlowOrb({ className = "" }: { className?: string }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.4, 1], opacity: [0.25, 0.55, 0.25] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{ background: `radial-gradient(circle, ${T.orgGlow}, transparent 70%)` }}
    />
  );
}

export default function SidebarBrandCard() {
  return (
    <motion.section
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: T.ease }}
      className="rounded-3xl relative overflow-hidden"
      style={{ background: T.blk }}
      aria-labelledby="insights-hub-heading"
    >
      {/* Ambient glow */}
      <GlowOrb className="-top-10 -right-10 w-52 h-52" />
      <GlowOrb className="-bottom-14 -left-14 w-40 h-40" />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Orange accent bar — left edge */}
      <div
        className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full"
        style={{ background: `linear-gradient(180deg, ${T.org}, ${T.orgLight}, ${T.org})` }}
      />

      <div className="relative z-10 p-7">
        {/* Logo + brand */}
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            whileHover={{ rotate: -5, scale: 1.08 }}
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${T.org}, ${T.orgLight})`,
              boxShadow: `0 6px 20px ${T.orgGlow}`,
            }}
          >
            <Image src="/Logo.png" alt="" width={22} height={22} className="rounded-md" aria-hidden="true" />
          </motion.div>
          <div>
            <h2
              id="insights-hub-heading"
              className="font-black text-white text-[15px] leading-tight"
              style={{ fontFamily: T.fontDisplay, letterSpacing: "-0.02em" }}
            >
              Botmartz Blog
            </h2>
            <p
              className="text-[10px] font-black uppercase tracking-[0.18em]"
              style={{ color: T.org }}
            >
              Intelligence Amplified
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: "rgba(255,255,255,0.45)", fontFamily: T.fontBody }}
        >
          Research-grade content on AI, automation, and the systems that power tomorrow.
        </p>

        {/* Feature bullets */}
        <ul className="space-y-2.5 mb-7">
          {[
            "Weekly AI & automation deep-dives",
            "Expert-written, no fluff",
            "Free — cancel anytime",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(249,115,22,0.15)",
                  border: "1px solid rgba(249,115,22,0.3)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: T.org }} />
              </span>
              <span
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: T.fontBody }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <Link href="/" className="no-underline block" aria-label="Explore all articles">
          <motion.div
            whileHover={{ scale: 1.03, y: -2, boxShadow: `0 12px 40px ${T.orgGlow}` }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${T.org}, ${T.orgLight})`,
              boxShadow: `0 6px 24px ${T.orgGlow}`,
            }}
          >
            <span
              className="font-black text-sm text-white"
              style={{ fontFamily: T.fontDisplay, letterSpacing: "-0.01em" }}
            >
              Explore All Articles
            </span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex text-white"
            >
              <ChevronRight size={16} aria-hidden="true" />
            </motion.span>
          </motion.div>
        </Link>
      </div>
    </motion.section>
  );
}
