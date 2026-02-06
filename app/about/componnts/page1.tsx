// "use client";

// import React, { useRef, useState, useEffect, useMemo, useCallback, ReactNode } from "react";
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
//   useVelocity
// } from "framer-motion";
// import { Manrope, Playfair_Display, JetBrains_Mono } from 'next/font/google';
// import { 
//   ArrowRight, 
//   MoveUpRight, 
//   Maximize2, 
//   Terminal, 
//   Cpu, 
//   Globe, 
//   Activity, 
//   Hexagon,
//   MousePointer2
// } from "lucide-react";
// import { createPortal } from "react-dom";
// import clsx from "clsx";
// import { twMerge } from "tailwind-merge";

// // --- FONTS ---
// const sans = Manrope({ subsets: ['latin'], weight: ['200', '400', '600', '800'] });
// const serif = Playfair_Display({ subsets: ['latin'], weight: ['400', '600', '800'], style: ['italic', 'normal'] });
// const mono = JetBrains_Mono({ subsets: ['latin'] });

// // --- UTILS ---
// function cn(...inputs: (string | undefined | null | false)[]) {
//   return twMerge(clsx(inputs));
// }

// // --- HOOKS ---
// const useMouse = () => {
//   const mouse = { x: useMotionValue(0), y: useMotionValue(0) };
//   const handleMouseMove = (e: MouseEvent) => {
//     mouse.x.set(e.clientX);
//     mouse.y.set(e.clientY);
//   };
//   useEffect(() => {
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);
//   return mouse;
// };

// const useDimensions = (ref: React.RefObject<HTMLElement>) => {
//   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
//   useEffect(() => {
//     if(ref.current) {
//       setDimensions({ width: ref.current.offsetWidth, height: ref.current.offsetHeight });
//     }
//   }, [ref]);
//   return dimensions;
// };

// // --- CORE COMPONENTS ---

// // 1. CUSTOM CURSOR (The "Eye")
// const CustomCursor = () => {
//   const { x, y } = useMouse();
//   const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
//   const smoothX = useSpring(x, smoothOptions);
//   const smoothY = useSpring(y, smoothOptions);

//   // We portal this to document body to ensure it's always on top
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => setMounted(true), []);
//   if (!mounted) return null;

//   return createPortal(
//     <motion.div
//       style={{ left: smoothX, top: smoothY }}
//       className="fixed top-0 left-0 w-4 h-4 bg-[#00E5FF] rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm"
//     >
//       <motion.div 
//         className="absolute inset-0 bg-[#FF5500] rounded-full opacity-50 blur-lg"
//         animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
//         transition={{ duration: 2, repeat: Infinity }}
//       />
//     </motion.div>,
//     document.body
//   );
// };

// // 2. CANVAS PARTICLE SYSTEM (Performance Optimized)
// const StarfieldCanvas = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     let width = window.innerWidth;
//     let height = window.innerHeight;
//     canvas.width = width;
//     canvas.height = height;

//     const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
//     const particleCount = width < 768 ? 50 : 150;

//     for (let i = 0; i < particleCount; i++) {
//       particles.push({
//         x: Math.random() * width,
//         y: Math.random() * height,
//         vx: (Math.random() - 0.5) * 0.2,
//         vy: (Math.random() - 0.5) * 0.2,
//         size: Math.random() * 1.5,
//         alpha: Math.random() * 0.5
//       });
//     }

//     const animate = () => {
//       ctx.clearRect(0, 0, width, height);
//       particles.forEach(p => {
//         p.x += p.vx;
//         p.y += p.vy;
//         if (p.x < 0) p.x = width;
//         if (p.x > width) p.x = 0;
//         if (p.y < 0) p.y = height;
//         if (p.y > height) p.y = 0;

//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
//         ctx.fill();
//       });
//       requestAnimationFrame(animate);
//     };
//     animate();

//     const handleResize = () => {
//       width = window.innerWidth;
//       height = window.innerHeight;
//       canvas.width = width;
//       canvas.height = height;
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-40" />;
// };

// // 3. MAGNETIC TITLE
// const MagneticTitle = ({ text }: { text: string }) => {
//   return (
//     <div className="flex flex-wrap gap-x-4 gap-y-0 justify-center md:justify-start">
//       {text.split(" ").map((word, i) => (
//         <Word key={i}>{word}</Word>
//       ))}
//     </div>
//   );
// };

