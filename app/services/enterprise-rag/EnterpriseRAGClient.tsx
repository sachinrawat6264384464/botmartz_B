"use client";

import Link from "next/link";
import { 
  ArrowRight, Database, FileText, Search, ShieldCheck, Zap, 
  Layers, RefreshCw, BarChart, Server, LayoutTemplate, Briefcase, 
  FileSearch, HelpCircle, Calendar, Network, Lock, Cpu, CheckCircle2, AlertTriangle, Play
} from "lucide-react";
import DynamicIcon from "@/app/_components/DynamicIcon";
import InteractiveRAGSimulator from "@/app/_components/InteractiveRAGSimulator";

export default function EnterpriseRAGClient({ content }: { content: any }) {
  return (
    <div className="bg-white min-h-screen text-slate-900 selection:bg-[#00B8F0] selection:text-white font-sans">

      {/* 1. HERO SECTION */}
      <section className="relative pt-[140px] pb-[100px] bg-[#050B14] overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="wrap relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col items-start text-left">
            <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-6 flex items-center gap-3 font-semibold">
              <span className="w-6 h-px bg-[#00B8F0]"></span>
              {content.hero.badge}
            </div>
            
            <h1 
              className="text-[clamp(36px,5vw,58px)] leading-[1.12] font-semibold mb-6 tracking-tight text-white"
              dangerouslySetInnerHTML={{ __html: content.hero.title }}
            />

            <p className="text-[17px] sm:text-[19px] text-[#8A9EB0] mb-10 max-w-[600px] leading-relaxed font-light">
              {content.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link 
                href={content.hero.ctaLink} 
                className="bg-[#0066FF] text-white hover:bg-[#0052CC] px-8 py-4 rounded-xl text-[15px] font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(0,102,255,0.4)] transition-all hover:scale-105"
              >
                {content.hero.ctaText}
              </Link>
              <Link 
                href={content.hero.secondaryCtaLink} 
                className="text-[#00B8F0] hover:text-white px-4 py-4 rounded-xl text-[15px] transition-colors font-medium flex items-center gap-1.5"
              >
                {content.hero.secondaryCtaText} <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Animated Hero Graphic */}
          <div className="relative w-full aspect-square max-w-[500px] mx-auto lg:mx-0 hidden md:block">
            <div className="absolute inset-0 blueprint opacity-20 rounded-full animate-spin-slow pointer-events-none"></div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#00B8F0]/5 border border-[#00B8F0]/30 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,184,240,0.2)] z-20 backdrop-blur-md">
              <Database size={64} className="text-[#00B8F0]" />
            </div>

            <div className="absolute inset-0 z-30 pointer-events-none animate-[spin_24s_linear_infinite]">
              <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-12 h-12 bg-[#050B14] border border-[#0066FF]/50 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,102,255,0.4)]">
                <FileText size={20} className="text-[#0066FF]" />
              </div>
              <div className="absolute bottom-[20%] left-[10%] w-12 h-12 bg-[#050B14] border border-[#00B8F0]/50 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,184,240,0.4)]">
                <Search size={20} className="text-[#00B8F0]" />
              </div>
              <div className="absolute bottom-[20%] right-[10%] w-12 h-12 bg-[#050B14] border border-[#00B8F0]/50 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,184,240,0.4)]">
                <ShieldCheck size={20} className="text-[#00B8F0]" />
              </div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-[#00B8F0]/10 rounded-full animate-ping opacity-20 pointer-events-none" style={{ animationDuration: '4s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-[#0066FF]/20 rounded-full animate-ping opacity-20 pointer-events-none" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM VS SOLUTION */}
      <section className="py-[100px] bg-white">
        <div className="wrap max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-[11px] tracking-[0.14em] text-[#0066FF] uppercase font-bold block mb-2">Why Most RAG Pilots Die (And How We Survive)</span>
            <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-slate-900">{content.problemSolution.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-red-50/70 border border-red-200 rounded-2xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-red-600 font-bold mb-4 text-lg">
                  <AlertTriangle size={24} />
                  The Industry Trap
                </div>
                <p className="text-slate-800 leading-relaxed text-[16px] font-normal">{content.problemSolution.trap}</p>
              </div>
            </div>
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-emerald-700 font-bold mb-4 text-lg">
                  <CheckCircle2 size={24} />
                  The Botmartz Approach
                </div>
                <p className="text-slate-800 leading-relaxed text-[16px] font-normal">{content.problemSolution.approach}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE FEATURES */}
      <section className="py-[120px] bg-slate-50 border-y border-slate-200">
        <div className="wrap max-w-[1200px] mx-auto">
          <div className="text-center mb-16 max-w-[800px] mx-auto">
            <div className="font-mono text-[11px] tracking-[0.14em] text-[#0066FF] uppercase mb-4 font-semibold inline-block">The Production Standard</div>
            <h2 className="text-[32px] md:text-[40px] font-semibold mb-6 tracking-tight text-slate-900">Built for Trust, Not Just Chat.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.features.map((item: any, i: number) => (
              <div 
                key={i}
                className="relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-[#00B8F0]/50 hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center text-[#00B8F0] mb-6">
                    <DynamicIcon name={item.iconName} size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-normal">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LIVE INTERACTIVE DEMO / PROOF SECTION */}
      <section className="py-[100px] bg-white border-b border-slate-200">
        <div className="wrap max-w-[1100px] mx-auto">
          <div className="text-center mb-10 max-w-[750px] mx-auto">
            <span className="font-mono text-[11px] tracking-[0.14em] text-[#0066FF] uppercase font-bold block mb-2">Live Proof & Architecture</span>
            <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-slate-900 mb-3">See It Answer a Real Question</h2>
            <p className="text-slate-600 text-[16px] leading-relaxed">
              A working system indexed over public insurance policy documents. Ask it whether a policy covers a specific procedure, and it returns the answer, the source document, the page, and its confidence — or tells you the documents don't say.
            </p>
          </div>

          <div className="bg-[#050B14] p-4 sm:p-8 rounded-3xl shadow-2xl border border-slate-800">
            <InteractiveRAGSimulator />
          </div>
        </div>
      </section>

      {/* 5. PROCESS AND PRICING */}
      <section id="process" className="py-[120px] bg-[#050B14] text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#00B8F0]/50 to-transparent"></div>
        <div className="wrap relative z-10 max-w-[1250px] mx-auto">
          <div className="text-center mb-16 max-w-[800px] mx-auto">
            <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-4 font-semibold inline-block">Process & Pricing</div>
            <h2 className="text-[32px] md:text-[40px] font-semibold mb-6 tracking-tight text-white">Transparent Delivery. Fixed Timelines.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
             {content.process.map((step: any, i: number) => (
                <div 
                  key={i}
                  className="relative bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-full bg-[#050B14] border-2 border-[#00B8F0] text-[#00B8F0] flex items-center justify-center text-lg font-bold font-mono mb-5 mx-auto relative z-10 shadow-[0_0_20px_rgba(0,184,240,0.3)]">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-2 text-white">{step.title}</h3>
                    <div className="text-center mb-4 flex flex-col gap-1">
                      <span className="text-[#8A9EB0] text-xs font-mono">Duration: {step.duration}</span>
                      <span className="text-[#00B8F0] font-bold text-sm">{step.cost}</span>
                    </div>
                    <p className="text-slate-300 text-[13.5px] leading-relaxed text-center font-light">{step.desc}</p>
                  </div>
                </div>
             ))}
          </div>

          <div className="mt-12 text-center flex flex-col gap-3">
             {content.pricingNotes?.map((note: string, i: number) => (
               <p key={i} className="text-[#8A9EB0] text-[14.5px] italic max-w-[800px] mx-auto">
                 {note}
               </p>
             ))}
          </div>
        </div>
      </section>

      {/* 6. USE CASES */}
      <section className="py-[120px] bg-white">
        <div className="wrap max-w-[1200px] mx-auto">
          <div className="text-center mb-16 max-w-[700px] mx-auto">
             <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-slate-900 mb-4">Where We Deliver Measurable ROI</h2>
             <p className="text-slate-600 text-[17px]">Ideal use cases for mid-market teams looking for measurable impact.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.useCases.map((uc: any, i: number) => (
              <div 
                key={i} 
                className="bg-white border border-slate-200 rounded-2xl p-7 hover:border-[#00B8F0]/50 hover:shadow-lg transition-all group flex flex-col justify-between relative overflow-hidden"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:text-[#00B8F0] group-hover:border-[#00B8F0]/40 transition-colors mb-5 relative z-10">
                    <DynamicIcon name={uc.iconName} size={24} />
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-[19px] font-semibold text-slate-900 mb-2.5 tracking-tight">{uc.title}</h3>
                    <p className="text-[14px] text-slate-600 leading-relaxed font-normal">{uc.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TECH STACK TICKER */}
      <section className="py-12 border-y border-slate-200 bg-slate-50 overflow-hidden relative">
         <div className="wrap flex items-center gap-12 relative z-0 max-w-[1200px] mx-auto">
            <div className="font-mono text-[12px] text-[#00B8F0] font-bold uppercase tracking-widest whitespace-nowrap shrink-0">POWERED BY STACK</div>
            <div className="flex-1 flex gap-12 md:gap-20 items-center overflow-hidden">
               <div className="flex gap-12 md:gap-20 whitespace-nowrap text-slate-900/80 font-mono text-[15px] font-semibold animate-[marquee_25s_linear_infinite]">
                 {[...content.techStack, ...content.techStack].map((tech: string, i: number) => (
                   <span key={i} className="flex items-center gap-3 hover:text-slate-900 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"></span>
                      {tech}
                   </span>
                 ))}
               </div>
            </div>
         </div>
      </section>

      {/* 8. FINAL CTA SECTION */}
      <section className="py-[120px] bg-white relative overflow-hidden">
        <div className="wrap max-w-[1000px] mx-auto">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden shadow-lg">
            <div className="relative z-10">
              <h2 className="text-[32px] md:text-[44px] font-semibold tracking-tight text-slate-900 mb-6 leading-tight">
                {content.cta.title}
              </h2>
              <p className="text-slate-600 text-[17px] md:text-[19px] max-w-[700px] mx-auto mb-10 leading-relaxed font-normal">
                {content.cta.subtitle}
              </p>
              <Link 
                href="/contact" 
                className="bg-[#0066FF] text-white hover:bg-[#0052CC] px-9 py-4 rounded-xl text-[16px] inline-flex items-center gap-3 font-semibold shadow-md transition-all hover:scale-105"
              >
                {content.cta.buttonText}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
