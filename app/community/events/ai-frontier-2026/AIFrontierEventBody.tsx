"use client";

import React, { useState } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

import RegisterButton from "../[slug]/RegisterButton";

export default function AIFrontierEventBody({ event }: { event?: any }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notified, setNotified] = useState(false);

  const activeEvent = {
    id: event?.id || "ai-frontier-2026",
    title: event?.title || "AI Frontier 2026 — The Future of AI Engineering",
    slug: event?.slug || "ai-frontier-2026",
    entryFee: (event?.entryFee !== undefined && event?.entryFee !== null) ? Number(event.entryFee) : 100,
    date: event?.date || "May 24–25, 2026",
    location: event?.location || "The Leela Palace, Bangalore"
  };

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
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ef-pulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.85; }
        }
        @keyframes ef-drift {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
      `}} />

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
                  <div className="font-bold text-[13.5px] text-white flex items-center gap-2">
                    <img src="/Walkoversvg (1)(1).png" alt="Walkover" className="h-[14px] object-contain brightness-0 invert opacity-90" />
                  </div>
                  <div className="font-medium text-xs text-[#7C8CAD]">Venue Partner · Indore, India</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3.5 mt-9 flex-wrap items-center">
              <RegisterButton event={activeEvent} />
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

      {/* ─── 2. FOUR PILLARS & GOLDEN THREAD AGENDA ─── */}
      <div id="agenda" className="max-w-[1120px] mx-auto pt-20 pb-10 px-6 sm:px-10">
        
        {/* Four Pillars */}
        <div className="bg-white border border-[#E7ECF3] rounded-[18px] p-6 sm:p-8 mb-14 shadow-sm">
          <div className="font-bold text-xs tracking-[0.12em] text-[#007BFF] uppercase mb-2">Four Pillars, One Lifecycle</div>
          <div className="flex flex-wrap gap-2.5 my-4">
            <span className="font-bold text-[13.5px] px-4 py-2 rounded-full border-2 border-[#0B1220] text-[#0B1220] bg-transparent">
              Agents
            </span>
            <span className="font-bold text-[13.5px] px-4 py-2 rounded-full border-2 border-[#007BFF] text-white bg-[#007BFF] shadow-sm">
              Enterprise AI
            </span>
            <span className="font-bold text-[13.5px] px-4 py-2 rounded-full border-2 border-[#0B1220] text-[#0B1220] bg-transparent">
              AI-assisted development
            </span>
            <span className="font-bold text-[13.5px] px-4 py-2 rounded-full border-2 border-[#0B1220] text-[#0B1220] bg-transparent">
              Responsible AI
            </span>
          </div>
          <p className="font-medium text-[14px] leading-[1.6] text-[#5B6B85] mt-3">
            These aren&apos;t four separate tracks. They surface at the moments in the lifecycle where they matter — <b className="text-[#0B1220]">and the golden thread below runs through all of them.</b>
          </p>
        </div>

        {/* Golden Thread Header */}
        <div className="text-center max-w-[720px] mx-auto mb-14">
          <div className="font-bold text-xs tracking-[0.14em] text-[#D97706] uppercase">The Golden Thread</div>
          <h2 className="font-extrabold text-[30px] sm:text-[38px] leading-[1.18] text-[#0B1220] mt-3">
            The Run of Show Is a Story
          </h2>
          <p className="font-medium text-[15.5px] leading-[1.65] text-[#5B6B85] mt-3.5">
            Every session below sits on the thread and answers one step of the journey. The breaks sit off it. Follow the golden line from the first LLM call to a system running reliably in production.
          </p>
        </div>

        {/* The Golden Thread Journey Timeline */}
        <div className="relative pl-6 sm:pl-12 border-l-3 border-gradient-to-b from-[#00C6FF] via-[#007BFF] to-[#D97706] space-y-7 my-6" style={{ borderColor: '#007BFF' }}>
          
          {/* Registration Interlude */}
          <div className="relative flex items-center gap-3.5 p-4 sm:px-5 border border-dashed border-[#C7CED6] rounded-xl bg-white/60 text-[#5B6B85] text-[13px] sm:text-[13.5px]">
            <div className="absolute -left-[31px] sm:-left-[55px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#8A97AC]" />
            <span className="font-mono font-bold text-[#0B1220] shrink-0">09:30–10:00 AM</span>
            <span className="font-medium">
              <b className="text-[#0B1220]">Registration &amp; Networking</b> — live agent demos, sponsor booths, workshop repo QR, community sign-up &amp; leaderboard
            </span>
          </div>

          {/* Beat 0: Anchoring */}
          <div className="relative pt-1">
            <div className="absolute -left-[31px] sm:-left-[55px] top-3 w-4 h-4 rounded-full bg-[#EC4899] ring-4 ring-[#FCE7F3]" />
            <div className="flex items-baseline gap-3 flex-wrap mb-2.5">
              <span className="font-mono font-bold text-xs sm:text-[13px] text-[#8A97AC]">10:00–10:15 AM · 15 mins</span>
              <span className="font-bold italic text-[16px] text-[#EC4899]">&quot;Welcome to AI Frontier 2026&quot;</span>
            </div>
            <div className="bg-white border border-[#E7ECF3] rounded-[14px] p-6 shadow-sm hover:border-[#EC4899]/40 transition-all">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <span className="font-mono font-bold text-[11px] tracking-[0.1em] text-[#8A97AC] uppercase">Anchoring &amp; Kickoff</span>
                <span className="font-bold text-[11px] text-[#EC4899] bg-[#FCE7F3] px-2.5 py-1 rounded-full">Vaidehi &amp; Yash · Event Anchors</span>
              </div>
              <h3 className="font-extrabold text-[20px] sm:text-[22px] text-[#0B1220] mt-2">Setting the Stage</h3>
              <p className="font-medium text-[14px] text-[#3A4459] mt-2 leading-[1.6]">
                Kickoff the event, coordinate the crowd, set the energy, and prepare the audience for the golden thread journey of AI engineering.
              </p>
            </div>
          </div>

          {/* Beat 1: Welcome (Soham - 15 mins) */}
          <div className="relative pt-1">
            <div className="absolute -left-[31px] sm:-left-[55px] top-3 w-4 h-4 rounded-full bg-[#007BFF] ring-4 ring-[#E8F2FF]" />
            <div className="flex items-baseline gap-3 flex-wrap mb-2.5">
              <span className="font-mono font-bold text-xs sm:text-[13px] text-[#8A97AC]">10:15–10:30 AM · 15 mins</span>
              <span className="font-bold italic text-[16px] text-[#007BFF]">&quot;Why does AI engineering matter?&quot;</span>
            </div>
            <div className="bg-white border border-[#E7ECF3] rounded-[14px] p-6 shadow-sm hover:border-[#007BFF]/40 transition-all">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <span className="font-mono font-bold text-[11px] tracking-[0.1em] text-[#8A97AC] uppercase">Welcome</span>
                <span className="font-bold text-[11px] text-[#007BFF] bg-[#E8F2FF] px-2.5 py-1 rounded-full inline-flex items-center gap-1.5"><img src="/Sohamsharma.jpeg" alt="Soham Sharma" className="w-4 h-4 rounded-full object-cover" /> Soham Sharma · Principal AI Architect</span>
              </div>
              <h3 className="font-extrabold text-[20px] sm:text-[22px] text-[#0B1220] mt-2">Set the Frame</h3>
              <p className="font-medium text-[14px] text-[#3A4459] mt-2 leading-[1.6]">
                Not AI tools. Not prompting. Not ChatGPT — <b className="text-[#0B1220]">engineering</b>. Name the journey the room is about to walk, so every session that follows has a place to land.
              </p>
            </div>
          </div>

          {/* Beat 2: Keynote (Promit - 75 mins) */}
          <div className="relative pt-1">
            <div className="absolute -left-[31px] sm:-left-[55px] top-3 w-4 h-4 rounded-full bg-[#7C3AED] ring-4 ring-[#F1EBFE]" />
            <div className="flex items-baseline gap-3 flex-wrap mb-2.5">
              <span className="font-mono font-bold text-xs sm:text-[13px] text-[#8A97AC]">10:30–11:45 AM · 75 mins</span>
              <span className="font-bold italic text-[16px] text-[#7C3AED]">&quot;Where is AI heading?&quot;</span>
            </div>
            <div className="bg-white border-2 border-[#7C3AED]/30 rounded-[16px] p-6 sm:p-7 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-[#7C3AED]/15 to-transparent w-40 h-full pointer-events-none" />
              <div className="flex justify-between items-start flex-wrap gap-2">
                <span className="font-mono font-bold text-[11px] tracking-[0.1em] text-[#7C3AED] uppercase">Keynote · Flagship Deep Dive</span>
                <span className="font-bold text-[11px] text-[#7C3AED] bg-[#F1EBFE] px-3 py-1 rounded-full">Dr. Promit Ray · Chief AI Scientist</span>
              </div>
              <h3 className="font-extrabold text-[22px] sm:text-[24px] text-[#0B1220] mt-2.5">Think Like an AI Engineer</h3>
              <p className="font-medium text-[14.5px] text-[#3A4459] mt-2.5 leading-[1.65]">
                The honest, rigorous picture of where the field is — and where it&apos;s going. We dive deep into foundation models, reasoning architectures, inference economics, agents, evaluation harnesses, and governance. Ends on the hook for the whole day: <i className="font-bold text-[#0B1220]">&quot;today, we&apos;ll build one.&quot;</i>
              </p>
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#EEF1F6]">
                {["Foundation models", "Reasoning models", "Inference economics", "Agents", "Evals", "Governance", "Coding agents"].map((tag, i) => (
                  <span key={i} className="font-mono font-medium text-[11px] text-[#4C1D95] bg-[#F3E8FF] border border-[#E9D5FF] px-2.5 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tea Break Interlude */}
          <div className="relative flex items-center gap-3.5 p-4 sm:px-5 border border-dashed border-[#C7CED6] rounded-xl bg-white/60 text-[#5B6B85] text-[13px] sm:text-[13.5px]">
            <div className="absolute -left-[31px] sm:-left-[55px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#8A97AC]" />
            <span className="font-mono font-bold text-[#0B1220] shrink-0">11:45–12:00 PM</span>
            <span className="font-medium">
              <b className="text-[#0B1220]">Tea Break &amp; Quick Refresh</b> — recharge before our hands-on workshop sprint.
            </span>
          </div>

          {/* Beat 3: Workshop Part 1 (Harsh Sahu - 60 mins) */}
          <div className="relative pt-1">
            <div className="absolute -left-[31px] sm:-left-[55px] top-3 w-4 h-4 rounded-full bg-[#D97706] ring-4 ring-[#FEF3E2]" />
            <div className="flex items-baseline gap-3 flex-wrap mb-2.5">
              <span className="font-mono font-bold text-xs sm:text-[13px] text-[#8A97AC]">12:00–01:00 PM · 60 mins</span>
              <span className="font-bold italic text-[16px] text-[#D97706]">&quot;How do I build a RAG agent right now?&quot;</span>
            </div>
            <div className="bg-white border border-[#E7ECF3] rounded-[14px] p-6 shadow-sm hover:border-[#D97706]/40 transition-all">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <span className="font-mono font-bold text-[11px] tracking-[0.1em] text-[#8A97AC] uppercase">Hands-on Workshop · Part 1</span>
                <span className="font-bold text-[11px] text-[#D97706] bg-[#FEF3E2] px-2.5 py-1 rounded-full inline-flex items-center gap-1.5"><img src="/harsh_sahu.jpeg" alt="Harsh Sahu" className="w-4 h-4 rounded-full object-cover" /> Harsh Sahu (GTWY AI)</span>
              </div>
              <h3 className="font-extrabold text-[20px] sm:text-[22px] text-[#0B1220] mt-2">Build Your First AI Agent: EdTech Case Study</h3>
              <p className="font-medium text-[14px] text-[#3A4459] mt-2 leading-[1.6]">
                Not &quot;drag nodes in a builder.&quot; We write real code to assemble an orchestration pipeline. We&apos;ll build a highly relevant <b className="text-[#0B1220]">EdTech Intelligent Tutor Agent</b> that uses RAG (Retrieval-Augmented Generation) to search through a vector database of curriculum documents, answer student queries, and utilize tools for math evaluation and progress tracking.
              </p>
              <div className="flex flex-wrap gap-2 mt-4 pt-3.5 border-t border-[#EEF1F6]">
                {["EdTech Case Study", "Retrieval-Augmented Generation", "Tool Calling", "Vector DB", "Agentic Loop"].map((tag, i) => (
                  <span key={i} className="font-mono text-[11px] bg-[#F8FAFC] text-[#3A4459] border border-[#E2E8F0] px-2.5 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Lunch Interlude */}
          <div className="relative flex items-center gap-3.5 p-4 sm:px-5 border border-dashed border-[#C7CED6] rounded-xl bg-white/60 text-[#5B6B85] text-[13px] sm:text-[13.5px]">
            <div className="absolute -left-[31px] sm:-left-[55px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#8A97AC]" />
            <span className="font-mono font-bold text-[#0B1220] shrink-0">01:00–02:00 PM</span>
            <span className="font-medium">
              <b className="text-[#0B1220]">Lunch &amp; Networking Break</b> — connect with fellow builders and discuss morning insights.
            </span>
          </div>

          {/* Beat 4: Workshop Part 2 (Harsh Sahu - 60 mins) */}
          <div className="relative pt-1">
            <div className="absolute -left-[31px] sm:-left-[55px] top-3 w-4 h-4 rounded-full bg-[#D97706] ring-4 ring-[#FEF3E2]" />
            <div className="flex items-baseline gap-3 flex-wrap mb-2.5">
              <span className="font-mono font-bold text-xs sm:text-[13px] text-[#8A97AC]">02:00–03:00 PM · 60 mins</span>
              <span className="font-bold italic text-[16px] text-[#D97706]">&quot;How do I evaluate and deploy it?&quot;</span>
            </div>
            <div className="bg-white border border-[#E7ECF3] rounded-[14px] p-6 shadow-sm hover:border-[#D97706]/40 transition-all">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <span className="font-mono font-bold text-[11px] tracking-[0.1em] text-[#8A97AC] uppercase">Hands-on Workshop · Part 2</span>
                <span className="font-bold text-[11px] text-[#D97706] bg-[#FEF3E2] px-2.5 py-1 rounded-full inline-flex items-center gap-1.5"><img src="/harsh_sahu.jpeg" alt="Harsh Sahu" className="w-4 h-4 rounded-full object-cover" /> Harsh Sahu (GTWY AI)</span>
              </div>
              <h3 className="font-extrabold text-[20px] sm:text-[22px] text-[#0B1220] mt-2">Evaluation, Memory &amp; Production deployment</h3>
              <p className="font-medium text-[14px] text-[#3A4459] mt-2 leading-[1.6]">
                Expanding our EdTech RAG Agent. We add multi-step memory, guardrails, and rig up automated evaluation harnesses to measure hallucination rates. Everyone leaves with an evaluated agent running in a repository they own.
              </p>
              <div className="flex flex-wrap gap-2 mt-4 pt-3.5 border-t border-[#EEF1F6]">
                {["Memory", "Evaluation harness", "Golden datasets", "Guardrails", "Deployment endpoint"].map((tag, i) => (
                  <span key={i} className="font-mono text-[11px] bg-[#F8FAFC] text-[#3A4459] border border-[#E2E8F0] px-2.5 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Beat 5: AI Engineering Journey (Soham - 25 mins) */}
          <div className="relative pt-1">
            <div className="absolute -left-[31px] sm:-left-[55px] top-3 w-4 h-4 rounded-full bg-[#0E9F6E] ring-4 ring-[#E4F8EF]" />
            <div className="flex items-baseline gap-3 flex-wrap mb-2.5">
              <span className="font-mono font-bold text-xs sm:text-[13px] text-[#8A97AC]">03:00–03:25 PM · 25 mins</span>
              <span className="font-bold italic text-[16px] text-[#0E9F6E]">&quot;Where is AI engineering going next &amp; the roadmap we leave with?&quot;</span>
            </div>
            <div className="bg-white border border-[#E7ECF3] rounded-[14px] p-6 shadow-sm hover:border-[#0E9F6E]/40 transition-all">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <span className="font-mono font-bold text-[11px] tracking-[0.1em] text-[#8A97AC] uppercase">Talk &amp; Community Launch</span>
                <span className="font-bold text-[11px] text-[#0E9F6E] bg-[#E4F8EF] px-2.5 py-1 rounded-full inline-flex items-center gap-1.5"><img src="/Sohamsharma.jpeg" alt="Soham Sharma" className="w-4 h-4 rounded-full object-cover" /> Soham Sharma</span>
              </div>
              <h3 className="font-extrabold text-[20px] sm:text-[22px] text-[#0B1220] mt-2">Building Your AI Engineering Journey</h3>
              <p className="font-medium text-[14px] text-[#3A4459] mt-2 leading-[1.6]">
                What companies actually expect, and the roadmap from where you are to where you want to be. The forward-looking close answering what comes next, leading into the launch of the Botmartz AI Engineering Community.
              </p>
              <div className="flex flex-wrap gap-2 mt-4 pt-3.5 border-t border-[#EEF1F6]">
                {["AI Builder \u2192 AI Engineer", "Production mindset", "Community Launch", "The Playbook"].map((tag, i) => (
                  <span key={i} className="font-mono text-[11px] bg-[#F8FAFC] text-[#3A4459] border border-[#E2E8F0] px-2.5 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Beat 6: AMA & Networking (35 mins) */}
          <div className="relative pt-1">
            <div className="absolute -left-[31px] sm:-left-[55px] top-3 w-4 h-4 rounded-full bg-[#0B1220] ring-4 ring-[#EEF1F6]" />
            <div className="flex items-baseline gap-3 flex-wrap mb-2.5">
              <span className="font-mono font-bold text-xs sm:text-[13px] text-[#8A97AC]">03:25–04:00 PM · 35 mins</span>
              <span className="font-bold italic text-[16px] text-[#0B1220]">&quot;Let's talk about what you're building.&quot;</span>
            </div>
            <div className="bg-white border border-[#E7ECF3] rounded-[14px] p-6 shadow-sm">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <span className="font-mono font-bold text-[11px] tracking-[0.1em] text-[#8A97AC] uppercase">Open Floor</span>
                <span className="font-bold text-[11px] text-[#0B1220] bg-[#EDF1F7] px-2.5 py-1 rounded-full">All Speakers</span>
              </div>
              <h3 className="font-extrabold text-[20px] sm:text-[22px] text-[#0B1220] mt-2">Open AMA, Networking &amp; Community Onboarding</h3>
              <p className="font-medium text-[14px] text-[#3A4459] mt-2 leading-[1.6]">
                The most valuable thirty-five minutes of the day, and the least structured. Ask anything, show what you built, talk to sponsors, and get onboarded into the community.
              </p>
            </div>
          </div>

          {/* Wrap Up */}
          <div className="relative flex items-center gap-3.5 p-4 sm:px-5 border border-solid border-[#007BFF]/40 rounded-xl bg-[#E8F2FF]/60 text-[#0B1220] text-[13px] sm:text-[14px] shadow-sm">
            <div className="absolute -left-[31px] sm:-left-[55px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#007BFF] border-2 border-white ring-2 ring-[#007BFF]" />
            <span className="font-mono font-bold text-[#007BFF] shrink-0">04:00 PM Onwards</span>
            <span className="font-medium">
              <b className="text-[#0B1220]">Event Concludes</b> — Group photos and informal transitions directly to community networking.
            </span>
          </div>

        </div>

        {/* Running Thread Note Banner */}
        <div className="mt-14 bg-gradient-to-r from-[#0B162C] to-[#060C1F] text-white rounded-[16px] p-6 sm:p-8 border border-[rgba(0,198,255,0.2)] shadow-lg">
          <div className="font-mono font-bold text-[11px] tracking-[0.16em] uppercase text-[#00C6FF] mb-2">
            Running Through Every Session
          </div>
          <p className="font-medium text-[14.5px] leading-[1.65] text-[#D6DDE8] max-w-[820px]">
            AI-assisted development isn&apos;t a standalone slot — each speaker shows how it&apos;s changing their own workflow, so attendees see it as a tool used across the whole lifecycle, not an isolated topic.
          </p>
          <div className="flex flex-wrap gap-2.5 mt-4 pt-4 border-t border-white/10">
            {["Cursor", "Claude Code", "GitHub Copilot", "Windsurf"].map((tool, i) => (
              <span key={i} className="font-mono text-[12px] font-semibold text-white bg-white/10 border border-white/20 px-3 py-1 rounded-md">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Closing Roadmap Diagram */}
        <div className="mt-10 bg-white border border-[#E7ECF3] rounded-[18px] p-6 sm:p-10 shadow-sm">
          <div className="font-mono font-bold text-[11px] tracking-[0.16em] uppercase text-[#D97706] mb-1.5">
            One Slide to Remember
          </div>
          <h2 className="font-extrabold text-[26px] sm:text-[32px] text-[#0B1220] mt-1">
            The Roadmap They Leave With
          </h2>
          <p className="font-medium text-[14.5px] text-[#5B6B85] mt-2 max-w-[660px]">
            The single diagram that ties the whole day together — the lifecycle every production AI system moves through from raw models to resilient enterprise engineering.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 mt-8 p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl">
            <span className="font-bold text-[14px] sm:text-[15.5px] text-[#0B1220]">Foundation models</span>
            <span className="font-mono text-[#007BFF] font-bold">→</span>
            <span className="font-bold text-[14px] sm:text-[15.5px] text-[#0B1220]">Context</span>
            <span className="font-mono text-[#007BFF] font-bold">→</span>
            <span className="font-bold text-[14px] sm:text-[15.5px] text-[#0B1220]">Tools</span>
            <span className="font-mono text-[#007BFF] font-bold">→</span>
            <span className="font-bold text-[14px] sm:text-[15.5px] text-[#0B1220]">Workflows</span>
            <span className="font-mono text-[#007BFF] font-bold">→</span>
            <span className="font-bold text-[14px] sm:text-[15.5px] text-[#0B1220]">Agents</span>
            <span className="font-mono text-[#007BFF] font-bold">→</span>
            <span className="font-bold text-[14px] sm:text-[15.5px] text-[#0B1220]">Evaluation</span>
            <span className="font-mono text-[#007BFF] font-bold">→</span>
            <span className="font-bold text-[14px] sm:text-[15.5px] text-[#0B1220]">Deployment</span>
            <span className="font-mono text-[#007BFF] font-bold">→</span>
            <span className="font-extrabold text-[15px] sm:text-[17px] text-[#D97706] border-b-2 border-[#D97706] pb-0.5">AI Engineering</span>
          </div>

          <div className="mt-7 pt-6 border-t border-[#EEF1F6] flex items-start sm:items-center gap-4 flex-col sm:flex-row">
            <span className="font-mono font-bold text-[11px] tracking-[0.12em] text-[#D97706] bg-[#FEF3E2] border border-[#FDE68A] px-3 py-1.5 rounded uppercase shrink-0">
              Starts Here
            </span>
            <p className="font-medium text-[14px] sm:text-[14.5px] text-[#3A4459] leading-[1.6] m-0">
              <b className="text-[#0B1220]">The Botmartz AI Engineering Community launches right at the close</b> — framed as the first meetup, not the end of an event. Sign-ups happen at the door and on the way out.
            </p>
          </div>
        </div>

        <p className="text-center font-medium text-xs text-[#9AA6BA] mt-6">
          * Timings are adaptable: if live sessions run slightly ahead and conclude around 4:00 PM, we transition straight to evening networking and wrap up right around 4:30–5:00 PM.
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

      {/* ─── 4. OPEN FORUM (Q & A) ─── */}
      <div className="max-w-[1120px] mx-auto py-6 px-6 sm:px-10 pb-14">
        <div className="bg-gradient-to-r from-[#0A1327] to-[#060C1F] rounded-[18px] p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 items-center relative overflow-hidden shadow-md">
          <div className="absolute w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,rgba(0,198,255,0.18),transparent_70%)] -right-[60px] -top-[80px] pointer-events-none" />
          <div className="relative">
            <span className="inline-block font-bold text-[10.5px] tracking-[0.06em] text-[#00C6FF] bg-[rgba(0,198,255,0.12)] px-2.5 py-1 rounded-[5px] uppercase">
              Interactive
            </span>
            <div className="font-extrabold text-2xl leading-[1.3] text-white mt-3.5">Open Forum (Q & A)</div>
            <p className="font-medium text-[13.5px] leading-[1.7] text-[#8FA3C4] mt-3 max-w-[480px]">
              A dynamic Q&A session wrapping up AI Frontier. Bring your hardest questions about AI engineering, prompt injection, vector databases, or scaling models in production. Open to everyone.
            </p>
          </div>
          <div className="relative flex gap-3.5 justify-start lg:justify-end flex-wrap">
            <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl p-4 sm:px-5 text-center min-w-[96px]">
              <div className="font-extrabold text-[22px] text-[#00C6FF]">∞</div>
              <div className="font-semibold text-[11px] text-[#8FA3C4]">Questions</div>
            </div>
            <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl p-4 sm:px-5 text-center min-w-[96px]">
              <div className="font-extrabold text-[22px] text-[#00C6FF]">3</div>
              <div className="font-semibold text-[11px] text-[#8FA3C4]">Speakers</div>
            </div>
            <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl p-4 sm:px-5 text-center min-w-[96px]">
              <div className="font-extrabold text-[22px] text-[#00C6FF]">45m</div>
              <div className="font-semibold text-[11px] text-[#8FA3C4]">Duration</div>
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
