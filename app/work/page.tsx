// app/page.tsx
"use client";

import React from "react";
import { useScroll, useSpring, motion } from "framer-motion";
import { GrainOverlay } from "./components/GrainOverlay"; // Added curly braces
import  {Hero}  from "./components/WorkSection";
import {ProjectsShowcase} from "./components/ProjectShowcase";
import { Projects } from "./components/AllProjects";
export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="bg-[#050505] min-h-screen selection:bg-[#FF5500] selection:text-black cursor-default">
      <GrainOverlay />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#FF5500] origin-left z-[1000]"
        style={{ scaleX }}
      />

      <Hero />
      <ProjectsShowcase/>
      <Projects/>
      
    </main>
  );
}