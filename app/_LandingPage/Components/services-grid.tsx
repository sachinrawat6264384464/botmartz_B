"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Cpu, Globe, Layers, Code2, Database, Shield, Terminal, LayoutTemplate, ArrowRight, Activity, Command, Boxes } from "lucide-react";

// THEME CONFIG: Industrial Orange
const ACCENT = "#FF5500"; 

// --- DATA (Optimized: No Images for better performance) ---
const SERVICES = [
  { id: "01", title: "Neural Automations", desc: "Self-optimizing workflows that evolve with business data.", icon: <Zap /> },
  { id: "02", title: "Sentient Agents", desc: "Context-aware LLMs for autonomous customer support.", icon: <Cpu /> },
  { id: "03", title: "Hyper-Web Systems", desc: "Next.js architectures with global edge rendering.", icon: <Globe /> },
  { id: "04", title: "SaaS Infrastructure", desc: "Multi-tenant cloud scalability and load balancing.", icon: <Layers /> },
  { id: "05", title: "API Symbiosis", desc: "Seamless fusion of disparate third-party tools.", icon: <Code2 /> },
  { id: "06", title: "Predictive Analytics", desc: "Visualizing future trends from raw unstructured data.", icon: <Database /> },
  { id: "07", title: "Cyber-Security", desc: "Zero-trust protocols and quantum-resistant encryption.", icon: <Shield /> },
  { id: "08", title: "DevOps Pipeline", desc: "Automated CI/CD, containerization, and orchestration.", icon: <Terminal /> },
  { id: "09", title: "Interface Chemistry", desc: "UX designs optimized for maximum conversion rates.", icon: <LayoutTemplate /> },
];

export function ServicesGrid() {
  return (
    <section className="relative py-16 md:py-32 px-4 md:px-12 max-w-[1600px] mx-auto bg-[#050505] overflow-hidden">
        
        {/* Background Texture: Subtle Grid & Radar Scan */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[${ACCENT}] to-transparent opacity-20`} />

        {/* HEADER - Mobile Optimized */}
        <div className="relative z-10 mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-6 md:pb-10">
            <div className="w-full md:w-auto">
                <div className={`flex items-center gap-2 mb-3 md:mb-4 text-[${ACCENT}] font-mono text-[10px] md:text-xs tracking-widest`}>
                    <Boxes className="w-3 h-3 md:w-4 md:h-4" />
                    <span>SYSTEM_CAPABILITIES_V.4.0</span>
                </div>
                <h2 className="text-4xl md:text-7xl font-bold leading-none tracking-tighter text-white">
                    SYSTEM <span className={`text-[${ACCENT}] drop-shadow-[0_0_25px_${ACCENT}60]`}>MODULES</span>
                </h2>
            </div>
            <p className="text-gray-500 max-w-sm text-left md:text-right mt-4 md:mt-0 leading-relaxed text-sm md:text-base font-light">
                Deploying advanced neural architectures to solve complex business logic.
            </p>
        </div>

        {/* GRID - Responsive Layout */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {SERVICES.map((service, i) => (
                <ServiceCard key={i} service={service} index={i} />
            ))}
        </div>
    </section>
  )
}

function ServiceCard({ service, index }: { service: any; index: number }) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onTouchStart={() => setHovered(true)}
            onTouchEnd={() => setHovered(false)}
            className={`group relative h-[280px] md:h-[340px] bg-[#0A0A0A] border border-white/5 hover:border-[${ACCENT}]/60 active:border-[${ACCENT}]/60 transition-colors duration-500 overflow-hidden cursor-pointer`}
        >
            {/* 1. HOVER SCANNER EFFECT (Orange Heat Laser) */}
            <div 
                className={`absolute inset-0 bg-gradient-to-b from-transparent via-[${ACCENT}]/10 to-transparent -translate-y-full transition-transform duration-700 ease-in-out pointer-events-none ${hovered ? 'translate-y-full' : ''}`} 
            />
            
            {/* 2. INDUSTRIAL CORNER BRACKETS */}
            {/* Top Left */}
            <div className={`absolute top-0 left-0 w-2 h-2 md:w-3 md:h-3 border-l-2 border-t-2 border-white/10 group-hover:border-[${ACCENT}] group-active:border-[${ACCENT}] group-hover:w-4 group-hover:h-4 md:group-hover:w-6 md:group-hover:h-6 transition-all duration-300`} />
            {/* Bottom Right */}
            <div className={`absolute bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 border-r-2 border-b-2 border-white/10 group-hover:border-[${ACCENT}] group-active:border-[${ACCENT}] group-hover:w-4 group-hover:h-4 md:group-hover:w-6 md:group-hover:h-6 transition-all duration-300`} />

            {/* 3. CONTENT STRUCTURE - Mobile Optimized */}
            <div className="relative h-full p-5 md:p-8 flex flex-col justify-between z-10">
                
                {/* Header: ID & Icon */}
                <div className="flex justify-between items-start">
                    <span className={`font-mono text-[10px] md:text-xs text-white/20 group-hover:text-[${ACCENT}] group-active:text-[${ACCENT}] transition-colors duration-300`}>
                        // MOD_{service.id}
                    </span>
                    
                    {/* Glowing Icon Box */}
                    <div className={`
                        p-2 md:p-3 rounded-md bg-white/5 border border-white/5 text-gray-400
                        group-hover:text-black group-hover:bg-[${ACCENT}] group-hover:border-[${ACCENT}] group-hover:shadow-[0_0_20px_${ACCENT}]
                        group-active:text-black group-active:bg-[${ACCENT}] group-active:border-[${ACCENT}] group-active:shadow-[0_0_20px_${ACCENT}]
                        transition-all duration-300 transform group-hover:-translate-y-1 group-active:-translate-y-1
                    `}>
                        {React.cloneElement(service.icon, { size: 20, strokeWidth: 1.5, className: "md:w-6 md:h-6" })}
                    </div>
                </div>

                {/* Body: Title & Desc */}
                <div className="space-y-2 md:space-y-4">
                    <h3 className={`text-2xl md:text-3xl text-white font-medium group-hover:text-[${ACCENT}] group-active:text-[${ACCENT}] transition-colors duration-300`}>
                        {service.title}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed group-hover:text-gray-300 group-active:text-gray-300 transition-colors duration-300">
                        {service.desc}
                    </p>
                </div>

                {/* Footer: Action Line */}
                <div className="flex items-center gap-4 overflow-hidden pt-3 md:pt-4">
                    <div className={`h-[1px] bg-white/10 w-full group-hover:bg-[${ACCENT}]/50 group-active:bg-[${ACCENT}]/50 transition-colors duration-500`} />
                    <div className="flex items-center gap-2 translate-y-[200%] group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-300 ease-out">
                        <span className={`font-mono text-[9px] md:text-[10px] text-[${ACCENT}] uppercase whitespace-nowrap font-bold`}>Initialize</span>
                        <ArrowRight size={10} className={`text-[${ACCENT}] md:w-3 md:h-3`} />
                    </div>
                </div>
            </div>

            {/* 4. BACKGROUND DECORATION - Smaller on mobile */}
            <div className="absolute -right-4 -bottom-4 p-4 opacity-[0.02] group-hover:opacity-[0.08] group-active:opacity-[0.08] transition-opacity duration-500 pointer-events-none">
                 <Activity size={120} strokeWidth={1} className="md:w-[180px] md:h-[180px]" />
            </div>

        </motion.div>
    );
}