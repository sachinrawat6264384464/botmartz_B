"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Register GSAP
gsap.registerPlugin(useGSAP);

interface SceneVideoProps {
  isEntered: boolean;
  onAnimationComplete: () => void;
}

export default function SceneVideo({ isEntered, onAnimationComplete }: SceneVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 1. FORCE VIDEO PLAYBACK (Fixes "Black Screen" issues)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Slow down video slightly for more cinematic feel
      videoRef.current.play().catch((e) => {
        console.error("Autoplay failed:", e);
        // Fallback: If autoplay fails, we at least show the first frame
        videoRef.current!.muted = true; 
        videoRef.current!.play(); 
      });
    }
  }, []);

  useGSAP(() => {
    if (isEntered) {
      const tl = gsap.timeline({
        onComplete: onAnimationComplete
      });

      // --- CINEMATIC TRANSITION (6 Seconds) ---
      // We do NOT zoom too much. Just a subtle push forward.
      tl.to(containerRef.current, {
        scale: 1.2,           // Very subtle zoom (was 3x, now 1.2x)
        duration: 6,          // Very slow duration
        ease: "power2.inOut", 
      }, 0);

      // Fade out ONLY at the very end (last 1 second)
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.in",
      }, "-=1.0"); // Start fading 1 second before zoom ends
    }
  }, { scope: containerRef, dependencies: [isEntered] });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#011C40]">
      
      {/* ANIMATION WRAPPER */}
      <div ref={containerRef} className="relative w-full h-full transform-gpu origin-center">
        
        {/* 1. THE VIDEO LAYER */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="auto"
        >
          {/* Try both variations of the path just in case */}
          <source src="/Botmartz480.mp4" type="video/mp4" />
        </video>

        {/* 2. SUBTLE OVERLAYS (Visibility First) */}
        
        {/* A very light blue tint to match brand, but transparent enough to see the video clearly */}
        <div className="absolute inset-0 bg-[#011C40]/20 z-10 pointer-events-none mix-blend-overlay" />

        {/* Digital Grid - Very subtle */}
        <div 
            className="absolute inset-0 z-20 opacity-20 pointer-events-none" 
            style={{
                backgroundImage: 'radial-gradient(#A7EBF2 1px, transparent 1px)', // Changed to light blue dots
                backgroundSize: '40px 40px'
            }}
        />

        {/* Vignette - Only on edges, keeps center clear */}
        <div 
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
                background: 'radial-gradient(circle at center, transparent 60%, #011C40 100%)'
            }}
        />
        
      </div>
    </div>
  );
}