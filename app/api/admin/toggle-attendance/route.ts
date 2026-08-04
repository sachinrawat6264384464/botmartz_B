import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { registrationId, attendance } = await req.json();

    if (!registrationId) {
      return NextResponse.json({ error: "Missing registration ID" }, { status: 400 });
    }

    await adminDb.collection('bootcamp_registrations').doc(registrationId).update({
      attendance: !!attendance,
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    console.error("Toggle Attendance Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
