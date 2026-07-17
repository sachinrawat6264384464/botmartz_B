"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { 
  Menu, X, LogOut, ChevronLeft, ChevronRight, Zap,
  ChevronDown, Globe, Briefcase, Layers, Bot,
  Home, Mail, BookOpen, MessageSquare, Send, Users, FolderKanban, CalendarDays, Settings, ShieldAlert, FileText, Handshake
} from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/lib/context/AuthContext';
import { MODULES, ModuleId } from '@/lib/modules';
import { db } from '@/lib/firebase';
import { collection, query, where, getCountFromServer } from 'firebase/firestore';

const BADGE_STYLE: Partial<Record<ModuleId, string>> = {
  contacts: 'bg-sky-500/20 text-sky-300 border border-sky-500/30',
  jobs: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  partnerships: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
};

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [liveCounts, setLiveCounts] = useState<Partial<Record<ModuleId, number>>>({});

  // Collapsible Submenus Open States
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const [isWorkOpen, setIsWorkOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams ? searchParams.get('page') : '';
  const { user, userRole, hasAccess, logout } = useAuth();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [cContacts, cJobs, cPartnerships] = await Promise.all([
          getCountFromServer(query(collection(db, 'contacts'), where('status', '==', 'unread'))).catch(() => ({ data: () => ({ count: 0 }) })),
          getCountFromServer(query(collection(db, 'job_applications'), where('status', '==', 'new'))).catch(() => ({ data: () => ({ count: 0 }) })),
          getCountFromServer(query(collection(db, 'partnership_inquiries'), where('status', '==', 'new'))).catch(() => ({ data: () => ({ count: 0 }) })),
        ]);
        setLiveCounts({
          contacts: cContacts.data().count,
          jobs: cJobs.data().count,
          partnerships: cPartnerships.data().count,
        });
      } catch { /* ignore */ }
    };
    fetchCounts();
  }, [pathname]);

  // Auto-expand parents based on current sub-page path or query params
  useEffect(() => {
    if (pageParam === 'home' || pageParam === 'about' || pageParam === 'contact') {
      setIsCompanyOpen(true);
    }
    if (pageParam === 'community' || pageParam === 'ai-frontier') {
      setIsCommunityOpen(true);
    }
    if (pageParam === 'enterprise-rag' || pageParam === 'ai-agents') {
      setIsServicesOpen(true);
    }
    if (pageParam === 'education' || pageParam === 'logistics' || pageParam === 'legal') {
      setIsIndustriesOpen(true);
    }
    if (pathname === '/admin/case-studies' || pathname === '/admin/labs' || pageParam === 'labs' || pageParam === 'case-studies') {
      setIsWorkOpen(true);
    }
  }, [pathname, pageParam]);

  const allowedModules = MODULES.filter((mod) => {
    if (userRole?.isSuperAdmin) return true;
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
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'AD';

  const canAccess = (modId: ModuleId) => allowedModules.some(m => m.id === modId);

  // Helper to render flat sidebar items
  const renderFlatItem = (modId: ModuleId, icon: any, label: string, href: string, hasBadge?: boolean) => {
    if (!canAccess(modId)) return null;

    const Icon = icon;
    const count = liveCounts[modId] ?? 0;
    const showBadge = hasBadge && count > 0;
    const badgeClass = BADGE_STYLE[modId] ?? '';
    const isActive = pathname === href || (href !== '/admin' && pathname.startsWith(href));

    return (
      <Link
        href={href}
        onClick={() => setIsOpen(false)}
        className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 ${
          collapsed ? 'justify-center' : ''
        } ${
          isActive
            ? 'bg-admin-accent-muted text-admin-accent font-semibold shadow-sm'
            : 'text-admin-text-muted hover:text-admin-text hover:bg-admin-bg'
        }`}
      >
        {isActive && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 rounded-r-full bg-admin-accent" />
        )}

        <Icon
          size={16}
          className={`shrink-0 transition-colors ${isActive ? 'text-admin-accent' : 'text-admin-text-muted group-hover:text-admin-text'}`}
        />

        {!collapsed && (
          <>
            <span className="text-[13px] flex-1 leading-none">{label}</span>
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
            <div className="absolute left-full ml-3 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-2 px-3 py-2 bg-admin-card border border-admin-border text-admin-text text-xs font-medium rounded-xl whitespace-nowrap shadow-xl">
                {label}
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
  };

  // Helper to render collapsible sidebar sections
  const renderCollapsibleGroup = (
    label: string, 
    isGroupOpen: boolean, 
    setIsGroupOpen: (val: boolean) => void, 
    icon: any, 
    subItems: { label: string; href: string; active: boolean; moduleId: ModuleId }[]
  ) => {
    const visibleSubItems = subItems.filter(item => canAccess(item.moduleId));
    if (visibleSubItems.length === 0) return null;

    const Icon = icon;
    const isGroupActive = subItems.some(item => item.active);

    return (
      <div className="space-y-1">
        <button
          onClick={() => setIsGroupOpen(!isGroupOpen)}
          className={`w-full group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 ${
            collapsed ? 'justify-center' : ''
          } ${
            isGroupActive
              ? 'bg-admin-accent-muted/40 text-admin-accent'
              : 'text-admin-text-muted hover:text-admin-text hover:bg-admin-bg'
          }`}
        >
          <div className="flex items-center gap-3">
            <Icon
              size={16}
              className={`shrink-0 transition-colors ${isGroupActive ? 'text-admin-accent animate-pulse' : 'text-admin-text-muted group-hover:text-admin-text'}`}
            />
            {!collapsed && (
              <span className={`text-[13px] leading-none ${isGroupActive ? 'font-semibold text-admin-accent' : 'font-medium'}`}>
                {label}
              </span>
            )}
          </div>
          {!collapsed && (
            <ChevronDown 
              size={13} 
              className={`text-admin-text-muted transition-transform duration-200 ${isGroupOpen ? 'rotate-180' : ''}`} 
            />
          )}
        </button>

        {!collapsed && isGroupOpen && (
          <div className="pl-4 flex flex-col gap-1 border-l border-admin-border/50 ml-5 mt-1">
            {visibleSubItems.map((sub, idx) => (
              <Link
                key={idx}
                href={sub.href}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-2 rounded-lg text-[12px] transition-all ${
                  sub.active
                    ? 'text-admin-accent font-semibold bg-admin-accent-muted'
                    : 'text-admin-text-muted hover:text-admin-text hover:bg-admin-bg'
                }`}
              >
                {sub.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-admin-card rounded-xl border border-admin-border shadow-lg"
      >
        {isOpen ? <X size={18} className="text-admin-text-muted" /> : <Menu size={18} className="text-admin-text-muted" />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40" />
      )}

      {/* Sidebar */}
      <aside
        className={`font-sans fixed lg:static inset-y-0 left-0 z-40 flex flex-col bg-admin-card border-r border-admin-border transform transition-all duration-300 ease-in-out lg:transform-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${collapsed ? 'w-[62px]' : 'w-[232px]'}`}
      >

        {/* ── Logo ── */}
        <div className={`flex items-center px-4 py-5 ${collapsed ? 'justify-center' : ''}`}>
          {!collapsed ? (
            <Link href="/admin" className="relative h-[48px] w-[200px]">
              <Image src="/BotmartznewBot.png" alt="BOTMARTZ" fill className="object-contain object-left" />
            </Link>
          ) : (
            <Link href="/admin" className="relative w-8 h-8 shrink-0 overflow-hidden">
              <Image src="/BotmartznewBot.png" alt="BOTMARTZ" fill className="object-cover object-left" />
            </Link>
          )}
        </div>

        {/* Hairline */}
        <div className="mx-3 h-px bg-admin-border/50" />

        {/* ── Navigation ── */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5" style={{ scrollbarWidth: 'none' }}>
          
          {/* GROUP 1: MAIN */}
          <div>
            {!collapsed ? (
              <div className="flex items-center gap-2 px-3 mb-2">
                <span className="text-[9px] font-semibold text-admin-text-muted uppercase tracking-[0.2em] shrink-0">
                  Main
                </span>
                <div className="flex-1 h-px bg-admin-border/50" />
              </div>
            ) : (
              <div className="mx-2 mb-2 h-px bg-admin-border/50" />
            )}
            
            <div className="space-y-0.5">
              {renderFlatItem('dashboard', Home, 'Dashboard', '/admin')}
              {renderFlatItem('crm', Users, 'CRM', '/admin/crm')}
              {renderFlatItem('projects', FolderKanban, 'Projects', '/admin/projects')}
              {renderFlatItem('events', CalendarDays, 'Events', '/admin/events')}
              {renderFlatItem('jobs', Users, 'Careers / Jobs', '/admin/jobs', true)}
              {renderFlatItem('partnerships', Handshake, 'Partnerships', '/admin/partnerships', true)}
            </div>
          </div>

          {/* GROUP 2: CONTENT */}
          <div>
            {!collapsed ? (
              <div className="flex items-center gap-2 px-3 mb-2">
                <span className="text-[9px] font-semibold text-admin-text-muted uppercase tracking-[0.2em] shrink-0">
                  Content
                </span>
                <div className="flex-1 h-px bg-admin-border/50" />
              </div>
            ) : (
              <div className="mx-2 mb-2 h-px bg-admin-border/50" />
            )}

            <div className="space-y-0.5">
              {/* Company Collapsible Dropdown */}
              {renderCollapsibleGroup('Company', isCompanyOpen, setIsCompanyOpen, Briefcase, [
                { label: 'Home Page', href: '/admin/pages?page=home', active: pathname === '/admin/pages' && pageParam === 'home', moduleId: 'pages' },
                { label: 'About Us', href: '/admin/pages?page=about', active: pathname === '/admin/pages' && pageParam === 'about', moduleId: 'pages' },
                { label: 'Contact', href: '/admin/pages?page=contact', active: pathname === '/admin/pages' && pageParam === 'contact', moduleId: 'pages' },
              ])}

              {/* Community Collapsible Dropdown */}
              {renderCollapsibleGroup('Community', isCommunityOpen, setIsCommunityOpen, Users, [
                { label: 'Community Hub', href: '/admin/pages?page=community', active: pathname === '/admin/pages' && pageParam === 'community', moduleId: 'pages' },
                { label: 'AI Frontier 2026', href: '/admin/pages?page=ai-frontier', active: pathname === '/admin/pages' && pageParam === 'ai-frontier', moduleId: 'pages' },
              ])}

              {/* Services Collapsible Dropdown */}
              {renderCollapsibleGroup('Services', isServicesOpen, setIsServicesOpen, Bot, [
                { label: 'Enterprise RAG', href: '/admin/pages?page=enterprise-rag', active: pathname === '/admin/pages' && pageParam === 'enterprise-rag', moduleId: 'pages' },
                { label: 'AI Agents', href: '/admin/pages?page=ai-agents', active: pathname === '/admin/pages' && pageParam === 'ai-agents', moduleId: 'pages' },
              ])}

              {/* Industries Collapsible Dropdown */}
              {renderCollapsibleGroup('Industries', isIndustriesOpen, setIsIndustriesOpen, Globe, [
                { label: 'Education', href: '/admin/pages?page=education', active: pathname === '/admin/pages' && pageParam === 'education', moduleId: 'pages' },
                { label: 'Logistics', href: '/admin/pages?page=logistics', active: pathname === '/admin/pages' && pageParam === 'logistics', moduleId: 'pages' },
                { label: 'Legal', href: '/admin/pages?page=legal', active: pathname === '/admin/pages' && pageParam === 'legal', moduleId: 'pages' },
              ])}

              {/* Work Collapsible Dropdown */}
              {renderCollapsibleGroup('Work', isWorkOpen, setIsWorkOpen, Layers, [
                { label: 'Case Studies', href: '/admin/pages?page=case-studies', active: pathname === '/admin/pages' && pageParam === 'case-studies', moduleId: 'pages' },
                { label: 'Labs', href: '/admin/pages?page=labs', active: pathname === '/admin/pages' && pageParam === 'labs', moduleId: 'pages' },
              ])}

              {/* Flat Content Items */}
              {renderFlatItem('blogs', BookOpen, 'Blogs', '/admin/Blogs')}
              {renderFlatItem('comments', MessageSquare, 'Comments', '/admin/comments')}
              {renderFlatItem('newsletter', Send, 'Newsletter', '/admin/newsletter')}
            </div>
          </div>

          {/* GROUP 3: INBOX */}
          <div>
            {!collapsed ? (
              <div className="flex items-center gap-2 px-3 mb-2">
                <span className="text-[9px] font-semibold text-admin-text-muted uppercase tracking-[0.2em] shrink-0">
                  Inbox
                </span>
                <div className="flex-1 h-px bg-admin-border/50" />
              </div>
            ) : (
              <div className="mx-2 mb-2 h-px bg-admin-border/50" />
            )}

            <div className="space-y-0.5">
              {renderFlatItem('contacts', Mail, 'Contact Form', '/admin/contacts', true)}
            </div>
          </div>

          {/* GROUP 4: SYSTEM */}
          <div>
            {!collapsed ? (
              <div className="flex items-center gap-2 px-3 mb-2">
                <span className="text-[9px] font-semibold text-admin-text-muted uppercase tracking-[0.2em] shrink-0">
                  System
                </span>
                <div className="flex-1 h-px bg-admin-border/50" />
              </div>
            ) : (
              <div className="mx-2 mb-2 h-px bg-admin-border/50" />
            )}

            <div className="space-y-0.5">
              {renderFlatItem('settings', Settings, 'Settings', '/admin/settings')}
              {renderFlatItem('super-admin', ShieldAlert, 'Super Admin', '/admin/super-admin')}
            </div>
          </div>

        </nav>

        {/* ── Collapse toggle — desktop only ── */}
        <div className="hidden lg:block px-2 pb-2">
          <div className="mx-1 mb-2 h-px bg-admin-border/50" />
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-admin-text-muted hover:text-admin-text hover:bg-admin-bg rounded-xl transition-all text-xs font-medium ${
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
          <div className="p-2.5 bg-admin-bg border border-admin-border rounded-xl mb-1.5">
            <div className={`flex items-center gap-2.5 ${collapsed ? 'justify-center' : ''}`}>
              <div className="relative shrink-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-zinc-600 to-zinc-800 flex items-center justify-center">
                  <span className="text-[11px] font-bold text-white/80">{initials}</span>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-admin-card" />
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-admin-text truncate leading-tight">{displayName}</p>
                  <div className="mt-0.5">
                    {userRole?.isSuperAdmin ? (
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-yellow-500">
                        <Zap size={8} /> Super Admin
                      </span>
                    ) : (
                      <span className="text-[9px] text-admin-text-muted truncate block">{displayEmail}</span>
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
            className={`group w-full flex items-center gap-2.5 px-3 py-2 text-admin-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all text-xs font-medium disabled:opacity-30 ${
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
