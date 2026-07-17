import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partnerships | Partner with Botmartz AI Solutions',
  description: 'Collaborate with Botmartz AI on strategic consulting, joint AI solutions, research programs, and ecosystem integrations.',
  openGraph: {
    title: 'Partnerships | Partner with Botmartz AI Solutions',
    description: 'Collaborate with Botmartz AI on strategic consulting, joint AI solutions, research programs, and ecosystem integrations.',
    url: 'https://botmartz.com/partnerships',
    type: 'website',
  },
};

export default function PartnershipsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
