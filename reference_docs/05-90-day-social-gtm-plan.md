# Botmartz — 90-Day Social Media & Go-To-Market Plan
### Focus: LinkedIn + Instagram only (Twitter/Reddit later) · 1–2 blog posts/month repurposed everywhere

---

## 0. The One Thing This Plan Must Do

Every post, for the next 90 days, exists to make one sentence true in people's heads:

> **"Botmartz builds production Enterprise RAG systems and AI Agents."**

Not "Botmartz does AI stuff." Not "Botmartz teaches AI." That sentence, repeated in different forms, is the entire content strategy.

**Filter before publishing anything:** Does this post make someone more likely to believe Botmartz can build Enterprise RAG or AI Agents — or does it make someone want to work with/for Botmartz? If neither, don't post it.

---

## 1. Platform Roles (don't blur these)

| Channel | Role | Voice |
|---|---|---|
| **LinkedIn — Botmartz Company Page** | Technical authority. Proof Botmartz is an engineering company. | Precise, architecture-first, no hype |
| **LinkedIn — Soham (personal)** | Founder narrative. Why buyers/engineers trust *you*. | First-person, honest, "building in public" |
| **Instagram — @botmartzai_solutions** | Visual proof + behind-the-scenes. Makes engineering feel tangible. | Visual, punchy, carousel-led |
| **Instagram — @botmartz_academy** | Talent/education proof. Supports Academy without competing with company page. | Educational, encouraging, still "AI Engineering" not "AI courses" |

**Posting cadence (sustainable for a solo founder):**
- LinkedIn Company: **2×/week**
- LinkedIn Personal (Soham): **2–3×/week**
- Instagram Botmartz: **2×/week** (1 carousel + 1 reel/behind-the-scenes)
- Instagram Academy: **1×/week**
- Blog: **2×/month** — each one becomes the source material for that week's LinkedIn + Instagram content (see Section 2)

---

## 2. The Content Engine (1 blog → 6+ assets)

Every blog post is written first, then broken down:

```
1 Blog Post (Engineering Insights)
   ├── 1 LinkedIn Company post (the argument, condensed)
   ├── 1 LinkedIn Founder post (why you wrote it / what you learned building it)
   ├── 1 Instagram carousel (5–8 slides, visual breakdown of the same idea)
   ├── 1 Instagram reel/behind-the-scenes (you explaining it in 30–60 sec, or screen-recording the architecture)
   └── 1 GitHub repo/snippet (if the post has a technical artifact — template, notebook, diagram)
```

Two blogs a month = roughly 8–10 pieces of derivative content a month, which comfortably fills the cadence above without needing separate ideation every day.

### Content Pillar Ratio (applies to all platforms)
- **50% Enterprise RAG** — chunking, retrieval, vector DBs, evaluation, architecture, production issues
- **30% AI Agents** — LangGraph, Google ADK, memory, planning, multi-agent, human-in-the-loop
- **20% AI Engineering / Founder / Company** — PyTorch, FastAPI, AI-assisted development, Labs demos, GitHub releases, community/event build-up

**Never post:** "Top AI tools," AI news reactions, generic "AI is the future" content, motivational quotes, unrelated services (web/app/SEO).

---

## 3. Post Format Templates (reusable structures)

Use these as skeletons — fill in the specific technical detail each week.

**LinkedIn Company — "We built X" post:**
```
[Blunt technical claim or surprising stat]

[2–3 lines: the problem in plain terms]

Here's what we did / found:
→ [point 1]
→ [point 2]
→ [point 3]

[1 line: the takeaway or what this means for teams building similar systems]

Full breakdown: [link to blog] (or "Full write-up in comments" to protect reach)
```

**LinkedIn Founder — "Building in public" post:**
```
[Personal, specific moment — a decision, a mistake, a surprise]

[What you thought going in]

[What actually happened / what you learned]

[Why it matters for anyone building production AI systems]

[Optional: soft CTA — "Curious how others are solving this" / "DM if you're dealing with the same thing"]
```

