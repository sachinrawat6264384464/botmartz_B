"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Clock, X, ArrowRight, Tag, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Offer Window: Today 10:00 AM IST (04:30 UTC) to 4:00 PM IST (10:30 UTC)
function getSaleTimes() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();

  const saleStart = new Date(Date.UTC(year, month, date, 4, 30, 0)); // 10:00 AM IST
  const saleEnd = new Date(Date.UTC(year, month, date, 10, 30, 0));  // 4:00 PM IST

  return { saleStart, saleEnd };
}

export default function FloatingOfferWidget() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [saleActive, setSaleActive] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    const wasDismissed = sessionStorage.getItem("floatingOfferDismissed");
    if (wasDismissed) setDismissed(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const tick = () => {
      const { saleStart, saleEnd } = getSaleTimes();
      const now = new Date();
      const active = now >= saleStart && now < saleEnd;
      setSaleActive(active);

      if (active) {
        const diff = saleEnd.getTime() - now.getTime();
        if (diff > 0) {
          setTimeLeft({
            hours: Math.floor(diff / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000),
          });
        }
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [mounted]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissed(true);
    sessionStorage.setItem("floatingOfferDismissed", "true");
  };

  // Hidden condition:
  // 1. Not mounted
  // 2. Dismissed by user
  // 3. Admin / feedback routes
  // 4. Sale is NOT active (i.e., after 4:00 PM IST or before 10:00 AM IST) -> AUTOMATICALLY REMOVED
  if (!mounted || dismissed) return null;
  if (pathname?.startsWith("/admin") || pathname?.includes("/feedback")) return null;
  
  // AUTO REMOVE AFTER 4:00 PM IST
  const { saleEnd } = getSaleTimes();
  if (new Date() >= saleEnd) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed bottom-5 right-5 z-[999] max-w-[340px] sm:max-w-[360px] font-sans"
      >
        {isMinimized ? (
          /* Minimized Floating Pill */
          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-2.5 bg-[#0B1C2C]/95 backdrop-blur-xl border border-[#0066FF]/50 text-white px-4 py-2.5 rounded-full shadow-[0_8px_32px_rgba(0,102,255,0.35)] hover:scale-105 transition-all group cursor-pointer"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4500] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF4500]"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#00B8F0] flex items-center gap-1">
              <Zap size={12} className="text-[#FF6B00]" /> Full Pass Offer ₹299
            </span>
            <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded-full text-slate-300">
              {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </button>
        ) : (
          /* Expanded Premium Floating Card */
          <div className="relative bg-[#071322]/95 backdrop-blur-2xl border border-[#0066FF]/40 rounded-2xl p-4 shadow-[0_12px_40px_rgba(0,0,0,0.5)] overflow-hidden group">
            {/* Animated top gradient highlight line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B00] via-[#FF4500] to-[#0066FF] animate-pulse" />
            
            {/* Subtle glow circle */}
            <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-[#0066FF]/20 blur-2xl rounded-full pointer-events-none" />

            {/* Header controls */}
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="inline-flex items-center gap-1.5 bg-[#FF4500]/15 border border-[#FF4500]/40 text-[#FF6B00] text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                <Zap size={11} className="animate-pulse" /> FLASH SALE — ENDS 4 PM
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(true)}
                  title="Minimize widget"
                  className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors text-[11px] font-mono"
                >
                  ─
                </button>
                <button
                  onClick={handleDismiss}
                  title="Close offer widget"
                  className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Offer Body */}
            <div className="space-y-2 mb-3">
              <h4 className="text-sm font-extrabold text-white leading-snug flex items-center gap-1.5">
                AI Engineering Full Pass <Sparkles size={13} className="text-amber-400 shrink-0" />
              </h4>
              <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                Get access to all 3 live engineering bootcamps today at a special flat price.
              </p>

              {/* Price & Savings */}
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-slate-400 line-through text-xs font-mono">₹399</span>
                <span className="text-2xl font-black text-white font-mono tracking-tight">₹299</span>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                  SAVE ₹100
                </span>
              </div>
            </div>

            {/* Timer & CTA Bar */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1 text-[11px] font-mono text-slate-300">
                <Clock size={12} className="text-[#00B8F0] shrink-0" />
                <span className="font-bold text-white tabular-nums">
                  {String(timeLeft.hours).padStart(2, "0")}h {String(timeLeft.minutes).padStart(2, "0")}m {String(timeLeft.seconds).padStart(2, "0")}s
                </span>
              </div>

              <Link
                href="/community/ai-accelerator-workshop#bootcamps"
                className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0039A6] text-white text-xs font-extrabold uppercase tracking-wider px-3.5 py-2 rounded-xl transition-all shadow-md shadow-[#0066FF]/30 hover:scale-[1.02]"
              >
                Claim Offer <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
