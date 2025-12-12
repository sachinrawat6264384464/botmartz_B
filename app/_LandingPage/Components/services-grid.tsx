"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Cpu, Globe, Layers, Code2, Database, Shield, Terminal, LayoutTemplate, ArrowRight, Activity, Command, Boxes } from "lucide-react";
import { Inter_Tight, JetBrains_Mono } from 'next/font/google';

const inter = Inter_Tight({ subsets: ['latin'], weight: ['300', '500', '800'] });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400'] });

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
    <section className="relative py-32 px-6 md:px-12 max-w-[1600px] mx-auto bg-[#050505] overflow-hidden">
        
        {/* Background Texture: Subtle Grid & Radar Scan */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[${ACCENT}] to-transparent opacity-20`} />

        {/* HEADER */}
        <div className="relative z-10 mb-20 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-10">
            <div>
                <div className={`flex items-center gap-2 mb-4 text-[${ACCENT}] ${mono.className} text-xs tracking-widest`}>
                    <Boxes className="w-4 h-4" />
                    <span>SYSTEM_CAPABILITIES_V.4.0</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-bold leading-none tracking-tighter text-white">
                    SYSTEM <span className={`text-[${ACCENT}] drop-shadow-[0_0_25px_${ACCENT}60]`}>MODULES</span>
                </h2>
            </div>
            <p className={`${inter.className} text-gray-500 max-w-sm text-right mt-6 md:mt-0 leading-relaxed`}>
                Deploying advanced neural architectures to solve complex business logic.
            </p>
        </div>

        {/* GRID */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
            className={`group relative h-[340px] bg-[#0A0A0A] border border-white/5 hover:border-[${ACCENT}]/60 transition-colors duration-500 overflow-hidden cursor-crosshair`}
        >
            {/* 1. HOVER SCANNER EFFECT (Orange Heat Laser) */}
            {/* Vertical Bar that moves down */}
            <div 
                className={`absolute inset-0 bg-gradient-to-b from-transparent via-[${ACCENT}]/10 to-transparent -translate-y-full transition-transform duration-700 ease-in-out pointer-events-none ${hovered ? 'translate-y-full' : ''}`} 
            />
            
            {/* 2. INDUSTRIAL CORNER BRACKETS */}
            {/* Top Left */}
            <div className={`absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-white/10 group-hover:border-[${ACCENT}] group-hover:w-6 group-hover:h-6 transition-all duration-300`} />
            {/* Bottom Right */}
            <div className={`absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-white/10 group-hover:border-[${ACCENT}] group-hover:w-6 group-hover:h-6 transition-all duration-300`} />

            {/* 3. CONTENT STRUCTURE */}
            <div className="relative h-full p-8 flex flex-col justify-between z-10">
                
                {/* Header: ID & Icon */}
                <div className="flex justify-between items-start">
                    <span className={`${mono.className} text-xs text-white/20 group-hover:text-[${ACCENT}] transition-colors duration-300`}>
                        // MOD_{service.id}
                    </span>
                    
                    {/* Glowing Icon Box */}
                    <div className={`
                        p-3 rounded-md bg-white/5 border border-white/5 text-gray-400
                        group-hover:text-black group-hover:bg-[${ACCENT}] group-hover:border-[${ACCENT}] group-hover:shadow-[0_0_20px_${ACCENT}]
                        transition-all duration-300 transform group-hover:-translate-y-1
                    `}>
                        {React.cloneElement(service.icon, { size: 24, strokeWidth: 1.5 })}
                    </div>
                </div>

                {/* Body: Title & Desc */}
                <div className="space-y-4">
                    <h3 className={`${inter.className} text-3xl text-white font-medium group-hover:text-[${ACCENT}] transition-colors duration-300`}>
                        {service.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        {service.desc}
                    </p>
                </div>

                {/* Footer: Action Line */}
                <div className="flex items-center gap-4 overflow-hidden pt-4">
                    <div className={`h-[1px] bg-white/10 w-full group-hover:bg-[${ACCENT}]/50 transition-colors duration-500`} />
                    <div className="flex items-center gap-2 translate-y-[200%] group-hover:translate-y-0 transition-transform duration-300 ease-out">
                        <span className={`${mono.className} text-[10px] text-[${ACCENT}] uppercase whitespace-nowrap font-bold`}>Initialize</span>
                        <ArrowRight size={12} className={`text-[${ACCENT}]`} />
                    </div>
                </div>
            </div>

            {/* 4. BACKGROUND DECORATION */}
            <div className="absolute -right-4 -bottom-4 p-4 opacity-[0.02] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none">
                 <Activity size={180} strokeWidth={1} />
            </div>

        </motion.div>
    );
}