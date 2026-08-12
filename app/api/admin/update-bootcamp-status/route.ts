import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }

    await adminDb.collection('bootcamps').doc(id).set(
      {
        status: status.trim(),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    return NextResponse.json({ success: true, message: `Bootcamp status updated to ${status}` });
  } catch (err: any) {
    console.error('Error updating bootcamp status:', err);
    return NextResponse.json({ error: err.message || 'Failed to update status' }, { status: 500 });
  }
}
