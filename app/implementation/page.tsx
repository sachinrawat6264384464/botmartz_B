import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  Layers,
  Search,
  Bot,
  Blocks,
  ShieldCheck,
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
  GitBranch,
  Settings2,
  Terminal,
  Scale
} from "lucide-react";
import TrackedLink from "@/app/_components/TrackedLink";

export const metadata: Metadata = {
  title: "Enterprise AI Implementation | Botmartz AI Solutions",
  description: "Enterprise AI Implementation without starting from scratch. We help organizations design, architect, integrate, and operate production AI systems across search, knowledge, agents, and cloud platforms.",
  openGraph: {
    title: "Enterprise AI Implementation Without Starting From Scratch | Botmartz",
    description: "Move from AI ambition to working production systems. We evaluate your existing stack, select proven platforms, and build reliable enterprise knowledge and agent systems.",
    url: "https://www.botmartz.com/implementation",
    type: "website",
  },
  alternates: {
    canonical: "https://www.botmartz.com/implementation",
  },
};

const STAGES = [
  {
    step: "01",
    name: "Discovery & Feasibility",
    title: "Understanding Systems, Workflows, & Data Boundaries",
    desc: "We analyze your existing data silos, operational bottlenecks, compliance boundaries, and workflow dependencies to determine technical feasibility before writing code.",
    deliverables: ["Data Readiness Assessment", "Security & Access Boundary Map", "Feasibility & ROI Scoping Memo"],
  },
  {
    step: "02",
    name: "Architecture & Stack Selection",
    title: "Designing the Optimal System & Technology Stack",
    desc: "We evaluate whether your requirements are best served by enterprise AI platforms (like Glean), dedicated vector search engines (OpenSearch, Qdrant, Weaviate, Elastic), or custom agent state machines.",
    deliverables: ["System Architecture Blueprint", "Platform & Model Evaluation Matrix", "Cost & Latency Projections"],
  },
  {
    step: "03",
    name: "Core Implementation",
    title: "Engineering Ingestion, Retrieval, & State Logic",
    desc: "We build parsing pipelines, dense/sparse hybrid search indexes, cross-encoder rerankers, and deterministic agent workflows with strict data validation schemas.",
    deliverables: ["Hybrid Retrieval Engine", "Pydantic/Zod Validated Schemas", "Benchmark Ground Truth Harness (RAGAS)"],
  },
  {
    step: "04",
    name: "Enterprise Integration",
    title: "Connecting to Your Existing Tools & Data Sources",
    desc: "We integrate the AI layer directly into your existing software stack — internal ERPs, CRMs, document repositories (SharePoint, Confluence), and APIs with zero disruption.",
    deliverables: ["Custom Enterprise Connectors", "Role-Based Access Control (RBAC)", "Audit Logging & Traceability"],
  },
  {
    step: "05",
    name: "Production Hardening & Deployment",
    title: "Security, Governance, & Observability",
    desc: "We implement rate limiting, fallback routing, human-in-the-loop validation checkpoints for high-stakes actions, and complete LLM telemetry tracking.",
    deliverables: ["Human-in-the-Loop Dashboard", "Observability & Tracing Pipeline", "Private Cloud / On-Prem Deployment"],
  },
  {
    step: "06",
    name: "Managed Optimization",
    title: "Continuous Evaluation & Accuracy Tuning",
    desc: "Production AI systems degrade when documents drift. We continuously run evaluation suites, tune embeddings, refine chunking strategies, and optimize prompt pipelines.",
    deliverables: ["Automated Drift Detection", "Monthly Retrieval Tuning", "Performance & Accuracy SLA Monitoring"],
  },
];

