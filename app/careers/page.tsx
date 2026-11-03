import type { Metadata } from "next";
import CareersClient from "./CareersClient";
import { adminDb } from "@/lib/firebase-admin";

export const revalidate = 60; // Cache page for 60s for lightning fast performance

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Careers at Botmartz",
    description: "Botmartz Careers",
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'none',
        'max-snippet': -1,
      },
    },
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

