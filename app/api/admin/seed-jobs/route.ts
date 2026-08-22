import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

const DEFAULT_JOBS = [
  {
    title: "Brand & Community Intern",
    slug: "brand-community-intern",
    department: "Community",
    location: "Remote / Part-Time",
    type: "Part-Time / Internship",
    experience: "Students / Freshers",
    salary: "Stipend + Certificate + LOR",
    status: "published",
    shortDescription: "Grow the Botmartz brand and AI Engineering community across social, Discord, WhatsApp/Telegram, and community channels.",
    responsibilities: "Manage LinkedIn, Discord, WhatsApp/Telegram, and community channels\nCreate and schedule community content around AI Engineering, RAG, Agents, PyTorch, etc.\nEngage with developers, students, founders, and AI professionals\nOrganize meetups, webinars, workshops, and community activities\nIncrease Botmartz community members and engagement\nSupport AI Frontier and other Botmartz events\nCollect community feedback and identify potential opportunities",
    requirements: "Strong communication, content creation, and social media skills\nActive presence on developer and AI community channels\nPassionate about community building, AI, and developer engagement",
    niceToHave: "Mentorship from Botmartz AI Engineering team\nPerformance-based Letter of Recommendation (LOR) & Certificate\nOpportunity to transition into full-time roles",
    createdAt: new Date().toISOString()
  },
  {
    title: "Partnerships & Community Growth Intern",
    slug: "partnerships-community-growth-intern",
    department: "Community",
    location: "Remote / Part-Time",
    type: "Part-Time / Internship",
    experience: "Students / Freshers",
    salary: "Stipend + Certificate + LOR",
    status: "published",
    shortDescription: "Build strategic relationships and ecosystem partnerships to expand Botmartz's reach across startups, colleges, and developer communities.",
    responsibilities: "Research and identify potential technology, university, startup, community, and event partners\nReach out to companies, developer communities, colleges, AI groups, and potential sponsors\nBuild partnership proposals and collaboration opportunities\nManage partner communication and follow-ups\nDevelop collaborations for workshops, hackathons, meetups, webinars, and AI Frontier\nMaintain a partnership CRM/database\nIdentify opportunities with AI/Cloud companies and developer ecosystems\nHelp create mutually beneficial programs for the Botmartz community",
    requirements: "Strong outreach, research, and relationship management skills\nClear written and spoken communication & networking ability\nOrganized mindset to maintain partnership CRM/database",
    niceToHave: "Prior experience in college club outreach, event sponsorship, or startup partnerships\nDirect exposure to tech/AI startup ecosystems",
    createdAt: new Date().toISOString()
  },
  {
    title: "Developer Relations (DevRel) Intern",
    slug: "devrel-intern",
    department: "Community",
    location: "Remote / Part-Time",
    type: "Part-Time / Internship",
    experience: "Students / Freshers / Developers",
    salary: "Stipend + Certificate + LOR",
    status: "published",
    shortDescription: "Build the developer ecosystem around Botmartz's AI Engineering work through technical content, open-source support, and developer engagement.",
    responsibilities: "Build relationships with AI/ML developers and engineers\nCreate technical content, tutorials, demos, and developer resources\nOrganize technical workshops, hackathons, meetups, and developer events\nSupport Botmartz open-source projects and GitHub community\nEngage with developers on GitHub, Discord, LinkedIn, Reddit, and other technical communities\nResearch emerging technologies such as PyTorch, LangGraph, LangChain, Google ADK, Transformers, RAG, and AI Agents\nCollect developer feedback and communicate insights back to the engineering team\nHelp grow Botmartz as an AI Engineering developer brand, rather than simply a services company",
    requirements: "Basic programming skills in Python and familiarity with GitHub\nHands-on interest in PyTorch, LangGraph, LangChain, RAG & AI Agents\nTechnical writing skills for tutorials, demos & developer resources\nActive engagement in AI/ML communities (GitHub, Discord, Reddit)",
    niceToHave: "Pipeline for potential future AI Engineering roles at Botmartz\nDirect mentorship on building production AI systems from Principal AI Architects",
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
