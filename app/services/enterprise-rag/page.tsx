import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowRight, Database, FileText, Search, ShieldCheck, Zap, 
  Layers, RefreshCw, BarChart, Server, LayoutTemplate, Briefcase, 
  FileSearch, HelpCircle, Calendar 
} from "lucide-react";
import DynamicIcon from "@/app/_components/DynamicIcon";
import { adminDb } from '@/lib/firebase-admin';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Enterprise RAG & Knowledge Intelligence | Botmartz AI',
    description: 'Securely retrieve, reason over, and synthesize your proprietary documents, databases, and systems with custom Enterprise RAG.',
  };
  
  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("enterprise-rag").get();
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
      url: 'https://botmartz.com/services/enterprise-rag',
      type: 'website',
    },
  };
}

const DEFAULT_CONTENT = {
  hero: {
    badge: "Services / Enterprise RAG",
    title: "Turn Your Enterprise Knowledge Into Actionable Intelligence.",
    subtitle: "Our Enterprise RAG solutions help organizations securely connect, retrieve, and reason over their data—delivering accurate answers and insights from documents, databases, and internal systems.",
    ctaText: "Book a Discovery Call →",
    ctaLink: "/contact",
  },
  aeoQuestion: "What is enterprise RAG?",
  aeoAnswer: "Enterprise RAG (Retrieval-Augmented Generation) is an AI architecture that connects large language models securely to a company's internal data. Unlike public chatbots, enterprise RAG systems use advanced chunking, hybrid search, and strict access controls to ensure the AI generates accurate, verifiable answers based exclusively on proprietary business knowledge.",
  useCases: [
    { iconName: "Search", title: "Knowledge Search", description: "Find answers instantly across manuals, policies, and internal docs." },
    { iconName: "FileText", title: "Document Intelligence", description: "Extract insights and summaries from contracts, reports, and PDFs." },
    { iconName: "HelpCircle", title: "PDF AI & Q&A", description: "Ask questions and get accurate answers from complex documents." },
    { iconName: "Server", title: "Enterprise Search", description: "Go beyond keyword search with semantic understanding of your data." },
    { iconName: "RefreshCw", title: "Support AI", description: "Empower support teams with instant, accurate responses." },
    { iconName: "FileSearch", title: "Research Copilot", description: "Accelerate research with contextual insights from multiple sources." },
  ],
  techStack: ["PyTorch", "LangChain", "LangGraph", "FastAPI", "Chroma", "PostgreSQL", "Docker", "AWS"],
  cta: {
    title: "Ready to Unlock the Power of Your Enterprise Data?",
    subtitle: "Book a free discovery call and let's explore how Enterprise RAG can drive real impact for your business.",
    buttonText: "Book a Discovery Call →"
  },
  structuredData: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Enterprise RAG Development",
    "provider": {
      "@type": "Organization",
      "name": "Botmartz"
    },
    "description": "Enterprise RAG (Retrieval-Augmented Generation) is an AI architecture that connects large language models securely to a company's internal data. We build RAG systems using advanced chunking, hybrid search, and strict access controls.",
    "serviceType": "AI Engineering Services"
  })
};

