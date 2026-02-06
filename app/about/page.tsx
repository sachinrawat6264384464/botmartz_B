"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Linkedin, Mail, ArrowUpRight, Download, 
  Code2, Cpu, Globe, Layers, Terminal, Sparkles
} from "lucide-react";

// --- RESUME DATA ---
const FOUNDER = {
  name: "Soham Sharma",
  role: "GenAI Architect & Product Leader",
  tagline: "Bridging the gap between Enterprise Strategy and Neural Architecture.",
  location: "Indore, India",
  email: "sohamnsharma@gmail.com",
  image: "/Sohamsharma.jpeg", // Ensure this file is in your /public folder
  stats: [
    { label: "Years Exp", value: "11+" },
    { label: "Corporate Clients", value: "20+" },
    { label: "Students Mentored", value: "15k+" },
  ],
  stack: ["LLM Ops", "RAG Systems", "AWS/Azure", "Python", "Agentic AI"],
  experience: [
    {
      company: "IntelliPaaS Inc.",
      role: "AI Product Manager",
      year: "2025 - Present",
      desc: "Owning end-to-end AI product lifecycle. Architecting scalable RAG systems and Agentic workflows."
    },
    {
      company: "Botmartz IT Solutions",
      role: "Corporate GenAI Trainer",
      year: "2024 - Present",
      desc: "Delivering high-impact corporate training on LLMs, Prompt Engineering, and Cloud AI to MNCs."
    },
    {
      company: "Ziplyne Inc.",
      role: "GTM & Training Lead",
      year: "2021 - 2024",
      desc: "Led product strategy and AI integration. Drove 25% higher retention through AI-driven personalization."
    }
  ]
};

export default function FounderPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <main ref={containerRef} className="bg-[#050505] min-h-screen text-white selection:bg-[#D4AF37] selection:text-black relative overflow-hidden">
      
      {/* --- GLOBAL GRAIN OVERLAY (The "Premium" Texture) --- */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat w-full h-full" />
      </div>

      {/* --- BACKGROUND GRADIENTS --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-12 pt-32 pb-20 relative z-10">
        
        {/* --- SECTION 1: EDITORIAL HERO --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-32">
          
          {/* Text Side */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="px-3 py-1 border border-[#D4AF37]/30 rounded-full bg-[#D4AF37]/5 backdrop-blur-md">
                   <span className="text-[#D4AF37] text-[10px] font-mono uppercase tracking-[0.2em] flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                     Available for Consulting
                   </span>
                </div>
              </div>

              <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500">
                SOHAM <br />
                <span className="text-[#D4AF37]">SHARMA</span>.
              </h1>

              <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl leading-relaxed mb-10">
                {FOUNDER.tagline}
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest overflow-hidden hover:bg-[#D4AF37] transition-colors duration-300">
                  <span className="relative z-10 flex items-center gap-2">
                    Book Strategy Call <ArrowUpRight className="w-4 h-4" />
                  </span>
                </button>
                <button className="px-8 py-4 border border-white/10 text-white font-bold uppercase tracking-widest hover:bg-white/5 transition-colors flex items-center gap-2">
                   <Download className="w-4 h-4" /> CV
                </button>
              </div>
            </motion.div>
          </div>

          {/* Image Side (Sticky Parallax) */}
          <div className="lg:col-span-5 order-1 lg:order-2 relative">
             <motion.div 
               style={{ y }} 
               className="relative aspect-[3/4] md:aspect-[4/5] w-full rounded-sm overflow-hidden"
             >
                {/* Main Image */}
                <Image 
                  src={FOUNDER.image}
                  alt={FOUNDER.name}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out scale-105 hover:scale-100"
                  priority
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />

                {/* Floating "Card" on top of image */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-6 right-6 bg-[#050505]/80 backdrop-blur-xl border border-white/10 p-6 max-w-[200px]"
                >
                   <p className="text-xs text-gray-400 font-mono mb-2">CURRENT FOCUS</p>
                   <p className="text-sm font-bold text-white leading-tight">
                     Architecting Enterprise Agentic Workflows
                   </p>
                </motion.div>
             </motion.div>
          </div>
        </div>

        {/* --- SECTION 2: STATS & SKILLS TICKER --- */}
        <div className="border-y border-white/10 py-12 mb-32 relative overflow-hidden">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
              
              {/* Stats */}
              <div className="flex gap-12">
                 {FOUNDER.stats.map((stat, i) => (
                    <div key={i}>
                       <h3 className="text-4xl md:text-5xl font-black text-white mb-1">{stat.value}</h3>
                       <p className="text-[#D4AF37] text-xs font-mono uppercase tracking-widest">{stat.label}</p>
                    </div>
                 ))}
              </div>

              {/* Stack Tags */}
              <div className="flex flex-wrap gap-3 max-w-md justify-start md:justify-end">
                 {FOUNDER.stack.map((tech, i) => (
                    <span key={i} className="px-4 py-2 border border-white/10 rounded-full text-xs font-mono text-gray-400 uppercase hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors cursor-default">
                       {tech}
                    </span>
                 ))}
              </div>
           </div>
        </div>

        {/* --- SECTION 3: THE WORK (Timeline) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
           {/* Header */}
           <div className="lg:col-span-1">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">CAREER<br /><span className="text-[#D4AF37]">TRAJECTORY</span></h2>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                 A decade of evolution from hands-on engineering to strategic AI leadership. Building systems that scale and teams that deliver.
              </p>
           </div>

           {/* Timeline Grid */}
           <div className="lg:col-span-2 space-y-8">
              {FOUNDER.experience.map((job, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="group p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors border-l-2 border-l-transparent hover:border-l-[#D4AF37]"
                 >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                       <h3 className="text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                          {job.company}
                       </h3>
                       <span className="font-mono text-xs text-gray-500 border border-white/10 px-2 py-1 rounded">
                          {job.year}
                       </span>
                    </div>
                    <p className="text-lg font-medium text-white mb-2">{job.role}</p>
                    <p className="text-gray-400 font-light leading-relaxed">
                       {job.desc}
                    </p>
                 </motion.div>
              ))}
           </div>
        </div>

        {/* --- SECTION 4: CONTACT FOOTER --- */}
        <div className="mt-32 p-12 md:p-24 bg-[#D4AF37] rounded-sm relative overflow-hidden group">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply" />
           <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
              <Globe size={300} className="text-black" />
           </div>

           <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-black text-black mb-8 leading-tight">
                 LET'S BUILD THE<br />IMPOSSIBLE.
              </h2>
              <div className="flex flex-col md:flex-row gap-8">
                 <a href={`mailto:${FOUNDER.email}`} className="flex items-center gap-3 text-black font-bold text-xl hover:opacity-70 transition-opacity">
                    <Mail size={24} /> {FOUNDER.email}
                 </a>
                 <a href="#" className="flex items-center gap-3 text-black font-bold text-xl hover:opacity-70 transition-opacity">
                    <Linkedin size={24} /> LinkedIn Profile
                 </a>
              </div>
           </div>
        </div>

      </div>
    </main>
  );
}