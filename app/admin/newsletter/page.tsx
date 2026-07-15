"use client";

import { useEffect, useState, useCallback } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import Image from '@tiptap/extension-image';
import Heading from '@tiptap/extension-heading';
import { Inter_Tight } from 'next/font/google';
import {
  Users, Send, History, Plus, Trash2, Search, X,
  UserCheck, UserX, Download, Bold, Italic, UnderlineIcon,
  List, ListOrdered, AlignLeft, AlignCenter, AlignRight,
  LinkIcon, ImageIcon, Heading1, Heading2, Heading3,
  Eye, EyeOff, Loader2, CheckCircle, AlertCircle, Mail,
  MailOpen, ChevronDown, ChevronUp, Highlighter, Undo, Redo,
  FileText, ExternalLink, CheckSquare, Square, ChevronLeft, ChevronRight,
  TrendingUp, Activity, UserMinus, Megaphone,
} from 'lucide-react';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

// ─── Types ───────────────────────────────────────────────────────────────────

interface Subscriber {
  id: string;
  email: string;
  name: string;
  status: 'active' | 'unsubscribed';
  source: 'website' | 'manual';
  subscribedAt: any;
}

interface Campaign {
  id: string;
  subject: string;
  previewText: string;
  html: string;
  status: 'sent' | 'draft';
  sentAt: any;
  recipientCount: number;
  failedCount: number;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  summary?: string;
  coverImage?: string;
  thumbnail?: string;
  publishedAt?: any;
  createdAt?: any;
  tags?: string[];
}

type Tab = 'subscribers' | 'compose' | 'campaigns' | 'blogs';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(ts: any) {
  if (!ts) return '—';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(d);
}

function exportCSV(subscribers: Subscriber[]) {
  const rows = [
    ['Email', 'Name', 'Source', 'Status', 'Subscribed'],
    ...subscribers.map((s) => [s.email, s.name || '', s.source, s.status, formatDate(s.subscribedAt)]),
  ];
  const csv = rows.map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `subscribers-${Date.now()}.csv`; a.click();
  URL.revokeObjectURL(url);
}

function getBlogUrl(slug: string) {
  return `${process.env.NEXT_PUBLIC_BLOG_URL || 'https://blog.botmartz.com'}/${slug}`;
}

// ─── Pagination Component ────────────────────────────────────────────────────

interface PaginationProps {
  total: number;
  page: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageChange: (p: number) => void;
  onPageSizeChange: (ps: number) => void;
}

