import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

const DEFAULT_JOBS = [
  {
    title: "Community Management Intern",
    slug: "community-management-intern",
    department: "Community",
    location: "Remote / Part-Time",
    type: "Part-Time / Internship",
    experience: "Students / Freshers",
    salary: "Stipend + Certificate + LOR",
    status: "published",
    shortDescription: "Help us build and grow the Botmartz AI Engineering Community of AI engineers, developers and students.",
    responsibilities: "Manage and grow our Discord community\nEngage actively with developers, students, and AI enthusiasts\nCoordinate workshops and community events\nCreate content, announcements, and educational posts\nSupport key initiatives like AI Accelerator and AI Frontier",
    requirements: "Experience with Discord or online tech communities (PREFERRED)\nStrong communication and engagement skills\nSelf-motivated, proactive, and eager to learn\nPassionate about AI, LLMs, AI Agents, and developer communities",
    niceToHave: "Mentorship from AI Engineering team\nCertificate of Internship & Performance-based Letter of Recommendation\nActive participation in AI open-source projects or tech events",
    createdAt: new Date().toISOString()
  },
  {
    title: "AI Engineer — Enterprise RAG",
    slug: "ai-engineer-enterprise-rag",
    department: "AI & Engineering",
    location: "Indore, India / Remote",
    type: "Full-time",
    experience: "3+ Years",
    salary: "Competitive + Equity Options",
    status: "published",
    shortDescription: "Design and ship production RAG systems for enterprise clients, from retrieval to evaluation.",
    responsibilities: "Design and build retrieval pipelines — chunking, embeddings, hybrid search, reranking.\nOwn evaluation: build eval sets, track precision/recall, and catch regressions before ship.\nDeploy and monitor RAG systems in production, with guardrails and observability.\nWork directly with enterprise clients to understand real document and query patterns.",
    requirements: "3+ years building production ML/AI systems (RAG experience strongly preferred).\nStrong Python fundamentals and comfort with FastAPI or similar backend frameworks.\nHands-on experience with vector databases (Qdrant, Pinecone, pgvector, or similar).",
    createdAt: new Date().toISOString()
  },
  {
    title: "Agent Systems Engineer",
    slug: "agent-systems-engineer",
    department: "AI & Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "2+ Years",
    salary: "Competitive + Equity",
    status: "published",
    shortDescription: "Build multi-agent workflows with LangGraph for real business processes, not demos.",
    responsibilities: "Design multi-agent orchestration graphs using LangGraph and Python.\nIntegrate agent tools with APIs, databases, and enterprise systems.\nImplement robust retry, fallback, and state persistence patterns.",
    requirements: "Experience with Python, LangGraph or LangChain.\nSolid understanding of LLM function calling and agent memory architectures.",
    createdAt: new Date().toISOString()
  },
  {
    title: "AI/ML Research Engineer",
    slug: "aiml-research-engineer",
    department: "Research",
    location: "Remote",
    type: "Full-time",
    experience: "3+ Years",
    salary: "Competitive + Equity",
    status: "published",
    shortDescription: "Explore new techniques in evaluation, fine-tuning and responsible AI, and bring them to production.",
    responsibilities: "Fine-tune open-weights models (Llama, Qwen, DeepSeek) for domain-specific tasks.\nBuild automated evaluation frameworks for LLM output quality.",
    requirements: "Strong background in PyTorch, Transformers, and LLM fine-tuning (LoRA, QLoRA).",
    createdAt: new Date().toISOString()
  },
  {
    title: "Community & Events Lead",
    slug: "community-events-lead",
    department: "Community",
    location: "Indore, India",
    type: "Full-time",
    experience: "2+ Years",
    salary: "Competitive",
    status: "published",
    shortDescription: "Run AI Frontier, monthly meetups, and the Botmartz AI Engineering Community end-to-end.",
    responsibilities: "Organize in-person and virtual developer meetups and hackathons.\nBuild partnerships with university AI clubs and tech communities.",
    requirements: "Proven track record in technical community building and event management.",
    createdAt: new Date().toISOString()
  },
  {
    title: "Product Designer",
    slug: "product-designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    experience: "2+ Years",
    salary: "Competitive",
    status: "published",
    shortDescription: "Design interfaces for AI-native products used by engineers and enterprise teams.",
    responsibilities: "Design clean, high-conversion UI/UX for AI web applications and developer tools.\nBuild design systems and interactive prototypes in Figma.",
    requirements: "Strong portfolio showcasing web app design and complex workflows.",
    createdAt: new Date().toISOString()
  }
];

export async function POST() {
  try {
    const jobsRef = adminDb.collection("jobs");
    const snap = await jobsRef.get();

    // Add each job document if not already present by slug
    const existingSlugs = new Set(snap.docs.map(doc => doc.data().slug));
    let addedCount = 0;

    for (const job of DEFAULT_JOBS) {
      if (!existingSlugs.has(job.slug)) {
        await jobsRef.add(job);
        addedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Seeded ${addedCount} job position(s) into database.`,
      addedCount
    });
  } catch (error: any) {
    console.error("Error seeding jobs:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to seed jobs" },
      { status: 500 }
    );
  }
}
