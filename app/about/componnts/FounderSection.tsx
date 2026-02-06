// // components/FounderSection.tsx
// "use client";

// import React from "react";
// import { motion, useMotionValue, useTransform } from "framer-motion";
// import { Inter_Tight, JetBrains_Mono, Oswald } from 'next/font/google';
// import { Fingerprint, Globe } from "lucide-react";

// const inter = Inter_Tight({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });
// const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'] });
// const oswald = Oswald({ subsets: ['latin'], weight: ['700'] });

// export const FounderSection = () => {
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
  
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
//             <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5500]/20 via-transparent to-[#00E5FF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
            
//             <div className="absolute inset-2 bg-[#0a0a0a] rounded-lg overflow-hidden flex items-center justify-center">
//               <div className="text-white/10 font-black text-9xl -rotate-90 select-none">YG</div>
//               <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none" />
//             </div>

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