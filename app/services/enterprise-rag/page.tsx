import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowRight, Database, FileText, Search, ShieldCheck, Zap, 
  Layers, RefreshCw, BarChart, Server, LayoutTemplate, Briefcase, 
  FileSearch, HelpCircle, Calendar 
} from "lucide-react";
import DynamicIcon from "@/app/_components/DynamicIcon";
import { getCachedDynamicPage } from '@/lib/fetch-helpers';
import EnterpriseRAGClient from "./EnterpriseRAGClient";

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Enterprise RAG & Knowledge Intelligence | Botmartz AI Solutions',
    description: 'We turn scattered documents, policies and SOPs into production-ready RAG systems in 3–6 weeks. Grounded answers, verifiable citations, measured retrieval quality.',
  };
  
  try {
    const data = await getCachedDynamicPage("enterprise-rag");
    if (data?.metadata) {
      meta = { ...meta, ...data.metadata };
    }
  } catch (e) {}

  return {
    ...meta,
    openGraph: {
      title: 'Stop Building Chatbots. Start Building Reliable Enterprise Knowledge Systems.',
      description: 'Focused 3–4 week Enterprise Knowledge AI pilots for document-heavy teams. Hybrid retrieval, citation-backed answers, RAGAS evaluation from day one.',
      url: 'https://www.botmartz.com/services/enterprise-rag',
      type: 'website',
    },
    alternates: {
      canonical: 'https://www.botmartz.com/services/enterprise-rag',
    },
  };
}

const DEFAULT_CONTENT = {
  hero: {
    badge: "SERVICES / ENTERPRISE RAG",
    title: "Stop Building Chatbots. Start Building Reliable Enterprise Knowledge Systems.",
    subtitle: "We help mid-market companies turn scattered documents, policies and SOPs into accurate, production-ready RAG systems in 3 to 6 weeks. Grounded answers. Verifiable citations. Zero hype.",
    ctaText: "BOOK AN ARCHITECTURE REVIEW →",
    ctaLink: "/contact",
    secondaryCtaText: "See Our Pricing & Process",
    secondaryCtaLink: "#process",
  },
  problemSolution: {
    title: "Why Most RAG Pilots Die (And How We Survive)",
    trap: "Most AI agencies build you a six-month agentic platform that looks great in a demo and falls apart in production. Complexity gets added before accuracy gets proven.",
    approach: "We focus relentlessly on traditional RAG first. We ingest your PDFs, Confluence and SharePoint data, establish hybrid retrieval, and enforce strict citations. You get a working MVP in weeks. We only layer on autonomous agents once your knowledge base is proven and reliable."
  },
  features: [
    { iconName: "Search", title: "Hybrid Search & Reranking", desc: "We fuse vector and keyword search, then pass results through advanced rerankers to maximise contextual precision on your specific corpus." },
    { iconName: "ShieldCheck", title: "Verifiable Source Citations", desc: "Every answer links back to the exact paragraph in your internal documents. Where the evidence isn't there, the system abstains rather than guesses. If it can't cite it, it won't say it." },
    { iconName: "BarChart", title: "Built-in Evaluation", desc: "We implement evaluation harnesses (RAGAS and custom benchmark sets) from day one to measure faithfulness and answer relevance. You get hard metrics, not guesses." },
    { iconName: "Lock", title: "Enterprise Security & DPDP Ready", desc: "Role-Based Access Control, secure deployment options, and alignment with applicable data protection regulations including DPDP." }
  ],
  process: [
    { step: "01", title: "Architecture Review", duration: "1–2 Days", cost: "Free", desc: "We review your actual document sources and define a clear architecture decision tree before writing any code. You leave with a recommendation on whether a RAG pilot is technically and commercially justified, even if the answer is no." },
    { step: "02", title: "Enterprise Knowledge AI Pilot", duration: "3–4 Weeks", cost: "Starting at $5,000 (≈ ₹4.75L)", desc: "We ingest your core documents, set up hybrid retrieval and reranking, enforce citations, and deliver a secure web interface. You receive a working application, an evaluation benchmark, an accuracy report, and a production roadmap." },
    { step: "03", title: "Production Hardening", duration: "Add 2–4 Weeks", cost: "$15K – $25K+ (≈ ₹14.2L+)", desc: "We scale the pilot into a full enterprise system with advanced observability, human-in-the-loop feedback, source integrations and strict data controls." },
    { step: "04", title: "Managed AI Engineering", duration: "Ongoing", cost: "From $2,000/month (≈ ₹1.9L/month)", desc: "Retrieval optimisation, evaluation runs, ingestion updates, model and prompt tuning, monitoring, and a monthly architecture review. For teams running the system in production." }
  ],
  pricingNotes: [
    "Once your traditional RAG is hardened and trusted, we extend the system with multi-step agentic workflows and knowledge-graph retrieval where the data relationships justify it.",
    "Note: We understand budgets vary. If this pricing does not align with your current budget, we completely understand and prefer to be transparent upfront to respect your time."
  ],
  useCases: [
    { iconName: "HelpCircle", title: "Support Ticket Deflection", description: "Give support agents instant, cited answers drawn from thousands of past tickets and manuals, so resolution time drops instead of escalations rising." },
    { iconName: "Briefcase", title: "BFSI & Compliance", description: "Navigate heavy regulatory documents, insurance policies and claims guidelines with answers traced to the exact clause they came from." },
    { iconName: "LayoutTemplate", title: "Manufacturing & Engineering SOPs", description: "Turn dense technical manuals and standard operating procedures into an accessible, searchable interface your floor teams will actually use." },
    { iconName: "FileSearch", title: "Legal & Research Knowledge", description: "Surface precedent, internal memos, regulatory updates and research documentation without competing with the systems your teams already rely on." }
  ],
  techStack: ["LlamaIndex", "PostgreSQL", "pgvector", "FastAPI", "RAGAS", "Redis", "Docker", "AWS"],
  cta: {
    title: "Let's Map Out Your RAG Architecture.",
    subtitle: "Bring your toughest document challenge. We'll show you exactly how to structure ingestion, retrieval and evaluation to get it into production — and tell you honestly if it isn't worth building.",
    buttonText: "Book Your Architecture Review →"
  },
  structuredData: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Enterprise RAG & Knowledge Intelligence",
    "provider": {
      "@type": "Organization",
      "name": "Botmartz"
    },
    "description": "We turn scattered documents, policies and SOPs into production-ready RAG systems in 3–6 weeks. Grounded answers, verifiable citations, measured retrieval quality.",
    "serviceType": "AI Engineering Services"
  })
};

