"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Mail, 
  Copy, 
  Check, 
  ArrowRight, 
  Send, 
  Zap, 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2, 
  XCircle
} from "lucide-react";

export default function WriteAccessClient() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const emailAddress = "team@botmartz.com";

  const emailTemplate = `Subject: [Author Submission] <Article Title> - <Your Full Name>

Dear Botmartz Editorial Desk,

I would like to submit an engineering deep dive for publication on Botmartz Engineering Insights.

1. Article Title: 
2. Category: (e.g., Enterprise RAG, LangGraph, PyTorch, LLM Optimization, Autonomous Agents)
3. Target Problem Solved: 
4. Draft Document Link: (Google Docs or Notion link with comment permissions, or Markdown file)
5. Interactive Google Colab Notebook URL: 
6. GitHub Repository URL: 
7. Key Failure Modes Analyzed: 

Author Profile:
- Full Name: 
- Current Designation & Organization: 
- LinkedIn / Portfolio URL: 
- Short 2-sentence Bio: 

Looking forward to your technical review.

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

  const blueprintTabs = [
    {
      id: "thesis",
      title: "1. Concrete Technical Problem & Thesis",
      tagline: "Architecture First, Zero Fluff",
      desc: "Every article begins with a concrete systems dilemma. Avoid generic introductory filler like 'AI is transforming the world'. State the exact architectural bottleneck, the baseline vs proposed approach, and concrete benchmark goals.",
      previewTitle: "Keras Functional API: Multi-Input/Output Branching Architectures",
      previewBadge: "TENSORFLOW / DEEP LEARNING",
      previewCode: `# Multi-modal architecture with dynamic gating
inputs_text = tf.keras.Input(shape=(max_seq_len,), dtype=tf.int32, name="text_tokens")
inputs_features = tf.keras.Input(shape=(num_features,), dtype=tf.float32, name="tabular")

# Shared cross-attention projection
x_text = layers.Embedding(vocab_size, 256)(inputs_text)
x_text = layers.Bidirectional(layers.LSTM(128, return_sequences=False))(x_text)
x_merged = layers.concatenate([x_text, inputs_features])`,
      previewHighlight: "Key Rule: Dive directly into code and architectural blueprints within the first 2 paragraphs."
    },
    {
      id: "colab",
      title: "2. Interactive Google Colab Notebook",
      tagline: "1-Click Reproducibility in Browser",
      desc: "Our readers expect to test and inspect the model immediately. Provide a runnable Google Colab (.ipynb) link where dependencies (pip install ...) and environment variables are pre-configured.",
      previewTitle: "Runnable Colab Notebook: Zero-Shot Evaluation",
      previewBadge: "GOOGLE COLAB RUNNABLE",
      previewCode: `!pip install -q transformers datasets accelerate torch vllm

import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

# Load quantized model weights onto GPU
model_id = "meta-llama/Llama-3.1-8B-Instruct"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id, torch_dtype=torch.float16, device_map="auto")`,
      previewHighlight: "Key Rule: Readers must be able to click 'Open Colab Notebook' and run your pipeline from cell 1 to output."
    },
    {
      id: "code",
      title: "3. Modular Production Code & GitHub Repo",
      tagline: "Type-Hinted, Commented, Battle-Tested",
      desc: "Snippets must represent clean production design rather than quick prototypes. Include error handling, type hints, batching logic, and link to a clean GitHub repository.",
      previewTitle: "Production State Graph: LangGraph Deterministic Execution",
      previewBadge: "AGENTIC WORKFLOWS",
      previewCode: `from typing import Annotated, TypedDict
from langgraph.graph import StateGraph, END

class AgentState(TypedDict):
    query: str
    retrieved_docs: list[dict]
    reflection_attempts: int
    final_verdict: str | None

