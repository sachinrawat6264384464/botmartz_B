import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('eventId') || 'ai-frontier-2026';

    // 1. Fetch all feedbacks
    const feedbackSnap = await adminDb
      .collection('event-feedbacks')
      .get();

    const feedbacks: any[] = [];
    feedbackSnap.forEach((doc) => {
      feedbacks.push({ id: doc.id, ...doc.data() });
    });

    // Filter feedbacks for the requested event (or return all if eventId is 'all')
    const filteredFeedbacks = eventId === 'all' 
      ? feedbacks 
      : feedbacks.filter(f => f.eventId === eventId || f.eventSlug === eventId);

    // 2. Fetch all paid registrations
    const regSnap = await adminDb
      .collection('event-registrations')
      .where('paymentStatus', '==', 'paid')
      .get();

    const registrations: any[] = [];
    regSnap.forEach((doc) => {
      const data = doc.data();
      registrations.push({
        id: doc.id,
        ...data,
      });
    });

    // 3. Compute Metrics
    const totalFeedbacks = filteredFeedbacks.length;
    const totalRegistrations = registrations.length;
    
    let sumOverall = 0;
    let sumContent = 0;
    let sumVenue = 0;
    let recommendYesCount = 0;

    filteredFeedbacks.forEach((f) => {
      sumOverall += Number(f.overallRating) || 0;
      sumContent += Number(f.contentRating) || 0;
      sumVenue += Number(f.venueRating) || 0;
      if (f.recommend === 'yes') recommendYesCount++;
    });

    const avgOverall = totalFeedbacks > 0 ? (sumOverall / totalFeedbacks).toFixed(1) : '0.0';
    const avgContent = totalFeedbacks > 0 ? (sumContent / totalFeedbacks).toFixed(1) : '0.0';
    const avgVenue = totalFeedbacks > 0 ? (sumVenue / totalFeedbacks).toFixed(1) : '0.0';
    const recommendRate = totalFeedbacks > 0 ? Math.round((recommendYesCount / totalFeedbacks) * 100) : 0;
    const coverageRate = totalRegistrations > 0 ? Math.round((totalFeedbacks / totalRegistrations) * 100) : 0;

    // 4. Map Participant Feedback Status
    const feedbackByCode = new Map<string, any>();
    const feedbackByEmail = new Map<string, any>();

    filteredFeedbacks.forEach((f) => {
      if (f.registrationCode) feedbackByCode.set(f.registrationCode.toUpperCase(), f);
      if (f.participantEmail) feedbackByEmail.set(f.participantEmail.toLowerCase(), f);
      if (f.identifierProvided) {
        const id = f.identifierProvided.trim();
        if (id.includes('@')) feedbackByEmail.set(id.toLowerCase(), f);
        else feedbackByCode.set(id.toUpperCase(), f);
      }
    });

    const participantStatusList = registrations.map((r) => {
      const code = (r.registrationCode || '').toUpperCase();
      const email = (r.email || '').toLowerCase();
      
      const feedback = feedbackByCode.get(code) || feedbackByEmail.get(email) || null;
      const feedbackGiven = !!feedback || !!r.feedbackSubmitted;

      return {
        id: r.id,
        name: r.name || 'Anonymous Participant',
        email: r.email || '',
        phone: r.phone || '',
        registrationCode: r.registrationCode || '',
        attendeeType: r.attendeeType || 'student',
        companyOrCollege: r.company || r.collegeName || r.companyName || '-',
        quantity: r.quantity || 1,
        feedbackGiven,
        feedbackDetails: feedback,
      };
    });

    const pendingCount = participantStatusList.filter(p => !p.feedbackGiven).length;

    return NextResponse.json({
      success: true,
      stats: {
        totalFeedbacks,
        totalRegistrations,
        pendingCount,
        avgOverall,
        avgContent,
        avgVenue,
        recommendRate,
        coverageRate,
      },
      feedbacks: filteredFeedbacks,
      participantStatusList,
    });
  } catch (err: any) {
    console.error('Failed to fetch admin feedback data:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
