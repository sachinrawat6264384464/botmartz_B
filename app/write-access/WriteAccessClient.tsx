"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Mail, 
  Copy, 
  Check, 
  ArrowRight, 
  Code2, 
  Terminal, 
  FileText, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Cpu, 
  ExternalLink,
  BookOpen,
  Share2,
  Clock,
  Send,
  Zap,
  HelpCircle,
  ChevronDown
} from "lucide-react";

export default function WriteAccessClient() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const emailAddress = "team@botmartz.com";

  const emailTemplate = `Subject: [Author Submission] <Your Technical Article Title> - <Your Full Name>

Dear Botmartz Editorial Team,

I would like to submit an engineering deep dive for publication on Botmartz Engineering Insights.

1. Article Title: 
2. Category: (e.g., Enterprise RAG, LangGraph, PyTorch, LLM Optimization, Autonomous Agents)
3. Target Audience & Problem Solved: 
4. Draft Document Link: (Google Docs or Notion link with comment/edit permissions, or Markdown file)
5. Interactive Google Colab Notebook URL: 
6. GitHub Repository URL: 
7. Key Failure Modes Analyzed: 

Author Details:
- Full Name: 
- Current Role & Organization: 
- LinkedIn / Portfolio URL: 
- Short 2-sentence Bio: 

Looking forward to your feedback.

Best regards,
<Your Name>`;

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(emailAddress);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleCopyTemplate = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(emailTemplate);
      setCopiedTemplate(true);
      setTimeout(() => setCopiedTemplate(false), 2000);
    }
  };

  const faqs = [
    {
      q: "Who can write for Botmartz Engineering Insights?",
      a: "We welcome AI researchers, machine learning engineers, systems architects, and technical practitioners who have hands-on experience building, scaling, or evaluating production AI systems."
    },
    {
      q: "Will the article be published under my name?",
      a: "Yes! 100% of articles are published with your full name, avatar, verified author badge, professional designation, and direct links to your LinkedIn, GitHub, or personal portfolio."
    },
    {
      q: "How long does the editorial review take?",
      a: "Our engineering and editorial team reviews all submissions sent to team@botmartz.com within 24 to 48 business hours. We will email you with constructive feedback or publication confirmation."
    },
    {
      q: "Is an interactive Google Colab notebook mandatory?",
      a: "While not strictly required for purely theoretical architecture reviews, having a runnable Google Colab notebook dramatically increases reader engagement and boosts acceptance priority."
    },
    {
      q: "Do I retain the copyright of my code and ideas?",
      a: "Absolutely. You retain full copyright over your original code and insights. By submitting, you grant Botmartz permission to publish and distribute the technical article across our platform and channels."
    }
  ];

  return (
    <main className="min-h-screen bg-[#050B14] text-white">
      {/* ── HERO BANNER ── */}
      <section className="relative pt-[130px] pb-[80px] overflow-hidden border-b border-slate-800/80">
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-[#F97316]/10 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-5 sm:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 text-[#00B8F0] text-xs font-mono font-semibold tracking-wider uppercase mb-6">
            <Sparkles size={14} />
            <span>Botmartz Writers Program & Guidelines</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6">
            Publish on <span className="text-[#00B8F0]">Engineering Insights</span>.<br />
            Share Your Knowledge with <span className="text-[#F97316]">12,000+ Leaders</span>.
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            We partner with engineers, researchers, and technical builders to publish production-grade AI deep dives. Our editorial team reviews your draft, formats the interactive code, and publishes it under your author byline.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${emailAddress}?subject=[Author Submission] Engineering Insights`}
              className="btn bg-[#F97316] hover:bg-[#EA580C] text-white font-bold px-7 py-3.5 rounded-xl text-sm flex items-center gap-2.5 shadow-[0_6px_25px_rgba(249,115,22,0.35)] transition-all cursor-pointer"
            >
              <Send size={16} />
              <span>Submit Draft to team@botmartz.com</span>
            </a>
            <button
              onClick={handleCopyEmail}
              className="px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 text-slate-200 border border-slate-700 text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              <span>{copiedEmail ? "Email Copied!" : "Copy Editorial Email"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── 3-STEP PROCESS SECTION ── */}
      <section className="py-20 border-b border-slate-800/80 bg-[#070E1A]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              How the Publishing Process Works
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-lg mx-auto">
              Zero complicated CMS onboarding. Submit your draft via email and let our engineering team handle the rest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 relative group hover:border-[#00B8F0]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#00B8F0]/15 text-[#00B8F0] font-mono font-bold flex items-center justify-center mb-5 border border-[#00B8F0]/30 text-base">
                01
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Prepare Your Technical Draft</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Write your article in Google Docs, Notion, or Markdown. Include your working Python/PyTorch code snippets and an optional Google Colab link.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 relative group hover:border-[#F97316]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#F97316]/15 text-[#F97316] font-mono font-bold flex items-center justify-center mb-5 border border-[#F97316]/30 text-base">
                02
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Email team@botmartz.com</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Send your draft and author bio to our editorial desk. Our technical team conducts a rigorous peer review within 24–48 hours.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 relative group hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 font-mono font-bold flex items-center justify-center mb-5 border border-emerald-500/30 text-base">
                03
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Published Under Your Name</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Once reviewed, we polish the graphics, format the runnable notebook, and publish the article live on Botmartz with your author badge and profile link.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ANATOMY OF A BOTMARTZ ARTICLE (BASED ON REAL BLOG ANALYSIS) ── */}
      <section className="py-20 border-b border-slate-800/80 bg-[#050B14]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#F97316] px-3 py-1 rounded-full bg-[#F97316]/10 border border-[#F97316]/20">
              Technical Blueprint
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-3">
              Anatomy of an Engineering Insights Article
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
              Our articles stand apart because they are rooted in concrete code, architecture diagrams, and real production failure modes. Here is everything your submission should contain:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Component 1: Title & Abstract */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#00B8F0]/15 text-[#00B8F0] flex items-center justify-center">
                  <FileText size={16} />
                </div>
                <h4 className="font-bold text-white text-base">1. Concrete Title & Abstract</h4>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Focus on architecture and systems. Avoid generic introductions. State the exact problem, the bottleneck addressed, and the benchmarks achieved.
              </p>
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 font-mono text-[11px] text-slate-300">
                <span className="text-emerald-400 font-bold">✓ Good:</span> "Data Pipelines with tf.data: map, batch, prefetch, cache, and shuffle Best Practices"
              </div>
            </div>

            {/* Component 2: Interactive Google Colab Notebook */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F97316]/15 text-[#F97316] flex items-center justify-center">
                  <Terminal size={16} />
                </div>
                <h4 className="font-bold text-white text-base">2. Interactive Google Colab Notebook</h4>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Provide a runnable Colab link with dependencies pre-configured. Readers love reproducing model inference and benchmarks in one click!
              </p>
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 font-mono text-[11px] text-slate-300">
                <span className="text-[#00B8F0] font-bold">Example:</span> colab.research.google.com/drive/...
              </div>
            </div>

            {/* Component 3: GitHub Code & Snippets */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center">
                  <Code2 size={16} />
                </div>
                <h4 className="font-bold text-white text-base">3. Production Code & GitHub Repo</h4>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Include modular, commented code snippets (PyTorch, TensorFlow, LangChain, LangGraph, vLLM, etc.) and a link to a clean GitHub repository.
              </p>
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 font-mono text-[11px] text-slate-300">
                <span className="text-purple-400 font-bold">Standard:</span> Python 3.10+, Type hints, requirements.txt
              </div>
            </div>

            {/* Component 4: Failure Modes & Edge Cases */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-500/15 text-rose-400 flex items-center justify-center">
                  <Zap size={16} />
                </div>
                <h4 className="font-bold text-white text-base">4. Failure Modes & Production Lessons</h4>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Highlight 3–5 real-world edge cases: OOM errors, hallucination drifts, vector search latency spikes, or gradient degradation.
              </p>
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 font-mono text-[11px] text-slate-300">
                <span className="text-rose-400 font-bold">Focus:</span> "What goes wrong in production and how to fix it."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COPYABLE EMAIL TEMPLATE SECTION ── */}
      <section className="py-20 border-b border-slate-800/80 bg-[#070E1A]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to Submit? Use This Email Template
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Send your email directly to <code className="text-[#00B8F0] font-bold">team@botmartz.com</code> with this structured format.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#030710] border border-slate-800 shadow-xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Mail size={14} className="text-[#F97316]" />
                <span>To: <strong className="text-white">team@botmartz.com</strong></span>
              </div>
              <button
                onClick={handleCopyTemplate}
                className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
              >
                {copiedTemplate ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copiedTemplate ? "Template Copied!" : "Copy Email Template"}</span>
              </button>
            </div>

            <pre className="text-xs sm:text-sm font-mono text-slate-300 whitespace-pre-wrap leading-relaxed overflow-x-auto bg-black/30 p-4 rounded-xl border border-white/5">
              {emailTemplate}
            </pre>

            <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-400">
                Attach or link your Google Doc / Notion draft with comment permissions enabled.
              </p>
              <a
                href={`mailto:${emailAddress}?subject=[Author Submission] Engineering Insights&body=${encodeURIComponent(emailTemplate)}`}
                className="px-6 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                <Send size={14} />
                <span>Open in Email App</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE LOOK FOR VS REJECT ── */}
      <section className="py-20 border-b border-slate-800/80 bg-[#050B14]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Submission Quality Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Accepted */}
            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
              <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-base mb-4">
                <CheckCircle2 size={20} />
                <span>What Gets Fast-Tracked</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Tested, runnable code snippets with documented libraries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Direct analysis of production trade-offs and edge cases.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Clear architecture flowcharts or system visual diagrams.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Original perspectives from real benchmark testing.</span>
                </li>
              </ul>
            </div>

            {/* Rejected */}
            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30">
              <div className="flex items-center gap-2.5 text-rose-400 font-bold text-base mb-4">
                <XCircle size={20} />
                <span>What We Do Not Publish</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✗</span>
                  <span>Generic AI overviews or unedited AI-generated text.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✗</span>
                  <span>Articles with broken, non-reproducible code snippets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✗</span>
                  <span>Pure marketing pitches or promotional product spam.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✗</span>
                  <span>Plagiarized content from existing publications.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="py-20 border-b border-slate-800/80 bg-[#070E1A]">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-slate-800 transition-all cursor-pointer"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-semibold text-white text-sm sm:text-base">
                    {faq.q}
                  </h4>
                  <ChevronDown 
                    size={18} 
                    className={`text-slate-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} 
                  />
                </div>
                {openFaq === i && (
                  <p className="mt-3 pt-3 border-t border-slate-800 text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-16 text-center bg-[#050B14]">
        <div className="max-w-xl mx-auto px-5">
          <h3 className="text-2xl font-extrabold text-white mb-3">
            Have an Article Idea?
          </h3>
          <p className="text-slate-400 text-sm mb-6">
            You don't need a finished draft to get in touch. Send an outline or thesis to our team.
          </p>
          <a
            href={`mailto:${emailAddress}?subject=[Article Pitch] Engineering Insights`}
            className="inline-flex items-center gap-2 bg-[#00B8F0] hover:bg-[#0096C7] text-slate-950 font-bold px-7 py-3 rounded-xl text-sm transition-all"
          >
            <span>Email Editorial Team</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </section>
    </main>
  );
}
