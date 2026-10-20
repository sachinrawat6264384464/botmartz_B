import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

const COOKIE_NAME = 'liked_posts';
// 1 year expiry — long enough that repeat likers are blocked across sessions
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }

    // ── 1. Cookie-based duplicate check (server-authoritative) ───────────────
    const cookieHeader = request.cookies.get(COOKIE_NAME)?.value ?? '';
    const likedIds = cookieHeader ? cookieHeader.split(',') : [];

    if (likedIds.includes(id)) {
      // Already liked — return current count without incrementing
      const snap = await adminDb.collection('blog-posts').doc(id).get();
      const currentLikes = snap.data()?.likes ?? 0;
      return NextResponse.json({ success: true, alreadyLiked: true, likes: currentLikes });
    }

    // ── 2. Blog existence check ───────────────────────────────────────────────
    const blogRef = adminDb.collection('blog-posts').doc(id);
    const blogSnap = await blogRef.get();
    if (!blogSnap.exists) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    // ── 3. Atomic like increment ──────────────────────────────────────────────
    await blogRef.update({ likes: FieldValue.increment(1) });

    // Get updated count in a single read
    const updatedSnap = await blogRef.get();
    const updatedLikes = updatedSnap.data()?.likes ?? 1;

    // ── 4. Set cookie with the updated liked-IDs list ─────────────────────────
    const newLikedIds = [...likedIds, id].join(',');
    const response = NextResponse.json({ success: true, alreadyLiked: false, likes: updatedLikes });
    response.cookies.set(COOKIE_NAME, newLikedIds, {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: false,   // must be readable by client JS for the pre-check
      sameSite: 'lax',
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Error incrementing likes:', error);
    return NextResponse.json({ error: 'Failed to update likes' }, { status: 500 });
  }
}