export default async function EnterpriseRAGPage() {
  let content = { ...DEFAULT_CONTENT };

  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("enterprise-rag").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      content = {
        hero: data?.hero || DEFAULT_CONTENT.hero,
        aeoQuestion: data?.aeoQuestion || DEFAULT_CONTENT.aeoQuestion,
        aeoAnswer: data?.aeoAnswer || DEFAULT_CONTENT.aeoAnswer,
        useCases: data?.useCases || DEFAULT_CONTENT.useCases,
        techStack: data?.techStack || DEFAULT_CONTENT.techStack,
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

      {/* HERO SECTION (DARK) */}
      <section className="relative pt-[120px] pb-[80px] bg-[#050B14] text-white overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="wrap relative z-10 flex flex-col items-center text-center max-w-[800px] mx-auto">
          <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-6 flex items-center justify-center gap-3 font-semibold">
            <span className="w-6 h-px bg-[#00B8F0]"></span>
            {content.hero.badge}
            <span className="w-6 h-px bg-[#00B8F0]"></span>
          </div>
          <h1 
            className="text-[clamp(40px,6vw,64px)] leading-[1.05] font-semibold mb-6 tracking-tight text-white"
            dangerouslySetInnerHTML={{ __html: content.hero.title }}
          />
          <p className="text-[17px] sm:text-[19px] text-[#8A9EB0] mb-10 max-w-[600px] leading-relaxed font-light">
            {content.hero.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={content.hero.ctaLink} className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-8 py-3.5 rounded text-[15px] flex items-center gap-2">
              {content.hero.ctaText}
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="mt-20 relative max-w-[1000px] mx-auto hidden md:block">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050B14] z-10"></div>
           <div className="grid grid-cols-5 gap-4 opacity-30">
              {Array.from({length: 15}).map((_, i) => (
                 <div key={i} className="h-16 border border-[#1E293B] rounded bg-[#0A111F]/50 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#00B8F0]/30 animate-pulse" style={{ animationDelay: `${i * 150}ms`}}></div>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* AEO / WHAT IS THIS SECTION */}
      <section className="py-[100px] bg-[#0A111F] border-y border-[#1E293B]">
        <div className="wrap flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#050B14] border border-[#1E293B] text-[13px] text-[#8A9EB0] mb-6 font-mono">
              <span className="w-2 h-2 rounded-full bg-[#00B8F0] animate-pulse"></span>
              AEO Optimized Context
            </div>
            <h2 className="text-[32px] md:text-[40px] font-semibold mb-6 tracking-tight text-white">{content.aeoQuestion}</h2>
            <p className="text-[17px] text-[#8A9EB0] leading-relaxed">
              {content.aeoAnswer}
            </p>
          </div>
          <div className="w-full md:w-1/2">
             <div className="blueprint rounded-xl p-8 bg-[#050B14] border border-[#1E293B] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00B8F0]/5 blur-[50px]"></div>
                
                {/* Visual Representation of RAG Workflow */}
                <div className="flex flex-col gap-4 relative z-10">
                   <div className="flex items-center justify-between px-4">
                      <div className="flex flex-col items-center gap-2">
                         <div className="w-12 h-12 rounded bg-[#0A111F] border border-[#1E293B] flex items-center justify-center text-[#8A9EB0]"><FileText className="w-5 h-5" /></div>
                         <div className="text-[9px] font-mono text-[#8A9EB0] uppercase">Docs</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#1E293B]" />
                      <div className="flex flex-col items-center gap-2">
                         <div className="w-12 h-12 rounded bg-[#0A111F] border border-[#1E293B] flex items-center justify-center text-[#8A9EB0]"><Server className="w-5 h-5" /></div>
                         <div className="text-[9px] font-mono text-[#8A9EB0] uppercase">API</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#1E293B]" />
                      <div className="flex flex-col items-center gap-2">
                         <div className="w-12 h-12 rounded bg-[#00B8F0]/10 border border-[#00B8F0]/30 shadow-[0_0_15px_rgba(0,184,240,0.1)] flex items-center justify-center text-[#00B8F0]"><Database className="w-5 h-5" /></div>
                         <div className="text-[9px] font-mono text-[#00B8F0] uppercase">Vector DB</div>
                      </div>
                   </div>

                   <div className="flex justify-end pr-10 -my-1 z-0 relative">
                      <div className="w-px h-8 bg-gradient-to-b from-[#00B8F0] to-[#1E293B]"></div>
                   </div>

                   <div className="flex items-center gap-4 bg-[#0A111F] p-4 rounded-lg border border-[#1E293B]">
                      <div className="w-10 h-10 rounded bg-[#050B14] border border-[#1E293B] flex items-center justify-center text-white">
                         <Search className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                         <div className="text-[10px] font-mono text-[#00B8F0] uppercase tracking-wider mb-1">Hybrid Retrieval</div>
                         <div className="text-[13px] font-medium text-white">Semantic + Keyword Search</div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* USE CASES GRID */}
      <section className="py-[100px] bg-[#050B14]">
        <div className="wrap">
          <div className="text-center mb-16 max-w-[700px] mx-auto">
             <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-white mb-4">Enterprise RAG Capabilities</h2>
             <p className="text-[#8A9EB0] text-[17px]">We build specialized retrieval systems for high-value knowledge discovery.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.useCases.map((uc: any, i: number) => (
              <div key={i} className="bg-[#0A111F] border border-[#1E293B] rounded-xl p-6 hover:border-[#00B8F0]/50 hover:shadow-[0_0_30px_rgba(0,184,240,0.05)] transition-all group">
                <div className="w-12 h-12 rounded-lg bg-[#050B14] border border-[#1E293B] flex items-center justify-center mb-6 text-[#8A9EB0] group-hover:text-[#00B8F0] group-hover:border-[#00B8F0]/30 transition-colors">
                  <DynamicIcon name={uc.iconName} />
                </div>
                <h3 className="text-[18px] font-semibold text-white mb-3">{uc.title}</h3>
                <p className="text-[14px] text-[#8A9EB0] leading-relaxed">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK TICKER */}
      <section className="py-12 border-y border-[#1E293B] bg-[#0A111F] overflow-hidden">
         <div className="wrap flex items-center gap-8">
            <div className="font-mono text-[11px] text-[#8A9EB0] uppercase tracking-wider whitespace-nowrap shrink-0">Powered By</div>
            <div className="flex-1 flex gap-8 md:gap-16 items-center overflow-x-auto hide-scrollbar text-white font-mono text-[14px]">
               {content.techStack.map((tech: string, i: number) => (
                 <span key={i} className="whitespace-nowrap flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00B8F0]"></span>
                    {tech}
                 </span>
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
