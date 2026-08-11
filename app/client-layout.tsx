// app/client-layout.tsx
"use client";
import React, { createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { Footer } from "./_components/footer";

export const SettingsContext = createContext<any>({});
export const useSettings = () => useContext(SettingsContext);

import { AccessibilityProvider } from "./_context/AccessibilityContext";
import dynamic from "next/dynamic";

const AccessibilityToolbox = dynamic(
  () => import("./_components/AccessibilityToolbox").then((mod) => mod.AccessibilityToolbox),
  { ssr: false }
);
const FloatingOfferWidget = dynamic(() => import("./_components/FloatingOfferWidget"), { ssr: false });
const AnalyticsProvider = dynamic(() => import("./_components/AnalyticsProvider"), { ssr: false });

export default function ClientLayout({
  children,
  navbar,
  settings,
}: {
  children: React.ReactNode;
  navbar: React.ReactNode;
  settings?: any;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isStandaloneRoute = pathname?.startsWith('/admin') || pathname?.includes('/feedback') || false;

  return (
    <SettingsContext.Provider value={settings || {}}>
      <AnalyticsProvider />
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AccessibilityProvider>
          <div className="min-h-screen flex flex-col" suppressHydrationWarning>
            {/* WCAG Skip to Main Content Link */}
            <a
              href="#main-content"
              suppressHydrationWarning
              className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2.5 focus:bg-[#0052FF] focus:text-white focus:font-bold focus:rounded-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-white"
            >
              Skip to main content
            </a>
            {!isStandaloneRoute && navbar}
            <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none" suppressHydrationWarning>
              {children}
            </main>
            {!isStandaloneRoute && <Footer settings={settings} />}
            {!isStandaloneRoute && <AccessibilityToolbox />}
            {!isStandaloneRoute && <FloatingOfferWidget />}
          </div>
        </AccessibilityProvider>
      </ThemeProvider>
    </SettingsContext.Provider>
  );
}
