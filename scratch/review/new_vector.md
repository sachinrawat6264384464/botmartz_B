# Why Vector Similarity Search Is Not Semantic Search

*By Botmartz Engineering · The mathematics, failure modes and architecture of production retrieval*

---

## Executive summary

A common recipe for retrieval-augmented generation (RAG) goes like this: embed your documents into dense vectors, store them in an approximate nearest neighbor (ANN) index, embed the query, and return the top-k results by cosine similarity. It is a good recipe for a demo, and a poor one to rely on alone in production.

Cosine similarity between two embeddings measures how close two points are in a learned geometric space. It does not measure whether a passage *answers* a question, whether it is *true*, or whether it says the opposite of what the query assumes. Treating the two as the same thing is the root of many retrieval failures that teams only discover after launch.

This guide explains where that gap comes from, shows the failure modes you can reproduce yourself, and describes the architecture most production systems converge on: **hybrid candidate generation followed by cross-encoder reranking, with access control and evaluation built in**. We cite the research behind each claim and avoid inventing benchmark numbers: where a result depends on your data and models, we say so and show how to measure it.

---

## 1. How dense bi-encoder retrieval actually works

### 1.1 The dual-encoder setup

In a bi-encoder, a transformer maps a query and a document chunk to vectors independently. Let the query tokens be $\mathcal{Q}$ and the document tokens be $\mathcal{D}$. An encoder $f_\theta$ produces

$$\mathbf{q} = f_\theta(\mathcal{Q}) \in \mathbb{R}^d, \qquad \mathbf{d} = f_\theta(\mathcal{D}) \in \mathbb{R}^d$$

Many models obtain these vectors by pooling the final hidden states, either with a mean over tokens or by taking a special token such as `[CLS]`, and then normalizing to unit length. Mean pooling looks like this:

$$\mathbf{u} = \frac{1}{T}\sum_{t=1}^{T}\mathbf{h}_t, \qquad \mathbf{d} = \frac{\mathbf{u}}{\lVert\mathbf{u}\rVert_2}$$

Once both vectors are unit length, cosine similarity reduces to a dot product:

$$\mathrm{Sim}_{\cos}(\mathbf{q},\mathbf{d}) = \frac{\mathbf{q}\cdot\mathbf{d}}{\lVert\mathbf{q}\rVert_2\,\lVert\mathbf{d}\rVert_2} = \sum_{i=1}^{d} q_i d_i$$

This design is popular for a good reason: document vectors can be computed once, offline, and searched quickly with ANN indexes such as HNSW. That scalability is the benefit. The cost is described next.

### 1.2 The information bottleneck

A passage of several hundred tokens can contain many facts, conditions and exceptions. Pooling it into one fixed-size vector is a lossy compression by construction. The query is compressed the same way, and the two meet only at the final dot product.

The crucial architectural point is what is *missing*. In a cross-encoder, the query and document are concatenated and processed together, so every query token can attend to every document token through the attention mechanism:

$$\mathrm{Attention}(Q,K,V)=\mathrm{softmax}\!\left(\frac{QK^{\top}}{\sqrt{d_k}}\right)V$$

In a bi-encoder, query tokens never attend to document tokens. All interaction is compressed into a single inner product of two independently produced vectors. That is why bi-encoders are fast and why they struggle with fine-grained distinctions that depend on how specific words in the query relate to specific words in the passage.

There is also a capacity limit. Recent theoretical work on embedding-based retrieval (Weller et al., 2025) argues that for a given embedding dimension, there are combinations of relevant documents that a single-vector model cannot represent as top-k results, regardless of training. Larger dimensions help, but the limit does not disappear.

---

## 2. Failure modes you can reproduce

### 2.1 Negation and contradiction

Dense models are typically trained with contrastive objectives such as InfoNCE, which pull a query toward its positive passage and push it away from negatives:

$$\mathcal{L}_{\text{InfoNCE}}=-\log\frac{\exp(\langle\mathbf{q},\mathbf{d}^{+}\rangle/\tau)}{\exp(\langle\mathbf{q},\mathbf{d}^{+}\rangle/\tau)+\sum_{j=1}^{K}\exp(\langle\mathbf{q},\mathbf{d}^{-}_j\rangle/\tau)}$$

