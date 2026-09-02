"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Montserrat } from 'next/font/google';
import { ArrowRight, ExternalLink, Sparkles, Layers, Code2, Terminal } from 'lucide-react';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export default function WorkClient({
  heroContent = {
    badge: "Our Work",
    title: "Production AI Systems,<br><span class=\"text-[#00C6FF]\">Shipped &amp; Proven</span>",
    subtitle: "Explore our innovation labs, open-source AI projects, and engineering methodology for shipping real systems in production.",
    ctaText: "Explore Labs →",
    ctaLink: "/work/labs",
  },
  structuredData,
  aeoQuestion,
  aeoAnswer,
  dbCases = [],
}: {
  heroContent?: any;
  structuredData?: string;
  aeoQuestion?: string;
  aeoAnswer?: string;
  dbCases?: any[];
}) {
  const heroStats = [
    { value: 'Reference', label: 'Implementations' },
    { value: 'Hybrid', label: 'Dense + BM25 Search' },
    { value: 'Strict', label: 'Citation Grounding' },
    { value: '6-Stage', label: 'Delivery Lifecycle' },
  ];

  const steps = [
    { n: '1', title: 'Discover', desc: 'We scope the real problem, not just the requested feature.' },
    { n: '2', title: 'Prototype', desc: 'A working prototype against real data, in weeks not months.' },
    { n: '3', title: 'Harden', desc: 'Evaluation, guardrails and monitoring built in before launch.' },
    { n: '4', title: 'Ship & Support', desc: 'Production rollout with ongoing iteration as usage grows.' },
  ];

  return (
    <div className={`${montserrat.className} bg-[#F5F8FC] text-[#0B1220] antialiased overflow-x-hidden min-h-screen`}>
      {/* Dynamic JSON-LD Injection */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      )}

      {/* ─── 1. HERO BANNER ─── */}
      <div className="bg-[#060C1F] relative overflow-hidden pt-[110px] sm:pt-[130px] pb-16 px-6 sm:px-10">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(0,198,255,0.06) 1px,transparent 1px), linear-gradient(90deg,rgba(0,198,255,0.06) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse 80% 60% at 65% 30%,black,transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 65% 30%,black,transparent)"
          }}
        />
        <div className="absolute w-[460px] h-[460px] rounded-full bg-[radial-gradient(circle,rgba(0,123,255,0.28),transparent_70%)] -top-[140px] -right-[80px] blur-[10px] pointer-events-none" />

        <div className="relative max-w-[1240px] mx-auto">
          {/* Breadcrumb */}
          <div className="font-semibold text-[12.5px] text-[#5B6B85] mb-5 sm:mb-[22px] flex items-center gap-2">
            <Link href="/" className="hover:text-[#00C6FF] transition-colors">Home</Link>
            <span>›</span>
            <span className="text-[#00C6FF]">Work</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div>
              <div className="font-bold text-xs tracking-[0.1em] text-[#00C6FF] uppercase">
                {heroContent.badge || "Our Work"}
              </div>
              <h1
                className="font-extrabold text-[36px] sm:text-[44px] md:text-[50px] leading-[1.15] text-white mt-4 tracking-[-0.01em]"
                dangerouslySetInnerHTML={{
                  __html: heroContent.title || 'Production AI Systems,<br><span class="text-[#00C6FF]">Shipped &amp; Proven</span>'
                }}
              />
              <p className="font-medium text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#8FA3C4] mt-4.5 max-w-[500px]">
                {heroContent.subtitle || "Case studies from enterprise clients across education, logistics, healthcare and SaaS — real systems in production, not proofs of concept."}
              </p>
              <div className="flex gap-3.5 mt-7 flex-wrap items-center">
                <a
                  href={heroContent.ctaLink || "#cases"}
                  className="inline-flex items-center gap-2 bg-[#007BFF] hover:bg-[#0069DB] text-white font-bold text-[14px] px-6 py-3.5 rounded-[9px] shadow-[0_8px_24px_rgba(0,123,255,0.35)] transition-all transform hover:-translate-y-0.5"
                >
                  {heroContent.ctaText || "Browse Case Studies →"}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.18)] text-white font-bold text-[14px] px-6 py-3.5 rounded-[9px] transition-all"
                >
                  Start a Project
                </Link>
              </div>

              {/* Sub-navigation */}
              <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.08)] flex items-center gap-5 flex-wrap text-xs font-semibold text-[#8FA3C4]">
                <span>Explore:</span>
                <Link href="/work/labs" className="text-[#00C6FF] hover:underline flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5" /> AI Innovation Labs
                </Link>
                <Link href="/work/open-source" className="text-[#00C6FF] hover:underline flex items-center gap-1">
                  <Code2 className="w-3.5 h-3.5" /> Open Source Projects
                </Link>
              </div>
            </div>

            {/* Hero Stats Grid */}
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
              {heroStats.map((s, i) => (
                <div key={i} className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-[14px] p-5 sm:p-6 transition-all hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(0,198,255,0.3)]">
                  <div className="font-extrabold text-[26px] sm:text-[30px] text-[#00C6FF] leading-none">{s.value}</div>
                  <div className="font-semibold text-xs text-[#8FA3C4] mt-2">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>



      {/* ─── 3. HOW WE WORK (FROM PROBLEM TO PRODUCTION) (LIGHT THEME) ─── */}
      <div className="max-w-[1240px] mx-auto mt-16 px-6 sm:px-10">
        <div className="bg-white rounded-[18px] p-8 sm:p-11 relative overflow-hidden shadow-sm border border-slate-200 text-slate-900">
          <div className="relative z-10">
            <div className="font-bold text-xs tracking-[0.08em] text-[#0066FF] uppercase">How We Work</div>
            <div className="font-extrabold text-[26px] sm:text-[30px] text-slate-900 mt-2.5 font-heading">From Problem to Production</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 sm:mt-10">
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col gap-3 relative group">
                  <div className="w-[42px] h-[42px] rounded-full border border-blue-200 bg-blue-50 flex items-center justify-center font-bold text-[14px] text-[#0066FF] shadow-2xs group-hover:scale-105 transition-transform">
                    {step.n}
                  </div>
                  <div className="font-bold text-[15px] text-slate-900 font-heading mt-1">{step.title}</div>
                  <div className="font-medium text-[12.5px] leading-[1.6] text-slate-600">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── 4. AEO & ANSWER ENGINE BOX (If Configured) ─── */}
      {(aeoQuestion || aeoAnswer) && (
        <div className="max-w-[1240px] mx-auto mt-12 px-6 sm:px-10">
          <div className="bg-white border border-[#E7ECF3] rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#007BFF] uppercase mb-3">
              <Sparkles className="w-4 h-4" /> AI Answer Engine Knowledge (AEO)
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#0B1220] mb-2.5">
              {aeoQuestion || "What kind of production AI systems has Botmartz built?"}
            </h3>
            <p className="text-[#5B6B85] text-[13.5px] sm:text-[14.5px] leading-relaxed">
              {aeoAnswer || "Botmartz builds and deploys production AI systems across enterprise knowledge retrieval, agentic workflow automation, insurance and policy intelligence, and modern AI engineering architectures."}
            </p>
          </div>
        </div>
      )}

      {/* ─── 5. BOTTOM CTA BANNER ─── */}
      <div className="max-w-[1240px] mx-auto mt-14 mb-22 px-6 sm:px-10">
        <div className="bg-white border border-[#E7ECF3] rounded-[16px] p-7 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-5">
            <div className="w-[60px] h-[60px] rounded-full bg-[#E8F2FF] flex items-center justify-center font-extrabold text-[22px] text-[#007BFF] shrink-0">
              ◇
            </div>
            <div>
              <div className="font-bold text-[18px] sm:text-[20px] text-[#0B1220]">Have a Production AI Problem?</div>
              <div className="font-medium text-[13.5px] leading-[1.6] text-[#5B6B85] mt-1">
                Tell us what you&apos;re building — we&apos;ll tell you if we&apos;re a fit.
              </div>
            </div>
          </div>
          <a
            href="https://cal.com/botmartz-ai/20min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-bold text-[13.5px] text-white bg-[#007BFF] hover:bg-[#0069DB] px-6 py-3.5 rounded-[9px] transition-all shadow-sm shrink-0"
          >
            Book a Discovery Call →
          </a>
        </div>
      </div>
    </div>
  );
}
