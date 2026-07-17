import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { adminDb } from '@/lib/firebase-admin';
import CaseStudyDetailClient from './CaseStudyDetailClient';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

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
    notFound();
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
    createdAt: formatTimestamp(study.createdAt),
    updatedAt: formatTimestamp(study.updatedAt),
  }));
  
  return <CaseStudyDetailClient study={sanitizedStudy} />;
}
