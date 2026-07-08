import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Soham Sharma & Botmartz AI Solutions",
  description: "Learn about Soham Sharma (GenAI Architect) and the mission of Botmartz to build advanced agentic systems and high-performance digital ecosystems.",
  keywords: [
    "Soham Sharma",
    "GenAI Architect Indore",
    "Botmartz Founder",
    "AI Consulting Indore",
    "Botmartz Team"
  ],
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