**Instagram Carousel — "Concept breakdown":**
```
Slide 1: Bold hook / question (e.g., "Why your RAG system gives wrong answers")
Slide 2–6: One idea per slide, short text + simple diagram
Slide 7: Summary / key takeaway
Slide 8: CTA — "Follow for more AI engineering breakdowns" / link in bio
```

---

## PART A — DAYS 1–30: FOUNDATION PHASE

**Goal:** Reposition publicly. Stop the "we do everything" perception. Establish "Enterprise RAG + AI Agents" as the only story people hear from Botmartz for the next month. Publish Blog #1. Clean up GitHub. Launch founder voice on LinkedIn.

**Before Week 1 (prep, not posts):**
- Update LinkedIn company page tagline/about to: *"AI Engineering Company. We design, build, and deploy Enterprise RAG systems and AI Agents."*
- Update your personal LinkedIn headline to: *"Founder, Botmartz — AI Engineering (Enterprise RAG & AI Agents)"*
- Pin 6 flagship repos on GitHub per the GitHub strategy doc; unpin/archive the rest
- Update Instagram bios (Botmartz + Academy) to match the same one-sentence positioning

### Week 1 — "This is what Botmartz actually does"

**LinkedIn Company (Post 1 — repositioning announcement):**
> We've spent the last two years saying yes to everything — AI, web, mobile, SEO, cloud, cybersecurity.
>
> Starting now, Botmartz does two things: **Enterprise RAG** and **AI Agents**. That's it.
>
> Not because we can't do other things. Because the AI systems worth building right now are the ones that get information out of messy enterprise documents (RAG) and the ones that take multi-step action on someone's behalf (Agents). Everything else — FastAPI, deployment, evaluation — is how we build those two things, not a separate service.
>
> If you're trying to figure out whether your team needs a RAG system or an agent (or both), that's exactly the conversation we want to have.

**LinkedIn Founder (Post 2):**
> I built Botmartz's website navigation four different ways this month before I admitted the real problem: the company wasn't unclear, the *positioning* was.
>
> When you list 8 services, nobody remembers you for any of them. When you pick 2, people start sending you the right problems.
>
> So: Enterprise RAG and AI Agents. If that's not what you need, I'll probably tell you who to call instead. If it is — let's talk.

**Instagram Carousel (Botmartz) — "What Botmartz builds (and what we stopped doing)":**
- Slide 1: "We used to say yes to everything. Here's what changed."
- Slide 2: Old list (AI, Web, Mobile, SEO, Cloud, Security) crossed out
- Slide 3: "Now: Enterprise RAG"
- Slide 4: "+ AI Agents"
- Slide 5: Simple diagram — documents → RAG → answers; task → agent → action
- Slide 6: "Everything else (PyTorch, LangGraph, FastAPI) is how we build these — not separate services"
- Slide 7: "Follow along as we build in public"

**Instagram Academy — Post 1:**
> Simple graphic: "Botmartz Academy — training AI Engineers, not just AI users." Short caption on the gap between "using ChatGPT" and "engineering production AI systems."

---

### Week 2 — Enterprise RAG, technical depth begins

**LinkedIn Company (Post 1 — technical):**
> Most "RAG isn't working" complaints are actually chunking problems, not model problems.
>
> Three chunking mistakes we see constantly in enterprise document sets:
> → Fixed-size chunking that splits a table or a clause mid-sentence
> → No overlap between chunks, so context at the boundary gets lost
> → Treating a 40-page PDF and a 2-page FAQ with the same chunking strategy
>
> Chunking strategy should match document structure, not be a global setting. This is usually the first thing we fix before touching the retrieval or the model.

**LinkedIn Founder (Post 2 — build in public):**
> Spent this week rebuilding our internal RAG evaluation pipeline because our "it works in the demo" system was quietly failing on real enterprise PDFs — scanned pages, inconsistent headers, tables that don't parse cleanly.
>
> The unglamorous truth about Enterprise RAG: 70% of the engineering effort is document parsing and chunking. The retrieval and generation part is almost the easy part.

