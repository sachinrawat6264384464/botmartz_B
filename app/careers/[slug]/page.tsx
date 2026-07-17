import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { adminDb } from '@/lib/firebase-admin';
import CareerDetailClient from './CareerDetailClient';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let job: any = null;
  
  try {
    const querySnapshot = await adminDb.collection("jobs")
      .where("slug", "==", slug)
      .limit(1)
      .get();
      
    if (!querySnapshot.empty) {
      job = querySnapshot.docs[0].data();
    }
  } catch (e) {
    console.error("Error generating metadata for job:", e);
  }
  
  if (!job) {
    return {
      title: "Job Opening | Botmartz",
      description: "Explore career opportunities at Botmartz.",
    };
  }
  
  return {
    title: `${job.title} | Careers at Botmartz`,
    description: job.shortDescription || `Join Botmartz as a ${job.title}. Learn more about the role and apply.`,
    openGraph: {
      title: `${job.title} | Careers at Botmartz`,
      description: job.shortDescription || `Join Botmartz as a ${job.title}. Learn more about the role and apply.`,
      url: `https://botmartz.com/careers/${slug}`,
      type: "website",
    }
  };
}

export default async function CareerDetailPage({ params }: Props) {
  const { slug } = await params;
  let job: any = null;
  let jobId: string = "";
  
  try {
    const querySnapshot = await adminDb.collection("jobs")
      .where("slug", "==", slug)
      .limit(1)
      .get();
      
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      job = doc.data();
      jobId = doc.id;
    }
  } catch (e) {
    console.error("Error fetching job opening:", e);
  }
  
  if (!job) {
    notFound();
  }
  
  const formatTimestamp = (ts: any) => {
    if (!ts) return null;
    if (typeof ts.toDate === 'function') {
      return new Date(ts.toDate()).toISOString();
    }
    return new Date(ts).toISOString();
  };

  // Clean dates and parse data for client component
  const sanitizedJob = JSON.parse(JSON.stringify({
    id: jobId,
    ...job,
    createdAt: formatTimestamp(job.createdAt),
    updatedAt: formatTimestamp(job.updatedAt),
  }));
  
  return <CareerDetailClient job={sanitizedJob} />;
}
