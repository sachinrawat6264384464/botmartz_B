"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Zap, Cpu, Globe, Layers, Code2, Database, Shield, Terminal, LayoutTemplate, Activity, Boxes } from "lucide-react";

// THEME CONFIG
const ACCENT = "#D4AF37";

// --- BENTO GRID DATA ---
// Spans define the "Bento" shape (col-span, row-span)
const SERVICES = [
  { id: "01", title: "Workflow Automation", desc: "Streamlined processes for maximum efficiency.", icon: <Zap />, colSpan: 2, rowSpan: 1 },
  { id: "02", title: "AI Solutions", desc: "Custom intelligent agents for your business.", icon: <Cpu />, colSpan: 1, rowSpan: 1 },
  { id: "03", title: "High-Performance Web", desc: "Global edge rendering & Next.js.", icon: <Globe />, colSpan: 1, rowSpan: 2 },
  { id: "04", title: "Scalable SaaS", desc: "Multi-tenant cloud infrastructure.", icon: <Layers />, colSpan: 2, rowSpan: 1 },
  { id: "05", title: "API Integration", desc: "Seamless third-party tool fusion.", icon: <Code2 />, colSpan: 1, rowSpan: 1 },
  { id: "06", title: "Data Analytics", desc: "Actionable insights from your data.", icon: <Database />, colSpan: 1, rowSpan: 1 },
  { id: "07", title: "Enterprise Security", desc: "Zero-trust protocols & encryption.", icon: <Shield />, colSpan: 2, rowSpan: 1 },
  { id: "08", title: "DevOps", desc: "CI/CD & automated deployment.", icon: <Terminal />, colSpan: 1, rowSpan: 1 },
];

export function ServicesGrid() {
  return (
    <section className="relative py-24 md:py-40 px-4 md:px-12 max-w-[1700px] mx-auto bg-[#050505] overflow-hidden">
      
      {/* 1. BACKGROUND NEURAL NETWORK (Canvas) */}
      <NeuralNetworkCanvas />
      
      {/* 2. HEADER */}
      <div className="relative z-10 mb-16 md:mb-24 flex flex-col items-start border-l-2 border-[#D4AF37]/30 pl-8 ml-4 md:ml-12">
        <motion.div 
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           className="flex items-center gap-3 mb-4 font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase"
        >
            <Boxes className="w-4 h-4" />
            <span>Core_Capabilities</span>
        </motion.div>
        
        <h2 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter text-white uppercase mb-4">
            System <br />
            <motion.span 
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-[#D4AF37] drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
                Modules
            </motion.span>
        </h2>
        
        <p className="text-gray-500 max-w-md leading-relaxed font-light text-sm md:text-base">
            Robust digital architecture. <span className="text-[#D4AF37]">Engineered for scale.</span>
        </p>
      </div>

      {/* 3. BENTO GRID */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4 md:gap-6 px-4 md:px-12">
        {SERVICES.map((service, i) => (
          <BentoCard key={i} service={service} index={i} />
        ))}
      </div>

    </section>
  );
}

function BentoCard({ service, index }: { service: any; index: number }) {
    const controls = useAnimation();
    
    // Random "breathing" delay to make it feel organic/alive
    const randomDelay = Math.random() * 2;
    
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`
                group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0A0A0A]/80 backdrop-blur-md
                hover:border-[#D4AF37]/50 transition-colors duration-500
                col-span-1 ${service.colSpan === 2 ? 'md:col-span-2' : ''}
                ${service.rowSpan === 2 ? 'md:row-span-2' : ''}
            `}
        >
            {/* --- ALIVE ELEMENTS --- */}
            
            {/* 1. Pulse Background */}
            <motion.div 
               animate={{ opacity: [0.02, 0.05, 0.02] }}
               transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: randomDelay }}
               className="absolute inset-0 bg-[#D4AF37] z-0 pointer-events-none"
            />

            {/* 2. Scanning Beam (Hover) */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent -translate-x-full group-hover:animate-[scan_1.5s_ease-in-out_infinite] z-20 pointer-events-none" />

            {/* 3. Data Flow Corners */}
            <svg className="absolute top-0 right-0 w-8 h-8 opacity-20 group-hover:opacity-100 transition-opacity duration-300">
               <path d="M0 0 H 32 V 32" fill="none" stroke="#D4AF37" strokeWidth="2" />
            </svg>
            <svg className="absolute bottom-0 left-0 w-8 h-8 opacity-20 group-hover:opacity-100 transition-opacity duration-300">
               <path d="M0 32 V 0 H 32" fill="none" stroke="#D4AF37" strokeWidth="2" transform="rotate(180 16 16)" />
            </svg>


            {/* --- CONTENT --- */}
            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="p-3 rounded-lg bg-white/5 text-[#D4AF37] group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
                        {React.cloneElement(service.icon, { size: 24, strokeWidth: 1.5 })}
                    </div>
                    {/* Status Dot */}
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-gray-500 group-hover:text-[#D4AF37]">ONLINE</span>
                        <motion.div 
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" 
                        />
                    </div>
                </div>

                {/* Body */}
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">{service.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-300">{service.desc}</p>
                </div>

                {/* Simulated Data Stream (Hidden until hover) */}
                <div className="absolute bottom-8 right-8 font-mono text-[9px] text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-end">
                    <span>UPTIME: 99.9%</span>
                    <span>LATENCY: 12ms</span>
                </div>
            </div>

        </motion.div>
    );
}

// --- CANVAS BACKGROUND ---
function NeuralNetworkCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef); // Hook to track visibility

    useEffect(() => {
        const bgCanvas = canvasRef.current;
        if (!bgCanvas) return;
        const ctx = bgCanvas.getContext('2d');
        if (!ctx) return;

        let width = bgCanvas.width = window.innerWidth;
        let height = bgCanvas.height = window.innerHeight;
        const isMobile = width < 768; // Mobile check

        // Nodes
        const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
        const nodeCount = isMobile ? 15 : 40; // Reduced count for mobile

        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5, // Slow movement
                vy: (Math.random() - 0.5) * 0.5
            });
        }

        let animationId: number;
        let isRunning = true;

        const draw = () => {
            if (!isRunning) return; // Stop drawing if flagged

            ctx.clearRect(0, 0, width, height);

            ctx.fillStyle = "#D4AF37";
            ctx.strokeStyle = "rgba(212, 175, 55, 0.15)"; // Gold Activity Lines

            nodes.forEach((node, i) => {
                // Move
                node.x += node.vx;
                node.y += node.vy;

                // Bounce
                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;

                // Draw Node
                ctx.beginPath();
                ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
                ctx.fill();

                // Connect
                for (let j = i + 1; j < nodes.length; j++) {
                    const other = nodes[j];
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);
                        // Opacity based on distance
                        ctx.globalAlpha = 1 - dist / 150;
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            });

            animationId = requestAnimationFrame(draw);
        };

        // Controls
        if (isInView) {
            isRunning = true;
            draw();
        } else {
            isRunning = false;
        }

        const handleResize = () => {
             width = bgCanvas.width = window.innerWidth;
             height = bgCanvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
            isRunning = false;
        }

    }, [isInView]); // Re-run effect when `isInView` changes

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none opacity-40">
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
}

