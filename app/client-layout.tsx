// app/client-layout.tsx
"use client";
import React, { createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { Footer } from "./_components/footer";

export const SettingsContext = createContext<any>({});
export const useSettings = () => useContext(SettingsContext);

import { AccessibilityProvider } from "./_context/AccessibilityContext";
import { AccessibilityToolbox } from "./_components/AccessibilityToolbox";

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
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <SettingsContext.Provider value={settings || {}}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AccessibilityProvider>
        <div className="min-h-screen flex flex-col">
          {/* WCAG Skip to Main Content Link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2.5 focus:bg-[#0052FF] focus:text-white focus:font-bold focus:rounded-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-white"
          >
            Skip to main content
          </a>
          {!isAdminRoute && navbar}
          <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          {!isAdminRoute && <Footer settings={settings} />}
          {!isAdminRoute && <AccessibilityToolbox />}
        </div>
      </AccessibilityProvider>
      </ThemeProvider>
    </SettingsContext.Provider>
  );
}
