import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Understand how Botmartz AI Solutions uses cookies and tracking technologies across our web services.',
  openGraph: {
    title: 'Cookie Policy | Botmartz AI Solutions',
    description: 'Understand how Botmartz AI Solutions uses cookies and tracking technologies across our web services.',
    url: 'https://www.botmartz.com/cookies',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.botmartz.com/cookies',
  },
};

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
