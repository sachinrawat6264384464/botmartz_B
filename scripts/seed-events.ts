import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import path from 'path';
import fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  const content = fs.readFileSync(path.resolve(process.cwd(), 'reference_docs/02-ai-frontier-event.md'), 'utf-8');

  await setDoc(doc(db, 'events', 'ai-frontier-2026'), {
    title: 'AI Frontier 2026',
    slug: 'ai-frontier-2026',
    shortDescription: 'Our annual flagship summit on Enterprise AI, Agents, and RAG. Join 500+ builders and industry leaders for two days of deep technical sessions.',
    badge: 'Flagship',
    status: 'upcoming',
    date: 'August 22, 2026',
    location: 'Indore, India',
    coverImage: '/eng-i-removebg-preview.png',
    content: content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  console.log('Successfully seeded AI Frontier 2026 event using Client SDK!');
}

seed().catch(console.error);
