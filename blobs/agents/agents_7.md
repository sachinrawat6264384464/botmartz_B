---
title: "Error Handling and Agent Recovery: Graceful Degradation, Retries, and Fallback Strategies"
excerpt: "Agents fail: tools time out, LLMs hallucinate, APIs are down. Implement graceful degradation, retry logic, and fallback strategies to keep agents robust."
author: Soham Sharma
authorName: Soham Sharma
category: Agents
tags: ["Agents", "Error Handling", "Resilience", "Production"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: agents-mastery
series_slug: agents-mastery
series_title: "Agent Architecture: From Theory to Production"
difficulty: advanced
week: null
day: 7
tools:
  - LLMs
---

Production agents must handle failures: tool timeouts, API errors, LLM inconsistencies. Implement retries with exponential backoff, fallback tools, and graceful degradation to maintain service quality.

## Retry with Exponential Backoff

```python
import time
from functools import wraps

def retry_with_backoff(max_retries=3, base_delay=1):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_retries - 1:
                        raise
                    delay = base_delay * (2 ** attempt)
                    print(f"Attempt {attempt+1} failed. Retrying in {delay}s...")
                    time.sleep(delay)
        return wrapper
    return decorator

@retry_with_backoff(max_retries=3)
def call_external_api():
    # API call that might fail
    pass
```

## Fallback Tools

```python
# Primary tool
search_tool = StructuredTool.from_function(func=search_api)

# Fallback: cached results
fallback_search = StructuredTool.from_function(func=search_cache)

def robust_search(query):
    try:
        return search_tool.invoke({"query": query})
    except Exception as e:
        print(f"Search API failed: {e}. Falling back to cache.")
        return fallback_search.invoke({"query": query})
```

## Graceful Degradation

```python
# Try detailed information
try:
    result = get_detailed_weather(city)
except:
    # Fallback to basic info
    result = get_basic_weather(city)
    return result + " (Note: detailed forecast unavailable)"
```

## Conclusion

Error handling separates fragile demos from production systems. Retries, fallbacks, and graceful degradation keep agents running when components fail. Understanding failure modes and mitigation strategies is essential. Next: deploying agents at scale with proper monitoring and observability.
