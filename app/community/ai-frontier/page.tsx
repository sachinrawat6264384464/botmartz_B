import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { adminDb } from '@/lib/firebase-admin';
import { Calendar, MapPin, Users, Zap, Code, Terminal, MessageSquare } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'AI Frontier 2026 | Botmartz AI',
    description: 'Join us at AI Frontier 2026, the premier conference for AI engineering, RAG systems, and autonomous agents.',
  };
  
  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("ai-frontier").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      if (data?.metadata) {
        meta = { ...meta, ...data.metadata };
      }
    }
  } catch (e) {}

  return {
    ...meta,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: 'https://botmartz.com/community/ai-frontier',
      type: 'website',
    },
  };
}

const DEFAULT_CONTENT = {
  hero: {
    badge: "Community / AI Frontier 2026",
    title: "The Future of AI Engineering.",
    subtitle: "Join the brightest minds in artificial intelligence for a two-day technical deep dive into Enterprise RAG, autonomous agents, and production ML systems.",
    ctaText: "Get Early Access Tickets →",
    ctaLink: "/contact",
  },
  cta: {
    title: "Don't Miss AI Frontier 2026",
    subtitle: "Secure your spot at the forefront of AI engineering and connect with industry leaders.",
    buttonText: "Register Now →"
  },
  structuredData: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "AI Frontier 2026",
    "description": "The premier conference for AI engineering, RAG systems, and autonomous agents.",
    "startDate": "2026-10-15T09:00:00-08:00",
    "endDate": "2026-10-16T18:00:00-08:00",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": "Moscone Center",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "747 Howard St",
        "addressLocality": "San Francisco",
        "postalCode": "94103",
        "addressRegion": "CA",
        "addressCountry": "US"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Botmartz AI Solutions"
    }
  })
};

