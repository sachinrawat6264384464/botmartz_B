"use client";
import React, { useRef, useState, useEffect,useId } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import { Inter_Tight } from 'next/font/google';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['300', '400', '500'] });

// --- MAIN HERO COMPONENT ---
export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);
  
  const shardX = useTransform(x, [-0.5, 0.5], [40, -40]);
  const shardY = useTransform(y, [-0.5, 0.5], [40, -40]);

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = ((e.clientX - rect.left) / rect.width) - 0.5;
    const yPos = ((e.clientY - rect.top) / rect.height) - 0.5;
    x.set(xPos);
    y.set(yPos);
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <section 
      ref={ref} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // CHANGED: Removed large pt-24, using flex-center with offset
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]" 
      style={{ perspective: '2000px' }}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%)'
        }} />
      </div>

      {/* Liquid Background */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
        <ShadowOverlay 
          color="rgba(192, 192, 192, 0.9)"
          animation={{ scale: 70, speed: 15 }}
          noise={{ opacity: 0.15, scale: 1.2 }}
          sizing="stretch"
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.2} />
        ))}
      </div>

      {/* MAIN 3D CONTENT */}
      <motion.div 
        style={{ y: contentY, opacity, rotateX, rotateY, transformStyle: "preserve-3d" }} 
        className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center justify-center -mt-10" // -mt-10 lifts the whole block slightly
      >
        {/* Floating Elements (Shards) */}
        <FloatingShard x={shardX} y={shardY} top="15%" left="5%" label="AI-POWERED" sublabel="Neural Networks" delay={0} />
        <FloatingShard x={shardX} y={shardY} top="25%" right="5%" label="SECURE" sublabel="256-bit Encryption" delay={0.2} invert />
        <FloatingShard x={shardX} y={shardY} bottom="20%" left="8%" label="SCALABLE" sublabel="Cloud Infrastructure" delay={0.4} />
        <FloatingShard x={shardX} y={shardY} bottom="25%" right="8%" label="99.9% UPTIME" sublabel="Enterprise Grade" delay={0.6} invert />

        <div className="text-center relative z-20 flex flex-col items-center" style={{ transformStyle: "preserve-3d" }}>
            
            {/* 1. HUGE LOGO */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              className="relative mb-6" // Reduced margin bottom
              style={{ transform: 'translateZ(100px)' }}
            >
               {/* Glow behind logo */}
               <div className="absolute inset-0 bg-white/20 blur-[60px] rounded-full" />
               
               {/* CHANGED: Significantly Increased Dimensions */}
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

            {/* 2. TEXT TITLE (Botmartz) */}
            <div className="relative -mt-4 md:-mt-8"> {/* Negative margin to pull text closer to logo */}
  <motion.h1
    className="text-6xl md:text-[9rem] font-black tracking-tighter leading-[0.9] text-white relative"
    style={{ transform: 'translateZ(80px)' }}
  >
    <ScrambleText
      text="BOTMARTZ"
      className="relative inline-block"
    >
      {/* 1. Brighter Blur Layer */}
      <span className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-200 bg-clip-text text-transparent blur-md" />

      {/* 2. Extreme Chrome/Silver Gradient Surface */}
      <span className="relative bg-clip-text text-transparent bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_45%,#a0a0a0_50%,#ffffff_95%,#ffffff_100%)]"
        style={{
          // 3. Intense White Glow
          textShadow: '0 0 80px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.6), 0 0 10px #ffffff'
        }}
      />
    </ScrambleText>
  </motion.h1>

  <motion.div
    className="relative mt-0 md:mt-2"
    style={{ transform: 'translateZ(60px)' }}
  >
    {/* 4. Subtitle changed from dark gray to bright silver */}
    <span className="block text-3xl md:text-[6rem] font-black tracking-[-0.02em] bg-gradient-to-b from-white via-gray-300 to-gray-500 bg-clip-text text-transparent"
      style={{
        // 5. Brighter stroke and added glow instead of drop shadow
        WebkitTextStroke: "1.5px rgba(255,255,255,0.9)",
        textShadow: "0 0 30px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.8)"
      }}>
      BOTMARTZ
    </span>
  </motion.div>
</div>
            {/* 3. DESCRIPTION & CTA */}
            <motion.div 
              style={{ transform: 'translateZ(40px)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="pt-8 flex flex-col items-center gap-8 max-w-2xl"
            >
              <p className={`${interTight.className} text-gray-300 text-lg md:text-xl font-light tracking-wide leading-relaxed`}>
                Transforming businesses through{' '}
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-white/10 blur-xl" />
                  <span className="relative text-white font-medium drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    next-gen automation
                  </span>
                </span>
                , intelligent software, and scalable digital ecosystems.
              </p>

              <div className="flex gap-4 mt-2">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,255,255,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest rounded-sm hover:bg-gray-100 transition-colors"
                >
                  Explore Solutions
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.5)' }}
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
        style={{ opacity }} 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-medium">Scroll to Explore</span>
        <motion.div 
          className="w-[1px] h-16 bg-gradient-to-b from-white/40 via-white/20 to-transparent relative overflow-hidden"
        >
          <motion.div
            className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent"
            animate={{ top: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// --- HELPER COMPONENTS (Keep these same as before) ---

function ScrambleText({ text, className, children }: { text: string; className?: string; children?: React.ReactNode }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text.split("").map((char, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      iteration += 1/3;
      if (iteration >= text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return children || <span className={className}>{displayText}</span>;
}

function FloatingParticle({ delay }: { delay: number }) {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  const randomDuration = 10 + Math.random() * 20;
  
  return (
    <motion.div
      className="absolute w-1 h-1 bg-white/30 rounded-full"
      style={{ left: `${randomX}%`, top: `${randomY}%` }}
      animate={{
        y: [0, -30, 0],
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0]
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
    />
  );
}

function FloatingShard({ x, y, top, left, right, bottom, label, sublabel, delay, invert = false }: any) {
  return (
    <motion.div 
      style={{ 
        x: invert ? useTransform(x, (v: number) => -v) : x, 
        y: invert ? useTransform(y, (v: number) => -v) : y,
        top, left, right, bottom,
        transform: 'translateZ(50px)',
        transformStyle: 'preserve-3d'
      }}
      initial={{ opacity: 0, scale: 0, rotateZ: -45 }}
      animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
      transition={{ delay: 0.6 + delay, duration: 0.8, type: "spring" }}
      className="absolute hidden md:flex flex-col items-start gap-1 pointer-events-none group"
    >
      <div className="flex items-center gap-3">
        <motion.div 
          className="h-[1px] w-12 bg-white/40"
          animate={{ scaleX: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-sm shadow-[0_0_15px_-5px_rgba(255,255,255,0.2)]">
          <span className="font-mono text-[10px] font-bold text-white tracking-widest block">{label}</span>
          {sublabel && <span className="text-[8px] text-gray-400 tracking-wide block">{sublabel}</span>}
        </div>
      </div>
    </motion.div>
  );
}

// Shadow Overlay Logic (Unchanged)
function mapRange(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number): number {
  if (fromLow === fromHigh) return toLow;
  const percentage = (value - fromLow) / (fromHigh - fromLow);
  return toLow + percentage * (toHigh - toLow);
}

const useInstanceId = (): string => {
  const id = useId();
  return `shadowoverlay-${id.replace(/:/g, "")}`;
};

function ShadowOverlay({ sizing = 'fill', color = 'rgba(128, 128, 128, 1)', animation, noise, style, className }: any) {
  const id = useInstanceId();
  const animationEnabled = animation && animation.scale > 0;
  const feColorMatrixRef = useRef<SVGFEColorMatrixElement>(null);
  const hueRotateMotionValue = useMotionValue(180);
  const hueRotateAnimation = useRef<AnimationPlaybackEvent | null>(null);
  const displacementScale = animation ? mapRange(animation.scale, 1, 100, 20, 100) : 0;
  const animationDuration = animation ? mapRange(animation.speed, 1, 100, 1000, 50) : 1;

  useEffect(() => {
    if (feColorMatrixRef.current && animationEnabled) {
      hueRotateMotionValue.set(0);
      const controls = animate(hueRotateMotionValue, 360, {
        duration: animationDuration / 25,
        repeat: Infinity,
        ease: "linear",
        onUpdate: (value) => {
          if (feColorMatrixRef.current) feColorMatrixRef.current.setAttribute("values", String(value));
        }
      });
      return () => controls.stop();
    }
  }, [animationEnabled, animationDuration, hueRotateMotionValue]);

  return (
    <div className={className} style={{ overflow: "hidden", position: "relative", width: "100%", height: "100%", ...style }}>
      <div style={{ position: "absolute", inset: -displacementScale, filter: animationEnabled ? `url(#${id}) blur(4px)` : "none" }}>
        {animationEnabled && (
          <svg style={{ position: "absolute", width: 0, height: 0 }}>
            <defs>
              <filter id={id}>
                <feTurbulence result="undulation" numOctaves="2" baseFrequency={`${mapRange(animation?.scale || 1, 0, 100, 0.001, 0.0005)},${mapRange(animation?.scale || 1, 0, 100, 0.004, 0.002)}`} seed="0" type="turbulence" />
                <feColorMatrix ref={feColorMatrixRef} in="undulation" type="hueRotate" values="180" />
                <feColorMatrix in="dist" result="circulation" type="matrix" values="4 0 0 0 1 4 0 0 0 1 4 0 0 0 1 1 0 0 0 0" />
                <feDisplacementMap in="SourceGraphic" in2="circulation" scale={displacementScale} result="dist" />
                <feDisplacementMap in="dist" in2="undulation" scale={displacementScale} result="output" />
              </filter>
            </defs>
          </svg>
        )}
        <div style={{ backgroundColor: color, maskImage: `url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png')`, maskSize: sizing === "stretch" ? "100% 100%" : "cover", maskRepeat: "no-repeat", maskPosition: "center", width: "100%", height: "100%" }} />
      </div>
      {noise && noise.opacity > 0 && (
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")`, backgroundSize: noise.scale * 200, backgroundRepeat: "repeat", opacity: noise.opacity / 2 }} />
      )}
    </div>
  );
}