import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  // Lighter parallax — smaller range = less repaints
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-black">

      <WarpTunnel />

      <div className="relative z-10 text-center px-6 w-full max-w-[90vw]">
        <motion.div
          style={{ y, opacity, willChange: 'transform, opacity' }}
          className="flex flex-col items-center"
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-[#D4AF37] font-mono text-xs md:text-sm tracking-[0.2em] mb-8 uppercase"
          >
            System Status: Ready
          </motion.div>

          {/* Heading — removed mix-blend-difference (compositor heavy) */}
          <h2 className="text-[12vw] leading-[0.85] font-black tracking-tighter mb-12">
            <motion.span
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="block text-white"
            >
              READY TO
            </motion.span>
            <motion.span
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="block bg-clip-text text-transparent bg-linear-to-b from-[#D4AF37] via-[#FCEE21] to-[#D4AF37]"
            >
              TRANSCEND?
            </motion.span>
          </h2>

          {/* CTA Button */}
          <div className="relative group">
            <div className="absolute inset-0 bg-[#D4AF37] blur-[30px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
            <button className="relative px-12 py-5 bg-white text-black font-black text-lg md:text-xl tracking-widest uppercase rounded-full hover:scale-105 hover:bg-[#D4AF37] transition-all duration-300 flex items-center gap-4">
              <span>Contact</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- WARP TUNNEL — optimised canvas ---
function WarpTunnel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapperRef, { amount: 0.1 });
  // Use a ref so the stable RAF loop can read the latest value without restarting
  const activeRef = useRef(false);

  useEffect(() => {
    activeRef.current = isInView;
  }, [isInView]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const isMobile = w < 768;

    // Fewer stars: 180 desktop / 90 mobile — still looks great
    const COUNT = isMobile ? 90 : 180;
    const SPEED = 20;

    type Star = { x: number; y: number; z: number };
    const stars: Star[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w - w / 2,
      y: Math.random() * h - h / 2,
      z: Math.random() * w,
    }));

    let animId: number;

    const render = () => {
      animId = requestAnimationFrame(render);

      if (!activeRef.current) return; // pause drawing, keep RAF alive

      // Clear
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, w, h);

      // Batch all stars into a single path per frame — far fewer draw calls
      ctx.beginPath();
      for (const star of stars) {
        star.z -= SPEED;
        if (star.z <= 0) {
          star.z = w;
          star.x = Math.random() * w - w / 2;
          star.y = Math.random() * h - h / 2;
        }

        const px = (star.x / star.z) * w + w / 2;
        const py = (star.y / star.z) * h + h / 2;
        const size = Math.max(0.5, (1 - star.z / w) * 3);

        ctx.moveTo(px + size, py);
        ctx.arc(px, py, size, 0, Math.PI * 2);
      }
      // Single fill for all stars
      ctx.fillStyle = 'rgba(212, 175, 55, 0.85)';
      ctx.fill();
    };

    animId = requestAnimationFrame(render);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []); // stable — never re-created

  return (
    <div ref={wrapperRef} className="absolute inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
}
