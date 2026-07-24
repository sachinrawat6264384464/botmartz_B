import { adminDb } from './lib/firebase-admin';

async function cleanEvents() {
  try {
    const snapshot = await adminDb.collection('events').get();
    let deletedCount = 0;
    
    for (const doc of snapshot.docs) {
      const data = doc.data();
      if (data.slug !== 'ai-frontier-2026') {
        console.log(`Deleting: ${data.title} (${data.slug})`);
        await doc.ref.delete();
        deletedCount++;
      } else {
        console.log(`Keeping: ${data.title} (${data.slug})`);
      }
    }
    console.log(`Deleted ${deletedCount} events.`);
  } catch (error) {
    console.error("Error cleaning events:", error);
  }
}

cleanEvents();
