"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Inter_Tight } from 'next/font/google';
import { useAuth } from '@/lib/context/AuthContext';
import { MODULES } from '@/lib/modules';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { user, userRole, hasAccess, logout } = useAuth();

  // Filter modules the current user is allowed to see
  const allowedModules = MODULES.filter((mod) => {
    if (mod.id === 'roles') return userRole?.isSuperAdmin ?? false;
    return hasAccess(mod.id);
  });

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await logout();
      router.push('/admin/login');
    } catch {
      setSigningOut(false);
    }
  };

  const displayName = userRole?.displayName || user?.displayName || 'Admin User';
  const displayEmail = userRole?.email || user?.email || '';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'AD';

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-gray-900 rounded-xl border border-gray-800 shadow-lg"
      >
        {isOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${interTight.className} fixed lg:static inset-y-0 left-0 z-40 bg-gray-950 border-r border-gray-800/50 transform transition-all duration-300 ease-in-out lg:transform-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${collapsed ? 'w-20' : 'w-72'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={`p-6 border-b border-gray-800/50 ${collapsed ? 'px-4' : ''}`}>
            <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
              <div className="relative w-10 h-10 shrink-0">
                <Image src="/Botmartz_silver.png" alt="BOTMARTZ" fill className="object-contain" />
              </div>
              {!collapsed && (
                <div className="overflow-hidden">
                  <h1 className="text-lg font-bold text-white tracking-tight">BOTMARTZ</h1>
                  <p className="text-[10px] text-gray-500 tracking-widest uppercase">Admin Panel</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation — RBAC filtered */}
          <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
            {allowedModules.map((mod) => {
              const isActive = pathname === mod.href;
              const Icon = mod.icon;

              return (
                <Link
                  key={mod.id}
                  href={mod.href}
                  onClick={() => setIsOpen(false)}
                  title={collapsed ? mod.label : undefined}
                  className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    collapsed ? 'justify-center px-3' : ''
                  } ${
                    isActive
                      ? 'bg-white text-gray-900 font-semibold shadow-lg shadow-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-white'} />
                  {!collapsed && (
                    <>
                      <span className="text-sm">{mod.label}</span>
                      {mod.badge && !isActive && (
                        <span className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      )}
                    </>
                  )}
                  {collapsed && mod.badge && !isActive && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Collapse Toggle — desktop only */}
          <div className="hidden lg:block p-3 border-t border-gray-800/50">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all ${
                collapsed ? 'justify-center px-3' : ''
              }`}
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              {!collapsed && <span>Collapse</span>}
            </button>
          </div>

          {/* User info + logout */}
          <div className={`p-3 border-t border-gray-800/50 ${collapsed ? 'px-2' : ''}`}>
            <div className={`bg-gray-900/50 rounded-xl p-3 mb-2 ${collapsed ? 'p-2' : ''}`}>
              <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
                <div className="w-9 h-9 bg-linear-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-white">{initials}</span>
                </div>
                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{displayName}</p>
                    <p className="text-xs text-gray-500 truncate">{displayEmail}</p>
                  </div>
                )}
              </div>
              {!collapsed && userRole?.isSuperAdmin && (
                <span className="mt-2 inline-block px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-[10px] font-semibold rounded tracking-wider uppercase">
                  Super Admin
                </span>
              )}
            </div>

            <button
              onClick={handleSignOut}
              disabled={signingOut}
              title={collapsed ? 'Sign Out' : undefined}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                collapsed ? 'justify-center px-3' : ''
              }`}
            >
              {signingOut ? (
                <span className="w-4 h-4 border-2 border-gray-500 border-t-red-400 rounded-full animate-spin" />
              ) : (
                <LogOut size={18} />
              )}
              {!collapsed && <span>{signingOut ? 'Signing out…' : 'Sign Out'}</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
