import { Metadata } from "next";
import Hero from "./_components/Hero";
import JourneyTimeline from "./_components/JourneyTimeline";
import BootcampDetails from "./_components/BootcampDetails";
import Pricing from "./_components/Pricing";
import WhatsIncluded from "./_components/WhatsIncluded";
import Instructor from "./_components/Instructor";
import FAQ from "./_components/FAQ";
import FinalCTA from "./_components/FinalCTA";
import NavbarWrapper from "@/app/_components/NavbarWrapper";

export const metadata: Metadata = {
  title: "AI Frontier Engineering Bootcamp Series | Botmartz",
  description: "The official runway to AI Frontier 2026. Build production-ready AI applications through three live, hands-on engineering bootcamps.",
  openGraph: {
    title: "AI Frontier Bootcamps | Botmartz",
    description: "Join the live engineering bootcamps leading up to AI Frontier 2026. Build production-ready AI applications.",
    url: "https://www.botmartz.com/community/ai-frontier-bootcamps",
    type: "website",
  },
  alternates: {
    canonical: "https://www.botmartz.com/community/ai-frontier-bootcamps",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "AI Frontier Engineering Bootcamp Series",
  "description": "Three live engineering bootcamps covering AI full-stack apps, autonomous agents, and production RAG deployments.",
  "provider": {
    "@type": "Organization",
    "name": "Botmartz AI Solutions",
    "sameAs": "https://www.botmartz.com"
  },
  "courseMode": "online",
  "offers": {
    "@type": "Offer",
    "price": "399",
    "priceCurrency": "INR",
    "category": "Paid"
  }
};

export default function AIFrontierPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <NavbarWrapper />
      <main>
        <Hero />
        <JourneyTimeline />
        <BootcampDetails />
        <WhatsIncluded />
        <Pricing />
        <Instructor />
        <FAQ />
        <FinalCTA />
      </main>
    </div>
  );
}
