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
  const [statusText, setStatusText] = useState("Initializing System");

  useEffect(() => {
    let isMounted = true;
    let finished = false;
    // Target 800ms total — fast enough not to hurt LCP significantly
    const steps = 40;
    const stepTime = 800 / steps;
    let currentProgress = 0;

    const finishLoading = () => {
      if (finished || !isMounted) return;
      finished = true;
      clearInterval(counterInterval);
      clearTimeout(safetyTimer);
      setProgress(100);
      setStatusText("Ready");
      setIsComplete(true);
      setTimeout(() => {
        if (isMounted) onLoadComplete?.();
      }, 300);
    };

    const counterInterval = setInterval(() => {
      if (!isMounted) return;
      currentProgress += 100 / steps + (Math.random() * 2 - 1);
      setProgress(Math.min(Math.floor(currentProgress), 99));
      if (currentProgress >= 99) finishLoading();
    }, stepTime);

    // Hard cap: always finish within 1.5 seconds
    const safetyTimer = setTimeout(finishLoading, 1500);

    return () => {
      isMounted = false;
      clearInterval(counterInterval);
      clearTimeout(safetyTimer);
    };
  }, [onLoadComplete]);

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
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
                quality={75}
                sizes="(max-width: 768px) 220px, 300px"
              />
            </div>
          </motion.div>

          {/* Progress Bar Container */}
          <div className="w-72 md:w-96 space-y-4 z-10">
            <div className="relative h-1 bg-white/5 rounded-full overflow-hidden border border-white/10">
              {/* CSS TRANSITION BAR for smoothness */}
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-white via-gray-200 to-white rounded-full transition-all ease-out"
                style={{ 
                    width: `${progress}%`,
                    transitionDuration: '300ms' // Smooth css interpolation
                }}
              >
                {/* Shimmer Overlay */}
                <div className="absolute inset-0 w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              </div>
            </div>

            {/* Progress Info */}
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white/50 animate-pulse">
                {statusText}
              </span>
              <span className="text-white/70 tabular-nums font-bold">
                {Math.floor(progress)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}