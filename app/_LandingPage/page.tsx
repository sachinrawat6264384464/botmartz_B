"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { Space_Grotesk } from 'next/font/google';
import { cn } from "@/lib/utils";

// Components
import { Navbar } from "./Components/navbar";
import HeroSection from "./Components/hero-section";
import { MarqueeSection } from "./Components/marquee-section";
import { ServicesGrid } from "./Components/services-grid";
import IndustrialMockup from "./Components/IndustrialMockup"; // New Component
import { ProcessTimeline } from "./Components/process-timeline";
import { SystemMetrics } from "./Components/system-metrics";
import { ProjectManifest } from "./Components/project-manifest";
import { ClientTransmissions } from "./Components/client-transmissions";
import { NeuralQuery } from "./Components/neural-query";
import { FinalCTA } from "./Components/final-cta";
import { FooterTerminal } from "./Components/footer-terminal";
import SectionWithMockup from "./Components/IndustrialMockup";

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['300', '500', '700'] });

// Theme Accent for global consistency
const ACCENT = "#FF5500"; 

export default function BotmartzLandingPage() {
  return (
    <ReactLenis root options={{ lerp: 0.06, duration: 1.2 }}>
      <main className={cn(
        "bg-[#050505] text-[#E0E0E0] min-h-screen w-full relative overflow-x-hidden",
        // UPDATED: Selection color matches the Safety Orange theme
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
        
        {/* --- NEW: TECH SHOWCASE SECTIONS --- */}
      <SectionWithMockup
    title={
        <>
            Intelligence, <br />
            <span className="text-[#888]">delivered to you.</span>
        </>
    }
    description={
        <>
            Get a tailored Monday morning brief directly in your inbox, crafted by your 
            virtual personal analyst, spotlighting essential watchlist stories and earnings 
            for the week ahead.
        </>
    }
    // Replace this with your actual card image URL
    primaryImageSrc="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=2000&auto=format&fit=crop"
    // Optional: Add a second image if you want the layered look
    secondaryImageSrc="https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=2000&auto=format&fit=crop"
/>
        {/* ----------------------------------- */}

        <ProcessTimeline />
        
        <SystemMetrics />
        
        <ProjectManifest />
        
        <ClientTransmissions />
        
        <NeuralQuery />
        
        <FinalCTA />
        
        <FooterTerminal />
        
      </main>
    </ReactLenis>
  );
}