**Instagram Carousel — "Why your RAG system gives wrong answers":**
- Slide 1: Hook question
- Slide 2: "It's rarely the LLM's fault"
- Slide 3: Chunking mistake #1 (with simple before/after diagram)
- Slide 4: Chunking mistake #2
- Slide 5: Chunking mistake #3
- Slide 6: "What good chunking looks like" (diagram)
- Slide 7: CTA — "We write about this every week — follow @botmartzai_solutions"

**Instagram Academy:**
> Short carousel or single post: "What you actually learn building Enterprise RAG in the Academy" — 3 bullet outcomes tied to the curriculum module.

---

### Week 3 — AI Agents, technical depth begins

**LinkedIn Company (Post 1 — technical):**
> "AI Agent" has become a marketing word. Here's what actually separates an agent from a chatbot with extra steps:
>
> → **Memory** across a task, not just a conversation
> → **Tool use** — the ability to call APIs, query databases, take real actions
> → **Planning** — breaking a goal into steps, and adjusting when a step fails
> → **Evaluation** — knowing whether the agent actually completed the task correctly
>
> Most "agent" demos have none of the last one. That's the part that decides whether it survives contact with production.

**LinkedIn Founder (Post 2):**
> We run several internal AI agents at Botmartz right now — one drafts first-pass outreach research, one helps triage inbound messages. Neither replaced a person. Both save 3–4 hours a week each.
>
> That's the honest version of "AI agents in production" — not autonomous companies running themselves, just fewer hours on repetitive research and drafting.

**Instagram Carousel — "Chatbot vs. AI Agent — what's actually different":**
- Slide 1: Hook — "Is it really an agent, or just a chatbot with extra steps?"
- Slides 2–5: Memory / Tool use / Planning / Evaluation, one per slide with a simple icon+diagram
- Slide 6: Summary comparison table
- Slide 7: CTA

**Instagram Academy:**
> Behind-the-scenes clip: a snippet of a LangGraph session/whiteboard from a cohort, captioned around "this is what we actually build in the Agents module."

---

### Week 4 — Blog #1 launch + Engineering Stack + GitHub reveal

**Blog post #1 (pick one, matches Week 2 or 3 content, expanded):** *"How We Approach Chunking for Enterprise RAG (and Why Most Teams Get It Wrong)"* — publish on `botmartz.com/insights`.

**LinkedIn Company (Post 1 — blog launch):**
> Published our first engineering write-up: how we actually approach chunking for enterprise RAG systems — the strategies we use for tables, scanned PDFs, and inconsistent document structures, and how we evaluate whether a chunking strategy is working before we ever touch the retrieval layer.
>
> Link in comments (or first comment) → [blog link]

**LinkedIn Founder (Post 2 — GitHub reveal):**
> Spent the weekend cleaning up our GitHub instead of adding new repos. Pinned the 6 things that actually represent what we build — Enterprise RAG starter, an agent framework, a FastAPI AI template, vision AI work — and archived a decade of old practice repos.
>
> If you're a solo founder or small team: your GitHub is a 30-second pitch. Make sure it says what you actually do now, not everything you've ever learned.
>
> [link to GitHub]

**Instagram Carousel — "Inside our Enterprise RAG chunking strategy" (visual version of the blog):**
- Slides mirror the blog's key points with diagrams

**Instagram Academy:**
> Repurpose blog concept into a simplified "explain like I'm new to AI" carousel — ties Academy content to the same pillar without duplicating the company page verbatim.

**End of Month 1 checkpoint — what should be true:**
- LinkedIn company + personal both clearly say "Enterprise RAG + AI Agents"
- 8 LinkedIn posts published (4 company, 4 founder minimum)
- 8 Instagram posts published (Botmartz) + 4 (Academy)
- 1 blog post live
- GitHub cleaned up and pinned
- Baseline metrics captured (see Section 5)

---

## PART B — DAYS 31–60: MOMENTUM PHASE

