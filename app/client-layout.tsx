"use client";

import { useState } from "react";
import Preloader from "./_components/Preloader";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
    
    // Smooth transition to content
    requestAnimationFrame(() => {
      const content = document.getElementById('main-content');
      if (content) {
        content.classList.add('loaded');
      }
    });
  };

  return (
    <>
      {/* Preloader */}
      {isLoading && <Preloader onLoadComplete={handleLoadComplete} />}

      {/* Main Content - Renders immediately but hidden */}
      <div id="main-content">
        {children}
      </div>
    </>
  );
}