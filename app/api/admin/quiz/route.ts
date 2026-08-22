import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET() {
  try {
    const snap = await adminDb.collection('quiz-scores').get();
    const scores: any[] = [];
    snap.forEach((doc) => {
      scores.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    scores.sort((a, b) => {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return timeB - timeA;
    });

    return NextResponse.json({
      success: true,
      count: scores.length,
      scores,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { id, clearAll } = body;

    const ref = adminDb.collection('quiz-scores');

    if (clearAll) {
      const snap = await ref.get();
      const batch = adminDb.batch();
      snap.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      return NextResponse.json({ success: true, message: 'All quiz scores cleared.' });
    }

    if (id) {
      await ref.doc(id).delete();
      return NextResponse.json({ success: true, message: 'Quiz score deleted.' });
    }

    return NextResponse.json({ error: 'Specify id or clearAll: true' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
