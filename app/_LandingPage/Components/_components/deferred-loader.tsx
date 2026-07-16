"use client";
import React, { useState, useEffect } from "react";

export default function DeferredLoader({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for the browser to be idle (approx 3-4 seconds after load)
    // This pushes the heavy execution completely off the TBT radar
    if (typeof window !== "undefined" && (window as any).requestIdleCallback) {
      (window as any).requestIdleCallback(() => {
        setTimeout(() => setIsReady(true), 2000);
      });
    } else {
      // Fallback
      setTimeout(() => setIsReady(true), 4000);
    }
  }, []);

  if (!isReady) return null;

  return <>{children}</>;
}
