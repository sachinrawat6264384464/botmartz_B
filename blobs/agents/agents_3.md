---
title: "Custom Tool Creation: @tool Decorator, StructuredTool, Schema Validation, and Tool Composition"
excerpt: "Agents need tools. Build custom tools with the @tool decorator, define schemas for inputs, and compose tools into agent toolkits for specialized tasks."
author: Soham Sharma
authorName: Soham Sharma
category: Agents
tags: ["Agents", "Tools", "API Integration", "Pydantic"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: agents-mastery
series_slug: agents-mastery
series_title: "Agent Architecture: From Theory to Production"
difficulty: intermediate
week: null
day: 3
tools:
  - LLMs
---

Tools are callable functions that agents invoke to interact with the world. The @tool decorator turns Python functions into agent tools. StructuredTool with Pydantic schemas provides type safety and self-documenting interfaces.

## Simple Tools with @tool

```python
from langchain.agents import tool

@tool
def search_wikipedia(query: str) -> str:
    """Search Wikipedia for information about a topic."""
    # Implementation
    return f"Results for {query}"

@tool
def get_weather(city: str) -> str:
    """Get the current weather in a city."""
    # Implementation
    return f"Weather in {city}"

# Agents can now call these tools
```

## Structured Tools with Pydantic

```python
from langchain.agents import StructuredTool
from pydantic import BaseModel, Field

class SearchInput(BaseModel):
    query: str = Field(description="Search query")
    limit: int = Field(default=5, description="Number of results")

def search_function(query: str, limit: int) -> str:
    # Implementation
    return f"Found {limit} results for {query}"

search_tool = StructuredTool.from_function(
    func=search_function,
    args_schema=SearchInput,
)
```

## Conclusion

Custom tools enable agents to interact with external systems. Structured tools with schemas ensure type safety and clear interfaces. Building a toolkit of domain-specific tools powers specialized agents. Next: tracing and debugging agent execution with LangSmith.
