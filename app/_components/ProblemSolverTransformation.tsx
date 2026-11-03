"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  AlertTriangle, CheckCircle2, ArrowRight, ShieldCheck, Database, 
  Search, Cpu, Lock, Workflow, FileText, Scale, Plane, Building2,
  ChevronRight, Sparkles, Zap, Layers, RefreshCw, GitBranch, ArrowDownRight, Terminal
} from "lucide-react";

interface ProblemCase {
  id: string;
  category: string;
  icon: any;
  problemTitle: string;
  problemSub: string;
  failureMode: string;
  riskMetrics: { label: string; value: string; color: string }[];
  botmartzSolution: string;
  pipelineStages: { step: string; name: string; detail: string; status: string }[];
  engineeredStack: string[];
  solvedOutcome: string;
  benchmark: { label: string; value: string };
  ctaLink: string;
}

const PROBLEM_CASES: ProblemCase[] = [
  {
    id: "legal",
    category: "Corporate Legal & Compliance",
    icon: Scale,
    problemTitle: "“Our internal lawyers waste 14+ hours a week cross-referencing multi-tenant contracts and state statutes.”",
    problemSub: "Generic ChatGPT and off-the-shelf bots hallucinate outdated statutory exceptions (e.g. DGCL § 251 merger consideration amendments), creating devastating corporate fiduciary exposure.",
    failureMode: "Unbounded token chunking slices clauses in half; naive vector search retrieves superseded 2018 precedent.",
    riskMetrics: [
      { label: "Legal Exposure", value: "$4.2M Avg Risk", color: "text-rose-600 bg-rose-50 border-rose-200" },
      { label: "Hallucination Rate", value: "38% in Off-Shelf", color: "text-amber-600 bg-amber-50 border-amber-200" },
      { label: "Lawyer Review Time", value: "14 hrs/week lost", color: "text-slate-600 bg-slate-100 border-slate-200" }
    ],
    botmartzSolution: "Hierarchical Legal AST Proposition Parser + Dual-Stream BM25 & BGE Cross-Encoder Reranking + Cryptographic SHA-256 Verbatim Citation Grounding.",
    pipelineStages: [
      { step: "01", name: "Legal AST Tree Ingestion", detail: "Preserves section hierarchy, multi-tier schedules, and paragraph indentation boundaries.", status: "100% Intact" },
      { step: "02", name: "Dual BM25 + Dense ANN", detail: "Exact matching of legal citations ('DGCL § 251(h)') while capturing semantic intent.", status: "Sub-40ms" },
      { step: "03", name: "Cross-Encoder Rescoring", detail: "Pairs query with top-50 clauses, filtering obsolete predecessor revisions.", status: "Rerank k=60" },
      { step: "04", name: "Verbatim Token Lock", detail: "Grounding gate verifies every single claim against source chunk SHA-256 hash.", status: "Zero Hallucination" }
    ],
    engineeredStack: ["AST Clause Parser", "Lucene BM25 Lexical", "pgvector Tenant Isolation", "BGE Reranker-Large", "Verbatim Span Lock"],
    solvedOutcome: "Court-defensible responses with 100% token-exact statute citations, zero hallucinated clauses, and 45-second sub-statute turnaround.",
    benchmark: { label: "Citation Faithfulness", value: "99.8% Verified" },
    ctaLink: "/services/enterprise-rag"
  },
  {
    id: "aerospace",
    category: "Aerospace MRO & Aviation Compliance",
    icon: Plane,
    problemTitle: "“Our technicians need instant tolerances across 18,000-page FAA Airworthiness Directives and engine AMMs.”",
    problemSub: "A single hallucinated rotor shaft bearing clearance (e.g. 0.0040” instead of 0.0035” cold inspection limit) risks engine catastrophic failure and FAA grounded fleets.",
    failureMode: "Vector similarity confuses CFM56-7B inspection limits with CFM56-5B variants due to overlapping token syntax.",
    riskMetrics: [
      { label: "FAA Non-Compliance", value: "Immediate AOG", color: "text-rose-600 bg-rose-50 border-rose-200" },
      { label: "Manual Lookup Time", value: "4.5 hrs / engine", color: "text-amber-600 bg-amber-50 border-amber-200" },
      { label: "AOG Cost per Hour", value: "$150k / hr delay", color: "text-slate-600 bg-slate-100 border-slate-200" }
    ],
    botmartzSolution: "Deterministic Airworthiness Extraction Engine with ATA Chapter-and-Verse Grounding and Strict Numeric Refusal Bounds.",
    pipelineStages: [
      { step: "01", name: "ATA Chapter Hierarchy Parsing", detail: "Preserves ATA 72-51-00 sub-bullet schematics, tables, and inspection tolerances.", status: "Table-Exact" },
      { step: "02", name: "Variant Disambiguation Index", detail: "Strict ACL separation between CFM56-7B and CFM56-5B engine block variants.", status: "Zero Leakage" },
      { step: "03", name: "AD & SB Cross-Referencing", detail: "Automatic reconciliation against active FAA Airworthiness Directives.", status: "Mandatory Rule" },
      { step: "04", name: "Grounding Gate Approval", detail: "Requires bounding box coordinate citation before mechanics turn a wrench.", status: "Audit-Ready" }
    ],
    engineeredStack: ["ATA Chapter-and-Verse Parser", "Multi-Vector Table Encoders", "ColBERT Late-Interaction", "FAA Directives Cross-Ref"],
    solvedOutcome: "Sub-2-second retrieval of exact tolerance values with cryptographic link to FAA-approved AMM page coordinates.",
    benchmark: { label: "Inspection Groundedness", value: "100.0% Exact" },
    ctaLink: "/services/enterprise-rag"
  },
  {
    id: "insurance",
    category: "Commercial Insurance & Underwriting",
    icon: ShieldCheck,
    problemTitle: "“Underwriters spend 3 hours per submission manually auditing 80-page loss runs and endorsement exclusions.”",
    problemSub: "Standard OCR breaks multi-column claim schedules and nested endorsements, missing critical toxic liability carve-outs.",
    failureMode: "Fixed-character chunking slices loss payout tables across columns, misattributing claim values to the wrong policy year.",
    riskMetrics: [
      { label: "Unhedged Loss Risk", value: "$1.8M / policy", color: "text-rose-600 bg-rose-50 border-rose-200" },
      { label: "Quote Turnaround", value: "5 business days", color: "text-amber-600 bg-amber-50 border-amber-200" },
      { label: "Underwriter Fatigue", value: "62% Capacity Lost", color: "text-slate-600 bg-slate-100 border-slate-200" }
    ],
    botmartzSolution: "Multi-Modal Layout-Aware Table Parser + Endorsement Differential Reasoning Engine with Exclusion Extraction.",
    pipelineStages: [
      { step: "01", name: "Loss Run Table Reconstruction", detail: "Extracts row-and-column coordinates, policy years, and indemnity reserves.", status: "Cell-Level Precision" },
      { step: "02", name: "Endorsement Diff Engine", detail: "Computes AST semantic delta between standard ISO forms and custom endorsements.", status: "Exclusion Alert" },
      { step: "03", name: "Underwriting Matrix Audit", detail: "Checks risk against insurer appetite guidelines and aggregate limits.", status: "Risk Guardrail" },
      { step: "04", name: "Structured Binder Generation", detail: "Outputs verified underwriter memo with clickable source citations.", status: "15-Min Turnaround" }
    ],
    engineeredStack: ["LayoutLMv3 Table Reconstruction", "Endorsement AST Diff Engine", "Loss Ratio Calculation Graph", "Sovereign VPC Inference"],
    solvedOutcome: "Automated underwriting audit completed in 12 minutes with 100% loss-run table reconstruction and highlighted exclusion redlines.",
    benchmark: { label: "Underwriting Speedup", value: "85% Turnaround Reduction" },
    ctaLink: "/services/enterprise-rag"
  },
  {
    id: "operations",
    category: "Enterprise Operations & ERP Mutations",
    icon: Workflow,
    problemTitle: "“We want autonomous AI agents, but our CTO refuses to let an LLM touch our SAP / Salesforce database.”",
    problemSub: "Non-deterministic LLM agents hallucinate incorrect SQL WHERE clauses, execute accidental double-billings, or mutate inventory tables without review.",
    failureMode: "Autonomous agent loops fail silently on API rate limits and trigger un-rollbackable database transactions.",
    riskMetrics: [
      { label: "Unauthorized Mutations", value: "High Fiduciary Risk", color: "text-rose-600 bg-rose-50 border-rose-200" },
      { label: "Database Corruptions", value: "Zero Rollback", color: "text-rose-600 bg-rose-50 border-rose-200" },
      { label: "Audit Failure", value: "SOC2 Non-Compliant", color: "text-amber-600 bg-amber-50 border-amber-200" }
    ],
    botmartzSolution: "Deterministic LangGraph Cyclical State Machines + Transaction Checkpointing + Human-in-the-Loop Review Gates.",
    pipelineStages: [
      { step: "01", name: "Typed Schema Validation", detail: "Pydantic v2 runtime contracts strictly enforce ERP parameter boundaries.", status: "Strict Guard" },
      { step: "02", name: "Deterministic LangGraph DAG", detail: "Explicit state transitions with bounded iteration ceilings eliminate infinite loops.", status: "Bounded Graph" },
      { step: "03", name: "Postgres WAL Checkpoint", detail: "Every state step is persisted; failures trigger automatic Saga rollback.", status: "Transactional" },
      { step: "04", name: "Human-in-the-Loop Gate", detail: "State mutations pause for 1-click human verification before database commit.", status: "Zero Drift" }
    ],
    engineeredStack: ["LangGraph State Persistence", "Pydantic v2 Type Guards", "Saga Compensation Rollbacks", "Postgres WAL Checkpointing"],
    solvedOutcome: "Deterministic agent automation where routine reads execute instantly, while state-changing financial mutations pause for 1-click team sign-off.",
    benchmark: { label: "Mutation Reliability", value: "0 Unauthorized Writes" },
    ctaLink: "/services/ai-agents"
  }
];