function Pagination({ total, page, pageSize, pageSizeOptions = [10, 25, 50], onPageChange, onPageSizeChange }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  const pages: (number | '…')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push('…');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push('…');
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-between px-5 py-3.5 border-t border-admin-border bg-admin-card rounded-b-2xl">
      <div className="flex items-center gap-3">
        <span className="text-xs text-admin-text-muted">
          {total === 0 ? 'No results' : `Showing ${from}–${to} of ${total}`}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-admin-text-muted">Rows:</span>
          <select
            value={pageSize}
            onChange={(e) => { onPageSizeChange(Number(e.target.value)); onPageChange(1); }}
            className="text-xs border border-admin-border rounded-lg px-2 py-1 bg-admin-bg text-admin-text focus:outline-none focus:border-admin-accent"
          >
            {pageSizeOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="p-1.5 rounded-lg text-admin-text-muted hover:text-admin-text hover:bg-admin-bg disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-transparent hover:border-admin-border"
        >
          <ChevronLeft size={14} />
        </button>
        {pages.map((p, i) =>
          p === '…' ? (
            <span key={`ellipsis-${i}`} className="px-1 text-admin-text-muted text-xs">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors border ${
                p === page ? 'bg-admin-accent text-white border-transparent' : 'text-admin-text-muted hover:bg-admin-bg border-transparent hover:border-admin-border'
              }`}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="p-1.5 rounded-lg text-admin-text-muted hover:text-admin-text hover:bg-admin-bg disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-transparent hover:border-admin-border"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ msg, type, onClose }: { msg: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-sm font-medium animate-in slide-in-from-bottom-2 ${
      type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'
    }`}>
      {type === 'success' ? <CheckCircle size={16} className="text-green-500 shrink-0" /> : <AlertCircle size={16} className="text-red-500 shrink-0" />}
      {msg}
      <button onClick={onClose} className="ml-2 text-ink-soft hover:text-white"><X size={14} /></button>
    </div>
  );
}

// ─── Confirm Modal ────────────────────────────────────────────────────────────

interface ConfirmModalProps {
  title: string; body: string; confirmLabel?: string; danger?: boolean;
  onConfirm: () => void; onCancel: () => void;
}

function ConfirmModal({ title, body, confirmLabel = 'Confirm', danger = false, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-paper rounded-2xl shadow-2xl w-full max-w-sm p-6 border border-line">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 border ${danger ? 'bg-red-500/10 border-red-500/20' : 'bg-brand/10 border-brand/20'}`}>
          {danger ? <Trash2 size={22} className="text-red-500" /> : <AlertCircle size={22} className="text-brand" />}
        </div>
        <h2 className="text-lg font-bold text-white text-center mb-2">{title}</h2>
        <p className="text-sm text-ink-soft text-center mb-6">{body}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 px-4 py-2.5 border border-line text-ink-soft rounded-xl text-sm font-medium hover:bg-white/[0.03] hover:text-white transition-colors">Cancel</button>
          <button onClick={onConfirm} className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors border ${danger ? 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20' : 'bg-white text-ink border-transparent hover:bg-gray-200'}`}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Editor Toolbar ───────────────────────────────────────────────────────────

function EditorToolbar({ editor }: { editor: any }) {
  if (!editor) return null;
  const btn = (active: boolean, onClick: () => void, icon: React.ReactNode, title: string) => (
    <button type="button" title={title} onClick={onClick}
      className={`p-1.5 rounded transition-colors ${active ? 'bg-white text-ink' : 'text-ink-soft hover:bg-white/[0.05] hover:text-white'}`}>
      {icon}
    </button>
  );
  const addImage = () => { const url = window.prompt('Image URL:'); if (url) editor.chain().focus().setImage({ src: url }).run(); };
  const setLink = () => {
    const prev = editor.getAttributes('link').href;
    const url = window.prompt('URL:', prev);
    if (url === null) return;
    if (url === '') { editor.chain().focus().unsetLink().run(); return; }
    editor.chain().focus().setLink({ href: url }).run();
  };
  return (
    <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-line bg-paper">
      {btn(false, () => editor.chain().focus().undo().run(), <Undo size={14} />, 'Undo')}
      {btn(false, () => editor.chain().focus().redo().run(), <Redo size={14} />, 'Redo')}
      <div className="w-px h-4 bg-line mx-1" />
      {btn(editor.isActive('heading', { level: 1 }), () => editor.chain().focus().toggleHeading({ level: 1 }).run(), <Heading1 size={14} />, 'H1')}
      {btn(editor.isActive('heading', { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run(), <Heading2 size={14} />, 'H2')}
      {btn(editor.isActive('heading', { level: 3 }), () => editor.chain().focus().toggleHeading({ level: 3 }).run(), <Heading3 size={14} />, 'H3')}
      <div className="w-px h-4 bg-line mx-1" />
      {btn(editor.isActive('bold'), () => editor.chain().focus().toggleBold().run(), <Bold size={14} />, 'Bold')}
      {btn(editor.isActive('italic'), () => editor.chain().focus().toggleItalic().run(), <Italic size={14} />, 'Italic')}
      {btn(editor.isActive('underline'), () => editor.chain().focus().toggleUnderline().run(), <UnderlineIcon size={14} />, 'Underline')}
      {btn(editor.isActive('highlight'), () => editor.chain().focus().toggleHighlight().run(), <Highlighter size={14} />, 'Highlight')}
      <div className="w-px h-4 bg-line mx-1" />
      {btn(editor.isActive('bulletList'), () => editor.chain().focus().toggleBulletList().run(), <List size={14} />, 'Bullet list')}
      {btn(editor.isActive('orderedList'), () => editor.chain().focus().toggleOrderedList().run(), <ListOrdered size={14} />, 'Ordered list')}
      <div className="w-px h-4 bg-line mx-1" />
      {btn(editor.isActive({ textAlign: 'left' }), () => editor.chain().focus().setTextAlign('left').run(), <AlignLeft size={14} />, 'Left')}
      {btn(editor.isActive({ textAlign: 'center' }), () => editor.chain().focus().setTextAlign('center').run(), <AlignCenter size={14} />, 'Center')}
      {btn(editor.isActive({ textAlign: 'right' }), () => editor.chain().focus().setTextAlign('right').run(), <AlignRight size={14} />, 'Right')}
      <div className="w-px h-4 bg-line mx-1" />
      {btn(editor.isActive('link'), setLink, <LinkIcon size={14} />, 'Link')}
      {btn(false, addImage, <ImageIcon size={14} />, 'Image')}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function NewsletterPage() {
  const [tab, setTab] = useState<Tab>('subscribers');

  // Subscribers
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [subLoading, setSubLoading] = useState(true);
  const [subSearch, setSubSearch] = useState('');
  const [subFilter, setSubFilter] = useState<'all' | 'active' | 'unsubscribed'>('all');
  const [subPage, setSubPage] = useState(1);
  const [subPageSize, setSubPageSize] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [addError, setAddError] = useState('');
  const [adding, setAdding] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Confirm modal
  const [confirmModal, setConfirmModal] = useState<{
    title: string; body: string; confirmLabel?: string; danger?: boolean; onConfirm: () => void;
  } | null>(null);

  // Campaigns
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [campLoading, setCampLoading] = useState(true);
  const [expandedCamp, setExpandedCamp] = useState<string | null>(null);
  const [campPage, setCampPage] = useState(1);
  const [campPageSize, setCampPageSize] = useState(10);

  // Compose
  const [subject, setSubject] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [sending, setSending] = useState(false);
  const [showSendConfirm, setShowSendConfirm] = useState(false);

  // Blog Posts
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [blogEmailSubject, setBlogEmailSubject] = useState('');
  const [blogSending, setBlogSending] = useState(false);
  const [blogPage, setBlogPage] = useState(1);
  const [blogPageSize] = useState(9);
  const [blogSearch, setBlogSearch] = useState('');

  // Toast
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const showToast = useCallback((msg: string, type: 'success' | 'error') => setToast({ msg, type }), []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit, Underline, Highlight, TextStyle,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Heading.configure({ levels: [1, 2, 3] }),
      Link.configure({ openOnClick: false }), Image,
    ],
    content: '',
    editorProps: { attributes: { class: 'prose prose-sm prose-invert max-w-none min-h-[300px] px-5 py-4 focus:outline-none text-white' } },
  });

  // ── Firestore ──
  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, 'newsletter'), orderBy('subscribedAt', 'desc')),
      (snap) => { setSubscribers(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Subscriber[]); setSubLoading(false); }
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, 'newsletter_campaigns'), orderBy('sentAt', 'desc')),
      (snap) => { setCampaigns(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Campaign[]); setCampLoading(false); }
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    if (tab !== 'blogs') return;
    setBlogLoading(true);
    getDocs(query(collection(db, 'blog-posts'), orderBy('createdAt', 'desc')))
      .then((snap) => setBlogs(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as BlogPost[]))
      .catch(() => getDocs(collection(db, 'blog-posts'))
        .then((snap) => setBlogs(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as BlogPost[]))
        .catch(() => setBlogs([])))
      .finally(() => setBlogLoading(false));
  }, [tab]);

  useEffect(() => { if (selectedBlog) setBlogEmailSubject(`New Post: ${selectedBlog.title}`); }, [selectedBlog]);

  // Reset pages on filter/search change
  useEffect(() => setSubPage(1), [subSearch, subFilter]);
  useEffect(() => setBlogPage(1), [blogSearch]);

  // ── Subscriber actions ──
  const addSubscriber = async () => {
    setAddError('');
    if (!newEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) { setAddError('Enter a valid email address.'); return; }
    if (subscribers.find((s) => s.email === newEmail.toLowerCase())) { setAddError('Already in the list.'); return; }
    setAdding(true);
    try {
      await addDoc(collection(db, 'newsletter'), { email: newEmail.toLowerCase(), name: newName.trim(), status: 'active', source: 'manual', subscribedAt: serverTimestamp() });
      setShowAddModal(false); setNewEmail(''); setNewName('');
      showToast('Subscriber added.', 'success');
    } catch { setAddError('Failed to add subscriber.'); }
    finally { setAdding(false); }
  };

  const toggleSubscriberStatus = async (sub: Subscriber) => {
    const s = sub.status === 'active' ? 'unsubscribed' : 'active';
    await updateDoc(doc(db, 'newsletter', sub.id), { status: s });
    showToast(`Marked as ${s}.`, 'success');
  };

  const deleteSubscriber = (sub: Subscriber) => {
    setConfirmModal({
      title: 'Remove Subscriber', body: `Remove ${sub.email}? This cannot be undone.`, confirmLabel: 'Remove', danger: true,
      onConfirm: async () => {
        setConfirmModal(null);
        await deleteDoc(doc(db, 'newsletter', sub.id));
        setSelectedIds((p) => { const n = new Set(p); n.delete(sub.id); return n; });
        showToast('Removed.', 'success');
      },
    });
  };

  const bulkDelete = () => {
    const count = selectedIds.size;
    setConfirmModal({
      title: `Delete ${count} Subscriber${count !== 1 ? 's' : ''}`,
      body: `Permanently remove ${count} subscriber${count !== 1 ? 's' : ''}? This cannot be undone.`,
      confirmLabel: `Delete ${count}`, danger: true,
      onConfirm: async () => {
        setConfirmModal(null);
        await Promise.all([...selectedIds].map((id) => deleteDoc(doc(db, 'newsletter', id))));
        setSelectedIds(new Set());
        showToast(`Removed ${count} subscriber${count !== 1 ? 's' : ''}.`, 'success');
      },
    });
  };

  const toggleSelect = (id: string) => setSelectedIds((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleSelectAll = (ids: string[]) => {
    const all = ids.every((id) => selectedIds.has(id));
    setSelectedIds((p) => { const n = new Set(p); ids.forEach((id) => all ? n.delete(id) : n.add(id)); return n; });
  };

  // ── Send campaign ──
  const handleSend = () => {
    if (!subject.trim()) { showToast('Subject line is required.', 'error'); return; }
    if (!editor || editor.isEmpty) { showToast('Email content cannot be empty.', 'error'); return; }
    setShowSendConfirm(true);
  };

  const confirmSend = async () => {
    setShowSendConfirm(false); setSending(true);
    try {
      const res = await fetch('/api/newsletter/send', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: subject.trim(), previewText: previewText.trim(), html: editor!.getHTML() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Send failed');
      showToast(`Sent to ${data.sent} subscriber${data.sent !== 1 ? 's' : ''}${data.failed ? ` (${data.failed} failed)` : ''}.`, 'success');
      editor!.commands.clearContent(); setSubject(''); setPreviewText(''); setTab('campaigns');
    } catch (err: any) { showToast(err.message || 'Failed to send.', 'error'); }
    finally { setSending(false); }
  };

  // ── Send blog announcement ──
  const sendBlogAnnouncement = async () => {
    if (!selectedBlog) return;
    if (!blogEmailSubject.trim()) { showToast('Subject is required.', 'error'); return; }
    const postUrl = getBlogUrl(selectedBlog.slug);
    const coverImg = selectedBlog.coverImage || selectedBlog.thumbnail;
    const desc = selectedBlog.excerpt || selectedBlog.summary || '';
    const tags: string[] = selectedBlog.tags?.slice(0, 3) || [];
    const html = `
      <tr><td style="padding-bottom:${coverImg ? '0' : '20px'};">
        ${coverImg ? `<img src="${coverImg}" alt="${selectedBlog.title}" style="width:100%;max-height:320px;object-fit:cover;border-radius:10px;display:block;" />` : ''}
      </td></tr>
      <tr><td style="padding-top:28px;padding-bottom:12px;">
        ${tags.map((t: string) => `<span style="display:inline-block;background:#1a1a1a;border:1px solid #2a2a2a;color:#a1a1aa;font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;padding:3px 8px;border-radius:4px;margin-right:6px;">${t}</span>`).join('')}
      </td></tr>
      <tr><td style="padding-bottom:16px;">
        <h2 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;line-height:1.25;letter-spacing:-0.5px;">${selectedBlog.title}</h2>
      </td></tr>
      ${desc ? `<tr><td style="padding-bottom:28px;"><p style="margin:0;font-size:15px;color:#71717a;line-height:1.7;">${desc}</p></td></tr>` : ''}
      <tr><td style="padding-bottom:32px;">
        <a href="${postUrl}" style="display:inline-block;background:#f97316;color:#fff;text-decoration:none;padding:13px 28px;border-radius:6px;font-size:14px;font-weight:700;letter-spacing:0.02em;">Read Story →</a>
      </td></tr>
      <tr><td style="padding-bottom:28px;">
        <p style="margin:0;font-size:12px;color:#3f3f46;">Or copy: <a href="${postUrl}" style="color:#52525b;text-decoration:underline;word-break:break-all;">${postUrl}</a></p>
      </td></tr>
    `;
    setBlogSending(true);
    try {
      const res = await fetch('/api/newsletter/send', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: blogEmailSubject.trim(), previewText: desc.slice(0, 120), html, blogTemplate: true }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Send failed');
      showToast(`Sent to ${data.sent} subscriber${data.sent !== 1 ? 's' : ''}.`, 'success');
      setSelectedBlog(null);
    } catch (err: any) { showToast(err.message || 'Failed.', 'error'); }
    finally { setBlogSending(false); }
  };

  // ── Derived data ──
  const activeCount = subscribers.filter((s) => s.status === 'active').length;
  const unsubCount = subscribers.filter((s) => s.status === 'unsubscribed').length;
  const websiteCount = subscribers.filter((s) => s.source === 'website').length;

  const filteredSubs = subscribers.filter((s) => {
    const mf = subFilter === 'all' || s.status === subFilter;
    const ms = !subSearch || s.email.toLowerCase().includes(subSearch.toLowerCase()) || s.name?.toLowerCase().includes(subSearch.toLowerCase());
    return mf && ms;
  });

  const pagedSubs = filteredSubs.slice((subPage - 1) * subPageSize, subPage * subPageSize);
  const pagedCamps = campaigns.slice((campPage - 1) * campPageSize, campPage * campPageSize);

  const filteredBlogs = blogs.filter((b) =>
    !blogSearch || b.title.toLowerCase().includes(blogSearch.toLowerCase()) || b.tags?.some((t) => t.toLowerCase().includes(blogSearch.toLowerCase()))
  );
  const pagedBlogs = filteredBlogs.slice((blogPage - 1) * blogPageSize, blogPage * blogPageSize);

  const pageIds = pagedSubs.map((s) => s.id);
  const allPageSelected = pageIds.length > 0 && pageIds.every((id) => selectedIds.has(id));
  const somePageSelected = pageIds.some((id) => selectedIds.has(id));
  const selectedCount = [...selectedIds].filter((id) => filteredSubs.some((s) => s.id === id)).length;

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'subscribers', label: 'Subscribers', icon: <Users size={15} />, count: subscribers.length },
    { id: 'compose', label: 'New Campaign', icon: <Send size={15} /> },
    { id: 'campaigns', label: 'Campaigns', icon: <History size={15} />, count: campaigns.length },
    { id: 'blogs', label: 'Blog Posts', icon: <FileText size={15} />, count: blogs.length || undefined },
  ];

  return (
    <div className={`${interTight.className} p-6 max-w-[1400px] text-admin-text`}>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      {confirmModal && (
        <ConfirmModal title={confirmModal.title} body={confirmModal.body} confirmLabel={confirmModal.confirmLabel}
          danger={confirmModal.danger} onConfirm={confirmModal.onConfirm} onCancel={() => setConfirmModal(null)} />
      )}

      {/* ── Page Header ── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg bg-admin-accent/10 border border-admin-accent/20 flex items-center justify-center">
              <Megaphone size={16} className="text-admin-accent" />
            </div>
            <h1 className="text-2xl font-bold text-admin-text">Newsletter</h1>
          </div>
          <p className="text-sm text-admin-text-muted ml-10.5">Manage subscribers, send campaigns and blog announcements</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-admin-accent hover:bg-admin-accent/80 text-white text-sm font-semibold rounded-xl transition-all shadow-sm"
        >
          <Plus size={15} /> Add Subscriber
        </button>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Subscribers', value: subscribers.length, icon: Users, color: 'text-admin-accent', bg: 'bg-admin-card', border: 'border-admin-border', sub: 'All time' },
          { label: 'Active', value: activeCount, icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', sub: `${subscribers.length > 0 ? Math.round((activeCount / subscribers.length) * 100) : 0}% of total` },
          { label: 'Unsubscribed', value: unsubCount, icon: UserMinus, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', sub: `${subscribers.length > 0 ? Math.round((unsubCount / subscribers.length) * 100) : 0}% of total` },
          { label: 'Campaigns Sent', value: campaigns.length, icon: Activity, color: 'text-admin-accent', bg: 'bg-admin-accent/10', border: 'border-admin-accent/20', sub: `${websiteCount} from website` },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`${s.bg} ${s.border} border rounded-2xl px-5 py-4`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl ${s.bg} border ${s.border} flex items-center justify-center`}>
                  <Icon size={16} className={s.color} />
                </div>
              </div>
              <p className="text-2xl font-bold text-admin-text tracking-tight">{s.value}</p>
              <p className="text-xs font-semibold text-admin-text-muted mt-0.5">{s.label}</p>
              <p className="text-[11px] text-admin-text-muted/70 mt-0.5">{s.sub}</p>
            </div>
          );
        })}
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 p-1 bg-admin-bg border border-admin-border rounded-xl w-fit mb-6">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${tab === t.id ? 'bg-admin-card text-admin-text shadow-sm border border-admin-border' : 'text-admin-text-muted hover:text-admin-text'}`}>
            {t.icon}
            {t.label}
            {t.count !== undefined && (
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${tab === t.id ? 'bg-admin-bg text-admin-text' : 'bg-admin-bg text-admin-text-muted'}`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ══ SUBSCRIBERS TAB ══════════════════════════════════════════════════ */}
      {tab === 'subscribers' && (
        <div className="bg-admin-card border border-admin-border rounded-2xl overflow-hidden shadow-sm">
          {/* Toolbar */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-admin-border">
            <div className="relative flex-1 max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-muted" />
              <input value={subSearch} onChange={(e) => setSubSearch(e.target.value)} placeholder="Search by email or name…"
                className="w-full pl-8 pr-3 py-2 text-sm border border-admin-border rounded-lg bg-admin-bg text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent transition-all" />
              {subSearch && <button onClick={() => setSubSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-admin-text-muted hover:text-admin-text"><X size={13} /></button>}
            </div>
            <div className="flex gap-0.5 p-0.5 bg-admin-bg rounded-lg border border-admin-border">
              {(['all', 'active', 'unsubscribed'] as const).map((f) => (
                <button key={f} onClick={() => setSubFilter(f)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${subFilter === f ? 'bg-admin-card text-admin-text shadow-sm border border-admin-border' : 'text-admin-text-muted hover:text-admin-text'}`}>
                  {f === 'all' ? 'All' : f === 'active' ? `Active (${activeCount})` : `Unsubscribed (${unsubCount})`}
                </button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2">
              {selectedCount > 0 && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-admin-accent/20 border border-admin-accent/30 text-admin-accent rounded-lg">
                  <span className="text-xs font-semibold">{selectedCount} selected</span>
                  <button onClick={() => setSelectedIds(new Set())} className="text-admin-accent/70 hover:text-admin-accent transition-colors"><X size={12} /></button>
                  <div className="w-px h-4 bg-admin-accent/30" />
                  <button onClick={bulkDelete} className="flex items-center gap-1 text-xs text-red-500 hover:text-red-400 font-semibold transition-colors">
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              )}
              <button onClick={() => exportCSV(filteredSubs)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-admin-text-muted hover:text-admin-text border border-admin-border bg-admin-bg hover:bg-admin-bg/60 rounded-lg transition-colors">
                <Download size={13} /> Export
              </button>
            </div>
          </div>

          {/* Table */}
          {subLoading ? (
            <div className="flex items-center justify-center h-48"><Loader2 size={24} className="animate-spin text-admin-text-muted" /></div>
          ) : filteredSubs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-14 h-14 rounded-2xl bg-admin-bg border border-admin-border flex items-center justify-center mb-4">
                <Users size={24} className="text-admin-text-muted" />
              </div>
              <p className="text-sm font-semibold text-admin-text-muted">No subscribers found</p>
              <p className="text-xs text-admin-text-muted/70 mt-1">{subSearch ? 'Try a different search term' : 'Add your first subscriber to get started'}</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-admin-bg/50 border-b border-admin-border">
                      <th className="w-10 px-4 py-3">
                        <button onClick={() => toggleSelectAll(pageIds)} className="text-admin-text-muted hover:text-admin-text transition-colors">
                          {allPageSelected ? <CheckSquare size={15} className="text-admin-text" /> : somePageSelected ? <CheckSquare size={15} className="text-admin-text-muted" /> : <Square size={15} />}
                        </button>
                      </th>
                      {['Subscriber', 'Source', 'Status', 'Joined', ''].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-admin-text-muted uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-admin-border">
                    {pagedSubs.map((sub) => (
                      <tr key={sub.id} className={`hover:bg-admin-bg/40 transition-colors group ${selectedIds.has(sub.id) ? 'bg-admin-accent/5' : ''}`}>
                        <td className="px-4 py-3.5">
                          <button onClick={() => toggleSelect(sub.id)} className="text-admin-text-muted hover:text-admin-text transition-colors">
                            {selectedIds.has(sub.id) ? <CheckSquare size={15} className="text-admin-text" /> : <Square size={15} />}
                          </button>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${sub.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-admin-bg border border-admin-border text-admin-text-muted'}`}>
                              {sub.email[0].toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-admin-text">{sub.email}</p>
                              {sub.name && <p className="text-xs text-admin-text-muted">{sub.name}</p>}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${sub.source === 'website' ? 'bg-admin-accent/10 text-admin-accent border-admin-accent/20' : 'bg-purple-500/10 text-purple-400 border-purple-500/20'}`}>
                            {sub.source}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${sub.status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-admin-bg/50 text-admin-text-muted border-admin-border'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${sub.status === 'active' ? 'bg-green-500' : 'bg-admin-text-muted'}`} />
                            {sub.status === 'active' ? 'Active' : 'Unsubscribed'}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-xs text-admin-text-muted">{formatDate(sub.subscribedAt)}</td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => toggleSubscriberStatus(sub)} title={sub.status === 'active' ? 'Unsubscribe' : 'Reactivate'}
                              className={`p-1.5 rounded-lg transition-colors border border-transparent ${sub.status === 'active' ? 'hover:bg-orange-500/10 text-admin-text-muted hover:text-orange-500 hover:border-orange-500/20' : 'hover:bg-green-500/10 text-admin-text-muted hover:text-green-500 hover:border-green-500/20'}`}>
                              {sub.status === 'active' ? <UserX size={14} /> : <UserCheck size={14} />}
                            </button>
                            <button onClick={() => deleteSubscriber(sub)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-admin-text-muted hover:text-red-500 border border-transparent hover:border-red-500/20 transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination total={filteredSubs.length} page={subPage} pageSize={subPageSize}
                onPageChange={setSubPage} onPageSizeChange={setSubPageSize} />
            </>
          )}
        </div>
      )}

      {/* ══ COMPOSE TAB ══════════════════════════════════════════════════════ */}
      {tab === 'compose' && (
        <div className="max-w-3xl">
          <div className="bg-admin-card border border-admin-border rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-admin-border flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-admin-text">Compose Campaign</h2>
                <p className="text-xs text-admin-text-muted mt-0.5">Sending to <strong className="text-admin-text">{activeCount}</strong> active subscriber{activeCount !== 1 ? 's' : ''}</p>
              </div>
              <button onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-admin-border rounded-lg hover:bg-admin-bg transition-colors text-admin-text-muted hover:text-admin-text">
                {showPreview ? <><EyeOff size={12} /> Hide Preview</> : <><Eye size={12} /> Preview</>}
              </button>
            </div>
            <div className={showPreview ? 'grid grid-cols-2 divide-x divide-admin-border' : ''}>
              <div>
                <div className="px-6 pt-5 pb-3 border-b border-admin-border">
                  <label className="block text-[10px] font-bold text-admin-text-muted uppercase tracking-widest mb-2">Subject Line *</label>
                  <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Your email subject…"
                    className="w-full text-base font-semibold text-admin-text placeholder-admin-text-muted focus:outline-none border-0 bg-transparent" />
                </div>
                <div className="px-6 py-3 border-b border-admin-border">
                  <label className="block text-[10px] font-bold text-admin-text-muted uppercase tracking-widest mb-2">Preview Text <span className="font-normal normal-case text-admin-text-muted/70">(inbox snippet)</span></label>
                  <input value={previewText} onChange={(e) => setPreviewText(e.target.value)} placeholder="Short text shown in inbox…"
                    className="w-full text-sm text-admin-text-muted placeholder-admin-text-muted/70 focus:outline-none border-0 bg-transparent" />
                </div>
                <EditorToolbar editor={editor} />
                <EditorContent editor={editor} />
              </div>
              {showPreview && (
                <div className="bg-admin-bg overflow-y-auto max-h-[580px] p-4">
                  <p className="text-[10px] font-bold text-admin-text-muted uppercase tracking-widest mb-3">Inbox Preview</p>
                  <div className="bg-admin-card rounded-xl border border-admin-border overflow-hidden text-sm shadow-sm">
                    <div className="bg-admin-bg px-5 py-3"><p className="text-admin-text font-bold tracking-tight uppercase">Botmartz</p></div>
                    <div className="px-5 py-4">
                      <p className="text-admin-text-muted text-sm mb-4">Hi there,</p>
                      <div className="prose prose-sm prose-invert max-w-none text-admin-text" dangerouslySetInnerHTML={{ __html: editor?.getHTML() || '' }} />
                    </div>
                    <div className="px-5 py-3 bg-admin-bg border-t border-admin-border text-center">
                      <p className="text-xs text-admin-text-muted">You received this because you subscribed.</p>
                      <p className="text-xs text-admin-text-muted mt-1 underline">Unsubscribe</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-admin-border bg-admin-bg/30 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-admin-text-muted">
                <Mail size={13} />
                <span>Sending to <strong className="text-admin-text">{activeCount}</strong> active subscriber{activeCount !== 1 ? 's' : ''}</span>
              </div>
              <button onClick={handleSend} disabled={sending || activeCount === 0}
                className="flex items-center gap-2 px-5 py-2.5 bg-admin-accent hover:bg-admin-accent/80 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
                {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                {sending ? 'Sending…' : 'Send Campaign'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ CAMPAIGNS TAB ════════════════════════════════════════════════════ */}
      {tab === 'campaigns' && (
        <div>
          {campLoading ? (
            <div className="flex items-center justify-center h-48"><Loader2 size={24} className="animate-spin text-admin-text-muted" /></div>
          ) : campaigns.length === 0 ? (
            <div className="bg-admin-card border border-admin-border border-dashed rounded-2xl flex flex-col items-center justify-center py-20">
              <div className="w-14 h-14 rounded-2xl bg-admin-bg border border-admin-border flex items-center justify-center mb-4">
                <History size={24} className="text-admin-text-muted" />
              </div>
              <p className="text-sm font-semibold text-admin-text-muted">No campaigns yet</p>
              <p className="text-xs text-admin-text-muted/70 mt-1">Send your first campaign from the Compose tab</p>
              <button onClick={() => setTab('compose')} className="mt-4 flex items-center gap-2 px-4 py-2 bg-admin-accent text-white text-sm font-medium rounded-lg hover:bg-admin-accent/85 transition-colors">
                <Send size={13} /> Compose
              </button>
            </div>
          ) : (
            <div className="bg-admin-card border border-admin-border rounded-2xl overflow-hidden shadow-sm">
              <div className="px-5 py-3.5 border-b border-admin-border flex items-center justify-between bg-admin-bg/10">
                <p className="text-xs font-semibold text-admin-text-muted uppercase tracking-wider">Campaign History</p>
                <span className="text-xs text-admin-text-muted">{campaigns.length} total</span>
              </div>
              <div className="divide-y divide-admin-border">
                {pagedCamps.map((camp) => (
                  <div key={camp.id}>
                    <button onClick={() => setExpandedCamp(expandedCamp === camp.id ? null : camp.id)}
                      className="w-full flex items-center gap-4 px-5 py-4 hover:bg-admin-bg/40 transition-colors text-left">
                      <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                        <MailOpen size={16} className="text-green-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-admin-text truncate">{camp.subject}</p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-xs text-admin-text-muted">{formatDate(camp.sentAt)}</span>
                          <span className="text-xs text-admin-text-muted/50">·</span>
                          <span className="text-xs text-admin-text-muted">{camp.recipientCount} delivered</span>
                          {camp.failedCount > 0 && <><span className="text-xs text-admin-text-muted/50">·</span><span className="text-xs text-red-400">{camp.failedCount} failed</span></>}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Sent
                        </span>
                        {expandedCamp === camp.id ? <ChevronUp size={14} className="text-admin-text-muted" /> : <ChevronDown size={14} className="text-admin-text-muted" />}
                      </div>
                    </button>
                    {expandedCamp === camp.id && (
                      <div className="border-t border-admin-border px-5 py-5 bg-admin-bg/50">
                        {camp.previewText && <p className="text-xs text-admin-text-muted italic mb-4">Preview text: {camp.previewText}</p>}
                        <div className="bg-admin-card rounded-xl border border-admin-border px-6 py-5">
                          <div className="prose prose-sm prose-invert max-w-none text-admin-text" dangerouslySetInnerHTML={{ __html: camp.html }} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Pagination total={campaigns.length} page={campPage} pageSize={campPageSize}
                onPageChange={setCampPage} onPageSizeChange={setCampPageSize} />
            </div>
          )}
        </div>
      )}

      {/* ══ BLOG POSTS TAB ═══════════════════════════════════════════════════ */}
      {tab === 'blogs' && (
        <div className="flex gap-6 animate-in fade-in-50 duration-200">
          <div className="flex-1 min-w-0">
            {/* Blog toolbar */}
            <div className="flex items-center gap-3 mb-5">
              <div className="relative flex-1 max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-muted" />
                <input value={blogSearch} onChange={(e) => setBlogSearch(e.target.value)} placeholder="Search blog posts…"
                  className="w-full pl-8 pr-3 py-2 text-sm border border-admin-border rounded-lg bg-admin-bg text-admin-text placeholder-admin-text-muted focus:outline-none focus:border-admin-accent" />
                {blogSearch && <button onClick={() => setBlogSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-admin-text-muted hover:text-admin-text"><X size={13} /></button>}
              </div>
              <p className="text-xs text-admin-text-muted ml-auto">
                {filteredBlogs.length} post{filteredBlogs.length !== 1 ? 's' : ''} · click to send announcement
              </p>
            </div>

            {blogLoading ? (
              <div className="flex items-center justify-center h-48"><Loader2 size={24} className="animate-spin text-admin-text-muted" /></div>
            ) : filteredBlogs.length === 0 ? (
              <div className="bg-admin-card border border-admin-border border-dashed rounded-2xl flex flex-col items-center justify-center py-20">
                <div className="w-14 h-14 rounded-2xl bg-admin-bg border border-admin-border flex items-center justify-center mb-4">
                  <FileText size={24} className="text-admin-text-muted" />
                </div>
                <p className="text-sm font-semibold text-admin-text-muted">No blog posts found</p>
                <p className="text-xs text-admin-text-muted/70 mt-1">Create posts in the Blog Posts section first</p>
              </div>
            ) : (
              <div className="bg-admin-card border border-admin-border rounded-2xl overflow-hidden shadow-sm">
                <div className="divide-y divide-admin-border">
                  {pagedBlogs.map((blog) => {
                    const cover = blog.coverImage || blog.thumbnail;
                    const desc = blog.excerpt || blog.summary || '';
                    const isSelected = selectedBlog?.id === blog.id;
                    return (
                      <button key={blog.id} onClick={() => setSelectedBlog(isSelected ? null : blog)}
                        className={`w-full text-left flex gap-4 px-5 py-4 hover:bg-admin-bg/30 transition-all ${isSelected ? 'bg-admin-accent/5 border-l-2 border-l-admin-accent' : ''}`}>
                        {cover ? (
                          <img src={cover} alt={blog.title} className="w-16 h-12 object-cover rounded-xl shrink-0 bg-admin-bg" />
                        ) : (
                          <div className="w-16 h-12 rounded-xl bg-admin-bg border border-admin-border flex items-center justify-center shrink-0">
                            <FileText size={18} className="text-admin-text-muted" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-semibold text-admin-text leading-snug">{blog.title}</p>
                            {isSelected && (
                              <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 bg-admin-accent text-white text-[10px] font-bold rounded-full">
                                <CheckCircle size={10} /> Selected
                              </span>
                            )}
                          </div>
                          {desc && <p className="text-xs text-admin-text-muted mt-0.5 line-clamp-1">{desc}</p>}
                          <div className="flex items-center gap-2 mt-1.5">
                            {blog.tags?.slice(0, 3).map((tag) => (
                              <span key={tag} className="px-1.5 py-0.5 bg-admin-bg/50 text-admin-text-muted text-[10px] font-medium rounded">{tag}</span>
                            ))}
                            <span className="text-[10px] text-admin-text-muted/50 ml-auto">{formatDate(blog.publishedAt || blog.createdAt)}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <Pagination total={filteredBlogs.length} page={blogPage} pageSize={blogPageSize}
                  onPageChange={setBlogPage} onPageSizeChange={() => {}} pageSizeOptions={[9]} />
              </div>
            )}
          </div>

          {/* Send panel */}
          {selectedBlog && (
            <div className="w-80 shrink-0 animate-in slide-in-from-right-4 duration-200">
              <div className="sticky top-6 bg-admin-card border border-admin-border rounded-2xl overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-admin-border flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-admin-text">Blog Announcement</h3>
                    <p className="text-xs text-admin-text-muted mt-0.5">→ {activeCount} active subscribers</p>
                  </div>
                  <button onClick={() => setSelectedBlog(null)} className="p-1 hover:bg-admin-bg rounded-lg transition-colors">
                    <X size={14} className="text-admin-text-muted" />
                  </button>
                </div>

                {/* Dark email preview */}
                <div className="p-4">
                  <div className="rounded-xl overflow-hidden text-xs border border-admin-border" style={{ background: '#0a0a0a' }}>
                    <div className="px-4 py-2.5 border-b border-admin-border" style={{ background: '#0d0d0d' }}>
                      <div className="flex items-center justify-between">
                        <span className="font-black text-white text-sm tracking-tight">BOTMARTZ</span>
                        <span className="text-[10px] font-semibold" style={{ color: '#00B8F0' }}>/ Blog</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="inline-block mb-3 px-2 py-0.5 rounded text-[9px] font-black tracking-widest text-white" style={{ background: '#00B8F0' }}>NEW POST</div>
                      {(selectedBlog.coverImage || selectedBlog.thumbnail) && (
                        <img src={selectedBlog.coverImage || selectedBlog.thumbnail} alt={selectedBlog.title} className="w-full h-20 object-cover rounded-lg mb-3" />
                      )}
                      {selectedBlog.tags?.slice(0, 2).map((t) => (
                        <span key={t} className="inline-block mr-1 mb-2 px-1.5 py-0.5 rounded text-[9px] font-semibold tracking-wide bg-admin-bg border border-admin-border text-admin-text-muted">{t}</span>
                      ))}
                      <p className="font-black text-white text-xs leading-tight mb-2">{selectedBlog.title}</p>
                      {(selectedBlog.excerpt || selectedBlog.summary) && (
                        <p className="text-[10px] leading-relaxed mb-3 line-clamp-2 text-admin-text-muted/80">{selectedBlog.excerpt || selectedBlog.summary}</p>
                      )}
                      <div className="inline-block text-ink text-[10px] font-bold px-3 py-1.5 rounded bg-white">Read Story →</div>
                    </div>
                    <div className="px-4 py-2.5 border-t border-admin-border text-center bg-admin-bg">
                      <span className="text-[9px] text-admin-text-muted">Unsubscribe</span>
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="px-5 pb-4">
                  <label className="block text-[10px] font-bold text-admin-text-muted uppercase tracking-widest mb-1.5">Subject Line</label>
                  <input value={blogEmailSubject} onChange={(e) => setBlogEmailSubject(e.target.value)} placeholder="New Post: Your Blog Title"
                    className="w-full border border-admin-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-admin-accent bg-admin-bg text-admin-text transition-all placeholder-admin-text-muted/50" />
                </div>

                {/* Link */}
                <div className="px-5 pb-4">
                  <a href={getBlogUrl(selectedBlog.slug)} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-admin-accent hover:text-admin-accent/80 transition-colors truncate">
                    <ExternalLink size={11} /><span className="truncate">{getBlogUrl(selectedBlog.slug)}</span>
                  </a>
                </div>

                {/* Send */}
                <div className="px-5 pb-5">
                  <button onClick={sendBlogAnnouncement} disabled={blogSending || activeCount === 0}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-admin-accent hover:bg-admin-accent/80 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
                    {blogSending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                    {blogSending ? 'Sending…' : `Send to ${activeCount} Subscriber${activeCount !== 1 ? 's' : ''}`}
                  </button>
                  {activeCount === 0 && <p className="text-xs text-red-500 text-center mt-2">No active subscribers.</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Add Subscriber Modal ── */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-admin-card border border-admin-border rounded-2xl shadow-2xl w-full max-w-sm">
            <div className="flex items-center justify-between p-5 border-b border-admin-border">
              <h2 className="text-base font-semibold text-admin-text">Add Subscriber</h2>
              <button onClick={() => { setShowAddModal(false); setAddError(''); setNewEmail(''); setNewName(''); }} className="p-1.5 hover:bg-admin-bg rounded-lg transition-colors">
                <X size={16} className="text-admin-text-muted" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-admin-text-muted uppercase tracking-widest mb-1.5">Email *</label>
                <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addSubscriber()}
                  placeholder="subscriber@example.com" className="w-full border border-admin-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-admin-accent bg-admin-bg text-admin-text placeholder-admin-text-muted/50" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-admin-text-muted uppercase tracking-widest mb-1.5">Name <span className="font-normal normal-case text-admin-text-muted/70">(optional)</span></label>
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addSubscriber()}
                  placeholder="John Doe" className="w-full border border-admin-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-admin-accent bg-admin-bg text-admin-text placeholder-admin-text-muted/50" />
              </div>
              {addError && <p className="text-xs text-red-500 flex items-center gap-1.5"><AlertCircle size={12} /> {addError}</p>}
            </div>
            <div className="flex gap-3 px-5 pb-5">
              <button onClick={() => { setShowAddModal(false); setAddError(''); setNewEmail(''); setNewName(''); }}
                className="flex-1 px-4 py-2.5 border border-admin-border text-admin-text-muted rounded-xl text-sm font-medium hover:text-admin-text hover:bg-admin-bg transition-colors">Cancel</button>
              <button onClick={addSubscriber} disabled={adding}
                className="flex-1 px-4 py-2.5 bg-admin-accent hover:bg-admin-accent/80 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
                {adding ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
                {adding ? 'Adding…' : 'Add Subscriber'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Send Confirm Modal ── */}
      {showSendConfirm && (
        <ConfirmModal title="Send Campaign?" body={`Send "${subject}" to ${activeCount} active subscriber${activeCount !== 1 ? 's' : ''}? This cannot be undone.`}
          confirmLabel="Send Now" onConfirm={confirmSend} onCancel={() => setShowSendConfirm(false)} />
      )}
    </div>
  );
}
