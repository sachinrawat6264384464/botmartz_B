import type { Metadata } from "next";
import CareerDetailClient from "./CareerDetailClient";
import { adminDb } from "@/lib/firebase-admin";

export const revalidate = 60;

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  const title = job?.title ? `${job.title} | Botmartz Careers` : "Job Position | Botmartz Careers";
  const description = job?.shortDescription || job?.desc || "Apply for open engineering and community positions at Botmartz AI Solutions.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.botmartz.com/careers/${slug}`,
      type: "website",
      images: [
        {
          url: "/BotmartznewBot.png",
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/BotmartznewBot.png"]
    },
    alternates: {
      canonical: `https://www.botmartz.com/careers/${slug}`
    }
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  return <CareerDetailClient job={job || { id: 'default', title: slug, slug }} />;
}