// const Word = ({ children }: { children: string }) => {
//   const ref = useRef<HTMLSpanElement>(null);
//   const position = { x: useMotionValue(0), y: useMotionValue(0) };
  
//   const handleMouse = (e: React.MouseEvent) => {
//     const { clientX, clientY } = e;
//     const { top, left, width, height } = ref.current!.getBoundingClientRect();
//     const center = { x: left + width / 2, y: top + height / 2 };
//     const distance = { x: clientX - center.x, y: clientY - center.y };
    
//     position.x.set(distance.x * 0.1);
//     position.y.set(distance.y * 0.1);
//   };

//   return (
//     <motion.span
//       ref={ref}
//       onMouseMove={handleMouse}
//       onMouseLeave={() => { position.x.set(0); position.y.set(0); }}
//       style={{ x: useSpring(position.x), y: useSpring(position.y) }}
//       className={`${serif.className} italic text-6xl md:text-9xl text-white cursor-default hover:text-[#00E5FF] transition-colors duration-500`}
//     >
//       {children}
//     </motion.span>
//   );
// };

// // --- SECTIONS ---

// // SECTION 1: EDITORIAL HERO
// const Hero = () => {
//   const { scrollY } = useScroll();
//   const y = useTransform(scrollY, [0, 1000], [0, 400]);
//   const opacity = useTransform(scrollY, [0, 500], [1, 0]);

//   return (
//     <section className="relative min-h-screen flex flex-col justify-end pb-32 px-6 md:px-20 overflow-hidden">
//       <motion.div style={{ y, opacity }} className="relative z-10">
//         <div className="flex items-center gap-6 mb-8">
//           <div className="h-[1px] w-24 bg-[#FF5500]" />
//           <span className={`${mono.className} text-[#FF5500] text-xs uppercase tracking-[0.3em]`}>
//             Since 2023
//           </span>
//         </div>
        
//         <MagneticTitle text="Architecting The Digital Soul" />
        
//         <div className="mt-12 md:ml-32 max-w-xl">
//           <p className={`${sans.className} text-gray-400 text-lg md:text-xl font-light leading-relaxed`}>
//             Botmartz is not a traditional agency. We are a high-velocity engineering collective dismantling the barrier between human intent and automated execution.
//           </p>
//         </div>
//       </motion.div>

//       {/* Hero Graphic */}
//       <div className="absolute top-0 right-0 w-[50vw] h-full opacity-20 pointer-events-none mix-blend-screen">
//          <div className="relative w-full h-full">
//             <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-[#00E5FF] to-[#FF5500] rounded-full blur-[120px] animate-pulse" />
//          </div>
//       </div>
//     </section>
//   );
// };

// // SECTION 2: THE FOUNDER (MASK REVEAL EFFECT)
// // This is the centerpiece.
// const FounderSection = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"]
//   });

//   // Animations
//   const maskSize = useTransform(scrollYProgress, [0, 0.4], [0, 100]);
//   const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

//   return (
//     <div ref={containerRef} className="relative h-[300vh] bg-[#050505]">
//       <div className="sticky top-0 h-screen overflow-hidden">
        
//         {/* BACKGROUND LAYER (Wireframe/Data) */}
//         <div className="absolute inset-0 flex items-center justify-center bg-[#080808]">
//            <div className="relative w-full h-full max-w-[90vw] max-h-[90vh] border border-white/5 p-12">
//               <div className="absolute top-10 left-10 font-mono text-xs text-[#00E5FF]">ID: YASH_GUPTA</div>
//               <div className="absolute bottom-10 right-10 font-mono text-xs text-[#00E5FF]">ROLE: ARCHITECT</div>
              
//               {/* Giant Text Background */}
//               <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
//                  <span className={`${mono.className} text-[20vw] font-bold text-white tracking-tighter`}>LEAD</span>
//               </div>

//               {/* Grid Lines */}
//               <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5" />
//               <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/5" />
//            </div>
//         </div>

//         {/* FOREGROUND LAYER (Image) - Revealed by Clip Path */}
//         <motion.div 
//           style={{ 
//             clipPath: useMotionTemplate`circle(${maskSize}% at 50% 50%)`
//           }}
//           className="absolute inset-0 bg-[#050505] flex items-center justify-center z-20"
//         >
//           <div className="relative w-[80vw] md:w-[40vw] aspect-[3/4] md:aspect-[4/5] grayscale contrast-125 brightness-90">
//              {/* REPLACE THIS IMAGE SOURCE */}
//              <div className="w-full h-full bg-[#1a1a1a] relative overflow-hidden group">
//                 <Image 
//                   src="/founder.jpg" 
//                   alt="Yash Gupta - Founder"
//                   fill
//                   className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
//                 />
                
