import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Search, Terminal } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-[#050B14] text-white px-6 py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#0052FF]/15 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-xl w-full text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-mono text-xs font-semibold mb-6">
          <Terminal className="w-3.5 h-3.5" />
          <span>HTTP 404 &bull; ROUTE_NOT_FOUND</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black font-heading tracking-tight text-white mb-4">
          Page Not Found
        </h1>

        <p className="text-slate-400 text-base sm:text-lg mb-8 leading-relaxed">
          The requested route does not exist or has been relocated. Return to our engineering hub or explore our production reference implementations.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white text-sm font-semibold transition-colors shadow-lg shadow-blue-500/20"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/work/labs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-sm font-semibold transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Reference Labs</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
