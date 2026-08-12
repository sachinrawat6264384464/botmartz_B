import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const { name, email, phone, linkedinOrResume, coverNote, role, department } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: name and email are required." },
        { status: 400 }
      );
    }

    const applicationDoc = {
      candidateName: name.trim(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || "",
      role: role || "General Application",
      jobTitle: role || "General Application",
      department: department || "Engineering",
      linkedinOrResume: linkedinOrResume?.trim() || "",
      resumeUrl: linkedinOrResume?.trim() || "",
      coverNote: coverNote?.trim() || "",
      note: coverNote?.trim() || "",
      status: "new",
      createdAt: new Date().toISOString(),
    };

    const docRef = await adminDb.collection("job_applications").add(applicationDoc);

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: "Application submitted successfully! Our team will review it shortly.",
    });
  } catch (err: any) {
    console.error("[Job Application API Error]", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to submit application." },
      { status: 500 }
    );
  }
}
