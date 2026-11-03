import { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import { getCachedGlobalSettings } from '@/lib/fetch-helpers';
import ContactClient from './ContactClient';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Contact Botmartz | Schedule AI Architecture Review',
    description: 'Book an enterprise AI discovery session with founding engineers. We evaluate your document corpus, state machine requirements, and provide a 24h technical verdict.',
    keywords: ['Contact Botmartz', 'AI Architecture Review', 'Enterprise RAG Consulting', 'Hire AI Engineers', 'Enterprise AI Solutions'],
  };
  
  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("contact").get();
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
      url: 'https://www.botmartz.com/contact',
      type: 'website',
      images: [{
        url: 'https://www.botmartz.com/images/architecture/contact-scoping-protocol.svg',
        width: 1200,
        height: 630,
        alt: 'Botmartz Architecture Review and Technical Scoping Protocol',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${meta.title} | Botmartz`,
      description: meta.description,
      images: ['https://www.botmartz.com/images/architecture/contact-scoping-protocol.svg'],
    },
    alternates: {
      canonical: 'https://www.botmartz.com/contact',
    },
  };
}

export default async function ContactPage() {
  let metaDesc = 'Book a discovery call with the Botmartz AI engineering team. Let\'s discuss how custom Generative AI and RAG solutions can impact your business.';
  let heroData = {
    badge: "Get in Touch",
    title: "Let's Build <span className=\"text-[#00B8F0]\">Something Great.</span>",
    subtitle: "Ready to explore how Enterprise RAG and Autonomous Agents can drive efficiency in your organization? Book a strategy session with our engineering team."
  };

  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("contact").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      if (data?.metadata?.description) metaDesc = data.metadata.description;
      if (data?.hero) heroData = { ...heroData, ...data.hero };
    }
  } catch (e) {}

  let settings: any = {};
  try {
    settings = await getCachedGlobalSettings();
  } catch (e) {}

  const email = settings?.general?.email || "team@botmartz.com";
  const phone = settings?.general?.phone || "+91 97300 84626";
  const companyName = settings?.general?.companyName || "Botmartz AI Solutions";
  const address = settings?.general?.address || "Indore, IN";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": `Contact ${companyName}`,
    "description": metaDesc,
    "mainEntity": {
      "@type": "Organization",
      "name": companyName,
      "email": email,
      "telephone": phone,
      "address": {
        "@type": "PostalAddress",
        "name": address
      }
    }
  };

  return <ContactClient heroData={heroData} structuredData={structuredData} settings={settings} />;
}