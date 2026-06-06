"use client";
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import {
  Mail, Clock,
  ArrowUpRight, MailOpen, Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { Inter_Tight } from 'next/font/google';
import { useAuth } from '@/lib/context/AuthContext';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

interface DashStats {
  messages: { total: number; unread: number; today: number };
}

interface RecentContact {
  id: string; name: string; email: string; message: string; status: string; createdAt: any;
}

function formatDate(ts: any) {
  if (!ts) return 'Just now';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  const diff = Date.now() - d.getTime();
  const m = Math.floor(diff / 60000), h = Math.floor(diff / 3600000), days = Math.floor(diff / 86400000);
  if (m < 1) return 'Just now';
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  if (days === 1) return 'Yesterday';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(d);
}

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

const AVATAR_COLORS = [
  'bg-violet-100 text-violet-700', 'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700', 'bg-orange-100 text-orange-700',
  'bg-rose-100 text-rose-700', 'bg-amber-100 text-amber-700',
];
function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashStats | null>(null);
  const [recent, setRecent] = useState<RecentContact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      try {
        const [allContacts, unreadContacts] = await Promise.all([
          getDocs(collection(db, 'contacts')),
          getDocs(query(collection(db, 'contacts'), where('status', '==', 'unread'))),
        ]);

        const today = new Date(); today.setHours(0, 0, 0, 0);
        const todayContacts = allContacts.docs.filter((d) => {
          const ts = d.data().createdAt;
          if (!ts) return false;
          const date = ts.toDate ? ts.toDate() : new Date(ts);
          return date >= today;
        });

        setStats({
          messages: { total: allContacts.size, unread: unreadContacts.size, today: todayContacts.length },
        });

        const recentSnap = await getDocs(query(collection(db, 'contacts'), orderBy('createdAt', 'desc'), limit(5)));
        setRecent(recentSnap.docs.map((d) => ({ id: d.id, ...d.data() })) as RecentContact[]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  if (loading) {
    return (
      <div className={`${interTight.className} flex items-center justify-center h-64`}>
        <Loader2 size={24} className="animate-spin text-gray-300" />
      </div>
    );
  }

  const s = stats ?? { messages: { total: 0, unread: 0, today: 0 } };

  return (
    <div className={`${interTight.className} p-6 max-w-[1400px]`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs text-gray-400 font-medium">All systems operational</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stat Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Link href="/admin/contacts"
          className="group relative bg-white border border-gray-200 rounded-2xl p-5 hover:border-gray-300 hover:shadow-md transition-all duration-200">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center">
              <Mail size={18} className="text-blue-600" />
            </div>
            {s.messages.unread > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                {s.messages.unread} new
              </span>
            )}
          </div>
          <p className="text-3xl font-bold text-gray-900 tracking-tight">{s.messages.total}</p>
          <p className="text-xs font-semibold text-gray-600 mt-0.5">Total Messages</p>
          <p className="text-[11px] text-gray-400 mt-0.5">{s.messages.unread} unread</p>
          <ArrowUpRight size={14} className="absolute top-4 right-4 text-gray-300 group-hover:text-gray-600 transition-colors" />
        </Link>

        {/* Today stat */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={14} className="text-gray-400" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Today</span>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">{s.messages.today}</p>
            <p className="text-xs text-gray-500 mt-0.5">message{s.messages.today !== 1 ? 's' : ''} received</p>
          </div>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Recent Messages</h2>
            <p className="text-xs text-gray-400 mt-0.5">Latest contact submissions</p>
          </div>
          <Link href="/admin/contacts" className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 font-medium transition-colors">
            View all <ArrowUpRight size={12} />
          </Link>
        </div>
        {recent.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mb-3">
              <Mail size={20} className="text-gray-300" />
            </div>
            <p className="text-sm text-gray-400">No messages yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recent.map((contact) => (
              <Link key={contact.id} href="/admin/contacts"
                className="flex items-start gap-3 px-5 py-3.5 hover:bg-gray-50/70 transition-colors group">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${getAvatarColor(contact.name)}`}>
                  {getInitials(contact.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold text-gray-900 truncate">{contact.name}</span>
                    <span className="text-[11px] text-gray-400 shrink-0">{formatDate(contact.createdAt)}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{contact.email}</p>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{contact.message}</p>
                </div>
                <div className="shrink-0 mt-1">
                  {contact.status === 'unread' ? (
                    <span className="w-2 h-2 rounded-full bg-blue-500 block" />
                  ) : (
                    <MailOpen size={13} className="text-gray-300" />
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
