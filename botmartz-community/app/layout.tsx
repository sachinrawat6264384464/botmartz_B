import type { Metadata } from "next";
import "./globals.css";
import CommunityNavbar from "./_components/Navbar";
import CommunityFooter from "./_components/Footer";

export const metadata: Metadata = {
  title: "Botmartz Community & Events | Conferences, Bootcamps & AI Builders",
  description: "The official developer and AI builder community of Botmartz. AI Frontier conferences, hands-on workshops, certificate verification, and developer meetups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050B14] text-white min-h-screen flex flex-col antialiased">
        <CommunityNavbar />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <CommunityFooter />
      </body>
    </html>
  );
}
