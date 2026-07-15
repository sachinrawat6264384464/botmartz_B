import Link from "next/link";
import { SiPytorch, SiGooglecloud, SiFastapi, SiTensorflow } from 'react-icons/si';

export default function Home() {
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
            {/* Lab 1 */}
            <div className="bg-white border border-line">
              <div className="h-[150px] relative overflow-hidden bg-gradient-to-br from-ink to-deep">
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.12) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <div className="relative font-mono text-[10.5px] text-[#7FB9D6] p-3.5">FIG. 01 — VIRTUAL TRY-ON</div>
              </div>
              <div className="p-6">
                <h4 className="text-[17px] font-semibold mb-2">Virtual Try-On</h4>
                <p className="text-[13.5px] text-ink-soft mb-3.5">Computer vision pipeline for real-time garment fitting — built to stress-test our vision stack.</p>
                <div className="flex gap-3.5 font-mono text-[11px] text-[#8598A6]">
                  <span>PyTorch</span><span>Demo + Repo</span>
                </div>
              </div>
            </div>
            
            {/* Lab 2 */}
            <div className="bg-white border border-line">
              <div className="h-[150px] relative overflow-hidden bg-gradient-to-br from-ink to-deep">
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.12) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <div className="relative font-mono text-[10.5px] text-[#7FB9D6] p-3.5">FIG. 02 — RESEARCH AGENT</div>
              </div>
              <div className="p-6">
                <h4 className="text-[17px] font-semibold mb-2">AI Research Agent</h4>
                <p className="text-[13.5px] text-ink-soft mb-3.5">An internal agent that runs first-pass research and drafts outreach — in daily use at Botmartz.</p>
                <div className="flex gap-3.5 font-mono text-[11px] text-[#8598A6]">
                  <span>LangGraph</span><span>Demo + Repo</span>
                </div>
              </div>
            </div>

            {/* Lab 3 */}
            <div className="bg-white border border-line">
              <div className="h-[150px] relative overflow-hidden bg-gradient-to-br from-ink to-deep">
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.12) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <div className="relative font-mono text-[10.5px] text-[#7FB9D6] p-3.5">FIG. 03 — ENTERPRISE RAG DEMO</div>
              </div>
              <div className="p-6">
                <h4 className="text-[17px] font-semibold mb-2">Enterprise RAG Demo</h4>
                <p className="text-[13.5px] text-ink-soft mb-3.5">A reference implementation showing chunking, hybrid retrieval, and evaluation end to end.</p>
                <div className="flex gap-3.5 font-mono text-[11px] text-[#8598A6]">
                  <span>FastAPI</span><span>Demo + Repo</span>
                </div>
              </div>
            </div>
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
              <p className="text-[14px] text-ink-soft mb-3.5">70% of the engineering effort is document parsing and chunking — the model is almost the easy part.</p>
              <Link href="/insights" className="font-mono text-[12px] text-brand">Read the write-up →</Link>
            </div>
            <div className="pt-5 border-t-2 border-line">
              <div className="font-mono text-[10.5px] text-redline uppercase tracking-[0.08em] mb-3">AI Agents</div>
              <h4 className="text-[18px] font-semibold mb-2.5 leading-[1.3]">Chatbot vs. Agent: what actually changes when you add planning and memory</h4>
              <p className="text-[14px] text-ink-soft mb-3.5">Memory, tool use, planning, evaluation — the four things a real agent needs to survive production.</p>
              <Link href="/insights" className="font-mono text-[12px] text-brand">Read the write-up →</Link>
            </div>
            <div className="pt-5 border-t-2 border-line">
              <div className="font-mono text-[10.5px] text-redline uppercase tracking-[0.08em] mb-3">AI Engineering</div>
              <h4 className="text-[18px] font-semibold mb-2.5 leading-[1.3]">Vector search alone isn't enough for enterprise knowledge bases</h4>
              <p className="text-[14px] text-ink-soft mb-3.5">Why hybrid retrieval — keyword plus vector — outperforms pure similarity search in practice.</p>
              <Link href="/insights" className="font-mono text-[12px] text-brand">Read the write-up →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section id="community" className="section-pad">
        <div className="wrap">
          <div className="rounded-sm p-10 sm:p-[56px_48px] text-white relative overflow-hidden bg-gradient-to-br from-[#08243A] via-ink to-deep">
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.08) 1px, transparent 1px)', backgroundSize: '26px 26px' }}></div>
            <div className="relative max-w-[640px]">
              <span className="font-mono text-[11.5px] text-signal tracking-[0.14em] uppercase mb-4 block">AI Frontier 2026 — An AI Engineering Summit</span>
              <h3 className="text-[32px] font-semibold mb-3.5 text-white">The Future of AI Engineering</h3>
              <p className="text-[#B9C9D6] text-[15.5px] mb-2">Agents · Enterprise RAG · AI-Assisted Development · Responsible AI</p>
              <div className="font-mono text-[13px] text-[#D7E4EC] my-[18px] mb-[28px] flex flex-wrap gap-6">
                <span>📅 Aug 22, 2026</span>
                <span>📍 Venue TBA</span>
                <span>🎟 Tickets open</span>
              </div>
              <Link href="/community" className="btn btn-redline">Get Tickets →</Link>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-between items-center mt-10 pt-8 border-t border-line gap-5">
            <div>
              <h4 className="text-[18px] font-semibold mb-1.5">Monthly AI Engineering Meetups</h4>
              <p className="text-[14px] text-ink-soft max-w-[420px]">Informal, technical, open to engineers, founders, and students building production AI systems.</p>
            </div>
            <Link href="/community" className="btn btn-ghost">See next meetup</Link>
          </div>
        </div>
      </section>

      {/* STACK LIST */}
      <section className="section-pad section-alt">
        <div className="wrap">
          <div className="eyebrow">Engineering Stack</div>
          <div className="flex flex-wrap border-t border-line">
            <div className="flex-1 min-w-[150px] p-[22px_20px] border-b border-line sm:border-r font-mono text-[13.5px] text-ink-soft flex items-center justify-center gap-2"><SiPytorch className="w-4 h-4"/> PyTorch</div>
            <div className="flex-1 min-w-[150px] p-[22px_20px] border-b border-line sm:border-r font-mono text-[13.5px] text-ink-soft flex items-center justify-center gap-2">🦜🕸️ LangGraph</div>
            <div className="flex-1 min-w-[150px] p-[22px_20px] border-b border-line sm:border-r lg:border-r-0 font-mono text-[13.5px] text-ink-soft flex items-center justify-center gap-2">🦜🔗 LangChain</div>
            <div className="flex-1 min-w-[150px] p-[22px_20px] border-b border-line sm:border-r font-mono text-[13.5px] text-ink-soft flex items-center justify-center gap-2"><SiFastapi className="w-4 h-4"/> FastAPI</div>
            <div className="flex-1 min-w-[150px] p-[22px_20px] border-b border-line sm:border-r font-mono text-[13.5px] text-ink-soft flex items-center justify-center gap-2"><SiGooglecloud className="w-4 h-4"/> Google ADK</div>
            <div className="flex-1 min-w-[150px] p-[22px_20px] border-b border-line font-mono text-[13.5px] text-ink-soft flex items-center justify-center gap-2"><SiTensorflow className="w-4 h-4"/> TensorFlow</div>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section id="contact" className="bg-ink text-white text-center py-[90px]">
        <div className="wrap">
          <h2 className="text-[clamp(30px,4.5vw,46px)] font-semibold mb-[18px] text-white">Let's Build AI Together</h2>
          <p className="text-[#9FB9C8] max-w-[480px] mx-auto mb-[34px] text-[15.5px]">
            Tell us what your Enterprise RAG or AI Agent problem looks like — we'll tell you honestly whether it's a fit.
          </p>
          <Link href="/contact" className="btn btn-redline">Book a Discovery Call →</Link>
        </div>
      </section>
    </main>
  );
}
