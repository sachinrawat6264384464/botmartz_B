"use client";

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { ReactLenis } from "lenis/react";
import { Space_Grotesk } from 'next/font/google';
import { cn } from "@/lib/utils";

import MarqueeSection from "./Components/marquee-section";

const HeroSection = dynamic(() => import('./Components/hero-section'), {
  loading: () => <div className="min-h-screen bg-[#050505]" />,
  ssr: false
});

// Below-fold chunks — imported lazily, only triggered when near viewport
const ServicesGrid = dynamic(() => import('./Components/services-grid').then(mod => ({ default: mod.ServicesGrid })), {
  loading: () => <div className="min-h-screen bg-[#050505]" />,
  ssr: false
});

const SectionWithMockup = dynamic(() => import('./Components/IndustrialMockup'), {
  loading: () => <div className="min-h-[60vh] bg-[#050505]" />,
  ssr: false
});

const ProcessTimeline = dynamic(() => import('./Components/process-timeline').then(mod => ({ default: mod.ProcessTimeline })), {
  loading: () => <div className="min-h-[60vh] bg-[#050505]" />,
  ssr: false
});

const SystemMetrics = dynamic(() => import('./Components/system-metrics').then(mod => ({ default: mod.SystemMetrics })), {
  loading: () => <div className="min-h-[60vh] bg-[#050505]" />,
  ssr: false
});

const ClientTransmissions = dynamic(() => import('./Components/client-transmissions').then(mod => ({ default: mod.ClientTransmissions })), {
  loading: () => <div className="min-h-[60vh] bg-[#050505]" />,
  ssr: false
});

const NeuralQuery = dynamic(() => import('./Components/neural-query'), {
  loading: () => <div className="min-h-[60vh] bg-[#050505]" />,
  ssr: false
});

const FinalCTA = dynamic(() => import('./Components/final-cta').then(mod => ({ default: mod.FinalCTA })), {
  loading: () => <div className="min-h-[60vh] bg-[#050505]" />,
  ssr: false
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '500', '700'],
  display: 'swap',
  preload: true
});

/**
 * LazySection — renders a placeholder div until the element is within
 * `rootMargin` of the viewport, then swaps in children and triggers the
 * dynamic import for that chunk. Prevents all below-fold JS from loading
 * simultaneously, which is the main cause of high TBT.
 */
function LazySection({
  children,
  minHeight = '60vh',
  rootMargin = '400px',
}: {
  children: React.ReactNode;
  minHeight?: string;
  rootMargin?: string;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  if (visible) return <>{children}</>;
  return <div ref={ref} style={{ minHeight }} className="bg-[#050505]" />;
}

export default function BotmartzLandingPage() {
  return (
    <ReactLenis root options={{ lerp: 0.06, duration: 1.2 }}>
      <main className={cn(
        "bg-[#050505] text-[#E0E0E0] min-h-screen w-full relative overflow-x-hidden",
        "selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]",
        spaceGrotesk.className
      )}>

        {/* Cinematic Grain Overlay — inline SVG, zero network request */}
        <div
          className="fixed inset-0 z-50 pointer-events-none opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px'
          }}
        />

        {/* Above fold — load immediately */}
        <HeroSection />
        <MarqueeSection />

        {/* Below fold — each section loads its JS chunk only when scrolled near */}
        <LazySection minHeight="100vh">
          <ServicesGrid />
        </LazySection>

        <LazySection minHeight="60vh">
          <SectionWithMockup
            title={
              <>
                Intelligence, <br />
                <span className="text-[#888]">delivered to you.</span>
              </>
            }
            description={
              <>
                Get a tailored Monday morning brief directly in your inbox, crafted by your virtual personal analyst,
                spotlighting essential watchlist stories and earnings for the week ahead.
              </>
            }
            primaryImageSrc="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=2000&auto=format&fit=crop"
            secondaryImageSrc="https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=2000&auto=format&fit=crop"
          />
        </LazySection>

        <LazySection minHeight="60vh">
          <ProcessTimeline />
        </LazySection>

        <LazySection minHeight="60vh">
          <SystemMetrics />
        </LazySection>

        <LazySection minHeight="60vh">
          <ClientTransmissions />
        </LazySection>

        <LazySection minHeight="60vh">
          <NeuralQuery />
        </LazySection>

        <LazySection minHeight="60vh">
          <FinalCTA />
        </LazySection>

      </main>
    </ReactLenis>
  );
}
