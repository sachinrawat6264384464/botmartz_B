"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import Image from "next/image";
import { 
  SiPytorch, 
  SiGooglecloud, 
  SiFastapi, 
  SiTensorflow,
  SiDocker,
  SiAmazonwebservices
} from 'react-icons/si';
import { 
  Check, 
  Layers, 
  Bot, 
  Blocks, 
  Code2, 
  ShieldCheck, 
  FlaskConical, 
  Network, 
  UsersRound,
  Briefcase,
  Users,
  GitPullRequest,
  Star,
  MapPin,
  Calendar,
  Ticket
} from 'lucide-react';

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
      <section className="relative pt-[120px] pb-[80px] bg-[#050B14] text-white overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="wrap relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-8">
            
            {/* Left Content */}
            <div className="flex-1 w-full lg:max-w-[720px] pt-8">
              <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-6 flex items-center gap-3 font-semibold">
                <span className="w-6 h-px bg-[#00B8F0]"></span>
                AI Engineering Company
              </div>
              <h1 className="text-[clamp(42px,5vw,64px)] leading-[1.05] font-semibold mb-5 tracking-tight text-white">
                We Engineer <br />
                Production <span className="text-[#00B8F0]">AI Systems</span>
              </h1>
              <p className="text-[18px] text-white font-medium mb-6 leading-tight">
                Enterprise RAG. AI Agents. Real Impact.
              </p>
              <p className="text-[15.5px] text-[#8A9EB0] max-w-[540px] mb-10 leading-[1.6]">
                Botmartz designs, builds, and deploys secure, scalable, and production-ready AI systems for forward-thinking organizations.
              </p>
              <div className="flex flex-wrap gap-4 mb-[60px]">
                <Link href="/contact" className="btn bg-[#0066FF] text-white hover:bg-[#0052CC] border-none font-semibold px-8 rounded-lg shadow-[0_0_15px_rgba(0,102,255,0.4)]">
                  Book a Discovery Call →
                </Link>
                <Link href="/work" className="btn btn-ghost text-white border-line/30 hover:border-white hover:text-white px-8 rounded-lg">
                  Explore Our Work
                </Link>
              </div>

              {/* Trust Bar */}
              <div className="pt-8 border-t border-line/20">
                <p className="text-[11.5px] font-mono text-[#768C9E] uppercase tracking-wider mb-4">Trusted by teams building the future</p>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
                  <span className="font-semibold tracking-wide flex items-center gap-1.5"><Layers size={18}/> EduBridge</span>
                  <span className="font-semibold tracking-wide flex items-center gap-1.5"><Blocks size={18}/> ShipBank</span>
                  <span className="font-semibold tracking-wide flex items-center gap-1.5"><Check size={18}/> LexIntell</span>
                  <span className="font-semibold tracking-wide flex items-center gap-1.5"><Code2 size={18}/> DataKraft</span>
                  <span className="font-semibold tracking-wide flex items-center gap-1.5"><Network size={18}/> NextLearn</span>
                </div>
              </div>
            </div>

            {/* Right Graphic (Hero Robot & Callouts) */}
            <div className="flex-1 w-full relative min-h-[500px] hidden lg:block">
              {/* Central Robot Image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[600px] h-[600px] z-10 flex items-center justify-center pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050B14]/90 z-10" />
                <img src="/robot2.png" alt="Botmartz AI Core" className="w-full h-full object-contain animate-float scale-[1.15]" />
              </div>

              {/* Callout Boxes */}
              <div className="absolute top-[12%] left-[-8%] bg-[#071324]/90 backdrop-blur-md border border-[#00B8F0] p-5 rounded-xl w-[250px] z-20 shadow-[0_0_25px_rgba(0,184,240,0.3)]">
                <h4 className="text-white font-semibold text-[14px] mb-2 flex items-center gap-2"><Layers size={18} className="text-[#00B8F0]"/> Enterprise RAG</h4>
                <p className="text-[#8A9EB0] text-[12px] leading-relaxed">Connect, retrieve and reason over your enterprise knowledge.</p>
              </div>

              <div className="absolute top-[12%] right-[-8%] bg-[#071324]/90 backdrop-blur-md border border-[#00B8F0] p-5 rounded-xl w-[250px] z-20 shadow-[0_0_25px_rgba(0,184,240,0.3)]">
                <h4 className="text-white font-semibold text-[14px] mb-2 flex items-center gap-2"><Bot size={18} className="text-[#00B8F0]"/> AI Agents</h4>
                <p className="text-[#8A9EB0] text-[12px] leading-relaxed">Autonomous agents that plan, act and deliver outcomes.</p>
              </div>

              <div className="absolute top-[70%] left-[-8%] bg-[#071324]/90 backdrop-blur-md border border-[#00B8F0] p-5 rounded-xl w-[250px] z-20 shadow-[0_0_25px_rgba(0,184,240,0.3)]">
                <h4 className="text-white font-semibold text-[14px] mb-2 flex items-center gap-2"><ShieldCheck size={18} className="text-[#00B8F0]"/> Production Ready</h4>
                <p className="text-[#8A9EB0] text-[12px] leading-relaxed">Secure, scalable and monitored systems that run in the real world.</p>
              </div>

              <div className="absolute top-[70%] right-[-8%] bg-[#071324]/90 backdrop-blur-md border border-[#00B8F0] p-5 rounded-xl w-[250px] z-20 shadow-[0_0_25px_rgba(0,184,240,0.3)]">
                <h4 className="text-white font-semibold text-[14px] mb-2 flex items-center gap-2"><Code2 size={18} className="text-[#00B8F0]"/> AI Engineering</h4>
                <p className="text-[#8A9EB0] text-[12px] leading-relaxed">Modern stack. Clean architecture. Reliable engineering.</p>
              </div>
            </div>

          </div>

          {/* Stats Bar */}
          <div className="mt-[80px] pt-[20px] pb-[40px]">
            <div className="bg-[#050B14]/80 backdrop-blur-md border border-[#00B8F0]/20 rounded-2xl p-8 lg:px-12 lg:py-10 shadow-[0_0_40px_rgba(0,184,240,0.08)]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-xl bg-[#00B8F0]/10 border border-[#00B8F0]/30 flex items-center justify-center text-[#00B8F0] shadow-[0_0_20px_rgba(0,184,240,0.2)]">
                    <Briefcase size={28} />
                  </div>
                  <div>
                    <div className="text-[32px] font-semibold text-white leading-none mb-1">20+</div>
                    <div className="text-[14px] text-[#8A9EB0]">Projects Delivered</div>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-xl bg-[#00B8F0]/10 border border-[#00B8F0]/30 flex items-center justify-center text-[#00B8F0] shadow-[0_0_20px_rgba(0,184,240,0.2)]">
                    <Users size={28} />
                  </div>
                  <div>
                    <div className="text-[32px] font-semibold text-white leading-none mb-1">2K+</div>
                    <div className="text-[14px] text-[#8A9EB0]">Engineers Trained</div>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-xl bg-[#00B8F0]/10 border border-[#00B8F0]/30 flex items-center justify-center text-[#00B8F0] shadow-[0_0_20px_rgba(0,184,240,0.2)]">
                    <Code2 size={28} />
                  </div>
                  <div>
                    <div className="text-[32px] font-semibold text-white leading-none mb-1">10+</div>
                    <div className="text-[14px] text-[#8A9EB0]">Open Source Repos</div>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-xl bg-[#00B8F0]/10 border border-[#00B8F0]/30 flex items-center justify-center text-[#00B8F0] shadow-[0_0_20px_rgba(0,184,240,0.2)]">
                    <Star size={28} />
                  </div>
                  <div>
                    <div className="text-[32px] font-semibold text-white leading-none mb-1">5★</div>
                    <div className="text-[14px] text-[#8A9EB0]">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section id="services" className="section-pad bg-[#0A111F]">
        <div className="wrap">
          <div className="text-center mb-16">
            <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-4 font-semibold inline-block">Our Core Services</div>
            <h2 className="text-[clamp(28px,4vw,38px)] font-semibold mb-4 text-white">AI Solutions Built for Production.</h2>
            <p className="text-base text-[#8A9EB0] max-w-[600px] mx-auto">
              We focus on solving real business problems with two core capabilities backed by robust engineering and seamless integrations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#050B14] border border-white/10 p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,184,240,0.15)] hover:border-[#00B8F0]/40 group relative overflow-hidden flex flex-col h-full min-h-[460px]">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] transition-opacity group-hover:opacity-[0.08] text-white">
                <Layers size={100} />
              </div>
              <div className="w-14 h-14 bg-[#00B8F0]/10 rounded-xl flex items-center justify-center text-[#00B8F0] mb-6 border border-[#00B8F0]/30 shadow-[0_0_15px_rgba(0,184,240,0.2)]">
                <Layers size={26} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Enterprise RAG</h3>
              <p className="text-base text-[#8A9EB0] mb-8 leading-relaxed">
                Transform enterprise knowledge into actionable intelligence.
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {['Knowledge Search', 'Document intelligence', 'PDF AI & Q&A', 'Enterprise Search', 'Support AI Copilots'].map(t => (
                  <li key={t} className="flex items-center gap-2.5 text-base text-white/80">
                    <Check size={16} className="text-[#00B8F0] flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <Link href="/services/enterprise-rag" className="inline-flex items-center gap-2 font-mono text-[13px] text-[#00B8F0] font-semibold group-hover:text-white transition-colors mt-auto">
                Learn more <span className="transform transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-[#050B14] border border-white/10 p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,184,240,0.15)] hover:border-[#00B8F0]/40 group relative overflow-hidden flex flex-col h-full min-h-[460px]">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] transition-opacity group-hover:opacity-[0.08] text-white">
                <Bot size={100} />
              </div>
              <div className="w-14 h-14 bg-[#00B8F0]/10 rounded-xl flex items-center justify-center text-[#00B8F0] mb-6 border border-[#00B8F0]/30 shadow-[0_0_15px_rgba(0,184,240,0.2)]">
                <Bot size={26} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">AI Agents</h3>
              <p className="text-base text-[#8A9EB0] mb-8 leading-relaxed">
                Build intelligent agents that automate complex tasks and workflows.
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {['Customer Support Agents', 'Research & Analysis Agents', 'Sales & SDR Agents', 'Workflow Automation', 'Internal AI Assistants'].map(t => (
                  <li key={t} className="flex items-center gap-2.5 text-base text-white/80">
                    <Check size={16} className="text-[#00B8F0] flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <Link href="/services/ai-agents" className="inline-flex items-center gap-2 font-mono text-[13px] text-[#00B8F0] font-semibold group-hover:text-white transition-colors mt-auto">
                Learn more <span className="transform transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-[#050B14] border border-white/10 p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,184,240,0.15)] hover:border-[#00B8F0]/40 group relative overflow-hidden flex flex-col h-full min-h-[460px]">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] transition-opacity group-hover:opacity-[0.08] text-white">
                <Blocks size={100} />
              </div>
              <div className="w-14 h-14 bg-[#00B8F0]/10 rounded-xl flex items-center justify-center text-[#00B8F0] mb-6 border border-[#00B8F0]/30 shadow-[0_0_15px_rgba(0,184,240,0.2)]">
                <Blocks size={26} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">AI Integrations</h3>
              <p className="text-base text-[#8A9EB0] mb-8 leading-relaxed">
                Seamlessly integrate AI capabilities into your existing systems.
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {['Model Integration', 'API Development', 'Custom Workflows', 'LLM Fine-tuning', 'System Modernization'].map(t => (
                  <li key={t} className="flex items-center gap-2.5 text-base text-white/80">
                    <Check size={16} className="text-[#00B8F0] flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <Link href="/services/integrations" className="inline-flex items-center gap-2 font-mono text-[13px] text-[#00B8F0] font-semibold group-hover:text-white transition-colors mt-auto">
                Learn more <span className="transform transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY BOTMARTZ */}
      <section className="section-pad bg-[#050B14] border-t border-white/10">
        <div className="wrap">
          <div className="text-center mb-16">
            <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-4 font-semibold inline-block">Why Botmartz</div>
            <h2 className="text-[clamp(28px,4vw,38px)] font-semibold mb-4 text-white">Engineering Excellence. Real World Impact.</h2>
            <p className="text-lg text-[#8A9EB0] max-w-[600px] mx-auto">
              We combine deep engineering expertise with cutting-edge AI to deliver solutions that scale.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="flex flex-col items-center text-center h-full">
              <div className="w-16 h-16 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 shadow-[0_0_15px_rgba(0,184,240,0.2)] flex items-center justify-center text-[#00B8F0] mb-5">
                <Code2 size={24} strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-white">Engineering First</h4>
              <p className="text-base text-[#8A9EB0] leading-relaxed">We are engineers, not marketers. Code quality, architecture, and reliability come first.</p>
            </div>
            
            <div className="flex flex-col items-center text-center h-full">
              <div className="w-16 h-16 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 shadow-[0_0_15px_rgba(0,184,240,0.2)] flex items-center justify-center text-[#00B8F0] mb-5">
                <ShieldCheck size={24} strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-white">Production Focused</h4>
              <p className="text-base text-[#8A9EB0] leading-relaxed">We build systems that are secure, scalable, monitored, and ready for real-world usage.</p>
            </div>

            <div className="flex flex-col items-center text-center h-full">
              <div className="w-16 h-16 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 shadow-[0_0_15px_rgba(0,184,240,0.2)] flex items-center justify-center text-[#00B8F0] mb-5">
                <FlaskConical size={24} strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-white">Research Driven</h4>
              <p className="text-base text-[#8A9EB0] leading-relaxed">We stay at the frontier of AI through research, experiments, and continuous learning.</p>
            </div>

            <div className="flex flex-col items-center text-center h-full">
              <div className="w-16 h-16 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 shadow-[0_0_15px_rgba(0,184,240,0.2)] flex items-center justify-center text-[#00B8F0] mb-5">
                <Network size={24} strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-white">Open & Collaborative</h4>
              <p className="text-base text-[#8A9EB0] leading-relaxed">We believe in open source, community knowledge sharing, and lifting others as we grow.</p>
            </div>

            <div className="flex flex-col items-center text-center h-full">
              <div className="w-16 h-16 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 shadow-[0_0_15px_rgba(0,184,240,0.2)] flex items-center justify-center text-[#00B8F0] mb-5">
                <UsersRound size={24} strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-white">End-to-End Partner</h4>
              <p className="text-base text-[#8A9EB0] leading-relaxed">From strategy and design to deployment and support, we are with you at every step.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WORK / LABS */}
      <section id="work" className="section-pad bg-[#0A111F]">
        <div className="wrap">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-12">
            <div>
              <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-3 font-semibold">Featured Projects & Labs</div>
              <h2 className="text-[clamp(26px,3vw,34px)] font-semibold text-white">Building In Public. Sharing Knowledge.</h2>
              <p className="text-lg text-[#8A9EB0] max-w-[500px] mt-3">
                Explore some of our recent builds and experiments.
              </p>
            </div>
            <Link href="/work" className="btn btn-ghost text-[#00B8F0] font-semibold border-[#00B8F0]/30 hover:bg-[#00B8F0]/10">
              View All Labs →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {labs.slice(0, 4).map((lab, idx) => {
              const bgGradients = [
                "from-[#1E293B] to-[#0F172A]",
                "from-[#0F172A] to-[#1E3A8A]",
                "from-[#172554] to-[#020617]",
                "from-[#312E81] to-[#1E1B4B]"
              ];
              const Icons = [Code2, Bot, Layers, UsersRound];
              const Icon = Icons[idx % Icons.length];
              const tagsArray = Array.isArray(lab.tags)
                ? lab.tags
                : (lab.iconName ? lab.iconName.split(",").map((t: string) => t.trim()) : []);
              const techTag = tagsArray[0] || "AI Lab";

              return (
                <div key={idx} className="bg-[#050B14] rounded-xl overflow-hidden border border-white/10 hover:border-[#00B8F0]/40 shadow-lg hover:shadow-[0_0_30px_rgba(0,184,240,0.15)] transition-all duration-300 group flex flex-col h-full min-h-[400px]">
                  <div className="h-[180px] relative bg-ink flex items-center justify-center overflow-hidden flex-shrink-0">
                    <div className={`absolute inset-0 bg-gradient-to-tr ${bgGradients[idx % 4]} opacity-90`} />
                    <div className="relative text-white/50 text-[50px] transform group-hover:scale-110 transition-transform duration-500"><Icon /></div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="font-mono text-[10px] uppercase text-[#00B8F0] tracking-wider bg-[#00B8F0]/10 px-2 py-1 rounded-sm inline-block mb-3 self-start">{techTag}</div>
                    <h4 className="text-xl font-semibold mb-2 text-white">{lab.title}</h4>
                    <p className="text-base text-[#8A9EB0] mb-6 line-clamp-3 flex-grow">{lab.description}</p>
                    <Link href={`/work/${lab.slug || 'lab'}`} className="font-mono text-[13px] text-[#00B8F0] font-semibold inline-flex items-center gap-1 group-hover:gap-2 group-hover:text-white transition-all mt-auto">
                      View Project →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STACK LIST */}
      <section className="py-16 bg-[#050B14] border-b border-white/10">
        <div className="wrap">
          <div className="text-center mb-8">
            <div className="font-mono text-[11px] tracking-[0.14em] text-[#8A9EB0] uppercase font-semibold">Engineering Stack</div>
            <h3 className="text-[22px] font-semibold text-white mt-2">Built With Modern AI Engineering Stack</h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-80">
            <div className="flex items-center gap-2 text-base font-semibold text-white/90"><SiPytorch className="w-6 h-6 text-[#EE4C2C]"/> PyTorch</div>
            <div className="flex items-center gap-2 text-base font-semibold text-white/90">🦜🕸️ LangGraph</div>
            <div className="flex items-center gap-2 text-base font-semibold text-white/90">🦜🔗 LangChain</div>
            <div className="flex items-center gap-2 text-base font-semibold text-white/90"><SiFastapi className="w-6 h-6 text-[#009688]"/> FastAPI</div>
            <div className="flex items-center gap-2 text-base font-semibold text-white/90"><SiGooglecloud className="w-6 h-6 text-[#4285F4]"/> Google ADK</div>
            <div className="flex items-center gap-2 text-base font-semibold text-white/90"><SiTensorflow className="w-6 h-6 text-[#FF6F00]"/> TensorFlow</div>
            <div className="flex items-center gap-2 text-base font-semibold text-white/90"><SiDocker className="w-6 h-6 text-[#2496ED]"/> Docker</div>
            <div className="flex items-center gap-2 text-base font-semibold text-white/90"><SiAmazonwebservices className="w-6 h-6 text-white"/> AWS</div>
          </div>
        </div>
      </section>

      {/* INSIGHTS & COMMUNITY (SPLIT) */}
      <section className="section-pad bg-[#0A111F]">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Insights */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap justify-between items-end gap-4 mb-8 border-b border-white/10 pb-4">
                <div>
                  <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-2 font-semibold">Engineering Insights</div>
                  <h2 className="text-[26px] font-semibold text-white">Latest Engineering Insights</h2>
                  <p className="text-base text-[#8A9EB0] mt-1">Deep dives, tutorials and technical articles from our engineers.</p>
                </div>
                <Link href="/insights" className="font-mono text-[13px] text-[#00B8F0] font-semibold hover:text-white transition-colors">View All Insights →</Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-5">
                {/* Article 1 */}
                <div className="flex-1 group cursor-pointer flex flex-col">
                  <div className="h-[160px] bg-[#050B14] border border-white/10 rounded-xl mb-4 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#1E293B] to-transparent opacity-80" />
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-[#8A9EB0] mb-3">
                    <span>May 25, 2026</span>
                    <span className="w-1 h-1 rounded-full bg-white/20 block" />
                    <span>5 min read</span>
                  </div>
                  <h4 className="text-lg font-semibold leading-snug mb-2 text-white/90 group-hover:text-[#00B8F0] transition-colors">Hybrid Search for Enterprise RAG: BM25 + Vector Done Right</h4>
                  <p className="font-mono text-sm text-[#00B8F0] font-semibold mt-auto pt-3">Read More →</p>
                </div>

                {/* Article 2 */}
                <div className="flex-1 group cursor-pointer flex flex-col">
                  <div className="h-[160px] bg-[#050B14] border border-white/10 rounded-xl mb-4 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-bl from-[#1E3A8A] to-transparent opacity-80" />
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-[#8A9EB0] mb-3">
                    <span>May 18, 2026</span>
                    <span className="w-1 h-1 rounded-full bg-white/20 block" />
                    <span>10 min read</span>
                  </div>
                  <h4 className="text-lg font-semibold leading-snug mb-2 text-white/90 group-hover:text-[#00B8F0] transition-colors">LangGraph vs Google ADK: Choosing the Right Agent Framework</h4>
                  <p className="font-mono text-sm text-[#00B8F0] font-semibold mt-auto pt-3">Read More →</p>
                </div>

                {/* Article 3 */}
                <div className="flex-1 group cursor-pointer flex flex-col">
                  <div className="h-[160px] bg-[#050B14] border border-white/10 rounded-xl mb-4 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent opacity-80" />
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-[#8A9EB0] mb-3">
                    <span>May 10, 2026</span>
                    <span className="w-1 h-1 rounded-full bg-white/20 block" />
                    <span>8 min read</span>
                  </div>
                  <h4 className="text-lg font-semibold leading-snug mb-2 text-white/90 group-hover:text-[#00B8F0] transition-colors">Evaluating RAG Systems: Beyond Accuracy to Reliability</h4>
                  <p className="font-mono text-sm text-[#00B8F0] font-semibold mt-auto pt-3">Read More →</p>
                </div>
              </div>
            </div>

            {/* Right: Community */}
            <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/10 pt-10 lg:pt-0 lg:pl-12">
              <div className="mb-8">
                <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-2 font-semibold">Community & Events</div>
                <h2 className="text-[26px] font-semibold text-white">Join the AI Engineering Community</h2>
                <p className="text-base text-[#8A9EB0] mt-2">Meetups, workshops, reading clubs and our annual flagship event.</p>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00B8F0]/10 border border-[#00B8F0]/30 flex items-center justify-center text-[#00B8F0] flex-shrink-0 shadow-[0_0_15px_rgba(0,184,240,0.2)]">
                    <Ticket size={18} />
                  </div>
                  <div>
                    <h5 className="text-base font-semibold mb-1 text-white">AI Frontier 2026</h5>
                    <p className="text-sm text-[#8A9EB0]">The Future of AI Engineering</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00B8F0]/10 border border-[#00B8F0]/30 flex items-center justify-center text-[#00B8F0] flex-shrink-0 shadow-[0_0_15px_rgba(0,184,240,0.2)]">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h5 className="text-base font-semibold mb-1 text-white">Monthly Meetups</h5>
                    <p className="text-sm text-[#8A9EB0]">Connect. Learn. Build.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00B8F0]/10 border border-[#00B8F0]/30 flex items-center justify-center text-[#00B8F0] flex-shrink-0 shadow-[0_0_15px_rgba(0,184,240,0.2)]">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <h5 className="text-base font-semibold mb-1 text-white">Reading Club</h5>
                    <p className="text-sm text-[#8A9EB0]">Deep-reads. Better engineers.</p>
                  </div>
                </div>
              </div>

              <Link href="/community" className="font-mono text-[13px] text-[#00B8F0] font-semibold hover:text-white inline-block mb-10 transition-colors">Explore Community →</Link>

              {/* Promo Card */}
              <div className="bg-[#050B14] border border-[#00B8F0]/20 rounded-xl p-8 relative overflow-hidden text-white shadow-[0_0_30px_rgba(0,184,240,0.1)]">
                <div className="absolute inset-0 blueprint opacity-10 pointer-events-none" />
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#0066FF]/30 blur-3xl rounded-full" />
                <h4 className="text-[22px] font-bold mb-2 relative z-10 tracking-tight">AI FRONTIER<br/>2026</h4>
                <p className="text-sm text-[#8A9EB0] mb-6 relative z-10 max-w-[200px]">The Future of<br/>AI Engineering</p>
                <Link href="/community" className="btn bg-[#0066FF] hover:bg-[#0052CC] border-none text-white shadow-[0_0_15px_rgba(0,102,255,0.4)] text-[12px] px-5 py-2.5 relative z-10 rounded-lg">
                  Learn More →
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="bg-[#050B14] text-white relative py-[100px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050B14] z-0 pointer-events-none" />
        <div className="absolute bottom-[-50%] left-1/2 -translate-x-1/2 w-[100%] h-[100%] bg-[#00B8F0]/10 blur-[150px] rounded-[100%] pointer-events-none" />
        
        <div className="wrap text-center relative z-10">
          <div className="w-16 h-16 mx-auto mb-8 bg-gradient-to-b from-[#00B8F0] to-[#0066FF] p-[2px] rounded-full shadow-[0_0_30px_rgba(0,184,240,0.3)]">
            <div className="w-full h-full bg-[#050B14] rounded-full flex items-center justify-center">
              <Bot size={28} className="text-[#00B8F0]" />
            </div>
          </div>
          <h2 className="text-[clamp(32px,5vw,48px)] font-semibold mb-4 text-white">Let's Build AI That Makes An Impact</h2>
          <p className="text-[#8A9EB0] max-w-[500px] mx-auto mb-10 text-lg">
            Have a project in mind? Let's discuss how we can help you build it.
          </p>
          <Link href="/contact" className="btn bg-[#0066FF] hover:bg-[#0052CC] border-none text-white shadow-[0_0_15px_rgba(0,102,255,0.4)] font-semibold px-8 py-4 rounded-xl">
            Book a Discovery Call →
          </Link>
        </div>
      </section>
    </main>
  );
}
