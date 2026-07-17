import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { adminDb } from '@/lib/firebase-admin';
import InsightsDetailClient from './InsightsDetailClient';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

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

When building complex AI platforms, one of the most critical decisions is choosing the right system architecture. Over the past two years, we deployed both monolithic and microservices-based AI systems. Here is a breakdown of what we learned.

## Performance and Resource Allocation

- **Monoliths** are excellent for quick startup, simple deployments, and low-latency internal communication.
- **Microservices** shine when different components have vastly different compute requirements (e.g., CPU-bound ingestion vs GPU-bound model inference).
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
    author: "Botmartz Engineering Team",
    createdAt: "2024-04-25T00:00:00.000Z",
    updatedAt: "2024-04-25T00:00:00.000Z",
    readTime: 10,
    content: `
# Advanced RAG Techniques: Hybrid Search, Reranking & Query Rewriting

Basic RAG systems often suffer from poor retrieval accuracy, fetching irrelevant context that leads to model hallucinations. To build high-quality production RAG, advanced retrieval techniques are necessary.

## The Advanced Retrieval Stack

1. **Query Rewriting**: Standardizing user queries before search to align with index terminology.
2. **Hybrid Retrieval**: Joining dense vector search and sparse keyword search (BM25).
3. **Reranking**: Sorting retrieved chunks using high-performance cross-encoders to bubble up the most relevant documents.
    `
  },
  "build-an-ai-chatbot-with-langgraph-and-openai-step-by-step": {
    title: "Build an AI Chatbot with LangGraph and OpenAI (Step-by-Step)",
    category: "TUTORIALS",
    excerpt: "A hands-on tutorial to build a production-ready agentic AI using LangGraph, FastAPI and OpenAI.",
    author: "Rohit K.",
    createdAt: "2024-04-15T00:00:00.000Z",
    updatedAt: "2024-04-15T00:00:00.000Z",
    readTime: 15,
    content: `
# Build an AI Chatbot with LangGraph and OpenAI (Step-by-Step)

In this hands-on tutorial, we go through the step-by-step process of building a stateful, multi-agent chatbot using LangGraph, FastAPI, and OpenAI.

## Why LangGraph?

Traditional DAG frameworks struggle with loops and recursive flows. LangGraph addresses this by introducing a graph-based state machine, enabling complex reasoning loops and agent collaboration.
    `
  },
  "open-source-projects-from-botmartz-labs-you-should-know": {
    title: "Open Source Projects from Botmartz Labs You Should Know",
    category: "OPEN SOURCE",
    excerpt: "Explore our open-source projects that power real-world AI systems and developer productivity.",
    author: "Botmartz Labs",
    createdAt: "2024-04-10T00:00:00.000Z",
    updatedAt: "2024-04-10T00:00:00.000Z",
    readTime: 6,
    content: `
# Open Source Projects from Botmartz Labs You Should Know

At Botmartz, we believe in giving back to the developer community. Our Labs division regularly open-sources core packages, datasets, and boilerplate templates.

## Featured Repositories

1. **RAG-Evaluation-Toolkit**: Tools to automate groundedness and relevance testing.
2. **Agent-Orchestration-Boilerplate**: A fast, production-ready starting point for LangGraph agents.
3. **Vector-Benchmarking-Suite**: Evaluate vector database performance across diverse datasets.
    `
  },
  "prompt-engineering-patterns-that-actually-work-in-production": {
    title: "Prompt Engineering Patterns That Actually Work in Production",
    category: "AI ENGINEERING",
    excerpt: "Reusable prompt patterns to write for improved reliability, consistency and performance.",
    author: "Ritesh K.",
    createdAt: "2024-04-02T00:00:00.000Z",
    updatedAt: "2024-04-02T00:00:00.000Z",
    readTime: 7,
    content: `
# Prompt Engineering Patterns That Actually Work in Production

Prompt engineering is more than just writing instructions. To achieve consistent, structured output from LLMs in enterprise systems, we rely on established prompt design patterns.

## Reusable Production Patterns

- **Structured Output Constraints**: Enforcing JSON schemas directly in prompts.
- **Few-Shot Delimiters**: Using specific tags to separate examples from inputs.
- **Role-Based Framing**: Setting context parameters to limit response scope.
    `
  },
  "how-we-built-a-legal-document-intelligence-system-for-100k-docs": {
    title: "How We Built a Legal Document Intelligence System for 100K+ Docs",
    category: "CASE STUDIES",
    excerpt: "Architecture, challenges, and lessons learned from building an end-to-end legal AI solution.",
    author: "Team Botmartz",
    createdAt: "2024-03-28T00:00:00.000Z",
    updatedAt: "2024-03-28T00:00:00.000Z",
    readTime: 8,
    content: `
# How We Built a Legal Document Intelligence System for 100K+ Docs

Processing large volumes of legal documents requires absolute precision. In this case study, we walk through the design of our Document Intelligence system, built to analyze over 100,000 corporate agreements.

## High-Precision OCR & Processing

We combined hybrid OCR strategies with structured extraction models to parse scans and contract clauses. Security and compliance were handled by isolating LLM contexts within dedicated enterprise tenants.
    `
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
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
      title: "Insight | Botmartz",
      description: "Explore engineering insights and AI research from Botmartz.",
    };
  }
  
  return {
    title: `${post.title} | Botmartz AI Insights`,
    description: post.excerpt || `Read our latest insight article about ${post.title}.`,
    openGraph: {
      title: `${post.title} | Botmartz AI Insights`,
      description: post.excerpt || `Read our latest insight article about ${post.title}.`,
      url: `https://botmartz.com/insights/${slug}`,
      type: "article",
    }
  };
}

export default async function InsightsDetailPage({ params }: Props) {
  const { slug } = await params;
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
  
  // Fetch related articles (limit 3, other published blog posts in same category or general)
  let related: any[] = [];
  try {
    const relatedSnapshot = await adminDb.collection("blog-posts")
      .where("status", "==", "published")
      .limit(4)
      .get();
      
    related = relatedSnapshot.docs
      .map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "",
          slug: data.slug || "",
          category: data.category || "Technology",
          author: data.author || "AI Team",
          readTime: data.readTime || 5
        };
      })
      .filter(p => p.slug !== slug)
      .slice(0, 3);
  } catch (err) {
    console.error("Error fetching related posts:", err);
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
    ...post,
    createdAt: formatTimestamp(post.createdAt || new Date()),
    updatedAt: formatTimestamp(post.updatedAt || new Date()),
  }));

  const sanitizedRelated = JSON.parse(JSON.stringify(related));
  
  return <InsightsDetailClient post={sanitizedPost} initialRelated={sanitizedRelated} />;
}
