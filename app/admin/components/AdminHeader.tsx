"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Mail, FileText, Users, ArrowRight, Sun, Moon } from 'lucide-react';
import { Inter_Tight } from 'next/font/google';
import { useAuth } from '@/lib/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600'] });

interface SearchResult {
  id: string;
  category: 'message' | 'blog' | 'subscriber';
  title: string;
  subtitle: string;
  href: string;
}

const CATEGORY_META = {
  message: { label: 'Messages', icon: Mail, color: 'text-blue-500 bg-blue-50' },
  blog: { label: 'Blog Posts', icon: FileText, color: 'text-purple-500 bg-purple-50' },
  subscriber: { label: 'Subscribers', icon: Users, color: 'text-green-500 bg-green-50' },
};

export default function AdminHeader() {
  const { user, userRole } = useAuth();
  const router = useRouter();
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const displayName = userRole?.displayName || user?.displayName || 'Admin User';
  const roleLabel = userRole?.isSuperAdmin ? 'Super Admin' : 'Admin';
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current && !inputRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const runSearch = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    const lower = q.toLowerCase();
    const found: SearchResult[] = [];

    try {
      // Search contacts/messages
      const contactsSnap = await getDocs(collection(db, 'contacts'));
      contactsSnap.forEach((d) => {
        const data = d.data();
        const name: string = data.name || '';
        const email: string = data.email || '';
        const subject: string = data.subject || data.message?.slice(0, 60) || '';
        if (
          name.toLowerCase().includes(lower) ||
          email.toLowerCase().includes(lower) ||
          subject.toLowerCase().includes(lower)
        ) {
          found.push({
            id: d.id,
            category: 'message',
            title: name || email,
            subtitle: subject || email,
            href: '/admin/contacts',
          });
        }
      });

      // Search blog posts
      const blogsSnap = await getDocs(collection(db, 'blog-posts'));
      blogsSnap.forEach((d) => {
        const data = d.data();
        const title: string = data.title || '';
        const tags: string[] = data.tags || [];
        if (
          title.toLowerCase().includes(lower) ||
          tags.some((t: string) => t.toLowerCase().includes(lower))
        ) {
          found.push({
            id: d.id,
            category: 'blog',
            title: title || 'Untitled Post',
            subtitle: tags.join(', ') || 'Blog post',
            href: '/admin/Blogs',
          });
        }
      });

      // Search newsletter subscribers
      const subsSnap = await getDocs(collection(db, 'newsletter'));
      subsSnap.forEach((d) => {
        const data = d.data();
        const email: string = data.email || '';
        const name: string = data.name || '';
        if (
          email.toLowerCase().includes(lower) ||
          name.toLowerCase().includes(lower)
        ) {
          found.push({
            id: d.id,
            category: 'subscriber',
            title: email,
            subtitle: name ? `${name} · ${data.status}` : data.status,
            href: '/admin/newsletter',
          });
        }
      });
    } catch {
      // Silently ignore permission errors for collections the user can't access
    }

    setResults(found.slice(0, 12));
    setOpen(found.length > 0 || q.length >= 2);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query) {
      setResults([]);
      setOpen(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(() => runSearch(query), 350);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, runSearch]);

  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    setQuery('');
    router.push(result.href);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setOpen(false);
    inputRef.current?.focus();
  };

  // Group results by category
  const grouped = results.reduce<Record<string, SearchResult[]>>((acc, r) => {
    if (!acc[r.category]) acc[r.category] = [];
    acc[r.category].push(r);
    return acc;
  }, {});

  return (
    <header className={`${interTight.className} bg-admin-card border-b border-admin-border px-8 py-4`}>
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl relative">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-text-muted" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => { if (results.length > 0) setOpen(true); }}
              placeholder="Search messages, blogs, subscribers..."
              className="w-full bg-admin-bg border border-admin-border rounded-xl pl-11 pr-10 py-2.5 text-sm text-admin-text placeholder:text-admin-text-muted focus:outline-none focus:border-admin-accent focus:ring-1 focus:ring-admin-accent transition-all"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Dropdown */}
          {open && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 right-0 mt-2 bg-admin-card border border-admin-border rounded-2xl shadow-xl z-50 overflow-hidden"
            >
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-5 h-5 border-2 border-admin-border border-t-admin-accent rounded-full animate-spin" />
                </div>
              ) : results.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-sm text-admin-text-muted">No results for <strong>"{query}"</strong></p>
                </div>
              ) : (
                <div className="py-2 max-h-96 overflow-y-auto">
                  {(Object.keys(grouped) as Array<keyof typeof CATEGORY_META>).map((cat) => {
                    const meta = CATEGORY_META[cat];
                    const Icon = meta.icon;
                    const items = grouped[cat];
                    return (
                      <div key={cat}>
                        <div className="flex items-center gap-2 px-4 py-2">
                          <div className={`w-5 h-5 rounded flex items-center justify-center ${meta.color}`}>
                            <Icon size={11} />
                          </div>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{meta.label}</span>
                        </div>
                        {items.map((result) => (
                          <button
                            key={result.id}
                            onClick={() => handleSelect(result)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-admin-bg transition-colors text-left group"
                          >
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${meta.color}`}>
                              <Icon size={13} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-admin-text truncate">{result.title}</p>
                              <p className="text-xs text-admin-text-muted truncate">{result.subtitle}</p>
                            </div>
                            <ArrowRight size={14} className="text-admin-text-muted group-hover:text-admin-text shrink-0 transition-colors" />
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="border-t border-admin-border px-4 py-2 bg-admin-card">
                <p className="text-xs text-admin-text-muted">{results.length} result{results.length !== 1 ? 's' : ''} across messages, blogs & subscribers</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 ml-6">
          <button
            onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-admin-text-muted hover:text-admin-text hover:bg-admin-bg rounded-xl transition-colors"
            title="Toggle theme"
          >
            {currentTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="w-px h-8 bg-admin-border" />

          {/* Profile */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-linear-to-br from-admin-accent to-cyan-500 rounded-full flex items-center justify-center text-white">
              <span className="text-xs font-semibold">{initials || 'AD'}</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-admin-text">{displayName}</p>
              <p className="text-xs text-admin-accent font-medium">{roleLabel}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