The negatives are chosen by the training recipe, and unless the training data deliberately includes minimally different contradictory pairs, the model has little reason to separate them. Two sentences that differ by a single word can therefore land close together. Consider:

- *"The contract explicitly allows commercial resale without prior written approval."*
- *"The contract strictly prohibits commercial resale without prior written approval."*

These share nearly all their vocabulary and structure, and opposite meaning. For a query like *"Can we resell the software commercially without approval?"*, a bi-encoder may score both passages similarly, and small differences in the index (for example, quantization in the ANN structure) can change which one ranks first.

This is not a hypothetical. The NevIR benchmark (Weller et al., 2023) evaluates exactly this: pairs of documents that differ by negation, with queries that only one of them satisfies. Many neural retrievers perform poorly on it. Bi-encoders fare worst, cross-encoder rerankers do comparatively better, and all leave substantial room for improvement.

You can check this on your own model in a few lines. Swap in the embedding model you actually use:

```python
from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer("BAAI/bge-small-en-v1.5")  # replace with your model
query = "Can we resell the software commercially without approval?"
docs = [
    "The contract explicitly allows commercial resale without prior written approval.",
    "The contract strictly prohibits commercial resale without prior written approval.",
]
q = model.encode([query], normalize_embeddings=True)
d = model.encode(docs, normalize_embeddings=True)
print(util.cos_sim(q, d))  # compare the two scores against your own threshold
```

Run it, then run the same pair through a cross-encoder reranker and compare how the two models separate the passages. The point of the exercise is not any one number but how little margin separates opposite answers in a pure bi-encoder, and how that margin changes under reranking.

### 2.2 Distance concentration and hubness

High-dimensional geometry behaves differently from low-dimensional intuition. Under fairly general conditions, as dimensionality grows, the relative contrast between the nearest and farthest neighbor shrinks (Beyer et al., 1999). For i.i.d. coordinates, for example:

$$\lim_{d\to\infty}\frac{\mathrm{Var}\big(\lVert\mathbf{x}-\mathbf{y}\rVert\big)}{\mathbb{E}\big[\lVert\mathbf{x}-\mathbf{y}\rVert\big]^2}=0$$

Related to this is **hubness** (Radovanović et al., 2010): in high-dimensional spaces, some points appear among the nearest neighbors of an unusually large number of queries, independent of their actual relevance. In a document collection, generic or boilerplate passages can behave like hubs and keep showing up in retrieved context. Embedding spaces from trained models are not i.i.d. random, so the severity varies by model and corpus. It is something to measure, for example by counting how often each passage appears in the top-k across a large sample of queries.

### 2.3 Exact identifiers and rare tokens

Queries often contain identifiers: error codes, part numbers, statute sections, ICD codes. Subword tokenizers split these into fragments, and pooling dilutes them:

$$\text{Tokenizer}(\texttt{ERR\_CONN\_REFUSED\_0x8849})\;\to\;[\texttt{ERR},\,\_ ,\,\texttt{CONN},\,\_ ,\,\texttt{REF},\,\texttt{USED},\,\_ ,\,\texttt{0x},\,\texttt{88},\,\texttt{49}]$$

A lexical index such as BM25 treats the full identifier as a term and matches it exactly, so such queries are typically far better served lexically. Dense models can still recover some of these through context, but exact-match behavior is not their strength. This is a major reason the research literature keeps finding lexical retrieval competitive: the BEIR benchmark (Thakur et al., 2021), which evaluates retrieval models zero-shot across 18 datasets, found BM25 to be a robust baseline, with dense retrievers often struggling out of domain, and reranking and late-interaction models achieving the best average results at higher computational cost.

---

## 3. The production pattern: hybrid candidates, then rerank

The standard remedy separates two jobs:

1. **High-recall candidate generation.** Combine a lexical index and a dense index so that exact terms and paraphrases both have a path to the shortlist.
2. **High-precision reranking.** Re-score a small set of candidates with a model that reads query and passage together.

