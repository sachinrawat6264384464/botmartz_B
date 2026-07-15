// app/layout.tsx
import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://botmartz.com"),
  title: {
    default: "Botmartz | AI Engineering for Production AI Systems",
    template: "%s | Botmartz"
  },
  description: "Botmartz helps organizations design, build, and deploy Enterprise RAG systems and AI Agents. Our engineering team works with modern AI technologies like PyTorch, LangGraph, and FastAPI.",
  keywords: [
    "AI Engineering",
    "Enterprise RAG",
    "AI Agents",
    "PyTorch",
    "LangGraph",
    "FastAPI",
    "Google ADK",
    "Production AI",
    "Botmartz",
    "Soham Sharma",
    "Document AI"
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
    title: "Botmartz | AI Engineering for Production AI Systems",
    description: "Botmartz helps organizations design, build, and deploy Enterprise RAG systems and AI Agents.",
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
    title: "Botmartz | AI Engineering for Production AI Systems",
    description: "Botmartz helps organizations design, build, and deploy Enterprise RAG systems and AI Agents.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Botmartz",
              "url": "https://botmartz.com",
              "logo": "https://botmartz.com/Logo-removebg-preview.png",
              "sameAs": [
                "https://www.linkedin.com/in/soham-sharma/",
                "https://github.com/botmartz"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "hello@botmartz.com",
                "contactType": "customer support"
              }
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
