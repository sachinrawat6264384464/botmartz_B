# How to Build Multi-Million Dollar AI Agents with Antigravity & MCP: From Consulting Reports to Production Software

*By Soham Sharma · Founder & Principal AI Architect, Botmartz AI Solutions*

---

## Executive summary

Consulting firms, industry analysts and regulators publish a steady stream of material describing where enterprises lose time and money: slow document review, manual reconciliation, compliance checks that depend on people reading long PDFs. Most of that material ends as a slide deck. A smaller number of teams turn the same problem statement into working software.

This article describes the process we use to go from a *documented, evidence-backed enterprise problem* to a *scoped, auditable agent pilot*. It combines three ingredients: an agent-first development environment (we use Google's Antigravity) to build and iterate quickly, the Model Context Protocol (MCP) to connect agents to tools and data in a standard way, and a deterministic workflow layer (LangGraph) to keep agent behavior bounded, resumable and reviewable.

A word on the title. "Multi-million dollar" describes the size of the *problem space* these systems address, not a guarantee of revenue or savings for any particular project. We make no claim of specific financial outcomes in this article, and nothing here should be read as one.

---

## 1. The three layers of a production agent stack

![Three-layer production agent stack: orchestration, MCP tool interface, guardrails](/images/insights/agent-stack-layers.svg)

| Layer | Purpose | Examples |
| :--- | :--- | :--- |
| **Orchestration and reasoning** | Decide what to do next, within explicit limits | LangGraph state graphs, bounded loops, checkpoints, human approval steps |
| **Tool and data interface** | Give the agent controlled access to systems | MCP servers for databases, code hosting, ticketing, messaging |
| **Guardrails and permissions** | Constrain what the agent can see and do | Schema validation, least-privilege credentials, approval gates, audit logging |

### The development environment: Antigravity

Antigravity is an agent-first development environment. In our workflow it is where agents help write, run and test code and scripts under human review, which speeds up the build-and-iterate loop. It is a tool for *building* the system. It is not the runtime your customers depend on, and a production deployment should not require an IDE to be present.

### The interface layer: Model Context Protocol

MCP is an open protocol, introduced by Anthropic in late 2024, for exposing tools, resources and prompts to AI applications in a uniform way. Messages use JSON-RPC 2.0, and servers communicate over standard input and output for local use or over HTTP-based transports for remote use. Instead of writing bespoke glue code for every pairing of model and system, you expose a capability once as an MCP server and any compatible client can discover and call it.

Two cautions are worth stating plainly:

- **MCP standardizes connection, not trust.** A tool connected to an agent can do whatever its credentials allow. Grant least privilege, separate read and write tools, and require approval for destructive actions.
- **Tool output is untrusted input.** Content returned from a tool, a web page or a document can contain instructions aimed at the model (prompt injection). Treat it as data, validate it, and never let it silently expand the agent's permissions.

---

## 2. Five steps from problem statement to pilot

### Step 1: Start from verified evidence, not a headline

Pick a problem backed by something you can cite and measure: an industry report with a methodology, a client's own process data, a regulator's published requirement. Then define it narrowly. "Reduce legal review costs" is a theme. "Check employer-submitted wage documents against the published prevailing-wage rules and flag mismatches for attorney review" is a pilot.

Write down, before building anything:

- who performs the task today and how long it takes (measured, not guessed),
- what a wrong answer costs,
- what the agent may do on its own versus what needs a human,
- how success will be measured and who will judge it.

If you cannot measure the baseline, you will not be able to demonstrate improvement later.

### Step 2: Ground the agent in a curated knowledge base

An agent should not answer from memory about rules that change. Build a retrieval layer over the authoritative sources: parse documents with layout awareness, keep tables intact, attach provenance (document, page, section) to every chunk, and retrieve with a hybrid lexical-plus-dense approach followed by reranking. Our companion article, [Why Vector Similarity Search Is Not Semantic Search](https://www.botmartz.com/insights/why-vector-similarity-is-not-semantic-search), explains why this matters.

Constrain the output with a schema so downstream code and reviewers receive structured, citable results rather than free prose:

```python
from typing import List, Literal
from datetime import datetime, timezone
from pydantic import BaseModel, Field

class SourceCitation(BaseModel):
    document_id: str
    section: str = Field(..., description="e.g. a statute or manual section identifier")
    page_number: int = Field(..., ge=1)
    quoted_text: str = Field(..., min_length=20)

class ReviewFinding(BaseModel):
    issue: str
    risk_level: Literal["LOW", "MEDIUM", "HIGH"]
    citations: List[SourceCitation] = Field(..., min_length=1)

class ReviewResult(BaseModel):
    findings: List[ReviewFinding]
    needs_human_review: bool
    produced_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
```

(This uses Pydantic v2 syntax.) Schema validation guarantees the *shape* of the output, so an answer with no citations is rejected. It does not guarantee the *truth* of the content, which is why evaluation and human review remain necessary.

### Step 3: Make the workflow explicit with a state graph

Open-ended "think and act" loops are hard to bound and hard to audit. A graph of named steps, with explicit transitions, a persistent checkpoint, and a pause for human approval, is easier to reason about. With LangGraph, a human review step can be modeled with `interrupt`, which pauses the run until a person responds, and a checkpointer persists state so the run can resume later, even in a different process:

```python
from typing import TypedDict, Optional
from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import MemorySaver   # use a Postgres checkpointer in production
from langgraph.types import interrupt, Command

class CaseState(TypedDict):
    document_hash: str
    result: Optional[dict]
    approved: Optional[bool]

def analyze(state: CaseState):
    # run retrieval + model call, validate against ReviewResult, return structured findings
    return {"result": {"findings": [], "needs_human_review": True}}

def human_review(state: CaseState):
    # Pauses here until a person responds via Command(resume=...)
    decision = interrupt({"findings": state["result"], "question": "Approve these findings?"})
    return {"approved": bool(decision.get("approved"))}

builder = StateGraph(CaseState)
builder.add_node("analyze", analyze)
builder.add_node("human_review", human_review)
builder.add_edge(START, "analyze")
builder.add_edge("analyze", "human_review")
builder.add_edge("human_review", END)
graph = builder.compile(checkpointer=MemorySaver())

config = {"configurable": {"thread_id": "case-001"}, "recursion_limit": 25}
graph.invoke({"document_hash": "abc123"}, config)             # runs until the interrupt
graph.invoke(Command(resume={"approved": True}), config)      # resumes after review
```

Two details matter for reliability. The `recursion_limit` bounds how many steps a run may take, which prevents runaway loops. And because a resumed run may re-execute work after the last checkpoint, any step with an external side effect must be idempotent. We cover this in depth in [Microservices vs. Modular Monoliths: Designing Scalable AI Agent Systems](https://www.botmartz.com/insights/microservices-vs-monolith-for-ai-systems-what-we-learned). (LangGraph's interfaces evolve; pin a version and consult its documentation.)

### Step 4: Connect tools through MCP with least privilege

Once the workflow is deterministic, expose the systems it needs through MCP servers: a database for case records and audit entries, a ticketing or messaging system for escalations, a document store for sources. For each tool:

- scope credentials to the minimum needed,
- separate read-only tools from write tools,
- log every call with its arguments and result,
- require approval before irreversible actions.

Note that an MCP server is an *interface* to a system, not the system itself. The database remains the database; MCP is how the agent reaches it.

### Step 5: Evaluate continuously before and after launch

Build a golden set of representative cases with reference outcomes, including the hard ones: ambiguous documents, conflicting sources, questions the corpus cannot answer. Measure retrieval quality and answer grounding (RAGAS provides faithfulness, answer relevancy, context precision and context recall; because these metrics use an LLM as judge, calibrate them against human review). Run the set on every change to prompts, models, chunking or retrieval settings, and block releases that regress.

Keep measuring after launch. Sample production traces, review disagreements between the agent and human reviewers, and add every discovered failure to the golden set.

---

## 3. Reference architecture: a document-compliance agent

To make this concrete, here is how the pieces fit together for a document-compliance workflow of the kind we build, such as checking submitted paperwork against published rules. This is a description of the design, not a results claim.

1. **Ingestion:** layout-aware parsing keeps tables and their headers together and attaches provenance to each chunk. Rule sources are versioned so a finding can be tied to the rule text in force at the time.
2. **Retrieval:** hybrid lexical and dense search, rank fusion and reranking return the passages most relevant to each check, with per-user access control applied inside the query.
3. **Analysis:** the model proposes findings in the structured schema above, each with citations to retrieved passages. Findings without valid citations are rejected.
4. **Escalation:** anything above a risk threshold, or with low-confidence retrieval, pauses at the human review step with the supporting passages highlighted.
5. **Audit:** every retrieval, model call, tool call and reviewer decision is written to an append-only log.

We deliberately do not attach accuracy or time-saved figures to this description. Those numbers only mean something when tied to a specific client dataset, baseline and evaluation method, and they will be published that way if and when we can share them.

---

## 4. Research foundations

The techniques above build on published work. If you are evaluating any vendor's claims, this is a useful reading list:

1. **RAGAS: Automated Evaluation of Retrieval Augmented Generation.** Es, James, Espinosa-Anke, Schockaert. EACL 2024 (System Demonstrations). Defines reference-free metrics such as faithfulness, answer relevancy and context precision.
2. **ColBERT: Efficient and Effective Passage Search via Contextualized Late Interaction over BERT.** Khattab and Zaharia. SIGIR 2020. A late-interaction retrieval approach between single-vector bi-encoders and full cross-encoders.
3. **Corrective Retrieval Augmented Generation (CRAG).** Yan, Gu, Zhu, Ling. 2024. Adds a retrieval evaluator that triggers corrective actions when retrieved context looks unreliable.
4. **Reciprocal Rank Fusion outperforms Condorcet and individual rank learning methods.** Cormack, Clarke, Büttcher. SIGIR 2009. The rank-fusion method widely used for hybrid search.
5. **Model Context Protocol specification.** Anthropic and the open-source community. Defines the tool, resource and prompt primitives and transports.
6. **LangGraph documentation.** LangChain. Covers checkpointers, persistence, interrupts and human-in-the-loop patterns.

---

## 5. Frequently asked questions

### What is the Model Context Protocol (MCP) and why use it in enterprise AI?
MCP is an open protocol that lets AI applications discover and call tools, read resources and use prompts through a standard interface. It reduces custom integration code. It does not remove the need for least-privilege credentials, approval gates for risky actions, or defenses against prompt injection from tool output.

### How do you stop an AI agent from looping forever?
Model the workflow as a graph with explicit steps, set a hard limit on the number of steps per run, bound retries, and route ambiguous or low-confidence cases to a human. In LangGraph, the recursion limit and checkpoint-based pauses provide these controls.

### How do you keep a human in the loop for high-risk actions?
Pause the workflow at a defined step, persist its state, present the evidence and proposed action to a reviewer, and resume only on explicit approval. LangGraph's `interrupt` and checkpointers are designed for this pattern.

### Does schema validation prevent hallucinations?
No. It guarantees that the output has the right structure, for example that citations are present. It does not verify that the content is correct. Pair it with grounded retrieval, citation checks, evaluation on a golden set and human review for high-stakes decisions.

### How long does it take to build an agent pilot?
It depends on scope, data access, integration complexity and review cycles. We scope pilots narrowly around one well-defined workflow with milestones and clear acceptance criteria, which is what makes a short timeline realistic. A broad "automate everything" scope does not fit in weeks.

---

## Conclusion

The distance between a consulting insight and a working agent is mostly disciplined engineering: a narrowly defined problem with a measured baseline, grounded retrieval, an explicit and resumable workflow, tools connected with least privilege, and continuous evaluation. New development tools and protocols make the building faster, but they do not replace those fundamentals.

**Have a documented problem you want to test?** [Talk to our engineering team](https://www.botmartz.com/contact) about scoping a pilot with a clear baseline, acceptance criteria and human-review design.
