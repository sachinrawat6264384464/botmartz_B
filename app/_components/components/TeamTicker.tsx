// work/components/TeamTicker.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Oswald } from 'next/font/google';

const oswald = Oswald({ subsets: ['latin'], weight: ['700'] });

export const TeamTicker = () => {
  return (
    <div className="py-20 bg-[#00E5FF] overflow-hidden -skew-y-2 border-y-4 border-black">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(20)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 mx-8">
            <span className={`${oswald.className} text-6xl md:text-8xl text-black font-bold uppercase`}>
              Botmartz Solutions
            </span>
            <div className="w-12 h-12 bg-black rounded-full" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};