import { adminDb } from "./lib/firebase-admin";

const bootcamps = [
  {
    title: "AI Accelerator Workshop Series 1: Build Your First AI Full-Stack App",
    shortDescription: "A hands-on workshop to build an end-to-end full stack AI application with Next.js and LLMs.",
    desc: "A hands-on workshop to build an end-to-end full stack AI application with Next.js and LLMs.",
    date: "August 9, 2026",
    location: "Indore, India",
    slug: "build-your-first-ai-full-stack-application",
    type: "Workshop",
    status: "Upcoming",
    techStack: ['Next.js', 'Vercel AI SDK', 'OpenAI', 'TailwindCSS']
  },
  {
    title: "AI Accelerator Workshop Series 2: Build Smarter AI Agents",
    shortDescription: "Learn how modern AI Agents think, plan and act. Dive deep into LangGraph, Tool Calling, and MCP.",
    desc: "Learn how modern AI Agents think, plan and act. Dive deep into LangGraph, Tool Calling, and MCP.",
    date: "August 16, 2026",
    location: "Indore, India",
    slug: "build-smarter-ai-agents",
    type: "Workshop",
    status: "Upcoming",
    techStack: ['Python', 'LangChain', 'LangGraph', 'MCP']
  },
  {
    title: "AI Accelerator Workshop Series 3: Build Production Ready AI Applications",
    shortDescription: "Scale and deploy robust AI applications securely. Learn best practices for enterprise AI.",
    desc: "Scale and deploy robust AI applications securely. Learn best practices for enterprise AI.",
    date: "August 22, 2026",
    location: "Indore, India",
    slug: "build-production-ready-ai-applications",
    type: "Workshop",
    status: "Upcoming",
    techStack: ['AWS/GCP', 'PostgreSQL', 'Docker', 'CI/CD']
  }
];

async function main() {
  const batch = adminDb.batch();
  for (const b of bootcamps) {
    const ref = adminDb.collection('bootcamps').doc(b.slug);
    batch.set(ref, b, { merge: true });
  }
  await batch.commit();
  console.log("Successfully inserted bootcamps!");
}
main().catch(console.error);
