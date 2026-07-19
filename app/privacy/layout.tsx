import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Botmartz AI Solutions collects, uses, and protects your data and privacy.',
  openGraph: {
    title: 'Privacy Policy | Botmartz AI Solutions',
    description: 'Learn how Botmartz AI Solutions collects, uses, and protects your data and privacy.',
    url: 'https://www.botmartz.com/privacy',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.botmartz.com/privacy',
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
