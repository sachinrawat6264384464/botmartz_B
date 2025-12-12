"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function FooterTerminal() {
  const [lines] = useState([
      "> SYSTEM STATUS: OPTIMAL",
      "> NEURAL NETWORKS: ACTIVE",
      "> READY FOR NEW PARAMETERS...",
  ]);

  return (
      <footer className="bg-black py-24 px-6 md:px-12 border-t border-white/10 font-mono text-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
          
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
              <div>
                  <div className="h-48 bg-[#050505] border border-white/10 p-6 rounded-lg overflow-hidden relative shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)]">
                      <div className="absolute top-4 right-4 flex gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500/50" />
                          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                          <div className="w-2 h-2 rounded-full bg-green-500/50" />
                      </div>
                      <div className="space-y-2 text-[#D4AF37]/80 font-mono text-xs">
                          {lines.map((line, i) => (
                              <p key={i} className="typing-effect">{line}</p>
                          ))}
                          <span className="animate-pulse">_</span>
                      </div>
                  </div>
              </div>
              
              <div className="flex flex-col justify-between">
                  <div>
                      <h3 className="text-4xl md:text-6xl font-bold text-white mb-6">INITIATE <br/> PROTOCOL.</h3>
                      <a href="mailto:contact@botmartz.com" className="text-xl text-[#D4AF37] hover:text-white transition-colors flex items-center gap-2 group">
                          contact@botmartz.com
                          <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                      </a>
                  </div>
                  <div className="flex gap-8 mt-12 text-gray-500 text-xs tracking-widest uppercase">
                      <a href="#" className="hover:text-[#D4AF37] transition-colors">LinkedIn</a>
                      <a href="#" className="hover:text-[#D4AF37] transition-colors">Twitter</a>
                      <a href="#" className="hover:text-[#D4AF37] transition-colors">Instagram</a>
                  </div>
                  <p className="mt-8 text-[10px] text-gray-700">
                      © 2025 BOTMARTZ SOLUTIONS. ARCHITECTING THE FUTURE.
                  </p>
              </div>
          </div>
      </footer>
  );
}