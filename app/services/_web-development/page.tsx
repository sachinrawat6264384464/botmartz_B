import { Metadata } from "next";
import WebDevelopmentClient from "./WebDevelopmentClient";

export const metadata: Metadata = {
  title: "Custom Web Solutions, E-commerce & Edge Systems",
  description: "High-performance web development utilizing Next.js, Edge CDN, dynamic server-side rendering (SSR), and secure custom integrations with Stripe.",
  keywords: [
    "Web Development Solutions",
    "Next.js Developer Indore",
    "Edge System Architecture",
    "Stripe Integration Developer",
    "Custom E-commerce Platform",
    "Botmartz Web Development",
    "React dynamic web apps",
    "SSR Server Side Rendering Nextjs",
    "High performance websites",
    "PCI DSS Stripe checkout",
    "Indore Web Development Agency",
    "Full Stack developer Indore",
    "Edge CDN deployment Nextjs"
  ],
  openGraph: {
    title: "Web Solutions & Edge Systems | Botmartz",
    description: "High-performance web development utilizing Next.js, Edge CDN, dynamic server-side rendering (SSR), and secure custom integrations with Stripe.",
    url: "https://www.botmartz.com/services/web-development",
    type: "website",
  },
  alternates: {
    canonical: "https://www.botmartz.com/services/web-development",
  },
};

export default function WebDevelopmentPage() {
  return <WebDevelopmentClient />;
}
