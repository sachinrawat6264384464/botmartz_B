"use client";

import { useState, useEffect } from 'react';
import { Inter_Tight } from 'next/font/google';
import { Plus, Trash2, Tag, Check, X, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

interface Coupon {
  id: string;
  code: string;
  type?: 'influencer' | 'early-bird';
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  isActive: boolean;
  maxUses: number;
  currentUses: number;
}

export default function CouponsDashboard() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [systemStats, setSystemStats] = useState<{
    EARLY15: { used: number; max: number; remaining: number };
    INFLUENCER20: { used: number; max: number; remaining: number };
  }>({
    EARLY15: { used: 0, max: 50, remaining: 50 },
    INFLUENCER20: { used: 0, max: 50, remaining: 50 },
  });

  // Form State
  const [code, setCode] = useState('');
  const [type, setType] = useState<'influencer' | 'early-bird'>('influencer');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('fixed');
  const [discountValue, setDiscountValue] = useState(0);
  const [maxUses, setMaxUses] = useState(50);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchCouponsAndStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/coupons');
      if (res.ok) {
        const data = await res.json();
        if (data.systemStats) setSystemStats(data.systemStats);
        if (data.coupons) setCoupons(data.coupons);
      }
    } catch (e) {
      console.error("Error fetching coupons:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCouponsAndStats();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || discountValue <= 0) return;
    
    setIsSubmitting(true);
    try {
      const couponData = {
        code: code.trim().toUpperCase(),
        type,
        discountType,
        discountValue: Number(discountValue),
        isActive: true,
        maxUses: Number(maxUses),
        currentUses: 0,
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, "coupons"), couponData);
      
      // Reset form
      setCode('');
      setDiscountValue(0);
      setMaxUses(50);
      setShowAddForm(false);
      
      fetchCouponsAndStats();
    } catch (e) {
      console.error("Error creating coupon:", e);
    }
    setIsSubmitting(false);
  };

  const handleToggleActive = async (id: string, codeName: string, currentStatus: boolean) => {
    try {
      if (!id.startsWith('sys-')) {
        await updateDoc(doc(db, "coupons", id), {
          isActive: !currentStatus
        });
      }
      setCoupons(coupons.map(c => c.id === id ? { ...c, isActive: !currentStatus } : c));
    } catch (e) {
      console.error("Error updating status:", e);
    }
  };

  const handleDelete = async (id: string, codeName: string) => {
    if (confirm(`Are you sure you want to delete coupon "${codeName}"?`)) {
      try {
        if (!id.startsWith('sys-')) {
          await deleteDoc(doc(db, "coupons", id));
        }
        setCoupons(coupons.filter(c => c.id !== id));
      } catch (e) {
        console.error("Error deleting coupon:", e);
      }
    }
  };

  return (
    <div className={`${interTight.className} p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6`}>
      
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-admin-border pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-space-grotesk tracking-tight text-admin-text">
            Coupon Management & Live Usage Tracker
          </h1>
          <p className="text-xs sm:text-sm text-admin-text-muted">
            Track real-time usages and remaining quota for EARLY15 and INFLUENCER20 promo codes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchCouponsAndStats}
            disabled={loading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-admin-card border border-admin-border text-admin-text-muted hover:text-admin-text transition-colors text-xs font-semibold"
          >
            <RefreshCw size={14} className={loading ? "animate-spin text-[#00B8F0]" : ""} />
            <span>Refresh Stats</span>
          </button>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-[#00B8F0] hover:bg-[#0096C7] text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Plus size={15} /> {showAddForm ? 'Close Form' : 'New Custom Coupon'}
          </button>
        </div>
      </div>

      {/* SYSTEM COUPONS LIVE STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* EARLY15 CARD */}
        <div className="bg-admin-card border border-admin-border rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold border border-emerald-500/20 shrink-0">
                <Zap size={20} />
              </div>
              <div>
                <h3 className="font-mono text-base font-extrabold text-admin-text tracking-wider flex items-center gap-2">
                  EARLY15
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 font-sans">
                    15% OFF
                  </span>
                </h3>
                <p className="text-xs text-admin-text-muted">Early Bird Event Discount Code</p>
              </div>
            </div>

            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
              systemStats.EARLY15.used >= 50 
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            }`}>
              {systemStats.EARLY15.used >= 50 ? '● Limit Reached' : '● Active'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-admin-bg p-3 rounded-xl border border-admin-border">
              <p className="text-[11px] text-admin-text-muted">Total Used</p>
              <p className="text-xl font-bold text-emerald-400 font-mono">
                {systemStats.EARLY15.used} <span className="text-xs text-admin-text-muted font-sans">/ 50</span>
              </p>
            </div>
            <div className="bg-admin-bg p-3 rounded-xl border border-admin-border">
              <p className="text-[11px] text-admin-text-muted">Remaining Quota</p>
              <p className="text-xl font-bold text-admin-text font-mono">
                {systemStats.EARLY15.remaining} <span className="text-xs text-admin-text-muted font-sans">Left</span>
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-[11px] font-medium text-admin-text-muted">
              <span>Usage Progress</span>
              <span>{Math.round((systemStats.EARLY15.used / 50) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-admin-bg rounded-full overflow-hidden border border-admin-border">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(100, (systemStats.EARLY15.used / 50) * 100)}%` }} 
              />
            </div>
          </div>
        </div>

        {/* INFLUENCER20 CARD */}
        <div className="bg-admin-card border border-admin-border rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-[#00B8F0] flex items-center justify-center font-bold border border-cyan-500/20 shrink-0">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-mono text-base font-extrabold text-admin-text tracking-wider flex items-center gap-2">
                  INFLUENCER20
                  <span className="text-[10px] font-bold text-[#00B8F0] bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20 font-sans">
                    20% OFF
                  </span>
                </h3>
                <p className="text-xs text-admin-text-muted">Influencer / Creator Special Promo Code</p>
              </div>
            </div>

            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
              systemStats.INFLUENCER20.used >= 50 
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
                : 'bg-cyan-500/10 text-[#00B8F0] border-cyan-500/20'
            }`}>
              {systemStats.INFLUENCER20.used >= 50 ? '● Limit Reached' : '● Active'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-admin-bg p-3 rounded-xl border border-admin-border">
              <p className="text-[11px] text-admin-text-muted">Total Used</p>
              <p className="text-xl font-bold text-[#00B8F0] font-mono">
                {systemStats.INFLUENCER20.used} <span className="text-xs text-admin-text-muted font-sans">/ 50</span>
              </p>
            </div>
            <div className="bg-admin-bg p-3 rounded-xl border border-admin-border">
              <p className="text-[11px] text-admin-text-muted">Remaining Quota</p>
              <p className="text-xl font-bold text-admin-text font-mono">
                {systemStats.INFLUENCER20.remaining} <span className="text-xs text-admin-text-muted font-sans">Left</span>
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-[11px] font-medium text-admin-text-muted">
              <span>Usage Progress</span>
              <span>{Math.round((systemStats.INFLUENCER20.used / 50) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-admin-bg rounded-full overflow-hidden border border-admin-border">
              <div 
                className="h-full bg-[#00B8F0] rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(100, (systemStats.INFLUENCER20.used / 50) * 100)}%` }} 
              />
            </div>
          </div>
        </div>

      </div>

      {showAddForm && (
        <form onSubmit={handleCreate} className="bg-admin-card border border-admin-border p-6 rounded-2xl space-y-4 max-w-xl shadow-lg">
          <h3 className="text-lg font-bold text-admin-text">Create Additional Custom Coupon</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-admin-text-muted mb-1">Coupon Code</label>
              <input
                type="text"
                required
                placeholder="e.g. VIP50"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-2 text-sm text-admin-text focus:outline-none focus:border-[#00B8F0] uppercase font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-admin-text-muted mb-1">Coupon Category</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-2 text-sm text-admin-text focus:outline-none focus:border-[#00B8F0]"
              >
                <option value="influencer">Influencer</option>
                <option value="early-bird">Early Bird</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-admin-text-muted mb-1">Discount Type</label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as any)}
                className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-2 text-sm text-admin-text focus:outline-none focus:border-[#00B8F0]"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed (INR)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-admin-text-muted mb-1">Discount Value</label>
              <input
                type="number"
                required
                min="1"
                value={discountValue}
                onChange={(e) => setDiscountValue(Number(e.target.value))}
                className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-2 text-sm text-admin-text focus:outline-none focus:border-[#00B8F0]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-admin-text-muted mb-1">Max Uses</label>
              <input
                type="number"
                required
                min="1"
                value={maxUses}
                onChange={(e) => setMaxUses(Number(e.target.value))}
                className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-2 text-sm text-admin-text focus:outline-none focus:border-[#00B8F0]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#00B8F0] hover:bg-[#0096C7] text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors w-full disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Save Custom Coupon'}
          </button>
        </form>
      )}

      {/* ALL COUPONS TABLE */}
      <div className="bg-admin-card border border-admin-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-admin-border">
          <h2 className="text-base font-bold text-admin-text">All Promo Coupons Breakdown</h2>
          <p className="text-xs text-admin-text-muted">Live view of active coupon codes, total usages, and remaining availability.</p>
        </div>

        {loading ? (
          <div className="p-12 text-center text-admin-text-muted">Loading coupons data...</div>
        ) : coupons.length === 0 ? (
          <div className="p-12 text-center text-admin-text-muted">
            <Tag className="mx-auto w-12 h-12 mb-4 opacity-20" />
            <p>No coupons found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-admin-bg border-b border-admin-border text-[10px] font-mono uppercase text-admin-text-muted tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Code</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Discount</th>
                  <th className="px-5 py-3.5">Used Count</th>
                  <th className="px-5 py-3.5">Remaining</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border">
                {coupons.map((c) => {
                  const remaining = Math.max(0, c.maxUses - c.currentUses);
                  const isLimitReached = c.currentUses >= c.maxUses;
                  const isSys = c.id.startsWith('sys-');

                  return (
                    <tr key={c.id} className="hover:bg-admin-bg/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="font-mono font-bold text-admin-text text-sm">
                          {c.code}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-admin-text capitalize font-medium">
                        {c.type === 'early-bird' ? 'Early Bird' : 'Influencer'}
                      </td>
                      <td className="px-5 py-3.5 text-admin-text font-bold">
                        {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}
                      </td>
                      <td className="px-5 py-3.5 text-admin-text font-mono font-semibold">
                        {c.currentUses} / {c.maxUses}
                      </td>
                      <td className="px-5 py-3.5 font-mono">
                        <span className={`font-bold ${remaining === 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {remaining} Left
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <button
                          onClick={() => handleToggleActive(c.id, c.code, c.isActive)}
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border transition-colors ${
                            isLimitReached
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                              : c.isActive 
                                ? 'bg-[#00B8F0]/10 text-[#00B8F0] border-cyan-500/20' 
                                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          }`}
                        >
                          {isLimitReached ? (
                            <>Limit Reached</>
                          ) : c.isActive ? (
                            <><Check size={10} /> Active</>
                          ) : (
                            <><X size={10} /> Inactive</>
                          )}
                        </button>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => handleDelete(c.id, c.code)}
                          className="text-rose-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                          title="Delete Coupon"
                        >
                          <Trash2 size={14} />
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
    </div>
  );
}
