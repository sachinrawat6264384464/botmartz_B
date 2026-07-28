"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { 
  Star, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  Loader2, 
  ShieldCheck, 
  ThumbsUp, 
  MessageSquare, 
  ArrowLeft,
  QrCode
} from "lucide-react";
import Link from "next/link";

export default function EventFeedbackPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "ai-frontier-2026";
  const eventTitle = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  const [identifier, setIdentifier] = useState("");
  const [overallRating, setOverallRating] = useState(5);
  const [contentRating, setContentRating] = useState(5);
  const [venueRating, setVenueRating] = useState(5);
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
      setError("Please enter your Check-in Code (e.g. REG-XXXXXX) or Email.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/events/submit-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: slug,
          eventSlug: slug,
          identifier,
          overallRating,
          contentRating,
          venueRating,
          recommend,
          takeaways,
          comments,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit feedback.");
      }

      setParticipantName(data.participantName || identifier);
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
        <span className="ml-auto text-xs font-mono font-bold text-[#00B8F0] bg-[#00B8F0]/10 px-2 py-0.5 rounded border border-[#00B8F0]/20">
          {value} / 5 Stars
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#040914] text-white font-sans flex flex-col justify-center items-center py-10 px-4 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] bg-[#00B8F0]/15 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-purple-600/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-xl relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 text-[#00B8F0] text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles size={14} /> Official Event Feedback Pass
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-space-grotesk tracking-tight text-white drop-shadow">
            {eventTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Your feedback helps us continuously elevate Botmartz AI engineering summits & workshops.
          </p>
        </div>

        {submitted ? (
          /* SUCCESS SCREEN */
          <div className="bg-[#0A1120] border border-emerald-500/40 rounded-2xl p-6 sm:p-8 text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.3)]">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-space-grotesk text-white">
                Thank You, {participantName}! 🎉
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                Your feedback has been successfully recorded in our event ledger. We appreciate your valuable contribution to building the future of AI engineering.
              </p>
            </div>

            <div className="bg-[#050C18] border border-white/10 p-4 rounded-xl space-y-2 text-left text-xs font-mono text-slate-300">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-slate-400">EVENT:</span>
                <span className="text-white font-bold">{eventTitle}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-slate-400">OVERALL RATING:</span>
                <span className="text-amber-400 font-bold">{overallRating} / 5 Stars ⭐</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">STATUS:</span>
                <span className="text-emerald-400 font-bold">VERIFIED & RECORDED ✅</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href={`/community/events/${slug}`}
                className="inline-flex items-center gap-2 bg-[#00B8F0] hover:bg-[#00A0D0] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#00B8F0]/25"
              >
                <ArrowLeft size={16} /> Back to Event Page
              </Link>
            </div>
          </div>
        ) : (
          /* FORM SCREEN */
          <form
            onSubmit={handleSubmit}
            className="bg-[#0A1120] border border-white/10 rounded-2xl p-5 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden"
          >
            {error && (
              <div className="p-3.5 bg-rose-500/15 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2">
                <ShieldCheck size={16} className="text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* IDENTIFIER FIELD */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Check-in Code / Email / Mobile *
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. REG-YFMP64P70 or rahul@domain.com"
                className="w-full bg-[#050C18] border border-white/30 hover:border-white/60 focus:border-[#00B8F0] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00B8F0] transition-all placeholder:text-slate-500 font-mono"
              />
              <p className="text-[11px] text-slate-400">
                Enter your ticket code (printed on your pass) or the email/phone used during registration.
              </p>
            </div>

            {/* STAR RATINGS */}
            <div className="space-y-4 pt-2 border-t border-white/10">
              <StarRating
                label="1. Overall Event Experience *"
                value={overallRating}
                onChange={setOverallRating}
              />
              <StarRating
                label="2. Content & Keynote Speakers Quality *"
                value={contentRating}
                onChange={setContentRating}
              />
              <StarRating
                label="3. Venue, Hospitality & Organization *"
                value={venueRating}
                onChange={setVenueRating}
              />
            </div>

            {/* WOULD RECOMMEND */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                4. Would you recommend Botmartz events to colleagues & friends? *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRecommend("yes")}
                  className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    recommend === "yes"
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                      : "bg-[#050C18] border-white/10 text-slate-400 hover:border-white/30"
                  }`}
                >
                  <ThumbsUp size={16} /> Yes, Definitely!
                </button>
                <button
                  type="button"
                  onClick={() => setRecommend("no")}
                  className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    recommend === "no"
                      ? "bg-rose-500/20 border-rose-500 text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.2)]"
                      : "bg-[#050C18] border-white/10 text-slate-400 hover:border-white/30"
                  }`}
                >
                  Needs Improvement
                </button>
              </div>
            </div>

            {/* KEY TAKEAWAYS */}
            <div className="space-y-1.5 pt-2 border-t border-white/10">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                5. Key Takeaways / What session did you enjoy most?
              </label>
              <textarea
                rows={3}
                value={takeaways}
                onChange={(e) => setTakeaways(e.target.value)}
                placeholder="Share your favorite talk, topic, or takeaway..."
                className="w-full bg-[#050C18] border border-white/30 hover:border-white/60 focus:border-[#00B8F0] rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00B8F0] transition-all placeholder:text-slate-500"
              />
            </div>

            {/* ADDITIONAL COMMENTS */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                6. Any Suggestions for Future Summits?
              </label>
              <textarea
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Suggestions, feedback, or topics you want to see next..."
                className="w-full bg-[#050C18] border border-white/30 hover:border-white/60 focus:border-[#00B8F0] rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00B8F0] transition-all placeholder:text-slate-500"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00B8F0] hover:bg-[#00A0D0] text-white py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00B8F0]/25 active:scale-[0.98] disabled:opacity-50 cursor-pointer mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Submitting Feedback...
                </>
              ) : (
                <>
                  Submit Official Feedback <Send size={16} />
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-8 text-center text-xs text-slate-500 font-mono">
          Botmartz Official Event Feedback Ledger • Strictly Secured
        </div>
      </div>
    </div>
  );
}
