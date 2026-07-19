import { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import CareersClient from './CareersClient';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Careers | Build the Future of AI Engineering',
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
      title: `${meta.title} | Botmartz`,
      description: meta.description,
      url: 'https://www.botmartz.com/careers',
      type: 'website',
    },
    alternates: {
      canonical: 'https://www.botmartz.com/careers',
    },
  };
}

export default async function CareersPage() {
  let initialJobs: any[] = [];
  try {
    const jobsRef = adminDb.collection("jobs");
    const snapshot = await jobsRef.where("status", "==", "active").orderBy("createdAt", "desc").get();
    const formatTimestamp = (ts: any) => {
      if (!ts) return null;
      if (typeof ts.toDate === 'function') {
        return new Date(ts.toDate()).toISOString();
      }
      return new Date(ts).toISOString();
    };
    initialJobs = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: formatTimestamp(data.createdAt),
      };
    });
  } catch (e) {
    try {
      const fallbackSnapshot = await adminDb.collection("jobs").get();
      const formatTimestamp = (ts: any) => {
        if (!ts) return null;
        if (typeof ts.toDate === 'function') {
          return new Date(ts.toDate()).toISOString();
        }
        return new Date(ts).toISOString();
      };
      initialJobs = fallbackSnapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: formatTimestamp(data.createdAt),
          };
        })
        .filter((d: any) => d.status === "active");
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  }

  let heroContent = {
    badge: "Careers at Botmartz",
    title: "Build the Future of<br /><span class=\"text-[#00C6FF]\">AI Engineering</span> With Us",
    subtitle: "We're a small team of engineers shipping production AI systems and building the community around them. If you'd rather build than talk about building, you'll fit right in.",
    ctaText: "View Open Roles →",
    ctaLink: "#roles",
  };
  let structuredData = "";
  let aeoQuestion = "";
  let aeoAnswer = "";

  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("careers").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      if (data?.hero) heroContent = { ...heroContent, ...data.hero };
      if (data?.structuredData) structuredData = data.structuredData;
      if (data?.aeoQuestion) aeoQuestion = data.aeoQuestion;
      if (data?.aeoAnswer) aeoAnswer = data.aeoAnswer;
    }
  } catch (e) {}

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

  const sanitizedHero = JSON.parse(JSON.stringify(heroContent));

  return (
    <CareersClient 
      initialJobs={sanitizedJobs} 
      heroContent={sanitizedHero}
      structuredData={structuredData}
      aeoQuestion={aeoQuestion}
      aeoAnswer={aeoAnswer}
    />
  );
}
