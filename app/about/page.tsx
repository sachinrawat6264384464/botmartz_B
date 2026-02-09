"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { ArrowUpRight, Cpu, Globe, Linkedin, Mail, Terminal , Sparkles } from "lucide-react";

// --- DATA ---
const DATA = {
  founder: {
    name: "SOHAM SHARMA",
    role: "GENAI_ARCHITECT", 
    location: "INDORE_IN",
    image: "/Sohamsharma2.jpeg",
    email: "sohamnsharma@gmail.com",
    phone: "+91-9730084626"
  },
  experience: [
    { company: "INTELLIPAAS", role: "AI Product Architect", year: "2025", desc: "RAG Systems & Agentic Workflows" },
    { company: "BOTMARTZ", role: "Corporate GenAI Trainer", year: "2024", desc: "LLM & Cloud AI Modules" },
    { company: "ZIPLYNE", role: "GTM & Training Lead", year: "2021", desc: "Product Strategy & AI Integration" },
    { company: "POWERWEAVE", role: "Tech Support Spec.", year: "2020", desc: "Implementation & Adoption" },
    { company: "GENESYS", role: "GIS Trainer", year: "2017", desc: "Data Digitization Leadership" },
  ],
  stack: [
    "OpenAI GPT-4", "LangChain", "RAG Arch", "AWS SageMaker", 
    "Python", "Next.js", "TensorFlow", "Kubernetes"
  ]
};

// --- OPTIMIZED COMPONENTS ---

// Simple cursor - reduced complexity
const CustomCursor = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, [x, y]);

  const smoothX = useSpring(x, { damping: 25, stiffness: 400 });
  const smoothY = useSpring(y, { damping: 25, stiffness: 400 });

  return (
    <motion.div
      style={{ left: smoothX, top: smoothY }}
      className="fixed z-[9999] w-4 h-4 bg-[#D4AF37] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
    />
  );
};

// Optimized magnetic button
const MagneticButton = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.3);
    y.set((clientY - (top + height / 2)) * 0.3);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

// Optimized magnetic wrapper
const MagneticCircle = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.15);
    y.set((clientY - (top + height / 2)) * 0.15);
  };

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};

