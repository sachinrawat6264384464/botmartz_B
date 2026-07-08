"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring,
  AnimatePresence 
} from "framer-motion";
import { 
  Zap, Cpu, Globe, Layers, Code2, Database, Shield, Terminal, 
  ArrowRight, Play, CheckCircle2, MousePointer2 
} from "lucide-react";
import Image from "next/image";

// --- ASSETS (Placeholders from Unsplash) ---
// In production, replace these with your own high-res assets
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop", // Cyberpunk city/server
  services: {
    automation: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&q=80&w=800",
    ai: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    web: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    security: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
  },
  process: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" // Team working
};

// --- COMPONENTS ---

// 1. CINEMATIC HERO
const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]); // Parallax effect

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#050505] flex items-center justify-center">
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image 
          src={IMAGES.hero} 
          alt="Digital Infrastructure" 
          fill 
          className="object-cover opacity-40"
          priority
        />
        {/* Gradient Overlays to blend image into black */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
        <div className="absolute inset-0 bg-[#050505]/40 backdrop-blur-[2px]" />
      </motion.div>

      {/* Grid Overlay for texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 border border-[#D4AF37]/50 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
          </span>
          <span className="text-[#D4AF37] font-mono text-xs uppercase tracking-widest">
            System Online • v4.0
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-6 drop-shadow-2xl">
          WE BUILD <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FCEE21]">
            DIGITAL EMPIRES
          </span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-10">
          Transforming static businesses into <span className="text-white font-medium">dynamic digital ecosystems</span>. 
          We provide the intelligence, infrastructure, and interface for your growth.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Link 
            href="/contact" 
            className="group relative px-8 py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer block text-center"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative flex items-center gap-2">
              Initialize Project <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
          
          <button className="flex items-center gap-3 text-white hover:text-[#D4AF37] transition-colors group">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <span className="font-mono text-sm uppercase tracking-wide">Watch Showreel</span>
          </button>
        </div>
      </div>
    </section>
  );
};

// 2. IMMERSIVE SERVICES GRID
const SERVICES = [
  { 
    id: "01", title: "AI Training Programs", category: "Education", 
    desc: "Generative AI Engineering bootcamps and corporate upskilling programs.", 
    icon: <Terminal />, image: IMAGES.services.automation, col: 2,
    href: "https://classes.botmartz.com", external: true
  },
  { 
    id: "02", title: "Neural AI Agents", category: "Intelligence", 
    desc: "Custom LLMs and agentic workflows trained on proprietary data.", 
    icon: <Cpu />, image: IMAGES.services.ai, col: 1,
    href: "/services/ai-solutions"
  },
  { 
    id: "03", title: "Global Edge Web", category: "Infrastructure", 
    desc: "Next.js sites deployed globally for sub-800ms loading speeds.", 
    icon: <Globe />, image: IMAGES.services.web, col: 1,
    href: "/services/web-development"
  },
  { 
    id: "04", title: "Intelligent Automation", category: "Efficiency", 
    desc: "Replacing manual business operations with robust autonomous workflows.", 
    icon: <Zap />, image: IMAGES.services.security, col: 2,
    href: "/services/ai-solutions"
  },
];

const VisualServices = () => {
  return (
    <section className="py-32 px-4 md:px-12 max-w-[1600px] mx-auto bg-[#050505]">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
        <div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-2 uppercase">Core Capabilities</h2>
          <p className="text-[#D4AF37] font-mono">/// DEPLOYMENT_READY_MODULES</p>
        </div>
        <p className="text-gray-500 max-w-md text-right hidden md:block">
          Select a module to view technical specifications. <br />
          All services scale infinitely.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[350px]">
        {SERVICES.map((service, i) => {
          const cardContent = (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative group overflow-hidden rounded-2xl border border-white/10 h-full cursor-pointer"
            >
              {/* Background Image */}
              <Image 
                src={service.image} 
                alt={service.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60"
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="mb-auto flex justify-between items-start">
                  <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-[#D4AF37] border border-white/10">
                    {React.cloneElement(service.icon, { size: 24 })}
                  </div>
                  <span className="font-mono text-xs text-white/40 border border-white/10 px-2 py-1 rounded">
                    {service.id}
                  </span>
                </div>

                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[#D4AF37] font-mono text-xs uppercase tracking-widest mb-2 block">
                    {service.category}
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {service.desc}
                  </p>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </motion.div>
          );

          const colClass = service.col === 2 ? 'md:col-span-2' : 'col-span-1';

          if (service.external) {
            return (
              <a key={i} href={service.href} target="_blank" rel="noopener noreferrer" className={`${colClass} block`}>
                {cardContent}
              </a>
            );
          }

          return (
            <Link key={i} href={service.href} className={`${colClass} block`}>
              {cardContent}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

// 3. PROCESS WITH VISUAL
const ProcessSection = () => {
  return (
    <section className="py-24 bg-[#080808] border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left: Text */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            THE <span className="text-[#D4AF37]">ALGORITHM</span>
          </h2>
          
          <div className="space-y-8 relative">
            {/* Vertical Line */}
            <div className="absolute left-[19px] top-2 bottom-2 w-[1px] bg-white/10" />

            {[
              { title: "Discovery & Blueprint", desc: "We map your entire data flow before writing a single line of code." },
              { title: "Agile Construction", desc: "Two-week sprints with tangible deliverables at every milestone." },
              { title: "Quality Assurance", desc: "Automated testing rigs ensure 99.9% uptime on day one." },
              { title: "Global Deployment", desc: "Pushing to edge networks for sub-100ms latency worldwide." }
            ].map((step, i) => (
              <div key={i} className="relative pl-12 group">
                {/* Dot */}
                <div className="absolute left-[15px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#1a1a1a] border border-white/30 group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-colors z-10" />
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Visual */}
        <div className="relative h-[600px] rounded-2xl overflow-hidden border border-white/10 group">
          <Image 
            src={IMAGES.process} 
            alt="Team Working" 
            fill 
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          
          {/* Floating UI Card Overlay */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-8 right-8 bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-xl w-64 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-white font-mono uppercase">System Status: Optimal</span>
            </div>
            <div className="space-y-2">
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[80%] bg-[#D4AF37]" />
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                <span>Deploying...</span>
                <span>80%</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

// 4. TECH MARQUEE (Visual Update)
const TechMarquee = () => {
  const TECH = ["React", "Next.js", "Python", "AWS", "Docker", "Kubernetes", "PostgreSQL", "Tailwind", "Framer", "Stripe"];
  return (
    <div className="py-12 bg-black overflow-hidden border-b border-white/5">
      <div className="flex gap-16 animate-marquee whitespace-nowrap">
        {[...TECH, ...TECH, ...TECH].map((item, i) => (
          <div key={i} className="flex items-center gap-4 group cursor-default">
            <Terminal className="text-[#D4AF37]/20 group-hover:text-[#D4AF37] transition-colors" size={20} />
            <span className="text-2xl font-black text-white/20 uppercase group-hover:text-white transition-colors font-mono">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 5. CTA SECTION
const CTA = () => {
  return (
    <section className="relative py-40 flex items-center justify-center bg-[#050505] overflow-hidden">
      {/* Background Abstract */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#D4AF37_0%,_transparent_50%)] opacity-5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] border border-[#D4AF37]/20 rounded-[100%] rotate-12 opacity-30" />
      </div>

      <div className="relative z-10 text-center max-w-3xl px-6">
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-8">
          READY TO <span className="text-[#D4AF37]">ASCEND?</span>
        </h2>
        <p className="text-gray-400 mb-10 text-lg">
          Stop settling for average. Initialize your transformation today.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Link 
            href="/contact" 
            className="px-10 py-5 bg-white text-black font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-colors duration-300 cursor-pointer text-center block"
          >
            Book Strategy Call
          </Link>
          <span className="text-white/30 font-mono text-sm">OR</span>
          <Link 
            href="/contact" 
            className="text-white border-b border-[#D4AF37] pb-1 hover:text-[#D4AF37] transition-colors cursor-pointer text-center"
          >
            View Pricing Models
          </Link>
        </div>
      </div>
    </section>
  );
};

// --- MAIN PAGE ---
export default function ServicePage() {
  return (
    <main className="bg-[#050505] min-h-screen selection:bg-[#D4AF37] selection:text-black">
      <Hero />
      <TechMarquee />
      <VisualServices />
      <ProcessSection />
      <CTA />
      
      {/* Footer Simple */}
      <footer className="py-8 text-center border-t border-white/10 text-white/20 font-mono text-xs">
        © 2024 BOTMARTZ SYSTEMS. ALL SYSTEMS OPERATIONAL.
      </footer>
    </main>
  );
}