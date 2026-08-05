"use client";

import { Award, CheckCircle2, ShieldCheck, Download, Share2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CertificateShowcase() {
  return (
    <section id="certificate" className="py-20 bg-gradient-to-b from-[#050B14] to-[#0A1628] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-[#0066FF]/15 to-[#00B8F0]/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-[#0066FF]/15 border border-[#0066FF]/30 text-[#00B8F0] text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-4">
            <Award className="w-4 h-4 text-[#00B8F0]" /> Verified Engineering Credentials
          </span>
          <h2 className="text-[30px] sm:text-[40px] font-bold tracking-tight text-white mb-3">
            Earn Your Verified Certificate of Completion
          </h2>
          <p className="text-base sm:text-lg text-[#8A9EB0] max-w-2xl mx-auto font-medium">
            Every attendee who completes the AI Accelerator Workshop receives an official, shareable Botmartz Certificate of Completion.
          </p>
        </div>

        {/* Certificate Card Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-[#0F1C2E] border-2 border-[#1E293B] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,102,255,0.15)] relative overflow-hidden group hover:border-[#0066FF]/40 transition-all"
        >
          {/* Certificate Inner Frame */}
          <div className="border border-dashed border-[#0066FF]/30 rounded-2xl p-6 sm:p-8 relative bg-gradient-to-br from-[#0B1524] to-[#0A111D]">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#1E293B] pb-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#00B8F0] flex items-center justify-center font-extrabold text-white text-lg shadow-md">
                  B
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base tracking-wide uppercase">BOTMARTZ AI SOLUTIONS</h3>
                  <p className="text-xs text-[#00B8F0] font-semibold">AI Engineering Credential Authority</p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Officially Verified Credential
              </div>
            </div>

            {/* Main Content */}
            <div className="text-center py-4 sm:py-6">
              <p className="text-xs font-bold tracking-[0.2em] text-[#8A9EB0] uppercase mb-2">CERTIFICATE OF ACCOMPLISHMENT</p>
              <h4 className="text-xl sm:text-3xl font-extrabold text-white mb-2">PROUDLY PRESENTED TO</h4>
              <div className="my-4 inline-block border-b-2 border-[#0066FF] px-8 py-2">
                <span className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00B8F0] to-[#0066FF]">
                  [Your Full Name]
                </span>
              </div>
              <p className="text-sm text-[#8A9EB0] max-w-xl mx-auto mt-2 leading-relaxed">
                For successfully completing the intensive hands-on engineering training on <strong className="text-white">AI Accelerator Workshop Series: Building Production AI Applications & Agents</strong>.
              </p>
            </div>

            {/* Footer Signatures & Seal */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-[#1E293B] mt-6">
              <div className="text-center sm:text-left">
                <p className="text-xs font-bold text-[#8A9EB0] uppercase">ISSUED BY</p>
                <p className="text-sm font-extrabold text-white">Botmartz Academy</p>
                <p className="text-[11px] font-mono text-[#64748B]">Indore, MP, India</p>
              </div>

              {/* Seal Badge */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#D97706] via-[#F59E0B] to-[#FDE047] p-0.5 shadow-lg flex items-center justify-center shrink-0">
                <div className="w-full h-full rounded-full bg-[#0B1524] flex flex-col items-center justify-center p-1 text-center border border-[#F59E0B]">
                  <Award className="w-6 h-6 text-[#F59E0B]" />
                  <span className="text-[7px] font-black text-[#F59E0B] uppercase tracking-tighter leading-none mt-0.5">VERIFIED</span>
                </div>
              </div>

              <div className="text-center sm:text-right">
                <p className="text-xs font-bold text-[#8A9EB0] uppercase">CREDENTIAL ID</p>
                <p className="text-xs font-mono font-bold text-[#00B8F0]">BM-2026-CERT-890</p>
                <p className="text-[11px] font-mono text-[#64748B]">August 2026</p>
              </div>
            </div>
          </div>

          {/* Feature Badges below certificate */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-2">
            <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10">
              <Download className="w-5 h-5 text-[#00B8F0] shrink-0" />
              <span className="text-xs font-semibold text-white">High-Res PDF Download</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10">
              <Share2 className="w-5 h-5 text-[#00B8F0] shrink-0" />
              <span className="text-xs font-semibold text-white">Add to LinkedIn Profile</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-xs font-semibold text-white">Scan & QR Verifiable</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
