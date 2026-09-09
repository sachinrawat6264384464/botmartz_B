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
    title: 'AI Agents & Autonomous Workflows',
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
    badge: "SOLUTIONS / AI AGENTS & AUTOMATION",
    title: "Stop Chasing Fragile Autonomy. Start Deploying Controlled Agentic Workflows.",
    subtitle: "We build highly constrained, production-ready AI agents that execute specific enterprise workflows. Deterministic routing, human-in-the-loop approvals, and strict data validation schemas. Every state-changing action is gated by verification.",
    ctaText: "Book an Architecture Review →",
    ctaLink: "https://cal.com/botmartz-ai/20min",
    secondaryCtaText: "See Reference Implementation",
    secondaryCtaLink: "/work/labs",
  },
  problemSolution: {
    title: "Why Most AI Agent Pilots Fail (And How We Engineer Control)",
    trap: "Most agencies build autonomous agents using simple prompt chaining. In production, these break down on edge cases, loop unpredictably, and take unverified actions that risk enterprise data and customer trust.",
    approach: "We engineer Constrained Agentic Workflows. Using state machines (LangGraph) and schema validation (Pydantic/Zod), we enforce deterministic execution paths, automated failure recovery, and mandatory Human-in-the-Loop (HITL) checkpoints for all state-changing actions."
  },
  features: [
    { iconName: "Network", title: "Deterministic State Machines", desc: "We don't let LLMs guess execution paths. We use LangGraph state graphs to enforce rigid transition rules and state persistence." },
    { iconName: "Users", title: "Human-in-the-Loop (HITL)", desc: "High-stakes actions (sending emails, updating records, approving transactions) are paused for explicit human review via our console." },
    { iconName: "ShieldCheck", title: "Strict Data Validation", desc: "Every input, intermediate state, and tool output is validated against rigid schemas (Pydantic/Zod) to prevent corrupt data propagation." },
    { iconName: "Lock", title: "Secure Tool Calling & RBAC", desc: "Securely connect agents to your CRM, ERP, and internal databases with strict Role-Based Access Controls and token isolation." }
  ],
  process: [
    { step: "01", title: "Workflow & Boundary Discovery", duration: "1-2 Days", cost: "Collaborative", desc: "We define the exact boundaries of the agent, the APIs it can call, error conditions, and the human approval checkpoints required." },
    { step: "02", title: "Single-Skill Agent MVP", duration: "3-4 Weeks", cost: "Sprint-Based", desc: "We build a highly constrained agent state machine to execute one specific workflow flawlessly (e.g. claims triage or document synthesis)." },
    { step: "03", title: "Multi-Agent Production Scale", duration: "Add 3-6 Weeks", cost: "Enterprise Scope", desc: "We scale the MVP into a multi-agent system where specialized agents hand off tasks to one another, featuring complete telemetry and telemetry tracking." }
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
