import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers | Join Botmartz AI Engineering Team',
  description: 'Explore career opportunities at Botmartz AI. Build production-grade AI agents, enterprise RAG systems, and open-source infrastructure.',
  openGraph: {
    title: 'Careers | Join Botmartz AI Engineering Team',
    description: 'Explore career opportunities at Botmartz AI. Build production-grade AI agents, enterprise RAG systems, and open-source infrastructure.',
    url: 'https://botmartz.com/careers',
    type: 'website',
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
