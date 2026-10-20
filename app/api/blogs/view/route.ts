// app/api/blogs/view/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

// ── Rate limiter with TTL cleanup ─────────────────────────────────────────────
const viewTracker = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute per IP+blog combo
const CLEANUP_INTERVAL = 5 * 60_000; // prune stale entries every 5 min

// Periodically clean up expired entries so the Map doesn't grow forever
setInterval(() => {
  const now = Date.now();
  for (const [key, ts] of viewTracker) {
    if (now - ts >= RATE_LIMIT_WINDOW) viewTracker.delete(key);
  }
}, CLEANUP_INTERVAL);

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const last = viewTracker.get(key);
  if (last && now - last < RATE_LIMIT_WINDOW) return true;
  viewTracker.set(key, now);
  return false;
}

export async function POST(request: NextRequest) {
  // ── 1. Content-Type guard ────────────────────────────────────────────────
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return NextResponse.json(
      { error: 'Content-Type must be application/json' },
      { status: 400 }
    );
  }

  // ── 2. Parse body ─────────────────────────────────────────────────────────
  let blogId: string;
  try {
    const body = await request.json();
    blogId = body?.blogId;
  } catch {
    // Malformed JSON — silently succeed so the client doesn't retry
    return NextResponse.json({ success: true, skipped: true });
  }

  if (!blogId || typeof blogId !== 'string' || blogId.trim() === '') {
    return NextResponse.json(
      { error: 'blogId must be a non-empty string' },
      { status: 400 }
    );
  }

  // ── 3. Rate limit (IP + blogId) ───────────────────────────────────────────
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (isRateLimited(`${ip}::${blogId}`)) {
    return NextResponse.json({ success: true, cached: true });
  }

  // ── 4. Atomic increment — single write, no read-then-write race ───────────
  //
  //  WHY: The old code did get() → check views field → set/update().
  //  Under load two requests could both read "views: undefined" and both
  //  write {views: 1}, losing one count entirely.
  //
  //  FIX: `set({ views: increment(1) }, { merge: true })` is a single
  //  atomic Firestore operation.  Firestore initialises missing numeric
  //  fields to 0 before applying the increment, so no pre-read is needed.
  //  It also never returns 404 — if the doc is missing it just creates a
  //  partial document (fine for view counters, which are always merged).
  //
  //  If you want a strict "post must exist" guard you can re-add the read,
  //  but that doubles latency and re-introduces the race window.
  try {
    await adminDb
      .collection('blog-posts')
      .doc(blogId.trim())
      .set({ views: FieldValue.increment(1) }, { merge: true });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    // Surface the actual Firestore error code for easier debugging
    console.error('[view] Firestore write failed:', error?.code, error?.message);
    return NextResponse.json(
      { success: false, error: 'View tracking failed', code: error?.code },
      { status: 500 }
    );
  }
}