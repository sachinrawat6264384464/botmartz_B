import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work & Case Studies | Botmartz Portfolio",
  description: "Explore our portfolio of successful projects including custom web apps, AI integrations, E-commerce stores, and high-performance digital systems.",
  keywords: [
    "Botmartz Portfolio",
    "AI Case Studies",
    "Web App Development Indore",
    "Completed AI Projects"
  ],
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
