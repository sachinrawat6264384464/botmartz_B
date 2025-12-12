"use client"

import React, { useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"

interface LocationMapProps {
  location?: string
  coordinates?: string
  className?: string
}

export function LocationMap({
  location = "Indore, India",
  coordinates = "22.7196° N, 75.8577° E",
  className,
}: LocationMapProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-50, 50], [8, -8])
  const rotateY = useTransform(mouseX, [-50, 50], [-8, 8])

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const handleClick = () => {
    setIsExpanded(!isExpanded)
  }

  // Industrial Orange Theme
  const ACCENT = "#FF5500"

  return (
    <motion.div
      ref={containerRef}
      className={`relative cursor-pointer select-none ${className}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.div
        className="relative overflow-hidden rounded-xl bg-[#0A0A0A] border border-white/10"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          width: "100%", // Responsive width
          height: isExpanded ? 320 : 160,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="absolute inset-0 bg-[#050505]" />

              {/* MAP VISUALS (Industrial Grid Style) */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                {/* Horizontal Grid Lines */}
                {[20, 50, 80].map((y, i) => (
                  <motion.line
                    key={`h-${i}`}
                    x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`}
                    className="stroke-white/10" strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  />
                ))}
                {/* Vertical Grid Lines */}
                {[20, 40, 60, 80].map((x, i) => (
                  <motion.line
                    key={`v-${i}`}
                    x1={`${x}%`} y1="0%" x2={`${x}%`} y2="100%"
                    className="stroke-white/10" strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  />
                ))}

                {/* Simulated "Buildings" / Data Blocks */}
                <motion.rect x="30%" y="30%" width="15%" height="20%" fill="white" fillOpacity="0.05" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} />
                <motion.rect x="60%" y="50%" width="10%" height="15%" fill="white" fillOpacity="0.03" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} />
                
                {/* Location Marker (Indore) */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0, y: -20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.3 }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ filter: `drop-shadow(0 0 15px ${ACCENT})` }}>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill={ACCENT} />
                    <circle cx="12" cy="9" r="2.5" fill="#000" />
                  </svg>
                </motion.div>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-[0.05]"
          animate={{ opacity: isExpanded ? 0 : 0.05 }}
        >
          <svg width="100%" height="100%">
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </motion.div>

        {/* CARD CONTENT */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6">
          
          {/* Top Bar */}
          <div className="flex items-start justify-between">
            {/* Animated Icon */}
            <motion.div
              animate={{ opacity: isExpanded ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="p-2 bg-white/5 rounded-lg border border-white/5"
            >
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                  <line x1="9" x2="9" y1="3" y2="18" />
                  <line x1="15" x2="15" y1="6" y2="21" />
               </svg>
            </motion.div>

            {/* Live Indicator */}
            <motion.div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/5"
              animate={{
                backgroundColor: isHovered ? "rgba(255, 85, 0, 0.15)" : "rgba(255, 255, 255, 0.05)",
                borderColor: isHovered ? "rgba(255, 85, 0, 0.3)" : "rgba(255, 255, 255, 0.05)"
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} />
              <span className="text-[10px] font-bold text-gray-300 tracking-wider uppercase">HQ_LIVE</span>
            </motion.div>
          </div>

          {/* Bottom Info */}
          <div>
            <motion.h3
              className="text-white font-bold text-lg tracking-wide uppercase"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {location}
            </motion.h3>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                    <p className="text-gray-500 text-xs font-mono mt-1 mb-2">{coordinates}</p>
                    <div className="flex gap-4 text-[10px] text-gray-400 font-mono">
                        <span>LAT: 12ms</span>
                        <span>SECURE: YES</span>
                    </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Orange Progress Bar */}
            <motion.div
              className="h-[2px] mt-3"
              style={{ background: `linear-gradient(90deg, ${ACCENT} 0%, transparent 100%)` }}
              initial={{ scaleX: 0.2, originX: 0 }}
              animate={{ scaleX: isHovered || isExpanded ? 1 : 0.2 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Hover Hint */}
        <motion.p
           className="absolute bottom-6 right-6 text-[9px] text-gray-600 font-mono uppercase tracking-widest"
           initial={{ opacity: 0 }}
           animate={{ opacity: isHovered && !isExpanded ? 1 : 0 }}
        >
           [ Click to Expand ]
        </motion.p>
      </motion.div>
    </motion.div>
  )
}