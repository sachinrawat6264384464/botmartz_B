import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowRight, Database, Layout, Mail, MessageSquare, Calendar, 
  Globe, Server, ShieldCheck, Zap, Activity, Code, Briefcase, 
  FileSearch, HelpCircle, Users, Speaker, PieChart, Workflow, Lock, Settings 
} from "lucide-react";
import DynamicIcon from "@/app/_components/DynamicIcon";
import SchemaMarkup from "@/app/_components/SchemaMarkup";
import { adminDb } from '@/lib/firebase-admin';
import AIAgentsClient from "./AIAgentsClient";

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Intelligent AI Agents for Business',
    description: 'We build production-ready AI agents that reason, plan, take action, and deliver real business outcomes across your tools, data, and workflows.',
  };
  
  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("ai-agents").get();
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
      title: `${meta.title} | Botmartz`,
      description: meta.description,
      url: 'https://www.botmartz.com/services/ai-agents',
      type: 'website',
    },
    alternates: {
      canonical: 'https://www.botmartz.com/services/ai-agents',
    },
  };
}

const DEFAULT_CONTENT = {
  hero: {
    badge: "Services / AI Agents",
    title: "Intelligent AI Agents That Get Things Done.",
    subtitle: "We build production-ready AI agents that reason, plan, take action, and deliver real business outcomes across your tools, data, and workflows.",
    ctaText: "Book an AI Strategy Session →",
    ctaLink: "/contact",
  },
  aeoQuestion: "What are AI agents for business?",
  aeoAnswer: "AI agents for business are autonomous software systems that can plan, reason, and take action to solve complex workflows. Unlike traditional chatbots that only answer questions, enterprise AI agents connect to your internal tools (like CRM, databases, and email) to execute multi-step tasks such as customer support, sales research, and data analysis.",
  useCases: [
    { iconName: "Briefcase", title: "Sales Agents", description: "Qualify leads, research prospects, and draft personalized outreach that converts." },
    { iconName: "HelpCircle", title: "Support Agents", description: "Resolve tickets, find answers, and take actions across your systems." },
    { iconName: "FileSearch", title: "Research Agents", description: "Deep research, data synthesis, and insight reports in minutes, not hours." },
    { iconName: "Speaker", title: "Marketing Agents", description: "Create content, run campaigns, analyze performance, and optimize results." },
    { iconName: "Users", title: "HR Agents", description: "Screen resumes, answer employee queries, and streamline HR workflows." },
    { iconName: "Settings", title: "Ops Agents", description: "Monitor systems, trigger workflows, and ensure smooth operations." },
    { iconName: "Code", title: "Dev Agents", description: "Write code, review PRs, generate tests, and accelerate engineering velocity." },
    { iconName: "PieChart", title: "Finance Agents", description: "Reconcile data, flag anomalies, and generate financial reports." },
  ],
  techStack: ["LangGraph", "Google ADK", "OpenAI", "Anthropic", "FastAPI", "Pydantic", "PostgreSQL", "Redis"],
  cta: {
    title: "Ready to Deploy Intelligent AI Agents in Your Organization?",
    subtitle: "Let's design and build AI agents that automate work, enhance productivity, and drive real business outcomes.",
    buttonText: "Book an AI Strategy Session →"
  },
  structuredData: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Enterprise AI Agents Development",
    "provider": {
      "@type": "Organization",
      "name": "Botmartz"
    },
    "description": "AI agents for business are autonomous software systems that can plan, reason, and take action to solve complex workflows. We build enterprise AI agents that connect to your internal tools.",
    "serviceType": "AI Engineering Services"
  })
};

export default async function AIAgentsPage() {
  let content = { ...DEFAULT_CONTENT };

  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("ai-agents").get();
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
    <>
      {/* Dynamic SEO JSON-LD injection */}
      {content.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: content.structuredData
          }}
        />
      )}
      <AIAgentsClient content={content} />
    </>
  );
}
