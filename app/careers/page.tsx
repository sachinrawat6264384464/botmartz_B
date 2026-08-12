import CareersClient from "./CareersClient";
import { adminDb } from "@/lib/firebase-admin";

export const revalidate = 60; // Revalidate every minute

async function getPublishedJobs() {
  try {
    const snap = await adminDb
      .collection("jobs")
      .where("status", "in", ["active", "published"])
      .get();

    const jobs: any[] = [];
    snap.forEach((doc) => {
      const data = doc.data();
      // Sanitize Firestore Timestamp objects for Next.js Client Components
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
