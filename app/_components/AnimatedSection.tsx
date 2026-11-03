"use client";

import React from "react";
import ScrollReveal from "./animations/ScrollReveal";
import { AnimationPreset, getSectionPreset } from "@/lib/animations/presets";

export interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  preset?: AnimationPreset;
  index?: number;
  once?: boolean;
  replay?: boolean;
}

export default function AnimatedSection({
  children,
  className = "",
  id,
  delay = 0,
  duration,
  distance,
  threshold,
  preset,
  index,
  once = true,
  replay = false,
}: AnimatedSectionProps) {
  // If an explicit index is passed and no preset is specified, auto-assign an intelligent varied preset
  const resolvedPreset: AnimationPreset =
    preset || (typeof index === "number" ? getSectionPreset(index) : "fade-up");

  return (
    <ScrollReveal
      as="section"
      id={id}
      preset={resolvedPreset}
      className={className}
      delay={delay}
      duration={duration}
      distance={distance}
      threshold={threshold}
      once={once}
      replay={replay}
    >
      {children}
    </ScrollReveal>
  );
}
