"use client";

import React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EASINGS } from "@/lib/animations/presets";

export interface TextRevealProps {
  text?: string;
  children?: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  delay?: number;
  staggerDelay?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export default function TextReveal({
  text,
  children,
  as = "h2",
  delay = 0,
  staggerDelay = 0.035,
  className = "",
  threshold = 0.2,
  once = true,
}: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  // If text prop is passed or children is a pure string
  const rawString = text || (typeof children === "string" ? children : "");

  if (!rawString) {
    // If complex children, wrap as a block reveal
    const Component = (motion as any)[as] || motion.div;
    return (
      <Component
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once, amount: threshold }}
        transition={{ duration: 0.7, delay, ease: EASINGS.editorial }}
        className={className}
      >
        {children}
      </Component>
    );
  }

  const words = rawString.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: shouldReduceMotion ? 0 : delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      y: shouldReduceMotion ? 0 : "110%",
      opacity: shouldReduceMotion ? 1 : 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: EASINGS.editorial,
      },
    },
  };

  const Component = (motion as any)[as] || motion.h2;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold, margin: "0px 0px -40px 0px" }}
      variants={containerVariants}
      aria-label={rawString}
      className={`${className} inline-block`}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-top mr-[0.26em] last:mr-0"
        >
          <motion.span
            variants={wordVariants}
            className="inline-block will-change-transform"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
