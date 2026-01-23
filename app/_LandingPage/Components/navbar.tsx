"use client";
import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

// Simplified MagneticButton for demo
function MagneticButton({ children, className = "", onClick }: any) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="fixed top-6 left-0 right-0 flex justify-center z-50 px-4">
        <motion.nav
          variants={{
            visible: { y: 0, opacity: 1 },
            hidden: { y: -100, opacity: 0 },
          }}
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="w-full max-w-6xl flex justify-between items-center px-6 py-4 rounded-full bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.8)] relative overflow-hidden"
        >
          
          {/* Animated Silver Flash Border */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="silver-flash" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="40%" stopColor="rgba(192,192,192,0.3)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.9)" />
                <stop offset="60%" stopColor="rgba(192,192,192,0.3)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              rx="9999"
              fill="none"
              stroke="url(#silver-flash)"
              strokeWidth="2"
              strokeDasharray="200 800"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="1000"
                to="0"
                dur="4s"
                repeatCount="indefinite"
              />
            </rect>
          </svg>
          
          {/* Base border */}
          <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none" />
          
          {/* 1. LOGO + BOTMARTZ TEXT */}
          <div className="relative flex items-center gap-3 cursor-pointer group z-10">
             <div className="relative h-8 w-8">
               <img
                  src="/botmartz_silver_bg_free.png"
                  alt="Botmartz"
                  className="h-full w-full object-contain group-hover:brightness-125 transition-all drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
               />
             </div>
             <span className="text-xl font-black tracking-tight text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] transition-all">
               BOTMARTZ
             </span>
          </div>

          {/* 2. CENTER LINKS - Desktop Only */}
          <div className="hidden md:flex items-center gap-10">
            {['Services', 'Work', 'About', 'Contact'].map((item) => (
              <MagneticButton key={item} className="text-xs font-bold tracking-widest uppercase text-gray-300 hover:text-white transition-colors cursor-pointer relative group">
                {item}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_10px_#D4AF37]" />
              </MagneticButton>
            ))}
          </div>

          {/* 3. CTA BUTTON - Desktop Only */}
          <div className="hidden md:flex items-center gap-6">


             <MagneticButton className="group relative px-6 py-2.5 bg-[#D4AF37] text-black text-[11px] font-bold tracking-widest uppercase rounded-full overflow-hidden hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-shadow duration-300">
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <div className="relative flex items-center gap-2">
                    <span>Initialize</span>
                    <ArrowRight className="w-3 h-3 group-hover:-rotate-45 transition-transform duration-300" />
                </div>
             </MagneticButton>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-white hover:text-[#D4AF37] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

        </motion.nav>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-[#0A0A0A]/95 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col"
            >
              {/* Close Button */}
              <div className="flex justify-end p-6">
                <button
                  onClick={closeMobileMenu}
                  className="text-white hover:text-[#D4AF37] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Menu Items */}
              <nav className="flex flex-col gap-2 px-6 py-4">
                {['Services', 'Work', 'About', 'Contact'].map((item, index) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={closeMobileMenu}
                    className="text-left py-4 px-4 text-lg font-bold tracking-wide uppercase text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all border-b border-white/5"
                  >
                    {item}
                  </motion.button>
                ))}
              </nav>

              {/* Mobile CTA Buttons */}
              <div className="mt-auto p-6 space-y-4">
                

                <button 
                  onClick={closeMobileMenu}
                  className="w-full py-3 bg-[#D4AF37] text-black text-sm font-bold tracking-widest uppercase rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-shadow duration-300 flex items-center justify-center gap-2"
                >
                  <span>Initialize</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}