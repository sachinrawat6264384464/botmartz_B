"use client";

import React from "react";
import { motion } from "framer-motion";
import { JetBrains_Mono } from "next/font/google";
import { Shield, Eye, Settings, ShieldAlert } from "lucide-react";
import { useSettings } from "@/app/client-layout";

const inter = { className: "" };
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });

export default function CookiePolicyPage() {
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
            <span>Document ID: SEC-COOK-01</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase text-white drop-shadow-md">Cookie Policy</h1>
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
              <Eye className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide">1. What Are Cookies?</h2>
            </div>
            <p>
              {companyName} uses cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. They help us remember your preferences, keep our admin dashboard secure, and analyze site traffic patterns to improve your browsing experience.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide">2. How We Use Cookies</h2>
            </div>
            <p>
              We use the following types of cookies on our site:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li><strong>Strictly Necessary Cookies:</strong> Essential for accessing the admin panel and verifying auth state during login sessions.</li>
              <li><strong>Performance & Analytics Cookies:</strong> Third-party integrations (such as Firebase Analytics) which monitor aggregated page visits and loading times.</li>
              <li><strong>Functionality Cookies:</strong> Used to remember your preference parameters (such as dismissals of preloaders).</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide">3. Managing and Deactivating Cookies</h2>
            </div>
            <p>
              You can block or delete cookies through your web browser settings. However, disabling strictly necessary cookies will prevent you from logging in and accessing the protected admin CMS features. For any cookie policy questions, contact <a href={`mailto:${email}`} className="text-[#D4AF37] hover:underline">{email}</a>.
            </p>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
