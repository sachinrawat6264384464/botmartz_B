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
  Sparkles
} from "lucide-react";

export const metadata: Metadata = {
  title: "Reference Implementations & Architecture Teardowns | Botmartz",
  description: "Explore our production-grade AI architectures, open reference builds, and benchmarked engineering teardowns.",
};

const REFERENCE_BUILDS = [
  {
    id: "visadesk-rag",
    badge: "Full-Stack Application OS",
    title: "VisaDesk — Visa & Migration Consultancy Operations OS",
    description: "An enterprise-grade modular monolith engineered with FastAPI, PostgreSQL 16 + pgvector, Redis, and Next.js 15. Features a complete Hybrid Search (BM25 + Dense) RAG pipeline with Corrective RAG (CRAG) system guardrails and multi-role RBAC.",
    stack: ["FastAPI", "Python 3.11", "PostgreSQL", "pgvector", "Redis", "Next.js 15", "TanStack Query", "LlamaIndex"],
    highlights: [
      "Hybrid retrieval combining dense vector similarity with sparse BM25 keyword matching",
      "Cross-encoder reranking postprocessors (BGE / Cohere)",
      "Strict sufficiency gates that enforce refusal when context is missing",
      "Multi-turn conversational memory persisted via Redis"
    ],
    status: "Verified Implementation & Working Showcase",
    linkText: "Explore Architecture Breakdown",
    href: "/services/enterprise-rag"
  },
  {
    id: "langgraph-agent",
    badge: "Constrained Agentic Workflow",
    title: "Deterministic Multi-Actor Customer Operations State Machine",
    description: "A constrained AI agent workflow built on LangGraph that isolates deterministic business logic from probabilistic LLM generation. Incorporates human-in-the-loop validation for any state-changing API invocation.",
    stack: ["LangGraph", "LangChain", "FastAPI", "Next.js", "Server-Sent Events", "Tailwind CSS"],
    highlights: [
      "Explicit cyclic state machines with conditional edge validation",
      "Human-in-the-loop approval nodes for write operations",
      "Tool-calling guardrails with strict Pydantic JSON schema verification",
      "Complete execution tracing and latency telemetry"
    ],
    status: "Production Architectural Pattern",
    linkText: "Explore Agent Architecture",
    href: "/services/ai-agents"
  },
  {
    id: "payer-policy-rag",
    badge: "Complex Document Benchmark",
    title: "Healthcare Payer Policy Ingestion & RAGAS Evaluation Suite",
    description: "An open, reproducible reference benchmark over complex clinical policy documents and tables. Features tiered document parsing (fast born-digital path vs. layout OCR), bounding-box provenance tracing, and automated RAGAS faithfulness testing.",
    stack: ["PyMuPDF", "Docling", "BGE-M3", "RAGAS", "Qdrant", "FastAPI"],
    highlights: [
      "Content-addressed chunk storage with page-level bounding box provenance",
      "Reciprocal Rank Fusion (RRF) merging dense and sparse indexes",
      "Automated evaluation harness measuring Context Recall, Precision, and Faithfulness",
      "Designed for 100% on-premise deployment with zero external API data egress"
    ],
    status: "Open Benchmark Architecture",
    linkText: "View Insights Write-up",
    href: "/insights"
  }
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-[#050B14] text-white pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 border-b border-white/10 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 text-[#00B8F0] font-mono text-xs uppercase tracking-widest mb-4">
            <Sparkles size={13} /> Engineering Teardowns
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-heading tracking-tight mb-4">
            Reference Implementations & Architectures
          </h1>
          <p className="text-lg text-[#8A9EB0] max-w-3xl leading-relaxed">
            At Botmartz, we believe engineering capability is proven through transparent code, benchmarked architectures, and reproducible reference builds—not fabricated marketing metrics. Explore how our production systems are architected.
          </p>
        </div>

        {/* Reference Builds Grid */}
        <div className="space-y-12">
          {REFERENCE_BUILDS.map((build) => (
            <div 
              key={build.id}
              className="bg-[#0E1726]/80 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-xl hover:border-[#00B8F0]/40 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 rounded-md bg-[#0052FF]/20 text-[#00B8F0] font-mono text-xs font-bold uppercase tracking-wider mb-3">
                    {build.badge}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                    {build.title}
                  </h2>
                  <p className="text-[#8A9EB0] text-sm sm:text-base leading-relaxed mb-6">
                    {build.description}
                  </p>
                </div>
              </div>

              {/* Highlights & Tech Stack */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 p-5 rounded-xl bg-[#050B14]/60 border border-white/5">
                <div>
                  <h3 className="text-xs font-mono uppercase text-[#00B8F0] tracking-wider font-bold mb-3 flex items-center gap-2">
                    <CheckCircle2 size={15} /> Architectural Hallmarks
                  </h3>
                  <ul className="space-y-2">
                    {build.highlights.map((h, i) => (
                      <li key={i} className="text-xs sm:text-sm text-[#CBD5E1] flex items-start gap-2">
                        <span className="text-[#00B8F0] mt-0.5">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-mono uppercase text-[#00B8F0] tracking-wider font-bold mb-3 flex items-center gap-2">
                    <Cpu size={15} /> Tech Stack & Tooling
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {build.stack.map((t, i) => (
                      <span key={i} className="px-2.5 py-1 bg-[#152336] text-[#8A9EB0] text-xs font-mono rounded border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span>{build.status}</span>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10">
                <Link 
                  href={build.href}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#00B8F0] hover:text-white transition-colors group-hover:translate-x-1 duration-200"
                >
                  {build.linkText} <ArrowRight size={15} />
                </Link>
                <Link
                  href="/contact"
                  className="text-xs font-mono text-[#8A9EB0] hover:text-white transition-colors"
                >
                  Request Technical Deep Dive →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#0052FF]/20 to-[#00B8F0]/10 border border-[#00B8F0]/30 rounded-2xl p-8 text-center relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Want to see how these architectures apply to your documents?
          </h2>
          <p className="text-[#8A9EB0] text-sm sm:text-base max-w-2xl mx-auto mb-6">
            Book a 30-minute technical discovery call with our founder & GenAI architect to review your corpus and determine RAG feasibility.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://cal.com/botmartz-ai/20min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0052FF] hover:bg-[#0040CC] text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-[#0052FF]/40"
            >
              Schedule Architecture Call
            </a>
            <Link 
              href="/services/enterprise-rag"
              className="text-white hover:text-[#00B8F0] font-mono text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border border-white/10 hover:border-white/30 transition-all"
            >
              Explore Fixed-Fee Pilot ($5,000)
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
