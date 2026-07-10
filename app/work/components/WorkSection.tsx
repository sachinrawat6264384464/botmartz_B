// components/Hero.tsx
"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { 
  useMotionValue, 
  useSpring, 
  useTransform,
  useMotionTemplate,
  LazyMotion,
  domAnimation,
  m
} from "framer-motion";
import { ArrowUpRight, Terminal, Zap, Activity } from "lucide-react";
import Link from "next/link";

// --- PROJECT DATA ---
const projects = [
  "/projects/anugami2.png",
  "/projects/hoaconnecthub.png",
  "/projects/homestory.png",
  "/projects/lotus.png",
  "/projects/plix.png",
  "/projects/safari.png",
  "/projects/shopstesora.png",
  "/projects/swa.png",
  "/projects/Yashuprem.png",
  "/projects/ziplyne.png"
];

const tripleProjects = [...projects, ...projects, ...projects];

// --- HOOKS ---
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

const useMousePosition = () => {
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

  return { x, y };
};

// --- SCRAMBLE TEXT ---
const ScrambleText = React.memo(({ 
  text, 
  className, 
  startDelay = 0,
  autoStart = true 
}: { 
  text: string, 
  className?: string, 
  startDelay?: number,
  autoStart?: boolean
}) => {
  const [display, setDisplay] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&^*!~";

  const stopScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplay(text);
    setIsAnimating(false);
  }, [text]);

  const startScramble = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplay(prev => 
        text.split("").map((letter, index) => {
          if (letter === " ") return " ";
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iteration >= text.length) stopScramble();
      iteration += 1 / 2; 
    }, 30);
  }, [text, chars, isAnimating, stopScramble]);

  useEffect(() => {
    if (!autoStart) return;
    const timeout = setTimeout(startScramble, startDelay);
    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startDelay, autoStart, startScramble]);

  return (
    <span 
      className={`inline-block whitespace-pre ${className}`}
      onMouseEnter={startScramble}
      aria-label={text}
    >
      <span aria-hidden="true">{display}</span>
    </span>
  );
});
ScrambleText.displayName = "ScrambleText";

// --- BACKGROUND MARQUEE ---
const MarqueeRow = React.memo(({ duration, reverse, isMobile }: { duration: number, reverse?: boolean, isMobile: boolean }) => (
  // INCREASED OPACITY & REDUCED GRAYSCALE HERE
  <div className="flex overflow-hidden w-full will-change-transform opacity-100 mix-blend-normal grayscale-[20%]"> 
    <m.div
      initial={{ x: reverse ? "-50%" : "0%" }}
      animate={{ x: reverse ? "0%" : "-50%" }}
      transition={{ duration: isMobile ? duration * 1.5 : duration, ease: "linear", repeat: Infinity }}
      className="flex gap-4 md:gap-8 px-2 md:px-4 min-w-max"
    >
      {tripleProjects.map((src, i) => (
        // INCREASED SIZE OF IMAGES
        <div key={i} className="w-[250px] md:w-[400px] h-[150px] md:h-[240px] rounded-lg overflow-hidden border border-white/10 bg-white/5 relative flex-shrink-0 group">
          <img 
            src={src} 
            alt="" 
            // INCREASED OPACITY
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
            loading="lazy"
            decoding="async"
          />
          {/* REDUCED DARK OVERLAY OPACITY */}
          <div className="absolute inset-0 bg-[#050505]/30 group-hover:bg-[#050505]/10 transition-colors duration-500" />
        </div>
      ))}
    </m.div>
  </div>
));

MarqueeRow.displayName = "MarqueeRow";