export default function ProblemSolverTransformation() {
  const [activeTab, setActiveTab] = useState<string>("legal");

  const currentCase = PROBLEM_CASES.find((c) => c.id === activeTab) || PROBLEM_CASES[0];

  return (
    <div className="w-full">
      
      {/* ── SECTION HEADER ── */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] text-[#0284C7] font-mono text-xs font-semibold uppercase tracking-wider mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
          <span>PRODUCTION PROBLEM → ENGINEERED SOLUTION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight mb-3">
          Bring us your mission-critical problem.<br className="hidden sm:inline" />
          <span className="text-[#0284C7]">We engineer the system that solves it.</span>
        </h2>
        <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
          Where off-the-shelf chatbots fail, hallucinate, or violate regulatory boundaries, Botmartz architects verified enterprise RAG engines and deterministic LangGraph agents.
        </p>
      </div>

      {/* ── SELECTOR TABS WITH ICONS & SMOOTH TRANSITIONS ── */}
      <div className="flex items-center justify-center gap-2.5 flex-wrap mb-8">
        {PROBLEM_CASES.map((item) => {
          const isActive = item.id === activeTab;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all duration-200 flex items-center gap-2.5 cursor-pointer ${
                isActive
                  ? "bg-[#0F172A] text-white shadow-md shadow-slate-900/10 border border-[#0F172A] scale-[1.02]"
                  : "bg-white text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] border border-[#E2E8F0] hover:border-slate-300"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#38BDF8]" : "text-slate-400"}`} />
              <span>{item.category}</span>
            </button>
          );
        })}
      </div>

      {/* ── MAIN PROBLEM → SOLUTION TRANSFORMATION CARD WITH CONCEPTUAL WORKFLOW GRAPHIC ── */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300">
        
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* LEFT COLUMN: THE REAL ENTERPRISE PROBLEM & RISKS (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-[#FFFBFB] border-b lg:border-b-0 lg:border-r border-[#F1E5E5] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-rose-100 text-rose-800 font-mono text-[11px] font-bold uppercase tracking-wider mb-4 border border-rose-200">
                <AlertTriangle size={13} className="text-rose-600 shrink-0" />
                <span>UNSOLVED PROBLEM WITH GENERIC AI</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight mb-3 leading-snug">
                {currentCase.problemTitle}
              </h3>

              <p className="text-sm text-[#475569] leading-relaxed mb-6">
                {currentCase.problemSub}
              </p>

              {/* WHY OFF-THE-SHELF FAILS */}
              <div className="p-4 rounded-xl bg-white border border-[#F1E5E5] mb-6 shadow-2xs">
                <div className="text-[10px] font-mono font-bold text-rose-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span>CORE TECHNICAL FAILURE ROOT-CAUSE</span>
                </div>
                <div className="text-xs text-[#334155] leading-relaxed font-sans">
                  {currentCase.failureMode}
                </div>
              </div>

              {/* QUANTITATIVE RISK METRICS */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono font-bold text-[#94A3B8] uppercase tracking-wider">
                  MEASURED LIABILITIES OF GENERIC RAG
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {currentCase.riskMetrics.map((rm, idx) => (
                    <div key={idx} className={`p-2.5 rounded-lg border font-mono ${rm.color}`}>
                      <div className="text-[9px] opacity-80 truncate">{rm.label}</div>
                      <div className="text-xs font-bold mt-0.5">{rm.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#F1E5E5] text-[11px] font-mono text-[#94A3B8] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span>Generic LLM APIs lack document structure preservation</span>
            </div>
          </div>

          {/* RIGHT COLUMN: THE BOTMARTZ ENGINEERED SOLUTION & CONCEPTUAL PIPELINE GRAPHIC (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#F0FDF4] text-emerald-800 font-mono text-[11px] font-bold uppercase tracking-wider border border-emerald-200">
                  <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                  <span>HOW BOTMARTZ ENGINEERS THE SOLUTION</span>
                </div>
                <div className="font-mono text-xs font-bold text-[#0284C7] bg-[#F0F9FF] px-2.5 py-1 rounded border border-[#BAE6FD]">
                  {currentCase.benchmark.label}: {currentCase.benchmark.value}
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight mb-3">
                {currentCase.botmartzSolution}
              </h3>

              <p className="text-sm text-[#334155] leading-relaxed mb-6">
                {currentCase.solvedOutcome}
              </p>

              {/* ── CONCEPTUAL GRAPHIC: 4-STAGE DETERMINISTIC EXECUTION PIPELINE ── */}
              <div className="mb-6 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-800">
                    <Terminal size={14} className="text-[#0284C7]" />
                    <span>DETERMINISTIC ARCHITECTURE PIPELINE</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-[#0066FF] border border-blue-200 font-semibold">
                    REAL-TIME FLOW
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentCase.pipelineStages.map((stage, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-lg bg-white border border-[#E2E8F0] shadow-2xs hover:border-[#0284C7]/50 transition-all group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-mono text-[11px] font-bold text-[#0066FF]">{stage.step} · {stage.name}</span>
                        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                          {stage.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                        {stage.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SPECIFIC PRODUCTION STACK TAGS */}
              <div className="mb-6">
                <div className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider mb-2.5">
                  PRODUCTION SYSTEM COMPONENTS IMPLEMENTED
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentCase.engineeredStack.map((tech, idx) => (
                    <div 
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] font-mono text-xs text-[#0F172A] font-medium hover:border-[#0284C7]/40 transition-colors"
                    >
                      <Sparkles size={11} className="text-[#0284C7]" />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PRODUCTION GUARANTEES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] mb-6 text-xs text-[#334155]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero telemetry leakage:</strong> Deployed in your dedicated AWS/GCP VPC.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Deterministic provenance:</strong> SHA-256 cryptographic chunk hashes.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Sub-120ms P99 latency:</strong> Hybrid Reciprocal Rank Fusion indexing.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Strict human approval gates:</strong> State mutations require 1-click sign-off.</span>
                </div>
              </div>
            </div>

            {/* ACTION CTA ROW */}
            <div className="pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#64748B] font-mono">
                Fixed 8–12 week timeline · Quantitative accuracy SLA
              </div>
              <Link
                href={currentCase.ctaLink}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-xs transition-all shadow-md hover:shadow-blue-500/20"
              >
                <span>Engineer This Solution With Us</span>
                <ArrowRight size={14} />
              </Link>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
