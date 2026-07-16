import { Metadata } from 'next';
import Link from 'next/link';
import { Users, Github, ArrowRight, MessageSquare, Calendar, Activity, BookOpen, ExternalLink, ShieldCheck, MapPin } from 'lucide-react';
import { adminDb } from '@/lib/firebase-admin';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Community | Botmartz AI',
    description: 'Join the Botmartz AI engineering community. Attend our events, contribute to our open-source projects, and connect with builders.',
    keywords: ['Botmartz Community', 'AI Engineers', 'Open Source AI', 'AI Meetups'],
  };
  
  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("community").get();
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
      url: 'https://botmartz.com/community',
      type: 'website',
    },
  };
}

export default async function CommunityHubPage() {
  let heroData = {
    badge: "THE BOTMARTZ COMMUNITY",
    title: "Building the Future of <br/><span className=\"text-[#00B8F0]\">AI Engineering</span> Together.",
    subtitle: "Botmartz isn't just an agency — it's an ecosystem. We host global conferences, run technical meetups, and maintain open-source projects for the AI engineering community."
  };

  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("community").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      if (data?.hero) {
        heroData = { ...heroData, ...data.hero };
      }
    }
  } catch (e) {}

  return (
    <main className="bg-[#050B14] min-h-screen text-white">
      
      {/* HERO SECTION */}
      <section className="relative pt-[120px] pb-[80px] bg-[#050B14] text-white overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="wrap relative z-10 flex flex-col items-center text-center max-w-[800px] mx-auto">
          <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-4 flex items-center gap-3 font-semibold justify-center">
            <span className="w-6 h-px bg-[#00B8F0]"></span>
            {heroData.badge}
            <span className="w-6 h-px bg-[#00B8F0]"></span>
          </div>
          <h1 
            className="text-[clamp(36px,5vw,56px)] leading-[1.1] font-semibold mb-6 tracking-tight text-white font-space-grotesk"
            dangerouslySetInnerHTML={{ __html: heroData.title }}
          />
          <p className="text-[17px] text-[#8A9EB0] mb-10 max-w-[600px] mx-auto leading-relaxed">
            {heroData.subtitle}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/community/events" className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-8 py-3 rounded text-[15px] flex items-center gap-2">
              View All Events <Calendar className="w-4 h-4" />
            </Link>
            <a href="https://github.com/botmartz" target="_blank" rel="noopener noreferrer" className="btn border border-[#1E293B] text-white hover:border-[#00B8F0] px-8 py-3 rounded text-[15px] flex items-center gap-2 transition-colors">
              GitHub Projects <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Floating abstract connections */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
           <div className="absolute top-[20%] left-[15%] w-3 h-3 bg-[#00B8F0] rounded-full shadow-[0_0_15px_rgba(0,184,240,1)]"></div>
           <div className="absolute top-[40%] left-[25%] w-2 h-2 bg-white rounded-full"></div>
           <div className="absolute top-[60%] left-[10%] w-4 h-4 border border-[#00B8F0] rounded-full"></div>
           
           <div className="absolute top-[30%] right-[15%] w-3 h-3 bg-[#00B8F0] rounded-full shadow-[0_0_15px_rgba(0,184,240,1)]"></div>
           <div className="absolute top-[50%] right-[25%] w-2 h-2 bg-white rounded-full"></div>
           <div className="absolute top-[70%] right-[10%] w-4 h-4 border border-[#00B8F0] rounded-full"></div>
        </div>
      </section>

      {/* PILLARS OF THE COMMUNITY */}
      <section className="section-pad bg-[#0A111F] border-b border-[#1E293B]">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Events Pillar */}
            <div className="flex flex-col group">
              <div className="w-12 h-12 rounded-lg bg-[#050B14] border border-[#1E293B] flex items-center justify-center mb-6 group-hover:border-[#00B8F0] transition-colors">
                <Calendar className="w-6 h-6 text-[#00B8F0]" />
              </div>
              <h3 className="text-[20px] font-semibold mb-3 text-white">Conferences & Meetups</h3>
              <p className="text-[14px] text-[#8A9EB0] leading-relaxed mb-6 flex-1">
                From our flagship annual summit, AI Frontier, to focused technical meetups on RAG and Agentic workflows. We bring builders together.
              </p>
              <Link href="/community/events" className="text-[13px] font-semibold text-[#00B8F0] flex items-center gap-2 group-hover:underline">
                Explore Events <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Open Source Pillar */}
            <div className="flex flex-col group">
              <div className="w-12 h-12 rounded-lg bg-[#050B14] border border-[#1E293B] flex items-center justify-center mb-6 group-hover:border-[#00B8F0] transition-colors">
                <Github className="w-6 h-6 text-[#00B8F0]" />
              </div>
              <h3 className="text-[20px] font-semibold mb-3 text-white">Open Source Hub</h3>
              <p className="text-[14px] text-[#8A9EB0] leading-relaxed mb-6 flex-1">
                We believe in building in public. We regularly open-source internal tooling, RAG boilerplates, and evaluation frameworks for the community to use and improve.
              </p>
              <a href="https://github.com/botmartz" className="text-[13px] font-semibold text-[#00B8F0] flex items-center gap-2 group-hover:underline">
                View GitHub <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Discord/Discussion Pillar */}
            <div className="flex flex-col group">
              <div className="w-12 h-12 rounded-lg bg-[#050B14] border border-[#1E293B] flex items-center justify-center mb-6 group-hover:border-[#00B8F0] transition-colors">
                <MessageSquare className="w-6 h-6 text-[#00B8F0]" />
              </div>
              <h3 className="text-[20px] font-semibold mb-3 text-white">Engineering Network</h3>
              <p className="text-[14px] text-[#8A9EB0] leading-relaxed mb-6 flex-1">
                Connect with 1,500+ AI engineers, share architecture diagrams, ask for debugging help, and collaborate on cutting-edge production systems.
              </p>
              <a href="#" className="text-[13px] font-semibold text-[#00B8F0] flex items-center gap-2 group-hover:underline">
                Join Discord <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* HIGHLIGHTED EVENT: AI FRONTIER */}
      <section className="section-pad border-b border-[#1E293B]">
        <div className="wrap">
          <div className="bg-[#0A111F] rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-[#1E293B]">
            
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center blueprint relative" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.05) 1px, transparent 1px)' }}>
              <div className="absolute top-8 left-8 bg-[#00B8F0]/20 text-[#00B8F0] font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[#00B8F0]/30">
                Flagship Event
              </div>
              <h2 className="text-[32px] lg:text-[40px] font-bold text-white mb-4 mt-8 font-space-grotesk leading-tight">
                AI <span className="text-[#00B8F0]">FRONTIER 2026</span>
              </h2>
              <p className="text-[16px] text-[#8A9EB0] leading-relaxed mb-8">
                The premier summit for AI engineering. Two days of deep technical sessions, architectural breakdowns, and hands-on building with 500+ engineers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 text-[14px] mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-white/10 bg-[#050B14] flex items-center justify-center"><Calendar className="w-4 h-4 text-[#00B8F0]"/></div>
                  <div className="text-white">May 24-25, 2026</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-white/10 bg-[#050B14] flex items-center justify-center"><MapPin className="w-4 h-4 text-[#00B8F0]"/></div>
                  <div className="text-white">Bangalore, India</div>
                </div>
              </div>
              
              <div>
                <Link href="/community/events/ai-frontier-2026" className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-6 py-3 rounded text-[14px] flex items-center gap-2 inline-flex">
                  View Event Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:w-1/2 h-[300px] lg:h-auto bg-[#050B14] relative overflow-hidden flex items-center justify-center border-l border-[#1E293B]">
               {/* Abstract 3D/Grid graphic representing the event */}
               <div className="relative w-64 h-64">
                 <div className="absolute inset-0 border-2 border-[#00B8F0]/30 rounded-full animate-[spin_20s_linear_infinite]"></div>
                 <div className="absolute inset-4 border border-[#00B8F0]/50 rounded-full animate-[spin_15s_linear_infinite_reverse] border-dashed"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-space-grotesk font-bold text-[60px] text-[#00B8F0]/20 select-none">AI</span>
                 </div>
                 
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#0A111F] border border-[#00B8F0]/50 shadow-[0_0_40px_rgba(0,184,240,0.2)] rotate-12 flex flex-col items-center justify-center backdrop-blur-md">
                    <div className="w-full h-1 bg-[#00B8F0] absolute top-0"></div>
                    <Activity className="w-8 h-8 text-white mb-2" />
                    <span className="text-[10px] text-[#00B8F0] font-mono tracking-wider">SYSTEMS</span>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* OPEN SOURCE HIGHLIGHTS */}
      <section className="section-pad">
        <div className="wrap">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-[0.12em] mb-2">BUILD IN PUBLIC</div>
              <h2 className="text-[30px] font-semibold text-white">Open Source Projects</h2>
            </div>
            <a href="https://github.com/botmartz" target="_blank" rel="noopener noreferrer" className="btn border border-[#1E293B] hover:border-[#00B8F0] text-white px-6 py-2 rounded text-[13px] flex items-center gap-2">
              View GitHub Profile <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Repo 1 */}
            <div className="border border-[#1E293B] rounded-lg p-6 bg-[#0A111F] hover:border-[#00B8F0] transition-colors group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#050B14] rounded border border-[#1E293B] flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-semibold text-[16px] text-white group-hover:text-[#00B8F0] transition-colors">botmartz/rag-eval-suite</h4>
                </div>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1 text-[11px] font-mono text-[#8A9EB0] bg-[#050B14] px-2 py-1 rounded border border-[#1E293B]"><span className="w-2 h-2 rounded-full bg-yellow-400"></span> Python</span>
                </div>
              </div>
              <p className="text-[14px] text-[#8A9EB0] mb-6 line-clamp-2">
                A comprehensive evaluation suite for production RAG systems. Includes automated metrics for context precision, recall, and hallucination detection.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#8A9EB0]">
                <span className="flex items-center gap-1">⭐ 245</span>
                <span className="flex items-center gap-1">🔄 42</span>
              </div>
            </div>

            {/* Repo 2 */}
            <div className="border border-[#1E293B] rounded-lg p-6 bg-[#0A111F] hover:border-[#00B8F0] transition-colors group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#050B14] rounded border border-[#1E293B] flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-semibold text-[16px] text-white group-hover:text-[#00B8F0] transition-colors">botmartz/agent-guardrails</h4>
                </div>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1 text-[11px] font-mono text-[#8A9EB0] bg-[#050B14] px-2 py-1 rounded border border-[#1E293B]"><span className="w-2 h-2 rounded-full bg-blue-500"></span> TypeScript</span>
                </div>
              </div>
              <p className="text-[14px] text-[#8A9EB0] mb-6 line-clamp-2">
                Middleware for LLM agents to enforce structured outputs, prevent prompt injection, and validate tool execution safety before API calls.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#8A9EB0]">
                <span className="flex items-center gap-1">⭐ 128</span>
                <span className="flex items-center gap-1">🔄 15</span>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
