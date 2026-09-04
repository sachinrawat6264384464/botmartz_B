import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, roleTitle, roleId, portfolioUrl, experienceLevel, coverNote } = body;

    if (!fullName || !fullName.trim()) {
      return NextResponse.json({ success: false, error: "Full Name is required" }, { status: 400 });
    }
    if (!email || !email.trim()) {
      return NextResponse.json({ success: false, error: "Email Address is required" }, { status: 400 });
    }
    if (!phone || !phone.trim()) {
      return NextResponse.json({ success: false, error: "Phone / WhatsApp number is required" }, { status: 400 });
    }
    if (!roleTitle || !roleTitle.trim()) {
      return NextResponse.json({ success: false, error: "Role applied for is required" }, { status: 400 });
    }
    if (!portfolioUrl || !portfolioUrl.trim()) {
      return NextResponse.json({ success: false, error: "LinkedIn or Portfolio URL is required" }, { status: 400 });
    }

    const applicationPayload = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      roleTitle: roleTitle.trim(),
      roleId: roleId || null,
      portfolioUrl: portfolioUrl.trim(),
      experienceLevel: experienceLevel || "Students / Freshers",
      coverNote: coverNote ? coverNote.trim() : "",
      status: "pending", // 'pending' | 'selected' | 'rejected'
      createdAt: new Date().toISOString()
    };

    const docRef = await adminDb.collection("applications").add(applicationPayload);

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully!",
      id: docRef.id
    });
  } catch (error: any) {
    console.error("Error submitting application:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit application" },
      { status: 500 }
    );
  }
}
