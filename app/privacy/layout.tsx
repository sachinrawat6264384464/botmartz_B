import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Botmartz AI Solutions',
  description: 'Learn how Botmartz AI Solutions collects, uses, and protects your data and privacy.',
  openGraph: {
    title: 'Privacy Policy | Botmartz AI Solutions',
    description: 'Learn how Botmartz AI Solutions collects, uses, and protects your data and privacy.',
    url: 'https://botmartz.com/privacy',
    type: 'website',
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
