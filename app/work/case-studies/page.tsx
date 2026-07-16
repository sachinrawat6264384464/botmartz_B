import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { adminDb } from '@/lib/firebase-admin';
import { ArrowRight, Terminal, Code2, Layout, BookOpen } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'AI Case Studies | Botmartz AI',
    description: 'Discover how we partner with leading organizations to deploy production-ready AI agents and RAG systems.',
  };
  
  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("case-studies").get();
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
      url: 'https://botmartz.com/work/case-studies',
      type: 'website',
    },
  };
}

const DEFAULT_INTRO = {
  hero: {
    badge: "Work / Case Studies",
    title: "Proven AI Implementations. Real Business Results.",
    subtitle: "Discover how we partner with leading organizations to deploy production-ready AI agents and RAG systems that drive operational efficiency and unlock new capabilities.",
    ctaText: "Start a Conversation →",
    ctaLink: "/contact",
  },
  cta: {
    title: "Want to see similar results in your organization?",
    subtitle: "Let's discuss how custom AI engineering can solve your specific business challenges.",
    buttonText: "Book a Discovery Call →"
  },
  structuredData: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AI Case Studies",
    "provider": {
      "@type": "Organization",
      "name": "Botmartz AI Solutions"
    }
  })
};

const DEFAULT_STUDIES = [
  {
    id: "logistics-rag",
    title: "Enterprise Knowledge Search for Global Logistics",
    excerpt: "We partnered with a Fortune 500 logistics provider to build a secure enterprise RAG system. The solution unified search across 500K+ internal documents, complex SOPs, and manuals, allowing operations teams to instantly query policy data and compliance standards without hallucinations.",
    clientName: "Global Logistics Company",
    category: "Logistics",
    tags: ["RAG", "Hybrid Search", "70%", "3.2x", "LangChain", "Pinecone", "FastAPI"],
    featuredImage: "",
    status: "published"
  },
  {
    id: "saas-support",
    title: "Autonomous Support Agent for SaaS Platform",
    excerpt: "Developed a context-aware AI support agent that integrates directly into the client's Zendesk and internal databases. The agent autonomously resolves Tier 1 and Tier 2 tickets, executes basic account actions via API, and seamlessly escalates complex issues to human agents with full context.",
    clientName: "SaaS Platform",
    category: "SaaS",
    tags: ["LangGraph", "OpenAI", "45%", "35%", "Redis", "FastAPI", "Docker"],
    featuredImage: "",
    status: "published"
  },
  {
    id: "legal-doc-intel",
    title: "Legal Document Intelligence & Extraction Platform",
    excerpt: "Built a highly specialized RAG pipeline featuring advanced OCR (Optical Character Recognition) to automate contract analysis. The system ingested over 100K dense legal documents, extracting key clauses, liabilities, and risks into structured data formats for immediate review.",
    clientName: "Legal Tech Company",
    category: "Legal",
    tags: ["RAG", "OCR", "90%", "95%", "LlamaIndex", "Qdrant", "PostgreSQL"],
    featuredImage: "",
    status: "published"
  }
];

