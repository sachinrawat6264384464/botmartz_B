"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function ConversionTriggers() {
  const pathname = usePathname();

  // Exclude from admin, auth, and special portal screens
  const isExcluded = 
    pathname?.startsWith("/admin") || 
    pathname?.startsWith("/write-access");

  if (isExcluded) return null;

  return (
    <aside aria-label="WhatsApp Direct Support" className="fixed bottom-6 right-6 z-50 pointer-events-auto">
      <a
        href="https://wa.me/919730084626?text=Hi%20Botmartz%20Team%2C%20I%20would%20like%20to%20discuss%20an%20Enterprise%20AI%20project."
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_10px_30px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 active:scale-95"
      >
        {/* Pulsing beacon glow */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-75 pointer-events-none" />

        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 fill-white stroke-[#25D366] relative z-10" />

        {/* Hover Tooltip */}
        <span className="absolute right-full mr-3.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold whitespace-nowrap shadow-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
}
