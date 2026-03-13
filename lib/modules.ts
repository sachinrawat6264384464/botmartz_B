import { Home, Mail, Shield, FileText, MessageCircle, Newspaper, LucideIcon } from 'lucide-react';

export type ModuleId =
  | 'dashboard'
  | 'contacts'
  | 'blogs'
  | 'comments'
  | 'newsletter'
  | 'roles';

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
 * The 'roles' module is only visible/accessible to super admins.
 */
export const MODULES: AppModule[] = [
  { id: 'dashboard',  label: 'Dashboard',        href: '/admin',              icon: Home },
  { id: 'contacts',   label: 'Messages',          href: '/admin/contacts',    icon: Mail,          badge: true },
  { id: 'blogs',      label: 'Blog Posts',        href: '/admin/Blogs',       icon: FileText },
  { id: 'comments',   label: 'Comments',          href: '/admin/comments',    icon: MessageCircle, badge: true },
  { id: 'newsletter', label: 'Newsletter',        href: '/admin/newsletter',  icon: Newspaper },
  { id: 'roles',      label: 'Role Management',   href: '/admin/roles',       icon: Shield },
];

/** Maps each admin route to its required module ID. */
export const ROUTE_MODULE_MAP: Partial<Record<string, ModuleId>> = {
  '/admin':               'dashboard',
  '/admin/contacts':      'contacts',
  '/admin/Blogs':         'blogs',
  '/admin/comments':      'comments',
  '/admin/newsletter':    'newsletter',
  '/admin/roles':         'roles',
};
