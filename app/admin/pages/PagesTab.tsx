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
import { Inter_Tight } from "next/font/google";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

// Types
interface UseCase {
  title: string;
  description: string;
  iconName: string;
}

interface PageConfig {
  pageId: string;
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
    ctaText: string;
    ctaLink: string;
  };
  aeoQuestion?: string;
  aeoAnswer?: string;
  useCases: UseCase[];
  techStack: string[];
  cta: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  structuredData: string;
}

// 7 pages we can edit
const AVAILABLE_PAGES = [
  { id: "ai-agents", name: "Services / AI Agents" },
  { id: "enterprise-rag", name: "Services / Enterprise RAG" },
  { id: "education", name: "Industries / Education" },
  { id: "logistics", name: "Industries / Logistics" },
  { id: "legal", name: "Industries / Legal" },
  { id: "labs", name: "Work / Labs" },
  { id: "case-studies", name: "Work / Case Studies" },
];

// Fallback Default Content mapped by pageId
const DEFAULT_PAGE_CONTENTS: Record<string, Partial<PageConfig>> = {
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
      ctaLink: "/contact",
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
  "labs": {
    title: "Labs",
    metadata: {
      title: "Open Source & AI Labs | Botmartz AI",
      description: "Explore our open source projects and AI labs. We build and share enterprise RAG starters, agent frameworks, and templates.",
      keywords: ["Botmartz Labs", "Open Source AI", "RAG Starter Template", "LangGraph Agent Template"],
    },
    hero: {
      badge: "BOTMARTZ LABS",
      title: "Building Today. Engineering Tomorrow.",
      subtitle: "Our labs is where we experiment, build, and open source production-ready AI systems that solve real problems.",
      ctaText: "Explore All Projects →",
      ctaLink: "#projects",
    },
    useCases: [
      { title: "Virtual Try-On", description: "Computer vision pipeline for real-time garment fitting — built to stress-test our vision stack.", iconName: "PyTorch, Demo + Repo" },
      { title: "AI Research Agent", description: "An internal agent that runs first-pass research and drafts outreach — in daily use at Botmartz.", iconName: "LangGraph, Demo + Repo" },
      { title: "Enterprise RAG Demo", description: "A reference implementation showing chunking, hybrid retrieval, and evaluation end to end.", iconName: "FastAPI, Demo + Repo" },
    ],
    techStack: ["PyTorch", "LangChain", "LangGraph", "Google ADK", "FastAPI", "PostgreSQL", "Redis", "Docker", "AWS"],
    cta: {
      title: "Have an Idea Worth Building?",
      subtitle: "Let's build the next lab together. We collaborate with founders, researchers, and engineers.",
      buttonText: "Start a Conversation →",
    },
    structuredData: "",
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
  const [activeSubTab, setActiveSubTab] = useState<"meta" | "hero" | "aeo" | "usecases" | "tech" | "cta" | "schema">("meta");

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
  const techStackCount = formData.techStack?.length || 0;
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
        return (
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
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "dynamic_pages", selectedPage);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData({ pageId: selectedPage, ...docSnap.data() } as PageConfig);
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
    <div className={`${interTight.className} p-6 max-w-[1400px] text-admin-text`}>
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
          {[
            { id: "meta", label: "Metadata & SEO", desc: "Page Titles & Keywords" },
            { id: "hero", label: "Hero Section", desc: "Hero Text & Call-To-Action" },
            { id: "aeo", label: "AEO Answer Block", desc: "Voice Search Optimization" },
            { id: "usecases", label: "Use Cases", desc: "Features & Capabilities" },
            { id: "tech", label: "Tech Stack", desc: "Frameworks & Databases" },
            { id: "cta", label: "CTA Section", desc: "Bottom Footer CTA Layout" },
            { id: "schema", label: "JSON-LD Schema", desc: "Custom Structured Data" },
          ].map((tab) => {
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
              <h3 className="text-lg font-bold text-admin-text border-b border-admin-border pb-3">Hero Banner Configuration</h3>

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
          )}

          {/* TAB 5: TECH STACK */}
          {activeSubTab === "tech" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-admin-text border-b border-admin-border pb-3">Technical Stack & Frameworks</h3>
              
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

        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
