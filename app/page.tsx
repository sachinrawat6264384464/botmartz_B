import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import TrackedLink from "@/app/_components/TrackedLink";
import LivingKnowledgeCore from "@/app/_components/LivingKnowledgeCore";
import IndustrySelector from "@/app/_components/IndustrySelector";
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
  FileText
} from "lucide-react";

export const metadata: Metadata = {
  title: "Enterprise RAG & AI Agents | Built for Production | Botmartz",
  description: "Botmartz engineers production AI systems that turn complex business knowledge into dependable, evidence-grounded workflows with verified citations and private deployment.",
  openGraph: {
    title: "Enterprise RAG & AI Agents | Built for Production | Botmartz",
    description: "AI engineering for real business knowledge. Enterprise RAG systems, deterministic AI agents, and private cloud deployment.",
    url: "https://www.botmartz.com",
    type: "website",
    images: [
      {
        url: "https://www.botmartz.com/BotmartznewBot.png",
        width: 1200,
        height: 630,
        alt: "Botmartz - The Living Intelligence System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise RAG & AI Agents | Built for Production | Botmartz",
    description: "AI engineering for real business knowledge. Grounded answers, verified citations, private deployment.",
    images: ["https://www.botmartz.com/BotmartznewBot.png"],
  },
  alternates: {
    canonical: "https://www.botmartz.com",
  },
};

const CHAPTERS = [
  { id: "premise", name: "01 / Premise" },
  { id: "tension", name: "02 / Reality" },
  { id: "system", name: "03 / Architecture" },
  { id: "disciplines", name: "04 / Solutions" },
  { id: "industries", name: "05 / Industries" },
  { id: "proof", name: "06 / Proof" },
  { id: "insights", name: "07 / Journal" },
  { id: "invitation", name: "08 / Connect" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAFCFE] text-[#0B1C2C] antialiased selection:bg-[#00B8F0]/20 selection:text-[#0B1C2C]">
      
      {/* ═══════════════════════════════════════════
          CHAPTER 1: THE PREMISE (HERO CHAPTER)
      ═══════════════════════════════════════════ */}
      <section className="relative pt-[120px] pb-[80px] overflow-hidden border-b border-[#E2EBF2] bg-gradient-to-b from-[#F2F7FB] via-[#FAFCFE] to-white">
        {/* Subtle Ambient Blueprint Grid */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: 'linear-gradient(#C9DCE9 1px, transparent 1px), linear-gradient(90deg, #C9DCE9 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5F3FC] border border-[#00B8F0]/30 font-mono text-[11px] font-bold text-[#0678BE] tracking-widest uppercase mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#00B8F0] animate-pulse" />
                <span>AI ENGINEERING · BUILT FOR PRODUCTION</span>
              </div>

              <h1 className="text-[clamp(40px,5vw,68px)] font-extrabold tracking-tight leading-[1.04] mb-6 text-[#0B1C2C]">
                Your business has the knowledge. <br />
                <span className="text-[#0678BE] italic font-serif">
                  We engineer the intelligence.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#4B6175] max-w-[580px] mb-8 leading-relaxed font-normal">
                Botmartz designs and deploys AI systems that turn complex, fragmented business knowledge into evidence-grounded answers and controlled, auditable workflows.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 items-center mb-10">
                <TrackedLink
                  href="/contact?type=architecture-review"
                  eventName="button_click"
                  eventData={{ button_name: "home_hero_discuss" }}
                  className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-7 py-4 rounded-xl text-sm font-bold transition-all shadow-[0_4px_20px_rgba(0,102,255,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Discuss an AI Project</span>
                  <ArrowRight className="w-4 h-4" />
                </TrackedLink>
                <a
                  href="#system"
                  className="inline-flex items-center gap-2 border border-[#C9DCE9] bg-white text-[#0B1C2C] hover:border-[#0092D7] hover:text-[#0092D7] px-6 py-4 rounded-xl text-sm font-bold transition-all shadow-sm"
                >
                  <span>Explore the Architecture ↓</span>
                </a>
              </div>

              {/* Tri-Check Guarantee Bar */}
              <div className="pt-6 border-t border-[#E2EBF2] flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono font-semibold text-[#4B6175]">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E5F3FC] text-[#0678BE] flex items-center justify-center text-[10px] font-bold">✓</span>
                  <span>Evidence-grounded retrieval</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E5F3FC] text-[#0678BE] flex items-center justify-center text-[10px] font-bold">✓</span>
                  <span>Controlled agent actions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E5F3FC] text-[#0678BE] flex items-center justify-center text-[10px] font-bold">✓</span>
                  <span>Private VPC deployment</span>
                </div>
              </div>
            </div>

            {/* Right Interactive 3D Visual Column (5 cols) */}
            <div className="lg:col-span-5 w-full">
              <LivingKnowledgeCore currentStage="retrieval" />
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CHAPTER 2: THE TENSION (PROTOTYPE VS. PRODUCTION)
      ═══════════════════════════════════════════ */}
      <section id="tension" className="py-24 bg-white border-b border-[#E2EBF2]">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
            <div className="lg:col-span-7">
              <div className="font-mono text-xs font-bold tracking-[0.14em] text-[#0092D7] uppercase mb-3">
                02 / THE PRODUCTION TENSION
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1C2C] tracking-tight">
                A convincing demo is not a production system.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base text-[#4B6175] leading-relaxed">
                Generative AI prototypes produce impressive impressions. Production systems must operate under dirty schemas, permission boundaries, strict latency budgets, and real financial consequences.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border border-[#C9DCE9] rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(11,28,44,0.04)]">
            
            {/* Left: Demo Conditions */}
            <div className="p-8 sm:p-12 bg-white border-b md:border-b-0 md:border-r border-[#C9DCE9]">
              <div className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest pb-4 mb-6 border-b border-slate-100 flex items-center justify-between">
                <span>TYPICAL DEMO CONDITIONS</span>
                <span className="text-[10px] text-red-500 font-semibold">[FRAGILE STACK]</span>
              </div>

              <div className="space-y-6">
                {[
                  { title: "Clean, curated sample documents", desc: "Small mock files that bypass complex layout parsing, OCR tables, and dense formatting." },
                  { title: "Happy-path query assumptions", desc: "Prompts tuned because the vector index happened to yield close cosine proximity." },
                  { title: "Unrestricted context & zero permissions", desc: "No tenant separation, role-based access control (RBAC), or sensitive privacy gating." },
                  { title: "Impressionistic output without evidence", desc: "Fluent language that sounds plausible but lacks token-verifiable source citations." },
                  { title: "A successful one-off test run", desc: "Demos don't reveal catastrophic silent failures when documents change or scale up." },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-md bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✕
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#0B1C2C] mb-1">{item.title}</div>
                      <div className="text-xs text-[#4B6175] leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Production Reality */}
            <div className="p-8 sm:p-12 bg-[#F4F9FD]">
              <div className="font-mono text-xs font-bold text-[#0678BE] uppercase tracking-widest pb-4 mb-6 border-b border-[#C9DCE9]/80 flex items-center justify-between">
                <span>PRODUCTION ENGINEERING REALITY</span>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">[DEFENSIVE STACK]</span>
              </div>

              <div className="space-y-6">
                {[
                  { title: "Complex, unstructured business knowledge", desc: "Multi-decade PDFs, nested financial tables, scanned SOPs, and scattered databases." },
                  { title: "Ambiguous, token-sparse real queries", desc: "Short jargon, token negation, and cross-reference queries that fool naive vector search." },
                  { title: "Access-aware retrieval & data sovereignty", desc: "Hard metadata partitioning, tenant isolation, and strict document access barriers." },
                  { title: "Evidence-grounded responses & citations", desc: "Token-level paragraph attribution with verified refusal when evidence is missing." },
                  { title: "Continuous regression testing with RAGAS", desc: "Automated test suites scoring faithfulness, context recall, and agent trajectory safety." },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-md bg-[#E5F3FC] text-[#0678BE] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#0B1C2C] mb-1">{item.title}</div>
                      <div className="text-xs text-[#4B6175] leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CHAPTER 3: THE SYSTEM (ARCHITECTURE REVEAL)
      ═══════════════════════════════════════════ */}
      <section id="system" className="py-24 bg-[#F7FAFD] border-b border-[#E2EBF2]">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
            <div className="lg:col-span-7">
              <div className="font-mono text-xs font-bold tracking-[0.14em] text-[#0092D7] uppercase mb-3">
                03 / SYSTEM TOPOLOGY
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1C2C] tracking-tight">
                Good AI is an engineered system, not a single model.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base text-[#4B6175] leading-relaxed">
                The architecture must follow the data, the security boundaries, and the operational workflow. Each layer has an explicit responsibility — and a measurable verification metric.
              </p>
            </div>
          </div>

          {/* Interactive Topology Container */}
          <div className="bg-white border border-[#C9DCE9] rounded-3xl p-6 sm:p-10 shadow-[0_10px_30px_rgba(11,28,44,0.04)]">
            
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E2EBF2]">
              <div className="text-xs font-mono font-bold text-[#0B1C2C]">
                ENTERPRISE RETRIEVAL &amp; AGENT EXECUTION SCHEMATIC
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Grounded Pipeline
                </span>
                <span>|</span>
                <span>Latency p95: 42ms</span>
              </div>
            </div>

            {/* 5 Architectural Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              <div className="p-5 rounded-2xl bg-[#F8FAFD] border border-[#C9DCE9] flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[10px] font-bold text-[#0092D7] uppercase mb-2">01 / INGESTION</div>
                  <h3 className="font-bold text-sm text-[#0B1C2C] mb-2">Document Ingestion &amp; Chunking</h3>
                  <p className="text-xs text-[#4B6175] leading-relaxed">
                    AST-aware parsing across PDFs and SQL schemas. Proposition boundary extraction with parent-document mapping.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 font-mono text-[10px] text-slate-500">
                  Zero token loss
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8FAFD] border border-[#C9DCE9] flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[10px] font-bold text-[#0092D7] uppercase mb-2">02 / RETRIEVAL</div>
                  <h3 className="font-bold text-sm text-[#0B1C2C] mb-2">Dual Hybrid Search</h3>
                  <p className="text-xs text-[#4B6175] leading-relaxed">
                    Parallel ANN dense vector traversal and Lucene BM25 sparse keyword indices with hard metadata pre-filtering.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 font-mono text-[10px] text-slate-500">
                  Recall: &gt; 98.4%
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8FAFD] border border-[#C9DCE9] flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[10px] font-bold text-[#0092D7] uppercase mb-2">03 / FUSION</div>
                  <h3 className="font-bold text-sm text-[#0B1C2C] mb-2">Reciprocal Rank Fusion (RRF)</h3>
                  <p className="text-xs text-[#4B6175] leading-relaxed">
                    $k=60$ harmonic scoring combining dense semantic candidates with exact token matches to eliminate retrieval blindspots.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 font-mono text-[10px] text-slate-500">
                  Top-100 consensus
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#EAF5FC] border border-[#0092D7]/40 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="font-mono text-[10px] font-bold text-[#0678BE] uppercase mb-2">04 / RERANK</div>
                  <h3 className="font-bold text-sm text-[#0B1C2C] mb-2">Cross-Encoder Validation</h3>
                  <p className="text-xs text-[#4B6175] leading-relaxed">
                    Full cross-attention scoring (BGE-Reranker-Large). Discards low-confidence candidates with calibrated threshold $S \ge 0.72$.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#0092D7]/20 font-mono text-[10px] text-[#0678BE] font-bold">
                  Zero hallucinations
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8FAFD] border border-[#C9DCE9] flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[10px] font-bold text-[#0092D7] uppercase mb-2">05 / ACTION</div>
                  <h3 className="font-bold text-sm text-[#0B1C2C] mb-2">State Machine &amp; HITL</h3>
                  <p className="text-xs text-[#4B6175] leading-relaxed">
                    LangGraph cyclic workflows with Postgres checkpointing, tool schema enforcement, and human approval gates for critical edits.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 font-mono text-[10px] text-slate-500">
                  Fully auditable
                </div>
              </div>

            </div>

            {/* Bottom Governance Protocol Strip */}
            <div className="mt-8 pt-6 border-t border-[#E2EBF2] flex flex-wrap justify-between items-center gap-4 text-xs font-mono text-[#4B6175]">
              <span>↳ RBAC / TENANT DATA ISOLATION</span>
              <span>↳ OPENTELEMETRY TRACING &amp; AUDIT LOGS</span>
              <span>↳ RAGAS REGRESSION HARNESS</span>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CHAPTER 4: THREE CORE DISCIPLINES (OFFERS)
      ═══════════════════════════════════════════ */}
      <section id="disciplines" className="py-24 bg-white border-b border-[#E2EBF2]">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
            <div className="lg:col-span-7">
              <div className="font-mono text-xs font-bold tracking-[0.14em] text-[#0092D7] uppercase mb-3">
                04 / CORE CAPABILITIES
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1C2C] tracking-tight">
                Three disciplines. One production mindset.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base text-[#4B6175] leading-relaxed">
                We focus on the layers that determine whether an enterprise AI investment succeeds: high-precision retrieval, deterministic state execution, and sovereign deployment.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Capability 1: Enterprise RAG */}
            <div className="bg-[#F8FAFD] border border-[#C9DCE9] rounded-3xl p-8 flex flex-col justify-between hover:border-[#0092D7] transition-all hover:shadow-[0_12px_36px_rgba(0,146,215,0.08)] group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E5F3FC] border border-[#C9DCE9] text-[#0092D7] flex items-center justify-center mb-6">
                  <Database size={22} />
                </div>
                <div className="font-mono text-[11px] font-bold text-[#0678BE] uppercase mb-2">01 / RETRIEVAL ENGINEERING</div>
                <h3 className="text-2xl font-bold text-[#0B1C2C] mb-3">Enterprise RAG Systems</h3>
                <p className="text-sm text-[#4B6175] leading-relaxed mb-6">
                  Grounded search architecture combining hybrid vector and keyword indices to retrieve exact supporting passages before generation begins.
                </p>
                <ul className="space-y-2.5 pt-4 border-t border-[#C9DCE9] mb-8 text-xs text-[#0B1C2C] font-semibold">
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#0092D7]" /> Layout-aware table and PDF parsing</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#0092D7]" /> Cross-encoder reranking &amp; RRF consensus</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#0092D7]" /> Role-based permission filtering (RBAC)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#0092D7]" /> Verifiable paragraph citations</li>
                </ul>
              </div>
              <TrackedLink
                href="/services/enterprise-rag"
                eventName="button_click"
                eventData={{ button_name: "home_card_rag" }}
                className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#0066FF] hover:text-[#0052CC]"
              >
                <span>Explore RAG Architecture</span>
                <ArrowRight size={13} />
              </TrackedLink>
            </div>

            {/* Capability 2: Production AI Agents */}
            <div className="bg-[#F8FAFD] border border-[#C9DCE9] rounded-3xl p-8 flex flex-col justify-between hover:border-[#0092D7] transition-all hover:shadow-[0_12px_36px_rgba(0,146,215,0.08)] group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E5F3FC] border border-[#C9DCE9] text-[#0092D7] flex items-center justify-center mb-6">
                  <Workflow size={22} />
                </div>
                <div className="font-mono text-[11px] font-bold text-[#0678BE] uppercase mb-2">02 / WORKFLOW ORCHESTRATION</div>
                <h3 className="text-2xl font-bold text-[#0B1C2C] mb-3">Production AI Agents</h3>
                <p className="text-sm text-[#4B6175] leading-relaxed mb-6">
                  Deterministic state machines that execute business workflows safely. Equipped with typed tools, state checkpointing, and human-in-the-loop review.
                </p>
                <ul className="space-y-2.5 pt-4 border-t border-[#C9DCE9] mb-8 text-xs text-[#0B1C2C] font-semibold">
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#0092D7]" /> LangGraph cyclic graphs &amp; state persistence</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#0092D7]" /> Pydantic tool schema validation</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#0092D7]" /> Approval gates for irreversible actions</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#0092D7]" /> Circuit breakers &amp; fallback recovery</li>
                </ul>
              </div>
              <TrackedLink
                href="/services/ai-agents"
                eventName="button_click"
                eventData={{ button_name: "home_card_agents" }}
                className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#0066FF] hover:text-[#0052CC]"
              >
                <span>Explore AI Agents</span>
                <ArrowRight size={13} />
              </TrackedLink>
            </div>

            {/* Capability 3: Private AI Deployment */}
            <div className="bg-[#F8FAFD] border border-[#C9DCE9] rounded-3xl p-8 flex flex-col justify-between hover:border-[#0092D7] transition-all hover:shadow-[0_12px_36px_rgba(0,146,215,0.08)] group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E5F3FC] border border-[#C9DCE9] text-[#0092D7] flex items-center justify-center mb-6">
                  <Server size={22} />
                </div>
                <div className="font-mono text-[11px] font-bold text-[#0678BE] uppercase mb-2">03 / SOVEREIGN INFRASTRUCTURE</div>
                <h3 className="text-2xl font-bold text-[#0B1C2C] mb-3">Private AI Deployment</h3>
                <p className="text-sm text-[#4B6175] leading-relaxed mb-6">
                  Deployable within your private cloud environment (AWS Bedrock, Azure AI, GCP Vertex) or on-prem. Complete data sovereignty and zero telemetry leaks.
                </p>
                <ul className="space-y-2.5 pt-4 border-t border-[#C9DCE9] mb-8 text-xs text-[#0B1C2C] font-semibold">
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#0092D7]" /> VPC peering &amp; private endpoint configuration</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#0092D7]" /> Air-gapped container orchestration</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#0092D7]" /> Zero foundational model training retention</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#0092D7]" /> Complete operational code handover</li>
                </ul>
              </div>
              <TrackedLink
                href="/services/enterprise-rag"
                eventName="button_click"
                eventData={{ button_name: "home_card_private" }}
                className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#0066FF] hover:text-[#0052CC]"
              >
                <span>Explore Private Deployment</span>
                <ArrowRight size={13} />
              </TrackedLink>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CHAPTER 5: THE INDUSTRY LENS
      ═══════════════════════════════════════════ */}
      <section id="industries" className="py-24 bg-[#F7FAFD] border-b border-[#E2EBF2]">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
            <div className="lg:col-span-7">
              <div className="font-mono text-xs font-bold tracking-[0.14em] text-[#0092D7] uppercase mb-3">
                05 / DOMAIN SPECIALIZATION
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1C2C] tracking-tight">
                Knowledge is different in every industry.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base text-[#4B6175] leading-relaxed">
                The underlying retrieval algorithms and agent state engines adapt to the terminology, document layout conventions, and regulatory boundaries of your sector.
              </p>
            </div>
          </div>

          <IndustrySelector />

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CHAPTER 6: PROOF (ENGINEERING CASE STUDIES)
      ═══════════════════════════════════════════ */}
      <section id="proof" className="py-24 bg-white border-b border-[#E2EBF2]">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
            <div className="lg:col-span-7">
              <div className="font-mono text-xs font-bold tracking-[0.14em] text-[#0092D7] uppercase mb-3">
                06 / TRANSPARENT ENGINEERING
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1C2C] tracking-tight">
                Show the thinking behind the system.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base text-[#4B6175] leading-relaxed">
                Technical credibility comes from showing architectural decisions, mathematical boundaries, and trade-offs — not making inflated claims.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Case Study 1 */}
            <div className="bg-[#F8FAFD] border border-[#C9DCE9] rounded-3xl p-8 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pb-4 mb-6 border-b border-slate-200">
                  <span className="text-[#0678BE] font-bold">REFERENCE ARCHITECTURE / 01</span>
                  <span>RAG RETRIEVAL</span>
                </div>
                <h3 className="text-xl font-bold text-[#0B1C2C] mb-3">
                  Designing Retrieval for a 250-Document Insurance Corpus
                </h3>
                <p className="text-sm text-[#4B6175] leading-relaxed mb-6">
                  An evaluation study on chunking granularity, dense bi-encoder limitations, and reciprocal rank fusion across complex multi-page policy forms. Demonstrates a 42% reduction in hallucinated claim exclusions.
                </p>
                <div className="flex flex-wrap gap-2 mb-8 font-mono text-[11px]">
                  <span className="px-2.5 py-1 rounded bg-white border border-[#C9DCE9] text-[#0B1C2C]">BM25 + Splade</span>
                  <span className="px-2.5 py-1 rounded bg-white border border-[#C9DCE9] text-[#0B1C2C]">RRF (k=60)</span>
                  <span className="px-2.5 py-1 rounded bg-white border border-[#C9DCE9] text-[#0B1C2C]">Cross-Encoders</span>
                </div>
              </div>
              <Link
                href="/insights/why-vector-similarity-is-not-semantic-search"
                className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#0066FF] hover:text-[#0052CC]"
              >
                <span>Read Full Engineering Whitepaper →</span>
              </Link>
            </div>

            {/* Case Study 2 */}
            <div className="bg-[#F8FAFD] border border-[#C9DCE9] rounded-3xl p-8 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pb-4 mb-6 border-b border-slate-200">
                  <span className="text-[#0678BE] font-bold">REFERENCE ARCHITECTURE / 02</span>
                  <span>AGENTIC ORCHESTRATION</span>
                </div>
                <h3 className="text-xl font-bold text-[#0B1C2C] mb-3">
                  From a Document Assistant to a Controlled LangGraph Agent
                </h3>
                <p className="text-sm text-[#4B6175] leading-relaxed mb-6">
                  Transitioning an enterprise customer service workflow from unconstrained prompt completions into a cyclic state graph with Pydantic tool verification and supervisor approval barriers.
                </p>
                <div className="flex flex-wrap gap-2 mb-8 font-mono text-[11px]">
                  <span className="px-2.5 py-1 rounded bg-white border border-[#C9DCE9] text-[#0B1C2C]">LangGraph</span>
                  <span className="px-2.5 py-1 rounded bg-white border border-[#C9DCE9] text-[#0B1C2C]">HITL Gates</span>
                  <span className="px-2.5 py-1 rounded bg-white border border-[#C9DCE9] text-[#0B1C2C]">Postgres Checkpointing</span>
                </div>
              </div>
              <Link
                href="/services/ai-agents"
                className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#0066FF] hover:text-[#0052CC]"
              >
                <span>Explore Agent Implementation →</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CHAPTER 7: ENGINEERING JOURNAL (INSIGHTS)
      ═══════════════════════════════════════════ */}
      <section id="insights" className="py-24 bg-[#F7FAFD] border-b border-[#E2EBF2]">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <div className="font-mono text-xs font-bold tracking-[0.14em] text-[#0092D7] uppercase mb-3">
                07 / EDITORIAL JOURNAL
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1C2C] tracking-tight">
                Engineering knowledge for production AI.
              </h2>
            </div>
            <Link
              href="/insights"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#0066FF] hover:text-[#0052CC]"
            >
              <span>Explore All Engineering Notes</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <Link href="/insights/why-vector-similarity-is-not-semantic-search" className="bg-white border border-[#C9DCE9] rounded-3xl p-7 flex flex-col justify-between hover:border-[#0092D7] transition-all hover:shadow-md group">
              <div>
                <div className="font-mono text-[10px] font-bold text-[#0678BE] uppercase mb-3">RETRIEVAL ENGINEERING · 12 MIN</div>
                <h3 className="text-lg font-bold text-[#0B1C2C] group-hover:text-[#0066FF] transition-colors mb-3 leading-snug">
                  Why Vector Similarity Is Not Semantic Search: Mathematical Foundations of Production Retrieval
                </h3>
                <p className="text-xs text-[#4B6175] leading-relaxed mb-6">
                  Linear algebra, dual-encoder projection limits, and why cosine similarity fails on token negation without cross-encoders.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Oct 25, 2026</span>
                <span className="text-[#0066FF] font-bold">Read Whitepaper ↗</span>
              </div>
            </Link>

            <Link href="/insights" className="bg-white border border-[#C9DCE9] rounded-3xl p-7 flex flex-col justify-between hover:border-[#0092D7] transition-all hover:shadow-md group">
              <div>
                <div className="font-mono text-[10px] font-bold text-[#0678BE] uppercase mb-3">EVALUATION &amp; RELIABILITY · 10 MIN</div>
                <h3 className="text-lg font-bold text-[#0B1C2C] group-hover:text-[#0066FF] transition-colors mb-3 leading-snug">
                  How to Evaluate a RAG System Before Production Deployment
                </h3>
                <p className="text-xs text-[#4B6175] leading-relaxed mb-6">
                  Designing golden question datasets from business logs, measuring faithfulness, and setting up automated regression harness.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Methodology</span>
                <span className="text-[#0066FF] font-bold">Read Guide ↗</span>
              </div>
            </Link>

            <Link href="/insights" className="bg-white border border-[#C9DCE9] rounded-3xl p-7 flex flex-col justify-between hover:border-[#0092D7] transition-all hover:shadow-md group">
              <div>
                <div className="font-mono text-[10px] font-bold text-[#0678BE] uppercase mb-3">ENTERPRISE SECURITY · 8 MIN</div>
                <h3 className="text-lg font-bold text-[#0B1C2C] group-hover:text-[#0066FF] transition-colors mb-3 leading-snug">
                  Permission-Aware Retrieval for Enterprise Knowledge Systems
                </h3>
                <p className="text-xs text-[#4B6175] leading-relaxed mb-6">
                  Pre-query metadata partitioning vs. post-filtering: How to enforce access boundaries without sacrificing ANN recall.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Architecture</span>
                <span className="text-[#0066FF] font-bold">Read Guide ↗</span>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CHAPTER 8: INVITATION (CONVERSION CHAPTER)
      ═══════════════════════════════════════════ */}
      <section id="invitation" className="py-24 bg-[#050B14] text-white relative overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#00B8F0]/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] font-bold text-[#00B8F0] tracking-widest uppercase mb-6">
              08 / THE INVITATION
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-white">
              Have a knowledge workflow <br />
              <span className="bg-gradient-to-r from-[#00B8F0] to-[#60A5FA] bg-clip-text text-transparent">
                worth engineering?
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Tell us what your team needs to retrieve, verify, or automate. We will discuss the operational constraints, the architecture, and a practical path to production.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <TrackedLink
                href="/contact?type=architecture-review"
                eventName="button_click"
                eventData={{ button_name: "home_bottom_discuss_project" }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-[0_4px_24px_rgba(0,102,255,0.4)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Discuss Your AI Project</span>
                <ArrowRight size={16} />
              </TrackedLink>
              <a
                href="https://cal.com/botmartz-ai/20min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-slate-700 bg-white/5 text-white hover:border-[#00B8F0] hover:text-[#00B8F0] px-8 py-4 rounded-xl text-base font-semibold transition-all hover:bg-white/10"
              >
                <span>Schedule 20-Min Call ↗</span>
              </a>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 text-xs font-mono text-slate-400 flex flex-wrap justify-center gap-6">
              <span>● Fixed 4–6 week delivery pilots</span>
              <span>● Direct architect consultation</span>
              <span>● Complete VPC &amp; code handover</span>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
