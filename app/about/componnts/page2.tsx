// "use client";

// import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
// import Image from "next/image";
// import { 
//   motion, 
//   useScroll, 
//   useTransform, 
//   useSpring, 
//   useMotionValue, 
//   useMotionTemplate, 
//   useAnimationFrame,
//   useInView,
//   AnimatePresence,
//   MotionValue
// } from "framer-motion";
// import { JetBrains_Mono, Oswald } from 'next/font/google';
// import { 
//   ArrowRight, 
//   Terminal, 
//   Cpu, 
//   Globe, 
//   Zap, 
//   Shield, 
//   Fingerprint, 
//   Maximize2, 
//   MoveUpRight,
//   ChevronDown
// } from "lucide-react";

// // --- TYPOGRAPHY ---
// const inter = { className: "" };
// const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'] });
// const oswald = Oswald({ subsets: ['latin'], weight: ['700'] });

// // --- UTILS & HOOKS ---

// // 1. Hook for "Matrix" Text Decryption Effect
// const useScramble = (text: string, speed: number = 40) => {
//   const [displayText, setDisplayText] = useState(text);
//   const [isHovered, setIsHovered] = useState(false);
//   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

//   useEffect(() => {
//     if (!isHovered) {
//       setDisplayText(text);
//       return;
//     }
    
//     let iteration = 0;
//     const interval = setInterval(() => {
//       setDisplayText(
//         text
//           .split("")
//           .map((letter, index) => {
//             if (index < iteration) return text[index];
//             return chars[Math.floor(Math.random() * chars.length)];
//           })
//           .join("")
//       );

//       if (iteration >= text.length) clearInterval(interval);
//       iteration += 1 / 3;
//     }, speed);

//     return () => clearInterval(interval);
//   }, [isHovered, text, speed, chars]);

//   return { displayText, setIsHovered };
// };

// // 2. Hook for Mouse Position
// const useMousePosition = () => {
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);

//   useEffect(() => {
//     const updateMouse = (e: MouseEvent) => {
//       x.set(e.clientX);
//       y.set(e.clientY);
//     };
//     window.addEventListener("mousemove", updateMouse);
//     return () => window.removeEventListener("mousemove", updateMouse);
//   }, [x, y]);

//   return { x, y };
// };

// // --- SUB-COMPONENTS ---

// // 1. MAGNETIC BUTTON
// const MagneticButton = ({ children, className = "", strength = 30 }: any) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);

//   const handleMouseMove = (e: React.MouseEvent) => {
//     const { clientX, clientY } = e;
//     const { left, top, width, height } = ref.current!.getBoundingClientRect();
//     const centerX = left + width / 2;
//     const centerY = top + height / 2;
//     x.set((clientX - centerX) / strength);
//     y.set((clientY - centerY) / strength);
//   };

//   const handleMouseLeave = () => {
//     x.set(0);
//     y.set(0);
//   };

//   const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
//   const springX = useSpring(x, springConfig);
//   const springY = useSpring(y, springConfig);

//   return (
//     <motion.div
//       ref={ref}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       style={{ x: springX, y: springY }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// };

// // 2. GRAIN OVERLAY (The "Film" Look)
// const GrainOverlay = () => (
//   <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.03] mix-blend-overlay">
//     <svg className="w-full h-full">
//       <filter id="noiseFilter">
//         <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
//       </filter>
//       <rect width="100%" height="100%" filter="url(#noiseFilter)" />
//     </svg>
//   </div>
// );

// // 3. SCRAMBLE TEXT COMPONENT
// const ScrambleText = ({ text, className }: { text: string, className?: string }) => {
//   const { displayText, setIsHovered } = useScramble(text);
//   return (
//     <span 
//       onMouseEnter={() => setIsHovered(true)} 
//       onMouseLeave={() => setIsHovered(false)}
//       className={`cursor-pointer ${className}`}
//     >
//       {displayText}
//     </span>
//   );
// };

// // --- SECTIONS ---

// // SECTION 1: KINETIC HERO
// const Hero = () => {
//   const containerRef = useRef(null);
//   const { scrollY } = useScroll();
  
//   // Parallax & Opacity
//   const y1 = useTransform(scrollY, [0, 500], [0, 200]);
//   const y2 = useTransform(scrollY, [0, 500], [0, -150]);
//   const opacity = useTransform(scrollY, [0, 300], [1, 0]);

