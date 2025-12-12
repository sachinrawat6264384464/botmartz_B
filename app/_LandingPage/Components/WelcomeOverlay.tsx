"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  onEnter: () => void;
}

export default function WelcomeOverlay({ onEnter }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-black/50 via-[#011C40]/30 to-black/50 backdrop-blur-sm"
      exit={{ 
        opacity: 0,
        scale: 1.1,
        transition: { duration: 1, ease: "easeInOut" } 
      }}
    >
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(#54ACBF 1px, transparent 1px),
            linear-gradient(90deg, #54ACBF 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative text-center z-10">
        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <motion.h3 
            className="text-[#A7EBF2] tracking-[0.5em] text-xs font-bold mb-2 flex items-center justify-center gap-3"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.span
              className="w-2 h-2 bg-[#A7EBF2] rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            SYSTEM STANDBY
            <motion.span
              className="w-2 h-2 bg-[#A7EBF2] rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.75
              }}
            />
          </motion.h3>
          
          <motion.div 
            className="flex items-center justify-center gap-2 text-[#54ACBF] text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span>NEURAL CORE</span>
            <span className="text-[#A7EBF2]">●</span>
            <span>ONLINE</span>
          </motion.div>
        </motion.div>

        {/* Logo */}
        <motion.h1 
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-widest mb-12 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#A7EBF2] to-white"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ backgroundSize: "200% 200%" }}
          >
            BOTMARTZ
          </motion.span>
          
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 text-[#A7EBF2] blur-2xl -z-10"
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            BOTMARTZ
          </motion.div>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-[#54ACBF] text-sm md:text-base mb-12 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          NEXT-GENERATION AUTOMATION INTELLIGENCE
        </motion.p>
        
        {/* Initialize Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            onClick={onEnter}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative px-12 py-5 bg-transparent border-2 border-[#54ACBF] overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#A7EBF2] via-[#54ACBF] to-[#A7EBF2]"
              initial={{ x: "-100%", opacity: 0.2 }}
              animate={isHovered ? { 
                x: "100%",
                transition: { duration: 0.6, ease: "easeInOut" }
              } : {}}
            />
            
            {/* Button content */}
            <span className="relative font-bold tracking-[0.3em] text-[#A7EBF2] group-hover:text-white transition-colors duration-300 flex items-center gap-3">
              <motion.span
                animate={isHovered ? { rotate: 360 } : {}}
                transition={{ duration: 0.6 }}
              >
                ⚡
              </motion.span>
              INITIALIZE
              <motion.span
                animate={isHovered ? { x: 5 } : { x: 0 }}
                transition={{ duration: 0.3 }}
              >
                →
              </motion.span>
            </span>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#A7EBF2] group-hover:w-4 group-hover:h-4 transition-all duration-300" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#A7EBF2] group-hover:w-4 group-hover:h-4 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#A7EBF2] group-hover:w-4 group-hover:h-4 transition-all duration-300" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#A7EBF2] group-hover:w-4 group-hover:h-4 transition-all duration-300" />
          </motion.button>

          {/* Hint text */}
          <motion.p
            className="text-[#54ACBF] text-xs mt-6 tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 2, duration: 2, repeat: Infinity }}
          >
            CLICK TO BEGIN EXPERIENCE
          </motion.p>
        </motion.div>
      </div>

      {/* Animated corner brackets */}
      <motion.div
        className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-[#A7EBF2]/50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      />
      <motion.div
        className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-[#A7EBF2]/50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1 }}
      />
      <motion.div
        className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-[#A7EBF2]/50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-[#A7EBF2]/50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3 }}
      />

      {/* Floating tech lines */}
      <motion.div
        className="absolute left-0 top-1/2 w-32 h-px bg-gradient-to-r from-transparent to-[#54ACBF]"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      />
      <motion.div
        className="absolute right-0 top-1/2 w-32 h-px bg-gradient-to-l from-transparent to-[#54ACBF]"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      />

      {/* Scanning line effect */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A7EBF2] to-transparent"
        initial={{ top: "0%" }}
        animate={{ top: "100%" }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          delay: 2
        }}
      />
    </motion.div>
  );
}