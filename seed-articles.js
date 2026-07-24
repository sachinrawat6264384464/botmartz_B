/**
 * seed-articles.js
 * ─────────────────────────────────────────────────────────────────
 * Seeds the default RAG blog post, case study, and job opening
 * directly from your HTML template files into Firestore.
 *
 * Run: node seed-articles.js
 * ─────────────────────────────────────────────────────────────────
 */

require('dotenv').config({ path: '.env' });
const admin = require('firebase-admin');

// Parse the private key formatting
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY
  ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined;

if (!privateKey) {
  console.error("❌ FIREBASE_ADMIN_PRIVATE_KEY is missing in your .env file!");
  process.exit(1);
}

const app = admin.apps.length > 0
  ? admin.apps[0]
  : admin.initializeApp({
      credential: admin.credential.cert({
        projectId:   process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey:  privateKey,
      }),
    });

const db = admin.firestore();

// ── Article Content ──
const articleContent = `
<p>Every RAG demo looks the same: a clean question, a perfect chunk of context, a confident answer. Then it hits real documents — inconsistent formatting, contradicting sources, ambiguous queries — and accuracy collapses. The gap between "it works in the notebook" and "it works for 10,000 employees" is where most enterprise RAG budgets go to die.</p>
<p>Over the last two years building RAG systems for enterprise clients at Botmartz, we've seen the same four failure modes repeat across industries — support, legal, healthcare, logistics. This post walks through each one, the fix, and runnable code so you can check your own system against it.</p>

<h2 id="retrieval">1. Retrieval Quality, Not Model Quality, Is the Bottleneck</h2>
<p>Teams spend weeks tuning prompts and swapping models when the real problem sits upstream: the retriever is returning the wrong chunks. A better LLM cannot reason over context it never received. Before touching the model, we measure retrieval in isolation — precision and recall against a hand-labeled eval set of 100–200 real queries.</p>

<pre><code>def precision_at_k(retrieved, relevant, k=5):
    top_k = retrieved[:k]
    hits = sum(1 for doc in top_k if doc.id in relevant)
    return hits / k

# Run against a hand-labeled eval set before touching the model
scores = [precision_at_k(r, rel) for r, rel in eval_pairs]
print(f"Mean Precision@5: {sum(scores) / len(scores):.2f}")</code></pre>

<h2 id="chunking">2. Chunking Strategy Has to Match Document Structure</h2>
<p>Fixed-size chunking is the default and, for most enterprise documents, the wrong choice. Contracts, policy manuals and technical specs carry structure — sections, clauses, tables — that naive splitting destroys. We chunk along document structure first, then apply size limits as a constraint, not a rule.</p>

<h2 id="hybrid-search">3. Hybrid Search Is Mandatory, Not Optional</h2>
<p>Standard vector search excels at matching conceptual queries, but fails completely on specific terms, SKU codes, and version numbers. We implement a hybrid search setup, matching semantic vectors from dense models together with BM25 keyword indices, merged via Reciprocal Rank Fusion (RRF).</p>
`;

