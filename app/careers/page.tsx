import CareersClient from "./CareersClient";
import { adminDb } from "@/lib/firebase-admin";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
