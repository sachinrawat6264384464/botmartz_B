"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-24 bg-[#0B1C2C] text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[40px] md:text-[56px] font-extrabold text-white tracking-tight leading-tight mb-6">
            Ready to Engineer the Future?
          </h2>
          <p className="text-xl text-[#8A9EB0] mb-10 font-medium">
            Join the Botmartz AI Engineering community and start building production-grade AI systems today.
          </p>
          <Link
            href="#bootcamps"
            className="inline-flex items-center justify-center gap-2 bg-[#0066FF] text-white px-8 py-5 rounded-xl font-bold text-lg hover:bg-[#0052CC] transition-all shadow-[0_4px_20px_rgba(0,102,255,0.3)] hover:shadow-[0_4px_25px_rgba(0,102,255,0.5)] hover:-translate-y-1 w-full sm:w-auto"
          >
            Register Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
