import { Metadata } from "next";
import Hero from "./_components/Hero";
import JourneyTimeline from "./_components/JourneyTimeline";
import BootcampDetails from "./_components/BootcampDetails";
import WhatsIncluded from "./_components/WhatsIncluded";
import CertificateShowcase from "./_components/CertificateShowcase";
import Instructor from "./_components/Instructor";
import FAQ from "./_components/FAQ";
import FinalCTA from "./_components/FinalCTA";

export const metadata: Metadata = {
  title: "AI Accelerator Workshop | Botmartz",
  description: "The official runway to AI Frontier 2026. Build production-ready AI applications through live, hands-on engineering workshops.",
  openGraph: {
    title: "AI Accelerator Workshop | Botmartz",
    description: "Join the live engineering workshops leading up to AI Frontier 2026. Build production-ready AI applications.",
    url: "https://www.botmartz.com/community/ai-accelerator-workshop",
    type: "website",
    images: [
      {
        url: "https://www.botmartz.com/ai-engineering-pass-banner.jpg",
        width: 1200,
        height: 630,
        alt: "AI Engineering Pass Poster | Botmartz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Accelerator Workshop | Botmartz",
    description: "Join the live engineering workshops leading up to AI Frontier 2026. Build production-ready AI applications.",
    images: ["https://www.botmartz.com/ai-engineering-pass-banner.jpg"],
  },
  alternates: {
    canonical: "https://www.botmartz.com/community/ai-accelerator-workshop",
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
      <main>
        <Hero />
        <JourneyTimeline />
        <BootcampDetails />
        <WhatsIncluded />
        {/* <CertificateShowcase /> */}
        <Instructor />
        <FAQ />
        <FinalCTA />
      </main>
    </div>
  );
}
