import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { 
  ArrowRight, 
  Database, 
  Bot, 
  ShieldCheck, 
  Terminal, 
  FileText, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  Search,
  Activity,
  Workflow
} from "lucide-react";
import TrackedLink from "@/app/_components/TrackedLink";

export const metadata: Metadata = {
  title: "Reference Implementations & Architecture Teardowns",
  description: "Explore Botmartz reference architectures, production RAG pipelines, and deterministic agent implementations with explicit blueprints and benchmark standards.",
  openGraph: {
    title: "Reference Implementations & Architecture Teardowns",
    description: "Explore Botmartz reference architectures, production RAG pipelines, and deterministic agent implementations.",
    url: "https://www.botmartz.com/work/case-studies",
    type: "website"
  },
  alternates: {
    canonical: "https://www.botmartz.com/work/case-studies"
  }
};

const REFERENCE_BUILDS = [
  {
    id: "insurance-intelligence",
    badge: "Flagship Reference Implementation",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    title: "Insurance Policy Intelligence & Clause Discrepancy Engine",
    description: "A production-style reference implementation demonstrating layout-aware multi-document policy comparison, endorsement discrepancy detection, exact paragraph citation grounding, and automated refusal guardrails.",
    stack: ["OpenSearch / Qdrant", "Dense 768-dim Vectors", "BM25 Keyword Sparse", "BGE-Reranker-Large", "Pydantic Schema", "FastAPI"],
    metrics: [
      { label: "Evaluation", value: "Benchmark Set" },
      { label: "Retrieval", value: "Hybrid (Dense + BM25)" },
      { label: "Citation Strictness", value: "Exact Paragraph" },
      { label: "Refusal Guardrail", value: "Deterministic" }
    ],
    highlights: [
      "Layout-aware table extraction with Markdown-preserving chunk boundaries",
      "Reciprocal Rank Fusion (RRF) combining dense embeddings with sparse BM25 token indexes",
      "Cross-encoder reranking re-scoring top-25 candidate passages to top-5 evidence spans",
      "Zero-hallucination abstention trigger when cosine similarity or cross-encoder thresholds fail"
    ],
    status: "Illustrated Walkthrough",
    linkText: "View Illustrated Walkthrough →",
    href: "/work/labs/insurance-intelligence"
  },
  {
    id: "visadesk-rag",
    badge: "Architecture Pattern: Illustrative Scenario",
    badgeColor: "bg-blue-50 text-[#0066FF] border-blue-200",
    title: "VisaDesk — Visa & Migration Consultancy Operations OS",
    description: "An enterprise-grade modular monolith architecture engineered with FastAPI, PostgreSQL 16 + pgvector, Redis, and Next.js 15. Features a complete Hybrid Search RAG pipeline with Corrective RAG (CRAG) system guardrails and multi-role RBAC.",
    stack: ["FastAPI", "Python 3.11", "PostgreSQL", "pgvector", "Redis", "Next.js 15", "TanStack Query", "LlamaIndex"],
    metrics: [
      { label: "Architecture", value: "Modular Monolith" },
      { label: "Retrieval", value: "Dense + BM25" },
      { label: "Guardrail", value: "CRAG Verification" },
      { label: "State", value: "Redis Cache" }
    ],
    highlights: [
      "Hybrid retrieval combining dense vector similarity with sparse BM25 keyword matching",
      "Cross-encoder reranking postprocessors (BGE / Cohere)",
      "Strict sufficiency gates that enforce refusal when context is missing",
      "Multi-turn conversational memory persisted via Redis"
    ],
    status: "Architecture Blueprint & Verified Pattern",
    linkText: "Explore Enterprise RAG Architecture →",
    href: "/services/enterprise-rag"
  },
  {
    id: "langgraph-agent",
    badge: "Architecture Pattern: Illustrative Scenario",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    title: "Deterministic Multi-Actor Operations State Machine",
    description: "A constrained AI agent workflow built on LangGraph that isolates deterministic business logic from probabilistic LLM generation. Incorporates human-in-the-loop validation for any state-changing API invocation.",
    stack: ["LangGraph", "LangChain", "FastAPI", "Next.js", "Server-Sent Events", "Tailwind CSS"],
    metrics: [
      { label: "Control Flow", value: "Cyclic Graph" },
      { label: "Safety", value: "Human Approval Node" },
      { label: "Schema", value: "Pydantic JSON" },
      { label: "Telemetry", value: "OpenTelemetry" }
    ],
    highlights: [
      "Explicit cyclic state machines with conditional edge validation",
      "Human-in-the-loop approval nodes for write operations",
      "Tool-calling guardrails with strict Pydantic JSON schema verification",
      "Complete execution tracing and latency telemetry"
    ],
    status: "Production Architectural Pattern",
    linkText: "Explore Agentic Architecture →",
    href: "/services/ai-agents"
  }
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      
      {/* ── 1. HERO SECTION (DARK THEME) ── */}
      <section className="relative pt-[130px] pb-[80px] overflow-hidden bg-[#050B14] text-white border-b border-white/10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/12 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0052FF]/15 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 text-[#00B8F0] font-mono text-xs uppercase tracking-widest mb-6 shadow-sm">
            <Sparkles size={14} className="text-[#00B8F0]" />
            <span>ENGINEERING TEARDOWNS &amp; REFERENCE IMPLEMENTATIONS</span>
          </div>
          
          <h1 className="text-[clamp(32px,4.5vw,56px)] font-bold font-heading tracking-tight leading-[1.12] text-white mb-6 max-w-4xl">
            Reference Implementations &amp; <br />
            <span className="bg-gradient-to-r from-[#00B8F0] via-[#0066FF] to-[#60A5FA] bg-clip-text text-transparent">
              Architecture Teardowns.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#8A9EB0] max-w-3xl leading-relaxed font-normal mb-8">
            At Botmartz, we believe engineering capability is proven through transparent code, benchmarked architectures, and reproducible reference builds. Explore how our production systems and evaluation harnesses are architected.
          </p>

          <div className="p-4 rounded-xl bg-[#091222]/80 border border-white/10 text-xs text-[#8A9EB0] max-w-3xl font-mono">
            <strong className="text-white">Editorial Standard: </strong> All builds below are presented either as illustrated walkthroughs with reproducible benchmarks or as verified architecture patterns with explicit structural blueprints.
          </div>
        </div>
      </section>

      {/* ── 2. REFERENCE BUILDS GRID (LIGHT THEME) ── */}
      <section className="py-16 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10 space-y-10">
          
          {REFERENCE_BUILDS.map((build) => (
            <div 
              key={build.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:border-[#0066FF]/40 hover:shadow-md transition-all relative overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
                <div className="flex-1">
                  <span className={`inline-block px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider mb-3 border ${build.badgeColor}`}>
                    {build.badge}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading mb-3">
                    {build.title}
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {build.description}
                  </p>
                </div>
              </div>

              {/* Metrics Grid */}
              {build.metrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6">
                  {build.metrics.map((m, idx) => (
                    <div key={idx}>
                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">{m.label}</div>
                      <div className="text-base sm:text-lg font-bold text-[#0066FF] mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Highlights & Tech Stack */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 p-5 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <h3 className="text-xs font-mono uppercase text-[#0066FF] tracking-wider font-bold mb-3 flex items-center gap-2">
                    <CheckCircle2 size={15} /> Architectural Hallmarks
                  </h3>
                  <ul className="space-y-2">
                    {build.highlights.map((h, i) => (
                      <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                        <span className="text-[#0066FF] mt-0.5 font-bold">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-mono uppercase text-[#0066FF] tracking-wider font-bold mb-3 flex items-center gap-2">
                    <Cpu size={15} /> Tech Stack &amp; Tooling
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {build.stack.map((t, i) => (
                      <span key={i} className="px-2.5 py-1 bg-white text-slate-700 text-xs font-mono rounded border border-slate-200 shadow-2xs">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-2 text-xs font-mono text-emerald-700 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{build.status}</span>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
                <Link 
                  href={build.href}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0066FF] hover:text-[#0052CC] transition-colors"
                >
                  {build.linkText}
                </Link>
                <Link
                  href="/contact"
                  className="text-xs font-mono text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Request Technical Deep Dive →
                </Link>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ── 3. BOTTOM CTA SECTION (LIGHT THEME) ── */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 mb-3">
            Want to see how these architectures apply to your documents?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Book an architecture discovery review to analyze your document formats, security boundaries, and retrieval feasibility.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink 
              href="/contact?type=architecture-review"
              eventName="button_click"
              eventData={{ button_name: "case_studies_book_review" }}
              className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-[0_4px_20px_rgba(0,102,255,0.3)]"
            >
              Book an Architecture Review <ArrowRight size={16} className="inline ml-1" />
            </TrackedLink>
            <Link 
              href="/work/labs/insurance-intelligence"
              className="text-slate-700 hover:text-[#0066FF] font-mono text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border border-slate-300 hover:border-[#0066FF] bg-white transition-all shadow-sm"
            >
              View Live Insurance Lab
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
