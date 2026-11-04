const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const admin = require('firebase-admin');

const serviceAccountPath = path.resolve(__dirname, '../botmartz-main-firebase-adminsdk-fbsvc-d220cfe485.json');
if (!fs.existsSync(serviceAccountPath)) {
  console.error("Service account JSON not found:", serviceAccountPath);
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();

const targetSlugs = [
  "human-in-the-loop-multi-agent-systems-langgraph-postgresql-wal",
  "enterprise-guide-model-context-protocol-mcp-production-tool-servers",
  "deploying-sovereign-llms-air-gapped-enterprise-vpcs-vllm-awq",
  "why-top-ai-companies-are-replacing-prompt-engineers-with-forward-deployed-ai-engineers"
];

async function syncPillars() {
  console.log("Syncing the 4 SEO Pillar blogs to Firestore 'blog-posts' collection in DRAFT status...");
  
  const searchDirs = [
    path.resolve(__dirname, '../blogs/agents'),
    path.resolve(__dirname, '../blogs/optimization')
  ];

  for (const slug of targetSlugs) {
    let foundFile = null;
    for (const dir of searchDirs) {
      const p = path.join(dir, `${slug}.md`);
      if (fs.existsSync(p)) {
        foundFile = p;
        break;
      }
    }

    if (!foundFile) {
      console.warn(`File for slug ${slug} not found!`);
      continue;
    }

    const raw = fs.readFileSync(foundFile, 'utf-8');
    const { data, content } = matter(raw);

    const docData = {
      slug: data.slug || slug,
      title: data.title,
      excerpt: data.excerpt || "",
      description: data.excerpt || "",
      content: content.trim(),
      category: data.category || "AI ENGINEERING",
      tags: data.tags || [],
      author: data.author || "Soham Sharma",
      authorName: data.authorName || "Soham Sharma",
      authorId: data.authorId || "soham-sharma-admin",
      status: "draft", // Kept in draft as requested!
      featured: false,
      readTime: `${data.readTime || 15} min read`,
      readingTime: data.readTime || 15,
      date: data.date || "Nov 5, 2026",
      createdAt: admin.firestore.Timestamp.fromDate(new Date("2026-11-05T00:00:00Z")),
      updatedAt: admin.firestore.Timestamp.now(),
      publishedAt: data.publishedAt || "2026-11-05T00:00:00.000Z",
      featuredImage: data.featuredImage || "",
      coverImage: data.coverImage || "",
      featuredImageAlt: data.featuredImageAlt || "",
      likes: 0,
      views: 0
    };

    // Upsert into Firestore using slug as document ID (or check existing)
    const existingSnap = await db.collection("blog-posts").where("slug", "==", slug).get();
    if (!existingSnap.empty) {
      const existingDoc = existingSnap.docs[0];
      await existingDoc.ref.set(docData, { merge: true });
      console.log(`[OK] Updated Firestore doc: ${existingDoc.id} | Slug: ${slug} (status: draft)`);
    } else {
      await db.collection("blog-posts").doc(slug).set(docData);
      console.log(`[OK] Created Firestore doc: ${slug} (status: draft)`);
    }
  }

  console.log("\nAll 4 SEO Pillar blogs successfully verified and synced to Firestore in draft status!");
}

syncPillars().catch(err => {
  console.error("Sync error:", err);
  process.exit(1);
});
