import { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import EventsClient from './EventsClient';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Community Events | Where the AI Engineering Community Meets',
    description: 'Conferences, monthly meetups, open-source nights and hackathons — built for engineers who want to build, ship and grow together.',
  };
  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("events").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      if (data?.metadata) meta = { ...meta, ...data.metadata };
    }
  } catch (e) {}
  return {
    ...meta,
    openGraph: {
      title: `${meta.title} | Botmartz`,
      description: meta.description,
      url: 'https://www.botmartz.com/community/events',
      type: 'website',
    },
    alternates: {
      canonical: 'https://www.botmartz.com/community/events',
    },
  };
}

export default async function EventsIndexPage() {
  let initialEvents: any[] = [];
  try {
    const eventsSnap = await adminDb.collection("events").orderBy("date", "desc").get();
    eventsSnap.forEach(doc => {
      const data = doc.data();
      const formatTimestamp = (ts: any) => {
        if (!ts) return null;
        if (typeof ts.toDate === 'function') {
          return new Date(ts.toDate()).toISOString();
        }
        return new Date(ts).toISOString();
      };
      initialEvents.push({ 
        id: doc.id, 
        ...data,
        createdAt: formatTimestamp(data.createdAt),
        type: 'Conference' // default fallback
      });
    });

    const bootcampsSnap = await adminDb.collection("bootcamps").orderBy("date", "desc").get();
    bootcampsSnap.forEach(doc => {
      const data = doc.data();
      const formatTimestamp = (ts: any) => {
        if (!ts) return null;
        if (typeof ts.toDate === 'function') {
          return new Date(ts.toDate()).toISOString();
        }
        return new Date(ts).toISOString();
      };
      initialEvents.push({
        id: doc.id,
        ...data,
        createdAt: formatTimestamp(data.createdAt),
        type: 'Workshops',
        slug: `/community/ai-frontier-bootcamps/${data.slug}`, // Transform slug to match full URL expected by EventsClient, or adapt EventsClient
      });
    });

  } catch (e) {
    console.error("Failed to fetch events or bootcamps:", e);
  }

  let heroContent = {
    badge: "Botmartz Community Events",
    title: "Where the AI<br />Engineering <span class=\"text-[#00C6FF]\">Community</span> Meets",
    subtitle: "Conferences, monthly meetups, open-source nights and hackathons — built for engineers who want to build, ship and grow together, not just watch from the sidelines.",
    ctaText: "See What's Coming Up →",
    ctaLink: "#featured",
  };
  let structuredData = "";
  let aeoQuestion = "";
  let aeoAnswer = "";

  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("events").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      if (data?.hero) heroContent = { ...heroContent, ...data.hero };
      if (data?.structuredData) structuredData = data.structuredData;
      if (data?.aeoQuestion) aeoQuestion = data.aeoQuestion;
      if (data?.aeoAnswer) aeoAnswer = data.aeoAnswer;
    }
  } catch (e) {}

  const sanitizedEvents = JSON.parse(JSON.stringify(initialEvents, (key, value) => {
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
    <EventsClient 
      initialEvents={sanitizedEvents} 
      heroContent={sanitizedHero}
      structuredData={structuredData}
      aeoQuestion={aeoQuestion}
      aeoAnswer={aeoAnswer}
    />
  );
}
