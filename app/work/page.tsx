import { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import WorkClient from './WorkClient';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Our Work & Reference Implementations',
    description: 'Explore our innovation labs, reference architectures, and engineering methodology for shipping reliable AI systems in production.',
    keywords: ['Production AI Systems', 'Enterprise AI Reference Implementations', 'Insurance Intelligence Lab', 'Enterprise RAG Systems', 'Agentic Workflows'],
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
      title: `${meta.title} | Botmartz`,
      description: meta.description,
      url: 'https://www.botmartz.com/work',
      type: 'website',
    },
    alternates: {
      canonical: 'https://www.botmartz.com/work',
    },
  };
}

export default async function WorkPage() {
  let heroContent = {
    badge: "Our Work",
    title: "Production AI Systems,<br><span class=\"text-[#00C6FF]\">Shipped &amp; Proven</span>",
    subtitle: "Explore our innovation labs, open-source AI projects, and engineering methodology for shipping real systems in production.",
    ctaText: "Explore Labs →",
    ctaLink: "/work/labs",
  };
  let structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Our Work & Reference Implementations | Botmartz",
    "description": "Explore innovation labs, reference architectures, and production AI implementations built by Botmartz.",
    "url": "https://www.botmartz.com/work",
    "publisher": {
      "@type": "Organization",
      "name": "Botmartz",
      "url": "https://www.botmartz.com"
    }
  });
  let aeoQuestion = "What kind of production AI systems does Botmartz build?";
  let aeoAnswer = "Botmartz builds and deploys production AI systems across enterprise knowledge retrieval, agentic workflow automation, insurance and policy intelligence, and modern AI engineering architectures.";

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