**Goal:** Move from "explaining concepts" to "showing proof." Start surfacing Botmartz Labs projects, begin community building (announce first meetup), reposition the Academy publicly, publish Blog #2.

### Week 5 — Labs project reveal

**LinkedIn Company:**
> Post introducing a Labs project (e.g., an internal AI research agent or the Virtual Try-On project) — framed as "here's something we built to test our own thinking," with a short architecture summary (models/frameworks used, what problem it solves) and a demo link/video if available.

**LinkedIn Founder:**
> Personal account of *why* you built it, what surprised you, and one thing that didn't work initially.

**Instagram:**
> Carousel or reel demoing the Labs project visually — screen recording > static image here if possible.

**Instagram Academy:**
> Tie-in: "This is the kind of project our Academy cohort builds toward" (if applicable to curriculum).

### Week 6 — Enterprise RAG deep dive #2 (architecture-level)

**LinkedIn Company:** Technical post on retrieval strategy — hybrid search (keyword + vector), why pure vector similarity often isn't enough for enterprise search.

**LinkedIn Founder:** Build-in-public post on a real retrieval problem you hit and fixed.

**Instagram:** Carousel — "Vector search alone isn't enough — here's why."

### Week 7 — AI Agents deep dive #2 + Community announcement

**LinkedIn Company:** Technical post on agent memory/state management (LangGraph state, short-term vs. long-term memory).

**LinkedIn Founder — Community launch post:**
> Announce first monthly Botmartz AI Engineering meetup — informal, technical, Indore-based (or virtual) — invite engineers, founders, students to join. Frame it as the start of a recurring thing, not a one-off.

**Instagram:** Event/meetup announcement graphic + carousel recap of what the meetup will cover.

### Week 8 — Blog #2 + Academy repositioning reveal

**Blog post #2:** e.g., *"Chatbot vs. Agent: What Actually Changes When You Add Planning and Memory"* (expands Week 3 content).

**LinkedIn Company:** Blog #2 announcement post (same format as Week 4).

**LinkedIn Founder:** Academy repositioning reveal —
> "Repositioned Botmartz Academy this month — same curriculum depth, clearer promise: we're not teaching 'AI,' we're training AI engineers who can ship Enterprise RAG and Agent systems. New landing page, new curriculum structure, live now."

**Instagram Academy:** New hero graphic/carousel reflecting the repositioning ("Become an AI Engineer" messaging, outcomes-based, no salary-bump stat).

**End of Month 2 checkpoint — what should be true:**
- At least 1 Labs project publicly showcased
- First community meetup announced (and ideally held)
- Academy publicly repositioned
- 2 blog posts live total
- Engagement trend reviewed (see Section 5) — double down on whichever format (carousel vs. text post vs. reel) is performing

---

## PART C — DAYS 61–90: AUTHORITY + OUTREACH INTEGRATION PHASE

**Goal:** Start converting attention into pipeline. Launch the free "Enterprise AI Readiness Assessment" offer, begin structured outreach (10 companies/week), tease and then announce AI Frontier, publish first case study or proof piece.

### Week 9 — AI Frontier teaser

