import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  
  // Parallax for text
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-black">
       
       {/* 1. WARP SPEED TUNNEL BACKGROUND */}
       <WarpTunnel />

       <div className="relative z-10 text-center px-6 w-full max-w-[90vw]">
         <motion.div
            style={{ y, opacity }}
            className="flex flex-col items-center"
         >
           {/* Cinematic Label */}
           <motion.div 
             initial={{ opacity: 0, letterSpacing: "1em" }}
             whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
             transition={{ duration: 1.5, ease: "easeOut" }}
             className="text-[#D4AF37] font-mono text-xs md:text-sm tracking-[0.2em] mb-8 uppercase"
           >
             System Status: Ready
           </motion.div>

           {/* MASSIVE TYPE */}
           <h2 className="text-[12vw] leading-[0.8] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 mb-12 mix-blend-difference">
             <motion.span 
               initial={{ y: 100, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
               className="block"
             >
               READY TO
             </motion.span>
             <motion.span 
               initial={{ y: 100, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
               className="block text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] via-[#FCEE21] to-[#D4AF37]"
               style={{ textShadow: "0 0 100px rgba(212,175,55,0.3)" }}
             >
               TRANSCEND?
             </motion.span>
           </h2>

           {/* Pulse Button */}
           <div className="relative group">
             <div className="absolute inset-0 bg-[#D4AF37] blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
             <button className="relative px-12 py-6 bg-white text-black font-black text-lg md:text-xl tracking-widest uppercase rounded-full hover:scale-105 hover:bg-[#D4AF37] transition-all duration-300 flex items-center gap-4">
                <span>Begin Sequence</span>
                <ArrowRight className="w-6 h-6" />
             </button>
           </div>

         </motion.div>
       </div>
    </section>
  );
}

// --- WARP TUNNEL COMPONENT ---
function WarpTunnel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef); // Hook to track visibility

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const isMobile = w < 768; // Mobile check
    
    // Star data
    const stars: { x: number; y: number; z: number; o: number }[] = [];
    const count = isMobile ? 300 : 800; // Reduce count on mobile
    const speed = 25; // Warp speed constant

    for(let i=0; i<count; i++) {
       stars.push({
         x: Math.random() * w - w/2,
         y: Math.random() * h - h/2,
         z: Math.random() * w, 
         o: Math.random() 
       })
    }

    let animationFrameId: number;
    let isRunning = true;

    const render = () => {
       if (!isRunning) return; // Stop rendering if flagged

       // Clear with fade for trail effect
       ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
       ctx.fillRect(0, 0, w, h);

       stars.forEach(star => {
          star.z -= speed;
          if (star.z <= 0) {
             star.z = w;
             star.x = Math.random() * w - w/2;
             star.y = Math.random() * h - h/2;
          }

          const x = (star.x / star.z) * w + w/2;
          const y = (star.y / star.z) * h + h/2;
          const size = (1 - star.z / w) * 4;
          const opacity = (1 - star.z / w);

          // Draw Star
          ctx.beginPath();
          ctx.fillStyle = `rgba(212, 175, 55, ${opacity})`; // Gold stars
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
       });

       animationFrameId = requestAnimationFrame(render);
    };

    // Controls
    if (isInView) {
        isRunning = true;
        render();
    } else {
        isRunning = false;
    }

    const handleResize = () => {
       w = canvas.width = window.innerWidth;
       h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        isRunning = false;
    };
  }, [isInView]);

  return (
      <div ref={containerRef} className="absolute inset-0 w-full h-full">
         <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
      </div>
  );
}
