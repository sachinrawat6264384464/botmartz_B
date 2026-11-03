# Microservices vs. Modular Monoliths: Designing Scalable AI Agent Systems

*By Soham Sharma · Principal AI Architect, Botmartz AI Solutions · Published November 2, 2026*

---

## The short version

Microservices are not automatically the best architecture for production AI, and a monolith is not automatically the worst. The right design depends on five things: how your workload is shaped, how tight your latency budget is, whether you need to isolate GPUs, how your agents keep state, and which parts genuinely need to scale independently.

This article lays out a practical way to decide. It covers why AI workloads stress conventional service boundaries, what a modular monolith buys you, a pattern we use at Botmartz for retrieval-heavy agent systems (we call it a **cellular architecture**), how to think about failure recovery, and how to measure the trade-offs yourself instead of trusting anyone's headline numbers, including ours.

One note on evidence before we start. This is an architecture article, not a benchmark report. We do not publish latency or cost figures here, because a number without its hardware, models, dataset, concurrency and methodology is not evidence. The measurement section below explains how to produce numbers you can trust for your own system.

---

## 1. Why AI workloads stress conventional service boundaries

Most microservice guidance was written for request-response web systems: small payloads, short CPU-bound handlers, and teams that need to deploy independently. AI systems break several of those assumptions at once.

**The components have very different resource profiles.** Document parsing and OCR are CPU- and I/O-heavy and arrive in bursts. Retrieval is memory- and latency-sensitive. Model inference is GPU-bound and capacity-constrained. Orchestration logic is light but stateful. Forcing all four to scale as one unit wastes money, and splitting all four into separate services adds coordination cost.

**The hot path is chatty.** A single answer in a retrieval-augmented system can involve a lexical search, a vector search, fusion of the two result sets, a reranking pass over dozens of candidates, and context assembly. An agent that loops (plan, retrieve, call a tool, evaluate, retry) repeats that sequence several times per user request. Any per-hop overhead is therefore multiplied by the number of hops and by the number of loop iterations.

**The payloads are larger than typical API calls.** Candidate passages, metadata, citations and intermediate results can add up to tens or hundreds of kilobytes per call. That is small for a modern network, but it is not free once it is serialized, transmitted, deserialized and repeated.

**State is a first-class concern.** Agent workflows are cyclic and long-running. They call external tools with side effects, wait for human review, and must recover from partial failure. This is closer to workflow orchestration than to stateless request handling.

None of this means microservices are wrong. It means the boundary you draw should follow the physics of the workload, not habit.

---

## 2. Be honest about where the latency actually goes

It is tempting to blame network hops for slow AI systems. Often that is wrong, so check before you re-architect.

In many deployments, LLM generation takes seconds, while a call between two services in the same data center takes a small fraction of that for modest payloads. If your end-to-end time is dominated by model inference, collapsing services will barely move it, and your effort is better spent on inference, caching and prompt size.

Service boundaries matter most in a narrower set of situations:

- **Tight inner loops.** Reranking many candidates, or an agent that iterates many times, where small per-hop costs accumulate.
- **Large intermediate payloads** crossing a boundary repeatedly.
- **Tail latency.** Each additional network dependency adds another opportunity for a slow response, and the 99th percentile is shaped by the slowest dependency in the chain.
- **Operational overhead.** More services mean more deployments, more dashboards, more distributed tracing to wire up, and more failure modes to reason about, regardless of what the stopwatch says.

A useful way to reason about it is a simple latency budget:

> total latency ≈ Σ(stage compute time) + Σ(hops × [serialization + network + deserialization]) , repeated for each agent loop iteration.

The serialization term depends on your format (JSON versus Protobuf), payload size and implementation. The network term depends on topology, connection reuse and congestion. Connection pooling, HTTP/2 or gRPC streaming, and compact binary formats can reduce several of these costs substantially, so "separate services" and "slow" are not synonyms. Fill in the formula with your own measurements before deciding anything.

---

## 3. The modular monolith: the underrated default

A **modular monolith** is a single deployable unit with strictly enforced internal module boundaries: separate packages, explicit interfaces, no reaching into another module's internals, and ideally one owner per module. You get most of the design benefits of services without the distributed-systems tax.

For AI systems it has concrete advantages:

- Retrieval, fusion, reranking and context building can call each other as functions, so there is no serialization on the hot path.
- Agent state and business logic live in one transaction scope, which makes consistency easier to reason about.
- There is one thing to deploy, trace and debug, which matters a lot for small and mid-sized teams.
- If a module later needs to become a service, clean boundaries make extraction a bounded piece of work instead of a rewrite.

