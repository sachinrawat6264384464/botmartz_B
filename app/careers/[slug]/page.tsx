import CareerDetailClient from "./CareerDetailClient";
import { adminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getJobBySlug(slug: string) {
  try {
    const snap = await adminDb
      .collection("jobs")
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (!snap.empty) {
      const doc = snap.docs[0];
      const data = doc.data();
      return JSON.parse(JSON.stringify({ id: doc.id, ...data }));
    }
  } catch (err) {
    console.error("Error fetching job by slug:", err);
  }
  return null;
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  return <CareerDetailClient job={job || { id: 'default', title: slug, slug }} />;
}
