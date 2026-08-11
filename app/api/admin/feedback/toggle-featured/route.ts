import { NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { feedbackId, isFeatured } = body;

    if (!feedbackId) {
      return NextResponse.json(
        { error: 'Feedback ID is required.' },
        { status: 400 }
      );
    }

    const docRef = adminDb.collection('event-feedbacks').doc(feedbackId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json(
        { error: 'Feedback record not found.' },
        { status: 404 }
      );
    }

    // Update isFeatured field in Firestore
    await docRef.update({
      isFeatured: !!isFeatured,
      updatedAt: new Date().toISOString(),
    });

    // Revalidate Next.js cache so public site reflects change instantly
    try {
      (revalidateTag as any)('feedbacks');
      revalidatePath('/community/ai-accelerator-workshop');
    } catch (e) {
      console.warn('Revalidation warning:', e);
    }

    return NextResponse.json({
      success: true,
      feedbackId,
      isFeatured: !!isFeatured,
      message: `Feedback ${isFeatured ? 'featured on public site' : 'removed from public site'}.`,
    });
  } catch (err: any) {
    console.error('Failed to toggle feedback featured status:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
