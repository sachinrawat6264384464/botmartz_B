"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Scene3D from "./Scene3D";
import WelcomeOverlay from "./WelcomeOverlay";
import HeroOverlay from "./HeroOverlay";

export default function Hero() {
  // State 1: Has the user clicked enter?
  const [isEntered, setIsEntered] = useState(false);
  
  // State 2: Has the 3D camera finished flying?
  const [showHero, setShowHero] = useState(false);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#011C40]">
      
      {/* 1. The Persistent 3D Universe */}
      <Scene3D 
        isEntered={isEntered} 
        onAnimationComplete={() => setShowHero(true)} 
      />

      {/* 2. The UI Layers */}
      <AnimatePresence mode="wait">
        
        {/* Stage 1: Welcome Screen */}
        {!isEntered && (
           <WelcomeOverlay key="welcome" onEnter={() => setIsEntered(true)} />
        )}

        {/* Stage 2: Hero Content (Only shows after camera lands) */}
        {showHero && (
           <HeroOverlay key="hero" />
        )}

      </AnimatePresence>

    </main>
  );
}