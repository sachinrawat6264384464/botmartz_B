"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  BarChart3, 
  BookOpen, 
  CheckCircle2, 
  Eye, 
  HelpCircle, 
  Database,
  Cpu,
  FileText,
  Clock,
  Calendar,
  Layers,
  Heart,
  Share2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  MapPin,
  Plus
} from 'lucide-react';

interface MetricItem {
  value: string;
  label: string;
}

interface ApproachStep {
  n: string;
  title: string;
  desc: string;
}

interface TeamMember {
  initials: string;
  name: string;
  role: string;
}

interface RelatedCase {
  industry: string;
  title: string;
  result: string;
}

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  clientName?: string;
  featuredImage?: string;
  status: "draft" | "published";
  
  // Custom detail page fields
  challenge?: string;
  approach?: ApproachStep[];
  outcome?: string;
  lessons?: string[];
  clientQuote?: { text: string; author: string; role: string };
  stack?: string[];
  team?: TeamMember[];
  relatedCases?: RelatedCase[];
  visualType?: "dashboard" | "workflow" | "document" | "map";
  timeline?: string;
  teamSize?: string;
  metrics?: MetricItem[];
}

export default function CaseStudyDetailClient({ study }: { study: CaseStudy }) {
  const [liked, setLiked] = useState(false);

  const parseList = (val: any): string[] => {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string' && val.trim()) {
      return val.split('\n').map(l => l.replace(/^[•\-*+✓\s]+/, '').trim()).filter(Boolean);
    }
    return [];
  };

  // Fallbacks
  const visualType = study.visualType || "dashboard";
  const clientName = study.clientName || "Enterprise Client";
  const category = study.category || "AI Implementations";
  const title = study.title;
  const excerpt = study.excerpt;
  const timeline = study.timeline || "12 Weeks";
  const teamSize = study.teamSize || "3 Engineers";
  
  const metrics = study.metrics && study.metrics.length ? study.metrics : [
    { value: "70%", label: "Faster information retrieval" },
    { value: "60%", label: "Reduction in support tickets" },
    { value: "3.2x", label: "Increase in user productivity" }
  ];

  const stack = study.stack && study.stack.length ? study.stack : ['LangChain', 'Pinecone', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS'];

  const challenge = study.challenge || "Our client operates a fleet of 1,200 freight containers across 40 countries. Their operations team handles over 15,000 queries daily relating to customs, routing, pricing schedules, and compliance policies. Finding exact sections in their 500,000 internal documents, PDFs, and spreadsheets took hours, leading to container delays and compliance errors. Naive vector search failed because standard embeddings missed exact container numbers, legal codes, and paragraph cross-references.";
  
  const outcome = study.outcome || "The hybrid RAG system deployed inside their private AWS VPC. Within 2 weeks of launch, response times for internal operations queries dropped by 70%. The system achieved 99% accuracy on legal citation matches and handled over 40,000 daily queries with zero hallucinations, saving the company an estimated $1.2M in annual port storage charges.";

  const approach = study.approach && study.approach.length ? study.approach : [
    { n: "1", title: "Data Ingestion & Optical Character Recognition", desc: "Cleaned and converted legacy formats, structured sections, and ran high-fidelity OCR on dense scanned container forms." },
    { n: "2", title: "Hybrid Retrieval & Reciprocal Rank Fusion", desc: "Combined Qdrant vector search for semantic queries with BM25 keyword matching for shipping codes, using RRF to merge results." },
    { n: "3", title: "Cross-Encoder Reranking & Context Assembly", desc: "Passed the top 20 candidate chunks through a cross-encoder model to select the best 5, packing them into context with citations." }
  ];

  const lessons = parseList(study.lessons).length ? parseList(study.lessons) : [
    "Vector search alone is insufficient for structured freight and customs queries; hybrid search with RRF is mandatory.",
    "Document chunking must align with layout structures (headers and tables) rather than fixed character offsets.",
    "Reranking is the highest leverage, lowest cost way to improve recall in large document sets."
  ];

  const clientQuote = study.clientQuote && study.clientQuote.text ? study.clientQuote : {
    text: "The custom search engine built by Botmartz changed how our operations team works. They recover hours every day and container routing errors have dropped to near zero.",
    author: "Markus Vance",
    role: "VP of Operations, Global Logistics Leader"
  };

  const team = study.team && study.team.length ? study.team : [
    { initials: "HS", name: "Harsh Sahu", role: "AI Engineer" },
    { initials: "PB", name: "Promit Basu", role: "AI/ML Engineer" },
    { initials: "SS", name: "Sanjay Singh", role: "Lead Architect" }
  ];

  const relatedCases = study.relatedCases && study.relatedCases.length ? study.relatedCases : [
    { industry: "SaaS & Support", title: "Context-Aware Agent for SaaS", result: "45% Automated Resolution" },
    { industry: "Legal Tech", title: "Contract Risk Extraction Engine", result: "90% Time Saved" }
  ];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Case study link copied to clipboard!");
  };

  return (
    <div className="bg-[#F5F8FC] min-h-screen text-[#0B1220] font-sans">
      
      {/* ── HERO BANNER ── */}
      <section className="bg-[#050B14] relative overflow-hidden pt-32 pb-16 px-6 sm:px-10">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,198,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,198,255,0.06) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 65% 30%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 65% 30%, black, transparent)'
          }}
        />
        
        <div className="max-w-[1080px] mx-auto relative z-10">
          <div className="font-semibold text-[12.5px] text-[#8A9EB0] mb-8 tracking-wide flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/30">&gt;</span>
            <Link href="/work/case-studies" className="hover:text-white transition-colors">Work</Link>
            <span className="text-white/30">&gt;</span>
            <span className="text-[#00C6FF]">{clientName}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <div>
              <div className="font-mono text-[11px] font-bold tracking-[0.14em] text-[#00B8F0] uppercase mb-4">
                {category}
              </div>

              <h1 className="font-extrabold text-[32px] sm:text-[44px] leading-[1.18] text-white">
                {title}
              </h1>

              <p className="font-medium text-[14.5px] sm:text-[15.5px] leading-[1.75] text-[#8A9EB0] mt-5 max-w-[560px]">
                {excerpt}
              </p>

              <div className="flex flex-wrap gap-3.5 mt-8 items-center">
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-[14px] px-6 py-3.5 rounded-[9px] shadow-[0_8px_24px_rgba(0,102,255,0.35)] transition-all"
                >
                  Discuss Similar Project →
                </Link>
                <button 
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold text-[14px] px-6 py-3.5 rounded-[9px] transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-[#8A9EB0]" />
                  Share Case Study
                </button>
              </div>
            </div>

            {/* Right graphic box */}
            <div className="h-[240px] sm:h-[260px] w-full rounded-xl overflow-hidden bg-[#0A111F] border border-[#1E293B] relative flex items-center justify-center p-4 shadow-2xl">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#0066FF]/20 blur-[80px] rounded-full pointer-events-none z-0" />
              
              {visualType === "dashboard" && (
                <div className="w-full h-full flex flex-col justify-between bg-[#060D1A] rounded-lg p-4 border border-[#1E2A42] text-white select-none relative z-10">
                  <div className="flex items-center justify-between border-b border-[#1E2A42] pb-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#00B8F0]" />
                      <span className="text-[10px] font-mono text-[#8A9EB0]">Analytics Dashboard</span>
                    </div>
                    <BarChart3 className="w-4 h-4 text-[#0066FF]" />
                  </div>
                  <div className="flex gap-3 my-auto">
                    <div className="w-1/3 space-y-1.5 border-r border-[#1E2A42] pr-2">
                      <div className="h-2 w-full bg-[#1E2A42] rounded" />
                      <div className="h-2 w-4/5 bg-[#0066FF]/40 rounded" />
                      <div className="h-2 w-2/3 bg-[#00B8F0]/40 rounded" />
                    </div>
                    <div className="w-2/3 flex items-end gap-1.5 pt-3">
                      <div className="w-1/5 bg-[#0066FF] h-[35%] rounded-t" />
                      <div className="w-1/5 bg-[#00B8F0] h-[55%] rounded-t" />
                      <div className="w-1/5 bg-[#0066FF] h-[30%] rounded-t" />
                      <div className="w-1/5 bg-[#00B8F0] h-[75%] rounded-t" />
                      <div className="w-1/5 bg-[#0066FF] h-[95%] rounded-t shadow-[0_0_8px_rgba(0,184,240,0.5)]" />
                    </div>
                  </div>
                  <div className="text-[9px] font-mono text-[#64748B] flex justify-between pt-1 border-t border-[#1E2A42]">
                    <span>Real-time Metrics</span>
                    <span className="text-[#00B8F0]">+70% Recall</span>
                  </div>
                </div>
              )}

              {visualType === "workflow" && (
                <div className="w-full h-full flex flex-col justify-center items-center bg-[#060D1A] rounded-lg p-4 border border-[#1E2A42] text-white select-none relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="px-2.5 py-1 rounded bg-[#0066FF] text-[9px] font-mono font-medium shadow-[0_0_10px_rgba(0,102,255,0.4)]">User Query</div>
                    <div className="w-4 h-0.5 bg-[#00B8F0]" />
                    <div className="px-2.5 py-1 rounded bg-[#1E2A42] border border-[#00B8F0] text-[9px] font-mono text-[#00B8F0]">Intent Classifier</div>
                  </div>
                  <div className="h-4 w-0.5 bg-[#00B8F0] my-1.5" />
                  <div className="grid grid-cols-2 gap-2.5 w-full max-w-[220px]">
                    <div className="px-2 py-1 bg-[#0A1628] border border-[#1E2A42] text-[8px] font-mono text-center text-[#94A3B8] rounded">Knowledge Base</div>
                    <div className="px-2 py-1 bg-[#0A1628] border border-[#1E2A42] text-[8px] font-mono text-center text-[#94A3B8] rounded">Customer APIs</div>
                  </div>
                  <div className="mt-4 px-3 py-1 rounded-full bg-[#00B8F0]/20 border border-[#00B8F0]/40 text-[9px] font-mono text-[#00B8F0]">
                    ⚡ Autonomous Resolution
                  </div>
                </div>
              )}

              {visualType === "document" && (
                <div className="w-full h-full flex gap-3 bg-[#060D1A] rounded-lg p-4 border border-[#1E2A42] text-white select-none relative z-10">
                  <div className="w-1/2 border border-[#1E2A42] rounded p-2.5 bg-[#0A1322] space-y-2">
                    <div className="text-[9px] font-bold text-[#94A3B8] border-b border-[#1E2A42] pb-1">Contract.pdf</div>
                    <div className="h-1.5 w-full bg-[#1E2A42] rounded" />
                    <div className="h-1.5 w-4/5 bg-[#1E2A42] rounded" />
                    <div className="h-2 w-full bg-[#00B8F0]/30 border border-[#00B8F0]/50 rounded" />
                    <div className="h-1.5 w-3/4 bg-[#1E2A42] rounded" />
                  </div>
                  <div className="w-1/2 border border-[#1E2A42] rounded p-2.5 bg-[#0A1322] flex flex-col justify-between">
                    <div>
                      <div className="text-[9px] font-bold text-[#00B8F0] mb-1">OCR Parsing</div>
                      <div className="text-[8.5px] text-[#94A3B8] space-y-1">
                        <p>• Risk: Minimal</p>
                        <p>• Extract: Complete</p>
                        <p>• Accuracy: 99.4%</p>
                      </div>
                    </div>
                    <div className="text-[8.5px] font-mono text-[#0066FF] bg-[#0066FF]/10 px-2 py-0.5 rounded text-center">
                      95% Time Saved
                    </div>
                  </div>
                </div>
              )}

              {visualType === "map" && (
                <div className="w-full h-full flex flex-col justify-between bg-[#060D1A] rounded-lg p-4 border border-[#1E2A42] text-white select-none relative overflow-hidden z-10">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00B8F0_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-mono text-[#00B8F0] font-bold">Logistics Router</span>
                    <div className="px-1.5 py-0.5 rounded bg-[#0066FF]/20 border border-[#0066FF] text-[8px] font-mono text-[#0066FF]">Live Tracking</div>
                  </div>
                  <div className="relative z-10 my-auto flex items-center justify-around">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#00B8F0] shadow-[0_0_8px_#00B8F0]" />
                    <div className="h-0.5 w-20 bg-gradient-to-r from-[#00B8F0] to-[#0066FF] border-t border-dashed border-[#00B8F0]" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#0066FF] shadow-[0_0_8px_#0066FF]" />
                  </div>
                  <div className="relative z-10 text-[9px] font-mono text-[#8A9EB0] flex justify-between bg-[#0A1322]/95 p-1.5 rounded border border-[#1E2A42]">
                    <span>Hub A ➔ Hub B</span>
                    <span className="text-[#00B8F0]">+28% Efficiency</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── METRICS BAR & SPECS ── */}
      <section className="bg-white border-y border-[#E2E8F0] py-8">
        <div className="max-w-[1080px] mx-auto px-6 sm:px-10 grid grid-cols-1 md:grid-cols-[1.3fr_0.7fr] gap-8">
          <div className="grid grid-cols-3 gap-4 text-center md:text-left">
            {metrics.map((m, idx) => (
              <div key={idx} className={idx > 0 ? "border-l border-[#E2E8F0] pl-4 sm:pl-6" : ""}>
                <div className="text-[26px] sm:text-[32px] font-bold text-[#0066FF] leading-none mb-1.5">
                  {m.value}
                </div>
                <div className="text-[12px] sm:text-[13px] text-[#5B6B85] font-medium leading-snug">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 border-t md:border-t-0 md:border-l border-[#E2E8F0] pt-6 md:pt-0 md:pl-8 text-xs font-semibold text-[#5B6B85]">
            <div>
              <span className="text-[10px] uppercase text-[#8A97AC] block mb-0.5">Client</span>
              <span className="text-[#0B1220] text-sm">{clientName}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#8A97AC] block mb-0.5">Timeline</span>
              <span className="text-[#0B1220] text-sm">{timeline}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#8A97AC] block mb-0.5">Team Size</span>
              <span className="text-[#0B1220] text-sm">{teamSize}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#8A97AC] block mb-0.5">Capability</span>
              <span className="text-[#0B1220] text-sm">{category}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE CASE STUDY CONTENT ── */}
      <section className="max-w-[1080px] mx-auto px-6 sm:px-10 pt-16 grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-12 items-start pb-20">
        <div className="space-y-12">
          
          {/* Challenge */}
          <div>
            <h2 className="font-extrabold text-[22px] text-[#0B1220] mb-4">The Challenge</h2>
            <p className="font-medium text-[15px] leading-[1.85] text-[#2E3648]">
              {challenge}
            </p>
          </div>

          {/* Approach steps */}
          <div>
            <h2 className="font-extrabold text-[22px] text-[#0B1220] mb-5">The Approach</h2>
            <div className="flex flex-col gap-5">
              {approach.map((step, idx) => (
                <div key={idx} className="bg-white border border-[#E7ECF3] rounded-[14px] p-5.5 flex gap-4 items-start shadow-sm hover:border-[#0066FF]/35 transition-all">
                  <div className="w-8 h-8 rounded-full bg-[#E8F2FF] border border-[#C9DEFF] flex items-center justify-center font-bold text-[12px] text-[#0066FF] shrink-0">
                    {step.n}
                  </div>
                  <div>
                    <h3 className="font-bold text-[14.5px] text-[#0B1220]">{step.title}</h3>
                    <p className="font-medium text-[12.5px] leading-[1.6] text-[#8A97AC] mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Outcomes */}
          <div>
            <h2 className="font-extrabold text-[22px] text-[#0B1220] mb-4">Outcomes & Impact</h2>
            <p className="font-medium text-[15px] leading-[1.85] text-[#2E3648]">
              {outcome}
            </p>
          </div>

          {/* Key Lessons */}
          <div>
            <h2 className="font-extrabold text-[22px] text-[#0B1220] mb-4.5">Key Lessons Learned</h2>
            <div className="flex flex-col gap-3">
              {lessons.map((l, idx) => (
                <div key={idx} className="flex gap-3.5 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#E4F8EF] flex items-center justify-center font-bold text-[10.5px] text-[#0E9F6E] mt-0.5 shrink-0">✓</div>
                  <div className="font-medium text-[14px] leading-[1.65] text-[#3A4459]">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Client Quote Card */}
          {clientQuote.text && (
            <div className="bg-white border border-[#E7ECF3] border-l-4 border-l-[#0066FF] rounded-[14px] p-6 shadow-sm">
              <p className="font-medium italic text-[14.5px] leading-[1.75] text-[#3A4459]">
                "{clientQuote.text}"
              </p>
              <div className="flex items-center gap-3.5 mt-5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00B8F0] flex items-center justify-center font-bold text-[12.5px] text-white">
                  {clientQuote.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-bold text-[13.5px] text-[#0B1220]">{clientQuote.author}</div>
                  <div className="font-medium text-[11.5px] text-[#8A97AC]">{clientQuote.role}</div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Sidebar specs */}
        <div className="lg:sticky lg:top-28 flex flex-col gap-5">
          
          {/* Tech Stack */}
          <div className="bg-white border border-[#E7ECF3] rounded-[14px] p-6.5 shadow-sm">
            <h3 className="font-bold text-[13px] text-[#0B1220] uppercase tracking-wider mb-4">Core Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {stack.map((s, idx) => (
                <span key={idx} className="font-semibold text-[12px] text-[#3A4459] bg-[#E7ECF3] px-3.5 py-1.5 rounded-[7px] border border-[#D1DCEE]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Project Team */}
          <div className="bg-white border border-[#E7ECF3] rounded-[14px] p-6.5 shadow-sm">
            <h3 className="font-bold text-[13px] text-[#0B1220] uppercase tracking-wider mb-4">Development Team</h3>
            <div className="flex flex-col gap-4">
              {team.map((t, idx) => (
                <div key={idx} className="flex gap-3.5 items-center">
                  <div className="w-[38px] h-[38px] rounded-full bg-[#E8F2FF] border border-[#C9DEFF] flex items-center justify-center font-bold text-[12.5px] text-[#0066FF] shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold text-[13px] text-[#0B1220]">{t.name}</div>
                    <div className="font-medium text-[11px] text-[#8A97AC]">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Cases */}
          <div className="bg-white border border-[#E7ECF3] rounded-[14px] p-6.5 shadow-sm">
            <h3 className="font-bold text-[13px] text-[#0B1220] uppercase tracking-wider mb-4.5">Related Cases</h3>
            <div className="flex flex-col gap-4 divide-y divide-[#F1F5F9]">
              {relatedCases.map((rc, idx) => (
                <div key={idx} className={idx > 0 ? "pt-4" : ""}>
                  <span className="font-bold text-[9.5px] tracking-wider text-[#0066FF] uppercase block mb-1">
                    {rc.industry}
                  </span>
                  <Link href={`/work/case-studies`} className="font-bold text-[13px] leading-snug text-[#0B1220] hover:text-[#0066FF] transition-colors block">
                    {rc.title}
                  </Link>
                  <span className="font-semibold text-[11.5px] text-[#0E9F6E] mt-1 block">
                    Result: {rc.result}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Start conversation Box */}
          <div className="bg-[#050B14] rounded-[14px] p-6 text-white text-center">
            <h3 className="font-extrabold text-[15.5px] text-white">Want to see similar results?</h3>
            <p className="font-medium text-[11.5px] leading-[1.6] text-[#8A9EB0] mt-2">
              Let's build a custom AI solution that fits your business specs.
            </p>
            <Link 
              href="/contact"
              className="w-full text-center mt-4.5 font-bold text-[12.5px] text-[#050B14] bg-[#00B8F0] hover:bg-white py-3.5 rounded-[8px] transition-colors block shadow-[0_0_20px_rgba(0,184,240,0.25)]"
            >
              Discuss Your Project
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
