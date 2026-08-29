import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { checkInCode, email, password } = body;

    if (email !== "botmartz@gmail.com" || password !== "Admin@2026##") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    if (!checkInCode) {
      return NextResponse.json({ error: "Check-in code required" }, { status: 400 });
    }

    const snap = await adminDb.collection("attendees").where("checkInCode", "==", checkInCode.trim().toUpperCase()).get();

    if (snap.empty) {
      return NextResponse.json({ error: "Invalid ticket / check-in code." }, { status: 404 });
    }

    const doc = snap.docs[0];
    const data = doc.data();

    if (data.attended) {
      return NextResponse.json({ 
        error: `Pass already scanned at ${data.checkedInAt?.toDate ? data.checkedInAt.toDate().toLocaleTimeString() : 'earlier'}` 
      }, { status: 400 });
    }

    await doc.ref.update({
      attended: true,
      checkedInAt: new Date()
    });

    return NextResponse.json({
      success: true,
      attendee: {
        id: doc.id,
        name: data.name || "Attendee",
        email: data.email,
        attendeeType: data.tier || "General"
      }
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
