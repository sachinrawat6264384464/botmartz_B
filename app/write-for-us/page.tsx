import { Metadata } from 'next';
import WriteAccessClient from './WriteAccessClient';

export const metadata: Metadata = {
  title: 'Write for Botmartz | Engineering Insights Author Guidelines',
  description: 'Submission guidelines, technical standards, and editorial process for publishing deep dives on Botmartz Engineering Insights. Send your draft to team@botmartz.com.',
  openGraph: {
    title: 'Write for Botmartz | Engineering Insights Author Guidelines',
    description: 'Learn how to publish production AI, RAG, and deep learning engineering deep dives on Botmartz Engineering Insights.',
    url: 'https://www.botmartz.com/write-for-us',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.botmartz.com/write-for-us',
  },
};

export default function WriteForUsPage() {
  return <WriteAccessClient />;
}