export default async function EnterpriseRAGPage() {
  let content = { ...DEFAULT_CONTENT };

  try {
    const data = await getCachedDynamicPage("enterprise-rag");
    if (data) {
      content = {
        hero: {
          badge: data?.hero?.badge || DEFAULT_CONTENT.hero.badge,
          title: data?.hero?.title || DEFAULT_CONTENT.hero.title,
          subtitle: data?.hero?.subtitle || DEFAULT_CONTENT.hero.subtitle,
          ctaText: data?.hero?.ctaText || DEFAULT_CONTENT.hero.ctaText,
          ctaLink: data?.hero?.ctaLink || DEFAULT_CONTENT.hero.ctaLink,
          secondaryCtaText: data?.hero?.secondaryCtaText || DEFAULT_CONTENT.hero.secondaryCtaText,
          secondaryCtaLink: data?.hero?.secondaryCtaLink || DEFAULT_CONTENT.hero.secondaryCtaLink,
        },
        problemSolution: {
          title: data?.problemSolution?.title || DEFAULT_CONTENT.problemSolution.title,
          trap: data?.problemSolution?.trap || DEFAULT_CONTENT.problemSolution.trap,
          approach: data?.problemSolution?.approach || DEFAULT_CONTENT.problemSolution.approach,
        },
        features: (Array.isArray(data?.features) && data.features.length > 0) ? data.features : DEFAULT_CONTENT.features,
        process: (Array.isArray(data?.process) && data.process.length > 0) ? data.process : DEFAULT_CONTENT.process,
        pricingNotes: (Array.isArray(data?.pricingNotes) && data.pricingNotes.length > 0) ? data.pricingNotes : DEFAULT_CONTENT.pricingNotes,
        useCases: (Array.isArray(data?.useCases) && data.useCases.length > 0) ? data.useCases : DEFAULT_CONTENT.useCases,
        techStack: (Array.isArray(data?.techStack) && data.techStack.length > 0) ? data.techStack : DEFAULT_CONTENT.techStack,
        cta: {
          title: data?.cta?.title || DEFAULT_CONTENT.cta.title,
          subtitle: data?.cta?.subtitle || DEFAULT_CONTENT.cta.subtitle,
          buttonText: data?.cta?.buttonText || DEFAULT_CONTENT.cta.buttonText,
        },
        structuredData: data?.structuredData || DEFAULT_CONTENT.structuredData
      };
    }
  } catch (e) {}

  return (
    <>
      {content.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: content.structuredData
          }}
        />
      )}
      <EnterpriseRAGClient content={content} />
    </>
  );
}
