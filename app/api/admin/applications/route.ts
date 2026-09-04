import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET() {
  try {
    const snap = await adminDb.collection("applications").orderBy("createdAt", "desc").get();
    
    const applications = snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    let pending = 0;
    let selected = 0;
    let rejected = 0;
    const roleCounts: Record<string, number> = {};

    applications.forEach((app: any) => {
      if (app.status === 'selected') selected++;
      else if (app.status === 'rejected') rejected++;
      else pending++;

      const role = app.roleTitle || 'General Application';
      roleCounts[role] = (roleCounts[role] || 0) + 1;
    });

    const metrics = {
      total: applications.length,
      pending,
      selected,
      rejected,
      roleCounts
    };

    return NextResponse.json({
      success: true,
      applications,
      metrics
    });
  } catch (error: any) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Application ID is required" }, { status: 400 });
    }
    if (!['pending', 'selected', 'rejected'].includes(status)) {
      return NextResponse.json({ success: false, error: "Invalid status" }, { status: 400 });
    }

    await adminDb.collection("applications").doc(id).update({
      status,
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: `Application status updated to ${status}`
    });
  } catch (error: any) {
    console.error("Error updating application status:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update status" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const queryId = searchParams.get("id");

    let ids: string[] = [];

    if (queryId) {
      ids = [queryId];
    } else {
      const body = await req.json().catch(() => ({}));
      if (body.id) ids = [body.id];
      else if (Array.isArray(body.ids)) ids = body.ids;
    }

    if (ids.length === 0) {
      return NextResponse.json({ success: false, error: "Application ID(s) required" }, { status: 400 });
    }

    const batch = adminDb.batch();
    ids.forEach(id => {
      const docRef = adminDb.collection("applications").doc(id);
      batch.delete(docRef);
    });

    await batch.commit();

    return NextResponse.json({
      success: true,
      message: `Deleted ${ids.length} application(s)`
    });
  } catch (error: any) {
    console.error("Error deleting application:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete application" },
      { status: 500 }
    );
  }
}
