import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

const DEFAULT_JOBS = [
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
    niceToHave: "Experience with production multi-agent deployment.",
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
    niceToHave: "Experience with LangGraph, hybrid search, and evaluation suites.",
    createdAt: new Date().toISOString()
  },
  {
    title: "Graphic Designer",
    slug: "graphic-designer",
    department: "Design",
    location: "Remote / Flexible",
    type: "Part-Time / Internship",
    experience: "Students / Freshers / Designers",
    salary: "Unpaid (Certificate + LOR)",
    status: "published",
    shortDescription: "Create visual identity & communication assets across social media, events, workshops, campaigns, and websites.",
    responsibilities: "Create social media graphics, event posters, and workshop banners\nDesign speaker announcement & recruitment creatives\nDesign carousel posts and promotional materials\nDesign certificates and recognition material when required\nMaintain visual consistency across Botmartz platforms\nDevelop reusable design templates and experiment with AI-assisted design workflows",
    requirements: "Experience with tools such as Figma, Canva, Adobe Photoshop, Illustrator, or Adobe Express\nStrong eye for typography, alignment, and visual hierarchy\nAttention to detail, creativity, consistency, and reliability",
    niceToHave: "Figma component design experience\nPortfolio demonstrating visual branding work",
    createdAt: new Date().toISOString()
  },
  {
    title: "Event Organizer",
    slug: "event-organizer",
    department: "Community",
    location: "Remote / Flexible",
    type: "Part-Time / Internship",
    experience: "Students / Freshers",
    salary: "Unpaid (Certificate + LOR)",
    status: "published",
    shortDescription: "Plan and execute Botmartz Community events, technical sessions, workshops, webinars, hackathons, and meetups.",
    responsibilities: "Identify potential event opportunities and plan timelines\nCoordinate with speakers, colleges, and developer communities\nManage event registrations and prepare checklists\nCoordinate promotional activities with social media and design teams\nTrack event deliverables and collect post-event feedback",
    requirements: "Extremely organized and comfortable communicating professionally\nGood at follow-ups and working under deadlines\nProactive, reliable, and detail-oriented",
    niceToHave: "Prior experience organizing college tech fests or community meetups",
    createdAt: new Date().toISOString()
  },
  {
    title: "Developer Relations (DevRel) Intern",
    slug: "devrel-intern",
    department: "Community",
    location: "Remote / Part-Time",
    type: "Part-Time / Internship",
    experience: "Students / Freshers / Developers",
    salary: "Unpaid (Certificate + LOR)",
    status: "published",
    shortDescription: "Connect developers, technical communities, and open-source projects with Botmartz AI initiatives.",
    responsibilities: "Research emerging developer technologies (AI/ML, GenAI, RAG, Agentic AI, LLMs)\nIdentify interesting open-source projects and potential technical speakers\nConnect with developers and technical communities\nHelp organize technical sessions and developer workshops\nUnderstand technologies well enough to communicate their value\nGather developer feedback and identify community pain points",
    requirements: "Interest in AI/ML, RAG, Agentic AI, LLMs, Cloud, APIs, and Open Source\nCuriosity and initiative: 'I don't know this yet, but I'll learn it'\nClear written and spoken communication skills",
    niceToHave: "Active GitHub profile or technical blogs",
    createdAt: new Date().toISOString()
  },
  {
    title: "Brand & Partnerships",
    slug: "brand-partnerships",
    department: "Business & Growth",
    location: "Remote / Flexible",
    type: "Part-Time / Internship",
    experience: "Students / Freshers",
    salary: "Unpaid (Certificate + LOR)",
    status: "published",
    shortDescription: "Build relationships between Botmartz and colleges, communities, startups, companies, and event sponsors.",
    responsibilities: "Research potential partners, colleges, and tech communities\nIdentify potential event partners and sponsors\nConduct professional outreach and draft partnership proposals\nSchedule meetings and follow up professionally\nExplore collaboration opportunities for Botmartz AI Solutions",
    requirements: "Confident communicator and professional writer\nResearch-oriented and persistent with outreach\nInterest in business, technology, and partnerships",
    niceToHave: "Prior sponsorship or outreach experience",
    createdAt: new Date().toISOString()
  },
  {
    title: "Video Editor & Photographer",
    slug: "video-editor-photographer",
    department: "Design & Media",
    location: "Remote / Flexible",
    type: "Part-Time / Internship",
    experience: "Students / Freshers",
    salary: "Unpaid (Certificate + LOR)",
    status: "published",
    shortDescription: "Transform Botmartz activities, events, workshops, projects, and people into high-quality visual stories.",
    responsibilities: "Edit short-form videos, reels, event highlights, and educational clips\nCreate speaker clips, promotional videos, and community recaps\nEdit workshop recordings, add captions/subtitles, and improve pacing\nOrganize media assets and capture event photos when applicable",
    requirements: "Experience with Premiere Pro, DaVinci Resolve, After Effects, CapCut, or Final Cut Pro\nStrong storytelling ability and sense of pacing",
    niceToHave: "Experience with audio editing and thumbnail creation",
    createdAt: new Date().toISOString()
  },
  {
    title: "Social Media Manager",
    slug: "social-media-manager",
    department: "Marketing",
    location: "Remote / Flexible",
    type: "Part-Time / Internship",
    experience: "Prior Experience Preferred",
    salary: "Unpaid (Certificate + LOR)",
    status: "published",
    shortDescription: "Manage and strategically grow Botmartz's presence across LinkedIn, Instagram, X, and community channels.",
    responsibilities: "Manage social media calendars, plan content, and schedule posts\nCoordinate with designers and writers\nTrack engagement, analyze content performance, and identify trends\nDevelop content strategies to improve reach and engagement\nPromote events, workshops, projects, and community members",
    requirements: "Prior experience in social media growth, content strategy, and analytics\nDeep understanding of LinkedIn and Instagram content algorithms\nConsistency, accountability, and metric-driven execution",
    niceToHave: "Demonstrated portfolio of social media account growth",
    createdAt: new Date().toISOString()
  },
  {
    title: "Content Writer",
    slug: "content-writer",
    department: "Content",
    location: "Remote / Flexible",
    type: "Part-Time / Internship",
    experience: "Students / Freshers",
    salary: "Unpaid (Certificate + LOR)",
    status: "published",
    shortDescription: "Communicate what Botmartz is building through technical, educational, community, and business-oriented content.",
    responsibilities: "Write technical articles, LinkedIn posts, captions, and event descriptions\nWrite workshop announcements, newsletters, and community announcements\nResearch technical topics in AI, GenAI, RAG, and Agentic AI\nProofread and edit content, working with designers on carousels",
    requirements: "Interest in AI, Generative AI, RAG, Agentic AI, and Software Development\nAccurate, useful, original, and well-researched writing style\nStrong grammar and editing skills",
    niceToHave: "Published tech blogs or articles",
    createdAt: new Date().toISOString()
  },
  {
    title: "Community Management Intern",
    slug: "community-management-intern",
    department: "Community",
    location: "Remote / Part-Time",
    type: "Part-Time / Internship",
    experience: "Students / Freshers",
    salary: "Unpaid (Certificate + LOR)",
    status: "published",
    shortDescription: "Help us build and grow the Botmartz AI Engineering Community of AI engineers, developers, and students.",
    responsibilities: "Manage and grow our Discord, Telegram, and WhatsApp community of AI engineers and students\nEngage actively with developers, students, and AI enthusiasts\nCoordinate workshops, webinars, and community meetups\nCreate announcements, community updates, and educational posts\nSupport key community initiatives like AI Accelerator and AI Frontier",
    requirements: "Active presence on developer and AI community channels\nPassionate about community building, AI, and developer engagement\nStrong written and verbal communication skills",
    niceToHave: "Prior experience managing tech communities or Discord servers\nExposure to AI/ML ecosystems",
    createdAt: new Date().toISOString()
  }
];

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const resetParam = url.searchParams.get("reset");
    const isReset = resetParam === "true";

    const jobsRef = adminDb.collection("jobs");
    const snap = await jobsRef.get();

    // If reset requested or if duplicates exist, wipe and re-seed clean set
    if (isReset || snap.size > 10) {
      const batchDeletes = snap.docs.map(doc => doc.ref.delete());
      await Promise.all(batchDeletes);

      for (const job of DEFAULT_JOBS) {
        await jobsRef.add(job);
      }

      return NextResponse.json({
        success: true,
        message: `Database reset & deduplicated cleanly to ${DEFAULT_JOBS.length} positions.`,
        addedCount: DEFAULT_JOBS.length,
        totalJobs: DEFAULT_JOBS.length
      });
    }

    // Collect existing slugs and titles (normalized)
    const existingSlugs = new Set(snap.docs.map(doc => (doc.data().slug || "").toLowerCase().trim()));
    const existingTitles = new Set(snap.docs.map(doc => (doc.data().title || "").toLowerCase().trim()));

    let addedCount = 0;

    for (const job of DEFAULT_JOBS) {
      const normSlug = job.slug.toLowerCase().trim();
      const normTitle = job.title.toLowerCase().trim();

      if (!existingSlugs.has(normSlug) && !existingTitles.has(normTitle)) {
        await jobsRef.add(job);
        existingSlugs.add(normSlug);
        existingTitles.add(normTitle);
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

