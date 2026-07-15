"use client";
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import {
  Mail, MailOpen, Trash2, Clock, Search, X, Reply, InboxIcon,
  AlertCircle, CheckCircle,
} from 'lucide-react';
import { Inter_Tight } from 'next/font/google';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

interface Contact {
  id: string; name: string; email: string; message: string;
  createdAt: any; status: 'read' | 'unread';
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
function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}
function formatDate(ts: any) {
  if (!ts) return 'Just now';
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  const diff = Date.now() - date.getTime();
  const m = Math.floor(diff / 60000), h = Math.floor(diff / 3600000), d = Math.floor(diff / 86400000);
  if (m < 1) return 'Just now';
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  if (d === 1) return 'Yesterday';
  if (d < 7) return `${d}d ago`;
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
}
function formatFullDate(ts: any) {
  if (!ts) return '';
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(date);
}

// ── Confirm Modal ──────────────────────────────────────────────────────────────
function ConfirmModal({ name, onConfirm, onCancel }: { name: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-paper rounded-2xl shadow-2xl w-full max-w-sm p-6 border border-line">
        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4 border border-red-500/20">
          <Trash2 size={22} className="text-red-500" />
        </div>
        <h2 className="text-base font-bold text-white text-center mb-2">Delete Message</h2>
        <p className="text-sm text-ink-soft text-center mb-6">
          Delete message from <strong className="text-white">{name}</strong>? This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 px-4 py-2.5 border border-line text-ink-soft rounded-xl text-sm font-medium hover:bg-white/[0.03] transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default function ContactsList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [search, setSearch] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Contact | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, 'contacts'), orderBy('createdAt', 'desc')),
      (snap) => { setContacts(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Contact[]); setLoading(false); }
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    if (selectedContact) {
      const updated = contacts.find((c) => c.id === selectedContact.id);
      if (updated) setSelectedContact(updated);
    }
  }, [contacts]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const markAsRead = async (id: string) => updateDoc(doc(db, 'contacts', id), { status: 'read' });

  const handleSelect = (c: Contact) => {
    setSelectedContact(c);
    if (c.status === 'unread') markAsRead(c.id);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteDoc(doc(db, 'contacts', deleteTarget.id));
    if (selectedContact?.id === deleteTarget.id) setSelectedContact(null);
    setDeleteTarget(null);
    showToast('Message deleted.');
  };

  const filtered = contacts.filter((c) => {
    const mf = filter === 'all' || c.status === filter;
    const ms = !search || c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) || c.message.toLowerCase().includes(search.toLowerCase());
    return mf && ms;
  });

  const unreadCount = contacts.filter((c) => c.status === 'unread').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`${interTight.className} p-6 h-full`}>
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-paper border border-green-500/20 text-green-400 text-sm font-medium rounded-xl shadow-xl">
          <CheckCircle size={15} className="text-green-500" /> {toast}
        </div>
      )}

      {deleteTarget && (
        <ConfirmModal name={deleteTarget.name} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center">
              <Mail size={16} className="text-brand" />
            </div>
            <h1 className="text-2xl font-bold text-white">Messages</h1>
          </div>
          <p className="text-sm text-ink-soft ml-10.5">Customer inquiries and contact submissions</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-paper text-ink-soft border border-line">
            {contacts.length} total
          </span>
          {unreadCount > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-brand/10 text-brand border border-brand/20">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              {unreadCount} unread
            </span>
          )}
        </div>
      </div>

      {/* Main layout */}
      <div className="flex gap-4" style={{ height: 'calc(100vh - 200px)' }}>
        {/* Left: List */}
        <div className="w-80 shrink-0 flex flex-col bg-paper rounded-2xl border border-line overflow-hidden shadow-sm">
          {/* Search + filters */}
          <div className="p-3 border-b border-line space-y-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
              <input type="text" placeholder="Search messages…" value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-8 py-2 text-sm bg-ink border border-line rounded-lg text-white placeholder-ink-soft focus:outline-none focus:border-brand transition-all" />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-soft hover:text-white"><X size={13} /></button>
              )}
            </div>
            <div className="flex gap-1 p-0.5 bg-ink rounded-lg border border-line">
              {(['all', 'unread', 'read'] as const).map((tab) => (
                <button key={tab} onClick={() => setFilter(tab)}
                  className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all ${filter === tab ? 'bg-paper text-white shadow-sm border border-line' : 'text-ink-soft hover:text-white'}`}>
                  {tab === 'unread' && unreadCount > 0 ? (
                    <span className="flex items-center justify-center gap-1">Unread <span className="px-1 rounded-full bg-brand/20 text-brand border border-brand/20 text-[10px]">{unreadCount}</span></span>
                  ) : (
                    tab.charAt(0).toUpperCase() + tab.slice(1)
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center px-4">
                <div className="w-12 h-12 bg-white/[0.03] rounded-2xl border border-line flex items-center justify-center mb-3">
                  <InboxIcon size={22} className="text-ink-soft" />
                </div>
                <p className="text-sm font-medium text-ink-soft">No messages</p>
                <p className="text-xs text-ink-soft/50 mt-1">{search ? 'Try a different search' : 'Nothing here yet'}</p>
              </div>
            ) : (
              filtered.map((c) => (
                <button key={c.id} onClick={() => handleSelect(c)}
                  className={`w-full text-left px-4 py-3.5 border-b border-line last:border-0 transition-all group relative ${
                    selectedContact?.id === c.id ? 'bg-white/[0.05]' : 'hover:bg-white/[0.02]'
                  }`}>
                  {c.status === 'unread' && selectedContact?.id !== c.id && (
                    <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand" />
                  )}
                  <div className="flex items-start gap-3">
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      selectedContact?.id === c.id ? 'bg-white/20 text-white' : getAvatarColor(c.name)
                    }`}>
                      {getInitials(c.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2 mb-0.5">
                        <span className={`text-sm font-semibold truncate ${selectedContact?.id === c.id ? 'text-white' : 'text-white'} ${c.status === 'unread' ? 'font-bold' : ''}`}>
                          {c.name}
                        </span>
                        <span className={`text-[11px] shrink-0 ${selectedContact?.id === c.id ? 'text-white/50' : 'text-ink-soft'}`}>
                          {formatDate(c.createdAt)}
                        </span>
                      </div>
                      <p className={`text-xs truncate ${selectedContact?.id === c.id ? 'text-white/60' : 'text-ink-soft'}`}>{c.email}</p>
                      <p className={`text-xs mt-0.5 line-clamp-1 ${selectedContact?.id === c.id ? 'text-white/50' : 'text-ink-soft/70'}`}>{c.message}</p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right: Detail */}
        {selectedContact ? (
          <div className="flex-1 bg-paper rounded-2xl border border-line flex flex-col overflow-hidden shadow-sm">
            {/* Detail header */}
            <div className="px-6 py-5 border-b border-line flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${getAvatarColor(selectedContact.name)}`}>
                  {getInitials(selectedContact.name)}
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">{selectedContact.name}</h2>
                  <a href={`mailto:${selectedContact.email}`} className="text-sm text-brand hover:underline">{selectedContact.email}</a>
                </div>
              </div>
              <button onClick={() => setSelectedContact(null)} className="p-2 hover:bg-white/[0.05] rounded-lg transition-colors text-ink-soft hover:text-white">
                <X size={16} />
              </button>
            </div>

            {/* Meta bar */}
            <div className="px-6 py-2.5 bg-ink border-b border-line flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs text-ink-soft">
                <Clock size={12} className="text-ink-soft/70" />
                {formatFullDate(selectedContact.createdAt)}
              </div>
              <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-semibold border ${
                selectedContact.status === 'read' ? 'bg-white/[0.03] text-ink-soft border-line' : 'bg-brand/10 text-brand border-brand/20'
              }`}>
                {selectedContact.status === 'read' ? <><MailOpen size={10} /> Read</> : <><Mail size={10} /> Unread</>}
              </span>
            </div>

            {/* Message body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <p className="text-[10px] font-bold text-ink-soft uppercase tracking-widest mb-3">Message</p>
              <div className="bg-ink rounded-xl p-5 border border-line max-w-2xl">
                <p className="text-white/90 leading-relaxed whitespace-pre-wrap text-sm">{selectedContact.message}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 border-t border-line flex items-center justify-between bg-ink/50">
              <a href={`mailto:${selectedContact.email}?subject=Re: Your message to Botmartz`}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-ink text-sm font-semibold rounded-xl hover:bg-gray-200 transition-colors shadow-sm">
                <Reply size={14} /> Reply via Email
              </a>
              <button onClick={() => setDeleteTarget(selectedContact)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-500/10 hover:border-red-500/20 border border-transparent rounded-xl transition-colors">
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-paper rounded-2xl border border-line border-dashed flex flex-col items-center justify-center text-center shadow-sm">
            <div className="w-14 h-14 bg-white/[0.03] border border-line rounded-2xl flex items-center justify-center mb-4">
              <Mail size={24} className="text-ink-soft" />
            </div>
            <p className="text-sm font-semibold text-ink-soft">Select a message</p>
            <p className="text-xs text-ink-soft/50 mt-1">Click any message from the list to read it</p>
          </div>
        )}
      </div>
    </div>
  );
}
