import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Users, Calendar, MapPin, Download, Mic, 
  MonitorPlay, Briefcase, Handshake, Globe, Star, 
  Activity, Database, Server, ShieldCheck, Cpu,
  Bot, Settings, Zap, ArrowRight, ChevronDown, CheckCircle2
} from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'AI Frontier 2026 | Botmartz AI',
  description: 'Join Botmartz flagship event AI Frontier 2026. Connect with AI engineers, attend global meetups, and participate in technical workshops on LLMs, RAG, and Agents in Bangalore.',
  keywords: ['AI Frontier', 'AI Community', 'AI Meetups', 'Generative AI Events', 'Botmartz Community', 'AI Engineering Conference', 'Bangalore AI Event'],
  openGraph: {
    title: 'AI Frontier 2026 | Botmartz AI',
    description: 'Join Botmartz flagship event AI Frontier 2026 in Bangalore. Connect with 500+ innovators.',
    url: 'https://botmartz.com/community',
    type: 'website',
  },
};

export default function CommunityPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        "name": "AI Frontier 2026",
        "startDate": "2026-05-24T09:00:00+05:30",
        "endDate": "2026-05-25T18:00:00+05:30",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
        "location": {
          "@type": "Place",
          "name": "The Leela Palace",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bangalore",
            "addressCountry": "IN"
          }
        },
        "image": [
          "https://botmartz.com/BotmartzNewLogo.png"
        ],
        "description": "AI Frontier is Botmartz's flagship event bringing together engineers, researchers, founders, and tech leaders to explore the frontier of Artificial Intelligence and build what's next.",
        "offers": {
          "@type": "Offer",
          "url": "https://botmartz.com/community",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "validFrom": "2024-11-01T00:00:00+05:30"
        },
        "organizer": {
          "@type": "Organization",
          "name": "Botmartz",
          "url": "https://botmartz.com"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Who can attend AI Frontier?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "AI Frontier is designed for software engineers, AI researchers, product managers, and technical founders who are actively building or planning to build AI systems."
            }
          },
          {
            "@type": "Question",
            "name": "Is prior AI knowledge required?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "While foundational programming knowledge is helpful, we have tracks for both beginners exploring Generative AI and advanced practitioners building production RAG/Agent systems."
            }
          }
        ]
      }
    ]
  };

  return (
    <main className="bg-paper min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* HERO SECTION (DARK) */}
      <section className="relative pt-[120px] pb-[80px] bg-[#050B14] text-white overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="wrap relative z-10 flex flex-col lg:flex-row items-center gap-12">
          
          <div className="flex-1 lg:max-w-[600px] text-center lg:text-left">
            <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-6 flex items-center justify-center lg:justify-start gap-3 font-semibold">
              <span className="w-6 h-px bg-[#00B8F0]"></span>
              AI FRONTIER 2026
            </div>
            <h1 className="text-[clamp(40px,6vw,70px)] leading-[1] font-bold mb-4 font-space-grotesk tracking-tight text-white">
              AI <span className="text-[#00B8F0]">FRONTIER</span>
            </h1>
            <p className="text-[22px] font-medium text-white mb-6">Build. Learn. Connect. Shape the Future.</p>
            <p className="text-[17px] text-[#8A9EB0] mb-10 max-w-[540px] mx-auto lg:mx-0 leading-relaxed">
              AI Frontier is Botmartz's flagship event bringing together engineers, researchers, founders, and tech leaders to explore the frontier of Artificial Intelligence and build what's next.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-8 mb-10 text-[14px]">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-brand" />
                <div className="text-left">
                  <div className="font-semibold text-white">24 - 25 May, 2026</div>
                  <div className="text-[#8598A6]">Saturday - Sunday</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-brand" />
                <div className="text-left">
                  <div className="font-semibold text-white">Bangalore, India</div>
                  <div className="text-[#8598A6]">The Leela Palace</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-brand" />
                <div className="text-left">
                  <div className="font-semibold text-white">500+</div>
                  <div className="text-[#8598A6]">Innovators</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button className="btn btn-primary bg-brand text-white hover:bg-deep px-8 py-3 rounded text-[15px] flex items-center gap-2">
                Register Now <ArrowRight className="w-4 h-4" />
              </button>
              <button className="btn border border-white/20 text-white hover:border-brand hover:text-brand px-8 py-3 rounded text-[15px] flex items-center gap-2 transition-colors">
                Download Brochure <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 w-full relative h-[400px] lg:h-[500px]">
            {/* Glowing Hero Graphic */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-[600px] rounded-2xl overflow-hidden border border-[#00B8F0]/30 shadow-[0_0_50px_rgba(0,184,240,0.25)] group">
                <Image 
                  src="/ai-frontier-hero.png" 
                  alt="AI Frontier 2026" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-[#00B8F0]/10 mix-blend-overlay pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS STRIP (DARK) */}
      <section className="bg-deep border-y border-white/10 text-white">
        <div className="wrap py-8 flex flex-wrap justify-between items-center gap-6">
          {[
            { n: '500+', t: 'Attendees', i: Users },
            { n: '40+', t: 'Speakers', i: Mic },
            { n: '20+', t: 'Sessions', i: MonitorPlay },
            { n: '10+', t: 'Hands-on Labs', i: Activity },
            { n: '15+', t: 'Partners', i: Handshake },
            { n: '2', t: 'Days of Innovation', i: Calendar }
          ].map((m, i) => (
            <div key={i} className="flex items-center gap-3 flex-1 min-w-[150px] justify-center lg:justify-start">
              <m.i className="w-8 h-8 text-brand opacity-80" />
              <div>
                <div className="font-semibold text-[18px]">{m.n}</div>
                <div className="text-[12px] text-[#9FB9C8] font-mono uppercase">{m.t}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT AI FRONTIER */}
      <section className="section-pad border-b border-line">
        <div className="wrap flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
            <div className="font-mono text-[11px] text-brand uppercase tracking-[0.12em] mb-3">ABOUT AI FRONTIER</div>
            <h2 className="text-[34px] font-semibold leading-[1.1] mb-6">Where Builders Meet <br className="hidden lg:block"/>Breakthrough Ideas.</h2>
            <p className="text-[16px] text-ink-soft mb-10 leading-relaxed max-w-[560px]">
              AI Frontier is more than an event — it's a movement. We bring the brightest minds together to share knowledge, build real-world solutions, and push the boundaries of AI.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { i: Cpu, t: 'Deep Technical Content', d: 'Cutting-edge talks, practical tutorials, and real-world case studies.' },
                { i: Users, t: 'Network with Innovators', d: 'Connect with engineers, founders, investors and researchers.' },
                { i: Settings, t: 'Hands-on Experience', d: 'Workshops and labs to build, test and ship AI solutions.' },
                { i: Globe, t: 'Community Driven', d: 'Be part of a growing community building the future of AI.' }
              ].map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-grid-bg border border-line flex items-center justify-center shrink-0">
                    <f.i className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[15px] mb-1">{f.t}</h4>
                    <p className="text-[13px] text-ink-soft leading-relaxed">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Event Pass Card */}
          <div className="w-full lg:w-[480px]">
            <div className="bg-ink rounded-[24px] text-white overflow-hidden shadow-2xl relative border border-line">
              <div className="absolute inset-0 blueprint opacity-20"></div>
              
              <div className="p-8 relative z-10 border-b border-white/10">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <div className="font-space-grotesk font-bold text-[24px] text-brand">AI Frontier 2026</div>
                    <div className="text-[14px] text-[#9FB9C8]">Bangalore, India</div>
                    <div className="text-[14px] text-[#9FB9C8]">The Leela Palace</div>
                  </div>
                  <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-brand" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center"><Calendar className="w-4 h-4 text-brand"/></div>
                    <div>
                      <div className="font-semibold text-[13px]">2 Days</div>
                      <div className="text-[11px] text-[#8598A6]">of immersive sessions</div>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center"><Server className="w-4 h-4 text-brand"/></div>
                    <div>
                      <div className="font-semibold text-[13px]">5+ Tracks</div>
                      <div className="text-[11px] text-[#8598A6]">Tracks & Domains</div>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center"><Handshake className="w-4 h-4 text-brand"/></div>
                    <div>
                      <div className="font-semibold text-[13px]">Unlimited</div>
                      <div className="text-[11px] text-[#8598A6]">Networking Opportunities</div>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center"><Star className="w-4 h-4 text-brand"/></div>
                    <div>
                      <div className="font-semibold text-[13px]">After Party</div>
                      <div className="text-[11px] text-[#8598A6]">AI Builders Night</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card Footer */}
              <div className="bg-white/5 p-6 relative z-10 flex justify-between items-center backdrop-blur-md">
                 <div className="font-mono text-[10px] text-[#8598A6] tracking-widest uppercase">Valid for all sessions</div>
                 <div className="flex gap-1">
                   {[...Array(6)].map((_, i) => (
                     <div key={i} className="w-1 h-8 bg-white/20"></div>
                   ))}
                   <div className="w-2 h-8 bg-white/30"></div>
                   <div className="w-1 h-8 bg-white/20"></div>
                   <div className="w-3 h-8 bg-white/40"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY ATTEND / WHAT YOU'LL GAIN */}
      <section className="section-pad border-b border-line">
        <div className="wrap">
          <div className="font-mono text-[11px] text-brand uppercase tracking-[0.12em] mb-2">WHY ATTEND?</div>
          <h2 className="text-[30px] font-semibold mb-12">What You'll Gain at <span className="text-brand">AI Frontier</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { i: Users, t: 'Learn from Experts', d: 'Hear from global leaders and practitioners building with AI at scale.' },
              { i: Activity, t: 'Stay Ahead', d: 'Discover the latest trends, tools, and frameworks shaping the AI landscape.' },
              { i: Settings, t: 'Build & Ship', d: 'Hands-on workshops to help you build real AI solutions.' },
              { i: Handshake, t: 'Grow Your Network', d: 'Meet founders, engineers, investors, and AI enthusiasts from across the globe.' },
              { i: Globe, t: 'Be Part of the Future', d: 'Join a community that\'s driving impact through responsible AI.' }
            ].map((g, i) => (
              <div key={i} className="bg-white border border-line p-6 rounded hover:border-brand hover:shadow-md transition-all">
                <g.i className="w-6 h-6 text-brand mb-4" />
                <h4 className="font-semibold text-[15px] mb-2">{g.t}</h4>
                <p className="text-[13px] text-ink-soft leading-relaxed">{g.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGENDA & SPEAKERS */}
      <section className="section-pad bg-white border-b border-line">
        <div className="wrap flex flex-col lg:flex-row gap-16">
          
          {/* AGENDA (LEFT) */}
          <div className="lg:w-1/3">
            <div className="font-mono text-[11px] text-brand uppercase tracking-[0.12em] mb-2">EVENT AGENDA</div>
            <h2 className="text-[30px] font-semibold mb-8 leading-tight">Two Days Packed with Knowledge & Innovation</h2>
            
            <div className="relative border-l-2 border-line ml-3">
              {/* Day 1 */}
              <div className="mb-10 relative">
                <div className="absolute w-4 h-4 bg-white border-2 border-brand rounded-full -left-[9px] top-1"></div>
                <div className="pl-8">
                  <h4 className="font-semibold text-[18px] text-brand mb-1">Day 1 — May 24, 2026</h4>
                  <div className="font-mono text-[12px] text-ink font-semibold mb-3">Explore. Learn. Connect.</div>
                  <ul className="space-y-2 text-[14px] text-ink-soft mb-4">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand rounded-full"></div> Keynotes & Talks</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand rounded-full"></div> Technical Sessions</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand rounded-full"></div> Hands-on Labs</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand rounded-full"></div> Panel Discussions</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand rounded-full"></div> AI Startup Showcase</li>
                  </ul>
                </div>
              </div>
              
              {/* Day 2 */}
              <div className="relative">
                <div className="absolute w-4 h-4 bg-white border-2 border-brand rounded-full -left-[9px] top-1"></div>
                <div className="pl-8">
                  <h4 className="font-semibold text-[18px] text-brand mb-1">Day 2 — May 25, 2026</h4>
                  <div className="font-mono text-[12px] text-ink font-semibold mb-3">Build. Collaborate. Innovate.</div>
                  <ul className="space-y-2 text-[14px] text-ink-soft mb-6">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand rounded-full"></div> Advanced Workshops</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand rounded-full"></div> Open Source Contrib Sprint</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand rounded-full"></div> Community Roundtables</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand rounded-full"></div> Buildathon</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand rounded-full"></div> Closing & Awards</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <button className="btn border border-line hover:border-brand text-ink px-6 py-2 rounded text-[13px] w-full mt-6">
              View Full Agenda →
            </button>
          </div>

          {/* SPEAKERS (RIGHT) */}
          <div className="lg:w-2/3">
            <div className="flex justify-between items-end mb-8">
              <div>
                <div className="font-mono text-[11px] text-brand uppercase tracking-[0.12em] mb-2">FEATURED SPEAKERS</div>
                <h2 className="text-[30px] font-semibold leading-tight">Learn from Industry & Research Leaders</h2>
              </div>
              <button className="btn border border-line hover:border-brand text-brand px-4 py-2 rounded text-[12px] hidden sm:block whitespace-nowrap">
                View All Speakers +
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Aravind Srinivas', role: 'Co-founder & CEO, Perplexity', topic: 'The Future of Search with AI', img: 'https://i.pravatar.cc/300?u=a' },
                { name: 'Rowan Cheung', role: 'Founder, The Rundown AI', topic: 'Building Scalable AI Experiences', img: 'https://i.pravatar.cc/300?u=b' },
                { name: 'Sweta Kumari', role: 'AI Research Lead, Meta', topic: 'Advances in LLM Reasoning', img: 'https://i.pravatar.cc/300?u=c' },
                { name: 'Pranav Mistry', role: 'Founder, Two.AI', topic: 'Human Computer Interaction with AI', img: 'https://i.pravatar.cc/300?u=d' },
              ].map((s, i) => (
                <div key={i} className="border border-line rounded-lg overflow-hidden group">
                  <div className="h-[180px] bg-grid-bg relative overflow-hidden">
                    <img src={s.img} alt={s.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur text-brand font-mono text-[9px] uppercase px-2 py-1 rounded font-bold">SPEAKER</div>
                  </div>
                  <div className="p-4 bg-white">
                    <h4 className="font-semibold text-[15px] mb-1">{s.name}</h4>
                    <p className="text-[12px] text-ink-soft mb-3 line-clamp-1">{s.role}</p>
                    <div className="text-[11px] text-[#8598A6] font-mono mb-1">Talk Topic</div>
                    <p className="text-[12px] font-medium leading-tight">{s.topic}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* TRACKS & DOMAINS + PERKS */}
      <section className="section-pad border-b border-line bg-paper">
        <div className="wrap flex flex-col lg:flex-row gap-12">
          
          <div className="lg:w-3/5">
            <div className="font-mono text-[11px] text-brand uppercase tracking-[0.12em] mb-2">TRACKS & DOMAINS</div>
            <h2 className="text-[30px] font-semibold mb-8">Explore the Frontiers of AI</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { i: Bot, t: 'AI Agents & Automation' },
                { i: Server, t: 'Enterprise AI & RAG' },
                { i: Cpu, t: 'LLMs, Gen AI & Applications' },
                { i: Activity, t: 'MLOps & Observability' },
                { i: MonitorPlay, t: 'Computer Vision & Multimodal AI' },
                { i: Database, t: 'Data Engineering for AI' },
                { i: ShieldCheck, t: 'Responsible AI & Safety' },
                { i: Briefcase, t: 'AI in Startups & Business' }
              ].map((t, i) => (
                <div key={i} className="text-center sm:text-left">
                  <t.i className="w-8 h-8 text-brand mx-auto sm:mx-0 mb-3 opacity-80" />
                  <h4 className="font-semibold text-[14px] leading-tight text-ink">{t.t}</h4>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-2/5">
            <div className="bg-ink rounded-xl p-8 text-white relative overflow-hidden h-full shadow-lg border border-line">
               <div className="absolute inset-0 blueprint opacity-20"></div>
               <div className="relative z-10">
                 <div className="font-mono text-[11px] text-brand uppercase tracking-[0.12em] mb-2">EXCLUSIVE PERKS</div>
                 <h3 className="text-[26px] font-semibold mb-6">More Than Just an Event</h3>
                 
                 <ul className="space-y-4 mb-8">
                   <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand shrink-0"/> <span className="text-[14px] text-[#9FB9C8]">Early access to session recordings</span></li>
                   <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand shrink-0"/> <span className="text-[14px] text-[#9FB9C8]">Certificate of participation</span></li>
                   <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand shrink-0"/> <span className="text-[14px] text-[#9FB9C8]">Access to AI Frontier community</span></li>
                   <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand shrink-0"/> <span className="text-[14px] text-[#9FB9C8]">Swag kit & exclusive merchandise</span></li>
                   <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand shrink-0"/> <span className="text-[14px] text-[#9FB9C8]">Post-event workshops & meetups</span></li>
                 </ul>
                 
                 <button className="btn btn-primary bg-brand text-white hover:bg-deep px-6 py-2 rounded text-[14px] flex items-center gap-2">
                   Register Now <ArrowRight className="w-4 h-4" />
                 </button>
               </div>
               
               {/* Abstract Swag Graphics */}
               <div className="absolute right-0 bottom-0 w-[200px] h-[200px] opacity-30 pointer-events-none hidden sm:block">
                  {/* CSS T-Shirt Placeholder */}
                  <div className="absolute bottom-10 right-10 w-24 h-28 bg-deep rounded-t-xl border border-brand shadow-[0_0_20px_rgba(0,146,215,0.2)] flex items-center justify-center transform rotate-12">
                     <span className="font-space-grotesk text-[10px] font-bold text-brand text-center leading-tight">AI<br/>FRONTIER</span>
                  </div>
                  {/* CSS Mug Placeholder */}
                  <div className="absolute bottom-4 right-2 w-12 h-14 bg-ink border border-white/20 rounded-lg shadow-lg flex items-center justify-center transform -rotate-12">
                     <span className="font-space-grotesk text-[6px] font-bold text-white">AI</span>
                  </div>
               </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-[40px] border-b border-line bg-white">
        <div className="wrap">
          <div className="font-mono text-[11px] text-ink-soft uppercase tracking-[0.12em] mb-6 text-center">OUR PARTNERS</div>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all">
            <span className="font-semibold text-xl font-mono">AWS</span>
            <span className="font-semibold text-xl font-mono">Google Cloud</span>
            <span className="font-semibold text-xl font-mono">NVIDIA</span>
            <span className="font-semibold text-xl font-mono">MongoDB</span>
            <span className="font-semibold text-xl font-mono">Pinecone</span>
            <span className="font-semibold text-xl font-mono">LangChain</span>
            <span className="font-semibold text-xl font-mono">HuggingFace</span>
            <span className="font-semibold text-xl font-mono">GitHub</span>
          </div>
        </div>
      </section>

      {/* FAQ & CTA */}
      <section className="section-pad">
        <div className="wrap flex flex-col lg:flex-row gap-12">
          
          <div className="lg:w-1/2">
            <div className="font-mono text-[11px] text-brand uppercase tracking-[0.12em] mb-4">FREQUENTLY ASKED QUESTIONS</div>
            <div className="space-y-4">
              {[
                { q: 'Who can attend AI Frontier?', a: 'AI Frontier is designed for software engineers, AI researchers, product managers, and technical founders who are actively building or planning to build AI systems.' },
                { q: 'Is prior AI knowledge required?', a: 'While foundational programming knowledge is helpful, we have tracks for both beginners exploring Generative AI and advanced practitioners building production RAG/Agent systems.' },
                { q: 'Will the sessions be recorded?', a: 'Yes, all keynote and technical track sessions will be recorded and made available to attendees.' },
                { q: 'What\'s included in the ticket?', a: 'Full access to 2 days of sessions, hands-on labs, meals, networking events, the official after-party, and exclusive swag.' },
                { q: 'Do you offer group discounts?', a: 'Yes, we offer special pricing for teams of 3 or more. Contact our support team for details.' }
              ].map((faq, i) => (
                <div key={i} className="border border-line rounded bg-white p-5 cursor-pointer hover:border-brand transition-colors group">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-[15px]">{faq.q}</h4>
                    <ChevronDown className="w-5 h-5 text-ink-soft group-hover:text-brand" />
                  </div>
                  {i < 2 && (
                    <p className="mt-3 text-[14px] text-ink-soft leading-relaxed">{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2">
             <div className="bg-ink rounded-xl p-10 text-white relative overflow-hidden h-full flex flex-col justify-center border border-line">
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                
                <div className="relative z-10 lg:pr-32">
                  <h2 className="text-[34px] font-semibold mb-4 leading-tight">Ready to Explore the <span className="text-brand">Frontier of AI?</span></h2>
                  <p className="text-[15px] text-[#9FB9C8] mb-8 leading-relaxed">
                    Join 500+ builders, innovators, and change makers for two days of learning, building, and connecting.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <button className="btn btn-primary bg-brand text-white hover:bg-deep px-8 py-3 rounded text-[15px] flex items-center gap-2">
                      Register Now <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="btn border border-white/20 text-white hover:border-brand hover:text-brand px-6 py-3 rounded text-[15px] flex items-center gap-2 transition-colors">
                      Download Brochure <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Vertical Ticket UI */}
                <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 w-[120px] h-[300px] bg-deep border-l border-brand/50 flex-col items-center justify-between py-6 rounded-l-xl shadow-[-20px_0_40px_rgba(0,146,215,0.1)]">
                   <div className="font-space-grotesk text-[20px] font-bold text-white text-center leading-none">
                     AI<br/><span className="text-brand text-[14px]">FRONTIER</span><br/><span className="text-[10px] text-white/50 font-mono font-normal">2026</span>
                   </div>
                   
                   <div className="w-full border-t border-dashed border-white/20 my-4 relative">
                     <div className="absolute w-4 h-4 bg-ink rounded-full -left-2 -top-2"></div>
                     <div className="absolute w-4 h-4 bg-ink rounded-full -right-2 -top-2"></div>
                   </div>
                   
                   <div className="rotate-[-90deg] font-mono text-[10px] text-brand tracking-[0.2em] whitespace-nowrap mt-4">ADMIT ONE</div>
                   
                   <div className="mt-8 flex gap-1 items-end justify-center w-full px-4">
                     <div className="w-2 h-10 bg-white/80"></div>
                     <div className="w-1 h-10 bg-white/80"></div>
                     <div className="w-3 h-10 bg-white/80"></div>
                     <div className="w-1 h-10 bg-white/80"></div>
                     <div className="w-2 h-10 bg-white/80"></div>
                   </div>
                </div>
             </div>
          </div>
          
        </div>
      </section>

    </main>
  );
}
