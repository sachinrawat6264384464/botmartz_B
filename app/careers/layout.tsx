import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Explore career opportunities at Botmartz AI. Build production-grade AI agents, enterprise RAG systems, and open-source infrastructure.',
  openGraph: {
    title: 'Careers',
    description: 'Explore career opportunities at Botmartz AI. Build production-grade AI agents, enterprise RAG systems, and open-source infrastructure.',
    url: 'https://www.botmartz.com/careers',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.botmartz.com/careers',
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
