import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Botmartz | Scope Your AI & Web Project | Botmartz"
  },
  description: "Get in touch with Botmartz AI Solutions. Schedule a scoping call for custom AI agents, RAG pipelines, or web development.",
  keywords: [
    "Contact Botmartz",
    "Hire AI Developers Indore",
    "Web Scoping Call",
    "AI Consulting Contact"
  ],
  openGraph: {
    title: "Contact Botmartz | Scope Your AI & Web Project | Botmartz",
    description: "Get in touch with Botmartz AI Solutions. Schedule a scoping call for custom AI agents, RAG pipelines, or web development.",
    url: "https://www.botmartz.com/contact",
    type: "website",
  },
  alternates: {
    canonical: "https://www.botmartz.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
