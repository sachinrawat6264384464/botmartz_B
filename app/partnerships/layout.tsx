import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partnerships & Technology Ecosystem',
  description: 'Collaborate with Botmartz AI on strategic consulting, joint AI solutions, research programs, and ecosystem integrations.',
  openGraph: {
    title: 'Partnerships & Technology Ecosystem',
    description: 'Collaborate with Botmartz AI on strategic consulting, joint AI solutions, research programs, and ecosystem integrations.',
    url: 'https://www.botmartz.com/partnerships',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.botmartz.com/partnerships',
  },
};

export default function PartnershipsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
