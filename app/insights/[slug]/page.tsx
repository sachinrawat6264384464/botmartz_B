import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { adminDb } from '@/lib/firebase-admin';
import InsightsDetailClient from './InsightsDetailClient';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const KEPT_SLUGS = new Set([
  "building-a-scalable-enterprise-rag-system-architecture-components-best-practices",
  "inside-ai-agents-from-reasoning-to-real-world-action",
  "microservices-vs-monolith-for-ai-systems-what-we-learned",
  "observability-for-llm-applications-metrics-that-matter",
  "advanced-rag-techniques-hybrid-search-reranking-query-rewriting",
  "build-an-ai-chatbot-with-langgraph-and-openai-step-by-step",
  "open-source-projects-from-botmartz-labs-you-should-know",
  "prompt-engineering-patterns-that-actually-work-in-production",
  "how-we-built-a-legal-document-intelligence-system-for-100k-docs"
]);

const STATIC_POSTS: Record<string, any> = {
  "building-a-scalable-enterprise-rag-system-architecture-components-best-practices": {
    title: "Building a Scalable Enterprise RAG System: Architecture, Components & Best Practices",
    category: "ENTERPRISE RAG",
    excerpt: "A complete blueprint for building production-ready RAG systems that are secure, accurate, and scalable for enterprise workloads.",
    author: "Botmartz Engineering Team",
    createdAt: "2024-05-12T00:00:00.000Z",
    updatedAt: "2024-05-12T00:00:00.000Z",
    readTime: 12,
    content: `
# Building a Scalable Enterprise RAG System: Architecture, Components & Best Practices

Retrieval-Augmented Generation (RAG) has become the standard architecture for bringing external, proprietary knowledge to Large Language Models (LLMs). However, scaling a RAG system from a weekend prototype to a reliable, secure enterprise-grade service requires addressing several key engineering challenges.

In this guide, we outline the complete architectural blueprint, key components, and best practices we use at Botmartz to build production-ready RAG systems.

## The Enterprise RAG Architecture

A scalable RAG system consists of three main pipelines: the ingestion pipeline, the retrieval pipeline, and the generation pipeline.

### Ingestion Pipeline
1. **Document Parsers**: Support for PDFs, Docs, HTML, and audio/video files.
2. **Chunking Strategies**: Semantic chunking and recursive text splitting to maintain context.
3. **Embedding Generation**: Creating high-density vector representations.
4. **Vector Databases**: Scaling storage with index types like HNSW.

### Retrieval Pipeline
- **Hybrid Search**: Combining keyword search (BM25) with vector search (dense embeddings).
- **Rerankers**: Using Cohere Rerank or cross-encoders to sort the top hits.
- **Metadata Filtering**: Ensuring strict data tenancy and authorization filters.

### Generation Pipeline
- **Prompt Engineering**: Dynamic context assembly and system guardrails.
- **LLM Orchestration**: Handling tokens, rate limits, and fallback models.
    `
  },
  "inside-ai-agents-from-reasoning-to-real-world-action": {
    title: "Inside AI Agents: From Reasoning to Real-World Action",
    category: "AI AGENTS",
    excerpt: "Explore the core components of AI agents, including planning, tool calling, memory, and evaluation.",
    author: "Soham Sharma",
    createdAt: "2024-05-08T00:00:00.000Z",
    updatedAt: "2024-05-08T00:00:00.000Z",
    readTime: 9,
    content: `
# Inside AI Agents: From Reasoning to Real-World Action

AI Agents represent the next frontier of LLM applications, transitioning from passive content generators to active decision-makers that can plan, reason, call tools, and execute workflows autonomously.

## Core Components of an AI Agent

1. **Reasoning & Planning**: Decomposing complex goals into manageable steps (e.g., ReAct, Chain-of-Thought).
2. **Tool Integration**: Connecting the agent to external APIs, databases, and web browsers.
3. **Memory Systems**: Short-term memory (conversation state) and long-term memory (vector storage).
4. **Agentic Loops**: Self-correction and reflection mechanisms.
    `
  },
  "microservices-vs-monolith-for-ai-systems-what-we-learned": {
    title: "Microservices vs Monolith for AI Systems: What We Learned",
    category: "ARCHITECTURE",
    excerpt: "A practical comparison based on real production deployments and scalability requirements.",
    author: "Renee D.",
    createdAt: "2024-05-05T00:00:00.000Z",
    updatedAt: "2024-05-05T00:00:00.000Z",
    readTime: 7,
    content: `
# Microservices vs Monolith for AI Systems: What We Learned

When designing scalable AI architectures, teams often face the trade-off between monolithic simplicity and microservices agility.

## Architectural Trade-offs

1. **Monolithic AI Applications**: Easier local debugging, shared memory space, simple CI/CD pipelines, but harder independent scaling of heavy ML inference.
2. **Microservices Architecture**: Separate services for embedding generation, vector search, and model inference allow targeted GPU/CPU auto-scaling and independent deployments.
    `
  },
  "observability-for-llm-applications-metrics-that-matter": {
    title: "Observability for LLM Applications: Metrics That Matter",
    category: "MLOPS",
    excerpt: "Key metrics, dashboards and alerts to monitor LLM apps in production and ensure reliability.",
    author: "Harish R.",
    createdAt: "2024-04-30T00:00:00.000Z",
    updatedAt: "2024-04-30T00:00:00.000Z",
    readTime: 8,
    content: `
# Observability for LLM Applications: Metrics That Matter

Deploying LLMs to production is only the beginning. Keeping them running reliably, accurately, and cost-effectively requires comprehensive observability.

## Key Metrics to Monitor

1. **Latency**: Time to first token (TTFT) and total response latency.
2. **Tokens**: Input vs output token counts to monitor cost and usage patterns.
3. **Accuracy / Hallucination Rate**: Groundedness and relevance scores using LLM-as-a-judge.
4. **Error Rates**: Rate-limit exceptions, timeouts, and guardrail blocks.
    `
  },
  "advanced-rag-techniques-hybrid-search-reranking-query-rewriting": {
    title: "Advanced RAG Techniques: Hybrid Search, Reranking & Query Rewriting",
    category: "ENTERPRISE RAG",
    excerpt: "Improve retrieval accuracy and reduce hallucinations with hybrid search, rerankers, and LLM-based query rewriting.",
    author: "Botmartz Team",
    createdAt: "2024-04-25T00:00:00.000Z",
    updatedAt: "2024-04-25T00:00:00.000Z",
    readTime: 10,
    content: `
# Advanced RAG Techniques: Hybrid Search, Reranking & Query Rewriting

Basic dense vector retrieval often fails on exact keyword matches, SKU numbers, or domain-specific acronyms. Advanced RAG combines multiple retrieval techniques to dramatically boost precision.

## Key Techniques

- **Hybrid Search**: Combining sparse BM25 indexing with dense embedding cosine similarity.
- **Cross-Encoder Reranking**: Passing retrieved candidate chunks through a cross-encoder model to accurately re-score context relevance.
- **Query Rewriting (HyDE)**: Using an LLM to expand or transform ambiguous user queries before searching the vector space.
    `
  },
  "build-an-ai-chatbot-with-langgraph-and-openai-step-by-step": {
    title: "Build an AI Chatbot with LangGraph and OpenAI: Step-by-Step",
    category: "AI AGENTS",
    excerpt: "A step-by-step tutorial on building a stateful, cyclic conversational agent using LangGraph state machines.",
    author: "Botmartz Engineering Team",
    createdAt: "2024-04-20T00:00:00.000Z",
    updatedAt: "2024-04-20T00:00:00.000Z",
    readTime: 11,
    content: `
# Build an AI Chatbot with LangGraph and OpenAI: Step-by-Step

Unlike traditional linear chains, complex conversational AI workflows require cycles, state persistence, and branching logic. LangGraph provides the ideal framework for building stateful agents.

## Step-by-Step Implementation

1. **State Definition**: Defining our graph state structure with message history and intermediate tool outputs.
2. **Nodes & Edges**: Creating functional nodes for LLM reasoning and custom edge evaluators for conditional routing.
3. **Checkpointers**: Persisting conversation checkpoints across multi-turn interactions.
    `
  },
  "open-source-projects-from-botmartz-labs-you-should-know": {
    title: "Open Source Projects from Botmartz Labs You Should Know",
    category: "OPEN SOURCE",
    excerpt: "Explore the open source developer tools, agent frameworks, and evaluation libraries published by Botmartz Labs.",
    author: "Botmartz Engineering Team",
    createdAt: "2024-04-15T00:00:00.000Z",
    updatedAt: "2024-04-15T00:00:00.000Z",
    readTime: 6,
    content: `
# Open Source Projects from Botmartz Labs You Should Know

At Botmartz, open source engineering is core to our DNA. We continuously publish production-tested components and tools to help the AI engineering community build faster and more reliably.

## Highlighted Repositories

- **Agent Evaluation Harness**: Automated test suites for measuring agent tool-use accuracy.
- **Hybrid Search Utilities**: High-performance BM25 and vector indexing connectors.
- **Streamlined RAG Templates**: Ready-to-deploy Next.js and FastAPI starter kits.
    `
  },
  "prompt-engineering-patterns-that-actually-work-in-production": {
    title: "Prompt Engineering Patterns That Actually Work in Production",
    category: "AI ENGINEERING",
    excerpt: "Discover proven prompt patterns for structured outputs, error handling, and deterministic reasoning.",
    author: "Botmartz Engineering Team",
    createdAt: "2024-04-10T00:00:00.000Z",
    updatedAt: "2024-04-10T00:00:00.000Z",
    readTime: 8,
    content: `
# Prompt Engineering Patterns That Actually Work in Production

Prompt engineering in enterprise production environments requires precision, consistency, and resilience to model drift.

## Production Patterns

1. **Structured Output Enforcement**: Utilizing schema-based JSON generation (\`response_format\`) to guarantee schema validity.
2. **Chain-of-Verification (CoVe)**: Prompting the model to self-verify its intermediate claims against provided source documents before formulating a final answer.
3. **System Guardrails**: Explicit demarcation of instruction boundaries to mitigate prompt injection vulnerabilities.
    `
  },
  "how-we-built-a-legal-document-intelligence-system-for-100k-docs": {
    title: "How We Built a Legal Document Intelligence System for 100K+ Docs",
    category: "CASE STUDIES",
    excerpt: "An inside look at our architecture for parsing, indexing, and reasoning over complex legal contracts and filings.",
    author: "Botmartz Engineering Team",
    createdAt: "2024-04-05T00:00:00.000Z",
    updatedAt: "2024-04-05T00:00:00.000Z",
    readTime: 14,
    content: `
# How We Built a Legal Document Intelligence System for 100K+ Docs

Legal documents present unique AI challenges: dense terminology, multi-page cross-references, scanned PDF layouts, and strict accuracy mandates.

## System Blueprint

- **Layout-Aware Optical Character Recognition (OCR)**: Preserving table hierarchies and footnotes during ingestion.
- **Hierarchical Indexing**: Indexing parent document summaries alongside fine-grained semantic clauses.
- **Audit Trails & Exact Citations**: Providing verifiable paragraph-level source links for every generated legal synthesis.
    `
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!KEPT_SLUGS.has(slug)) {
    return {
      title: "Insight Not Found",
    };
  }
  let post: any = null;
  
  try {
    const querySnapshot = await adminDb.collection("blog-posts")
      .where("slug", "==", slug)
      .limit(1)
      .get();
      
    if (!querySnapshot.empty) {
      post = querySnapshot.docs[0].data();
    }
  } catch (e) {
    console.error("Error generating metadata for blog post:", e);
  }
  
  if (!post && STATIC_POSTS[slug]) {
    post = STATIC_POSTS[slug];
  }
  
  if (!post) {
    return {
      title: "Insight",
      description: "Explore engineering insights and AI research from Botmartz.",
    };
  }
  
  let desc = post.excerpt || `Read our latest insight article about ${post.title}.`;
  if (desc.length < 50) {
    desc = `Read our technical analysis and engineering deep dive on ${post.title} at Botmartz. Explore production AI workflows and real-world architectures.`;
  }
  if (desc.length > 155) {
    desc = desc.substring(0, 152) + '...';
  }

  return {
    title: `${post.title} | Engineering Insights`,
    description: desc,
    openGraph: {
      title: `${post.title} | Botmartz`,
      description: desc,
      url: `https://www.botmartz.com/insights/${slug}`,
      type: "article",
    },
    alternates: {
      canonical: `https://www.botmartz.com/insights/${slug}`,
    },
  };
}