// --- OPTIMIZED HERO ---
const Hero = () => {
  const { scrollY } = useScroll();
  
  const yTextBack = useTransform(scrollY, [0, 500], [0, 150]);
  const yTextFront = useTransform(scrollY, [0, 500], [0, -100]);
  const scaleImg = useTransform(scrollY, [0, 500], [1, 0.9]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen min-h-[900px] w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center">
      
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_60%)]" />
      
      {/* Reduced particles - only 10 for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            }}
            animate={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            }}
            transition={{ 
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-[#D4AF37] rounded-full opacity-20"
          />
        ))}
      </div>

      {/* Simplified gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4AF37] opacity-5 blur-[100px] rounded-full" />

      {/* Background text */}
      <motion.div 
        style={{ y: yTextBack, opacity: opacityText }}
        className="absolute top-[15%] left-0 w-full flex justify-center z-0 pointer-events-none select-none"
      >
        <h1 
          className="text-[22vw] md:text-[18vw] font-black leading-none tracking-tighter"
          style={{ 
            background: 'linear-gradient(180deg, rgba(212,175,55,0.1) 0%, transparent 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          AI
        </h1>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center w-full max-w-7xl mx-auto px-6">
         
         {/* Left Cards - Simplified */}
         <div className="hidden lg:flex flex-col gap-6 absolute left-0 xl:left-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#0a0a0a]/80 backdrop-blur-md border border-[#D4AF37]/20 p-5 rounded-xl max-w-[280px] group hover:border-[#D4AF37]/40 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="bg-[#D4AF37]/10 p-3 rounded-lg">
                  <Terminal className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-2xl font-black text-white">11+</p>
                  <p className="text-xs text-gray-400 font-mono uppercase">Years AI</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-emerald-500/5 backdrop-blur-md border border-emerald-500/20 p-4 rounded-xl max-w-[280px]"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                <div>
                  <p className="text-sm font-bold text-white">Available</p>
                  <p className="text-xs text-emerald-400 font-mono">INDORE, INDIA</p>
                </div>
              </div>
            </motion.div>
         </div>

         {/* Center Image - REMOVED WHITE BOX */}
         <div className="relative">
            {/* Single rotating ring - optimized */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 -m-20 pointer-events-none"
            >
              <div className="w-full h-full rounded-full border border-dashed border-[#D4AF37]/15" />
            </motion.div>

            {/* Simplified glow */}
            <div 
              className="absolute inset-0 -m-8 rounded-full opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)',
                filter: 'blur(40px)'
              }}
            />

            <MagneticCircle>
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                style={{ scale: scaleImg }}
                className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden border border-[#D4AF37]/30 shadow-[0_0_60px_-15px_rgba(212,175,55,0.5)] bg-[#0a0a0a] group"
              >
                 <Image 
                   src={DATA.founder.image} 
                   alt={DATA.founder.name} 
                   fill 
                   className="object-cover object-[50%_30%] transition-all duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                   priority
                   quality={85}
                 />
                 
                 <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.7)] rounded-full" />
                 
                 {/* Status Badge */}
                 <motion.div 
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 1 }}
                   className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-sm border border-[#D4AF37]/30 px-5 py-2 rounded-full flex items-center gap-2"
                 >
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
                    <span className="text-xs font-mono text-white uppercase tracking-wider font-bold">
                      ONLINE
                    </span>
                    <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
                 </motion.div>
              </motion.div>
            </MagneticCircle>
         </div>

         {/* Right Cards - Simplified */}
         <div className="hidden lg:flex flex-col gap-6 absolute right-0 xl:right-12">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#0a0a0a]/80 backdrop-blur-md border border-blue-500/20 p-5 rounded-xl max-w-[280px]"
            >
              <div className="flex items-start gap-3">
                <div className="bg-blue-500/10 p-3 rounded-lg">
                  <Globe className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-black text-white">15K+</p>
                  <p className="text-xs text-gray-400 font-mono uppercase">Trained</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-5 rounded-xl max-w-[280px]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-black text-white">20+</p>
                  <p className="text-xs text-gray-400 font-mono uppercase">Clients</p>
                </div>
                <Sparkles className="w-10 h-10 text-[#D4AF37] opacity-40" />
              </div>
            </motion.div>
         </div>
      </div>

      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ y: yTextFront }}
        className="relative z-30 -mt-16 md:-mt-20 pointer-events-none"
      >
        <h1 className="text-[16vw] md:text-[12vw] lg:text-[10vw] font-black leading-none tracking-tighter text-center">
          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            ARCHI
          </span>
          <span className="bg-gradient-to-r from-[#D4AF37] to-yellow-500 bg-clip-text text-transparent">
            TECT
          </span>
        </h1>
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-3"
          style={{ width: "60%" }}
        />

        <p className="text-center text-gray-400 font-mono text-xs md:text-sm uppercase tracking-[0.3em] mt-6">
          GenAI Systems • RAG • LLMs
        </p>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 w-full px-6 md:px-20 z-40"
      >
        <div className="max-w-7xl mx-auto bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 md:p-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                ACTIVE
              </div>
              <div className="h-6 w-[1px] bg-white/10 hidden md:block" />
              <div>
                <p className="text-xs font-mono text-gray-400">
                  <span className="text-[#D4AF37]">&gt;</span> <span className="text-white font-bold">{DATA.founder.name}</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 group cursor-pointer">
              <span className="hidden md:block font-mono text-[9px] text-gray-400 uppercase">Explore</span>
              <div className="w-6 h-10 border border-[#D4AF37]/40 rounded-full flex items-start justify-center p-1.5 group-hover:border-[#D4AF37] transition-colors">
                <motion.div 
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1 h-1 bg-[#D4AF37] rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Stats */}
      <div className="lg:hidden absolute bottom-28 left-0 right-0 px-6 z-30">
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: "11+", label: "Years" },
            { value: "20+", label: "Clients" },
            { value: "15K+", label: "Trained" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="bg-black/50 backdrop-blur-sm border border-white/10 p-3 rounded-lg text-center"
            >
              <p className="text-xl font-black text-white">{stat.value}</p>
              <p className="text-[8px] text-gray-400 font-mono uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
};

// --- OPTIMIZED MARQUEE ---
// --- OPTIMIZED MARQUEE (FIXED) ---
const Marquee = ({ text }: { text: string }) => {
  const baseVelocity = -120;
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const x = useMotionValue(0);
  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1; // ✅ FIXED: Changed from velocityFactor.current to velocityFactor.get()
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    x.set(x.get() + moveBy);
  });

  return (
    <div className="relative overflow-hidden whitespace-nowrap py-8 border-y border-[#D4AF37]/20 bg-[#0a0a0a]">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />

      <motion.div style={{ x }} className="flex text-[4vw] md:text-[2vw] font-mono uppercase tracking-tight">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="mr-12 flex items-center gap-4">
             <span className="bg-gradient-to-r from-[#D4AF37] to-yellow-500 bg-clip-text text-transparent font-bold">
               {text}
             </span>
             <span className="w-2 h-2 bg-[#D4AF37] rounded-full" />
          </span>
        ))}
      </motion.div>

      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
    </div>
  );
};