const STACK_CATEGORIES = [
  {
    category: "Enterprise AI Platforms",
    badge: "Platform Implementation",
    desc: "We implement and customize enterprise search and workplace AI platforms for organizations seeking turnkey workplace intelligence.",
    capabilities: ["Glean platform deployment & adoption", "Custom enterprise connectors", "Custom AI agent development", "Permission-aware workplace search"],
  },
  {
    category: "Search & Retrieval Infrastructure",
    badge: "Vector & Hybrid Search",
    desc: "We architect high-performance retrieval backends optimized for scale, precision, and multi-tenant security.",
    capabilities: ["OpenSearch vector & BM25 hybrid search", "Qdrant high-throughput vector indexing", "Weaviate multi-modal schemas", "Elastic Search AI & reranking"],
  },
  {
    category: "Foundation Models & Agent Frameworks",
    badge: "Intelligence Layer",
    desc: "We orchestrate state-of-the-art models and state machines with deterministic routing and guardrails.",
    capabilities: ["LangGraph agent state machines", "LlamaIndex RAG pipelines", "Google ADK & Vertex AI", "Anthropic Claude & OpenAI GPT-4o"],
  },
  {
    category: "Cloud & Data Infrastructure",
    badge: "Enterprise Foundation",
    desc: "Deployable in your private VPC, hybrid cloud, or managed enterprise environment with complete governance.",
    capabilities: ["Amazon Web Services (AWS)", "Google Cloud Platform (GCP)", "Microsoft Azure Cloud", "PostgreSQL / pgvector & Redis"],
  },
];

const COMPARISONS = [
  {
    aspect: "Initial Approach",
    traditional: "Attempts to build an entire proprietary AI stack from zero, taking 9–12 months.",
    botmartz: "Evaluates existing platforms (e.g. Glean, OpenSearch, Qdrant) and implements a working production system in weeks.",
  },
  {
    aspect: "Technology Lock-in",
    traditional: "Forces proprietary black-box software with high recurring licensing fees.",
    botmartz: "Stack-neutral architecture designed around client infrastructure and requirements.",
  },
  {
    aspect: "Verification & Accuracy",
    traditional: "Relies on prompt engineering without rigorous benchmark testing.",
    botmartz: "Enforces strict citation grounding, zero-evidence refusal, and automated RAGAS evaluation.",
  },
  {
    aspect: "Business Alignment",
    traditional: "Focuses on flashy chatbot demos that fail in production edge cases.",
    botmartz: "Focuses on controlled workflows, deterministic state machines, and measurable business ROI.",
  },
];

