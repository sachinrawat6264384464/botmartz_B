import { AuthProvider } from '@/lib/context/AuthContext';
import AdminShell from './components/AdminShell';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  );
}
