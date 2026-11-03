const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

const keyPath = path.join(process.cwd(), "botmartz-main-firebase-adminsdk-fbsvc-d220cfe485.json");
const serviceAccount = JSON.parse(fs.readFileSync(keyPath, "utf-8"));

if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}

const db = admin.firestore();

const microservicesContent = ;

async function publish() {
  const slug = "microservices-vs-monolith-for-ai-systems-what-we-learned";
  const snap = await db.collection("blog-posts").where("slug", "==", slug).limit(1).get();

  const payload = {
    title: "Microservices vs Monolith for AI Systems: What We Learned",
    slug: slug,
    category: "ARCHITECTURE",
    excerpt: "A complete architectural post-mortem and empirical benchmark: why naive AI microservices fail, when a modular monolith is superior, and how to scale multi-agent workflows.",
    description: "A complete architectural post-mortem and empirical benchmark: why naive AI microservices fail, when a modular monolith is superior, and how to scale multi-agent workflows.",
    author: "Soham Sharma",
    authorName: "Soham Sharma",
    authorId: "soham2710",
    date: "Nov 2, 2026",
    readTime: "16 min read",
    readingTime: 16,
    status: "published",
    featured: true,
    featuredImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&auto=format&fit=crop&q=85",
    featuredImageAlt: "Microservices vs Monolith for AI Systems Enterprise Architecture",
    tags: ["Microservices", "Architecture", "AI Systems", "LangGraph", "MLOps", "Enterprise AI"],
    content: microservicesContent,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    publishedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  if (!snap.empty) {
    await snap.docs[0].ref.update(payload);
    console.log("Successfully updated and published Microservices vs Monolith article!");
  } else {
    await db.collection("blog-posts").add({
      ...payload,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      likes: 0,
      views: 0
    });
    console.log("Created and published Microservices vs Monolith article!");
  }
}

publish().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
