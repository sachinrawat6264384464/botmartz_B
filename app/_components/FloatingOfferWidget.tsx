"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Clock, X, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Offer Window: Today 10:00 AM IST (04:30 UTC) to 11:59 PM IST (18:29:59 UTC)
function getSaleTimes() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();

  const saleStart = new Date(Date.UTC(year, month, date, 4, 30, 0));  // 10:00 AM IST
  const saleEnd = new Date(Date.UTC(year, month, date, 18, 29, 59));  // 11:59 PM IST

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

  if (!mounted || dismissed) return null;
  if (pathname?.startsWith("/admin") || pathname?.includes("/feedback")) return null;
  
  // AUTO REMOVE AFTER 11:59 PM IST
  const { saleEnd } = getSaleTimes();
  if (new Date() >= saleEnd) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed bottom-3 left-[80px] right-3 sm:left-auto sm:right-5 sm:bottom-5 z-[99990] sm:max-w-[360px] font-sans"
      >
        {isMinimized ? (
          /* Minimized Floating Pill */
          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center justify-between gap-2 bg-[#0B1C2C]/95 backdrop-blur-xl border border-[#0066FF]/60 text-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-[0_8px_32px_rgba(0,102,255,0.35)] hover:scale-105 transition-all group cursor-pointer w-full sm:w-auto"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4500] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF4500]"></span>
              </span>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#00B8F0] truncate flex items-center gap-1">
                <Zap size={11} className="text-[#FF6B00] shrink-0" /> Full Pass ₹299
              </span>
            </div>
            <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded-full text-slate-300 shrink-0">
              {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </button>
        ) : (
          /* Expanded Mobile-Responsive Floating Card */
          <div className="relative bg-[#071322]/95 backdrop-blur-2xl border border-[#0066FF]/50 rounded-2xl p-3.5 sm:p-4 shadow-[0_12px_40px_rgba(0,0,0,0.6)] overflow-hidden group">
            {/* Animated top gradient highlight line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B00] via-[#FF4500] to-[#0066FF] animate-pulse" />
            
            {/* Subtle glow circle */}
            <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-[#0066FF]/20 blur-2xl rounded-full pointer-events-none" />

            {/* Header controls */}
            <div className="flex items-center justify-between gap-1.5 mb-2">
              <div className="inline-flex items-center gap-1 bg-[#FF4500]/15 border border-[#FF4500]/40 text-[#FF6B00] text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full truncate">
                <Zap size={10} className="animate-pulse shrink-0" /> FLASH SALE — ENDS 11:59 PM
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setIsMinimized(true)}
                  title="Minimize widget"
                  className="text-slate-400 hover:text-white px-1.5 py-0.5 rounded-md hover:bg-white/10 transition-colors text-[11px] font-mono"
                >
                  ─
                </button>
                <button
                  onClick={handleDismiss}
                  title="Close offer widget"
                  className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            {/* Offer Body */}
            <div className="space-y-1.5 mb-2.5">
              <h4 className="text-xs sm:text-sm font-extrabold text-white leading-snug flex items-center gap-1.5">
                AI Engineering Full Pass <Sparkles size={12} className="text-amber-400 shrink-0" />
              </h4>
              <p className="text-[10px] sm:text-[11px] text-slate-300 font-medium leading-tight">
                Access all 3 live engineering bootcamps at flat offer price.
              </p>

              {/* Price & Savings */}
              <div className="flex items-baseline gap-2 pt-0.5">
                <span className="text-slate-400 line-through text-[11px] font-mono">₹399</span>
                <span className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">₹299</span>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] sm:text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-full">
                  SAVE ₹100
                </span>
              </div>
            </div>

            {/* Timer & CTA Bar */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-mono text-slate-300 shrink-0">
                <Clock size={11} className="text-[#00B8F0] shrink-0" />
                <span className="font-bold text-white tabular-nums">
                  {String(timeLeft.hours).padStart(2, "0")}h {String(timeLeft.minutes).padStart(2, "0")}m {String(timeLeft.seconds).padStart(2, "0")}s
                </span>
              </div>

              <Link
                href="/community/ai-accelerator-workshop#bootcamps"
                className="inline-flex items-center justify-center gap-1 bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0039A6] text-white text-[10px] sm:text-xs font-extrabold uppercase tracking-wider px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl transition-all shadow-md shadow-[#0066FF]/30 active:scale-95 shrink-0"
              >
                Claim Offer <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
