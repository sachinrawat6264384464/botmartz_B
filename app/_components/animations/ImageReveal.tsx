"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, Variants } from "framer-motion";
import { EASINGS, MOTION_DEFAULTS } from "@/lib/animations/presets";

export interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "curtain" | "zoom";
  duration?: number;
  delay?: number;
  threshold?: number;
  once?: boolean;
  parallax?: boolean;
  parallaxSpeed?: number;
}

export default function ImageReveal({
  children,
  className = "",
  direction = "zoom",
  duration = MOTION_DEFAULTS.heroDuration,
  delay = 0,
  threshold = 0.15,
  once = true,
  parallax = false,
  parallaxSpeed = 0.08,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [-parallaxSpeed * 80, parallaxSpeed * 80]
  );

  let containerVariants: Variants;
  let innerVariants: Variants;

  if (shouldReduceMotion) {
    containerVariants = {
      hidden: { opacity: 1, clipPath: "none" },
      visible: { opacity: 1, clipPath: "none" },
    };
    innerVariants = {
      hidden: { scale: 1, opacity: 1 },
      visible: { scale: 1, opacity: 1 },
    };
  } else {
    switch (direction) {
      case "curtain":
        containerVariants = {
          hidden: { clipPath: "inset(0% 50% 0% 50%)", opacity: 0 },
          visible: {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            transition: { duration, delay, ease: EASINGS.editorial },
          },
        };
        innerVariants = {
          hidden: { scale: 1.08 },
          visible: {
            scale: 1,
            transition: { duration: duration * 1.2, delay, ease: EASINGS.editorial },
          },
        };
        break;

      case "left":
        containerVariants = {
          hidden: { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 },
          visible: {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            transition: { duration, delay, ease: EASINGS.editorial },
          },
        };
        innerVariants = {
          hidden: { scale: 1.06, x: 20 },
          visible: {
            scale: 1,
            x: 0,
            transition: { duration: duration * 1.1, delay, ease: EASINGS.editorial },
          },
        };
        break;

      case "right":
        containerVariants = {
          hidden: { clipPath: "inset(0% 0% 0% 100%)", opacity: 0 },
          visible: {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            transition: { duration, delay, ease: EASINGS.editorial },
          },
        };
        innerVariants = {
          hidden: { scale: 1.06, x: -20 },
          visible: {
            scale: 1,
            x: 0,
            transition: { duration: duration * 1.1, delay, ease: EASINGS.editorial },
          },
        };
        break;

      case "up":
        containerVariants = {
          hidden: { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
          visible: {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            transition: { duration, delay, ease: EASINGS.editorial },
          },
        };
        innerVariants = {
          hidden: { scale: 1.08, y: 30 },
          visible: {
            scale: 1,
            y: 0,
            transition: { duration: duration * 1.1, delay, ease: EASINGS.editorial },
          },
        };
        break;

      case "zoom":
      default:
        containerVariants = {
          hidden: { opacity: 0, y: 24 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration, delay, ease: EASINGS.editorial },
          },
        };
        innerVariants = {
          hidden: { scale: 1.08 },
          visible: {
            scale: 1,
            transition: { duration: duration * 1.2, delay, ease: EASINGS.editorial },
          },
        };
        break;
    }
  }

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold, margin: "0px 0px -40px 0px" }}
      variants={containerVariants}
      className={`overflow-hidden relative ${className}`}
    >
      <motion.div
        variants={innerVariants}
        style={{
          y: parallax && !shouldReduceMotion ? parallaxY : 0,
          willChange: shouldReduceMotion ? "auto" : "transform",
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
