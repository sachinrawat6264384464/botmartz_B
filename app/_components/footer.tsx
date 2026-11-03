"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

/* ─── SELF-CONTAINED SVG ICONS ──────────────────────────────────────────────── */
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);
const ArrowRightSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const CheckSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-emerald-400">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

/* ─── 2 FOCUSED LINK COLUMNS + BRAND ─── */
const FOOTER_COLS = [
  {
    heading: "Services & Systems",
    links: [
      { label: "All Services & Industries", href: "/services" },
      { label: "Enterprise RAG & Hybrid Search", href: "/services/enterprise-rag" },
      { label: "Deterministic AI Agents", href: "/services/ai-agents" },
      { label: "Production Reference Work", href: "/work" },
      { label: "AI Engineering Glossary", href: "/glossary" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Botmartz", href: "/about" },
      { label: "Engineering Insights", href: "/insights" },
      { label: "Write for Us", href: "/write-for-us" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

const SOCIALS = [
  { label: "LinkedIn", icon: LinkedInIcon, href: "https://www.linkedin.com/company/botmartz-ai-solutions" },
  { label: "GitHub", icon: GitHubIcon, href: "https://github.com/botmartz" },
  { label: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/botmartzai_solutions/" },
];

export function Footer({ settings }: { settings?: any }) {
  const companyName = settings?.general?.companyName || "Botmartz AI Solutions Private Limited";
  const logoUrl = "/Logo-removebg-preview.png";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => { 
      setStatus("success"); 
      trackEvent("newsletter_signup", { source: "footer" });
      setEmail(""); 
    }, 1000);
  };

  return (
    <footer className="bg-[#030712] text-white relative overflow-hidden border-t border-[#1E293B]" aria-label="Site footer">
      
      {/* ── TOP ARCHITECTURAL CROSS-HAIR DIVIDER ── */}
      <div className="border-b border-[#1E293B] relative w-full">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute -top-[5px] left-4 sm:left-6 lg:left-8 w-2.5 h-2.5 pointer-events-none">
            <div className="absolute top-[4.5px] left-0 w-full h-[1px] bg-[#38BDF8]/60" />
            <div className="absolute top-0 left-[4.5px] w-[1px] h-full bg-[#38BDF8]/60" />
          </div>
          <div className="absolute -top-[5px] right-4 sm:right-6 lg:right-8 w-2.5 h-2.5 pointer-events-none">
            <div className="absolute top-[4.5px] left-0 w-full h-[1px] bg-[#38BDF8]/60" />
            <div className="absolute top-0 left-[4.5px] w-[1px] h-full bg-[#38BDF8]/60" />
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── 3-COLUMN MAIN GRID (1 BRAND + 2 TEXT/LINK COLUMNS) ── */}
        <div className="pt-16 pb-16 grid grid-cols-1 lg:grid-cols-[1.8fr_1fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-[#1E293B]">

          {/* COL 1: BRAND + TAGLINE + NEWSLETTER + SOCIALS */}
          <div className="pb-12 lg:pb-0 lg:pr-12 flex flex-col justify-between">
            <div>
              {/* Brand Logo without border */}
              <Link href="/" prefetch={false} className="inline-block mb-4">
                <Image
                  src={logoUrl}
                  alt={companyName}
                  width={220}
                  height={68}
                  className="h-[52px] sm:h-[58px] w-auto object-contain"
                />
              </Link>

              <p className="text-sm text-[#94A3B8] leading-relaxed max-w-sm mb-8 font-normal">
                The enterprise AI systems engineering lab. We architect, benchmark, and deploy citation-grounded RAG engines and deterministic multi-agent state machines.
              </p>

              {/* Newsletter Form */}
              <div className="max-w-sm mb-8">
                <label htmlFor="footer-email" className="block text-xs font-mono uppercase tracking-wider text-[#CBD5E1] mb-2 font-semibold">
                  Product &amp; Systems Dispatch, Monthly
                </label>
                <form onSubmit={handleSubscribe} className="relative flex items-center border-b border-[#334155] focus-within:border-[#0284C7] pb-1 transition-colors">
                  <input
                    id="footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="engineer@enterprise.com"
                    disabled={status === "success"}
                    className="w-full bg-transparent text-sm text-white placeholder:text-[#64748B] focus:outline-none pr-8 py-1.5 font-mono"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    aria-label="Subscribe"
                    className="absolute right-0 text-[#38BDF8] hover:text-white transition-colors p-1"
                  >
                    {status === "loading" ? (
                      <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin block" />
                    ) : status === "success" ? (
                      <CheckSvg />
                    ) : (
                      <ArrowRightSvg />
                    )}
                  </button>
                </form>
                <div className="text-[11px] text-[#64748B] mt-2 font-mono">
                  {status === "success" ? "Subscribed. First issue lands next month." : "No marketing spam. Unsubscribe anytime."}
                </div>
              </div>
            </div>

            {/* Social Icons & Google Review Button */}
            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#1E293B]">
              <div className="flex items-center gap-2">
                {SOCIALS.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded-lg border border-[#1E293B] bg-[#0B1528] flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#0284C7] hover:bg-[#0284C7]/10 transition-all duration-150"
                  >
                    <Icon />
                  </a>
                ))}
              </div>

              <a
                href="https://g.page/r/CbivsvhnvmjQEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B1528] border border-[#1E293B] hover:border-[#38BDF8]/50 text-xs text-[#CBD5E1] transition-all font-mono"
              >
                <span className="text-amber-400">★ 5.0</span>
                <span>Google Review</span>
              </a>
            </div>
          </div>

          {/* COL 2, 3, 4: LINK COLUMNS */}
          {FOOTER_COLS.map((col) => (
            <div key={col.heading} className="pt-8 lg:pt-0 lg:px-8">
              <div className="font-mono text-xs font-bold text-[#E2E8F0] uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                <span>{col.heading}</span>
              </div>
              <ul className="space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      prefetch={false}
                      className="text-sm text-[#94A3B8] hover:text-white transition-colors leading-snug block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* ── BOTMARTZ WATERMARK WITH CRISP SOLID BLUE-CYAN HAIRLINE BORDER ── */}
        <div 
          aria-hidden="true" 
          className="border-t border-[#1E293B] py-10 sm:py-16 text-center select-none pointer-events-none overflow-hidden"
        >
          <span 
            className="font-bold tracking-tighter uppercase block leading-none font-sans text-transparent"
            style={{
              fontSize: "clamp(48px, 15vw, 180px)",
              WebkitTextStroke: "1.5px rgba(2, 132, 199, 0.45)",
              letterSpacing: "-0.04em",
              textShadow: "0 0 25px rgba(2, 132, 199, 0.15)"
            }}
          >
            BOTMARTZ
          </span>
        </div>

        {/* ── BOTTOM BAR (CENTERED LEGAL & POLICIES, CLEAN NO FALSE CLAIMS) ── */}
        <div className="pt-6 pb-28 sm:pb-12 border-t border-[#1E293B] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#64748B]">
          
          {/* Left: Copyright */}
          <div>
            <p>© {new Date().getFullYear()} {companyName}. All rights reserved.</p>
          </div>

          {/* Center: Legal Policies prominently centered */}
          <div className="flex items-center gap-6 text-xs font-medium text-[#94A3B8]">
            <Link href="/privacy" className="hover:text-white transition-colors underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
            <span className="text-[#334155]">•</span>
            <Link href="/terms" className="hover:text-white transition-colors underline-offset-4 hover:underline">
              Terms of Service
            </Link>
            <span className="text-[#334155]">•</span>
            <Link href="/cookies" className="hover:text-white transition-colors underline-offset-4 hover:underline">
              Cookie Policy
            </Link>
          </div>

          {/* Right: Empty spacer to keep Center perfectly balanced */}
          <div className="hidden md:block w-32" />

        </div>

      </div>
    </footer>
  );
}
