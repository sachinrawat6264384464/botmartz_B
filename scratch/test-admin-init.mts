import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { initializeApp, cert } from 'firebase-admin/app';

async function testInit() {
  let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
  console.log("=== RAW PRIVATE KEY FROM ENV ===");
  console.log(privateKey);
  console.log("=== JSON STRINGIFIED ===");
  console.log(JSON.stringify(privateKey));

  if (privateKey) {
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.slice(1, -1);
    }
    privateKey = privateKey.replace(/\\n/g, '\n').replace(/\r/g, '');
  }

  console.log("\n=== PROCESSED PRIVATE KEY ===");
  console.log(privateKey);
  console.log("=== PROCESSED JSON STRINGIFIED ===");
  console.log(JSON.stringify(privateKey));

  try {
    const app = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID!,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
        privateKey: privateKey!,
      }),
    });
    console.log("\n✅ SUCCESS! Firebase Admin successfully initialized!");
  } catch (error: any) {
    console.error("\n❌ FAILED to initialize Firebase Admin:", error.message || error);
  }
}

testInit().catch(console.error);
