# Botmartz — Enterprise AI & Intelligent Systems Implementation Platform

![Botmartz AI Platform](https://botmartz.com/favicon.ico)

**Botmartz** is an **Enterprise AI & Intelligent Systems Implementation** platform and company codebase. We help organizations design AI solutions, architect enterprise systems, implement AI platforms, build production search and knowledge retrieval engines, deploy constrained AI agents, integrate AI into existing data backends, and operate production-hardened systems.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**, this platform combines a high-conversion, engineering-led enterprise web presence with reference implementation simulators, a comprehensive **Admin CMS**, event ticketing, and Answer Engine Optimization (AEO/SEO).

---

## 🏛️ Brand Positioning & Implementation Architecture

> **Primary Positioning:** *"AI Systems Built for Real Work."*  
> *We help organizations design, implement, integrate, and operate production-ready AI systems across knowledge, workflows, data, and software.*

### Information Architecture & Solution Pillars

| Pillar / Route | Strategic Focus | Technical Stack & Implementation |
| :--- | :--- | :--- |
| **Enterprise Knowledge & Search Systems** (`/services/enterprise-rag`) | Accurate retrieval over complex enterprise document archives and databases. | Layout-aware table extraction, hybrid dense/sparse search (BM25 + vector), cross-encoder rerankers, exact paragraph citation provenance, automated RAGAS evaluation harnesses. |
| **AI Agents & Workflow Automation** (`/services/ai-agents`) | Constrained multi-step workflow automation with deterministic execution. | LangGraph state machines, Pydantic data validation schemas, human-in-the-loop (HITL) checkpoints, secure tool-calling with token isolation. |
| **AI Platforms & Enterprise Integrations** (`/services/integrations`) | Production integration without building from scratch. | Glean partner implementation pathway, OpenSearch/Qdrant/Weaviate/Elastic integration, private VPC deployment on AWS, Azure, and GCP. |
| **Custom AI Applications & Intelligent Software** (`/services/custom-ai-applications`) | Tailored intelligence consoles and operational co-pilots. | Full-stack Next.js/FastAPI applications, domain-specific evaluation suites, structured database grounding, enterprise RBAC. |
| **Implementation Model** (`/implementation`) | Transparent 6-stage delivery methodology. | Discovery & Scope → Architecture & Benchmarks → Core Implementation → Enterprise Integration → Production Hardening → Managed Optimization. |
| **Flagship Lab: Insurance Intelligence** (`/work/labs/insurance-intelligence`) | Reference implementation for complex document comparison. | Multi-document policy comparison simulator, clause variance matrix, exact paragraph citations, and zero-hallucination refusal benchmarks. |
| **Industry Verticals** (`/industries`) | Domain-specific compliance & workflow solutions. | Insurance & Underwriting, Financial Services & Banking, Enterprise Operations & Logistics, and Ecommerce & Retail. |
| **Partner Ecosystem** (`/partnerships`) | Multi-platform ecosystem alignment. | Enterprise AI platforms (Glean implementation pathway), search engines (OpenSearch, Elastic), vector databases (Qdrant, Weaviate), and cloud infrastructure. |

---

## 🚀 Key Features & Modules

### 1. Enterprise Web Architecture (`app/`)
- **Engineering-Led Visual Identity**: Dark architectural aesthetic (`#050B14`, `#070E1B`), blueprint canvas grids, real-time visual node pipelines, and minimal glassmorphism.
- **Interactive Reference Simulator (`/work/labs/insurance-intelligence`)**:
  - Live policy comparison across Commercial Property, Cyber Risk, and CGL forms.
  - Clause variance matrix detecting coverage exclusions and deductible conflicts.
  - Paragraph-level evidence provenance and zero-hallucination refusal testing.
  - Automated RAGAS evaluation benchmark metrics display.
- **Transparent Proof Taxonomy**: Visible categorization across all engineering projects:
  - `[REFERENCE IMPLEMENTATION]`
  - `[RESEARCH PROTOTYPE]`
  - `[OPEN SOURCE PROJECT]`
  - `[CLIENT CASE STUDY]`
- **High-Intent Lead Qualification Intake (`/contact`)**:
  - Captures organization name, industry vertical, existing infrastructure (Glean, OpenSearch, Postgres, AWS/Azure), document scope, and desired timeline.
  - Asynchronous Firestore persistence and automated email dispatch.

### 2. Comprehensive Admin CMS Portal (`app/admin/`)
Protected by role-based authentication (`super-admin` & `admin`):
- **Dashboard Telemetry (`/admin`)**: System metrics, lead capture analytics, article views, and event registrations.
- **Blog & Technical Insights CMS (`/admin/Blogs`)**: TipTap WYSIWYG editor with syntax highlighting, draft/publish lifecycle, and Cloudinary media uploads.
- **Case Studies CMS (`/admin/case-studies`)**: Management of client case studies, technical architecture diagrams, and measurable outcomes.
- **Events & Registration Ledger (`/admin/events`, `/admin/payments`)**: Event creation, ticketing tiers, Razorpay payment reconciliation, and manual UTR verification.
- **Ticket Scanner & Event Desk (`/admin/scanner`, `/event-desk`)**: On-site camera QR verification and attendee check-in management.
- **CRM Pipeline (`/admin/crm`, `/admin/contacts`)**: High-intent architecture review triage and status tracking.
- **Newsletter & Job Board CMS (`/admin/newsletter`, `/admin/jobs`)**: Subscriber management and career postings.

### 3. Events & Ticketing Infrastructure (`app/community/`)
- **Event Experience (`/community/events/[slug]`)**: Multi-tier registration wizard for tech conferences (e.g., *AI Frontier 2026*).
- **Payment Processing**: Dual-mode payment processing via **Razorpay** and manual **Bank Transfer (UTR)** verification.
- **Automated Check-in Passes**: Generation of digital tickets with secure QR codes dispatched via Nodemailer.

### 4. SEO & Answer Engine Optimization (AEO)
- **Dynamic XML Sitemap (`app/sitemap.ts`)**: Auto-indexes all static marketing pages, implementation hubs, dynamic blog posts, and community events.
- **AEO Plain-Text Files (`llms.txt`, `llms-full.txt`)**: Specially formatted markdown summaries for AI search engines (Perplexity, Gemini, ChatGPT).
- **Structured Data JSON-LD**: Rich `Organization`, `Service`, `TechArticle`, and `Event` schema markup on all pages ahgshagsahsgg.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router, React 19, TypeScript 5)
- **Styling**: Tailwind CSS v4, Lucide Icons
- **Database & Auth**: Firebase Firestore, Firebase Authentication, Firebase Admin SDK
- **Rich Text & Content**: TipTap, React Markdown, Remark GFM, Lowlight
- **Payments & Communication**: Razorpay API & Webhooks, Nodemailer (SMTP)
- **AI Ecosystem Tooling**: LangGraph, LlamaIndex, OpenSearch, Qdrant, Weaviate, Elastic, RAGAS, FastAPI

