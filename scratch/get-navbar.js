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

async function getNavbar() {
  const docSnap = await db.collection("site_config").doc("navbar").get();
  if (docSnap.exists) {
    console.log("NAVBAR_CONFIG:", JSON.stringify(docSnap.data(), null, 2));
  } else {
    console.log("NAVBAR_CONFIG: Document site_config/navbar does not exist!");
  }
  process.exit(0);
}

getNavbar().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
