"use client";

import { useState, useEffect, useCallback } from 'react';
import {
  Plus, Trash2, Tag, Check, X, Sparkles, RefreshCw, Zap,
  Gift, Copy, CheckCheck, Edit2, Save, ChevronDown, Ticket, AlertTriangle, Loader2
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, deleteDoc, updateDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';

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

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="ml-1.5 p-1 rounded text-admin-text-muted hover:text-[#00B8F0] transition-colors" title="Copy code">
      {copied ? <CheckCheck size={12} className="text-emerald-400" /> : <Copy size={12} />}
    </button>
  );
}

export default function CouponsDashboard() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // BOTMARTZ10 limit editor
  const [bm10Limit, setBm10Limit] = useState<number>(50);
  const [bm10EditMode, setBm10EditMode] = useState(false);
  const [bm10Input, setBm10Input] = useState<number>(50);
  const [bm10Used, setBm10Used] = useState<number>(0);
  const [bm10Saving, setBm10Saving] = useState(false);

  // Free coupon generator
  const [genPrefix, setGenPrefix] = useState('BMFREE');
  const [genCount, setGenCount] = useState(5);
  const [generating, setGenerating] = useState(false);
  const [generatedCodes, setGeneratedCodes] = useState<string[]>([]);
  const [showGenPanel, setShowGenPanel] = useState(false);

  // Custom coupon form
  const [showAddForm, setShowAddForm] = useState(false);
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState(10);
  const [maxUses, setMaxUses] = useState(50);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live snapshot from Firestore
  useEffect(() => {
    const q = query(collection(db, 'coupons'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const docs = snap.docs.map(d => {
        const data = d.data();
        return {
          id: d.id,
          code: data.code || '',
          type: data.type || 'custom',
          discountType: data.discountType || 'percentage',
          discountValue: data.discountValue || 0,
          isActive: data.isActive !== false,
          maxUses: data.maxUses || 1,
          currentUses: data.currentUses || 0,
          createdAt: data.createdAt || ''
        };
      });
      setCoupons(docs);

      // Find BOTMARTZ10 to get its maxUses and currentUses
      const bm10 = docs.find(c => c.code === 'BOTMARTZ10');
      if (bm10) {
        setBm10Limit(bm10.maxUses);
        setBm10Input(bm10.maxUses);
        setBm10Used(bm10.currentUses);
      }

      setLoading(false);
    }, () => setLoading(false));
    return () => unsub();
  }, []);

  // Generate unique free coupon codes
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
        const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
        const num = String(Math.floor(Math.random() * 900) + 100);
        code = `${genPrefix.toUpperCase()}-${num}${suffix}`;
        attempts++;
      } while ((existingCodes.has(code) || newCodes.includes(code)) && attempts < 20);
      newCodes.push(code);
    }

    try {
      const batch: Promise<any>[] = newCodes.map(c =>
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
      );
      await Promise.all(batch);
      setGeneratedCodes(newCodes);
    } catch (e) {
      console.error('Error generating coupons:', e);
      alert('Failed to generate coupons. Try again.');
    }
    setGenerating(false);
  };

  // Save new BOTMARTZ10 limit
  const handleSaveBm10Limit = async () => {
    if (bm10Input < 1) return;
    setBm10Saving(true);
    try {
      const existing = coupons.find(c => c.code === 'BOTMARTZ10');
      if (existing && !existing.id.startsWith('sys-')) {
        await updateDoc(doc(db, 'coupons', existing.id), { maxUses: bm10Input });
      } else {
        // Create/upsert BOTMARTZ10 doc in Firestore
        await addDoc(collection(db, 'coupons'), {
          code: 'BOTMARTZ10',
          type: 'discount',
          discountType: 'percentage',
          discountValue: 10,
          isActive: true,
          maxUses: bm10Input,
          currentUses: bm10Used,
          createdAt: new Date().toISOString()
        });
      }
      setBm10Limit(bm10Input);
      setBm10EditMode(false);
    } catch (e) {
      console.error('Failed to save BOTMARTZ10 limit:', e);
      alert('Failed to save. Try again.');
    }
    setBm10Saving(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || discountValue <= 0) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'coupons'), {
        code: code.trim().toUpperCase(),
        type: 'custom',
        discountType,
        discountValue: Number(discountValue),
        isActive: true,
        maxUses: Number(maxUses),
        currentUses: 0,
        createdAt: new Date().toISOString()
      });
      setCode('');
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
    } catch (e) {
      console.error('Error updating status:', e);
    }
    setActionLoading(null);
  };

  const handleDelete = async (id: string, codeName: string) => {
    if (id.startsWith('sys-')) return;
    if (!confirm(`Delete coupon "${codeName}"? This cannot be undone.`)) return;
    setActionLoading(`del-${id}`);
    try {
      await deleteDoc(doc(db, 'coupons', id));
    } catch (e) {
      console.error('Error deleting coupon:', e);
    }
    setActionLoading(null);
  };

  const freeCoupons = coupons.filter(c => c.discountValue === 100 && c.discountType === 'percentage' && c.type === 'free-pass');
  const discountCoupons = coupons.filter(c => !(c.discountValue === 100 && c.discountType === 'percentage' && c.type === 'free-pass'));

  const bm10Doc = coupons.find(c => c.code === 'BOTMARTZ10');
  const bm10Used_ = bm10Doc?.currentUses ?? bm10Used;
  const bm10Max_ = bm10Doc?.maxUses ?? bm10Limit;
  const bm10Progress = bm10Max_ > 0 ? Math.min(100, Math.round((bm10Used_ / bm10Max_) * 100)) : 0;

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
            Generate free pass coupons, edit discount limits, and manage all promo codes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGenPanel(!showGenPanel)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors shadow-sm"
          >
            <Gift size={14} /> Generate Free Coupons
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00B8F0] hover:bg-[#0096C7] text-white text-xs font-semibold transition-colors shadow-sm"
          >
            <Plus size={14} /> Custom Coupon
          </button>
        </div>
      </div>

      {/* FREE COUPON GENERATOR PANEL */}
      {showGenPanel && (
        <div className="bg-admin-card border border-emerald-500/30 rounded-2xl p-6 shadow-lg space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Gift size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-admin-text">Bulk Free Pass Coupon Generator</h2>
              <p className="text-xs text-admin-text-muted">Generate unique 100% FREE single-use coupon codes instantly.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-admin-text-muted mb-1.5">Code Prefix</label>
              <input
                type="text"
                value={genPrefix}
                onChange={e => setGenPrefix(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10))}
                className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-2.5 text-sm font-mono text-admin-text focus:outline-none focus:border-emerald-400 uppercase"
                placeholder="BMFREE"
              />
              <p className="text-[10px] text-admin-text-muted mt-1">e.g. BMFREE, PASS, VIP</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-admin-text-muted mb-1.5">Number of Codes to Generate</label>
              <input
                type="number"
                min={1}
                max={100}
                value={genCount}
                onChange={e => setGenCount(Math.max(1, Math.min(100, Number(e.target.value))))}
                className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-2.5 text-sm text-admin-text focus:outline-none focus:border-emerald-400"
              />
              <p className="text-[10px] text-admin-text-muted mt-1">Max 100 codes at once</p>
            </div>
            <div className="flex flex-col justify-end">
              <button
                onClick={handleGenerateFreeCoupons}
                disabled={generating || genCount < 1}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl text-sm font-bold transition-colors"
              >
                {generating ? <Loader2 size={15} className="animate-spin" /> : <Sparkles size={15} />}
                {generating ? 'Generating...' : `Generate ${genCount} Code${genCount > 1 ? 's' : ''}`}
              </button>
            </div>
          </div>

          {generatedCodes.length > 0 && (
            <div className="bg-admin-bg border border-admin-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-emerald-400">✅ {generatedCodes.length} codes generated & saved to database!</p>
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
          <h3 className="text-base font-bold text-admin-text flex items-center gap-2"><Tag size={16} className="text-[#00B8F0]" /> Create Custom Coupon</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-admin-text-muted mb-1.5">Coupon Code *</label>
              <input type="text" required placeholder="e.g. VIP50" value={code} onChange={e => setCode(e.target.value)}
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
              <label className="block text-xs font-semibold text-admin-text-muted mb-1.5">Discount Value</label>
              <input type="number" required min="1" value={discountValue} onChange={e => setDiscountValue(Number(e.target.value))}
                className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-2 text-sm text-admin-text focus:outline-none focus:border-[#00B8F0]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-admin-text-muted mb-1.5">Max Uses</label>
              <input type="number" required min="1" value={maxUses} onChange={e => setMaxUses(Number(e.target.value))}
                className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-2 text-sm text-admin-text focus:outline-none focus:border-[#00B8F0]" />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={isSubmitting}
              className="bg-[#00B8F0] hover:bg-[#0096C7] text-white px-5 py-2 rounded-xl text-xs font-semibold transition-colors disabled:opacity-50">
              {isSubmitting ? 'Saving...' : 'Save Coupon'}
            </button>
            <button type="button" onClick={() => setShowAddForm(false)}
              className="px-5 py-2 rounded-xl text-xs font-semibold text-admin-text-muted hover:text-admin-text border border-admin-border transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* BOTMARTZ10 LIMIT EDITOR */}
      <div className="bg-admin-card border border-admin-border rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Zap size={18} />
            </div>
            <div>
              <h3 className="font-mono text-sm font-extrabold text-admin-text tracking-wider">BOTMARTZ10</h3>
              <p className="text-[11px] text-admin-text-muted">10% Discount Coupon — Editable Limit</p>
            </div>
          </div>
          <button
            onClick={() => { setBm10EditMode(!bm10EditMode); setBm10Input(bm10Max_); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${bm10EditMode ? 'bg-admin-bg border-admin-border text-admin-text-muted' : 'bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20'}`}
          >
            <Edit2 size={12} /> {bm10EditMode ? 'Cancel' : 'Edit Limit'}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-admin-bg p-3 rounded-xl border border-admin-border">
            <p className="text-[10px] text-admin-text-muted mb-0.5">Used</p>
            <p className="text-xl font-bold text-blue-400 font-mono">{bm10Used_}</p>
          </div>
          <div className="bg-admin-bg p-3 rounded-xl border border-admin-border">
            <p className="text-[10px] text-admin-text-muted mb-0.5">Max Limit</p>
            {bm10EditMode ? (
              <input
                type="number"
                min={bm10Used_ + 1}
                value={bm10Input}
                onChange={e => setBm10Input(Number(e.target.value))}
                className="w-full bg-transparent text-xl font-bold text-admin-text font-mono focus:outline-none border-b border-[#00B8F0]"
              />
            ) : (
              <p className="text-xl font-bold text-admin-text font-mono">{bm10Max_}</p>
            )}
          </div>
          <div className="bg-admin-bg p-3 rounded-xl border border-admin-border">
            <p className="text-[10px] text-admin-text-muted mb-0.5">Remaining</p>
            <p className={`text-xl font-bold font-mono ${Math.max(0, bm10Max_ - bm10Used_) === 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {Math.max(0, bm10Max_ - bm10Used_)}
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] text-admin-text-muted font-medium">
            <span>Usage Progress</span>
            <span>{bm10Progress}%</span>
          </div>
          <div className="w-full h-2 bg-admin-bg rounded-full border border-admin-border overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${bm10Progress}%` }} />
          </div>
        </div>

        {bm10EditMode && (
          <button onClick={handleSaveBm10Limit} disabled={bm10Saving || bm10Input <= bm10Used_}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-colors disabled:opacity-50">
            {bm10Saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            {bm10Saving ? 'Saving...' : 'Save New Limit'}
          </button>
        )}
      </div>

      {/* FREE PASS COUPONS TABLE */}
      <div className="bg-admin-card border border-admin-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-admin-border flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-admin-text flex items-center gap-2">
              <Gift size={15} className="text-emerald-400" /> Free Pass Coupons (100% OFF — Single Use)
            </h2>
            <p className="text-[11px] text-admin-text-muted mt-0.5">{freeCoupons.length} codes in database</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {freeCoupons.filter(c => c.currentUses === 0).length} Available
          </span>
        </div>

        {loading ? (
          <div className="p-10 text-center text-admin-text-muted"><Loader2 size={20} className="animate-spin mx-auto mb-2 text-[#00B8F0]" /><span className="text-xs">Loading...</span></div>
        ) : freeCoupons.length === 0 ? (
          <div className="p-10 text-center text-admin-text-muted">
            <Gift className="mx-auto w-10 h-10 mb-3 opacity-20" />
            <p className="text-sm">No free coupons yet. Generate some above!</p>
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
                  const isUsed = c.currentUses >= c.maxUses;
                  return (
                    <tr key={c.id} className={`transition-colors ${isUsed ? 'opacity-50' : 'hover:bg-admin-bg/50'}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center font-mono font-bold text-admin-text text-sm">
                          {c.code}
                          <CopyButton text={c.code} />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-full border ${isUsed ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : c.isActive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                          {isUsed ? <><X size={8} /> Used</> : c.isActive ? <><Check size={8} /> Available</> : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-admin-text">{c.currentUses} / {c.maxUses}</td>
                      <td className="px-4 py-3 text-admin-text-muted">{c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : '—'}</td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => handleDelete(c.id, c.code)} disabled={actionLoading === `del-${c.id}`}
                          className="text-rose-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors disabled:opacity-50" title="Delete">
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
          <h2 className="text-sm font-bold text-admin-text flex items-center gap-2"><Tag size={15} className="text-[#00B8F0]" /> Discount & Custom Coupons</h2>
          <p className="text-[11px] text-admin-text-muted mt-0.5">All non-free promo codes with live usage tracking.</p>
        </div>
        {loading ? (
          <div className="p-10 text-center text-admin-text-muted text-xs">Loading...</div>
        ) : discountCoupons.length === 0 ? (
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
                  <th className="px-4 py-3">Used</th>
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
                      <td className="px-4 py-3 font-mono text-admin-text">{c.currentUses} / {c.maxUses}</td>
                      <td className="px-4 py-3 font-mono">
                        <span className={`font-bold ${remaining === 0 ? 'text-rose-400' : 'text-emerald-400'}`}>{remaining} Left</span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => handleToggleActive(c.id, c.isActive)} disabled={isSys || actionLoading === `toggle-${c.id}`}
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border transition-colors disabled:cursor-default ${isLimitReached ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : c.isActive ? 'bg-[#00B8F0]/10 text-[#00B8F0] border-cyan-500/20 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-[#00B8F0]/10 hover:text-[#00B8F0] hover:border-cyan-500/20'}`}>
                          {isLimitReached ? 'Limit Reached' : c.isActive ? <><Check size={9} /> Active</> : <><X size={9} /> Inactive</>}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {!isSys && (
                          <button onClick={() => handleDelete(c.id, c.code)} disabled={actionLoading === `del-${c.id}`}
                            className="text-rose-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors disabled:opacity-50">
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
