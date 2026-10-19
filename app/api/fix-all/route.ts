import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { revalidateTag } from "next/cache";

const PROTOTYPE_EVENTS = [
  { type: 'Workshop', status: 'Upcoming', statusColor: '#0E9F6E', title: 'AI Accelerator Workshop Series 1: Build Your First AI Full-Stack App', desc: 'A hands-on workshop to build an end-to-end full stack AI application with Next.js and LLMs.', date: 'August 9, 2026', location: 'Indore, India', slug: '/community/ai-accelerator-workshop/build-your-first-ai-full-stack-application' },
  { type: 'Workshop', status: 'Upcoming', statusColor: '#0E9F6E', title: 'AI Accelerator Workshop Series 2: Build Smarter AI Agents', desc: 'Learn how modern AI Agents think, plan and act. Dive deep into LangGraph, Tool Calling, and MCP.', date: 'August 16, 2026', location: 'Indore, India', slug: '/community/ai-accelerator-workshop/build-smarter-ai-agents' },
  { type: 'Workshop', status: 'Upcoming', statusColor: '#0E9F6E', title: 'AI Accelerator Workshop Series 3: Build Production Ready AI Applications', desc: 'Scale and deploy robust systems to the real world. Learn Inference, Optimization, and AI Infrastructure.', date: 'August 22, 2026', location: 'Indore, India', slug: '/community/ai-accelerator-workshop/build-production-ready-ai-applications' },
  { type: 'Meetup', status: 'Monthly', statusColor: '#0E9F6E', title: 'AI Engineering Meetup — Indore Chapter', desc: 'A monthly gathering for local AI engineers to share projects, talk shop, and swap production lessons.', date: 'Every 3rd Saturday', location: 'Indore, India' },
];

const DEFAULT_ITEMS = [
  { name: "Home", path: "/" },
  {
    name: "Solutions",
    path: "/services",
    dropdown: [
      { name: "Enterprise AI Implementation", path: "/implementation" },
      { name: "Knowledge & Search Systems", path: "/services/enterprise-rag" },
      { name: "AI Agents & Automation", path: "/services/ai-agents" },
      { name: "AI Integration & Platforms", path: "/services/integrations" },
      { name: "Custom AI Applications", path: "/services/custom-ai-applications" },
    ],
  },
  { name: "Industries", path: "/industries" },
  { name: "Implementation", path: "/implementation" },
  {
    name: "Work", path: "/work",
    dropdown: [
      { name: "Labs", path: "/work/labs" },
      { name: "Open Source", path: "/work/open-source" },
    ],
  },
  { name: "Engineering Insights", path: "/insights" },
  { name: "Partners", path: "/partnerships" },
  { name: "Company", path: "/about" },
];

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const secretKey = req.nextUrl.searchParams.get("secret");
  const validSecret = process.env.ADMIN_SYNC_SECRET || process.env.REVALIDATION_SECRET || "botmartz_internal_admin_sync_2026";
  
  if (secretKey !== validSecret && authHeader !== `Bearer ${validSecret}`) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }
  try {
    await adminDb.collection("settings").doc("navbar").set({ items: DEFAULT_ITEMS });
    await adminDb.collection("site_config").doc("navbar").set({ items: DEFAULT_ITEMS });
    
    const snapshot = await adminDb.collection("events").get();
    const batch = adminDb.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    const batch2 = adminDb.batch();
    for (const event of PROTOTYPE_EVENTS) {
       let docId = event.slug ? event.slug.replace(/\//g, "-") : event.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
       if (docId.startsWith("-")) {
         docId = docId.substring(1);
       }
       const ref = adminDb.collection('events').doc(docId);
       batch2.set(ref, event, { merge: true });
    }
    await batch2.commit();
    
    revalidateTag("events", "default");
    revalidateTag("navbar", "default");
    
    return NextResponse.json({ message: "Successfully synced everything!" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
