export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'architecture';

export interface GlossaryCategory {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  iconName: string;
}

export interface GlossaryTerm {
  slug: string;
  term: string;
  aliases?: string[];
  category: string; // matches GlossaryCategory.slug
  difficulty: DifficultyLevel;
  letter: string; // A-Z
  shortDefinition: string;
  simpleAnalogy: string;
  technicalBreakdown: {
    title: string;
    description: string;
    steps?: string[];
  };
  mathematicalOrAlgorithmicModel?: {
    label: string;
    formula: string;
    explanation: string;
  };
  implementationExample?: {
    language: string;
    code: string;
    explanation: string;
  };
  whenToUse: string[];
  whenToAvoid: string[];
  tradeoffsAndLimitations: string[];
  relatedTerms: string[]; // slugs
  commercialPathway: {
    headline: string;
    description: string;
    serviceLink: string;
    serviceLabel: string;
  };
  verifiedSources: {
    title: string;
    authorOrStandard: string;
    yearOrVersion: string;
    link?: string;
  }[];
  lastReviewed: string; // ISO date or 'November 2026'
  hasDedicatedPage: boolean;
}

export const GLOSSARY_CATEGORIES: GlossaryCategory[] = [
  {
    id: "01",
    slug: "ai-fundamentals",
    name: "AI Fundamentals",
    tagline: "Core AI concepts, terminology, and foundational representations",
    description: "The essential building blocks of artificial intelligence, algorithms, models, and reasoning mechanisms that underpin modern enterprise systems.",
    accentColor: "#10B981",
    badgeBg: "bg-emerald-50 border-emerald-200",
    badgeText: "text-emerald-700",
    iconName: "Brain"
  },
  {
    id: "02",
    slug: "machine-learning",
    name: "Machine Learning & Deep Learning",
    tagline: "Neural networks, optimization, gradient descent, and training dynamics",
    description: "Architectural foundations of statistical learning, loss functions, backpropagation, and transformer attention mechanisms.",
    accentColor: "#3B82F6",
    badgeBg: "bg-blue-50 border-blue-200",
    badgeText: "text-blue-700",
    iconName: "Network"
  },
  {
    id: "03",
    slug: "generative-ai",
    name: "Generative AI & LLMs",
    tagline: "Large language models, tokens, context windows, and inference dynamics",
    description: "Next-token prediction, transformer self-attention, context length limits, KV caching, and open-weight model architectures.",
    accentColor: "#8B5CF6",
    badgeBg: "bg-purple-50 border-purple-200",
    badgeText: "text-purple-700",
    iconName: "Sparkles"
  },
  {
    id: "04",
    slug: "rag-retrieval",
    name: "RAG & Knowledge Systems",
    tagline: "Ingestion, AST parsing, chunking, embeddings, and grounding",
    description: "Retrieval-Augmented Generation workflows converting unstructured PDFs, spreadsheets, and databases into verified evidence-backed outputs.",
    accentColor: "#0284C7",
    badgeBg: "bg-sky-50 border-sky-200",
    badgeText: "text-sky-700",
    iconName: "Database"
  },
  {
    id: "05",
    slug: "search-information-retrieval",
    name: "Search & Information Retrieval",
    tagline: "BM25 lexical indexes, vector similarity, hybrid fusion, and rerankers",
    description: "Dual-stream retrieval architectures combining sparse inverted indexes, dense vector traversal (HNSW), and cross-encoder re-scoring.",
    accentColor: "#0D9488",
    badgeBg: "bg-teal-50 border-teal-200",
    badgeText: "text-teal-700",
    iconName: "Search"
  },
  {
    id: "06",
    slug: "ai-agents",
    name: "AI Agents & Multi-Agent Systems",
    tagline: "State machines, tool calling, cyclical execution, and HITL review gates",
    description: "Autonomous task decomposition, deterministic LangGraph DAGs, checkpointing, and human authorization gates before system mutations.",
    accentColor: "#F59E0B",
    badgeBg: "bg-amber-50 border-amber-200",
    badgeText: "text-amber-700",
    iconName: "Workflow"
  },
  {
    id: "07",
    slug: "ai-system-design",
    name: "AI System Design & Architecture",
    tagline: "Distributed inference, VPC isolation, caching, and SLA engineering",
    description: "Production architectural blueprints, streaming token protocols, write-ahead logging, and compensating saga transactions.",
    accentColor: "#1E293B",
    badgeBg: "bg-slate-100 border-slate-300",
    badgeText: "text-slate-800",
    iconName: "Cpu"
  },
  {
    id: "08",
    slug: "evaluation-observability",
    name: "Evaluation, Reliability & Observability",
    tagline: "RAGAS, OpenTelemetry, synthetic test sets, and hallucination containment",
    description: "Automated regression testing, claim-level precision scoring, latency benchmarking, and runtime tracing.",
    accentColor: "#6366F1",
    badgeBg: "bg-indigo-50 border-indigo-200",
    badgeText: "text-indigo-700",
    iconName: "Activity"
  },
  {
    id: "09",
    slug: "ai-security",
    name: "Security, Governance & Privacy",
    tagline: "Prompt injection defense, air-gapped VPCs, RBAC, and zero-PII retention",
    description: "Enterprise threat modeling, network egress controls, ISO 42001 alignment, and Indian DPDPA / EU AI Act regulatory compliance.",
    accentColor: "#DC2626",
    badgeBg: "bg-red-50 border-red-200",
    badgeText: "text-red-700",
    iconName: "ShieldCheck"
  },
  {
    id: "10",
    slug: "prompt-engineering",
    name: "Prompt Engineering & Structured Outputs",
    tagline: "JSON Schemas, Pydantic validation, tool call protocols, and few-shot conditioning",
    description: "Constrained decoding, deterministic JSON outputs, model steering, and zero-shot reasoning frameworks.",
    accentColor: "#EC4899",
    badgeBg: "bg-pink-50 border-pink-200",
    badgeText: "text-pink-700",
    iconName: "Code"
  },
  {
    id: "11",
    slug: "ai-infrastructure",
    name: "AI Infrastructure & Deployment",
    tagline: "vLLM, Ollama, TensorRT-LLM, GPU memory orchestration, and private clouds",
    description: "Self-hosted model serving, quantization (AWQ, GGUF), continuous batching, and high-throughput serverless endpoints.",
    accentColor: "#475569",
    badgeBg: "bg-zinc-100 border-zinc-300",
    badgeText: "text-zinc-800",
    iconName: "Server"
  },
  {
    id: "12",
    slug: "applied-enterprise-ai",
    name: "Applied Enterprise AI Workflows",
    tagline: "Legal compliance, aerospace MRO, insurance underwriting, and ERP mutations",
    description: "Domain-specific implementations translating dense regulatory documents and operational ledgers into automated enterprise workflows.",
    accentColor: "#0F766E",
    badgeBg: "bg-emerald-50 border-emerald-300",
    badgeText: "text-emerald-800",
    iconName: "FileCheck"
  }
];

