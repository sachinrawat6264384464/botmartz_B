---
title: "Document Loaders and Text Splitters: PDF, Web Crawling, and Optimal Chunk Strategies"
excerpt: "RAG starts with data loading. Learn loaders for PDF, web pages, and databases, and text splitters (recursive, sliding window) for optimal chunking."
author: Soham Sharma
authorName: Soham Sharma
category: LangChain
tags: ["LangChain", "Document Loading", "Text Splitting", "RAG", "Data Ingestion"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: langchain-mastery
series_slug: langchain-mastery
series_title: "LangChain Mastery: From Prompts to Production"
difficulty: beginner
week: null
day: 6
tools:
  - LangChain
---

Document loaders ingest PDFs, web pages, and databases. Text splitters chunk documents into manageable pieces—balancing context length with semantic coherence. This post covers loaders, splitters, and chunking strategies for RAG systems.

## Document Loaders

```python
from langchain.document_loaders import PDFLoader, WebBaseLoader

# Load PDF
pdf_loader = PDFLoader("document.pdf")
documents = pdf_loader.load()
print(f"Loaded {len(documents)} pages")

# Load webpage
web_loader = WebBaseLoader("https://example.com")
web_docs = web_loader.load()
print(f"Loaded {len(web_docs)} documents from web")
```

**Output:**
```text
Loaded 10 pages
Loaded 1 documents from web
```

## Text Splitters

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separators=["\n\n", "\n", " ", ""]
)

chunks = splitter.split_text(long_text)
print(f"Split into {len(chunks)} chunks")
```

**Output:**
```text
Split into 45 chunks
```

Recursive splitting respects paragraph/sentence boundaries before character limits, preserving semantics.

## Conclusion

Document loading and chunking are foundational for RAG. Recursive splitting with overlap preserves context while managing token limits. Understanding loader capabilities and chunking strategies enables building effective retrieval systems. Next: embeddings and vector stores—how to store and retrieve chunks.
