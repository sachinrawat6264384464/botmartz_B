import { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import InsightsUpdatesClient from './InsightsUpdatesClient';

export const metadata: Metadata = {
  title: 'Engineering Updates & Technical Logs',
  description: 'Explore our latest system releases, technical logs, and engineering updates from the Botmartz team.',
  openGraph: {
    title: 'Engineering Updates & Technical Logs | Botmartz',
    description: 'Explore our latest system releases, technical logs, and engineering updates from the Botmartz team.',
    url: 'https://www.botmartz.com/insights/updates',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.botmartz.com/insights/updates',
  },
};

export default async function InsightsUpdatesPage() {
  let dbArticles: any[] = [];
  try {
    const snapshot = await adminDb.collection("blog-posts")
      .where("status", "==", "published")
      .orderBy("createdAt", "desc")
      .get();
      
    dbArticles = snapshot.docs.map(doc => {
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
        updatedAt: formatTimestamp(data.updatedAt),
      };
    });
  } catch (err) {
    console.error("Error loading updates articles:", err);
  }

  const sanitizedArticles = JSON.parse(JSON.stringify(dbArticles));

  return <InsightsUpdatesClient initialArticles={sanitizedArticles} />;
}