//                 {/* Data Overlay on Image */}
//                 <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
//                   <h2 className={`${serif.className} text-5xl md:text-7xl text-white italic`}>The Visionary</h2>
//                   <p className={`${sans.className} text-gray-300 mt-2`}>Coding the future, one node at a time.</p>
//                 </div>
//              </div>
//           </div>
//         </motion.div>

//         {/* SCROLLING TEXT OVERLAY */}
//         <div className="absolute right-6 md:right-24 top-1/2 -translate-y-1/2 w-64 md:w-96 mix-blend-difference z-30 pointer-events-none">
//           <motion.div style={{ y: textY }} className="space-y-32">
//             <div>
//               <h3 className="text-[#00E5FF] font-mono text-sm mb-4">01 // ORIGIN</h3>
//               <p className="text-white text-2xl font-light leading-snug">
//                 "I started Botmartz with a singular obsession: efficiency. The modern web is bloated. We strip it back to raw performance."
//               </p>
//             </div>
//             <div>
//               <h3 className="text-[#FF5500] font-mono text-sm mb-4">02 // PHILOSOPHY</h3>
//               <p className="text-white text-2xl font-light leading-snug">
//                 "We don't build websites. We build <span className="italic font-serif">digital assets</span> that generate revenue while you sleep."
//               </p>
//             </div>
//             <div>
//               <h3 className="text-[#00E5FF] font-mono text-sm mb-4">03 // FUTURE</h3>
//               <p className="text-white text-2xl font-light leading-snug">
//                 "Neural networks, automated agents, self-healing code. This isn't sci-fi. It's our deployment pipeline."
//               </p>
//             </div>
//           </motion.div>
//         </div>

//       </div>
//     </div>
//   );
// };

// // SECTION 3: HORIZONTAL HISTORY (Snap Scroll)
// const HistorySection = () => {
//   const targetRef = useRef(null);
//   const { scrollYProgress } = useScroll({ target: targetRef });
//   const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

//   const years = [
//     { year: "2023", title: "The Inception", desc: "Botmartz Solutions registered. First line of code written in a dorm room." },
//     { year: "2024", title: "The Syndicate", desc: "Formation of the 404 Syndicate. 100+ members joined the community." },
//     { year: "2025", title: "Enterprise", desc: "Scaling to large ERPs. Introducing AI Agents to the workflow." },
//   ];

//   return (
//     <section ref={targetRef} className="relative h-[300vh] bg-[#0A0A0A]">
//       <div className="sticky top-0 h-screen flex items-center overflow-hidden">
//         <motion.div style={{ x }} className="flex">
//           {years.map((item, i) => (
//             <div key={i} className="w-screen h-screen flex flex-col justify-center items-center px-10 border-r border-white/5 relative shrink-0">
//                {/* Giant Background Year */}
//                <span className={`${sans.className} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-white/[0.03] select-none pointer-events-none`}>
//                   {item.year}
//                </span>
               
//                <div className="relative z-10 max-w-3xl text-center">
//                   <div className="w-1 h-20 bg-gradient-to-b from-[#00E5FF] to-transparent mx-auto mb-8" />
//                   <h3 className={`${serif.className} text-6xl md:text-8xl text-white mb-6 italic`}>{item.title}</h3>
//                   <p className={`${sans.className} text-xl md:text-2xl text-gray-400 font-light`}>{item.desc}</p>
//                </div>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// // SECTION 4: STATS & SKILLS (Interactive Grid)
// const SkillsGrid = () => {
//   return (
//     <section className="py-32 px-6 bg-[#050505] border-t border-white/10">
//       <div className="max-w-7xl mx-auto">
//          <div className="grid md:grid-cols-2 gap-16">
            
//             {/* Left: Text */}
//             <div>
//                <h2 className={`${sans.className} text-5xl md:text-7xl font-bold text-white mb-8`}>
//                   Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#FF5500]">Stack</span>
//                </h2>
//                <p className="text-gray-400 text-lg mb-12 max-w-md">
//                   We leverage a bleeding-edge stack optimized for SEO, speed, and scalability. No legacy code. No bloat.
//                </p>
               
