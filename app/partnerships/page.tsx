import { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import PartnershipsClient from './PartnershipsClient';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Partnerships | Grow the AI Engineering Ecosystem With Us',
    description: 'We partner with frameworks, cloud providers, universities and incubators to bring AI Frontier, our labs, and our community further — together.',
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
    badge: "Partnerships",
    title: "Grow the AI<br />Engineering <span class=\"text-[#00C6FF]\">Ecosystem</span> With Us",
    subtitle: "We partner with frameworks, cloud providers, universities and incubators to bring AI Frontier, our labs, and our community further — together.",
    ctaText: "Become a Partner →",
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
      aeoQuestion={aeoQuestion}
      aeoAnswer={aeoAnswer}
    />
  );
}
