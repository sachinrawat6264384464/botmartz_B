import { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import ContactClient from './ContactClient';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Contact Us',
    description: 'Book a discovery call with the Botmartz AI engineering team. Let\'s discuss how custom Generative AI and RAG solutions can impact your business.',
    keywords: ['Contact Botmartz', 'AI Consulting', 'Hire AI Engineers', 'Enterprise AI Solutions'],
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Botmartz AI Solutions",
    "description": metaDesc,
    "mainEntity": {
      "@type": "Organization",
      "name": "Botmartz AI Solutions",
      "email": "soham@botmartz.com",
      "telephone": "+91 94073 28842",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Indore",
        "addressCountry": "IN"
      }
    }
  };

  return <ContactClient heroData={heroData} structuredData={structuredData} />;
}