export default async function InsightsDetailPage({ params }: Props) {
  const { slug } = await params;
  if (!KEPT_SLUGS.has(slug)) {
    notFound();
  }
  let post: any = null;
  let postId: string = "";
  
  try {
    const querySnapshot = await adminDb.collection("blog-posts")
      .where("slug", "==", slug)
      .limit(1)
      .get();
      
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      post = doc.data();
      postId = doc.id;
    }
  } catch (e) {
    console.error("Error fetching blog post:", e);
  }
  
  if (!post) {
    if (STATIC_POSTS[slug]) {
      post = STATIC_POSTS[slug];
      postId = `static-${slug}`;
    } else {
      notFound();
    }
  }
  
  // Fetch related articles (only within kept engineering blogs)
  let related: any[] = [];
  try {
    const relatedSnapshot = await adminDb.collection("blog-posts")
      .where("status", "==", "published")
      .get();
      
    related = relatedSnapshot.docs
      .map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "",
          slug: data.slug || "",
          category: data.category || "AI Engineering",
          author: data.author || "Botmartz Team",
          readTime: data.readTime || 8
        };
      })
      .filter(p => KEPT_SLUGS.has(p.slug) && p.slug !== slug);
  } catch (err) {
    console.error("Error fetching related posts:", err);
  }

  if (related.length === 0) {
    related = Object.entries(STATIC_POSTS)
      .filter(([key]) => key !== slug)
      .map(([key, val]) => ({
        id: `static-${key}`,
        title: val.title,
        slug: key,
        category: val.category,
        author: val.author,
        readTime: val.readTime
      }));
  }

  const formatTimestamp = (ts: any) => {
    if (!ts) return null;
    if (typeof ts.toDate === 'function') {
      return new Date(ts.toDate()).toISOString();
    }
    return new Date(ts).toISOString();
  };

  const sanitizedPost = JSON.parse(JSON.stringify({
    id: postId,
    slug: slug,
    ...post,
    createdAt: formatTimestamp(post.createdAt || new Date()),
    updatedAt: formatTimestamp(post.updatedAt || new Date()),
  }));

  const sanitizedRelated = JSON.parse(JSON.stringify(related));
  
  return <InsightsDetailClient post={sanitizedPost} initialRelated={sanitizedRelated} />;
}
