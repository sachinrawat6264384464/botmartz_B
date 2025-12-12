"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface SceneVideoProps {
  isEntered: boolean;
  onAnimationComplete: () => void;
}

export default function SceneVideo({ isEntered, onAnimationComplete }: SceneVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0; 
      videoRef.current.currentTime = 0; 
      videoRef.current.pause(); // Wait for user click
    }
  }, []);

  useGSAP(() => {
    if (isEntered) {
      const tl = gsap.timeline();

      // 1. Play Video & Remove Entrance Mask
      tl.call(() => {
        videoRef.current?.play().catch(e => console.error(e));
      });
      
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut"
      });

      // 2. Wait 4 Seconds (Let the video shows its Title/Robot)
      tl.to({}, { duration: 4 });

      // 3. Transition to Hero State (Dim video slightly so buttons pop)
      tl.to(containerRef.current, {
        scale: 1.05, // Subtle cinematic zoom
        duration: 2,
        ease: "power2.inOut"
      }, "hero");

      tl.to(videoRef.current, {
        filter: "brightness(0.5) blur(2px)", // Dim it so white text is readable
        duration: 1,
        ease: "power2.inOut",
        onComplete: onAnimationComplete
      }, "hero");
    }
  }, { scope: containerRef, dependencies: [isEntered] });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#011C40]">
      <div ref={containerRef} className="relative w-full h-full transform-gpu origin-center">
        
        {/* VIDEO LAYER */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/Botmartz_AI_Automation_Background_Video.mp4" type="video/mp4" />
        </video>

        {/* ENTRANCE MASK (The Solid Blue Screen) */}
        <div ref={overlayRef} className="absolute inset-0 z-20 bg-[#011C40]">
           {/* Subtle Grid Pattern on the Mask */}
           <div className="absolute inset-0 opacity-20" 
              style={{
                  backgroundImage: 'radial-gradient(#54ACBF 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
              }}
           />
        </div>

      </div>
    </div>
  );
}