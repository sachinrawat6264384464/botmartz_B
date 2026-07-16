// app/client-layout.tsx
"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";
import Navbar from "./_components/navbar";
import { Footer } from "./_components/footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div id="main-content">
        {!isAdminRoute && <Navbar />}
        {children}
        {!isAdminRoute && <Footer />}
      </div>
    </ThemeProvider>
  );
}
