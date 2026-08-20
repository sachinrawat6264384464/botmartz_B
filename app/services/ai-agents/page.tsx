import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowRight, Database, Layout, Mail, MessageSquare, Calendar, 
  Globe, Server, ShieldCheck, Zap, Activity, Code, Briefcase, 
  FileSearch, HelpCircle, Users, Speaker, PieChart, Workflow, Lock, Settings 
} from "lucide-react";
import DynamicIcon from "@/app/_components/DynamicIcon";
import SchemaMarkup from "@/app/_components/SchemaMarkup";
import { getCachedDynamicPage } from '@/lib/fetch-helpers';
import AIAgentsClient from "./AIAgentsClient";

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Intelligent AI Agents for Business',
    description: 'We build production-ready AI agents that reason, plan, take action, and deliver real business outcomes across your tools, data, and workflows.',
  };
  
  try {
    const data = await getCachedDynamicPage("ai-agents");
    if (data?.metadata) {
      meta = { ...meta, ...data.metadata };
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
    title: "Stop Chasing AGI. Start Deploying Reliable Agentic Workflows.",
    subtitle: "We build highly constrained, production-ready AI agents that execute specific business workflows. Deterministic routing, human-in-the-loop approvals, and strict data validation. Zero rogue actions.",
    ctaText: "Book an Architecture Review →",
    ctaLink: "https://cal.com/botmartz-ai/20min",
    secondaryCtaText: "See Our Pricing & Process",
    secondaryCtaLink: "#process",
  },
  problemSolution: {
    title: "Why Most AI Agent Pilots Go Rogue (And How We Tame Them)",
    trap: "Most agencies build autonomous agents using simple prompt chaining. In production, these agents hallucinate, break down on edge cases, and take unpredictable actions that risk your brand and data.",
    approach: "We build Constrained Agentic Workflows. Using frameworks like LangGraph and Google ADK, we enforce strict, deterministic state machines, Pydantic data validation, and mandatory Human-in-the-loop (HITL) checkpoints before any critical action is taken."
  },
  features: [
    { iconName: "Network", title: "Deterministic Routing", desc: "We don't let LLMs guess what to do next. We use state graphs (LangGraph) to enforce strict execution paths." },
    { iconName: "Users", title: "Human-in-the-Loop (HITL)", desc: "High-stakes actions (like sending emails or writing to a database) are paused for human approval via our dashboard." },
    { iconName: "ShieldCheck", title: "Strict Data Validation", desc: "Every input and output is validated against rigid schemas (Pydantic/Zod) to ensure the agent never processes corrupt data." },
    { iconName: "Lock", title: "Tool Calling & Integration", desc: "Securely connect agents to your CRM, ERP, and internal databases with strict Role-Based Access Controls (RBAC)." }
  ],
  process: [
    { step: "01", title: "Architecture & Scope", duration: "1-2 Days", cost: "Free", desc: "We define the exact boundaries of the agent, the tools it can access, and the human approval checkpoints required." },
    { step: "02", title: "Single-Skill Agent MVP", duration: "3-4 Weeks", cost: "Starting at $4,000 (≈ ₹3.8L)", desc: "We build a highly constrained agent to execute one specific workflow flawlessly (e.g., support ticket triage or data extraction)." },
    { step: "03", title: "Multi-Agent Production", duration: "Add 3-6 Weeks", cost: "$18k – $35k+ (≈ ₹17.1L+)", desc: "We scale the MVP into a multi-agent system where specialized agents hand off tasks to one another, featuring full observability." }
  ],
  pricingNotes: [
    "Note: We understand budgets vary. If this pricing does not align with your current budget, we completely understand and prefer to be transparent upfront to respect your time."
  ],
  useCases: [
    { iconName: "HelpCircle", title: "Customer Support Triage", description: "Automatically classify, route, and draft responses for support tickets based on historical data." },
    { iconName: "FileSearch", title: "Deep Research & Synthesis", description: "Agents that scour the web and internal databases to compile comprehensive briefs in minutes." },
    { iconName: "Briefcase", title: "Sales Intelligence", description: "Automatically research prospects, score leads against ideal customer profiles, and draft highly personalized outreach." },
  ],
  techStack: ["LangGraph", "Google ADK", "FastAPI", "Pydantic", "PostgreSQL", "OpenAI", "Anthropic", "Docker"],
  cta: {
    title: "Ready to Automate Complex Workflows?",
    subtitle: "Let’s map out the state machines, tools, and human checkpoints needed to bring your first AI Agent to production safely.",
    buttonText: "Book Your Architecture Review →"
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
    const data = await getCachedDynamicPage("ai-agents");
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