//   return (
//     <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
//       {/* Grid Background */}
//       <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
//       {/* Main Content */}
//       <div className="relative z-10 w-full max-w-[90vw]">
        
//         {/* Top Label */}
//         <motion.div 
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="flex items-center gap-4 mb-8"
//         >
//           <div className="h-[1px] w-12 bg-[#00E5FF]" />
//           <span className={`${mono.className} text-[#00E5FF] text-xs tracking-[0.2em]`}>
//             EST. 2023 // GLOBAL OPERATIONS
//           </span>
//         </motion.div>

//         {/* Massive Text */}
//         <div className="relative">
//           <motion.h1 
//             style={{ y: y1, opacity }}
//             className={`${oswald.className} text-[12vw] leading-[0.8] text-white uppercase mix-blend-difference z-20 relative`}
//           >
//             We Are <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-800">
//               Botmartz
//             </span>
//           </motion.h1>

//           <motion.div 
//             style={{ y: y2 }}
//             className="absolute top-0 right-0 z-10 hidden md:block"
//           >
//             <div className="relative w-[30vw] h-[30vw] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]">
//               <div className="absolute inset-0 border-t border-l border-[#00E5FF]/20 rounded-full" />
//               <div className="absolute inset-4 border-b border-r border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
//             </div>
//           </motion.div>
//         </div>

//         {/* Bottom Bar */}
//         <motion.div 
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.6 }}
//           className="mt-16 flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-8"
//         >
//           <p className={`${inter.className} text-gray-400 max-w-md text-lg font-light leading-relaxed`}>
//             We don't just write code. We architect <span className="text-white">digital neural systems</span> that render traditional business logic obsolete.
//           </p>
          
//           <MagneticButton className="group mt-8 md:mt-0 flex items-center gap-4 cursor-pointer">
//             <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
//               <ChevronDown className="animate-bounce" />
//             </div>
//             <span className={`${mono.className} text-xs tracking-widest uppercase`}>Initialize</span>
//           </MagneticButton>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// // SECTION 2: THE FOUNDER (3D HOLOGRAPHIC TILT)
// const FounderSection = () => {
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
  
//   // Rotation values based on mouse position relative to card center
//   const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
//   const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const width = rect.width;
//     const height = rect.height;
//     const mouseXFromCenter = e.clientX - rect.left - width / 2;
//     const mouseYFromCenter = e.clientY - rect.top - height / 2;
    
//     mouseX.set(mouseXFromCenter / width);
//     mouseY.set(mouseYFromCenter / height);
//   };

//   const handleMouseLeave = () => {
//     mouseX.set(0);
//     mouseY.set(0);
//   };

//   return (
//     <section className="py-32 bg-[#080808] relative overflow-hidden perspective-1000">
//       <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        
//         {/* LEFT: CONTENT */}
//         <div className="space-y-12">
//           <div>
//             <div className={`${mono.className} flex items-center gap-2 text-[#FF5500] text-sm mb-4`}>
//               <Fingerprint size={16} />
//               <span>IDENTITY_VERIFIED</span>
//             </div>
//             <h2 className={`${oswald.className} text-6xl md:text-8xl text-white uppercase leading-none`}>
//               Yash <br /> 
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">Gupta</span>
//             </h2>
//           </div>

//           <div className="border-l-2 border-[#FF5500] pl-8 space-y-6">
//             <p className={`${inter.className} text-xl text-gray-300 font-light`}>
//               "The gap between 'functioning' and 'flawless' is where we live. I founded Botmartz to strip away the inefficiencies of modern web architecture."
//             </p>
//             <div className="flex gap-8">
//               <div className="flex flex-col">
//                  <span className={`${mono.className} text-2xl text-white font-bold`}>20+</span>
//                  <span className="text-xs text-gray-500 uppercase tracking-widest">Systems Deployed</span>
//               </div>
//               <div className="flex flex-col">
//                  <span className={`${mono.className} text-2xl text-white font-bold`}>100%</span>
//                  <span className="text-xs text-gray-500 uppercase tracking-widest">Execution Rate</span>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             {['Next.js Architecture', 'Neural Automation', 'AI Integration', 'Quantum UI'].map((skill, i) => (
//               <div key={i} className="flex items-center gap-3 border border-white/10 p-4 bg-white/5 hover:bg-white/10 transition-colors">
//                 <div className="w-1.5 h-1.5 bg-[#FF5500]" />
//                 <span className={`${mono.className} text-xs text-gray-300`}>{skill}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* RIGHT: 3D CARD */}
//         <div className="relative flex justify-center perspective-[2000px]">
//           <motion.div
//             style={{
//               rotateX,
//               rotateY,
//               transformStyle: "preserve-3d",
//             }}
//             onMouseMove={handleMouseMove}
//             onMouseLeave={handleMouseLeave}
//             className="relative w-full max-w-md aspect-[3/4] rounded-xl bg-[#111] border border-white/10 group"
//           >
//             {/* Holographic Gradient */}
//             <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5500]/20 via-transparent to-[#00E5FF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
            
