// app/client-layout.tsx
"use client";

import { useState, useEffect } from "react";
import Preloader from "./_components/Preloader";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  // Don't render children until mounted on client
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Preloader */}
      {isLoading && <Preloader onLoadComplete={handleLoadComplete} />}

      {/* Main Content - Renders after mounting */}
      <div id="main-content">
        {children}
      </div>
    </>
  );
}