---

## 📁 Repository Directory Structure

```
├── app/
│   ├── _components/               # Global components (Navbar, Footer, TrackedLink, Blueprint)
│   ├── about/                     # Company overview & team
│   ├── admin/                     # Admin CMS dashboard & CRUD managers
│   ├── api/                       # API routes (contact, events, payment, scanner, admin)
│   ├── community/                 # Events, meetups, AI Frontier registration
│   ├── contact/                   # Architecture review & enterprise lead intake
│   ├── implementation/            # Flagship 6-stage delivery lifecycle & stack matrix
│   ├── industries/                # Vertical solutions (Insurance, BFSI, Ops, Ecommerce)
│   ├── insights/                  # Technical engineering blog & insights
│   ├── partnerships/              # Enterprise AI ecosystem & integration capabilities
│   ├── services/                  # Solutions hub & subpages
│   │   ├── ai-agents/             # Deterministic agentic workflows & state machines
│   │   ├── custom-ai-applications/# Tailored intelligent software & consoles
│   │   ├── enterprise-rag/        # Knowledge systems & hybrid search
│   │   └── integrations/          # Enterprise platform deployment (Glean, search backends)
│   ├── work/                      # Case studies & proof showcase
│   │   └── labs/                  # Labs hub & Reference Implementations
│   │       └── insurance-intelligence/ # Interactive policy comparison lab
│   ├── layout.tsx                 # Root HTML layout & fonts
│   ├── sitemap.ts                 # Dynamic XML sitemap generator
│   └── robots.ts                  # Search engine crawling rules
├── lib/                           # Firebase clients, analytics, mail templates, helpers
├── scripts/                       # Database seeding & migration utilities
└── next.config.ts                 # Next.js configuration & 301 redirects
```

---

## 💻 Local Development Setup

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/botmartz/botmartz-main.git
cd botmartz-main
npm install
```

### 2. Environment Variables Setup
Create a `.env.local` file in the root directory with the following configuration:
```env
# Firebase Client SDK
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK (Private Key in JSON or formatted string)
FIREBASE_ADMIN_CLIENT_EMAIL=your_service_account_email
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Razorpay Payments
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# SMTP Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@domain.com
SMTP_PASS=your_app_password
ADMIN_EMAIL=soham@botmartz.com
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build Validation
```bash
npm run build
npm run start
```

---

## 📄 License & Attribution

© 2026 Botmartz AI Solutions Pvt Ltd. All rights reserved.