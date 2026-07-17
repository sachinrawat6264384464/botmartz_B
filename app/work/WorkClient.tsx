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
    subtitle: "Case studies from enterprise clients across education, logistics, healthcare and SaaS — real systems in production, not proofs of concept.",
    ctaText: "Browse Case Studies →",
    ctaLink: "#cases",
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
  const [filter, setFilter] = useState('All Work');

  const industryList = ['All Work', 'Education', 'Logistics', 'Healthcare', 'SaaS & Technology'];

  const heroStats = [
    { value: '20+', label: 'Systems Shipped' },
    { value: '4', label: 'Industries Served' },
    { value: '99%+', label: 'Uptime in Production' },
    { value: '2023', label: 'Building Since' },
  ];

  const cases = [
    {
      industry: 'Education',
      title: 'AI Course Assistant for EdTech Platform',
      desc: 'An always-on assistant that answers doubts, grades quizzes, and tracks learner progress.',
      result: '3x faster doubt resolution',
      glyph: 'ED',
      slug: '/work/case-studies/ai-course-assistant-for-edtech-platform'
    },
    {
      industry: 'Logistics',
      title: 'Route Optimization Agent for Fleet Ops',
      desc: 'An agent system that re-plans delivery routes in real time against traffic and demand.',
      result: '18% lower fuel cost',
      glyph: 'LG',
      slug: '/work/case-studies/route-optimization-agent-for-fleet-ops'
    },
    {
      industry: 'Healthcare',
      title: 'Clinical Documentation Copilot',
      desc: 'Ambient documentation assistant that drafts clinical notes from patient conversations.',
      result: '40% less admin time',
      glyph: 'HC',
      slug: '/work/case-studies/clinical-documentation-copilot'
    },
    {
      industry: 'SaaS & Technology',
      title: 'Enterprise RAG for Support Teams',
      desc: 'A production RAG platform giving support agents instant, cited answers from internal docs.',
      result: '55% faster resolution',
      glyph: 'SA',
      slug: '/work/case-studies/enterprise-rag-for-support-teams'
    },
    {
      industry: 'Logistics',
      title: 'Warehouse Vision Inspection',
      desc: 'Computer-vision quality checks replacing manual inspection on the packing line.',
      result: '99.2% defect catch rate',
      glyph: 'LG',
      slug: '/work/case-studies/warehouse-vision-inspection'
    },
    {
      industry: 'Healthcare',
      title: 'Patient Intake Voice Agent',
      desc: 'A voice agent that handles intake, scheduling and insurance verification calls.',
      result: '2,000+ calls/month automated',
      glyph: 'HC',
      slug: '/work/case-studies/patient-intake-voice-agent'
    },
  ];

  const steps = [
    { n: '1', title: 'Discover', desc: 'We scope the real problem, not just the requested feature.' },
    { n: '2', title: 'Prototype', desc: 'A working prototype against real data, in weeks not months.' },
    { n: '3', title: 'Harden', desc: 'Evaluation, guardrails and monitoring built in before launch.' },
    { n: '4', title: 'Ship & Support', desc: 'Production rollout with ongoing iteration as usage grows.' },
  ];

  const mergedCases = React.useMemo(() => {
    const formattedDb = dbCases.map((c) => ({
      industry: c.category || c.industry || 'Technology',
      title: c.title,
      desc: c.excerpt || c.description || '',
      result: c.outcome || 'Success',
      glyph: c.clientName ? c.clientName.substring(0, 2).toUpperCase() : 'AI',
      slug: `/work/case-studies/${c.slug}`
    }));

    return [...formattedDb, ...cases];
  }, [dbCases]);

  const visibleCases = filter === 'All Work' ? mergedCases : mergedCases.filter(c => c.industry === filter);

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

              {/* Sub-navigation to explore other Work hubs */}
              <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.08)] flex items-center gap-5 flex-wrap text-xs font-semibold text-[#8FA3C4]">
                <span>Explore More:</span>
                <Link href="/work/case-studies" className="text-[#00C6FF] hover:underline flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" /> All Case Studies
                </Link>
                <Link href="/work/labs" className="text-[#00C6FF] hover:underline flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5" /> Botmartz Labs
                </Link>
                <Link href="/work/open-source" className="text-[#00C6FF] hover:underline flex items-center gap-1">
                  <Code2 className="w-3.5 h-3.5" /> Open Source
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

      {/* ─── 2. SELECTED PROJECTS / CASE STUDIES GRID ─── */}
      <div id="cases" className="max-w-[1240px] mx-auto pt-14 px-6 sm:px-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="font-bold text-xs tracking-[0.1em] text-[#007BFF] uppercase">Case Studies</div>
          <div className="font-extrabold text-[26px] sm:text-[30px] text-[#0B1220] mt-2">Selected Projects</div>
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          {industryList.map((label) => {
            const active = filter === label;
            return (
              <button
                key={label}
                onClick={() => setFilter(label)}
                className={`font-bold text-[12.5px] px-4 py-2.5 rounded-[8px] cursor-pointer border transition-all ${
                  active
                    ? 'border-[#007BFF] bg-[#007BFF] text-white shadow-sm'
                    : 'border-[#E2E8F0] bg-white text-[#3A4459] hover:border-[#007BFF]/40 hover:text-[#007BFF]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Case Cards Grid */}
      <div className="max-w-[1240px] mx-auto pt-6 px-6 sm:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleCases.map((c, i) => (
          <Link
            key={i}
            href={c.slug}
            className="bg-white border border-[#E7ECF3] rounded-[14px] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,123,255,0.08)] hover:border-[#007BFF]/40 group"
          >
            <div className="h-[110px] bg-gradient-to-br from-[#0A1630] to-[#060C1F] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,198,255,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-[38px] h-[38px] rounded-[9px] bg-[rgba(0,198,255,0.14)] border border-[rgba(0,198,255,0.3)] flex items-center justify-center font-bold text-[11px] text-[#00C6FF] relative z-10 shadow-sm group-hover:scale-105 transition-transform">
                {c.glyph}
              </div>
            </div>
            <div className="p-5.5 sm:p-6 flex flex-col gap-2.5 flex-1 justify-between">
              <div>
                <span className="font-bold text-[10px] tracking-[0.06em] text-[#007BFF] uppercase bg-[#E8F2FF] px-2 py-0.5 rounded">
                  {c.industry}
                </span>
                <div className="font-bold text-[16.5px] text-[#0B1220] mt-2.5 group-hover:text-[#007BFF] transition-colors leading-snug">
                  {c.title}
                </div>
                <div className="font-medium text-[13px] leading-[1.6] text-[#5B6B85] mt-2">
                  {c.desc}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-3.5 border-t border-[#EEF1F6]">
                <div className="w-[26px] h-[26px] rounded-[7px] bg-[#E4F8EF] flex items-center justify-center font-bold text-[11px] text-[#0E9F6E] shrink-0">
                  ↑
                </div>
                <div className="font-bold text-[12.5px] text-[#0B1220]">{c.result}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ─── 3. HOW WE WORK (FROM PROBLEM TO PRODUCTION) ─── */}
      <div className="max-w-[1240px] mx-auto mt-16 px-6 sm:px-10">
        <div className="bg-[#060C1F] rounded-[18px] p-8 sm:p-11 relative overflow-hidden shadow-lg border border-[rgba(255,255,255,0.06)]">
          <div className="absolute w-[320px] h-[320px] rounded-full bg-[radial-gradient(circle,rgba(0,123,255,0.22),transparent_70%)] -right-[70px] -top-[100px] pointer-events-none" />
          <div className="relative z-10">
            <div className="font-bold text-xs tracking-[0.08em] text-[#00C6FF] uppercase">How We Work</div>
            <div className="font-extrabold text-[26px] sm:text-[30px] text-white mt-2.5">From Problem to Production</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 sm:mt-10">
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col gap-3 relative group">
                  <div className="w-[42px] h-[42px] rounded-full border border-[rgba(0,198,255,0.4)] bg-[rgba(0,198,255,0.08)] flex items-center justify-center font-bold text-[14px] text-[#00C6FF] shadow-[0_0_15px_rgba(0,198,255,0.15)] group-hover:scale-105 transition-transform">
                    {step.n}
                  </div>
                  <div className="font-bold text-[15px] text-white mt-1">{step.title}</div>
                  <div className="font-medium text-[12.5px] leading-[1.6] text-[#7C8CAD]">{step.desc}</div>
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
              {aeoAnswer || "Botmartz builds and deploys production AI systems across education, logistics, healthcare, and SaaS, including AI course assistants, route optimization agents, clinical documentation copilots, enterprise RAG support platforms, warehouse computer vision inspection, and voice agents for patient intake."}
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
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 font-bold text-[13.5px] text-white bg-[#007BFF] hover:bg-[#0069DB] px-6 py-3.5 rounded-[9px] transition-all shadow-sm shrink-0"
          >
            Book a Discovery Call →
          </Link>
        </div>
      </div>
    </div>
  );
}
