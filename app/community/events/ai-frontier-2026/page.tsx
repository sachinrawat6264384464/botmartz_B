import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Calendar, MapPin, Users, Download, MonitorPlay, 
  Settings, Users2, Shield, Network, BrainCircuit, Activity,
  ChevronDown, ArrowRight, CheckCircle2,
  BookOpen, Presentation, Database, Trees,
  Mic, Code2, Lightbulb, Globe
} from 'lucide-react';
import { 
  SiAmazonwebservices, SiGooglecloud, SiNvidia, SiMongodb, 
  SiLangchain, SiHuggingface, SiGithub, SiPytorch
} from 'react-icons/si';

// ─── SEO METADATA ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'AI Frontier 2026 — The Future of AI Engineering | Botmartz',
  description: 'Join AI Frontier 2026 — Botmartz\'s flagship AI Engineering Summit on May 24–25, 2026 at Bangalore, India. Learn from AI engineers, researchers, and founders. Sessions on AI Agents, Enterprise RAG, LLMs, Responsible AI & more.',
  keywords: [
    'AI Frontier 2026',
    'AI Engineering Summit Bangalore',
    'AI conference India 2026',
    'AI Agents conference',
    'Enterprise RAG event',
    'LLM conference 2026',
    'Botmartz AI event',
    'AI engineering community',
    'production AI systems',
    'AI Frontier by Botmartz'
  ],
  openGraph: {
    type: 'website',
    title: 'AI Frontier 2026 — The Future of AI Engineering',
    description: 'The flagship AI Engineering Summit by Botmartz. May 24–25, 2026 · Bangalore, India. AI Agents, Enterprise RAG, LLMs, Responsible AI.',
    url: 'https://botmartz.com/community/events/ai-frontier-2026',
    siteName: 'Botmartz',
    images: [{ url: '/BotmartznewBot.png', width: 1200, height: 630, alt: 'AI Frontier 2026 Event Banner' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Frontier 2026 — The Future of AI Engineering',
    description: 'Botmartz\'s flagship AI Engineering Summit. May 24–25, 2026 · Bangalore, India.',
    images: ['/BotmartznewBot.png'],
  },
  alternates: {
    canonical: 'https://botmartz.com/community/events/ai-frontier-2026',
  },
};

// ─── EVENT STRUCTURED DATA (JSON-LD) ─────────────────────────────────────────
// This is critical for Google's Event rich results, GenAI / AI Overviews, and GEO
const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'AI Frontier 2026 — The Future of AI Engineering',
  url: 'https://botmartz.com/community/events/ai-frontier-2026',
  description:
    'AI Frontier 2026 is Botmartz\'s flagship AI Engineering Summit bringing together engineers, researchers, founders, and tech leaders to explore the frontiers of AI: Agents, Enterprise RAG, LLMs, Responsible AI, and AI-Assisted Development.',
  startDate: '2026-05-24T09:00:00+05:30',
  endDate: '2026-05-25T18:00:00+05:30',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'The Leela Palace Bangalore',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '23 Kodihalli, Old Airport Road',
      addressLocality: 'Bangalore',
      addressRegion: 'Karnataka',
      postalCode: '560008',
      addressCountry: 'IN',
    },
  },
  image: 'https://botmartz.com/BotmartznewBot.png',
  organizer: {
    '@type': 'Organization',
    name: 'Botmartz',
    url: 'https://botmartz.com',
  },
  offers: {
    '@type': 'Offer',
    name: 'General Admission',
    url: 'https://botmartz.com/contact',
    availability: 'https://schema.org/InStock',
    validFrom: '2026-01-01',
  },
  performer: [
    {
      '@type': 'Person',
      name: 'Karan',
      jobTitle: 'AI Systems Engineer',
    },
    {
      '@type': 'Person',
      name: 'Promit',
      jobTitle: 'AI Researcher & Engineering Leader',
    },
  ],
  about: [
    'AI Agents',
    'Enterprise RAG',
    'Large Language Models',
    'MLOps',
    'Responsible AI',
    'AI-Assisted Development',
    'Production AI Engineering',
  ],
};

