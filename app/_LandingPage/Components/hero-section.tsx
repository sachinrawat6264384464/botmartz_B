"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Inter_Tight } from 'next/font/google';
import DottedMap from "dotted-map"; // Restored for design fidelity

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['300', '400'], display: 'swap' });

// Accent Color Constant - The Yellow from your image
const ACCENT_COLOR = "#F5C242"; 

// Generate consistent random values
const particleData = [...Array(20)].map((_, i) => ({
  x: (i * 7.3) % 100,
  y: (i * 13.7) % 100,
  duration: 8 + (i * 2.3) % 15 // Slightly faster for more "life"
}));

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    setMounted(true);
    
    const timer = setTimeout(() => {
      if (ref.current) {
        ref.current.setAttribute('data-hero-loaded', 'true');
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const contentY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: isMobile ? 0.3 : 0.8, delay: isMobile ? 0 : 0.2 }}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
      style={{ perspective: isMobile ? 'none' : '2000px' }}
    >
      {/* 1. Liquid Background Layer - Tinted Yellow for "Alive" feel */}
      {!isMobile && (
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <ShadowOverlay 
            color="rgba(245, 194, 66, 0.4)" // Yellow tint
            animation={{ scale: 70, speed: 15 }}
            noise={{ opacity: 0.15, scale: 1.2 }}
            sizing="stretch"
          />
        </div>
      )}

      {/* 2. WORLD MAP LAYER */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full h-full scale-125 md:scale-110 opacity-100"> 
            <WorldMap 
            lineColor={ACCENT_COLOR} 
            animated={!isMobile}
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
      </div>

      {/* 3. Static Center Spotlight - Warm Glow */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: isMobile 
            ? `radial-gradient(circle 400px at 50% 40%, rgba(245, 194, 66, 0.08), transparent 60%)`
            : `radial-gradient(circle 800px at 50% 50%, rgba(245, 194, 66, 0.05), transparent 50%)`
        }}
      />

      {/* 4. Floating Particles - Yellow */}
      {mounted && !isMobile && (
        <div className="absolute inset-0 z-0">
          {particleData.slice(0, 12).map((particle, i) => (
            <FloatingParticle key={i} data={particle} delay={i * 0.3} color={ACCENT_COLOR} />
          ))}
        </div>
      )}

      {/* 5. Edge Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.4)_70%,#050505_100%)] z-0 pointer-events-none" />

      {/* MAIN CONTENT */}
      <motion.div
        style={{ y: contentY, opacity, willChange: 'transform, opacity' }}
        className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center justify-center"
      >
        {mounted && !isMobile && (
          <>
            <FloatingShard top="15%" left="5%" label="AI-POWERED" sublabel="Neural Networks" delay={0} color={ACCENT_COLOR} />
            <FloatingShard top="25%" right="5%" label="SECURE" sublabel="256-bit Encryption" delay={0.1} color={ACCENT_COLOR} />
            <FloatingShard bottom="20%" left="8%" label="SCALABLE" sublabel="Cloud Infrastructure" delay={0.2} color={ACCENT_COLOR} />
            <FloatingShard bottom="25%" right="8%" label="99.9% UPTIME" sublabel="Enterprise Grade" delay={0.3} color={ACCENT_COLOR} />
          </>
        )}

        <div className="text-center relative z-20 flex flex-col items-center">
            
            {/* 1. HUGE LOGO GLOW - Yellow */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 0 : 0.4, ease: "easeOut" }}
              className="relative mb-4 md:mb-6"
            >
               <div className="absolute inset-0 bg-[#F5C242]/20 blur-[80px] rounded-full" />
            </motion.div>

            {/* 2. TEXT TITLE */}
            <div className="relative -mt-2 md:-mt-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 0.1 : 0.5, ease: "easeOut" }}
                className="text-5xl sm:text-7xl md:text-[9rem] font-black tracking-tighter leading-[0.9] text-white relative"
              >
                {mounted && !isMobile ? (
                  <ScrambleText text="BOTMARTZ" className="relative inline-block">
                    <span className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-200 bg-clip-text text-transparent blur-md" />
                    <span
                      className="relative bg-clip-text text-transparent bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_45%,#a0a0a0_50%,#ffffff_95%,#ffffff_100%)]"
                      style={{ textShadow: "0 0 80px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.6), 0 0 10px #ffffff" }}
                    />
                  </ScrambleText>
                ) : (
                  <span className="relative inline-block">
                    <span className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-200 bg-clip-text text-transparent blur-md">BOTMARTZ</span>
                    <span
                      className="relative bg-clip-text text-transparent bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_45%,#a0a0a0_50%,#ffffff_95%,#ffffff_100%)]"
                      style={{ textShadow: "0 0 80px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.6), 0 0 10px #ffffff" }}
                    >
                      BOTMARTZ
                    </span>
                  </span>
                )}
              </motion.h1>

              {/* BOTMARTZ + AI SOLUTIONS stacked */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 0.2 : 0.6, ease: "easeOut" }}
                className="relative mt-1 md:mt-2 flex flex-col items-center justify-center leading-[0.85] md:leading-[0.85]"
              >
                {/* Line 1: BOTMARTZ */}
                <span
                  className="hidden md:block text-2xl sm:text-4xl md:text-[6rem] font-black tracking-[-0.02em] bg-gradient-to-b from-white via-gray-300 to-gray-500 bg-clip-text text-transparent"
                  style={{
                    WebkitTextStroke: isMobile ? "0.5px rgba(255,255,255,0.9)" : "1.5px rgba(255,255,255,0.9)",
                    textShadow: "0 0 30px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.8)",
                  }}
                >
                  BOTMARTZ
                </span>

                {/* Line 2: AI SOLUTIONS */}
                <span
                  className="block text-2xl sm:text-4xl md:text-[6rem] font-black tracking-[-0.02em] bg-gradient-to-b from-white via-gray-300 to-gray-500 bg-clip-text text-transparent"
                  style={{
                    WebkitTextStroke: isMobile ? "0.5px rgba(255,255,255,0.9)" : "1.5px rgba(255,255,255,0.9)",
                    textShadow: "0 0 30px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.8)",
                  }}
                >
                  AI SOLUTIONS
                </span>
              </motion.div>
            </div>


            
            {/* 3. DESCRIPTION & CTA - White */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 0.3 : 0.7, ease: "easeOut" }}
              className="pt-6 md:pt-8 flex flex-col items-center gap-6 md:gap-8 max-w-2xl px-4"
            >
              <p className={`${interTight.className} text-gray-300 text-base sm:text-lg md:text-xl font-light tracking-wide leading-relaxed text-center`}>
                Transforming businesses through{' '}
                <span className="relative inline-block">
                  {/* Reverted to white glow and text */}
                  <span className="absolute inset-0 bg-white/10 blur-xl" />
                  <span className="relative text-white font-medium drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">next-gen automation</span>
                </span>
                , intelligent software, and scalable digital ecosystems.
              </p>

              <div className="flex flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto">
                <motion.button 
                  whileHover={{ scale: isMobile ? 1 : 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  // Reverted to white background and black text
                  className="flex-1 sm:flex-none sm:w-auto px-6 sm:px-8 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest rounded-sm hover:bg-gray-100 transition-colors"
                >
                  Explore Solutions
                </motion.button>
                <motion.button 
                  whileHover={{ scale: isMobile ? 1 : 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  // Reverted to white border and text
                  className="flex-1 sm:flex-none sm:w-auto px-6 sm:px-8 py-3 border border-white/20 text-white font-bold uppercase text-xs tracking-widest rounded-sm hover:bg-white/5 transition-colors backdrop-blur-sm"
                >
                  Contact Us
                </motion.button>
              </div>
            </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}

// --- SUB-COMPONENTS ---

// Simplified Shard - CSS ANIMATED
function FloatingShard({ top, left, right, bottom, label, sublabel, delay, color }: any) {
  return (
    <motion.div 
      style={{ top, left, right, bottom }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ opacity: { duration: 0.6, delay: delay + 0.4 } }}
      className="absolute hidden md:flex flex-col items-start gap-1 pointer-events-none group z-20"
    >
      <div className="flex items-center gap-3">
        {/* Animated Line - CSS ANIMATED */}
        <div className="h-[1px] w-12 bg-white/20 relative overflow-hidden">
             <div 
                className="absolute inset-0 w-full h-full animate-shimmer"
                style={{ 
                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                    animationDelay: `${delay}s`
                }}
             />
        </div>
        <div 
            className="relative bg-black/80 backdrop-blur-md border px-3 py-1.5 rounded-sm"
            style={{ borderColor: `${color}30`, boxShadow: `0 0 15px -5px ${color}40` }}
        >
          <span className="font-mono text-[10px] font-bold tracking-widest block text-white">{label}</span>
          {sublabel && <span className="text-[8px] text-gray-400 tracking-wide block">{sublabel}</span>}
        </div>
      </div>
    </motion.div>
  );
}

// RESTORED WORLD MAP - MEMOIZED & DEFERRED FOR PERFORMANCE
function WorldMap({ dots = [], lineColor = "#ffffff", animated = true }: any) {
  const [mounted, setMounted] = useState(false);
  const [svgMap, setSvgMap] = useState<string>("");
  
  // OPTIMIZATION: Defer DottedMap generation off the main thread using scheduler
  // Runs after paint so it doesn't block LCP or increase TBT.
  useEffect(() => {
    let cancelled = false;
    const generate = () => {
      if (cancelled) return;
      const map = new DottedMap({ height: 60, grid: "diagonal" });
      const svg = map.getSVG({ radius: 0.42, color: `${lineColor}60`, shape: "circle", backgroundColor: "transparent" });
      if (!cancelled) {
        setSvgMap(svg);
        setMounted(true);
      }
    };
    // Use requestIdleCallback if available to avoid blocking main thread
    if (typeof requestIdleCallback !== 'undefined') {
      const id = requestIdleCallback(generate, { timeout: 2000 });
      return () => { cancelled = true; cancelIdleCallback(id); };
    } else {
      const timer = setTimeout(generate, 200);
      return () => { cancelled = true; clearTimeout(timer); };
    }
  }, [lineColor]);

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
      {/* Show static or empty state until map is calculated */}
      {svgMap && (
        <Image 
            src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`} 
            className="h-full w-full object-cover pointer-events-none select-none drop-shadow-[0_0_5px_rgba(255,255,255,0.1)]" 
            alt="world map" 
            fill 
            draggable={false} 
            priority // Map is LCP candidate
        />
      )}
      
      {mounted && animated && (
        <svg viewBox="0 0 800 400" className="w-full h-full absolute inset-0 pointer-events-none select-none">
          <defs>
            <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={lineColor} stopOpacity="0" />
              <stop offset="50%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
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
                    strokeWidth="2" 
                    initial={{ pathLength: 0 }} 
                    animate={{ pathLength: 1 }} 
                    transition={{ duration: 2, delay: 0.5 * i, repeat: Infinity, repeatDelay: 3 }} 
                  />
                <circle cx={start.x} cy={start.y} r="3" fill={lineColor} className="drop-shadow-[0_0_8px_rgba(245,194,66,0.8)]" />
                <circle cx={end.x} cy={end.y} r="3" fill={lineColor} className="drop-shadow-[0_0_8px_rgba(245,194,66,0.8)]" />
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}

// Shadow Overlay
function ShadowOverlay({ sizing = 'fill', color = 'rgba(128, 128, 128, 1)', animation, noise, style, className }: any) {
  return (
     <div className={className} style={{ overflow: "hidden", position: "relative", width: "100%", height: "100%", ...style }}>
       <div style={{ width: '100%', height: '100%', background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }}></div>
     </div>
  );
}

// Scramble Text — runs at 80ms intervals (fewer re-renders, lower TBT)
function ScrambleText({ text, className, children }: any) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  useEffect(() => {
    // Delay start slightly so it doesn't run during LCP window
    const startTimer = setTimeout(() => {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayText(
          text.split("").map((char: string, index: number) =>
            index < iteration ? text[index] : chars[Math.floor(Math.random() * chars.length)]
          ).join("")
        );
        iteration += 0.5;
        if (iteration >= text.length) clearInterval(interval);
      }, 80);
      return () => clearInterval(interval);
    }, 600);
    return () => clearTimeout(startTimer);
  }, [text]);

  return children || <span className={className}>{displayText}</span>;
}

// Floating Particle - Tinted Yellow - CSS ANIMATED
function FloatingParticle({ data, delay, color }: { data: any; delay: number, color: string }) {
  return (
    <div
      className="absolute w-1 h-1 rounded-full animate-float"
      style={{ 
          left: `${data.x}%`, 
          top: `${data.y}%`, 
          backgroundColor: color, 
          boxShadow: `0 0 10px ${color}`,
          animationDuration: `${data.duration}s`,
          animationDelay: `${delay}s`
      }}
    />
  );
}