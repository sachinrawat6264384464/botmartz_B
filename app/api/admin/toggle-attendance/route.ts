import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { registrationId, attendance } = await req.json();

    if (!registrationId) {
      return NextResponse.json({ error: "Missing registration ID" }, { status: 400 });
    }

    let updated = false;

    try {
      const docRef1 = adminDb.collection('bootcamp_registrations').doc(registrationId);
      const docSnap1 = await docRef1.get();
      if (docSnap1.exists) {
        await docRef1.update({ attendance: !!attendance, updatedAt: new Date() });
        updated = true;
      }
    } catch (e) {}

    try {
      const docRef2 = adminDb.collection('event-registrations').doc(registrationId);
      const docSnap2 = await docRef2.get();
      if (docSnap2.exists) {
        await docRef2.update({ attended: !!attendance, attendance: !!attendance, updatedAt: new Date() });
        updated = true;
      }
    } catch (e) {}

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    console.error("Toggle Attendance Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
