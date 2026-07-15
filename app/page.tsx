"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { SiPytorch, SiGooglecloud, SiFastapi, SiTensorflow } from 'react-icons/si';

export default function Home() {
  const [labs, setLabs] = useState<any[]>([
    { title: "Virtual Try-On", description: "Computer vision pipeline for real-time garment fitting — built to stress-test our vision stack.", iconName: "PyTorch, Demo, Repo" },
    { title: "AI Research Agent", description: "An internal agent that runs first-pass research and drafts outreach — in daily use at Botmartz.", iconName: "LangGraph, Demo, Repo" },
    { title: "Enterprise RAG Demo", description: "A reference implementation showing chunking, hybrid retrieval, and evaluation end to end.", iconName: "FastAPI, Demo, Repo" },
  ]);

  useEffect(() => {
    async function fetchLabs() {
      try {
        const q = query(
          collection(db, "labs"),
          where("status", "==", "active"),
          orderBy("createdAt", "desc"),
          limit(3)
        );
        const snap = await getDocs(q);
        const list: any[] = [];
        snap.forEach((d) => {
          list.push({ id: d.id, ...d.data() });
        });
        if (list.length > 0) {
          setLabs(list);
        }
      } catch (err) {
        // Fallback to query without ordering if index not ready
        try {
          const snap = await getDocs(collection(db, "labs"));
          const list: any[] = [];
          snap.forEach((d) => {
            const data = d.data();
            if (data.status === "active") {
              list.push({ id: d.id, ...data });
            }
          });
          if (list.length > 0) {
            setLabs(list.slice(0, 3));
          }
        } catch (e) {
          console.error("Error loading labs dynamic content on main page:", e);
        }
      }
    }
    fetchLabs();
  }, []);

  return (
    <main>
      {/* HERO SECTION */}
      <section className="relative pt-[100px] pb-[90px] bg-ink text-white overflow-hidden blueprint">
        <span className="corner c1" aria-hidden="true"></span>
        <span className="corner c2" aria-hidden="true"></span>
        <span className="corner c3" aria-hidden="true"></span>
        <span className="corner c4" aria-hidden="true"></span>
        <div className="wrap relative z-10">
          <div className="eyebrow">AI Engineering Company</div>
          <h1 className="text-[clamp(38px,6vw,68px)] leading-[1.04] font-semibold max-w-[820px] mb-[22px]">
            Production AI Engineering.<br/>
            <span className="grad-text">Enterprise RAG &amp; AI Agents.</span>
          </h1>
          <p className="text-[19px] text-ink-soft max-w-[560px] mb-[36px]">
            We design, build, and deploy Enterprise RAG systems and AI Agents — engineered with PyTorch, LangGraph, FastAPI, Google ADK, and TensorFlow, not sold on them.
          </p>
          <div className="flex flex-wrap gap-4 mb-[56px]">
            <Link href="/contact" className="btn btn-primary">Book a Discovery Call →</Link>
            <Link href="/community" className="btn btn-ghost">Join AI Frontier 2026</Link>
          </div>
          <div className="flex flex-wrap gap-[22px] items-center font-mono text-[12.5px] text-[#8598A6] pt-[26px] border-t border-line/30">
            <span className="uppercase tracking-[0.1em] text-[10.5px]">Engineering stack</span>
            <span className="flex items-center gap-1.5"><SiPytorch className="w-4 h-4"/> PyTorch</span>
            <span className="flex items-center gap-1.5">🦜🕸️ LangGraph</span>
            <span className="flex items-center gap-1.5">🦜🔗 LangChain</span>
            <span className="flex items-center gap-1.5"><SiFastapi className="w-4 h-4"/> FastAPI</span>
            <span className="flex items-center gap-1.5"><SiGooglecloud className="w-4 h-4"/> Google ADK</span>
            <span className="flex items-center gap-1.5"><SiTensorflow className="w-4 h-4"/> TensorFlow</span>
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section id="services" className="section-pad">
        <div className="wrap">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-[44px]">
            <div>
              <div className="eyebrow">What We Build</div>
              <h2 className="text-[34px] font-semibold max-w-[520px]">Two things. Done properly.</h2>
            </div>
            <p className="text-[15.5px] text-ink-soft max-w-[380px]">
              Everything else — FastAPI, deployment, evaluation — is how we build these two things, not a separate service line.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-white border border-line p-8 sm:p-[38px_34px] transition-colors duration-150 hover:border-brand">
              <span className="font-mono text-[12px] text-brand mb-[18px] block">01</span>
              <h3 className="text-[24px] font-semibold mb-[14px]">Enterprise RAG</h3>
              <p className="text-[15px] text-ink-soft mb-[20px]">
                Getting reliable answers out of messy enterprise documents — contracts, manuals, tickets, internal wikis — with retrieval your team can actually trust.
              </p>
              <div className="flex flex-wrap gap-2 mb-[22px]">
                {['Document AI', 'Knowledge Search', 'Enterprise Search', 'PDF AI', 'Support AI'].map(t => (
                  <span key={t} className="font-mono text-[11px] text-ink-soft border border-line px-2.5 py-1 rounded-full">{t}</span>
                ))}
              </div>
              <Link href="/services/enterprise-rag" className="font-mono text-[12.5px] text-brand border-b border-brand pb-0.5 inline-block">
                See how we build RAG →
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-line p-8 sm:p-[38px_34px] transition-colors duration-150 hover:border-brand">
              <span className="font-mono text-[12px] text-brand mb-[18px] block">02</span>
              <h3 className="text-[24px] font-semibold mb-[14px]">AI Agents</h3>
              <p className="text-[15px] text-ink-soft mb-[20px]">
                Systems that take multi-step action on someone's behalf — with memory, tool use, planning, and evaluation. Not a chatbot with extra steps.
              </p>
              <div className="flex flex-wrap gap-2 mb-[22px]">
                {['Customer Support', 'Research Agents', 'Sales Agents', 'Workflow Automation'].map(t => (
                  <span key={t} className="font-mono text-[11px] text-ink-soft border border-line px-2.5 py-1 rounded-full">{t}</span>
                ))}
              </div>
              <Link href="/services/ai-agents" className="font-mono text-[12.5px] text-brand border-b border-brand pb-0.5 inline-block">
                See how we build Agents →
              </Link>
            </div>
          </div>
          <div className="mt-5 text-[13.5px] text-[#8598A6] font-mono flex items-center gap-2.5 before:content-['+'] before:text-redline before:font-bold">
            AI Integrations — a supporting capability across both, not a third service.
          </div>
        </div>
      </section>

      {/* WHY BOTMARTZ */}
      <section className="section-pad section-alt">
        <div className="wrap">
          <div className="eyebrow">Why Botmartz</div>
          <h2 className="text-[30px] font-semibold mb-10 max-w-[560px]">Engineering-first, not marketing-first.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
            <div>
              <div className="font-mono text-[11px] text-brand uppercase tracking-[0.08em] mb-2.5">Stack</div>
              <h4 className="text-[17px] font-semibold mb-2">Modern AI stack</h4>
              <p className="text-[14px] text-ink-soft">PyTorch, LangGraph, FastAPI, Google ADK, TensorFlow — evidence of how we build, never the headline.</p>
            </div>
            <div>
              <div className="font-mono text-[11px] text-brand uppercase tracking-[0.08em] mb-2.5">Approach</div>
              <h4 className="text-[17px] font-semibold mb-2">Architecture before outcome</h4>
              <p className="text-[14px] text-ink-soft">We show the system before we show the result. Chunking, retrieval, memory, evaluation — in that order.</p>
            </div>
            <div>
              <div className="font-mono text-[11px] text-brand uppercase tracking-[0.08em] mb-2.5">Proof</div>
              <h4 className="text-[17px] font-semibold mb-2">Research-driven</h4>
              <p className="text-[14px] text-ink-soft">Botmartz Labs ships public builds — demos, architecture write-ups, and open-source templates.</p>
            </div>
            <div>
              <div className="font-mono text-[11px] text-brand uppercase tracking-[0.08em] mb-2.5">Ecosystem</div>
              <h4 className="text-[17px] font-semibold mb-2">Community-active</h4>
              <p className="text-[14px] text-ink-soft">AI Frontier, monthly meetups, and open-source contribution — not a closed shop.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WORK / LABS */}
      <section id="work" className="section-pad">
        <div className="wrap">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-[44px]">
            <div>
              <div className="eyebrow">Botmartz Labs</div>
              <h2 className="text-[34px] font-semibold">Public builds, real architecture.</h2>
            </div>
            <p className="text-[15.5px] text-ink-soft max-w-[380px]">
              Every Labs project ships as a demo, an architecture write-up, a blog post, and a GitHub repo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[22px]">
            {labs.slice(0, 3).map((lab, idx) => {
              const tagsArray = Array.isArray(lab.tags)
                ? lab.tags
                : (lab.iconName ? lab.iconName.split(",").map((t: string) => t.trim()) : []);
              const techTag = tagsArray[0] || "AI stack";
              const actionTag = tagsArray.slice(1).join(" + ") || "Demo + Repo";

              return (
                <div key={idx} className="bg-white border border-line flex flex-col justify-between h-full hover:border-brand transition-colors duration-150">
                  <div>
                    <div className="h-[150px] relative overflow-hidden bg-gradient-to-br from-ink to-deep">
                      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.12) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                      <div className="relative font-mono text-[10.5px] text-[#7FB9D6] p-3.5">FIG. {String(idx + 1).padStart(2, '0')} — {lab.title.toUpperCase()}</div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-[17px] font-semibold mb-2">{lab.title}</h4>
                      <p className="text-[13.5px] text-ink-soft mb-3.5 line-clamp-3">{lab.description}</p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 mt-auto">
                    <div className="flex gap-3.5 font-mono text-[11px] text-[#8598A6]">
                      <span>{techTag}</span><span>{actionTag}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link href="/work/labs" className="btn btn-ghost border border-line text-ink hover:border-brand hover:text-brand hover:bg-slate-50 transition-all px-8 py-3.5 rounded-sm">
              Explore More Labs →
            </Link>
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section id="insights" className="section-pad section-alt">
        <div className="wrap">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-[44px]">
            <div>
              <div className="eyebrow">Engineering Insights</div>
              <h2 className="text-[34px] font-semibold">Written by engineers, for engineers.</h2>
            </div>
            <p className="text-[15.5px] text-ink-soft max-w-[380px]">
              No AI news, no "top tools" lists — just architecture, evaluation, and production lessons.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[22px]">
            <div className="pt-5 border-t-2 border-line">
              <div className="font-mono text-[10.5px] text-redline uppercase tracking-[0.08em] mb-3">Enterprise RAG</div>
              <h4 className="text-[18px] font-semibold mb-2.5 leading-[1.3]">How we approach chunking for enterprise RAG (and why most teams get it wrong)</h4>
              <p className="text-[14px] text-ink-soft mb-4 leading-relaxed">Systematic retrieval evaluation from our latest deployment. Why semantic chunking fails without hybrid indexes.</p>
              <Link href="/insights" className="font-mono text-[11.5px] text-brand tracking-wider uppercase font-bold flex items-center gap-1.5 hover:gap-2.5 transition-all">Read post →</Link>
            </div>
            <div className="pt-5 border-t-2 border-line">
              <div className="font-mono text-[10.5px] text-redline uppercase tracking-[0.08em] mb-3">AI Agents</div>
              <h4 className="text-[18px] font-semibold mb-2.5 leading-[1.3]">Evaluating agentic workflows: why traditional LLM benchmarks lie</h4>
              <p className="text-[14px] text-ink-soft mb-4 leading-relaxed">A framework for testing multi-step agent actions. Why we built custom simulators for tool-calling validation.</p>
              <Link href="/insights" className="font-mono text-[11.5px] text-brand tracking-wider uppercase font-bold flex items-center gap-1.5 hover:gap-2.5 transition-all">Read post →</Link>
            </div>
            <div className="pt-5 border-t-2 border-line">
              <div className="font-mono text-[10.5px] text-redline uppercase tracking-[0.08em] mb-3">Infrastructure</div>
              <h4 className="text-[18px] font-semibold mb-2.5 leading-[1.3]">Deploying FastAPI backends at scale: Redis caching &amp; memory footprint</h4>
              <p className="text-[14px] text-ink-soft mb-4 leading-relaxed">Optimizing container resources for concurrent AI agent execution. Real-world profiling results from production.</p>
              <Link href="/insights" className="font-mono text-[11.5px] text-brand tracking-wider uppercase font-bold flex items-center gap-1.5 hover:gap-2.5 transition-all">Read post →</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
