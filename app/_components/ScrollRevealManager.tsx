"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Observe elements with data-reveal attribute
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.dataset.revealSeen = "true";
          el.classList.add("reveal-enter");
          observer.unobserve(el);

          el.addEventListener(
            "animationend",
            () => {
              el.classList.remove("reveal-enter");
              el.style.opacity = "1";
              el.style.transform = "none";
            },
            { once: true }
          );
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((el) => {
      // If already above the fold on initial load, reveal immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
        el.dataset.revealSeen = "true";
        el.classList.add("reveal-enter");
        el.addEventListener(
          "animationend",
          () => {
            el.classList.remove("reveal-enter");
            el.style.opacity = "1";
            el.style.transform = "none";
          },
          { once: true }
        );
      } else {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