The industry has also been revisiting the assumption that finer-grained is always better. A widely discussed example is Amazon Prime Video's 2023 engineering write-up about moving a video-quality monitoring service from a distributed serverless design to a single-process design, which the team reported cut infrastructure cost by more than 90 percent. That workload was not an LLM system, so treat it as an illustration of the trade-off rather than a prediction for yours. The lesson that transfers is that data passing between many small distributed steps can dominate cost when the steps are tightly coupled.

The modular monolith's weakness is that everything scales together and shares a failure domain. That is where selective separation comes in.

---

## 4. The cellular pattern: separate by hardware and lifecycle, not by habit

The pattern we use for retrieval-heavy agent systems splits the system into a small number of **cells**, drawn along the lines where resource profile, scaling behavior or lifecycle genuinely differ. To be clear about terminology: "cellular architecture" here is our working name for this approach. It is not an industry standard, and it is closely related to a modular monolith plus a few well-chosen services.

![Cellular architecture for production AI systems: which components share a process and which cross the network](/images/insights/cellular-architecture-boundaries.svg)

The four layers in the diagram:

**1. Ingestion cell (asynchronous).** Parsing, OCR, layout analysis, chunking, metadata extraction, embedding and index building. This runs on elastic CPU workers fed by a queue. It scales with backlog, not with user traffic, and it must never compete with query-time work for memory or CPU.

**2. Query cell (one deployable unit).** Retrieval (lexical and vector), fusion, reranking client, context construction with citations and access-control checks, and the agent graph runner. The components communicate in-process or over local IPC. This is a modular monolith in miniature, and it is the part of the system where hop count matters most.

**3. Workflow and state layer.** A durable store, typically PostgreSQL, holding workflow checkpoints, idempotency records, an outbox, an append-only audit log and a human-review queue.

**4. Model-serving layer.** Dedicated GPU nodes running an inference server such as vLLM or Triton. It is separate because hardware, capacity planning, model upgrades and scaling behavior are different from application logic.

A note on co-location. Putting components in the same process or on the same host removes network overhead, but it is not always the right choice. Shared memory gives the lowest communication cost and the weakest isolation. Separate processes talking over a local Unix socket keep most of the speed while containing crashes and memory growth. Choose deliberately per component: a reranker that occasionally exhausts memory belongs behind a process boundary even if it sits on the same machine.

---

## 5. A decision framework you can actually apply

![Decision flow: when to split a component into a separate service](/images/insights/service-boundary-decision-flow.svg)

In practice, these rules cover most cases:

- **Start with a modular monolith** when the system is small enough to deploy together, domain boundaries are reasonably clear, and operational simplicity matters. This is the right default for most early and mid-stage AI products.
- **Separate ingestion workers** when document processing has different resource needs from serving, for example heavy OCR, large batch backfills, or bursty uploads.
- **Isolate model serving** when GPU utilization, model lifecycle or hardware allocation demands independent scaling. This is the single most common justified split.
- **Add further services** when you have a concrete reason: an independent security or compliance boundary, a separate team that needs its own release cadence, or a component whose failure must not take down the rest.
- **Keep chatty hot-path components together.** If two components exchange data on every request, and especially on every agent-loop iteration, think hard before putting a network between them.

The common failure is splitting early "for scale" and then paying the coordination cost for years before the scale arrives.

---

## 6. Failure recovery: why "we use Postgres" is not a recovery strategy

Durable state is where agent systems most often claim more than they deliver, so it deserves precision.

PostgreSQL's write-ahead log provides **durability and crash recovery** for committed transactions. That is valuable, but it does not by itself guarantee that your agent's workflow is correct after a failure. It says nothing about whether an email was already sent, a payment already initiated, or a ticket already created before the crash. Those are external side effects, and they live outside the database.

A production-grade design needs several layers on top of durable storage:

- **Checkpointing at defined step boundaries.** Persist workflow state after each meaningful step so a crashed run can resume. Workflow frameworks such as LangGraph support persisting state through checkpointers, including a Postgres-backed one, and support pausing for human input.
- **Idempotent tool calls.** On resume, steps after the last checkpoint may run again, so any tool with side effects must tolerate being called twice. Derive a stable idempotency key per run, step and tool call, record it before calling, and return the stored result on a repeat. If the downstream API supports idempotency keys, pass yours through.
- **Transaction boundaries and the outbox pattern.** Write the intent to act and the state change in one database transaction, and let a separate publisher deliver the effect. This avoids the "state updated but message lost" and the reverse failure.
- **Retry policy with limits.** Use bounded retries with backoff, distinguish retryable from non-retryable errors, and cap agent loop iterations so a confused model cannot spin forever.
- **Compensation for partial completion.** When a multi-step workflow fails midway, define what undoing earlier steps means (a saga-style compensation), or surface the case to a human instead of guessing.

