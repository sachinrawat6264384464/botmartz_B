import { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import PartnershipsClient from './PartnershipsClient';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Enterprise AI Ecosystem & Partner Integrations | Botmartz',
    description: 'We work across the modern enterprise AI ecosystem — platforms, search engines, vector databases, and cloud infrastructure — to design solutions around client requirements.',
  };
  
  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("partnerships").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      if (data?.metadata) {
        meta = { ...meta, ...data.metadata };
      }
    }
  } catch (e) {}

  return {
    ...meta,
    openGraph: {
      title: `${meta.title} | Botmartz`,
      description: meta.description,
      url: 'https://www.botmartz.com/partnerships',
      type: 'website',
    },
    alternates: {
      canonical: 'https://www.botmartz.com/partnerships',
    },
  };
}

export default async function PartnershipsPage() {
  let heroContent = {
    badge: "Enterprise AI Ecosystem",
    title: "We Work Across the<br /><span class=\"text-[#00B8F0]\">Modern AI Ecosystem</span>",
    subtitle: "We design solutions around client requirements rather than forcing every problem into a single technology stack. We partner and integrate across leading enterprise AI platforms, search engines, vector databases, and cloud providers.",
    ctaText: "Discuss a Partnership →",
    ctaLink: "#partner-inquiry",
  };
  let structuredData = "";
  let aeoQuestion = "";
  let aeoAnswer = "";

  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("partnerships").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      if (data?.hero) heroContent = { ...heroContent, ...data.hero };
      if (data?.structuredData) structuredData = data.structuredData;
      if (data?.aeoQuestion) aeoQuestion = data.aeoQuestion;
      if (data?.aeoAnswer) aeoAnswer = data.aeoAnswer;
    }
  } catch (e) {}

  const sanitizedHero = JSON.parse(JSON.stringify(heroContent));

  return (
    <PartnershipsClient 
      heroContent={sanitizedHero}
      structuredData={structuredData}
    />
  );
}