// --- OPTIMIZED EXPERIENCE ---
const Experience = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 px-6 md:px-20 bg-[#050505] border-t border-white/5">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/3">
           <div className="md:sticky md:top-24">
              <h2 className="text-5xl md:text-7xl font-black text-[#1a1a1a] uppercase tracking-tighter mb-4">
                 Work<br/><span className="text-white">History</span>
              </h2>
              <p className="text-gray-400 max-w-xs text-sm">
                 Scaling AI systems from concept to enterprise adoption.
              </p>
           </div>
        </div>

        <div className="md:w-2/3">
           {DATA.experience.map((job, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.4, delay: i * 0.1 }}
               onMouseEnter={() => setHoveredIndex(i)}
               onMouseLeave={() => setHoveredIndex(null)}
               className="group relative border-t border-white/10 py-12 cursor-pointer"
             >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-3 relative z-10">
                   <h3 className="text-2xl md:text-4xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                      {job.company}
                   </h3>
                   <span className="font-mono text-gray-500 text-sm">{job.role} — {job.year}</span>
                </div>
                <p className="text-gray-400 mt-3 max-w-lg group-hover:text-white transition-colors relative z-10">
                   {job.desc}
                </p>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <ArrowUpRight className="text-[#D4AF37] w-10 h-10" />
                </div>
                {hoveredIndex === i && (
                  <motion.div 
                    layoutId="experience-bg"
                    className="absolute inset-0 bg-white/[0.02]"
                  />
                )}
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};
import { 
  SiOpenai, 
  SiPython, 
  SiNextdotjs, 
  SiTensorflow,
  SiPytorch,
  SiKubernetes,
  SiAmazon,
  SiDocker,
  SiMongodb,
  SiPostgresql,
  SiReact,
  SiDjango,
  SiRedis,
  SiFastapi,
  SiFirebase,
  SiGooglecloud,

} from 'react-icons/si';
import { Brain, Network, Zap, Database, Code, Cloud, Layers, Bot } from 'lucide-react';

const Stack = () => {
  const techStack = [
    // AI/ML Core
    { name: "OpenAI GPT-4", Icon: SiOpenai, category: "LLM", color: "#10A37F" },
    { name: "PyTorch", Icon: SiPytorch, category: "ML Framework", color: "#EE4C2C" },
    { name: "TensorFlow", Icon: SiTensorflow, category: "ML Framework", color: "#FF6F00" },
    { name: "LangChain", Icon: Brain, category: "AI Orchestration", color: "#1C3C3C" },
    
    // RAG & Vector DBs
    { name: "RAG Systems", Icon: Network, category: "Architecture", color: "#D4AF37" },
    { name: "LlamaIndex", Icon: Layers, category: "Data Framework", color: "#8B5CF6" },
    { name: "FAISS", Icon: Database, category: "Vector DB", color: "#0EA5E9" },
    { name: "Pinecone", Icon: Bot, category: "Vector DB", color: "#000000" },
    
    // Cloud & Infrastructure
    { name: "AWS SageMaker", Icon: SiAmazon, category: "ML Platform", color: "#FF9900" },
    { name: "Azure OpenAI", Icon: Cloud , category: "AI Service", color: "#0078D4" },
    { name: "GCP Vertex AI", Icon: SiGooglecloud, category: "ML Platform", color: "#4285F4" },
    { name: "Kubernetes", Icon: SiKubernetes, category: "Orchestration", color: "#326CE5" },
    
    // Backend & Frameworks
    { name: "Python", Icon: SiPython, category: "Language", color: "#3776AB" },
    { name: "FastAPI", Icon: SiFastapi, category: "API Framework", color: "#009688" },
    { name: "Django", Icon: SiDjango, category: "Web Framework", color: "#092E20" },
    { name: "Next.js", Icon: SiNextdotjs, category: "Frontend", color: "#000000" },
    
    // Databases
    { name: "PostgreSQL", Icon: SiPostgresql, category: "Database", color: "#4169E1" },
    { name: "MongoDB", Icon: SiMongodb, category: "NoSQL DB", color: "#47A248" },
    { name: "Redis", Icon: SiRedis, category: "Cache", color: "#DC382D" },
    { name: "Firebase", Icon: SiFirebase, category: "BaaS", color: "#FFCA28" },
    
    // DevOps
    { name: "Docker", Icon: SiDocker, category: "Container", color: "#2496ED" },
    { name: "React", Icon: SiReact, category: "Frontend", color: "#61DAFB" },
  ];

  return (
    <section className="py-24 px-6 md:px-20 bg-[#080808] border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4AF37] opacity-[0.03] blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-2">
              TECH<span className="text-[#D4AF37]">.</span><br/>ARSENAL
            </h2>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-wider mt-2">
              22+ Technologies • AI-First Stack
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 font-mono text-xs max-w-sm">
              // FULL STACK AI ARCHITECTURE<br/>
              FROM LLMs TO PRODUCTION SCALE
            </p>
            <div className="flex gap-2 mt-3 justify-end">
              <span className="px-2 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded text-[9px] font-mono text-[#D4AF37] uppercase">
                AWS Certified
              </span>
              <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/30 rounded text-[9px] font-mono text-blue-400 uppercase">
                Multi-Cloud
              </span>
            </div>
          </div>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {techStack.map((tech, i) => {
            const Icon = tech.Icon;
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                whileHover={{ y: -8 }}
                className="relative h-36 md:h-40 border border-white/10 rounded-lg bg-gradient-to-br from-[#0a0a0a] to-[#050505] group cursor-pointer overflow-hidden"
              >
                {/* Hover Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, ${tech.color}08 0%, transparent 70%)`
                  }}
                />
                
                {/* Border Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                  style={{
                    boxShadow: `inset 0 0 20px ${tech.color}20`
                  }}
                />

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-3 gap-3">
                  {/* Icon */}
                  <div className="relative">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="relative"
                    >
                      <Icon 
                        className="w-10 h-10 md:w-12 md:h-12 text-gray-500 group-hover:text-white transition-colors duration-300"
                      />
                      {/* Icon Glow on Hover */}
                      <Icon 
                        className="absolute inset-0 w-10 h-10 md:w-12 md:h-12 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300"
                        style={{ color: tech.color }}
                      />
                    </motion.div>
                  </div>

                  {/* Name */}
                  <div className="text-center">
                    <p className="text-gray-400 font-mono text-[10px] md:text-xs group-hover:text-white transition-colors duration-300 font-medium leading-tight">
                      {tech.name}
                    </p>
                    <span className="text-[8px] md:text-[9px] text-gray-600 font-mono uppercase tracking-wider mt-1 block group-hover:text-[#D4AF37] transition-colors">
                      {tech.category}
                    </span>
                  </div>

                  {/* Corner Accent */}
                  <div 
                    className="absolute top-2 right-2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    style={{ backgroundColor: tech.color }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-black text-[#D4AF37]">8+</p>
            <p className="text-[10px] text-gray-500 font-mono uppercase mt-1">LLM Models</p>
          </div>
          <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-black text-blue-400">3</p>
            <p className="text-[10px] text-gray-500 font-mono uppercase mt-1">Cloud Providers</p>
          </div>
          <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-black text-emerald-400">6+</p>
            <p className="text-[10px] text-gray-500 font-mono uppercase mt-1">AI Frameworks</p>
          </div>
          <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-black text-purple-400">15+</p>
            <p className="text-[10px] text-gray-500 font-mono uppercase mt-1">Tech Stack</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- OPTIMIZED FOOTER ---
const Footer = () => {
  return (
    <div className="relative h-[70vh]" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
      <div className="fixed bottom-0 h-[70vh] w-full bg-[#D4AF37] flex flex-col justify-between p-6 md:p-16 text-black">
        <div className="flex justify-between items-start z-10">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-xs uppercase tracking-wider border-b border-black pb-1 mb-2 w-fit">Contact</span>
            <a href={`mailto:${DATA.founder.email}`} className="text-lg md:text-2xl font-serif hover:underline">{DATA.founder.email}</a>
            <p className="text-lg md:text-2xl font-serif">{DATA.founder.phone}</p>
          </div>
          <div className="flex gap-3">
            <MagneticButton className="w-12 h-12 md:w-14 md:h-14 border border-black rounded-full flex items-center justify-center hover:bg-black hover:text-[#D4AF37] transition-all">
              <Linkedin size={18} />
            </MagneticButton>
            <MagneticButton className="w-12 h-12 md:w-14 md:h-14 border border-black rounded-full flex items-center justify-center hover:bg-black hover:text-[#D4AF37] transition-all">
              <Mail size={18} />
            </MagneticButton>
          </div>
        </div>

        <div className="z-10">
          <h2 className="text-[10vw] leading-[0.85] font-black tracking-tighter">
            LET'S BUILD
          </h2>
          <div className="flex justify-between items-end mt-4 border-t border-black/20 pt-6">
            <span className="font-mono text-xs uppercase">© {new Date().getFullYear()} Soham Sharma</span>
            <span className="font-mono text-xs uppercase">Indore, India</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function FounderPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white selection:bg-[#D4AF37] selection:text-black">
      <CustomCursor />
      
    

      <Hero />
      <Marquee text="Generative AI • Large Language Models • RAG Architecture • Enterprise Scale •" />
      <Experience />
      <Stack />
      <Footer />
    </main>
  );
}