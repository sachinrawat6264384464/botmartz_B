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

async function updateNavbar() {
  console.log("Reading navbar configuration from Firestore...");
  const docRef = db.collection("site_config").doc("navbar");
  const docSnap = await docRef.get();
  
  let items = [];
  if (docSnap.exists) {
    const data = docSnap.data();
    items = data.items || [];
  } else {
    // Default items fallback
    items = [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services", dropdown: [{ name: "Enterprise RAG", path: "/services/enterprise-rag" }, { name: "AI Agents", path: "/services/ai-agents" }] },
      { name: "Industries", path: "/industries", dropdown: [{ name: "Healthcare", path: "/industries/healthcare" }, { name: "Education", path: "/industries/education" }, { name: "Logistics", path: "/industries/logistics" }] },
      { name: "Work", path: "/work", dropdown: [{ name: "Case Studies", path: "/work/case-studies" }, { name: "Labs", path: "/work/labs" }, { name: "Open Source", path: "/work/open-source" }] },
      { name: "Engineering Insights", path: "/insights" },
      { name: "Community", path: "/community", dropdown: [{ name: "Events", path: "/community/events" }, { name: "Discord & Forum", path: "/community" }] },
      { name: "Careers", path: "/careers", dropdown: [{ name: "Open Roles", path: "/careers" }, { name: "Apply Now", path: "/careers#apply" }] },
    ];
  }

  // Update "Engineering Insights" item to have the dropdown structure
  let updated = false;
  items = items.map(item => {
    if (item.name === "Engineering Insights") {
      updated = true;
      return {
        name: "Engineering Insights",
        path: "/insights",
        dropdown: [
          { name: "New Updates", path: "/insights/updates" },
          { name: "All Insights", path: "/insights" }
        ]
      };
    }
    return item;
  });

  if (!updated) {
    // If not found, add it
    items.push({
      name: "Engineering Insights",
      path: "/insights",
      dropdown: [
        { name: "New Updates", path: "/insights/updates" },
        { name: "All Insights", path: "/insights" }
      ]
    });
  }

  console.log("Saving updated navbar configuration...");
  await docRef.set({
    items,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true });

  console.log("✅ Firestore Navbar updated successfully!");
  process.exit(0);
}

updateNavbar().catch(err => {
  console.error("❌ Update failed:", err);
  process.exit(1);
});