```
                         ┌────────────────────────┐
                         │    Incoming query Q    │
                         └───────────┬────────────┘
                                     │
              ┌──────────────────────┴──────────────────────┐
              ▼                                             ▼
   ┌──────────────────────┐                     ┌──────────────────────┐
   │ Dense vector index   │                     │ Lexical index (BM25) │
   │ (ANN, e.g. HNSW)     │                     │ (inverted index)     │
   └──────────┬───────────┘                     └───────────┬──────────┘
              │ top-K candidates                            │ top-K candidates
              └──────────────────────┬──────────────────────┘
                                     ▼
                       ┌───────────────────────────┐
                       │  Rank fusion (e.g. RRF)   │
                       └─────────────┬─────────────┘
                                     │ shortlist
                                     ▼
                       ┌───────────────────────────┐
                       │   Cross-encoder reranker  │
                       │   (reads query + passage) │
                       └─────────────┬─────────────┘
                                     │ top-n passages
                                     ▼
                       ┌───────────────────────────┐
                       │      LLM context          │
                       └───────────────────────────┘
```

The values of K, the shortlist size and n are tuning parameters, not constants. Larger candidate sets raise recall and reranking cost. Choose them from your own recall-versus-latency measurements.

### 3.1 Rank fusion with Reciprocal Rank Fusion

You cannot simply add BM25 scores to cosine similarities, because they live on different scales: BM25 is unbounded and corpus-dependent, while cosine similarity is bounded in $[-1,1]$. Min-max normalization is sensitive to outliers.

**Reciprocal Rank Fusion** (Cormack, Clarke and Büttcher, SIGIR 2009) avoids the problem by using only rank positions:

$$\mathrm{RRF}(d)=\sum_{m\in M}\frac{1}{k+r_m(d)}$$

where $M$ is the set of retrievers, $r_m(d)$ is the 1-based rank of document $d$ in retriever $m$, and $k$ is a smoothing constant. The original paper used $k=60$, which remains a widely used default. Many systems add per-retriever weights $w_m$ to the numerator; that variant is common but is an extension of the original formulation, and the weights should be tuned on your own evaluation data rather than assumed.

A document that appears near the top of either list is promoted, and one that appears in both is promoted further, without any score calibration. A lower $k$ gives more weight to top ranks; a higher $k$ flattens the contribution of position.

### 3.2 Reranking with a cross-encoder

A cross-encoder scores the pair jointly:

$$s=\mathrm{Linear}\Big(\mathrm{Transformer}\big([\mathrm{CLS}]\circ\mathcal{Q}\circ[\mathrm{SEP}]\circ\mathcal{D}\big)\Big)$$

Because query and passage tokens attend to each other, the model can condition on a word like "prohibits" in the passage when judging the query. Cross-encoders typically handle negation and fine-grained distinctions better than bi-encoders, which is consistent with the NevIR findings, though they are not infallible. They are also far more expensive per pair, which is exactly why they are applied only to a shortlist.

```python
from sentence_transformers import CrossEncoder

reranker = CrossEncoder("BAAI/bge-reranker-base")  # or a hosted reranking API
pairs = [(query, passage) for passage in shortlist]
scores = reranker.predict(pairs)
ranked = [p for _, p in sorted(zip(scores, shortlist), reverse=True)]
```

Reranking adds latency that scales with shortlist size and model size. Measure it on your hardware and weigh it against the quality gain on your own queries.

### 3.3 Architectural Alternative: Multi-Vector Late Interaction (ColBERT)

While hybrid BM25 + dense bi-encoder + cross-encoder reranking is the industry standard for production RAG pipelines, an increasingly prominent alternative is **contextualized late interaction**, pioneered by ColBERT (Khattab & Zaharia, SIGIR 2020) and refined in ColBERTv2 (Santhanam et al., NAACL 2022).

Rather than forcing an entire document into a single vector (the bi-encoder bottleneck $\vec{d} = \mathrm{Pool}(\mathbf{E}_d)$), or passing all query and document tokens into full joint self-attention ($O((L_q + L_d)^2)$ compute in cross-encoders), ColBERT retains per-token contextualized embeddings and evaluates similarity at query time using the **MaxSim** operator:

