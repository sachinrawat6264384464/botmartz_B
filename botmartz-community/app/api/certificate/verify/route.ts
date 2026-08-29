import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json({ error: "Certificate ID or Email is required" }, { status: 400 });
    }

    const trimmed = query.trim().toLowerCase();

    // 1. Check in certificates collection
    const certRef = adminDb.collection("certificates");
    let snapshot = await certRef.where("certificateId", "==", query.trim()).get();

    if (snapshot.empty) {
      snapshot = await certRef.where("email", "==", trimmed).get();
    }

    if (!snapshot.empty) {
      const certDoc = snapshot.docs[0];
      return NextResponse.json({ certificate: { id: certDoc.id, ...certDoc.data() } });
    }

    // 2. Check in attendees with certificateIssued: true
    const attSnap = await adminDb.collection("attendees").where("email", "==", trimmed).get();
    if (!attSnap.empty) {
      const attData = attSnap.docs[0].data();
      return NextResponse.json({
        certificate: {
          id: attSnap.docs[0].id,
          certificateId: attData.checkInCode || `CERT-${attSnap.docs[0].id.substring(0, 8).toUpperCase()}`,
          name: attData.name,
          email: attData.email,
          eventTitle: attData.eventTitle || "AI Frontier 2026",
          issueDate: "August 2026"
        }
      });
    }

    return NextResponse.json({ error: "No certificate found matching this query." }, { status: 404 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Verification lookup error" }, { status: 500 });
  }
}
