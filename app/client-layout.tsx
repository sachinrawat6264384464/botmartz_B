"use client";

import { useState, useEffect } from "react";
import Preloader from "./_components/Preloader";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
    
    // Add loaded class to enable transition
    setTimeout(() => {
      const content = document.getElementById('main-content');
      if (content) {
        content.classList.add('loaded');
      }
    }, 50);
  };

  return (
    <>
      {/* Global Preloader */}
      {isLoading && <Preloader onLoadComplete={handleLoadComplete} />}

      {/* Main Content - Hidden by CSS until loaded */}
      <div id="main-content">
        {children}
      </div>
    </>
  );
}