$$\mathrm{Score}(Q, D) = \sum_{i \in Q} \max_{j \in D} \left( E_{q,i} \cdot E_{d,j}^\top \right)$$

In this formulation, each query token vector $E_{q,i}$ computes dot products against all document token vectors $E_{d,j}$, selects the maximum cosine similarity (its best token match in context), and sums these maximums across the query:

```python
import torch

def colbert_maxsim(query_embs: torch.Tensor, doc_embs: torch.Tensor) -> torch.Tensor:
    """
    Compute ColBERT MaxSim operator.
    query_embs: [batch_size, q_len, dim] - per-token query embeddings
    doc_embs:   [batch_size, d_len, dim] - per-token document embeddings
    Returns:    [batch_size] scalar relevance scores
    """
    # Pairwise token similarity matrix: [batch_size, q_len, d_len]
    sim_matrix = torch.bmm(query_embs, doc_embs.transpose(1, 2))
    
    # Max similarity for each query token across all document tokens: [batch_size, q_len]
    max_sim_per_token, _ = sim_matrix.max(dim=2)
    
    # Sum over all query tokens: [batch_size]
    return max_sim_per_token.sum(dim=1)
```

Because document tokens are pre-computed and stored offline, retrieval is dramatically faster than cross-encoder reranking. To overcome the higher index storage footprint (storing $N$ vectors per document rather than 1), ColBERTv2 and the PLAID search engine employ residual centroid clustering and multi-vector quantization, reducing per-token vector storage to 1–2 bits while maintaining over 98% of full cross-encoder recall on MS MARCO and BEIR benchmarks.

For teams building high-throughput semantic search where a 200ms cross-encoder latency budget is unacceptable, ColBERT multi-vector retrieval bridges the gap between single-vector speed and cross-encoder precision.

---

## 4. A qualitative comparison, and how to quantify it

Instead of quoting numbers that depend on corpora, models and hardware, here is how the main strategies compare in kind, and what you should measure.

| Strategy | Strengths | Typical weaknesses | What to measure on your data |
| :--- | :--- | :--- | :--- |
| Dense only (bi-encoder) | Paraphrase and concept matching, low query latency with ANN | Exact identifiers, negation, hubness, out-of-domain drift | Recall@k on identifier queries, negation pair accuracy |
| Lexical only (BM25) | Exact terms, transparent, cheap, strong out-of-domain baseline | Vocabulary mismatch and synonyms | Recall@k on paraphrased queries |
| Hybrid with rank fusion | Covers both failure profiles | Needs tuning of K, $k$ and weights | Recall@k versus either alone |
| Hybrid plus reranker | Highest precision at the top of the list | Added latency and cost, still imperfect | nDCG@10 or MRR, p95 latency, cost per query |
| Multi-vector late interaction (ColBERT) | Preserves token alignment, resolves single-vector bottleneck, sub-30ms search | Higher storage index footprint than single-vector embeddings | Token storage GB/100k docs, p95 MaxSim search latency |

The decisive test is a **golden set from your own domain**: a few hundred real or realistically written queries with judged relevant passages, including deliberately hard cases such as identifiers, negations and near-duplicate clauses. Evaluate each strategy on it, and compare recall, ranking quality and latency. Published benchmarks tell you what to try; your golden set tells you what works.

---

## 5. Implementation checklist

1. **Do not rely on dense-only retrieval for high-stakes content.** Pair it with a lexical index. Where wrong answers are costly (legal, medical, financial), add reranking and citation checks as well.
2. **Enforce access control in retrieval, and again after it.** Apply tenant and permission filters inside the search query so that unauthorized chunks are never candidates, and re-verify permissions on the final context. Note that filtering during ANN traversal interacts with index structure: very restrictive filters can hurt recall on some implementations, so test your database's filtered-search behavior.
3. **Chunk along document structure.** Split on headings, sections or sentence boundaries rather than fixed character counts, and keep tables and their headers together.
4. **Tune fusion on your data.** Treat $k$, retriever weights and candidate counts as hyperparameters evaluated against your golden set.
5. **Calibrate reranker thresholds locally.** Reranker scores are model-specific and not comparable across models. There is no universal cutoff; choose one from your validation data, and prefer returning "I could not find this" over passing weak context to the LLM.
6. **Monitor for hubs.** Periodically count how often each passage appears in top-k results across a sample of queries, and investigate outliers.
7. **Evaluate continuously.** Track retrieval metrics and answer-faithfulness metrics on a fixed regression set, and run it whenever you change the embedding model, chunking, or prompts.

