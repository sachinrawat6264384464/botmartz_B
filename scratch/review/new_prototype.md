# When a Client Tells You: "We Can Build This Ourselves With Claude in Two Weeks"

*By Botmartz Engineering · The gap between a convincing prototype and a system an enterprise can depend on*

---

Every team that builds AI for enterprises hears some version of this sentence. The following is a composite of conversations rather than a quote from one client:

> *"Our intern built a prototype with Claude and a vector database last Friday. It answers questions from our product manuals really well. Why would we sign an enterprise contract when we can build this ourselves in two weeks?"*

It is a reasonable question, and the honest answer starts with agreement. Modern frontier models are remarkably capable, and a working prototype really can be built in days. Anyone who says otherwise is selling something.

The better question is not "can we build it?" but "what is the prototype missing, and which of those gaps matter for our situation?" This article lists those gaps by layer, with the engineering reasoning behind each, and ends with a candid checklist for deciding whether to build in-house, partner, or do both. We avoid invented statistics: where a claim depends on your data, we say how to measure it.

---

## What a two-week prototype genuinely gets right

Credit where it is due. A prototype proves that:

- The use case is real and the documents contain the answers.
- A modern model can read and summarize that content well.
- Users find the interaction valuable.

Those are the hardest things to establish, and the prototype establishes them cheaply. The question is what happens when the same system meets production conditions: more users with different permissions, messier documents, higher stakes for wrong answers, and the need to keep working after the original builder moves on.

---

## 1. Access control: similarity is not authorization

The most dangerous assumption in a prototype is that every user may see every document. A flat index with a nearest-neighbor query returns the closest matches regardless of who is asking:

```python
# Prototype: one flat index, no notion of who is asking
results = vector_db.similarity_search(query=user_prompt, k=5)
```

If an entry-level employee asks about severance terms, the system may happily retrieve and summarize a confidential executive document, because it ranked highly. That is a data-leak vulnerability, not a quality issue.

In production, each chunk carries authorization metadata, and the retrieval query is constrained by the caller's verified identity:

```json
{
  "chunk_id": "clause_hr_49201",
  "document_id": "exec_comp_2026.pdf",
  "tenant_id": "acme",
  "allowed_groups": ["legal", "executive", "board"],
  "effective_date": "2026-01-01"
}
```

```python
from qdrant_client import QdrantClient, models

def secure_search(client: QdrantClient, query_vector, claims: dict, limit: int = 5):
    # claims come from a verified token (e.g. a validated JWT), never from the prompt
    access_filter = models.Filter(must=[
        models.FieldCondition(key="tenant_id",
                              match=models.MatchValue(value=claims["tenant_id"])),
        models.FieldCondition(key="allowed_groups",
                              match=models.MatchAny(any=claims["groups"])),
    ])
    return client.query_points(
        collection_name="enterprise_knowledge",
        query=query_vector,
        query_filter=access_filter,
        limit=limit,
        with_payload=True,
    ).points
```

(The Qdrant client API changes between versions; check the documentation for the version you run.)

Three points that prototypes miss. First, the filter must be applied *inside* the search, so unauthorized chunks are never candidates, rather than filtered out afterward. Second, filtering interacts with the index: very restrictive filters can reduce recall on some implementations, so test your database's filtered-search behavior. Third, this is one layer of defense, not the whole defense. Permissions in the source systems change, so you also need a process to keep chunk-level ACLs in sync, a re-check of permissions on the final context, and audit logs of what was retrieved for whom.

---

## 2. Ingestion: real documents are not clean text

Demos use clean, single-column text. Enterprise knowledge lives in scanned contracts, multi-column PDFs, spreadsheets embedded in documents, and tables whose meaning depends on their headers.

A common prototype shortcut is a recursive character splitter with a fixed size. On a table, that can split a row from its header, so a chunk contains "4.2M" with no indication of what it measures. The retriever then returns half a table, and the model may answer confidently from incomplete data.

