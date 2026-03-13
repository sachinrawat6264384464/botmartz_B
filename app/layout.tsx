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
  title: "Botmartz - IT Solutions",
  description: "Transforming businesses through next-gen automation, intelligent software, and scalable digital ecosystems.",
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
          href="/botmartz_silver_bg_free.png"
          as="image"
          type="image/png"
        />
        {/* Preload the logo shown during preloader (first visit) */}
        <link
          rel="preload"
          href="/Botmartz_silver.png"
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
