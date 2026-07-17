"use client";

import React, { useState } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export default function AIFrontierEventBody() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notified, setNotified] = useState(false);

  const heroHighlights = [
    { tag: "AE", title: "Top AI Engineers", desc: "Industry experts & practitioners" },
    { tag: "DD", title: "Deep Dives", desc: "Engineering-focused sessions" },
    { tag: "CF", title: "Community First", desc: "Build, connect, grow together" },
    { tag: "OI", title: "Open & Inclusive", desc: "Everyone is welcome" },
  ];

  const whoAttend = [
    { tag: "AE", title: "AI Engineers & Developers", desc: "Build, ship and scale AI systems" },
    { tag: "SE", title: "Software Engineers", desc: "Level up with production AI skills" },
    { tag: "FL", title: "Founders & Tech Leads", desc: "Drive innovation in your organization" },
    { tag: "RA", title: "Researchers & Academics", desc: "Explore frontiers & collaborate" },
    { tag: "ST", title: "Students & Enthusiasts", desc: "Learn, connect and grow" },
  ];

  const takeHome = [
    "Deep insights from industry experts",
    "Practical frameworks & real-world lessons",
    "The AI Engineering Roadmap 2026",
    "Connections with top engineers & founders",
    "Access to the Botmartz AI Community",
  ];

  const contentMultiplication = [
    { tag: "KV", label: "Keynote Video" },
    { tag: "SC", label: "8–10 Short Clips" },
    { tag: "BP", label: "Blog Posts" },
    { tag: "LI", label: "LinkedIn Posts" },
    { tag: "IG", label: "Instagram Reels & Carousels" },
    { tag: "NL", label: "Newsletter Issue" },
    { tag: "SI", label: "Speaker Interviews" },
  ];

  const whyFrontier = [
    { tag: "EF", title: "Engineering First", desc: "Focused on real-world AI engineering." },
    { tag: "CD", title: "Community Driven", desc: "Built to nurture a long-term AI engineering community." },
    { tag: "CL", title: "Content That Lasts", desc: "Sessions turned into content that keeps inspiring." },
    { tag: "OC", title: "Open & Collaborative", desc: "Bringing the ecosystem together for impact." },
    { tag: "FF", title: "Future Focused", desc: "Shaping the future of AI, responsibly." },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifyEmail.trim()) {
      setNotified(true);
    }
  };

  return (
    <div className={`${montserrat.className} bg-[#F5F8FC] text-[#0B1220] antialiased overflow-x-hidden`}>
      <style jsx global>{`
        @keyframes ef-pulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.85; }
        }
        @keyframes ef-drift {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
      `}</style>

      {/* ─── 1. HERO BANNER ─── */}
      <div className="bg-[#060C1F] relative overflow-hidden pt-[120px] pb-16 px-6 sm:px-10">
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{
            backgroundImage: "linear-gradient(rgba(0,198,255,0.06) 1px,transparent 1px), linear-gradient(90deg,rgba(0,198,255,0.06) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse 80% 60% at 60% 30%,black,transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 60% 30%,black,transparent)"
          }}
        />
        <div className="absolute w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(0,123,255,0.35),transparent_70%)] -top-[160px] -right-[100px] blur-[10px] pointer-events-none" />

        <div className="relative max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(0,123,255,0.14)] border border-[rgba(0,198,255,0.35)] font-bold text-xs tracking-[0.08em] text-[#4FC3FF]">
              AI FRONTIER 2026
            </div>
            <h1 className="font-extrabold text-[38px] sm:text-[48px] md:text-[58px] leading-[1.08] text-white mt-5 sm:mt-[22px] tracking-[-0.01em]">
              The Future of<br />
              <span className="bg-gradient-to-r from-[#00C6FF] to-[#007BFF] bg-clip-text text-transparent">
                AI Engineering
              </span>
            </h1>
            <p className="font-semibold text-sm sm:text-[15px] leading-[1.6] text-[#8FA3C4] mt-5 tracking-[0.02em]">
              Agents &nbsp;·&nbsp; Enterprise AI &nbsp;·&nbsp; AI-Assisted Development &nbsp;·&nbsp; Responsible AI
            </p>

            <div className="flex gap-7 mt-7 flex-wrap">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-[9px] bg-[rgba(0,198,255,0.12)] border border-[rgba(0,198,255,0.3)] flex items-center justify-center font-bold text-xs text-[#00C6FF] shrink-0">
                  22
                </div>
                <div>
                  <div className="font-bold text-[13.5px] text-white">Aug 22, 2026</div>
                  <div className="font-medium text-xs text-[#7C8CAD]">10:00 AM – 5:00 PM</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-[9px] bg-[rgba(0,198,255,0.12)] border border-[rgba(0,198,255,0.3)] flex items-center justify-center font-bold text-xs text-[#00C6FF] shrink-0">
                  ◎
                </div>
                <div>
                  <div className="font-bold text-[13.5px] text-white">Walkover Co-working Space</div>
                  <div className="font-medium text-xs text-[#7C8CAD]">Indore, India</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3.5 mt-9 flex-wrap">
              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-[#007BFF] hover:bg-[#0069DB] text-white font-bold text-sm px-[26px] py-[15px] rounded-[9px] shadow-[0_8px_24px_rgba(0,123,255,0.35)] transition-colors"
              >
                Register Your Interest →
              </a>
              <a 
                href="#agenda" 
                className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.18)] text-white font-bold text-sm px-[26px] py-[15px] rounded-[9px] transition-colors"
              >
                Download Brochure ↓
              </a>
            </div>
          </div>

          <div className="relative h-[340px] sm:h-[380px] flex items-center justify-center mt-6 lg:mt-0">
            <svg width="100%" height="100%" viewBox="0 0 400 380" className="overflow-visible">
              <line x1="200" y1="80" x2="80" y2="180" stroke="rgba(0,198,255,0.35)" strokeWidth="1.5" />
              <line x1="200" y1="80" x2="320" y2="180" stroke="rgba(0,198,255,0.35)" strokeWidth="1.5" />
              <line x1="200" y1="80" x2="140" y2="300" stroke="rgba(0,198,255,0.25)" strokeWidth="1.5" />
              <line x1="200" y1="80" x2="260" y2="300" stroke="rgba(0,198,255,0.25)" strokeWidth="1.5" />
              <line x1="80" y1="180" x2="140" y2="300" stroke="rgba(0,198,255,0.18)" strokeWidth="1.5" />
              <line x1="320" y1="180" x2="260" y2="300" stroke="rgba(0,198,255,0.18)" strokeWidth="1.5" />
              <circle cx="200" cy="80" r="10" fill="#00C6FF" style={{ animation: "ef-pulse 2.6s ease-in-out infinite" }} />
              <circle cx="80" cy="180" r="7" fill="#007BFF" style={{ animation: "ef-pulse 2.6s ease-in-out infinite 0.3s" }} />
              <circle cx="320" cy="180" r="7" fill="#007BFF" style={{ animation: "ef-pulse 2.6s ease-in-out infinite 0.6s" }} />
              <circle cx="140" cy="300" r="6" fill="#00E6FF" style={{ animation: "ef-pulse 2.6s ease-in-out infinite 0.9s" }} />
              <circle cx="260" cy="300" r="6" fill="#00E6FF" style={{ animation: "ef-pulse 2.6s ease-in-out infinite 1.2s" }} />
            </svg>
            <div className="absolute top-[30px] right-[10px] flex items-center gap-2 font-semibold text-[11.5px] text-[#C7D6EE]">
              <div className="w-2 h-2 rounded-[2px] bg-[#00C6FF]" /> AI Agents
            </div>
            <div className="absolute top-[150px] left-[-10px] flex items-center gap-2 font-semibold text-[11.5px] text-[#C7D6EE]">
              <div className="w-2 h-2 rounded-[2px] bg-[#007BFF]" /> Enterprise AI
            </div>
            <div className="absolute top-[150px] right-[-30px] flex items-center gap-2 font-semibold text-[11.5px] text-[#C7D6EE]">
              <div className="w-2 h-2 rounded-[2px] bg-[#007BFF]" /> AI-Assisted Dev
            </div>
            <div className="absolute bottom-[20px] left-[60px] flex items-center gap-2 font-semibold text-[11.5px] text-[#C7D6EE]">
              <div className="w-2 h-2 rounded-[2px] bg-[#00E6FF]" /> Responsible AI
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="relative max-w-[1240px] mx-auto mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[rgba(255,255,255,0.08)] rounded-[14px] overflow-hidden border border-[rgba(255,255,255,0.08)]">
          {heroHighlights.map((h, i) => (
            <div key={i} className="bg-[#0A1327] p-5 px-[22px] flex items-center gap-3">
              <div className="w-[34px] h-[34px] rounded-lg bg-[rgba(0,198,255,0.12)] flex items-center justify-center font-bold text-[11px] text-[#00C6FF] shrink-0">
                {h.tag}
              </div>
              <div>
                <div className="font-bold text-[13px] text-white leading-snug">{h.title}</div>
                <div className="font-medium text-[11.5px] text-[#7C8CAD] leading-snug mt-0.5">{h.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 2. EVENT AGENDA ─── */}
      <div id="agenda" className="max-w-[1120px] mx-auto pt-22 pb-5 px-6 sm:px-10">
        <div className="text-center max-w-[680px] mx-auto mb-13">
          <div className="font-bold text-xs tracking-[0.1em] text-[#007BFF] uppercase">Event Agenda</div>
          <h2 className="font-extrabold text-[30px] sm:text-[36px] leading-[1.2] text-[#0B1220] mt-3">
            A Day of Ideas, Insights &amp; Impact
          </h2>
          <p className="font-medium text-[15px] leading-[1.6] text-[#5B6B85] mt-3.5">
            Curated sessions by industry experts to help you understand where AI is heading and how engineers can build, ship and grow in the age of intelligent systems.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Agenda Item 1 */}
          <div className="flex flex-col md:flex-row gap-5.5 items-start bg-white border border-[#E7ECF3] rounded-[14px] p-5.5 sm:px-6">
            <div className="w-full md:w-[118px] shrink-0 flex md:flex-col justify-between md:justify-start">
              <div className="font-bold text-sm text-[#0B1220]">10:00 AM</div>
              <div className="font-medium text-xs text-[#8A97AC]">15 mins</div>
            </div>
            <div className="flex-1">
              <span className="inline-block font-bold text-[10.5px] tracking-[0.06em] text-[#007BFF] bg-[#E8F2FF] px-2.5 py-[3px] rounded-[5px] uppercase">
                Opening
              </span>
              <div className="font-bold text-[17px] text-[#0B1220] mt-2.5">Welcome &amp; Opening Keynote</div>
              <div className="font-medium text-[13.5px] leading-[1.6] text-[#5B6B85] mt-1.5 max-w-[560px]">
                Setting the stage for AI Frontier 2026 — why this event exists, why AI engineering matters, and what&apos;s ahead.
              </div>
            </div>
            <div className="flex items-center gap-2.5 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#EEF1F6] w-full md:w-auto">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#007BFF] to-[#00C6FF] flex items-center justify-center font-bold text-[13px] text-white">
                SS
              </div>
              <div>
                <div className="font-bold text-[12.5px] text-[#0B1220]">Sanjay Singh</div>
                <div className="font-medium text-[11px] text-[#8A97AC]">Co-founder, Botmartz</div>
              </div>
            </div>
          </div>

          {/* Agenda Item 2 */}
          <div className="flex flex-col md:flex-row gap-5.5 items-start bg-white border border-[#E7ECF3] rounded-[14px] p-5.5 sm:px-6">
            <div className="w-full md:w-[118px] shrink-0 flex md:flex-col justify-between md:justify-start">
              <div className="font-bold text-sm text-[#0B1220]">10:15 AM</div>
              <div className="font-medium text-xs text-[#8A97AC]">60 mins</div>
            </div>
            <div className="flex-1">
              <span className="inline-block font-bold text-[10.5px] tracking-[0.06em] text-[#0E9F6E] bg-[#E4F8EF] px-2.5 py-[3px] rounded-[5px] uppercase">
                Session 1
              </span>
              <div className="font-bold text-[17px] text-[#0B1220] mt-2.5">Engineering Production AI Systems</div>
              <div className="font-medium text-[13.5px] leading-[1.6] text-[#5B6B85] mt-1.5 max-w-[560px]">
                Enterprise AI today, AI Agents, Enterprise RAG, LangGraph — and what &quot;production&quot; actually means. Architecture-level, with optional live demos.
              </div>
            </div>
            <div className="flex items-center gap-2.5 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#EEF1F6] w-full md:w-auto">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#007BFF] to-[#00C6FF] flex items-center justify-center font-bold text-[13px] text-white">
                KG
              </div>
              <div>
                <div className="font-bold text-[12.5px] text-[#0B1220]">Karan Goel</div>
                <div className="font-medium text-[11px] text-[#8A97AC]">AI Engineer, Botmartz</div>
              </div>
            </div>
          </div>

          {/* Agenda Item 3 (Flagship) */}
          <div className="bg-white border border-[#E7ECF3] rounded-[14px] p-5.5 sm:px-6">
            <div className="flex flex-col md:flex-row gap-5.5 items-start">
              <div className="w-full md:w-[118px] shrink-0 flex md:flex-col justify-between md:justify-start">
                <div className="font-bold text-sm text-[#0B1220]">11:15 AM</div>
                <div className="font-medium text-xs text-[#8A97AC]">120 mins</div>
              </div>
              <div className="flex-1">
                <span className="inline-block font-bold text-[10.5px] tracking-[0.06em] text-[#7C3AED] bg-[#F1EBFE] px-2.5 py-[3px] rounded-[5px] uppercase">
                  Session 2 · Flagship
                </span>
                <div className="font-bold text-[17px] text-[#0B1220] mt-2.5">
                  The State of AI Engineering — Where AI Is Going and How Engineers Stay Ahead
                </div>
                <div className="font-medium text-[13.5px] leading-[1.6] text-[#5B6B85] mt-1.5 max-w-[600px]">
                  Part 1: the AI shift — ML → GenAI, copilots → agents, models → systems. Part 2: evaluation, governance, AI-assisted development, open source, responsible AI. Part 3: career roadmap — hiring, research vs. industry, portfolios, and how AI jobs are changing.
                </div>
              </div>
              <div className="flex items-center gap-2.5 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#EEF1F6] w-full md:w-auto">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#007BFF] to-[#00C6FF] flex items-center justify-center font-bold text-[13px] text-white">
                  PB
                </div>
                <div>
                  <div className="font-bold text-[12.5px] text-[#0B1220]">Promit Basu</div>
                  <div className="font-medium text-[11px] text-[#8A97AC]">AI/ML Engineer, Goa, India</div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-dashed border-[#E7ECF3] flex items-center justify-between flex-wrap gap-2.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="inline-block font-bold text-[10.5px] tracking-[0.06em] text-[#7C3AED] bg-[#F1EBFE] px-2.5 py-[3px] rounded-[5px] uppercase">
                  Fireside Q&amp;A
                </span>
                <span className="font-medium text-[13px] text-[#5B6B85]">
                  20–30 min interactive Q&amp;A with Promit and the audience
                </span>
              </div>
              <span className="font-bold text-xs text-[#7C3AED] bg-[#F1EBFE] px-3 py-1.5 rounded-full">
                12:45 – 1:15 PM
              </span>
            </div>
          </div>

          {/* Agenda Item 4 (Panel) */}
          <div className="flex flex-col md:flex-row gap-5.5 items-start bg-white border border-[#E7ECF3] rounded-[14px] p-5.5 sm:px-6">
            <div className="w-full md:w-[118px] shrink-0 flex md:flex-col justify-between md:justify-start">
              <div className="font-bold text-sm text-[#0B1220]">1:15 PM</div>
              <div className="font-medium text-xs text-[#8A97AC]">75 mins</div>
            </div>
            <div className="flex-1">
              <span className="inline-block font-bold text-[10.5px] tracking-[0.06em] text-[#D97706] bg-[#FEF3E2] px-2.5 py-[3px] rounded-[5px] uppercase">
                Panel Discussion
              </span>
              <div className="font-bold text-[17px] text-[#0B1220] mt-2.5">Building an AI Engineering Career in 2026</div>
              <div className="font-medium text-[13.5px] leading-[1.6] text-[#5B6B85] mt-1.5 max-w-[600px]">
                Skills that matter, open source, GitHub portfolios, hiring trends, math depth, AI-assisted development, and the future of engineering careers.
              </div>
            </div>
            <div className="flex items-center shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#EEF1F6] w-full md:w-auto">
              <div className="w-9.5 h-9.5 rounded-full bg-gradient-to-br from-[#007BFF] to-[#00C6FF] border-2 border-white flex items-center justify-center font-bold text-[11px] text-white relative z-4">
                SS
              </div>
              <div className="w-9.5 h-9.5 rounded-full bg-gradient-to-br from-[#007BFF] to-[#00C6FF] border-2 border-white flex items-center justify-center font-bold text-[11px] text-white -ml-2.5 z-3">
                KG
              </div>
              <div className="w-9.5 h-9.5 rounded-full bg-gradient-to-br from-[#007BFF] to-[#00C6FF] border-2 border-white flex items-center justify-center font-bold text-[11px] text-white -ml-2.5 z-2">
                PB
              </div>
              <div className="w-9.5 h-9.5 rounded-full bg-[#EDF1F7] border-2 border-white flex items-center justify-center font-bold text-[11px] text-[#5B6B85] -ml-2.5 z-1">
                +1
              </div>
            </div>
          </div>

          {/* Agenda Item 5 */}
          <div className="flex flex-col md:flex-row gap-5.5 items-start bg-white border border-[#E7ECF3] rounded-[14px] p-5.5 sm:px-6">
            <div className="w-full md:w-[118px] shrink-0 flex md:flex-col justify-between md:justify-start">
              <div className="font-bold text-sm text-[#0B1220]">2:30 PM</div>
              <div className="font-medium text-xs text-[#8A97AC]">15 mins</div>
            </div>
            <div className="flex-1">
              <span className="inline-block font-bold text-[10.5px] tracking-[0.06em] text-[#0B1220] bg-[#EDF1F7] px-2.5 py-[3px] rounded-[5px] uppercase">
                Closing
              </span>
              <div className="font-bold text-[17px] text-[#0B1220] mt-2.5">Closing &amp; Community Launch</div>
              <div className="font-medium text-[13.5px] leading-[1.6] text-[#5B6B85] mt-1.5 max-w-[560px]">
                Launch of the Botmartz AI Engineering Community, what&apos;s next, and how to stay involved.
              </div>
            </div>
            <div className="flex items-center gap-2.5 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#EEF1F6] w-full md:w-auto">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#007BFF] to-[#00C6FF] flex items-center justify-center font-bold text-[13px] text-white">
                SS
              </div>
              <div>
                <div className="font-bold text-[12.5px] text-[#0B1220]">Sanjay Singh</div>
                <div className="font-medium text-[11px] text-[#8A97AC]">Co-founder, Botmartz</div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center font-medium text-xs text-[#9AA6BA] mt-4.5">
          * Agenda timings are subject to change.
        </p>
      </div>

      {/* ─── 3. TAKEAWAYS & ATTENDEES ─── */}
      <div className="max-w-[1120px] mx-auto py-14 px-6 sm:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Exclusive Takeaway Card */}
        <div className="bg-[#0A1327] rounded-2xl p-7 flex flex-col justify-between gap-6 shadow-sm">
          <div>
            <span className="inline-block font-bold text-[10.5px] tracking-[0.06em] text-[#00C6FF] bg-[rgba(0,198,255,0.12)] px-2.5 py-1 rounded-[5px] uppercase w-fit">
              Exclusive Takeaway
            </span>
            <div className="flex gap-4 items-start mt-4">
              <div className="w-16 h-22 shrink-0 bg-gradient-to-br from-[#0F1E3D] to-[#060C1F] border border-[rgba(0,198,255,0.3)] rounded-[6px] shadow-[3px_3px_0_rgba(0,123,255,0.3)] flex items-center justify-center p-1.5">
                <span className="font-bold text-[8px] leading-[1.3] text-[#00C6FF] text-center">
                  AI ENGINEERING ROADMAP 2026
                </span>
              </div>
              <div>
                <div className="font-bold text-base text-white">AI Engineering Roadmap 2026</div>
                <p className="font-medium text-[12.5px] leading-[1.6] text-[#8FA3C4] mt-2">
                  A 30–50 page handbook covering the AI engineering landscape, learning paths, tool recommendations, and career advice from our speakers.
                </p>
              </div>
            </div>
          </div>
          <a href="/contact" className="font-bold text-[12.5px] text-[#00C6FF] hover:underline flex items-center gap-1.5">
            View Handbook Overview →
          </a>
        </div>

        {/* Who Should Attend Card */}
        <div className="bg-white border border-[#E7ECF3] rounded-2xl p-7 shadow-sm">
          <div className="font-bold text-xs tracking-[0.06em] text-[#007BFF] uppercase">Who Should Attend</div>
          <div className="flex flex-col gap-4 mt-4">
            {whoAttend.map((w, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-7.5 h-7.5 shrink-0 rounded-[7px] bg-[#E8F2FF] flex items-center justify-center font-bold text-[10px] text-[#007BFF]">
                  {w.tag}
                </div>
                <div>
                  <div className="font-bold text-[13px] text-[#0B1220] leading-snug">{w.title}</div>
                  <div className="font-medium text-xs text-[#8A97AC] leading-snug mt-0.5">{w.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What You'll Take Home Card */}
        <div className="bg-white border border-[#E7ECF3] rounded-2xl p-7 flex flex-col justify-between shadow-sm">
          <div>
            <div className="font-bold text-xs tracking-[0.06em] text-[#007BFF] uppercase">What You&apos;ll Take Home</div>
            <div className="flex flex-col gap-3 mt-4">
              {takeHome.map((t, i) => (
                <div key={i} className="flex gap-2.5 items-start">
                  <div className="w-4.5 h-4.5 shrink-0 rounded-full bg-[#E4F8EF] flex items-center justify-center font-bold text-[10px] text-[#0E9F6E] mt-[1px]">
                    ✓
                  </div>
                  <div className="font-semibold text-[13px] leading-[1.4] text-[#3A4459]">{t}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5.5 pt-5 border-t border-[#EEF1F6]">
            <div className="font-bold text-[11px] text-[#0B1220]">Stay in the Loop</div>
            <form onSubmit={handleSubscribe} className="flex gap-2 mt-2.5">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 border border-[#E2E8F0] focus:border-[#007BFF] rounded-lg px-3 py-2.5 font-medium text-[12.5px] text-[#0B1220] outline-none placeholder:text-[#8B97AC] transition-colors"
              />
              <button 
                type="submit" 
                className="bg-[#007BFF] hover:bg-[#0069DB] text-white border-none rounded-lg px-4 py-2.5 font-bold text-[12.5px] cursor-pointer shrink-0 transition-colors"
              >
                {subscribed ? "Subscribed ✓" : "Subscribe"}
              </button>
            </form>
            <div className="font-medium text-[10.5px] text-[#9AA6BA] mt-1.5">No spam. Unsubscribe anytime.</div>
          </div>
        </div>
      </div>

      {/* ─── 4. ENTERPRISE ROUNDTABLE ─── */}
      <div className="max-w-[1120px] mx-auto py-6 px-6 sm:px-10 pb-14">
        <div className="bg-gradient-to-r from-[#0A1327] to-[#060C1F] rounded-[18px] p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 items-center relative overflow-hidden shadow-md">
          <div className="absolute w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,rgba(0,198,255,0.18),transparent_70%)] -right-[60px] -top-[80px] pointer-events-none" />
          <div className="relative">
            <span className="inline-block font-bold text-[10.5px] tracking-[0.06em] text-[#00C6FF] bg-[rgba(0,198,255,0.12)] px-2.5 py-1 rounded-[5px] uppercase">
              By Invitation
            </span>
            <div className="font-extrabold text-2xl leading-[1.3] text-white mt-3.5">Enterprise Roundtable</div>
            <p className="font-medium text-[13.5px] leading-[1.7] text-[#8FA3C4] mt-3 max-w-[480px]">
              A closed-door session immediately following AI Frontier — founders, CTOs and engineering managers only. No students, no pitches: an honest conversation on adopting AI engineering inside real organizations.
            </p>
          </div>
          <div className="relative flex gap-3.5 justify-start lg:justify-end flex-wrap">
            <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl p-4 sm:px-5 text-center min-w-[96px]">
              <div className="font-extrabold text-[22px] text-[#00C6FF]">10</div>
              <div className="font-semibold text-[11px] text-[#8FA3C4]">Founders</div>
            </div>
            <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl p-4 sm:px-5 text-center min-w-[96px]">
              <div className="font-extrabold text-[22px] text-[#00C6FF]">5</div>
              <div className="font-semibold text-[11px] text-[#8FA3C4]">CTOs</div>
            </div>
            <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl p-4 sm:px-5 text-center min-w-[96px]">
              <div className="font-extrabold text-[22px] text-[#00C6FF]">3</div>
              <div className="font-semibold text-[11px] text-[#8FA3C4]">Eng Managers</div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 5. CONTENT MULTIPLICATION ─── */}
      <div className="max-w-[1120px] mx-auto py-6 px-6 sm:px-10 pb-16">
        <div className="text-center max-w-[640px] mx-auto mb-10">
          <div className="font-bold text-xs tracking-[0.1em] text-[#007BFF] uppercase">One Day, Months of Reach</div>
          <h2 className="font-extrabold text-[28px] sm:text-[30px] leading-[1.25] text-[#0B1220] mt-3">
            Every Session Becomes Lasting Content
          </h2>
          <p className="font-medium text-sm leading-[1.6] text-[#5B6B85] mt-3.5">
            Each session is cut into a multi-format content pipeline that keeps AI Frontier working long after the day ends.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
          {contentMultiplication.map((c, i) => (
            <div key={i} className="bg-white border border-[#E7ECF3] rounded-xl p-4.5 flex flex-col gap-2.5 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-[#E8F2FF] flex items-center justify-center font-bold text-[10px] text-[#007BFF]">
                {c.tag}
              </div>
              <div className="font-bold text-[12.5px] leading-[1.4] text-[#0B1220]">{c.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 6. WHAT'S NEXT (COMMUNITY LAUNCH) ─── */}
      <div className="bg-[#060C1F] py-18 px-6 sm:px-10 relative overflow-hidden">
        <div className="absolute w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(0,123,255,0.2),transparent_70%)] -left-[100px] -bottom-[140px] pointer-events-none" />
        <div className="max-w-[1120px] mx-auto relative grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <span className="inline-block font-bold text-[10.5px] tracking-[0.06em] text-[#00C6FF] bg-[rgba(0,198,255,0.12)] px-2.5 py-1 rounded-[5px] uppercase">
              What&apos;s Next
            </span>
            <div className="font-extrabold text-[28px] sm:text-[30px] leading-[1.3] text-white mt-3.5">
              The Botmartz AI Engineering Community Launches Here
            </div>
            <p className="font-medium text-sm leading-[1.7] text-[#8FA3C4] mt-3.5 max-w-[520px]">
              AI Frontier is day one of an ecosystem — monthly meetups, a Discord, an open-source GitHub org, a reading club, and hackathons. Be there when it launches.
            </p>
            <div className="flex gap-2.5 flex-wrap mt-5.5">
              <span className="font-semibold text-xs text-[#C7D6EE] bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)] px-3 py-1.5 rounded-full">
                Meetups
              </span>
              <span className="font-semibold text-xs text-[#C7D6EE] bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)] px-3 py-1.5 rounded-full">
                Discord
              </span>
              <span className="font-semibold text-xs text-[#C7D6EE] bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)] px-3 py-1.5 rounded-full">
                GitHub Org
              </span>
              <span className="font-semibold text-xs text-[#C7D6EE] bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)] px-3 py-1.5 rounded-full">
                Reading Club
              </span>
              <span className="font-semibold text-xs text-[#C7D6EE] bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)] px-3 py-1.5 rounded-full">
                Hackathons
              </span>
            </div>
          </div>

          <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 sm:p-6.5 shadow-lg">
            <div className="font-bold text-[13px] text-white">Get early access to the community</div>
            <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-2 mt-3.5">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                className="flex-1 min-w-0 border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.03)] focus:border-[#00C6FF] rounded-lg px-3.5 py-3 font-medium text-[13px] text-white outline-none placeholder:text-[#8B97AC] transition-colors"
              />
              <button 
                type="submit" 
                className="bg-[#007BFF] hover:bg-[#0069DB] text-white border-none rounded-lg px-4.5 py-3 font-bold text-[13px] cursor-pointer shrink-0 transition-colors"
              >
                {notified ? "Notified ✓" : "Notify Me"}
              </button>
            </form>
            <div className="font-medium text-[11px] text-[#7C8CAD] mt-2">No spam. Unsubscribe anytime.</div>
          </div>
        </div>
      </div>

      {/* ─── 7. WHY FRONTIER PILLARS ─── */}
      <div className="max-w-[1120px] mx-auto py-12 px-6 sm:px-10 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {whyFrontier.map((f, i) => (
            <div key={i} className="flex flex-col gap-2.5 bg-white sm:bg-transparent p-5 sm:p-0 rounded-xl sm:rounded-none border sm:border-none border-[#E7ECF3]">
              <div className="w-9 h-9 rounded-[9px] bg-[#E8F2FF] flex items-center justify-center font-bold text-[11px] text-[#007BFF]">
                {f.tag}
              </div>
              <div className="font-bold text-[13.5px] text-[#0B1220] mt-1">{f.title}</div>
              <div className="font-medium text-xs leading-[1.5] text-[#8A97AC]">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
