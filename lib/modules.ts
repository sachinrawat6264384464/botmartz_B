import { Home, Mail, BookOpen, MessageSquare, Send, LucideIcon, FileText, Users, FolderKanban, CalendarDays, Bot, Settings, ShieldAlert, Layers, CreditCard } from 'lucide-react';

export type ModuleId =
  | 'dashboard'
  | 'crm'
  | 'projects'
  | 'contacts'
  | 'blogs'
  | 'comments'
  | 'newsletter'
  | 'case-studies'
  | 'labs'
  | 'events'
  | 'feedback'
  | 'jobs'
  | 'partnerships'
  | 'ai-agents'
  | 'pages'
  | 'settings'
  | 'super-admin'
  | 'coupons'
  | 'payments';

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
  { id: 'feedback',  label: 'Event Feedbacks', href: '/admin/feedback', icon: MessageSquare },
  { id: 'coupons',   label: 'Coupons',   href: '/admin/coupons',   icon: CreditCard },
  { id: 'payments',  label: 'Payments',  href: '/admin/payments',  icon: CreditCard },
  { id: 'jobs',      label: 'Careers / Jobs', href: '/admin/jobs', icon: Users, badge: true },
  { id: 'partnerships', label: 'Partnerships', href: '/admin/partnerships', icon: FileText, badge: true },
  { id: 'blogs',     label: 'Engineering Insights',     href: '/admin/Blogs',      icon: BookOpen },
  { id: 'case-studies', label: 'Case Studies', href: '/admin/case-studies', icon: FileText },
  { id: 'labs',      label: 'Labs',      href: '/admin/labs',      icon: Layers },
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
  '/admin/feedback':            'feedback',
  '/admin/coupons':             'coupons',
  '/admin/payments':            'payments',
  '/admin/jobs':                'jobs',
  '/admin/partnerships':        'partnerships',
  '/admin/Blogs':               'blogs',
  '/admin/case-studies':        'case-studies',
  '/admin/labs':                'labs',
  '/admin/comments':            'comments',
  '/admin/newsletter':          'newsletter',
  '/admin/contacts':            'contacts',
  '/admin/ai-agents':           'ai-agents',
  '/admin/pages':               'pages',
  '/admin/settings':            'settings',
  '/admin/super-admin':         'super-admin',
  '/admin/navigation':          'settings',
};
