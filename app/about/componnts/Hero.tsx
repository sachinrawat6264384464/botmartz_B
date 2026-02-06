// // components/Hero.tsx
// "use client";

// import React, { useRef } from "react";
// import { 
//   motion, 
//   useScroll, 
//   useTransform, 
//   useMotionValue 
// } from "framer-motion";
// import { Inter_Tight, JetBrains_Mono, Oswald } from 'next/font/google';
// import { ChevronDown } from "lucide-react";
// import { MagneticButton } from "./MagneticButton";

// const inter = Inter_Tight({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });
// const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'] });
// const oswald = Oswald({ subsets: ['latin'], weight: ['700'] });

// export const Hero = () => {
//   const containerRef = useRef(null);
//   const { scrollY } = useScroll();
  
//   const y1 = useTransform(scrollY, [0, 500], [0, 100]);
//   const opacity = useTransform(scrollY, [0, 300], [1, 0]);

//   const handleScroll = () => {
//     const nextSection = document.getElementById("our-work");
//     if (nextSection) {
//       nextSection.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#050505] py-20">
//       {/* Grid Background */}
//       <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
//       {/* Main Content Wrapper */}
//       <div className="relative z-10 w-full max-w-[95vw] mx-auto px-4 md:px-8">
        
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

//         {/* Grid Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
//           {/* LEFT COLUMN: TEXT */}
//           <div className="lg:col-span-7 relative">
//             <motion.h1 
//               style={{ y: y1, opacity }}
//               className={`${oswald.className} text-[15vw] lg:text-[10vw] leading-[0.8] text-white uppercase mix-blend-difference z-20 relative`}
//             >
//               We Are <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-800">
//                 BOTLINGS
//               </span>
//             </motion.h1>

//             {/* Decorative Spinny Thing */}
//             <motion.div 
//                className="absolute -top-12 -right-12 z-0 hidden lg:block opacity-30"
//                animate={{ rotate: 360 }}
//                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//             >
//               <div className="w-32 h-32 border border-dashed border-[#00E5FF] rounded-full" />
//             </motion.div>
//           </div>

//           {/* RIGHT COLUMN: VIDEO */}
//           <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
//               className="lg:col-span-5 relative w-full h-full max-w-2xl mx-auto lg:mx-0"
//           >
//               <div className="relative rounded-lg overflow-hidden border border-white/10 group shadow-[0_0_50px_rgba(0,229,255,0.1)]">
//                 <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00E5FF] z-20" />
//                 <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00E5FF] z-20" />
                
//                 <video
//                     className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
//                     autoPlay
//                     loop
//                     muted
//                     playsInline
//                 >
//                     <source src="/BotMartz_Works.mp4" type="video/mp4" />
//                     Your browser does not support the video tag.
//                 </video>

//                 <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />
//               </div>
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
//             <div 
//               onClick={handleScroll}
//               className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300"
//             >
//               <ChevronDown className="animate-bounce" />
//             </div>
//             <span className={`${mono.className} text-xs tracking-widest uppercase`}>Initialize</span>
//           </MagneticButton>
//         </motion.div>
//       </div>
//     </section>
//   );
// };