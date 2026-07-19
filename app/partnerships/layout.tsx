import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Partnerships | Partner with Botmartz AI Solutions | Botmartz',
  },
  description: 'Collaborate with Botmartz AI on strategic consulting, joint AI solutions, research programs, and ecosystem integrations.',
  openGraph: {
    title: 'Partnerships | Partner with Botmartz AI Solutions | Botmartz',
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
