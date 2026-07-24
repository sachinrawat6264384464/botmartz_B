"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface EventItem {
  id?: string;
  type: string;
  status: string;
  statusColor: string;
  title: string;
  desc: string;
  date: string;
  location: string;
  slug?: string;
}

const PROTOTYPE_EVENTS: EventItem[] = [
  { type: 'Meetup', status: 'Monthly', statusColor: '#0E9F6E', title: 'AI Engineering Meetup — Indore Chapter', desc: 'A monthly gathering for local AI engineers to share projects, talk shop, and swap production lessons.', date: 'Every 3rd Saturday', location: 'Indore, India' },
  { type: 'Meetup', status: 'Upcoming', statusColor: '#0E9F6E', title: 'Open Source Night: Contributing to LangGraph', desc: 'A hands-on evening picking up good-first-issues and pairing on real open-source contributions.', date: 'Sep 12, 2026 · 6:00 PM', location: 'Online' },
  { type: 'Hackathon', status: 'Upcoming', statusColor: '#0E9F6E', title: 'AI Frontier Hackathon 2026', desc: 'A weekend build sprint following the conference — teams ship an AI agent or RAG system from scratch.', date: 'Sep 26–27, 2026', location: 'Indore, India' },
  { type: 'Webinar', status: 'Upcoming', statusColor: '#0E9F6E', title: 'Enterprise RAG in Production', desc: 'A deep dive on evaluation, reranking, and guardrails for RAG systems that actually ship.', date: 'Oct 8, 2026 · 5:00 PM', location: 'Online' },
  { type: 'Meetup', status: 'Recurring', statusColor: '#0E9F6E', title: 'AI Engineering Reading Club', desc: 'A biweekly discussion group working through papers and technical blog posts shaping the field.', date: 'Every other Thursday', location: 'Discord' },
  { type: 'Conferences', status: 'Planning', statusColor: '#D97706', title: 'AI Frontier 2027 — Save the Date', desc: 'Planning is already underway for next year’s flagship conference. Theme announced later this year.', date: 'TBA 2027', location: 'Indore, India' },
];

const PROTOTYPE_PAST_EVENTS = [
  { type: 'Meetup', date: 'Jun 2026', title: 'AI Engineering Reading Club — Kickoff', desc: 'First session of the reading club, covering foundational agent architecture papers.' },
  { type: 'Webinar', date: 'May 2026', title: 'From Notebook to Production', desc: 'A practical session on taking ML prototypes into real production systems.' },
  { type: 'Meetup', date: 'Apr 2026', title: 'Botmartz Community Kickoff Mixer', desc: 'The very first informal meetup that planted the seed for this community.' },
];

