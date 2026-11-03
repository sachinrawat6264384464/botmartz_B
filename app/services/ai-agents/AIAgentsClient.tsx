"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, Database, Layout, Mail, MessageSquare, Calendar, 
  Globe, Server, ShieldCheck, Zap, Activity, Code, Briefcase, 
  FileSearch, HelpCircle, Users, Speaker, PieChart, Workflow, Lock, Settings, Bot, CheckCircle2, AlertTriangle, Terminal, Sparkles, Check
} from "lucide-react";
import DynamicIcon from "@/app/_components/DynamicIcon";

export default function AIAgentsClient({ content }: { content: any }) {
  return (
    <div className="bg-white min-h-screen text-slate-900 selection:bg-[#0284C7]/20 selection:text-[#0F172A] font-sans antialiased">

      {/* ── 1. SIGNATURE HERO: LUMINOUS ARCHITECTURAL WHITE WITH CLEAN BLUE ACCENTS ── */}
      <section className="relative pt-[130px] pb-[100px] bg-gradient-to-b from-[#F8FAFC] via-[#F0F9FF]/30 to-white text-slate-900 overflow-hidden border-b border-[#E2E8F0]">
        
        {/* Luminous Ambient Glows & Grid */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/3 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#0284C7]/10 via-[#38BDF8]/5 to-transparent blur-[120px]" />
          <div className="absolute top-1/4 right-[-5%] w-[500px] h-[500px] bg-[#0284C7]/8 blur-[160px] rounded-full" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0F172A08_1px,transparent_1px),linear-gradient(to_bottom,#0F172A08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,#000_70%,transparent_100%)]" />
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Headline & Technical Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="font-mono text-xs tracking-wider text-[#0284C7] uppercase mb-6 flex items-center gap-2.5 font-semibold px-3 py-1 rounded-full bg-[#0284C7]/10 border border-[#0284C7]/30">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{content.hero.badge || "DETERMINISTIC MULTI-AGENT SYSTEMS"}</span>
            </div>
            
            <h1 
              className="text-[clamp(38px,5vw,58px)] leading-[1.08] font-extrabold mb-6 tracking-tight text-[#0F172A]"
              dangerouslySetInnerHTML={{ __html: content.hero.title }}
            />

            <p className="text-base sm:text-lg text-slate-600 mb-10 max-w-[580px] leading-relaxed font-normal">
              {content.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4 items-center mb-10">
              <Link 
                href={content.hero.ctaLink || "https://cal.com/botmartz-ai/20min"} 
                className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-8 py-4 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-md transition-all hover:-translate-y-0.5"
              >
                <span>{content.hero.ctaText || "Book Architecture Review"}</span>
                <ArrowRight size={15} />
              </Link>
              <Link 
                href="/services" 
                className="text-slate-700 hover:text-[#0284C7] px-5 py-4 rounded-xl text-sm transition-colors font-mono flex items-center gap-2 border border-slate-300 bg-white hover:border-[#0284C7] shadow-2xs"
              >
                <span>View Full Specifications</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Micro Benchmark Strip */}
            <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-slate-600 pt-6 border-t border-slate-200 w-full">
              <div className="flex items-center gap-1.5"><Check size={13} className="text-emerald-600" /> LangGraph Cyclical DAGs</div>
              <div className="flex items-center gap-1.5"><Check size={13} className="text-emerald-600" /> Human-in-the-Loop Gates</div>
              <div className="flex items-center gap-1.5"><Check size={13} className="text-emerald-600" /> Postgres WAL Checkpoint</div>
            </div>
          </div>

          {/* Right: Embedded Governed LangGraph State DAG Graphic */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden group hover:border-[#0284C7]/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-800 font-semibold">
                  <Terminal size={14} className="text-[#0284C7]" />
                  <span>AGENT GOVERNANCE STACK</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                  DETERMINISTIC
                </span>
              </div>

              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-slate-200 bg-[#F8FAFC]">
                <Image
                  src="/images/architecture/agent-dag-3d.png"
                  alt="Governed Multi-Agent LangGraph Photorealistic 3D State Machine"
                  fill
                  priority
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>LangGraph DAG + MCP Tools</span>
                <span className="text-[#0284C7] flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform">Interactive DAG ➔</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. PROBLEM VS SOLUTION ── */}
      <section className="py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-xs tracking-wider text-[#0284C7] uppercase font-semibold block mb-2">
              AUTONOMOUS LOOPS VS GOVERNED AGENTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]">
              {content.problemSolution.title || "The Autonomous Agent Trap vs Deterministic Production Execution"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* The Industry Trap */}
            <div className="bg-[#FFF5F5] border border-red-200 rounded-2xl p-8 sm:p-10 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 text-red-700 font-mono text-xs uppercase tracking-wider font-bold mb-4">
                  <AlertTriangle size={16} />
                  <span>The Autonomous Trap (Unbounded ReAct Loops)</span>
                </div>
                <p className="text-[#334155] leading-relaxed text-sm sm:text-base font-normal mb-6">
                  {content.problemSolution.trap}
                </p>
              </div>
              <div className="pt-4 border-t border-red-200/60 font-mono text-xs text-red-600">
                Result: Infinite API retry loops, unpredictable state drift &amp; unrecoverable writes.
              </div>
            </div>

            {/* The Botmartz Approach */}
            <div className="bg-[#F0FDF4] border border-emerald-200 rounded-2xl p-8 sm:p-10 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 text-emerald-800 font-mono text-xs uppercase tracking-wider font-bold mb-4">
                  <CheckCircle2 size={16} />
                  <span>The Botmartz Approach (Deterministic State DAGs)</span>
                </div>
                <p className="text-[#334155] leading-relaxed text-sm sm:text-base font-normal mb-6">
                  {content.problemSolution.approach}
                </p>
              </div>
              <div className="pt-4 border-t border-emerald-200/60 font-mono text-xs text-emerald-700">
                Result: Safe Saga compensations, human sign-off gates &amp; schema-guaranteed ERP writes.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. PRODUCTION ARCHITECTURE BREAKDOWN (DETAILED BLUEPRINT) ── */}
      <section className="py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-mono text-xs tracking-wider text-[#0284C7] uppercase font-semibold block mb-2">
              AGENT STATE MACHINE TOPOLOGY
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-3">
              Constrained LangGraph Execution &amp; HITL Approval Gate
            </h2>
            <p className="text-sm text-slate-600">
              State machines with explicit rollback compensation, circuit breakers, and mandatory human review before state mutations.
            </p>
          </div>

          <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white group hover:border-[#0284C7]/50 transition-all duration-300">
            <div className="relative aspect-[16/9] w-full bg-[#F8FAFC]">
              <Image
                src="/images/architecture/ai-agents-dag-specification.svg"
                alt="Governed Multi-Agent State Machine Architecture Graphic"
                fill
                priority
                className="object-contain p-2 sm:p-4 group-hover:scale-[1.01] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. PRODUCTION FEATURES GRID ── */}
      <section className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="font-mono text-xs tracking-wider text-[#0284C7] uppercase mb-2 font-semibold">
              AGENT CAPABILITIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-[#0F172A]">
              Governed Actions. Zero Runaway Loops.
            </h2>
            <p className="text-sm text-[#475569]">
              Every agent is designed as a state machine with explicit failure transitions and rollback compensation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.features.map((item: any, i: number) => (
              <div 
                key={i}
                className="bg-white border border-[#E2E8F0] p-6 rounded-2xl hover:border-[#0284C7]/50 hover:shadow-sm transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0284C7] flex items-center justify-center mb-4 group-hover:bg-[#0284C7] group-hover:text-white transition-colors">
                    <Workflow size={18} />
                  </div>
                  <h3 className="font-bold text-base text-[#0F172A] mb-2">{item.title}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed mb-4">{item.desc || item.description}</p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-[11px] font-mono text-[#0284C7] font-semibold">
                  Deterministic Step ➔
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PRODUCTION DELIVERY PROTOCOL & TIMELINE ── */}
      <section className="py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="font-mono text-xs tracking-wider text-[#0284C7] uppercase mb-2 font-semibold">
              ENGINEERING DELIVERY PROTOCOL
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-[#0F172A]">
              3–6 Week Agent Production Roadmap
            </h2>
            <p className="text-sm text-[#475569]">
              From strict boundary discovery to LangGraph state machine rollout with human-in-the-loop review consoles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.process?.map((p: any, idx: number) => (
              <div key={idx} className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-8 shadow-xs flex flex-col justify-between hover:border-[#0284C7]/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-extrabold text-[#0284C7]">{p.step}</span>
                    <span className="text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-white text-slate-700 border border-slate-200">{p.duration}</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-3">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">{p.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-200/60 text-xs font-mono text-slate-500 flex items-center justify-between">
                  <span>Scope Type:</span>
                  <span className="font-bold text-slate-800">{p.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. VERIFIED ENTERPRISE USE CASES ── */}
      <section className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="font-mono text-xs tracking-wider text-[#0284C7] uppercase mb-2 font-semibold">
              PRODUCTION WORKFLOWS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-[#0F172A]">
              Mission-Critical AI Agent Implementations
            </h2>
            <p className="text-sm text-[#475569]">
              Built with dual-key approval gates, state persistence, and automatic circuit breakers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.useCases?.map((uc: any, idx: number) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-[#0284C7]/40 transition-all flex flex-col justify-between group shadow-xs">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-slate-200 text-[#0284C7] flex items-center justify-center mb-5 group-hover:bg-[#0284C7] group-hover:text-white transition-colors">
                    <Bot size={18} />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-3">{uc.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">{uc.description}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 w-fit">
                  <CheckCircle2 size={13} />
                  <span>Human-in-the-Loop Gate Enforced</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FREQUENTLY ASKED ARCHITECTURAL QUESTIONS ── */}
      <section className="py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="font-mono text-xs tracking-wider text-[#0284C7] uppercase mb-2 font-semibold">
              TECHNICAL FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-[#0F172A]">
              Governed AI Agents FAQ
            </h2>
            <p className="text-sm text-slate-600">
              Answers on infinite loop prevention, ERP tool calling permissions, and state persistence.
            </p>
          </div>

          <div className="space-y-4">
            {content.faqs?.map((faq: any, idx: number) => (
              <div key={idx} className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 shadow-2xs hover:border-[#0284C7]/40 transition-colors">
                <h3 className="font-bold text-base text-slate-900 mb-2 flex items-start gap-2">
                  <span className="text-[#0284C7] font-mono">Q{idx+1}:</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CTA CHAPTER ── */}
      <section className="py-20 bg-[#F8FAFC] text-slate-900 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-4">
              {content.cta?.title || "Ready to Automate Complex Workflows?"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mb-8 leading-relaxed">
              {content.cta?.subtitle || "Let’s map out the state machines, tools, and human checkpoints needed to bring your first AI Agent to production safely."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link 
                href={content.hero.ctaLink || "https://cal.com/botmartz-ai/20min"} 
                className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-8 py-4 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-md transition-all hover:-translate-y-0.5"
              >
                <span>{content.cta?.buttonText || "Book Your Architecture Review →"}</span>
                <ArrowRight size={15} />
              </Link>
              <Link 
                href="/work" 
                className="text-slate-700 hover:text-[#0284C7] px-6 py-4 rounded-xl text-sm transition-colors font-mono flex items-center gap-2 border border-slate-300 bg-white hover:border-[#0284C7] shadow-2xs"
              >
                <span>View Shipped Systems</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
