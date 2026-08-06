import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { id, name, email, phone, organization, plan, checkInCode, amount } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing registration ID" }, { status: 400 });
    }

    const updateData: Record<string, any> = {};

    if (name !== undefined) updateData.name = name.trim();
    if (email !== undefined) updateData.email = email.trim().toLowerCase();
    if (phone !== undefined) updateData.phone = phone.trim();
    if (organization !== undefined) updateData.organization = organization.trim();
    if (plan !== undefined) updateData.plan = plan;
    if (checkInCode !== undefined) updateData.checkInCode = checkInCode.trim();
    if (amount !== undefined) {
      updateData.amount = Number(amount);
      updateData.amountPaid = Number(amount);
    }
    updateData.updatedAt = new Date();

    await adminDb.collection("bootcamp_registrations").doc(id).update(updateData);

    return NextResponse.json({
      success: true,
      message: "Registration updated successfully"
    }, { status: 200 });

  } catch (err: any) {
    console.error("Update Registration Error:", err);
    return NextResponse.json({ success: false, error: err.message || "Failed to update registration" }, { status: 500 });
  }
}
