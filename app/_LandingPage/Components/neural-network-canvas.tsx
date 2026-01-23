"use client";
import React, { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

export default function NeuralNetworkCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { margin: "100px" }); // Preload slightly before view

    useEffect(() => {
        const bgCanvas = canvasRef.current;
        if (!bgCanvas) return;
        const ctx = bgCanvas.getContext('2d', { alpha: true }); // optimize for alpha
        if (!ctx) return;

        let width = bgCanvas.width = window.innerWidth;
        let height = bgCanvas.height = window.innerHeight;
        const isMobile = width < 768;

        // Optimization: Reduce node count significantly
        const nodeCount = isMobile ? 15 : 30; // Reduced from 40 for better perf

        // Pre-allocate nodes array to avoid GC
        const nodes = new Float32Array(nodeCount * 4); // x, y, vx, vy
        
        // Initialize nodes
        for (let i = 0; i < nodeCount; i++) {
            nodes[i * 4] = Math.random() * width;     // x
            nodes[i * 4 + 1] = Math.random() * height; // y
            nodes[i * 4 + 2] = (Math.random() - 0.5) * 0.5; // vx
            nodes[i * 4 + 3] = (Math.random() - 0.5) * 0.5; // vy
        }

        let animationId: number;
        let isRunning = true;

        const draw = () => {
            if (!isRunning) return;

            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "#D4AF37";
            ctx.strokeStyle = "rgba(212, 175, 55, 0.15)";
            ctx.lineWidth = 1;

            // Update and Draw Nodes
            for (let i = 0; i < nodeCount; i++) {
                let x = nodes[i * 4];
                let y = nodes[i * 4 + 1];
                let vx = nodes[i * 4 + 2];
                let vy = nodes[i * 4 + 3];

                // Update position
                x += vx;
                y += vy;

                // Bounce
                if (x < 0 || x > width) vx *= -1;
                if (y < 0 || y > height) vy *= -1;

                // Store back
                nodes[i * 4] = x;
                nodes[i * 4 + 1] = y;
                nodes[i * 4 + 2] = vx;
                nodes[i * 4 + 3] = vy;

                // Draw Node
                ctx.beginPath();
                ctx.arc(x, y, 1.5, 0, 6.28); // 2*PI approx
                ctx.fill();

                // Connect (Optimized O(N^2/2) loop with early break)
                for (let j = i + 1; j < nodeCount; j++) {
                    const x2 = nodes[j * 4];
                    const y2 = nodes[j * 4 + 1];
                    
                    const dx = x - x2;
                    // Optimization: Check x-distance first to avoid expensive sqrt
                    if (dx > 150 || dx < -150) continue;

                    const dy = y - y2;
                    if (dy > 150 || dy < -150) continue;

                    const distSq = dx * dx + dy * dy;
                    if (distSq < 22500) { // 150^2
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x2, y2);
                        // Approximate opacity
                        ctx.globalAlpha = 1 - (distSq / 22500); 
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }

            animationId = requestAnimationFrame(draw);
        };

        if (isInView) {
            isRunning = true;
            draw();
        } else {
            isRunning = false;
        }

        const handleResize = () => {
             width = bgCanvas.width = window.innerWidth;
             height = bgCanvas.height = window.innerHeight;
        };
        
        // Passive event listener for scroll perf
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
            isRunning = false;
        }

    }, [isInView]);

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none opacity-40 will-change-transform">
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
}
