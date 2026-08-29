"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Calendar, Award, Image, Menu, X, ArrowRight, ScanLine } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Events & Meetups", href: "/events" },
  { name: "Workshops & Cohorts", href: "/workshops" },
  { name: "Verify Certificates", href: "/certificates" },
  { name: "Community Gallery", href: "/gallery" },
];

export default function CommunityNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050B14]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0066FF] flex items-center justify-center font-bold font-mono text-white text-lg shadow-[0_0_20px_rgba(0,102,255,0.5)]">
            B
          </div>
          <div>
            <div className="font-bold text-white tracking-tight text-base leading-none">
              BOTMARTZ
            </div>
            <div className="font-mono text-[10px] text-[#00B8F0] tracking-widest uppercase font-semibold mt-1">
              COMMUNITY &amp; EVENTS
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-mono uppercase tracking-wider transition-colors ${
                  active ? "text-[#00B8F0] font-bold" : "text-slate-300 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/events/ai-frontier-2026"
            className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-5 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wide uppercase transition-all shadow-[0_0_15px_rgba(0,102,255,0.4)]"
          >
            <Sparkles size={14} className="text-[#00F0FF]" /> AI Frontier 2026
          </Link>
          <a
            href="https://www.botmartz.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            Enterprise Site ↗
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-slate-300 hover:text-white p-2"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#070E1B] border-b border-white/10 px-6 py-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-mono text-slate-300 hover:text-white uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <Link
              href="/events/ai-frontier-2026"
              onClick={() => setMobileOpen(false)}
              className="block text-center bg-[#0066FF] text-white py-3 rounded-xl text-xs font-mono font-bold uppercase"
            >
              AI Frontier 2026
            </Link>
            <a
              href="https://www.botmartz.com"
              className="block text-center text-xs font-mono text-slate-400 py-2"
            >
              Botmartz Enterprise Site ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
