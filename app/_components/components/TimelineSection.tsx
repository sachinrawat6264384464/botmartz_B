// components/TimelineSection.tsx
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Inter_Tight, JetBrains_Mono, Oswald } from 'next/font/google';

const inter = Inter_Tight({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'] });
const oswald = Oswald({ subsets: ['latin'], weight: ['700'] });

export const TimelineSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  const EVENTS = [
    { year: "2023", title: "Protocol Genesis", desc: "Botmartz initialized to disrupt static web practices." },
    { year: "2024", title: "The 404 Syndicate", desc: "Formation of an elite developer collective." },
    { year: "2024", title: "Scale Velocity", desc: "Deployed first enterprise-grade ERP automation." },
    { year: "2025", title: "Global Nexus", desc: "Establishing nodes in international markets." },
    { year: "FUTURE", title: "Singularity", desc: "Development of self-healing UI architectures." },
  ];

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#050505]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        <div className="absolute top-12 left-12 z-20">
          <h3 className={`${oswald.className} text-4xl text-white uppercase`}>Timeline</h3>
          <p className={`${mono.className} text-xs text-[#00E5FF]`}>SCROLL_TO_NAVIGATE</p>
        </div>

        <motion.div style={{ x }} className="flex gap-0 pl-[20vw]">
          {EVENTS.map((event, i) => (
            <div key={i} className="w-[60vw] md:w-[40vw] h-[60vh] flex flex-col justify-center border-l border-white/10 pl-12 relative group hover:bg-white/5 transition-colors duration-500">
              <span className={`${oswald.className} text-[8rem] md:text-[12rem] text-white/5 absolute top-0 left-4 -z-10 group-hover:text-white/10 transition-colors`}>
                {event.year}
              </span>
              
              <div className="relative">
                <div className="w-4 h-4 bg-[#00E5FF] rounded-full mb-8 shadow-[0_0_20px_#00E5FF]" />
                <h4 className={`${inter.className} text-3xl md:text-5xl font-bold text-white mb-4`}>
                  {event.title}
                </h4>
                <p className={`${mono.className} text-gray-400 max-w-md`}>
                  {event.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};