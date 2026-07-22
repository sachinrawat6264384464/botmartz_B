require('dotenv').config({ path: '.env' });
const admin = require('firebase-admin');

const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY
  ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined;

if (!privateKey) {
  console.error("Missing FIREBASE_ADMIN_PRIVATE_KEY");
  process.exit(1);
}

const app = admin.apps.length > 0
  ? admin.apps[0]
  : admin.initializeApp({
      credential: admin.credential.cert({
        projectId:   process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey:  privateKey,
      }),
    });

const db = admin.firestore();

const coreSlugs = new Set([
  "building-a-scalable-enterprise-rag-system-architecture-components-best-practices",
  "inside-ai-agents-from-reasoning-to-real-world-action",
  "observability-for-llm-applications-metrics-that-matter",
  "why-most-rag-systems-fail-in-production"
]);

async function run() {
  const snap = await db.collection("blog-posts").get();
  let updatedCount = 0;
  let keptCount = 0;

  for (const doc of snap.docs) {
    const data = doc.data();
    if (coreSlugs.has(doc.id) || coreSlugs.has(data.slug)) {
      console.log(`Keeping core insight published: ${doc.id} (${data.title})`);
      if (data.status !== 'published') {
        await doc.ref.update({ status: 'published' });
      }
      keptCount++;
    } else {
      if (data.status !== 'draft') {
        await doc.ref.update({ status: 'draft' });
        updatedCount++;
      }
    }
  }
  console.log(`Done! Kept ${keptCount} core insights published. Set ${updatedCount} blog posts to draft.`);
}

run().catch(console.error);
