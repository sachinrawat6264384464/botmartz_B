import { Home, Mail, BookOpen, MessageSquare, Send, LucideIcon, FileText, Users, FolderKanban, CalendarDays, Bot, Settings, ShieldAlert } from 'lucide-react';

export type ModuleId =
  | 'dashboard'
  | 'crm'
  | 'projects'
  | 'contacts'
  | 'blogs'
  | 'comments'
  | 'newsletter'
  | 'case-studies'
  | 'events'
  | 'ai-agents'
  | 'pages'
  | 'settings'
  | 'super-admin';

export interface AppModule {
  id: ModuleId;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: boolean;
}

/**
 * Central module registry.
 * Add new modules here — sidebar + RBAC pick them up automatically.
 */
export const MODULES: AppModule[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/admin',           icon: Home },
  { id: 'crm',       label: 'CRM',       href: '/admin/crm',       icon: Users },
  { id: 'projects',  label: 'Projects',  href: '/admin/projects',  icon: FolderKanban },
  { id: 'events',    label: 'Events',    href: '/admin/events',    icon: CalendarDays },
  { id: 'blogs',     label: 'Blogs',     href: '/admin/Blogs',      icon: BookOpen },
  { id: 'case-studies', label: 'Case Studies', href: '/admin/case-studies', icon: FileText },
  { id: 'comments',  label: 'Comments',  href: '/admin/comments',   icon: MessageSquare },
  { id: 'newsletter',label: 'Newsletter',href: '/admin/newsletter', icon: Send },
  { id: 'contacts',  label: 'Contact Form', href: '/admin/contacts',icon: Mail, badge: true },
  { id: 'ai-agents', label: 'AI Agents', href: '/admin/ai-agents', icon: Bot },
  { id: 'pages',     label: 'Page Manager', href: '/admin/pages', icon: FileText },
  { id: 'settings',  label: 'Settings',  href: '/admin/settings',  icon: Settings },
  { id: 'super-admin',label: 'Super Admin',href: '/admin/super-admin',icon: ShieldAlert },
];

/** Maps each admin route to its required module ID. */
export const ROUTE_MODULE_MAP: Partial<Record<string, ModuleId>> = {
  '/admin':                     'dashboard',
  '/admin/crm':                 'crm',
  '/admin/projects':            'projects',
  '/admin/events':              'events',
  '/admin/Blogs':               'blogs',
  '/admin/case-studies':        'case-studies',
  '/admin/comments':            'comments',
  '/admin/newsletter':          'newsletter',
  '/admin/contacts':            'contacts',
  '/admin/ai-agents':           'ai-agents',
  '/admin/pages':               'pages',
  '/admin/settings':            'settings',
  '/admin/super-admin':         'super-admin',
};
