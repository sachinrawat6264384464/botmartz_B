// "use client";

// import React, { useRef, useState, useEffect } from "react";
// import Image from "next/image";
// import {
//   motion,
//   useScroll,
//   useTransform,
//   useSpring,
//   useMotionValue,
//   AnimatePresence,
// } from "framer-motion";
// import { Inter_Tight, JetBrains_Mono, Oswald } from 'next/font/google';
// import {
//   Terminal,
//   Cpu,
//   Globe,
//   Zap,
//   Fingerprint,
//   MoveUpRight,
//   ChevronDown
// } from "lucide-react";

// // --- TYPOGRAPHY ---
// const inter = Inter_Tight({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-inter' });
// const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });
// const oswald = Oswald({ subsets: ['latin'], weight: ['700'], variable: '--font-oswald' });

// // --- UTILS & HOOKS ---

// const useScramble = (text: string, speed: number = 40) => {
//   const [displayText, setDisplayText] = useState(text);
//   const [isHovered, setIsHovered] = useState(false);
//   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&<>/\\|[]{}";

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

// const MagneticButton = ({ children, className = "", strength = 40, glowColor = "#00E5FF" }: any) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//   const [isHovered, setIsHovered] = useState(false);

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
//     setIsHovered(false);
//   };

//   const springConfig = { damping: 20, stiffness: 200, mass: 0.1 };
//   const springX = useSpring(x, springConfig);
//   const springY = useSpring(y, springConfig);

//   return (
//     <motion.div
//       ref={ref}
//       onMouseMove={handleMouseMove}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={handleMouseLeave}
//       style={{ x: springX, y: springY }}
//       className={`relative ${className}`}
//     >
//       <motion.div
//         className="absolute inset-0 rounded-full blur-[20px] -z-10 transition-opacity duration-500"
//         style={{ backgroundColor: glowColor }}
//         animate={{ opacity: isHovered ? 0.6 : 0 }}
//       />
//       {children}
//     </motion.div>
//   );
// };

// const GrainOverlay = () => (
//   <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.05] mix-blend-overlay">
//     <svg className="w-full h-full">
//       <filter id="noiseFilter">
//         <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" />
//       </filter>
//       <rect width="100%" height="100%" filter="url(#noiseFilter)" />
//     </svg>
//   </div>
// );

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

// const GlitchText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       className={`relative group ${className}`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <span className="relative z-10 mix-blend-difference">{children}</span>
//       <AnimatePresence>
//         {isHovered && (
//           <>
//             <motion.span
//               className="absolute inset-0 text-[#00E5FF] z-0 opacity-70 mix-blend-screen"
//               initial={{ x: 0 }}
//               animate={{ x: [-2, 2, -1, 0], y: [1, -1, 0] }}
//               exit={{ x: 0, y: 0 }}
//               transition={{ duration: 0.2, times: [0, 0.2, 0.5, 1], repeat: Infinity, repeatType: "reverse" }}
//             >
//               {children}
//             </motion.span>
//             <motion.span
//               className="absolute inset-0 text-[#FF5500] z-0 opacity-70 mix-blend-screen"
//               initial={{ x: 0 }}
//               animate={{ x: [2, -2, 1, 0], y: [-1, 1, 0] }}
//               exit={{ x: 0, y: 0 }}
//               transition={{ duration: 0.2, delay: 0.05, times: [0, 0.2, 0.5, 1], repeat: Infinity, repeatType: "reverse" }}
//             >
//               {children}
//             </motion.span>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// // --- SECTIONS ---

// // SECTION 1: KINETIC HERO
// const Hero = () => {
//   const containerRef = useRef(null);
//   const { scrollY } = useScroll();

//   const y1 = useTransform(scrollY, [0, 500], [0, 100]);
//   const opacity = useTransform(scrollY, [0, 300], [1, 0]);

//   return (
//     <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#050505] py-20">
//       {/* Dynamic Cyberpunk Grid Background */}
//       <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(0,229,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,229,255,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)] pointer-events-none">
//         <motion.div
//           className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.1),transparent_60%)]"
//           animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
//           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//         />
//       </div>

//       <div className="relative z-10 w-full max-w-[95vw] mx-auto px-4 md:px-8">
//         {/* Top Label */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="flex items-center gap-4 mb-8"
//         >
//           <div className="h-[2px] w-12 bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]" />
//           <ScrambleText text="EST. 2023 // GLOBAL OPERATIONS" className={`font-mono text-[#00E5FF] text-sm tracking-[0.2em] drop-shadow-[0_0_5px_rgba(0,229,255,0.7)]`} />
//         </motion.div>

