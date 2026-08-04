import { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import AIFrontierEventBody from '../events/ai-frontier-2026/AIFrontierEventBody';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'AI Frontier 2026',
    description: 'Join us at AI Frontier 2026, the premier conference for AI engineering, RAG systems, and autonomous agents.',
  };
  
  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("ai-frontier").get();
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
      url: 'https://www.botmartz.com/community/ai-frontier',
      type: 'website',
    },
    alternates: {
      canonical: 'https://www.botmartz.com/community/ai-frontier',
    },
  };
}

const DEFAULT_CONTENT = {
  structuredData: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "AI Frontier 2026",
    "description": "The premier conference for AI engineering, RAG systems, and autonomous agents.",
    "startDate": "2026-08-22T10:00:00+05:30",
    "endDate": "2026-08-22T17:00:00+05:30",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": "Walkover Co-working Space",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Indore",
        "addressCountry": "IN"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Botmartz AI Solutions"
    }
  })
};

export default async function AIFrontierPage() {
  let structuredData = DEFAULT_CONTENT.structuredData;

  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("ai-frontier").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      if (data?.structuredData) {
        structuredData = data.structuredData;
      }
    }
  } catch (e) {}

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: structuredData
          }}
        />
      )}
      
      <AIFrontierEventBody />
    </>
  );
}
