"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, LogOut, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import Image from 'next/image';
import { Inter_Tight } from 'next/font/google';
import { useAuth } from '@/lib/context/AuthContext';
import { MODULES, ModuleId } from '@/lib/modules';
import { db } from '@/lib/firebase';
import { collection, query, where, getCountFromServer } from 'firebase/firestore';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const SECTION_GROUPS: { label: string; ids: ModuleId[] }[] = [
  { label: 'Overview', ids: ['dashboard'] },
  { label: 'Content',  ids: ['contacts'] },
];

const BADGE_STYLE: Partial<Record<ModuleId, string>> = {
  contacts: 'bg-sky-500/20 text-sky-300 border border-sky-500/30',
};

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [liveCounts, setLiveCounts] = useState<Partial<Record<ModuleId, number>>>({});

  const pathname = usePathname();
  const router = useRouter();
  const { user, userRole, hasAccess, logout } = useAuth();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const c = await getCountFromServer(query(collection(db, 'contacts'), where('status', '==', 'unread')));
        setLiveCounts({ contacts: c.data().count });
      } catch { /* ignore */ }
    };
    fetchCounts();
  }, [pathname]);

  const allowedModules = MODULES.filter((mod) => {
    if (userRole?.isSuperAdmin) return true;
    return hasAccess(mod.id);
  });

  const handleSignOut = async () => {
    setSigningOut(true);
    try { await logout(); router.push('/admin/login'); }
    catch { setSigningOut(false); }
  };

  const displayName = userRole?.displayName || user?.displayName || 'Admin User';
  const displayEmail = userRole?.email || user?.email || '';
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'AD';

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-[#111114] rounded-xl border border-white/10 shadow-lg"
      >
        {isOpen ? <X size={18} className="text-white/70" /> : <Menu size={18} className="text-white/70" />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40" />
      )}

      {/* Sidebar */}
      <aside
        className={`${interTight.className} fixed lg:static inset-y-0 left-0 z-40 flex flex-col bg-[#111114] border-r border-white/[0.07] transform transition-all duration-300 ease-in-out lg:transform-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${collapsed ? 'w-[62px]' : 'w-[232px]'}`}
      >

        {/* ── Logo ── */}
        <div className={`flex items-center gap-3 px-4 py-5 ${collapsed ? 'justify-center' : ''}`}>
          <div className="relative w-8 h-8 shrink-0">
            <Image src="/BotmartzNewLogo.png" alt="BOTMARTZ" fill className="object-contain" />
          </div>
          {!collapsed && (
            <div>
              <p className="text-[13px] font-bold text-white tracking-tight leading-none">BOTMARTZ</p>
              <p className="text-[9px] text-white/30 tracking-[0.2em] uppercase mt-1">Admin Panel</p>
            </div>
          )}
        </div>

        {/* Hairline */}
        <div className="mx-3 h-px bg-white/[0.06]" />

        {/* ── Navigation ── */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5" style={{ scrollbarWidth: 'none' }}>
          {SECTION_GROUPS.map((group) => {
            const groupMods = allowedModules.filter((m) => group.ids.includes(m.id));
            if (groupMods.length === 0) return null;

            return (
              <div key={group.label}>
                {!collapsed ? (
                  <div className="flex items-center gap-2 px-3 mb-2">
                    <span className="text-[9px] font-semibold text-white/30 uppercase tracking-[0.2em] shrink-0">
                      {group.label}
                    </span>
                    <div className="flex-1 h-px bg-white/[0.06]" />
                  </div>
                ) : (
                  <div className="mx-2 mb-2 h-px bg-white/[0.06]" />
                )}

                <div className="space-y-0.5">
                  {groupMods.map((mod) => {
                    const isActive = pathname === mod.href || (mod.href !== '/admin' && pathname.startsWith(mod.href));
                    const Icon = mod.icon;
                    const count = liveCounts[mod.id] ?? 0;
                    const showBadge = mod.badge && count > 0;
                    const badgeClass = BADGE_STYLE[mod.id] ?? '';

                    return (
                      <Link
                        key={mod.id}
                        href={mod.href}
                        onClick={() => setIsOpen(false)}
                        className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 ${
                          collapsed ? 'justify-center' : ''
                        } ${
                          isActive
                            ? 'bg-white/[0.09] text-white'
                            : 'text-white/50 hover:text-white/80 hover:bg-white/[0.05]'
                        }`}
                      >
                        {/* Active left bar */}
                        {isActive && (
                          <span
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 rounded-r-full bg-white/80"
                          />
                        )}

                        <Icon
                          size={16}
                          className={`shrink-0 transition-colors ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}
                        />

                        {!collapsed && (
                          <>
                            <span className={`text-[13px] flex-1 leading-none ${isActive ? 'font-semibold text-white' : 'font-medium'}`}>
                              {mod.label}
                            </span>
                            {showBadge && (
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${badgeClass}`}>
                                {count}
                              </span>
                            )}
                          </>
                        )}

                        {collapsed && (
                          <>
                            {showBadge && (
                              <span className="absolute top-1.5 right-1.5 w-[5px] h-[5px] rounded-full bg-sky-400" />
                            )}
                            {/* Tooltip */}
                            <div className="absolute left-full ml-3 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="flex items-center gap-2 px-3 py-2 bg-[#1e1e22] border border-white/10 text-white/80 text-xs font-medium rounded-xl whitespace-nowrap shadow-xl">
                                {mod.label}
                                {showBadge && (
                                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${badgeClass}`}>
                                    {count}
                                  </span>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* ── Collapse toggle — desktop only ── */}
        <div className="hidden lg:block px-2 pb-2">
          <div className="mx-1 mb-2 h-px bg-white/[0.06]" />
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-white/30 hover:text-white/60 hover:bg-white/[0.04] rounded-xl transition-all text-xs font-medium ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>

        {/* ── User card + sign out ── */}
        <div className="px-2 pb-3">
          {/* Card */}
          <div className="p-2.5 bg-white/[0.04] border border-white/[0.07] rounded-xl mb-1.5">
            <div className={`flex items-center gap-2.5 ${collapsed ? 'justify-center' : ''}`}>
              <div className="relative shrink-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-zinc-600 to-zinc-800 flex items-center justify-center">
                  <span className="text-[11px] font-bold text-white/80">{initials}</span>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#111114]" />
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-white/80 truncate leading-tight">{displayName}</p>
                  <div className="mt-0.5">
                    {userRole?.isSuperAdmin ? (
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-yellow-400/80">
                        <Zap size={8} /> Super Admin
                      </span>
                    ) : (
                      <span className="text-[9px] text-white/25 truncate block">{displayEmail}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sign out */}
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            title={collapsed ? 'Sign Out' : undefined}
            className={`group w-full flex items-center gap-2.5 px-3 py-2 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-xs font-medium disabled:opacity-30 ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            {signingOut
              ? <span className="w-3.5 h-3.5 border border-white/20 border-t-red-400 rounded-full animate-spin" />
              : <LogOut size={14} className="group-hover:text-red-400 transition-colors" />
            }
            {!collapsed && <span>{signingOut ? 'Signing out…' : 'Sign Out'}</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
