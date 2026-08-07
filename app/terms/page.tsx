"use client";

import React from "react";
import { motion } from "framer-motion";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Shield, Scale, HelpCircle, FileText } from "lucide-react";
import { useSettings } from "@/app/client-layout";

const inter = Inter_Tight({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });

export default function TermsOfServicePage() {
  const settings = useSettings();
  const email = settings?.general?.email || "soham@botmartz.com";
  const companyName = settings?.general?.companyName || "Botmartz AI Solutions";

  return (
    <main className={`${inter.className} min-h-screen bg-[#080808] text-white pt-36 pb-20 px-6 md:px-10 lg:px-16`}>
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#D4AF37]/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 border-b border-white/10 pb-8"
        >
          <div className={`${mono.className} inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[#D4AF37] text-[10px] tracking-widest uppercase mb-4`}>
            <Shield className="w-3 h-3" />
            <span>Document ID: SEC-TERMS-01</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase text-white drop-shadow-md">Terms of Service</h1>
          <p className="text-gray-400 mt-2 font-mono text-xs">Last Updated: July 8, 2026</p>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-10 text-gray-300 font-light leading-relaxed">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <Scale className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide">1. Acceptance of Terms</h2>
            </div>
            <p>
              By accessing and using the {companyName} website, products, training programs, and consulting services, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our site or enroll in our programs.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide">2. Use of Services and Bootcamps</h2>
            </div>
            <p>
              When participating in our GenAI Bootcamps, courses, or training modules, you are granted a limited, non-exclusive, non-transferable license to access our educational content for personal or internal business upskilling. You may not distribute, reproduce, or resell our materials without prior written consent.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide">3. Intellectual Property</h2>
            </div>
            <p>
              All code, designs, graphics, course curricula, slides, and codebase assets created by {companyName} are the exclusive property of Botmartz and Soham Sharma. Any unauthorized copying or replication of our systems (including our proprietary training blueprints) is strictly prohibited.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide">4. Limitation of Liability</h2>
            </div>
            <p>
              Our services and products are provided &quot;as is&quot; without warranties of any kind. {companyName} will not be held liable for any direct or indirect damages resulting from the use or inability to use our software, tools, or educational courses. For inquiries regarding our terms, please email <a href={`mailto:${email}`} className="text-[#D4AF37] hover:underline">{email}</a>.
            </p>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
