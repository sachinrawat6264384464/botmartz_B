"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ticket, Clock } from "lucide-react";

export default function EventCountdownBanner() {
  const pathname = usePathname();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Event Date: August 15, 2026
    const targetDate = new Date("2026-08-15T09:00:00Z").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted || pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="bg-[#00B8F0]/10 border-b border-[#00B8F0]/20 py-2 sm:py-3">
      <div className="wrap flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm text-white">
        <div className="flex items-center gap-2 font-semibold text-[#00B8F0]">
          <Ticket size={16} className="animate-pulse" />
          <span>AI FRONTIER 2026</span>
          <span className="hidden sm:inline text-white/50 px-1">•</span>
          <span className="bg-green-500/20 text-green-400 text-[10px] px-1.5 py-0.5 rounded font-bold tracking-wider">EARLY BIRD LIVE</span>
        </div>
        
        <div className="flex items-center gap-3 font-mono">
          <Clock size={14} className="text-[#8A9EB0]" />
          <div className="flex gap-2 text-white">
            <div className="flex flex-col items-center"><span className="font-bold">{String(timeLeft.days).padStart(2, '0')}</span><span className="text-[9px] text-[#8A9EB0]">DAYS</span></div>
            <span className="opacity-50">:</span>
            <div className="flex flex-col items-center"><span className="font-bold">{String(timeLeft.hours).padStart(2, '0')}</span><span className="text-[9px] text-[#8A9EB0]">HRS</span></div>
            <span className="opacity-50">:</span>
            <div className="flex flex-col items-center"><span className="font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span><span className="text-[9px] text-[#8A9EB0]">MIN</span></div>
            <span className="opacity-50">:</span>
            <div className="flex flex-col items-center"><span className="font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span><span className="text-[9px] text-[#8A9EB0]">SEC</span></div>
          </div>
        </div>

        <Link href="/community/events/ai-frontier-2026" className="ml-2 bg-[#00B8F0] hover:bg-[#009ACC] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded transition-colors">
          Get Tickets
        </Link>
      </div>
    </div>
  );
}
