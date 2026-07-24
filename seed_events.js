require('dotenv').config({ path: '.env.local' });
const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

const events = [
  {
    slug: 'ai-frontier-2026',
    type: 'Conference',
    status: 'Upcoming',
    statusColor: '#0E9F6E',
    title: 'AI Frontier 2026 — The Future of AI Engineering',
    desc: 'Agents, Enterprise AI, AI-Assisted Development, and Responsible AI. A full day of sessions, fireside Q&As, and closing panels plus the launch of the Botmartz AI Engineering Community.',
    date: 'Aug 22, 2026',
    location: 'Indore, India',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    slug: 'ai-engineering-meetup-indore',
    type: 'Meetup',
    status: 'Monthly',
    statusColor: '#0E9F6E',
    title: 'AI Engineering Meetup — Indore Chapter',
    desc: 'A monthly gathering for local AI engineers to share projects, talk shop, and swap production lessons.',
    date: 'Every 3rd Saturday',
    location: 'Indore, India',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    slug: 'open-source-night-langgraph',
    type: 'Meetup',
    status: 'Upcoming',
    statusColor: '#0E9F6E',
    title: 'Open Source Night: Contributing to LangGraph',
    desc: 'A hands-on evening picking up good-first-issues and pairing on real open-source contributions.',
    date: 'Sep 12, 2026 · 6:00 PM',
    location: 'Online',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    slug: 'ai-frontier-hackathon-2026',
    type: 'Hackathon',
    status: 'Upcoming',
    statusColor: '#0E9F6E',
    title: 'AI Frontier Hackathon 2026',
    desc: 'A weekend build sprint following the conference — teams ship an AI agent or RAG system from scratch.',
    date: 'Sep 26–27, 2026',
    location: 'Indore, India',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    slug: 'enterprise-rag-production',
    type: 'Webinar',
    status: 'Upcoming',
    statusColor: '#0E9F6E',
    title: 'Enterprise RAG in Production',
    desc: 'A deep dive on evaluation, reranking, and guardrails for RAG systems that actually ship.',
    date: 'Oct 8, 2026 · 5:00 PM',
    location: 'Online',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    slug: 'ai-engineering-reading-club',
    type: 'Meetup',
    status: 'Recurring',
    statusColor: '#0E9F6E',
    title: 'AI Engineering Reading Club',
    desc: 'A biweekly discussion group working through papers and technical blog posts shaping the field.',
    date: 'Every other Thursday',
    location: 'Discord',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    slug: 'ai-frontier-2027',
    type: 'Conferences',
    status: 'Planning',
    statusColor: '#D97706',
    title: 'AI Frontier 2027 — Save the Date',
    desc: 'Planning is already underway for next year’s flagship conference. Theme announced later this year.',
    date: 'TBA 2027',
    location: 'Indore, India',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  }
];

async function seedEvents() {
  for (const event of events) {
    const eventRef = db.collection('events').doc(event.slug);
    await eventRef.set(event, { merge: true });
    console.log(`Seeded event: ${event.slug}`);
  }
  console.log('All events seeded successfully!');
}

seedEvents().catch(console.error);