export default function ImplementationPage() {
  return (
    <div className="min-h-screen bg-[#050B14] text-white antialiased">
      
      {/* ── 1. HERO SECTION ── */}
      <section className="relative pt-[130px] pb-[90px] overflow-hidden border-b border-white/10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[140px] rounded-full pointer-events-none" />
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 text-[#00B8F0] font-mono text-xs uppercase tracking-widest mb-6">
            <Sparkles size={13} /> Enterprise AI Implementation
          </div>

          <h1 className="text-[clamp(36px,5vw,62px)] font-bold font-heading tracking-tight leading-[1.1] max-w-4xl mb-6">
            Enterprise AI Implementation, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#00B8F0] via-[#0066FF] to-[#60A5FA] bg-clip-text text-transparent">
              Without Starting From Scratch.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#8A9EB0] max-w-3xl leading-relaxed mb-10">
            Organizations do not need to spend years reinventing foundational search and AI infrastructure. Botmartz reviews your architecture, selects the right enterprise platforms and retrieval technologies, and delivers production-hardened AI systems that integrate with your existing software.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <TrackedLink
              href="/contact?type=architecture-review"
              eventName="button_click"
              eventData={{ button_name: "implementation_hero_book_review" }}
              className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-all shadow-[0_4px_20px_rgba(0,102,255,0.4)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Book an Architecture Review <ArrowRight className="w-4 h-4" />
            </TrackedLink>
            <TrackedLink
              href="#lifecycle"
              eventName="button_click"
              eventData={{ button_name: "implementation_hero_explore_lifecycle" }}
              className="inline-flex items-center gap-2 border border-slate-700 text-white hover:border-[#00B8F0] hover:text-[#00B8F0] px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-all hover:bg-white/5"
            >
              Explore Delivery Lifecycle ↓
            </TrackedLink>
          </div>

          {/* Quick Stats/Summary Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/10">
            <div>
              <div className="text-xs font-mono text-[#00B8F0] uppercase tracking-wider mb-1">Architecture</div>
              <div className="text-base font-semibold text-white">Stack Neutral &amp; Client-Owned</div>
            </div>
            <div>
              <div className="text-xs font-mono text-[#00B8F0] uppercase tracking-wider mb-1">Delivery Model</div>
              <div className="text-base font-semibold text-white">Agile Sprints with Hardened MVPs</div>
            </div>
            <div>
              <div className="text-xs font-mono text-[#00B8F0] uppercase tracking-wider mb-1">Verification</div>
              <div className="text-base font-semibold text-white">Strict Citation Grounding</div>
            </div>
            <div>
              <div className="text-xs font-mono text-[#00B8F0] uppercase tracking-wider mb-1">Security</div>
              <div className="text-base font-semibold text-white">Private VPC / RBAC Enforced</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. THE 6-STAGE DELIVERY LIFECYCLE ── */}
      <section id="lifecycle" className="py-24 bg-[#070E1B] relative">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="font-mono text-xs tracking-[0.14em] text-[#00B8F0] uppercase mb-3 font-semibold">
              ENGINEERING METHODOLOGY
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4 text-white">
              The 6-Stage Implementation Lifecycle
            </h2>
            <p className="text-[#8A9EB0] text-base sm:text-lg">
              We eliminate guesswork by applying a structured, milestone-driven engineering process from initial system discovery to continuous production optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STAGES.map((stage) => (
              <div
                key={stage.step}
                className="bg-[#0D1829]/90 border border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:border-[#00B8F0]/40 transition-all duration-300 shadow-lg hover:shadow-[0_8px_30px_rgba(0,184,240,0.1)] group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 font-mono text-4xl font-black text-white/5 group-hover:text-[#00B8F0]/10 transition-colors">
                  {stage.step}
                </div>

                <div>
                  <div className="font-mono text-xs text-[#00B8F0] tracking-wider uppercase font-semibold mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00B8F0]"></span>
                    Stage {stage.step} — {stage.name}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00B8F0] transition-colors">
                    {stage.title}
                  </h3>
                  <p className="text-sm text-[#8A9EB0] leading-relaxed mb-6">
                    {stage.desc}
                  </p>
                </div>

                <div className="pt-5 border-t border-white/10">
                  <div className="text-xs font-mono text-[#64748B] uppercase tracking-wider mb-2 font-semibold">
                    Key Deliverables:
                  </div>
                  <ul className="space-y-1.5">
                    {stage.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 size={13} className="text-[#00B8F0] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 3. WE WORK ACROSS YOUR EXISTING STACK (STACK NEUTRALITY) ── */}
      <section id="stack" className="py-24 bg-[#050B14] relative border-t border-white/10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-16">
            <div>
              <div className="font-mono text-xs tracking-[0.14em] text-[#00B8F0] uppercase mb-3 font-semibold">
                TECHNOLOGY INTEGRATION
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-4">
                We Work Across Your Existing Stack
              </h2>
              <p className="text-[#8A9EB0] text-base sm:text-lg max-w-2xl">
                We do not lock clients into closed proprietary black boxes. We architect and implement around your existing enterprise platforms, cloud providers, and databases.
              </p>
            </div>
            <TrackedLink
              href="/partnerships"
              eventName="button_click"
              eventData={{ button_name: "implementation_view_ecosystem" }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#00B8F0] hover:text-white transition-colors"
            >
              View Partner Ecosystem &amp; Integrations →
            </TrackedLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {STACK_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                className="bg-[#0B1524]/80 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:border-[#0066FF]/40 transition-all duration-300 shadow-xl"
              >
                <div className="inline-block px-3 py-1 rounded-full bg-[#0066FF]/15 border border-[#0066FF]/30 text-[#60A5FA] font-mono text-xs uppercase tracking-wider mb-4">
                  {cat.badge}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {cat.category}
                </h3>
                <p className="text-[#8A9EB0] text-sm leading-relaxed mb-6">
                  {cat.desc}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
                  {cat.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00B8F0]"></div>
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. ARCHITECTURE COMPARISON: BUILD VS INTEGRATE ── */}
      <section className="py-24 bg-[#070E1B] relative border-t border-white/10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="font-mono text-xs tracking-[0.14em] text-[#00B8F0] uppercase mb-3 font-semibold">
              STRATEGIC ALIGNMENT
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4 text-white">
              Why Implementation Partnering Wins
            </h2>
            <p className="text-[#8A9EB0] text-base">
              Comparing custom enterprise implementation against traditional over-engineered custom software builds.
            </p>
          </div>

          <div className="bg-[#0B1524]/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 bg-[#050B14] p-5 font-mono text-xs uppercase tracking-wider text-[#64748B] border-b border-white/10 font-bold">
              <div>Dimension</div>
              <div className="text-slate-400">Traditional Agency / Custom Build</div>
              <div className="text-[#00B8F0]">Botmartz Implementation Model</div>
            </div>
            {COMPARISONS.map((comp, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-3 p-6 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors gap-4">
                <div className="font-bold text-white text-sm flex items-center">
                  {comp.aspect}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {comp.traditional}
                </div>
                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium bg-[#00B8F0]/5 p-3 rounded-lg border border-[#00B8F0]/20">
                  {comp.botmartz}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. FLAGSHIP PROOF LINK: INSURANCE INTELLIGENCE ── */}
      <section className="py-20 bg-gradient-to-b from-[#050B14] to-[#0A1322] border-t border-white/10 relative">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#0E1A2F] via-[#10203D] to-[#0E1A2F] border border-[#00B8F0]/30 rounded-3xl p-8 sm:p-12 shadow-[0_0_50px_rgba(0,184,240,0.12)] flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B8F0]/15 text-[#00B8F0] font-mono text-xs uppercase tracking-wider mb-4 font-bold">
                Flagship Reference Implementation
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                See How We Engineer: Insurance Intelligence Lab
              </h3>
              <p className="text-sm sm:text-base text-[#8A9EB0] leading-relaxed mb-6">
                Explore our live reference implementation for multi-document insurance policy comparison, clause discrepancy analysis, and strict citation grounding over complex regulatory filings.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="text-xs font-mono px-2.5 py-1 bg-white/5 rounded border border-white/10 text-slate-300">Hybrid Search</span>
                <span className="text-xs font-mono px-2.5 py-1 bg-white/5 rounded border border-white/10 text-slate-300">Cross-Encoder Reranking</span>
                <span className="text-xs font-mono px-2.5 py-1 bg-white/5 rounded border border-white/10 text-slate-300">Zero-Hallucination Citations</span>
              </div>
            </div>

            <TrackedLink
              href="/work/labs/insurance-intelligence"
              eventName="button_click"
              eventData={{ button_name: "implementation_view_insurance_lab" }}
              className="inline-flex items-center gap-2 bg-[#00B8F0] hover:bg-[#0096C7] text-white font-bold text-sm px-8 py-4 rounded-xl shadow-[0_4px_20px_rgba(0,184,240,0.3)] transition-all whitespace-nowrap hover:scale-105 shrink-0"
            >
              Launch Interactive Lab <ArrowRight size={16} />
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ── 6. ARCHITECTURE REVIEW CTA ── */}
      <section className="py-24 bg-[#050B14] relative border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="w-16 h-16 rounded-2xl bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#60A5FA] flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,102,255,0.3)]">
            <Scale size={28} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Let's Review Your Enterprise AI Architecture
          </h2>
          <p className="text-base sm:text-lg text-[#8A9EB0] mb-8 leading-relaxed">
            Bring your team's workflow bottlenecks and document complexity. We'll outline a concrete system architecture, evaluate technology options, and tell you transparently what is ready for production and what isn't.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TrackedLink
              href="/contact?type=architecture-review"
              eventName="button_click"
              eventData={{ button_name: "implementation_bottom_cta_review" }}
              className="inline-flex items-center justify-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-base px-8 py-4 rounded-xl shadow-[0_4px_20px_rgba(0,102,255,0.4)] transition-all"
            >
              Book an Architecture Review <ArrowRight size={16} />
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
