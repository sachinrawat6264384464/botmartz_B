// app/client-layout.tsx
"use client";

import { useState, useEffect } from "react";
import Preloader from "./_components/Preloader";
import Navbar from "./_LandingPage/Components/navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showPreloader, setShowPreloader] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Check if preloader should be shown
  useEffect(() => {
    setIsMounted(true);
    
    // Check if preloader has been shown in this session
    const hasSeenPreloader = sessionStorage.getItem("preloader-shown");
    
    if (!hasSeenPreloader) {
      // First visit - show preloader
      setShowPreloader(true);
    } else {
      // Already seen preloader - skip it
      setIsLoading(false);
      // Immediately show content as loaded
      requestAnimationFrame(() => {
        const content = document.getElementById('main-content');
        if (content) {
          content.classList.add('loaded');
        }
      });
    }
  }, []);

  const handleLoadComplete = () => {
    // Mark preloader as shown for this session
    sessionStorage.setItem("preloader-shown", "true");
    setShowPreloader(false);
    setIsLoading(false);
    
    // Smooth transition to content
    requestAnimationFrame(() => {
      const content = document.getElementById('main-content');
      if (content) {
        content.classList.add('loaded');
      }
    });
  };

  // Don't render children until mounted on client
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Preloader - Only shows on first visit */}
      {showPreloader && <Preloader onLoadComplete={handleLoadComplete} />}

      {/* Main Content - Renders immediately if preloader already shown */}
      <div id="main-content" className={!isLoading ? "loaded" : ""}>
        <Navbar />
        {children}
      </div>
    </>
  );
}