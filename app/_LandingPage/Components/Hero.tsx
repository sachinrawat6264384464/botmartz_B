"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SceneVideo from "./SceneVideo";
import WelcomeOverlay from "./WelcomeOverlay";
import HeroOverlay from "./HeroOverlay";

export default function Hero() {
  const [isEntered, setIsEntered] = useState(false);
  const [showHero, setShowHero] = useState(false);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#011C40]">
      
      {/* 1. BACKGROUND LAYER (Video) */}
      <SceneVideo 
        isEntered={isEntered} 
        onAnimationComplete={() => setShowHero(true)} 
      />

      {/* 2. UI LAYERS */}
      <AnimatePresence mode="wait">
        
        {/* Stage 1: Entrance Screen */}
        {!isEntered && (
          <WelcomeOverlay key="welcome" onEnter={() => setIsEntered(true)} />
        )}

        {/* Stage 2: Hero Content (Only appears after video transition) */}
        {showHero && (
          <HeroOverlay key="hero" />
        )}
      </AnimatePresence>
    </main>
  );
}