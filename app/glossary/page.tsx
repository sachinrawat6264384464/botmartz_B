import { Metadata } from 'next';
import GlossaryHubClient from './GlossaryHubClient';
import { MASTER_GLOSSARY_TERMS } from '@/lib/glossary/data';

export const metadata: Metadata = {
  title: 'AI Engineering & Architecture Glossary | A–Z Technical Hub | Botmartz',
  description: 'The canonical technical glossary for AI engineers and systems architects. In-depth definitions, mathematical models, and implementation guides for RAG, LangGraph agents, hybrid search, and vector databases.',
  alternates: {
    canonical: 'https://www.botmartz.com/glossary',
  },
  openGraph: {
    title: 'AI Engineering & Architecture Glossary | A–Z Technical Hub | Botmartz',
    description: 'The canonical technical glossary for AI engineers and systems architects. In-depth definitions, mathematical models, and implementation guides for RAG, LangGraph agents, hybrid search, and vector databases.',
    url: 'https://www.botmartz.com/glossary',
    type: 'website',
    images: [{
      url: 'https://www.botmartz.com/images/architecture/system-stack-architecture.svg',
      width: 1200,
      height: 630,
      alt: 'Botmartz AI Engineering & Architecture Technical Glossary',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Engineering & Architecture Glossary | Botmartz',
    description: 'The canonical technical glossary for AI engineers and systems architects.',
    images: ['https://www.botmartz.com/images/architecture/system-stack-architecture.svg'],
  },
};

export default function GlossaryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": "Botmartz Enterprise AI & RAG Engineering Glossary",
    "description": "Comprehensive technical glossary defining modern enterprise RAG, multi-agent systems, hybrid search, and production AI architectures.",
    "url": "https://www.botmartz.com/glossary",
    "hasDefinedTerm": MASTER_GLOSSARY_TERMS.map(item => ({
      "@type": "DefinedTerm",
      "name": item.term,
      "description": item.shortDefinition,
      "inDefinedTermSet": "https://www.botmartz.com/glossary"
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GlossaryHubClient />
    </>
  );
}
