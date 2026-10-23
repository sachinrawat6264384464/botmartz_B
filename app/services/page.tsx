import { Metadata } from 'next';
import Link from "next/link";
import { ArrowRight, Search, Bot, Blocks, Code2, ShieldCheck, CheckCircle2, Sparkles, Database, Layers } from "lucide-react";
import TrackedLink from "@/app/_components/TrackedLink";

export const metadata: Metadata = {
  title: 'Enterprise AI Solutions & Implementation Services',
  description: 'Production-ready AI solutions across enterprise knowledge, search architecture, agent workflow automation, platform integration, and custom AI software.',
  openGraph: {
    title: 'Enterprise AI Solutions & Implementation Services',
    description: 'We design, architect, implement, and operate production-ready AI systems across knowledge, search, agents, and cloud platforms.',
    url: 'https://www.botmartz.com/services',
    type: 'website',
  },
  alternates: { canonical: 'https://www.botmartz.com/services' },
};

const SOLUTIONS_DATA = [
  {
    id: "knowledge-search",
    icon: Search,
    title: "Enterprise RAG & Knowledge Intelligence",
    badge: "Enterprise Search & RAG",
    tagline: "Turn scattered documents, manuals, and databases into verified, citation-backed intelligence.",
    desc: "We build enterprise search and RAG systems that combine vector semantic retrieval with lexical keyword precision. Every answer links to verifiable paragraphs, with strict refusal guardrails when evidence is missing.",
    capabilities: [
      "Hybrid search (OpenSearch / Qdrant / PostgreSQL pgvector)",
      "Cross-encoder reranking & reciprocal rank fusion (RRF)",
      "Layout-aware table & technical document parsing",
      "Strict provenance & citation grounding",
      "RAGAS automated faithfulness evaluation",
    ],
    href: "/services/enterprise-rag",
  },
  {
    id: "ai-agents",
    icon: Bot,
    title: "AI Agents & Workflow Automation",
    badge: "Controlled State Machines",
    desc: "Deploy constrained, deterministic agentic workflows that orchestrate tasks across multiple enterprise systems safely.",
    tagline: "Deterministic routing and human approvals for mission-critical enterprise workflows.",
    capabilities: [
      "LangGraph state machine architectures",
      "Human-in-the-loop (HITL) checkpoint approval gates",
      "Rigid Pydantic & Zod input/output data validation",
      "Tool-calling integration into ERPs, CRMs, and internal APIs",
      "Complete telemetry & audit logging",
    ],
    href: "/services/ai-agents",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-white min-h-screen text-slate-900 antialiased">

      {/* ── 1. HERO SECTION (DARK THEME) ── */}
      <section className="relative pt-[130px] pb-[90px] overflow-hidden bg-[#050B14] text-white border-b border-white/10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0052FF]/15 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 text-[#00B8F0] font-mono text-xs uppercase tracking-widest mb-6">
            <Sparkles size={13} /> Implementation Solutions
          </div>

          <h1 className="text-[clamp(36px,5vw,60px)] font-bold font-heading tracking-tight leading-[1.1] max-w-4xl mb-6 text-white">
            Enterprise AI Systems, <br />
            <span className="bg-gradient-to-r from-[#00B8F0] via-[#0066FF] to-[#60A5FA] bg-clip-text text-transparent">
              Engineered for Production.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#8A9EB0] max-w-3xl leading-relaxed mb-10">
            We help organizations design, architect, integrate, and operate production-ready AI systems. From enterprise search and knowledge retrieval to constrained agent workflows and platform implementations.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <TrackedLink
              href="/contact?type=architecture-review"
              eventName="button_click"
              eventData={{ button_name: "services_hero_book_review" }}
              className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-all shadow-[0_4px_20px_rgba(0,102,255,0.4)]"
            >
              Book an Architecture Review <ArrowRight className="w-4 h-4" />
            </TrackedLink>
            <TrackedLink
              href="/work"
              eventName="button_click"
              eventData={{ button_name: "services_hero_view_methodology" }}
              className="inline-flex items-center gap-2 border border-slate-700 text-white hover:border-[#00B8F0] hover:text-[#00B8F0] px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-all hover:bg-white/5"
            >
              See Our Work ↓
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ── 2. SOLUTIONS GRID (LIGHT THEME) ── */}
      <section className="py-24 bg-[#F8FAFC] relative border-b border-slate-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SOLUTIONS_DATA.map((sol) => (
              <div
                key={sol.id}
                className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-[#0066FF]/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-[#0066FF] flex items-center justify-center">
                      <sol.icon size={24} />
                    </div>
                    <span className="font-mono text-xs px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-semibold">
                      {sol.badge}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-[#0066FF] transition-colors">
                    {sol.title}
                  </h2>
                  <div className="text-xs font-mono text-[#0066FF] font-semibold mb-4">
                    {sol.tagline}
                  </div>
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
                  eventData={{ button_name: `services_explore_${sol.id}` }}
                  className="inline-flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#0066FF]/40 text-xs font-mono font-bold text-slate-900 group-hover:text-[#0066FF] transition-all"
                >
                  <span>Explore Detailed Architecture</span>
                  <ArrowRight size={14} />
                </TrackedLink>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 3. BOTTOM CTA (LIGHT THEME) ── */}
      <section className="py-20 bg-white border-t border-slate-200 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 font-heading">
            Have a Specific Implementation in Mind?
          </h2>
          <p className="text-base text-slate-600 mb-8 leading-relaxed">
            Let's evaluate your document sources, systems, and security constraints to design a custom implementation plan.
          </p>
          <TrackedLink
            href="/contact?type=architecture-review"
            eventName="button_click"
            eventData={{ button_name: "services_bottom_book_review" }}
            className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm px-8 py-4 rounded-xl shadow-[0_4px_20px_rgba(0,102,255,0.3)] transition-all"
          >
            Book an Architecture Review <ArrowRight size={16} />
          </TrackedLink>
        </div>
      </section>

    </main>
  );
}