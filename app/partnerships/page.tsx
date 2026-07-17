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
      title: meta.title,
      description: meta.description,
      url: 'https://botmartz.com/partnerships',
      type: 'website',
    },
  };
}

export default async function PartnershipsPage() {
  return <PartnershipsClient />;
}
