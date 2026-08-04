import type { Metadata } from 'next';
import AIFrontierEventBody from './AIFrontierEventBody';

// ─── SEO METADATA ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'AI Frontier 2026 — The Future of AI Engineering | Botmartz',
  description: 'Join AI Frontier 2026 — Botmartz\'s flagship AI Engineering Summit on August 22, 2026 at Indore, India. Learn from AI engineers, researchers, and founders. Sessions on AI Agents, Enterprise RAG, LLMs, Responsible AI & more.',
  keywords: [
    'AI Frontier 2026',
    'AI Engineering Summit Bangalore',
    'AI conference India 2026',
    'AI Agents conference',
    'Enterprise RAG event',
    'LLM conference 2026',
    'Botmartz AI event',
    'AI engineering community',
    'production AI systems',
    'AI Frontier by Botmartz'
  ],
  openGraph: {
    type: 'website',
    title: 'AI Frontier 2026 — The Future of AI Engineering',
    description: 'The flagship AI Engineering Summit by Botmartz. August 22, 2026 · Indore, India. AI Agents, Enterprise RAG, LLMs, Responsible AI.',
    url: 'https://www.botmartz.com/community/events/ai-frontier-2026',
    siteName: 'Botmartz',
    images: [{ url: '/BotmartznewBot.png', width: 1200, height: 630, alt: 'AI Frontier 2026 Event Banner' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Frontier 2026 — The Future of AI Engineering',
    description: 'Botmartz\'s flagship AI Engineering Summit. August 22, 2026 · Indore, India.',
    images: ['/BotmartznewBot.png'],
  },
  alternates: {
    canonical: 'https://www.botmartz.com/community/events/ai-frontier-2026',
  },
};

// ─── EVENT STRUCTURED DATA (JSON-LD) ─────────────────────────────────────────
const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'AI Frontier 2026 — The Future of AI Engineering',
  url: 'https://www.botmartz.com/community/events/ai-frontier-2026',
  description:
    'AI Frontier 2026 is Botmartz\'s flagship AI Engineering Summit bringing together engineers, researchers, founders, and tech leaders to explore the frontiers of AI: Agents, Enterprise RAG, LLMs, Responsible AI, and AI-Assisted Development.',
  startDate: '2026-08-22T10:00:00+05:30',
  endDate: '2026-08-22T17:00:00+05:30',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'Walkover Co-working Space',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Indore',
      addressRegion: 'Madhya Pradesh',
      addressCountry: 'IN',
    },
  },
  image: 'https://www.botmartz.com/BotmartznewBot.png',
  organizer: {
    '@type': 'Organization',
    name: 'Botmartz',
    url: 'https://www.botmartz.com',
  },
  offers: {
    '@type': 'Offer',
    name: 'General Admission',
    url: 'https://www.botmartz.com/contact',
    availability: 'https://schema.org/InStock',
    validFrom: '2026-01-01',
  },
  performer: [
    {
      '@type': 'Person',
      name: 'Dr. Promit Ray',
      jobTitle: 'Chief AI Scientist',
    },
    {
      '@type': 'Person',
      name: 'Soham Sharma',
      jobTitle: 'Principal AI Architect & Host',
    },
  ],
  about: [
    'AI Agents',
    'Enterprise RAG',
    'Large Language Models',
    'MLOps',
    'Responsible AI',
    'AI-Assisted Development',
    'Production AI Engineering',
  ],
};

// ─── FAQ STRUCTURED DATA (for AEO / Answer Engine Optimization) ──────────────
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who can attend AI Frontier 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI Frontier 2026 is designed for AI engineers, software engineers, researchers, technical leads, founders, and engineering managers who want to explore the frontier of AI engineering. Students with a strong interest in production AI systems are also welcome.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is prior AI knowledge required to attend AI Frontier?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A basic understanding of software engineering and general interest in AI is helpful. Sessions range from architecture-level talks to hands-on labs. There is no requirement to have prior experience with specific AI frameworks like PyTorch or LangGraph, though familiarity helps you get more out of the technical sessions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will the AI Frontier sessions be recorded?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Registered attendees will receive early access to session recordings after the event. Each session — from the keynote to the closing panel — will be edited into full-length videos and shorter highlight clips.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is included in the AI Frontier 2026 ticket?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your ticket includes access to all main stage sessions, hands-on labs, the AI Startup Showcase, the closing panel discussion, the AI Builders Night after-party, a copy of the AI Engineering Roadmap 2026 handbook, a swag kit, a certificate of participation, and access to the Botmartz AI Engineering Community.',
      },
    },
    {
      '@type': 'Question',
      name: 'When and where is AI Frontier 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI Frontier 2026 takes place on August 22, 2026 at Walkover Co-working Space, Indore, India.',
      },
    },
    {
      '@type': 'Question',
      name: 'What topics are covered at AI Frontier 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI Frontier 2026 covers: Engineering Production AI Systems, AI Agents & Automation, Enterprise RAG, LangGraph, LLMs and Generative AI Applications, AI-Assisted Development, MLOps & Observability, Responsible AI & Safety, open-source AI, and AI engineering career advice.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there group discounts for AI Frontier?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Group and corporate rates are available for teams of 5 or more (up to ₹100 off per person).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Botmartz AI Engineering Community?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Botmartz AI Engineering Community is a long-term ecosystem launched at AI Frontier 2026. It includes monthly technical meetups, a Discord server, a newsletter, a GitHub organization, open-source contribution nights, reading clubs, and hackathons for AI engineers and researchers.',
      },
    },
  ],
};

import { adminDb } from '@/lib/firebase-admin';

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default async function AIFrontierPage() {
  let event: any = null;
  try {
    const q = adminDb.collection('events').where('slug', '==', 'ai-frontier-2026').limit(1);
    const snap = await q.get();
    if (!snap.empty) {
      event = { id: snap.docs[0].id, ...snap.docs[0].data() };
    }
  } catch (e) {
    console.error("Failed to load AI Frontier event document:", e);
  }

  const sanitizedEvent = event ? JSON.parse(JSON.stringify(event)) : null;

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <AIFrontierEventBody event={sanitizedEvent} />
    </>
  );
}