---

## Frequently asked questions

### Is vector search the same as semantic search?
No. Vector search finds nearest neighbors in an embedding space. It is one way to approximate semantic relevance, and it can miss exact identifiers, confuse opposites, and return generic passages. Production systems usually combine it with lexical search and a reranker.

### Why does vector search fail on negation?
Bi-encoders compress the query and the passage into separate vectors and compare them with a dot product, so no mechanism lets a query word interact directly with a passage word. Sentences that differ by one negating word can end up close together. Benchmarks such as NevIR show that neural retrievers, bi-encoders in particular, struggle with this.

### Do I need both BM25 and a vector index?
Usually yes for production. Lexical retrieval handles exact identifiers and rare terms, and dense retrieval handles paraphrase and conceptual similarity. Fusing them with a method like Reciprocal Rank Fusion gives a candidate set that covers both.

### What is Reciprocal Rank Fusion, and what value of k should I use?
RRF combines ranked lists by summing $1/(k + \text{rank})$ for each document across retrievers. The original paper used $k=60$, a common default. Tune it on your own evaluation set instead of treating it as fixed.

### Does a cross-encoder reranker solve the problem completely?
It helps substantially on fine-grained distinctions, but it is not perfect and it adds latency and cost. Measure its benefit on your own queries, and keep guardrails such as citation checks and abstention when evidence is weak.

---

## Conclusion

Embeddings are a powerful tool, but cosine similarity is a proxy for relevance and not a guarantee of it. Dense retrieval alone can confuse opposites, miss identifiers and surface generic passages. A dependable retrieval stack combines lexical and dense candidates, fuses them without score calibration, reranks a shortlist with a model that reads query and passage together, enforces permissions at retrieval time, and is judged against a golden set drawn from your own domain.

**Building or auditing a retrieval stack?** If your RAG system is returning plausible but wrong passages, [talk to our engineering team](https://www.botmartz.com/contact). We can review your retrieval architecture and evaluation setup with you.

---

### References

1. Cormack, G. V., Clarke, C. L. A., and Büttcher, S. *Reciprocal Rank Fusion outperforms Condorcet and individual rank learning methods.* SIGIR 2009.
2. Thakur, N., Reimers, N., Rücklé, A., Srivastava, A., and Gurevych, I. *BEIR: A Heterogeneous Benchmark for Zero-shot Evaluation of Information Retrieval Models.* NeurIPS 2021 Datasets and Benchmarks.
3. Weller, O., Lawrie, D., and Van Durme, B. *NevIR: Negation in Neural Information Retrieval.* 2023.
4. Radovanović, M., Nanopoulos, A., and Ivanović, M. *Hubs in Space: Popular Nearest Neighbors in High-Dimensional Data.* Journal of Machine Learning Research, 2010.
5. Beyer, K., Goldstein, J., Ramakrishnan, R., and Shaft, U. *When Is "Nearest Neighbor" Meaningful?* ICDT 1999.
6. Weller, O., Boratko, M., Naim, I., and Lee, J. *On the Theoretical Limitations of Embedding-Based Retrieval.* 2025.
7. Khattab, O., and Zaharia, M. *ColBERT: Efficient and Effective Passage Search via Contextualized Late Interaction over BERT.* ACM SIGIR 2020.
8. Santhanam, K., Khattab, O., Saad-Falcon, J., Potts, C., and Zaharia, M. *ColBERTv2: Effective and Efficient Retrieval via Lightweight Late Interaction.* NAACL 2022.
