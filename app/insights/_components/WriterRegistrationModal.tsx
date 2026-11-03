"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  X, 
  Sparkles, 
  PenTool, 
  Mail, 
  Copy, 
  Check, 
  ArrowRight, 
  BookOpen
} from "lucide-react";

export default function WriterRegistrationModal() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const emailAddress = "team@botmartz.com";

  useEffect(() => {
    setMounted(true);

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("open-writer-modal", handleCustomOpen);

    return () => {
      window.removeEventListener("open-writer-modal", handleCustomOpen);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Modal Dialog Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <div 
            style={{ maxWidth: "620px", width: "100%" }}
            className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200/90 flex flex-col animate-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3.5 right-3.5 z-30 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer border border-slate-200"
              aria-label="Close"
            >
              <X size={16} strokeWidth={2.5} />
            </button>

            {/* ── TOP BLUE BRAND HEADER ── */}
            <div 
              style={{
                backgroundColor: "#051226",
                backgroundImage: "linear-gradient(145deg, #051226 0%, #003BB3 55%, #0059E6 100%)",
              }}
              className="text-white p-6 sm:p-7 relative overflow-hidden"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center border border-white/30 shrink-0">
                  <Image 
                    src="/Logo-removebg-preview.png" 
                    alt="Botmartz" 
                    width={16} 
                    height={16} 
                    className="object-contain brightness-0 invert" 
                  />
                </div>
                <span className="font-extrabold text-xs tracking-wider uppercase font-mono text-cyan-300">
                  BOTMARTZ WRITERS PROGRAM
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight mt-3">
                Publish on Engineering Insights.
              </h2>
              <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-md font-medium">
                Share your research, Colab notebooks, and architecture deep dives with 12,000+ AI practitioners.
              </p>
            </div>

            {/* ── BODY CONTENT & ACTIONS ── */}
            <div className="p-5 sm:p-7 space-y-5 bg-white">
              
              {/* How it works summary */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                  <Sparkles size={15} style={{ color: "#0059E6" }} />
                  <span>How to Publish Your Article:</span>
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Read our technical guidelines, prepare your draft (with Colab/GitHub links), and email it to our editorial desk. Our team reviews, polishes, and publishes your deep dive directly under <strong className="text-slate-900 font-semibold">your author byline & profile</strong>!
                </p>
              </div>

              {/* Email Box */}
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div 
                    style={{ backgroundColor: "#0059E6", color: "#FFFFFF" }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                  >
                    <Mail size={17} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider block">
                      Editorial Submission Desk
                    </span>
                    <span className="font-mono font-bold text-xs sm:text-sm text-slate-900">
                      {emailAddress}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-blue-100/60 text-slate-800 border border-blue-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                  <span>{copied ? "Copied!" : "Copy Email"}</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-1">
                {/* Primary Button to Write-Access Page */}
                <Link
                  href="/write-access"
                  onClick={handleClose}
                  style={{
                    backgroundColor: "#0059E6",
                    color: "#FFFFFF",
                    boxShadow: "0 6px 22px rgba(0, 89, 230, 0.4)",
                  }}
                  className="w-full font-bold py-3.5 px-6 rounded-xl text-center text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <BookOpen size={17} />
                  <span>Read Author &amp; Submission Guidelines</span>
                  <ArrowRight size={16} />
                </Link>

                {/* Secondary Button to Send Email */}
                <a
                  href={`mailto:${emailAddress}?subject=[Author Submission] Engineering Insights`}
                  style={{
                    backgroundColor: "#F1F5F9",
                    color: "#1E293B",
                  }}
                  className="w-full font-semibold py-3 px-5 rounded-xl text-center text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:bg-slate-200 cursor-pointer border border-slate-200/60"
                >
                  <Mail size={15} className="text-slate-600" />
                  <span>Send Draft Directly via Email</span>
                </a>
              </div>

              {/* Footer Note */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Turnaround: 24–48 hours</span>
                <Link 
                  href="/write-access" 
                  onClick={handleClose} 
                  style={{ color: "#0059E6" }}
                  className="font-bold hover:underline"
                >
                  Full Submission Guide →
                </Link>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
