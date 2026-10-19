"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Calendar, ShieldCheck, X, Sparkles, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ConversionTriggers() {
  const pathname = usePathname();
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasShownExit, setHasShownExit] = useState(false);
  const [showQuickReviewPrompt, setShowQuickReviewPrompt] = useState(false);

  // Don't show inside admin or feedback portals
  const isExcluded = pathname?.startsWith("/admin") || pathname?.startsWith("/feedback");
  const isBlogDetailPage = pathname?.startsWith("/insights/") && pathname !== "/insights";

  // Subtle prompt after 25s on page or 40% scroll (skip on blog detail pages to protect reader focus)
  useEffect(() => {
    if (isExcluded || isBlogDetailPage) return;
    if (typeof window !== "undefined" && sessionStorage.getItem("hide_review_prompt") === "true") return;

    const timer = setTimeout(() => {
      setShowQuickReviewPrompt(true);
    }, 25000);

    const handleScroll = () => {
      if (window.scrollY > 1200) {
        setShowQuickReviewPrompt(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isExcluded, isBlogDetailPage]);

  // Exit intent detection (desktop mouse leaving window)
  useEffect(() => {
    if (isExcluded || hasShownExit) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !hasShownExit) {
        setShowExitIntent(true);
        setHasShownExit(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isExcluded, hasShownExit]);

  if (isExcluded) return null;

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          1. FLOATING ACTION DOCK (Bottom Right)
          Brain Priming: Instant Availability, Low Friction, Verified Direct Access
      ════════════════════════════════════════════════════════════ */}
      <aside aria-label="Quick Consultation and Feasibility Review" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        {/* Subtle Micro-Nudge bubble (Appears when scrolling or browsing) */}
        {showQuickReviewPrompt && (
          <div className="relative bg-[#050B14] text-white border border-[#00B8F0]/40 rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,184,240,0.25)] max-w-[290px] animate-fade-in transition-all">
            <button
              onClick={() => {
                setShowQuickReviewPrompt(false);
                if (typeof window !== "undefined") sessionStorage.setItem("hide_review_prompt", "true");
              }}
              className="absolute top-2 right-2 text-slate-400 hover:text-white p-1"
              aria-label="Dismiss quick review prompt"
            >
              <X size={14} />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#00B8F0] font-semibold">
                Architecture Desk Available
              </span>
            </div>
            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              Evaluating an Enterprise RAG or Multi-Agent system? Get a free 24h feasibility verdict from our principal engineers.
            </p>
            <div className="flex items-center gap-2">
              <Link
                href="/contact?type=architecture-review"
                className="inline-flex items-center gap-1.5 bg-[#0066FF] hover:bg-[#0052CC] text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all"
              >
                <span>Request Verdict</span>
                <ArrowRight size={12} />
              </Link>
              <a
                href="https://wa.me/919730084626?text=Hi%20Botmartz%20Team%2C%20I%20would%20like%20to%20discuss%20an%20Enterprise%20RAG%20or%20AI%20Agent%20architecture."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 hover:text-emerald-300 font-semibold px-2 py-1"
              >
                WhatsApp Direct ↗
              </a>
            </div>
          </div>
        )}

        {/* Floating Quick Action Buttons */}
        <div className="flex items-center gap-2 bg-[#050B14]/90 backdrop-blur-md border border-white/15 p-1.5 rounded-2xl shadow-2xl">
          {/* Direct WhatsApp Channel for Urgent/Fast Decision Makers */}
          <a
            href="https://wa.me/919730084626?text=Hi%20Botmartz%2C%20we%20want%20to%20review%20our%20AI%20Architecture."
            target="_blank"
            rel="noopener noreferrer"
            title="Chat directly on WhatsApp with Senior Engineering"
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all hover:scale-105"
          >
            <MessageSquare size={15} />
            <span className="hidden sm:inline">WhatsApp Fast Desk</span>
          </a>

          {/* Book Architecture Review */}
          <a
            href="https://cal.com/botmartz-ai/20min"
            target="_blank"
            rel="noopener noreferrer"
            title="Schedule a 20-Minute Technical Architecture Review"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-semibold shadow-md transition-all hover:scale-105"
          >
            <Calendar size={15} />
            <span>Book Review (20m)</span>
          </a>
        </div>
      </aside>

      {/* ════════════════════════════════════════════════════════════
          2. EXIT INTENT MODAL: "THE 48-HOUR RAG FEASIBILITY AUDIT"
          Brain Priming: Risk Reversal + Reciprocity + Concrete Value
      ════════════════════════════════════════════════════════════ */}
      {showExitIntent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#050B14] text-white border border-[#00B8F0]/50 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,184,240,0.3)]">
            <button
              onClick={() => setShowExitIntent(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 text-[#00B8F0] font-mono text-[10px] uppercase tracking-wider mb-4 font-bold">
              <Sparkles size={12} /> Confidential &amp; Zero Obligation
            </div>

            <h3 className="text-2xl font-bold font-heading mb-3 text-white leading-snug">
              Before You Leave: Get a Free RAG Feasibility Verdict
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
              Most generic RAG pilots fail on multi-page tables, hallucinations, and permissions. Send us your document format and target use-case. Our architects will email you a structured technical breakdown in 24–48 hours.
            </p>

            <div className="space-y-3 mb-6 bg-white/5 border border-white/10 rounded-2xl p-4 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={14} className="text-[#00B8F0]" />
                <span>Evaluation of Vector vs Hybrid BM25 vs OpenSearch</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={14} className="text-[#00B8F0]" />
                <span>Deterministic abstention &amp; citation feasibility</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={14} className="text-[#00B8F0]" />
                <span>Fixed pilot scope &amp; estimated deployment timeline</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact?type=feasibility-audit"
                onClick={() => setShowExitIntent(false)}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-5 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-[0_4px_20px_rgba(0,102,255,0.4)]"
              >
                <span>Request 48-Hour Audit</span>
                <ArrowRight size={15} />
              </Link>
              <a
                href="https://cal.com/botmartz-ai/20min"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowExitIntent(false)}
                className="inline-flex items-center justify-center border border-white/20 hover:border-[#00B8F0] text-slate-300 hover:text-white px-5 py-3.5 rounded-xl font-semibold text-sm transition-all"
              >
                Book 20-Min Call
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
