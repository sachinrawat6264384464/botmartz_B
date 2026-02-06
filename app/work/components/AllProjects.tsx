"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Inter_Tight, Playfair_Display } from 'next/font/google';
import { FooterTerminal } from "@/app/_LandingPage/Components/footer-terminal";

const inter = Inter_Tight({ subsets: ['latin'], weight: ['300', '400', '600'], display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' });

// --- TYPES ---
interface Project {
  id: string;
  title: string;
  url: string;
  tag: string;
  result: string;
  image: string;
}

// --- DATA ---
const PROJECTS: Project[] = [
  { 
    id: "lotus", 
    title: "Lotus Herbals", 
    url: "https://www.lotus.in/", 
    tag: "E-commerce", 
    result: "Premium Skincare",
    image: "/projects/lotus.png"
  },
  { 
    id: "tesora", 
    title: "Shop Tesora", 
    url: "https://www.shoptesora.com/", 
    tag: "Home & Living", 
    result: "Luxury Appliances",
    image: "/projects/shopstesora.png"
  },
  { 
    id: "decathlon", 
    title: "Decathlon India", 
    url: "https://www.decathlon.in/", 
    tag: "Sports & Retail", 
    result: "Athletic Excellence",
    image: "/projects/decathlon.png"
  },
  { 
    id: "yashueprem", 
    title: "Yashuprem", 
    url: "https://yashueprem.com/", 
    tag: "E-commerce", 
    result: "Curated Fashion",
    image: "/projects/Yashuprem.png"
  },
  { 
    id: "safari", 
    title: "Safari Bags", 
    url: "https://www.safaribags.com/", 
    tag: "Retail", 
    result: "Travel Essentials",
    image: "/projects/safari.png"
  },
  { 
    id: "plix", 
    title: "PlixLife", 
    url: "https://plixlife.com/", 
    tag: "Wellness", 
    result: "Plant-based Nutrition",
    image: "/projects/plix.png"
  },
  { 
    id: "anugami", 
    title: "Anugami", 
    url: "https://anugami.com/", 
    tag: "Technology", 
    result: "Digital Innovation",
    image: "/projects/anugami.png"
  },
  { 
    id: "ziplyne", 
    title: "Ziplyne", 
    url: "https://ziplyne.com/", 
    tag: "Logistics", 
    result: "Smart Delivery",
    image: "/projects/ziplyne.png"
  },
  { 
    id: "homestory", 
    title: "HomeStory", 
    url: "#", 
    tag: "Interior Design", 
    result: "Modern Living",
    image: "/projects/homestory.png"
  },
  { 
    id: "fitchratings", 
    title: "Fitch Ratings", 
    url: "#", 
    tag: "Finance", 
    result: "Credit Analytics",
    image: "/projects/Fitchratings.png"
  }
];

export const Projects = () => {
  const [rotationStep, setRotationStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- RESPONSIVE 3D GEOMETRY CONFIG ---
  const count = PROJECTS.length;
  
  // Responsive card dimensions
  const cardWidth = isMobile ? 240 : isTablet ? 280 : 320;
  const cardHeight = isMobile ? 160 : isTablet ? 180 : 200;
  const gap = isMobile ? 30 : isTablet ? 40 : 50;
  
  // Calculate Radius (smaller on mobile for better visibility)
  const radius = Math.round((cardWidth + gap) / 2 / Math.tan(Math.PI / count));
  const theta = 360 / count;

  const rotation = rotationStep * -theta;

  const getActiveIndex = () => {
    let idx = rotationStep % count;
    if (idx < 0) idx += count;
    return idx;
  };
  const currentActive = getActiveIndex();

  const rotate = useCallback((dir: number) => {
    setRotationStep((prev) => prev + dir);
  }, []);

  // Touch handlers for swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      rotate(-1);
    } else if (isRightSwipe) {
      rotate(1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        rotate(1);
      } else if (e.key === 'ArrowRight') {
        rotate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [rotate]);

  return (
    <section 
      className="relative bg-[#050505] min-h-screen overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      
      {/* --- BACKGROUND ATMOSPHERE --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#000000] to-[#000000] opacity-80" />
     

      {/* --- INFO HEADER --- */}
      <div className="relative z-40 w-full max-w-4xl px-4 sm:px-6 text-center pointer-events-none mb-8 sm:mb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentActive}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30, filter: prefersReducedMotion ? "blur(0px)" : "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -30, filter: prefersReducedMotion ? "blur(0px)" : "blur(10px)" }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Category Tag */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className="h-px w-6 sm:w-8 bg-[#D4AF37]/50" />
              <span className={`${inter.className} text-[#D4AF37] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em]`}>
                {PROJECTS[currentActive].tag}
              </span>
              <span className="h-px w-6 sm:w-8 bg-[#D4AF37]/50" />
            </div>

            {/* Main Title */}
            <h2 className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white mb-2 leading-tight px-4`}>
              {PROJECTS[currentActive].title}
            </h2>

            {/* Result / Description */}
            <p className={`${inter.className} text-white/50 text-xs sm:text-sm md:text-base lg:text-lg tracking-wide mt-2`}>
              {PROJECTS[currentActive].result}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- 3D SCENE CONTAINER --- */}
      <div 
        className="relative w-full flex-1 flex items-center justify-center z-10"
        style={{
          perspective: isMobile ? '800px' : isTablet ? '1000px' : '1200px',
          perspectiveOrigin: 'center center',
          minHeight: isMobile ? '300px' : isTablet ? '400px' : '500px',
          maxHeight: isMobile ? '400px' : isTablet ? '500px' : '600px'
        }}
      >
        
        {/* CAROUSEL ROTATOR */}
        <motion.div
          className="relative"
          initial={{ rotateY: 0 }}
          animate={{ 
            rotateY: rotation, 
            rotateX: isMobile ? 0 : -5 
          }} 
          transition={{ 
            type: "spring", 
            stiffness: prefersReducedMotion ? 80 : 40, 
            damping: prefersReducedMotion ? 20 : 15, 
            mass: 1.2 
          }}
          style={{ 
            width: cardWidth, 
            height: cardHeight, 
            transformStyle: "preserve-3d",
          }} 
        >
          {PROJECTS.map((project, index) => {
            const angle = theta * index;
            const isActive = currentActive === index;

            return (
              <div
                key={project.id}
                className="absolute inset-0"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <Link 
                  href={project.url} 
                  target={project.url === "#" ? "_self" : "_blank"}
                  rel={project.url !== "#" ? "noopener noreferrer" : undefined}
                  className={`block w-full h-full group ${project.url === "#" ? "cursor-default" : "cursor-pointer"}`}
                  onClick={(e) => project.url === "#" && e.preventDefault()}
                  aria-label={`View ${project.title}`}
                >
                  {/* CARD BODY */}
                  <div 
                    className={`
                      relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden border transition-all duration-500 ease-out
                      ${isActive 
                        ? 'border-[#D4AF37]/80 shadow-[0_0_60px_-15px_rgba(212,175,55,0.4)] sm:shadow-[0_0_80px_-20px_rgba(212,175,55,0.4)] scale-105 sm:scale-110 z-20' 
                        : 'border-white/5 bg-[#0A0A0A] brightness-[0.3] grayscale scale-90 sm:scale-95 z-0'
                      }
                    `}
                  >
                    {/* Image */}
                    <div className="relative w-full h-full">
                      {/* Placeholder background */}
                      <div className="absolute inset-0 bg-gray-900" /> 
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 240px, (max-width: 1024px) 280px, 320px"
                        priority={index < 3}
                        quality={85}
                      />
                      
                      {/* Active Gloss & Info Overlay */}
                      {isActive && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-white/10 opacity-60" />
                          
                          {/* Inner Card Info */}
                          <motion.div 
                            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
                            className="absolute bottom-0 left-0 w-full p-3 sm:p-4 flex justify-between items-end"
                          >
                            <div className="flex flex-col">
                              <span className={`${inter.className} text-[8px] sm:text-[10px] text-[#D4AF37] uppercase tracking-widest mb-1`}>
                                Outcome
                              </span>
                              <span className={`${playfair.className} text-white text-sm sm:text-base md:text-lg leading-none`}>
                                {project.result}
                              </span>
                            </div>
                            
                            {project.url !== "#" && (
                              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                                <ExternalLink size={isMobile ? 12 : 14} />
                              </div>
                            )}
                          </motion.div>
                        </>
                      )}
                    </div>

                    {/* Dark overlay for inactive cards */}
                    {!isActive && <div className="absolute inset-0 bg-black/50" />}
                  </div>

                  {/* REFLECTION - Hidden on mobile for performance */}
                  {!isMobile && (
                    <div 
                      className="absolute top-full left-0 w-full h-full pointer-events-none"
                      style={{ 
                        transform: 'scaleY(-1) translateY(-10px)',
                        opacity: isActive ? 0.35 : 0.05,
                        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0) 60%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0) 60%)'
                      }}
                    >
                      <Image 
                        src={project.image} 
                        alt="" 
                        fill 
                        className="object-cover blur-[2px]" 
                        quality={50}
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </Link>
              </div>
            );
          })}
        </motion.div>

        {/* --- LEVITATING PLATFORM - Hidden on mobile --- */}
        {!isMobile && (
          <div 
            className="absolute top-[60%] rounded-full border border-[#D4AF37]/10"
            style={{ 
              width: isTablet ? '1000px' : '1400px',
              height: isTablet ? '1000px' : '1400px',
              transform: 'rotateX(90deg) translateZ(-150px)',
              background: 'radial-gradient(circle, rgba(212,175,55,0.03) 0%, rgba(0,0,0,0) 70%)',
              boxShadow: '0 0 100px rgba(212,175,55,0.05) inset'
            }}
          />
        )}

      </div>

      {/* --- CONTROLS --- */}
      <div className="relative z-30 flex gap-6 sm:gap-8 md:gap-12 items-center mt-8 sm:mt-12">
        <button 
          onClick={() => rotate(1)}
          className="p-3 sm:p-4 rounded-full border border-white/10 hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black text-white/50 active:scale-95 hover:scale-110 transition-all duration-300 backdrop-blur-sm bg-black/20"
          aria-label="Previous project"
        >
          <ChevronLeft size={isMobile ? 20 : 24} />
        </button>
        
        {/* Counter */}
        <div className="flex flex-col items-center gap-1">
          <span className={`${playfair.className} text-xl sm:text-2xl text-[#D4AF37]`}>
            {String(currentActive + 1).padStart(2, '0')}
          </span>
          <div className="w-10 sm:w-12 h-px bg-white/20" />
          <span className={`${inter.className} text-[10px] sm:text-xs text-white/40`}>
            {count}
          </span>
        </div>

        <button 
          onClick={() => rotate(-1)}
          className="p-3 sm:p-4 rounded-full border border-white/10 hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black text-white/50 active:scale-95 hover:scale-110 transition-all duration-300 backdrop-blur-sm bg-black/20"
          aria-label="Next project"
        >
          <ChevronRight size={isMobile ? 20 : 24} />
        </button>
      </div>
       

      {/* Swipe Indicator for Mobile */}
      {isMobile && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          className={`${inter.className} text-white/30 text-xs text-center mt-4`}
        >
          Swipe to navigate
        </motion.div>
      )}

    </section>

  );

};