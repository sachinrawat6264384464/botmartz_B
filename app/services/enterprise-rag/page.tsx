import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowRight, Database, FileText, Search, ShieldCheck, Zap, 
  Layers, RefreshCw, BarChart, Server, LayoutTemplate, Briefcase, 
  FileSearch, HelpCircle, Calendar 
} from "lucide-react";
import DynamicIcon from "@/app/_components/DynamicIcon";
import { getCachedDynamicPage } from '@/lib/fetch-helpers';
import InteractiveRAGSimulator from '@/app/_components/InteractiveRAGSimulator';
import EnterpriseRAGClient from "./EnterpriseRAGClient";

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Enterprise RAG & Knowledge Intelligence',
    description: 'Securely retrieve, reason over, and synthesize your proprietary documents, databases, and systems with custom Enterprise RAG.',
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
    },
    alternates: {
      canonical: 'https://www.botmartz.com/services/enterprise-rag',
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
    const data = await getCachedDynamicPage("enterprise-rag");
    if (data) {
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