//             {/* Image Placeholder */}
//             <div className="absolute inset-2 bg-[#0a0a0a] rounded-lg overflow-hidden flex items-center justify-center">
//               {/* REPLACE WITH ACTUAL IMAGE */}
//               <div className="text-white/10 font-black text-9xl -rotate-90 select-none">YG</div>
              
//               {/* Scanline Effect */}
//               <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none" />
//             </div>

//             {/* Floating Elements (Z-Index push) */}
//             <motion.div 
//               style={{ transform: "translateZ(60px)" }}
//               className="absolute bottom-8 left-8 right-8 p-6 bg-black/80 backdrop-blur-md border border-white/20"
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="text-white font-bold text-lg">Lead Architect</h3>
//                   <p className="text-gray-400 text-xs">Botmartz Solutions</p>
//                 </div>
//                 <Globe className="text-[#00E5FF] animate-pulse" size={20} />
//               </div>
//               <div className="mt-4 h-[1px] w-full bg-white/20 relative">
//                 <motion.div 
//                   animate={{ x: ["0%", "100%", "0%"] }}
//                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//                   className="absolute top-0 left-0 h-full w-1/3 bg-[#00E5FF] blur-[2px]" 
//                 />
//               </div>
//             </motion.div>

//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // SECTION 3: HORIZONTAL TIMELINE
// const TimelineSection = () => {
//   const targetRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//   });

//   const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

//   const EVENTS = [
//     { year: "2023", title: "Protocol Genesis", desc: "Botmartz initialized to disrupt static web practices." },
//     { year: "2024", title: "The 404 Syndicate", desc: "Formation of an elite developer collective." },
//     { year: "2024", title: "Scale Velocity", desc: "Deployed first enterprise-grade ERP automation." },
//     { year: "2025", title: "Global Nexus", desc: "Establishing nodes in international markets." },
//     { year: "FUTURE", title: "Singularity", desc: "Development of self-healing UI architectures." },
//   ];

//   return (
//     <section ref={targetRef} className="relative h-[400vh] bg-[#050505]">
//       <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
//         <div className="absolute top-12 left-12 z-20">
//           <h3 className={`${oswald.className} text-4xl text-white uppercase`}>Timeline</h3>
//           <p className={`${mono.className} text-xs text-[#00E5FF]`}>SCROLL_TO_NAVIGATE</p>
//         </div>

//         <motion.div style={{ x }} className="flex gap-0 pl-[20vw]">
//           {EVENTS.map((event, i) => (
//             <div key={i} className="w-[60vw] md:w-[40vw] h-[60vh] flex flex-col justify-center border-l border-white/10 pl-12 relative group hover:bg-white/5 transition-colors duration-500">
//               <span className={`${oswald.className} text-[8rem] md:text-[12rem] text-white/5 absolute top-0 left-4 -z-10 group-hover:text-white/10 transition-colors`}>
//                 {event.year}
//               </span>
              
//               <div className="relative">
//                 <div className="w-4 h-4 bg-[#00E5FF] rounded-full mb-8 shadow-[0_0_20px_#00E5FF]" />
//                 <h4 className={`${inter.className} text-3xl md:text-5xl font-bold text-white mb-4`}>
//                   {event.title}
//                 </h4>
//                 <p className={`${mono.className} text-gray-400 max-w-md`}>
//                   {event.desc}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// // SECTION 4: BENTO PHILOSOPHY
// const PhilosophyGrid = () => {
//   return (
//     <section className="py-32 px-6 bg-[#030303] border-t border-white/10">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-20 text-center">
//           <h2 className={`${oswald.className} text-5xl md:text-7xl text-white uppercase`}>Core <span className="text-[#FF5500]">Kernel</span></h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-[120vh] md:h-[80vh]">
          
