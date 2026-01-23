"use client";
import { useRef, memo, useMemo } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Activity, GitMerge, TerminalSquare, CheckCircle2, LucideIcon } from "lucide-react";
import { Inter_Tight, JetBrains_Mono } from 'next/font/google';
import { LocationMap } from "../ui/location-map";

const inter = Inter_Tight({ 
  subsets: ['latin'], 
  weight: ['300', '400', '600'],
  display: 'swap',
  preload: true
});

const mono = JetBrains_Mono({ 
  subsets: ['latin'], 
  weight: ['400'],
  display: 'swap',
  preload: true
});

// THEME CONFIG
const ACCENT = "#D4AF37";

// Static data outside component
const STEPS = [
  { id: "01", title: "Discovery & Strategy", desc: "Analyzing your business goals and technical requirements.", icon: Activity },
  { id: "02", title: "Architecture Design", desc: "Building scalable foundations tailored to your growth.", icon: GitMerge },
  { id: "03", title: "Seamless Integration", desc: "Deploying solutions without disrupting existing workflows.", icon: TerminalSquare },
  { id: "04", title: "Continuous Optimization", desc: "Iterative improvements based on real-world performance.", icon: CheckCircle2 },
] as const;

// Memoized Timeline Step Component
const TimelineStep = memo(({ 
  step, 
  index 
}: { 
  step: typeof STEPS[number]; 
  index: number;
}) => {
  const Icon = step.icon;
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-16 md:pl-24 group"
    >
    {/* Connector Dot */}
      <div className="absolute left-[15px] md:left-[24px] top-0 w-4 h-4 bg-[#050505] border border-white/20 rounded-full z-10 group-hover:border-[#D4AF37] group-hover:scale-125 transition-all duration-300">
        <div className="absolute inset-0 m-auto w-1.5 h-1.5 bg-[#D4AF37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_#D4AF37]" />
      </div>

      {/* Card */}
      <div className="relative p-6 md:p-8 rounded-xl border border-white/5 bg-white/2 hover:bg-white/4 hover:border-[#D4AF37]/40 transition-all duration-500 group-hover:shadow-[0_0_40px_-15px_rgba(212,175,55,0.2)]">
        
        {/* Icon */}
        <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
          <Icon strokeWidth={1.5} size={24} />
        </div>

        <div className={`absolute top-8 right-8 text-4xl font-bold text-white/5 group-hover:text-white/10 transition-colors ${mono.className}`}>
          {step.id}
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
          {step.title}
        </h3>
        
        <p className={`${inter.className} text-gray-400 leading-relaxed group-hover:text-gray-300`}>
          {step.desc}
        </p>

        {/* Industrial Corners */}
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#D4AF37]/50 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#D4AF37]/50 opacity-0 group-hover:opacity-100 transition-all duration-500" />
      </div>
    </motion.div>
  );
});

TimelineStep.displayName = 'TimelineStep';

// Memoized Sticky Header
const StickyHeader = memo(() => (
  <div className="lg:sticky lg:top-32 h-fit space-y-10">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`flex items-center gap-3 text-[#D4AF37] ${mono.className} text-xs tracking-widest mb-4`}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
        </span>
        SYSTEM_STATUS: OPTIMIZED
      </div>
      
      <h2 className="text-5xl md:text-7xl font-bold leading-tight text-white mb-6">
        OUR <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-white">PROCESS</span>
      </h2>

      <p className={`${inter.className} text-xl text-gray-400 leading-relaxed max-w-md`}>
        We don't just write code; we forge <span className="text-[#D4AF37] font-medium">resilient digital infrastructure</span>.
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
));

StickyHeader.displayName = 'StickyHeader';

// Memoized Vertical Line
const VerticalTimeline = memo(({ lineHeight }: { lineHeight: MotionValue<string> }) => (
  <div className="absolute left-[23px] md:left-8 top-4 bottom-12 w-px bg-white/10">
    <motion.div 
      style={{ height: lineHeight }}
      className="w-full bg-gradient-to-b from-[#D4AF37] via-[#D4AF37] to-transparent shadow-[0_0_20px_#D4AF37] will-change-transform"
    />
  </div>
));

VerticalTimeline.displayName = 'VerticalTimeline';

export const ProcessTimeline = memo(function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto relative bg-[#050505] overflow-hidden">
      
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(212,175,55,0.01)_10px,rgba(212,175,55,0.01)_20px)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.05),transparent_70%)] pointer-events-none" />

      <div className="grid lg:grid-cols-2 gap-20 relative z-10">
        
        {/* LEFT SIDE */}
        <StickyHeader />

        {/* RIGHT SIDE: TIMELINE */}
        <div className="relative pl-8 md:pl-0">
          <VerticalTimeline lineHeight={lineHeight} />
          
          <div className="space-y-12 md:space-y-24">
            {STEPS.map((step, i) => (
              <TimelineStep 
                key={step.id} 
                step={step} 
                index={i} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

ProcessTimeline.displayName = 'ProcessTimeline';