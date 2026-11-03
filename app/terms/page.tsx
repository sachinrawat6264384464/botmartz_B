"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Scale, HelpCircle, FileText } from "lucide-react";
import { useSettings } from "@/app/client-layout";

const inter = { className: "" };
const mono = { className: "font-mono" };

export default function TermsOfServicePage() {
  const settings = useSettings();
  const email = settings?.general?.email || "team@botmartz.com";
  const companyName = settings?.general?.companyName || "Botmartz AI Solutions";

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      
      {/* ── 1. HERO SECTION: LUMINOUS ARCHITECTURAL WHITE WITH WARM ORANGE & BLUE ACCENTS ── */}
      <section className="relative pt-[140px] pb-[70px] overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAFDFE] to-white text-slate-900 border-b border-[#E2E8F0]">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-400/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0284C7]/10 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 md:px-10 relative z-10">
          <div className={`${mono.className} inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-xs font-mono font-bold uppercase mb-4`}>
            <Shield className="w-3.5 h-3.5 text-orange-600" />
            <span>Document ID: SEC-TERMS-01</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-heading tracking-tight text-[#0F172A] mb-3">
            Terms of Service
          </h1>
          <p className="text-slate-500 font-mono text-xs">
            Last Updated: July 2026 &bull; Botmartz AI Solutions
          </p>
        </div>
      </section>

      {/* ── 2. BODY CONTENT (LIGHT THEME) ── */}
      <section className="py-16 px-6 md:px-10 max-w-4xl mx-auto">
        <div className="space-y-10 text-slate-700 font-normal leading-relaxed">
          <section className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
                <Scale className="w-4 h-4" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 font-heading">1. Acceptance of Terms</h2>
            </div>
            <p>
              By accessing and using the {companyName} website, products, training programs, and consulting services, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our site or enroll in our programs.
            </p>
          </section>

          <section className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 font-heading">2. Use of Services and Workshops</h2>
            </div>
            <p>
              When participating in our AI Accelerator bootcamps, workshops, or training modules, you are granted a limited, non-exclusive, non-transferable license to access our educational content for personal or internal business upskilling. You may not distribute, reproduce, or resell our materials without prior written consent.
            </p>
          </section>

          <section className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 font-heading">3. Intellectual Property</h2>
            </div>
            <p>
              All code, designs, graphics, course curricula, slides, and codebase assets created by {companyName} are the exclusive property of Botmartz AI Solutions. Open-source repositories published under MIT or Apache 2.0 licenses are governed by their respective open-source license agreements.
            </p>
          </section>

          <section className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 font-heading">4. Limitation of Liability</h2>
            </div>
            <p>
              Our website materials and open-source prototypes are provided &quot;as is&quot; without warranties of any kind. Custom enterprise engineering engagements are governed by individual Master Services Agreements. For inquiries regarding our terms, please email <a href={`mailto:${email}`} className="text-[#0066FF] font-medium hover:underline">{email}</a>.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
