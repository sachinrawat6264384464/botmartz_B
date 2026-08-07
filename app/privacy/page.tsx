"use client";

import React from "react";
import { motion } from "framer-motion";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Shield, Lock, Eye, FileText } from "lucide-react";
import { useSettings } from "@/app/client-layout";

const inter = Inter_Tight({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });

export default function PrivacyPolicyPage() {
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
            <span>Document ID: SEC-PRIV-01</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase text-white drop-shadow-md">Privacy Policy</h1>
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
              <Lock className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide">1. Information We Collect</h2>
            </div>
            <p>
              At {companyName}, we are committed to protecting your privacy. We collect information you provide directly to us when filling out our contact forms, subscribing to our newsletter, or enrolling in our GenAI Bootcamps. This may include your name, email address, phone number, company name, and any other details you share.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide">2. How We Use Your Data</h2>
            </div>
            <p>
              We use the collected information for the following business purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>To respond to your inquiries and schedule scoping calls.</li>
              <li>To deliver newsletter updates and educational campaign briefs.</li>
              <li>To manage student registrations and access to the GenAI Bootcamp platforms.</li>
              <li>To maintain the security and stability of our website infrastructure.</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide">3. Information Sharing and Disclosure</h2>
            </div>
            <p>
              We do not sell, rent, or trade your personal data with third parties. Your data is stored securely using Google Firebase and is only processed through safe third-party applications (such as Cloudinary for media and Gmail/Nodemailer for communications) needed to run our services.
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
              <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide">4. Your Rights and Choices</h2>
            </div>
            <p>
              You have the right to request access to the personal data we hold about you, request corrections, or request deletion. You can unsubscribe from our newsletter at any time by clicking the &quot;Unsubscribe&quot; link in our emails, or contact us directly at <a href={`mailto:${email}`} className="text-[#D4AF37] hover:underline">{email}</a> to request data removal.
            </p>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
