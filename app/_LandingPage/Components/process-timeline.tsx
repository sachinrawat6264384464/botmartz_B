"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Activity, GitMerge, TerminalSquare, CheckCircle2 } from "lucide-react";
import { Inter_Tight, JetBrains_Mono } from 'next/font/google';
import { LocationMap } from "../ui/location-map";

const inter = Inter_Tight({ subsets: ['latin'], weight: ['300', '400', '600'] });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400'] });

// THEME CONFIG
const ACCENT = "#FF5500"; 

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    { id: "01", title: "Discovery & Audit", desc: "Analyzing architectural bottlenecks and data flow latency.", icon: <Activity /> },
    { id: "02", title: "Neural Architecture", desc: "Designing custom AI agents with specific logic gates.", icon: <GitMerge /> },
    { id: "03", title: "System Injection", desc: "Seamless deployment into existing ERP/CRM stacks.", icon: <TerminalSquare /> },
    { id: "04", title: "Optimization Loop", desc: "Continuous reinforcement learning and refinement.", icon: <CheckCircle2 /> },
  ];

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto relative bg-[#050505] overflow-hidden">
      
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,85,0,0.01)_10px,rgba(255,85,0,0.01)_20px)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,85,0,0.05),transparent_70%)] pointer-events-none" />

      <div className="grid lg:grid-cols-2 gap-20 relative z-10">
        
        {/* --- LEFT SIDE: STICKY INFO & MAP --- */}
        <div className="lg:sticky lg:top-32 h-fit space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className={`flex items-center gap-3 text-[${ACCENT}] ${mono.className} text-xs tracking-widest mb-4`}>
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-[${ACCENT}] opacity-75`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 bg-[${ACCENT}]`}></span>
                </span>
                SYSTEM_STATUS: CRITICAL
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold leading-tight text-white mb-6">
              PROTOCOL <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-white">EXECUTION</span>
            </h2>

            <p className={`${inter.className} text-xl text-gray-400 leading-relaxed max-w-md`}>
              We don't just write code; we forge <span className={`text-[${ACCENT}] font-medium`}>resilient digital infrastructure</span>.
            </p>
          </motion.div>

          {/* INTEGRATED MAP CARD */}
          <div className="max-w-md">
             <div className="mb-2 text-xs font-mono text-gray-500 uppercase tracking-widest">Global Operations Center</div>
             <LocationMap 
                location="Indore, India" 
                coordinates="22.7196° N, 75.8577° E" 
             />
          </div>
        </div>

        {/* --- RIGHT SIDE: TIMELINE --- */}
        <div className="relative pl-8 md:pl-0">
          
          {/* Vertical Track */}
          <div className="absolute left-[23px] md:left-8 top-4 bottom-12 w-px bg-white/10">
            {/* Filling Beam (Orange Glow) */}
            <motion.div 
                style={{ height: lineHeight }}
                className={`w-full bg-linear-to-b from-[${ACCENT}] via-[${ACCENT}] to-transparent shadow-[0_0_20px_${ACCENT}]`}
            />
          </div>

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative pl-16 md:pl-24 group"
              >
                {/* Connector Dot */}
                <div className={`absolute left-[15px] md:left-[23px] top-0 transform -translate-x-1/2 w-4 h-4 bg-[#050505] border border-white/20 rounded-full z-10 group-hover:border-[${ACCENT}] group-hover:scale-125 transition-all duration-300`}>
                    <div className={`absolute inset-0 m-auto w-1.5 h-1.5 bg-[${ACCENT}] rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_${ACCENT}]`} />
                </div>

                {/* Card */}
                {/* Updated class names to remove linter warnings */}
                <div className={`relative p-6 md:p-8 rounded-xl border border-white/5 bg-white/2 hover:bg-white/4 hover:border-[${ACCENT}]/40 transition-all duration-500 group-hover:shadow-[0_0_40px_-15px_rgba(255,85,0,0.2)]`}>
                    
                    {/* Icon */}
                    <div className={`mb-6 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[${ACCENT}]/10 text-[${ACCENT}] border border-[${ACCENT}]/20 group-hover:bg-[${ACCENT}] group-hover:text-black transition-all duration-300`}>
                        {/* Fixed TypeScript Error by casting to any to allow prop injection */}
                        {React.cloneElement(step.icon as React.ReactElement<any>, { strokeWidth: 1.5 })}
                    </div>

                    <div className={`absolute top-8 right-8 text-4xl font-bold text-white/5 group-hover:text-white/10 transition-colors ${mono.className}`}>
                        {step.id}
                    </div>

                    <h3 className={`text-2xl font-bold text-white mb-3 group-hover:text-[${ACCENT}] transition-colors`}>
                        {step.title}
                    </h3>
                    
                    <p className={`${inter.className} text-gray-400 leading-relaxed group-hover:text-gray-300`}>
                        {step.desc}
                    </p>

                    {/* Industrial Corners */}
                    <div className={`absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[${ACCENT}]/50 opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                    <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l border-[${ACCENT}]/50 opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}