// --- MAIN HERO COMPONENT ---
export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { x: mouseAbsX, y: mouseAbsY } = useMousePosition();
  
  // 3D Tilt Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 80 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  }, [mouseX, mouseY, isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY, isMobile]);

  // Spotlight Effect Background
  const spotlightBackground = useMotionTemplate`radial-gradient(600px circle at ${mouseAbsX}px ${mouseAbsY}px, rgba(212, 175, 55, 0.08), transparent 80%)`;

  const tickerContent = useMemo(() => 
    Array(10).fill("").map((_, i) => (
      <React.Fragment key={i}>
        <span className="flex items-center gap-2 text-white/50 group-hover:text-white transition-colors">
          <Zap size={12} className="text-[#D4AF37]" /> RAPID DEPLOYMENT
        </span>
        <span className="text-[#D4AF37]/30">||</span>
        <span className="flex items-center gap-2 text-white/50 group-hover:text-white transition-colors">
          <Terminal size={12} className="text-[#D4AF37]" /> CLEAN ARCHITECTURE
        </span>
        <span className="text-[#D4AF37]/30">||</span>
      </React.Fragment>
    )), []
  );

  return (
    <LazyMotion features={domAnimation} strict>
      <section 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center selection:bg-[#D4AF37]/30"
        style={{ perspective: isMobile ? "none" : "1000px" }}
      >
        
        {/* --- 1. ATMOSPHERE LAYERS --- */}
        
        {/* Dynamic Mouse Spotlight */}
        <m.div 
            className="absolute inset-0 z-10 pointer-events-none opacity-50"
            style={{ background: spotlightBackground }} 
        />

        {/* Noise Texture (Cinematic Feel) */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

        {/* --- 2. DEEP BACKGROUND (MARQUEE) --- */}
        <m.div 
          className="absolute inset-0 z-0 pointer-events-none select-none flex items-center justify-center will-change-transform"
        >
          {/* UPDATED: Increased Scale, Reduced Blur, Reduced Rotation, Increased Opacity */}
          <div className="absolute inset-0 z-0 flex flex-col justify-center gap-6 opacity-100 blur-[0.5px] -rotate-[10deg] scale-[1.3] md:scale-[1]">
             {/* Note: Opacity set to 100% and Blur reduced to make images visible */}
            <MarqueeRow duration={80} isMobile={isMobile} />
            <MarqueeRow duration={100} reverse isMobile={isMobile} />
            <MarqueeRow duration={120} isMobile={isMobile} />
          </div>

          {/* UPDATED: Lighter Vignette to show more background */}
          <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_20%,#050505_90%)]" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
        </m.div>

        {/* --- 3. 3D CONTENT CONTAINER --- */}
        <m.div
          style={isMobile ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative z-30 w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center justify-center mt-0 md:mt-[-5vh] will-change-transform"
        >
          
          <div className="relative text-center transform-style-3d">
            
            {/* Tech Badge */}
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex mt-16 items-center gap-3 px-4 py-1.5 rounded-full border border-[#D4AF37]/20 bg-black/60 mb-8 backdrop-blur-xl shadow-[0_0_20px_-5px_rgba(212,175,55,0.2)]"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_10px_#D4AF37]" />
              <span className="text-[10px] md:text-xs font-mono text-[#D4AF37] tracking-[0.3em] uppercase">
                Botmartz 
              </span>
            </m.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase mb-8">
              <div className="flex flex-col items-center transform-style-3d">
                
                {/* "WE ENGINEER" - Metallic Gradient & Shadow */}
                <span className="relative drop-shadow-2xl z-10">
                   <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
                     We Engineer
                   </span>
                   {/* Glow behind text */}
                   <span className="absolute inset-0 blur-3xl bg-white/10 -z-10">We Engineer</span>
                </span>

                {/* "EXCELLENCE" - Gold Gradient */}
                <span className="relative inline-block mt-2 z-20">
                  <span className="absolute -inset-4 blur-[40px] bg-[#D4AF37]/10 opacity-60 rounded-full" />
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-b from-[#FFF] via-[#D4AF37] to-[#866d23] italic font-serif lowercase tracking-normal px-4 pb-2 filter drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                    <ScrambleText text="Excellence" />
                  </span>
                </span>
              </div>
            </h1>

            <p className="max-w-2xl mx-auto text-gray-300 text-sm md:text-lg font-light leading-relaxed mb-12 tracking-wide px-6 drop-shadow-lg bg-black/20 backdrop-blur-sm rounded-lg p-2">
              <span className="text-white/90 font-medium">Autonomous workflows.</span> 
              <span className="mx-2 text-[#D4AF37]/50">|</span>
              <span className="text-white/90 font-medium">Scalable architecture.</span>
              <br className="hidden md:block" />
              Precision-built digital ecosystems for the modern enterprise.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6">
              <Link href="/contact" className="w-full sm:w-auto z-40">
                <m.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full sm:w-64 overflow-hidden bg-[#D4AF37] px-8 py-4 rounded-tr-xl rounded-bl-xl transition-all shadow-[0_0_30px_-10px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_-5px_rgba(212,175,55,0.6)] cursor-pointer text-center"
                >
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                    <div className="relative h-full w-12 bg-white/40 blur-md" />
                  </div>
                  <span className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-black relative z-10">
                    Initialize Project <ArrowUpRight size={18} strokeWidth={3} />
                  </span>
                </m.div>
              </Link>

              <Link href="#showcase" className="w-full sm:w-auto z-40">
                <m.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full sm:w-64 border border-white/10 px-8 py-4 rounded-tl-xl rounded-br-xl backdrop-blur-md transition-all hover:border-[#D4AF37]/50 hover:shadow-[0_0_20px_-10px_rgba(212,175,55,0.3)] bg-black/40 cursor-pointer text-center"
                >
                  <span className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/70 group-hover:text-[#D4AF37] transition-colors">
                    <Activity size={16} className="text-[#D4AF37]" />
                    Deployment Archive
                  </span>
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#D4AF37]/50 group-hover:border-[#D4AF37] transition-colors" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#D4AF37]/50 group-hover:border-[#D4AF37] transition-colors" />
                </m.div>
              </Link>
            </div>
          </div>

        </m.div>

        {/* --- Bottom Scrolling Ticker --- */}
        <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-black/80 backdrop-blur-md py-3 md:py-4 overflow-hidden z-40">
          <m.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: isMobile ? 30 : 20, ease: "linear" }}
            className="flex whitespace-nowrap gap-8 md:gap-12 text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-widest will-change-transform group cursor-default"
          >
            {tickerContent}
          </m.div>
        </div>

      </section>
    </LazyMotion>
  );
};