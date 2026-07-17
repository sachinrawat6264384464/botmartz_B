import { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import EventsClient from './EventsClient';

export const metadata: Metadata = {
  title: 'Community Events | Where the AI Engineering Community Meets',
  description: 'Conferences, monthly meetups, open-source nights and hackathons — built for engineers who want to build, ship and grow together.',
};

export default async function EventsIndexPage() {
  let initialEvents: any[] = [];
  try {
    const eventsSnap = await adminDb.collection("events").orderBy("date", "desc").get();
    eventsSnap.forEach(doc => {
      const data = doc.data();
      initialEvents.push({ 
        id: doc.id, 
        ...data,
        createdAt: data.createdAt ? new Date(data.createdAt.toDate()).toISOString() : null
      });
    });
  } catch (e) {
    console.error("Failed to fetch events:", e);
  }

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

  return <EventsClient initialEvents={sanitizedEvents} />;
}
