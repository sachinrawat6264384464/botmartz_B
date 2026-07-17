import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { adminDb } from '@/lib/firebase-admin';
import { ArrowRight, Terminal, Code2, Layout, BookOpen, ExternalLink } from "lucide-react";
import { CaseStudiesListingSection } from "./CaseStudiesListingSection";

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
  },
  {
    id: "logistics-planner",
    title: "Logistics Planner Agent for Global Supply Chain",
    excerpt: "Engineered a multi-agent logistics planning engine that predicts bottlenecks and re-routes high-value shipments in real time across global supply networks. Achieved 28% improved on-time delivery and 22% lower logistics costs.",
    clientName: "Global Supply Chain Leader",
    category: "Logistics",
    tags: ["LangGraph", "vLLM", "28%", "22%", "Milvus", "PostgreSQL", "Docker"],
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
      studies = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null
        };
      });
    }
  } catch (e) {
    try {
      const fallbackSnapshot = await adminDb.collection("case-studies").get();
      studies = fallbackSnapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
            updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null
          };
        })
        .filter((d: any) => d.status === "published");
      if (studies.length === 0) studies = DEFAULT_STUDIES;
    } catch (err) {
      studies = DEFAULT_STUDIES;
    }
  }

  // Ensure plain objects before passing to client components
  const sanitizedStudies = JSON.parse(JSON.stringify(studies));

  return (
    <main className="bg-[#050B14] min-h-screen text-white">
      {intro.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: intro.structuredData }}
        />
      )}
      
      {/* HERO SECTION */}
      <section className="relative pt-[110px] pb-[90px] bg-[#050B14] text-white overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-5%] w-[60%] h-[60%] bg-[#0066FF]/15 blur-[160px] rounded-full pointer-events-none" />

        <div className="wrap relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[13px] font-mono mb-12 text-[#8A9EB0]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/40">&gt;</span>
            <Link href="/work" className="hover:text-white transition-colors">Work</Link>
            <span className="text-white/40">&gt;</span>
            <span className="text-white font-medium">Case Studies</span>
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              <div className="font-mono text-[12px] tracking-[0.16em] text-[#00B8F0] uppercase font-bold mb-5">
                CASE STUDIES
              </div>
              <h1 className="text-[34px] sm:text-[48px] lg:text-[54px] leading-[1.08] font-bold mb-6 tracking-tight text-white">
                Real Problems.<br />
                <span className="text-[#0088FF]">Engineering</span> Solutions.
              </h1>
              <p className="text-[16px] sm:text-[18px] text-[#8A9EB0] mb-9 max-w-[500px] leading-relaxed font-normal">
                Explore how we design, build, and deploy production AI systems that deliver measurable business impact across industries.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <Link href="/contact" className="btn btn-primary bg-[#0066FF] hover:bg-[#0052CC] text-white px-7 py-3.5 rounded-lg text-[15px] font-medium transition-all shadow-[0_0_25px_rgba(0,102,255,0.35)] flex items-center justify-center gap-2 w-full sm:w-auto">
                  Book a Discovery Call <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="px-7 py-3.5 rounded-lg text-[15px] font-medium transition-all border border-[#1E293B] bg-[#0A111F]/80 hover:border-[#00B8F0] text-white flex items-center justify-center gap-2.5 w-full sm:w-auto">
                  Discuss Your Project <ExternalLink className="w-4 h-4 text-[#8A9EB0]" />
                </Link>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#0066FF]/25 blur-[120px] rounded-full pointer-events-none z-0" />
              <Image
                src="/case_studies3.png"
                alt="AI Performance Dashboard and Business Impact"
                width={850}
                height={620}
                sizes="(max-width: 1024px) 100vw, 780px"
                className="w-full max-w-[780px] h-auto object-contain relative z-10 drop-shadow-[0_0_50px_rgba(0,102,255,0.25)]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* SECTION 2: CASE STUDIES INTERACTIVE LISTING & IMPACT BANNER */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <CaseStudiesListingSection initialStudies={sanitizedStudies} />

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* SECTION 10: FINAL CTA */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <section className="py-[140px] bg-[#050B14] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg viewBox="0 0 1200 600" className="w-full h-full">
            <defs>
              <pattern id="blueprint" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#00B8F0" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="1200" height="600" fill="url(#blueprint)" />
          </svg>
        </div>

        <div className="wrap relative z-10 text-center">
          <h2 className="text-[36px] sm:text-[48px] md:text-[64px] font-semibold text-white leading-tight mb-6 max-w-[900px] mx-auto">
            Ready to Engineer<br />the Future?
          </h2>
          <p className="text-[16px] sm:text-[18px] text-[#8A9EB0] max-w-[600px] mx-auto mb-12 leading-relaxed">
            Partner with us to build production-grade AI systems that drive real business impact and scale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full max-w-[450px] sm:max-w-none mx-auto">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[12px] bg-[#00B8F0] text-[#050B14] font-semibold hover:bg-white transition-colors w-full sm:w-auto"
            >
              Book a Discovery Call <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/work/case-studies"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[12px] border-2 border-[#00B8F0] text-white font-semibold hover:bg-[#00B8F0]/10 transition-colors w-full sm:w-auto"
            >
              Explore Our Work <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
