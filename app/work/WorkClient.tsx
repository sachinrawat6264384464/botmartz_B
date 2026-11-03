"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ExternalLink, Sparkles, Layers, Code2, Terminal, CheckCircle2 } from 'lucide-react';
import VerifiedProductionBlueprint from '@/app/_components/VerifiedProductionBlueprint';

export default function WorkClient({
  heroContent = {
    badge: "Our Work",
    title: "Production AI Systems,<br><span class=\"text-[#00C6FF]\">Shipped &amp; Proven</span>",
    subtitle: "Explore our production implementations, open-source AI frameworks, and engineering methodology for shipping real systems.",
    ctaText: "Browse Deployments →",
    ctaLink: "#projects",
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
    <div className="bg-[#F5F8FC] text-[#0B1220] antialiased overflow-x-hidden min-h-screen">
      {/* Dynamic JSON-LD Injection */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      )}

      {/* ─── 1. HERO BANNER: LUMINOUS ARCHITECTURAL WHITE WITH WARM ORANGE & BLUE ACCENTS ─── */}
      <div className="bg-gradient-to-b from-[#FFFDF9] via-[#FAFDFE] to-white relative overflow-hidden pt-[110px] sm:pt-[130px] pb-16 px-6 sm:px-10 border-b border-[#E2E8F0] text-slate-900">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(15,23,42,0.04) 1px,transparent 1px), linear-gradient(90deg,rgba(15,23,42,0.04) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse 80% 60% at 65% 30%,black,transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 65% 30%,black,transparent)"
          }}
        />
        <div className="absolute w-[460px] h-[460px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.08),transparent_70%)] -top-[140px] -right-[80px] blur-[30px] pointer-events-none" />

        <div className="relative max-w-[1240px] mx-auto">
          {/* Breadcrumb */}
          <div className="font-semibold text-[12.5px] text-slate-500 mb-5 sm:mb-[22px] flex items-center gap-2 font-mono">
            <Link href="/" className="hover:text-[#0284C7] transition-colors">Home</Link>
            <span>›</span>
            <span className="text-[#0284C7] font-bold">Work</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] text-[#0284C7] font-mono text-xs uppercase tracking-wider mb-4 shadow-2xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{heroContent.badge || "PROVEN PRODUCTION DEPLOYMENTS"}</span>
              </div>
              <h1
                className="font-extrabold text-[36px] sm:text-[44px] md:text-[52px] leading-[1.12] text-[#0F172A] mt-2 tracking-tight"
                dangerouslySetInnerHTML={{
                  __html: heroContent.title ? heroContent.title.replace('text-orange-600', 'text-[#0284C7]').replace('text-[#00C6FF]', 'text-[#0284C7]') : 'Production AI Systems,<br><span class="text-[#0284C7]">Shipped &amp; Proven</span>'
                }}
              />
              <p className="font-normal text-[15px] sm:text-[16px] leading-relaxed text-slate-600 mt-4 max-w-[520px]">
                {heroContent.subtitle || "Reference case studies from enterprise clients across legal, aviation MRO, logistics, and supply chain — real deterministic systems in production."}
              </p>
              <div className="flex gap-3.5 mt-8 flex-wrap items-center">
                <a
                  href={heroContent.ctaLink || "#cases"}
                  className="inline-flex items-center gap-2 bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold text-[14px] px-7 py-4 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5"
                >
                  {heroContent.ctaText || "Browse Deployments →"}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-[14px] px-6 py-4 rounded-xl transition-all shadow-xs"
                >
                  Request Technical Scoping
                </Link>
              </div>

              {/* Sub-navigation */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex items-center gap-5 flex-wrap text-xs font-semibold text-slate-500">
                <span className="font-mono text-slate-400">EXPLORE:</span>
                <Link href="#cases" className="text-[#0284C7] hover:underline flex items-center gap-1 font-mono">
                  <Terminal className="w-3.5 h-3.5" /> Client Case Studies
                </Link>
                <Link href="/work/open-source" className="text-[#0284C7] hover:underline flex items-center gap-1 font-mono">
                  <Code2 className="w-3.5 h-3.5" /> Open Source Retrievers
                </Link>
              </div>
            </div>

            {/* Hero Stats Grid */}
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
              {heroStats.map((s, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 transition-all hover:border-[#0284C7]/40 hover:shadow-md shadow-xs">
                  <div className="font-extrabold text-[26px] sm:text-[30px] text-[#0284C7] leading-none">{s.value}</div>
                  <div className="font-semibold text-xs text-slate-500 mt-2 font-mono uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>



      {/* ─── 2. PRODUCTION ARCHITECTURE & DELIVERY MATRIX (3D GRAPHIC & BLUEPRINT) ─── */}
      <div className="max-w-[1240px] mx-auto mt-12 px-6 sm:px-10">
        <VerifiedProductionBlueprint />
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
              {aeoAnswer || "Botmartz builds and deploys sovereign production AI systems across legal and statutory intelligence, real estate and community operational agents, and aerospace MRO technical retrieval."}
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
