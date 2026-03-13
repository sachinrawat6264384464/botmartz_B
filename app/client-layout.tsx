// app/client-layout.tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Preloader from "./_components/Preloader";
import Navbar from "./_components/navbar";

const Footer = dynamic(() => import("./_components/footer").then(m => ({ default: m.Footer })), {
  ssr: false,
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  const [showPreloader, setShowPreloader] = useState(false);

  // Only check sessionStorage after mount (client-only API)
  useEffect(() => {
    if (isAdminRoute) return;
    const hasSeenPreloader = sessionStorage.getItem("preloader-shown");
    if (!hasSeenPreloader) {
      setShowPreloader(true);
    }
  }, [isAdminRoute]);

  const handleLoadComplete = () => {
    sessionStorage.setItem("preloader-shown", "true");
    setShowPreloader(false);
  };

  return (
    <>
      {/* Preloader overlays visually but does NOT block content from rendering/painting */}
      {showPreloader && <Preloader onLoadComplete={handleLoadComplete} />}

      {/* Content always renders immediately — critical for LCP */}
      <div id="main-content">
        {!isAdminRoute && <Navbar />}
        {children}
        {!isAdminRoute && <Footer />}
      </div>
    </>
  );
}
