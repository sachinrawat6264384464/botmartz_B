"use client";

import { Award, CheckCircle2, ShieldCheck, Download, Share2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CertificateShowcase() {
  return (
    <section id="certificate" className="py-16 sm:py-24 bg-gradient-to-b from-[#050B14] via-[#0A1628] to-[#050B14] text-white relative overflow-hidden">
      {/* kjhkhhjBackground Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[400px] bg-gradient-to-r from-[#0066FF]/15 to-[#00B8F0]/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 bg-[#0066FF]/15 border border-[#0066FF]/30 text-[#00B8F0] text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-4">
            <Award className="w-4 h-4 text-[#00B8F0]" /> Verified Engineering Credentials
          </span>
          <h2 className="text-2xl sm:text-[40px] font-bold tracking-tight text-white mb-3 leading-tight">
            Earn Your Verified Certificate of Completion
          </h2>
          <p className="text-sm sm:text-lg text-[#8A9EB0] max-w-2xl mx-auto font-medium">
            Every attendee who completes the AI Accelerator Workshop receives an official, shareable Botmartz Certificate of Completion.
          </p>
        </div>

        {/* Certificate Card Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-[#0F1C2E] border-2 border-[#1E293B] rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-[0_20px_50px_rgba(0,102,255,0.15)] relative overflow-hidden group hover:border-[#0066FF]/40 transition-all"
        >
          {/* Certificate Inner Frame */}
          <div className="border border-dashed border-[#0066FF]/30 rounded-xl sm:rounded-2xl p-4 sm:p-8 relative bg-gradient-to-br from-[#0B1524] to-[#0A111D]">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-[#1E293B] pb-4 sm:pb-6 mb-4 sm:mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#00B8F0] flex items-center justify-center font-extrabold text-white text-base sm:text-lg shadow-md">
                  B
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-extrabold text-white text-xs sm:text-base tracking-wide uppercase">BOTMARTZ AI SOLUTIONS</h3>
                  <p className="text-[10px] sm:text-xs text-[#00B8F0] font-semibold">AI Engineering Credential Authority</p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Officially Verified Credential
              </div>
            </div>

            {/* Main Content */}
            <div className="text-center py-2 sm:py-6">
              <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] text-[#8A9EB0] uppercase mb-1 sm:mb-2">CERTIFICATE OF ACCOMPLISHMENT</p>
              <h4 className="text-base sm:text-3xl font-extrabold text-white mb-2">PROUDLY PRESENTED TO</h4>
              <div className="my-2 sm:my-4 inline-block border-b-2 border-[#0066FF] px-4 sm:px-8 py-1.5 sm:py-2 max-w-full overflow-hidden">
                <span className="text-xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00B8F0] to-[#0066FF] break-words">
                  [Your Full Name]
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#8A9EB0] max-w-xl mx-auto mt-2 leading-relaxed px-2">
                For successfully completing the intensive hands-on engineering training on <strong className="text-white">AI Accelerator Workshop Series: Building Production AI Applications & Agents</strong>.
              </p>
            </div>

            {/* Footer Signatures & Seal */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-[#1E293B] mt-4 sm:mt-6">
              <div className="text-center sm:text-left">
                <p className="text-[10px] sm:text-xs font-bold text-[#8A9EB0] uppercase">ISSUED BY</p>
                <p className="text-xs sm:text-sm font-extrabold text-white">Botmartz Academy</p>
                <p className="text-[10px] font-mono text-[#64748B]">Indore, MP, India</p>
              </div>

              {/* Seal Badge */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#D97706] via-[#F59E0B] to-[#FDE047] p-0.5 shadow-lg flex items-center justify-center shrink-0 my-1 sm:my-0">
                <div className="w-full h-full rounded-full bg-[#0B1524] flex flex-col items-center justify-center p-1 text-center border border-[#F59E0B]">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#F59E0B]" />
                  <span className="text-[6px] sm:text-[7px] font-black text-[#F59E0B] uppercase tracking-tighter leading-none mt-0.5">VERIFIED</span>
                </div>
              </div>

              <div className="text-center sm:text-right">
                <p className="text-[10px] sm:text-xs font-bold text-[#8A9EB0] uppercase">CREDENTIAL ID</p>
                <p className="text-[11px] sm:text-xs font-mono font-bold text-[#00B8F0]">BM-2026-CERT-890</p>
                <p className="text-[10px] font-mono text-[#64748B]">August 2026</p>
              </div>
            </div>
          </div>

          {/* Feature Badges below certificate */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6 pt-2">
            <div className="flex items-center gap-2.5 bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/10">
              <Download className="w-4 h-4 sm:w-5 sm:h-5 text-[#00B8F0] shrink-0" />
              <span className="text-xs font-semibold text-white">High-Res PDF Download</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/10">
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#00B8F0] shrink-0" />
              <span className="text-xs font-semibold text-white">Add to LinkedIn Profile</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
              <span className="text-xs font-semibold text-white">Scan & QR Verifiable</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
