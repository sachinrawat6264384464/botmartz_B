import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Botmartz | Scope Your AI Implementation | Botmartz"
  },
  description: "Get in touch with Botmartz AI Solutions. Schedule an architecture review or discovery scoping call for enterprise RAG, AI agents, and custom AI systems.",
  keywords: [
    "Contact Botmartz",
    "AI Architecture Review",
    "Enterprise RAG Scoping Call",
    "AI Engineering Consulting"
  ],
  openGraph: {
    title: "Contact Botmartz | Scope Your AI Implementation | Botmartz",
    description: "Get in touch with Botmartz AI Solutions. Schedule an architecture review or discovery scoping call for enterprise RAG, AI agents, and custom AI systems.",
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
