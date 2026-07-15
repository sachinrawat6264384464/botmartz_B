// app/client-layout.tsx
"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";

const Navbar = dynamic(() => import("./_components/navbar"), {
  ssr: false,
});

const Footer = dynamic(() => import("./_components/footer").then(m => ({ default: m.Footer })), {
  ssr: false,
});

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