// ─── FAQ STRUCTURED DATA (for AEO / Answer Engine Optimization) ──────────────
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who can attend AI Frontier 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI Frontier 2026 is designed for AI engineers, software engineers, researchers, technical leads, founders, and engineering managers who want to explore the frontier of AI engineering. Students with a strong interest in production AI systems are also welcome.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is prior AI knowledge required to attend AI Frontier?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A basic understanding of software engineering and general interest in AI is helpful. Sessions range from architecture-level talks to hands-on labs. There is no requirement to have prior experience with specific AI frameworks like PyTorch or LangGraph, though familiarity helps you get more out of the technical sessions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will the AI Frontier sessions be recorded?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Registered attendees will receive early access to session recordings after the event. Each session — from the keynote to the closing panel — will be edited into full-length videos and shorter highlight clips.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is included in the AI Frontier 2026 ticket?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your ticket includes access to all main stage sessions, hands-on labs, the AI Startup Showcase, the closing panel discussion, the AI Builders Night after-party, a copy of the AI Engineering Roadmap 2026 handbook, a swag kit, a certificate of participation, and access to the Botmartz AI Engineering Community.',
      },
    },
    {
      '@type': 'Question',
      name: 'When and where is AI Frontier 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI Frontier 2026 takes place on May 24–25, 2026 at The Leela Palace, Bangalore, India.',
      },
    },
    {
      '@type': 'Question',
      name: 'What topics are covered at AI Frontier 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI Frontier 2026 covers: Engineering Production AI Systems, AI Agents & Automation, Enterprise RAG, LangGraph, LLMs and Generative AI Applications, AI-Assisted Development, MLOps & Observability, Responsible AI & Safety, open-source AI, and AI engineering career advice.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there group discounts for AI Frontier?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Group and corporate rates are available for teams of 5 or more. Enterprise roundtable seats for CTOs, founders, and engineering managers are also available. Contact us at botmartz.com/contact for group pricing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Botmartz AI Engineering Community?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Botmartz AI Engineering Community is a long-term ecosystem launched at AI Frontier 2026. It includes monthly technical meetups, a Discord server, a newsletter, a GitHub organization, open-source contribution nights, reading clubs, and hackathons for AI engineers and researchers.',
      },
    },
  ],
};