**LinkedIn Company:** Announce that Botmartz is organizing an AI Engineering event (don't reveal full agenda yet) — "Something we've been planning for a while: an AI Engineering Summit bringing together people building production AI systems, not another AI hype event."

**LinkedIn Founder:** Personal post on *why* you're organizing it — the gap you see in most AI events (too hype-y, not engineering-focused).

**Instagram:** Teaser graphic — date/city TBA, "AI Frontier — coming soon."

### Week 10 — Free offer launch + outreach ramp begins

**LinkedIn Company:**
> Launch the **Enterprise AI Readiness Assessment** — free 60-minute session, deliverable includes an AI opportunity map + RAG feasibility + suggested architecture. Clear CTA to book.

**LinkedIn Founder:** Post framing why you're offering this for free — "value-first" narrative, ties back to the outreach engine strategy.

**Operational (not a post):** Begin outreach — 10 researched companies/week, personalized, referencing specific published content where relevant.

**Instagram:** Carousel — "What's included in a free AI Readiness Assessment" (builds trust/proof of what the call actually delivers).

### Week 11 — Case study / proof piece

**LinkedIn Company:** First case study or (if no client work is public yet) a detailed internal project write-up presented in case-study format: problem → architecture → outcome → lessons.

**LinkedIn Founder:** Behind-the-scenes on what building that project taught you about production AI.

**Instagram:** Carousel version of the case study, visual architecture diagram front and center.

### Week 12 — AI Frontier full announcement

**LinkedIn Company:** Full reveal — theme, date, venue, speakers (Promit, Karan, you), agenda structure, ticketing link.

**LinkedIn Founder:** Personal invite post — why you picked Promit and Karan, what attendees will walk away with (state of AI engineering + hands-on architecture + career roadmap panel).

**Instagram:** Speaker highlight carousel (one slide per speaker + their session focus) + countdown content begins.

### Week 13 — Month 3 recap + forward roadmap

**LinkedIn Company:** "90 days of repositioning Botmartz" recap — what changed (2 services, cleaned GitHub, 2 blog posts, Labs project shipped, first meetup held, AI Frontier announced) — signals momentum to prospects and partners.

**LinkedIn Founder:** Personal reflection post — lessons from repositioning, invite people to follow the next phase (community launch, more Labs projects, second cohort).

**Instagram:** Recap carousel — visual timeline of the 90 days.

**End of Month 3 checkpoint — what should be true:**
- Free Assessment offer live and at least a few calls booked
- Outreach cadence running (10/week) with a simple tracker (company, contact, date reached out, response, notes)
- AI Frontier fully announced with ticketing open
- At least 1 case study / proof piece live
- Clear qualitative sense of which content formats are working, to double down on in Month 4+

---

## 4. Weekly Rhythm Summary (repeatable after Day 90)

| Day | LinkedIn Company | LinkedIn Founder | Instagram Botmartz | Instagram Academy |
|---|---|---|---|---|
| Mon | Technical post (RAG or Agents) | — | — | — |
| Tue | — | Build-in-public post | Carousel (visual version of Monday's post) | — |
| Wed | — | — | — | Academy post |
| Thu | Technical post / proof piece | — | — | — |
| Fri | — | Reflection / opinion post | Reel or behind-the-scenes | — |

Adjust exact days to your own schedule — the point is: 2 company + 2–3 founder + 2 Botmartz IG + 1 Academy IG per week, every week, without gaps.

---

## 5. Metrics to Track (simple, don't over-engineer this early)

Track monthly, not daily:

| Metric | Why it matters |
|---|---|
| LinkedIn company followers + post impressions | Reach growth of the "Enterprise RAG + AI Agents" message |
| LinkedIn founder profile views + connection requests from relevant roles (CTO, founder, eng manager) | Signal that the right people are noticing |
| Instagram followers + saves/shares on carousels (saves > likes as a quality signal) | Content resonance |
| Blog page views + time on page | Whether Engineering Insights content is actually being read |
| GitHub stars/traffic on pinned repos | Technical credibility signal |
| Discovery calls booked (via Readiness Assessment) | Direct pipeline signal — this is the number that matters most from Month 3 onward |
| Outreach response rate (Month 3+) | Whether the value-first messaging is landing |

Do **not** optimize for vanity likes — optimize for saves, shares, relevant profile visits, and (from Month 3) booked calls.

---

## 6. What NOT to Do in These 90 Days

- Don't post about web dev, mobile, SEO, blockchain, or generic "digital transformation" — even old habits from previous positioning
- Don't chase AI news/trend commentary — it doesn't build the "Enterprise RAG + AI Agents" association
- Don't launch Twitter/Reddit yet — spreading thin now weakens LinkedIn/Instagram consistency, which is the actual priority
- Don't skip weeks — consistency for 90 days matters more than any single viral post
- Don't turn every post into a sales pitch — teach first; the Readiness Assessment offer (Month 3) is the only explicit sales CTA in this plan
