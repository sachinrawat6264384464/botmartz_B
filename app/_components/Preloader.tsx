"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onLoadComplete?: () => void;
}

export default function Preloader({ onLoadComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let mounted = true;
    let animationFrameId: number;
    const startTime = Date.now();
    const targetDuration = 2000; // 2 seconds smooth animation
    let heroReady = false;

    // Listen for hero section ready signal
    const checkHeroReady = () => {
      const heroElement = document.querySelector('[data-hero-loaded="true"]');
      if (heroElement) {
        heroReady = true;
      }
    };

    // Observer to watch for hero ready attribute
    const observer = new MutationObserver(() => {
      checkHeroReady();
    });

    // Start observing the document body for attribute changes
    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ['data-hero-loaded']
    });

    // Smooth progress animation
    const animate = () => {
      if (!mounted) return;

      const elapsed = Date.now() - startTime;
      checkHeroReady();
      
      // Calculate target based on time (0 to 95 over targetDuration)
      const timeProgress = Math.min(95, (elapsed / targetDuration) * 100);
      
      setProgress((prev) => {
        // Smooth easing towards target
        const next = prev + (timeProgress - prev) * 0.15;
        
        // If hero is ready and we're past 85%, complete
        if (heroReady && next >= 85) {
          observer.disconnect();
          setIsComplete(true);
          setTimeout(() => {
            onLoadComplete?.();
          }, 300);
          return 100;
        }
        
        // Keep animating
        if (!isComplete) {
          animationFrameId = requestAnimationFrame(animate);
        }
        
        return next;
      });
    };

    // Start animation immediately
    animationFrameId = requestAnimationFrame(animate);

    // Fallback: force complete after 3.5 seconds
    const fallbackTimeout = setTimeout(() => {
      if (mounted && !isComplete) {
        observer.disconnect();
        setProgress(100);
        setIsComplete(true);
        setTimeout(() => {
          onLoadComplete?.();
        }, 300);
      }
    }, 3500);

    return () => {
      mounted = false;
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      clearTimeout(fallbackTimeout);
    };
  }, [onLoadComplete, isComplete]);

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505]"
        >
          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative mb-10 z-10"
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-white/20 blur-[70px] rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Logo */}
            <div className="relative w-[220px] h-[95px] md:w-[300px] md:h-[130px]">
              <Image
  src="/Botmartz_silver.png"
  alt="Botmartz Logo"
  fill
  className="object-contain drop-shadow-[0_0_35px_rgba(255,255,255,0.6)]"
  priority
  quality={70} // Add this
  sizes="(max-width: 768px) 220px, 300px" // Add this
/>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-72 md:w-96 space-y-4 z-10">
            <div className="relative h-1 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-white via-gray-200 to-white rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              >
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>

            {/* Progress Info */}
            <div className="flex items-center justify-between text-xs font-mono">
              <motion.span
                className="text-white/50"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Initializing Hero Section
              </motion.span>
              <span className="text-white/70 tabular-nums font-bold">
                {Math.floor(progress)}%
              </span>
            </div>
          </div>

          {/* Animated Dots */}
          <div className="flex gap-2 mt-8 z-10">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-white/40 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}