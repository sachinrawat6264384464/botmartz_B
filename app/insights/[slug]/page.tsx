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
  "observability-for-llm-applications-metrics-that-matter"
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
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!KEPT_SLUGS.has(slug)) {
    return {
      title: "Insight Not Found | Botmartz",
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
    ...post,
    createdAt: formatTimestamp(post.createdAt || new Date()),
    updatedAt: formatTimestamp(post.updatedAt || new Date()),
  }));

  const sanitizedRelated = JSON.parse(JSON.stringify(related));
  
  return <InsightsDetailClient post={sanitizedPost} initialRelated={sanitizedRelated} />;
}
