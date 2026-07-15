# GitHub, Content & Outreach Engine

## GitHub Strategy

**Test for any repo:** "If a PyTorch maintainer, CTO, or engineering manager visits this GitHub for 30 seconds, what story do they see?" Target impression: *"This person/company builds production AI systems"* — not *"this person has learned a lot of technologies."*

### Structure
1. **Flagship / pinned (6 repos max)** — e.g. `enterprise-rag-starter`, `langgraph-agent-framework`, `vision-ai-virtual-tryon`, `fastapi-ai-template`, `google-adk-examples`, `botmartz-labs`
2. **Learning repos** (old tutorials, coursework, practice) — don't delete; unpin, and archive/privatize what no longer reflects current standards
3. **Client work** — private
4. **Open source** — genuinely reusable projects: `rag-evaluation`, `langgraph-patterns`, `fastapi-ai-template`, `agent-memory`, `document-parser`, `vision-utils`, `pytorch-vision-template`, `pdf-rag`

### Rules
- Keep public only if: demonstrates skills you want to be known for, is useful to other devs, is finished/maintained, and aligns with current direction.
- Archive/privatize if: one-off tutorial, unfinished experiment, duplicate, or creates confusion about focus.
- Don't create repos just to have more repos — a few well-documented projects beat many half-finished ones.
- Repo naming: descriptive and intentional (`enterprise-rag-starter`, `langgraph-enterprise-agents`) — never `test-project-final`, `temp`, `practice`.
- Profile README should state: what you build (Enterprise RAG / AI Agents / Computer Vision), the stack, currently-building list, and community involvement — not a badge collection.

### Personal vs. Org account
- **Personal GitHub** (`soham2710`) → contributions, talks, personal experiments
- **Botmartz GitHub Org** (build over time) → the company's engineering face: Enterprise RAG Starter, Agent Framework, FastAPI AI Template, PyTorch/Google ADK examples, architecture templates, MCP servers

**Target:** 12–15 flagship repos within a year, grouped: Enterprise RAG (3–4), AI Agents (3–4), Computer Vision (2–3), AI Engineering Templates (2–3), PyTorch Utilities (1–2). Every repo should tie back to the website, an article, and ideally a demo/case study.

**Monthly cadence:** release one meaningful repo/template per month.

## Social / Content Strategy

### The core problem identified
Website, LinkedIn, Instagram, Academy Instagram, and GitHub were each telling a different story (AI+Web+Cloud+SaaS+Security vs. generic "AI is the future" content vs. disconnected accounts). Fix: **one content engine** — every week, one engineering idea becomes: blog + LinkedIn post + Instagram carousel + short video + GitHub example (when relevant) + eventually newsletter/community talk.

### Content pillars (all platforms)
- **Pillar 1 (50%) — Enterprise RAG:** knowledge, retrieval, vector search, evaluation, architecture, production
- **Pillar 2 (30%) — AI Agents:** LangGraph, Google ADK, agent memory, planning, multi-agent, human-in-the-loop
- **Pillar 3 (20%) — AI Engineering:** PyTorch, FastAPI, TensorFlow, inference, MLOps, deployment, GPU

No AI news, no "top AI tools," no generic motivational AI content.

### Per-platform role
- **LinkedIn (company):** engineering page, not AI-news page. E.g. "Why 90% of enterprise RAG systems fail because of poor document chunking" instead of "AI is changing the world."
- **LinkedIn (personal/founder):** founder voice — architecture decisions, lessons, mistakes, open-source work, meetups, AI-engineering opinions. People buy founders.
- **Instagram (Botmartz):** visual-first — carousels ("5 mistakes in Enterprise RAG," "LangGraph vs Google ADK"), architecture diagrams, behind-the-scenes, meetups, demos — not quotes or AI news.
- **Instagram (Academy):** reposition from "AI training" to "AI Engineering Academy," aligned with company messaging.

### Editorial filter (apply to every public post)
Does this demonstrate engineering capability, teach something useful to AI engineers, or show evidence of something built/tested/measured? If no to all three, don't publish it.

## Outreach & Lead Generation

### Four compounding engines (not "marketing channels")
1. **Authority** — Engineering Insights, GitHub, AI Frontier, open source, talks, PyTorch community, YouTube
2. **Demand Generation** — LinkedIn, founder content, cold outreach, email, partnerships, networking, events
3. **Product/Proof** — Labs, RAG/Agent demos, case studies, architecture diagrams, GitHub
4. **Community** — Academy, AI Frontier, Discord, newsletter, meetups, reading club

### Outreach approach
- **Teach first, don't cold-sell.** Instead of "we build Enterprise RAG," lead with something like: "We recently published a guide comparing hybrid vs. dense retrieval for enterprise knowledge bases — thought it might be useful given your documentation challenges."
- **Flagship free offer:** "Enterprise AI Readiness Assessment" (60 min, free) delivering an AI opportunity map, RAG feasibility check, agent opportunities, and suggested architecture — propose paid engagement only if there's a fit.
- **Proof loop:** every client engagement → sanitized architecture diagram + technical blog + demo (if possible) + generic GitHub template + LinkedIn post + internal playbook.
- **Targeting:** build a list of ~100 companies (50–500 employees, knowledge/documentation-heavy, high support load) across SaaS, logistics, legal tech, manufacturing software, healthcare software, EdTech. Research each one — no mass identical outreach. Personally reach out to ~10 well-researched companies per week.
- **Partnerships:** earn them by contributing first (talks, articles, OSS, AI Frontier, inviting ecosystem members) rather than asking for them cold.

### Outreach flywheel
```
Engineering Insights → LinkedIn Posts → Newsletter → Founder Outreach
   → Discovery Calls → Projects → Case Studies → (loop back to Engineering Insights)
```

### 12-month execution priorities (if reduced to a short list)
1. Be known for exactly two services: Enterprise RAG and AI Agents.
2. Publish one strong engineering article per week (50+/year).
3. Release one meaningful open-source project/template per month.
4. Host one monthly technical meetup + one flagship AI Frontier event per year.
5. Personally reach out to ~10 carefully chosen companies per week with value-first, non-generic messages.
6. Turn every project into public proof (case studies, demos, write-ups, talks) while respecting client confidentiality.
