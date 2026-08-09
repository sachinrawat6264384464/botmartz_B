"use client";

import React, { useState } from "react";
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
  Award
} from "lucide-react";
import Link from "next/link";

const workshopOptions = [
  { id: "bootcamp-1", label: "Bootcamp 01: Build Your First AI Full-Stack App (Aug 9)" },
  { id: "bootcamp-2", label: "Bootcamp 02: Build Smarter AI Agents (Aug 16)" },
  { id: "bootcamp-3", label: "Bootcamp 03: Build Production Ready AI Apps (Aug 22)" },
  { id: "full-pass", label: "Full AI Engineering Pass (All 3 Bootcamps)" },
];

export default function WorkshopFeedbackPage() {
  const [selectedWorkshop, setSelectedWorkshop] = useState(workshopOptions[0].id);
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [overallRating, setOverallRating] = useState(5);
  const [handsOnRating, setHandsOnRating] = useState(5);
  const [instructorRating, setInstructorRating] = useState(5);
  const [recommend, setRecommend] = useState("yes");
  const [takeaways, setTakeaways] = useState("");
  const [comments, setComments] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [participantName, setParticipantName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError("Please enter your Email Address or Check-in Code.");
      return;
    }

    setLoading(true);
    setError("");

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
          comments,
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
  }) => (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
        {label}
      </label>
      <div className="flex items-center gap-2 bg-[#050C18] border border-white/10 rounded-xl p-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="p-1 hover:scale-125 transition-transform focus:outline-none"
          >
            <Star
              size={24}
              className={`${
                star <= value
                  ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                  : "text-slate-600 hover:text-slate-400"
              } transition-colors`}
            />
          </button>
        ))}
        <span className="ml-auto text-xs font-mono font-bold text-[#00B8F0] bg-[#00B8F0]/10 px-2.5 py-1 rounded-md border border-[#00B8F0]/20">
          {value} / 5 Stars
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#040914] text-white font-sans flex flex-col justify-center items-center py-12 px-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] bg-[#0066FF]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        
        {/* Navigation back */}
        <div className="mb-6">
          <Link
            href="/community/ai-accelerator-workshop"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to AI Accelerator Workshop Page
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#0066FF]/20 to-purple-600/20 border border-[#0066FF]/40 text-[#00B8F0] text-xs font-mono font-bold uppercase tracking-wider shadow-lg">
            <Sparkles size={14} className="animate-pulse" /> AI Accelerator Workshop Survey &amp; Feedback
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-space-grotesk tracking-tight text-white drop-shadow">
            Share Your Workshop Experience
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Your feedback directly shapes our live engineering bootcamps, code repositories, and upcoming AI summits at Botmartz.
          </p>
        </div>

        {submitted ? (
          /* SUCCESS SCREEN */
          <div className="bg-[#0A1120] border border-emerald-500/40 rounded-3xl p-6 sm:p-10 text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

            <div className="w-20 h-20 bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 size={44} />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-space-grotesk text-white">
                Thank You, {participantName}! 🎉
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Your feedback has been recorded into the Botmartz Official Workshop Ledger. Thank you for building the future of AI engineering with us!
              </p>
            </div>

            <div className="bg-[#050C18] border border-white/10 p-5 rounded-2xl space-y-3 text-left text-xs font-mono text-slate-300">
              <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
                <span className="text-slate-400">PROGRAM:</span>
                <span className="text-white font-bold">AI Accelerator Workshop</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
                <span className="text-slate-400">OVERALL RATING:</span>
                <span className="text-amber-400 font-bold">{overallRating} / 5 Stars ⭐</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
                <span className="text-slate-400">RECOMMEND:</span>
                <span className="text-emerald-400 font-bold uppercase">{recommend === "yes" ? "Yes, Definitely! 👍" : "Needs Improvement"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">STATUS:</span>
                <span className="text-emerald-400 font-bold">RECORDED & VERIFIED ✅</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/community/ai-accelerator-workshop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-[#0066FF]/30"
              >
                <ArrowLeft size={16} /> Return to Bootcamps Page
              </Link>
            </div>
          </div>
        ) : (
          /* FORM SCREEN */
          <form
            onSubmit={handleSubmit}
            className="bg-[#0A1120] border border-white/10 rounded-3xl p-6 sm:p-9 space-y-6 shadow-2xl relative overflow-hidden"
          >
            {error && (
              <div className="p-4 bg-rose-500/15 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2.5">
                <ShieldCheck size={18} className="text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* WORKSHOP SELECTOR */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen size={14} className="text-[#00B8F0]" /> Which Workshop Session Did You Attend? *
              </label>
              <select
                value={selectedWorkshop}
                onChange={(e) => setSelectedWorkshop(e.target.value)}
                className="w-full bg-[#050C18] border border-white/20 hover:border-white/40 focus:border-[#00B8F0] rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00B8F0] transition-all font-sans cursor-pointer"
              >
                {workshopOptions.map((opt) => (
                  <option key={opt.id} value={opt.id} className="bg-[#050C18] text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* NAME & EMAIL FIELDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-[#050C18] border border-white/20 hover:border-white/40 focus:border-[#00B8F0] rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00B8F0] transition-all placeholder:text-slate-500 font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Email Address / Mobile *
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. rahul@example.com or 9876543210"
                  className="w-full bg-[#050C18] border border-white/20 hover:border-white/40 focus:border-[#00B8F0] rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00B8F0] transition-all placeholder:text-slate-500 font-mono"
                />
              </div>
            </div>

            {/* STAR RATINGS */}
            <div className="space-y-5 pt-3 border-t border-white/10">
              <StarRating
                label="1. Overall Workshop Experience *"
                value={overallRating}
                onChange={setOverallRating}
              />
              <StarRating
                label="2. Hands-on Coding & Practical Exercises *"
                value={handsOnRating}
                onChange={setHandsOnRating}
              />
              <StarRating
                label="3. Instructor Clarity & Topic Explanation *"
                value={instructorRating}
                onChange={setInstructorRating}
              />
            </div>

            {/* WOULD RECOMMEND */}
            <div className="space-y-2 pt-3 border-t border-white/10">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                4. Would you recommend Botmartz AI workshops to peers? *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRecommend("yes")}
                  className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    recommend === "yes"
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                      : "bg-[#050C18] border-white/10 text-slate-400 hover:border-white/30"
                  }`}
                >
                  <ThumbsUp size={16} /> Yes, Definitely!
                </button>
                <button
                  type="button"
                  onClick={() => setRecommend("no")}
                  className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    recommend === "no"
                      ? "bg-rose-500/20 border-rose-500 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                      : "bg-[#050C18] border-white/10 text-slate-400 hover:border-white/30"
                  }`}
                >
                  Needs Improvement
                </button>
              </div>
            </div>

            {/* KEY TAKEAWAYS */}
            <div className="space-y-1.5 pt-3 border-t border-white/10">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 size={14} className="text-[#00B8F0]" /> 5. Key Takeaways &amp; What You Built (2-3 lines)
              </label>
              <textarea
                rows={3}
                value={takeaways}
                onChange={(e) => setTakeaways(e.target.value)}
                placeholder="Tell us what project, agent, or concept you learned or built during the session..."
                className="w-full bg-[#050C18] border border-white/20 hover:border-white/40 focus:border-[#00B8F0] rounded-xl p-3.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00B8F0] transition-all placeholder:text-slate-500"
              />
            </div>

            {/* ADDITIONAL COMMENTS */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                6. Any Suggestions for Future Bootcamps / Topics?
              </label>
              <textarea
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Share any feedback, questions, or specific topics you want to see next..."
                className="w-full bg-[#050C18] border border-white/20 hover:border-white/40 focus:border-[#00B8F0] rounded-xl p-3.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00B8F0] transition-all placeholder:text-slate-500"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white py-4 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#0066FF]/30 active:scale-[0.99] disabled:opacity-50 cursor-pointer mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Submitting Workshop Feedback...
                </>
              ) : (
                <>
                  Submit Workshop Feedback <Send size={16} />
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-8 text-center text-xs text-slate-500 font-mono">
          Botmartz Official Workshop Feedback Ledger • Verified Entry
        </div>
      </div>
    </div>
  );
}
