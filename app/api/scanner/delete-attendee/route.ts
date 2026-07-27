import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  try {
    const { id, deleteAll, admin } = await req.json();

    const isRefererAdmin = req.headers.get('referer')?.includes('/admin');
    if (!admin && !isRefererAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (deleteAll) {
      // Delete all documents in event-registrations collection
      const snapshot = await adminDb.collection('event-registrations').get();
      if (snapshot.empty) {
        return NextResponse.json({ success: true, message: 'No records to delete' });
      }

      // Delete in batches (Firestore allows up to 500 operations per batch)
      const docs = snapshot.docs;
      for (let i = 0; i < docs.length; i += 400) {
        const batch = adminDb.batch();
        const chunk = docs.slice(i, i + 400);
        chunk.forEach((d) => batch.delete(d.ref));
        await batch.commit();
      }

      return NextResponse.json({ success: true, message: 'All registration records deleted successfully' });
    }

    if (!id) {
      return NextResponse.json({ error: 'Registration ID is required' }, { status: 400 });
    }

    await adminDb.collection('event-registrations').doc(id).delete();
    return NextResponse.json({ success: true, message: 'Registration record deleted successfully' });

  } catch (err: any) {
    console.error('[delete-attendee error]', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
