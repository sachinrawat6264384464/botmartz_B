import type { Metadata } from "next";
import CareersClient from "./CareersClient";
import { adminDb } from "@/lib/firebase-admin";

export const revalidate = 60; // Cache page for 60s for lightning fast performance

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Careers at Botmartz | Join Our AI Engineering Team",
    description: "Explore open job positions and engineering roles at Botmartz. Build production AI systems, enterprise RAG, and autonomous agents with our team.",
    keywords: [
      "Botmartz Careers",
      "AI Engineering Jobs",
      "Software Engineer Jobs",
      "Developer Relations",
      "Graphic Designer Jobs",
      "Remote AI Jobs",
      "Production AI Team"
    ],
    openGraph: {
      title: "Careers at Botmartz | Join Our AI Engineering Team",
      description: "Explore open job positions and engineering roles at Botmartz. Build production AI systems, enterprise RAG, and autonomous agents with our team.",
      url: "https://www.botmartz.com/careers",
      siteName: "Botmartz",
      images: [
        {
          url: "/BotmartznewBot.png",
          width: 1200,
          height: 630,
          alt: "Careers at Botmartz AI Solutions"
        }
      ],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: "Careers at Botmartz | Join Our AI Engineering Team",
      description: "Explore open job positions and engineering roles at Botmartz. Build production AI systems, enterprise RAG, and autonomous agents with our team.",
      images: ["/BotmartznewBot.png"]
    },
    alternates: {
      canonical: "https://www.botmartz.com/careers"
    }
  };
}

async function getPublishedJobs() {
  try {
    const snap = await adminDb
      .collection("jobs")
      .get();

    const jobs: any[] = [];
    snap.forEach((doc) => {
      const data = doc.data();
      // Exclude explicitly drafted/archived/inactive/closed/suspended jobs
      if (data.status === 'draft' || data.status === 'archived' || data.status === 'inactive' || data.status === 'closed' || data.status === 'suspended') {
        return;
      }
      const plainObj = JSON.parse(JSON.stringify({ id: doc.id, ...data }));
      jobs.push(plainObj);
    });
    return jobs;
  } catch (err) {
    console.error("Error loading published jobs for /careers:", err);
    return [];
  }
}

export default async function CareersPage() {
  const jobs = await getPublishedJobs();
  return <CareersClient initialJobs={jobs} />;
}

