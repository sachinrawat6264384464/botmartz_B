import { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import CareersClient from './CareersClient';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Careers at Botmartz | Build the Future of AI Engineering',
    description: "We're a small team of engineers shipping production AI systems and building the community around them. View open roles and join us.",
  };
  
  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("careers").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      if (data?.metadata) {
        meta = { ...meta, ...data.metadata };
      }
    }
  } catch (e) {}

  return {
    ...meta,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: 'https://botmartz.com/careers',
      type: 'website',
    },
  };
}

export default async function CareersPage() {
  let initialJobs: any[] = [];
  try {
    const jobsRef = adminDb.collection("jobs");
    const snapshot = await jobsRef.where("status", "==", "active").orderBy("createdAt", "desc").get();
    initialJobs = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt ? new Date(data.createdAt.toDate()).toISOString() : null,
      };
    });
  } catch (e) {
    try {
      const fallbackSnapshot = await adminDb.collection("jobs").get();
      initialJobs = fallbackSnapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt ? new Date(data.createdAt.toDate()).toISOString() : null,
          };
        })
        .filter((d: any) => d.status === "active");
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  }

  const sanitizedJobs = JSON.parse(JSON.stringify(initialJobs, (key, value) => {
    if (value && typeof value === 'object' && ('_seconds' in value || 'seconds' in value) && ('_nanoseconds' in value || 'nanoseconds' in value)) {
      const sec = value._seconds ?? value.seconds;
      return new Date(sec * 1000).toISOString();
    }
    if (value && typeof value.toDate === 'function') {
      return value.toDate().toISOString();
    }
    return value;
  }));

  return <CareersClient initialJobs={sanitizedJobs} />;
}
