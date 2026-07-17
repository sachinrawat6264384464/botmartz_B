---
title: "Embeddings and Vector Stores: OpenAI Embeddings, FAISS, Chroma, and Similarity Search"
excerpt: "Vector stores enable semantic search. Load embeddings, store vectors in FAISS or Chroma, and query with similarity search to retrieve relevant documents for RAG."
author: Soham Sharma
authorName: Soham Sharma
category: LangChain
tags: ["LangChain", "Embeddings", "Vector Stores", "FAISS", "Semantic Search"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: langchain-mastery
series_slug: langchain-mastery
series_title: "LangChain Mastery: From Prompts to Production"
difficulty: intermediate
week: null
day: 7
tools:
  - LangChain
---

Embeddings convert text to vectors. Vector stores enable semantic search by finding the nearest neighbors. This post covers embedding models, vector databases, and similarity search queries.

## Embeddings

```python
from langchain.embeddings import OpenAIEmbeddings

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
vector = embeddings.embed_query("What is semantic search?")
print(f"Embedding dimension: {len(vector)}")
```

**Output:**
```text
Embedding dimension: 1536
```

## Vector Stores

```python
from langchain_community.vectorstores import FAISS, Chroma
from langchain.embeddings import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()

# FAISS for in-memory search
vector_store = FAISS.from_documents(documents, embeddings)

# Query
results = vector_store.similarity_search("What is the main topic?", k=3)
for doc in results:
    print(f"- {doc.page_content[:100]}...")
```

**Output:**
```text
- The main topic is semantic search and retrieval-augmented generation...
```

FAISS is fast and lightweight; Chroma persists to disk.

## Conclusion

Embeddings and vector stores are the retrieval backbone of RAG. OpenAI embeddings are high-quality; FAISS and Chroma offer flexible storage and search. Understanding vector databases enables building effective semantic search. Next: we'll build a complete RAG pipeline from data ingestion to generation.
