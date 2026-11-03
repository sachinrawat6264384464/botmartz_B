/**
 * Centralized Cinematic Animation Presets & Easing Configuration
 * Inspired by Apple product pages and award-winning interactive experiences.
 */

export type AnimationPreset =
  | "fade-up"
  | "fade-down"
  | "slide-left"
  | "slide-right"
  | "scale-reveal"
  | "blur-reveal"
  | "clip-reveal"
  | "stagger"
  | "parallax"
  | "text-reveal";

export const EASINGS = {
  // Apple-grade editorial smooth decelerating curve
  editorial: [0.16, 1, 0.3, 1] as const,
  // Cinematic luxury curve
  cinematic: [0.25, 0.1, 0.25, 1] as const,
  // Gentle natural deceleration
  gentle: [0.33, 1, 0.68, 1] as const,
  // Emphasized springy feel
  emphasized: [0.05, 0.7, 0.1, 1] as const,
  // Snappy quick response
  snappy: [0.25, 1, 0.5, 1] as const,
};

export const MOTION_DEFAULTS = {
  duration: 0.75,
  heroDuration: 1.0,
  staggerInterval: 0.09,
  distance: 28,
  threshold: 0.15,
  ease: EASINGS.editorial,
};

/**
 * Returns framer-motion variants for any preset, factoring in distance, reduced motion, and custom duration/delays.
 */
export function getPresetVariants(
  preset: AnimationPreset = "fade-up",
  distance = MOTION_DEFAULTS.distance,
  shouldReduceMotion = false
) {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 1, x: 0, y: 0, scale: 1, filter: "none" },
      visible: { opacity: 1, x: 0, y: 0, scale: 1, filter: "none" },
    };
  }

  switch (preset) {
    case "fade-down":
      return {
        hidden: { opacity: 0, y: -distance },
        visible: { opacity: 1, y: 0 },
      };

    case "slide-left":
      return {
        hidden: { opacity: 0, x: Math.round(distance * 1.5) },
        visible: { opacity: 1, x: 0 },
      };

    case "slide-right":
      return {
        hidden: { opacity: 0, x: -Math.round(distance * 1.5) },
        visible: { opacity: 1, x: 0 },
      };

    case "scale-reveal":
      return {
        hidden: { opacity: 0, scale: 0.94, y: Math.round(distance * 0.5) },
        visible: { opacity: 1, scale: 1, y: 0 },
      };

    case "blur-reveal":
      return {
        hidden: { opacity: 0, filter: "blur(10px)", y: Math.round(distance * 0.6) },
        visible: { opacity: 1, filter: "blur(0px)", y: 0 },
      };

    case "clip-reveal":
      return {
        hidden: { opacity: 0, clipPath: "inset(12% 0 0 0)", y: Math.round(distance * 0.4) },
        visible: { opacity: 1, clipPath: "inset(0% 0 0 0)", y: 0 },
      };

    case "fade-up":
    default:
      return {
        hidden: { opacity: 0, y: distance },
        visible: { opacity: 1, y: 0 },
      };
  }
}

/**
 * Deterministically distributes varied, cohesive presets across major sections
 * so adjacent sections never share the same motion style.
 */
export function getSectionPreset(index: number): AnimationPreset {
  const sequence: AnimationPreset[] = [
    "fade-up",
    "scale-reveal",
    "blur-reveal",
    "slide-right",
    "fade-up",
    "clip-reveal",
    "scale-reveal",
  ];
  return sequence[index % sequence.length];
}
