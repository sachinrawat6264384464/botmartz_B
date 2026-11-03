"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

export default function HeroSection() {
  const visualRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const [introStatus, setIntroStatus] = useState("");
  const introRunIdRef = useRef(0);
  const introTimersRef = useRef<NodeJS.Timeout[]>([]);

  const finishBotIntro = useCallback(() => {
    introTimersRef.current.forEach(clearTimeout);
    introTimersRef.current = [];
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.classList.remove("hero-intro-ready", "hero-intro-running");
      root.classList.add("hero-intro-finished");
      root.dataset.introPhase = "settled";
      root.dataset.introSequence += " → settled";
    }
    setIntroStatus("BotCom has unpacked the AI system.");
  }, []);

  const runBotIntro = useCallback(() => {
    if (typeof window === "undefined") return;

    introTimersRef.current.forEach(clearTimeout);
    introTimersRef.current = [];
    const run = ++introRunIdRef.current;
    const root = document.documentElement;
    root.classList.remove("hero-intro-running", "hero-intro-finished");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishBotIntro();
      return;
    }

    root.classList.add("hero-intro-ready");
    root.dataset.introPhase = "loading";
    root.dataset.introSequence = "loading";
    setIntroStatus("");

    const safety = setTimeout(() => {
      if (run === introRunIdRef.current) finishBotIntro();
    }, 12000);
    introTimersRef.current.push(safety);

    const gaitImage = new Image();
    gaitImage.src = "/assets/botcom-walk-cycle.png";
    const mascotImages = [
      ...document.querySelectorAll(".suitcase-mascot img"),
      gaitImage,
    ] as HTMLImageElement[];

    Promise.all(
      mascotImages.map((img) =>
        img.decode ? img.decode() : Promise.resolve()
      )
    )
      .then(() => {
        if (run !== introRunIdRef.current) return;
        root.classList.remove("hero-intro-running");
        void root.offsetWidth;
        root.classList.add("hero-intro-running");
        root.dataset.introPhase = "emerging";
        root.dataset.introSequence += " → emerging";

        const phases: [number, string][] = [
          [650, "walking"],
          [3100, "placing"],
          [4100, "opening"],
          [4900, "revealing"],
        ];

        phases.forEach(([t, phase]) => {
          introTimersRef.current.push(
            setTimeout(() => {
              root.dataset.introPhase = phase;
              root.dataset.introSequence += " → " + phase;
            }, t)
          );
        });

        introTimersRef.current.push(setTimeout(finishBotIntro, 7200));
      })
      .catch(() => {
        if (run === introRunIdRef.current) finishBotIntro();
      });
  }, [finishBotIntro]);

  // 3D Pointer Tilt on the Live Flow Diagram
  useEffect(() => {
    const visual = visualRef.current;
    const diagram = diagramRef.current;
    if (typeof window === "undefined" || !visual || !diagram) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !window.matchMedia("(pointer:fine)").matches) return;

    const handlePointerMove = (e: PointerEvent) => {
      const b = visual.getBoundingClientRect();
      diagram.style.transform = `rotateX(${(0.5 - (e.clientY - b.top) / b.height) * 9
        }deg) rotateY(${((e.clientX - b.left) / b.width - 0.5) * 13}deg)`;
    };

    const handlePointerLeave = () => {
      diagram.style.transform = "rotateX(0deg) rotateY(0deg)";
    };

    visual.addEventListener("pointermove", handlePointerMove);
    visual.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      visual.removeEventListener("pointermove", handlePointerMove);
      visual.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  useEffect(() => {
    runBotIntro();
    return () => {
      introTimersRef.current.forEach(clearTimeout);
    };
  }, [runBotIntro]);

  return (
    <section className="relative w-full bg-white border-b border-[#E2E8F0] pt-10 pb-12 sm:pt-14 sm:pb-16 overflow-hidden" aria-label="Botmartz Enterprise AI Hero">

      {/* ── BACKGROUND AMBIENT GLOW ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[340px] bg-gradient-to-b from-[#0284C7]/8 via-[#38BDF8]/4 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── 3-COLUMN RESPONSIVE HERO GRID: (1) CONTENT, (2) 3D MASCOT, (3) 3D DIAGRAM ── */}
        <div className="hero-main-layout w-full">

          {/* ═══════════════════════════════════════════
              COLUMN 1: ORIGINAL BOTMARTZ LEFT COPY
          ═══════════════════════════════════════════ */}
          <div className="hero-copy-col">

            {/* Kinetic Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] mb-6 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#0284C7] shadow-[0_0_8px_#0284C7] animate-pulse" />
              <span className="font-mono text-[11px] font-bold tracking-wider text-[#0284C7] uppercase">
                ENTERPRISE AI SYSTEMS ENGINEERING
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[36px] sm:text-[46px] lg:text-[48px] xl:text-[52px] font-extrabold tracking-[-0.035em] leading-[1.06] text-[#0F172A] mb-5 font-sans">
              <span>Your data holds the answers.</span>
              <span className="text-[#0284C7] block mt-1">We engineer the intelligence to find them.</span>
            </h1>

            {/* Lead Subtitle */}
            <p className="text-[15px] sm:text-[16px] text-[#475569] leading-[1.65] mb-8 max-w-[490px]">
              Production-grade enterprise RAG pipelines, deterministic LangGraph agent state machines, and private VPC infrastructure with verified source citations.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-[14px] font-semibold transition-all shadow-[0_8px_20px_-4px_rgba(2,132,199,0.35)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Schedule Technical Scoping</span>
                <span className="text-base leading-none">↗</span>
              </Link>
              <a
                href="#system"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-300 hover:border-[#0284C7] text-[#0F172A] hover:bg-slate-50 text-[14px] font-semibold transition-all shadow-2xs hover:-translate-y-0.5"
              >
                <span>Inspect 3D Architecture</span>
                <span className="text-base leading-none">↓</span>
              </a>
            </div>

            {/* Proof Checkmarks Strip */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-5 border-t border-slate-200 w-full text-xs text-[#334155] font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center font-bold text-[10px]">✓</span>
                <span>Evidence-grounded retrieval</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center font-bold text-[10px]">✓</span>
                <span>Controlled agent actions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center font-bold text-[10px]">✓</span>
                <span>Deployment by design</span>
              </div>
            </div>

          </div>

          {/* ═══════════════════════════════════════════
              COLUMN 2: 3D MASCOT CHARACTER (BOTCOM & BRIEFCASE)
          ═══════════════════════════════════════════ */}
          <div className="hero-mascot-col">
            <figure
              aria-label="BotCom brings the AI system in a briefcase"
              className="hero-mascot suitcase-mascot relative"
            >
              {/* Soft Ground Shadow */}
              <div className="mascot-ground" />

              {/* 4-Frame Walking Cycle */}
              <div aria-hidden="true" className="bot-walker">
                <div aria-hidden="true" className="walk-cycle" />
              </div>

              {/* Step: Placing Briefcase Pose */}
              <img
                alt=""
                aria-hidden="true"
                className="mascot-place"
                decoding="async"
                src="/assets/botcom-intro-place.png"
              />

              {/* Final: Relaxed Leaning Pose */}
              <img
                alt="BotCom standing in a relaxed pose, leaning on an open black briefcase with blue light inside"
                className="mascot-final"
                decoding="async"
                src="/assets/botcom-intro-lean.png"
              />

              {/* 3D Animated Briefcase Flap */}
              <div aria-hidden="true" className="unpack-case">
                <div className="case-handle" />
                <div className="case-interior" />
                <div className="case-front" />
                <div className="case-flap">
                  <span />
                </div>
              </div>

              {/* Cyan / Blue Light Beam Cone */}
              <div aria-hidden="true" className="unpack-light" />

              {/* Escaping Data Particle Sparks */}
              <div aria-hidden="true" className="unpack-particles">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </figure>
          </div>

          {/* ═══════════════════════════════════════════
              COLUMN 3: 3D INTERACTIVE LIVE SYSTEM FLOW DIAGRAM
          ═══════════════════════════════════════════ */}
          <div className="hero-diagram-col">
            <div
              aria-label="Animated flow from business documents through retrieval and verification to a controlled AI agent"
              className="visual w-full flex items-center justify-center relative"
              style={{ minHeight: 440, perspective: 1100 }}
              ref={visualRef}
            >
              <div
                className="diagram w-full max-w-[560px] relative transition-transform duration-150 ease-out"
                style={{ transformStyle: "preserve-3d" }}
                ref={diagramRef}
              >
                <svg
                  aria-labelledby="map-title"
                  role="img"
                  viewBox="0 0 540 450"
                  className="w-full h-auto overflow-visible"
                >
                  <title id="map-title">
                    Documents → hybrid retrieval → verification → AI agent → human review
                  </title>
                  <defs>
                    <filter
                      height="240%"
                      id="node-shadow"
                      width="220%"
                      x="-50%"
                      y="-50%"
                    >
                      <feDropShadow
                        dx="0"
                        dy="10"
                        floodOpacity="0.12"
                        floodColor="#0284C7"
                        stdDeviation="8"
                      />
                    </filter>
                    <filter id="blue-route-glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#2855ff" floodOpacity="0.9" />
                      <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#0066ff" floodOpacity="0.4" />
                    </filter>
                    <filter id="core-glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#2855ff" floodOpacity="0.75" />
                    </filter>
                  </defs>

                  {/* Dynamic Glowing Routing Pipelines */}
                  <g fill="none" stroke="#2855ff" strokeWidth="2.4" strokeLinecap="round" filter="url(#blue-route-glow)">
                    <path className="route" d="M91 104C150 104 132 189 201 189" id="r1" />
                    <path className="route" d="M85 225C150 225 145 189 201 189" id="r2" />
                    <path className="route" d="M100 340C162 340 133 267 208 267L270 230" id="r3" />
                    <path className="route" d="M244 189C295 189 280 231 331 231" id="r4" />
                    <path className="route" d="M359 230C414 230 378 129 440 129" id="r5" />
                    <path className="route" d="M453 159C491 193 486 268 437 291" id="r6" />
                    <path className="route" d="M412 330C398 380 356 379 311 379" id="r7" />
                  </g>

                  {/* Animated Signal Packets Moving Along Routes */}
                  <circle className="signal" fill="#38BDF8" r="3.5" filter="url(#blue-route-glow)">
                    <animateMotion begin="-0.7s" dur="2.53s" repeatCount="indefinite">
                      <mpath href="#r1" />
                    </animateMotion>
                  </circle>
                  <circle className="signal" fill="#38BDF8" r="3.5" filter="url(#blue-route-glow)">
                    <animateMotion begin="-1.4s" dur="2.66s" repeatCount="indefinite">
                      <mpath href="#r2" />
                    </animateMotion>
                  </circle>
                  <circle className="signal" fill="#38BDF8" r="3.5" filter="url(#blue-route-glow)">
                    <animateMotion begin="-2.1s" dur="2.79s" repeatCount="indefinite">
                      <mpath href="#r3" />
                    </animateMotion>
                  </circle>
                  <circle className="signal" fill="#38BDF8" r="3.5" filter="url(#blue-route-glow)">
                    <animateMotion begin="-2.8s" dur="2.92s" repeatCount="indefinite">
                      <mpath href="#r4" />
                    </animateMotion>
                  </circle>
                  <circle className="signal" fill="#38BDF8" r="3.5" filter="url(#blue-route-glow)">
                    <animateMotion begin="-3.5s" dur="3.05s" repeatCount="indefinite">
                      <mpath href="#r5" />
                    </animateMotion>
                  </circle>
                  <circle className="signal" fill="#38BDF8" r="3.5" filter="url(#blue-route-glow)">
                    <animateMotion begin="-4.2s" dur="3.18s" repeatCount="indefinite">
                      <mpath href="#r6" />
                    </animateMotion>
                  </circle>
                  <circle className="signal" fill="#38BDF8" r="3.5" filter="url(#blue-route-glow)">
                    <animateMotion begin="-4.9s" dur="3.31s" repeatCount="indefinite">
                      <mpath href="#r7" />
                    </animateMotion>
                  </circle>

                  {/* ── 1. DOCUMENTS ── */}
                  <g className="iso-float b">
                    <g filter="url(#node-shadow)" transform="translate(28 59)">
                      <path d="M0 0l12 -9h84l-12 9z" fill="#F8FAFC" stroke="rgba(40, 85, 255, 0.25)" strokeWidth="0.8" />
                      <path d="M84 0l12 -9v70l-12 9z" fill="#E2E8F0" stroke="rgba(40, 85, 255, 0.25)" strokeWidth="0.8" />
                      <rect height="70" rx="3" width="84" fill="#ffffff" stroke="rgba(40, 85, 255, 0.35)" strokeWidth="1.2" />
                      <path d="M14 18h25m-25 8h39m-39 8h32" stroke="#2855ff" strokeWidth="2.2" strokeLinecap="round" fill="none" filter="url(#blue-route-glow)" />
                      <text x="12" y="57" fill="#1e3a8a" fontFamily="monospace" fontSize="9" fontWeight="700" letterSpacing="0.08em">
                        DOCUMENTS
                      </text>
                    </g>
                  </g>

                  {/* ── 2. POLICIES ── */}
                  <g className="iso-float c">
                    <g filter="url(#node-shadow)" transform="translate(22 181)">
                      <path d="M0 0l12 -9h84l-12 9z" fill="#F8FAFC" stroke="rgba(40, 85, 255, 0.25)" strokeWidth="0.8" />
                      <path d="M84 0l12 -9v70l-12 9z" fill="#E2E8F0" stroke="rgba(40, 85, 255, 0.25)" strokeWidth="0.8" />
                      <rect height="70" rx="3" width="84" fill="#ffffff" stroke="rgba(40, 85, 255, 0.35)" strokeWidth="1.2" />
                      <path d="M14 18h25m-25 8h39m-39 8h32" stroke="#2855ff" strokeWidth="2.2" strokeLinecap="round" fill="none" filter="url(#blue-route-glow)" />
                      <text x="12" y="57" fill="#1e3a8a" fontFamily="monospace" fontSize="9" fontWeight="700" letterSpacing="0.08em">
                        POLICIES
                      </text>
                    </g>
                  </g>

                  {/* ── 3. KNOWLEDGE ── */}
                  <g className="iso-float">
                    <g filter="url(#node-shadow)" transform="translate(38 299)">
                      <path d="M0 0l12 -9h84l-12 9z" fill="#F8FAFC" stroke="rgba(40, 85, 255, 0.25)" strokeWidth="0.8" />
                      <path d="M84 0l12 -9v70l-12 9z" fill="#E2E8F0" stroke="rgba(40, 85, 255, 0.25)" strokeWidth="0.8" />
                      <rect height="70" rx="3" width="84" fill="#ffffff" stroke="rgba(40, 85, 255, 0.35)" strokeWidth="1.2" />
                      <path d="M14 18h25m-25 8h39m-39 8h32" stroke="#2855ff" strokeWidth="2.2" strokeLinecap="round" fill="none" filter="url(#blue-route-glow)" />
                      <text x="12" y="57" fill="#1e3a8a" fontFamily="monospace" fontSize="9" fontWeight="700" letterSpacing="0.08em">
                        KNOWLEDGE
                      </text>
                    </g>
                  </g>

                  {/* ── 4. RETRIEVAL ── */}
                  <g className="iso-float">
                    <g filter="url(#node-shadow)" transform="translate(175 144)">
                      <path d="M0 0l12 -9h110l-12 9z" fill="#F8FAFC" stroke="rgba(40, 85, 255, 0.25)" strokeWidth="0.8" />
                      <path d="M110 0l12 -9v86l-12 9z" fill="#E2E8F0" stroke="rgba(40, 85, 255, 0.25)" strokeWidth="0.8" />
                      <rect height="86" rx="3" width="110" fill="#ffffff" stroke="rgba(40, 85, 255, 0.35)" strokeWidth="1.2" />
                      <path d="M23 25l29 17 29-17M52 42v12" stroke="#2855ff" strokeWidth="2.2" strokeLinecap="round" fill="none" filter="url(#blue-route-glow)" />
                      <circle cx="23" cy="25" fill="#2855ff" r="4" filter="url(#blue-route-glow)" />
                      <circle cx="81" cy="25" fill="#2855ff" r="4" filter="url(#blue-route-glow)" />
                      <circle cx="52" cy="42" fill="#fff" r="4" stroke="#2855ff" strokeWidth="2" filter="url(#blue-route-glow)" />
                      <text x="12" y="73" fill="#1e3a8a" fontFamily="monospace" fontSize="9" fontWeight="700" letterSpacing="0.08em">
                        RETRIEVAL
                      </text>
                    </g>
                  </g>

                  {/* ── 5. VERIFY ── */}
                  <g className="iso-float b">
                    <g filter="url(#node-shadow)" transform="translate(297 204)">
                      <path d="M0 0l12 -9h92l-12 9z" fill="#F8FAFC" stroke="rgba(40, 85, 255, 0.25)" strokeWidth="0.8" />
                      <path d="M92 0l12 -9v75l-12 9z" fill="#E2E8F0" stroke="rgba(40, 85, 255, 0.25)" strokeWidth="0.8" />
                      <rect height="75" rx="3" width="92" fill="#ffffff" stroke="rgba(40, 85, 255, 0.35)" strokeWidth="1.2" />
                      <path d="M17 20h52m-52 9h38m-38 9h45" stroke="#2855ff" strokeWidth="2.2" strokeLinecap="round" fill="none" filter="url(#blue-route-glow)" />
                      <circle cx="55" cy="29" fill="#2855ff" r="4" filter="url(#blue-route-glow)" />
                      <text x="12" y="62" fill="#1e3a8a" fontFamily="monospace" fontSize="9" fontWeight="700" letterSpacing="0.08em">
                        VERIFY
                      </text>
                    </g>
                  </g>

                  {/* ── 6. EVIDENCE ── */}
                  <g className="iso-float c">
                    <g filter="url(#node-shadow)" transform="translate(399 85)">
                      <path d="M0 0l12 -9h91l-12 9z" fill="#F8FAFC" stroke="rgba(40, 85, 255, 0.25)" strokeWidth="0.8" />
                      <path d="M91 0l12 -9v74l-12 9z" fill="#E2E8F0" stroke="rgba(40, 85, 255, 0.25)" strokeWidth="0.8" />
                      <rect height="74" rx="3" width="91" fill="#ffffff" stroke="rgba(40, 85, 255, 0.35)" strokeWidth="1.2" />
                      <path d="M18 25l12 8 24-17" stroke="#2855ff" strokeWidth="2.2" strokeLinecap="round" fill="none" filter="url(#blue-route-glow)" />
                      <path d="M62 18h10m-10 9h10" stroke="#2855ff" strokeWidth="2.2" strokeLinecap="round" fill="none" filter="url(#blue-route-glow)" />
                      <text x="12" y="61" fill="#1e3a8a" fontFamily="monospace" fontSize="9" fontWeight="700" letterSpacing="0.08em">
                        EVIDENCE
                      </text>
                    </g>
                  </g>

                  {/* ── 7. AI AGENT (SIGNATURE DARK TECH CORE) ── */}
                  <g className="iso-float">
                    <g filter="url(#node-shadow)" transform="translate(393 282)">
                      <path d="M0 0l12 -9h100l-12 9z" fill="#0F172A" stroke="#2855ff" strokeWidth="0.8" />
                      <path d="M100 0l12 -9v85l-12 9z" fill="#090E17" stroke="#2855ff" strokeWidth="0.8" />
                      <rect height="85" rx="3" width="100" fill="#060b18" stroke="#2855ff" strokeWidth="1.8" filter="url(#core-glow)" />
                      <circle cx="50" cy="27" fill="none" r="13" stroke="#2855ff" strokeWidth="2" filter="url(#core-glow)" />
                      <circle cx="50" cy="27" fill="#38bdf8" r="4.5" filter="url(#core-glow)" />
                      <path d="M28 49h44" stroke="#2855ff" strokeWidth="2" strokeLinecap="round" filter="url(#blue-route-glow)" />
                      <text x="12" y="72" fill="#38bdf8" fontFamily="monospace" fontSize="9" fontWeight="700" letterSpacing="0.08em">
                        AI AGENT
                      </text>
                    </g>
                  </g>

                  {/* ── 8. HUMAN REVIEW ── */}
                  <g className="iso-float b">
                    <g filter="url(#node-shadow)" transform="translate(216 355)">
                      <path d="M0 0l12 -9h112l-12 9z" fill="#F8FAFC" stroke="rgba(40, 85, 255, 0.25)" strokeWidth="0.8" />
                      <path d="M112 0l12 -9v62l-12 9z" fill="#E2E8F0" stroke="rgba(40, 85, 255, 0.25)" strokeWidth="0.8" />
                      <rect height="62" rx="3" width="112" fill="#ffffff" stroke="rgba(40, 85, 255, 0.35)" strokeWidth="1.2" />
                      <path d="M15 18h61m-61 7h39" stroke="#2855ff" strokeWidth="2.2" strokeLinecap="round" fill="none" filter="url(#blue-route-glow)" />
                      <text x="12" y="49" fill="#1e3a8a" fontFamily="monospace" fontSize="9" fontWeight="700" letterSpacing="0.08em">
                        HUMAN REVIEW
                      </text>
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            {/* ── Status Caption (Cleanly Below the Diagram) ── */}
            <div className="visual-caption w-full max-w-[560px] mt-4 flex items-center justify-between text-[11px] font-mono tracking-wider text-slate-500 px-3">
              <span className="flex items-center gap-2 font-semibold text-slate-800">
                <i className="inline-block w-2 h-2 rounded-full bg-[#0284C7] shadow-[0_0_8px_#0284C7] animate-pulse" />
                <span>LIVE SYSTEM FLOW</span>
              </span>
              <span className="text-slate-400 font-medium">DATA → EVIDENCE → ACTION</span>
            </div>

            {/* ── Intro Skip & Replay Controls ── */}
            <div className="intro-controls flex items-center justify-end gap-3.5 w-full max-w-[560px] px-3 mt-1.5 text-[10px] font-mono text-slate-400">
              <button
                type="button"
                onClick={finishBotIntro}
                className="hover:text-[#0284C7] transition-colors cursor-pointer border-0 bg-transparent p-0"
              >
                Skip intro ↗
              </button>
              <button
                type="button"
                onClick={runBotIntro}
                className="hover:text-[#0284C7] transition-colors cursor-pointer border-0 bg-transparent p-0"
              >
                Replay intro ↻
              </button>
            </div>

            <span aria-live="polite" className="sr-only">
              {introStatus}
            </span>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SELF-CONTAINED CSS: MASCOT ANIMATION & LEVITATION PHYSICS
      ═══════════════════════════════════════════ */}
      <style jsx global>{`
        /* ── Hero Main 3-Column Desktop Grid ── */
        .hero-main-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
          align-items: center;
          width: 100%;
        }

        @media (min-width: 960px) {
          .hero-main-layout {
            grid-template-columns: minmax(0, 1.12fr) 330px minmax(0, 1.25fr);
            gap: 24px;
          }
        }

        @media (min-width: 1200px) {
          .hero-main-layout {
            grid-template-columns: minmax(0, 1.16fr) 350px minmax(0, 1.28fr);
            gap: 32px;
          }
        }

        @media (min-width: 1440px) {
          .hero-main-layout {
            grid-template-columns: minmax(0, 1.2fr) 380px minmax(0, 1.32fr);
            gap: 40px;
          }
        }

        .hero-copy-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          z-index: 20;
          min-width: 0;
        }

        .hero-mascot-col {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          width: 100%;
          min-width: 0;
          padding: 8px 0;
        }

        .hero-diagram-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 100%;
          min-width: 0;
        }

        /* ── Mascot & Unpacking Structure (Enlarged & Responsive) ── */
        .hero-mascot.suitcase-mascot {
          width: 330px;
          height: 495px;
          position: relative;
          isolation: isolate;
          align-self: center;
          margin: 0 auto;
          max-width: 100%;
        }

        @media (min-width: 1200px) {
          .hero-mascot.suitcase-mascot {
            width: 350px;
            height: 525px;
          }
        }

        @media (min-width: 1440px) {
          .hero-mascot.suitcase-mascot {
            width: 380px;
            height: 570px;
          }
        }

        @media (max-width: 959px) {
          .hero-mascot.suitcase-mascot {
            width: 290px;
            height: 435px;
          }
        }

        @media (max-width: 640px) {
          .hero-mascot.suitcase-mascot {
            width: 230px;
            height: 345px;
          }
        }

        .mascot-ground {
          position: absolute;
          bottom: 10px;
          height: 18px;
          left: 10%;
          right: 8%;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.12);
          filter: blur(8px);
          z-index: 0;
        }

        .bot-walker,
        .mascot-place,
        .mascot-final {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          pointer-events: none;
        }

        .bot-walker {
          transform-origin: 50% 95%;
          opacity: 0;
        }

        .walk-cycle {
          position: absolute;
          inset: 0;
          background-image: url("/assets/botcom-walk-cycle.png");
          background-size: 400% 100%;
          background-repeat: no-repeat;
          background-position: 0 0;
          filter: drop-shadow(0 10px 14px rgba(15, 23, 42, 0.08));
        }

        .mascot-place {
          opacity: 0;
          transform-origin: 50% 95%;
        }

        .mascot-final {
          opacity: 1;
          filter: drop-shadow(0 14px 16px rgba(15, 23, 42, 0.08));
        }

        /* ── 3D Briefcase Flap ── */
        .unpack-case {
          position: absolute;
          bottom: 9%;
          left: 56%;
          width: 39%;
          height: 25%;
          opacity: 0;
          perspective: 400px;
          z-index: 3;
        }

        .case-handle {
          position: absolute;
          top: -11%;
          left: 29%;
          right: 29%;
          height: 14%;
          border: 4px solid #202229;
          border-bottom: 0;
          border-radius: 8px 8px 0 0;
        }

        .case-interior {
          position: absolute;
          inset: 0;
          border-radius: 5px;
          background: linear-gradient(130deg, #090b10, #1c253b);
          border: 3px solid #343840;
          box-shadow: inset 0 -12px 24px rgba(40, 85, 255, 0.4);
        }

        .case-front {
          position: absolute;
          inset: 3px;
          background: linear-gradient(135deg, #353535, #151515);
          border: 1px solid #555;
          border-radius: 3px;
        }

        .case-flap {
          position: absolute;
          inset: 3px 3px 24%;
          background: linear-gradient(150deg, #424242, #1b1b1b);
          clip-path: polygon(0 0, 100% 0, 94% 72%, 61% 100%, 39% 100%, 5% 72%);
          border-radius: 4px;
          transform-origin: 50% 100%;
          backface-visibility: visible;
          z-index: 3;
        }

        .case-flap span {
          position: absolute;
          bottom: 0;
          left: 45%;
          width: 10%;
          height: 20%;
          background: #111;
          border: 1px solid #777;
          border-radius: 2px;
        }

        .unpack-light {
          position: absolute;
          left: 79%;
          bottom: 17%;
          width: 260px;
          height: 180px;
          pointer-events: none;
          opacity: 0;
          background: linear-gradient(25deg, rgba(40, 85, 255, 0.35), rgba(124, 170, 255, 0.12), transparent 78%);
          clip-path: polygon(0 75%, 100% 0, 100% 90%, 0 100%);
          filter: blur(8px);
          z-index: -1;
          transform-origin: left bottom;
        }

        .unpack-particles {
          position: absolute;
          left: 75%;
          bottom: 18%;
          width: 240px;
          height: 190px;
          pointer-events: none;
          opacity: 0;
        }

        .unpack-particles i {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #4169ff;
          box-shadow: 0 0 12px #2855ff;
          left: 0;
          bottom: 0;
        }

        .unpack-particles i:nth-child(2) {
          --px: 120px;
          --py: -70px;
          animation-delay: 4.46s !important;
        }
        .unpack-particles i:nth-child(3) {
          --px: 180px;
          --py: -115px;
          animation-delay: 4.62s !important;
        }
        .unpack-particles i:nth-child(4) {
          --px: 150px;
          --py: -10px;
          animation-delay: 4.78s !important;
        }
        .unpack-particles i:nth-child(5) {
          --px: 210px;
          --py: -55px;
          animation-delay: 4.94s !important;
        }

        /* ── Isometric Float Animation ── */
        .iso-float {
          animation: levitate 7s ease-in-out infinite;
        }
        .iso-float.b {
          animation-delay: -2s;
        }
        .iso-float.c {
          animation-delay: -4s;
        }

        @keyframes levitate {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }

        @keyframes route-glow-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 4px rgba(40, 85, 255, 0.6)) drop-shadow(0 0 10px rgba(65, 105, 255, 0.3));
            opacity: 0.88;
          }
          50% {
            filter: drop-shadow(0 0 8px rgba(40, 85, 255, 0.9)) drop-shadow(0 0 18px rgba(65, 105, 255, 0.6));
            opacity: 1;
          }
        }

        /* ── Intro Orchestration Animation Sequence ── */
        .hero-intro-ready .mascot-final {
          opacity: 0;
        }

        .hero-intro-running .walk-cycle {
          animation: registered-walk 0.72s steps(1, end) infinite;
        }

        @keyframes registered-walk {
          0% { background-position: 0% 0; }
          25% { background-position: 33.333333% 0; }
          50% { background-position: 66.666667% 0; }
          75%, 100% { background-position: 100% 0; }
        }

        .hero-intro-running .bot-walker {
          animation: front-edge-walk 3.3s linear both;
        }

        @keyframes front-edge-walk {
          0% {
            opacity: 0;
            transform: translate(-105px, 0);
            clip-path: inset(0 55% 0 0);
          }
          10% {
            opacity: 1;
            transform: translate(-95px, -2px);
            clip-path: inset(0 0 0 0);
          }
          22% { transform: translate(-80px, 0); }
          33% { transform: translate(-68px, -3px); }
          44% { transform: translate(-55px, 0); }
          55% { transform: translate(-43px, -3px); }
          66% { transform: translate(-30px, 0); }
          77% { transform: translate(-18px, -3px); }
          88% {
            opacity: 1;
            transform: translate(-5px, 0);
          }
          95% {
            opacity: 1;
            transform: translate(0, 0);
          }
          100% {
            opacity: 0;
            transform: translate(0, 0);
          }
        }

        .hero-intro-running .mascot-place {
          animation: bag-placement 1.8s 3.05s both;
        }

        @keyframes bag-placement {
          0% {
            opacity: 0;
            transform: translateY(-4px) rotate(-2deg);
          }
          18% { opacity: 1; }
          65% {
            opacity: 1;
            transform: translateY(5px) rotate(1deg);
          }
          100% {
            opacity: 0;
            transform: translateY(0);
          }
        }

        .hero-intro-running .mascot-final {
          animation: bot-settle 1s 4.65s both;
        }

        @keyframes bot-settle {
          0% {
            opacity: 0;
            transform: translateY(5px) rotate(2deg);
          }
          50% { opacity: 1; }
          100% {
            opacity: 1;
            transform: translateY(0) rotate(0);
          }
        }

        .hero-intro-running .unpack-case {
          animation: case-appearance 2.1s 3.5s both;
        }

        @keyframes case-appearance {
          0% {
            opacity: 0;
            transform: translateY(-12px);
          }
          20%, 68% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(0);
          }
        }

        .hero-intro-running .case-flap {
          animation: open-case 0.9s 4.05s ease-in-out both;
        }

        @keyframes open-case {
          from { transform: rotateX(0deg); }
          to { transform: rotateX(-145deg); }
        }

        .hero-intro-running .case-front {
          animation: interior-reveal 0.4s 4.05s both;
        }

        @keyframes interior-reveal {
          to { opacity: 0; }
        }

        .hero-intro-running .unpack-light {
          animation: case-light 2.1s 4.15s both;
        }

        @keyframes case-light {
          0% {
            opacity: 0;
            transform: scale(0.4);
          }
          30%, 60% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.2);
          }
        }

        .hero-intro-running .unpack-particles {
          animation: case-light 2.3s 4.15s both;
        }

        .hero-intro-running .unpack-particles i {
          animation: escape-particle 1.1s 4.3s ease-out 2 both;
        }

        @keyframes escape-particle {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0.5);
          }
          15% { opacity: 1; }
          100% {
            opacity: 0;
            transform: translate(var(--px, 90px), var(--py, -120px)) scale(0.1);
          }
        }

        .hero-intro-running .diagram {
          animation: system-unpack 1.7s 4.7s cubic-bezier(0.2, 0.75, 0.2, 1) both;
          transform-origin: 0 95%;
        }

        @keyframes system-unpack {
          0% {
            opacity: 0;
            transform: translate(-110px, 130px) scale(0.03) rotate(-8deg);
            filter: blur(12px);
          }
          28% {
            opacity: 0.8;
            filter: blur(3px);
          }
          80% {
            opacity: 1;
            transform: translate(0, -5px) scale(1.015);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
            filter: blur(0);
          }
        }

        .hero-intro-finished .mascot-final,
        .hero-intro-finished .diagram {
          opacity: 1;
        }
      `}</style>

    </section>
  );
}
