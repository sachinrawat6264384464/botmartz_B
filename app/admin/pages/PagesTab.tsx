"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, getDocs, collection } from "firebase/firestore";
import { 
  FileText, 
  Settings, 
  CheckCircle, 
  XCircle, 
  X, 
  Plus, 
  Trash2, 
  Save, 
  RefreshCw, 
  Globe, 
  Layout, 
  Info,
  Layers,
  HelpCircle,
  LucideIcon
} from "lucide-react";
import { Inter } from "next/font/google";
import LabsTab from "../labs/LabsTab";


// Types
interface UseCase {
  title: string;
  description: string;
  iconName: string;
}

interface TrustClient {
  name: string;
  iconName: string;
}

interface StatItem {
  value: string;
  label: string;
  iconName: string;
}

interface TechStackItem {
  name: string;
  iconName: string;
}

interface PageConfig {
  pageId: string;
  template?: string;
  title: string;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    description?: string;
    ctaText: string;
    ctaLink: string;
  };
  aeoQuestion?: string;
  aeoAnswer?: string;
  useCases: UseCase[];
  techStack: string[];
  roiMetrics?: Array<{ value: string; label: string; highlight: string }>;
  codeHighlight?: { title: string; subtitle: string; codeSnippet: string };
  benchmarks?: Array<{ metric: string; baseline: string; botmartz: string; improvement: string }>;
  caseStudies?: Array<{ title: string; vertical: string; metric: string; desc: string }>;
  featuredCaseStudy?: { title: string; description: string; statValue1?: string; statLabel1?: string; statValue2?: string; statLabel2?: string; link?: string };
  cta: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  structuredData: string;
  content?: string;
  // Home-page-specific sections
  trustBar?: TrustClient[];
  stats?: StatItem[];
  techStackItems?: TechStackItem[];
}

// All pages we can edit across templates
const AVAILABLE_PAGES = [
  { id: "home", name: "Home Page" },
  { id: "about", name: "About Us" },
  { id: "contact", name: "Contact" },
  { id: "community", name: "Community" },
  { id: "events", name: "Community / Events Index" },
  { id: "ai-frontier", name: "Community / AI Frontier 2026" },
  { id: "services", name: "Services Index" },
  { id: "ai-agents", name: "Services / AI Agents" },
  { id: "enterprise-rag", name: "Services / Enterprise RAG" },
  { id: "industries", name: "Industries Index" },
  { id: "healthcare", name: "Industries / Healthcare" },
  { id: "education", name: "Industries / Education" },
  { id: "logistics", name: "Industries / Logistics" },
  { id: "partnerships", name: "Partnerships Page" },
  { id: "careers", name: "Careers Page" },
  { id: "work", name: "Work Index" },
  { id: "labs", name: "Work / Labs" },
  { id: "open_source", name: "Work / Open Source" },
  { id: "case-studies", name: "Work / Case Studies" },
  { id: "insights", name: "Insights" },
  { id: "llms_txt", name: "AI Crawlers / llms.txt Specification" },
  { id: "llms_full_txt", name: "AI Crawlers / llms-full.txt Knowledge Base" },
];