export default function EventsClient({
  initialEvents,
  heroContent = {
    badge: "Botmartz Community Events",
    title: "Where the AI<br />Engineering <span class=\"text-[#00C6FF]\">Community</span> Meets",
    subtitle: "Conferences, monthly meetups, open-source nights and hackathons — built for engineers who want to build, ship and grow together, not just watch from the sidelines.",
    ctaText: "See What's Coming Up →",
    ctaLink: "#featured",
  },
  structuredData,
  aeoQuestion,
  aeoAnswer
}: {
  initialEvents: any[];
  heroContent?: any;
  structuredData?: string;
  aeoQuestion?: string;
  aeoAnswer?: string;
}) {
  const [filter, setFilter] = useState('All Events');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const categoryList = ['All Events', 'Conferences', 'Meetups', 'Hackathons', 'Webinars'];

  const heroStats = [
    { value: '6+', label: 'Events per Year' },
    { value: '1', label: 'Flagship Conference' },
    { value: '100+', label: 'Community Members' },
    { value: '2026', label: 'Community Launch' },
  ];

  const events: EventItem[] = useMemo(() => {
    if (initialEvents && initialEvents.length > 0) {
      return initialEvents.map(e => ({
        id: e.id,
        type: e.type || e.badge || 'Meetup',
        status: e.status || 'Upcoming',
        statusColor: e.statusColor || '#0E9F6E',
        title: e.title || 'Community Event',
        desc: e.shortDescription || e.description || e.desc || 'Join our upcoming AI engineering session.',
        date: e.date || 'Upcoming',
        location: e.location || 'Indore / Online',
        slug: e.slug || e.id
      }));
    }
    return PROTOTYPE_EVENTS;
  }, [initialEvents]);

  const visibleEvents: EventItem[] = useMemo(() => {
    if (filter === 'All Events') return events;
    const filterMap: Record<string, string> = { 'Conferences': 'Conferences', 'Meetups': 'Meetup', 'Hackathons': 'Hackathon', 'Webinars': 'Webinar' };
    const target = filterMap[filter] || filter;
    return events.filter(e => e.type.toLowerCase().includes(target.toLowerCase()) || target.toLowerCase().includes(e.type.toLowerCase()));
  }, [filter, events]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, "newsletter_subscribers"), {
        email,
        source: 'Events Page Subscription',
        createdAt: serverTimestamp()
      });
      setSubscribed(true);
    } catch (err) {
      console.error("Subscription error:", err);
      setSubscribed(true);
    }
    setSubmitting(false);
  };

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Botmartz Community Events & Conferences",
    "description": "Where the AI Engineering Community meets: conferences, monthly meetups, open-source build nights, and hackathons.",
    "url": "https://www.botmartz.com/community/events",
    "mainEntity": {
      "@type": "Event",
      "name": "AI Frontier 2026 — The Future of AI Engineering",
      "startDate": "2026-08-22T10:00:00+05:30",
      "endDate": "2026-08-22T17:00:00+05:30",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "Indore, India",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Indore",
          "addressCountry": "IN"
        }
      },
      "description": "Agents, Enterprise AI, AI-Assisted Development, and Responsible AI. A full day of sessions, fireside Q&As, and closing panels plus the launch of the Botmartz AI Engineering Community.",
      "organizer": {
        "@type": "Organization",
        "name": "Botmartz",
        "url": "https://www.botmartz.com"
      }
    }
  };

  return (
    <div className="bg-[#F5F8FC] min-h-screen font-sans text-[#0B1220]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredData ? structuredData : JSON.stringify(defaultSchema)
        }}
      />
      {/* ── HERO SECTION ── */}
      <div className="bg-[#060C1F] relative overflow-hidden pt-24 pb-16 px-6 sm:px-10 lg:pt-28 lg:pb-20">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,198,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,198,255,0.06) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 65% 30%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 65% 30%, black, transparent)'
          }}
        />
        <div className="relative max-w-[1240px] mx-auto">
          <div className="font-semibold text-[12.5px] text-[#5B6B85] mb-6 tracking-wide flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <Link href="/community" className="hover:text-white transition-colors">Community</Link>
            <span>›</span>
            <span className="text-[#00C6FF]">Events</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div>
              <div className="font-bold text-[12px] tracking-[0.1em] text-[#00C6FF] uppercase">
                {heroContent.badge || "Botmartz Community Events"}
              </div>
              <h1
                className="font-extrabold text-[clamp(32px,4.5vw,44px)] leading-[1.15] text-white mt-4"
                dangerouslySetInnerHTML={{ __html: heroContent.title || 'Where the AI<br />Engineering <span class="text-[#00C6FF]">Community</span> Meets' }}
              />
              <p className="font-medium text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#8FA3C4] mt-4.5 max-w-[480px]">
                {heroContent.subtitle || "Conferences, monthly meetups, open-source nights and hackathons — built for engineers who want to build, ship and grow together, not just watch from the sidelines."}
              </p>
              <div className="flex flex-wrap gap-3.5 mt-7">
                <a
                  href={heroContent.ctaLink || "#featured"}
                  className="inline-flex items-center gap-2 bg-[#007BFF] hover:bg-[#0069DB] text-white font-bold text-[14px] px-6 py-3.5 rounded-[9px] shadow-[0_8px_24px_rgba(0,123,255,0.35)] transition-all"
                >
                  {heroContent.ctaText || "See What's Coming Up →"}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold text-[14px] px-6 py-3.5 rounded-[9px] transition-all"
                >
                  Host an Event With Us
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {heroStats.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-white/[0.04] border border-white/10 rounded-[14px] p-5 backdrop-blur-sm"
                >
                  <div className="font-extrabold text-[26px] sm:text-[30px] text-[#00C6FF] leading-none">
                    {s.value}
                  </div>
                  <div className="font-semibold text-[12px] sm:text-[13px] text-[#8FA3C4] mt-1.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── FILTER BAR ── */}
      <div className="max-w-[1240px] mx-auto pt-9 px-6 sm:px-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categoryList.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-bold text-[12.5px] px-4 py-2.5 rounded-[8px] border transition-all ${active
                    ? 'bg-[#007BFF] border-[#007BFF] text-white shadow-sm'
                    : 'bg-white border-[#E2E8F0] text-[#3A4459] hover:bg-[#F8FAFC]'
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
        <div className="font-semibold text-[12.5px] text-[#5B6B85]">
          Sort by: Upcoming ▾
        </div>
      </div>

      {/* ── FEATURED CONFERENCE CARD ── */}
      <div id="featured" className="max-w-[1240px] mx-auto pt-8 px-6 sm:px-10">
        <div className="bg-gradient-to-br from-[#0A1630] to-[#060C1F] border border-white/10 rounded-[18px] overflow-hidden grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] relative shadow-xl">
          <div
            className="absolute w-[320px] h-[320px] rounded-full right-[-60px] top-[-100px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0,123,255,0.22), transparent 70%)' }}
          />
          <div className="p-7 sm:p-10 relative z-10 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="font-bold text-[10.5px] tracking-[0.06em] text-[#00C6FF] bg-[#00C6FF]/10 px-2.5 py-1 rounded-[5px] uppercase">
                  Flagship Conference
                </span>
                <span className="font-bold text-[10.5px] tracking-[0.06em] text-[#0E9F6E] bg-[#0E9F6E]/15 px-2.5 py-1 rounded-[5px] uppercase">
                  Upcoming
                </span>
              </div>
              <h2 className="font-extrabold text-[24px] sm:text-[28px] leading-[1.3] text-white mt-4">
                AI Frontier 2026 — The Future of AI Engineering
              </h2>
              <p className="font-medium text-[13.5px] sm:text-[14px] leading-[1.7] text-[#8FA3C4] mt-3 max-w-[480px]">
                Agents · Enterprise AI · AI-Assisted Development · Responsible AI. A full day of sessions, a fireside Q&amp;A and a closing panel on building an AI engineering career — plus the launch of the Botmartz AI Engineering Community.
              </p>

              <div className="flex flex-wrap gap-6 mt-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-[8px] bg-[#00C6FF]/10 flex items-center justify-center font-bold text-[11px] text-[#00C6FF]">
                    22
                  </div>
                  <div>
                    <div className="font-bold text-[12.5px] text-white">Aug 22, 2026</div>
                    <div className="font-medium text-[11px] text-[#7C8CAD]">10:00 AM – 5:00 PM</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-[8px] bg-[#00C6FF]/10 flex items-center justify-center font-bold text-[11px] text-[#00C6FF]">
                    ◎
                  </div>
                  <div>
                    <div className="font-bold text-[12.5px] text-white">Indore, India</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-7 pt-4">
              <Link
                href="/community/events/ai-frontier-2026"
                className="bg-[#007BFF] hover:bg-[#0069DB] text-white font-bold text-[13px] px-6 py-3.5 rounded-[9px] shadow-md transition-all"
              >
                Register Your Interest →
              </Link>
              <Link
                href="/community/events/ai-frontier-2026"
                className="bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold text-[13px] px-6 py-3.5 rounded-[9px] transition-all"
              >
                View Event Page
              </Link>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-center p-6 bg-black/20 lg:bg-transparent min-h-[220px]">
            <svg width="90%" height="220" viewBox="0 0 320 220" className="overflow-visible">
              <line x1="160" y1="40" x2="60" y2="120" stroke="rgba(0,198,255,0.35)" strokeWidth="1.5"></line>
              <line x1="160" y1="40" x2="260" y2="120" stroke="rgba(0,198,255,0.35)" strokeWidth="1.5"></line>
              <line x1="160" y1="40" x2="110" y2="200" stroke="rgba(0,198,255,0.22)" strokeWidth="1.5"></line>
              <line x1="160" y1="40" x2="210" y2="200" stroke="rgba(0,198,255,0.22)" strokeWidth="1.5"></line>
              <circle cx="160" cy="40" r="9" fill="#00C6FF"></circle>
              <circle cx="60" cy="120" r="6" fill="#007BFF"></circle>
              <circle cx="260" cy="120" r="6" fill="#007BFF"></circle>
              <circle cx="110" cy="200" r="5" fill="#00E6FF"></circle>
              <circle cx="210" cy="200" r="5" fill="#00E6FF"></circle>
            </svg>
          </div>
        </div>
      </div>

      {/* ── FLAGSHIP EVENT FLOW & GOLDEN THREAD PREVIEW ── */}
      <div className="max-w-[1240px] mx-auto pt-10 px-6 sm:px-10">
        <div className="bg-white border border-[#E7ECF3] rounded-[18px] p-7 sm:p-9 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EEF1F6] pb-6 mb-6">
            <div>
              <div className="font-bold text-xs tracking-[0.12em] text-[#007BFF] uppercase">
                AI Frontier 2026 Flow
              </div>
              <h3 className="font-extrabold text-[22px] sm:text-[26px] text-[#0B1220] mt-1.5">
                The Golden Thread Run of Show
              </h3>
              <p className="font-medium text-[13.5px] text-[#5B6B85] mt-1">
                Every session answers one step along the production AI journey. Four pillars (`Agents`, `Enterprise AI`, `AI-Assisted Dev`, `Responsible AI`), one unified lifecycle.
              </p>
            </div>
            <Link
              href="/community/events/ai-frontier-2026#agenda"
              className="inline-flex items-center gap-1.5 font-bold text-[13px] text-[#007BFF] hover:text-[#0052CC] shrink-0"
            >
              Explore Full Agenda &amp; Speakers →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#FCE7F3]/50 border border-[#FBCFE8] rounded-xl p-4.5 flex flex-col justify-between">
              <div>
                <span className="font-mono font-bold text-[11px] text-[#EC4899] bg-[#FCE7F3] px-2.5 py-1 rounded">
                  09:45 AM · 15 mins
                </span>
                <div className="font-bold text-[15px] text-[#0B1220] mt-2.5">
                  Anchoring &amp; Kickoff
                </div>
                <p className="font-medium text-[12.5px] text-[#5B6B85] mt-1 leading-[1.5]">
                  Setting the stage, energy, and crowd coordination for the entire event.
                </p>
              </div>
              <div className="font-bold text-[12px] text-[#BE185D] mt-3 pt-3 border-t border-[#FBCFE8]/60">
                Vaidehi &amp; Yash
              </div>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4.5 flex flex-col justify-between">
              <div>
                <span className="font-mono font-bold text-[11px] text-[#007BFF] bg-[#E8F2FF] px-2.5 py-1 rounded">
                  10:15 AM · 15 mins
                </span>
                <div className="font-bold text-[15px] text-[#0B1220] mt-2.5">
                  Welcome: Set the Frame
                </div>
                <p className="font-medium text-[12.5px] text-[#5B6B85] mt-1 leading-[1.5]">
                  Why does AI engineering matter? Framing the journey from raw LLM calls to production systems.
                </p>
              </div>
              <div className="font-bold text-[12px] text-[#3A4459] mt-3 pt-3 border-t border-[#EEF1F6]">
                Soham Sharma
              </div>
            </div>

            <div className="bg-[#F3E8FF]/50 border border-[#E9D5FF] rounded-xl p-4.5 flex flex-col justify-between">
              <div>
                <span className="font-mono font-bold text-[11px] text-[#7C3AED] bg-[#F1EBFE] px-2.5 py-1 rounded">
                  10:30 AM · 75 mins
                </span>
                <div className="font-bold text-[15px] text-[#0B1220] mt-2.5">
                  Keynote &amp; Flagship Deep Dive
                </div>
                <p className="font-medium text-[12.5px] text-[#5B6B85] mt-1 leading-[1.5]">
                  Where is AI heading? Rigorous look at foundation models, reasoning architectures, coding agents &amp; evals.
                </p>
              </div>
              <div className="font-bold text-[12px] text-[#4C1D95] mt-3 pt-3 border-t border-[#E9D5FF]/60">
                Dr. Promit Ray
              </div>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4.5 flex flex-col justify-between">
              <div>
                <span className="font-mono font-bold text-[11px] text-[#D97706] bg-[#FEF3E2] px-2.5 py-1 rounded">
                  12:00 PM · 60 mins
                </span>
                <div className="font-bold text-[15px] text-[#0B1220] mt-2.5">
                  Workshop Part 1
                </div>
                <p className="font-medium text-[12.5px] text-[#5B6B85] mt-1 leading-[1.5]">
                  Build Your First AI Agent: EdTech RAG Case Study. Hand-on orchestrating pipelines.
                </p>
              </div>
              <div className="font-bold text-[12px] text-[#3A4459] mt-3 pt-3 border-t border-[#EEF1F6]">
                Harsh Sahu
              </div>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4.5 flex flex-col justify-between">
              <div>
                <span className="font-mono font-bold text-[11px] text-[#D97706] bg-[#FEF3E2] px-2.5 py-1 rounded">
                  02:00 PM · 60 mins
                </span>
                <div className="font-bold text-[15px] text-[#0B1220] mt-2.5">
                  Workshop Part 2
                </div>
                <p className="font-medium text-[12.5px] text-[#5B6B85] mt-1 leading-[1.5]">
                  Evaluation, memory &amp; deployment. Rig up testing harnesses for our tutor agent.
                </p>
              </div>
              <div className="font-bold text-[12px] text-[#3A4459] mt-3 pt-3 border-t border-[#EEF1F6]">
                Harsh Sahu
              </div>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-[#EEF1F6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px]">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-[#0E9F6E] bg-[#E4F8EF] px-2.5 py-1 rounded">
                03:00 PM · AI Engineering Journey
              </span>
              <span className="font-medium text-[#5B6B85]">
                Roadmap to production mindset &amp; community launch (Soham Sharma)
              </span>
            </div>
            <div className="font-mono font-bold text-[#007BFF] bg-[#E8F2FF] px-3 py-1 rounded-full shrink-0">
              Open AMA &amp; Networking: 03:25 – 04:00 PM
            </div>
          </div>
        </div>
      </div>

      {/* ── MORE FROM THE COMMUNITY ── */}
      <div className="max-w-[1240px] mx-auto pt-14 px-6 sm:px-10">
        <div className="font-bold text-[12px] tracking-[0.1em] text-[#007BFF] uppercase">
          More From the Community
        </div>
        <div className="font-extrabold text-[26px] sm:text-[28px] text-[#0B1220] mt-2">
          Meetups, Build Nights &amp; What's Next
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto pt-6 px-6 sm:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleEvents.map((ev, idx) => (
          <div
            key={idx}
            className="bg-white border border-[#E7ECF3] rounded-[14px] p-6 flex flex-col gap-2.5 shadow-sm hover:shadow-md transition-all hover:border-[#007BFF]/40"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-[10px] tracking-[0.05em] text-[#007BFF] bg-[#E8F2FF] px-2.5 py-1 rounded-[5px] uppercase">
                {ev.type}
              </span>
              <span className="font-bold text-[11px]" style={{ color: ev.statusColor || '#0E9F6E' }}>
                {ev.status}
              </span>
            </div>
            <div className="font-bold text-[16px] leading-[1.35] text-[#0B1220] mt-1">
              {ev.title}
            </div>
            <div className="font-medium text-[12.5px] sm:text-[13px] leading-[1.55] text-[#5B6B85] flex-1">
              {ev.desc}
            </div>
            <div className="flex flex-col gap-1 mt-2 pt-3 border-t border-[#EEF1F6]">
              <div className="font-semibold text-[12px] text-[#3A4459]">
                {ev.date}
              </div>
              <div className="font-medium text-[11.5px] text-[#8A97AC] mb-3">
                {ev.location}
              </div>
              {ev.slug ? (
                <Link
                  href={`/community/events/${ev.slug}`}
                  className="mt-1 text-center bg-[#007BFF] hover:bg-[#0069DB] text-white font-bold text-[12.5px] py-2 rounded-lg transition-all"
                >
                  Register / View Details
                </Link>
              ) : (
                <button
                  disabled
                  className="mt-1 text-center bg-gray-200 text-gray-400 font-bold text-[12.5px] py-2 rounded-lg cursor-not-allowed"
                >
                  Details Coming Soon
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── THIS IS JUST THE BEGINNING & NEWSLETTER BOX ── */}
      <div className="max-w-[1240px] mx-auto mt-16 px-6 sm:px-10">
        <div className="bg-[#060C1F] rounded-[18px] p-8 sm:p-11 relative overflow-hidden shadow-xl">
          <div
            className="absolute w-[300px] h-[300px] rounded-full left-[-80px] bottom-[-120px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0,123,255,0.2), transparent 70%)' }}
          />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div>
              <span className="inline-block font-bold text-[10.5px] tracking-[0.06em] text-[#00C6FF] bg-[#00C6FF]/12 px-2.5 py-1 rounded-[5px] uppercase">
                This Is Just the Beginning
              </span>
              <div className="font-extrabold text-[24px] sm:text-[26px] leading-[1.3] text-white mt-3.5">
                AI Frontier Is Day One of the Botmartz AI Engineering Community
              </div>
              <p className="font-medium text-[13px] sm:text-[13.5px] leading-[1.7] text-[#8FA3C4] mt-3 max-w-[480px]">
                Every event feeds a bigger ecosystem — monthly meetups, a Discord, an open-source GitHub org, a reading club, and hackathons, all year round.
              </p>
              <div className="flex flex-wrap gap-2.5 mt-5">
                {['Meetups', 'Discord', 'GitHub Org', 'Reading Club', 'Hackathons'].map((tag) => (
                  <span key={tag} className="font-semibold text-[12px] text-[#C7D6EE] bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white/[0.04] border border-white/10 rounded-[16px] p-6 sm:p-7 backdrop-blur-sm">
              <div className="font-bold text-[14px] text-white">
                Never miss an event
              </div>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 mt-3.5">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 min-w-0 border border-white/15 bg-white/5 rounded-[8px] px-3.5 py-3 font-medium text-[13px] text-white placeholder-[#7C8CAD] outline-none focus:border-[#00C6FF] transition-colors"
                />
                <button
                  type="submit"
                  disabled={submitting || subscribed}
                  className="bg-[#007BFF] hover:bg-[#0069DB] text-white border-none rounded-[8px] px-5 py-3 font-bold text-[13px] shrink-0 transition-colors cursor-pointer"
                >
                  {subscribed ? 'Subscribed ✓' : (submitting ? 'Sending...' : 'Notify Me')}
                </button>
              </form>
              <div className="font-medium text-[11px] text-[#7C8CAD] mt-2.5">
                Get notified about new meetups, hackathons and conferences.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PAST EVENTS ── */}
      <div className="max-w-[1240px] mx-auto my-14 pb-22 px-6 sm:px-10">
        <div className="font-bold text-[12px] tracking-[0.1em] text-[#007BFF] uppercase mb-4">
          Past Events
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROTOTYPE_PAST_EVENTS.map((p, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E7ECF3] rounded-[12px] p-5 flex flex-col gap-1.5 opacity-85 shadow-sm"
            >
              <span className="font-bold text-[9.5px] tracking-[0.05em] text-[#8A97AC] uppercase">
                {p.type} · {p.date}
              </span>
              <div className="font-bold text-[14px] text-[#0B1220] mt-0.5">
                {p.title}
              </div>
              <div className="font-medium text-[12px] leading-[1.5] text-[#5B6B85]">
                {p.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
