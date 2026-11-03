"use client";

import React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EASINGS, MOTION_DEFAULTS } from "@/lib/animations/presets";

export interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  threshold?: number;
  once?: boolean;
  replay?: boolean;
  className?: string;
  id?: string;
  as?: "div" | "ul" | "ol" | "section";
  style?: React.CSSProperties;
}

export function StaggerContainer({
  children,
  staggerDelay = MOTION_DEFAULTS.staggerInterval,
  initialDelay = 0.05,
  threshold = 0.1,
  once = true,
  replay = false,
  className = "",
  id,
  as = "div",
  style = {},
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();
  const isOnce = replay ? false : once;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: shouldReduceMotion ? 0 : initialDelay,
      },
    },
  };

  const Component = (motion as any)[as] || motion.div;

  return (
    <Component
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: isOnce, amount: threshold, margin: "0px 0px -30px 0px" }}
      variants={containerVariants}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}

export interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  preset?: "fade-up" | "scale-reveal" | "blur-reveal" | "slide-right";
  as?: "div" | "li" | "article" | "span";
  style?: React.CSSProperties;
}

export function StaggerItem({
  children,
  className = "",
  distance = 22,
  preset = "fade-up",
  as = "div",
  style = {},
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  let itemVariants: Variants;
  if (shouldReduceMotion) {
    itemVariants = {
      hidden: { opacity: 1, y: 0, scale: 1, filter: "none" },
      visible: { opacity: 1, y: 0, scale: 1, filter: "none" },
    };
  } else {
    switch (preset) {
      case "scale-reveal":
        itemVariants = {
          hidden: { opacity: 0, scale: 0.94, y: Math.round(distance * 0.5) },
          visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.65, ease: EASINGS.editorial },
          },
        };
        break;
      case "blur-reveal":
        itemVariants = {
          hidden: { opacity: 0, filter: "blur(8px)", y: Math.round(distance * 0.6) },
          visible: {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            transition: { duration: 0.65, ease: EASINGS.editorial },
          },
        };
        break;
      case "slide-right":
        itemVariants = {
          hidden: { opacity: 0, x: -distance },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.65, ease: EASINGS.editorial },
          },
        };
        break;
      case "fade-up":
      default:
        itemVariants = {
          hidden: { opacity: 0, y: distance },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: EASINGS.editorial },
          },
        };
        break;
    }
  }

  const Component = (motion as any)[as] || motion.div;

  return (
    <Component
      variants={itemVariants}
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