// Fallback Default Content mapped by pageId
const DEFAULT_PAGE_CONTENTS: Record<string, Partial<PageConfig>> = {
  "home": {
    title: "Home Page",
    metadata: { title: "Botmartz - AI Solutions", description: "Home page description.", keywords: ["AI", "Botmartz"] },
    hero: { badge: "AI Engineering Company", title: 'We Engineer <br /> Production <span class="text-[#00B8F0]">AI Systems</span>', subtitle: "Enterprise RAG. AI Agents. Real Impact.", description: "Botmartz designs, builds, and deploys secure, scalable, and production-ready AI systems for forward-thinking organizations.", ctaText: "Book a Discovery Call", ctaLink: "https://cal.com/botmartz-ai/20min" },
    useCases: [
      { title: "Enterprise RAG", description: "Connect, retrieve, and reason over your enterprise knowledge.", iconName: "Layers" },
      { title: "AI Agents", description: "Autonomous agents that plan, act and deliver outcomes.", iconName: "Bot" },
      { title: "Production Ready", description: "Secure, scalable and monitored systems that run in the real world.", iconName: "ShieldCheck" },
      { title: "AI Engineering", description: "Modern stack. Clean architecture. Reliable engineering.", iconName: "Code2" }
    ],
    techStack: [],
    trustBar: [
      { name: "EduBridge", iconName: "Layers" },
      { name: "ShipBank", iconName: "Blocks" },
      { name: "LexIntell", iconName: "Check" },
      { name: "DataKraft", iconName: "Code2" },
      { name: "NextLearn", iconName: "Network" },
    ],
    stats: [
      { value: "20+", label: "Projects Delivered", iconName: "Briefcase" },
      { value: "2K+", label: "Engineers Trained", iconName: "Users" },
      { value: "10+", label: "Open Source Repos", iconName: "Code2" },
      { value: "5★", label: "Client Satisfaction", iconName: "Star" },
    ],
    techStackItems: [
      { name: "OpenAI", iconName: "SiOpenai" },
      { name: "Milvus", iconName: "Database" },
      { name: "Weaviate", iconName: "Database" },
      { name: "PostgreSQL", iconName: "SiPostgresql" },
      { name: "Azure", iconName: "Cloud" },
      { name: "Google Cloud", iconName: "SiGooglecloud" },
      { name: "PyTorch", iconName: "SiPytorch" },
      { name: "LangGraph", iconName: "LangGraph" },
      { name: "LangChain", iconName: "LangChain" },
      { name: "FastAPI", iconName: "SiFastapi" },
      { name: "TensorFlow", iconName: "SiTensorflow" },
      { name: "Docker", iconName: "SiDocker" },
      { name: "AWS", iconName: "SiAmazonwebservices" },
    ],
  },
  "about": {
    title: "About Us",
    metadata: { title: "About Us | Botmartz", description: "About Botmartz", keywords: ["About"] },
    hero: { badge: "About Botmartz", title: "Engineering the Future. Delivering Impact.", subtitle: "We are a premium AI engineering firm dedicated to helping enterprises navigate the complexity of Generative AI.", ctaText: "Contact Us", ctaLink: "/contact" },
    useCases: [], techStack: []
  },
  "contact": {
    title: "Contact",
    metadata: { title: "Contact Us | Botmartz", description: "Contact Botmartz", keywords: ["Contact"] },
    hero: { badge: "Get in Touch", title: "Let's Build Something Great", subtitle: "Reach out to our team to discuss your AI needs.", ctaText: "Email Us", ctaLink: "mailto:team@botmartz.com" },
    useCases: [], techStack: []
  },
  "community": {
    title: "Community",
    metadata: {
      title: "Botmartz AI Engineering Community | One Community. Many Ways to Build.",
      description: "Launched at AI Frontier 2026 — meetups, a Discord, an open-source GitHub org, a reading club and hackathons, all in one place for engineers.",
      keywords: ["AI Engineering Community", "Botmartz Discord", "AI Meetups Indore", "Open Source AI Org"],
    },
    hero: {
      badge: "Botmartz AI Engineering Community",
      title: "One Community. Many Ways to Build.",
      subtitle: "Launched at AI Frontier 2026 — meetups, a Discord, an open-source GitHub org, a reading club and hackathons, all in one place for engineers who want to build, not just watch.",
      ctaText: "Join the Discord →",
      ctaLink: "https://discord.gg/QfxuHQAZz",
    },
    aeoQuestion: "What is the Botmartz AI Engineering Community?",
    aeoAnswer: "The Botmartz AI Engineering Community brings together engineers who build production AI systems, offering monthly in-person meetups in Indore, an active Discord server, open-source GitHub repositories, a biweekly reading club, and annual hackathons.",
    useCases: [
      { title: "Monthly Meetups", description: "In-person sessions in Indore for engineers to share projects and production lessons.", iconName: "Users" },
      { title: "Discord Server", description: "The daily home for questions, job posts, and project feedback.", iconName: "MessageCircle" },
      { title: "GitHub Org", description: "Community-maintained tools and starter kits for AI engineers.", iconName: "Code" },
    ],
    techStack: ["Discord", "GitHub", "Meetup", "Hackathons", "Reading Club"],
    cta: {
      title: "Not on Discord Yet?",
      subtitle: "Join hundreds of AI engineers already sharing projects, jobs and ideas.",
      buttonText: "Join the Discord →",
    },
    structuredData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Botmartz AI Engineering Community",
      "description": "One community with many ways to build: meetups, Discord, open-source GitHub org, reading club, and hackathons.",
      "url": "https://botmartz.com/community"
    }, null, 2),
  },
  "events": {
    title: "Community Events",
    metadata: {
      title: "Community Events | Where the AI Engineering Community Meets",
      description: "Conferences, monthly meetups, open-source nights and hackathons — built for engineers who want to build, ship and grow together.",
      keywords: ["AI Frontier 2026", "AI Conferences India", "AI Meetups Indore", "Botmartz Hackathons"],
    },
    hero: {
      badge: "Botmartz Community Events",
      title: "Where the AI Engineering Community Meets",
      subtitle: "Conferences, monthly meetups, open-source nights and hackathons — built for engineers who want to build, ship and grow together, not just watch from the sidelines.",
      ctaText: "See What's Coming Up →",
      ctaLink: "#featured",
    },
    aeoQuestion: "When is AI Frontier 2026 and where are Botmartz meetups held?",
    aeoAnswer: "AI Frontier 2026 takes place on August 23, 2026, at Walkover Co-working in Indore, India. Botmartz also hosts monthly local meetups in Indore and biweekly virtual open-source and reading club sessions.",
    useCases: [
      { title: "Flagship Conference", description: "AI Frontier 2026 — full day of sessions on agents, enterprise AI, and RAG.", iconName: "Award" },
      { title: "Monthly Meetups", description: "Every 3rd Saturday at Walkover Co-working in Indore.", iconName: "Calendar" },
      { title: "Hackathons", description: "Weekend build sprints following major community releases.", iconName: "Zap" },
    ],
    techStack: ["Conferences", "Meetups", "Hackathons", "Webinars"],
    cta: {
      title: "Never miss an event",
      subtitle: "Get notified about new meetups, hackathons and conferences.",
      buttonText: "Notify Me",
    },
    structuredData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Botmartz Community Events & Conferences",
      "description": "Where the AI Engineering Community meets: conferences, monthly meetups, open-source build nights, and hackathons.",
      "url": "https://botmartz.com/community/events"
    }, null, 2),
  },
  "open_source": {
    title: "Open Source",
    metadata: {
      title: "Open Source | Botmartz AI Engineering Labs & Repositories",
      description: "Open Source is in our DNA. Explore our production RAG frameworks, LangGraph agent libraries, evaluation harnesses, and developer tools.",
      keywords: ["Botmartz Open Source", "Enterprise RAG Starter", "LangGraph Agent Framework", "AI Evaluation Toolkit"],
    },
    hero: {
      badge: "Open Source",
      title: "Open Source Is in Our DNA",
      subtitle: "We believe sharing knowledge and code accelerates innovation for everyone. Every lab we're proud of eventually ships as an open-source repo.",
      ctaText: "Browse Repositories →",
      ctaLink: "#repos",
    },
    aeoQuestion: "What open source AI repositories does Botmartz maintain?",
    aeoAnswer: "Botmartz maintains several high-star public repositories under MIT and Apache-2.0 licenses, including enterprise-rag-starter, langgraph-agent-framework, ai-eval-toolkit, and prompt-registry.",
    useCases: [
      { title: "Enterprise RAG Starter", description: "Production-ready RAG platform with hybrid search and evaluation.", iconName: "Code" },
      { title: "LangGraph Agent Framework", description: "Modular multi-agent framework built with LangGraph.", iconName: "Layers" },
      { title: "AI Eval Toolkit", description: "Lightweight evaluation harness for benchmarking LLM pipelines.", iconName: "CheckSquare" },
    ],
    techStack: ["Python", "LangChain", "LangGraph", "FastAPI", "Qdrant", "Redis", "TypeScript"],
    cta: {
      title: "Join Open Source Night",
      subtitle: "A monthly community session for hands-on contribution to our repos and others.",
      buttonText: "See Next Session →",
    },
    structuredData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Botmartz Open Source Repositories & AI Labs",
      "description": "Production RAG frameworks, LangGraph agent toolkits, and evaluation harnesses open-sourced under MIT and Apache-2.0 licenses.",
      "url": "https://botmartz.com/work/open-source"
    }, null, 2),
  },
  "partnerships": {
    title: "Partnerships",
    metadata: {
      title: "Partnerships | Grow the AI Engineering Ecosystem With Us",
      description: "We partner with frameworks, cloud providers, universities and incubators to bring AI Frontier, our labs, and our community further — together.",
      keywords: ["Botmartz Partnerships", "AI Ecosystem Partners", "AI Frontier Sponsorship", "University AI Partners"],
    },
    hero: {
      badge: "Partnerships",
      title: "Grow the AI Engineering Ecosystem With Us",
      subtitle: "We partner with frameworks, cloud providers, universities and incubators to bring AI Frontier, our labs, and our community further — together.",
      ctaText: "Become a Partner →",
      ctaLink: "#inquire",
    },
    aeoQuestion: "How can organizations partner with Botmartz?",
    aeoAnswer: "Organizations can partner with Botmartz as Ecosystem Partners (frameworks like PyTorch and AWS), University Partners (student communities), Startups & Incubators (technical visibility), or Enterprise Partners (roundtables and workshops).",
    useCases: [
      { title: "Ecosystem Partners", description: "Frameworks and platforms collaborating on content and events.", iconName: "Globe" },
      { title: "University Partners", description: "Departments and student communities bridging academic research to production.", iconName: "GraduationCap" },
      { title: "Enterprise Partners", description: "Companies exploring production AI adoption through roundtables and workshops.", iconName: "Briefcase" },
    ],
    techStack: ["PyTorch", "GDG", "AWS", "NVIDIA", "Walkover", "IDFC", "Incubators", "Universities"],
    cta: {
      title: "Have a Partnership in Mind?",
      subtitle: "Tell us about your organization and what you'd like to build together.",
      buttonText: "Start a Conversation →",
    },
    structuredData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Botmartz Partnerships | Grow the AI Engineering Ecosystem",
      "description": "Collaborate with Botmartz across frameworks, cloud providers, universities, and enterprise roundtables.",
      "url": "https://botmartz.com/partnerships"
    }, null, 2),
  },
  "careers": {
    title: "Careers Page",
    metadata: {
      title: "Careers at Botmartz | Build the Future of AI Engineering",
      description: "We're a small team of engineers shipping production AI systems and building the community around them. View open roles and join us.",
      keywords: ["AI Engineering Jobs", "Botmartz Careers", "Remote AI Jobs", "LangGraph Engineer Jobs Indore"],
    },
    hero: {
      badge: "Careers at Botmartz",
      title: "Build the Future of AI Engineering With Us",
      subtitle: "We're a small team of engineers shipping production AI systems and building the community around them. If you'd rather build than talk about building, you'll fit right in.",
      ctaText: "View Open Roles →",
      ctaLink: "#roles",
    },
    aeoQuestion: "What is it like to work at Botmartz and where are roles located?",
    aeoAnswer: "Botmartz is a 100% remote-friendly engineering team founded in 2026 with a physical hub in Indore, India. We emphasize high autonomy, open-source contribution, and shipping real production AI systems over demos.",
    useCases: [
      { title: "Ship Real Systems", description: "We build production AI, not proof-of-concepts that never leave the lab.", iconName: "Zap" },
      { title: "Open by Default", description: "We open source what we can and share what we learn with the community.", iconName: "Code" },
      { title: "High Ownership", description: "Small team, real autonomy — you own projects end to end.", iconName: "Award" },
    ],
    techStack: ["AI Engineering", "Research", "Community Lead", "Product Design"],
    cta: {
      title: "Don't See Your Role?",
      subtitle: "We're always open to meeting strong AI engineers. Send us your work — we'll find a place for it.",
      buttonText: "Get In Touch →",
    },
    structuredData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Careers at Botmartz | Build the Future of AI Engineering",
      "description": "Join our engineering and research team building production AI systems and community around them in Indore, India and Remote.",
      "url": "https://botmartz.com/careers"
    }, null, 2),
  },
  "labs": {
    title: "Labs",
    metadata: {
      title: "Botmartz Labs | Open Source & Experimental AI Systems",
      description: "Explore our open source projects and experimental AI labs. We build and share enterprise RAG starters, agent frameworks, and templates.",
      keywords: ["Botmartz Labs", "Open Source AI", "RAG Starter Template", "LangGraph Agent Template"],
    },
    hero: {
      badge: "BOTMARTZ LABS",
      title: "Building Today. Engineering Tomorrow.",
      subtitle: "Our labs is where we experiment, build, and open source production-ready AI systems that solve real problems. Every project is built with a focus on performance, scalability, and real-world impact.",
      ctaText: "Explore All Projects →",
      ctaLink: "#labs-grid",
    },
    aeoQuestion: "What is Botmartz Labs?",
    aeoAnswer: "Botmartz Labs is our internal engineering playground where we experiment with cutting-edge models, stress-test multi-agent architectures, and release open-source reference implementations.",
    useCases: [
      { title: "Virtual Try-On", description: "Computer vision pipeline for real-time garment fitting — built to stress-test our vision stack.", iconName: "Code" },
      { title: "AI Research Agent", description: "An internal agent that runs first-pass research and drafts outreach — in daily use at Botmartz.", iconName: "Layers" },
      { title: "Enterprise RAG Demo", description: "A reference implementation showing chunking, hybrid retrieval, and evaluation end to end.", iconName: "Search" },
    ],
    techStack: ["PyTorch", "LangChain", "LangGraph", "Google ADK", "FastAPI", "PostgreSQL", "Redis", "Docker", "AWS"],
    cta: {
      title: "Have an Idea Worth Building?",
      subtitle: "Let's build the next lab together. We collaborate with founders, researchers, and engineers.",
      buttonText: "Start a Conversation →",
    },
    structuredData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Botmartz Labs | Experimental AI Systems & Starters",
      "description": "Explore our open source projects and experimental AI labs.",
      "url": "https://botmartz.com/work/labs"
    }, null, 2),
  },
  "case-studies": {
    title: "Case Studies (Intro)",
    metadata: {
      title: "AI Case Studies & Success Stories | Botmartz AI",
      description: "Explore our AI case studies across Education, Logistics, Legal, and SaaS. See real impact.",
      keywords: ["AI Case Studies", "Enterprise Success Stories", "RAG Impact", "AI Agent Metrics"],
    },
    hero: {
      badge: "Work / Case Studies",
      title: "Proven AI Implementations. Real Business Results.",
      subtitle: "Discover how we partner with leading organizations to deploy production-ready AI agents and RAG systems.",
      ctaText: "Start a Conversation →",
      ctaLink: "/contact",
    },
    useCases: [],
    techStack: [],
    cta: {
      title: "Want to see similar results in your organization?",
      subtitle: "Let's discuss how custom AI engineering can solve your specific business challenges.",
      buttonText: "Book a Discovery Call →",
    },
    structuredData: "",
  },
  "services": {
    title: "Services Index",
    metadata: { title: "Our Services | Botmartz", description: "Services we offer.", keywords: ["Services"] },
    hero: { badge: "Our Core Services", title: "AI Solutions Built for Production.", subtitle: "We focus on solving real business problems with two core capabilities backed by robust engineering and seamless integrations.", ctaText: "Explore Solutions", ctaLink: "#solutions" },
    useCases: [], techStack: []
  },
  "industries": {
    title: "Industries Index",
    metadata: { title: "Industries | Botmartz", description: "Industries we serve.", keywords: ["Industries"] },
    hero: { badge: "Industries", title: "AI That Understands Your Industry.", subtitle: "We don't build generic solutions. We build highly specialized AI systems tailored to the exact regulatory, operational, and data requirements of your sector.", ctaText: "Explore Industries", ctaLink: "#industries" },
    useCases: [], techStack: []
  },
  "work": {
    title: "Work Index",
    metadata: {
      title: "Production AI Systems, Shipped & Proven | Botmartz Work",
      description: "Case studies from enterprise clients across education, logistics, healthcare and SaaS — real production AI systems, not proofs of concept.",
      keywords: ["Production AI Systems", "Enterprise AI Case Studies", "AI Route Optimization", "Clinical AI Copilot", "EdTech AI Assistant", "Enterprise RAG Support"],
    },
    hero: {
      badge: "Our Work",
      title: "Production AI Systems,<br><span class=\"text-[#00C6FF]\">Shipped &amp; Proven</span>",
      subtitle: "Case studies from enterprise clients across education, logistics, healthcare and SaaS — real systems in production, not proofs of concept.",
      ctaText: "Browse Case Studies →",
      ctaLink: "#cases",
    },
    aeoQuestion: "What kind of production AI systems has Botmartz built and deployed?",
    aeoAnswer: "Botmartz builds and deploys production AI systems across education, logistics, healthcare, and SaaS, including AI course assistants, route optimization agents, clinical documentation copilots, enterprise RAG support platforms, warehouse computer vision inspection, and voice agents for patient intake.",
    structuredData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Production AI Systems, Shipped & Proven | Botmartz Work",
      "description": "Case studies and real production AI systems built by Botmartz across education, logistics, healthcare and SaaS.",
      "url": "https://botmartz.com/work",
      "publisher": {
        "@type": "Organization",
        "name": "Botmartz",
        "url": "https://botmartz.com"
      }
    }, null, 2),
    useCases: [],
    techStack: ["LangGraph", "FastAPI", "Next.js", "PyTorch", "OpenAI", "Vector DB"]
  },
  "insights": {
    title: "Insights",
    metadata: { title: "Insights | Botmartz", description: "Engineering insights.", keywords: ["Insights"] },
    hero: { badge: "Insights", title: "Engineering Thoughts & Ideas", subtitle: "Deep dives into AI architecture, prompting techniques, and the future of generative models.", ctaText: "Read Articles", ctaLink: "#" },
    useCases: [], techStack: []
  },
  "ai-agents": {
    title: "AI Agents",
    metadata: {
      title: "Intelligent AI Agents for Business | Botmartz AI",
      description: "We build production-ready AI agents that reason, plan, take action, and deliver real business outcomes across your tools, data, and workflows.",
      keywords: ["AI Agents", "Autonomous Workflows", "LangGraph Agents", "Enterprise AI Solutions"],
    },
    hero: {
      badge: "Services / AI Agents",
      title: "Intelligent AI Agents That Get Things Done.",
      subtitle: "We build production-ready AI agents that reason, plan, take action, and deliver real business outcomes across your tools, data, and workflows.",
      ctaText: "Book an AI Strategy Session →",
      ctaLink: "/contact",
    },
    aeoQuestion: "What are AI agents for business?",
    aeoAnswer: "AI agents for business are autonomous software systems that can plan, reason, and take action to solve complex workflows. Unlike traditional chatbots that only answer questions, enterprise AI agents connect to your internal tools (like CRM, databases, and email) to execute multi-step tasks.",
    useCases: [
      { title: "Sales Agents", description: "Qualify leads, research prospects, and draft personalized outreach.", iconName: "Briefcase" },
      { title: "Support Agents", description: "Resolve tickets, find answers, and take actions across systems.", iconName: "HelpCircle" },
      { title: "Research Agents", description: "Deep research, data synthesis, and insight reports in minutes.", iconName: "FileSearch" },
      { title: "Marketing Agents", description: "Create content, run campaigns, and analyze performance.", iconName: "Speaker" },
    ],
    techStack: ["LangGraph", "Google ADK", "OpenAI", "Anthropic", "FastAPI", "Pydantic", "PostgreSQL", "Redis"],
    cta: {
      title: "Ready to Deploy Intelligent AI Agents in Your Organization?",
      subtitle: "Let's design and build AI agents that automate work, enhance productivity, and drive real business outcomes.",
      buttonText: "Book an AI Strategy Session →",
    },
    structuredData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Enterprise AI Agents Development",
      "provider": { "@type": "Organization", "name": "Botmartz" },
      "description": "AI agents for business are autonomous software systems that can plan, reason, and take action to solve complex workflows."
    }, null, 2),
  },
  "enterprise-rag": {
    title: "Enterprise RAG",
    metadata: {
      title: "Enterprise RAG & Knowledge Intelligence | Botmartz AI",
      description: "Securely retrieve, reason over, and synthesize your proprietary documents, databases, and systems with custom Enterprise RAG.",
      keywords: ["Enterprise RAG", "Knowledge Search", "Hybrid Search", "Vector Database"],
    },
    hero: {
      badge: "Services / Enterprise RAG",
      title: "Turn Your Enterprise Knowledge Into Actionable Intelligence.",
      subtitle: "Our Enterprise RAG solutions help organizations securely connect, retrieve, and reason over their data—delivering accurate answers and insights from documents.",
      ctaText: "Book a Discovery Call →",
      ctaLink: "https://cal.com/botmartz-ai/20min",
    },
    aeoQuestion: "What is enterprise RAG?",
    aeoAnswer: "Enterprise RAG (Retrieval-Augmented Generation) is an AI architecture that connects large language models securely to a company's internal data. Unlike public chatbots, enterprise RAG systems use advanced chunking, hybrid search, and strict access controls to ensure accuracy.",
    useCases: [
      { title: "Knowledge Search", description: "Find answers instantly across manuals, policies, and internal docs.", iconName: "Search" },
      { title: "Document Intelligence", description: "Extract insights and summaries from contracts, reports, and PDFs.", iconName: "FileText" },
      { title: "Support AI Helper", description: "Empower support teams with instant, highly accurate responses.", iconName: "RefreshCw" },
    ],
    techStack: ["PyTorch", "LangChain", "LangGraph", "FastAPI", "Chroma", "PostgreSQL", "Docker", "AWS"],
    cta: {
      title: "Ready to Unlock the Power of Your Enterprise Data?",
      subtitle: "Book a free discovery call and let's explore how Enterprise RAG can drive real impact for your business.",
      buttonText: "Book a Discovery Call →",
    },
    structuredData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Enterprise RAG Solutions",
      "provider": { "@type": "Organization", "name": "Botmartz" },
      "description": "Enterprise RAG connects large language models securely to a company's internal data."
    }, null, 2),
  },
  "education": {
    title: "Education Industry",
    metadata: {
      title: "AI Solutions for Education & EdTech | Botmartz AI",
      description: "Empower educators, students, and institutions with intelligent learning assistants, automated support, and knowledge search.",
      keywords: ["AI in Education", "EdTech AI", "AI Course Assistant", "Personalized Learning"],
    },
    hero: {
      badge: "Industries / Education",
      title: "AI Solutions for Education & EdTech.",
      subtitle: "Empower educators, students, and institutions with intelligent systems that personalize learning, automate operations, and unlock institutional knowledge.",
      ctaText: "Discuss Your Use Case →",
      ctaLink: "/contact",
    },
    useCases: [
      { title: "AI Course Assistants", description: "24/7 AI tutors that understand course material and explain complex concepts dynamically.", iconName: "GraduationCap" },
      { title: "Student Support Agents", description: "Automate student onboarding, financial aid queries, and admin support.", iconName: "Users" },
      { title: "Knowledge Base Search", description: "Search institutional archives, thesis databases, and papers instantly.", iconName: "Database" },
    ],
    techStack: ["Python", "FastAPI", "LlamaIndex", "ChromaDB", "React"],
    cta: {
      title: "Ready to upgrade your educational platform?",
      subtitle: "Let's build secure, accurate AI solutions for your students and staff.",
      buttonText: "Book a Discovery Call →",
    },
    structuredData: "",
  },
  "logistics": {
    title: "Logistics Industry",
    metadata: {
      title: "AI Solutions for Logistics & Supply Chain | Botmartz AI",
      description: "Optimize logistics operations, SOP retrieval, tracking updates, and route coordination with autonomous AI agents.",
      keywords: ["AI in Logistics", "Supply Chain AI", "SOP Search Logistics", "AI Logistics Agents"],
    },
    hero: {
      badge: "Industries / Logistics",
      title: "AI Solutions for Logistics & Supply Chain.",
      subtitle: "Unify complex SOPs, automate document parsing, and coordinate shipments with secure AI solutions built for global logistics.",
      ctaText: "Discuss Your Use Case →",
      ctaLink: "/contact",
    },
    useCases: [
      { title: "SOP Search Assistant", description: "Operational RAG to look up cargo handling, customs rules, and shipping guidelines.", iconName: "Compass" },
      { title: "Document Parser", description: "Instantly parse bills of lading, packing lists, and custom declarations.", iconName: "Layers" },
      { title: "Tracking Agents", description: "Proactive agents to monitor route alerts, delays, and update clients.", iconName: "Activity" },
    ],
    techStack: ["FastAPI", "PyTorch", "Qdrant", "Docker", "AWS"],
    cta: {
      title: "Ready to accelerate your logistics efficiency?",
      subtitle: "Connect with our AI engineers to map your operational processes to smart AI workflows.",
      buttonText: "Book a Discovery Call →",
    },
    structuredData: "",
  },
  "legal": {
    title: "Legal Industry",
    metadata: {
      title: "AI Solutions for Legal Tech | Botmartz AI",
      description: "Automate contract review, risk analysis, clause extraction, and semantic citation search with secure legal AI.",
      keywords: ["AI for Law", "Legal AI", "Contract Review AI", "Document Citation RAG"],
    },
    hero: {
      badge: "Industries / Legal",
      title: "AI Solutions for Legal & Law Firms.",
      subtitle: "Accelerate contract review, automate clause analysis, and search litigation history with bulletproof accuracy and privacy.",
      ctaText: "Discuss Your Use Case →",
      ctaLink: "/contact",
    },
    useCases: [
      { title: "Contract Analysis", description: "Instantly summarize obligations, termination rules, and flag high-risk terms.", iconName: "FileText" },
      { title: "Clause Extraction", description: "Automatically sort, categorise, and parse clauses from legacy contracts.", iconName: "Database" },
      { title: "Litigation Search", description: "Semantic retrieval of historical briefs, citations, and legislation archives.", iconName: "Scale" },
    ],
    techStack: ["LlamaIndex", "FastAPI", "Qdrant", "Python", "Tesseract/OCR"],
    cta: {
      title: "Empower your legal team with secure AI.",
      subtitle: "Consult with our team to deploy private, isolated legal RAG pipelines.",
      buttonText: "Book a Discovery Call →",
    },
    structuredData: "",
  },
  "llms_txt": {
    title: "AI Crawlers / llms.txt Specification",
    metadata: { title: "llms.txt Specification", description: "Standardized AI crawler specification", keywords: ["LLM", "Crawler"] },
    hero: { badge: "AI Crawlers", title: "llms.txt Specification", subtitle: "Served at /llms.txt for AI search and answer engines", ctaText: "", ctaLink: "" },
    useCases: [], techStack: [], cta: { title: "", subtitle: "", buttonText: "" }, structuredData: "",
    content: `# Botmartz AI Solutions
> Botmartz is an applied AI engineering company that designs, builds, and deploys production Enterprise RAG systems and AI Agents. We take proven, state-of-the-art AI architectures and turn them into systems that are reliable, evaluated, and deployed — with retrieval quality, agent reliability, and evaluation treated as first-class engineering problems, not afterthoughts.

## What Botmartz Does
Botmartz focuses on two core services and builds everything else as evidence for them:
- **Enterprise RAG**: Hybrid dense + sparse retrieval, reciprocal rank fusion, cross-encoder reranking, claim-level citation grounding, and evaluation harnesses that report real retrieval and faithfulness metrics on real corpora.
- **AI Agents**: Multi-step agent workflows built on LangGraph with explicit state machines, tool calling, sufficiency gates, and human-in-the-loop approval for any action that changes a system of record.

Botmartz is engineering-first: the company publishes open benchmarks, reference implementations, and architecture teardowns rather than marketing claims. Our stack — PyTorch, LangGraph, FastAPI, Qdrant/pgvector, and modern embedding and reranking models — appears as evidence of how we build, never as the headline.

## Core Services & Solutions
- [Enterprise RAG](https://www.botmartz.com/services/enterprise-rag): Hybrid dense/sparse vector retrieval with query decomposition, reranking, and evaluation-gated builds. We prove retrieval quality against a client's own documents before committing to a full build.
- [AI Agents](https://www.botmartz.com/services/ai-agents): LangGraph-based multi-agent workflows with memory, tool use, planning, evaluation, and human-in-the-loop safeguards for production reliability.

## Industry Focus
Botmartz is deliberately focused rather than broad. Current priority verticals:
- [Healthcare & Insurance AI](https://www.botmartz.com/industries/healthcare): Enterprise RAG and document-intelligence workflows over clinical policy documents, coverage rules, and knowledge bases — the domains where messy documents, compliance, and defensible decisions matter most.

Additional verticals will be added only as reference implementations and real engagements accumulate.

## Engineering & Proof of Capability
- [Engineering Insights](https://www.botmartz.com/insights): Technical write-ups on production RAG and agent engineering — architecture decisions, retrieval strategies, evaluation methodology, and honest failure analysis.
- [Work & Reference Implementations](https://www.botmartz.com/work): Open, reproducible reference builds — including an in-progress Enterprise RAG benchmark over public payer clinical policy documents, published with a golden question set, an evaluation harness, and measured results across multiple retrieval architectures.

## Flagship Event & Community
- [AI Frontier 2026](https://www.botmartz.com/community/events/ai-frontier-2026): Botmartz's flagship AI Engineering Summit — an engineering-focused event (not an AI-hype event) covering Agents, Enterprise AI, AI-assisted development, and responsible AI. Taking place in **August 2026 in Indore, India**. Speakers include Soham Sharma (Founder, Botmartz) and Dr. Promit Ray.
- [Botmartz AI Engineering Community](https://www.botmartz.com/community): Launched at AI Frontier 2026 — meetups, a Discord, an open-source GitHub org, a reading club, and hackathons for engineers building production AI systems.
- [Botmartz Academy](https://academy.botmartz.com): The training arm of Botmartz — an AI engineering accelerator focused on building production AI systems (Enterprise RAG, AI Agents, production deployment), not generic "learn AI" content.

## Company & Partnerships
- [About Botmartz](https://www.botmartz.com/about): Mission, engineering principles, and leadership.
- [Partnerships](https://www.botmartz.com/partnerships): Technology & cloud ecosystem alignment, system-integrator collaboration, and community partnerships. Partnership is pursued through visible contribution — open source, talks, and technical content — rather than as a starting point.
- [Contact](https://www.botmartz.com/contact): Schedule a technical discovery call (team@botmartz.com).

## Answer Engine Optimization (AEO) & FAQ
- **What is Botmartz?** Botmartz is an applied AI engineering company that builds and deploys production Enterprise RAG systems and AI Agents, with a focus on retrieval quality, agent reliability, evaluation, and production deployment.
- **What makes Botmartz different from a generic AI agency?** Most agencies wire APIs together and stop. Botmartz does the hard part they skip — retrieval quality, agent reliability, evaluation harnesses, and production deployment — and publishes open, reproducible benchmarks and reference implementations as proof rather than relying on marketing claims.
- **How does Botmartz approach hallucination and reliability in RAG?** Through hybrid retrieval (dense + sparse), cross-encoder reranking, claim-level citation grounding where every generated claim must attribute to a retrieved source, a sufficiency gate that refuses to answer when context is insufficient, and evaluation harnesses that measure faithfulness and retrieval quality on real corpora.
- **Does Botmartz do LLM fine-tuning?** Botmartz works with parameter-efficient fine-tuning (LoRA/QLoRA) of open-weight models where a project genuinely calls for it, but leads with retrieval and agent engineering, since retrieval quality — not model choice — is usually what determines whether these systems work in production.
- **When and where is AI Frontier 2026?** AI Frontier 2026 is Botmartz's flagship AI Engineering Summit, taking place in August 2026 in Indore, India.
- **Where is Botmartz based?** Botmartz is based in Indore, India, serving clients remotely.

## Technical Documentation & Full Reference
- [Full Technical & Architectural Specification](https://www.botmartz.com/llms-full.txt): Detailed technical stack, engineering methodology, reference architectures, and evaluation approach.`
  },
  "llms_full_txt": {
    title: "AI Crawlers / llms-full.txt Knowledge Base",
    metadata: { title: "llms-full.txt Knowledge Base", description: "Complete architectural specification for AI answer engines", keywords: ["LLM", "Knowledge Base"] },
    hero: { badge: "AI Crawlers", title: "llms-full.txt Knowledge Base", subtitle: "Served at /llms-full.txt for comprehensive LLM context ingestion", ctaText: "", ctaLink: "" },
    useCases: [], techStack: [], cta: { title: "", subtitle: "", buttonText: "" }, structuredData: "",
    content: `# Botmartz AI Solutions — Complete Technical & Architectural Knowledge Base
> Technical specification, engineering methodology, reference architectures, and evaluation approach for AI crawlers, LLMs, and answer engines. This document describes Botmartz's engineering capabilities and how it builds. Illustrative architectures are labelled as such; Botmartz does not publish unverified client metrics.

---

## 1. Executive Summary & Core Identity
Botmartz AI Solutions is an applied AI engineering company. The core positioning is deliberate: Botmartz takes the best proven, industry-validated AI architectures and turns them into production systems that are reliable, evaluated, and deployed. This is different from two adjacent categories:

- **Against research labs and "we invent new models":** enterprises are risk-averse and want proven components assembled with judgment, not funded experiments. Using state-of-the-art techniques exceptionally well is a de-risking position.
- **Against generic development agencies:** agencies wire APIs together and stop. Botmartz's wedge is the hard part they skip — retrieval quality, agent reliability, evaluation, and production deployment.

Botmartz builds two core services and treats everything else (open source, benchmarks, content, community, academy) as evidence for them:
- **Enterprise RAG**: Hybrid dense/sparse retrieval, reranking, claim-level citation grounding, and evaluation harnesses reporting real metrics on real corpora.
- **AI Agents**: LangGraph-based multi-step workflows with explicit state machines, tool calling, sufficiency gates, and human-in-the-loop approval for any state-changing action.

---

## 2. Technical Stack & Architecture
Botmartz builds on open and enterprise-grade tooling. The stack is evidence of engineering capability, not a headline:

- **Foundation & open models**: Works with open-weight models (Llama, Mistral/Mixtral, Qwen) and frontier API models (Anthropic Claude, Google Gemini, OpenAI GPT) behind a pluggable interface, because retrieval quality — not model choice — usually determines whether a system works.
- **AI frameworks & orchestration**: PyTorch, LangGraph, LangChain, LlamaIndex, FastAPI.
- **Vector databases & storage**: Qdrant, pgvector (PostgreSQL), Milvus, Weaviate, Pinecone.
- **Embeddings & reranking**: BGE-M3 and comparable embedding models; cross-encoder rerankers for relevance verification.
- **Document intelligence**: Layout-aware parsing (PyMuPDF for born-digital, Docling and OCR for complex/scanned documents), tiered routing, and parse-quality gating.
- **Fine-tuning & training**: Parameter-efficient fine-tuning (LoRA/QLoRA) via Hugging Face PEFT and related tooling, applied where a project genuinely requires it.
- **Inference & serving**: vLLM, Ollama, ONNX Runtime, Triton Inference Server for local and self-hosted deployment.
- **Evaluation & observability**: Ragas, DeepEval, and tracing/observability tooling (e.g. Langfuse) integrated into the build, not bolted on.
- **Full-stack application layer**: Next.js, TypeScript, React, Tailwind CSS, server-sent events and websockets for streaming interfaces.

---

## 3. Engineering Methodology
Botmartz's differentiation is methodological, not a list of tools.

### 3.1 Retrieval architecture
Production RAG at Botmartz is hybrid by default: dense semantic retrieval and sparse lexical retrieval (BM25 / learned sparse) run in parallel and are merged with reciprocal rank fusion (RRF), then reranked by a cross-encoder before context is passed to generation. Sparse retrieval captures exact domain terminology — procedure codes, policy numbers, part identifiers — that dense embeddings blur; dense retrieval captures paraphrase and semantic similarity that lexical matching misses.

### 3.2 Reliability and grounding
- **Claim-level citation grounding**: every generated claim must attribute to a specific retrieved chunk. Uncited claims are flagged for review rather than displayed.
- **Sufficiency gate**: before generating, the system checks whether retrieved context is actually sufficient to answer. If not, it retrieves again (bounded) and ultimately refuses rather than confabulating.
- **Diagnostic discipline**: when faithfulness drops, the first assumption is a retrieval failure (wrong context retrieved), not the model inventing facts — because on dense enterprise corpora that is nearly always the true cause.

### 3.3 Agent reliability
Agents are built as explicit LangGraph state machines rather than open-ended loops. Individual operational tasks are isolated in nodes; any action that modifies a system of record is held in a validation state requiring explicit human approval before execution.

### 3.4 Evaluation as a first-class artifact
Every build ships with an evaluation harness. Retrieval is measured with recall@k, MRR, and context precision; generation with faithfulness, answer relevance, and citation accuracy; operations with latency and cost. Botmartz publishes methodology and honest results — including failure modes and ceilings — rather than headline accuracy numbers without a harness.

---

## 4. Reference Implementations (illustrative)
These are open, self-initiated reference builds that demonstrate capability. They are engineering showcases, not client engagements.

### 4.1 Enterprise RAG Benchmark over Payer Policy Documents (in progress)
A reproducible benchmark over publicly published US health-payer clinical policy documents — a genuinely difficult corpus (hundreds of versioned PDFs, criteria tables, cross-references). The build includes:
- A polite, rate-limited ingestion pipeline with content-addressed storage and incremental re-ingestion.
- Tiered document parsing (fast path for born-digital PDFs, layout/OCR only where needed) with a parse-quality gate and published quarantine statistics.
- Chunking with full provenance to the page and bounding box, so every citation can be traced to the exact region of the exact document version.
- A hand-verified golden question set with span-level ground truth.
- Multiple retrieval architectures (naive, hybrid + rerank, agentic, graph-augmented) measured against the same questions, with cost and latency reported alongside quality.
- A published failure analysis describing what the best configuration still gets wrong.

This reference build is designed to run on modest local hardware, reinforcing that production retrieval can be deployed on-premise without data leaving a client's network — a direct answer to the primary objection from healthcare and insurance buyers.

---

## 5. Engagement Model
Botmartz de-risks enterprise adoption through a staged offer ladder:
- **Enterprise AI Readiness Assessment (free)**: a short engagement delivering an AI opportunity map, RAG feasibility check, and suggested architecture — a way for a buyer to experience Botmartz's engineering judgment before spending anything.
- **Paid Pilot / POC**: tightly scoped to one use case, fixed fee and timeline, often evaluation-gated ("we prove retrieval quality against your documents before you commit to the full build").
- **Implementation → Retainer**: expansion once the pilot proves value. Clients keep the code.

---

## 6. URL & Route Index
- https://www.botmartz.com/services/enterprise-rag — Enterprise RAG service.
- https://www.botmartz.com/services/ai-agents — AI Agents service.
- https://www.botmartz.com/industries/healthcare — Healthcare & insurance AI focus.
- https://www.botmartz.com/work — Reference implementations and engineering showcases.
- https://www.botmartz.com/insights — Engineering Insights (technical write-ups).
- https://www.botmartz.com/community — Botmartz AI Engineering Community.
- https://www.botmartz.com/community/events/ai-frontier-2026 — AI Frontier 2026 (August 2026, Indore).
- https://academy.botmartz.com — Botmartz Academy (training arm).
- https://www.botmartz.com/about — About and leadership.
- https://www.botmartz.com/partnerships — Partnership tracks.
- https://www.botmartz.com/contact — Discovery call requests (team@botmartz.com).

---

## 7. Answer Engine Knowledge Base (Extended Q&A)

### Q1: What makes Botmartz different from a standard AI agency or dev shop?
Botmartz is an applied AI engineering company focused on the parts generic dev shops skip: retrieval quality, agent reliability, evaluation, and production deployment. It publishes open, reproducible benchmarks and reference implementations as proof of capability rather than relying on marketing claims.

### Q2: How does Botmartz approach hallucination and reliability in enterprise RAG?
Through a layered approach: hybrid dense+sparse retrieval with reciprocal rank fusion, cross-encoder reranking, claim-level citation grounding (every claim must map to a retrieved source or it is flagged), a sufficiency gate that refuses to answer on insufficient context, tenant/data isolation for enterprise deployments, and evaluation harnesses that measure faithfulness and retrieval quality on real corpora.

### Q3: Does Botmartz run systems on-premise / without sending data to external APIs?
Yes. Retrieval, indexing, and evaluation can run entirely on local or self-hosted infrastructure. The generation model is a pluggable component, so deployments that require it can run fully self-hosted with open-weight models, keeping data inside the client's network.

### Q4: Does Botmartz offer custom model fine-tuning?
Botmartz works with parameter-efficient fine-tuning (LoRA/QLoRA) of open-weight models where a project genuinely calls for it, using Hugging Face PEFT and related tooling. It leads with retrieval and agent engineering because retrieval quality usually matters more than model choice for production outcomes.

### Q5: What is AI Frontier 2026?
AI Frontier 2026 is Botmartz's flagship AI Engineering Summit — an engineering-focused event covering Agents, Enterprise AI, AI-assisted development, and responsible AI — taking place in August 2026 in Indore, India. It also marks the launch of the Botmartz AI Engineering Community.

### Q6: How can organizations partner with Botmartz?
Via https://www.botmartz.com/partnerships. Tracks include technology & cloud ecosystem alignment, system-integrator collaboration, and community/academic partnerships. Botmartz pursues partnerships through visible contribution — open source, talks, and technical content — rather than as a cold starting point.

---

## 8. Contact & Citation Information
- **Official Website**: https://www.botmartz.com
- **Contact Email**: team@botmartz.com
- **Primary Location**: Indore, India (remote engineering)
- **Document Version**: 3.0.0 (Updated 2026 — claims restated to capabilities and reference architectures; unverified client metrics removed)`
  }
};

