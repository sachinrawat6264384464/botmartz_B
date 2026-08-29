import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { registrationId, email, password } = body;

    if (email !== "botmartz@gmail.com" || password !== "Admin@2026##") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    if (!registrationId) {
      return NextResponse.json({ error: "Registration ID required" }, { status: 400 });
    }

    await adminDb.collection("attendees").doc(registrationId).update({
      attended: true,
      checkedInAt: new Date()
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Check-in failed" }, { status: 500 });
  }
}