//         {/* --- GRID LAYOUT --- */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
//           {/* LEFT: TEXT */}
//           <div className="lg:col-span-7 relative">
//             <motion.h1
//               style={{ y: y1, opacity }}
//               className={`font-oswald text-[15vw] lg:text-[11vw] leading-[0.85] text-white uppercase z-20 relative tracking-tighter`}
//             >
//               We Are <br />
//               <GlitchText className="text-transparent bg-clip-text bg-gradient-to-br from-white via-[#E0E0E0] to-[#A0A0A0] drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
//                 Botmartz
//               </GlitchText>
//             </motion.h1>

//             <motion.div
//               className="absolute -top-20 -right-20 z-0 hidden lg:block opacity-40 pointer-events-none"
//               animate={{ rotate: 360 }}
//               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
//             >
//               <div className="w-64 h-64 rounded-full border-[3px] border-dashed border-[#00E5FF]/40 relative">
//                 <motion.div className="absolute inset-2 rounded-full border-[3px] border-dotted border-[#FF5500]/30" animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
//               </div>
//             </motion.div>
//           </div>

//           {/* RIGHT: VIDEO */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 30 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
//             className="lg:col-span-5 relative w-full h-full max-w-2xl mx-auto lg:mx-0"
//           >
//             <div className="relative rounded-xl overflow-hidden border-2 border-[#00E5FF]/30 group shadow-[0_0_40px_rgba(0,229,255,0.15)] backdrop-blur-sm bg-[#000]/30">
//               <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#00E5FF] z-20" />
//               <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#00E5FF] z-20" />
//               <div className="absolute top-2 left-2 w-2 h-2 bg-[#FF5500] z-20 animate-pulse" />
              
//               <video
//                 className="w-full h-auto object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500 mix-blend-lighten"
//                 autoPlay
//                 loop
//                 muted
//                 playsInline
//               >
//                 <source src="/BotMartz_Works.mp4" type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//               <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_2px,rgba(0,229,255,0.1)_3px),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.02),rgba(0,0,255,0.03))] z-10 bg-[length:100%_3px,3px_100%] pointer-events-none animate-[scan_5s_linear_infinite]" />
//             </div>
//           </motion.div>
//         </div>

//         {/* Bottom Bar */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.6 }}
//           className="mt-20 flex flex-col md:flex-row justify-between items-end border-t border-[#00E5FF]/20 pt-8"
//         >
//           <p className={`font-inter text-gray-400 max-w-lg text-lg font-light leading-relaxed`}>
//             We don't just write code. We architect <span className="text-[#00E5FF] font-medium drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]">digital neural systems</span> that render traditional business logic obsolete.
//           </p>

//           <MagneticButton className="group mt-8 md:mt-0 flex items-center gap-4 cursor-pointer">
//             <div className="h-14 w-14 rounded-full border-2 border-[#00E5FF]/50 flex items-center justify-center group-hover:bg-[#00E5FF] group-hover:border-transparent group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
//               <ChevronDown className="animate-bounce w-6 h-6" />
//             </div>
//             <span className={`font-mono text-sm tracking-[0.25em] uppercase text-[#00E5FF] group-hover:text-white transition-colors duration-300`}>Initialize</span>
//           </MagneticButton>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// // SECTION 2: THE FOUNDER (WITH YOUR IMAGE)
// const FounderSection = () => {
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);

//   const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
//   const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

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
//     <section className="py-32 bg-[#080808] relative overflow-hidden perspective-1500">
//       <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] bg-center bg-repeat opacity-[0.03] pointer-events-none" />

//       <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center relative z-10">
//         <div className="space-y-12">
//           <div>
//             <div className={`font-mono flex items-center gap-3 text-[#FF5500] text-sm mb-4 tracking-widest`}>
//               <Fingerprint size={18} className="animate-pulse" />
//               <ScrambleText text="IDENTITY_VERIFIED" />
//             </div>
//             <h2 className={`font-oswald text-7xl md:text-9xl text-white uppercase leading-[0.9] tracking-tight`}>
//               Soham <br />
//               <GlitchText className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5500] via-[#FF8800] to-white drop-shadow-[0_0_20px_rgba(255,85,0,0.5)]">
//                 Sharma
//               </GlitchText>
//             </h2>
//           </div>