// ─── FAQ DATA for UI rendering ────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Who can attend AI Frontier 2026?',
    a: 'AI Frontier 2026 is designed for AI engineers, software engineers, researchers, technical leads, founders, and engineering managers. Students with a strong interest in production AI systems are also welcome. This is an AI engineering summit, not a beginner workshop.',
  },
  {
    q: 'Is prior AI knowledge required?',
    a: 'A general interest in software engineering and AI is helpful. Sessions span from high-level architecture talks to hands-on labs. No specific framework experience (like PyTorch or LangGraph) is required, though it helps you get the most from the technical sessions.',
  },
  {
    q: 'Will the sessions be recorded?',
    a: 'Yes. Registered attendees get early access to full session recordings. Each session will also be cut into highlight clips, blog posts, and LinkedIn content — part of our Content Multiplication plan.',
  },
  {
    q: 'What\'s included in the ticket?',
    a: 'Two days of sessions, hands-on labs, the AI Startup Showcase, the closing panel, AI Builders Night after-party, the AI Engineering Roadmap 2026 handbook (a 30–50 page premium asset), a swag kit, certificate of participation, and access to the Botmartz AI Engineering Community.',
  },
  {
    q: 'When and where is AI Frontier 2026?',
    a: 'AI Frontier 2026 is on May 24–25, 2026 at The Leela Palace, Bangalore, India.',
  },
  {
    q: 'What topics will be covered?',
    a: 'Topics include: Engineering Production AI Systems, AI Agents & LangGraph, Enterprise RAG, LLMs & Generative AI, AI-Assisted Development, MLOps & Observability, Responsible AI, open-source AI contribution, and an AI Engineering career roadmap for 2026.',
  },
  {
    q: 'Are there group or corporate discounts?',
    a: 'Yes. Group rates are available for teams of 5 or more. We also offer an exclusive Enterprise Roundtable (limited to 10 founders, 5 CTOs, 3 engineering managers) immediately after the main event. Contact us for details.',
  },
  {
    q: 'What is the Botmartz AI Engineering Community?',
    a: 'A long-term ecosystem launching at AI Frontier 2026: monthly technical meetups, Discord server, newsletter, GitHub org, open-source nights, reading clubs, and hackathons. The event is the beginning — not a standalone day.',
  },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function AIFrontierPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="bg-paper min-h-screen">

        {/* ══════════ HERO ══════════ */}
        <section className="relative pt-[140px] pb-[80px] bg-[#050B14] text-white overflow-hidden border-b border-white/10" aria-label="Event hero">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="wrap relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-[#00B8F0]/10 border border-[#00B8F0]/30 rounded-full px-4 py-1.5 mb-6">
                  <span className="w-1.5 h-1.5 bg-[#00B8F0] rounded-full animate-pulse" />
                  <span className="font-mono text-[10px] tracking-[0.14em] text-[#00B8F0] uppercase font-semibold">Flagship Event · Botmartz</span>
                </div>
                <h1 className="text-[clamp(42px,6vw,76px)] font-bold mb-4 tracking-tight text-white leading-[1.08]">
                  AI <span className="text-[#00B8F0]">Frontier</span> 2026
                </h1>
                <h2 className="text-[20px] font-semibold text-white/80 mb-4 tracking-wide">The Future of AI Engineering</h2>
                <p className="text-[15px] text-[#8A9EB0] leading-relaxed mb-4 max-w-[500px] italic font-medium">
                  "Agents · Enterprise AI · AI-Assisted Development · Responsible AI"
                </p>
                <p className="text-[16px] text-[#8A9EB0] leading-relaxed mb-10 max-w-[500px]">
                  AI Frontier is Botmartz&apos;s flagship annual AI Engineering Summit — bringing together engineers, researchers, founders, and tech leaders to explore the frontier of AI and build what&apos;s next.
                </p>
                
                <div className="flex flex-wrap gap-6 mb-10 text-sm font-medium text-white/90">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-5 h-5 text-[#00B8F0] flex-shrink-0" />
                    <div>
                      <div className="font-semibold">24 – 25 May, 2026</div>
                      <div className="text-xs text-[#8A9EB0]">Saturday – Sunday</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-5 h-5 text-[#00B8F0] flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Bangalore, India</div>
                      <div className="text-xs text-[#8A9EB0]">The Leela Palace</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Users className="w-5 h-5 text-[#00B8F0] flex-shrink-0" />
                    <div>
                      <div className="font-semibold">500+ Innovators</div>
                      <div className="text-xs text-[#8A9EB0]">Engineers, Founders, Researchers</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link href="/contact" className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold px-7 py-3.5 rounded-xl shadow-[0_0_20px_rgba(0,102,255,0.4)] transition-colors">
                    Register Now <ArrowRight size={16} />
                  </Link>
                  <button className="inline-flex items-center gap-2 bg-transparent border border-white/20 hover:bg-white/5 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors">
                    Download Brochure <Download size={16} />
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative hidden lg:flex items-center justify-center">
                <Image
                  src="/AI_frontier_2026.png"
                  alt="AI Frontier 2026 Event"
                  width={600}
                  height={480}
                  className="w-full max-w-[600px] h-auto object-contain drop-shadow-[0_0_40px_rgba(0,184,240,0.2)]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="wrap mt-20">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 pt-10 border-t border-white/10">
              {[
                { icon: Users, stat: '500+', label: 'Attendees' },
                { icon: Mic, stat: '3', label: 'Expert Speakers' },
                { icon: Presentation, stat: '5+', label: 'Sessions' },
                { icon: Settings, stat: '2', label: 'Hands-on Labs' },
                { icon: Network, stat: '15+', label: 'Partners' },
                { icon: Calendar, stat: '2', label: 'Days' },
              ].map(({ icon: Icon, stat, label }) => (
                <div key={label} className="text-center">
                  <Icon className="w-5 h-5 mx-auto mb-2 text-[#00B8F0]" />
                  <div className="text-2xl font-bold text-white mb-0.5">{stat}</div>
                  <div className="text-[10px] text-[#8A9EB0] font-mono uppercase tracking-widest">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ ABOUT ══════════ */}
        <section className="section-pad bg-white" aria-label="About AI Frontier">
          <div className="wrap">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="font-mono text-[11px] tracking-[0.14em] text-brand uppercase mb-4 font-semibold">ABOUT AI FRONTIER</div>
                <h2 className="text-[clamp(30px,4vw,44px)] font-bold text-ink leading-tight mb-6 tracking-tight">
                  Where Builders Meet<br /><span className="text-brand">Breakthrough Ideas.</span>
                </h2>
                <p className="text-slate text-lg mb-6 leading-relaxed">
                  AI Frontier is more than an event — it&apos;s the beginning of a long-term movement. Think NVIDIA&apos;s GTC or LangChain&apos;s Interrupt: a flagship annual property where the brand compounds year after year.
                </p>
                <p className="text-slate text-base mb-10 leading-relaxed">
                  At the close of AI Frontier 2026, we launch the <strong className="text-ink">Botmartz AI Engineering Community</strong> — monthly meetups, Discord, newsletter, GitHub org, OSS nights, reading clubs, and hackathons — so the event becomes the start of an ecosystem, not a standalone day.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { icon: BookOpen, title: 'Deep Technical Content', desc: 'Cutting-edge talks from practitioners building AI at production scale.' },
                    { icon: Users2, title: 'Network with Innovators', desc: 'Connect with engineers, founders, investors and researchers.' },
                    { icon: Code2, title: 'Hands-on Labs', desc: 'Build, test, and ship real AI solutions in guided workshop sessions.' },
                    { icon: Globe, title: 'Community First', desc: 'Be part of the AI engineering community that drives long-term impact.' },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title}>
                      <div className="w-11 h-11 bg-grid-bg border border-line rounded-xl flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5 text-brand" />
                      </div>
                      <h4 className="text-base font-bold text-ink mb-1">{title}</h4>
                      <p className="text-slate text-sm">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dark summary card */}
              <div className="bg-[#050B14] rounded-2xl p-10 text-white relative overflow-hidden border border-white/10 shadow-2xl">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#0066FF]/15 blur-[100px] rounded-full pointer-events-none" />
                <h3 className="text-xl font-bold mb-1 relative z-10">AI Frontier 2026</h3>
                <p className="text-[#8A9EB0] mb-8 relative z-10 text-sm">Bangalore, India · The Leela Palace</p>
                
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {[
                    { icon: Calendar, stat: '2 Days', sub: 'of immersive sessions' },
                    { icon: MonitorPlay, stat: '5+ Tracks', sub: 'AI domains covered' },
                    { icon: Users2, stat: 'Unlimited', sub: 'networking opportunities' },
                    { icon: Network, stat: 'After Party', sub: 'AI Builders Night' },
                  ].map(({ icon: Icon, stat, sub }) => (
                    <div key={stat} className="bg-white/5 border border-white/10 p-5 rounded-xl">
                      <Icon className="w-5 h-5 text-[#00B8F0] mb-3" />
                      <div className="font-bold text-sm mb-1">{stat}</div>
                      <div className="text-[11px] text-[#8A9EB0]">{sub}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-white/5 border border-[#00B8F0]/20 rounded-xl relative z-10">
                  <div className="text-[10px] font-mono text-[#00B8F0] uppercase tracking-widest mb-2">Signature Takeaway</div>
                  <div className="font-bold text-sm mb-1">AI Engineering Roadmap 2026</div>
                  <div className="text-[11px] text-[#8A9EB0]">A 30–50 page premium handbook: AI landscape, learning paths, tool recommendations, GitHub portfolio guide, OSS roadmap & speaker career advice.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ WHY ATTEND ══════════ */}
        <section className="section-pad bg-grid-bg border-t border-line" aria-label="Why attend">
          <div className="wrap">
            <div className="mb-12">
              <div className="font-mono text-[11px] tracking-[0.14em] text-brand uppercase mb-4 font-semibold">WHY ATTEND?</div>
              <h2 className="text-[clamp(26px,3.5vw,36px)] font-bold text-ink">What You&apos;ll Gain at <span className="text-brand">AI Frontier</span></h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { icon: Users2, title: 'Learn from Practitioners', desc: 'Hear from engineers and founders building production AI systems at scale — not theoretical talks.' },
                { icon: Activity, title: 'Stay at the Frontier', desc: 'Discover the latest trends, tools, and architectural patterns shaping AI engineering in 2026.' },
                { icon: Settings, title: 'Build & Ship', desc: 'Hands-on labs in Enterprise RAG, AI Agents, and AI-assisted development that you apply immediately.' },
                { icon: Network, title: 'Grow Your Network', desc: 'Meet engineers, founders, investors, and AI researchers. The connections you make here last years.' },
                { icon: BrainCircuit, title: 'Shape the Community', desc: 'Be a founding member of the Botmartz AI Engineering Community — meetups, OSS, hackathons.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white border border-line p-7 rounded-2xl shadow-sm hover:shadow-md hover:border-brand/30 transition-all duration-200">
                  <Icon className="w-8 h-8 text-brand mb-5" />
                  <h4 className="text-base font-bold text-ink mb-2">{title}</h4>
                  <p className="text-slate text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ AGENDA & SPEAKERS ══════════ */}
        <section className="section-pad bg-white border-t border-line" aria-label="Agenda and speakers">
          <div className="wrap">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* Left: Agenda */}
              <div className="lg:col-span-4">
                <div className="font-mono text-[11px] tracking-[0.14em] text-brand uppercase mb-4 font-semibold">EVENT AGENDA</div>
                <h2 className="text-2xl font-bold text-ink mb-10 leading-tight">Two Days of Knowledge, Building & Innovation</h2>
                
                <div className="relative pl-8 border-l border-line space-y-12">
                  {/* Day 1 */}
                  <div className="relative">
                    <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-brand border-4 border-white" />
                    <div className="text-[10px] font-mono text-[#8A9EB0] uppercase tracking-widest mb-1">May 24, 2026 · Saturday</div>
                    <h4 className="text-lg font-bold text-ink mb-1">Day 1 — Explore. Learn. Connect.</h4>
                    <ul className="mt-4 space-y-3 text-slate text-sm">
                      <li className="flex items-start gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" /><div><strong className="text-ink">Opening Keynote</strong> — Vision: why AI engineering matters and where it&apos;s heading</div></li>
                      <li className="flex items-start gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" /><div><strong className="text-ink">Session 1: Karan</strong> — Engineering Production AI Systems. Enterprise AI, AI Agents, Enterprise RAG, LangGraph. Architecture-level, what "production" actually means.</div></li>
                      <li className="flex items-start gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" /><div><strong className="text-ink">Panel Discussions</strong></div></li>
                      <li className="flex items-start gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" /><div><strong className="text-ink">AI Startup Showcase</strong></div></li>
                      <li className="flex items-start gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" /><div><strong className="text-ink">Hands-on Labs</strong> — Enterprise RAG & AI Agents</div></li>
                    </ul>
                  </div>
                  
                  {/* Day 2 */}
                  <div className="relative">
                    <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-brand border-4 border-white" />
                    <div className="text-[10px] font-mono text-[#8A9EB0] uppercase tracking-widest mb-1">May 25, 2026 · Sunday</div>
                    <h4 className="text-lg font-bold text-ink mb-1">Day 2 — Build. Collaborate. Shape.</h4>
                    <ul className="mt-4 space-y-3 text-slate text-sm">
                      <li className="flex items-start gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" /><div><strong className="text-ink">Session 2 (Flagship): Promit</strong> — The State of AI Engineering. The AI shift (ML→GenAI, copilots→agents). Evaluation, governance, AI-assisted dev. Career roadmap for 2026. 20–30 min live Q&amp;A.</div></li>
                      <li className="flex items-start gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" /><div><strong className="text-ink">Closing Panel</strong> — Building an AI Engineering Career in 2026. With Karan, Promit, and additional industry engineers.</div></li>
                      <li className="flex items-start gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" /><div><strong className="text-ink">Open-Source Contrib Sprint</strong></div></li>
                      <li className="flex items-start gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" /><div><strong className="text-ink">Launch: Botmartz AI Engineering Community</strong></div></li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Right: Speakers */}
              <div className="lg:col-span-8">
                <div className="flex flex-wrap justify-between items-end gap-4 mb-10">
                  <div>
                    <div className="font-mono text-[11px] tracking-[0.14em] text-brand uppercase mb-4 font-semibold">FEATURED SPEAKERS</div>
                    <h2 className="text-2xl font-bold text-ink">Learn from Practitioners Building Production AI</h2>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  {/* Speaker: Host */}
                  <div className="bg-grid-bg border border-line rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-3 right-3 bg-[#00B8F0]/10 text-[#00B8F0] text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded">Host</div>
                    <div className="w-16 h-16 bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-xl flex items-center justify-center mb-4">
                      <Mic className="w-7 h-7 text-[#0066FF]" />
                    </div>
                    <h4 className="font-bold text-ink text-base mb-1">Soham</h4>
                    <p className="text-slate text-xs mb-4">Founder, Botmartz<br />AI Engineering & Community Builder</p>
                    <div className="bg-white border border-line rounded-lg p-3">
                      <div className="text-[9px] font-mono text-[#8A9EB0] uppercase tracking-widest mb-1">Opening & Closing</div>
                      <div className="text-xs text-ink font-semibold">Vision — Why AI Engineering Matters. Launch of Botmartz AI Engineering Community.</div>
                    </div>
                  </div>

                  {/* Speaker: Karan */}
                  <div className="bg-grid-bg border border-line rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-3 right-3 bg-brand/10 text-brand text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded">Speaker</div>
                    <div className="w-16 h-16 bg-brand/10 border border-brand/30 rounded-xl flex items-center justify-center mb-4">
                      <Code2 className="w-7 h-7 text-brand" />
                    </div>
                    <h4 className="font-bold text-ink text-base mb-1">Karan</h4>
                    <p className="text-slate text-xs mb-4">AI Systems Engineer<br />Production AI Practitioner</p>
                    <div className="bg-white border border-line rounded-lg p-3">
                      <div className="text-[9px] font-mono text-[#8A9EB0] uppercase tracking-widest mb-1">Session 1 · 1 Hour</div>
                      <div className="text-xs text-ink font-semibold">Engineering Production AI Systems. Enterprise RAG, AI Agents, LangGraph — architecture-level deep dives.</div>
                    </div>
                  </div>

                  {/* Speaker: Promit */}
                  <div className="bg-grid-bg border border-line rounded-2xl p-6 relative overflow-hidden border-brand/20 shadow-sm">
                    <div className="absolute top-3 right-3 bg-[#00B8F0]/10 text-[#00B8F0] text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded">Flagship</div>
                    <div className="w-16 h-16 bg-[#00B8F0]/10 border border-[#00B8F0]/30 rounded-xl flex items-center justify-center mb-4">
                      <Lightbulb className="w-7 h-7 text-[#00B8F0]" />
                    </div>
                    <h4 className="font-bold text-ink text-base mb-1">Promit</h4>
                    <p className="text-slate text-xs mb-4">AI Researcher & Engineering Leader<br />Traveling from Goa</p>
                    <div className="bg-white border border-[#00B8F0]/20 rounded-lg p-3">
                      <div className="text-[9px] font-mono text-[#8A9EB0] uppercase tracking-widest mb-1">Session 2 · 2 Hours + Q&A</div>
                      <div className="text-xs text-ink font-semibold">The State of AI Engineering — Where AI is Going. ML→GenAI shift, evaluation, governance, AI-assisted dev, career roadmap 2026.</div>
                    </div>
                  </div>
                </div>

                {/* Closing panel note */}
                <div className="bg-[#050B14] border border-white/10 rounded-xl p-6 text-white">
                  <div className="font-mono text-[10px] text-[#00B8F0] uppercase tracking-widest mb-3">Closing Panel · Day 2</div>
                  <h4 className="font-bold text-base mb-2">Building an AI Engineering Career in 2026</h4>
                  <p className="text-[#8A9EB0] text-sm leading-relaxed">Soham, Karan, Promit + additional industry engineers. Topics: student preparation, skills that matter, open source, PyTorch vs TensorFlow, GitHub portfolio, blogging, how companies evaluate AI engineers, math depth needed, and how AI-assisted development is changing software engineering.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ TRACKS & PERKS ══════════ */}
        <section className="section-pad bg-grid-bg border-t border-line" aria-label="Tracks and perks">
          <div className="wrap">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-16">
              
              {/* Tracks */}
              <div className="xl:col-span-7">
                <div className="font-mono text-[11px] tracking-[0.14em] text-brand uppercase mb-4 font-semibold">TRACKS & DOMAINS</div>
                <h2 className="text-2xl font-bold text-ink mb-10">Explore the Frontiers of AI Engineering</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
                  {[
                    { icon: Users2, title: 'AI Agents\n& Automation' },
                    { icon: Settings, title: 'Enterprise AI\n& RAG' },
                    { icon: Network, title: 'LLMs, GenAI\n& Applications' },
                    { icon: Activity, title: 'MLOps &\nObservability' },
                    { icon: MonitorPlay, title: 'Computer Vision\n& Multimodal AI' },
                    { icon: Database, title: 'Data Engineering\nfor AI' },
                    { icon: Shield, title: 'Responsible AI\n& Safety' },
                    { icon: BrainCircuit, title: 'AI Engineering\nCareers' },
                  ].map(({ icon: Icon, title }) => (
                    <div key={title}>
                      <div className="w-10 h-10 rounded-xl bg-white border border-line flex items-center justify-center text-brand mb-3 shadow-sm">
                        <Icon size={18} />
                      </div>
                      <h5 className="font-bold text-ink text-sm whitespace-pre-line leading-tight">{title}</h5>
                    </div>
                  ))}
                </div>
              </div>

              {/* Perks Card */}
              <div className="xl:col-span-5">
                <div className="bg-[#050B14] rounded-2xl p-10 text-white relative overflow-hidden shadow-2xl h-full border border-white/10 flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#0066FF]/15 blur-[100px] rounded-full pointer-events-none" />
                  <div>
                    <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-4 font-semibold relative z-10">EXCLUSIVE PERKS</div>
                    <h3 className="text-2xl font-bold mb-8 relative z-10">More Than Just an Event</h3>
                    
                    <ul className="space-y-4 mb-10 relative z-10">
                      {[
                        'Early access to session recordings',
                        'AI Engineering Roadmap 2026 handbook',
                        'Certificate of participation',
                        'Access to Botmartz AI Engineering Community',
                        'Swag kit & exclusive merchandise',
                        'AI Builders Night after-party',
                        'Post-event workshops & meetups',
                      ].map(perk => (
                        <li key={perk} className="flex items-center gap-3 text-sm text-[#8A9EB0]">
                          <CheckCircle2 className="w-4 h-4 text-[#00B8F0] flex-shrink-0" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href="/contact" className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(0,102,255,0.4)] text-sm transition-colors relative z-10 w-fit">
                    Register Now <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ PARTNERS ══════════ */}
        <section className="py-14 bg-white border-t border-line" aria-label="Event partners">
          <div className="wrap">
            <div className="font-mono text-[11px] tracking-[0.14em] text-brand uppercase mb-8 font-semibold">TECH ECOSYSTEM PARTNERS</div>
            <div className="flex flex-wrap justify-between items-center gap-8 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 font-bold text-ink text-sm"><SiAmazonwebservices className="w-8 h-8"/> AWS</div>
              <div className="flex items-center gap-2 font-bold text-ink text-sm"><SiGooglecloud className="w-8 h-8"/> Google Cloud</div>
              <div className="flex items-center gap-2 font-bold text-ink text-sm"><SiNvidia className="w-8 h-8"/> NVIDIA</div>
              <div className="flex items-center gap-2 font-bold text-ink text-sm"><SiMongodb className="w-8 h-8"/> MongoDB</div>
              <div className="flex items-center gap-2 font-bold text-ink text-sm"><SiPytorch className="w-8 h-8"/> PyTorch</div>
              <div className="flex items-center gap-2 font-bold text-ink text-sm"><SiLangchain className="w-8 h-8"/> LangChain</div>
              <div className="flex items-center gap-2 font-bold text-ink text-sm"><SiHuggingface className="w-8 h-8"/> Hugging Face</div>
              <div className="flex items-center gap-2 font-bold text-ink text-sm"><SiGithub className="w-8 h-8"/> GitHub</div>
            </div>
          </div>
        </section>

        {/* ══════════ FAQ + PROMO ══════════ */}
        <section className="section-pad bg-grid-bg border-t border-line" aria-label="FAQ">
          <div className="wrap">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* FAQ */}
              <div>
                <div className="font-mono text-[11px] tracking-[0.14em] text-brand uppercase mb-8 font-semibold">FREQUENTLY ASKED QUESTIONS</div>
                <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
                  {FAQS.map((faq, i) => (
                    <details
                      key={i}
                      className="bg-white border border-line rounded-xl overflow-hidden group"
                      itemScope
                      itemProp="mainEntity"
                      itemType="https://schema.org/Question"
                    >
                      <summary className="flex justify-between items-center cursor-pointer p-5 select-none">
                        <span className="font-semibold text-ink text-sm" itemProp="name">{faq.q}</span>
                        <ChevronDown size={16} className="text-slate group-open:rotate-180 transition-transform flex-shrink-0 ml-3" />
                      </summary>
                      <div
                        className="px-5 pb-5 text-slate text-sm leading-relaxed border-t border-line pt-4"
                        itemScope
                        itemProp="acceptedAnswer"
                        itemType="https://schema.org/Answer"
                      >
                        <div itemProp="text">{faq.a}</div>
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-[#050B14] rounded-2xl p-10 text-white relative overflow-hidden flex flex-col justify-between border border-white/10 shadow-xl">
                <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] bg-[#0066FF]/15 blur-[100px] rounded-full pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-4 font-semibold">AI FRONTIER 2026</div>
                  <h3 className="text-2xl font-bold mb-4">Ready to Shape the Future of AI Engineering?</h3>
                  <p className="text-sm text-[#8A9EB0] mb-8 max-w-[320px] leading-relaxed">
                    Join 500+ engineers, founders, and researchers for two days of learning, building, and connecting. Bangalore, India — May 24–25, 2026.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(0,102,255,0.4)] transition-colors text-sm">
                      Register Now <ArrowRight size={14} />
                    </Link>
                    <button className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/20 hover:bg-white/5 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
                      Download Brochure <Download size={14} />
                    </button>
                  </div>
                </div>

                {/* Decorative ticket */}
                <div className="absolute right-8 bottom-8 hidden md:flex w-[120px] h-[170px] bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-white/15 rounded-xl shadow-2xl flex-col items-center justify-center rotate-6 opacity-60">
                  <div className="text-xl font-black mb-0.5">AI</div>
                  <div className="text-[8px] font-mono tracking-widest text-[#00B8F0] mb-3">FRONTIER</div>
                  <div className="text-[7px] tracking-widest text-[#8A9EB0] mb-2 uppercase">2026 · BLR</div>
                  <div className="bg-[#00B8F0]/15 px-3 py-0.5 rounded text-[7px] text-[#00B8F0] font-bold border border-[#00B8F0]/25 mb-3">ADMIT ONE</div>
                  <div className="w-10 h-10 border border-dashed border-white/20 rounded" />
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
    </>
  );
}
