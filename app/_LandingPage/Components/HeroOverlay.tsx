"use client";
import { motion } from "framer-motion";

export default function HeroOverlay() {
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="absolute inset-0 z-10 flex flex-col justify-end pb-12 px-6 md:px-24 pointer-events-none">
      <motion.div 
        variants={containerVars}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl pointer-events-auto flex flex-col md:flex-row items-end justify-between gap-8"
      >
        {/* Left Side: Description & Buttons */}
        <div className="max-w-xl">
             <motion.div variants={itemVars} className="flex items-center gap-2 mb-4">
                <span className="w-8 h-[1px] bg-[#54ACBF]"></span>
                <span className="text-[#54ACBF] text-xs font-mono tracking-widest">READY FOR DEPLOYMENT</span>
            </motion.div>

            <motion.p variants={itemVars} className="text-gray-200 text-lg leading-relaxed mb-8">
                Empowering enterprises with next-generation robotics and cognitive automation.
            </motion.p>

            <motion.div variants={itemVars} className="flex flex-wrap gap-4">
                <button className="px-8 py-3 bg-[#54ACBF] text-[#011C40] font-bold text-sm tracking-wider hover:bg-white transition-colors">
                    OUR SOLUTIONS
                </button>
                <button className="px-8 py-3 border border-[#54ACBF] text-[#54ACBF] font-bold text-sm tracking-wider hover:bg-[#54ACBF]/10 transition-colors">
                    CONTACT SALES
                </button>
            </motion.div>
        </div>

        {/* Right Side: Stats (Glass Card) */}
        <motion.div 
            variants={itemVars}
            className="p-6 border border-[#54ACBF]/30 bg-[#011C40]/50 backdrop-blur-md rounded-sm min-w-[200px]"
        >
             <div className="flex flex-col gap-4">
                <div>
                    <h4 className="text-white font-bold text-2xl">99.9%</h4>
                    <span className="text-xs text-[#54ACBF] uppercase tracking-wider">Uptime Guaranteed</span>
                </div>
                <div className="w-full h-[1px] bg-[#54ACBF]/30" />
                <div>
                    <h4 className="text-white font-bold text-2xl">500+</h4>
                    <span className="text-xs text-[#54ACBF] uppercase tracking-wider">Automations Deployed</span>
                </div>
             </div>
        </motion.div>

      </motion.div>
    </section>
  );
}