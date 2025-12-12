"use client";
import { motion } from "framer-motion";

export default function HeroOverlay() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(167, 235, 242, 0.3)",
        "0 0 40px rgba(167, 235, 242, 0.6)",
        "0 0 20px rgba(167, 235, 242, 0.3)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section 
      className="absolute inset-0 z-10 flex items-center justify-end px-6 md:px-24 pointer-events-none"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="max-w-2xl w-full pointer-events-auto relative"
        variants={itemVariants}
      >
        {/* Animated border glow */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-[#A7EBF2] via-[#54ACBF] to-[#26658C] rounded-lg opacity-20 blur-xl"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="relative bg-[#011C40]/80 backdrop-blur-xl border-l-4 border-[#A7EBF2] p-8 md:p-12 rounded-r-lg overflow-hidden"
          variants={glowVariants}
          animate="animate"
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(45deg, #54ACBF 25%, transparent 25%), 
                               linear-gradient(-45deg, #54ACBF 25%, transparent 25%), 
                               linear-gradient(45deg, transparent 75%, #54ACBF 75%), 
                               linear-gradient(-45deg, transparent 75%, #54ACBF 75%)`,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
            }} />
          </div>

          <motion.div variants={itemVariants}>
            <motion.h5 
              className="text-[#54ACBF] tracking-[0.3em] font-bold mb-4 text-xs md:text-sm flex items-center gap-2"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="w-2 h-2 bg-[#A7EBF2] rounded-full animate-pulse" />
              AUTOMATION INFRASTRUCTURE
              <span className="w-2 h-2 bg-[#A7EBF2] rounded-full animate-pulse" />
            </motion.h5>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            variants={itemVariants}
          >
            <motion.span 
              className="block text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              BOTMARTZ
            </motion.span>
            <motion.span 
              className="block text-transparent bg-clip-text bg-gradient-to-r from-[#A7EBF2] via-[#54ACBF] to-[#26658C]"
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ 
                delay: 0.7, 
                duration: 0.8,
                backgroundPosition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              IT SOLUTIONS
            </motion.span>
          </motion.h1>

          <motion.p 
            className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 max-w-xl"
            variants={itemVariants}
          >
            We architect the neural pathways of modern industry. From advanced robotics to cognitive AI systems, 
            <span className="text-[#A7EBF2] font-semibold"> Botmartz </span> 
            defines the next era of automation.
          </motion.p>

          <motion.div 
            className="flex flex-wrap gap-4"
            variants={itemVariants}
          >
            <motion.button
              className="group relative px-8 py-4 bg-[#A7EBF2] text-[#011C40] font-bold overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 tracking-wider">OUR SOLUTIONS</span>
              <motion.span
                className="absolute right-4 top-1/2 -translate-y-1/2"
                initial={{ x: -5, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
              >
                →
              </motion.span>
            </motion.button>

            <motion.button
              className="group relative px-8 py-4 border-2 border-[#54ACBF] text-[#A7EBF2] font-bold overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-[#54ACBF]"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 tracking-wider">CONTACT SALES</span>
            </motion.button>
          </motion.div>

          {/* Stats or features */}
          <motion.div 
            className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-[#54ACBF]/30"
            variants={containerVariants}
          >
            {[
              { value: "500+", label: "Deployments" },
              { value: "99.9%", label: "Uptime" },
              { value: "24/7", label: "Support" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="text-center"
              >
                <motion.div 
                  className="text-2xl md:text-3xl font-bold text-[#A7EBF2]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + i * 0.1, type: "spring" }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs md:text-sm text-gray-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#A7EBF2] rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 20,
              opacity: 0
            }}
            animate={{
              y: -20,
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </motion.section>
  );
}