// components/PhilosophyGrid.tsx
"use client";

import React from "react";
import { Cpu, Terminal, Zap } from "lucide-react";
import { Oswald } from 'next/font/google';
import { ScrambleText } from "./ScrambleText";

const oswald = Oswald({ subsets: ['latin'], weight: ['700'] });

export const PhilosophyGrid = () => {
  return (
    <section className="py-32 px-6 bg-[#030303] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className={`${oswald.className} text-5xl md:text-7xl text-white uppercase`}>Core <span className="text-[#FF5500]">Kernel</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-[120vh] md:h-[80vh]">
          
          {/* Card 1: Large Left */}
          <div className="md:col-span-2 md:row-span-2 relative bg-[#0A0A0A] border border-white/10 p-10 group overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <Cpu className="text-white mb-8 group-hover:rotate-90 transition-transform duration-700" size={48} />
            <h3 className="text-4xl font-bold text-white mb-4">Neural Architecture</h3>
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
              We treat web development as biological engineering. Every div, every function, and every API call is part of a living organism that must breathe, adapt, and scale without friction.
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#00E5FF] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
          </div>

          {/* Card 2: Top Right */}
          <div className="relative bg-[#0A0A0A] border border-white/10 p-8 group overflow-hidden flex flex-col justify-between">
             <div className="absolute top-0 right-0 p-4 opacity-20">
                <Terminal size={100} />
             </div>
             <h3 className="text-2xl font-bold text-white z-10"><ScrambleText text="Clean Code" /></h3>
             <p className="text-gray-500 text-sm z-10">
               Minimal bloat. Maximum efficiency. We deprecate the unnecessary.
             </p>
          </div>

          {/* Card 3: Bottom Right */}
          <div className="relative bg-[#FF5500] p-8 group overflow-hidden flex flex-col justify-center items-center text-center cursor-pointer hover:bg-[#ff661a] transition-colors">
             <h3 className={`${oswald.className} text-5xl text-black uppercase`}>Velocity</h3>
             <p className="text-black/70 font-mono text-xs mt-2">SPEED IS A FEATURE</p>
             <Zap className="absolute -bottom-8 -right-8 text-black/20" size={120} />
          </div>

        </div>
      </div>
    </section>
  );
};