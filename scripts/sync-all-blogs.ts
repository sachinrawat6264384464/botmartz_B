import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

const serviceAccountKeyPath = path.join(process.cwd(), "botmartz-main-firebase-adminsdk-fbsvc-d220cfe485.json");

let app;
if (getApps().length > 0) {
  app = getApps()[0];
} else if (fs.existsSync(serviceAccountKeyPath)) {
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountKeyPath, "utf-8"));
  app = initializeApp({ credential: cert(serviceAccount) });
} else {
  app = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore(app);

function generateSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function getAllMarkdownFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== ".git") {
        getAllMarkdownFiles(fullPath, fileList);
      }
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

async function syncAllBlogs() {
  const blogsDir = path.join(process.cwd(), "blogs");
  const allFiles = getAllMarkdownFiles(blogsDir);
  console.log(`Found ${allFiles.length} markdown blogs across categories.`);

  let createdCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;

  for (const file of allFiles) {
    try {
      const raw = fs.readFileSync(file, "utf-8");
      const { data, content } = matter(raw);

      if (!data.title) {
        skippedCount++;
        continue;
      }

      const slug = generateSlug(data.title);
      const existing = await db.collection("blog-posts").where("slug", "==", slug).limit(1).get();

      // Ensure content is formatted and available
      const payload: Record<string, any> = {
        title: data.title,
        slug,
        excerpt: data.excerpt || "",
        author: data.authorName || data.author || "Soham Sharma",
        authorName: data.authorName || data.author || "Soham Sharma",
        category: (data.category || "AI Engineering").toUpperCase(),
        tags: Array.isArray(data.tags) ? data.tags : [],
        series_id: data.series_id || "",
        series_slug: data.series_slug || "",
        series_title: data.series_title || "",
        difficulty: data.difficulty || "intermediate",
        featuredImage: data.featuredImage || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
        featuredImageAlt: data.featuredImageAlt || data.title,
        notebookLink: data.colab_notebook || "",
        status: "published", // Publish so all insights are immediately live
        content: content,
        updatedAt: FieldValue.serverTimestamp(),
      };

      if (existing.empty) {
        await db.collection("blog-posts").add({
          ...payload,
          createdAt: FieldValue.serverTimestamp(),
          publishedAt: FieldValue.serverTimestamp(),
          likes: 0,
          views: 0,
        });
        createdCount++;
        console.log(`[CREATED] ${data.title}`);
      } else {
        await existing.docs[0].ref.update(payload);
        updatedCount++;
        console.log(`[UPDATED] ${data.title}`);
      }
    } catch (err: any) {
      console.error(`Error processing ${file}:`, err.message);
      skippedCount++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Sync Complete: ${createdCount} Created, ${updatedCount} Updated, ${skippedCount} Skipped.`);
  console.log(`========================================\n`);
  process.exit(0);
}

syncAllBlogs().catch((e) => {
  console.error("Fatal error during blog sync:", e);
  process.exit(1);
});
