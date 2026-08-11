"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Loader2, Shield } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

/* ─── SOCIAL ICONS jjjjj───────────────────────────────────────────────────────────── */
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

/* ─── LINK DATA ──────────────────────────────────────────────────────────────── */
const FOOTER_COLS = [
  {
    heading: "Services",
    links: [
      { label: "Enterprise RAG", href: "/services/enterprise-rag" },
      { label: "AI Agents", href: "/services/ai-agents" },
    ],
  },
  {
    heading: "Work",
    links: [
      { label: "Labs", href: "/work/labs" },
      { label: "Open Source", href: "/work/open-source" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Engineering Insights", href: "/insights" },
      { label: "Academy ↗", href: "https://academy.botmartz.com" },
    ],
  },
  {
    heading: "Events",
    links: [
      { label: "AI Frontier 2026", href: "/community/events/ai-frontier-2026" },
      { label: "AI Accelerator Workshops", href: "/community/ai-accelerator-workshop" },
    ],
  },
];

const SOCIALS = [
  { label: "LinkedIn", icon: LinkedInIcon, href: "https://www.linkedin.com/company/botmartz-ai-solutions" },
  { label: "X", icon: XIcon, href: "https://x.com/botmartz" },
  { label: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/botmartzai_solutions/" },
  { label: "YouTube", icon: YouTubeIcon, href: "https://youtube.com/@botmartz" },
  { label: "GitHub", icon: GitHubIcon, href: "https://github.com/botmartz" },
];

const TRUST = [
  { icon: Shield, label: "Enterprise Grade Security" },
];

/* ─── COMPONENT ──────────────────────────────────────────────────────────────── */
export function Footer({ settings }: { settings?: any }) {
  const companyName = settings?.general?.companyName || "Botmartz AI Solutions Pvt. Ltd.";
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
    <footer className="bg-[#060C17] text-white relative overflow-hidden" aria-label="Site footer">

      {/* Subtle background stars / glow effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#0052FF]/8 blur-[180px] rounded-full" />
        <div className="absolute bottom-[0%] left-[-5%] w-[400px] h-[400px] bg-[#00B8F0]/6 blur-[150px] rounded-full" />
        {/* Star dots */}
        {[
          "top-[8%] right-[15%]", "top-[20%] right-[35%]", "top-[40%] right-[8%]",
          "top-[12%] right-[55%]", "top-[55%] right-[22%]", "top-[30%] right-[70%]",
          "top-[70%] right-[48%]", "top-[15%] right-[80%]",
        ].map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos} w-1 h-1 bg-white/20 rounded-full`}
            style={{ width: i % 3 === 0 ? "3px" : "2px", height: i % 3 === 0 ? "3px" : "2px" }}
          />
        ))}
      </div>

      <div className="wrap relative z-10">

        {/* ── MAIN GRID ── */}
        <div className="pt-[60px] pb-[40px] grid grid-cols-1 lg:grid-cols-[330px_1fr] gap-16">

          {/* LEFT: Brand */}
          <div className="flex flex-col">
              <Link href="/" prefetch={false} className="inline-block mb-6">
                <Image
                  src={logoUrl}
                  alt={companyName}
                  width={280}
                  height={78}
                  className="h-[68px] sm:h-[78px] w-auto object-contain"
                />
              </Link>

              <p className="text-[14px] text-[#8A9EB0] leading-relaxed max-w-[280px] mb-8">
                We engineer production AI systems and advance AI engineering through education, community, and open-source innovation.
              </p>

              {/* Social Icons */}
              <div className="flex gap-3">
                {SOCIALS.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    suppressHydrationWarning
                    className="w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center text-[#8A9EB0] hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-200"
                  >
                    <Icon />
                  </a>
                ))}
              </div>

              {/* Google Review Button */}
              <div className="mt-5">
                <a
                  href="https://g.page/r/CbivsvhnvmjQEBM/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#060C1F" }}
                  className="inline-flex items-center gap-2.5 bg-white hover:bg-slate-100 text-[#060C1F] font-extrabold text-[13px] px-4 py-2.5 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#EA4335">
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z"/>
                  </svg>
                  <span style={{ color: "#060C1F" }} className="font-extrabold text-[#060C1F]">Review Us on Google</span>
                </a>
              </div>
            </div>

            {/* RIGHT: 5 link columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
              {FOOTER_COLS.map((col) => (
                <div key={col.heading}>
                  <h5 className="font-bold text-[11px] tracking-[0.12em] text-white uppercase mb-5 relative">
                    {col.heading}
                    <span className="absolute -bottom-2 left-0 w-5 h-[2px] bg-[#0052FF] rounded-full" />
                  </h5>
                  <ul className="space-y-3 mt-4">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          prefetch={false}
                          className="text-[13px] text-[#8A9EB0] hover:text-white transition-colors leading-snug"
                        >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── NEWSLETTER STRIP ── */}
        <div className="py-7 border-t border-b border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Left: icon + text */}
            <div className="flex items-start gap-4 flex-shrink-0">
              <div className="w-10 h-10 rounded-lg border border-[#0052FF]/40 bg-[#0052FF]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-[#0052FF]">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-white text-sm mb-0.5">Stay Updated</div>
                <div className="text-[12px] text-[#8A9EB0] max-w-[240px]">
                  Get the latest engineering insights, tutorials, and company updates.
                </div>
              </div>
            </div>

            {/* Right: form */}
            <form
              onSubmit={handleSubscribe}
              className="flex-1 flex flex-col sm:flex-row gap-3 w-full md:max-w-[560px] ml-auto"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address for newsletter
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={status === "success"}
                className="flex-1 bg-[#0E1726] border border-white/15 rounded-lg px-4 py-3 text-[13.5px] text-white placeholder:text-[#8A9EB0]/80 focus:outline-none focus:border-[#0052FF] focus:ring-2 focus:ring-[#00B8F0]/50 transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                aria-label="Subscribe to newsletter"
                className="inline-flex items-center justify-center gap-2 bg-[#0052FF] hover:bg-[#003FCC] disabled:opacity-60 text-white font-bold text-[13px] px-6 py-3 rounded-lg transition-colors whitespace-nowrap flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-white"
              >
                {status === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                ) : status === "success" ? (
                  "Subscribed ✓"
                ) : (
                  <>Subscribe <ArrowRight size={14} aria-hidden="true" /></>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="py-5 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 justify-between">

          {/* Copyright + trust badges */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-[12px] text-[#8A9EB0]">
              © {new Date().getFullYear()} {companyName}<br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              {TRUST.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-[11.5px] text-[#8A9EB0]">
                  <Icon size={13} className="text-[#8A9EB0]" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Legal links */}
          <div className="flex items-center gap-1 text-[12px] text-[#8A9EB0]">
            <Link href="/privacy" prefetch={false} className="hover:text-white transition-colors px-1">Privacy Policy</Link>
            <span className="text-white/20">•</span>
            <Link href="/terms" prefetch={false} className="hover:text-white transition-colors px-1">Terms of Service</Link>
            <span className="text-white/20">•</span>
            <Link href="/cookies" prefetch={false} className="hover:text-white transition-colors px-1">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}