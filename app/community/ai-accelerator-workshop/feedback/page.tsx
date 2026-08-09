"use client";

import React, { useState, useEffect } from "react";
import { 
  Star, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  Loader2, 
  ShieldCheck, 
  ThumbsUp, 
  ArrowLeft,
  Code2,
  BookOpen,
  Zap,
  Terminal,
  User,
  Mail,
  HeartHandshake,
  MessageCircle,
  FileCheck,
  Lock,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const workshopOptions = [
  { 
    id: "bootcamp-1", 
    number: "01", 
    title: "Full-Stack AI Application", 
    date: "Aug 9, 2026",
    icon: Code2,
    color: "from-[#0066FF] to-[#3B82F6]" 
  },
  { 
    id: "bootcamp-2", 
    number: "02", 
    title: "Autonomous AI Agents", 
    date: "Aug 16, 2026",
    icon: Zap,
    color: "from-purple-600 to-indigo-600" 
  },
  { 
    id: "bootcamp-3", 
    number: "03", 
    title: "Production AI Systems", 
    date: "Aug 22, 2026",
    icon: Terminal,
    color: "from-[#009688] to-[#14B8A6]" 
  },
  { 
    id: "full-pass", 
    number: "ALL", 
    title: "AI Engineering Pass", 
    date: "Complete Series",
    icon: Sparkles,
    color: "from-amber-500 to-orange-600" 
  },
];

const ratingLabels: Record<number, { text: string; color: string }> = {
  1: { text: "1/5 • Needs Work 😞", color: "text-rose-400 bg-rose-500/10 border-rose-500/30" },
  2: { text: "2/5 • Below Average 😐", color: "text-orange-400 bg-orange-500/10 border-orange-500/30" },
  3: { text: "3/5 • Good Session 🙂", color: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
  4: { text: "4/5 • Very Good! 😄", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30" },
  5: { text: "5/5 • Outstanding! 🔥", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
};

function isWorkshopOpen(id: string): boolean {
  if (typeof window === "undefined") return id === "bootcamp-1" || id === "full-pass";
  const now = new Date();
  
  if (id === "bootcamp-1" || id === "full-pass") return true;
  
  if (id === "bootcamp-2") {
    // Opens Aug 16, 2026
    const date = new Date(Date.UTC(2026, 7, 16, 0, 0, 0));
    return now >= date;
  }
  
  if (id === "bootcamp-3") {
    // Opens Aug 22, 2026
    const date = new Date(Date.UTC(2026, 7, 22, 0, 0, 0));
    return now >= date;
  }
  
  return true;
}

export default function WorkshopFeedbackPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(workshopOptions[0].id);
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [overallRating, setOverallRating] = useState(5);
  const [handsOnRating, setHandsOnRating] = useState(5);
  const [instructorRating, setInstructorRating] = useState(5);
  const [recommend, setRecommend] = useState("yes");
  const [improvementReason, setImprovementReason] = useState("");
  const [takeaways, setTakeaways] = useState("");
  const [comments, setComments] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [participantName, setParticipantName] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError("Please enter your Email Address or Check-in Mobile Number.");
      return;
    }

    // MANDATORY VALIDATION for 'Needs Improvement'
    if (recommend === "no" && !improvementReason.trim()) {
      setError("Please explain what needs improvement before submitting feedback.");
      return;
    }

    setLoading(true);
    setError("");

    const fullComments = recommend === "no"
      ? `[Improvement Feedback]: ${improvementReason.trim()}\n${comments.trim()}`
      : comments.trim();

    try {
      const res = await fetch("/api/events/submit-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: "ai-accelerator-workshop",
          eventSlug: "ai-accelerator-workshop",
          workshopId: selectedWorkshop,
          participantName: name.trim() || identifier.trim(),
          identifier: identifier.trim(),
          overallRating,
          contentRating: handsOnRating,
          venueRating: instructorRating,
          recommend,
          takeaways,
          comments: fullComments,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit workshop feedback.");
      }

      setParticipantName(name.trim() || data.participantName || identifier);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const StarRating = ({ 
    label, 
    value, 
    onChange 
  }: { 
    label: string; 
    value: number; 
    onChange: (val: number) => void; 
  }) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const activeValue = hoverValue !== null ? hoverValue : value;
    const meta = ratingLabels[activeValue] || ratingLabels[5];

    return (
      <div className="space-y-2.5 bg-[#071120]/80 border border-white/10 rounded-2xl p-4 sm:p-5 hover:border-white/20 transition-all">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs sm:text-sm font-bold text-slate-200 tracking-wide flex items-center gap-1.5">
            {label}
          </label>
          <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border transition-all ${meta.color}`}>
            {meta.text}
          </span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoverValue(star)}
              onMouseLeave={() => setHoverValue(null)}
              onClick={() => onChange(star)}
              className="p-1 hover:scale-125 active:scale-95 transition-all focus:outline-none cursor-pointer"
            >
              <Star
                size={28}
                className={`${
                  star <= activeValue
                    ? "text-amber-400 fill-amber-400 filter drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                    : "text-slate-700 hover:text-slate-500"
                } transition-all duration-200`}
              />
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans flex flex-col justify-center items-center py-14 px-4 sm:px-6 relative overflow-hidden">
      {/* Dynamic Animated Glow Orbs */}
      <div className="absolute top-[-15%] left-[-15%] w-[600px] h-[600px] bg-gradient-to-br from-[#0066FF]/20 to-cyan-500/10 blur-[140px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-15%] right-[-15%] w-[600px] h-[600px] bg-gradient-to-br from-purple-600/20 to-indigo-600/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Grid Pattern Background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10">
        
        {/* Navigation back link */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Link
            href="/community/ai-accelerator-workshop"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft size={14} /> Back to AI Accelerator Workshop
          </Link>
        </motion.div>

        {/* Header Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#0066FF]/20 via-purple-600/20 to-cyan-500/20 border border-[#0066FF]/40 text-[#00B8F0] text-xs font-mono font-bold uppercase tracking-widest shadow-xl">
            <Sparkles size={14} className="animate-pulse text-amber-400" /> Official Participant Feedback Ledger
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black font-space-grotesk tracking-tight text-white drop-shadow-md leading-tight">
            Share Your <span className="bg-gradient-to-r from-[#00B8F0] via-cyan-300 to-purple-400 bg-clip-text text-transparent">Workshop Feedback</span>
          </h1>
          
          <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto font-medium leading-relaxed">
            Your feedback directly shapes our live engineering bootcamps, code repositories, and upcoming AI summits at Botmartz.
          </p>
        </motion.div>

        {submitted ? (
          /* SUCCESS SCREEN - Holographic Ledger Ticket */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#071325]/90 border border-emerald-500/50 rounded-3xl p-6 sm:p-12 text-center space-y-6 shadow-[0_20px_60px_rgba(16,185,129,0.15)] backdrop-blur-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0066FF]/10 blur-3xl rounded-full pointer-events-none" />

            <div className="w-20 h-20 bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(16,185,129,0.35)] animate-bounce">
              <CheckCircle2 size={44} />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 inline-block">
                Feedback Recorded &amp; Verified
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-space-grotesk text-white">
                Thank You, {participantName}! 🎉
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Your feedback has been successfully recorded in the Botmartz Official Ledger. We deeply appreciate your contribution to elevating AI engineering education!
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#030A16] border border-white/10 p-6 rounded-2xl space-y-3.5 text-left text-xs font-mono text-slate-300 shadow-inner">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-slate-400">PROGRAM:</span>
                <span className="text-white font-bold">AI Accelerator Workshop</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-slate-400">OVERALL RATING:</span>
                <span className="text-amber-400 font-bold">{overallRating} / 5 Stars ⭐</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-slate-400">RECOMMEND:</span>
                <span className="text-emerald-400 font-bold uppercase">{recommend === "yes" ? "Yes, Definitely! 👍" : "Needs Improvement"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">STATUS:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <FileCheck size={14} /> SECURED &amp; RECORDED ✅
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/community/ai-accelerator-workshop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-xs sm:text-sm px-8 py-4 rounded-xl transition-all shadow-lg shadow-[#0066FF]/30 hover:scale-105"
              >
                <ArrowLeft size={16} /> Return to Bootcamps Page
              </Link>
            </div>
          </motion.div>
        ) : (
          /* FORM SCREEN */
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-[#071325]/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-10 space-y-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            {/* Top Glow Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0066FF] via-purple-500 to-cyan-400" />

            {error && (
              <div className="p-4 bg-rose-500/15 border border-rose-500/40 rounded-2xl text-rose-300 text-xs sm:text-sm flex items-center gap-3">
                <ShieldCheck size={20} className="text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* STEP 1: SELECT WORKSHOP SESSION (CARDS GRID WITH UPCOMING STATUS) */}
            <div className="space-y-3">
              <label className="block text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <BookOpen size={16} className="text-[#00B8F0]" /> 1. Which Workshop Session Did You Attend? *
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {workshopOptions.map((item) => {
                  const Icon = item.icon;
                  const isOpen = mounted ? isWorkshopOpen(item.id) : (item.id === "bootcamp-1" || item.id === "full-pass");
                  const isSelected = selectedWorkshop === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={!isOpen}
                      onClick={() => isOpen && setSelectedWorkshop(item.id)}
                      className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                        !isOpen
                          ? "bg-[#030C1A]/40 border-white/5 opacity-50 cursor-not-allowed pointer-events-none grayscale-[40%]"
                          : isSelected
                          ? "bg-gradient-to-br from-[#0066FF]/20 to-purple-600/20 border-[#00B8F0] shadow-[0_0_20px_rgba(0,184,240,0.25)] ring-1 ring-[#00B8F0] cursor-pointer"
                          : "bg-[#030C1A] border-white/10 hover:border-white/30 text-slate-300 cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase bg-white/10 px-2 py-0.5 rounded text-slate-300">
                          {item.number}
                        </span>

                        {isOpen ? (
                          <span className="text-[11px] text-slate-400 font-mono">{item.date}</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-extrabold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full">
                            <Lock size={10} /> UPCOMING ({item.date})
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-xl bg-gradient-to-br ${item.color} text-white shrink-0 shadow-sm ${!isOpen ? "opacity-60" : ""}`}>
                          <Icon size={16} />
                        </div>
                        <span className={`text-xs sm:text-sm font-bold leading-snug ${isOpen ? "text-white" : "text-slate-400"}`}>
                          {item.title}
                        </span>
                      </div>

                      {isOpen && isSelected && (
                        <div className="absolute top-2 right-2 text-[#00B8F0]">
                          <CheckCircle2 size={16} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: PARTICIPANT INFORMATION */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <label className="block text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <User size={16} className="text-[#00B8F0]" /> 2. Your Information *
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-[#030C1A] border border-white/20 hover:border-white/40 focus:border-[#00B8F0] rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00B8F0] transition-all placeholder:text-slate-600 font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Email Address / Mobile *
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="e.g. rahul@example.com or 9876543210"
                      className="w-full bg-[#030C1A] border border-white/20 hover:border-white/40 focus:border-[#00B8F0] rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00B8F0] transition-all placeholder:text-slate-600 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3: INTERACTIVE STAR RATINGS */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <label className="block text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Star size={16} className="text-amber-400" /> 3. Rate Your Workshop Experience *
              </label>

              <StarRating
                label="Overall Session Rating"
                value={overallRating}
                onChange={setOverallRating}
              />
              <StarRating
                label="Hands-on Coding & Practical Exercises"
                value={handsOnRating}
                onChange={setHandsOnRating}
              />
              <StarRating
                label="Instructor Clarity & Concept Explanation"
                value={instructorRating}
                onChange={setInstructorRating}
              />
            </div>

            {/* STEP 4: WOULD RECOMMEND WITH CONDITIONAL TEXT BOX FOR NEEDS IMPROVEMENT */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <label className="block text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <HeartHandshake size={16} className="text-emerald-400" /> 4. Would you recommend Botmartz AI bootcamps? *
              </label>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setRecommend("yes");
                    setError("");
                  }}
                  className={`py-3.5 px-4 rounded-2xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                    recommend === "yes"
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] ring-1 ring-emerald-500"
                      : "bg-[#030C1A] border-white/10 text-slate-400 hover:border-white/30"
                  }`}
                >
                  <ThumbsUp size={18} /> Yes, Definitely!
                </button>
                <button
                  type="button"
                  onClick={() => setRecommend("no")}
                  className={`py-3.5 px-4 rounded-2xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                    recommend === "no"
                      ? "bg-rose-500/20 border-rose-500 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.25)] ring-1 ring-rose-500"
                      : "bg-[#030C1A] border-white/10 text-slate-400 hover:border-white/30"
                  }`}
                >
                  Needs Improvement
                </button>
              </div>

              {/* CONDITIONAL MANDATORY TEXT BOX WHEN 'NEEDS IMPROVEMENT' IS SELECTED */}
              <AnimatePresence>
                {recommend === "no" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2 pt-2"
                  >
                    <label className="block text-xs font-extrabold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertCircle size={15} className="text-rose-400 shrink-0" />
                      Please tell us what needs improvement * (Required before submitting)
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={improvementReason}
                      onChange={(e) => {
                        setImprovementReason(e.target.value);
                        if (error) setError("");
                      }}
                      placeholder="Please share what fell short (e.g. pace of session, topic depth, code setup issue) so we can fix it immediately..."
                      className="w-full bg-[#030C1A] border-2 border-rose-500/60 focus:border-rose-400 rounded-2xl p-4 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500/40 transition-all placeholder:text-slate-500"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* STEP 5: KEY TAKEAWAYS */}
            <div className="space-y-2 pt-4 border-t border-white/10">
              <label className="block text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <MessageCircle size={16} className="text-[#00B8F0]" /> 5. Key Takeaways &amp; What You Built (2-3 lines)
              </label>
              <textarea
                rows={3}
                value={takeaways}
                onChange={(e) => setTakeaways(e.target.value)}
                placeholder="Tell us what project, agent, or AI concept you learned or built during the session..."
                className="w-full bg-[#030C1A] border border-white/20 hover:border-white/40 focus:border-[#00B8F0] rounded-2xl p-4 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00B8F0] transition-all placeholder:text-slate-600"
              />
            </div>

            {/* STEP 6: SUGGESTIONS */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider">
                6. Any Suggestions for Future Bootcamps / Topics?
              </label>
              <textarea
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Share any feedback, questions, or specific topics you want to see next in Botmartz AI Summits..."
                className="w-full bg-[#030C1A] border border-white/20 hover:border-white/40 focus:border-[#00B8F0] rounded-2xl p-4 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00B8F0] transition-all placeholder:text-slate-600"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#0066FF] via-[#0052CC] to-[#0039A6] hover:from-[#0052CC] hover:to-[#002B80] text-white py-4.5 rounded-2xl font-black text-sm sm:text-base tracking-wide transition-all flex items-center justify-center gap-2 shadow-[0_8px_30px_rgba(0,102,255,0.4)] active:scale-[0.99] disabled:opacity-50 cursor-pointer mt-6"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Submitting Official Feedback...
                </>
              ) : (
                <>
                  Submit Official Feedback <Send size={18} />
                </>
              )}
            </button>
          </motion.form>
        )}

        {/* Footer Ledger Tag */}
        <div className="mt-8 text-center text-xs text-slate-500 font-mono">
          Botmartz AI Solutions • Official Workshop Feedback Ledger
        </div>
      </div>
    </div>
  );
}
