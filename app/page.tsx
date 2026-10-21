import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import TrackedLink from "@/app/_components/TrackedLink";
import { adminDb } from "@/lib/firebase-admin";
import { unstable_cache } from "next/cache";
import DynamicIcon from "@/app/_components/DynamicIcon";
import {
  Layers,
  Bot,
  Blocks,
  Code2,
  ShieldCheck,
  Search,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Server,
  Database,
  Cpu,
  Workflow,
  FileCheck,
  Activity,
  Lock,
  ExternalLink,
  ChevronRight,
  Scale
} from "lucide-react";

export const metadata: Metadata = {
  title: "Enterprise RAG & AI Agents That Cite Sources | Botmartz",
  description: "Botmartz builds citation-grounded Enterprise RAG systems and deterministic AI agents in 4–6 week production pilots. Benchmarked with RAGAS, RBAC-secured, DPDPA-compliant.",
  openGraph: {
    title: "Enterprise RAG & AI Agents That Cite Sources | Botmartz",
    description: "Production-ready Enterprise RAG and deterministic AI agents benchmarked with RAGAS. Fixed 4–6 week delivery.",
    url: "https://www.botmartz.com",
    type: "website",
    images: [
      {
        url: "https://www.botmartz.com/BotmartznewBot.png",
        width: 1200,
        height: 630,
        alt: "Botmartz - Enterprise RAG & AI Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise RAG & AI Agents That Cite Sources | Botmartz",
    description: "Production-ready Enterprise RAG and deterministic AI agents benchmarked with RAGAS. Fixed 4–6 week delivery.",
    images: ["https://www.botmartz.com/BotmartznewBot.png"],
  },
  alternates: {
    canonical: "https://www.botmartz.com",
  },
};

const STAGES = [
  {
    step: "01",
    name: "Discover",
    title: "Understand Systems & Workflows",
    desc: "We analyze your document repositories, operational workflows, and data boundaries to identify where AI delivers verified business value.",
  },
  {
    step: "02",
    name: "Architect",
    title: "Design the Optimal System",
    desc: "We evaluate existing enterprise platforms (e.g. Glean), search backends (OpenSearch, Qdrant), and model pipelines to select the right stack.",
  },
  {
    step: "03",
    name: "Implement",
    title: "Build, Benchmark & Harden",
    desc: "We build parsing pipelines, hybrid retrieval engines, and deterministic agent state machines with rigorous evaluation harnesses.",
  },
  {
    step: "04",
    name: "Deploy",
    title: "Move Safely into Production",
    desc: "We integrate directly into your internal tools and APIs with role-based access control, security guardrails, and telemetry.",
  },
  {
    step: "05",
    name: "Optimize",
    title: "Measure, Refine & Scale",
    desc: "We monitor retrieval recall, detect document drift, tune prompt pipelines, and optimize performance continuously.",
  },
];

const SOLUTIONS = [
  {
    icon: Search,
    title: "Enterprise Knowledge & Search",
    badge: "Knowledge Systems",
    desc: "Transform fragmented corporate documents, policies, SOPs, and repositories into unified, high-precision search and RAG systems.",
    capabilities: [
      "Enterprise search & indexing",
      "Dense/sparse hybrid retrieval",
      "Layout-aware document intelligence",
      "Permission-aware access controls",
      "Verifiable citation grounding",
    ],
    href: "/services/enterprise-rag",
  },
  {
    icon: Bot,
    title: "AI Agents & Workflow Automation",
    badge: "Controlled Automation",
    desc: "Deploy constrained, deterministic agentic workflows that orchestrate tasks across multiple enterprise systems safely.",
    capabilities: [
      "LangGraph state machine architectures",
      "Human-in-the-loop (HITL) checkpoints",
      "Pydantic schema validation",
      "Tool-calling & CRM/ERP integration",
      "Audit logs & telemetry tracking",
    ],
    href: "/services/ai-agents",
  },
  {
    icon: Blocks,
    title: "AI Platforms & Integrations",
    badge: "Platform Implementation",
    desc: "Implement and customize leading enterprise AI and search platforms without rebuilding infrastructure from zero.",
    capabilities: [
      "Enterprise platform deployment (e.g. Glean)",
      "Custom enterprise data connectors",
      "Search infrastructure (OpenSearch, Qdrant, Weaviate, Elastic)",
      "API & business application gateways",
      "Private VPC & cloud orchestration",
    ],
    href: "/services/enterprise-rag",
  },
  {
    icon: Code2,
    title: "Domain Intelligence Systems",
    badge: "Intelligent Software",
    desc: "Engineer domain-specific AI software, aviation airworthiness OS (MRO), and visa document intelligence consoles tailored to high-stakes operations.",
    capabilities: [
      "Industry-specific workflow software (MRO, Legal, Visa)",
      "Internal decision-support co-pilots",
      "Multi-document analysis consoles",
      "Intelligent extraction pipelines",
      "Scalable microservices & APIs",
    ],
    href: "/services/ai-agents",
  },
];

const RESEARCH_AREAS = [
  {
    tag: "ATTENTION & MEMORY RESEARCH",
    title: "KV Cache Optimization & Grouped Query Attention (GQA)",
    desc: "Investigating 8–16x KV cache reduction in autoregressive inference without model degradation, enabling long-context enterprise document intelligence on constrained compute.",
    tech: ["PyTorch", "GQA", "KV Cache", "Transformers"],
    focus: "Inference Efficiency"
  },
  {
    tag: "AGENTIC STATE TOPOLOGY",
    title: "Deterministic State Machines & HITL Verification",
    desc: "Developing bounded LangGraph state topologies that eliminate unbounded LLM recursion and enforce strict schema gating on enterprise ERP and CRM tool-calling.",
    tech: ["LangGraph", "Pydantic", "State Graphs", "Python"],
    focus: "Agent Reliability"
  },
  {
    tag: "RETRIEVAL BENCHMARKS",
    title: "Layout-Aware Parsing & Dense/Sparse Hybrid Retrieval",
    desc: "Benchmarking table extraction across complex multi-page regulatory filings, combining BM25 keyword matching with cross-encoder rerankers and automated RAGAS scoring.",
    tech: ["OpenSearch", "BM25", "RAGAS", "Qdrant"],
    focus: "Zero Hallucination"
  },
  {
    tag: "NEUROMORPHIC & ADVANCED AI",
    title: "Spiking Neural Networks & Efficient Neural Architectures",
    desc: "Exploratory research into temporal spiking dynamics and neuromorphic computing paradigms for ultra-low latency, energy-efficient edge intelligence.",
    tech: ["SNNs", "PyTorch", "Spike Timing", "Edge AI"],
    focus: "Next-Gen Computing"
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      
      {/* ═══════════════════════════════════════════
          1. HERO SECTION (DARK THEME)
      ═══════════════════════════════════════════ */}
      <section className="relative pt-[130px] pb-[100px] overflow-hidden bg-[#050B14] text-white border-b border-white/10">
        {/* Glow Spheres */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/12 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0052FF]/15 blur-[160px] rounded-full pointer-events-none" />

        {/* Blueprint Grid */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,184,240,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left Content */}
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 text-[#00B8F0] font-mono text-[11px] uppercase tracking-widest mb-6 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Enterprise RAG &amp; Deterministic AI Agent Engineering</span>
              </div>

              <h1 className="text-[clamp(38px,5.5vw,66px)] font-bold font-heading tracking-tight leading-[1.08] mb-6 text-white">
                Enterprise AI Systems <br />
                <span className="bg-gradient-to-r from-[#00B8F0] via-[#0066FF] to-[#60A5FA] bg-clip-text text-transparent">
                  That Cite Sources.
                </span>
              </h1>

              <p className="text-[17px] sm:text-[19px] text-[#8A9EB0] max-w-[580px] mb-8 leading-relaxed font-normal">
                We turn messy documents, regulatory policies, and multi-step workflows into production-ready RAG search and deterministic AI agents in 4–6 weeks. Zero hallucinations. Verified paragraph citations. Measured retrieval quality.
              </p>

              {/* Trust & Brain-Priming Metric Bar */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 mb-8 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 max-w-fit">
                <span className="text-[#00B8F0] font-bold">● 4–6 Wk Production Pilots</span>
                <span className="text-slate-600">|</span>
                <span>RAGAS Evaluated</span>
                <span className="text-slate-600">|</span>
                <span>DPDPA &amp; Private VPC Ready</span>
              </div>

              <div className="flex flex-wrap gap-4 items-center mb-12">
                <TrackedLink
                  href="/contact?type=architecture-review"
                  eventName="button_click"
                  eventData={{ button_name: "home_hero_book_review" }}
                  className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-7 py-4 rounded-xl text-[15px] font-semibold transition-all shadow-[0_4px_20px_rgba(0,102,255,0.4)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  Book Architecture Review <ArrowRight className="w-4 h-4" />
                </TrackedLink>
                <TrackedLink
                  href="/contact?type=feasibility-audit"
                  eventName="button_click"
                  eventData={{ button_name: "home_hero_free_audit" }}
                  className="inline-flex items-center gap-2 border border-slate-700 text-white hover:border-[#00B8F0] hover:text-[#00B8F0] px-7 py-4 rounded-xl text-[15px] font-semibold transition-all hover:bg-white/5"
                >
                  Request 48-Hour Feasibility Audit ↗
                </TrackedLink>
              </div>

              {/* Core Philosophy Markers */}
              <div className="pt-8 border-t border-white/10 flex flex-wrap gap-x-8 gap-y-3 text-xs font-mono text-[#8A9EB0]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#00B8F0]" />
                  <span>Stack-Neutral Implementation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#00B8F0]" />
                  <span>Strict Citation Grounding</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#00B8F0]" />
                  <span>Deterministic Workflows</span>
                </div>
              </div>
            </div>

            {/* Right Architectural Graphic */}
            <div className="flex-1 w-full max-w-[500px]">
              <div className="bg-[#091222]/90 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-5 mb-5 border-b border-white/10">
                  <div className="text-xs font-mono text-[#00B8F0] uppercase tracking-wider font-bold">
                    System Architecture Pipeline
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Production Ready
                  </div>
                </div>

                <div className="space-y-3.5 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-[#050B14] border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Database size={15} className="text-[#00B8F0]" />
                      <span className="text-slate-200">Enterprise Data &amp; Silos</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Docs / DBs / APIs</span>
                  </div>

                  <div className="flex justify-center text-slate-500 text-xs">↓</div>

                  <div className="p-3 rounded-xl bg-[#050B14] border border-[#00B8F0]/30 flex items-center justify-between shadow-[0_0_15px_rgba(0,184,240,0.1)]">
                    <div className="flex items-center gap-2.5">
                      <Search size={15} className="text-[#00B8F0]" />
                      <span className="text-white font-bold">Hybrid Search &amp; Reranking</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#00B8F0]/15 text-[#00B8F0]">Dense + BM25</span>
                  </div>

                  <div className="flex justify-center text-slate-500 text-xs">↓</div>

                  <div className="p-3 rounded-xl bg-[#050B14] border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Workflow size={15} className="text-[#60A5FA]" />
                      <span className="text-slate-200">Constrained State Machine</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Deterministic Routing</span>
                  </div>

                  <div className="flex justify-center text-slate-500 text-xs">↓</div>

                  <div className="p-3 rounded-xl bg-[#071324] border border-emerald-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck size={15} className="text-emerald-400" />
                      <span className="text-emerald-300 font-bold">Evidence Grounding &amp; Citations</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Refuses when evidence is missing</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#8A9EB0]">
                  <span>Evaluation: Benchmark Harness</span>
                  <span className="text-[#00B8F0] font-mono">Grounded Citations</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. FROM AI STRATEGY TO PRODUCTION (5 STAGES) - LIGHT THEME
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#F8FAFC] relative border-b border-slate-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="font-mono text-xs tracking-[0.14em] text-[#0066FF] uppercase mb-3 font-bold">
              DELIVERY LIFECYCLE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4 text-slate-900">
              From AI Strategy to Production.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              A disciplined, milestone-driven framework that bridges executive vision with operational software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {STAGES.map((s) => (
              <div
                key={s.step}
                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-[#0066FF]/40 transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <div>
                  <div className="font-mono text-2xl font-black text-slate-300 group-hover:text-[#0066FF] transition-colors mb-4">
                    {s.step}
                  </div>
                  <div className="font-mono text-xs text-[#0066FF] uppercase tracking-wider font-bold mb-2">
                    {s.name}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-3">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. WHAT WE IMPLEMENT (4 CORE PILLARS) - LIGHT THEME
      ═══════════════════════════════════════════ */}
      <section id="solutions" className="py-24 bg-white relative border-b border-slate-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-16">
            <div>
              <div className="font-mono text-xs tracking-[0.14em] text-[#0066FF] uppercase mb-3 font-bold">
                CORE CAPABILITIES
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 mb-4">
                What We Implement
              </h2>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl">
                We engineer reliable, audited AI systems built around your specific operational workflows.
              </p>
            </div>
            <TrackedLink
              href="/services"
              eventName="button_click"
              eventData={{ button_name: "home_view_all_solutions" }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066FF] hover:text-[#0052CC] transition-colors"
            >
              Explore All Solutions →
            </TrackedLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SOLUTIONS.map((sol, i) => (
              <div
                key={i}
                className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-8 hover:border-[#0066FF]/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-[#0066FF] flex items-center justify-center">
                      <sol.icon size={22} />
                    </div>
                    <span className="font-mono text-xs px-3 py-1 rounded-full bg-slate-200/60 border border-slate-200 text-slate-700 font-semibold">
                      {sol.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#0066FF] transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {sol.desc}
                  </p>

                  <ul className="space-y-2.5 pt-4 border-t border-slate-200 mb-8">
                    {sol.capabilities.map((cap, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                        <CheckCircle2 size={13} className="text-[#0066FF] shrink-0" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <TrackedLink
                  href={sol.href}
                  eventName="button_click"
                  eventData={{ button_name: `solution_card_${sol.badge}` }}
                  className="inline-flex items-center gap-2 font-mono text-xs text-[#0066FF] font-bold group-hover:text-[#0052CC] transition-colors"
                >
                  Explore Architecture <ArrowRight size={13} />
                </TrackedLink>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. STACK INTEGRATION - LIGHT THEME
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#F8FAFC] relative border-b border-slate-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <div className="font-mono text-xs tracking-[0.14em] text-[#0066FF] uppercase mb-3 font-bold">
                STACK INTEGRATION
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 mb-6 leading-tight">
                Enterprise AI Implementation, <br />
                Without Starting From Scratch.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Most organizations do not need to spend months attempting to invent a proprietary search or AI stack. We work across your existing infrastructure and select battle-tested platforms to solve client problems rapidly.
              </p>

              <div className="space-y-4 mb-8">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-xs font-mono text-[#0066FF] font-bold mb-1">Enterprise AI Platforms</div>
                  <div className="text-xs text-slate-600">Custom agents, data connectors, and adoption support for enterprise workplace AI (e.g. Glean).</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-xs font-mono text-[#0066FF] font-bold mb-1">Search &amp; Retrieval Infrastructure</div>
                  <div className="text-xs text-slate-600">OpenSearch hybrid indexing, Qdrant vector databases, Weaviate schemas, and Elastic AI search.</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-xs font-mono text-[#0066FF] font-bold mb-1">Cloud &amp; Private VPC Deployment</div>
                  <div className="text-xs text-slate-600">Deployable in your Amazon Web Services, Google Cloud, or Microsoft Azure environment.</div>
                </div>
              </div>

              <TrackedLink
                href="/implementation"
                eventName="button_click"
                eventData={{ button_name: "home_implementation_methodology" }}
                className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm"
              >
                Read Implementation Methodology <ArrowRight size={14} />
              </TrackedLink>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-md">
              <div className="font-mono text-xs text-[#0066FF] uppercase tracking-wider mb-6 font-bold">
                Integration Matrix
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                {[
                  { title: "Enterprise AI Platforms", desc: "Glean, Custom Connectors" },
                  { title: "Search Engines", desc: "OpenSearch, Elastic" },
                  { title: "Vector Databases", desc: "Qdrant, Weaviate, pgvector" },
                  { title: "Agent Frameworks", desc: "LangGraph, Google ADK" },
                  { title: "Model Orchestration", desc: "OpenAI, Anthropic, Gemini" },
                  { title: "Cloud Platforms", desc: "AWS, Azure, GCP" },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-slate-900 mb-1">{item.title}</div>
                    <div className="text-slate-600 text-[11px]">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. BOTMARTZ APPLIED RESEARCH & METHODOLOGY - LIGHT THEME
      ═══════════════════════════════════════════ */}
      <section id="research" className="py-24 bg-white relative border-b border-slate-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-16">
            <div>
              <div className="font-mono text-xs tracking-[0.14em] text-[#0066FF] uppercase mb-3 font-bold">
                APPLIED AI RESEARCH &amp; FIRST PRINCIPLES
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 mb-4">
                Our Research &amp; Architectural Focus
              </h2>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl">
                We bridge cutting-edge machine learning research with deterministic enterprise engineering — investigating attention efficiency, state machines, and verified citation boundaries.
              </p>
            </div>
            <TrackedLink
              href="/contact?type=architecture-review"
              eventName="button_click"
              eventData={{ button_name: "home_research_discuss" }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066FF] hover:text-[#0052CC] transition-colors"
            >
              Discuss Architecture &amp; Research →
            </TrackedLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RESEARCH_AREAS.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-7 flex flex-col justify-between border bg-[#F8FAFC] border-slate-200 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-blue-100/70 border border-blue-200 text-[#0066FF] font-bold">
                      [{item.tag}]
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-semibold">
                      {item.focus}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tech.map((t, i) => (
                      <span key={i} className="text-[11px] font-mono px-2 py-0.5 bg-white rounded border border-slate-200 text-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">Active Laboratory Focus</span>
                  <Link
                    href="/contact?type=feasibility-audit"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0066FF] hover:text-[#0052CC] transition-colors"
                  >
                    <span>Request Technical Review</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. ARCHITECTURE REVIEW / BOTTOM CONVERSION - LIGHT THEME
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#F8FAFC] relative text-center border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-[#0066FF] flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Scale size={28} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 font-heading">
            Book an Architecture Review
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed">
            Discuss your organization's document complexity, search challenges, or agent workflows with an experienced AI systems architect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TrackedLink
              href="/contact?type=architecture-review"
              eventName="button_click"
              eventData={{ button_name: "home_bottom_cta_review" }}
              className="inline-flex items-center justify-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-base px-8 py-4 rounded-xl shadow-[0_4px_20px_rgba(0,102,255,0.3)] transition-all"
            >
              Book Architecture Review <ArrowRight size={16} />
            </TrackedLink>
            <a
              href="https://cal.com/botmartz-ai/20min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-700 bg-white hover:border-[#0066FF] hover:text-[#0066FF] font-semibold text-base px-8 py-4 rounded-xl transition-all shadow-sm"
            >
              Schedule Direct Call (20 Min)
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
