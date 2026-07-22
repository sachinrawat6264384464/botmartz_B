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

async function run() {
  const snap = await db.collection("blog-posts").get();
  console.log(`Found ${snap.size} blog posts:`);
  snap.forEach(doc => {
    const data = doc.data();
    console.log(`- ID/slug: ${doc.id} | title: "${data.title}" | status: ${data.status} | category: ${data.category}`);
  });
}

run().catch(console.error);
