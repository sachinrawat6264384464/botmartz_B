import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

// Master Answer Keys for 15 Questions (0-indexed options: 0=A, 1=B, 2=C, 3=D)
const MASTER_ANSWER_KEYS = [1, 2, 0, 1, 1, 1, 2, 0, 2, 2, 2, 1, 2, 1, 1];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, score, totalQuestions = 15, timeTaken, userAnswers } = body;

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: 'Email address is required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = (name || '').trim() || 'Anonymous Challenger';
    const numTime = Number(timeTaken) || 0;

    // Server-side answer verification against MASTER_ANSWER_KEYS
    let finalVerifiedScore = Number(score) || 0;
    if (Array.isArray(userAnswers) && userAnswers.length > 0) {
      let verifiedCount = 0;
      userAnswers.forEach((ans: number, idx: number) => {
        if (idx < MASTER_ANSWER_KEYS.length && Number(ans) === MASTER_ANSWER_KEYS[idx]) {
          verifiedCount++;
        }
      });
      finalVerifiedScore = verifiedCount;
    }

    const scoresRef = adminDb.collection('quiz-scores');

    // Check for duplicate attempt by email
    const existingSnap = await scoresRef.where('email', '==', cleanEmail).limit(1).get();
    if (!existingSnap.empty) {
      return NextResponse.json(
        { error: 'You have already completed the AI Challenge! Only 1 entry per email address is allowed.' },
        { status: 400 }
      );
    }

    // Save verified score to quiz-scores collection
    const docRef = await scoresRef.add({
      name: cleanName,
      email: cleanEmail,
      score: finalVerifiedScore,
      totalQuestions: Number(totalQuestions) || 15,
      timeTaken: numTime,
      userAnswers: Array.isArray(userAnswers) ? userAnswers : [],
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      id: docRef.id,
      score: finalVerifiedScore,
      message: 'Quiz score submitted and verified successfully!',
    });
  } catch (err: any) {
    console.error('Failed to submit quiz score:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to submit quiz score.' },
      { status: 500 }
    );
  }
}
