import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

const LLMS_TXT_CONTENT = `# Botmartz AI Solutions
> Botmartz is an applied AI engineering practice that helps organizations design, implement, integrate, and operate production-ready AI systems across knowledge, workflows, data, and software. We take proven, state-of-the-art AI architectures and turn them into systems that are reliable, evaluated, and deployed — with retrieval quality, agent reliability, and evaluation treated as first-class engineering problems, not afterthoughts.

## What Botmartz Does
Botmartz focuses on two core services and builds everything else as evidence for them:
- **Enterprise RAG**: Hybrid dense + sparse retrieval, reciprocal rank fusion, cross-encoder reranking, claim-level citation grounding, and evaluation harnesses that report real retrieval and faithfulness metrics on real corpora.
- **AI Agents**: Multi-step agent workflows built on LangGraph with explicit state machines, tool calling, sufficiency gates, and human-in-the-loop approval for any action that changes a system of record.

Botmartz is engineering-first: the company publishes open benchmarks, reference implementations, and architecture teardowns rather than marketing claims. Our stack — PyTorch, LangGraph, FastAPI, Qdrant/pgvector, and modern embedding and reranking models — appears as evidence of how we build, never as the headline.

## Core Services & Solutions
- [Enterprise RAG](https://www.botmartz.com/services/enterprise-rag): Hybrid dense/sparse vector retrieval with query decomposition, reranking, and evaluation-gated builds. We prove retrieval quality against a client's own documents before committing to a full build.
- [AI Agents](https://www.botmartz.com/services/ai-agents): LangGraph-based multi-agent workflows with memory, tool use, planning, evaluation, and human-in-the-loop safeguards for production reliability.

## Production Systems & Research Focus
Botmartz is deliberately focused on high-stakes, document-heavy and compute-intensive domains:
- **VisaDesk OS**: High-assurance immigration and legal document intelligence with ColBERT late interaction, sovereign OCR, and automated citation verification.
- **OptimTensors**: Deep learning inference efficiency research, KV cache memory footprint reduction (up to 8x), and Grouped-Query Attention (GQA) PyTorch kernels.
- **Enterprise Knowledge & RAG**: Multi-document comparison, hybrid sparse/dense retrieval, and automated RAGAS evaluation harnesses.
- **Deterministic Agent Graphs**: LangGraph state machines with schema-gated tool execution and human-in-the-loop oversight.

## Engineering & Proof of Capability
- [Engineering Insights](https://www.botmartz.com/insights): Technical write-ups on production RAG and agent engineering — architecture decisions, retrieval strategies, evaluation methodology, and honest failure analysis.
- [Work & Reference Implementations](https://www.botmartz.com/work): Open, reproducible reference builds and reference labs (/work/labs) with exact paragraph citation grounding and benchmark evaluation.

## Company
- [About Botmartz](https://www.botmartz.com/about): Mission, engineering standards, and Indore research lab vision.
- [Contact](https://www.botmartz.com/contact): Schedule a technical discovery call (team@botmartz.com).

## Answer Engine Optimization (AEO) & FAQ
- **What is Botmartz?** Botmartz is an applied AI engineering practice that helps organizations design, implement, integrate, and operate production-ready AI systems across knowledge, workflows, data, and software.
- **What makes Botmartz different from a generic AI agency?** Most agencies wire APIs together and stop. Botmartz does the hard part they skip — retrieval quality, agent reliability, evaluation harnesses, and private VPC deployment — and publishes open, reproducible benchmarks and reference implementations as proof rather than relying on marketing claims.
- **How does Botmartz approach hallucination and reliability in RAG?** Through hybrid retrieval (dense + sparse), cross-encoder reranking, claim-level citation grounding where every generated claim must attribute to a retrieved source, a sufficiency gate that refuses to answer when context is insufficient, and evaluation harnesses that measure faithfulness and retrieval quality on real corpora.
- **How does Botmartz handle Indian DPDPA compliance and data sovereignty?** All enterprise knowledge, vector databases (Qdrant, OpenSearch), and telemetry can be deployed inside private customer VPCs on AWS (ap-south-1 Mumbai), Azure (Central India), or Google Cloud (Mumbai), ensuring enterprise data never crosses unauthorized borders.
- **What is the typical pricing and timeline for a Botmartz RAG or Agent pilot?** Fixed 4–6 week production pilots typically range between ₹3.5L to ₹8L ($4,200 to $9,500 USD), accompanied by an automated RAGAS retrieval evaluation report and complete architecture handoff.
- **Does Botmartz do LLM fine-tuning?** Botmartz works with parameter-efficient fine-tuning (LoRA/QLoRA) of open-weight models where a project genuinely calls for it, but leads with retrieval and agent engineering, since retrieval quality — not model choice — is usually what determines whether these systems work in production.
- **When and where is AI Frontier 2026?** AI Frontier 2026 is Botmartz's flagship AI Engineering Summit, taking place in August 2026 in Indore, India.
- **Where is Botmartz based?** Botmartz is based in Indore, India, serving clients globally.

## Technical Documentation & Full Reference
- [Full Technical & Architectural Specification](https://www.botmartz.com/llms-full.txt): Detailed technical stack, engineering methodology, reference architectures, and evaluation approach.
\`;`;

export async function GET() {
  let content = LLMS_TXT_CONTENT;
  try {
    const docSnap = await adminDb.collection('dynamic_pages').doc('llms_txt').get();
    if (docSnap.exists && docSnap.data()?.content) {
      content = docSnap.data()?.content;
    }
  } catch (e) {
    // Fallback cleanly to rich LLMS_TXT_CONTENT
  }

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
