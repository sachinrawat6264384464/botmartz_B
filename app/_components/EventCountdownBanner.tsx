"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ticket, Clock } from "lucide-react";

function calculateTimeLeft() {
  const targetDate = new Date("2026-08-23T10:00:00+05:30").getTime();
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
}

export default function EventCountdownBanner() {
  const pathname = usePathname();
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 23, minutes: 0, seconds: 0 });

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (pathname?.startsWith("/admin") || pathname?.includes("/feedback")) {
    return null;
  }

  return (
    <div className="bg-[#050B14] border-b border-white/10 py-2.5 sm:py-3 relative z-[60]">
      <div className="wrap flex flex-col sm:flex-row items-center justify-between sm:justify-center gap-2 sm:gap-6 text-xs sm:text-sm text-white">
        <div className="flex items-center gap-2 font-bold text-[#00B8F0] tracking-wide">
          <Ticket size={15} className="animate-pulse text-[#00B8F0]" />
          <span>AI FRONTIER 2026</span>
        </div>
        
        <div className="flex items-center gap-2.5 font-mono">
          <Clock size={13} className="text-[#8A9EB0]" />
          <div className="flex items-center gap-1.5 text-white text-xs">
            <div className="flex items-center gap-0.5">
              <span className="font-bold text-white tabular-nums">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="text-[9px] text-[#8A9EB0] uppercase">Days</span>
            </div>
            <span className="text-[#8A9EB0]">:</span>
            <div className="flex items-center gap-0.5">
              <span className="font-bold text-white tabular-nums">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-[9px] text-[#8A9EB0] uppercase">Hrs</span>
            </div>
            <span className="text-[#8A9EB0]">:</span>
            <div className="flex items-center gap-0.5">
              <span className="font-bold text-white tabular-nums">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-[9px] text-[#8A9EB0] uppercase">Min</span>
            </div>
            <span className="text-[#8A9EB0]">:</span>
            <div className="flex items-center gap-0.5">
              <span className="font-bold text-white tabular-nums">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-[9px] text-[#8A9EB0] uppercase">Sec</span>
            </div>
          </div>
        </div>

        <Link 
          href="/community/events/ai-frontier-2026" 
          className="bg-[#0066FF] hover:bg-[#0052CC] text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-md transition-all shadow-sm flex-shrink-0"
        >
          Get Pass →
        </Link>
      </div>
    </div>
  );
}
