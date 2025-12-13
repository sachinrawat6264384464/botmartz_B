"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Inter_Tight } from 'next/font/google';
import DottedMap from "dotted-map"; 

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['300', '400', '500'] });

// Generate consistent random values (prevents hydration mismatch)
const particleData = [...Array(15)].map((_, i) => ({
  x: (i * 7.3) % 100,
  y: (i * 13.7) % 100,
  duration: 10 + (i * 2.3) % 20
}));

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Handle component initialization
  useEffect(() => {
    setMounted(true);
    
    // Signal that hero is loaded after a short delay to ensure rendering is complete
    const timer = setTimeout(() => {
      if (ref.current) {
        ref.current.setAttribute('data-hero-loaded', 'true');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Optimized Scroll Parallax
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]" 
      style={{ perspective: '2000px' }}
    >
      {/* 1. Liquid Background Layer */}
      <div className="absolute inset-0 z-0 opacity-30 mix-blend-screen pointer-events-none">
        <ShadowOverlay 
          color="rgba(192, 192, 192, 0.9)"
          animation={{ scale: 70, speed: 15 }}
          noise={{ opacity: 0.15, scale: 1.2 }}
          sizing="stretch"
        />
      </div>

      {/* 2. WORLD MAP LAYER */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-60 scale-125 md:scale-100 pointer-events-none">
         <WorldMap 
            lineColor="#ffffff" 
            dots={[
              { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: 34.0522, lng: -118.2437 } },
              { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: -15.7975, lng: -47.8919 } },
              { start: { lat: -15.7975, lng: -47.8919 }, end: { lat: 38.7223, lng: -9.1393 } },
              { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 28.6139, lng: 77.209 } },
              { start: { lat: 28.6139, lng: 77.209 }, end: { lat: 43.1332, lng: 131.9113 } },
              { start: { lat: 28.6139, lng: 77.209 }, end: { lat: -1.2921, lng: 36.8219 } },
            ]}
         />
      </div>

      {/* 3. Static Center Spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle 800px at 50% 50%, rgba(255,255,255,0.06), transparent 50%)`
        }}
      />

      {/* 4. Floating Particles */}
      {mounted && (
        <div className="absolute inset-0 z-0">
          {particleData.map((particle, i) => (
            <FloatingParticle key={i} data={particle} delay={i * 0.3} />
          ))}
        </div>
      )}

      {/* 5. Edge Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.4)_70%,#050505_100%)] z-0 pointer-events-none" />

      {/* MAIN CONTENT */}
      <motion.div 
        style={{ y: contentY, opacity }} 
        className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center justify-center -mt-10"
      >
        {/* Auto-Floating Shards */}
        {mounted && (
          <>
            <FloatingShard top="15%" left="5%" label="AI-POWERED" sublabel="Neural Networks" delay={0} />
            <FloatingShard top="25%" right="5%" label="SECURE" sublabel="256-bit Encryption" delay={0.1} />
            <FloatingShard bottom="20%" left="8%" label="SCALABLE" sublabel="Cloud Infrastructure" delay={0.2} />
            <FloatingShard bottom="25%" right="8%" label="99.9% UPTIME" sublabel="Enterprise Grade" delay={0.3} />
          </>
        )}

        <div className="text-center relative z-20 flex flex-col items-center">
            
            {/* 1. HUGE LOGO */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="relative mb-6"
            >
               <div className="absolute inset-0 bg-white/20 blur-[60px] rounded-full" />
               <div className="relative w-[280px] h-[120px] md:w-[500px] md:h-[220px]">
                  <Image 
                      src="/Botmartz_silver.png" 
                      alt="Botmartz Logo" 
                      fill
                      className="object-contain drop-shadow-[0_0_35px_rgba(255,255,255,0.5)]"
                      priority
                  />
               </div>
            </motion.div>

            {/* 2. TEXT TITLE */}
            <div className="relative -mt-4 md:-mt-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="text-6xl md:text-[9rem] font-black tracking-tighter leading-[0.9] text-white relative"
              >
                {mounted ? (
                  <ScrambleText text="BOTMARTZ" className="relative inline-block">
                    <span className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-200 bg-clip-text text-transparent blur-md" />
                    <span className="relative bg-clip-text text-transparent bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_45%,#a0a0a0_50%,#ffffff_95%,#ffffff_100%)]"
                      style={{ textShadow: '0 0 80px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.6), 0 0 10px #ffffff' }}
                    />
                  </ScrambleText>
                ) : (
                  <span className="relative inline-block">
                    <span className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-200 bg-clip-text text-transparent blur-md">BOTMARTZ</span>
                    <span className="relative bg-clip-text text-transparent bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_45%,#a0a0a0_50%,#ffffff_95%,#ffffff_100%)]"
                      style={{ textShadow: '0 0 80px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.6), 0 0 10px #ffffff' }}>
                      BOTMARTZ
                    </span>
                  </span>
                )}
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="relative mt-0 md:mt-2"
              >
                <span className="block text-3xl md:text-[6rem] font-black tracking-[-0.02em] bg-gradient-to-b from-white via-gray-300 to-gray-500 bg-clip-text text-transparent"
                  style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.9)", textShadow: "0 0 30px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.8)" }}>
                  IT SOLUTIONS
                </span>
              </motion.div>
            </div>
            
            {/* 3. DESCRIPTION & CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              className="pt-8 flex flex-col items-center gap-8 max-w-2xl"
            >
              <p className={`${interTight.className} text-gray-300 text-lg md:text-xl font-light tracking-wide leading-relaxed`}>
                Transforming businesses through{' '}
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-white/10 blur-xl" />
                  <span className="relative text-white font-medium drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">next-gen automation</span>
                </span>
                , intelligent software, and scalable digital ecosystems.
              </p>

              <div className="flex gap-4 mt-2">
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest rounded-sm hover:bg-gray-100 transition-colors"
                >
                  Explore Solutions
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border border-white/20 text-white font-bold uppercase text-xs tracking-widest rounded-sm hover:bg-white/5 transition-colors backdrop-blur-sm"
                >
                  Contact Us
                </motion.button>
              </div>
            </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        style={{ opacity }} 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-medium">Scroll to Explore</span>
        <motion.div className="w-[1px] h-16 bg-gradient-to-b from-white/40 via-white/20 to-transparent relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent" animate={{ top: ['-100%', '100%'] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

// --- SUB-COMPONENTS ---

// Simplified Shard
function FloatingShard({ top, left, right, bottom, label, sublabel, delay }: any) {
  return (
    <motion.div 
      style={{ top, left, right, bottom }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [0, -15, 0] }}
      transition={{ 
        opacity: { duration: 0.6, delay: delay + 0.4 },
        y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: delay + 1 }
      }}
      className="absolute hidden md:flex flex-col items-start gap-1 pointer-events-none group z-20"
    >
      <div className="flex items-center gap-3">
        <div className="h-[1px] w-12 bg-white/40" />
        <div className="relative bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-sm shadow-[0_0_15px_-5px_rgba(255,255,255,0.2)]">
          <span className="font-mono text-[10px] font-bold text-white tracking-widest block">{label}</span>
          {sublabel && <span className="text-[8px] text-gray-400 tracking-wide block">{sublabel}</span>}
        </div>
      </div>
    </motion.div>
  );
}

// World Map
function WorldMap({ dots = [], lineColor = "#ffffff" }: any) {
  const [mounted, setMounted] = useState(false);
  const map = new DottedMap({ height: 100, grid: "diagonal" });
  const svgMap = map.getSVG({ radius: 0.22, color: "#FFFFFF40", shape: "circle", backgroundColor: "transparent" });

  useEffect(() => {
    setMounted(true);
  }, []);

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (start: any, end: any) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="w-full h-full relative font-sans">
      <Image 
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`} 
        className="h-full w-full object-cover pointer-events-none select-none opacity-50" 
        alt="world map" 
        fill 
        draggable={false} 
      />
      {mounted && (
        <svg viewBox="0 0 800 400" className="w-full h-full absolute inset-0 pointer-events-none select-none">
          <defs>
            <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="50%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          {dots.map((dot: any, i: number) => {
            const start = projectPoint(dot.start.lat, dot.start.lng);
            const end = projectPoint(dot.end.lat, dot.end.lng);
            return (
              <g key={i}>
                <motion.path 
                  d={createCurvedPath(start, end)} 
                  fill="none" 
                  stroke="url(#path-gradient)" 
                  strokeWidth="1" 
                  initial={{ pathLength: 0 }} 
                  animate={{ pathLength: 1 }} 
                  transition={{ duration: 2, delay: 0.5 * i, repeat: Infinity, repeatDelay: 3 }} 
                />
                <circle cx={start.x} cy={start.y} r="2" fill={lineColor} />
                <circle cx={end.x} cy={end.y} r="2" fill={lineColor} />
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}

// Shadow Overlay (Simplified)
function ShadowOverlay({ sizing = 'fill', color = 'rgba(128, 128, 128, 1)', animation, noise, style, className }: any) {
  return (
     <div className={className} style={{ overflow: "hidden", position: "relative", width: "100%", height: "100%", ...style }}>
       <div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)' }}></div>
     </div>
  );
}

// Scramble Text
function ScrambleText({ text, className, children }: any) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev: string) => 
        text.split("").map((char: string, index: number) => 
          index < iteration ? text[index] : chars[Math.floor(Math.random() * chars.length)]
        ).join("")
      );
      iteration += 1/3;
      if (iteration >= text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [text]);
  
  return children || <span className={className}>{displayText}</span>;
}

// Floating Particle
function FloatingParticle({ data, delay }: { data: any; delay: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-white/30 rounded-full"
      style={{ left: `${data.x}%`, top: `${data.y}%` }}
      animate={{ y: [0, -30, 0], opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
      transition={{ duration: data.duration, repeat: Infinity, delay: delay, ease: "easeInOut" }}
    />
  );
}