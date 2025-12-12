"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { MagneticButton } from "../ui/magnetic-button";
import { ArrowRight, Menu } from "lucide-react";

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <div className="fixed top-6 left-0 right-0 flex justify-center z-50 px-4">
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        // STYLE: High-Opacity Dark Glass with a "Tech" Border
        className="w-full max-w-6xl flex justify-between items-center px-6 py-4 rounded-full bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
      >
        
        {/* 1. LOGO - Scaled Up & Brightened */}
        <div className="relative h-8 w-40 flex items-center cursor-pointer group">
           <Image
              src="/Botmartz_silver.png"
              alt="Botmartz"
              fill
              className="object-contain object-left group-hover:brightness-125 transition-all drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
              priority
           />
        </div>

        {/* 2. CENTER LINKS - Brighter Text */}
        <div className="hidden md:flex items-center gap-10">
          {['Services', 'Work', 'About', 'Contact'].map((item) => (
            <MagneticButton key={item} className="text-xs font-bold tracking-widest uppercase text-gray-300 hover:text-white transition-colors cursor-pointer relative group">
              {item}
              {/* Cyan Glow Dot */}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#00E5FF] opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_10px_#00E5FF]" />
            </MagneticButton>
          ))}
        </div>

        {/* 3. CTA BUTTON - High Contrast */}
        <div className="hidden md:flex items-center gap-6">
           <button className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
              Login
           </button>

           {/* Solid Cyan Button for Visibility */}
           <MagneticButton className="group relative px-6 py-2.5 bg-[#00E5FF] text-black text-[11px] font-bold tracking-widest uppercase rounded-full overflow-hidden hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] transition-shadow duration-300">
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <div className="relative flex items-center gap-2">
                  <span>Initialize</span>
                  <ArrowRight className="w-3 h-3 group-hover:-rotate-45 transition-transform duration-300" />
              </div>
           </MagneticButton>
        </div>

        {/* MOBILE MENU */}
        <button className="md:hidden text-white hover:text-[#00E5FF] transition-colors">
          <Menu className="w-6 h-6" />
        </button>

      </motion.nav>
    </div>
  );
}