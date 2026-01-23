"use client";
import React, { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

export default function WarpTunnel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "100px" });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // Disable alpha if possible, but we use it for fade... actually background is black so we can optimize
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const isMobile = w < 768;
    
    // Optimization: Drastically reduce star count
    const count = isMobile ? 150 : 400; 
    const speed = 25; 

    // Recycle arrays
    const stars = new Float32Array(count * 3); // x, y, z

    for(let i=0; i<count; i++) {
       stars[i * 3] = Math.random() * w - w/2;     // x
       stars[i * 3 + 1] = Math.random() * h - h/2; // y
       stars[i * 3 + 2] = Math.random() * w;       // z
    }

    let animationFrameId: number;
    let isRunning = true;

    const render = () => {
       if (!isRunning) return;

       // Optimization: Use fillRect with low opacity instead of clearRect for trails
       // BUT clearRect is faster on some mobile GPUs. Let's stick to the fade effect but check performance.
       // The fade effect (fillRect) creates the trails.
       ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
       ctx.fillRect(0, 0, w, h);

       ctx.fillStyle = "#D4AF37"; // Single fill style for all stars (much faster)
       
       for(let i=0; i<count; i++) {
          let x = stars[i * 3];
          let y = stars[i * 3 + 1];
          let z = stars[i * 3 + 2];

          z -= speed;
          if (z <= 0) {
             z = w;
             x = Math.random() * w - w/2;
             y = Math.random() * h - h/2;
             stars[i * 3] = x;
             stars[i * 3 + 1] = y;
          }
          
          stars[i * 3 + 2] = z;

          const screenX = (x / z) * w + w/2;
          const screenY = (y / z) * h + h/2;
          const size = (1 - z / w) * 4;
          
          // Optimization: Skip drawing if out of bounds
          if (screenX < 0 || screenX > w || screenY < 0 || screenY > h) continue;

          // Simple rects are faster than arcs
          ctx.fillRect(screenX, screenY, size, size);
       }

       animationFrameId = requestAnimationFrame(render);
    };

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
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        isRunning = false;
    };
  }, [isInView]);

  return (
      <div ref={containerRef} className="absolute inset-0 w-full h-full will-change-transform">
         <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
      </div>
  );
}
