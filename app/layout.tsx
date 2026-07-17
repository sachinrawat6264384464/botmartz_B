// app/layout.tsx
import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";
import { adminDb } from "@/lib/firebase-admin";
import StructuredData from "./_components/StructuredData";
import NavbarWrapper from "./_components/NavbarWrapper";
import Script from "next/script";

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

export async function generateMetadata(): Promise<Metadata> {
  let settings: any = {};
  try {
    const docSnap = await adminDb.collection('settings').doc('global').get();
    if (docSnap.exists) {
      settings = docSnap.data();
    }
  } catch (err) {
    console.error("Failed to fetch global settings for metadata:", err);
  }

  const seo = settings.seo || {};
  const general = settings.general || {};

  return {
    metadataBase: new URL(general.websiteUrl || "https://botmartz.com"),
    title: {
      default: "Botmartz | AI Engineering for Production AI Systems",
      template: `%s ${seo.titleSuffix || "| Botmartz"}`
    },
    description: seo.globalDescription || seo.geoEntityDescription || seo.aeoBrandPersona || "Botmartz helps organizations design, build, and deploy Enterprise RAG systems and AI Agents. Our engineering team works with modern AI technologies like PyTorch, LangGraph, and FastAPI.",
    keywords: seo.globalKeywords ? seo.globalKeywords.split(',').map((k: string) => k.trim()) : [
      "AI Engineering",
      "Enterprise RAG",
      "AI Agents",
      "PyTorch",
      "LangGraph",
      "FastAPI",
      "Google ADK",
      "Production AI",
      "Botmartz",
      "Document AI"
    ],
    authors: [{ name: "Botmartz Team", url: general.websiteUrl || "https://botmartz.com" }],
    creator: "Botmartz",
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
      url: general.websiteUrl || "https://botmartz.com",
      title: "Botmartz | AI Engineering for Production AI Systems",
      description: seo.globalDescription || seo.geoEntityDescription || "Botmartz helps organizations design, build, and deploy Enterprise RAG systems and AI Agents.",
      siteName: general.companyName || "Botmartz",
      images: [
        {
          url: seo.ogImageUrl || "/BotmartznewBot.png",
          width: 1200,
          height: 630,
          alt: "Botmartz AI Solutions Logo"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "Botmartz | AI Engineering for Production AI Systems",
      description: seo.globalDescription || seo.geoEntityDescription || "Botmartz helps organizations design, build, and deploy Enterprise RAG systems and AI Agents.",
      images: [seo.ogImageUrl || "/BotmartznewBot.png"],
      creator: "@botmartz"
    }
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings: any = {};
  try {
    const docSnap = await adminDb.collection('settings').doc('global').get();
    if (docSnap.exists) {
      settings = docSnap.data();
    }
  } catch (err) {
    console.error("Failed to fetch global settings for JSON-LD:", err);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* DNS prefetch for Unsplash images */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Preconnect to Firestore API */}
        <link rel="preconnect" href="https://firestore.googleapis.com" />
        {/* Preload the logo used in the navbar */}
        <link
          rel="preload"
          href="/Logo-removebg-preview.png"
          as="image"
          type="image/png"
        />
        {/* Structured Data for SEO/AEO/GEO */}
        <StructuredData data={settings} />

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-P6ZX82D');
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P6ZX82D"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        
        <ClientLayout navbar={<NavbarWrapper />}>{children}</ClientLayout>
      </body>
    </html>
  );
}