//           {/* Card 1: Large Left */}
//           <div className="md:col-span-2 md:row-span-2 relative bg-[#0A0A0A] border border-white/10 p-10 group overflow-hidden">
//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
//             <Cpu className="text-white mb-8 group-hover:rotate-90 transition-transform duration-700" size={48} />
//             <h3 className="text-4xl font-bold text-white mb-4">Neural Architecture</h3>
//             <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
//               We treat web development as biological engineering. Every div, every function, and every API call is part of a living organism that must breathe, adapt, and scale without friction.
//             </p>
//             <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#00E5FF] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
//           </div>

//           {/* Card 2: Top Right */}
//           <div className="relative bg-[#0A0A0A] border border-white/10 p-8 group overflow-hidden flex flex-col justify-between">
//              <div className="absolute top-0 right-0 p-4 opacity-20">
//                 <Terminal size={100} />
//              </div>
//              <h3 className="text-2xl font-bold text-white z-10"><ScrambleText text="Clean Code" /></h3>
//              <p className="text-gray-500 text-sm z-10">
//                Minimal bloat. Maximum efficiency. We deprecate the unnecessary.
//              </p>
//           </div>

//           {/* Card 3: Bottom Right */}
//           <div className="relative bg-[#FF5500] p-8 group overflow-hidden flex flex-col justify-center items-center text-center cursor-pointer hover:bg-[#ff661a] transition-colors">
//              <h3 className={`${oswald.className} text-5xl text-black uppercase`}>Velocity</h3>
//              <p className="text-black/70 font-mono text-xs mt-2">SPEED IS A FEATURE</p>
//              <Zap className="absolute -bottom-8 -right-8 text-black/20" size={120} />
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// // SECTION 5: INFINITE TEAM MARQUEE
// const TeamTicker = () => {
//   return (
//     <div className="py-20 bg-[#00E5FF] overflow-hidden -skew-y-2 border-y-4 border-black">
//       <motion.div 
//         className="flex whitespace-nowrap"
//         animate={{ x: ["0%", "-50%"] }}
//         transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//       >
//         {[...Array(20)].map((_, i) => (
//           <div key={i} className="flex items-center gap-8 mx-8">
//             <span className={`${oswald.className} text-6xl md:text-8xl text-black font-bold uppercase`}>
//               Botmartz Solutions
//             </span>
//             <div className="w-12 h-12 bg-black rounded-full" />
//           </div>
//         ))}
//       </motion.div>
//     </div>
//   );
// };

// // SECTION 6: FOOTER CTA
// const Footer = () => {
//   return (
//     <footer className="relative min-h-screen bg-black flex flex-col items-center justify-center p-6 overflow-hidden">
//        {/* Background Vortex */}
//        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//           <div className="w-[50vw] h-[50vw] bg-white/5 rounded-full blur-[100px] animate-pulse" />
//        </div>

//        <div className="z-10 text-center space-y-8">
//           <p className={`${mono.className} text-[#00E5FF] text-sm tracking-widest`}>SYSTEM_READY</p>
//           <h2 className={`${oswald.className} text-6xl md:text-[10rem] text-white leading-[0.8] uppercase`}>
//             Let's <br /> Build
//           </h2>
          
//           <div className="pt-12">
//             <MagneticButton className="group relative inline-flex items-center justify-center px-12 py-6 bg-transparent border border-white/20 overflow-hidden cursor-pointer">
//               <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
//               <span className="relative z-10 flex items-center gap-4 text-white group-hover:text-black transition-colors duration-500 font-bold tracking-widest uppercase">
//                 Start Project <MoveUpRight size={20} />
//               </span>
//             </MagneticButton>
//           </div>
//        </div>
       
//        <div className="absolute bottom-12 w-full px-12 flex justify-between text-gray-600 text-xs font-mono uppercase">
//           <span>© 2025 Botmartz</span>
//           <span>Yash Gupta / Founder</span>
//        </div>
//     </footer>
//   );
// };

// // --- MAIN PAGE EXPORT ---

// export default function AboutPage() {
//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001
//   });

//   return (
//     <main className="bg-[#050505] min-h-screen selection:bg-[#FF5500] selection:text-black cursor-default">
//       <GrainOverlay />
      
//       {/* Scroll Progress Bar */}
//       <motion.div
//         className="fixed top-0 left-0 right-0 h-1 bg-[#FF5500] origin-left z-[1000]"
//         style={{ scaleX }}
//       />

//       <Hero />
//       <FounderSection />
//       <TimelineSection />
//       <PhilosophyGrid />
//       <TeamTicker />
//       <Footer />
//     </main>
//   );
// }