//           <div className="border-l-4 border-[#FF5500] pl-8 space-y-8 relative before:absolute before:top-0 before:-left-1 before:w-2 before:h-2 before:bg-[#FF5500] before:animate-ping">
//             <p className={`font-inter text-2xl text-gray-300 font-light italic leading-relaxed`}>
//               "The gap between 'functioning' and 'flawless' is where we live. I founded Botmartz to strip away the inefficiencies of modern web architecture."
//             </p>
//             <div className="flex gap-12">
//               <div className="flex flex-col">
//                 <span className={`font-mono text-4xl text-white font-bold drop-shadow-[0_0_10px_#FF5500]`}>20+</span>
//                 <span className="text-xs text-gray-500 uppercase tracking-[0.2em] mt-1">Systems Deployed</span>
//               </div>
//               <div className="flex flex-col">
//                 <span className={`font-mono text-4xl text-white font-bold drop-shadow-[0_0_10px_#FF5500]`}>100%</span>
//                 <span className="text-xs text-gray-500 uppercase tracking-[0.2em] mt-1">Execution Rate</span>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             {['Next.js Architecture', 'Neural Automation', 'AI Integration', 'Quantum UI'].map((skill, i) => (
//               <div key={i} className="flex items-center gap-3 border border-[#FF5500]/20 p-4 bg-[#FF5500]/5 hover:bg-[#FF5500]/15 transition-all duration-300 rounded-md group relative overflow-hidden">
//                 <div className="absolute inset-0 bg-gradient-to-r from-[#FF5500]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-0" />
//                 <div className="w-2 h-2 bg-[#FF5500] rounded-full shadow-[0_0_5px_#FF5500]" />
//                 <span className={`font-mono text-sm text-gray-300 relative z-10`}>{skill}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* RIGHT: 3D CARD WITH IMAGE */}
//         <div className="relative flex justify-center perspective-[2500px] py-10">
//           <motion.div
//             style={{
//               rotateX,
//               rotateY,
//               transformStyle: "preserve-3d",
//             }}
//             onMouseMove={handleMouseMove}
//             onMouseLeave={handleMouseLeave}
//             className="relative w-full max-w-md aspect-[3/4] rounded-2xl bg-[#0A0A0A] border-2 border-[#FF5500]/30 group shadow-[0_20px_60px_-20px_rgba(255,85,0,0.3)]"
//           >
//             <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5500]/30 via-transparent to-[#00E5FF]/30 opacity-40 group-hover:opacity-70 transition-opacity duration-500 rounded-2xl z-20 mix-blend-overlay" />
//             <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,85,0,0.1)_50%,transparent_100%)] h-[200%] w-full animate-[scan_6s_linear_infinite] z-30 pointer-events-none mix-blend-plus-lighter" />

//             {/* Image Container */}
//             <div className="absolute inset-1 rounded-xl overflow-hidden flex items-center justify-center bg-[#000]">
//               {/* Using your specific uploaded image path here */}
//               <Image
//                 src="/Sohamsharma.jpeg"
//                 alt="Soham Sharma - Founder"
//                 fill
//                 className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_2px,rgba(0,0,0,0.8)_3px)] z-10 bg-[length:100%_3px] pointer-events-none opacity-50" />
//             </div>

//             <motion.div
//               style={{ transform: "translateZ(80px)" }}
//               className="absolute bottom-6 left-6 right-6 p-5 bg-black/70 backdrop-blur-xl border border-[#FF5500]/40 rounded-xl shadow-[0_10px_30px_-10px_rgba(255,85,0,0.5)]"
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="text-white font-bold text-xl tracking-wide drop-shadow-[0_0_5px_#FF5500]">Lead Architect</h3>
//                   <p className="text-gray-400 text-sm font-mono mt-1">Botmartz Solutions</p>
//                 </div>
//                 <Globe className="text-[#00E5FF] animate-pulse drop-shadow-[0_0_8px_#00E5FF]" size={24} />
//               </div>
//               <div className="mt-5 h-[2px] w-full bg-[#FF5500]/20 relative overflow-hidden rounded-full">
//                 <motion.div
//                   animate={{ x: ["-100%", "100%"] }}
//                   transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
//                   className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-[#FF5500] to-transparent blur-[3px]"
//                 />
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // SECTION 3: FIXED TIMELINE SECTION (SOLVES BLACK SCREEN)
// const TimelineSection = () => {
//   const targetRef = useRef<HTMLDivElement>(null);
  
//   // FIXED: offset added to ensure animation happens precisely while pinned
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//     offset: ["start start", "end end"],
//   });

//   // FIXED: Adjusted range to -75% to prevent over-scrolling into emptiness
//   const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

//   const EVENTS = [
//     { year: "2023", title: "Protocol Genesis", desc: "Botmartz initialized to disrupt static web practices." },
//     { year: "2024", title: "The 404 Syndicate", desc: "Formation of an elite developer collective." },
//     { year: "2024", title: "Scale Velocity", desc: "Deployed first enterprise-grade ERP automation." },
//     { year: "2025", title: "Global Nexus", desc: "Establishing nodes in international markets." },
//     { year: "FUTURE", title: "Singularity", desc: "Development of self-healing UI architectures." },
//   ];

