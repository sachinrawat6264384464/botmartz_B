import { Home, Mail, LucideIcon } from 'lucide-react';

export type ModuleId =
  | 'dashboard'
  | 'contacts';

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
  { id: 'contacts',  label: 'Messages',  href: '/admin/contacts',  icon: Mail, badge: true },
];

/** Maps each admin route to its required module ID. */
export const ROUTE_MODULE_MAP: Partial<Record<string, ModuleId>> = {
  '/admin':           'dashboard',
  '/admin/contacts':  'contacts',
};
