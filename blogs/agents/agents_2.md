---
title: "ReAct Agents: Reasoning + Acting Framework, Thought-Action-Observation Loop, and Prompt Patterns"
excerpt: "ReAct (Reasoning + Acting) agents interleave reasoning and tool use. Understand thought-action-observation cycles, prompt design, and stopping conditions."
author: Soham Sharma
authorName: Soham Sharma
category: Agents
tags: ["Agents", "ReAct", "Tool Use", "Reasoning"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: agents-mastery
series_slug: agents-mastery
series_title: "Agent Architecture: From Theory to Production"
difficulty: intermediate
week: null
day: 2
tools:
  - LLMs
---

ReAct agents alternate between thinking and acting. The LLM first reasons (Thought), then decides what tool to call (Action), observes the result (Observation), and repeats. This pattern outperforms both "pure reasoning" and "pure acting" on complex tasks.

## Thought-Action-Observation Loop

```
Thought: "I need to find the population of France in 2024."
Action: search_tool("France population 2024")
Observation: "67.8 million (as of 2024)"
Thought: "Now I have the answer. I should provide it with context."
Action: provide_answer("67.8 million")
```

## Implementing ReAct

```python
from langchain_openai import ChatOpenAI
from langchain.agents import initialize_agent, Tool, AgentType

tools = [
    Tool(
        name="search",
        func=search_function,
        description="Search the internet"
    ),
    Tool(
        name="calculate",
        func=calculator_function,
        description="Perform arithmetic"
    )
]

agent = initialize_agent(
    tools=tools,
    llm=ChatOpenAI(model="gpt-4"),
    agent=AgentType.REACT_DOCSTRING,
    verbose=True
)

result = agent.run("What is the population of France divided by the population of Germany?")
```

The agent will reason, search for both populations, calculate the ratio, and return the answer.

## Conclusion

ReAct agents effectively combine reasoning and tool use. Interleaving thought and action prevents both hallucination (from pure reasoning) and missed reasoning steps (from pure acting). Understanding the ReAct pattern is essential for building effective agents. Next: we'll explore multi-agent orchestration—how to coordinate multiple specialized agents.