function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${
      type === "success" ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"
    }`}>
      {type === "success" ? (
        <CheckCircle size={16} className="text-green-500 shrink-0" />
      ) : (
        <XCircle size={16} className="text-red-500 shrink-0" />
      )}
      <p className="text-sm font-medium text-white">{message}</p>
      <button onClick={onClose} className="text-ink-soft hover:text-white transition-colors ml-1">
        <X size={15} />
      </button>
    </div>
  );
}

export default function PagesTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page") || "ai-agents";

  const [selectedPage, setSelectedPage] = useState<string>(pageParam);
  const [formData, setFormData] = useState<Partial<PageConfig>>({});

  useEffect(() => {
    if (pageParam && AVAILABLE_PAGES.some(p => p.id === pageParam)) {
      setSelectedPage(pageParam);
    }
  }, [pageParam]);

  const handlePageChange = (pageId: string) => {
    setSelectedPage(pageId);
    router.push(`/admin/pages?page=${pageId}`);
  };
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<"meta" | "hero" | "aeo" | "usecases" | "tech" | "cta" | "schema" | "content" | "homesections">("meta");

  // Home sections editor state
  const [newTrustClient, setNewTrustClient] = useState<TrustClient>({ name: "", iconName: "" });
  const [editingStatIndex, setEditingStatIndex] = useState<number | null>(null);
  const [labsCount, setLabsCount] = useState(0);

  // Tag inputs
  const [keywordInput, setKeywordInput] = useState("");
  const [techInput, setTechInput] = useState("");

  // Use case editor inputs
  const [newUseCase, setNewUseCase] = useState<UseCase>({ title: "", description: "", iconName: "" });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Dynamic page stats and configurations check for left tabs badges
  const keywordCount = formData.metadata?.keywords?.length || 0;
  const isHeroConfigured = !!(formData.hero?.title && formData.hero?.subtitle);
  const isAeoConfigured = !!(formData.aeoQuestion && formData.aeoAnswer);
  const useCaseCount = formData.useCases?.length || 0;
  const techStackCount = selectedPage === "home" ? (formData.techStackItems?.length || 0) : (formData.techStack?.length || 0);
  const isCtaConfigured = !!(formData.cta?.title && formData.cta?.subtitle);
  const isSchemaConfigured = !!formData.structuredData?.trim();

  const getTabBadge = (id: string) => {
    switch (id) {
      case "meta":
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-admin-accent/15 text-admin-accent">
            {keywordCount} kw
          </span>
        );
      case "hero":
        return isHeroConfigured ? (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-400">
            Saved
          </span>
        ) : (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-zinc-500/10 text-zinc-400">
            Empty
          </span>
        );
      case "aeo":
        return isAeoConfigured ? (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-400">
            Active
          </span>
        ) : (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-zinc-500/10 text-zinc-400">
            Empty
          </span>
        );
      case "usecases":
        return selectedPage === "labs" ? (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-purple-500/10 text-purple-400">
            {labsCount} project{labsCount !== 1 ? 's' : ''}
          </span>
        ) : (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-purple-500/10 text-purple-400">
            {useCaseCount} item{useCaseCount !== 1 ? 's' : ''}
          </span>
        );
      case "tech":
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-sky-500/10 text-sky-400">
            {techStackCount} tool{techStackCount !== 1 ? 's' : ''}
          </span>
        );
      case "cta":
        return isCtaConfigured ? (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-400">
            Saved
          </span>
        ) : (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-zinc-500/10 text-zinc-400">
            Empty
          </span>
        );
      case "schema":
        return isSchemaConfigured ? (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-400">
            Saved
          </span>
        ) : (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-zinc-500/10 text-zinc-400">
            Empty
          </span>
        );
      case "content":
        return !!formData.content ? (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-400">
            Active Spec
          </span>
        ) : (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-zinc-500/10 text-zinc-400">
            Empty
          </span>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (selectedPage === "llms_txt" || selectedPage === "llms_full_txt") {
      setActiveSubTab("content");
    } else if (activeSubTab === "content") {
      setActiveSubTab("meta");
    }

    const fetchPageData = async () => {
      setLoading(true);
      try {
        if (selectedPage === "labs") {
          const labsSnap = await getDocs(collection(db, "labs"));
          setLabsCount(labsSnap.size);
        }
        const docRef = doc(db, "dynamic_pages", selectedPage);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const dbData = docSnap.data();
          const defaultData = DEFAULT_PAGE_CONTENTS[selectedPage] || {};
          setFormData({
            pageId: selectedPage,
            ...defaultData,
            ...dbData,
            // Ensure trustBar and stats fall back to defaults if they are missing or empty in Firestore
            trustBar: dbData.trustBar?.length ? dbData.trustBar : defaultData.trustBar,
            stats: dbData.stats?.length ? dbData.stats : defaultData.stats,
            techStackItems: dbData.techStackItems?.length ? dbData.techStackItems : defaultData.techStackItems,
          } as PageConfig);
        } else {
          // Document does not exist in db, load hardcoded fallback default
          const defaultData = DEFAULT_PAGE_CONTENTS[selectedPage] || {};
          setFormData({ pageId: selectedPage, ...defaultData });
        }
      } catch (err) {
        console.error("Error fetching page configuration: ", err);
        showToast("Error loading page configurations", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchPageData();
  }, [selectedPage]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const docRef = doc(db, "dynamic_pages", selectedPage);
      // Clean up fields
      const { pageId, ...cleanData } = formData;
      await setDoc(docRef, { ...cleanData, pageId: selectedPage });
      showToast("Page layout saved successfully!", "success");
    } catch (err) {
      console.error("Error saving page configuration: ", err);
      showToast("Failed to save page configuration", "error");
    } finally {
      setSaving(false);
    }
  };

  // ── Add Page Modal ──────────────────────────────────────────────
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPageForm, setNewPageForm] = useState({ title: "", slug: "", group: "services" });
  const [creating, setCreating] = useState(false);

  const handleCreatePage = async () => {
    const slug = newPageForm.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    const title = newPageForm.title.trim();
    const group = newPageForm.group;

    if (!title || !slug) {
      showToast("Title and slug are required", "error");
      return;
    }

    setCreating(true);
    try {
      const docRef = doc(db, "dynamic_pages", slug);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        showToast(`A page with slug '${slug}' already exists`, "error");
        setCreating(false);
        return;
      }

      const groupBadge = group === "services" ? "Services" : "Industries";
      const newPageConfig = {
        pageId: slug,
        title,
        metadata: {
          title: `${title} Solutions | Botmartz AI`,
          description: `Optimize and automate your processes with premium AI workflows for ${title}.`,
          keywords: [title, groupBadge],
        },
        hero: {
          badge: `${groupBadge} / ${title}`,
          title: `Intelligent ${title} Systems`,
          subtitle: `Deploy custom-designed autonomous agents and reasoning systems tailored for ${title}.`,
          ctaText: "Book an AI Strategy Session →",
          ctaLink: "/contact",
        },
        aeoQuestion: `How does AI automation help in ${title}?`,
        aeoAnswer: `AI automation in ${title} helps optimize resource allocation, automate repetitive decisions, and accelerate operations using fine-tuned autonomous agents.`,
        useCases: [
          { title: `${title} Workflow Automation`, description: `Streamline core workflows and automate decision-making processes for ${title}.`, iconName: "Briefcase" },
        ],
        techStack: ["Next.js", "FastAPI", "OpenAI"],
        cta: {
          title: `Ready to Build Custom AI Systems for ${title}?`,
          subtitle: `Partner with Botmartz to deploy intelligent autonomous systems that scale.`,
          buttonText: "Schedule Strategy Session →",
        },
        structuredData: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: `${title} AI Engineering Services`,
          provider: { "@type": "Organization", name: "Botmartz" },
          description: `Optimize and automate processes with premium AI workflows for ${title}.`,
        }),
      };

      await setDoc(docRef, newPageConfig);
      showToast(`Page '${title}' created successfully!`, "success");
      setShowAddModal(false);
      setNewPageForm({ title: "", slug: "", group: "services" });
      router.push(`/admin/pages?page=${slug}`);
    } catch (e) {
      showToast("Error creating page. Please try again.", "error");
    } finally {
      setCreating(false);
    }
  };

  // Tag handler helper
  const addKeyword = () => {
    const val = keywordInput.trim();
    if (val) {
      const keywords = formData.metadata?.keywords || [];
      if (!keywords.includes(val)) {
        setFormData(prev => ({
          ...prev,
          metadata: {
            ...prev.metadata!,
            keywords: [...keywords, val]
          }
        }));
      }
      setKeywordInput("");
    }
  };

  const removeKeyword = (kwToRemove: string) => {
    const keywords = formData.metadata?.keywords || [];
    setFormData(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata!,
        keywords: keywords.filter(k => k !== kwToRemove)
      }
    }));
  };

  // Tech stack helper
  const addTech = () => {
    const val = techInput.trim();
    if (val) {
      const stack = formData.techStack || [];
      if (!stack.includes(val)) {
        setFormData(prev => ({
          ...prev,
          techStack: [...stack, val]
        }));
      }
      setTechInput("");
    }
  };

  const removeTech = (techToRemove: string) => {
    const stack = formData.techStack || [];
    setFormData(prev => ({
      ...prev,
      techStack: stack.filter(t => t !== techToRemove)
    }));
  };

  // Use cases helper
  const addUseCase = () => {
    if (newUseCase.title.trim() && newUseCase.description.trim()) {
      const currentList = formData.useCases || [];
      setFormData(prev => ({
        ...prev,
        useCases: [...currentList, { ...newUseCase }]
      }));
      setNewUseCase({ title: "", description: "", iconName: "" });
    }
  };

  const removeUseCase = (index: number) => {
    const currentList = formData.useCases || [];
    setFormData(prev => ({
      ...prev,
      useCases: currentList.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <RefreshCw size={24} className="text-brand animate-spin mb-4" />
        <p className="text-xs text-ink-soft font-mono">Loading Page Content Data...</p>
      </div>
    );
  }

  return (
    <div className={`font-sans p-6 max-w-[1400px] text-admin-text`}>
      {/* Top Header */}
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-admin-text flex items-center gap-2">
            <Layout size={24} className="text-admin-accent" /> Page Manager
          </h1>
          <p className="text-sm text-admin-text-muted mt-0.5">Edit layouts, keywords, QA sections, and features of website pages dynamically</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-admin-bg border border-admin-border hover:bg-admin-text/5 text-admin-text text-sm font-semibold rounded-xl transition-all shrink-0"
          >
            <Plus size={15} /> Add Page
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-admin-accent hover:bg-admin-accent/80 text-white text-sm font-semibold rounded-xl transition-all shadow-sm shrink-0 disabled:opacity-50"
          >
            {saving ? <RefreshCw size={15} className="animate-spin" /> : <Save size={15} />}
            {saving ? "Saving..." : "Save Page"}
          </button>
        </div>

        {/* ── Add Page Modal ── */}
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
            <div className="w-full max-w-md bg-admin-card border border-admin-border rounded-2xl shadow-2xl p-6 relative text-admin-text">
              {/* Close */}
              <button
                onClick={() => { setShowAddModal(false); setNewPageForm({ title: "", slug: "", group: "services" }); }}
                className="absolute top-4 right-4 text-admin-text-muted hover:text-admin-text transition-colors"
              >
                <X size={18} />
              </button>

              <h3 className="text-lg font-bold mb-1 flex items-center gap-2 text-admin-accent">
                <Plus size={18} /> Add New Dynamic Page
              </h3>
              <p className="text-xs text-admin-text-muted mb-5">Creates a new CMS page with default content. Edit it here after creation.</p>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-1.5">Page Title *</label>
                  <input
                    type="text"
                    value={newPageForm.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
                      setNewPageForm(prev => ({ ...prev, title, slug }));
                    }}
                    placeholder="e.g. Healthcare, Finance"
                    className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent transition-colors"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-1.5">URL Slug *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-admin-text-muted font-mono">/</span>
                    <input
                      type="text"
                      value={newPageForm.slug}
                      onChange={(e) => setNewPageForm(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="healthcare"
                      className="w-full bg-admin-bg border border-admin-border rounded-xl pl-6 pr-4 py-3 text-sm text-admin-text font-mono placeholder-admin-text-muted focus:outline-none focus:border-admin-accent transition-colors"
                    />
                  </div>
                  <p className="text-[10px] text-admin-text-muted mt-1">
                    Frontend URL: <span className="text-admin-accent font-mono">
                      /{newPageForm.group}/{newPageForm.slug || "slug"}
                    </span>
                  </p>
                </div>

                {/* Group */}
                <div>
                  <label className="block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-1.5">Page Group *</label>
                  <select
                    value={newPageForm.group}
                    onChange={(e) => setNewPageForm(prev => ({ ...prev, group: e.target.value }))}
                    className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors"
                  >
                    <option value="services">Services — /services/{newPageForm.slug || "slug"}</option>
                    <option value="industries">Industries — /industries/{newPageForm.slug || "slug"}</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => { setShowAddModal(false); setNewPageForm({ title: "", slug: "", group: "services" }); }}
                  className="px-4 py-2.5 border border-admin-border text-admin-text-muted rounded-xl hover:bg-admin-bg text-sm font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePage}
                  disabled={creating || !newPageForm.title || !newPageForm.slug}
                  className="flex items-center gap-2 px-5 py-2.5 bg-admin-accent hover:bg-admin-accent/80 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all shadow-sm"
                >
                  {creating ? <RefreshCw size={14} className="animate-spin" /> : <Plus size={14} />}
                  {creating ? "Creating..." : "Create Page"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Tabs (Left Column) */}
        <div className="flex flex-col gap-1 bg-admin-card border border-admin-border p-3 rounded-2xl h-fit">
          {(selectedPage === "llms_txt" || selectedPage === "llms_full_txt" ? [
            { id: "content", label: "AI Crawler Markdown", desc: "Raw Markdown Specification" },
            { id: "meta", label: "Metadata & SEO", desc: "Page Titles & Keywords" },
          ] : [
            { id: "meta", label: "Metadata & SEO", desc: "Page Titles & Keywords" },
            { id: "hero", label: "Hero Section", desc: "Hero Text & Call-To-Action" },
            { id: "aeo", label: "AEO Answer Block", desc: "Voice Search Optimization" },
            { id: "usecases", label: selectedPage === "labs" ? "Labs Projects" : "Use Cases", desc: selectedPage === "labs" ? "Manage Labs Project Grid" : "Features & Capabilities" },
            { id: "tech", label: "Tech Stack", desc: "Frameworks & Databases" },
            { id: "cta", label: "CTA Section", desc: "Bottom Footer CTA Layout" },
            { id: "schema", label: "JSON-LD Schema", desc: "Custom Structured Data" },
            ...(selectedPage === "home" ? [{ id: "homesections", label: "Trust Bar & Stats", desc: "Client Logos & Hero Metrics" }] : []),
          ]).map((tab) => {
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`w-full px-4 py-3 rounded-xl text-left transition-all ${
                  isActive ? "bg-admin-accent/10 border border-admin-accent/20 text-admin-text font-bold" : "hover:bg-admin-text/5 border border-transparent text-admin-text-muted"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm">{tab.label}</div>
                  {getTabBadge(tab.id)}
                </div>
                <div className="text-[10px] text-admin-text-muted/75 mt-0.5">{tab.desc}</div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Editor Panel (Right 3 Columns) */}
        <div className="lg:col-span-3 bg-admin-card border border-admin-border rounded-2xl p-6 relative">
          
          {/* TAB 1: METADATA & SEO */}
          {activeSubTab === "meta" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-admin-text border-b border-admin-border pb-3">Metadata & SEO Settings</h3>
              
              <div>
                <label className="block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-2">Page URL Reference</label>
                <input
                  type="text"
                  disabled
                  value={`/app/${selectedPage === "labs" || selectedPage === "case-studies" ? `work/${selectedPage}` : selectedPage === "ai-agents" || selectedPage === "enterprise-rag" ? `services/${selectedPage}` : `industries/${selectedPage}`}`}
                  className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2 text-sm text-admin-text-muted font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-admin-text uppercase tracking-wider mb-2">SEO Title Tag *</label>
                <input
                  type="text"
                  value={formData.metadata?.title || ""}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    metadata: { ...prev.metadata!, title: e.target.value }
                  }))}
                  className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent focus:ring-1 focus:ring-admin-accent"
                  placeholder="Enter custom browser tab title"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-admin-text uppercase tracking-wider mb-2">Meta Description *</label>
                <textarea
                  rows={4}
                  value={formData.metadata?.description || ""}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    metadata: { ...prev.metadata!, description: e.target.value }
                  }))}
                  className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent focus:ring-1 focus:ring-admin-accent resize-none"
                  placeholder="Summarize the page content for search engines..."
                />
              </div>

              {/* Keyword Array Editor */}
              <div>
                <label className="block text-xs font-bold text-admin-text uppercase tracking-wider mb-2">SEO Keywords</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                    placeholder="Type keyword and press Enter"
                    className="flex-1 bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent focus:ring-1 focus:ring-admin-accent"
                  />
                  <button
                    onClick={addKeyword}
                    className="px-4 py-2.5 bg-admin-bg border border-admin-border rounded-xl text-admin-text hover:text-admin-accent transition-colors text-sm font-semibold"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(formData.metadata?.keywords || []).map((kw) => (
                    <span key={kw} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-admin-bg border border-admin-border text-admin-text text-xs font-medium rounded-full">
                      #{kw}
                      <button onClick={() => removeKeyword(kw)} className="text-admin-text-muted hover:text-red-500 transition-colors">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                  {(formData.metadata?.keywords || []).length === 0 && (
                    <p className="text-xs text-admin-text-muted italic">No keywords added yet</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO SECTION */}
          {activeSubTab === "hero" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-admin-text border-b border-admin-border pb-3">Hero Banner & Page Template Configuration</h3>

              <div className="p-4 bg-admin-bg/60 border border-admin-border rounded-xl space-y-2">
                <label className="block text-xs font-bold text-admin-accent uppercase tracking-wider">Page Design & Layout Template</label>
                <p className="text-xs text-admin-text-muted">Select which pre-built architectural layout template will render this page on the frontside.</p>
                <select
                  value={formData.template || "template-1"}
                  onChange={(e) => setFormData(prev => ({ ...prev, template: e.target.value }))}
                  className="w-full bg-admin-card border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent font-medium mt-1"
                >
                  <option value="template-1">Template 1: Standard Enterprise AI Vertical (Hero + Use Cases + Case Study Spotlight)</option>
                  <option value="template-2">Template 2: Quantitative ROI & Metrics Grid (Hero + ROI Stat Blocks + Architecture Flow)</option>
                  <option value="template-3">Template 3: Agentic Copilot & Tech Deep-Dive (Hero + Live Code / Terminal Preview + SDK Hook)</option>
                  <option value="template-4">Template 4: Research Labs & Benchmarks Intensive (Hero + Empirical Benchmark Table + Multi-Case Grid)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-admin-text uppercase tracking-wider mb-2">Breadcrumb Badge</label>
                <input
                  type="text"
                  value={formData.hero?.badge || ""}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    hero: { ...prev.hero!, badge: e.target.value }
                  }))}
                  className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent focus:ring-1 focus:ring-admin-accent font-mono"
                  placeholder="e.g. Services / AI Agents"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-admin-text uppercase tracking-wider mb-2">Hero Main Title *</label>
                <input
                  type="text"
                  value={formData.hero?.title || ""}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    hero: { ...prev.hero!, title: e.target.value }
                  }))}
                  className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent focus:ring-1 focus:ring-admin-accent"
                  placeholder="Main catchphrase or headline"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-admin-text uppercase tracking-wider mb-2">Hero Description Subtext *</label>
                <textarea
                  rows={4}
                  value={formData.hero?.subtitle || ""}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    hero: { ...prev.hero!, subtitle: e.target.value }
                  }))}
                  className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent focus:ring-1 focus:ring-admin-accent resize-none"
                  placeholder="Explain what the service or page stands for..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-admin-text uppercase tracking-wider mb-2">Detailed Hero Description</label>
                <textarea
                  rows={4}
                  value={formData.hero?.description || ""}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    hero: { ...prev.hero!, description: e.target.value }
                  }))}
                  className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent focus:ring-1 focus:ring-admin-accent resize-none"
                  placeholder="Enter detailed description text..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-admin-text uppercase tracking-wider mb-2">CTA Button Text</label>
                  <input
                    type="text"
                    value={formData.hero?.ctaText || ""}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      hero: { ...prev.hero!, ctaText: e.target.value }
                    }))}
                    className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent focus:ring-1 focus:ring-admin-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-admin-text uppercase tracking-wider mb-2">CTA Button Link</label>
                  <input
                    type="text"
                    value={formData.hero?.ctaLink || ""}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      hero: { ...prev.hero!, ctaLink: e.target.value }
                    }))}
                    className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent focus:ring-1 focus:ring-admin-accent font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AEO ANSWER BLOCK */}
          {activeSubTab === "aeo" && (
            <div className="space-y-6">
              <div className="border-b border-admin-border pb-3 flex items-center justify-between">
                <h3 className="text-lg font-bold text-admin-text">Voice & Answer Engine Block</h3>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-admin-accent/10 border border-admin-accent/20 rounded-full text-xs font-bold text-admin-accent"><Info size={12} /> Recommended for SEO</span>
              </div>
              
              <div className="bg-admin-bg/60 border border-admin-border rounded-2xl p-4 text-xs text-admin-text-muted leading-relaxed mb-6">
                💡 This block renders structured Q&A information near the top fold of the page. It makes your page highly scannable by AI-powered Search Engines (like Google Gemini, Perplexity, or GPT Search) to generate instant direct quotes.
              </div>

              <div>
                <label className="block text-xs font-bold text-admin-text uppercase tracking-wider mb-2">Optimized Focus Question</label>
                <input
                  type="text"
                  value={formData.aeoQuestion || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, aeoQuestion: e.target.value }))}
                  className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent focus:ring-1 focus:ring-admin-accent"
                  placeholder="e.g. What are AI agents for business?"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-admin-text uppercase tracking-wider mb-2">Optimized Direct Answer</label>
                <textarea
                  rows={6}
                  value={formData.aeoAnswer || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, aeoAnswer: e.target.value }))}
                  className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent focus:ring-1 focus:ring-admin-accent"
                  placeholder="State the core value/definition clearly in 3-4 lines..."
                />
              </div>
            </div>
          )}

          {/* TAB 4: USE CASES */}
          {activeSubTab === "usecases" && (
            selectedPage === "labs" ? (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-admin-text border-b border-admin-border pb-3">Labs Projects Manager</h3>
                <LabsTab isEmbedded={true} onLabsCountChange={setLabsCount} />
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-admin-text border-b border-admin-border pb-3">Use Cases & Dynamic Offerings</h3>

              {/* Dynamic array listing */}
              <div className="space-y-4">
                {(formData.useCases || []).map((uc, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-admin-bg/40 border border-admin-border rounded-xl items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-admin-accent/10 border border-admin-accent/20 text-admin-accent font-mono text-[9px] uppercase font-bold rounded">Icon: {uc.iconName}</span>
                        <h4 className="text-sm font-bold text-admin-text">{uc.title}</h4>
                      </div>
                      <p className="text-xs text-admin-text-muted mt-1 leading-relaxed">{uc.description}</p>
                    </div>
                    <button
                      onClick={() => removeUseCase(index)}
                      className="p-1.5 hover:bg-red-500/10 text-admin-text-muted hover:text-red-500 rounded-lg transition-colors shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                {(formData.useCases || []).length === 0 && (
                  <div className="py-12 border border-dashed border-admin-border rounded-xl flex items-center justify-center text-xs text-admin-text-muted italic">No features added. Use the form below to add.</div>
                )}
              </div>

              {/* Add Use Case form */}
              <div className="bg-admin-bg/60 border border-admin-border p-5 rounded-2xl mt-6 space-y-4">
                <h4 className="text-xs font-bold text-admin-text uppercase tracking-wider">Add New Feature / Use Case</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-admin-text-muted uppercase mb-1">Title</label>
                    <input
                      type="text"
                      value={newUseCase.title}
                      onChange={(e) => setNewUseCase(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2 text-xs text-admin-text placeholder-admin-text-muted focus:outline-none"
                      placeholder="e.g. Sales Agents"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-admin-text-muted uppercase mb-1">Lucide Icon Key</label>
                    <input
                      type="text"
                      value={newUseCase.iconName}
                      onChange={(e) => setNewUseCase(prev => ({ ...prev, iconName: e.target.value }))}
                      className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2 text-xs text-admin-text placeholder-admin-text-muted focus:outline-none font-mono"
                      placeholder="e.g. Briefcase, Search, Activity"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-admin-text-muted uppercase mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={newUseCase.description}
                    onChange={(e) => setNewUseCase(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2 text-xs text-admin-text placeholder-admin-text-muted focus:outline-none resize-none"
                    placeholder="Short description of this capability..."
                  />
                </div>

                <button
                  onClick={addUseCase}
                  className="flex items-center gap-1.5 px-4 py-2 bg-admin-accent/10 border border-admin-accent/20 hover:bg-admin-accent text-admin-accent hover:text-white text-xs font-bold rounded-xl transition-all"
                >
                  <Plus size={13} /> Add Feature
                </button>
              </div>
            </div>
          )
        )}

          {/* TAB 5: TECH STACK */}
          {activeSubTab === "tech" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-admin-text border-b border-admin-border pb-3">Technical Stack & Frameworks</h3>
              
              {selectedPage === "home" ? (
                // Dedicated Home Page Tech Stack Icon Editor
                <div className="space-y-6">
                  <div className="space-y-3">
                    {(formData.techStackItems || []).map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-admin-bg/40 border border-admin-border rounded-xl">
                        <span className="px-2 py-0.5 bg-admin-accent/10 border border-admin-accent/20 text-admin-accent font-mono text-[9px] uppercase font-bold rounded shrink-0">
                          {item.iconName || 'icon'}
                        </span>
                        <span className="flex-1 text-sm font-semibold text-admin-text">{item.name}</span>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => {
                              const updated = [...(formData.techStackItems || [])];
                              updated[i] = { ...updated[i], name: e.target.value };
                              setFormData(prev => ({ ...prev, techStackItems: updated }));
                            }}
                            className="w-36 bg-admin-bg border border-admin-border rounded-lg px-2 py-1 text-xs text-admin-text focus:outline-none focus:border-admin-accent"
                            placeholder="Name"
                          />
                          <select
                            value={item.iconName || "SiOpenai"}
                            onChange={(e) => {
                              const updated = [...(formData.techStackItems || [])];
                              updated[i] = { ...updated[i], iconName: e.target.value };
                              setFormData(prev => ({ ...prev, techStackItems: updated }));
                            }}
                            className="bg-admin-bg border border-admin-border rounded-lg px-2 py-1 text-xs text-admin-text focus:outline-none focus:border-admin-accent font-mono"
                          >
                            <option value="SiOpenai">SiOpenai (OpenAI)</option>
                            <option value="SiPytorch">SiPytorch (PyTorch)</option>
                            <option value="SiGooglecloud">SiGooglecloud (Google Cloud)</option>
                            <option value="SiFastapi">SiFastapi (FastAPI)</option>
                            <option value="SiTensorflow">SiTensorflow (TensorFlow)</option>
                            <option value="SiDocker">SiDocker (Docker)</option>
                            <option value="SiAmazonwebservices">SiAmazonwebservices (AWS)</option>
                            <option value="SiPostgresql">SiPostgresql (PostgreSQL)</option>
                            <option value="Database">Database (General DB)</option>
                            <option value="Cloud">Cloud (General Cloud)</option>
                            <option value="LangGraph">LangGraph (Emoji)</option>
                            <option value="LangChain">LangChain (Emoji)</option>
                          </select>
                          <button
                            onClick={() => {
                              const updated = (formData.techStackItems || []).filter((_, idx) => idx !== i);
                              setFormData(prev => ({ ...prev, techStackItems: updated }));
                            }}
                            className="p-1.5 hover:bg-red-500/10 text-admin-text-muted hover:text-red-500 rounded-lg transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {(formData.techStackItems || []).length === 0 && (
                      <div className="py-8 border border-dashed border-admin-border rounded-xl flex items-center justify-center text-xs text-admin-text-muted italic">
                        No tech stack items added yet.
                      </div>
                    )}
                  </div>

                  {/* Add Tech Stack Item */}
                  <div className="bg-admin-bg/60 border border-admin-border rounded-2xl p-4 space-y-3">
                    <h5 className="text-xs font-bold text-admin-text uppercase tracking-wider">Add Tech Stack Item</h5>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-admin-text-muted uppercase mb-1">Name</label>
                        <input
                          id="new-tech-name"
                          type="text"
                          className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-2 text-xs text-admin-text focus:outline-none focus:border-admin-accent"
                          placeholder="e.g. PyTorch"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-admin-text-muted uppercase mb-1">Icon Key</label>
                        <select
                          id="new-tech-icon"
                          className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-2 text-xs text-admin-text font-mono focus:outline-none focus:border-admin-accent"
                        >
                          <option value="SiOpenai">SiOpenai (OpenAI)</option>
                          <option value="SiPytorch">SiPytorch (PyTorch)</option>
                          <option value="SiGooglecloud">SiGooglecloud (Google Cloud)</option>
                          <option value="SiFastapi">SiFastapi (FastAPI)</option>
                          <option value="SiTensorflow">SiTensorflow (TensorFlow)</option>
                          <option value="SiDocker">SiDocker (Docker)</option>
                          <option value="SiAmazonwebservices">SiAmazonwebservices (AWS)</option>
                          <option value="SiPostgresql">SiPostgresql (PostgreSQL)</option>
                          <option value="Database">Database (General DB)</option>
                          <option value="Cloud">Cloud (General Cloud)</option>
                          <option value="LangGraph">LangGraph (Emoji)</option>
                          <option value="LangChain">LangChain (Emoji)</option>
                        </select>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const nameVal = (document.getElementById('new-tech-name') as HTMLInputElement)?.value.trim();
                        const iconVal = (document.getElementById('new-tech-icon') as HTMLSelectElement)?.value;
                        if (nameVal && iconVal) {
                          setFormData(prev => ({
                            ...prev,
                            techStackItems: [...(prev.techStackItems || []), { name: nameVal, iconName: iconVal }]
                          }));
                          (document.getElementById('new-tech-name') as HTMLInputElement).value = '';
                        }
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 bg-admin-accent/10 border border-admin-accent/20 hover:bg-admin-accent text-admin-accent hover:text-white text-xs font-bold rounded-xl transition-all"
                    >
                      <Plus size={13} /> Add Stack Item
                    </button>
                  </div>
                </div>
              ) : (
                // Regular Tag Editor for other pages
                <div>
                  <label className="block text-xs font-bold text-admin-text uppercase tracking-wider mb-2">Add Tech Tool / Tag</label>
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addTech()}
                      placeholder="e.g. LangGraph, PyTorch, FastAPI"
                      className="flex-1 bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent focus:ring-1 focus:ring-admin-accent"
                    />
                    <button
                      onClick={addTech}
                      className="px-4 py-2.5 bg-admin-bg border border-admin-border rounded-xl text-admin-text hover:text-admin-accent transition-colors text-sm font-semibold"
                    >
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(formData.techStack || []).map((t) => (
                      <span key={t} className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-admin-bg border border-admin-border text-admin-text font-mono text-xs font-semibold rounded-lg">
                        {t}
                        <button onClick={() => removeTech(t)} className="text-admin-text-muted hover:text-red-500 transition-colors">
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    {(formData.techStack || []).length === 0 && (
                      <p className="text-xs text-admin-text-muted italic">No stack tags configured</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: CTA SECTION */}
          {activeSubTab === "cta" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-admin-text border-b border-admin-border pb-3">CTA Footer Configuration</h3>

              <div>
                <label className="block text-xs font-bold text-admin-text uppercase tracking-wider mb-2">CTA Title *</label>
                <input
                  type="text"
                  value={formData.cta?.title || ""}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    cta: { ...prev.cta!, title: e.target.value }
                  }))}
                  className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent focus:ring-1 focus:ring-admin-accent"
                  placeholder="e.g. Ready to deploy intelligent systems?"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-admin-text uppercase tracking-wider mb-2">CTA Subtitle *</label>
                <textarea
                  rows={4}
                  value={formData.cta?.subtitle || ""}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    cta: { ...prev.cta!, subtitle: e.target.value }
                  }))}
                  className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent focus:ring-1 focus:ring-admin-accent resize-none"
                  placeholder="Brief pitch before booking discovery calls..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-admin-text uppercase tracking-wider mb-2">CTA Button Text *</label>
                <input
                  type="text"
                  value={formData.cta?.buttonText || ""}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    cta: { ...prev.cta!, buttonText: e.target.value }
                  }))}
                  className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent focus:ring-1 focus:ring-admin-accent"
                />
              </div>
            </div>
          )}

          {/* TAB 7b: HOME SECTIONS (trust bar + stats) — only for home page */}
          {activeSubTab === "homesections" && selectedPage === "home" && (
            <div className="space-y-8">
              <h3 className="text-lg font-bold text-admin-text border-b border-admin-border pb-3">Trust Bar & Stats Cards</h3>

              {/* ── TRUST BAR ── */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-admin-text">Client Trust Bar</h4>
                    <p className="text-[11px] text-admin-text-muted mt-0.5">Logos shown in the hero section "Trusted by teams" row</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 bg-admin-accent/10 border border-admin-accent/20 rounded-full text-[10px] font-bold text-admin-accent">
                    {(formData.trustBar || []).length} client{(formData.trustBar || []).length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="space-y-2">
                  {(formData.trustBar || []).map((client, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-admin-bg/40 border border-admin-border rounded-xl">
                      <span className="px-2 py-0.5 bg-admin-accent/10 border border-admin-accent/20 text-admin-accent font-mono text-[9px] uppercase font-bold rounded shrink-0">
                        {client.iconName || 'icon'}
                      </span>
                      <span className="flex-1 text-sm font-semibold text-admin-text">{client.name}</span>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={client.name}
                          onChange={(e) => {
                            const updated = [...(formData.trustBar || [])];
                            updated[i] = { ...updated[i], name: e.target.value };
                            setFormData(prev => ({ ...prev, trustBar: updated }));
                          }}
                          className="w-28 bg-admin-bg border border-admin-border rounded-lg px-2 py-1 text-xs text-admin-text focus:outline-none focus:border-admin-accent"
                          placeholder="Name"
                        />
                        <select
                          value={client.iconName || "Layers"}
                          onChange={(e) => {
                            const updated = [...(formData.trustBar || [])];
                            updated[i] = { ...updated[i], iconName: e.target.value };
                            setFormData(prev => ({ ...prev, trustBar: updated }));
                          }}
                          className="bg-admin-bg border border-admin-border rounded-lg px-2 py-1 text-xs text-admin-text focus:outline-none focus:border-admin-accent font-mono"
                        >
                          <option value="Layers">Layers (Default)</option>
                          <option value="Blocks">Blocks</option>
                          <option value="Check">Check</option>
                          <option value="Code2">Code2</option>
                          <option value="Network">Network</option>
                          <option value="Briefcase">Briefcase</option>
                          <option value="Users">Users</option>
                          <option value="Star">Star</option>
                          <option value="Bot">Bot</option>
                          <option value="Globe">Globe</option>
                          <option value="Database">Database</option>
                          <option value="Cloud">Cloud</option>
                        </select>
                        <button
                          onClick={() => {
                            const updated = (formData.trustBar || []).filter((_, idx) => idx !== i);
                            setFormData(prev => ({ ...prev, trustBar: updated }));
                          }}
                          className="p-1.5 hover:bg-red-500/10 text-admin-text-muted hover:text-red-500 rounded-lg transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {(formData.trustBar || []).length === 0 && (
                    <div className="py-8 border border-dashed border-admin-border rounded-xl flex items-center justify-center text-xs text-admin-text-muted italic">
                      No clients added yet.
                    </div>
                  )}
                </div>

                {/* Add client */}
                <div className="bg-admin-bg/60 border border-admin-border rounded-2xl p-4 space-y-3">
                  <h5 className="text-xs font-bold text-admin-text uppercase tracking-wider">Add Client</h5>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-admin-text-muted uppercase mb-1">Client Name</label>
                      <input
                        type="text"
                        value={newTrustClient.name}
                        onChange={(e) => setNewTrustClient(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-2 text-xs text-admin-text focus:outline-none focus:border-admin-accent"
                        placeholder="e.g. EduBridge"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-admin-text-muted uppercase mb-1">Lucide Icon Key</label>
                      <select
                        value={newTrustClient.iconName || "Layers"}
                        onChange={(e) => setNewTrustClient(prev => ({ ...prev, iconName: e.target.value }))}
                        className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-2 text-xs text-admin-text font-mono focus:outline-none focus:border-admin-accent"
                      >
                        <option value="Layers">Layers (Default)</option>
                        <option value="Blocks">Blocks</option>
                        <option value="Check">Check</option>
                        <option value="Code2">Code2</option>
                        <option value="Network">Network</option>
                        <option value="Briefcase">Briefcase</option>
                        <option value="Users">Users</option>
                        <option value="Star">Star</option>
                        <option value="Bot">Bot</option>
                        <option value="Globe">Globe</option>
                        <option value="Database">Database</option>
                        <option value="Cloud">Cloud</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (newTrustClient.name.trim()) {
                        setFormData(prev => ({ ...prev, trustBar: [...(prev.trustBar || []), { ...newTrustClient, iconName: newTrustClient.iconName || "Layers" }] }));
                        setNewTrustClient({ name: "", iconName: "Layers" });
                      }
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-admin-accent/10 border border-admin-accent/20 hover:bg-admin-accent text-admin-accent hover:text-white text-xs font-bold rounded-xl transition-all"
                  >
                    <Plus size={13} /> Add Client
                  </button>
                </div>
              </div>

              {/* ── STATS BAR ── */}
              <div className="space-y-4 border-t border-admin-border pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-admin-text">Hero Stats Cards</h4>
                    <p className="text-[11px] text-admin-text-muted mt-0.5">The 4 metric boxes shown below the hero (20+, 2K+, 10+, 5★)</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-bold text-purple-400">
                    {(formData.stats || []).length} stat{(formData.stats || []).length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="space-y-3">
                  {(formData.stats || []).map((stat, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-admin-bg/40 border border-admin-border rounded-xl">
                      <span className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-[9px] uppercase font-bold rounded shrink-0">
                        {stat.iconName || 'icon'}
                      </span>
                      <div className="flex-1 grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => {
                            const updated = [...(formData.stats || [])];
                            updated[i] = { ...updated[i], value: e.target.value };
                            setFormData(prev => ({ ...prev, stats: updated }));
                          }}
                          className="bg-admin-bg border border-admin-border rounded-lg px-2 py-1 text-xs text-admin-text font-bold focus:outline-none focus:border-admin-accent"
                          placeholder="Value (e.g. 20+)"
                        />
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const updated = [...(formData.stats || [])];
                            updated[i] = { ...updated[i], label: e.target.value };
                            setFormData(prev => ({ ...prev, stats: updated }));
                          }}
                          className="bg-admin-bg border border-admin-border rounded-lg px-2 py-1 text-xs text-admin-text focus:outline-none focus:border-admin-accent"
                          placeholder="Label"
                        />
                        <select
                          value={stat.iconName || "Star"}
                          onChange={(e) => {
                            const updated = [...(formData.stats || [])];
                            updated[i] = { ...updated[i], iconName: e.target.value };
                            setFormData(prev => ({ ...prev, stats: updated }));
                          }}
                          className="bg-admin-bg border border-admin-border rounded-lg px-2 py-1 text-xs text-admin-text font-mono focus:outline-none focus:border-admin-accent"
                        >
                          <option value="Briefcase">Briefcase</option>
                          <option value="Users">Users</option>
                          <option value="Code2">Code2</option>
                          <option value="Star">Star</option>
                          <option value="Layers">Layers</option>
                          <option value="Blocks">Blocks</option>
                          <option value="Check">Check</option>
                          <option value="Bot">Bot</option>
                          <option value="Network">Network</option>
                          <option value="Globe">Globe</option>
                          <option value="Database">Database</option>
                          <option value="Cloud">Cloud</option>
                        </select>
                      </div>
                      <button
                        onClick={() => {
                          const updated = (formData.stats || []).filter((_, idx) => idx !== i);
                          setFormData(prev => ({ ...prev, stats: updated }));
                        }}
                        className="p-1.5 hover:bg-red-500/10 text-admin-text-muted hover:text-red-500 rounded-lg transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                  {(formData.stats || []).length === 0 && (
                    <div className="py-8 border border-dashed border-admin-border rounded-xl flex items-center justify-center text-xs text-admin-text-muted italic">
                      No stats configured.
                    </div>
                  )}
                </div>

                {/* Add stat */}
                <div className="bg-admin-bg/60 border border-admin-border rounded-2xl p-4 space-y-3">
                  <h5 className="text-xs font-bold text-admin-text uppercase tracking-wider">Add Stat Card</h5>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-admin-text-muted uppercase mb-1">Value *</label>
                      <input id="new-stat-value" type="text" className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-2 text-xs text-admin-text font-bold focus:outline-none focus:border-admin-accent" placeholder="e.g. 50+" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-admin-text-muted uppercase mb-1">Label *</label>
                      <input id="new-stat-label" type="text" className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-2 text-xs text-admin-text focus:outline-none focus:border-admin-accent" placeholder="e.g. Projects Delivered" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-admin-text-muted uppercase mb-1">Icon Key</label>
                      <select
                        id="new-stat-icon"
                        className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-2 text-xs text-admin-text font-mono focus:outline-none focus:border-admin-accent"
                      >
                        <option value="Briefcase">Briefcase</option>
                        <option value="Users">Users</option>
                        <option value="Code2">Code2</option>
                        <option value="Star">Star</option>
                        <option value="Layers">Layers</option>
                        <option value="Blocks">Blocks</option>
                        <option value="Check">Check</option>
                        <option value="Bot">Bot</option>
                        <option value="Network">Network</option>
                        <option value="Globe">Globe</option>
                        <option value="Database">Database</option>
                        <option value="Cloud">Cloud</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const val = (document.getElementById('new-stat-value') as HTMLInputElement)?.value.trim();
                      const lbl = (document.getElementById('new-stat-label') as HTMLInputElement)?.value.trim();
                      const ico = (document.getElementById('new-stat-icon') as HTMLSelectElement)?.value;
                      if (val && lbl) {
                        setFormData(prev => ({ ...prev, stats: [...(prev.stats || []), { value: val, label: lbl, iconName: ico || 'Star' }] }));
                        (document.getElementById('new-stat-value') as HTMLInputElement).value = '';
                        (document.getElementById('new-stat-label') as HTMLInputElement).value = '';
                      }
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500 text-purple-400 hover:text-white text-xs font-bold rounded-xl transition-all"
                  >
                    <Plus size={13} /> Add Stat
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: SCHEMA DATA */}
          {activeSubTab === "schema" && (
            <div className="space-y-6">
              <div className="border-b border-admin-border pb-3 flex items-center justify-between">
                <h3 className="text-lg font-bold text-admin-text">JSON-LD Structured Schema</h3>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-xs font-bold text-green-400"><Globe size={12} /> Dynamic SEO inject</span>
              </div>

              <div className="bg-admin-bg/60 border border-admin-border rounded-2xl p-4 text-xs text-admin-text-muted leading-relaxed mb-6">
                💡 Custom JSON-LD schema parsed in the background on the page. Enter structured JSON code here representing this specific service schema or FAQ schemas.
              </div>

              <div>
                <label className="block text-xs font-bold text-admin-text uppercase tracking-wider mb-2">Structured Schema Code (JSON format)</label>
                <textarea
                  rows={14}
                  value={formData.structuredData || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, structuredData: e.target.value }))}
                  className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-xs text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent focus:ring-1 focus:ring-admin-accent resize-none font-mono"
                  placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "Service",\n  ...\n}`}
                />
              </div>
            </div>
          )}

          {/* TAB 8: AI CRAWLER MARKDOWN (`content` tab for llms.txt & llms-full.txt) */}
          {activeSubTab === "content" && (
            <div className="space-y-6">
              <div className="border-b border-admin-border pb-3 flex items-center justify-between">
                <h3 className="text-lg font-bold text-admin-text">AI Crawler Markdown Specification</h3>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-400">
                  <Globe size={12} /> Live /llms.txt Endpoint
                </span>
              </div>

              <div className="bg-admin-bg/60 border border-admin-border rounded-2xl p-4 text-xs text-admin-text-muted leading-relaxed">
                💡 This Markdown specification is served at <code>/{selectedPage === "llms_full_txt" ? "llms-full.txt" : "llms.txt"}</code> for AI crawlers (OpenAI GPTBot, PerplexityBot, ClaudeBot, Google Gemini) and Answer Engine Optimization (AEO).
              </div>

              <div>
                <label className="block text-xs font-bold text-admin-text uppercase tracking-wider mb-2">Raw Markdown Specification *</label>
                <textarea
                  rows={20}
                  value={formData.content || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-xs text-admin-text font-mono placeholder-admin-text-muted focus:outline-none focus:border-admin-accent focus:ring-1 focus:ring-admin-accent leading-relaxed"
                  placeholder="# Botmartz AI Solutions&#10;> Enter LLM crawler markdown specification here..."
                />
              </div>
            </div>
          )}

        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
