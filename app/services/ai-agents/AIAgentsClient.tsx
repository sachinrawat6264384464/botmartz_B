"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, Database, Layout, Mail, MessageSquare, Calendar, 
  Globe, Server, ShieldCheck, Zap, Activity, Code, Briefcase, 
  FileSearch, HelpCircle, Users, Speaker, PieChart, Workflow, Lock, Settings, Cpu, CheckCircle2, AlertTriangle, Network
} from "lucide-react";
import DynamicIcon from "@/app/_components/DynamicIcon";

const staggerContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeUp = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50, damping: 15 } }
};

export default function AIAgentsClient({ content }: { content: any }) {
  return (
    <div className="bg-white min-h-screen text-slate-900 selection:bg-[#00B8F0] selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative pt-[140px] pb-[100px] bg-[#050B14] overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>

        <div className="wrap relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden" 
            animate="show" 
            variants={staggerContainer}
            className="flex flex-col items-start text-left"
          >
            <motion.div variants={fadeUp} className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-6 flex items-center gap-3 font-semibold">
              <span className="w-6 h-px bg-[#00B8F0]"></span>
              {content.hero.badge}
            </motion.div>
            <motion.h1 
              variants={fadeUp}
              className="text-[clamp(40px,5vw,60px)] leading-[1.1] font-semibold mb-6 tracking-tight text-white"
              dangerouslySetInnerHTML={{ __html: content.hero.title }}
            />
            <motion.p variants={fadeUp} className="text-[17px] sm:text-[19px] text-[#8A9EB0] mb-10 max-w-[600px] leading-relaxed font-light">
              {content.hero.subtitle}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 items-center">
              <Link href={content.hero.ctaLink} className="btn bg-[#0066FF] text-white hover:bg-[#0052CC] px-8 py-4 rounded-xl text-[15px] flex items-center gap-2 shadow-[0_0_20px_rgba(0,102,255,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,102,255,0.6)]">
                {content.hero.ctaText}
              </Link>
              <Link href={content.hero.secondaryCtaLink} className="text-[#00B8F0] hover:text-white px-4 py-4 rounded-xl text-[15px] transition-colors font-medium">
                {content.hero.secondaryCtaText}
              </Link>
            </motion.div>
          </motion.div>

          {/* Animated Hero Graphic (Agent Core) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative w-full aspect-square max-w-[500px] mx-auto lg:mx-0 hidden md:block"
          >
            <div className="absolute inset-0 blueprint opacity-20 rounded-full animate-spin-slow pointer-events-none"></div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-tr from-[#0066FF]/20 to-[#00B8F0]/20 border border-[#00B8F0]/40 rounded-3xl flex items-center justify-center shadow-[0_0_60px_rgba(0,184,240,0.3)] z-20 backdrop-blur-md transform rotate-3">
              <Cpu size={72} className="text-[#00B8F0]" />
            </div>

            {/* Orbiting tools */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 z-30 pointer-events-none"
            >
              <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-14 h-14 bg-[#050B14] border border-[#00B8F0]/40 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(0,184,240,0.3)]">
                <Globe size={24} className="text-[#00B8F0]" />
              </div>
              <div className="absolute bottom-[20%] left-[10%] w-14 h-14 bg-[#050B14] border border-[#0066FF]/40 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                <Mail size={24} className="text-[#0066FF]" />
              </div>
              <div className="absolute bottom-[20%] right-[10%] w-14 h-14 bg-[#050B14] border border-[#00B8F0]/40 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(0,184,240,0.3)]">
                <Calendar size={24} className="text-[#00B8F0]" />
              </div>
            </motion.div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border-2 border-dashed border-[#00B8F0]/20 rounded-full animate-[spin_30s_linear_infinite] opacity-30 pointer-events-none"></div>
          </motion.div>
        </div>
      </section>

      {/* 2. PROBLEM VS SOLUTION */}
      <section className="py-[100px] bg-white">
        <div className="wrap max-w-[1000px] mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-slate-900">{content.problemSolution.title}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-red-50/50 border border-red-100 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 text-red-600 font-semibold mb-4">
                <AlertTriangle size={24} />
                The Industry Trap
              </div>
              <p className="text-slate-700 leading-relaxed text-[16px]">{content.problemSolution.trap}</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-8 shadow-[0_0_30px_rgba(16,185,129,0.05)]"
            >
              <div className="flex items-center gap-3 text-emerald-600 font-semibold mb-4">
                <CheckCircle2 size={24} />
                The Botmartz Approach
              </div>
              <p className="text-slate-700 leading-relaxed text-[16px]">{content.problemSolution.approach}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. CORE FEATURES */}
      <section className="py-[120px] bg-slate-50 border-y border-slate-200">
        <div className="wrap">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16 max-w-[800px] mx-auto"
          >
            <div className="font-mono text-[11px] tracking-[0.14em] text-[#0066FF] uppercase mb-4 font-semibold inline-block">The Production Standard</div>
            <h2 className="text-[32px] md:text-[40px] font-semibold mb-6 tracking-tight text-slate-900">Constrained & Reliable.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.features.map((item: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-[#00B8F0]/40 hover:shadow-[0_0_30px_rgba(0,184,240,0.1)] transition-all group overflow-hidden flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center text-[#00B8F0] mb-6">
                  <DynamicIcon name={item.iconName} size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROCESS AND PRICING (Replaces AEO visual) */}
      <section id="process" className="py-[120px] bg-[#050B14] text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#00B8F0]/50 to-transparent"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div className="wrap relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="text-center mb-16 max-w-[800px] mx-auto"
          >
            <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-4 font-semibold inline-block">Process & Pricing</div>
            <h2 className="text-[32px] md:text-[40px] font-semibold mb-6 tracking-tight text-white">Transparent Delivery. Fixed Timelines.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
             {/* Connecting line for desktop */}
             <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-[#00B8F0]/30 to-transparent"></div>
             
             {content.process.map((step: any, i: number) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors flex flex-col"
                >
                  <div className="w-16 h-16 rounded-full bg-[#050B14] border-2 border-[#00B8F0] text-[#00B8F0] flex items-center justify-center text-xl font-bold font-mono mb-6 mx-auto relative z-10 shadow-[0_0_20px_rgba(0,184,240,0.3)]">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-semibold text-center mb-2 text-white">{step.title}</h3>
                  <div className="text-center mb-6 flex flex-col gap-1">
                    <span className="text-[#8A9EB0] text-sm">Duration: {step.duration}</span>
                    <span className="text-[#00B8F0] font-semibold">{step.cost}</span>
                  </div>
                  <p className="text-slate-300 text-[15px] leading-relaxed text-center">{step.desc}</p>
                </motion.div>
             ))}
          </div>
          <div className="mt-12 text-center flex flex-col gap-3">
             {content.pricingNotes?.map((note: string, i: number) => (
               <p key={i} className="text-[#8A9EB0] text-[15px] italic max-w-[700px] mx-auto">
                 {note}
               </p>
             ))}
          </div>
        </div>
      </section>

      {/* 5. BENTO BOX USE CASES */}
      <section className="py-[120px] bg-white">
        <div className="wrap">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16 max-w-[700px] mx-auto"
          >
             <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-slate-900 mb-4">Enterprise Agent Capabilities</h2>
             <p className="text-slate-600 text-[17px]">We build specialized autonomous agents designed to execute high-value workflows securely.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.useCases.map((uc: any, i: number) => {
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-[#00B8F0]/40 hover:shadow-[0_0_40px_rgba(0,184,240,0.08)] transition-all group flex flex-col relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:text-[#00B8F0] group-hover:border-[#00B8F0]/30 transition-colors mb-6 relative z-10">
                    <DynamicIcon name={uc.iconName} size={28} />
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-[20px] font-semibold text-slate-900 mb-3 tracking-tight">{uc.title}</h3>
                    <p className="text-[15px] text-slate-600 leading-relaxed">{uc.description}</p>
                  </div>

                  <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity transform group-hover:scale-110 duration-500 pointer-events-none">
                    <DynamicIcon name={uc.iconName} size={200} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. TECH STACK TICKER */}
      <section className="py-12 border-y border-slate-200 bg-slate-50 overflow-hidden relative">
         <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
         <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>
         <div className="wrap flex items-center gap-12 relative z-0">
            <div className="font-mono text-[12px] text-[#00B8F0] font-bold uppercase tracking-widest whitespace-nowrap shrink-0">Powered By Stack</div>
            <div className="flex-1 flex gap-12 md:gap-20 items-center overflow-hidden">
               <motion.div 
                 animate={{ x: ["0%", "-50%"] }}
                 transition={{ ease: "linear", duration: 25, repeat: Infinity }}
                 className="flex gap-12 md:gap-20 whitespace-nowrap text-slate-900/70 font-mono text-[15px] font-semibold"
               >
                 {[...content.techStack, ...content.techStack].map((tech: string, i: number) => (
                   <span key={i} className="flex items-center gap-3 hover:text-slate-900 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"></span>
                      {tech}
                   </span>
                 ))}
               </motion.div>
            </div>
         </div>
      </section>

      {/* 7. CTA SECTION */}
      <section className="py-[120px] bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#0066FF]/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="wrap">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-white border border-slate-200 rounded-3xl p-12 md:p-20 text-center max-w-[1000px] mx-auto relative overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
            
            <div className="relative z-10">
              <h2 className="text-[36px] md:text-[48px] font-semibold tracking-tight text-slate-900 mb-6 leading-tight">
                {content.cta.title}
              </h2>
              <p className="text-slate-600 text-[18px] md:text-[20px] max-w-[650px] mx-auto mb-10 leading-relaxed font-light">
                {content.cta.subtitle}
              </p>
              <Link href="/contact" className="btn bg-[#0066FF] text-white hover:bg-[#0052CC] px-10 py-4 rounded-xl text-[16px] inline-flex items-center gap-3 font-semibold shadow-[0_0_20px_rgba(0,102,255,0.3)] transition-all hover:scale-105">
                {content.cta.buttonText}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
