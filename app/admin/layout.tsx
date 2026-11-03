import { Metadata } from 'next';
import { AuthProvider } from '@/lib/context/AuthContext';
import AdminShell from './components/AdminShell';

export const metadata: Metadata = {
  title: 'Internal Console | Botmartz AI Solutions',
  description: 'Restricted access enterprise administration control plane.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  );
}
