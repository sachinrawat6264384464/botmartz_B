import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

const DEFAULT_GALLERY = [
  {
    id: "default-1",
    url: "/gallery/gallery-1.jpg",
    title: "AI Frontier Summit 2026",
    category: "AI Frontier",
    caption: "Engineers and founders discussing production RAG architectures.",
    createdAt: "2026-08-23",
  },
  {
    id: "default-2",
    url: "/gallery/gallery-2.jpg",
    title: "Agentic AI Engineering Sprint",
    category: "Workshops",
    caption: "Hands-on PyTorch & LangGraph multi-agent systems build lab.",
    createdAt: "2026-08-22",
  },
  {
    id: "default-3",
    url: "/gallery/gallery-3.jpg",
    title: "Developer Community Keynote",
    category: "AI Frontier",
    caption: "Keynote presentation on autonomous AI agents and tool routing.",
    createdAt: "2026-08-21",
  },
  {
    id: "default-4",
    url: "/gallery/gallery-4.jpg",
    title: "AI Accelerator Live Workshop",
    category: "Workshops",
    caption: "Step-by-step vector database optimization and hybrid retrieval.",
    createdAt: "2026-08-20",
  },
  {
    id: "default-5",
    url: "/gallery/gallery-5.jpg",
    title: "Botmartz Team Collaboration",
    category: "Behind The Scenes",
    caption: "Architecting zero-latency document extraction pipelines.",
    createdAt: "2026-08-19",
  },
  {
    id: "default-6",
    url: "/gallery/gallery-6.jpg",
    title: "Community Hackathon Spotlight",
    category: "Community Meetups",
    caption: "Participants pitching live production AI agent projects.",
    createdAt: "2026-08-18",
  },
  {
    id: "default-7",
    url: "/gallery/gallery-7.jpg",
    title: "AI Founders Roundtable",
    category: "Community Meetups",
    caption: "Networking session with AI startup founders and researchers.",
    createdAt: "2026-08-17",
  },
  {
    id: "default-8",
    url: "/gallery/gallery-8.jpg",
    title: "Masterclass Q&A Session",
    category: "Workshops",
    caption: "In-depth Q&A on fine-tuning open-weights models and eval metrics.",
    createdAt: "2026-08-16",
  },
  {
    id: "default-9",
    url: "/gallery/gallery-9.jpg",
    title: "AI Engineering Bootcamp Certificate Ceremony",
    category: "AI Frontier",
    caption: "Celebrating attendees completing the AI Accelerator Bootcamp.",
    createdAt: "2026-08-15",
  },
  {
    id: "default-10",
    url: "/gallery/gallery-10.jpg",
    title: "Interactive Code Review Session",
    category: "Workshops",
    caption: "Live code walkthrough of multi-agent state persistence.",
    createdAt: "2026-08-14",
  },
  {
    id: "default-11",
    url: "/gallery/gallery-11.jpg",
    title: "Botmartz Community Meetup",
    category: "Community Meetups",
    caption: "Developers gathering for lightning talks on LLM eval frameworks.",
    createdAt: "2026-08-13",
  },
  {
    id: "default-12",
    url: "/gallery/gallery-12.jpg",
    title: "AI Builders Night & Afterparty",
    category: "Behind The Scenes",
    caption: "Unwinding after an intense 2-day AI Frontier conference.",
    createdAt: "2026-08-12",
  },
];

export async function GET() {
  try {
    let customImages: any[] = [];
    try {
      const snap = await adminDb.collection("gallery_images").orderBy("createdAt", "desc").get();
      customImages = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      console.warn("Could not fetch Firestore gallery images:", err);
    }

    const allImages = [...customImages, ...DEFAULT_GALLERY];
    return NextResponse.json({ success: true, images: allImages }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
