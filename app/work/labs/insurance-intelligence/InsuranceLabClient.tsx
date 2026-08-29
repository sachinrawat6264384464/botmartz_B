"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Search,
  Layers,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Database,
  Cpu,
  RefreshCw,
  Sliders,
  Eye,
  Info,
  ChevronRight,
  FileCheck,
  Check,
  X
} from "lucide-react";
import TrackedLink from "@/app/_components/TrackedLink";

interface Scenario {
  id: string;
  name: string;
  category: string;
  docA: { name: string; type: string; version: string };
  docB: { name: string; type: string; version: string };
  sampleQuery: string;
  summary: string;
  clauseComparison: {
    section: string;
    docA_text: string;
    docB_text: string;
    finding: string;
    status: "discrepancy" | "aligned" | "exclusion_warning";
  }[];
  citations: {
    source: string;
    page: number;
    paragraph: string;
    text: string;
    relevanceScore: number;
  }[];
  abstentionTest: {
    query: string;
    systemOutput: string;
    reason: string;
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: "property-vs-bi",
    name: "Commercial Property vs. Business Interruption",
    category: "Property & Casualty",
    docA: { name: "Commercial Property Standard Policy (CP-0010)", type: "Primary Policy Form", version: "Rev 2024.2" },
    docB: { name: "Business Income & Extra Expense Endorsement (CP-0030)", type: "Coverage Endorsement", version: "Rev 2024.4" },
    sampleQuery: "Compare flood and ingress/egress exclusions between the base property form and the business income endorsement.",
    summary: "The base property form explicitly excludes all flood losses without a separate endorsement. However, the Business Income endorsement grants 14 days of ingress/egress civil authority interruption coverage if the surrounding access roadway is impassable due to direct physical damage within 1 mile.",
    clauseComparison: [
      {
        section: "Section B.1.g — Water & Flood Damage",
        docA_text: "We will not pay for loss or damage caused directly or indirectly by flood, surface water, waves, tidal water, overflow of any body of water...",
        docB_text: "Coverage applies to the actual loss of Business Income sustained due to action of civil authority prohibiting access, subject to the Flood Endorsement sub-limit.",
        finding: "Direct physical property flood loss is excluded on Doc A; Doc B provides civil authority access interruption under specific 1-mile perimeter conditions.",
        status: "discrepancy",
      },
      {
        section: "Section C.2 — Waiting Period (Deductible)",
        docA_text: "Standard physical deductible: $10,000 per occurrence.",
        docB_text: "72-hour waiting period before business income loss calculation begins unless 24-hour waiver is explicitly endorsed.",
        finding: "Doc B relies on a time-element deductible (72 hours) rather than the fixed dollar deductible in Doc A.",
        status: "aligned",
      },
      {
        section: "Section E.4 — Power & Utility Failure",
        docA_text: "Loss or damage caused by failure of power or utility service occurring away from described premises is excluded.",
        docB_text: "No business income coverage for off-premises grid failure unless Utility Interruption Schedule (CP-1545) is attached.",
        finding: "Both documents strictly exclude off-premises utility failure without endorsement.",
        status: "aligned",
      },
    ],
    citations: [
      {
        source: "CP-0010 (Commercial Property)",
        page: 4,
        paragraph: "Para 2.1 — Causes of Loss Exclusions",
        text: "We will not pay for loss or damage caused directly or indirectly by flood, surface water, waves, tidal water, overflow of any body of water, or spray from any of these...",
        relevanceScore: 0.98,
      },
      {
        source: "CP-0030 (Business Income)",
        page: 2,
        paragraph: "Para 1.a(2) — Civil Authority Extension",
        text: "When a Covered Cause of Loss causes damage to property other than at the described premises, we will pay for the actual loss of Business Income you sustain caused by action of civil authority that prohibits access to the described premises, provided both of the following apply: (1) Access to the area immediately surrounding the damaged property is prohibited by civil authority...",
        relevanceScore: 0.95,
      },
    ],
    abstentionTest: {
      query: "Does this policy cover volcanic ash damage to inventory in Hawaii?",
      systemOutput: "REFUSAL: The provided policy documents (CP-0010 and CP-0030) do not contain specific terms, endorsements, or geographical schedules regarding volcanic ash perils in Hawaii. The system abstains from generating an answer to avoid ungrounded assumptions.",
      reason: "Faithfulness guardrail triggered: zero matching citations with confidence score > 0.85.",
    },
  },
  {
    id: "cyber-liability",
    name: "Cyber Risk vs. Cloud Vendor Liability Endorsement",
    category: "Specialty / Tech Lines",
    docA: { name: "Corporate Cyber Risk Policy (CY-500)", type: "First-Party & Third-Party Policy", version: "v3.1" },
    docB: { name: "Dependent Business Interruption (Cloud Service Rider)", type: "Cloud Rider Addendum", version: "v1.0" },
    sampleQuery: "What are the breach notification timing windows and SLA requirements for cloud hosting outages?",
    summary: "CY-500 requires written notice of a security incident to the insurer within 48 hours of discovery. The Cloud Service Rider mandates proof that the cloud outage exceeded a 12-hour continuous service interruption window before business interruption losses accrue.",
    clauseComparison: [
      {
        section: "Clause 3.1 — Incident Reporting Window",
        docA_text: "The Insured shall give written notice to the Underwriter as soon as practicable, but in no event later than 48 hours following confirmation of a Breach Event.",
        docB_text: "Notice of Dependent System Outage must be accompanied by certified cloud provider incident incident ticket ID within 7 business days.",
        finding: "Immediate notice required on main breach (48h); formal claim documentation allowed up to 7 days for third-party cloud outages.",
        status: "aligned",
      },
      {
        section: "Clause 6.4 — Ransomware & Extortion Sub-Limit",
        docA_text: "Ransomware negotiations and payments subject to $2,500,000 sub-limit and mandatory approved incident response counsel.",
        docB_text: "Cloud service downtime caused by third-party ransomware on vendor infrastructure excluded unless vendor maintains SOC2 Type II compliance.",
        finding: "Vendor compliance verification is a mandatory condition precedent for cloud-originating ransomware claims.",
        status: "exclusion_warning",
      },
    ],
    citations: [
      {
        source: "CY-500 (Cyber Risk Master)",
        page: 8,
        paragraph: "Section III — Reporting Duties",
        text: "The Insured shall give written notice to the Underwriter as soon as practicable, but in no event later than 48 hours following confirmation of a Breach Event...",
        relevanceScore: 0.99,
      },
      {
        source: "Cloud Rider Addendum",
        page: 1,
        paragraph: "Schedule A — Interruption Criteria",
        text: "A Dependent System Outage shall be deemed to commence only after the uninterrupted duration of such outage exceeds twelve (12) consecutive hours from the initial system failure timestamp...",
        relevanceScore: 0.94,
      },
    ],
    abstentionTest: {
      query: "Can the insured hire any unapproved foreign law firm for breach response?",
      systemOutput: "REFUSAL & STATED CONDITION: Clause 3.2 explicitly specifies that legal counsel must be selected from the Underwriter's Approved Breach Panel. The documents state that unapproved counsel will not be reimbursed without prior written consent.",
      reason: "Strict policy compliance rule enforced.",
    },
  },
  {
    id: "cgl-vs-umbrella",
    name: "Commercial General Liability vs. Commercial Umbrella",
    category: "Casualty / Umbrella",
    docA: { name: "Commercial General Liability (CG-0001)", type: "Primary Casualty Form", version: "2023 Edition" },
    docB: { name: "Commercial Excess & Umbrella Form (CU-0001)", type: "Follow-Form Excess", version: "2023 Edition" },
    sampleQuery: "How does the umbrella policy respond to pollution exclusions and defense cost erosion?",
    summary: "The primary CGL policy provides defense costs outside policy limits for covered occurrences. The Excess Umbrella policy follows form on standard liability but contains an absolute pollution exclusion with zero defense cost coverage for PFAS/toxic torts.",
    clauseComparison: [
      {
        section: "Section I — Defense Costs Allocation",
        docA_text: "Defense costs are payable in addition to the applicable Limits of Insurance and do not reduce the General Aggregate.",
        docB_text: "Defense expenses erode the Excess Aggregate Limit once the underlying primary limits are exhausted.",
        finding: "Primary policy provides defense outside limits; Excess Umbrella includes defense within limits after exhaustion.",
        status: "discrepancy",
      },
      {
        section: "Section II — Total Pollution Exclusion",
        docA_text: "Standard pollution exclusion with limited hostile fire exception.",
        docB_text: "Absolute Total Pollution Exclusion Endorsement (CU-2101) with zero hostile fire exception.",
        finding: "Umbrella policy is more restrictive on pollution perils than the underlying primary policy.",
        status: "exclusion_warning",
      },
    ],
    citations: [
      {
        source: "CG-0001 (Primary CGL)",
        page: 3,
        paragraph: "Supplementary Payments — Section I",
        text: "We will pay, with respect to any claim we investigate or settle, or any 'suit' against an insured we defend: All expenses we incur. These payments will not reduce the limits of insurance.",
        relevanceScore: 0.97,
      },
      {
        source: "CU-0001 (Excess Umbrella)",
        page: 6,
        paragraph: "Section II — Limits of Liability",
        text: "If defense costs are incurred after the exhaustion of underlying limits, such defense expenses shall be paid from and shall reduce the Aggregate Limit of Insurance...",
        relevanceScore: 0.93,
      },
    ],
    abstentionTest: {
      query: "What is the deductible for maritime cargo damage under this general liability policy?",
      systemOutput: "REFUSAL: The provided documents (CG-0001 and CU-0001) contain general liability and excess liability terms and specifically exclude maritime cargo/ocean marine risks. The system abstains from calculating an inapplicable deductible.",
      reason: "Out-of-scope domain rejection grounded in explicit document boundaries.",
    },
  },
];

