import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { adminDb } from '@/lib/firebase-admin';
import CaseStudyDetailClient from './CaseStudyDetailClient';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const STATIC_CASE_STUDIES: Record<string, any> = {
  "logistics-rag": {
    title: "Enterprise Knowledge Search for Global Logistics Company",
    excerpt: "Built a secure, enterprise RAG system to unify and search across 100M+ freight documents, SOPs, FAQs, and regulations.",
    category: "ENTERPRISE RAG",
    clientName: "Global Logistics Leader",
    status: "published",
    challenge: "Retrieving freight documents and custom regulations was slow, causing warehouse delays and incorrect customs filings.",
    approach: [
      { n: "1", title: "Data Collection", desc: "Aggregated SOPs, PDFs, and freight manifests." },
      { n: "2", title: "Semantic Parsing", desc: "Configured hybrid search chunking for domain terminology." }
    ],
    outcome: "Reduced search latency by 70%, automating lookup for packer operators.",
    stack: ["LangChain", "Pinecone", "FastAPI", "React"],
    metrics: [
      { value: "70%", label: "Faster information retrieval" },
      { value: "60%", label: "Reduction in support tickets" }
    ],
    visualType: "dashboard"
  },
  "saas-support": {
    title: "AI Support Agent for SaaS Customer Support",
    excerpt: "Developed an autonomous AI support agent that resolves customer queries end-to-end via context, tools, and human escalation.",
    category: "AI AGENTS",
    clientName: "SaaS Support Team",
    status: "published",
    challenge: "High volume of repetitive L1 support tickets delaying complex customer queries.",
    approach: [
      { n: "1", title: "Workflow Mapping", desc: "Designed LangGraph state machines for query routing." },
      { n: "2", title: "API Integration", desc: "Connected Zendesk and database query tools." }
    ],
    outcome: "45% of support requests resolved autonomously, decreasing response times.",
    stack: ["LangGraph", "OpenAI", "FastAPI", "Redis"],
    metrics: [
      { value: "45%", label: "Queries resolved automatically" },
      { value: "35%", label: "Reduced response time" }
    ],
    visualType: "workflow"
  },
  "legal-doc-intel": {
    title: "Legal Document Intelligence Platform",
    excerpt: "Automated contract analysis and Q&A across 100K+ legal documents with 95%+ accuracy using advanced RAG and OCR.",
    category: "ENTERPRISE RAG",
    clientName: "Corporate Legal Group",
    status: "published",
    challenge: "Reviewing thousands of active vendor agreements for compliance clauses was slow and error-prone.",
    approach: [
      { n: "1", title: "OCR pipeline", desc: "High-accuracy PDF text extraction." },
      { n: "2", title: "Clause Mapping", desc: "Extracted legal clauses and risk metrics automatically." }
    ],
    outcome: "Reduced contract review time by 90%, with 95% audit accuracy.",
    stack: ["LlamaIndex", "OCR", "React", "AWS"],
    metrics: [
      { value: "90%", label: "Time saved in analysis" },
      { value: "95%", label: "Extraction accuracy" }
    ],
    visualType: "document"
  },
  "logistics-planner": {
    title: "Logistics Planner Agent for Global Supply Chain",
    excerpt: "AI agent that plans optimal routes, books shipments, and monitors disruptions in real-time.",
    category: "AI AGENTS",
    clientName: "Freight Supply Chain Co.",
    status: "published",
    challenge: "Frequent weather and harbor delays causing late deliveries and manual shipping re-bookings.",
    approach: [
      { n: "1", title: "Real-time feeds", desc: "Ingested shipping tracking API logs." },
      { n: "2", title: "Agentic Planner", desc: "Automated alternative route bookings." }
    ],
    outcome: "Increased on-time shipping delivery to 92%.",
    stack: ["LangChain", "Maps API", "PostgreSQL", "Next.js"],
    metrics: [
      { value: "28%", label: "Improved on-time delivery" },
      { value: "22%", label: "Lower logistics cost" }
    ],
    visualType: "map"
  },
  "ai-course-assistant-for-edtech-platform": {
    title: "AI Course Assistant for EdTech Platform",
    excerpt: "An always-on assistant that answers doubts, grades quizzes, and tracks learner progress.",
    category: "EDUCATION",
    clientName: "EdTech Academy",
    status: "published",
    challenge: "Students waiting up to 24 hours for teaching assistants to answer coding and math doubts.",
    approach: [
      { n: "1", title: "Context Ingestion", desc: "Indexed textbooks, video transcripts, and code repos." },
      { n: "2", title: "Agent Integration", desc: "Built interactive web UI with real-time feedback." }
    ],
    outcome: "Doubt resolution speed increased 3x with positive student ratings.",
    stack: ["OpenAI", "FastAPI", "React", "Pinecone"],
    metrics: [
      { value: "3x", label: "Faster doubt resolution" },
      { value: "92%", label: "Student satisfaction rating" }
    ],
    visualType: "workflow"
  },
  "route-optimization-agent-for-fleet-ops": {
    title: "Route Optimization Agent for Fleet Ops",
    excerpt: "An agent system that re-plans delivery routes in real time against traffic and demand.",
    category: "LOGISTICS",
    clientName: "Fleet Logistics Corp",
    status: "published",
    challenge: "Static route planning causing fuel wastage and delayed deliveries.",
    approach: [
      { n: "1", title: "Traffic analysis", desc: "Connected live traffic maps APIs." },
      { n: "2", title: "Optimization loops", desc: "Calculated route adjustments in real-time." }
    ],
    outcome: "Reduced fuel usage and route duration across the active fleet.",
    stack: ["LangGraph", "FastAPI", "PostgreSQL", "Google Maps"],
    metrics: [
      { value: "18%", label: "Lower fuel cost" },
      { value: "25%", label: "On-time arrival boost" }
    ],
    visualType: "map"
  },
  "clinical-documentation-copilot": {
    title: "Clinical Documentation Copilot",
    excerpt: "Ambient documentation assistant that drafts clinical notes from patient conversations.",
    category: "HEALTHCARE",
    clientName: "Metro Clinic Network",
    status: "published",
    challenge: "Physicians spending 3+ hours daily typing SOAP notes and clinical charts.",
    approach: [
      { n: "1", title: "Speech parsing", desc: "Whisper-based audio transcript processing." },
      { n: "2", title: "SOAP mapping", desc: "Extracted medical symptoms and structured into charts." }
    ],
    outcome: "Doctors saved 40% of administrative overhead, spending more time with patients.",
    stack: ["Whisper API", "GPT-4", "FastAPI", "HIPAA Cloud"],
    metrics: [
      { value: "40%", label: "Less admin time" },
      { value: "99.5%", label: "Accuracy of note drafts" }
    ],
    visualType: "document"
  },
  "enterprise-rag-for-support-teams": {
    title: "Enterprise RAG for Support Teams",
    excerpt: "A production RAG platform giving support agents instant, cited answers from internal docs.",
    category: "SAAS & TECHNOLOGY",
    clientName: "Support Tech Inc",
    status: "published",
    challenge: "Support agents spending 10 minutes looking up product specs and wikis for customers.",
    approach: [
      { n: "1", title: "Vector Search", desc: "Indexed all internal product manuals and PDFs." },
      { n: "2", title: "Citation engine", desc: "Highlighted source documents for all answers." }
    ],
    outcome: "Resolved customer support tickets 55% faster.",
    stack: ["LangChain", "Pinecone", "Next.js", "Python"],
    metrics: [
      { value: "55%", label: "Faster resolution" },
      { value: "90%", label: "CSAT score" }
    ],
    visualType: "dashboard"
  },
  "warehouse-vision-inspection": {
    title: "Warehouse Vision Inspection",
    excerpt: "Computer-vision quality checks replacing manual inspection on the packing line.",
    category: "LOGISTICS",
    clientName: "Pack & Ship Logistics",
    status: "published",
    challenge: "Manual Packers missing critical packaging defects, causing returns.",
    approach: [
      { n: "1", title: "Camera setup", desc: "Installed packers line video captures." },
      { n: "2", title: "Model training", desc: "Trained custom YOLOV8 defect identifier." }
    ],
    outcome: "Defect catch rate increased to 99.2% on active packing lines.",
    stack: ["PyTorch", "OpenCV", "FastAPI", "React"],
    metrics: [
      { value: "99.2%", label: "Defect catch rate" },
      { value: "0.2s", label: "Inspection speed" }
    ],
    visualType: "dashboard"
  },
  "patient-intake-voice-agent": {
    title: "Patient Intake Voice Agent",
    excerpt: "A voice agent that handles intake, scheduling and insurance verification calls.",
    category: "HEALTHCARE",
    clientName: "Care Providers Inc",
    status: "published",
    challenge: "Patient call centers overwhelmed with scheduling and insurance validation requests.",
    approach: [
      { n: "1", title: "Voice Pipeline", desc: "Twilio telephony integrations with TTS/STT." },
      { n: "2", title: "Insurance verify", desc: "Connected automated API query validation." }
    ],
    outcome: "Automated 2,000+ patient incoming calls monthly, saving staff overhead.",
    stack: ["Twilio", "FastAPI", "OpenAI", "PostgreSQL"],
    metrics: [
      { value: "2,000+", label: "Calls automated/month" },
      { value: "75%", label: "Reduced wait time" }
    ],
    visualType: "workflow"
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let study: any = null;
  
  try {
    const querySnapshot = await adminDb.collection("case-studies")
      .where("slug", "==", slug)
      .limit(1)
      .get();
      
    if (!querySnapshot.empty) {
      study = querySnapshot.docs[0].data();
    }
  } catch (e) {
    console.error("Error generating metadata for case study:", e);
  }
  
  if (!study && STATIC_CASE_STUDIES[slug]) {
    study = STATIC_CASE_STUDIES[slug];
  }
  
  if (!study) {
    return {
      title: "Case Study | Botmartz",
      description: "Explore our AI implementations and case studies.",
    };
  }
  
  return {
    title: `${study.title} | Botmartz AI Case Study`,
    description: study.excerpt || `Read how Botmartz delivered results for ${study.clientName || 'our client'}.`,
    openGraph: {
      title: `${study.title} | Botmartz AI Case Study`,
      description: study.excerpt || `Read how Botmartz delivered results for ${study.clientName || 'our client'}.`,
      url: `https://botmartz.com/work/case-studies/${slug}`,
      type: "article",
    }
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  let study: any = null;
  let studyId: string = "";
  
  try {
    const querySnapshot = await adminDb.collection("case-studies")
      .where("slug", "==", slug)
      .limit(1)
      .get();
      
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      study = doc.data();
      studyId = doc.id;
    }
  } catch (e) {
    console.error("Error fetching case study:", e);
  }
  
  if (!study) {
    if (STATIC_CASE_STUDIES[slug]) {
      study = STATIC_CASE_STUDIES[slug];
      studyId = `static-${slug}`;
    } else {
      notFound();
    }
  }
  
  const formatTimestamp = (ts: any) => {
    if (!ts) return null;
    if (typeof ts.toDate === 'function') {
      return new Date(ts.toDate()).toISOString();
    }
    return new Date(ts).toISOString();
  };

  const sanitizedStudy = JSON.parse(JSON.stringify({
    id: studyId,
    ...study,
    createdAt: formatTimestamp(study.createdAt || new Date()),
    updatedAt: formatTimestamp(study.updatedAt || new Date()),
  }));
  
  return <CaseStudyDetailClient study={sanitizedStudy} />;
}
