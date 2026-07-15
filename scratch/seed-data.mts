import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert({
          projectId:   process.env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey:  process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
      });

const db = getFirestore(app);

async function seedData() {
  console.log("🚀 Seeding test data for Labs and Case Studies…\n");

  // 1. Seed Labs
  const labsCollection = db.collection("labs");
  const labsData = [
    {
      title: "Enterprise AI PDF Agent",
      description: "An advanced RAG-based agent that reads multi-format PDFs, extracts charts, and generates structured executive summaries automatically.",
      category: "Enterprise RAG",
      tags: ["RAG", "LangChain", "OpenAI", "NextJS"],
      githubUrl: "https://github.com/botmartz/pdf-agent-demo",
      demoUrl: "https://demo.botmartz.com/pdf-agent",
      repoUrl: "https://github.com/botmartz/pdf-agent-demo",
      stars: 124,
      forks: 18,
      badge: "New",
      status: "active",
      featured: true,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    },
    {
      title: "Real-time Supply Chain Router",
      description: "An intelligent autonomous route optimization framework for modern logistics, built with high-throughput spatial search and vehicle routing APIs.",
      category: "AI Agents",
      tags: ["Logistics", "Optimization", "Python", "React"],
      githubUrl: "https://github.com/botmartz/supply-chain-optimizer",
      demoUrl: "https://demo.botmartz.com/supply-chain",
      repoUrl: "https://github.com/botmartz/supply-chain-optimizer",
      stars: 92,
      forks: 12,
      badge: "Live",
      status: "active",
      featured: true,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    }
  ];

  for (const lab of labsData) {
    const docRef = await labsCollection.add(lab);
    console.log(`✅ Seeded Lab: "${lab.title}" (ID: ${docRef.id})`);
  }

  // 2. Seed Case Studies
  const caseStudiesCollection = db.collection("case-studies");
  const caseStudiesData = [
    {
      title: "Transforming Legal Operations with Custom RAG",
      slug: "legal-operations-rag",
      excerpt: "How Botmartz designed and deployed a multi-tenant document extraction agent for a leading corporate legal firm, reducing retrieval overhead by 82%.",
      content: "## Executive Summary\n\nThis case study showcases the design, implementation, and scaling of a bespoke legal RAG pipeline.\n\n### The Challenge\n\nLegal compliance associates spent average 14 hours per week searching through complex regulatory documentation.\n\n### The Solution\n\nWe engineered a hybrid semantic-sparse database with custom tokenization for legal terminology, hooked up to an LLM chain.\n\n### Results\n- 82% time reduction in doc retrieval\- 100% compliance audit check pass rate",
      clientName: "Apex Legal Partners",
      category: "Legal Tech",
      tags: ["AI Agents", "Document RAG", "Legal Compliance"],
      status: "published",
      views: 1204,
      likes: 84,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    },
    {
      title: "Automating Inventory Forecasting for Logistics Systems",
      slug: "inventory-forecasting-logistics",
      excerpt: "Integrating smart forecast models and auto-replenishment decision-trees to scale logistics operations across 12 warehouses.",
      content: "## Overview\n\nPredicting replenishment triggers in dynamic supply chains is key to modern cost management.\n\n### Our Approach\n\nUsing time-series model ensembles coupled with agentic loops to place draft POs automatically.\n\n### Results\n- 28% reduction in stockouts\n- $1.2M saved in annual warehouse holding costs",
      clientName: "LogiTrans International",
      category: "Logistics",
      tags: ["Forecasting", "Supply Chain", "Agentic Workflows"],
      status: "published",
      views: 842,
      likes: 67,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    }
  ];

  for (const cs of caseStudiesData) {
    const docRef = await caseStudiesCollection.add(cs);
    console.log(`✅ Seeded Case Study: "${cs.title}" (ID: ${docRef.id})`);
  }

  console.log("\n🎉 Seeding complete!");
  process.exit(0);
}

seedData().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});
