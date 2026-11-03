"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText } from "lucide-react";
import { useSettings } from "@/app/client-layout";

const inter = { className: "" };
const mono = { className: "font-mono" };

export default function PrivacyPolicyPage() {
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
            <span>Document ID: SEC-PRIV-01</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-heading tracking-tight text-[#0F172A] mb-3">
            Privacy Policy
          </h1>
          <p className="text-slate-500 font-mono text-xs">
            Last Updated: July 2026 &bull; Botmartz AI Solutions
          </p>
        </div>
      </section>

      {/* ── 2. BODY CONTENT (LIGHT THEME) ── */}
      <section className="py-16 px-6 md:px-10 max-w-4xl mx-auto">
        <div className="space-y-10 text-slate-700 font-normal leading-relaxed">
          
          <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 leading-relaxed">
            <strong>Infrastructure Scope Note:</strong> This policy applies strictly to data collected directly through the <code>botmartz.com</code> website, contact inquiry forms, and community educational platforms. Client enterprise AI solutions, custom models, and enterprise knowledge systems are deployed directly in client-owned cloud VPCs or on-premises environments and are governed by dedicated Master Services Agreements (MSAs).
          </div>

          <section className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 font-heading">1. Information We Collect</h2>
            </div>
            <p>
              At {companyName}, we are committed to protecting your privacy. We collect information you provide directly to us when filling out our architecture review and contact forms, subscribing to our engineering briefs, or enrolling in our workshops. This may include your name, work email address, company name, project requirements, and communication details.
            </p>
          </section>

          <section className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 font-heading">2. How We Use Website Data</h2>
            </div>
            <p>
              We use the information collected on this website for legitimate business communication:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>To respond to your inquiries and schedule technical scoping calls.</li>
              <li>To deliver technical engineering briefs and newsletter releases.</li>
              <li>To manage workshop registrations and access to community platforms.</li>
              <li>To maintain website performance, security, and traffic monitoring.</li>
            </ul>
          </section>

          <section className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 font-heading">3. Information Sharing and Processing</h2>
            </div>
            <p>
              We do not sell, rent, or trade your personal data. Website data is processed securely through standard cloud providers (such as Google Cloud / Firebase for form handling and secure transactional mail services for communications) necessary to operate our website services.
            </p>
          </section>

          <section className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 font-heading">4. Your Rights and Inquiries</h2>
            </div>
            <p>
              You have the right to request access to the personal data we hold about you, request corrections, or request deletion. You can unsubscribe from our email communications at any time, or contact our engineering and compliance team directly at <a href={`mailto:${email}`} className="text-[#0066FF] font-medium hover:underline">{email}</a>.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
