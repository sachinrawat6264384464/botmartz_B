"use client";
import React from "react";
import { motion } from "framer-motion";

export function MarqueeSection() {
    return (
        <div className="py-12 border-y border-white/5 bg-[#080808] overflow-hidden flex relative z-20">
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] z-10" />
            <motion.div 
                className="flex gap-16 whitespace-nowrap text-[#333] font-bold text-6xl uppercase tracking-tighter"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                {[...Array(4)].map((_, i) => (
                    <React.Fragment key={i}>
                        <span>Automation</span>
                        <span className="text-[#D4AF37]">•</span>
                        <span>Intelligence</span>
                        <span className="text-[#D4AF37]">•</span>
                        <span>Scale</span>
                        <span className="text-[#D4AF37]">•</span>
                    </React.Fragment>
                ))}
            </motion.div>
        </div>
    )
}