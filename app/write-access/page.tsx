import { Metadata } from 'next';
import Link from 'next/link';
import WriteAccessClient from './WriteAccessClient';

export const metadata: Metadata = {
  title: 'Write for Botmartz | Engineering Insights Author Guidelines',
  description: 'Submission guidelines, technical standards, and editorial process for publishing deep dives on Botmartz Engineering Insights. Send your draft to team@botmartz.com.',
  openGraph: {
    title: 'Write for Botmartz | Engineering Insights Author Guidelines',
    description: 'Learn how to publish production AI, RAG, and deep learning engineering deep dives on Botmartz Engineering Insights.',
    url: 'https://www.botmartz.com/write-access',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.botmartz.com/write-access',
  },
};

export default function WriteAccessPage() {
  return <WriteAccessClient />;
}
