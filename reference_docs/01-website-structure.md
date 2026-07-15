# Botmartz — Website Structure & Content Architecture

## Navigation (6-month version)

```
Home
Services
  ├── Enterprise RAG
  └── AI Agents
Industries
  ├── Education
  ├── Logistics
  └── Legal
Work
  ├── Case Studies
  └── Labs
Engineering Insights
Community
  ├── Events
  │   └── ai-frontier-2026
Academy (footer-level for first 6 months, elevate later)
About
Contact
```

No "Technologies" page in main nav — the stack (PyTorch, LangGraph, LangChain, FastAPI, Google ADK, TensorFlow) appears *inside* Services, Labs, Insights, and Case Studies as evidence, not as its own destination.

## Homepage Sections

1. **Hero** — "Production AI Engineering. Enterprise RAG & AI Agents." + CTA: Book Discovery Call
2. **What We Build** — Enterprise RAG, AI Agents, AI Integrations (supporting capability)
3. **Why Botmartz** — modern AI stack, engineering-first, research-driven, community-focused
4. **Featured Projects** — Virtual Try-On, internal AI agent, Enterprise RAG demo
5. **Engineering Stack** — PyTorch, LangGraph, LangChain, FastAPI, Google ADK, TensorFlow (kept secondary, not the main focus)
6. **Insights** — latest engineering articles
7. **Community** — events hub, meetups, AI Frontier, talks
8. **CTA** — "Let's Build AI Together"

## Page-by-page purpose (each answers one buyer question)

| Page | Buyer question it answers |
|---|---|
| Services | Can you solve my problem? |
| Industries | Have you worked in my domain? |
| Engineering Stack (inline, not standalone) | Can your team work with our stack? |
| Work | Can you prove you've done it? |
| Insights | Do your engineers actually know what they're talking about? |
| Community | Are you active in the AI ecosystem? (Introduces community, links to events list) |
| Academy | Do you invest in talent/expertise? |

## Services Pages (only two)

**Enterprise RAG** — Document AI, Knowledge Search, Internal Knowledge, Enterprise Search, PDF AI, Support AI. LangGraph/FastAPI/Google ADK appear here as implementation detail, not as separate service pages.

**AI Agents** — Customer Support, Research Agents, Sales Agents, Marketing Agents, Workflow Automation, Internal Agents.

## Industries (only 3 to start)

Education, Logistics, Legal — chosen because all three map cleanly onto RAG + Agents. Expand only after traction.

## Work

- **Case Studies** — initially: Virtual Try-On, internal projects, open-source projects; add real client work as it accumulates.
- **Labs** — public builds: AI SDR, AI Recruiter, AI Course Assistant, Research Agent, Meeting Agent, Legal Assistant, Logistics Planner. Every lab = demo + architecture write-up + blog + GitHub repo.

## Content Pages: Three Distinct Types (don't blend them)

1. **Technology / Capability pages** (sales pages, not tutorials) — e.g. `/technologies/pytorch` or under "Engineering Stack." Answers: *can Botmartz build production systems with this?* Structure: hero → why enterprises use it → our expertise → solutions we build → related case studies/blogs → CTA.
2. **Engineering Guides (blogs)** — `/blog/langgraph-vs-adk`, `/blog/how-we-built-rag` — educational, ranks for informational search intent.
3. **Documentation / Research (whitepapers)** — `/research/benchmarking-rag-frameworks` — deep technical reports.

Rebrand the blog as **"Engineering Insights"**, not "Blog."

## blog.botmartz.com decision

Move blog content into `botmartz.com/insights` (or `/blog`) rather than keeping it on a separate subdomain — keeps SEO authority and traffic on the main domain and reinforces one coherent site rather than fragmenting into a disconnected property.

## Content Clusters (Engineering Insights)

- **Cluster 1 — Enterprise RAG (primary, ~50%):** architecture, chunking, hybrid search, vector DBs, evaluation, RAG benchmarks
- **Cluster 2 — AI Agents (~30%):** LangGraph, Google ADK, agent memory, multi-agent, evaluation, human-in-the-loop, orchestration
- **Cluster 3 — PyTorch (part of ~20% "AI Engineering"):** computer vision, fine-tuning, TorchServe, distributed training, inference
- **Cluster 4 — AI Engineering infra:** FastAPI, Docker, vLLM, MLflow, observability, GPU optimization, deployment

**Never publish:** "Top 10 AI Tools," "Best AI Websites," "ChatGPT Tricks," "Future of AI," generic AI news — commodity content that doesn't demonstrate engineering capability.

**Every article should chain toward a service:** topic → sub-topic → architecture → case study → "Hire Botmartz," with internal links to Services, Labs, Case Studies, and GitHub.
