"use client";
import { motion } from "framer-motion";
import { MagneticButton } from "../ui/magnetic-button";

export function FinalCTA() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black">
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#D4AF37]/10 via-black to-black opacity-50" />
       <div className="relative z-10 text-center px-6">
         <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
         >
           <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 mix-blend-difference text-white">
             READY TO <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] to-transparent">TRANSCEND?</span>
           </h2>
           <p className="max-w-xl mx-auto text-gray-500 mb-10 text-lg">
             The future doesn't wait for permission. Initialize your transformation today.
           </p>
           <div className="flex justify-center">
             <MagneticButton className="px-10 py-4 bg-white text-black font-bold tracking-widest uppercase rounded-full hover:bg-[#D4AF37] hover:scale-110 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                Begin Sequence
             </MagneticButton>
           </div>
         </motion.div>
       </div>
    </section>
  );
}