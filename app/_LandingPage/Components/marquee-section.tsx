"use client";
import { memo, useMemo } from "react";
import { motion } from "framer-motion";

// Static content to prevent recreation
const MarqueeContent = memo(() => (
  <>
    <span>Automation</span>
    <span className="text-[#D4AF37]">•</span>
    <span>Intelligence</span>
    <span className="text-[#D4AF37]">•</span>
    <span>Scale</span>
    <span className="text-[#D4AF37]">•</span>
  </>
));

MarqueeContent.displayName = 'MarqueeContent';

export default memo(function MarqueeSection() {
  // Memoize the repeated content array - more repetitions for mobile
  const repeatedContent = useMemo(() => 
    Array.from({ length: 6 }, (_, i) => i), 
    []
  );

  return (
    <div className="py-8 md:py-12 border-y border-white/5 bg-[#080808] overflow-hidden flex relative z-20">
      {/* Gradient overlay - stronger on mobile for cleaner edges */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] z-10 pointer-events-none" />
      
      {/* Marquee content - responsive sizing and spacing */}
      <motion.div 
        className="flex gap-8 md:gap-16 whitespace-nowrap text-[#333] font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          duration: 25, // Slightly slower for better mobile readability
          repeat: Infinity, 
          ease: "linear",
          repeatType: "loop"
        }}
      >
        {repeatedContent.map((i) => (
          <MarqueeContent key={i} />
        ))}
      </motion.div>
    </div>
  );
});