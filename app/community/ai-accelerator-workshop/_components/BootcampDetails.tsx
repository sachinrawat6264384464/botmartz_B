"use client";

import { Calendar, Zap, Lock, Radio, Star, MessageSquare, ThumbsUp, ArrowRight } from "lucide-react";
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

function isSaleActive(): boolean {
  return false;
}

function getBootcamp1Status(): "COMPLETED" {
  return "COMPLETED";
}

export default function BootcampDetails({ feedbackData }: { feedbackData?: any }) {
  const [mounted, setMounted] = useState(false);
  const [bc1Status, setBc1Status] = useState<"LIVE" | "CLOSED" | "COMPLETED">("COMPLETED");

  useEffect(() => {
    setMounted(true);
    setBc1Status(getBootcamp1Status());

    const interval = setInterval(() => {
      setBc1Status(getBootcamp1Status());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const isBc1Closed = mounted && (bc1Status === "CLOSED" || bc1Status === "COMPLETED");
  const isBc1Live = mounted && bc1Status === "LIVE";
  const isBc1Completed = mounted && bc1Status === "COMPLETED";

  const fullPassPrice = 299;
  const fullPassOriginalPrice = 597;

  const avgRating = feedbackData?.avgRating || "4.9 / 5.0";
  const totalReviewsLabel = feedbackData?.totalReviewsLabel || "(180+ Student Reviews)";
  const recommendRate = feedbackData?.recommendRate || "98.4% Recommend Rate";
  const activeReviews = (feedbackData?.reviews && feedbackData.reviews.length > 0)
    ? feedbackData.reviews.slice(0, 8)
    : studentReviews.slice(0, 4);

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
              <span className="font-extrabold text-[#0B1C2C] text-sm">{avgRating}</span>
              <span className="text-xs text-[#64748B] font-medium">{totalReviewsLabel}</span>
            </div>

            <div className="h-4 w-px bg-[#CBD5E1] hidden sm:block" />

            <div className="flex items-center gap-1.5 text-xs text-[#0066FF] font-bold">
              <ThumbsUp size={14} />
              <span>{recommendRate}</span>
            </div>

            <div className="h-4 w-px bg-[#CBD5E1] hidden sm:block" />

            <Link
              href="/community/ai-accelerator-workshop/feedback"
              className="inline-flex items-center gap-1.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-extrabold px-3.5 py-1.5 rounded-lg transition-all shadow-sm"
            >
              <MessageSquare size={13} /> Give Workshop Feedback →
            </Link>
          </div>
        </div>

        {/* Bootcamps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {bootcamps.map((bootcamp, idx) => {
            const isCompleted = bootcamp.id === 1 || bootcamp.id === 2;
            const closed = isCompleted;
            const live = false;
            const completed = isCompleted;

            return (
              <motion.div
                key={bootcamp.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`bg-white border rounded-3xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all flex flex-col h-full relative overflow-hidden group ${
                  completed ? "border-emerald-300 bg-slate-50/70" : closed ? "border-slate-300 opacity-90" : "border-[#E2E8F0]"
                }`}
              >
                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${bootcamp.color}`} />

                {/* CENTER COMPLETED STAMP MARK */}
                {completed && (
                  <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center p-4">
                    <div className="rotate-[-14deg] border-4 border-dashed border-emerald-600 bg-white/95 backdrop-blur-sm px-6 py-3.5 rounded-2xl shadow-[0_12px_32px_rgba(16,185,129,0.35)] flex flex-col items-center justify-center gap-1 transform scale-105">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-extrabold shadow-xs">
                          ✓
                        </div>
                        <span className="font-black text-base sm:text-lg text-emerald-800 tracking-wider">SESSION COMPLETED</span>
                      </div>
                      <span className="text-[10px] font-black text-emerald-600 tracking-[0.2em] uppercase">WORKSHOP ENDED</span>
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#64748B] mb-2 flex items-center justify-between">
                    <span>Bootcamp {bootcamp.number}</span>
                    <span className="flex items-center gap-1.5">
                      {completed ? (
                        <span className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md tracking-wider">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          COMPLETED
                        </span>
                      ) : (
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
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_2px_6px_rgba(16,185,129,0.35)]">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
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
                    {completed ? (
                      <button
                        disabled
                        className="flex w-full justify-center items-center gap-2 py-3.5 rounded-xl bg-emerald-50 border-2 border-emerald-500/50 text-emerald-700 font-extrabold cursor-not-allowed opacity-90 pointer-events-none shadow-sm"
                      >
                        <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Session Completed</span>
                      </button>
                    ) : (
                      <Link
                        href={`/community/ai-accelerator-workshop/checkout?plan=bootcamp-${bootcamp.id}`}
                        className="flex w-full justify-center items-center py-3.5 rounded-xl bg-[#0066FF] text-white font-bold hover:bg-[#0052CC] transition-all shadow-sm"
                      >
                        <span>Register for ₹{bootcamp.price}</span>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeReviews.map((rev: any, i: number) => (
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
                    {[...Array(Number(rev.rating) || 5)].map((_, s) => (
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

          {/* Give Feedback CTA Box — HIGH CONTRAST FIX */}
          <div className="mt-12 text-center bg-[#060C17] border border-[#0066FF]/30 text-white p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
            <div className="text-left relative z-10">
              <h4 className="text-xl sm:text-2xl font-extrabold text-white mb-2 tracking-tight">Attended a Live Session?</h4>
              <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl">
                Submit your 2-3 line feedback and help us elevate the next AI summit.
              </p>
            </div>
            <Link
              href="/community/ai-accelerator-workshop/feedback"
              className="px-6 py-3 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold transition-all text-xs sm:text-sm whitespace-nowrap shadow-[0_4px_14px_rgba(0,102,255,0.4)] relative z-10"
            >
              Submit Your Feedback →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
