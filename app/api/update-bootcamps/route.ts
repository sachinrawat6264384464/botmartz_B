import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET() {
  try {
    const updates = {
      'build-your-first-ai-full-stack-application': 'August 9, 2026',
      'build-smarter-ai-agents': 'August 16, 2026',
      'build-production-ready-ai-applications': 'August 22, 2026'
    };
    
    const snapshot = await adminDb.collection('bootcamps').get();
    const batch = adminDb.batch();
    
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      const slug = data.slug;
      if (slug && updates[slug as keyof typeof updates]) {
        batch.update(doc.ref, { date: updates[slug as keyof typeof updates] });
      }
    });
    
    await batch.commit();
    return NextResponse.json({ message: "Bootcamps updated successfully!" });
  } catch(e: any) {
    return NextResponse.json({ error: e.message });
  }
}
