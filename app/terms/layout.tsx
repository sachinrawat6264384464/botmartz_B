import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Review the legal terms and conditions governing the use of Botmartz AI Solutions platforms and consulting services.',
  openGraph: {
    title: 'Terms of Service | Botmartz AI Solutions',
    description: 'Review the legal terms and conditions governing the use of Botmartz AI Solutions platforms and consulting services.',
    url: 'https://www.botmartz.com/terms',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.botmartz.com/terms',
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
