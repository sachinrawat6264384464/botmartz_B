"use client";

import { useEffect, Suspense } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { ROUTE_MODULE_MAP } from '@/lib/modules';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, userRole, loading, hasAccess } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (loading) return;

    // Not authenticated → send to login
    if (!user && !isLoginPage) {
      const timer = setTimeout(() => {
        router.replace('/admin/login');
      }, 0);
      return () => clearTimeout(timer);
    }

    // Already authenticated → skip login page
    if (user && isLoginPage) {
      const timer = setTimeout(() => {
        router.replace('/admin');
      }, 0);
      return () => clearTimeout(timer);
    }

    // Route permission check (skip login & unauthorized pages)
    if (user && userRole && !isLoginPage && pathname !== '/admin/unauthorized') {
      const matchedKey = Object.keys(ROUTE_MODULE_MAP).find(
        (key) => pathname === key || pathname.startsWith(key + '/')
      );
      const moduleId = matchedKey ? ROUTE_MODULE_MAP[matchedKey] : undefined;
      if (moduleId && !hasAccess(moduleId)) {
        const timer = setTimeout(() => {
          router.replace('/admin/unauthorized');
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [user, userRole, loading, isLoginPage, pathname, router, hasAccess]);

  // Full-screen spinner while auth resolves
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-700 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  // Login page: no sidebar / header
  if (isLoginPage || !user) {
    return <>{children}</>;
  }

  // All authenticated pages — sidebar + header shell
  return (
    <div className="flex h-screen bg-admin-bg overflow-hidden font-sans text-admin-text">
      <Suspense fallback={<div className="w-[232px] bg-admin-card border-r border-admin-border" />}>
        <AdminSidebar />
      </Suspense>
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto bg-admin-bg">
          {children}
        </main>
      </div>
    </div>
  );
}
