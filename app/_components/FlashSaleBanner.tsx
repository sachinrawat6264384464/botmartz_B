"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Clock, X, Tag } from "lucide-react";

// Sale config: Today (Aug 9 2026) 10:00 AM IST to 4:00 PM IST
// IST = UTC+5:30
// Bootcamp 2 = Aug 16, Bootcamp 3 = Aug 22
// Price: ₹399 during sale, ₹399 normally (both become 299 during sale)

function getSaleTimes() {
  const today = new Date();
  // Build today's 10:00 AM IST and 4:00 PM IST in UTC
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();

  // IST is UTC+5:30 → to get UTC, subtract 5h30m
  // 10:00 AM IST = 04:30 UTC
  // 4:00 PM IST = 10:30 UTC
  const saleStart = new Date(Date.UTC(year, month, date, 4, 30, 0)); // 10:00 AM IST
  const saleEnd = new Date(Date.UTC(year, month, date, 10, 30, 0));  // 4:00 PM IST

  return { saleStart, saleEnd };
}

export function isSaleActive(): boolean {
  const { saleStart, saleEnd } = getSaleTimes();
  const now = new Date();
  return now >= saleStart && now < saleEnd;
}

export default function FlashSaleBanner() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [saleActive, setSaleActive] = useState(false);
  const [saleStarted, setSaleStarted] = useState(false); // sale has started for the day
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    
    // Check if user dismissed the banner this session
    const wasDismissed = sessionStorage.getItem("flashSaleDismissed");
    if (wasDismissed) setDismissed(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const tick = () => {
      const { saleStart, saleEnd } = getSaleTimes();
      const now = new Date();
      const active = now >= saleStart && now < saleEnd;
      const started = now >= saleStart;

      setSaleActive(active);
      setSaleStarted(started);

      if (active) {
        // Countdown to sale END
        const diff = saleEnd.getTime() - now.getTime();
        if (diff > 0) {
          setTimeLeft({
            hours: Math.floor(diff / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000),
          });
        }
      } else if (!started) {
        // Countdown to sale START
        const diff = saleStart.getTime() - now.getTime();
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

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("flashSaleDismissed", "true");
  };

  // Don't show on admin pages or feedback pages
  if (!mounted || dismissed) return null;
  if (pathname?.startsWith("/admin")) return null;
  if (pathname?.includes("/feedback")) return null;

  // Only show if sale has started (active) OR if sale hasn't started yet today
  // After 4 PM, don't show
  const { saleEnd } = getSaleTimes();
  if (new Date() >= saleEnd) return null;

  return (
    <div
      className={`relative z-[70] w-full ${
        saleActive
          ? "bg-gradient-to-r from-[#FF6B00] via-[#FF4500] to-[#E03200]"
          : "bg-gradient-to-r from-[#0044BB] via-[#0055EE] to-[#0066FF]"
      } text-white shadow-lg`}
    >
      <div className="wrap flex flex-wrap items-center justify-center gap-x-4 gap-y-1 py-2.5 sm:py-3 text-xs sm:text-sm relative pr-8">
        
        {/* Icon + Label */}
        <div className="flex items-center gap-2 font-extrabold tracking-wide uppercase">
          <Zap size={14} className="animate-pulse flex-shrink-0" />
          {saleActive ? (
            <span className="flex items-center gap-1.5">
              <span className="bg-white/20 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                LIVE
              </span>
              Flash Sale — AI Engineering Full Pass
            </span>
          ) : (
            <span>Flash Sale Starts at 10:00 AM — AI Engineering Full Pass</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <Tag size={13} className="opacity-80" />
          <span className="line-through opacity-60 font-mono">₹399</span>
          <span className="font-black text-base sm:text-lg font-mono">₹299</span>
          {saleActive && (
            <span className="bg-white text-[#E03200] text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
              SAVE ₹100
            </span>
          )}
        </div>

        {/* Countdown */}
        <div className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs">
          <Clock size={12} className="opacity-80" />
          <span className="opacity-80">
            {saleActive ? "Ends in:" : "Starts in:"}
          </span>
          <span className="font-black tabular-nums">
            {String(timeLeft.hours).padStart(2, "0")}:
            {String(timeLeft.minutes).padStart(2, "0")}:
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
        </div>

        {/* CTA */}
        <Link
          href="/community/ai-accelerator-workshop#bootcamps"
          className="bg-white text-[#0066FF] hover:bg-white/90 text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-md transition-all shadow-sm flex-shrink-0"
        >
          {saleActive ? "Grab Now →" : "View Bootcamps →"}
        </Link>
      </div>

      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
        aria-label="Dismiss flash sale banner"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/20 transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}
