import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  try {
    const { id, ids } = await req.json();

    if (!id && (!ids || !Array.isArray(ids) || ids.length === 0)) {
      return NextResponse.json({ error: 'Registration ID or array of IDs is required' }, { status: 400 });
    }

    if (ids && Array.isArray(ids) && ids.length > 0) {
      const batch = adminDb.batch();
      ids.forEach(docId => {
        const ref = adminDb.collection('bootcamp_registrations').doc(docId);
        batch.delete(ref);
      });
      await batch.commit();
      return NextResponse.json({ success: true, message: `${ids.length} registrations deleted successfully` });
    }

    await adminDb.collection('bootcamp_registrations').doc(id).delete();
    return NextResponse.json({ success: true, message: 'Registration deleted successfully' });

  } catch (err: any) {
    console.error('[delete-registration error]', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
