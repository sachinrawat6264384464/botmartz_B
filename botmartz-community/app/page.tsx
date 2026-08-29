import React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Calendar, 
  Users, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  Cpu, 
  Flame, 
  MapPin, 
  Clock,
  Ticket,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { adminDb } from "@/lib/firebase-admin";

export const revalidate = 60; // ISR 1 min

async function getCommunityData() {
  let events: any[] = [];
  let workshops: any[] = [];

  try {
    const eventsSnap = await adminDb.collection("events").where("status", "==", "upcoming").limit(4).get();
    events = eventsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {}

  try {
    const bootcampsSnap = await adminDb.collection("bootcamps").limit(4).get();
    workshops = bootcampsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {}

  return { events, workshops };
}

export default async function CommunityHomePage() {
  const { events, workshops } = await getCommunityData();

  return (
    <div className="bg-[#050B14] text-white">
      
      {/* ── 1. HERO SECTION ── */}
      <section className="relative pt-20 pb-28 overflow-hidden border-b border-white/10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/15 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0052FF]/20 blur-[180px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 text-[#00B8F0] font-mono text-xs uppercase tracking-widest mb-6 font-semibold">
            <Sparkles size={13} className="text-[#00F0FF]" /> The Developer &amp; AI Builder Ecosystem
          </div>

          <h1 className="text-[clamp(40px,5.5vw,72px)] font-bold tracking-tight leading-[1.08] max-w-4xl mb-6">
            Where AI Engineers, <br />
            <span className="bg-gradient-to-r from-[#00B8F0] via-[#0066FF] to-[#60A5FA] bg-clip-text text-transparent">
              Researchers &amp; Builders Connect.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#8A9EB0] max-w-2xl leading-relaxed mb-10">
            Join thousands of developers across cutting-edge AI conferences, hands-on RAG and Agent workshops, open-source hackathons, and verifiable technical certifications.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/events/ai-frontier-2026"
              className="inline-flex items-center gap-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white px-7 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-[0_4px_25px_rgba(0,102,255,0.4)]"
            >
              <Ticket size={16} /> Register for AI Frontier 2026 <ArrowRight size={16} />
            </Link>
            <Link
              href="/workshops"
              className="inline-flex items-center gap-2 border border-slate-700 text-white hover:border-[#00B8F0] hover:text-[#00B8F0] px-7 py-3.5 rounded-xl text-sm font-semibold transition-all hover:bg-white/5"
            >
              Explore AI Bootcamps ↓
            </Link>
          </div>

          {/* Key Community Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/10">
            <div>
              <div className="text-3xl font-bold font-mono text-white mb-1">5,000+</div>
              <div className="text-xs text-[#8A9EB0]">Community Builders</div>
            </div>
            <div>
              <div className="text-3xl font-bold font-mono text-[#00B8F0] mb-1">15+</div>
              <div className="text-xs text-[#8A9EB0]">Meetups &amp; Conferences</div>
            </div>
            <div>
              <div className="text-3xl font-bold font-mono text-white mb-1">1,200+</div>
              <div className="text-xs text-[#8A9EB0]">Issued Certificates</div>
            </div>
            <div>
              <div className="text-3xl font-bold font-mono text-[#60A5FA] mb-1">100%</div>
              <div className="text-xs text-[#8A9EB0]">Hands-on Engineering</div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. FEATURED CONFERENCE: AI FRONTIER ── */}
      <section className="py-20 bg-[#070E1B] border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#0B1524] border border-[#00B8F0]/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0066FF]/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-mono font-bold uppercase mb-4">
                  <Flame size={13} /> Flagship AI Conference
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  AI Frontier 2026: The Production AI Summit
                </h2>
                <p className="text-slate-300 text-sm sm:text-base mb-6 leading-relaxed">
                  Join researchers, AI founders, and senior engineers for deep dives into Enterprise RAG, LangGraph Agent State Machines, Multi-modal Retrieval, and Hardware Acceleration.
                </p>

                <div className="flex flex-wrap gap-6 text-xs text-slate-400 font-mono mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={15} className="text-[#00B8F0]" />
                    <span>Annual Flagship Edition</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={15} className="text-[#00B8F0]" />
                    <span>Hybrid / Global Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ticket size={15} className="text-[#00B8F0]" />
                    <span>Limited Seating Pass</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full sm:w-auto">
                <Link
                  href="/events/ai-frontier-2026"
                  className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-8 py-4 rounded-xl font-bold text-sm text-center shadow-lg transition-all"
                >
                  Get Tickets &amp; Agenda →
                </Link>
                <Link
                  href="/certificates"
                  className="text-center text-xs font-mono text-[#00B8F0] hover:text-white py-2"
                >
                  Verify Past Event Certificate ↗
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── 3. UPCOMING EVENTS & MEETUPS ── */}
      <section className="py-24 bg-[#050B14] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="font-mono text-xs text-[#00B8F0] uppercase tracking-wider font-semibold mb-2">CALENDAR</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Upcoming Events &amp; Meetups</h2>
            </div>
            <Link href="/events" className="text-xs font-mono text-[#00B8F0] hover:text-white flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* AI Frontier */}
            <div className="bg-[#091222] border border-white/10 rounded-2xl p-6 hover:border-[#00B8F0]/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                  <span className="px-2.5 py-1 rounded bg-[#0066FF]/20 text-[#60A5FA] font-bold">CONFERENCE</span>
                  <span>Flagship</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">AI Frontier 2026 Summit</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  Keynotes, architecture teardowns, live agent benchmarks, and networking with top AI builders.
                </p>
              </div>
              <Link
                href="/events/ai-frontier-2026"
                className="inline-flex items-center justify-between w-full pt-4 border-t border-white/10 text-xs font-mono text-[#00B8F0] hover:text-white font-bold"
              >
                <span>Book Pass</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* AI Accelerator Workshop */}
            <div className="bg-[#091222] border border-white/10 rounded-2xl p-6 hover:border-[#00B8F0]/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold">BOOTCAMP</span>
                  <span>Cohort 04</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Hands-on AI Agent Accelerator</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  Build production RAG pipelines, LangGraph state machines, and evaluation harnesses in 2 intensive days.
                </p>
              </div>
              <Link
                href="/workshops"
                className="inline-flex items-center justify-between w-full pt-4 border-t border-white/10 text-xs font-mono text-[#00B8F0] hover:text-white font-bold"
              >
                <span>View Syllabus</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Certificate Verification Portal */}
            <div className="bg-[#091222] border border-white/10 rounded-2xl p-6 hover:border-[#00B8F0]/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                  <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 font-bold">PORTAL</span>
                  <span>Instant</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Certificate Verification Hub</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  Verify credential authenticity or download official digital PDF passes for past cohorts and events.
                </p>
              </div>
              <Link
                href="/certificates"
                className="inline-flex items-center justify-between w-full pt-4 border-t border-white/10 text-xs font-mono text-[#00B8F0] hover:text-white font-bold"
              >
                <span>Verify Credentials</span>
                <ArrowRight size={14} />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ── 4. QUICK ACTION BAR ── */}
      <section className="py-16 bg-[#070E1B] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Are you organizing an AI event or looking to collaborate?
          </h2>
          <p className="text-sm text-slate-400 mb-8">
            Connect with our community leads for speaker sessions, hackathon judging, venue sponsorships, or custom cohort workshops.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/gallery"
              className="px-6 py-3 rounded-xl bg-[#0B1524] border border-white/10 text-xs font-mono font-bold text-white hover:border-[#00B8F0]"
            >
              Explore Community Gallery ↗
            </Link>
            <Link
              href="/event-desk"
              className="px-6 py-3 rounded-xl bg-[#0066FF] text-xs font-mono font-bold text-white hover:bg-[#0052CC]"
            >
              Staff Check-in Desk ↗
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
