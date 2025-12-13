"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onLoadComplete?: () => void;
}

export default function Preloader({ onLoadComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState("Initializing");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let mounted = true;
    const stages = [
      { name: "Loading resources", progress: 20 },
      { name: "Preparing components", progress: 40 },
      { name: "Building interface", progress: 60 },
      { name: "Optimizing experience", progress: 80 },
      { name: "Finalizing", progress: 95 },
    ];
    let currentStage = 0;

    // Start with initial stage
    setLoadingStage(stages[0].name);

    // Check if document is already loaded
    const checkReadyState = () => {
      if (document.readyState === "complete") {
        return true;
      }
      return false;
    };

    // Progress through stages
    const progressInterval = setInterval(() => {
      if (!mounted) return;

      setProgress((prev) => {
        const next = prev + Math.random() * 8;
        
        // Update stage based on progress
        for (let i = stages.length - 1; i >= 0; i--) {
          if (next >= stages[i].progress && currentStage < i + 1) {
            currentStage = i + 1;
            if (stages[i]) {
              setLoadingStage(stages[i].name);
            }
          }
        }

        // Don't go past 95% until everything is loaded
        if (next >= 95 && !checkReadyState()) {
          return Math.min(prev + 0.5, 95);
        }

        if (next >= 100) {
          clearInterval(progressInterval);
          return 100;
        }

        return Math.min(next, 100);
      });
    }, 80);

    // Wait for window load event
    const handleLoad = () => {
      if (!mounted) return;
      
      // Force progress to 95 if not there yet
      setProgress((prev) => Math.max(prev, 95));
      
      // Small delay to ensure all components are hydrated
      setTimeout(() => {
        if (!mounted) return;
        
        setProgress(100);
        setLoadingStage("Complete");
        
        // Wait a bit before completing
        setTimeout(() => {
          if (!mounted) return;
          setIsComplete(true);
          setTimeout(() => {
            onLoadComplete?.();
          }, 500);
        }, 400);
      }, 300);
    };

    // Check if already loaded
    if (checkReadyState()) {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    // Fallback timeout (max 8 seconds)
    const fallbackTimeout = setTimeout(() => {
      if (!mounted) return;
      console.log("Fallback timeout triggered");
      handleLoad();
    }, 8000);

    return () => {
      mounted = false;
      clearInterval(progressInterval);
      clearTimeout(fallbackTimeout);
      window.removeEventListener("load", handleLoad);
    };
  }, [onLoadComplete]);

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505]"
        >
          {/* Animated Background Gradient */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mb-12 z-10"
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-white/20 blur-[80px] rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Logo */}
            <div className="relative w-[220px] h-[95px] md:w-[320px] md:h-[140px]">
              <Image
                src="/Botmartz_silver.png"
                alt="Botmartz Logo"
                fill
                className="object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.6)]"
                priority
              />
            </div>
          </motion.div>

          {/* Progress Section */}
          <div className="w-72 md:w-96 space-y-4 z-10">
            {/* Progress Bar Container */}
            <div className="relative h-1 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
              {/* Progress Fill */}
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-white via-gray-200 to-white rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>

            {/* Progress Text */}
            <div className="flex items-center justify-between">
              <motion.p
                key={loadingStage}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-white/50 text-sm font-mono tracking-wider"
              >
                {loadingStage}
              </motion.p>
              <motion.span
                className="text-white/70 text-sm font-mono font-bold tabular-nums"
                key={Math.floor(progress)}
              >
                {Math.floor(progress)}%
              </motion.span>
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