Production ingestion usually adds:

- **Layout analysis** that identifies headings, paragraphs, tables and figures before chunking, using OCR and layout models where documents are scanned.
- **Table handling** that keeps headers with their rows, for example by serializing tables to a structured text form.
- **Hierarchical (parent-child) chunking**, where small chunks are indexed for precise retrieval and the surrounding section is returned for context.
- **Provenance metadata** (document, page, section) attached to every chunk so answers can cite sources.

We are deliberately not claiming a percentage by which this reduces errors, because the effect depends heavily on your documents. The right approach is to build a small set of your hardest documents and measure retrieval and answer quality before and after each change.

---

## 3. Retrieval: why one embedding model is not enough

A single dense embedding search handles paraphrase well but can miss exact identifiers (part numbers, statute sections, error codes), and can rank passages that mention a topic above passages that actually answer the question.

A common production approach combines lexical search (such as BM25) with dense search, fuses the results (for example with Reciprocal Rank Fusion), and then reranks a shortlist with a cross-encoder that reads the query and passage together. We explain the reasoning and the research behind this in our companion article, [Why Vector Similarity Search Is Not Semantic Search](https://www.botmartz.com/insights/why-vector-similarity-is-not-semantic-search).

The point for the build-or-buy decision is not that this is impossible to build. It is that each stage adds parameters to tune (candidate counts, fusion settings, reranker thresholds) and each needs an evaluation set to tune against, which leads to the next gap.

---

## 4. Evaluation: how do you know it still works?

In a prototype, evaluation means someone types five questions and nods. In production, you change prompts, models, chunking and embeddings repeatedly, and each change can quietly break something that used to work.

A durable evaluation setup has three parts:

1. **A golden set** of questions with reference answers and source passages, drawn from real usage and including hard cases (identifiers, negations, near-duplicate clauses, questions with no answer in the corpus). Start with a few dozen and grow it as failures appear.
2. **Metrics for both stages.** For retrieval: recall and ranking quality. For generation: whether the answer is grounded in the retrieved context and whether it addresses the question. Libraries such as RAGAS provide metrics like faithfulness, answer relevancy, context precision and context recall; these use an LLM as a judge, so treat them as a useful signal that needs calibration against human review, not as ground truth.
3. **A regression gate** in CI, so a change that degrades quality is caught before release.

```python
from datasets import Dataset
from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy, context_precision, context_recall

# Columns and names vary across RAGAS versions; pin a version and check its docs.
data = Dataset.from_dict({
    "question": questions,
    "answer": answers,
    "contexts": retrieved_contexts,     # list of lists of passages
    "ground_truth": reference_answers,
})
result = evaluate(data, metrics=[faithfulness, answer_relevancy,
                                 context_precision, context_recall])
scores = result.to_pandas()[["faithfulness", "answer_relevancy",
                             "context_precision", "context_recall"]].mean()

# Gate on an absolute floor AND on regression against the last accepted baseline.
for metric, floor in {"faithfulness": 0.85, "context_recall": 0.80}.items():
    assert scores[metric] >= floor, f"{metric} below floor: {scores[metric]:.3f}"
    assert scores[metric] >= baseline[metric] - 0.02, f"{metric} regressed vs baseline"
```

The thresholds in that snippet are placeholders. Set yours from what your stakeholders consider acceptable, and revisit them as the golden set grows.

---

## 5. Cost and latency: they scale with usage, not with demos

A prototype with ten users hides the economics. Model cost scales with queries, prompt size and the number of model calls per query. A simple formula keeps estimates honest:

> daily input cost = queries per day × input tokens per query × price per input token

For example, with 100,000 queries a day, 4,000 input tokens each, and an assumed price of USD 3 per million input tokens (check current pricing for your model), input cost alone is 400 million tokens per day, or about USD 1,200 per day. Agents that call the model several times per query multiply that, and long conversation histories inflate the token count further.

Levers worth knowing:

- **Exact-match caching** is safe and cheap for repeated identical queries.
- **Semantic caching** returns a stored answer when a new query is similar enough to a previous one. It can save significant cost, but it carries real risks: false matches can return a wrong answer, and a cache shared across users can leak restricted answers. Scope cache keys by tenant and permission set, calibrate the similarity threshold on labeled paraphrase pairs, and invalidate entries when the underlying documents change.
- **Context discipline**: send fewer, better-ranked passages; summarize or trim history.
- **Provider prompt caching** where offered for repeated prompt prefixes.
- **Streaming** so users see output sooner even when total generation time is unchanged.

Measure your own time to first token and total latency under realistic concurrency; they vary widely with model, region, prompt size and load.

---

## 6. Observability, security review and ownership

Three further gaps tend to appear after launch rather than before:

- **Observability.** When an answer is wrong, you need the trace: the query, retrieved chunks, scores, prompt and response. Distributed tracing (for example OpenTelemetry) plus a store for these traces turns "the AI said something odd" into a debuggable event.
- **Security and compliance review.** Enterprise deployments typically need data-handling controls, logging and retention policies, vendor risk assessments, and sometimes data-residency guarantees. These are organizational processes as much as code.
- **Ownership.** Systems need on-call responsibility, upgrade plans for models and libraries, and someone who understands the whole pipeline when the original builder leaves.

---

## So should you build it yourself?

Sometimes, yes. A candid decision aid:

**Build in-house when:**
- The use case is narrow, the documents are clean, and the audience is small and internal.
- Wrong answers are cheap and easily noticed.
- You already have engineers with retrieval, evaluation and security experience, and capacity to own the system long term.

**Bring in a partner when:**
- Documents are messy and varied (scans, tables, mixed formats) and answers carry legal, financial or safety consequences.
- You need strict per-user access control, audit trails or regulated deployment (private cloud or on-premises).
- You need to reach production on a deadline without building retrieval, evaluation and observability expertise from scratch.

**A hybrid often works best:** keep the product knowledge and domain ownership in-house, and get outside help on the specific layers where your team has the least experience, such as ingestion quality, evaluation design or secure deployment.

---

## Frequently asked questions

### Can a team build a RAG prototype in two weeks?
Yes. Frontier models and common libraries make a working prototype quick to build. The gaps appear when it meets production requirements: per-user permissions, messy documents, evaluation, cost control and long-term ownership.

### Why do RAG prototypes fail in production?
Typically because of untested edge cases rather than the model itself: weak access control, document parsing that breaks tables, retrieval that misses exact identifiers, no regression testing, and token costs that grow with usage.

### How do you enforce document permissions in a vector search system?
Store authorization metadata on every chunk, apply filters derived from the user's verified identity inside the search query, re-check permissions on the final context, keep chunk-level permissions in sync with source systems, and log what was retrieved for whom.

### How should a RAG system be evaluated?
Build a golden set of real and hard questions with reference answers and sources, measure retrieval and answer-grounding metrics (RAGAS is one option), calibrate automated judges against human review, and run the set as a regression gate before every release.

### Is semantic caching safe?
It can be, with care. Scope cache entries by tenant and permissions, calibrate the similarity threshold on labeled data, and invalidate entries when documents change. A poorly scoped semantic cache can return wrong or unauthorized answers.

---

## Conclusion

The prototype your team builds in two weeks is real progress, and it is the right place to start. What separates it from a dependable enterprise system is a set of unglamorous layers: authorization, ingestion quality, retrieval design, evaluation, cost control, observability and ownership. Whether you build those yourselves or with a partner, treat each as a requirement to be tested, not an assumption.

**Not sure which layers matter for your use case?** [Talk to our engineering team](https://www.botmartz.com/contact). We are happy to review your prototype and tell you honestly what it needs, including when the answer is "you can handle this in-house."
