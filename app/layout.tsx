import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en">
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://grainy-gradients.vercel.app" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/Botmartz_silver.png" as="image" />
        
        <style dangerouslySetInnerHTML={{
          __html: `
            body {
              background-color: #050505;
            }
            #main-content {
              opacity: 0;
              visibility: hidden;
            }
            #main-content.loaded {
              opacity: 1;
              visibility: visible;
              transition: opacity 0.8s ease-out;
            }
          `
        }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}