// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://botmartz.com"),
  title: {
    default: "Botmartz | Premium Generative AI & Automation Solutions",
    template: "%s | Botmartz"
  },
  description: "Transforming enterprise performance through intelligent AI agents, custom RAG systems, and next-gen workflow automation ecosystems.",
  keywords: [
    "Generative AI Solutions",
    "Enterprise AI Agents",
    "Custom RAG Systems",
    "Workflow Automation",
    "AI Consulting",
    "Indore AI Company",
    "Botmartz",
    "Soham Sharma",
    "GenAI Architect",
    "Corporate AI Training",
    "Next.js Development Agency",
    "Large Language Models LLM",
    "Vector Database integration",
    "LlamaIndex LangChain",
    "Agentic AI Development",
    "Custom Chatbot Solutions",
    "Software Development Indore"
  ],
  authors: [{ name: "Soham Sharma", url: "https://www.linkedin.com/in/soham-sharma/" }],
  creator: "Soham Sharma",
  publisher: "Botmartz",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://botmartz.com",
    title: "Botmartz | Premium Generative AI & Automation Solutions",
    description: "Transforming enterprise performance through intelligent AI agents, custom RAG systems, and next-gen workflow automation ecosystems.",
    siteName: "Botmartz",
    images: [
      {
        url: "/BotmartzNewLogo.png",
        width: 1200,
        height: 630,
        alt: "Botmartz AI Solutions Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Botmartz | Premium Generative AI & Automation Solutions",
    description: "Transforming enterprise performance through intelligent AI agents, custom RAG systems, and next-gen workflow automation ecosystems.",
    images: ["/BotmartzNewLogo.png"],
    creator: "@botmartz"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to font CDN */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for Unsplash images */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Preload the logo used in the navbar (renders immediately on all pages) */}
        <link
          rel="preload"
          href="/BotmartznewBot.png"
          as="image"
          type="image/png"
        />
        {/* Preload the logo shown during preloader (first visit) */}
        <link
          rel="preload"
          href="/BotmartzNewLogo.png"
          as="image"
          type="image/png"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