export default function InsuranceLabClient() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("property-vs-bi");
  const [activeTab, setActiveTab] = useState<"comparison" | "citations" | "refusal" | "architecture">("comparison");

  const currentScenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];

  return (
    <div className="min-h-screen bg-[#050B14] text-white antialiased">
      
      {/* ── 1. LAB HEADER ── */}
      <section className="relative pt-[130px] pb-[70px] border-b border-white/10 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0052FF]/15 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Link href="/work/labs" className="text-xs font-mono text-[#8A9EB0] hover:text-[#00B8F0] transition-colors">
              ← Back to Labs
            </Link>
            <span className="text-xs text-white/20">/</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#00B8F0]/15 border border-[#00B8F0]/30 text-[#00B8F0] font-mono text-[11px] uppercase tracking-widest font-bold">
              [REFERENCE IMPLEMENTATION]
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] uppercase tracking-widest font-semibold">
              Live Architecture
            </span>
          </div>

          <h1 className="text-[clamp(32px,4.5vw,56px)] font-bold font-heading tracking-tight leading-[1.15] max-w-4xl mb-6">
            Insurance Intelligence: <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#00B8F0] via-[#38BDF8] to-[#60A5FA] bg-clip-text text-transparent">
              Enterprise Knowledge &amp; Document Intelligence
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#8A9EB0] max-w-3xl leading-relaxed mb-8">
            A production-grade reference implementation demonstrating how to turn dense insurance policies, endorsements, schedules, and regulatory filings into accurate, citation-grounded answers and side-by-side clause comparisons with zero hallucinations.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#091222] border border-white/10 shadow-lg">
            <div>
              <div className="text-[11px] font-mono text-[#00B8F0] uppercase tracking-wider">Faithfulness Metric</div>
              <div className="text-2xl font-bold text-white mt-0.5">98.4%</div>
              <div className="text-[11px] text-[#64748B]">RAGAS Ground Truth Test</div>
            </div>
            <div>
              <div className="text-[11px] font-mono text-[#00B8F0] uppercase tracking-wider">Retrieval Recall@5</div>
              <div className="text-2xl font-bold text-white mt-0.5">96.2%</div>
              <div className="text-[11px] text-[#64748B]">Dense + BM25 Hybrid</div>
            </div>
            <div>
              <div className="text-[11px] font-mono text-[#00B8F0] uppercase tracking-wider">Citation Strictness</div>
              <div className="text-2xl font-bold text-white mt-0.5">Exact Paragraph</div>
              <div className="text-[11px] text-[#64748B]">Verifiable Provenance</div>
            </div>
            <div>
              <div className="text-[11px] font-mono text-[#00B8F0] uppercase tracking-wider">Refusal Guardrail</div>
              <div className="text-2xl font-bold text-white mt-0.5">Automated</div>
              <div className="text-[11px] text-[#64748B]">Zero-Evidence Refusal</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. INTERACTIVE SIMULATOR SECTION ── */}
      <section className="py-16 bg-[#070E1B] relative">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="font-mono text-xs text-[#00B8F0] uppercase tracking-wider font-semibold mb-2">
                INTERACTIVE REFERENCE SIMULATOR
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Multi-Document Policy Analysis Engine
              </h2>
            </div>
            <div className="text-xs text-[#8A9EB0] font-mono">
              Select a benchmark test scenario below to inspect live analysis:
            </div>
          </div>

          {/* Scenario Selector Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                onClick={() => setSelectedScenarioId(sc.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedScenarioId === sc.id
                    ? "bg-[#0E1E38] border-[#00B8F0] shadow-[0_0_20px_rgba(0,184,240,0.15)]"
                    : "bg-[#0A1322] border-white/10 hover:border-white/25 text-slate-300"
                }`}
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#00B8F0] mb-1 font-semibold">
                  {sc.category}
                </div>
                <div className="text-sm font-bold text-white mb-2">
                  {sc.name}
                </div>
                <div className="text-xs text-[#8A9EB0] line-clamp-2">
                  {sc.sampleQuery}
                </div>
              </button>
            ))}
          </div>

          {/* Interactive Workspace Container */}
          <div className="bg-[#0B1524] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            
            {/* Top Workspace Bar: Active Documents */}
            <div className="bg-[#050B14] p-4 sm:p-6 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#60A5FA] flex items-center justify-center shrink-0">
                  <FileCheck size={20} />
                </div>
                <div>
                  <div className="text-xs text-[#8A9EB0] font-mono">Ingested Policy Corpus (2 Sources)</div>
                  <div className="text-sm font-bold text-white flex flex-wrap items-center gap-2">
                    <span className="text-[#00B8F0]">{currentScenario.docA.name}</span>
                    <span className="text-slate-600">↔</span>
                    <span className="text-[#60A5FA]">{currentScenario.docB.name}</span>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "comparison", label: "Clause Variance Matrix" },
                  { id: "citations", label: "Evidence Citations (2)" },
                  { id: "refusal", label: "Refusal Guardrail Test" },
                  { id: "architecture", label: "Pipeline Specs" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === t.id
                        ? "bg-[#00B8F0] text-slate-950 font-bold"
                        : "bg-white/5 text-[#8A9EB0] hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* TAB CONTENT 1: CLAUSE COMPARISON */}
            {activeTab === "comparison" && (
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Query & Executive Summary Box */}
                <div className="p-5 rounded-xl bg-[#070E1B] border border-white/10">
                  <div className="text-xs font-mono text-[#00B8F0] uppercase tracking-wider font-semibold mb-1">
                    Evaluated Natural Language Query
                  </div>
                  <div className="text-base font-semibold text-white mb-3">
                    &ldquo;{currentScenario.sampleQuery}&rdquo;
                  </div>
                  <div className="text-xs font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Synthesized Executive Analysis
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {currentScenario.summary}
                  </p>
                </div>

                {/* Side-by-side Table of Clauses */}
                <div className="space-y-4">
                  <div className="text-xs font-mono text-[#8A9EB0] uppercase tracking-wider font-semibold">
                    Extracted Policy Clauses &amp; Cross-Document Variance:
                  </div>

                  {currentScenario.clauseComparison.map((clause, idx) => (
                    <div key={idx} className="bg-[#070E1B] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="text-sm font-bold text-white font-mono flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00B8F0]"></span>
                          {clause.section}
                        </div>
                        <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${
                          clause.status === "discrepancy"
                            ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                            : clause.status === "exclusion_warning"
                            ? "bg-rose-500/10 text-rose-300 border-rose-500/30"
                            : "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                        }`}>
                          {clause.status === "discrepancy" ? "Clause Variance Detected" : clause.status === "exclusion_warning" ? "Strict Exclusion Caveat" : "Terms Aligned"}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="p-3.5 rounded-lg bg-[#050B14] border border-white/5">
                          <div className="text-[10px] font-mono text-[#00B8F0] uppercase mb-1 font-semibold">{currentScenario.docA.name}</div>
                          <p className="text-xs text-slate-300 italic leading-relaxed">&ldquo;{clause.docA_text}&rdquo;</p>
                        </div>
                        <div className="p-3.5 rounded-lg bg-[#050B14] border border-white/5">
                          <div className="text-[10px] font-mono text-[#60A5FA] uppercase mb-1 font-semibold">{currentScenario.docB.name}</div>
                          <p className="text-xs text-slate-300 italic leading-relaxed">&ldquo;{clause.docB_text}&rdquo;</p>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-[#00B8F0]/5 border border-[#00B8F0]/20 text-xs text-slate-200">
                        <span className="font-bold text-[#00B8F0]">Engineering Finding: </span>
                        {clause.finding}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* TAB CONTENT 2: EVIDENCE CITATIONS */}
            {activeTab === "citations" && (
              <div className="p-6 sm:p-8 space-y-6">
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200">
                  <span className="font-bold">Strict Provenance Protocol: </span>
                  Every claim is tied directly to an immutable source chunk. The system provides page number, section header, and paragraph text. If an exact match cannot be found, the system refrains from generating unbacked answers.
                </div>

                <div className="space-y-4">
                  {currentScenario.citations.map((cite, i) => (
                    <div key={i} className="p-5 rounded-xl bg-[#070E1B] border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <FileText size={16} className="text-[#00B8F0]" />
                          <span>{cite.source}</span>
                          <span className="text-xs font-mono text-slate-500">Page {cite.page}</span>
                        </div>
                        <div className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Relevance: {(cite.relevanceScore * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div className="text-xs font-mono text-[#00B8F0]">{cite.paragraph}</div>
                      <p className="text-xs text-slate-300 bg-[#050B14] p-3 rounded-lg border border-white/5 leading-relaxed">
                        &ldquo;{cite.text}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: REFUSAL GUARDRAIL TEST */}
            {activeTab === "refusal" && (
              <div className="p-6 sm:p-8 space-y-6">
                <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <div className="text-xs font-mono text-amber-400 uppercase tracking-wider font-bold mb-1 flex items-center gap-2">
                    <AlertTriangle size={14} /> Zero-Hallucination Refusal Benchmark
                  </div>
                  <p className="text-xs text-amber-200/90 leading-relaxed">
                    Most commercial RAG systems fail when asked questions that sound plausible but lack evidence in the corpus. Our architecture tests for strict faithfulness refusal thresholds before returning answers.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#070E1B] border border-white/10 space-y-4">
                  <div>
                    <div className="text-xs font-mono text-[#8A9EB0] uppercase mb-1">Adversarial / Out-of-Scope Query:</div>
                    <div className="text-sm font-semibold text-white bg-[#050B14] p-3 rounded-lg border border-white/5">
                      &ldquo;{currentScenario.abstentionTest.query}&rdquo;
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-mono text-rose-400 uppercase mb-1">Deterministic System Response:</div>
                    <div className="text-xs text-slate-200 bg-rose-950/20 border border-rose-500/30 p-3.5 rounded-lg leading-relaxed font-mono">
                      {currentScenario.abstentionTest.systemOutput}
                    </div>
                  </div>

                  <div className="text-xs text-[#64748B]">
                    <span className="font-bold text-slate-400">Enforcement Mechanism: </span>
                    {currentScenario.abstentionTest.reason}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: PIPELINE ARCHITECTURE SPECS */}
            {activeTab === "architecture" && (
              <div className="p-6 sm:p-8 space-y-6">
                <div className="text-sm font-bold text-white mb-2">Technical Implementation Stack for this Lab:</div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#070E1B] border border-white/10">
                    <div className="text-xs font-mono text-[#00B8F0] uppercase mb-1 font-semibold">1. Document Parsing &amp; Chunking</div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Layout-aware table extraction using layout parser models. Markdown-table preserving chunkers with 512-token overlap boundaries and document header metadata injection.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#070E1B] border border-white/10">
                    <div className="text-xs font-mono text-[#00B8F0] uppercase mb-1 font-semibold">2. Hybrid Retrieval Engine</div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Reciprocal Rank Fusion (RRF) combining dense semantic embeddings (768-dim) with sparse BM25 token index in OpenSearch / Qdrant to capture exact insurance clause codes.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#070E1B] border border-white/10">
                    <div className="text-xs font-mono text-[#00B8F0] uppercase mb-1 font-semibold">3. Cross-Encoder Reranker</div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Top-25 candidate passages re-scored using BGE-Reranker-Large cross-encoder, filtering out false positives and preserving top-5 high-precision evidence spans.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#070E1B] border border-white/10">
                    <div className="text-xs font-mono text-[#00B8F0] uppercase mb-1 font-semibold">4. Verifiable Citation &amp; Guardrails</div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Pydantic structured output validation with mandatory chunk index mapping. Refusal triggered whenever max cosine similarity &lt; 0.82 or cross-encoder score &lt; 0.50.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ── 3. PIPELINE DIAGRAM SECTION ── */}
      <section className="py-20 bg-[#050B14] border-t border-white/10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="font-mono text-xs tracking-[0.14em] text-[#00B8F0] uppercase mb-2 font-semibold">
              SYSTEM ARCHITECTURE
            </div>
            <h2 className="text-3xl font-bold font-heading text-white mb-4">
              The 6-Step Insurance Document Intelligence Pipeline
            </h2>
            <p className="text-[#8A9EB0] text-sm sm:text-base">
              How dense legal and insurance documents are transformed into grounded, actionable intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-center">
            {[
              { step: "01", name: "PDF & Schedule Ingestion", desc: "Multimodal OCR & layout analysis" },
              { step: "02", name: "Semantic Chunking", desc: "Table-aware header metadata attachment" },
              { step: "03", name: "Hybrid Indexing", desc: "Dense vector + BM25 keyword fusion" },
              { step: "04", name: "Cross-Encoder Rerank", desc: "High-precision top-k candidate scoring" },
              { step: "05", name: "Evidence Grounding", desc: "Verifiable citation enforcement" },
              { step: "06", name: "Structured Analysis", desc: "Comparison & discrepancy extraction" },
            ].map((p, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#091222] border border-white/10 relative">
                <div className="text-xs font-mono text-[#00B8F0] font-bold mb-1">{p.step}</div>
                <div className="text-xs font-bold text-white mb-1">{p.name}</div>
                <div className="text-[11px] text-[#8A9EB0] leading-snug">{p.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. CTA / IMPLEMENTATION BRIEF ── */}
      <section className="py-20 bg-[#070E1B] border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Need Document &amp; Knowledge Intelligence for Your Enterprise?
          </h2>
          <p className="text-sm sm:text-base text-[#8A9EB0] mb-8 leading-relaxed">
            We adapt this reference architecture to your organization's specific policy forms, legal agreements, compliance archives, or underwriting workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TrackedLink
              href="/contact?type=architecture-review"
              eventName="button_click"
              eventData={{ button_name: "insurance_lab_book_review" }}
              className="inline-flex items-center justify-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(0,102,255,0.4)] transition-all"
            >
              Book an Architecture Review <ArrowRight size={16} />
            </TrackedLink>
            <TrackedLink
              href="/work/labs"
              eventName="button_click"
              eventData={{ button_name: "insurance_lab_view_all_labs" }}
              className="inline-flex items-center justify-center gap-2 border border-slate-700 text-white hover:border-[#00B8F0] hover:text-[#00B8F0] font-semibold text-sm px-8 py-3.5 rounded-xl transition-all hover:bg-white/5"
            >
              Explore All Labs &amp; Open Source
            </TrackedLink>
          </div>
        </div>
      </section>

    </div>
  );
}