workflow = StateGraph(AgentState)
workflow.add_node("retrieve", grounded_retrieval_node)
workflow.add_node("critique", hallucination_grader_node)
workflow.add_edge("retrieve", "critique")`,
      previewHighlight: "Key Rule: Code must include explicit exception handling and modular functions."
    },
    {
      id: "failure",
      title: "4. Failure Modes & Production Gotchas",
      tagline: "What Breaks When You Scale to Production",
      desc: "This is the hallmark of Botmartz Engineering Insights. Devote a dedicated section analyzing at least 3-5 real-world edge cases: OOM errors, GPU cache thrashing, tokenizer mismatch, vector latency spikes, or drift.",
      previewTitle: "Production Post-Mortem & Critical Failure Modes",
      previewBadge: "SYSTEM POST-MORTEM",
      previewCode: `# Failure Mode 01: KV Cache Exhaustion during high-concurrency stream
# Symptoms: CUDA Out of Memory (OOM) at context length > 8192
# Root Cause: Unbounded attention tensor allocation across parallel requests
# Mitigation: Implement PagedAttention via vLLM with max_num_batched_tokens=4096

# Failure Mode 02: Silent Tokenizer Deserialization Mismatch
# Symptoms: Perplexity degrades by 34% without runtime crash`,
      previewHighlight: "Key Rule: Document real failure symptoms, root causes, and verified production fixes."
    },
    {
      id: "author",
      title: "5. Author Recognition & Profile Byline",
      tagline: "Your Name, Your Bio, Your Authority",
      desc: "Every published article features your name, professional title, company/university, custom bio, and direct links to your LinkedIn, GitHub, or portfolio website.",
      previewTitle: "Published by: Dr. Aris Thorne",
      previewBadge: "VERIFIED AUTHOR",
      previewCode: `Author: Dr. Aris Thorne
Title: Principal AI Systems Architect
Bio: "Specializing in distributed LLM inference, speculative decoding, and enterprise RAG pipelines."
Links: linkedin.com/in/aris-thorne · github.com/aris-ai
Platform Distribution: 12,000+ monthly AI architects, CTOs, and technical builders.`,
      previewHighlight: "Key Rule: You retain full authorship credit and backlink authority for your personal portfolio."
    }
  ];

  const faqs = [
    {
      q: "Who is eligible to publish on Botmartz Engineering Insights?",
      a: "We welcome machine learning engineers, AI researchers, software architects, and senior practitioners who build real-world systems. If you have practical technical depth to share, your submission is welcome."
    },
    {
      q: "Will the article be published under my name and portfolio?",
      a: "Yes, 100%! All articles are published under your name, verified author badge, professional designation, and direct links to your LinkedIn, GitHub, or personal website."
    },
    {
      q: "How long does the editorial and peer-review process take?",
      a: "Our editorial desk reviews every draft submitted to team@botmartz.com within 24 to 48 business hours. We will email you with constructive feedback or publication confirmation."
    },
    {
      q: "Can I submit an article that has already been published elsewhere?",
      a: "We prioritize original, first-run deep dives. If you've published an early draft on your personal blog, let us know — we can publish an expanded, production-focused version with canonical attribution."
    },
    {
      q: "Do I retain the copyright of my code and ideas?",
      a: "Yes. You retain full copyright over your original code and insights. By submitting, you grant Botmartz permission to publish and distribute the piece across our portal and newsletter."
    }
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* ── HERO BANNER: VIBRANT BOTMARTZ BLUE & CRISP WHITE ── */}
      <section 
        style={{
          background: "linear-gradient(145deg, #06152D 0%, #0045D8 45%, #0066FF 100%)",
        }}
        className="relative pt-[130px] pb-[90px] text-white overflow-hidden shadow-xl"
      >
        {/* Luminous Glow Overlays */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00F0FF]/20 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#002699]/60 blur-[160px] rounded-full pointer-events-none" />
        
        {/* Subtle Network Pattern */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
            backgroundSize: "32px 32px"
          }}
        />

        <div className="max-w-5xl mx-auto px-5 sm:px-8 relative z-10 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-mono font-bold tracking-wider uppercase mb-6 shadow-sm">
            <Sparkles size={14} className="text-[#00F0FF]" />
            <span>Botmartz Writers Program & Submission Guidelines</span>
          </div>

          {/* Heading - 100% Crisp White with Electric Highlights */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] mb-6 text-white drop-shadow-sm">
            Publish on <span className="text-[#00F0FF] underline decoration-[#00F0FF]/40 underline-offset-8">Engineering Insights</span>.<br />
            Reach <span className="text-amber-300">12,000+ AI Leaders</span> Worldwide.
          </h1>

          {/* Subtitle */}
          <p className="text-white/90 text-base sm:text-lg max-w-3xl mx-auto mb-9 leading-relaxed font-normal">
            We partner with engineers, researchers, and technical builders to publish production-grade AI deep dives. Submit your draft — our editorial team formats your code, validates your notebooks, and publishes your work live under <strong className="text-white font-bold underline decoration-white/40">your author byline</strong>.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href={`mailto:${emailAddress}?subject=[Author Submission] Engineering Insights`}
              className="bg-white hover:bg-slate-100 text-[#0045D8] font-extrabold px-8 py-4 rounded-xl text-sm sm:text-base flex items-center gap-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.3)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Send size={18} className="text-[#0045D8]" />
              <span>Submit Draft to team@botmartz.com</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/30 text-sm font-bold flex items-center gap-2.5 backdrop-blur-md transition-all cursor-pointer shadow-sm"
            >
              {copiedEmail ? <Check size={18} className="text-emerald-300" /> : <Copy size={18} />}
              <span>{copiedEmail ? "Email Copied!" : "Copy Editorial Email"}</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/15">
              <div className="text-2xl font-black text-white">12,000+</div>
              <div className="text-xs text-white/80 font-medium mt-0.5">Monthly Tech Readers</div>
            </div>
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/15">
              <div className="text-2xl font-black text-[#00F0FF]">24–48h</div>
              <div className="text-xs text-white/80 font-medium mt-0.5">Editorial Turnaround</div>
            </div>
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/15">
              <div className="text-2xl font-black text-amber-300">100%</div>
              <div className="text-xs text-white/80 font-medium mt-0.5">Author Byline & Links</div>
            </div>
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/15">
              <div className="text-2xl font-black text-emerald-300">Runnable</div>
              <div className="text-xs text-white/80 font-medium mt-0.5">Google Colab Ready</div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 1: CONNECTED PUBLISHING PIPELINE (NOT BOXES) ── */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0052FF] bg-[#0052FF]/10 px-3.5 py-1.5 rounded-full border border-[#0052FF]/20">
              Zero Friction Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              How Your Article Goes From Draft to Live
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl mx-auto">
              No complex CMS setup. Send your draft via email, and our engineering team handles formatting, code testing, and publishing.
            </p>
          </div>

          {/* Continuous Connected Flow */}
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#0052FF] via-[#00B8F0] to-emerald-500 -translate-y-8 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              
              {/* Step 1 */}
              <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm hover:border-[#0052FF] transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#0052FF] text-white font-mono font-black text-lg flex items-center justify-center mb-5 shadow-md">
                  01
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Write Your Draft</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Draft in Notion, Google Docs, or Markdown. Include tested code snippets and an optional Google Colab notebook link.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm hover:border-[#00B8F0] transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#0092D7] text-white font-mono font-black text-lg flex items-center justify-center mb-5 shadow-md">
                  02
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Email team@botmartz.com</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Send your draft link, code repo, and author bio to our editorial desk using our structured email template.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm hover:border-amber-500 transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-white font-mono font-black text-lg flex items-center justify-center mb-5 shadow-md">
                  03
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Engineering Peer Review</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Within 24–48 hours, our technical architects verify code reproducibility, format syntax, and polish diagrams.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm hover:border-emerald-500 transition-all">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-mono font-black text-lg flex items-center justify-center mb-5 shadow-md">
                  04
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Published Under Your Name</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Published live on Engineering Insights with your verified author profile, social links, and distributed to 12,000+ readers.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 2: INTERACTIVE ARTICLE BLUEPRINT (NO DULL BOXES!) ── */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          
          <div className="text-center mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0052FF] bg-[#0052FF]/10 px-3.5 py-1.5 rounded-full border border-[#0052FF]/20">
              Deconstructed from Live Botmartz Articles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Anatomy of a High-Impact Technical Deep Dive
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
              Click through the 5 essential pillars that turn a good article into an authoritative reference cited by production engineers.
            </p>
          </div>

          {/* Interactive Split Blueprint Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Nav Tabs */}
            <div className="lg:col-span-5 space-y-2.5">
              {blueprintTabs.map((tab, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isActive 
                        ? "bg-[#0045D8] text-white border-[#0045D8] shadow-md shadow-[#0045D8]/20 translate-x-1" 
                        : "bg-[#F8FAFC] text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70"
                    }`}
                  >
                    <div>
                      <div className={`text-xs font-mono font-bold uppercase tracking-wider ${isActive ? "text-[#00F0FF]" : "text-[#0052FF]"}`}>
                        {tab.tagline}
                      </div>
                      <div className="text-sm sm:text-base font-bold mt-0.5">
                        {tab.title}
                      </div>
                    </div>
                    <ChevronRight size={18} className={`shrink-0 transition-transform ${isActive ? "translate-x-1 text-white" : "text-slate-400"}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Live Preview Window */}
            <div className="lg:col-span-7 bg-[#061124] text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
              
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span className="ml-2 font-mono text-xs text-slate-400">botmartz-insights // article-standard.py</span>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-2.5 py-1 rounded border border-[#00F0FF]/20">
                  {blueprintTabs[activeTab].previewBadge}
                </span>
              </div>

              {/* Content Description */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-2">
                  {blueprintTabs[activeTab].previewTitle}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {blueprintTabs[activeTab].desc}
                </p>
              </div>

              {/* Code Demonstration Block */}
              <div className="bg-black/60 rounded-xl p-4 border border-white/10 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed mb-4">
                <pre>{blueprintTabs[activeTab].previewCode}</pre>
              </div>

              {/* Golden Highlight Rule */}
              <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-xl text-xs text-amber-200 flex items-center gap-2.5">
                <Zap size={16} className="text-amber-400 shrink-0" />
                <span>{blueprintTabs[activeTab].previewHighlight}</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 3: EMAIL DESK & SUBMISSION CHECKLIST ── */}
      <section 
        style={{
          background: "linear-gradient(180deg, #F8FAFC 0%, #EFF5FA 100%)",
        }}
        className="py-20 border-b border-slate-200"
      >
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0052FF] bg-[#0052FF]/10 px-3.5 py-1.5 rounded-full border border-[#0052FF]/20">
              Direct Editorial Submission
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Ready to Submit? Send Directly to Our Team
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Send your draft to <strong className="text-[#0052FF] font-bold font-mono">team@botmartz.com</strong>. Use our pre-structured template below for fast-track review.
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 sm:p-8 shadow-xl">
            
            {/* Email Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-200 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0052FF] text-white flex items-center justify-center shrink-0 shadow-md">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Official Editorial Desk
                  </span>
                  <span className="font-mono font-black text-base sm:text-lg text-[#0052FF]">
                    {emailAddress}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
                >
                  {copiedEmail ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  <span>{copiedEmail ? "Email Copied!" : "Copy Email"}</span>
                </button>
                <button
                  onClick={handleCopyTemplate}
                  className="px-3.5 py-2 rounded-lg bg-[#0052FF] hover:bg-[#0041CC] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  {copiedTemplate ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />}
                  <span>{copiedTemplate ? "Template Copied!" : "Copy Full Template"}</span>
                </button>
              </div>
            </div>

            {/* Email Body Preformatted */}
            <div className="bg-slate-900 text-slate-200 rounded-xl p-5 font-mono text-xs leading-relaxed overflow-x-auto border border-slate-800 shadow-inner">
              <pre className="whitespace-pre-wrap">{emailTemplate}</pre>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600">
                ⚡ Turnaround: Technical review response within <strong className="text-slate-900">24 to 48 hours</strong>.
              </div>
              <a
                href={`mailto:${emailAddress}?subject=[Author Submission] Engineering Insights&body=${encodeURIComponent(emailTemplate)}`}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#0052FF] hover:bg-[#0041CC] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Send size={15} />
                <span>Open in Email Client</span>
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 4: STANDARDS COMPARISON TABLE ── */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Submission Standards & Quality Rubric
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Our review is rigorous to maintain the highest technical quality for our readers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* What Gets Fast-Tracked */}
            <div className="bg-emerald-50/50 p-6 sm:p-8 rounded-2xl border-2 border-emerald-200">
              <div className="flex items-center gap-2.5 text-emerald-800 font-extrabold text-lg mb-4">
                <CheckCircle2 size={22} className="text-emerald-600" />
                <span>What Gets Fast-Tracked & Accepted</span>
              </div>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold text-base leading-none">✓</span>
                  <span>Tested, runnable code snippets with documented libraries and dependencies.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold text-base leading-none">✓</span>
                  <span>Direct analysis of production trade-offs, bottlenecks, and failure modes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold text-base leading-none">✓</span>
                  <span>Clear architecture flowcharts or system visual diagrams.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold text-base leading-none">✓</span>
                  <span>Concrete benchmark numbers (latency, throughput, VRAM, memory usage).</span>
                </li>
              </ul>
            </div>

            {/* What Gets Rejected */}
            <div className="bg-rose-50/50 p-6 sm:p-8 rounded-2xl border-2 border-rose-200">
              <div className="flex items-center gap-2.5 text-rose-800 font-extrabold text-lg mb-4">
                <XCircle size={22} className="text-rose-600" />
                <span>What We Do Not Publish</span>
              </div>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold text-base leading-none">✗</span>
                  <span>Generic high-level AI overviews or unedited AI-generated text.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold text-base leading-none">✗</span>
                  <span>Articles with broken, non-reproducible code or missing dependencies.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold text-base leading-none">✗</span>
                  <span>Pure sales pitches or promotional marketing articles.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold text-base leading-none">✗</span>
                  <span>Plagiarized content from existing documentation or blogs.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 5: FAQ ACCORDION ── */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="bg-white rounded-xl border border-slate-200 p-5 transition-all cursor-pointer shadow-xs"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    {faq.q}
                  </h4>
                  <ChevronDown 
                    size={18} 
                    className={`text-[#0052FF] shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} 
                  />
                </div>
                {openFaq === i && (
                  <p className="mt-3 pt-3 border-t border-slate-100 text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── BOTTOM CTA BANNER ── */}
      <section 
        style={{
          background: "linear-gradient(135deg, #06152D 0%, #0045D8 100%)",
        }}
        className="py-16 text-center text-white"
      >
        <div className="max-w-xl mx-auto px-5">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Have an Article Idea or Draft?
          </h3>
          <p className="text-white/80 text-sm sm:text-base mb-7">
            You don't need a finished article to start. Send an outline or technical topic to our team.
          </p>
          <a
            href={`mailto:${emailAddress}?subject=[Article Pitch] Engineering Insights`}
            className="inline-flex items-center gap-2 bg-white text-[#0045D8] hover:bg-slate-100 font-extrabold px-8 py-3.5 rounded-xl text-sm sm:text-base shadow-xl transition-all"
          >
            <Send size={16} />
            <span>Email Editorial Team ({emailAddress})</span>
          </a>
        </div>
      </section>

    </main>
  );
}
