import { Home, Mail, BookOpen, MessageSquare, Send, LucideIcon, FileText } from 'lucide-react';

export type ModuleId =
  | 'dashboard'
  | 'contacts'
  | 'blogs'
  | 'comments'
  | 'newsletter'
  | 'case-studies';

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
  { id: 'blogs',     label: 'Blogs',     href: '/admin/Blogs',      icon: BookOpen },
  { id: 'case-studies', label: 'Case Studies', href: '/admin/case-studies', icon: FileText },
  { id: 'comments',  label: 'Comments',  href: '/admin/comments',   icon: MessageSquare },
  { id: 'newsletter',label: 'Newsletter',href: '/admin/newsletter', icon: Send },
  { id: 'contacts',  label: 'Contact Form', href: '/admin/contacts',icon: Mail, badge: true },
];

/** Maps each admin route to its required module ID. */
export const ROUTE_MODULE_MAP: Partial<Record<string, ModuleId>> = {
  '/admin':                     'dashboard',
  '/admin/Blogs':               'blogs',
  '/admin/case-studies':        'case-studies',
  '/admin/comments':            'comments',
  '/admin/newsletter':          'newsletter',
  '/admin/contacts':            'contacts',
};
