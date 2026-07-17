import { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import OpenSourceClient from './OpenSourceClient';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Open Source | Botmartz AI Engineering Labs & Repositories',
    description: "Open Source is in our DNA. We believe sharing knowledge and code accelerates innovation for everyone. Explore our production RAG frameworks, agent libraries, and tools.",
  };
  
  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("open_source").get();
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
      url: 'https://botmartz.com/work/open-source',
      type: 'website',
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

  return <OpenSourceClient initialRepos={sanitizedRepos} />;
}
