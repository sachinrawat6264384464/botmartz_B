"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-white text-[#0B1C2C] pt-20">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#0066FF]/[0.03] blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#0B1C2C]/[0.03] blur-[120px] rounded-full" />
        
        {/* Animated Particles / Network (Simple Representation) */}
        {mounted && (
          <svg className="absolute inset-0 w-full h-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="#0066FF" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridPattern)" />
          </svg>
        )}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 flex justify-center"
          >
            <span className="inline-flex items-center rounded-full bg-[#F1F5F9] px-4 py-1.5 text-xs font-semibold tracking-widest text-[#0066FF] uppercase border border-[#E2E8F0]">
              Botmartz AI Solutions Presents
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-[clamp(40px,7vw,80px)] font-bold tracking-tighter leading-[1.05] text-transparent bg-clip-text bg-gradient-to-br from-[#0B1C2C] via-[#1E293B] to-[#0066FF] mb-6"
          >
            AI ACCELERATOR <br />
            <span className="text-[#0B1C2C]">WORKSHOP SERIES</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-[18px] md:text-[22px] text-[#475569] leading-relaxed max-w-3xl mx-auto font-medium mb-10"
          >
            The official runway to <Link href="/community/events/ai-frontier-2026" className="text-[#0066FF] font-bold hover:underline">AI Frontier 2026</Link>. Build production-ready AI applications through three live, hands-on engineering bootcamps leading up to our free, in-person main event.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="#bootcamps"
              className="group flex items-center justify-center gap-2 bg-[#0066FF] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#0052CC] transition-all w-full sm:w-auto shadow-[0_4px_20px_rgba(0,102,255,0.25)] hover:shadow-[0_4px_25px_rgba(0,102,255,0.4)] hover:-translate-y-0.5"
            >
              Register Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#bootcamps"
              className="flex items-center justify-center gap-2 bg-white text-[#0B1C2C] border border-[#E2E8F0] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#F8FAFC] transition-all w-full sm:w-auto hover:-translate-y-0.5"
            >
              View Bootcamps
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:flex flex-col items-center gap-2 text-[#94A3B8]">
        <span className="text-xs font-semibold tracking-widest uppercase">Scroll to explore</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
}
