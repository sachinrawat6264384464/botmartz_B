# The Complete Distribution & Social Publishing MCP Ecosystem (2026)

This master registry catalogs all open-source Model Context Protocol (MCP) servers available for **publishing, distributing, and amplifying** Botmartz articles, research papers, and technical updates directly from the Antigravity AIOS terminal.

---

## 1. What We Currently Have Active in `mcp_config.json`

| Server Key | Package / Endpoint | Distribution / SEO Capability | Status |
| :--- | :--- | :--- | :---: |
| **`github-mcp-server`** | `ghcr.io/github/github-mcp-server` (Docker) | Automates PRs, commits, GitHub Releases, and repo updates. | 🟢 **Active** |
| **`gsc-mcp`** | `npx -y mcp-gsc` | Submits URLs, tracks impressions, clicks, keywords, and indexing coverage. | 🟢 **Active** |
| **`technical-seo`** | `npx -y technical-seo-mcp@latest` | Crawls website, validates Schema markup, and audits Core Web Vitals. | 🟢 **Active** |
| **`lighthouse-mcp`** | `npx -y lighthouse-mcp` | Benchmarks real Core Web Vitals (LCP, CLS, INP) for Google ranking factors. | 🟢 **Active** |
| **`microsoft-learn`** | `https://learn.microsoft.com/api/mcp` | Official Microsoft AI & Azure docs integration. | 🟢 **Active** |
| **`Neon`** | `https://mcp.neon.tech/mcp` | Serverless PostgreSQL database engine storing analytics & state. | 🟢 **Active** |
| **`firebase-mcp-server`**| `npx -y firebase-tools@latest mcp` | Deploys rules, syncs Firestore blog posts & authenticates users. | 🟢 **Active** |
| **`hostinger-mcp`** | `npx -y hostinger-api-mcp@latest` | Domain DNS, server orchestration & hosting management. | 🟢 **Active** |
| **`vercel`** | `https://mcp.vercel.com` | Edge deployment status and cache invalidation. | 🟢 **Active** |

---

## 2. Social & Channel MCP Servers Available for Instant Add-On

These vetted open-source MCP servers can be configured in `~/.gemini/config/mcp_config.json` to publish directly to external platforms from Antigravity:

### A. Developer Blogs & Multi-Platform Publishing (Dev.to, Medium, Hashnode)
1. **Pipepost MCP (`MendleM/Pipepost`)**
   - **Command:** `npx -y @mendlem/pipepost-mcp`
   - **Supported Platforms:** Dev.to, Medium, Hashnode, Ghost, WordPress.
   - **What it does:** Takes markdown content from Antigravity and cross-publishes it across 5 developer platforms simultaneously with the canonical URL set to `https://www.botmartz.com/insights/[slug]` to prevent SEO duplicate content penalties.
2. **Medium MCP Server (`jackyckma/medium-mcp-server`)**
   - **Command:** `npx -y medium-mcp-server`
   - **What it does:** Publishes technical articles directly to your Medium publication using session automation.

### B. Developer News & Community Aggregators (Hacker News & Reddit)
3. **Hacker News MCP (`paablolc/mcp-hacker-news` or `devabdultech/hn-mcp`)**
   - **Command:** `npx -y @paablolc/mcp-hacker-news`
   - **What it does:** Fetches top trending threads, tracks discussion comments on submitted URLs, and searches Algolia HN index.
4. **Reddit MCP (`alexandros-lekkas/reddit-mcp-server` or `achetronic/reddit-mcp`)**
   - **Command:** `npx -y @alexandros-lekkas/reddit-mcp-server`
   - **What it does:** Submits posts to target subreddits (`r/MachineLearning`, `r/LocalLLaMA`, `r/LangChain`, `r/Python`), tracks upvotes, and fetches user feedback.

### C. Social & Newsletter Syndication (X/Twitter, Substack, Slack)
5. **Twitter / X Autonomous MCP (`JohannesHoppe/x-autonomous-mcp` or `GenAIwithMS/twitter-mcp`)**
   - **Command:** `npx -y @genaiwithms/twitter-mcp`
   - **What it does:** Publishes long-form technical threads (8-12 tweets), uploads architecture diagrams, and monitors engagement.
6. **Substack MCP (`conorbronsdon/substack-mcp`)**
   - **Command:** `npx -y substack-mcp`
   - **What it does:** Converts markdown posts into Substack newsletter drafts, schedules email dispatches to founders and CTOs, and inspects open-rate analytics.
7. **Slack MCP (`modelcontextprotocol/server-slack`)**
   - **Command:** `npx -y @modelcontextprotocol/server-slack`
   - **What it does:** Posts instant article launches and summaries into internal team channels and partner Slack communities.

---

## 3. Ready-to-Paste Configuration Block for `mcp_config.json`

To enable direct multi-channel distribution right from this conversation, add this block into `/home/soham-sharma/.gemini/config/mcp_config.json`:

```json
    "pipepost-publishing": {
      "command": "npx",
      "args": [
        "-y",
        "@mendlem/pipepost-mcp"
      ],
      "env": {
        "DEVTO_API_KEY": "YOUR_DEVTO_API_KEY",
        "HASHNODE_API_KEY": "YOUR_HASHNODE_API_KEY",
        "MEDIUM_TOKEN": "YOUR_MEDIUM_INTEGRATION_TOKEN"
      }
    },
    "substack-publisher": {
      "command": "npx",
      "args": [
        "-y",
        "substack-mcp"
      ],
      "env": {
        "SUBSTACK_COOKIE": "YOUR_SUBSTACK_SESSION_COOKIE",
        "SUBSTACK_SUBDOMAIN": "botmartz"
      }
    },
    "hacker-news": {
      "command": "npx",
      "args": [
        "-y",
        "@paablolc/mcp-hacker-news"
      ]
    }
```

---

## 4. End-to-End Autonomous Publishing Workflow

With this stack configured in Antigravity:
1. **Authoring:** Antigravity writes the 2,400-word mathematically grounded article with code blocks and citations.
2. **Local Storage & Firestore:** `firebase-mcp-server` publishes it directly to `https://www.botmartz.com/insights/[slug]`.
3. **SEO & AEO Verification:** `technical-seo` audits canonical tags, schema JSON-LD, and robots directives.
4. **Instant Google Submission:** `gsc-mcp` pings Google Search Console to index the new URL immediately.
5. **Syndication via Channel MCPs:**
   - `pipepost-publishing` distributes to Dev.to and Hashnode with canonical tags pointing back to `botmartz.com`.
   - `substack-publisher` delivers the newsletter edition to subscribers.
   - `github-mcp-server` commits the markdown to our open-source research repository on GitHub.
