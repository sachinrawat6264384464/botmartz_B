"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  PanInfo
} from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"

// --- YOUR PROJECT DATA ---
const PROJECTS = [
  { id: "lotus", title: "Lotus Herbals", url: "https://www.lotus.in/", tag: "E-commerce", result: "Premium Skincare", image: "/projects/lotus.png" },
  { id: "tesora", title: "Shop Tesora", url: "https://www.shoptesora.com/", tag: "Home & Living", result: "Luxury Appliances", image: "/projects/shopstesora.png" },
  { id: "decathlon", title: "Decathlon India", url: "https://www.decathlon.in/", tag: "Sports & Retail", result: "Athletic Excellence", image: "/projects/decathlon.png" },
  { id: "yashueprem", title: "Yashuprem", url: "https://yashueprem.com/", tag: "E-commerce", result: "Curated Fashion", image: "/projects/Yashuprem.png" },
  { id: "safari", title: "Safari Bags", url: "https://www.safaribags.com/", tag: "Retail", result: "Travel Essentials", image: "/projects/safari.png" },
  { id: "plix", title: "PlixLife", url: "https://plixlife.com/", tag: "Wellness", result: "Plant-based Nutrition", image: "/projects/plix.png" },
  { id: "anugami", title: "Anugami", url: "https://anugami.com/", tag: "Technology", result: "Digital Innovation", image: "/projects/anugami.png" },
  { id: "ziplyne", title: "Ziplyne", url: "https://ziplyne.com/", tag: "Logistics", result: "Smart Delivery", image: "/projects/ziplyne.png" },
  { id: "homestory", title: "HomeStory", url: "#", tag: "Interior Design", result: "Modern Living", image: "/projects/homestory.png" },
  { id: "fitchratings", title: "Fitch Ratings", url: "#", tag: "Finance", result: "Credit Analytics", image: "/projects/Fitchratings.png" }
]

// --- UTILS ---
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) setMatches(media.matches)
    const listener = () => setMatches(media.matches)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [matches, query])
  return matches
}

const duration = 0.15
const transition = {
  duration,
  ease: [0.32, 0.72, 0, 1] as const,
  filter: "blur(4px)",
}

const Carousel = memo(
  ({
    rotation, // Receiving rotation from parent
    handleClick,
    controls,
    cards,
  }: {
    rotation: any
    handleClick: (project: any, index: number) => void
    controls: any
    cards: typeof PROJECTS
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    
    // LANDSCAPE CONFIG
    const cylinderWidth = isScreenSizeSm ? 1800 : 2800 
    const faceCount = cards.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    
    const transform = useTransform(
      rotation,
      (value: number) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    const handlePan = (_: any, info: PanInfo) => {
       rotation.set(rotation.get() + info.delta.x * 0.1)
    }

    const handlePanEnd = (_: any, info: PanInfo) => {
       controls.start({
          rotateY: rotation.get() + info.velocity.x * 0.1,
          transition: { type: "spring", stiffness: 50, damping: 20 }
       })
    }

    return (
      <div
        className="flex h-full items-center justify-center bg-transparent"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          onPan={handlePan} 
          onPanEnd={handlePanEnd}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing touch-none"
          style={{
            transform, 
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          animate={controls}
        >
          {cards.map((project, i) => (
            <motion.div
              key={`key-${project.id}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
                backfaceVisibility: "hidden"
              }}
              onClick={() => handleClick(project, i)}
            >
              {/* CARD SHAPE: Landscape 16:9 */}
              <div className="relative w-full max-w-[400px] aspect-video group transition-all hover:scale-105 duration-300">
                <motion.div
                    className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 bg-[#0A0A0A]"
                    initial={{ filter: "blur(4px)" }}
                    layout="position"
                    animate={{ filter: "blur(0px)" }}
                    transition={transition}
                >
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover pointer-events-none"
                    />
                    
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between">
                        <span className="text-white font-medium text-sm">{project.title}</span>
                    </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

export function Projects() {
  const [activeProject, setActiveProject] = useState<typeof PROJECTS[0] | null>(null)
  
  // 1. Move rotation logic UP here so we can control it with buttons
  const rotation = useMotionValue(0)
  const controls = useAnimation()
  
  const cards = useMemo(() => PROJECTS, [])

  const handleClick = (project: typeof PROJECTS[0]) => {
    setActiveProject(project)
    controls.stop()
  }

  const handleClose = () => {
    setActiveProject(null)
  }

  // --- ARROW NAVIGATION LOGIC ---
  const handleNext = () => {
    const anglePerFace = 360 / cards.length
    const currentRotation = rotation.get()
    // Snap to the next logical face
    const targetRotation = Math.round(currentRotation / anglePerFace) * anglePerFace - anglePerFace
    
    controls.start({
      rotateY: targetRotation,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    })
  }

  const handlePrev = () => {
    const anglePerFace = 360 / cards.length
    const currentRotation = rotation.get()
    const targetRotation = Math.round(currentRotation / anglePerFace) * anglePerFace + anglePerFace
    
    controls.start({
      rotateY: targetRotation,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    })
  }

  return (
    <motion.div layout className="relative w-full h-[500px] flex flex-col items-center justify-center overflow-hidden my-12">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#000000] to-[#000000] opacity-80 pointer-events-none" />

      {/* MODAL */}
      <AnimatePresence mode="sync">
        {activeProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-4 backdrop-blur-sm"
          >
            <div 
                className="relative max-w-5xl w-full bg-[#111] border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
                onClick={(e) => e.stopPropagation()} 
            >
                <button 
                  onClick={handleClose}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                   ✕
                </button>

                <div className="relative w-full md:w-2/3 aspect-video bg-[#050505]">
                     <Image 
                        src={activeProject.image} 
                        alt={activeProject.title} 
                        fill 
                        className="object-cover" 
                     />
                </div>

                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center text-left bg-[#0A0A0A]">
                    <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-2">{activeProject.tag}</span>
                    <h2 className="text-2xl md:text-3xl text-white font-serif mb-3">{activeProject.title}</h2>
                    <p className="text-white/60 mb-6 text-sm md:text-base">{activeProject.result}</p>
                    
                    {activeProject.url !== "#" && (
                        <Link 
                            href={activeProject.url} 
                            target="_blank"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-full w-fit hover:scale-105 transition-transform text-sm"
                        >
                            Visit Website <ExternalLink size={16} />
                        </Link>
                    )}
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
        <Carousel
          rotation={rotation}
          handleClick={handleClick}
          controls={controls}
          cards={cards}
        />
      </div>
      
      {/* --- NAVIGATION ARROWS --- */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-12 pointer-events-none">
          {/* Left Arrow */}
          <button 
            onClick={handlePrev}
            className="pointer-events-auto p-3 md:p-4 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-[#D4AF37] hover:text-black hover:scale-110 transition-all duration-300 backdrop-blur-md"
            aria-label="Previous Project"
          >
            <ChevronLeft size={24} />
          </button>
          
          {/* Right Arrow */}
          <button 
            onClick={handleNext}
            className="pointer-events-auto p-3 md:p-4 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-[#D4AF37] hover:text-black hover:scale-110 transition-all duration-300 backdrop-blur-md"
            aria-label="Next Project"
          >
            <ChevronRight size={24} />
          </button>
      </div>
      
      <div className="absolute bottom-6 text-white/20 text-[10px] tracking-widest uppercase pointer-events-none">
        Drag to Explore • Click to View
      </div>

    </motion.div>
  )
}