import { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import CommunityClient from './CommunityClient';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Botmartz AI Engineering Community | One Community. Many Ways to Build.',
    description: 'Launched at AI Frontier 2026 — meetups, a Discord, an open-source GitHub org, a reading club and hackathons, all in one place for engineers who want to build.',
  };
  
  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("community").get();
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
      title: meta.title,
      description: meta.description,
      url: 'https://botmartz.com/community',
      type: 'website',
    },
  };
}

export default async function CommunityPage() {
  let heroContent = {
    badge: "Botmartz AI Engineering Community",
    title: "One Community.<br /><span class=\"text-[#00C6FF]\">Many Ways</span> to Build.",
    subtitle: "Launched at AI Frontier 2026 — meetups, a Discord, an open-source GitHub org, a reading club and hackathons, all in one place for engineers who want to build, not just watch.",
    ctaText: "Join the Discord →",
    ctaLink: "https://discord.gg/botmartz",
  };
  let structuredData = "";
  let aeoQuestion = "";
  let aeoAnswer = "";

  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("community").get();
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
    <CommunityClient 
      heroContent={sanitizedHero}
      structuredData={structuredData}
      aeoQuestion={aeoQuestion}
      aeoAnswer={aeoAnswer}
    />
  );
}
