import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Our Work & Case Studies | Botmartz Portfolio | Botmartz"
  },
  description: "Explore our portfolio of successful projects including custom web apps, AI integrations, E-commerce stores, and high-performance digital systems.",
  keywords: [
    "Botmartz Portfolio",
    "AI Case Studies",
    "Web App Development Indore",
    "Completed AI Projects"
  ],
  openGraph: {
    title: "Our Work & Case Studies | Botmartz Portfolio | Botmartz",
    description: "Explore our portfolio of successful projects including custom web apps, AI integrations, E-commerce stores, and high-performance digital systems.",
    url: "https://www.botmartz.com/work",
    type: "website",
  },
  alternates: {
    canonical: "https://www.botmartz.com/work",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
