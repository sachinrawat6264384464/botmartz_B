"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, Database, Layout, Mail, MessageSquare, Calendar, 
  Globe, Server, ShieldCheck, Zap, Activity, Code, Briefcase, 
  FileSearch, HelpCircle, Users, Speaker, PieChart, Workflow, Lock, Settings, Cpu
} from "lucide-react";
import DynamicIcon from "@/app/_components/DynamicIcon";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50, damping: 15 } }
};

export default function AIAgentsClient({ content }: { content: any }) {
  return (
    <div className="bg-white min-h-screen text-slate-900 selection:bg-[#00B8F0] selection:text-white">
      {/* HERO SECTION */}
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
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link href={content.hero.ctaLink} className="btn bg-[#0066FF] text-white hover:bg-[#0052CC] px-8 py-4 rounded-xl text-[15px] flex items-center gap-2 shadow-[0_0_20px_rgba(0,102,255,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,102,255,0.6)]">
                {content.hero.ctaText}
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

      {/* HOW IT WORKS / ARCHITECTURE */}
      <section className="py-[120px] bg-slate-50 border-y border-slate-200">
        <div className="wrap">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16 max-w-[800px] mx-auto"
          >
            <div className="font-mono text-[11px] tracking-[0.14em] text-[#0066FF] uppercase mb-4 font-semibold inline-block">Architecture</div>
            <h2 className="text-[32px] md:text-[40px] font-semibold mb-6 tracking-tight text-slate-900">How Autonomous Agents Work</h2>
            <p className="text-[17px] text-slate-600 leading-relaxed">
              Our agents are not simple if/then bots. They are reasoning engines capable of planning, executing, and correcting course dynamically.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Trigger & Context", desc: "Agent wakes up via API, email, or schedule and analyzes the goal.", icon: Zap },
              { step: "02", title: "Reasoning & Plan", desc: "LLM breaks the goal down into logical, sequential steps.", icon: Workflow },
              { step: "03", title: "Tool Execution", desc: "Agent interacts with external APIs (CRM, DBs) to perform actions.", icon: Code },
              { step: "04", title: "Synthesis & Output", desc: "Results are validated against guardrails and delivered.", icon: ShieldCheck }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-[#00B8F0]/40 hover:shadow-[0_0_30px_rgba(0,184,240,0.1)] transition-all group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 text-[80px] font-bold text-slate-900/[0.02] group-hover:text-[#00B8F0]/[0.05] transition-colors leading-none pointer-events-none">
                  {item.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center text-[#00B8F0] mb-6">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3 relative z-10">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AEO / WHAT IS THIS SECTION */}
      <section className="py-[120px] bg-slate-50 border-y border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#00B8F0]/50 to-transparent"></div>
        <div className="wrap flex flex-col md:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#00B8F0]/30 text-[13px] text-[#00B8F0] mb-6 font-mono shadow-[0_0_15px_rgba(0,184,240,0.1)]">
              <span className="w-2 h-2 rounded-full bg-[#00B8F0] animate-pulse"></span>
              AEO Optimized Context
            </div>
            <h2 className="text-[32px] md:text-[40px] font-semibold mb-6 tracking-tight text-slate-900">{content.aeoQuestion}</h2>
            <p className="text-[17px] text-slate-600 leading-relaxed">
              {content.aeoAnswer}
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2"
          >
             <div className="blueprint rounded-2xl p-10 bg-white border border-slate-200 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#00B8F0]/10 blur-[60px]"></div>
                
                {/* Visual Representation of Agent Workflow */}
                <div className="flex flex-col gap-6 relative z-10">
                   <div className="flex items-center gap-5 bg-slate-50 p-5 rounded-xl border border-slate-200 hover:border-[#00B8F0]/30 transition-all cursor-default">
                      <div className="w-12 h-12 rounded-lg bg-[#00B8F0]/10 flex items-center justify-center text-[#00B8F0]">
                         <MessageSquare className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                         <div className="text-[11px] font-mono text-slate-600 uppercase tracking-wider mb-1 font-bold">Trigger</div>
                         <div className="text-[14px] font-medium text-slate-900">Incoming Support Ticket (Zendesk)</div>
                      </div>
                   </div>

                   <div className="flex justify-center -my-2 z-0 relative">
                      <div className="w-px h-10 bg-gradient-to-b from-slate-200 to-[#00B8F0]"></div>
                      <motion.div 
                        animate={{ y: [0, 40, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 w-2 h-2 rounded-full bg-[#00B8F0] shadow-[0_0_10px_#00B8F0]" 
                      />
                   </div>

                   <div className="flex items-center gap-5 bg-[#00B8F0]/10 p-5 rounded-xl border border-[#00B8F0]/40 shadow-[0_0_30px_rgba(0,184,240,0.15)] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00B8F0]/10 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite]"></div>
                      <div className="w-12 h-12 rounded-lg bg-[#00B8F0] flex items-center justify-center text-slate-900 relative z-10 shadow-[0_0_15px_rgba(0,184,240,0.5)]">
                         <Workflow className="w-6 h-6 animate-pulse" />
                      </div>
                      <div className="flex-1 relative z-10">
                         <div className="text-[11px] font-mono text-[#00B8F0] uppercase tracking-wider mb-1 font-bold">Reasoning Engine</div>
                         <div className="text-[14px] font-medium text-slate-900">Agent Analyzes Request & Plans Actions</div>
                      </div>
                   </div>

                   <div className="flex justify-between px-16 -my-2 z-0 relative">
                      <div className="w-px h-10 bg-gradient-to-b from-[#00B8F0] to-slate-200"></div>
                      <div className="w-px h-10 bg-gradient-to-b from-[#00B8F0] to-slate-200"></div>
                   </div>

                   <div className="flex gap-4">
                      <div className="flex-1 flex flex-col items-center gap-3 bg-slate-50 p-5 rounded-xl border border-slate-200 text-center hover:border-[#00B8F0]/30 transition-colors">
                         <Database className="w-6 h-6 text-slate-600" />
                         <div>
                            <div className="text-[10px] font-mono text-slate-600 uppercase tracking-wider mb-1 font-bold">Action 1</div>
                            <div className="text-[13px] text-slate-900">Query Order DB</div>
                         </div>
                      </div>
                      <div className="flex-1 flex flex-col items-center gap-3 bg-slate-50 p-5 rounded-xl border border-slate-200 text-center hover:border-[#00B8F0]/30 transition-colors">
                         <Layout className="w-6 h-6 text-slate-600" />
                         <div>
                            <div className="text-[10px] font-mono text-slate-600 uppercase tracking-wider mb-1 font-bold">Action 2</div>
                            <div className="text-[13px] text-slate-900">Process Refund</div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* BENTO BOX USE CASES */}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[220px]">
            {content.useCases.map((uc: any, i: number) => {
              // Creating a mixed bento layout
              const isLarge = i === 1 || i === 4;
              
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`bg-white border border-slate-200 rounded-2xl p-8 hover:border-[#00B8F0]/40 hover:shadow-[0_0_40px_rgba(0,184,240,0.08)] transition-all group flex flex-col justify-between overflow-hidden relative ${isLarge ? 'md:col-span-2' : 'col-span-1'}`}
                >
                  <div className="absolute inset-0 bg-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className={`w-14 h-14 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:text-[#00B8F0] group-hover:border-[#00B8F0]/30 transition-colors ${isLarge ? 'mb-4' : 'mb-6'}`}>
                    <DynamicIcon name={uc.iconName} size={28} />
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-[20px] font-semibold text-slate-900 mb-3 tracking-tight">{uc.title}</h3>
                    <p className="text-[15px] text-slate-600 leading-relaxed max-w-[400px]">{uc.description}</p>
                  </div>

                  {isLarge && (
                    <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity transform group-hover:scale-110 duration-500">
                      <DynamicIcon name={uc.iconName} size={200} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TECH STACK TICKER */}
      <section className="py-12 border-y border-slate-200 bg-slate-50 overflow-hidden relative">
         <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A111F] to-transparent z-10"></div>
         <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A111F] to-transparent z-10"></div>
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

      {/* CTA SECTION */}
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
              <Link href="/contact" className="btn bg-[#00B8F0] text-slate-900 hover:bg-[#0096C7] px-10 py-4 rounded-xl text-[16px] inline-flex items-center gap-3 font-semibold shadow-[0_0_20px_rgba(0,184,240,0.3)] transition-all hover:scale-105">
                {content.cta.buttonText}
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
