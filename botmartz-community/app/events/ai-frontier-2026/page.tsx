"use client";

import React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Calendar, 
  MapPin, 
  Clock, 
  Ticket, 
  ShieldCheck, 
  Award, 
  Users, 
  Terminal, 
  CheckCircle2,
  ArrowRight,
  Flame,
  Linkedin
} from "lucide-react";

const SPEAKERS = [
  {
    name: "Soham Sharma",
    role: "Founder & Director, Botmartz AI Solutions Pvt Ltd",
    bio: "AI Engineer and Architect specializing in Enterprise RAG, deterministic agent workflows, and moving LLMs into production.",
    image: "/Sohamsharma.jpeg",
    linkedin: "https://www.linkedin.com/in/soham-sharma/"
  },
  {
    name: "Dr. Promit Ray",
    role: "Cofounder & Chief AI Officer, RAYOL AI Solutions | Lead Consultant, Scivalon",
    bio: "Leading researcher focused on foundation models, reasoning architectures, and inference economics.",
    image: "/promit-headshot.png",
    linkedin: "https://www.linkedin.com/in/promit-ray/"
  },
  {
    name: "Harsh Sahu",
    role: "AI Engineer, Walkover",
    bio: "Specializes in building autonomous agents, orchestration pipelines, and evaluation harnesses.",
    image: "/harsh_sahu.jpeg",
    linkedin: "https://www.linkedin.com/in/harshhsahu/"
  }
];

const TICKETS = [
  {
    name: "Student / Explorer Pass",
    price: "₹499",
    tag: "Early Learner",
    features: [
      "Access to all keynote sessions",
      "Live Q&A with speakers",
      "Digital verifiable Certificate of Attendance",
      "Community Discord badge"
    ],
    popular: false,
    cta: "Book Student Pass"
  },
  {
    name: "Professional / Builder Pass",
    price: "₹1,499",
    tag: "Most Popular",
    features: [
      "All Student Pass benefits",
      "Hands-on Code Labs & Workbooks",
      "Networking lunch & VIP lounge access",
      "Official AI Frontier Merch Kit",
      "Priority Question Queuing"
    ],
    popular: true,
    cta: "Book Builder Pass"
  },
  {
    name: "VIP / Founder Pass",
    price: "₹3,999",
    tag: "Executive",
    features: [
      "All Builder Pass benefits",
      "Private VIP Speaker Dinner",
      "Exclusive 1-on-1 AI Architecture Advisory",
      "Full recording archive & workshop slides",
      "Fast-track priority registration"
    ],
    popular: false,
    cta: "Book VIP Pass"
  }
];

export default function AIFrontierPage() {
  return (
    <div className="bg-[#050B14] min-h-screen text-white">
      
      {/* ── HERO ── */}
      <section className="relative pt-16 pb-24 overflow-hidden border-b border-white/10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/15 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0052FF]/20 blur-[180px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 text-[#00B8F0] font-mono text-xs uppercase tracking-widest mb-6 font-semibold">
            <Flame size={13} className="text-[#00F0FF]" /> Flagship AI Engineering Summit
          </div>

          <h1 className="text-[clamp(36px,5vw,68px)] font-bold tracking-tight leading-[1.08] max-w-4xl mb-6">
            AI Frontier 2026: <br />
            <span className="bg-gradient-to-r from-[#00B8F0] via-[#0066FF] to-[#60A5FA] bg-clip-text text-transparent">
              The Production AI Summit
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#8A9EB0] max-w-2xl leading-relaxed mb-8">
            A premier gathering of AI engineers, researchers, and founders exploring Enterprise RAG, LangGraph Agent state machines, and hardware-accelerated inference.
          </p>

          <div className="flex flex-wrap gap-6 text-xs text-slate-300 font-mono mb-10 p-4 rounded-2xl bg-[#0B1524] border border-white/10 max-w-xl">
            <div className="flex items-center gap-2">
              <Calendar size={15} className="text-[#00B8F0]" />
              <span>Sunday, August 23, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={15} className="text-[#00B8F0]" />
              <span>Indore, India / Hybrid</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={15} className="text-[#00B8F0]" />
              <span>9:30 AM – 6:00 PM IST</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#tickets"
              className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-8 py-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-xl"
            >
              Get Your Pass Now ↓
            </a>
            <Link
              href="/certificates"
              className="border border-slate-700 hover:border-[#00B8F0] text-slate-300 hover:text-white px-6 py-4 rounded-xl text-xs font-mono transition-all"
            >
              Verify Past Certificates ↗
            </Link>
          </div>
        </div>
      </section>

      {/* ── SPEAKERS ── */}
      <section className="py-24 bg-[#070E1B] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="font-mono text-xs text-[#00B8F0] uppercase tracking-wider font-semibold mb-2">KEYNOTE LINEUP</div>
            <h2 className="text-3xl font-bold text-white mb-4">Featured Speakers</h2>
            <p className="text-sm text-slate-400">Leading AI practitioners and researchers driving real-world systems into production.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SPEAKERS.map((s, idx) => (
              <div key={idx} className="bg-[#0B1524] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#0066FF] to-[#00B8F0] p-0.5 mb-6">
                    <div className="w-full h-full bg-[#050B14] rounded-2xl flex items-center justify-center font-mono font-bold text-xl text-[#00B8F0]">
                      {s.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{s.name}</h3>
                  <div className="text-xs text-[#00B8F0] font-mono mb-4">{s.role}</div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">{s.bio}</p>
                </div>
                <a
                  href={s.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white"
                >
                  <Linkedin size={14} /> Connect on LinkedIn
                </a>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── TICKETS ── */}
      <section id="tickets" className="py-24 bg-[#050B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="font-mono text-xs text-[#00B8F0] uppercase tracking-wider font-semibold mb-2">REGISTRATION TIERS</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Choose Your Pass</h2>
            <p className="text-sm text-slate-400">All passes include full keynote access, interactive workshops, and verifiable certificates.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {TICKETS.map((t, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-8 shadow-2xl flex flex-col justify-between relative transition-all ${
                  t.popular
                    ? "bg-[#0B1524] border-2 border-[#00B8F0] shadow-[0_0_40px_rgba(0,184,240,0.2)]"
                    : "bg-[#091222] border border-white/10"
                }`}
              >
                {t.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#00B8F0] text-[#050B14] font-mono text-[10px] font-bold uppercase tracking-wider">
                    {t.tag}
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{t.name}</h3>
                  <div className="text-3xl font-bold font-mono text-white mb-6">{t.price}</div>

                  <div className="space-y-3 pt-6 border-t border-white/10 mb-8">
                    {t.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 size={14} className="text-[#00B8F0] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => alert(`Starting registration for ${t.name}... Proceeding to Razorpay checkout / UPI verification.`)}
                  className={`w-full py-3.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    t.popular
                      ? "bg-[#0066FF] hover:bg-[#0052CC] text-white shadow-lg"
                      : "bg-[#050B14] hover:bg-white/10 text-white border border-white/15"
                  }`}
                >
                  {t.cta} →
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
