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
    title: 'Enterprise RAG & Knowledge Intelligence',
    description: 'We turn scattered documents, policies and SOPs into production-ready RAG systems in 4–6 weeks. Grounded answers, verifiable citations, measured retrieval quality.',
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
      title: 'Enterprise RAG & Knowledge Intelligence',
      description: 'Focused 4–6 week Enterprise Knowledge AI pilots for document-heavy teams. Hybrid retrieval, citation-backed answers, benchmark evaluation from day one.',
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
    badge: "SOLUTIONS / KNOWLEDGE & SEARCH SYSTEMS",
    title: "Stop Building Fragile Chatbots. Start Building Verified Knowledge & Search Systems.",
    subtitle: "We help organizations turn complex documents, policies, SOPs, and scattered databases into accurate, production-ready search and RAG systems. Grounded answers. Verifiable citations. Refuses when evidence is missing.",
    ctaText: "BOOK AN ARCHITECTURE REVIEW →",
    ctaLink: "https://cal.com/botmartz-ai/20min",
    secondaryCtaText: "See Reference Implementation",
    secondaryCtaLink: "/work/labs/insurance-intelligence",
  },
  problemSolution: {
    title: "Why Most RAG Pilots Fail in Production (And How We Engineer Reliability)",
    trap: "Most generic AI agencies build ungrounded chat wrappers using simple prompt stuffing. In production, these break down over multi-page tables, hallucinate missing clauses, and fail to respect document permissions.",
    approach: "We engineer deterministic Knowledge AI Systems. We implement layout-aware table extraction, hybrid dense/sparse search, cross-encoder reranking, and automated RAGAS evaluation harnesses. If evidence is absent, the system refuses to guess."
  },
  features: [
    { iconName: "Search", title: "Hybrid Search & Cross-Encoder Reranking", desc: "We fuse vector semantic search with BM25 keyword matching, then pass results through cross-encoders to maximize contextual precision on your exact corpus." },
    { iconName: "ShieldCheck", title: "Verifiable Source Citations", desc: "Every generated claim links directly to the exact paragraph and page in your internal documents. If evidence is missing, the system refrains from answering." },
    { iconName: "BarChart", title: "Automated Evaluation Harnesses", desc: "We build automated evaluation benchmarks (RAGAS) from day one to quantify faithfulness, context recall@k, and answer relevancy on real business queries." },
    { iconName: "Lock", title: "Permission-Aware RBAC & Security", desc: "Strict document-level access control, private VPC deployment options, and alignment with data protection and governance frameworks." }
  ],
  process: [
    { step: "01", title: "Architecture Review", duration: "1–2 Days", cost: "Collaborative", desc: "We review your document sources, evaluate search platforms (OpenSearch, Qdrant, Weaviate, Elastic), and define a clear architecture decision tree before writing any code." },
    { step: "02", title: "Knowledge Search MVP", duration: "3–4 Weeks", cost: "Sprint-Based", desc: "We ingest core documents, set up hybrid retrieval and reranking, enforce citation provenance, and deliver a secure working application with an evaluation benchmark report." },
    { step: "03", title: "Production Hardening", duration: "Add 2–4 Weeks", cost: "Enterprise Scope", desc: "We scale the MVP into full enterprise production with observability, human-in-the-loop validation, connector sync, and strict RBAC controls." },
    { step: "04", title: "Managed Optimization", duration: "Ongoing", cost: "Monthly Retainer", desc: "Retrieval drift detection, evaluation runs, embedding fine-tuning, prompt optimization, and monthly architecture reviews for production systems." }
  ],
  pricingNotes: [
    "Stack-Neutral Engineering: We select and implement retrieval backends (OpenSearch, Qdrant, Weaviate, Elastic, pgvector) based strictly on client scale and infrastructure requirements."
  ],
  useCases: [
    { iconName: "Briefcase", title: "Insurance & Regulatory Compliance", description: "Navigate dense insurance policy forms, state filings, and compliance guidelines with verified paragraph citations and clause comparison." },
    { iconName: "HelpCircle", title: "Support Ticket Deflection", description: "Give support engineers instant, cited answers drawn from thousands of technical manuals, so resolution time drops safely." },
    { iconName: "LayoutTemplate", title: "Manufacturing & Engineering SOPs", description: "Turn dense technical manuals and standard operating procedures into an accessible, searchable interface your floor teams will actually use." },
    { iconName: "FileSearch", title: "Legal & Research Knowledge", description: "Surface precedent, internal memos, regulatory updates and research documentation with strict confidentiality boundaries." }
  ],
  techStack: ["OpenSearch", "Qdrant", "Weaviate", "Elastic", "LlamaIndex", "FastAPI", "RAGAS", "AWS", "Azure", "GCP"],
  cta: {
    title: "Let's Map Out Your Knowledge & Search Architecture.",
    subtitle: "Bring your toughest document challenge. We'll show you exactly how to structure ingestion, retrieval, and evaluation to get it into production reliably.",
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
