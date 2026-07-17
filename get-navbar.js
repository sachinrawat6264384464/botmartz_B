/**
 * get-navbar.js — Read the navbar config from Firestore and print it.
 * Run: node get-navbar.js
 */

require('dotenv').config({ path: '.env' });
const admin = require('firebase-admin');

const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY
  ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined;

if (!privateKey) {
  console.error("❌ FIREBASE_ADMIN_PRIVATE_KEY is missing in your .env file!");
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

async function checkNavbar() {
  const snap = await db.collection("site_config").doc("navbar").get();
  if (snap.exists) {
    console.log("🔥 Firestore Navbar Config:");
    console.log(JSON.stringify(snap.data(), null, 2));
  } else {
    console.log("❌ No navbar document found in Firestore.");
  }
  process.exit(0);
}

checkNavbar().catch(console.error);
