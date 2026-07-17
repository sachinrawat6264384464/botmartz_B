// app/client-layout.tsx
"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { Footer } from "./_components/footer";

export default function ClientLayout({
  children,
  navbar,
}: {
  children: React.ReactNode;
  navbar: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div id="main-content">
        {!isAdminRoute && navbar}
        {children}
        {!isAdminRoute && <Footer />}
      </div>
    </ThemeProvider>
  );
}
