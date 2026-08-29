import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const password = searchParams.get("password");

    // Check staff access
    if (email !== "botmartz@gmail.com" || password !== "Admin@2026##") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const snap = await adminDb.collection("attendees").get();
    const attendees = snap.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "Attendee",
        email: data.email || "",
        attendeeType: data.tier || data.attendeeType || "Standard",
        quantity: data.quantity || 1,
        attended: !!data.attended,
        checkInCode: data.checkInCode || doc.id.substring(0, 8).toUpperCase()
      };
    });

    return NextResponse.json({ attendees });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch roster" }, { status: 500 });
  }
}
