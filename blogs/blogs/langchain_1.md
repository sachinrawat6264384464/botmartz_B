---
title: "LangChain Architecture Overview: Chains, Runnables, LCEL, and the New vs. Old API"
excerpt: "LangChain evolved from procedural chains to declarative runnables. Understand LCEL (Language Chain Expression Language), the Runnable protocol, and how it simplifies building complex workflows."
author: Soham Sharma
authorName: Soham Sharma
category: LangChain
tags: ["LangChain", "Architecture", "Runnables", "LCEL", "LLMs"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: langchain-mastery
series_slug: langchain-mastery
series_title: "LangChain Mastery: From Prompts to Production"
difficulty: beginner
week: null
day: 1
tools:
  - LangChain
---

LangChain is a framework for building applications with large language models (LLMs). It started as a set of procedural chain classes but evolved into LCEL (Language Chain Expression Language), a declarative way to compose components. Runnables are the foundation: they're objects with a consistent interface (.invoke(), .batch(), .stream()) for chaining operations. This post walks through the architecture, showing how to think in terms of Runnables and when to use them.

## Runnables: The Core Abstraction

A Runnable is any object with .invoke() (or .batch(), .stream()) methods. Runnables can be chained with the | operator.

```python
from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI

# Create components (all Runnables)
template = "You are a helpful assistant. Answer this: {question}"
prompt = PromptTemplate(input_variables=["question"], template=template)
model = ChatOpenAI(model="gpt-4")

# Chain with | operator (LCEL)
chain = prompt | model

# Invoke
response = chain.invoke({"question": "What is 2+2?"})
print(response.content)
```

**Output:**
```text
2 + 2 equals 4.
```

The | operator chains Runnables. The output of the left side becomes the input to the right side.

## Old API vs. New API

Old API: chains were Python classes with custom logic.

```python
# Old (not recommended)
from langchain.chains import LLMChain
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4")
prompt = PromptTemplate(input_variables=["question"], template="Q: {question}\nA:")
chain = LLMChain(prompt=prompt, llm=llm)
response = chain.run(question="What is 2+2?")
```

New API: Runnables are simpler and more composable.

```python
# New (recommended)
prompt | ChatOpenAI(model="gpt-4")
```

The new approach is more concise and composable. Prefer it for new code.

## Conclusion

LangChain's architecture centers on Runnables—composable objects with a consistent interface. LCEL makes building complex workflows simple and declarative. Understanding the Runnable protocol enables you to extend LangChain with custom components. Next: we'll explore Prompt Templates and Output Parsers—how to structure requests and parse responses.
