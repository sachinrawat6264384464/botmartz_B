import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      eventId = 'ai-frontier-2026',
      eventSlug = 'ai-frontier-2026',
      identifier = '',
      overallRating = 5,
      contentRating = 5,
      venueRating = 5,
      recommend = 'yes',
      takeaways = '',
      comments = '',
    } = body;

    if (!identifier || !identifier.trim()) {
      return NextResponse.json(
        { error: 'Check-in Code or Email is required.' },
        { status: 400 }
      );
    }

    const cleanIdentifier = identifier.trim();
    const upperCode = cleanIdentifier.toUpperCase();
    const lowerEmail = cleanIdentifier.toLowerCase();

    // 1. Search participant in Firestore event-registrations
    const regRef = adminDb.collection('event-registrations');
    let matchedDoc: any = null;
    let participantData: any = null;

    // Try matching by registrationCode / ticketCode
    const codeQuery = await regRef
      .where('registrationCode', '==', upperCode)
      .limit(1)
      .get();

    if (!codeQuery.empty) {
      matchedDoc = codeQuery.docs[0];
      participantData = matchedDoc.data();
    } else {
      // Try matching by email
      const emailQuery = await regRef
        .where('email', '==', lowerEmail)
        .limit(1)
        .get();

      if (!emailQuery.empty) {
        matchedDoc = emailQuery.docs[0];
        participantData = matchedDoc.data();
      } else {
        // Try matching by phone
        const phoneQuery = await regRef
          .where('phone', '==', cleanIdentifier)
          .limit(1)
          .get();

        if (!phoneQuery.empty) {
          matchedDoc = phoneQuery.docs[0];
          participantData = matchedDoc.data();
        }
      }
    }

    // 2. Build Feedback Record
    const feedbackDoc = {
      eventId,
      eventSlug,
      identifierProvided: cleanIdentifier,
      matchedParticipant: !!matchedDoc,
      participantId: matchedDoc ? matchedDoc.id : null,
      participantName: participantData?.name || cleanIdentifier,
      participantEmail: participantData?.email || (cleanIdentifier.includes('@') ? lowerEmail : ''),
      participantPhone: participantData?.phone || '',
      attendeeType: participantData?.attendeeType || 'student',
      registrationCode: participantData?.registrationCode || (upperCode.startsWith('REG-') ? upperCode : ''),
      overallRating: Number(overallRating) || 5,
      contentRating: Number(contentRating) || 5,
      venueRating: Number(venueRating) || 5,
      recommend: recommend === 'yes' || recommend === true ? 'yes' : 'no',
      takeaways: takeaways.trim(),
      comments: comments.trim(),
      createdAt: new Date().toISOString(),
    };

    // 3. Save to event-feedbacks collection
    const feedbackRef = await adminDb.collection('event-feedbacks').add(feedbackDoc);

    // 4. If matched, update participant document
    if (matchedDoc) {
      await matchedDoc.ref.update({
        feedbackSubmitted: true,
        feedbackId: feedbackRef.id,
        feedbackSubmittedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Feedback submitted successfully!',
      feedbackId: feedbackRef.id,
      matched: !!matchedDoc,
      participantName: feedbackDoc.participantName,
    });
  } catch (err: any) {
    console.error('Failed to submit feedback:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