export default async function AIFrontierPage() {
  let content = { ...DEFAULT_CONTENT };

  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("ai-frontier").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      content = {
        hero: data?.hero || DEFAULT_CONTENT.hero,
        cta: data?.cta || DEFAULT_CONTENT.cta,
        structuredData: data?.structuredData || DEFAULT_CONTENT.structuredData
      };
    }
  } catch (e) {}

  return (
    <main className="bg-[#050B14] min-h-screen text-white">
      {content.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: content.structuredData
          }}
        />
      )}
      
      {/* HERO SECTION (DARK CENTERED) */}
      <section className="relative pt-[120px] pb-[80px] bg-[#050B14] text-white overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="wrap relative z-10 flex flex-col items-center text-center max-w-[900px] mx-auto">
          <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-6 flex items-center justify-center gap-3 font-semibold">
            <span className="w-6 h-px bg-[#00B8F0]"></span>
            {content.hero.badge || "AI Frontier 2026"}
            <span className="w-6 h-px bg-[#00B8F0]"></span>
          </div>
          <h1 
            className="text-[clamp(40px,6vw,64px)] leading-[1.05] font-semibold mb-6 tracking-tight text-white"
            dangerouslySetInnerHTML={{ __html: content.hero.title }}
          />
          <p className="text-[17px] sm:text-[19px] text-[#8A9EB0] mb-10 max-w-[650px] leading-relaxed font-light">
            {content.hero.subtitle}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Link href={content.hero.ctaLink || "/contact"} className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-8 py-3.5 rounded text-[15px] flex items-center gap-2 font-medium">
              {content.hero.ctaText || "Get Early Access Tickets →"}
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 pb-8 border-b border-[#1E293B] w-full max-w-[800px]">
            <div className="flex items-center gap-3 text-[#8A9EB0]">
               <div className="w-10 h-10 rounded-full bg-[#0A111F] border border-[#1E293B] flex items-center justify-center text-[#00B8F0]">
                  <Calendar size={18} />
               </div>
               <div className="text-left">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#00B8F0] mb-0.5">Date</div>
                  <div className="text-[15px] font-medium text-white">Oct 15-16, 2026</div>
               </div>
            </div>
            <div className="flex items-center gap-3 text-[#8A9EB0]">
               <div className="w-10 h-10 rounded-full bg-[#0A111F] border border-[#1E293B] flex items-center justify-center text-[#00B8F0]">
                  <MapPin size={18} />
               </div>
               <div className="text-left">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#00B8F0] mb-0.5">Location</div>
                  <div className="text-[15px] font-medium text-white">San Francisco, CA</div>
               </div>
            </div>
          </div>
        </div>

        {/* 3D Hero Visual Centered Below Text */}
        <div className="mt-16 relative w-full flex justify-center min-h-[400px]">
          <div className="absolute inset-0 z-0 opacity-20" style={{ 
            backgroundImage: 'radial-gradient(circle at center, #00B8F0 1.5px, transparent 1.5px), radial-gradient(circle at center, #0066FF 1px, transparent 1px)', 
            backgroundSize: '40px 40px, 60px 60px',
            backgroundPosition: '0 0, 20px 20px'
          }} />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#0066FF]/20 blur-[100px] rounded-full pointer-events-none z-0" />
          
          {/* Placeholder for the AI Frontier specific image provided by the user */}
          <div className="relative z-10 w-full max-w-[800px] flex items-center justify-center">
             <div className="relative group perspective-1000">
                <div className="w-[600px] max-w-full aspect-video rounded-2xl border border-[#1E293B] bg-[#0A111F] shadow-[0_0_50px_rgba(0,184,240,0.1)] flex items-center justify-center overflow-hidden transform-gpu transition-all duration-700 group-hover:rotate-y-[10deg] group-hover:rotate-x-[5deg] group-hover:scale-[1.02]">
                   <div className="absolute inset-0 bg-gradient-to-br from-[#00B8F0]/20 via-transparent to-transparent z-10 opacity-50"></div>
                   <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay z-20"></div>
                   
                   <div className="text-center z-30">
                      <div className="text-[#00B8F0] font-mono tracking-[0.3em] text-sm mb-4">CONF. 2026</div>
                      <div className="text-5xl font-bold tracking-tight text-white mb-2">AI FRONTIER</div>
                      <div className="w-16 h-1 bg-[#00B8F0] mx-auto rounded-full"></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS SECTION */}
      <section className="py-[100px] bg-[#0A111F] border-y border-[#1E293B]">
        <div className="wrap">
          <div className="text-center mb-16 max-w-[700px] mx-auto">
             <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-white mb-4">What to Expect</h2>
             <p className="text-[#8A9EB0] text-[17px]">Two days of deep technical sessions, workshops, and networking.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Terminal, title: "Technical Deep Dives", desc: "No fluff. Pure engineering sessions on RAG architecture, agent frameworks, and LLM ops." },
              { icon: Users, title: "Expert Networking", desc: "Connect with AI engineers, researchers, and founders building the next generation of software." },
              { icon: Code, title: "Hands-on Workshops", desc: "Build production-ready applications in live coding sessions guided by industry experts." }
            ].map((item, i) => (
              <div key={i} className="bg-[#050B14] border border-[#1E293B] rounded-xl p-8 hover:border-[#00B8F0]/50 hover:shadow-[0_0_30px_rgba(0,184,240,0.05)] transition-all group text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#0A111F] border border-[#1E293B] flex items-center justify-center mb-6 text-[#8A9EB0] group-hover:text-[#00B8F0] group-hover:border-[#00B8F0]/30 transition-colors">
                  <item.icon size={24} />
                </div>
                <h3 className="text-[20px] font-semibold text-white mb-4">{item.title}</h3>
                <p className="text-[15px] text-[#8A9EB0] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-[100px] bg-[#050B14]">
        <div className="wrap">
          <div className="bg-gradient-to-br from-[#0A111F] to-[#050B14] border border-[#1E293B] rounded-2xl p-10 md:p-16 text-center max-w-[900px] mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00B8F0]/10 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-white mb-6">
                {content.cta.title}
              </h2>
              <p className="text-[#8A9EB0] text-[17px] md:text-[19px] max-w-[600px] mx-auto mb-10 leading-relaxed font-light">
                {content.cta.subtitle}
              </p>
              <Link href="/contact" className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-8 py-4 rounded text-[15px] inline-flex items-center gap-2 font-medium">
                {content.cta.buttonText}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