//   return (
//     // Increased height to 500vh for smoother scroll duration
//     <section ref={targetRef} className="relative h-[500vh] bg-[#030303]">
//       <div className="sticky top-0 h-screen flex items-center overflow-hidden">
//         <div className="absolute top-16 left-16 z-20">
//           <h3 className={`font-oswald text-5xl text-white uppercase tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]`}>Timeline</h3>
//           <div className="flex items-center gap-3 mt-2">
//             <div className="w-8 h-[2px] bg-[#00E5FF]" />
//             <p className={`font-mono text-sm text-[#00E5FF] tracking-[0.3em]`}>SCROLL_TO_NAVIGATE</p>
//           </div>
//         </div>

//         {/* Horizontal Scroll Container */}
//         <motion.div style={{ x }} className="flex gap-0 pl-[25vw] items-center h-full">
//           {EVENTS.map((event, i) => (
//             <div key={i} className="w-[80vw] md:w-[60vw] h-[70vh] flex flex-col justify-center border-l-2 border-[#00E5FF]/20 pl-16 relative group hover:bg-[#00E5FF]/5 transition-all duration-700 backdrop-blur-sm shrink-0">
//               <span className={`font-oswald text-[10rem] md:text-[15rem] text-white/5 absolute top-1/2 -translate-y-1/2 left-4 -z-10 group-hover:text-[#00E5FF]/10 transition-colors duration-700 select-none font-outline-2 font-outline-white/10`}>
//                 {event.year}
//               </span>

//               <div className="relative z-10">
//                 <div className="absolute -left-[4.25rem] top-2 w-5 h-5 bg-[#00E5FF] rounded-full shadow-[0_0_20px_#00E5FF] group-hover:shadow-[0_0_40px_#00E5FF] transition-shadow duration-500">
//                   <div className="absolute inset-0 rounded-full border-2 border-[#00E5FF] animate-ping opacity-50" />
//                 </div>

//                 <h4 className={`font-inter text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight group-hover:text-[#00E5FF] transition-colors duration-500`}>
//                   {event.title}
//                 </h4>
//                 <p className={`font-mono text-gray-400 max-w-lg text-lg leading-relaxed`}>
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
//     <section className="py-32 px-6 bg-[#020202] relative">
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,85,0,0.05),transparent_70%)] pointer-events-none" />
//       <div className="max-w-7xl mx-auto relative z-10">
//         <div className="mb-24 text-center">
//           <h2 className={`font-oswald text-6xl md:text-8xl text-white uppercase tracking-tight`}>Core <GlitchText className="text-[#FF5500] drop-shadow-[0_0_15px_#FF5500]">Kernel</GlitchText></h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-[130vh] md:h-[85vh]">
//           <div className="md:col-span-2 md:row-span-2 relative bg-[#080808] border-2 border-[#00E5FF]/20 p-12 group overflow-hidden rounded-2xl hover:border-[#00E5FF]/50 transition-all duration-500 shadow-[0_0_30px_rgba(0,229,255,0.1)] hover:shadow-[0_0_50px_rgba(0,229,255,0.2)]">
//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,229,255,0.15),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
//             <Cpu className="text-[#00E5FF] mb-10 group-hover:rotate-180 transition-transform duration-1000 drop-shadow-[0_0_10px_#00E5FF]" size={64} />
//             <h3 className="text-5xl font-bold text-white mb-6 tracking-tight">Neural Architecture</h3>
//             <p className="text-gray-400 text-xl leading-relaxed max-w-xl font-light">
//               We treat web development as biological engineering. Every div, every function, and every API call is part of a living organism that must breathe, adapt, and scale without friction.
//             </p>
//             <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#00E5FF] via-[#00E5FF]/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
//           </div>

//           <div className="relative bg-[#080808] border-2 border-[#00E5FF]/20 p-10 group overflow-hidden rounded-2xl flex flex-col justify-between hover:border-[#00E5FF]/50 transition-all duration-500 shadow-[0_0_30px_rgba(0,229,255,0.1)] hover:shadow-[0_0_50px_rgba(0,229,255,0.2)]">
//             <div className="absolute -top-10 -right-10 p-4 opacity-10 group-hover:opacity-30 transition-opacity duration-500 rotate-12">
//               <Terminal size={180} className="text-[#00E5FF]" />
//             </div>
//             <div>
//               <h3 className="text-3xl font-bold text-white z-10 tracking-tight mb-3"><ScrambleText text="Clean Code" /></h3>
//               <p className="text-gray-500 text-sm z-10 font-mono">
//                 Minimal bloat. Maximum efficiency. We deprecate the unnecessary.
//               </p>
//             </div>
//             <div className="w-12 h-1 bg-[#00E5FF]/50 mt-8 group-hover:w-full transition-all duration-500" />
//           </div>

