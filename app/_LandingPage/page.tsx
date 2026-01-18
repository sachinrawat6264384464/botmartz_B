"use client";

import dynamic from 'next/dynamic';
import { ReactLenis } from "lenis/react";
import { Space_Grotesk } from 'next/font/google';
import { cn } from "@/lib/utils";

// Import lightweight components normally
import Navbar  from "./Components/navbar";
import HeroSection from "./Components/hero-section";
import  MarqueeSection  from "./Components/marquee-section";

// Lazy load heavy components with loading states
const ServicesGrid = dynamic(() => import('./Components/services-grid').then(mod => ({ default: mod.ServicesGrid })), {
  loading: () => <div className="min-h-screen" />,
  ssr: true
});

const SectionWithMockup = dynamic(() => import('./Components/IndustrialMockup'), {
  loading: () => <div className="min-h-screen" />,
  ssr: false // Don't render on server
});

const ProcessTimeline = dynamic(() => import('./Components/process-timeline').then(mod => ({ default: mod.ProcessTimeline })), {
  loading: () => <div className="min-h-screen" />,
  ssr: true
});

const SystemMetrics = dynamic(() => import('./Components/system-metrics').then(mod => ({ default: mod.SystemMetrics })), {
  loading: () => <div className="min-h-screen" />,
  ssr: true
});

// const ProjectManifest = dynamic(() => import('./Components/project-manifest').then(mod => ({ default: mod.ProjectManifest })), {
//   loading: () => <div className="min-h-screen" />,
//   ssr: true
// });

const ClientTransmissions = dynamic(() => import('./Components/client-transmissions').then(mod => ({ default: mod.ClientTransmissions })), {
  loading: () => <div className="min-h-screen" />,
  ssr: true
});

const NeuralQuery = dynamic(() => import('./Components/neural-query'), {
  loading: () => <div className="min-h-screen" />,
  ssr: true
});

const FinalCTA = dynamic(() => import('./Components/final-cta').then(mod => ({ default: mod.FinalCTA })), {
  loading: () => <div className="min-h-screen" />,
  ssr: true
});

const FooterTerminal = dynamic(() => import('./Components/footer-terminal').then(mod => ({ default: mod.FooterTerminal })), {
  loading: () => <div className="min-h-screen" />,
  ssr: true
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  weight: ['300', '500', '700'],
  display: 'swap',
  preload: true
});

const ACCENT = "#FF5500"; 

export default function BotmartzLandingPage() {
  return (
    <ReactLenis root options={{ lerp: 0.06, duration: 1.2 }}>
      <main className={cn(
        "bg-[#050505] text-[#E0E0E0] min-h-screen w-full relative overflow-x-hidden",
        `selection:bg-[${ACCENT}]/30 selection:text-[${ACCENT}]`,
        spaceGrotesk.className
      )}>
        
        {/* Cinematic Grain Overlay */}
        <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.035] mix-blend-overlay" 
             style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        
        <Navbar />
        <HeroSection />
        <MarqueeSection />
        <ServicesGrid />
        <SectionWithMockup
          title={<>Intelligence, <br /><span className="text-[#888]">delivered to you.</span></>}
          description={<>Get a tailored Monday morning brief directly in your inbox, crafted by your virtual personal analyst, spotlighting essential watchlist stories and earnings for the week ahead.</>}
          primaryImageSrc="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=2000&auto=format&fit=crop"
          secondaryImageSrc="https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=2000&auto=format&fit=crop"
        />
        <ProcessTimeline />
        <SystemMetrics />
        {/* <ProjectManifest /> */}
        <ClientTransmissions />
        <NeuralQuery />
        <FinalCTA />
        <FooterTerminal />
        
      </main>
    </ReactLenis>
  );
}