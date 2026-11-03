"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowRight, Database, FileText, Search, ShieldCheck, Zap, 
  Layers, RefreshCw, BarChart, Server, LayoutTemplate, Briefcase, 
  FileSearch, HelpCircle, Calendar, Network, Lock, Cpu, CheckCircle2, AlertTriangle, Play, Sparkles, Terminal, Check
} from "lucide-react";
import DynamicIcon from "@/app/_components/DynamicIcon";
import InteractiveRAGSimulator from "@/app/_components/InteractiveRAGSimulator";

export default function EnterpriseRAGClient({ content }: { content: any }) {
  return (
    <div className="bg-white min-h-screen text-slate-900 selection:bg-[#0284C7]/20 selection:text-[#0F172A] font-sans antialiased">

      {/* ── 1. SIGNATURE HERO: LUMINOUS ARCHITECTURAL WHITE WITH CLEAN BLUE ACCENTS ── */}
      <section className="relative pt-[130px] pb-[100px] bg-gradient-to-b from-[#F8FAFC] via-[#F0F9FF]/30 to-white text-slate-900 overflow-hidden border-b border-[#E2E8F0]">
        
        {/* Luminous Ambient Glows & Grid */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/3 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#0284C7]/10 via-[#38BDF8]/5 to-transparent blur-[120px]" />
          <div className="absolute top-1/4 right-[-5%] w-[500px] h-[500px] bg-[#0284C7]/8 blur-[160px] rounded-full" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0F172A08_1px,transparent_1px),linear-gradient(to_bottom,#0F172A08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,#000_70%,transparent_100%)]" />
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Headline & Technical Value Proposition */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            <div className="font-mono text-xs tracking-wider text-[#0284C7] uppercase mb-6 flex items-center gap-2.5 font-semibold px-3 py-1 rounded-full bg-[#0284C7]/10 border border-[#0284C7]/30">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{content.hero.badge || "ENTERPRISE RAG ARCHITECTURE"}</span>
            </div>
            
            <h1 
              className="text-[clamp(38px,5vw,58px)] leading-[1.08] font-extrabold mb-6 tracking-tight text-[#0F172A]"
              dangerouslySetInnerHTML={{ __html: content.hero.title }}
            />

            <p className="text-base sm:text-lg text-slate-600 mb-10 max-w-[580px] leading-relaxed font-normal">
              {content.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4 items-center mb-10">
              <Link 
                href={content.hero.ctaLink || "https://cal.com/botmartz-ai/20min"} 
                className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-8 py-4 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-md transition-all hover:-translate-y-0.5"
              >
                <span>{content.hero.ctaText || "Book Architecture Review"}</span>
                <ArrowRight size={15} />
              </Link>
              <Link 
                href="/work" 
                className="text-slate-700 hover:text-[#0284C7] px-5 py-4 rounded-xl text-sm transition-colors font-mono flex items-center gap-2 border border-slate-300 bg-white hover:border-[#0284C7] shadow-2xs"
              >
                <span>View Reference Systems</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Micro Benchmark Strip */}
            <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-slate-600 pt-6 border-t border-slate-200 w-full">
              <div className="flex items-center gap-1.5"><Check size={13} className="text-emerald-600" /> &lt; 118ms P99 Latency</div>
              <div className="flex items-center gap-1.5"><Check size={13} className="text-emerald-600" /> Dual BM25 + Qdrant</div>
              <div className="flex items-center gap-1.5"><Check size={13} className="text-emerald-600" /> Cross-Encoder Rerank</div>
            </div>
          </motion.div>

          {/* Right: Embedded Interactive RAG Specification Architecture Graphic */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden group hover:border-[#0284C7]/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-800 font-semibold">
                  <Terminal size={14} className="text-[#0284C7]" />
                  <span>RAG TOPOLOGY PIPELINE</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                  VERIFIED
                </span>
              </div>

              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-slate-200 bg-[#F8FAFC]">
                <Image
                  src="/images/architecture/rag-pipeline-3d.png"
                  alt="Enterprise RAG Photorealistic 3D Architecture"
                  fill
                  priority
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Dual BM25 + Qdrant HNSW Fusion</span>
                <span className="text-[#0284C7] flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform">Interactive Specs ➔</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── 2. PLAIN ENGLISH BREAKDOWN: WHAT IS ENTERPRISE RAG REALLY? ── */}
      <section className="py-20 bg-slate-50 border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="font-mono text-xs tracking-wider text-[#0284C7] uppercase font-semibold block mb-2">
              PLAIN ENGLISH EXPLANATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] mb-4">
              What Is Enterprise RAG? (In Simple Terms)
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Before diving into algorithms, here is what this technology actually does for your business and everyday teams.
            </p>
          </div>

          {/* 3-Way Plain English Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            
            {/* Traditional Search */}
            <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold mb-5">
                  1
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Traditional Keyword Search</h3>
                <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4">Like an Old Library Card Catalog</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  You type a phrase and get <strong>50 blue links or PDF files</strong>. You still have to spend 45 minutes opening each file, reading dozens of pages, and manually copying out the numbers you need.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
                Effort: High manual reading &bull; Accuracy: Unassisted
              </div>
            </div>

            {/* Generic Chatbots */}
            <div className="bg-white border border-red-200 rounded-2xl p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold mb-5">
                  2
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Generic Public Chatbots</h3>
                <p className="text-xs font-mono text-red-600 uppercase tracking-wider mb-4">Like an Overconfident Intern</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Standard AI chats produce fluent, smooth answers. But when they don&apos;t know the exact rule in your company&apos;s 2026 handbook, <strong>they guess and fabricate facts</strong> (hallucination) that sound completely convincing.
                </p>
              </div>
              <div className="pt-4 border-t border-red-100 text-xs font-semibold text-red-600">
                Effort: Fast &bull; Risk: Dangerous fabrications &amp; privacy leaks
              </div>
            </div>

            {/* Enterprise RAG */}
            <div className="bg-white border-2 border-[#0284C7] rounded-2xl p-7 shadow-md flex flex-col justify-between relative">
              <span className="absolute -top-3 right-6 bg-[#0284C7] text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                The Botmartz Standard
              </span>
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F0F9FF] text-[#0284C7] flex items-center justify-center font-bold mb-5">
                  3
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Enterprise Grounded RAG</h3>
                <p className="text-xs font-mono text-[#0284C7] uppercase tracking-wider mb-4">Like Your Sharpest In-House Specialist</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Reads <strong>only your verified company files</strong>. Synthesizes a direct, clear answer in 2 seconds, <strong>highlights the exact page and paragraph</strong> where the proof lives, and openly states <em>&quot;This information is not in your documents&quot;</em> instead of guessing.
                </p>
              </div>
              <div className="pt-4 border-t border-sky-100 text-xs font-semibold text-[#0284C7] flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-600" />
                Effort: Zero &bull; Accuracy: 100% cited proof
              </div>
            </div>

          </div>

          {/* Real Human Impact Across Departments */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
            <div className="max-w-2xl mb-8">
              <span className="font-mono text-xs tracking-wider text-[#0284C7] uppercase font-semibold block mb-1">
                SOLVING DAY-TO-DAY HEADACHES
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                How It Transforms Real Work Across Your Organization
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0 mt-1 border border-sky-100">
                  <Briefcase size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base mb-1">For Legal &amp; Compliance Teams</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Stop spending late nights skimming through 400-page master vendor agreements. Ask: <em>&quot;Which contracts have unlimited indemnification liability?&quot;</em> and get direct side-by-side clause comparisons with exact paragraph citations in seconds.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0 mt-1 border border-sky-100">
                  <Cpu size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base mb-1">For Operations, Field &amp; Plant Engineers</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    When high-value equipment trips on the production floor or aircraft hangar, technicians don&apos;t have 3 hours to locate physical binders. They ask natural questions and get instant diagnostic steps, wiring diagrams, and torque specs with verified source pages.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0 mt-1 border border-sky-100">
                  <FileSearch size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base mb-1">For Customer Support &amp; Technical Sales</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Empower junior representatives to answer tier-3 technical questions immediately without escalating to busy engineers. Responses are guaranteed to match the latest product documentation, pricing tables, and SLA terms.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0 mt-1 border border-sky-100">
                  <Lock size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base mb-1">For CEOs, CIOs &amp; Enterprise Security Officers</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Protect intellectual property. Your confidential company files are deployed in your own private cloud (VPC) with strict employee role permissions (an intern cannot search executive payroll files) and zero training on public AI models.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── 3. PROBLEM VS SOLUTION (KAIRO CARD ELEVATION) ── */}
      <section className="py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-xs tracking-wider text-[#0284C7] uppercase font-semibold block mb-2">
              WHY MOST RAG PILOTS FAIL IN PRODUCTION
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]">
              {content.problemSolution.title || "Naive Vector Search vs. Verified Production Systems"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* The Industry Trap */}
            <div className="bg-[#FFF5F5] border border-red-200 rounded-2xl p-8 sm:p-10 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 text-red-700 font-mono text-xs uppercase tracking-wider font-bold mb-4">
                  <AlertTriangle size={16} />
                  <span>The Industry Trap (Naive Vector Prototype)</span>
                </div>
                <p className="text-[#334155] leading-relaxed text-sm sm:text-base font-normal mb-6">
                  {content.problemSolution.trap}
                </p>
              </div>
              <div className="pt-4 border-t border-red-200/60 font-mono text-xs text-red-600">
                Result: Hallucinated claims, token blindness &amp; zero RBAC isolation.
              </div>
            </div>

            {/* The Botmartz Approach */}
            <div className="bg-[#F0FDF4] border border-emerald-200 rounded-2xl p-8 sm:p-10 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 text-emerald-800 font-mono text-xs uppercase tracking-wider font-bold mb-4">
                  <CheckCircle2 size={16} />
                  <span>The Botmartz Approach (Defensive RAG)</span>
                </div>
                <p className="text-[#334155] leading-relaxed text-sm sm:text-base font-normal mb-6">
                  {content.problemSolution.approach}
                </p>
              </div>
              <div className="pt-4 border-t border-emerald-200/60 font-mono text-xs text-emerald-700">
                Result: 100% token citation grounding with sub-118ms verified retrieval.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. INTERACTIVE RAG SIMULATOR ── */}
      <section className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono text-xs tracking-wider text-[#0284C7] uppercase font-semibold block mb-2">
              SIMULATE RETRIEVAL PIPELINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]">
              Test The Retrieval &amp; Attribution Matrix
            </h2>
          </div>

          <InteractiveRAGSimulator />
        </div>
      </section>

      {/* ── 4. PRODUCTION ARCHITECTURE BREAKDOWN (DETAILED BLUEPRINT) ── */}
      <section className="py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-mono text-xs tracking-wider text-[#0284C7] uppercase font-semibold block mb-2">
              SYSTEM ARCHITECTURE SPECIFICATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-3">
              Deterministic Multi-Stage Retrieval Engine
            </h2>
            <p className="text-sm text-slate-600">
              End-to-end trace from document layout decomposition to token-level citation grounding with sub-118ms verified SLA.
            </p>
          </div>

          <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white group hover:border-[#0284C7]/50 transition-all duration-300">
            <div className="relative aspect-[16/9] w-full bg-[#F8FAFC]">
              <Image
                src="/images/architecture/rag-pipeline-specification.svg"
                alt="Botmartz Verified Defensive RAG Pipeline Architecture Graphic"
                fill
                priority
                className="object-contain p-2 sm:p-4 group-hover:scale-[1.01] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. PRODUCTION FEATURES GRID ── */}
      <section className="py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="font-mono text-xs tracking-wider text-[#0284C7] uppercase mb-2 font-semibold">
              ARCHITECTURAL SPECIFICATIONS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-[#0F172A]">
              Built for Trust, Not Just Chat.
            </h2>
            <p className="text-sm text-[#475569]">
              Every component is engineered to operate under dirty real-world enterprise documents with strict latency SLAs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.features.map((item: any, i: number) => (
              <div 
                key={i}
                className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-2xl hover:border-[#0284C7]/50 hover:shadow-sm transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] text-[#0284C7] flex items-center justify-center mb-4 group-hover:bg-[#0284C7] group-hover:text-white transition-colors">
                    <Database size={18} />
                  </div>
                  <h3 className="font-bold text-base text-[#0F172A] mb-2">{item.title}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed mb-4">{item.desc || item.description}</p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-[11px] font-mono text-[#0284C7] font-semibold">
                  Verified Component ➔
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. PRODUCTION DELIVERY PROTOCOL & TIMELINE ── */}
      <section className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="font-mono text-xs tracking-wider text-[#0284C7] uppercase mb-2 font-semibold">
              ENGINEERING DELIVERY MATRIX
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-[#0F172A]">
              4–6 Week Production Deployment Sprints
            </h2>
            <p className="text-sm text-[#475569]">
              From raw corpus audit to hardened private VPC deployment with automated RAGAS regression gates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.process?.map((p: any, idx: number) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-[#0284C7]/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xl font-extrabold text-[#0284C7]">{p.step}</span>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">{p.duration}</span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{p.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                  <span>Scope:</span>
                  <span className="font-bold text-slate-800">{p.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. VERIFIED USE CASES (AEROSPACE, LEGAL, HEALTHCARE, FINANCE) ── */}
      <section className="py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="font-mono text-xs tracking-wider text-[#0284C7] uppercase mb-2 font-semibold">
              FIELD IMPLEMENTATIONS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-[#0F172A]">
              Tested on Complex High-Consequence Documents
            </h2>
            <p className="text-sm text-[#475569]">
              Where missing a single clause or misreading a wiring schematic carries critical legal or operational penalties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.useCases?.map((uc: any, idx: number) => (
              <div key={idx} className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-8 hover:border-[#0284C7]/40 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#0284C7] flex items-center justify-center mb-5 group-hover:bg-[#0284C7] group-hover:text-white transition-colors">
                    <Briefcase size={18} />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-3">{uc.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">{uc.description}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 w-fit">
                  <CheckCircle2 size={13} />
                  <span>100% Citation Grounding Guaranteed</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FREQUENTLY ASKED ARCHITECTURAL QUESTIONS ── */}
      <section className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="font-mono text-xs tracking-wider text-[#0284C7] uppercase mb-2 font-semibold">
              TECHNICAL FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-[#0F172A]">
              Enterprise RAG Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600">
              Clear engineering answers regarding private VPC deployments, latency SLAs, and hallucination defense.
            </p>
          </div>

          <div className="space-y-4">
            {content.faqs?.map((faq: any, idx: number) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs hover:border-[#0284C7]/40 transition-colors">
                <h3 className="font-bold text-base text-slate-900 mb-2 flex items-start gap-2">
                  <span className="text-[#0284C7] font-mono">Q{idx+1}:</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. CTA CHAPTER ── */}
      <section className="py-20 bg-white text-slate-900 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-4">
              {content.cta?.title || "Let's Map Out Your Knowledge & Search Architecture."}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mb-8 leading-relaxed">
              {content.cta?.subtitle || "Bring your toughest document challenge. We'll show you exactly how to structure ingestion, retrieval, and evaluation to get it into production reliably."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link 
                href={content.hero.ctaLink || "https://cal.com/botmartz-ai/20min"} 
                className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-8 py-4 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-md transition-all hover:-translate-y-0.5"
              >
                <span>{content.cta?.buttonText || "Book Your Architecture Review →"}</span>
                <ArrowRight size={15} />
              </Link>
              <Link 
                href="/work" 
                className="text-slate-700 hover:text-[#0284C7] px-6 py-4 rounded-xl text-sm transition-colors font-mono flex items-center gap-2 border border-slate-300 bg-white hover:border-[#0284C7] shadow-2xs"
              >
                <span>View Shipped Systems</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