async function seed() {
  console.log("🚀 Seeding dynamic templates into Firestore...\n");

  // 1. Seed Blog Post
  const blogRef = db.collection("blog-posts").doc("why-most-rag-systems-fail-in-production");
  await blogRef.set({
    title: "Why Most RAG Systems Fail in Production",
    slug: "why-most-rag-systems-fail-in-production",
    excerpt: "Retrieval looks easy in a demo. In production, it's where most enterprise AI projects quietly die — here's the anatomy of the failure and the fixes that actually hold up.",
    content: articleContent,
    category: "Enterprise RAG",
    author: "Harsh Sahu",
    readTime: 12,
    failureModes: 5,
    codeSnippets: 3,
    runnableNotebooks: 1,
    status: "published",
    colabLink: "https://colab.research.google.com/",
    githubLink: "https://github.com/botmartz",
    toc: ['Retrieval Quality', 'Chunking Strategy', 'Hybrid Search'],
    closingPoints: [
      "Measure retrieval precision and recall in isolation before touching the model.",
      "Chunk along document structure, not arbitrary character counts.",
      "Combine vector and keyword search — hybrid retrieval beats either alone."
    ],
    tags: ['Enterprise RAG', 'Evaluation', 'Production AI', 'LangChain'],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true });
  console.log("✅ Blog post seeded!");

  // 2. Seed Case Study
  const caseRef = db.collection("case-studies").doc("enterprise-rag-for-support-teams");
  await caseRef.set({
    title: "Enterprise RAG for Support Teams",
    slug: "enterprise-rag-for-support-teams",
    excerpt: "A production RAG platform giving support agents instant, cited answers from internal documentation — cutting resolution time by more than half within six weeks of launch.",
    category: "SaaS & Technology",
    clientName: "Confidential SaaS Co.",
    timeline: "10 weeks",
    teamSize: "2 engineers",
    visualType: "dashboard",
    status: "published",
    metrics: [
      { value: "55%", label: "Faster Resolution Time" },
      { value: "33%", label: "Fewer Escalations" },
      { value: "92%", label: "Citation Accuracy" }
    ],
    stack: ['LangChain', 'Qdrant', 'FastAPI', 'Docker'],
    challenge: "Support agents spent an average of 6 minutes per ticket searching across scattered wikis, PDFs and Slack threads for the right answer — often finding an outdated one. Escalations to engineering were frequent and expensive, and customer satisfaction on first-response accuracy was falling behind target. The client's documentation lived across four disconnected systems, each with its own permissions model and update cadence. Any solution needed to respect access control per-agent while still surfacing a single, unified answer.",
    outcome: "Within six weeks of launch, average resolution time dropped by 55%, and every answer surfaced a source link agents could verify in one click — building trust instead of replacing judgment. Escalations to engineering fell by a third, and the support team reported meaningfully higher confidence handling unfamiliar ticket types. The client has since expanded the system to their internal engineering knowledge base and is evaluating a customer-facing version for their help center.",
    approach: [
      { n: "1", title: "Wiki Scoping & Discovery", desc: "Mapped the client's internal wiki structures and identified primary support knowledge gaps." },
      { n: "2", title: "Structure-Aware Chunking", desc: "Parsed documents into hierarchical markdown chunks, preserving tables and section dependencies." },
      { n: "3", title: "Hybrid Indexing & Deployment", desc: "Configured BM25 + Qdrant dense vector search with cross-encoder rerankers." }
    ],
    lessons: [
      "Retrieve in context — a flat vector index loses section headers.",
      "Metadata filtering is key for access control permissions.",
      "Observe queries continuously to capture missing documentation gaps."
    ],
    clientQuote: {
      text: "The custom search engine built by Botmartz changed how our operations team works. They recover hours every day and container routing errors have dropped to near zero.",
      author: "Markus Vance",
      role: "VP of Operations, Global Logistics Leader"
    },
    team: [
      { initials: "HS", name: "Harsh Sahu", role: "AI Engineer" },
      { initials: "PB", name: "Promit Basu", role: "AI/ML Engineer" }
    ],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true });
  console.log("✅ Case study seeded!");

  // 3. Seed Job Opening
  const jobRef = db.collection("jobs").doc("ai-engineer-enterprise-rag");
  await jobRef.set({
    title: "AI Engineer — Enterprise RAG",
    slug: "ai-engineer-enterprise-rag",
    shortDescription: "Design and ship production Retrieval-Augmented Generation systems for enterprise clients — from ingestion pipelines to evaluation and observability. Be one of the first ten engineers at Botmartz, with direct ownership over systems that ship into real companies.",
    department: "Engineering",
    type: "Full-Time",
    status: "published",
    location: "Indore, India",
    compensation: "₹18–28 LPA",
    experience: "3–6 Years Exp",
    responsibilities: [
      "Own retrieval-augmented generation systems end to end — from ingestion to eval.",
      "Build ingestion pipelines and hybrid search indexing structures.",
      "Implement cross-encoder rerankers and continuous evaluation metrics.",
      "Contribute to our open-source labs and write tutorials.",
      "Collaborate directly with enterprise product managers."
    ],
    requirements: [
      "3+ years software engineering experience in Python/TypeScript.",
      "Proven history shipping production-grade RAG or LLM applications.",
      "Familiarity with LangChain/LangGraph, Qdrant/Pinecone, and FastAPI.",
      "Solid understanding of vector embeddings and retrieval evals."
    ],
    niceToHave: [
      "Experience building custom document parsing/OCR pipelines.",
      "Contributed to open source AI frameworks (LlamaIndex, LangChain).",
      "Active participant in Indore developer community."
    ],
    compensationBenefits: [
      "Competitive compensation + equity.",
      "Flexible hours and remote-friendly collaboration.",
      "Learning stipend and open-source hours."
    ],
    hiringProcessSteps: [
      { n: "1", title: "Initial Screening", desc: "30-min conversation scoping fit and previous engineering experience." },
      { n: "2", title: "Technical Review & Systems Design", desc: "60-min session designing a RAG platform architecture." },
      { n: "3", title: "Take-home Coding Assignment", desc: "Build a prototype evaluation harness." },
      { n: "4", title: "Fit Interview", desc: "Conversation with engineering leads and cultural fit." }
    ],
    faqs: [
      { q: "Is this role on-site?", a: "Yes, this role is based in our Indore office. Relocation support is fully provided." },
      { q: "Do you offer remote flexibility?", a: "We operate a hybrid model with core in-office days and remote flexibility." }
    ],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true });
  console.log("✅ Job opening seeded!");

  console.log("\n🎉 Seeding complete! Check your website dynamic paths:");
  console.log("   👉 Blog       : http://localhost:3000/insights/why-most-rag-systems-fail-in-production");
  console.log("   👉 Case Study  : http://localhost:3000/work/case-studies/enterprise-rag-for-support-teams");
  console.log("   👉 Job Role   : http://localhost:3000/careers/ai-engineer-enterprise-rag");
  process.exit(0);
}

seed().catch(err => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