//           <div className="relative bg-[#FF5500] p-10 group overflow-hidden rounded-2xl flex flex-col justify-center items-center text-center cursor-pointer hover:bg-[#ff3300] transition-colors duration-300 shadow-[0_0_40px_#FF5500] hover:shadow-[0_0_70px_#FF5500]">
//             <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_45%,rgba(255,255,255,0.2)_50%,transparent_55%)] bg-[length:200%_200%] animate-[shimmer_3s_linear_infinite] pointer-events-none" />
//             <h3 className={`font-oswald text-6xl text-white uppercase tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}>Velocity</h3>
//             <p className="text-white/90 font-mono text-sm mt-3 tracking-[0.3em] font-bold">SPEED IS A FEATURE</p>
//             <Zap className="absolute -bottom-12 -right-12 text-white/30 group-hover:text-white/50 transition-colors duration-500 rotate-[-20deg]" size={150} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // SECTION 5: INFINITE TEAM MARQUEE
// const TeamTicker = () => {
//   return (
//     <div className="py-24 bg-[#00E5FF] overflow-hidden -skew-y-3 border-y-[6px] border-black relative">
//       <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] opacity-20 mix-blend-multiply pointer-events-none" />
//       <motion.div
//         className="flex whitespace-nowrap relative z-10"
//         animate={{ x: ["0%", "-50%"] }}
//         transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
//       >
//         {[...Array(10)].map((_, i) => (
//           <div key={i} className="flex items-center gap-12 mx-12">
//             <span className={`font-oswald text-7xl md:text-9xl text-black font-bold uppercase tracking-tighter drop-shadow-[0_2px_0_rgba(255,255,255,0.5)]`}>
//               Botmartz Solutions
//             </span>
//             <div className="w-16 h-16 bg-black rounded-full border-4 border-white animate-pulse shadow-[0_0_20px_black]" />
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
//       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//         <div className="w-[80vw] h-[80vw] bg-gradient-to-r from-[#00E5FF]/10 to-[#FF5500]/10 rounded-full blur-[150px] animate-[spin_20s_linear_infinite] opacity-50" />
//       </div>
     

//       <div className="z-10 text-center space-y-10">
//         <p className={`font-mono text-[#00E5FF] text-base tracking-[0.4em] drop-shadow-[0_0_5px_#00E5FF]`}>
//           <ScrambleText text="SYSTEM_READY" />
//         </p>
//         <h2 className={`font-oswald text-8xl md:text-[12rem] text-white leading-[0.85] uppercase tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]`}>
//           Let's <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#FF5500]">Build</span>
//         </h2>

//         <div className="pt-16">
//           <MagneticButton className="group relative inline-flex items-center justify-center" strength={60} glowColor="#FFFFFF">
//             <div className="relative px-16 py-8 bg-black border-2 border-white/30 overflow-hidden cursor-pointer rounded-full group-hover:border-white/80 transition-all duration-500">
//               <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
//               <span className="relative z-10 flex items-center gap-5 text-white group-hover:text-black transition-colors duration-500 font-bold text-xl tracking-[0.2em] uppercase">
//                 Start Project <MoveUpRight size={24} className="group-hover:rotate-45 transition-transform duration-500" />
//               </span>
//             </div>
//           </MagneticButton>
//         </div>
//       </div>

//       <div className="absolute bottom-12 w-full px-12 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs font-mono uppercase tracking-widest gap-4">
//         <span>© 2025 Botmartz // All Rights Reserved</span>
//         <div className="flex gap-8">
//           <span className="hover:text-[#00E5FF] cursor-pointer transition-colors">Yash Gupta / Founder</span>
//           <span className="hover:text-[#FF5500] cursor-pointer transition-colors">Legal & Privacy</span>
//         </div>
//       </div>
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
//     <main className={`bg-[#030303] min-h-screen selection:bg-[#FF5500]/70 selection:text-white cursor-default ${inter.variable} ${mono.variable} ${oswald.variable} font-sans overflow-x-hidden`}>
//       <GrainOverlay />
//       <motion.div
//         className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FF5500] via-[#FF8800] to-[#00E5FF] origin-left z-[1000] shadow-[0_0_10px_#FF5500]"
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