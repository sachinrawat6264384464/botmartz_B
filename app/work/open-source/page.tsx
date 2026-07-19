import { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import OpenSourceClient from './OpenSourceClient';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Open Source | AI Engineering Labs & Repositories',
    description: "Open Source is in our DNA. We believe sharing code accelerates innovation. Explore our production RAG frameworks, agent libraries, and developer tools.",
  };
  
  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("open_source").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      if (data?.metadata) {
        meta = { ...meta, ...data.metadata };
        if (meta.description && meta.description.length > 155) {
          meta.description = meta.description.substring(0, 152) + '...';
        }
      }
    }
  } catch (e) {}

  return {
    ...meta,
    openGraph: {
      title: `${meta.title} | Botmartz`,
      description: meta.description,
      url: 'https://www.botmartz.com/work/open-source',
      type: 'website',
    },
    alternates: {
      canonical: 'https://www.botmartz.com/work/open-source',
    },
  };
}

export default async function OpenSourcePage() {
  let initialRepos: any[] = [];
  try {
    const reposSnap = await adminDb.collection("open_source").where("status", "==", "active").orderBy("stars", "desc").get();
    reposSnap.forEach(doc => {
      initialRepos.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    try {
      const fallbackSnap = await adminDb.collection("open_source").get();
      initialRepos = fallbackSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err) {}
  }

  let heroContent = {
    badge: "Open Source",
    title: "Open Source Is<br />in Our <span class=\"text-[#00C6FF]\">DNA</span>",
    subtitle: "We believe sharing knowledge and code accelerates innovation for everyone. Every lab we're proud of eventually ships as an open-source repo.",
    ctaText: "Browse Repositories →",
    ctaLink: "#repos",
  };
  let structuredData = "";
  let aeoQuestion = "";
  let aeoAnswer = "";

  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("open_source").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      if (data?.hero) heroContent = { ...heroContent, ...data.hero };
      if (data?.structuredData) structuredData = data.structuredData;
      if (data?.aeoQuestion) aeoQuestion = data.aeoQuestion;
      if (data?.aeoAnswer) aeoAnswer = data.aeoAnswer;
    }
  } catch (e) {}

  const sanitizedRepos = JSON.parse(JSON.stringify(initialRepos, (key, value) => {
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
    <OpenSourceClient 
      initialRepos={sanitizedRepos} 
      heroContent={sanitizedHero}
      structuredData={structuredData}
      aeoQuestion={aeoQuestion}
      aeoAnswer={aeoAnswer}
    />
  );
}
