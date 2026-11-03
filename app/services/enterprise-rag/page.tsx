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
    title: 'Enterprise RAG Consulting & Architecture Services',
    description: 'Botmartz provides enterprise RAG consulting and architecture services. We build citation-grounded hybrid search pipelines benchmarked with RAGAS, secured by RBAC, and delivered in 4–6 week production pilots.',
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
      title: `${meta.title} | Botmartz`,
      description: meta.description,
      url: 'https://www.botmartz.com/services/enterprise-rag',
      type: 'website',
      images: [
        {
          url: 'https://www.botmartz.com/BotmartznewBot.png',
          width: 1200,
          height: 630,
          alt: 'Botmartz - Enterprise RAG Consulting & Architecture Services',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${meta.title} | Botmartz`,
      description: meta.description,
      images: ['https://www.botmartz.com/BotmartznewBot.png'],
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
    secondaryCtaText: "Explore Open Source Retriever",
    secondaryCtaLink: "/work/open-source",
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
    { iconName: "Briefcase", title: "Immigration & Statutory Regulatory Intelligence (VisaDesk)", description: "Navigate thousands of pages of dynamic immigration statutes, policy updates, and legal evidence requirements with verified paragraph citations and automated clause comparison." },
    { iconName: "FileSearch", title: "Environmental & Municipal Legal Precedent (CEQA & NEPA)", description: "Query 30+ year libraries of Environmental Impact Reports (EIRs) and mitigation monitoring programs with sub-3-second hybrid BM25/Dense retrieval and court-defensible citations." },
    { iconName: "LayoutTemplate", title: "Aerospace MRO Technical Diagnostics (Aviotron)", description: "Parse dense multi-volume aircraft maintenance manuals, service bulletins, and FAA/EASA airworthiness directives with zero hallucinated part specifications." },
    { iconName: "HelpCircle", title: "Enterprise Creative & Brand SOP Intelligence", description: "Index multi-brand style guides, packaging guidelines, and creative asset catalogs for instant semantic retrieval during automated marketing composition." }
  ],
  techStack: ["OpenSearch", "Qdrant", "Weaviate", "Elastic", "LlamaIndex", "FastAPI", "RAGAS", "AWS", "Azure", "GCP"],
  cta: {
    title: "Let's Map Out Your Knowledge & Search Architecture.",
    subtitle: "Bring your toughest document challenge. We'll show you exactly how to structure ingestion, retrieval, and evaluation to get it into production reliably.",
    buttonText: "Book Your Architecture Review →"
  },
  answerCapsule: {
    question: "What is Production Enterprise RAG?",
    answer: "Production Enterprise RAG is an architecture that transforms private company documentation into reliable, deterministic intelligence. Rather than relying on simple vector lookup, it integrates layout-aware parsing, BM25 dense/sparse hybrid search, cross-encoder reranking, and citation provenance. Every answer links to exact paragraphs, and the system explicitly abstains from answering when source evidence is absent."
  },
  faqs: [
    {
      q: "How does Botmartz eliminate hallucinations in enterprise document search?",
      a: "We enforce strict citation grounding at the retrieval layer. We combine hybrid vector search (Qdrant/OpenSearch) with BM25 keyword matching and cross-encoder reranking. If the retrieved context confidence falls below our benchmarked threshold, the model is architected to explicitly state that evidence is missing rather than speculating."
    },
    {
      q: "What is your typical pilot timeline and pricing structure?",
      a: "We deploy focused, production-grade RAG MVPs in 4–6 weeks. Sprints begin with a 1–2 day collaborative architecture review, followed by data ingestion, hybrid retrieval setup, and automated RAGAS evaluation. Architecture reviews are fixed at collaborative terms; pilot MVPs range from ₹3.5L to ₹8L ($4,200 to $9,500) depending on document volume, connector complexity, and private VPC security requirements."
    },
    {
      q: "Can our RAG system be deployed inside our private cloud (VPC) for DPDPA / GDPR compliance?",
      a: "Yes. We specialize in private VPC deployments on AWS (ap-south-1), Azure (Central India), or GCP (Mumbai). Your internal documents, embeddings, and telemetry never leave your protected network boundary, ensuring full alignment with Indian Digital Personal Data Protection Act (DPDPA) and enterprise compliance standards."
    },
    {
      q: "How do you benchmark and measure RAG retrieval performance?",
      a: "From day one, we implement automated evaluation harnesses using RAGAS and custom test fixtures. We continuously measure context precision, context recall@k, faithfulness, and answer relevancy against real enterprise queries before clearing production deployment."
    }
  ],
  structuredData: JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://www.botmartz.com/services/enterprise-rag#service",
        "name": "Enterprise RAG & Knowledge Intelligence",
        "provider": {
          "@type": "Organization",
          "name": "Botmartz AI Solutions Private Limited",
          "url": "https://www.botmartz.com"
        },
        "description": "Turn scattered documents, policies and SOPs into production-ready RAG systems in 4–6 weeks with verifiable citations and RAGAS benchmarked retrieval quality.",
        "serviceType": "AI Engineering Services",
        "areaServed": "Global",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Enterprise RAG Implementation Sprints"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.botmartz.com/services/enterprise-rag#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does Botmartz eliminate hallucinations in enterprise document search?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We enforce strict citation grounding at the retrieval layer. We combine hybrid vector search (Qdrant/OpenSearch) with BM25 keyword matching and cross-encoder reranking. If the retrieved context confidence falls below our benchmarked threshold, the model is architected to explicitly state that evidence is missing rather than speculating."
            }
          },
          {
            "@type": "Question",
            "name": "What is your typical pilot timeline and pricing structure?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We deploy focused, production-grade RAG MVPs in 4–6 weeks. Architecture reviews are fixed at collaborative terms; pilot MVPs range from ₹3.5L to ₹8L ($4,200 to $9,500) depending on document volume, connector complexity, and private VPC security requirements."
            }
          },
          {
            "@type": "Question",
            "name": "Can our RAG system be deployed inside our private cloud (VPC) for DPDPA / GDPR compliance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We specialize in private VPC deployments on AWS (ap-south-1), Azure, or GCP. Your internal documents, embeddings, and telemetry never leave your protected network boundary, ensuring full alignment with Indian DPDPA compliance."
            }
          }
        ]
      }
    ]
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
        answerCapsule: data?.answerCapsule || DEFAULT_CONTENT.answerCapsule,
        faqs: data?.faqs || DEFAULT_CONTENT.faqs,
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
