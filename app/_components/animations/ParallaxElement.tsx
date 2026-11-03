"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number; // e.g. -0.2 to 0.2 (positive moves down slower, negative moves up faster)
  scaleRange?: [number, number]; // optional scale during scroll e.g. [0.98, 1.02]
  rotateRange?: [number, number]; // optional subtle tilt in degrees e.g. [-2, 2]
  className?: string;
  as?: "div" | "span" | "figure" | "section";
  style?: React.CSSProperties;
}

export default function ParallaxElement({
  children,
  speed = 0.12,
  scaleRange,
  rotateRange,
  className = "",
  as = "div",
  style = {},
}: ParallaxElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate pixel travel based on speed factor
  const travelPixels = speed * 150;
  const yTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [-travelPixels / 2, travelPixels / 2]
  );

  const scaleTransform = useTransform(
    scrollYProgress,
    [0, 1],
    scaleRange || [1, 1]
  );

  const rotateTransform = useTransform(
    scrollYProgress,
    [0, 1],
    rotateRange || [0, 0]
  );

  const disableParallax = Boolean(shouldReduceMotion || isMobile);
  const Component = (motion as any)[as] || motion.div;

  return (
    <Component
      ref={ref}
      style={{
        ...style,
        y: disableParallax ? 0 : yTransform,
        scale: disableParallax || !scaleRange ? 1 : scaleTransform,
        rotate: disableParallax || !rotateRange ? 0 : rotateTransform,
        willChange: disableParallax ? "auto" : "transform",
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
