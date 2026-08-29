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
  title: "Botmartz AI Solutions | Enterprise AI & Intelligent Systems Implementation",
  description: "AI Systems Built for Real Work. Botmartz helps organizations design, implement, integrate, and operate production-ready AI systems across knowledge, workflows, data, and software.",
  openGraph: {
    title: "Botmartz AI Solutions | Enterprise AI & Intelligent Systems Implementation",
    description: "AI Systems Built for Real Work. We help organizations design, implement, integrate, and operate production-ready AI systems.",
    url: "https://www.botmartz.com",
    type: "website",
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
    href: "/services/integrations",
  },
  {
    icon: Code2,
    title: "Custom AI Applications",
    badge: "Intelligent Software",
    desc: "Engineer domain-specific AI software, internal co-pilot tools, and intelligent workflow systems tailored to specialized operations.",
    capabilities: [
      "Industry-specific workflow software",
      "Internal decision-support co-pilots",
      "Multi-document analysis consoles",
      "Intelligent extraction pipelines",
      "Scalable microservices & APIs",
    ],
    href: "/services/custom-ai-applications",
  },
];

const LABS_SHOWCASE = [
  {
    tag: "REFERENCE IMPLEMENTATION",
    title: "Insurance Intelligence Lab",
    desc: "Multi-document insurance policy comparison, clause variance extraction, and zero-hallucination citation enforcement over complex regulatory filings.",
    tech: ["Hybrid Search", "BGE-Reranker", "Pydantic", "OpenSearch"],
    href: "/work/labs/insurance-intelligence",
    isFlagship: true,
  },
  {
    tag: "REFERENCE IMPLEMENTATION",
    title: "Enterprise Knowledge & Search",
    desc: "Production-ready enterprise RAG platform with reciprocal rank fusion, cross-encoder reranking, and automated RAGAS evaluation harness.",
    tech: ["Qdrant", "FastAPI", "LlamaIndex", "RAGAS"],
    href: "/work/labs",
    isFlagship: false,
  },
  {
    tag: "REFERENCE IMPLEMENTATION",
    title: "Multi-Agent Workflow State Machine",
    desc: "Deterministic LangGraph state machine with explicit routing, state checkpoints, and human approval gates for high-stakes enterprise tasks.",
    tech: ["LangGraph", "Python", "Redis", "Docker"],
    href: "/work/labs",
    isFlagship: false,
  },
  {
    tag: "OPEN SOURCE PROJECT",
    title: "OpenSearch Vector & RAG Tools",
    desc: "Open-source connectors and hybrid search utilities for building scalable, enterprise-grade vector retrieval on OpenSearch.",
    tech: ["OpenSearch", "BM25", "Python", "RRF"],
    href: "/work/open-source",
    isFlagship: false,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#050B14] text-white antialiased">
      
      {/* ═══════════════════════════════════════════
          1. HERO SECTION
      ═══════════════════════════════════════════ */}
      <section className="relative pt-[130px] pb-[100px] overflow-hidden border-b border-white/10">
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
                <span className="w-2 h-2 rounded-full bg-[#00B8F0] animate-pulse"></span>
                Enterprise AI &amp; Intelligent Systems Implementation
              </div>

              <h1 className="text-[clamp(38px,5.5vw,66px)] font-bold font-heading tracking-tight leading-[1.08] mb-6 text-white">
                AI Systems Built <br />
                <span className="bg-gradient-to-r from-[#00B8F0] via-[#0066FF] to-[#60A5FA] bg-clip-text text-transparent">
                  for Real Work.
                </span>
              </h1>

              <p className="text-[17px] sm:text-[19px] text-[#8A9EB0] max-w-[580px] mb-10 leading-relaxed font-normal">
                Botmartz helps organizations design, implement, integrate, and operate production-ready AI systems across knowledge, workflows, data, and software.
              </p>

              <div className="flex flex-wrap gap-4 items-center mb-12">
                <TrackedLink
                  href="/contact?type=implementation"
                  eventName="button_click"
                  eventData={{ button_name: "home_hero_discuss_implementation" }}
                  className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-7 py-4 rounded-xl text-[15px] font-semibold transition-all shadow-[0_4px_20px_rgba(0,102,255,0.4)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  Discuss an Implementation <ArrowRight className="w-4 h-4" />
                </TrackedLink>
                <TrackedLink
                  href="/implementation"
                  eventName="button_click"
                  eventData={{ button_name: "home_hero_explore_capabilities" }}
                  className="inline-flex items-center gap-2 border border-slate-700 text-white hover:border-[#00B8F0] hover:text-[#00B8F0] px-7 py-4 rounded-xl text-[15px] font-semibold transition-all hover:bg-white/5"
                >
                  Explore Capabilities ↗
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
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Zero Guessing</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#8A9EB0]">
                  <span>Evaluation: RAGAS Harness</span>
                  <span className="text-[#00B8F0] font-mono">Precision: 98.4%</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. FROM AI STRATEGY TO PRODUCTION (5 STAGES)
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#070E1B] relative border-b border-white/10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="font-mono text-xs tracking-[0.14em] text-[#00B8F0] uppercase mb-3 font-semibold">
              DELIVERY LIFECYCLE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4 text-white">
              From AI Strategy to Production.
            </h2>
            <p className="text-[#8A9EB0] text-base sm:text-lg">
              A disciplined, milestone-driven framework that bridges executive vision with operational software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {STAGES.map((s, i) => (
              <div
                key={s.step}
                className="bg-[#0B1524] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#00B8F0]/40 transition-all duration-300 shadow-md group"
              >
                <div>
                  <div className="font-mono text-2xl font-black text-white/20 group-hover:text-[#00B8F0] transition-colors mb-4">
                    {s.step}
                  </div>
                  <div className="font-mono text-xs text-[#00B8F0] uppercase tracking-wider font-semibold mb-2">
                    {s.name}
                  </div>
                  <h3 className="text-base font-bold text-white mb-3">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#8A9EB0] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. WHAT WE IMPLEMENT (4 CORE PILLARS)
      ═══════════════════════════════════════════ */}
      <section id="solutions" className="py-24 bg-[#050B14] relative border-b border-white/10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-16">
            <div>
              <div className="font-mono text-xs tracking-[0.14em] text-[#00B8F0] uppercase mb-3 font-semibold">
                CORE CAPABILITIES
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-4">
                What We Implement
              </h2>
              <p className="text-[#8A9EB0] text-base sm:text-lg max-w-2xl">
                We engineer reliable, audited AI systems built around your specific operational workflows.
              </p>
            </div>
            <TrackedLink
              href="/services"
              eventName="button_click"
              eventData={{ button_name: "home_view_all_solutions" }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#00B8F0] hover:text-white transition-colors"
            >
              Explore All Solutions →
            </TrackedLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SOLUTIONS.map((sol, i) => (
              <div
                key={i}
                className="bg-[#0B1524]/80 border border-white/10 rounded-2xl p-8 hover:border-[#0066FF]/40 transition-all duration-300 shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#0066FF]/15 border border-[#0066FF]/30 text-[#00B8F0] flex items-center justify-center">
                      <sol.icon size={22} />
                    </div>
                    <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {sol.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00B8F0] transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-sm text-[#8A9EB0] leading-relaxed mb-6">
                    {sol.desc}
                  </p>

                  <ul className="space-y-2.5 pt-4 border-t border-white/10 mb-8">
                    {sol.capabilities.map((cap, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 size={13} className="text-[#00B8F0] shrink-0" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <TrackedLink
                  href={sol.href}
                  eventName="button_click"
                  eventData={{ button_name: `solution_card_${sol.badge}` }}
                  className="inline-flex items-center gap-2 font-mono text-xs text-[#00B8F0] font-bold group-hover:text-white transition-colors"
                >
                  Explore Architecture <ArrowRight size={13} />
                </TrackedLink>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. STACK INTEGRATION / IMPLEMENTATION PHILOSOPHY
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#070E1B] relative border-b border-white/10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <div className="font-mono text-xs tracking-[0.14em] text-[#00B8F0] uppercase mb-3 font-semibold">
                STACK INTEGRATION
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-6 leading-tight">
                Enterprise AI Implementation, <br />
                Without Starting From Scratch.
              </h2>
              <p className="text-base text-[#8A9EB0] leading-relaxed mb-6">
                Most organizations do not need to spend months attempting to invent a proprietary search or AI stack. We work across your existing infrastructure and select battle-tested platforms to solve client problems rapidly.
              </p>

              <div className="space-y-4 mb-8">
                <div className="p-4 rounded-xl bg-[#050B14] border border-white/10">
                  <div className="text-xs font-mono text-[#00B8F0] font-bold mb-1">Enterprise AI Platforms</div>
                  <div className="text-xs text-slate-300">Custom agents, data connectors, and adoption support for enterprise workplace AI (e.g. Glean).</div>
                </div>
                <div className="p-4 rounded-xl bg-[#050B14] border border-white/10">
                  <div className="text-xs font-mono text-[#00B8F0] font-bold mb-1">Search &amp; Retrieval Infrastructure</div>
                  <div className="text-xs text-slate-300">OpenSearch hybrid indexing, Qdrant vector databases, Weaviate schemas, and Elastic AI search.</div>
                </div>
                <div className="p-4 rounded-xl bg-[#050B14] border border-white/10">
                  <div className="text-xs font-mono text-[#00B8F0] font-bold mb-1">Cloud &amp; Private VPC Deployment</div>
                  <div className="text-xs text-slate-300">Deployable in your Amazon Web Services, Google Cloud, or Microsoft Azure environment.</div>
                </div>
              </div>

              <TrackedLink
                href="/implementation"
                eventName="button_click"
                eventData={{ button_name: "home_implementation_methodology" }}
                className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all"
              >
                Read Implementation Methodology <ArrowRight size={14} />
              </TrackedLink>
            </div>

            <div className="bg-[#050B14] border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="font-mono text-xs text-[#00B8F0] uppercase tracking-wider mb-6 font-bold">
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
                  <div key={idx} className="p-4 rounded-xl bg-[#0A1322] border border-white/5">
                    <div className="font-bold text-white mb-1">{item.title}</div>
                    <div className="text-[#8A9EB0] text-[11px]">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. BOTMARTZ LABS & PROOF SHOWCASE
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#050B14] relative border-b border-white/10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-16">
            <div>
              <div className="font-mono text-xs tracking-[0.14em] text-[#00B8F0] uppercase mb-3 font-semibold">
                ENGINEERING IN THE OPEN
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-4">
                Botmartz Labs &amp; Reference Implementations
              </h2>
              <p className="text-[#8A9EB0] text-base sm:text-lg max-w-2xl">
                We prove technical depth through working reference implementations with transparent classifications and reproducible architectures.
              </p>
            </div>
            <TrackedLink
              href="/work/labs"
              eventName="button_click"
              eventData={{ button_name: "home_view_all_labs" }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#00B8F0] hover:text-white transition-colors"
            >
              View All Labs &amp; Open Source →
            </TrackedLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LABS_SHOWCASE.map((lab, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-7 flex flex-col justify-between border transition-all duration-300 ${
                  lab.isFlagship
                    ? "bg-gradient-to-br from-[#0B1A33] to-[#081224] border-[#00B8F0]/40 shadow-[0_0_30px_rgba(0,184,240,0.12)]"
                    : "bg-[#091222] border-white/10 hover:border-white/20"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-[#00B8F0]/10 border border-[#00B8F0]/30 text-[#00B8F0] font-bold">
                      [{lab.tag}]
                    </span>
                    {lab.isFlagship && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                        Flagship Showcase
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2.5">
                    {lab.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8A9EB0] leading-relaxed mb-6">
                    {lab.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {lab.tech.map((t, i) => (
                      <span key={i} className="text-[11px] font-mono px-2 py-0.5 bg-[#050B14] rounded border border-white/10 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <TrackedLink
                  href={lab.href}
                  eventName="button_click"
                  eventData={{ button_name: `lab_card_${lab.title}` }}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00B8F0] hover:text-white transition-colors"
                >
                  <span>Launch Reference Architecture</span>
                  <ArrowRight size={13} />
                </TrackedLink>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. ARCHITECTURE REVIEW / BOTTOM CONVERSION
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#070E1B] relative text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="w-16 h-16 rounded-2xl bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#60A5FA] flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,102,255,0.3)]">
            <Scale size={28} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Book an Architecture Review
          </h2>
          <p className="text-base sm:text-lg text-[#8A9EB0] mb-8 leading-relaxed">
            Discuss your organization's document complexity, search challenges, or agent workflows with an experienced AI systems architect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TrackedLink
              href="/contact?type=architecture-review"
              eventName="button_click"
              eventData={{ button_name: "home_bottom_cta_review" }}
              className="inline-flex items-center justify-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-base px-8 py-4 rounded-xl shadow-[0_4px_20px_rgba(0,102,255,0.4)] transition-all"
            >
              Book Architecture Review <ArrowRight size={16} />
            </TrackedLink>
            <a
              href="https://cal.com/botmartz-ai/20min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-slate-700 text-white hover:border-[#00B8F0] hover:text-[#00B8F0] font-semibold text-base px-8 py-4 rounded-xl transition-all hover:bg-white/5"
            >
              Schedule Direct Call (20 Min)
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
