---
title: "Advanced Retrieval: Maximum Marginal Relevance (MMR), Self-Query, and Parent-Document Retrieval"
excerpt: "Simple similarity search returns similar but redundant results. Learn MMR (diverse results), self-query (metadata filtering), and parent-document retrieval (better context)."
author: Soham Sharma
authorName: Soham Sharma
category: LangChain
tags: ["LangChain", "Retrieval", "Advanced Techniques", "RAG", "Search"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: langchain-mastery
series_slug: langchain-mastery
series_title: "LangChain Mastery: From Prompts to Production"
difficulty: intermediate
week: null
day: 9
tools:
  - LangChain
---

Basic similarity search retrieves the most similar documents—but they may be redundant. Advanced retrievers address this: MMR balances similarity and diversity, self-query filters by metadata, parent-document retrieval chunks contextually. This post covers each strategy and when to use them.

## Maximum Marginal Relevance (MMR)

MMR returns diverse results: similar to the query but different from each other.

```python
# MMR retrieval
results = vector_store.max_marginal_relevance_search(
    "What is semantic search?",
    k=5,
    fetch_k=20,  # Retrieve more candidates
    lambda_mult=0.25  # Balance: 0=diversity, 1=similarity
)
```

## Self-Query Retrieval

Translate user queries into metadata filters + similarity search.

```python
from langchain.retrievers.self_query.base import SelfQueryRetriever

retriever = SelfQueryRetriever.from_llm_and_db(
    llm=llm,
    db=vector_store,
    document_content_description="Academic papers"
)

# Automatically filters by year=2024, then searches
results = retriever.get_relevant_documents("Papers from 2024 about transformers")
```

## Conclusion

Advanced retrieval improves quality: MMR adds diversity, self-query adds filtering, parent-document retrieval preserves context. Choosing the right retriever depends on your data and queries. Next: evaluating RAG systems with LangSmith to measure faithfulness and relevance.
