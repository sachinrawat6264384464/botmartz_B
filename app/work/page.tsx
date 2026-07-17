import { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import WorkClient from './WorkClient';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Production AI Systems, Shipped & Proven | Botmartz Work',
    description: 'Case studies from enterprise clients across education, logistics, healthcare and SaaS — real production AI systems, not proofs of concept.',
    keywords: ['Production AI Systems', 'Enterprise AI Case Studies', 'AI Route Optimization', 'Clinical AI Copilot', 'EdTech AI Assistant', 'Enterprise RAG Support'],
  };
  
  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("work").get();
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
      url: 'https://botmartz.com/work',
      type: 'website',
    },
  };
}

export default async function WorkPage() {
  let heroContent = {
    badge: "Our Work",
    title: "Production AI Systems,<br><span class=\"text-[#00C6FF]\">Shipped &amp; Proven</span>",
    subtitle: "Case studies from enterprise clients across education, logistics, healthcare and SaaS — real systems in production, not proofs of concept.",
    ctaText: "Browse Case Studies →",
    ctaLink: "#cases",
  };
  let structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Production AI Systems, Shipped & Proven | Botmartz Work",
    "description": "Case studies and real production AI systems built by Botmartz across education, logistics, healthcare and SaaS.",
    "url": "https://botmartz.com/work",
    "publisher": {
      "@type": "Organization",
      "name": "Botmartz",
      "url": "https://botmartz.com"
    }
  });
  let aeoQuestion = "What kind of production AI systems has Botmartz built and deployed?";
  let aeoAnswer = "Botmartz builds and deploys production AI systems across education, logistics, healthcare, and SaaS, including AI course assistants, route optimization agents, clinical documentation copilots, enterprise RAG support platforms, warehouse computer vision inspection, and voice agents for patient intake.";

  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("work").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      if (data?.hero) heroContent = { ...heroContent, ...data.hero };
      if (data?.structuredData) structuredData = data.structuredData;
      if (data?.aeoQuestion) aeoQuestion = data.aeoQuestion;
      if (data?.aeoAnswer) aeoAnswer = data.aeoAnswer;
    }
  } catch (e) {}

  let dbCases: any[] = [];
  try {
    const snapshot = await adminDb.collection("case-studies")
      .where("status", "==", "published")
      .orderBy("createdAt", "desc")
      .get();
    dbCases = snapshot.docs.map(doc => {
        const data = doc.data();
        const formatTimestamp = (ts: any) => {
          if (!ts) return null;
          if (typeof ts.toDate === 'function') {
            return new Date(ts.toDate()).toISOString();
          }
          return new Date(ts).toISOString();
        };
        return {
          id: doc.id,
          ...data,
          createdAt: formatTimestamp(data.createdAt),
        };
    });
  } catch (err) {
    console.error("Error loading case studies:", err);
  }

  const sanitizedCases = JSON.parse(JSON.stringify(dbCases));
  const sanitizedHero = JSON.parse(JSON.stringify(heroContent));

  return (
    <WorkClient 
      heroContent={sanitizedHero}
      structuredData={structuredData}
      aeoQuestion={aeoQuestion}
      aeoAnswer={aeoAnswer}
      dbCases={sanitizedCases}
    />
  );
}