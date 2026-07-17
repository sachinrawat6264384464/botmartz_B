---
title: "RAG Evaluation with LangSmith: Faithfulness, Relevancy, Context Precision, and Automated Scoring"
excerpt: "RAG answers can be fluent but wrong. Use LangSmith to evaluate faithfulness (grounded in context), relevancy (answers the question), and context precision (retrieved docs are relevant)."
author: Soham Sharma
authorName: Soham Sharma
category: LangChain
tags: ["LangChain", "Evaluation", "RAG Quality", "LangSmith", "Metrics"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: langchain-mastery
series_slug: langchain-mastery
series_title: "LangChain Mastery: From Prompts to Production"
difficulty: intermediate
week: null
day: 10
tools:
  - LangChain
---

RAG evaluation is hard: answers can sound fluent but hallucinate (not grounded in context). LangSmith provides automated metrics: faithfulness (uses context), relevancy (answers the question), and context precision (retrieved documents are relevant). This post covers setup and interpretation.

## Setting Up LangSmith

```python
from langsmith import Client

client = Client()

# Log runs to LangSmith
@client.traced()
def rag_chain(question):
    context = retriever.get_relevant_documents(question)
    answer = llm.generate(question, context)
    return {"answer": answer, "context": context}

result = rag_chain("What is transformers?")
```

## Evaluating Faithfulness

```python
from langsmith.evaluation import evaluate_string

# Evaluate if answer is grounded in context
def faithfulness_evaluator(run_output, context):
    answer = run_output["answer"]
    context_text = "\n".join([doc.page_content for doc in context])
    # Use LLM to check if answer is supported by context
    return {"score": check_if_grounded(answer, context_text)}
```

## Conclusion

LangSmith provides visibility into RAG quality. Faithfulness, relevancy, and context precision metrics help identify failure modes. Automated evaluation enables rapid iteration and production monitoring. Next: ReAct agents—how to give LLMs tools and reasoning loops.