A minimal idempotency record looks like this. It is deliberately small, because the point is the contract, not the code:

```sql
-- One row per (run, step, tool call). The unique key makes retries safe.
INSERT INTO tool_effects (idempotency_key, run_id, step, request, status)
VALUES ($1, $2, $3, $4, 'started')
ON CONFLICT (idempotency_key) DO NOTHING
RETURNING status;
-- No row returned: an earlier attempt exists. Read its stored result
-- and skip the external call instead of repeating the side effect.
```

Notice that none of this depends on whether your services are micro or monolithic. It does mean that splitting the agent runner and the state layer across many services makes this reasoning harder, because transaction scope shrinks while the number of failure combinations grows. That is a real argument for keeping the agent graph runner and its state close together.

We also avoid claiming "zero drift" or "zero failures". Observing none in a test run does not prove the absence of inconsistency. The honest claim is that the design makes inconsistency detectable, bounded and recoverable.

---

## 7. How to measure this for your own system

If you are weighing an architecture change, run a controlled experiment rather than relying on published numbers, including anyone else's. A credible protocol:

1. **Define the workload.** Record dataset size and document characteristics, query mix, and the concurrency and arrival pattern (steady, bursty, ramped).
2. **Fix the environment.** Note hardware, GPU model, instance types, region, and the exact LLM, embedding and reranker models and versions.
3. **Decide what latency includes.** Report retrieval, reranking, agent orchestration and LLM generation separately, as well as end to end. Mixing them hides where the time goes.
4. **Instrument with distributed tracing** (for example OpenTelemetry) so every hop has a span, and report p50, p95 and p99 rather than a single average.
5. **Repeat runs** and report variance. One run is an anecdote.
6. **Account for cost explicitly.** State how infrastructure cost was estimated (instance hours, GPU utilization, egress) and include the engineering and operational cost of the extra moving parts.
7. **Test failure, not just speed.** Kill workers mid-workflow and verify that recovery produces the correct final state and no duplicated side effects.

If you publish the results, publish the setup alongside them. A smaller number with a clear method is worth more to a technical buyer than a dramatic number without one.

---

## 8. Frequently asked questions

### Is a modular monolith suitable for production AI systems?
Yes, for many of them. A modular monolith avoids serialization and network overhead on the retrieval and agent hot path, keeps state and business logic in one transaction scope, and is simpler to deploy and debug. It is a strong default until a specific component needs independent scaling, isolation or ownership.

### When should RAG pipelines be split into separate services?
Split ingestion from serving when document processing has different resource needs or bursty load. Split model serving when GPU capacity must scale independently. Keep retrieval, fusion, reranking and context building together on the query hot path unless you have a measured reason to separate them.

### How should AI agent state be persisted and recovered?
Persist workflow state at defined checkpoints in a durable store, make every side-effecting tool call idempotent, use an outbox for outbound effects, bound retries and loop iterations, and define compensation or human escalation for partial failures. Database durability alone is not enough.

### How do you scale GPU inference independently of application logic?
Run inference on dedicated GPU nodes behind a serving layer such as vLLM or Triton, and call it from the application over gRPC or HTTP with streaming. Scale and upgrade it on its own cadence. Keep retrieval, orchestration and business logic in the application layer.

### What is a cellular architecture for AI systems, and when is it useful?
It is a way of drawing service boundaries by resource profile and lifecycle: asynchronous ingestion, a tightly coupled query cell, a durable workflow and state layer, and independently scaled model serving. It is most useful for retrieval-heavy, agentic systems where the hot path is chatty and GPU capacity needs its own scaling. It is a working pattern, not an industry standard.

---

## Conclusion

Do not choose an architecture by slogan. Microservices solve organizational and scaling problems at a cost, and a modular monolith avoids that cost until you need what services give you. For retrieval-heavy agent systems, a sensible shape is a tightly coupled query cell, asynchronous ingestion, an explicitly designed state layer, and separately scaled model serving, with every additional boundary justified by a concrete requirement and verified by measurement.

**Want a second opinion on your architecture?** If you are planning or running a RAG or agent system and want to review your retrieval architecture, inference bottlenecks or workflow reliability, [talk to our engineering team](https://www.botmartz.com/contact). We are glad to walk through trade-offs with you, whether or not it leads to a project.
