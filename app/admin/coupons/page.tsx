"use client";

import { useState, useEffect } from 'react';
import {
  Plus, Trash2, Tag, Check, X, Sparkles,
  Gift, Copy, CheckCheck, Edit2, Save, Ticket, Loader2,
  ShieldCheck, RefreshCw
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, deleteDoc, updateDoc, doc, onSnapshot, query, getDocs } from 'firebase/firestore';

interface Coupon {
  id: string;
  code: string;
  type?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  isActive: boolean;
  maxUses: number;
  currentUses: number;
  createdAt?: string;
}

// Generate a truly random, unguessable coupon code
function generateUniqueCode(prefix: string): string {
  // Use only unambiguous characters (no 0/O, I/1, etc.)
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 8; i++) {
    rand += chars[Math.floor(Math.random() * chars.length)];
  }
  // Format: PREFIX-XXXX-XXXX (e.g. BMFREE-K7NP-Q3RW)
  return `${prefix.toUpperCase()}-${rand.slice(0, 4)}-${rand.slice(4, 8)}`;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="ml-1.5 p-1 rounded text-admin-text-muted hover:text-[#00B8F0] transition-colors"
      title="Copy"
    >
      {copied ? <CheckCheck size={12} className="text-emerald-400" /> : <Copy size={12} />}
    </button>
  );
}

