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
  XCircle,
  FileText,
  Award,
  Globe
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
      desc: "Our readers expect to test and inspect the model immediately. Provide a runnable Google Colab (.ipynb) link where dependencies and environment variables are pre-configured.",
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
      
      {/* ── HERO BANNER: 2-COLUMN PREMIUM EDITORIAL DESK ── */}
      <section 
        style={{
          background: "linear-gradient(145deg, #051226 0%, #003BB3 50%, #0059E6 100%)",
        }}
        className="relative pt-[160px] pb-[140px] lg:pt-[200px] lg:pb-[170px] min-h-[78vh] flex items-center text-white overflow-hidden shadow-2xl border-b border-blue-600/30"
      >
        {/* Luminous Glow Overlays */}
        <div 
          style={{ background: "rgba(0, 240, 255, 0.22)", filter: "blur(140px)" }}
          className="absolute top-[-25%] left-[-15%] w-[55%] h-[55%] rounded-full pointer-events-none" 
        />
        <div 
          style={{ background: "rgba(0, 41, 163, 0.65)", filter: "blur(160px)" }}
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full pointer-events-none" 
        />
        
        {/* Subtle Tech Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(255,255,255,0.45) 1.5px, transparent 0)",
            backgroundSize: "36px 36px"
          }}
        />

        <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* ── LEFT COLUMN: REWRITTEN HEADLINE & CTAS (7 COLS) ── */}
            <div className="lg:col-span-7 text-left space-y-7">
              
              {/* Badge */}
              <div 
                style={{
                  background: "rgba(255, 255, 255, 0.12)",
                  borderColor: "rgba(255, 255, 255, 0.25)",
                  color: "#FFFFFF",
                }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold tracking-wider uppercase shadow-sm backdrop-blur-md"
              >
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                <Sparkles size={13} style={{ color: "#00F0FF" }} />
                <span>Botmartz AI Editorial Desk · Call for Authors</span>
              </div>

              {/* Rewritten Punchy Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.14] text-white">
                Turn Your AI Architecture into a <span style={{ color: "#00F0FF" }}>Canonical Deep Dive</span>.
              </h1>

              {/* Rewritten Technical Subtitle */}
              <p className="text-slate-100 text-sm sm:text-base leading-relaxed font-normal opacity-95 max-w-2xl">
                We partner with AI systems architects, ML researchers, and production engineers to document real-world breakthroughs. From complex LangGraph agent state machines and enterprise RAG retrieval to distributed model serving — submit your technical draft to our desk. We review the code, format the interactive Colab notebooks, and publish the article live under <strong className="text-white font-bold underline decoration-[#00F0FF]">your verified author byline</strong>.
              </p>

              {/* Action Buttons with High-Contrast Colors */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href={`mailto:${emailAddress}?subject=[Author Submission] Engineering Insights`}
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#003BB3",
                  }}
                  className="font-extrabold px-7 py-3.5 rounded-xl text-xs sm:text-sm flex items-center gap-2.5 shadow-xl transition-all hover:bg-slate-100 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <Send size={16} style={{ color: "#003BB3" }} />
                  <span>Submit Draft to team@botmartz.com</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.14)",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    color: "#FFFFFF",
                  }}
                  className="px-5 py-3.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-2 backdrop-blur-md transition-all hover:bg-white/25 cursor-pointer shadow-sm"
                >
                  {copiedEmail ? <Check size={16} style={{ color: "#34D399" }} /> : <Copy size={16} />}
                  <span>{copiedEmail ? "Email Copied!" : "Copy Editorial Email"}</span>
                </button>
              </div>



            </div>

            {/* ── RIGHT COLUMN: VISUAL ARTICLE MOCKUP CARD (5 COLS) ── */}
            <div className="lg:col-span-5 relative">
              <div 
                style={{
                  backgroundColor: "rgba(6, 17, 36, 0.92)",
                  borderColor: "rgba(0, 240, 255, 0.3)",
                  boxShadow: "0 25px 60px rgba(0, 0, 0, 0.45)",
                }}
                className="rounded-2xl p-6 border backdrop-blur-xl relative overflow-hidden"
              >
                {/* Header Window Bar */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                    <span className="ml-2 font-mono text-[10px] text-slate-400">preview // author-byline.md</span>
                  </div>
                  <span 
                    style={{
                      backgroundColor: "rgba(0, 240, 255, 0.12)",
                      color: "#00F0FF",
                      borderColor: "rgba(0, 240, 255, 0.3)",
                    }}
                    className="text-[9px] font-mono font-bold px-2 py-0.5 rounded border"
                  >
                    LIVE PUBLICATION
                  </span>
                </div>

                {/* Article Snapshot Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                      RAG & MULTI-AGENT
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">12 min read</span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">
                    Deterministic LangGraph State Routing with Fallback Retrieval
                  </h3>

                  <div className="p-2.5 rounded-lg bg-black/50 border border-white/10 font-mono text-[11px] text-emerald-300 overflow-x-auto leading-relaxed">
                    <span className="text-slate-500"># Runnable in 1 click</span><br />
                    <span>workflow.compile(checkpointer=MemorySaver())</span>
                  </div>

                  {/* Author Card Footer inside Preview */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0052FF] to-[#00B8F0] flex items-center justify-center text-white text-xs font-bold font-mono">
                        AU
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Your Name & Title</div>
                        <div className="text-[10px] text-[#00F0FF] font-mono">Verified Author @ Botmartz</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <span>▶ Colab</span>
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 1: STREAMLINED EDITORIAL WORKFLOW (NO NUMBER BOXES) ── */}
      <section className="py-16 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          
          <div className="text-center mb-12">
            <span 
              style={{ backgroundColor: "rgba(0, 82, 255, 0.1)", color: "#0052FF", borderColor: "rgba(0, 82, 255, 0.25)" }}
              className="text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border inline-block"
            >
              Simple Editorial Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
              How Your Draft Goes Live
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl mx-auto">
              Zero CMS onboarding. Send your draft via email, and our team handles formatting, code verification, and publishing.
            </p>
          </div>

          {/* Clean Horizontal Timeline (Clean icons and text, NO number boxes!) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="flex flex-col items-start p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs">
              <div 
                style={{ backgroundColor: "rgba(0, 82, 255, 0.1)", color: "#0052FF" }}
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
              >
                <FileText size={20} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">1. Write Your Draft</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Draft in Notion, Google Docs, or Markdown. Include tested code snippets and an optional runnable Colab link.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-start p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs">
              <div 
                style={{ backgroundColor: "rgba(14, 165, 233, 0.1)", color: "#0284C7" }}
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
              >
                <Mail size={20} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">2. Email Our Team</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Send your draft link, code repo, and short bio to <strong className="text-slate-900">team@botmartz.com</strong>.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-start p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs">
              <div 
                style={{ backgroundColor: "rgba(245, 158, 11, 0.1)", color: "#D97706" }}
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
              >
                <CheckCircle2 size={20} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">3. Technical Review</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Within 24–48 hours, our engineers verify code reproducibility, polish syntax, and format diagrams.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-start p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs">
              <div 
                style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#059669" }}
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
              >
                <Award size={20} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">4. Live With Your Byline</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Published live on Engineering Insights with your verified author badge, bio, and portfolio link.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 2: INTERACTIVE ARTICLE BLUEPRINT ── */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          
          <div className="text-center mb-14">
            <span 
              style={{ backgroundColor: "rgba(0, 82, 255, 0.1)", color: "#0052FF", borderColor: "rgba(0, 82, 255, 0.25)" }}
              className="text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border inline-block"
            >
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
                    style={{
                      backgroundColor: isActive ? "#0052FF" : "#F8FAFC",
                      color: isActive ? "#FFFFFF" : "#0F172A",
                      borderColor: isActive ? "#0052FF" : "#E2E8F0",
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between shadow-xs ${
                      isActive ? "shadow-md" : "hover:border-slate-300"
                    }`}
                  >
                    <div>
                      <div 
                        style={{ color: isActive ? "#A5F3FC" : "#0052FF" }}
                        className="text-xs font-mono font-bold uppercase tracking-wider"
                      >
                        {tab.tagline}
                      </div>
                      <div className="text-sm sm:text-base font-bold mt-0.5">
                        {tab.title}
                      </div>
                    </div>
                    <ChevronRight 
                      size={18} 
                      style={{ color: isActive ? "#FFFFFF" : "#94A3B8" }}
                      className="shrink-0" 
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Live Preview Window */}
            <div 
              style={{ backgroundColor: "#061124" }}
              className="lg:col-span-7 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden"
            >
              
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span className="ml-2 font-mono text-xs text-slate-400">botmartz-insights // article-standard.py</span>
                </div>
                <span 
                  style={{
                    backgroundColor: "rgba(0, 184, 240, 0.15)",
                    color: "#00F0FF",
                    border: "1px solid rgba(0, 184, 240, 0.4)",
                  }}
                  className="text-[11px] font-mono font-bold px-2.5 py-1 rounded"
                >
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
              <div 
                style={{
                  backgroundColor: "#030712",
                  color: "#34D399",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                className="rounded-xl p-4 font-mono text-xs overflow-x-auto leading-relaxed mb-4"
              >
                <pre>{blueprintTabs[activeTab].previewCode}</pre>
              </div>

              {/* Golden Highlight Rule */}
              <div 
                style={{
                  backgroundColor: "rgba(245, 158, 11, 0.12)",
                  color: "#FDE68A",
                  border: "1px solid rgba(245, 158, 11, 0.35)",
                }}
                className="p-3 rounded-xl text-xs flex items-center gap-2.5"
              >
                <Zap size={16} style={{ color: "#FBBF24" }} className="shrink-0" />
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
            <span 
              style={{ backgroundColor: "rgba(0, 82, 255, 0.1)", color: "#0052FF", borderColor: "rgba(0, 82, 255, 0.25)" }}
              className="text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border inline-block"
            >
              Direct Editorial Submission
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Ready to Submit? Send Directly to Our Team
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Send your draft to <strong style={{ color: "#0052FF" }} className="font-bold font-mono">team@botmartz.com</strong>. Use our pre-structured template below for fast-track review.
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 sm:p-8 shadow-xl">
            
            {/* Email Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-200 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div 
                  style={{ backgroundColor: "#0052FF" }}
                  className="w-10 h-10 rounded-xl text-white flex items-center justify-center shrink-0 shadow-md"
                >
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Official Editorial Desk
                  </span>
                  <span 
                    style={{ color: "#0052FF" }}
                    className="font-mono font-black text-base sm:text-lg"
                  >
                    {emailAddress}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
                >
                  {copiedEmail ? <Check size={14} style={{ color: "#059669" }} /> : <Copy size={14} />}
                  <span>{copiedEmail ? "Email Copied!" : "Copy Email"}</span>
                </button>
                <button
                  onClick={handleCopyTemplate}
                  style={{ backgroundColor: "#0052FF", color: "#FFFFFF" }}
                  className="px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm hover:opacity-90"
                >
                  {copiedTemplate ? <Check size={14} style={{ color: "#34D399" }} /> : <Copy size={14} />}
                  <span>{copiedTemplate ? "Template Copied!" : "Copy Full Template"}</span>
                </button>
              </div>
            </div>

            {/* Email Body Preformatted */}
            <div 
              style={{ backgroundColor: "#0B132B", color: "#E2E8F0" }}
              className="rounded-xl p-5 font-mono text-xs leading-relaxed overflow-x-auto border border-slate-800 shadow-inner"
            >
              <pre className="whitespace-pre-wrap">{emailTemplate}</pre>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600">
                ⚡ Turnaround: Technical review response within <strong className="text-slate-900">24 to 48 hours</strong>.
              </div>
              <a
                href={`mailto:${emailAddress}?subject=[Author Submission] Engineering Insights&body=${encodeURIComponent(emailTemplate)}`}
                style={{ backgroundColor: "#0052FF", color: "#FFFFFF" }}
                className="w-full sm:w-auto px-7 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all hover:opacity-95 cursor-pointer"
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
            <div 
              style={{ backgroundColor: "rgba(16, 185, 129, 0.05)", borderColor: "#A7F3D0" }}
              className="p-6 sm:p-8 rounded-2xl border-2"
            >
              <div 
                style={{ color: "#065F46" }}
                className="flex items-center gap-2.5 font-extrabold text-lg mb-4"
              >
                <CheckCircle2 size={22} style={{ color: "#059669" }} />
                <span>What Gets Fast-Tracked & Accepted</span>
              </div>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span style={{ color: "#059669" }} className="font-bold text-base leading-none">✓</span>
                  <span>Tested, runnable code snippets with documented libraries and dependencies.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span style={{ color: "#059669" }} className="font-bold text-base leading-none">✓</span>
                  <span>Direct analysis of production trade-offs, bottlenecks, and failure modes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span style={{ color: "#059669" }} className="font-bold text-base leading-none">✓</span>
                  <span>Clear architecture flowcharts or system visual diagrams.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span style={{ color: "#059669" }} className="font-bold text-base leading-none">✓</span>
                  <span>Concrete benchmark numbers (latency, throughput, VRAM, memory usage).</span>
                </li>
              </ul>
            </div>

            {/* What Gets Rejected */}
            <div 
              style={{ backgroundColor: "rgba(244, 63, 94, 0.05)", borderColor: "#FECDD3" }}
              className="p-6 sm:p-8 rounded-2xl border-2"
            >
              <div 
                style={{ color: "#9F1239" }}
                className="flex items-center gap-2.5 font-extrabold text-lg mb-4"
              >
                <XCircle size={22} style={{ color: "#E11D48" }} />
                <span>What We Do Not Publish</span>
              </div>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span style={{ color: "#E11D48" }} className="font-bold text-base leading-none">✗</span>
                  <span>Generic high-level AI overviews or unedited AI-generated text.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span style={{ color: "#E11D48" }} className="font-bold text-base leading-none">✗</span>
                  <span>Articles with broken, non-reproducible code or missing dependencies.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span style={{ color: "#E11D48" }} className="font-bold text-base leading-none">✗</span>
                  <span>Pure sales pitches or promotional marketing articles.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span style={{ color: "#E11D48" }} className="font-bold text-base leading-none">✗</span>
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
                    style={{ color: "#0052FF" }}
                    className={`shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} 
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
          <p className="text-white text-sm sm:text-base mb-7 opacity-90">
            You don't need a finished article to start. Send an outline or technical topic to our team.
          </p>
          <a
            href={`mailto:${emailAddress}?subject=[Article Pitch] Engineering Insights`}
            style={{ backgroundColor: "#FFFFFF", color: "#0045D8" }}
            className="inline-flex items-center gap-2 font-extrabold px-8 py-3.5 rounded-xl text-sm sm:text-base shadow-xl transition-all hover:bg-slate-100 cursor-pointer"
          >
            <Send size={16} style={{ color: "#0045D8" }} />
            <span>Email Editorial Team ({emailAddress})</span>
          </a>
        </div>
      </section>

    </main>
  );
}
