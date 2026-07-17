---
title: "Prompt Templates and Output Parsers: PromptTemplate, ChatPromptTemplate, and Pydantic Parsing"
excerpt: "Templates turn user inputs into structured prompts. Parsers extract structured data from LLM outputs. Learn templating, output formats, and robust parsing."
author: Soham Sharma
authorName: Soham Sharma
category: LangChain
tags: ["LangChain", "Prompts", "Parsing", "Output Extraction"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: langchain-mastery
series_slug: langchain-mastery
series_title: "LangChain Mastery: From Prompts to Production"
difficulty: beginner
week: null
day: 2
tools:
  - LangChain
---

PromptTemplate structures user inputs into system/user/assistant messages. Output parsers turn LLM text into structured objects (JSON, dataclasses, Pydantic models). This post covers templating syntax, parsing strategies, and error handling.

## Prompt Templates

```python
from langchain.prompts import PromptTemplate, ChatPromptTemplate

# Simple template
template = "Translate '{input_language}' to '{output_language}': {text}"
prompt = PromptTemplate(
    input_variables=["input_language", "output_language", "text"],
    template=template
)

formatted = prompt.format(
    input_language="English",
    output_language="Spanish",
    text="Hello, world!"
)
print(formatted)
```

**Output:**
```text
Translate 'English' to 'Spanish': Hello, world!
```

## Chat Templates

```python
from langchain.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    ("human", "{user_input}"),
])

formatted = prompt.format_messages(user_input="What time is it?")
for msg in formatted:
    print(f"{msg.type}: {msg.content}")
```

**Output:**
```text
system: You are a helpful assistant.
human: What time is it?
```

## Output Parsing

```python
from langchain.output_parsers import PydanticOutputParser
from pydantic import BaseModel

class Answer(BaseModel):
    answer: str
    confidence: float

parser = PydanticOutputParser(pydantic_object=Answer)
parser_instructions = parser.get_format_instructions()
print(parser_instructions)
```

**Output:**
```text
The output should be formatted as a JSON instance...
```

## Conclusion

Templates structure inputs; parsers extract structured outputs. Together they enable predictable, composable workflows. Understanding templating and parsing patterns is essential for building reliable LLM applications. Next: we'll explore working with LLMs and Chat Models—how to choose, configure, and switch between providers.
