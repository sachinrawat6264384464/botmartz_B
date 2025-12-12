"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  onEnter: () => void;
}

export default function WelcomeOverlay({ onEnter }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const PRIMARY = "#54ACBF";

  return (
    <motion.div 
      className="absolute inset-0 z-50 flex flex-col items-center justify-center"
      exit={{ opacity: 0, transition: { duration: 0.5 } }} 
    >
      <div className="relative z-50 text-center">
        
        {/* Status */}
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 text-xs font-mono tracking-[0.3em] mb-12"
            style={{ color: PRIMARY }}
        >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: PRIMARY }}></span>
            SYSTEM ONLINE
        </motion.div>

        {/* Big Interactive Button */}
        <motion.button
            onClick={onEnter}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="group relative px-16 py-6 bg-transparent overflow-hidden transition-all duration-300"
            style={{ border: `1px solid ${PRIMARY}` }}
        >
            {/* Fill Effect */}
            <div 
              className="absolute inset-0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" 
              style={{ backgroundColor: PRIMARY }}
            />
            
            <span className="relative flex items-center gap-4 text-base font-bold tracking-widest transition-colors duration-300 group-hover:text-[#011C40]" style={{ color: PRIMARY }}>
                <span>INITIALIZE EXPERIENCE</span>
                <svg 
                    className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </span>
        </motion.button>
      </div>
    </motion.div>
  );
}