//                <div className="space-y-6">
//                   <SkillRow label="Next.js 15 / React" value="98%" />
//                   <SkillRow label="Neural Networks / AI" value="92%" />
//                   <SkillRow label="WebGL / Three.js" value="88%" />
//                   <SkillRow label="System Architecture" value="100%" />
//                </div>
//             </div>

//             {/* Right: Abstract Visualization */}
//             <div className="relative h-full min-h-[400px] flex items-center justify-center bg-white/5 rounded-2xl overflow-hidden border border-white/10 group">
//                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.1),transparent_70%)]" />
               
//                {/* Rotating Hexagon */}
//                <motion.div 
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                   className="relative z-10"
//                >
//                   <Hexagon size={200} strokeWidth={0.5} className="text-white/20" />
//                   <Hexagon size={160} strokeWidth={0.5} className="absolute inset-0 m-auto text-[#00E5FF]/40" />
//                   <Hexagon size={120} strokeWidth={1} className="absolute inset-0 m-auto text-[#FF5500]/60" />
//                </motion.div>
               
//                <div className="absolute bottom-8 left-8 font-mono text-xs text-[#00E5FF]">
//                   SYSTEM_STATUS: OPTIMAL
//                </div>
//             </div>

//          </div>
//       </div>
//     </section>
//   );
// };

// const SkillRow = ({ label, value }: { label: string, value: string }) => {
//    return (
//       <div className="group cursor-pointer">
//          <div className="flex justify-between mb-2 font-mono text-sm text-gray-400 group-hover:text-white transition-colors">
//             <span>{label}</span>
//             <span>{value}</span>
//          </div>
//          <div className="h-[1px] w-full bg-white/10 overflow-hidden">
//             <motion.div 
//                initial={{ x: "-100%" }}
//                whileInView={{ x: "0%" }}
//                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
//                className="h-full bg-[#00E5FF] w-full group-hover:bg-[#FF5500] transition-colors duration-300" 
//             />
//          </div>
//       </div>
//    )
// }

// // SECTION 5: FOOTER REVEAL
// const Footer = () => {
//    return (
//       <footer className="relative h-[80vh] bg-black flex items-center justify-center overflow-hidden">
//          {/* Noise Texture */}
//          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

//          <div className="relative z-10 text-center">
//             <div className="mb-8 overflow-hidden">
//                <motion.p 
//                   initial={{ y: "100%" }}
//                   whileInView={{ y: "0%" }}
//                   className="font-mono text-[#FF5500] text-sm tracking-widest"
//                >
//                   READY TO DEPLOY?
//                </motion.p>
//             </div>
            
//             <h2 className={`${sans.className} text-[12vw] font-bold text-white leading-none tracking-tighter hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#00E5FF] hover:to-[#FF5500] transition-all duration-500 cursor-pointer`}>
//                CONTACT
//             </h2>
            
//             <div className="mt-12 flex flex-col md:flex-row gap-8 justify-center items-center">
//                <a href="mailto:contact@botmartz.com" className="px-8 py-4 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-sm font-bold flex items-center gap-2 group">
//                   Send Transmission <ArrowRight className="group-hover:translate-x-1 transition-transform" />
//                </a>
//             </div>
//          </div>
         
//          {/* Footer Bottom */}
//          <div className="absolute bottom-8 left-0 w-full px-8 flex justify-between text-white/20 text-xs font-mono">
//             <span>YASH GUPTA © 2025</span>
//             <span>MP, INDIA</span>
//          </div>
//       </footer>
//    )
// }

// // --- MAIN PAGE LAYOUT ---
// export default function AboutPage() {
//   return (
//     <div className="bg-[#050505] min-h-screen text-white selection:bg-[#00E5FF] selection:text-black cursor-none">
//       <CustomCursor />
//       <StarfieldCanvas />
      
//       <main className="relative z-10">
//          <Hero />
//          <FounderSection />
//          <HistorySection />
//          <SkillsGrid />
//          <Footer />
//       </main>
      
//       {/* Global Grain Filter */}
//       <svg className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9998] w-full h-full">
//          <filter id="noise">
//             <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
//          </filter>
//          <rect width="100%" height="100%" filter="url(#noise)" />
//       </svg>
//     </div>
//   );
// }