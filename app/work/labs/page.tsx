import { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import LabsClient from './LabsClient';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Botmartz Labs | AI Experiments & Open Source',
    description: 'Our labs is where we experiment, build, and open source production-ready AI systems that solve real problems.',
  };
  
  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("labs").get();
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
      url: 'https://www.botmartz.com/work/labs',
      type: 'website',
    },
    alternates: {
      canonical: 'https://www.botmartz.com/work/labs',
    },
  };
}

export default async function LabsPage() {
  let initialLabs: any[] = [];
  try {
    const labsRef = adminDb.collection("labs");
    const snapshot = await labsRef.where("status", "==", "active").orderBy("createdAt", "desc").get();
    const formatTimestamp = (ts: any) => {
      if (!ts) return null;
      if (typeof ts.toDate === 'function') {
        return new Date(ts.toDate()).toISOString();
      }
      return new Date(ts).toISOString();
    };
    initialLabs = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: formatTimestamp(data.createdAt),
        updatedAt: formatTimestamp(data.updatedAt),
      };
    });
  } catch (e) {
    try {
      const fallbackSnapshot = await adminDb.collection("labs").get();
      const formatTimestamp = (ts: any) => {
        if (!ts) return null;
        if (typeof ts.toDate === 'function') {
          return new Date(ts.toDate()).toISOString();
        }
        return new Date(ts).toISOString();
      };
      initialLabs = fallbackSnapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: formatTimestamp(data.createdAt),
            updatedAt: formatTimestamp(data.updatedAt),
          };
        })
        .filter((d: any) => d.status === "active");
    } catch (err) {
      console.error("Error fetching labs:", err);
    }
  }

  let heroContent = {
    badge: "BOTMARTZ LABS",
    title: "Building Today.<br /><span class=\"text-[#00C6FF]\">Engineering</span> Tomorrow.",
    subtitle: "Our labs is where we experiment, build, and open source production-ready AI systems that solve real problems. Every project is built with a focus on performance, scalability, and real-world impact.",
    ctaText: "Explore All Projects",
    ctaLink: "#labs-grid"
  };
  let structuredData = "";
  let aeoQuestion = "";
  let aeoAnswer = "";

  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("labs").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      if (data?.hero) heroContent = { ...heroContent, ...data.hero };
      if (data?.structuredData) structuredData = data.structuredData;
      if (data?.aeoQuestion) aeoQuestion = data.aeoQuestion;
      if (data?.aeoAnswer) aeoAnswer = data.aeoAnswer;
    }
  } catch (e) {}

  const sanitizedLabs = JSON.parse(JSON.stringify(initialLabs, (key, value) => {
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
    <main className="bg-[#F5F8FC] min-h-screen">
      <LabsClient 
        initialLabs={sanitizedLabs} 
        heroContent={sanitizedHero} 
        structuredData={structuredData}
        aeoQuestion={aeoQuestion}
        aeoAnswer={aeoAnswer}
      />
    </main>
  );
}
