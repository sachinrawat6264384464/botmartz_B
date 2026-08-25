"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, MessageSquare, ArrowRight } from "lucide-react";

export default function EventCountdownBanner() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin") || pathname?.includes("/feedback")) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-[#050B14] via-[#0A1628] to-[#050B14] border-b border-white/10 py-2.5 sm:py-3 relative z-[60] text-white">
      <div className="wrap flex flex-col sm:flex-row items-center justify-between sm:justify-center gap-2 sm:gap-6 text-xs sm:text-sm">
        
        {/* Badge & Live Pulse */}
        <div className="flex items-center gap-2 font-bold text-[#00B8F0] tracking-wide">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B8F0] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00B8F0]"></span>
          </span>
          <MessageSquare size={15} className="text-[#00B8F0]" />
          <span className="bg-gradient-to-r from-[#00B8F0] to-[#0066FF] bg-clip-text text-transparent uppercase font-extrabold tracking-wider">
            BOTMARTZ AI COMMUNITY
          </span>
        </div>

        {/* Tagline */}
        <div className="flex items-center gap-2 text-slate-300 font-medium text-center">
          <Sparkles size={14} className="text-amber-400 shrink-0 hidden md:inline-block" />
          <span>Connect with 1,000+ AI Engineers, Builders &amp; Founders! Access exclusive agent workflows.</span>
        </div>

        {/* CTA Button linking to Discord */}
        <a 
          href="https://discord.gg/k75ZpEnzp" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-[#5865F2] to-[#0066FF] hover:from-[#4752C4] hover:to-[#0052CC] text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-all shadow-md shadow-[#5865F2]/25 flex items-center gap-1.5 flex-shrink-0 group"
        >
          Join Discord Community <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}