export default async function CaseStudiesPage() {
  let intro = { ...DEFAULT_INTRO };
  let studies: any[] = [];

  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("case-studies").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      intro = {
        hero: data?.hero || DEFAULT_INTRO.hero,
        cta: data?.cta || DEFAULT_INTRO.cta,
        structuredData: data?.structuredData || DEFAULT_INTRO.structuredData
      };
    }
  } catch (e) {}

  try {
    const querySnapshot = await adminDb
      .collection("case-studies")
      .where("status", "==", "published")
      .orderBy("createdAt", "desc")
      .get();
      
    if (querySnapshot.empty) {
      studies = DEFAULT_STUDIES;
    } else {
      studies = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
  } catch (e) {
    try {
      const fallbackSnapshot = await adminDb.collection("case-studies").get();
      studies = fallbackSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((d: any) => d.status === "published");
      if (studies.length === 0) studies = DEFAULT_STUDIES;
    } catch (err) {
      studies = DEFAULT_STUDIES;
    }
  }

  return (
    <main className="bg-[#050B14] min-h-screen text-white">
      {intro.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: intro.structuredData }}
        />
      )}
      
      {/* HERO SECTION (DARK CENTERED) */}
      <section className="relative pt-[120px] pb-[80px] bg-[#050B14] text-white overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="wrap relative z-10 flex flex-col items-center text-center max-w-[800px] mx-auto">
          <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-6 flex items-center justify-center gap-3 font-semibold">
            <span className="w-6 h-px bg-[#00B8F0]"></span>
            {intro.hero.badge || "Case Studies"}
            <span className="w-6 h-px bg-[#00B8F0]"></span>
          </div>
          <h1 
            className="text-[clamp(40px,6vw,64px)] leading-[1.05] font-semibold mb-6 tracking-tight text-white"
            dangerouslySetInnerHTML={{ __html: intro.hero.title }}
          />
          <p className="text-[17px] sm:text-[19px] text-[#8A9EB0] mb-10 max-w-[600px] leading-relaxed font-light">
            {intro.hero.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={intro.hero.ctaLink || "/contact"} className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-8 py-3.5 rounded text-[15px] flex items-center gap-2">
              {intro.hero.ctaText || "Start a Conversation →"}
            </Link>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-16 relative w-full flex justify-center min-h-[400px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#0066FF]/20 blur-[100px] rounded-full pointer-events-none z-0" />
          <Image
            src="/case-studies.png"
            alt="Case Studies"
            width={600}
            height={400}
            className="object-contain w-full max-w-[600px] h-auto relative z-10 drop-shadow-[0_0_30px_rgba(0,184,240,0.15)]"
            priority
          />
        </div>
      </section>

      {/* CASE STUDIES GRID */}
      <section className="py-[100px] bg-[#0A111F] border-y border-[#1E293B]">
        <div className="wrap flex flex-col gap-10">
           
           {studies.map((study, idx) => {
             // Parse metrics and tags dynamically from study.tags
             const tagsList = study.tags || [];
             const metrics = tagsList.filter((t: string) => t.includes("%") || /^\d+(\.\d+)?x$/.test(t));
             const otherTags = tagsList.filter((t: string) => !t.includes("%") && !/^\d+(\.\d+)?x$/.test(t));

             return (
               <div key={study.id} className="flex flex-col md:flex-row gap-8 items-stretch pb-10 border-b border-[#1E293B] group last:border-b-0">
                  {/* Left Thumbnail visual placeholder */}
                  <div className="w-full md:w-[45%] lg:w-[40%] bg-[#050B14] rounded-xl border border-[#1E293B] overflow-hidden relative min-h-[260px] group-hover:border-[#00B8F0]/50 transition-colors">
                     {study.featuredImage ? (
                       <img 
                         src={study.featuredImage} 
                         alt={study.title} 
                         className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                       />
                     ) : (
                       <>
                         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00B8F0]/5 via-transparent to-transparent"></div>
                         <div className="absolute inset-4 bg-[#0A111F]/50 border border-[#1E293B] rounded-lg backdrop-blur flex items-center justify-center p-4">
                           <div className="w-full h-full border border-[#1E293B] rounded flex flex-col opacity-50 overflow-hidden">
                              <div className="h-4 border-b border-[#1E293B] w-full bg-[#050B14]"></div>
                              <div className="flex-1 flex gap-2 p-2">
                                <div className="w-1/3 h-full border border-[#1E293B] rounded-sm bg-[#050B14]"></div>
                                <div className="flex-1 h-full border border-[#1E293B] rounded-sm flex flex-col gap-2 p-2 bg-[#050B14]">
                                   <div className="h-2 w-full bg-[#1E293B] rounded"></div>
                                   <div className="h-2 w-2/3 bg-[#1E293B] rounded"></div>
                                </div>
                              </div>
                           </div>
                         </div>
                       </>
                     )}
                  </div>
                  
                  {/* Right Details */}
                  <div className="flex-1 flex flex-col justify-between py-2">
                     <div>
                        <div className="font-mono text-[10px] text-[#00B8F0] uppercase bg-[#00B8F0]/10 inline-block px-3 py-1 rounded-sm mb-4 font-semibold tracking-wider">
                          {study.clientName || "Client"} • {study.category || "AI engineering"}
                        </div>
                        <h3 className="text-[24px] md:text-[28px] font-semibold mb-4 text-white group-hover:text-[#00B8F0] transition-colors leading-tight">
                          {study.title}
                        </h3>
                        <p className="text-[15px] md:text-[16px] text-[#8A9EB0] mb-6 leading-relaxed">
                          {study.excerpt}
                        </p>
                        
                        {/* Tech Tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                           {otherTags.map((t: string) => (
                             <span key={t} className="font-mono text-[11px] border border-[#1E293B] bg-[#050B14] text-[#8A9EB0] px-2.5 py-1 rounded-sm">{t}</span>
                           ))}
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-8 border-t border-[#1E293B] pt-6 mt-auto">
                        {metrics.map((m: string, mIdx: number) => (
                          <div key={mIdx}>
                             <div className="text-[24px] font-semibold leading-none mb-1 text-white group-hover:text-[#00B8F0] transition-colors">{m}</div>
                             <div className="text-[12px] text-[#8A9EB0]">
                               {mIdx === 0 ? (m.includes("%") ? "Performance Gain" : "Scale Boost") : (m.includes("%") ? "Efficiency rate" : "Productivity factor")}
                             </div>
                          </div>
                        ))}
                        {metrics.length === 0 && (
                          <div>
                            <div className="text-[24px] font-semibold leading-none mb-1 text-white group-hover:text-[#00B8F0] transition-colors">Deploy</div>
                            <div className="text-[12px] text-[#8A9EB0]">Production status</div>
                          </div>
                        )}
                        <Link href="/contact" className="ml-auto font-mono text-[13px] text-[#00B8F0] hover:text-white flex items-center gap-2 group-hover:gap-3 transition-all">
                          Discuss a similar project <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                     </div>
                  </div>
               </div>
             );
           })}

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
                {intro.cta.title}
              </h2>
              <p className="text-[#8A9EB0] text-[17px] md:text-[19px] max-w-[600px] mx-auto mb-10 leading-relaxed font-light">
                {intro.cta.subtitle}
              </p>
              <Link href="/contact" className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-8 py-4 rounded text-[15px] inline-flex items-center gap-2 font-medium">
                {intro.cta.buttonText}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
