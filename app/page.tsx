import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import TrackedLink from "@/app/_components/TrackedLink";
import ExplodedAIArchitectureHero from "@/app/_components/ExplodedAIArchitectureHero";
import IsometricSystemStack from "@/app/_components/IsometricSystemStack";
import ProblemSolverTransformation from "@/app/_components/ProblemSolverTransformation";
import IndustrySelector from "@/app/_components/IndustrySelector";
import GlobalImpactAndTestimonials from "@/app/_components/GlobalImpactAndTestimonials";
import AnimatedSection from "@/app/_components/AnimatedSection";
import {
  Layers,
  Bot,
  Blocks,
  Code2,
  ShieldCheck,
  Search,
  CheckCircle2,
  ArrowRight,
  Database,
  Cpu,
  Workflow,
  FileCheck,
  Scale,
  ExternalLink,
  ChevronRight,
  Lock,
  Server,
  FileText,
  Terminal,
  Activity,
  Sparkles,
  Zap,
  Check
} from "lucide-react";

export const metadata: Metadata = {
  title: "Enterprise RAG & Agentic AI Systems | Botmartz",
  description: "Enterprise applied AI engineering: deterministic multi-agent systems, high-precision hybrid RAG, and private VPC deployment with zero hallucination.",
  keywords: [
    "Enterprise RAG",
    "Production RAG Architecture",
    "Deterministic AI Agents",
    "Reciprocal Rank Fusion",
    "Hybrid Search BM25 Vector",
    "Cross-Encoder Reranking",
    "LangGraph State Machines",
    "Citation Grounding",
    "Private VPC AI Deployment",
    "Enterprise AI Engineering"
  ],
  openGraph: {
    title: "Enterprise RAG Systems & Autonomous AI Agents | Botmartz",
    description: "Bring your high-consequence business problem. We engineer the verified AI architecture that solves it with 100% citation grounding and private VPC execution.",
    url: "https://www.botmartz.com",
    type: "website",
    images: [
      {
        url: "https://www.botmartz.com/BotmartznewBot.png",
        width: 1200,
        height: 630,
        alt: "Botmartz - Enterprise RAG & Deterministic AI Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise RAG Systems & Autonomous AI Agents | Botmartz",
    description: "Production AI systems for high-consequence enterprise knowledge: legal statutes, aerospace MRO, and financial underwriting.",
    images: ["https://www.botmartz.com/BotmartznewBot.png"],
  },
  alternates: {
    canonical: "https://www.botmartz.com",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#0F172A] antialiased selection:bg-[#0284C7]/15 selection:text-[#0F172A]">
      
      {/* ═══════════════════════════════════════════
          CHAPTER 1: HERO SECTION (CLEAN EDITORIAL + CENTERED VALUE PROP)
      ═══════════════════════════════════════════ */}
      <ExplodedAIArchitectureHero />

      {/* ═══════════════════════════════════════════
          CHAPTER 2: THE 3-LAYER SIGNATURE ARCHITECTURE (HIGH-RES VISUAL + DEEP BENCHMARKS)
      ═══════════════════════════════════════════ */}
      <AnimatedSection id="system" className="pt-12 pb-10 sm:pt-16 sm:pb-12 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-8">
            <div className="lg:col-span-8">
              <div className="font-mono text-xs font-semibold tracking-wider text-[#0284C7] uppercase mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                <span>02 / THE SIGNATURE ARCHITECTURE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
                Three layers. One dependable system.
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm text-[#475569] leading-relaxed">
                Inspect individual layers to examine our deterministic retrieval, AST layout parsing, and LangGraph agent execution pipeline.
              </p>
            </div>
          </div>

          <IsometricSystemStack />

        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════
          CHAPTER 3: BRING YOUR PROBLEM → WE ENGINEER THE SOLUTION
          (The Single Unified Differentiator: Legal, Aviation, Insurance, ERP Mutations)
      ═══════════════════════════════════════════ */}
      <AnimatedSection id="problems-solved" className="pt-10 pb-16 sm:pt-12 sm:pb-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <ProblemSolverTransformation />
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════
          CHAPTER 4: OUR CORE SERVICES & DELIVERY TIMELINE
      ═══════════════════════════════════════════ */}
      <AnimatedSection id="services" className="pt-12 pb-16 sm:pt-14 sm:pb-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="font-mono text-xs font-semibold tracking-wider text-[#0284C7] uppercase mb-2 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
              <span>04 / CAPABILITIES &amp; OFFERINGS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
              Two core practices. One high standard of engineering.
            </h2>
            <p className="text-base text-[#475569]">
              We do not build speculative prototypes or consumer chatbot novelties. We engineer dependable production systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* SERVICE 1: ENTERPRISE RAG SYSTEMS */}
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#E2E8F0] flex flex-col justify-between hover:border-[#CBD5E1] transition-all shadow-sm">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#0F172A] text-white flex items-center justify-center mb-6 shadow-sm">
                  <Database size={24} />
                </div>
                <div className="font-mono text-xs text-[#0284C7] font-semibold mb-2">PRACTICE 01</div>
                <h3 className="text-2xl font-bold text-[#0F172A] tracking-tight mb-4">
                  Enterprise RAG Systems
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed mb-8">
                  Production-grade retrieval augmented generation connecting your databases, documents, and business records to language models with zero hallucination risk and verified citation provenance.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-2.5 text-xs text-[#334155]">
                    <CheckCircle2 size={15} className="text-[#0284C7] shrink-0 mt-0.5" />
                    <span>Hybrid Lucene BM25 + Qdrant / pgvector vector search</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#334155]">
                    <CheckCircle2 size={15} className="text-[#0284C7] shrink-0 mt-0.5" />
                    <span>Cross-encoder reranking &amp; Reciprocal Rank Fusion (k=60)</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#334155]">
                    <CheckCircle2 size={15} className="text-[#0284C7] shrink-0 mt-0.5" />
                    <span>Token-exact verbatim citation anchoring with SHA-256 chunk hashes</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#334155]">
                    <CheckCircle2 size={15} className="text-[#0284C7] shrink-0 mt-0.5" />
                    <span>Tenant-isolated VPC deployment (AWS, GCP, Azure, or on-premise)</span>
                  </div>
                </div>
              </div>

              <div>
                <Link
                  href="/services/enterprise-rag"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0284C7] hover:text-[#0369A1] group"
                >
                  <span>Explore Enterprise RAG Practice</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* SERVICE 2: AUTONOMOUS AI AGENTS */}
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#E2E8F0] flex flex-col justify-between hover:border-[#CBD5E1] transition-all shadow-sm">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#0284C7] text-white flex items-center justify-center mb-6 shadow-sm">
                  <Bot size={24} />
                </div>
                <div className="font-mono text-xs text-[#0284C7] font-semibold mb-2">PRACTICE 02</div>
                <h3 className="text-2xl font-bold text-[#0F172A] tracking-tight mb-4">
                  Deterministic AI Agents
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed mb-8">
                  Goal-driven agents that execute multi-step workflows, query databases, invoke APIs, and automate operational tasks with strict human-in-the-loop governance and Postgres state checkpointing.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-2.5 text-xs text-[#334155]">
                    <CheckCircle2 size={15} className="text-[#0284C7] shrink-0 mt-0.5" />
                    <span>LangGraph stateful cyclical DAGs with deterministic edge routing</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#334155]">
                    <CheckCircle2 size={15} className="text-[#0284C7] shrink-0 mt-0.5" />
                    <span>Postgres checkpointer state persistence across process failures</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#334155]">
                    <CheckCircle2 size={15} className="text-[#0284C7] shrink-0 mt-0.5" />
                    <span>Human-in-the-loop review pauses for state-changing ERP/CRM mutations</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#334155]">
                    <CheckCircle2 size={15} className="text-[#0284C7] shrink-0 mt-0.5" />
                    <span>Saga pattern automated rollback and compensating transactions</span>
                  </div>
                </div>
              </div>

              <div>
                <Link
                  href="/services/ai-agents"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0284C7] hover:text-[#0369A1] group"
                >
                  <span>Explore AI Agents Practice</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>

          {/* 4-PHASE DELIVERY PROTOCOL */}
          <div className="mt-16 p-8 sm:p-10 rounded-2xl border border-[#E2E8F0] bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <div className="font-mono text-xs text-[#0284C7] font-semibold uppercase tracking-wider mb-1">
                  8 TO 12 WEEK PRODUCTION TIMELINE
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">
                  How We Engineer Your AI Stack From Discovery to Production
                </h3>
              </div>
              <div className="font-mono text-xs text-[#64748B] bg-[#F8FAFC] px-3.5 py-1.5 rounded-lg border border-[#E2E8F0] shrink-0">
                FIXED SCOPE · STRICT SLA GATES
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="font-mono text-xs font-bold text-[#0284C7] mb-1">WEEKS 1 - 2</div>
                <div className="font-semibold text-sm text-[#0F172A] mb-2">Technical Discovery &amp; Audit</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Data source audit, document hierarchy profiling, security boundary mapping, and quantitative baseline establishment.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="font-mono text-xs font-bold text-[#0284C7] mb-1">WEEKS 3 - 5</div>
                <div className="font-semibold text-sm text-[#0F172A] mb-2">Pipeline Architecture &amp; RAG PoC</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  AST layout ingestion, hybrid retrieval tuning, cross-encoder thresholding, and initial automated evaluation benchmark harness.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="font-mono text-xs font-bold text-[#0284C7] mb-1">WEEKS 6 - 8</div>
                <div className="font-semibold text-sm text-[#0F172A] mb-2">Agent DAGs &amp; HITL Workflows</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  LangGraph orchestration, tool execution bounds, Postgres state persistence, and human sign-off verification gates.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="font-mono text-xs font-bold text-[#0284C7] mb-1">WEEKS 9 - 12</div>
                <div className="font-semibold text-sm text-[#0F172A] mb-2">Hardening &amp; VPC Handover</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Private tenant deployment, load testing, latency optimization (sub-120ms P99), and full engineering team handover.
                </p>
              </div>

            </div>
          </div>

        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════
          CHAPTER 5: ENGINEERING INSIGHTS & METHODOLOGY
      ═══════════════════════════════════════════ */}
      <AnimatedSection id="insights" className="py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="font-mono text-xs font-semibold tracking-wider text-[#0284C7] uppercase mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                <span>05 / ENGINEERING JOURNAL</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
                Peer-reviewed AI engineering methodology.
              </h2>
            </div>
            <Link
              href="/insights"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#0284C7] hover:underline"
            >
              <span>View All 18 Engineering Dissertations</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <Link 
              href="/insights/chunking-strategies-legal-aerospace"
              className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0284C7]/50 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] mb-3">
                  <span>DISSERTATION 01</span>
                  <span>14 MIN READ</span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#0284C7] transition-colors mb-2">
                  Chunking Strategies for High-Stakes Legal &amp; Aerospace Corpus
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                  Why fixed-size naive token chunking fails on structural clause references, and how AST-level proposition parsing preserves legal hierarchy.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-[#0284C7]">
                <span>Read Technical Paper</span>
                <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            <Link 
              href="/insights/hybrid-retrieval-bm25-dense-reranking"
              className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0284C7]/50 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] mb-3">
                  <span>DISSERTATION 02</span>
                  <span>18 MIN READ</span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#0284C7] transition-colors mb-2">
                  Reciprocal Rank Fusion vs. Cross-Encoder Reranking
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                  Quantitative benchmark comparing latency-accuracy trade-offs between RRF constant k=60 and BGE-reranker across 50,000 regulatory documents.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-[#0284C7]">
                <span>Read Technical Paper</span>
                <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            <Link 
              href="/insights/evaluating-hallucinations-ragas"
              className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0284C7]/50 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] mb-3">
                  <span>DISSERTATION 03</span>
                  <span>12 MIN READ</span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#0284C7] transition-colors mb-2">
                  Automated Evaluation with Ragas &amp; G-Eval Frameworks
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                  Constructing synthetic golden evaluation datasets to measure Faithfulness, Answer Relevance, and Context Precision in continuous CI/CD.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-[#0284C7]">
                <span>Read Technical Paper</span>
                <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════
          CHAPTER 5: GLOBAL FOOTPRINT & VERIFIED CLIENT TESTIMONIALS
      ═══════════════════════════════════════════ */}
      <AnimatedSection id="global-impact">
        <GlobalImpactAndTestimonials />
      </AnimatedSection>

      {/* ═══════════════════════════════════════════
          CHAPTER 6: CALL TO ACTION (SYSTEM DISCOVERY AUDIT)
      ═══════════════════════════════════════════ */}
      <AnimatedSection className="py-20 bg-gradient-to-b from-[#F8FAFC] via-[#F0F9FF]/20 to-[#FFFFFF] border-t border-[#E2E8F0] text-slate-900 relative overflow-hidden">
        {/* Subtle luminous blue & cyan gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[360px] bg-gradient-to-b from-[#0284C7]/8 via-[#0066FF]/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            
            <div className="font-mono text-xs font-semibold tracking-wider text-[#0284C7] uppercase mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] animate-pulse" />
              <span>PRODUCTION CONSULTATION &amp; SCOPING</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A] mb-6">
              Ready to engineer your <span className="text-[#0284C7]">enterprise knowledge system?</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto">
              Schedule a technical discovery session with our founding AI engineering team. We review your document corpus, evaluate retrieval architecture, and provide a clear 8–12 week production roadmap.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <TrackedLink
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-sm transition-all shadow-[0_8px_20px_rgba(0,102,255,0.25)] hover:-translate-y-0.5"
              >
                <span>Schedule Technical Scoping</span>
                <ArrowRight size={16} />
              </TrackedLink>
              <TrackedLink
                href="/services/enterprise-rag"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all border border-slate-300 hover:border-[#0284C7] shadow-2xs"
              >
                <span>Review Architecture Specifications</span>
              </TrackedLink>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#0284C7]" />
                <span>Zero Training On Client Data</span>
              </div>
              <div className="flex items-center gap-2">
                <Server size={14} className="text-[#0284C7]" />
                <span>Private VPC / On-Premise Deployments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-600" />
                <span>Deterministic SHA-256 Provenance</span>
              </div>
            </div>

          </div>
        </div>
      </AnimatedSection>

    </div>
  );
}
