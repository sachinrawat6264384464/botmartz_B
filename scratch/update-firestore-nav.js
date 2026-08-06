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
  const cleanNavbarItems = [
    { name: "Home", path: "/" },
    {
      name: "Services",
      path: "/services",
      dropdown: [
        { name: "Enterprise RAG", path: "/services/enterprise-rag" },
        { name: "AI Agents", path: "/services/ai-agents" },
      ],
    },
    {
      name: "Work",
      path: "/work",
      dropdown: [
        { name: "Labs", path: "/work/labs" },
        { name: "Open Source", path: "/work/open-source" },
      ],
    },
    {
      name: "Engineering Insights",
      path: "/insights",
    },
    {
      name: "Community",
      path: "/community",
      dropdown: [
        { name: "Events", path: "/community/events" },
        { name: "Workshops", path: "/community/ai-accelerator-workshop" },
        { name: "Discord & Forum", path: "/community" },
      ],
    },
  ];

  await db.collection("site_config").doc("navbar").set({
    items: cleanNavbarItems,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true });

  console.log("Successfully updated site_config/navbar in Firestore!");
}

run().catch(console.error);