// Progress bar component
function ProgressBar({ used, max, color = 'bg-blue-500' }: { used: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.min(100, Math.round((used / max) * 100)) : 0;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] text-admin-text-muted font-medium">
        <span>{used} used / {max} total</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full h-1.5 bg-admin-bg rounded-full border border-admin-border overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function CouponsDashboard() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // BOTMARTZ10 limit editor
  const [bm10EditMode, setBm10EditMode] = useState(false);
  const [bm10Input, setBm10Input] = useState<number>(50);
  const [bm10Saving, setBm10Saving] = useState(false);

  // Free coupon generator
  const [genPrefix, setGenPrefix] = useState('BMFREE');
  const [genCount, setGenCount] = useState(5);
  const [generating, setGenerating] = useState(false);
  const [generatedCodes, setGeneratedCodes] = useState<string[]>([]);
  const [showGenPanel, setShowGenPanel] = useState(false);

  // Custom coupon form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState(10);
  const [maxUses, setMaxUses] = useState(50);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch coupons WITHOUT orderBy to avoid index errors
  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'coupons'));
      const docs: Coupon[] = snap.docs.map(d => {
        const data = d.data();
        return {
          id: d.id,
          code: data.code || '',
          type: data.type || 'custom',
          discountType: data.discountType || 'percentage',
          discountValue: Number(data.discountValue) || 0,
          isActive: data.isActive !== false,
          maxUses: Number(data.maxUses) || 1,
          currentUses: Number(data.currentUses) || 0,
          createdAt: data.createdAt || ''
        };
      });
      // Sort client-side by createdAt desc
      docs.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      setCoupons(docs);

      // Sync BOTMARTZ10 input
      const bm10 = docs.find(c => c.code === 'BOTMARTZ10');
      if (bm10) setBm10Input(bm10.maxUses);
    } catch (e) {
      console.error('Failed to fetch coupons:', e);
    }
    setLoading(false);
  };

  useEffect(() => { fetchCoupons(); }, [refreshKey]);

  // Also real-time snapshot (no orderBy)
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'coupons'), (snap) => {
      const docs: Coupon[] = snap.docs.map(d => {
        const data = d.data();
        return {
          id: d.id,
          code: data.code || '',
          type: data.type || 'custom',
          discountType: data.discountType || 'percentage',
          discountValue: Number(data.discountValue) || 0,
          isActive: data.isActive !== false,
          maxUses: Number(data.maxUses) || 1,
          currentUses: Number(data.currentUses) || 0,
          createdAt: data.createdAt || ''
        };
      });
      docs.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      setCoupons(docs);
      const bm10 = docs.find(c => c.code === 'BOTMARTZ10');
      if (bm10) setBm10Input(bm10.maxUses);
      setLoading(false);
    }, () => setLoading(false));
    return () => unsub();
  }, []);

  // Generate unique random free coupon codes
  const handleGenerateFreeCoupons = async () => {
    if (genCount <= 0 || genCount > 100) return;
    setGenerating(true);
    setGeneratedCodes([]);

    const existingCodes = new Set(coupons.map(c => c.code));
    const newCodes: string[] = [];

    for (let i = 0; i < genCount; i++) {
      let code = '';
      let attempts = 0;
      do {
        code = generateUniqueCode(genPrefix);
        attempts++;
      } while ((existingCodes.has(code) || newCodes.includes(code)) && attempts < 30);
      newCodes.push(code);
      existingCodes.add(code); // prevent duplicates within this batch
    }

    try {
      await Promise.all(newCodes.map(c =>
        addDoc(collection(db, 'coupons'), {
          code: c,
          type: 'free-pass',
          discountType: 'percentage',
          discountValue: 100,
          isActive: true,
          maxUses: 1,
          currentUses: 0,
          createdAt: new Date().toISOString()
        })
      ));
      setGeneratedCodes(newCodes);
    } catch (e) {
      console.error('Error generating coupons:', e);
      alert('Failed to generate coupons. Try again.');
    }
    setGenerating(false);
  };

  // Save BOTMARTZ10 limit
  const handleSaveBm10Limit = async () => {
    const bm10Doc = coupons.find(c => c.code === 'BOTMARTZ10');
    if (!bm10Doc || bm10Doc.id.startsWith('sys-')) return;
    if (bm10Input < 1) return;
    setBm10Saving(true);
    try {
      await updateDoc(doc(db, 'coupons', bm10Doc.id), { maxUses: bm10Input });
      setBm10EditMode(false);
    } catch (e) {
      console.error('Failed to save BOTMARTZ10 limit:', e);
      alert('Failed to save. Try again.');
    }
    setBm10Saving(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim() || discountValue <= 0) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'coupons'), {
        code: newCode.trim().toUpperCase(),
        type: 'custom',
        discountType,
        discountValue: Number(discountValue),
        isActive: true,
        maxUses: Number(maxUses),
        currentUses: 0,
        createdAt: new Date().toISOString()
      });
      setNewCode('');
      setDiscountValue(10);
      setMaxUses(50);
      setShowAddForm(false);
    } catch (e) {
      console.error('Error creating coupon:', e);
    }
    setIsSubmitting(false);
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    if (id.startsWith('sys-')) return;
    setActionLoading(`toggle-${id}`);
    try {
      await updateDoc(doc(db, 'coupons', id), { isActive: !currentStatus });
    } catch (e) { console.error(e); }
    setActionLoading(null);
  };

  const handleDelete = async (id: string, codeName: string) => {
    if (id.startsWith('sys-')) return;
    if (!confirm(`Delete coupon "${codeName}"? This cannot be undone.`)) return;
    setActionLoading(`del-${id}`);
    try {
      await deleteDoc(doc(db, 'coupons', id));
    } catch (e) { console.error(e); }
    setActionLoading(null);
  };

  // Separate into categories
  const freeCoupons = coupons.filter(c => c.type === 'free-pass');
  const discountCoupons = coupons.filter(c => c.type !== 'free-pass');

  const bm10Doc = coupons.find(c => c.code === 'BOTMARTZ10');
  const bm10Used = bm10Doc?.currentUses ?? 0;
  const bm10Max = bm10Doc?.maxUses ?? 50;

  const freeUsed = freeCoupons.filter(c => c.currentUses >= c.maxUses).length;
  const freeAvail = freeCoupons.filter(c => c.currentUses < c.maxUses && c.isActive).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-admin-border pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-admin-text flex items-center gap-2">
            <Ticket className="w-6 h-6 text-[#00B8F0]" />
            Coupon Generator & Manager
          </h1>
          <p className="text-xs sm:text-sm text-admin-text-muted mt-0.5">
            Generate unique free pass codes, manage discount limits, track all coupon usage.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setRefreshKey(k => k + 1)}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-admin-card border border-admin-border text-admin-text-muted hover:text-admin-text text-xs font-semibold transition-colors"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin text-[#00B8F0]' : ''} /> Refresh
          </button>
          <button
            onClick={() => { setShowGenPanel(!showGenPanel); setShowAddForm(false); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors shadow-sm"
          >
            <Gift size={14} /> Generate Free Coupons
          </button>
          <button
            onClick={() => { setShowAddForm(!showAddForm); setShowGenPanel(false); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00B8F0] hover:bg-[#0096C7] text-white text-xs font-semibold transition-colors shadow-sm"
          >
            <Plus size={14} /> Custom Coupon
          </button>
        </div>
      </div>

      {/* SUMMARY STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-admin-card border border-admin-border rounded-xl p-4 shadow-sm">
          <p className="text-[10px] text-admin-text-muted uppercase tracking-wider mb-1">Free Coupons Total</p>
          <p className="text-2xl font-bold text-admin-text font-mono">{freeCoupons.length}</p>
        </div>
        <div className="bg-admin-card border border-emerald-500/20 rounded-xl p-4 shadow-sm">
          <p className="text-[10px] text-emerald-400 uppercase tracking-wider mb-1">Free — Available</p>
          <p className="text-2xl font-bold text-emerald-400 font-mono">{freeAvail}</p>
        </div>
        <div className="bg-admin-card border border-rose-500/20 rounded-xl p-4 shadow-sm">
          <p className="text-[10px] text-rose-400 uppercase tracking-wider mb-1">Free — Used Up</p>
          <p className="text-2xl font-bold text-rose-400 font-mono">{freeUsed}</p>
        </div>
        <div className="bg-admin-card border border-blue-500/20 rounded-xl p-4 shadow-sm">
          <p className="text-[10px] text-blue-400 uppercase tracking-wider mb-1">BOTMARTZ10 Left</p>
          <p className="text-2xl font-bold text-blue-400 font-mono">{Math.max(0, bm10Max - bm10Used)}</p>
        </div>
      </div>

      {/* FREE COUPON GENERATOR PANEL */}
      {showGenPanel && (
        <div className="bg-admin-card border border-emerald-500/30 rounded-2xl p-6 shadow-lg space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-admin-text">Bulk Free Pass Coupon Generator</h2>
              <p className="text-xs text-admin-text-muted">Generates truly random, unguessable 100% FREE single-use codes. Format: <span className="font-mono text-emerald-400">PREFIX-XXXX-XXXX</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-admin-text-muted mb-1.5">Code Prefix</label>
              <input
                type="text"
                value={genPrefix}
                onChange={e => setGenPrefix(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8))}
                className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-2.5 text-sm font-mono text-admin-text focus:outline-none focus:border-emerald-400 uppercase"
                placeholder="BMFREE"
              />
              <p className="text-[10px] text-admin-text-muted mt-1">e.g. BMFREE → <span className="font-mono">BMFREE-K7NP-Q3RW</span></p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-admin-text-muted mb-1.5">How Many Codes?</label>
              <input
                type="number" min={1} max={100} value={genCount}
                onChange={e => setGenCount(Math.max(1, Math.min(100, Number(e.target.value))))}
                className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-2.5 text-sm text-admin-text focus:outline-none focus:border-emerald-400"
              />
              <p className="text-[10px] text-admin-text-muted mt-1">Max 100 per batch</p>
            </div>
            <button
              onClick={handleGenerateFreeCoupons}
              disabled={generating || genCount < 1}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl text-sm font-bold transition-colors"
            >
              {generating ? <Loader2 size={15} className="animate-spin" /> : <Sparkles size={15} />}
              {generating ? 'Generating...' : `Generate ${genCount} Code${genCount > 1 ? 's' : ''}`}
            </button>
          </div>

          {generatedCodes.length > 0 && (
            <div className="bg-admin-bg border border-emerald-500/30 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-emerald-400">✅ {generatedCodes.length} codes generated & saved!</p>
                <button
                  onClick={() => navigator.clipboard.writeText(generatedCodes.join('\n'))}
                  className="flex items-center gap-1 text-[10px] text-admin-text-muted hover:text-admin-text border border-admin-border rounded-lg px-2 py-1 transition-colors"
                >
                  <Copy size={10} /> Copy All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {generatedCodes.map((c, i) => (
                  <div key={i} className="flex items-center gap-1 font-mono text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-lg">
                    {c}
                    <CopyButton text={c} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* CUSTOM COUPON FORM */}
      {showAddForm && (
        <form onSubmit={handleCreate} className="bg-admin-card border border-[#00B8F0]/30 rounded-2xl p-6 space-y-4 shadow-lg">
          <h3 className="text-base font-bold text-admin-text flex items-center gap-2">
            <Tag size={16} className="text-[#00B8F0]" /> Create Custom Discount Coupon
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-admin-text-muted mb-1.5">Coupon Code *</label>
              <input type="text" required placeholder="e.g. VIP50" value={newCode}
                onChange={e => setNewCode(e.target.value)}
                className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-2 text-sm text-admin-text focus:outline-none focus:border-[#00B8F0] uppercase font-mono" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-admin-text-muted mb-1.5">Discount Type</label>
              <select value={discountType} onChange={e => setDiscountType(e.target.value as any)}
                className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-2 text-sm text-admin-text focus:outline-none focus:border-[#00B8F0]">
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed (₹)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-admin-text-muted mb-1.5">Value</label>
              <input type="number" required min="1" value={discountValue}
                onChange={e => setDiscountValue(Number(e.target.value))}
                className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-2 text-sm text-admin-text focus:outline-none focus:border-[#00B8F0]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-admin-text-muted mb-1.5">Max Uses</label>
              <input type="number" required min="1" value={maxUses}
                onChange={e => setMaxUses(Number(e.target.value))}
                className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-2 text-sm text-admin-text focus:outline-none focus:border-[#00B8F0]" />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={isSubmitting}
              className="bg-[#00B8F0] hover:bg-[#0096C7] text-white px-5 py-2 rounded-xl text-xs font-semibold transition-colors disabled:opacity-50">
              {isSubmitting ? 'Saving...' : 'Save Coupon'}
            </button>
            <button type="button" onClick={() => setShowAddForm(false)}
              className="px-5 py-2 rounded-xl text-xs font-semibold text-admin-text-muted border border-admin-border transition-colors hover:text-admin-text">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* BOTMARTZ10 LIMIT EDITOR */}
      <div className="bg-admin-card border border-admin-border rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20 shrink-0">
              <Tag size={18} />
            </div>
            <div>
              <h3 className="font-mono text-sm font-extrabold text-admin-text tracking-wider">BOTMARTZ10</h3>
              <p className="text-[11px] text-admin-text-muted">10% Discount Coupon — Admin Editable Limit</p>
            </div>
          </div>
          <button
            onClick={() => { setBm10EditMode(!bm10EditMode); if (!bm10EditMode) setBm10Input(bm10Max); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${bm10EditMode ? 'bg-admin-bg border-admin-border text-admin-text-muted' : 'bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20'}`}
          >
            <Edit2 size={12} /> {bm10EditMode ? 'Cancel' : 'Edit Limit'}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-admin-bg p-3 rounded-xl border border-admin-border text-center">
            <p className="text-[10px] text-admin-text-muted mb-1">Used</p>
            <p className="text-2xl font-bold text-blue-400 font-mono">{bm10Used}</p>
          </div>
          <div className="bg-admin-bg p-3 rounded-xl border border-admin-border text-center relative">
            <p className="text-[10px] text-admin-text-muted mb-1">Max Limit</p>
            {bm10EditMode ? (
              <input
                type="number" min={bm10Used + 1} value={bm10Input}
                onChange={e => setBm10Input(Number(e.target.value))}
                className="w-full bg-transparent text-2xl font-bold text-center text-[#00B8F0] font-mono focus:outline-none border-b border-[#00B8F0]"
              />
            ) : (
              <p className="text-2xl font-bold text-admin-text font-mono">{bm10Max}</p>
            )}
          </div>
          <div className="bg-admin-bg p-3 rounded-xl border border-admin-border text-center">
            <p className="text-[10px] text-admin-text-muted mb-1">Remaining</p>
            <p className={`text-2xl font-bold font-mono ${Math.max(0, bm10Max - bm10Used) === 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {Math.max(0, bm10Max - bm10Used)}
            </p>
          </div>
        </div>

        <ProgressBar used={bm10Used} max={bm10Max} color="bg-blue-500" />

        {bm10EditMode && (
          <button
            onClick={handleSaveBm10Limit}
            disabled={bm10Saving || bm10Input <= bm10Used}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-colors disabled:opacity-50"
          >
            {bm10Saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            {bm10Saving ? 'Saving...' : `Set Limit to ${bm10Input}`}
          </button>
        )}
      </div>

      {/* FREE PASS COUPONS TABLE */}
      <div className="bg-admin-card border border-admin-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-admin-border flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-admin-text flex items-center gap-2">
              <Gift size={15} className="text-emerald-400" />
              Free Pass Coupons — 100% OFF (Single Use)
            </h2>
            <p className="text-[11px] text-admin-text-muted mt-0.5">
              {freeCoupons.length} total &nbsp;·&nbsp; <span className="text-emerald-400 font-semibold">{freeAvail} available</span> &nbsp;·&nbsp; <span className="text-rose-400 font-semibold">{freeUsed} redeemed</span>
            </p>
          </div>
        </div>

        {loading ? (
          <div className="p-10 text-center text-admin-text-muted">
            <Loader2 size={22} className="animate-spin mx-auto mb-2 text-[#00B8F0]" />
            <span className="text-xs">Loading coupons...</span>
          </div>
        ) : freeCoupons.length === 0 ? (
          <div className="p-10 text-center text-admin-text-muted">
            <Gift className="mx-auto w-10 h-10 mb-3 opacity-20" />
            <p className="text-sm font-medium">No free coupons yet.</p>
            <p className="text-xs mt-1">Click "Generate Free Coupons" above to create some.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-admin-bg border-b border-admin-border text-[10px] font-mono uppercase text-admin-text-muted tracking-wider">
                <tr>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Used</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3 text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border">
                {freeCoupons.map((c) => {
                  const isRedeemed = c.currentUses >= c.maxUses;
                  return (
                    <tr key={c.id} className={`transition-colors ${isRedeemed ? 'opacity-50 bg-rose-500/5' : 'hover:bg-admin-bg/50'}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center font-mono font-bold text-admin-text text-sm">
                          {c.code}
                          {!isRedeemed && <CopyButton text={c.code} />}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                          isRedeemed
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            : c.isActive
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          {isRedeemed ? <><X size={8} /> Redeemed</> : c.isActive ? <><Check size={8} /> Available</> : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-admin-text">
                        {c.currentUses} / {c.maxUses}
                      </td>
                      <td className="px-4 py-3 text-admin-text-muted">
                        {c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleDelete(c.id, c.code)}
                          disabled={actionLoading === `del-${c.id}`}
                          className="text-rose-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          {actionLoading === `del-${c.id}` ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DISCOUNT & CUSTOM COUPONS TABLE */}
      <div className="bg-admin-card border border-admin-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-admin-border">
          <h2 className="text-sm font-bold text-admin-text flex items-center gap-2">
            <Tag size={15} className="text-[#00B8F0]" /> Discount & Custom Coupons
          </h2>
          <p className="text-[11px] text-admin-text-muted mt-0.5">BOTMARTZ10, WORKSHOP10, custom codes with live usage tracking.</p>
        </div>
        {discountCoupons.length === 0 ? (
          <div className="p-10 text-center text-admin-text-muted">
            <Tag className="mx-auto w-10 h-10 mb-3 opacity-20" />
            <p className="text-sm">No discount coupons found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-admin-bg border-b border-admin-border text-[10px] font-mono uppercase text-admin-text-muted tracking-wider">
                <tr>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Discount</th>
                  <th className="px-4 py-3 min-w-[160px]">Usage</th>
                  <th className="px-4 py-3">Remaining</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border">
                {discountCoupons.map((c) => {
                  const remaining = Math.max(0, c.maxUses - c.currentUses);
                  const isLimitReached = c.currentUses >= c.maxUses;
                  const isSys = c.id.startsWith('sys-');
                  const pct = c.maxUses > 0 ? Math.min(100, Math.round((c.currentUses / c.maxUses) * 100)) : 0;
                  return (
                    <tr key={c.id} className="hover:bg-admin-bg/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center font-mono font-bold text-admin-text text-sm">
                          {c.code}
                          <CopyButton text={c.code} />
                        </div>
                      </td>
                      <td className="px-4 py-3 font-bold text-admin-text">
                        {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}
                      </td>
                      <td className="px-4 py-3 min-w-[160px]">
                        <div className="space-y-1">
                          <span className="font-mono text-admin-text">{c.currentUses} / {c.maxUses}</span>
                          <div className="w-full h-1.5 bg-admin-bg rounded-full border border-admin-border overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${pct >= 100 ? 'bg-rose-500' : pct >= 75 ? 'bg-amber-500' : 'bg-[#00B8F0]'}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono">
                        <span className={`font-bold ${remaining === 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {remaining} left
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleToggleActive(c.id, c.isActive)}
                          disabled={isSys || actionLoading === `toggle-${c.id}`}
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border transition-colors disabled:cursor-default ${
                            isLimitReached
                              ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                              : c.isActive
                                ? 'bg-[#00B8F0]/10 text-[#00B8F0] border-cyan-500/20 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/20'
                                : 'bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-[#00B8F0]/10 hover:text-[#00B8F0] hover:border-cyan-500/20'
                          }`}
                        >
                          {isLimitReached ? 'Limit Reached' : c.isActive ? <><Check size={9} /> Active</> : <><X size={9} /> Inactive</>}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {!isSys && (
                          <button
                            onClick={() => handleDelete(c.id, c.code)}
                            disabled={actionLoading === `del-${c.id}`}
                            className="text-rose-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors disabled:opacity-50"
                          >
                            {actionLoading === `del-${c.id}` ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
