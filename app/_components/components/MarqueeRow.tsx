// components/MarqueeRow.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface MarqueeRowProps {
  images: string[];
  duration?: number;
  reverse?: boolean;
}

export const MarqueeRow: React.FC<MarqueeRowProps> = ({ 
  images, 
  duration = 60, 
  reverse = false 
}) => {
  return (
    <div className="flex overflow-hidden w-full relative group pointer-events-none">
      <motion.div
        initial={{ x: reverse ? "-50%" : "0%" }}
        animate={{ x: reverse ? "0%" : "-50%" }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
        className="flex gap-6 px-4 w-max will-change-transform"
      >
        {/* Quadruple images to ensure gapless loop - MATCHING YOUR WORKING CODE */}
        {[...images, ...images, ...images, ...images].map((img, i) => (
          <div 
            key={`${img}-${i}`}
            className="relative w-[280px] md:w-[360px] aspect-[16/9] rounded-lg overflow-hidden border border-white/20 bg-white/5"
          >
            <Image
              src={`/projects/${img}`}
              alt={`Project ${img}`}
              fill
              className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Optional: Add project name label like in reference */}
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10">
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                {img.replace('.png', '').replace(/%20/g, ' ')}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};