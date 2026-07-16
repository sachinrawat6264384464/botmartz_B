import { adminDb } from '../lib/firebase-admin';
import * as admin from 'firebase-admin';

async function main() {
  try {
    const eventRef = adminDb.collection('events').doc('ai-frontier-2026');
    await eventRef.set({
      title: 'AI Frontier 2026',
      slug: 'ai-frontier-2026',
      badge: 'Flagship Event',
      status: 'upcoming',
      date: 'May 24 – 25, 2026',
      location: 'Bangalore, India',
      shortDescription: 'Build. Learn. Connect. Shape the Future. AI Frontier is Botmartz\'s flagship event bringing together engineers, researchers, founders, and tech leaders to explore the frontier of Artificial Intelligence and build what\'s next.',
      content: '', 
      coverImage: '',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log('Event successfully created in Firestore.');
  } catch (error) {
    console.error('Error creating event:', error);
  }
}

main();
