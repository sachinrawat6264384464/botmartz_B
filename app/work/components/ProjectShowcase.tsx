"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Inter_Tight, Playfair_Display } from 'next/font/google';

const inter = Inter_Tight({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });

// --- DATA ---
const PROJECTS = [
  { 
    id: "lotus", 
    title: "Lotus Herbals", 
    category: "E-commerce", 
    url: "https://www.lotus.in/", 
    image: "/projects/lotus.png",
    color: "#E8F1E6", // Light Green/White tint
    textColor: "#1a1a1a",
    description: "Reinventing natural beauty commerce with immersive storytelling."
  },
  { 
    id: "decathlon", 
    title: "Decathlon", 
    category: "Retail Tech", 
    url: "https://www.decathlon.in/", 
    image: "/projects/decathlon.png",
    color: "#0082C3", // Decathlon Blue
    textColor: "#ffffff",
    description: "Scaling athletic excellence through high-performance digital architecture."
  },
  { 
    id: "tesora", 
    title: "Shop Tesora", 
    category: "Luxury Living", 
    url: "https://www.shoptesora.com/", 
    image: "/projects/shopstesora.png",
    color: "#1a1a1a", // Dark Luxury
    textColor: "#ffffff",
    description: "Defining modern luxury through a minimalist digital appliance boutique."
  },
  { 
    id: "yashueprem", 
    title: "Yashuprem", 
    category: "Fashion", 
    url: "https://yashueprem.com/", 
    image: "/projects/Yashuprem.png",
    color: "#F5E6D3", // Beige/Fashion
    textColor: "#1a1a1a",
    description: "Curated fashion marketplace with seamless, aesthetic checkout flows."
  },
  { 
    id: "safari", 
    title: "Safari Bags", 
    category: "Travel Gear", 
    url: "https://www.safaribags.com/", 
    image: "/projects/safari.png",
    color: "#FF5500", // Safari Orange
    textColor: "#ffffff",
    description: "Digital branding strategy designed for the modern traveler."
  }
];

// --- CARD COMPONENT ---
const Card = ({ 
  i, 
  project, 
  progress, 
  range, 
  targetScale 
}: { 
  i: number; 
  project: typeof PROJECTS[0]; 
  progress: MotionValue<number>; 
  range: number[]; 
  targetScale: number; 
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  // Scale animation for the stacking effect
  const scale = useTransform(progress, range, [1, targetScale]);
  
  // Internal image parallax (image moves slower than card)
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0 px-4 sm:px-6">
      <motion.div 
        style={{ 
          scale, 
          backgroundColor: project.color, 
          top: `calc(-5vh + ${i * 25}px)` 
        }} 
        className="relative flex flex-col w-full max-w-6xl h-[70vh] rounded-[3rem] overflow-hidden shadow-2xl origin-top border border-white/10"
      >
        <div className="flex flex-col md:flex-row h-full">
          
          {/* Left: Text Content */}
          <div className="w-full md:w-[40%] p-8 md:p-12 lg:p-16 flex flex-col justify-between relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border`}
                  style={{ borderColor: project.textColor, color: project.textColor, opacity: 0.6 }}
                >
                  {project.category}
                </span>
              </div>
              <h2 
                className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[0.95]`}
                style={{ color: project.textColor }}
              >
                {project.title}
              </h2>
              <p 
                className={`${inter.className} text-lg md:text-xl font-light leading-relaxed`}
                style={{ color: project.textColor, opacity: 0.8 }}
              >
                {project.description}
              </p>
            </div>

            <Link href={project.url} target="_blank" className="mt-8 md:mt-0 group">
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
                  style={{ borderColor: project.textColor, color: project.textColor }}
                >
                  <ArrowUpRight size={24} />
                </div>
                <span 
                  className="text-sm font-bold uppercase tracking-widest underline decoration-transparent group-hover:decoration-current transition-all"
                  style={{ color: project.textColor }}
                >
                  Visit Site
                </span>
              </div>
            </Link>
          </div>

          {/* Right: Image Area */}
          <div className="w-full md:w-[60%] h-full relative overflow-hidden">
            <motion.div 
              style={{ scale: imageScale }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                fill
                src={project.image}
                alt={project.title}
                className="object-cover"
                priority
              />
            </motion.div>
            
            {/* Subtle Gradient to blend text area if needed */}
            <div 
              className="absolute inset-0 pointer-events-none md:hidden"
              style={{ background: `linear-gradient(to bottom, ${project.color} 0%, transparent 50%)` }}
            />
          </div>

        </div>
      </motion.div>
    </div>
  );
};

// --- MAIN SHOWCASE ---
export const ProjectsShowcase = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={container} className="bg-[#050505] relative pb-[20vh]">
      
      {/* Title Section (Sticky) */}
      <div className="h-[50vh] flex items-center justify-center sticky top-0 z-0">
        <div className="text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
              Selected Works
            </span>
          </div>
          <h2 className={`${playfair.className} text-6xl md:text-8xl text-white mb-6 tracking-tight`}>
            Digital <span className="text-[#D4AF37] italic">Craft.</span>
          </h2>
          <p className={`${inter.className} text-[#888] max-w-xl mx-auto text-lg`}>
            We build immersive digital ecosystems. Scroll to explore the archive.
          </p>
        </div>
      </div>

      {/* The Cards */}
      <div className="relative z-10 mt-[-10vh]">
        {PROJECTS.map((project, i) => {
          // Calculate scale for stacking effect
          // The further down the list, the less it scales down (because it's on top)
          const targetScale = 1 - ((PROJECTS.length - i) * 0.05);
          
          return (
            <Card
              key={project.id}
              i={i}
              project={project}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>

     

    </section>
  );
};