"use client";

import { CheckCircle2, Calendar, Zap, Lock, Radio, Star, MessageSquare, ThumbsUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const bootcamps = [
  {
    number: "01",
    title: "Build Your First AI Full-Stack Application",
    subtitle: "Build an AI-powered application from scratch using the latest AI tools.",
    topics: [
      "AI Development Environment",
      "ChatGPT, Claude, Gemini",
      "Cursor IDE",
      "LangChain & LangGraph",
      "AI Agents Fundamentals",
      "RAG (Retrieval-Augmented Generation)",
      "Deploy AI Application",
    ],
    outcome: "Students leave with a working AI application.",
    color: "from-[#0066FF] to-[#3B82F6]",
    date: "Aug 9, 2026",
    id: 1,
    price: 199,
  },
  {
    number: "02",
    title: "Build Smarter AI Agents",
    subtitle: "Learn how modern AI Agents think, plan and act.",
    topics: [
      "Single Agent & Multi-Agent",
      "Memory & Context Management",
      "Tool Calling & Execution",
      "MCP (Model Context Protocol)",
      "Google ADK",
      "LangGraph Deep Dive",
      "Agent Architecture & Workflow",
    ],
    outcome: "Students build intelligent AI Agents.",
    color: "from-[#0F172A] to-[#1E293B]",
    date: "Aug 16, 2026",
    id: 2,
    price: 199,
  },
  {
    number: "03",
    title: "Build Production Ready AI Applications",
    subtitle: "Scale and deploy robust systems to the real world.",
    topics: [
      "Transformer & Mamba Architecture",
      "Modern LLMs overview",
      "Inference & Optimization",
      "Deployment Strategies",
      "Scaling AI Infrastructure",
      "AI Engineering Best Practices",
    ],
    outcome: "Students understand how modern production AI systems are engineered. Note: Expect local/nginx-based deployments via tunneling, rather than full AWS/cloud deployments.",
    color: "from-[#009688] to-[#14B8A6]",
    date: "Aug 22, 2026",
    id: 3,
    price: 199,
  },
];

const studentReviews = [
  {
    name: "Rahul S.",
    role: "Full Stack Engineer",
    workshop: "Bootcamp 01 (Aug 9)",
    rating: 5,
    quote: "Built my first full-stack RAG app in 3 hours live! The hands-on Cursor + LangGraph workflow was super practical.",
  },
  {
    name: "Ananya M.",
    role: "CS Undergrad",
    workshop: "Bootcamp 01 (Aug 9)",
    rating: 5,
    quote: "Clear, zero-fluff engineering instruction. Learned agent fundamentals that aren't taught in college courses.",
  },
  {
    name: "Vikram R.",
    role: "Backend Developer",
    workshop: "AI Engineering Pass",
    rating: 5,
    quote: "Best 199 rupees spent on AI learning. The code templates and step-by-step guidance were top tier.",
  },
];

// Flash Sale: ENDED — Sale permanently disabled
function isSaleActive(): boolean {
  return false;
}

// Bootcamp 1 Status: COMPLETED
function getBootcamp1Status(): "COMPLETED" {
  return "COMPLETED";
}

export default function BootcampDetails() {
  const [mounted, setMounted] = useState(false);
  const [saleActive, setSaleActive] = useState(false);
  const [bc1Status, setBc1Status] = useState<"LIVE" | "CLOSED" | "COMPLETED">("COMPLETED");

  useEffect(() => {
    setMounted(true);
    setSaleActive(isSaleActive());
    setBc1Status(getBootcamp1Status());

    const interval = setInterval(() => {
      setSaleActive(isSaleActive());
      setBc1Status(getBootcamp1Status());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const showSale = mounted && saleActive;
  const isBc1Closed = mounted && (bc1Status === "CLOSED" || bc1Status === "COMPLETED");
  const isBc1Live = mounted && bc1Status === "LIVE";
  const isBc1Completed = mounted && bc1Status === "COMPLETED";

  const fullPassPrice = 399;
  // No strikethrough price — show clean ₹399 only

  return (
    <section id="bootcamps" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[48px] font-bold text-[#0B1C2C] tracking-tight mb-4">
            The Curriculum
          </h2>
          <p className="text-lg md:text-xl text-[#475569] max-w-2xl mx-auto font-medium mb-6">
            A comprehensive, step-by-step engineering curriculum designed for real-world application.
          </p>

          {/* Feedback Metrics & Give Feedback Button */}
          <div className="flex flex-wrap items-center justify-center gap-4 max-w-3xl mx-auto bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400" />
                ))}
              </div>
              <span className="font-extrabold text-[#0B1C2C] text-sm">4.9 / 5.0</span>
              <span className="text-xs text-[#64748B] font-medium">(180+ Student Reviews)</span>
            </div>

            <div className="h-4 w-px bg-[#CBD5E1] hidden sm:block" />

            <div className="flex items-center gap-1.5 text-xs text-[#0066FF] font-bold">
              <ThumbsUp size={14} />
              <span>98.4% Recommend Rate</span>
            </div>

            <div className="h-4 w-px bg-[#CBD5E1] hidden sm:block" />

            <Link
              href="/community/ai-accelerator-workshop/feedback"
              className="inline-flex items-center gap-1.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-extrabold px-3.5 py-1.5 rounded-lg transition-all shadow-sm"
            >
              <MessageSquare size={13} /> Give Workshop Feedback →
            </Link>
          </div>

          {/* Flash Sale Alert inside section */}
          {showSale && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B00] to-[#E03200] text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-lg"
            >
              <Zap size={16} className="animate-pulse" />
              Flash Sale LIVE! — Get Full Pass at ₹299 (was ₹399) till 11:59 PM today!
              <Zap size={16} className="animate-pulse" />
            </motion.div>
          )}
        </div>

        {/* Bootcamps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {bootcamps.map((bootcamp, idx) => {
            const isBc1 = bootcamp.id === 1;
            const closed = isBc1 && isBc1Closed;
            const live = isBc1 && isBc1Live;
            const completed = isBc1 && isBc1Completed;

            return (
              <motion.div
                key={bootcamp.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all flex flex-col h-full relative overflow-hidden group ${completed ? "opacity-60 grayscale-[60%] blur-[1px]" : closed ? "opacity-75 grayscale-[20%]" : ""
                  }`}
              >
                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${bootcamp.color}`} />

                <div className="mb-6">
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#64748B] mb-2 flex items-center justify-between">
                    <span>Bootcamp {bootcamp.number}</span>
                    <span className="flex items-center gap-1.5">
                      {live && (
                        <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                          <Radio size={10} className="animate-pulse text-emerald-500" /> LIVE NOW (Till 1 PM)
                        </span>
                      )}
                      {closed && !completed && (
                        <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-500 border border-slate-300 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                          <Lock size={10} /> Registration Closed
                        </span>
                      )}
                      {completed && (
                        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 border border-blue-200 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                          <CheckCircle2 size={10} /> COMPLETED
                        </span>
                      )}
                      {/* Bootcamp 02 — Upcoming Soon badge */}
                      {bootcamp.id === 2 && (
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 border border-amber-300 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full animate-pulse">
                          ⏳ Upcoming Soon
                        </span>
                      )}
                      {!isBc1 && (
                        <>
                          <Calendar className="w-3 h-3" /> {bootcamp.date}
                        </>
                      )}
                    </span>
                  </span>
                  <h3 className="text-2xl font-bold text-[#0B1C2C] leading-tight mb-3">
                    {bootcamp.title}
                  </h3>
                  <p className="text-[#475569] font-medium leading-relaxed">
                    {bootcamp.subtitle}
                  </p>
                </div>

                <div className="mb-8 flex-1">
                  <h4 className="text-sm font-bold tracking-widest uppercase text-[#94A3B8] mb-4">
                    Core Topics
                  </h4>
                  <ul className="space-y-3">
                    {bootcamp.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#0066FF] flex-shrink-0 mt-0.5" />
                        <span className="text-[#334155] font-medium leading-snug">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-6 border-t border-[#E2E8F0]">
                  <h4 className="text-sm font-bold tracking-widest uppercase text-[#94A3B8] mb-2">
                    Outcome
                  </h4>
                  <p className="text-[#0B1C2C] font-semibold mb-6">{bootcamp.outcome}</p>
                  <div className="space-y-3">
                    {closed ? (
                      <button
                        disabled
                        className="flex w-full justify-center items-center gap-2 py-3 rounded-xl bg-slate-100 border border-slate-300 text-slate-400 font-bold cursor-not-allowed opacity-80 pointer-events-none"
                      >
                        {completed ? <CheckCircle2 size={14} /> : <Lock size={14} />} <span>{completed ? "Session Completed" : "Registration Closed (Session Ended at 1 PM)"}</span>
                      </button>
                    ) : (
                      <Link
                        href={`/community/ai-accelerator-workshop/checkout?plan=bootcamp-${bootcamp.id}`}
                        className="flex w-full justify-center items-center py-3 rounded-xl border-2 border-[#E2E8F0] text-[#0B1C2C] font-bold hover:border-[#0B1C2C] hover:bg-[#F8FAFC] transition-all"
                      >
                        <span>Register for ₹{bootcamp.price}</span>
                      </Link>
                    )}
                    <Link
                      href="/community/ai-accelerator-workshop/checkout?plan=bundle"
                      className="flex w-full justify-center items-center gap-1.5 py-3 rounded-xl bg-[#0066FF] text-white font-bold hover:bg-[#0052CC] transition-all shadow-sm"
                    >
                      <span>Get Full Pass</span>
                      {showSale ? (
                        <span className="flex items-center gap-1">
                          <span className="line-through text-white/70 font-medium">₹399</span>
                          <span className="text-amber-300 font-extrabold">₹299</span>
                        </span>
                      ) : (
                        <span>(₹399)</span>
                      )}
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
          {/* Full Width Pass Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-3 mt-4"
          >
            <div className="bg-[#0B1C2C] border border-[#1E293B] rounded-3xl p-8 lg:p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group">
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#0066FF]/20 to-transparent blur-3xl rounded-full pointer-events-none group-hover:from-[#0066FF]/30 transition-all duration-700" />

              <div className="relative z-10 flex-1">
                <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#0066FF] to-[#3B82F6] text-white text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 shadow-sm">
                  Most Popular
                </div>
                <h3 className="text-[28px] md:text-[36px] font-extrabold text-white mb-2 leading-tight">
                  AI Engineering Pass
                </h3>
                <p className="text-[#8A9EB0] font-medium text-base md:text-lg max-w-2xl">
                  The complete journey from beginner to production. Get access to all 3 live engineering bootcamps, community access, and certificate of completion.
                </p>
              </div>

              <div className="relative z-10 flex flex-col items-center md:items-end flex-shrink-0 w-full md:w-auto border-t md:border-t-0 md:border-l border-[#1E293B] pt-6 md:pt-0 md:pl-10">
                <div className="flex items-end gap-3 mb-5">
                  <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">₹{fullPassPrice}</span>
                </div>
                <Link
                  href="/community/ai-accelerator-workshop/checkout?plan=bundle"
                  className="w-full md:w-auto px-10 py-4 rounded-xl bg-[#0066FF] text-white font-bold hover:bg-[#0052CC] transition-all text-center shadow-[0_4px_14px_rgba(0,102,255,0.35)] hover:shadow-[0_4px_20px_rgba(0,102,255,0.5)] text-[15px]"
                >
                  Get The Full Pass
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Student Testimonials & Feedback Ticker */}
        <div className="mt-24 pt-16 border-t border-[#E2E8F0]">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0066FF]/10 text-[#0066FF] text-xs font-bold uppercase tracking-widest mb-3">
              Verified Participant Feedback
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#0B1C2C]">
              What Engineers Say About Our Bootcamps
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studentReviews.map((rev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-2xl shadow-sm flex flex-col justify-between"
              >
                <div className="mb-4">
                  <div className="flex text-amber-400 mb-3">
                    {[...Array(rev.rating)].map((_, s) => (
                      <Star key={s} size={15} className="fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-[#334155] text-sm font-medium leading-relaxed italic">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0]/80 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#0B1C2C]">{rev.name}</div>
                    <div className="text-[11px] text-[#64748B] font-medium">{rev.role}</div>
                  </div>
                  <span className="text-[10px] font-mono font-semibold bg-white px-2 py-1 rounded border border-[#E2E8F0] text-[#0066FF]">
                    {rev.workshop}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Give Feedback CTA Box */}
          <div className="mt-12 text-center bg-gradient-to-r from-[#0B1C2C] to-[#1E293B] text-white p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="text-left">
              <h4 className="text-xl font-bold mb-1">Attended a Live Session?</h4>
              <p className="text-xs sm:text-sm text-[#8A9EB0] font-medium">
                Submit your 2-3 line feedback and help us elevate the next AI summit.
              </p>
            </div>
            <Link
              href="/community/ai-accelerator-workshop/feedback"
              className="px-6 py-3 rounded-xl bg-[#0066FF] text-[#0B1C2C] font-bold hover:bg-[#0052CC] hover:text-white transition-all text-xs sm:text-sm whitespace-nowrap shadow-md"
            >
              Submit Your Feedback →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
