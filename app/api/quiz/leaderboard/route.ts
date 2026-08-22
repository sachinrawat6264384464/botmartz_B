import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET() {
  try {
    const snap = await adminDb.collection('quiz-scores').get();
    
    const rawScores: any[] = [];
    snap.forEach((doc) => {
      const data = doc.data();
      rawScores.push({
        id: doc.id,
        name: data.name || 'Anonymous Challenger',
        email: data.email || '',
        score: Number(data.score) || 0,
        totalQuestions: Number(data.totalQuestions) || 15,
        timeTaken: Number(data.timeTaken) || 0,
        createdAt: data.createdAt || '',
      });
    });

    // Deduplicate by email so only best attempt per email is retained
    const uniqueMap = new Map<string, any>();
    rawScores.forEach((s) => {
      const key = (s.email || s.name).trim().toLowerCase();
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, s);
      } else {
        const existing = uniqueMap.get(key)!;
        if (s.score > existing.score || (s.score === existing.score && s.timeTaken < existing.timeTaken)) {
          uniqueMap.set(key, s);
        }
      }
    });

    const leaderboard = Array.from(uniqueMap.values());

    // Sort: Score descending, TimeTaken ascending
    leaderboard.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.timeTaken - b.timeTaken;
    });

    return NextResponse.json({
      success: true,
      scores: leaderboard.slice(0, 50),
    });
  } catch (err: any) {
    console.error('Failed to fetch leaderboard scores:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to fetch leaderboard.' },
      { status: 500 }
    );
  }
}
