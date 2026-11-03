"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  AnimationPreset,
  EASINGS,
  MOTION_DEFAULTS,
  getPresetVariants,
} from "@/lib/animations/presets";

export interface ScrollRevealProps {
  children: React.ReactNode;
  preset?: AnimationPreset;
  className?: string;
  id?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  once?: boolean;
  replay?: boolean;
  as?: "div" | "section" | "article" | "aside" | "header" | "footer" | "main" | "span";
  style?: React.CSSProperties;
}

export default function ScrollReveal({
  children,
  preset = "fade-up",
  className = "",
  id,
  delay = 0,
  duration = MOTION_DEFAULTS.duration,
  distance = MOTION_DEFAULTS.distance,
  threshold = MOTION_DEFAULTS.threshold,
  once = true,
  replay = false,
  as = "div",
  style = {},
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const isOnce = replay ? false : once;

  const variants = getPresetVariants(preset, distance, Boolean(shouldReduceMotion));
  const Component = (motion as any)[as] || motion.div;

  return (
    <Component
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: isOnce, amount: threshold, margin: "0px 0px -40px 0px" }}
      variants={variants}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: EASINGS.editorial,
      }}
      className={className}
      style={{
        ...style,
        willChange: shouldReduceMotion ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </Component>
  );
}
