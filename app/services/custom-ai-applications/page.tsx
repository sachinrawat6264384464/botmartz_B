import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  Code2,
  Cpu,
  Server,
  Layers,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Workflow,
  Terminal,
  FileSearch,
  Scale
} from "lucide-react";
import TrackedLink from "@/app/_components/TrackedLink";

export const metadata: Metadata = {
  title: "Custom AI Applications & Intelligent Software | Botmartz",
  description: "Engineer domain-specific AI software, internal co-pilot consoles, and intelligent workflow systems tailored to specialized operational requirements.",
  openGraph: {
    title: "Custom AI Applications & Intelligent Software | Botmartz",
    description: "Full-stack intelligent software, multi-document analysis consoles, and scalable AI microservices built for high-stakes business operations.",
    url: "https://www.botmartz.com/services/custom-ai-applications",
    type: "website",
  },
  alternates: { canonical: "https://www.botmartz.com/services/custom-ai-applications" },
};

const APPLICATION_AREAS = [
  {
    icon: Scale,
    title: "Domain Intelligence Consoles",
    desc: "Custom web applications for domain experts (underwriters, legal teams, analysts) to query, compare, and audit dense multi-document corpora.",
    features: [
      "Side-by-side policy & contract clause comparison",
      "Exact paragraph citation inspection & evidence audit",
      "Structured table & regulatory disclosure extraction",
      "Interactive refusal alerts for missing data",
    ],
  },
  {
    icon: Workflow,
    title: "Internal Workflow Co-Pilots",
    desc: "Secure internal tools that automate complex multi-step reasoning, support ticket routing, data extraction, and document synthesis.",
    features: [
      "Deterministic LangGraph execution state machines",
      "Human-in-the-loop validation dashboards",
      "Pydantic schema validation for clean database commits",
      "Automated summary & memo generation",
    ],
  },
  {
    icon: Server,
    title: "Scalable AI Microservices & APIs",
    desc: "High-performance Python/FastAPI microservices designed to power your existing frontend applications with low-latency LLM and search endpoints.",
    features: [
      "FastAPI, Redis caching, and async worker pipelines",
      "Multi-model routing & fallback resilience",
      "OpenTelemetry tracing & token consumption analytics",
      "Containerized Docker & Kubernetes deployment",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Production Evaluation & Hardening",
    desc: "Rigorous benchmark suites that continuously evaluate model faithfulness, retrieval accuracy, and guardrail enforcement before and after release.",
    features: [
      "Custom benchmark sets & RAGAS evaluation harnesses",
      "Automated regression testing on document updates",
      "Cost and latency optimization benchmarks",
      "Private cloud / VPC security compliance",
    ],
  },
];

export default function CustomAIApplicationsPage() {
  return (
    <div className="min-h-screen bg-[#050B14] text-white antialiased">
      
      {/* ── HERO ── */}
      <section className="relative pt-[130px] pb-[90px] overflow-hidden border-b border-white/10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0052FF]/15 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 text-[#00B8F0] font-mono text-xs uppercase tracking-widest mb-6 font-semibold">
            <Sparkles size={13} /> Custom Intelligent Software
          </div>

          <h1 className="text-[clamp(36px,5vw,60px)] font-bold font-heading tracking-tight leading-[1.1] max-w-4xl mb-6">
            Custom AI Applications, <br />
            <span className="bg-gradient-to-r from-[#00B8F0] via-[#0066FF] to-[#60A5FA] bg-clip-text text-transparent">
              Engineered for Real Work.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#8A9EB0] max-w-3xl leading-relaxed mb-10">
            When standard SaaS tools fall short, we build custom, domain-specific AI software, internal co-pilot interfaces, and high-throughput intelligence backends tailored to your exact operational requirements.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <TrackedLink
              href="/contact?type=custom-ai-application"
              eventName="button_click"
              eventData={{ button_name: "custom_apps_discuss_project" }}
              className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-all shadow-[0_4px_20px_rgba(0,102,255,0.4)]"
            >
              Discuss a Custom AI Application <ArrowRight className="w-4 h-4" />
            </TrackedLink>
            <TrackedLink
              href="/work/labs/insurance-intelligence"
              eventName="button_click"
              eventData={{ button_name: "custom_apps_view_reference_lab" }}
              className="inline-flex items-center gap-2 border border-slate-700 text-white hover:border-[#00B8F0] hover:text-[#00B8F0] px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-all hover:bg-white/5"
            >
              See Flagship Reference Lab ↗
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ── APPLICATION AREAS ── */}
      <section className="py-24 bg-[#070E1B] relative border-b border-white/10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="font-mono text-xs tracking-[0.14em] text-[#00B8F0] uppercase mb-3 font-semibold">
              ENGINEERING CAPABILITIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4 text-white">
              Full-Stack Custom AI Engineering
            </h2>
            <p className="text-[#8A9EB0] text-base sm:text-lg">
              From user interfaces designed for domain specialists to hardened backend retrieval architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {APPLICATION_AREAS.map((app, i) => (
              <div
                key={i}
                className="bg-[#0B1524]/90 border border-white/10 rounded-2xl p-8 hover:border-[#00B8F0]/40 transition-all duration-300 shadow-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0066FF]/15 border border-[#0066FF]/30 text-[#00B8F0] flex items-center justify-center mb-6">
                  <app.icon size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {app.title}
                </h3>
                <p className="text-sm text-[#8A9EB0] leading-relaxed mb-6">
                  {app.desc}
                </p>
                <ul className="space-y-2.5 pt-4 border-t border-white/10">
                  {app.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 size={13} className="text-[#00B8F0] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#050B14] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-white mb-4">
            Build Domain-Specific AI Software With Us
          </h2>
          <p className="text-base text-[#8A9EB0] mb-8 leading-relaxed">
            Let's evaluate your custom workflow requirements and map out the frontend consoles, backend microservices, and evaluation benchmarks needed.
          </p>
          <TrackedLink
            href="/contact?type=custom-ai-application"
            eventName="button_click"
            eventData={{ button_name: "custom_apps_bottom_book_review" }}
            className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm px-8 py-4 rounded-xl shadow-[0_4px_20px_rgba(0,102,255,0.4)] transition-all"
          >
            Book an Architecture Review <ArrowRight size={16} />
          </TrackedLink>
        </div>
      </section>

    </div>
  );
}
