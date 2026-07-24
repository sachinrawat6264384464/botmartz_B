"use client";

import { useState, useEffect } from 'react';
import { Inter_Tight } from 'next/font/google';
import { Plus, Trash2, Tag, Check, X, CreditCard } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, query, orderBy } from 'firebase/firestore';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

interface Coupon {
  id: string;
  code: string;
  type: 'influencer' | 'early-bird';
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  isActive: boolean;
  maxUses: number;
  currentUses: number;
}

export default function CouponsDashboard() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [code, setCode] = useState('');
  const [type, setType] = useState<'influencer' | 'early-bird'>('influencer');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('fixed');
  const [discountValue, setDiscountValue] = useState(0);
  const [maxUses, setMaxUses] = useState(100);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "coupons"), orderBy("code", "asc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Coupon));
      setCoupons(data);
    } catch (e) {
      console.error("Error fetching coupons:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCoupons();
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
      };

      await addDoc(collection(db, "coupons"), couponData);
      
      // Reset form
      setCode('');
      setDiscountValue(0);
      setMaxUses(100);
      setShowAddForm(false);
      
      fetchCoupons();
    } catch (e) {
      console.error("Error creating coupon:", e);
    }
    setIsSubmitting(false);
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, "coupons", id), {
        isActive: !currentStatus
      });
      setCoupons(coupons.map(c => c.id === id ? { ...c, isActive: !currentStatus } : c));
    } catch (e) {
      console.error("Error updating status:", e);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this coupon? This action cannot be undone.")) {
      try {
        await deleteDoc(doc(db, "coupons", id));
        setCoupons(coupons.filter(c => c.id !== id));
      } catch (e) {
        console.error("Error deleting coupon:", e);
      }
    }
  };

  return (
    <div className={`${interTight.className} p-6 max-w-[1200px] mx-auto space-y-6`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-admin-text">Coupon Management</h1>
          <p className="text-sm text-admin-text-muted mt-1">Generate and manage promotional coupons for Influencers and Early Birds.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-admin-accent hover:bg-admin-accent/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 max-w-fit"
        >
          <Plus size={16} /> {showAddForm ? 'Close Form' : 'New Coupon'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleCreate} className="bg-admin-card border border-admin-border p-6 rounded-xl space-y-4 max-w-xl">
          <h3 className="text-lg font-bold text-admin-text">Create New Coupon</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-admin-text-muted mb-1">Coupon Code</label>
              <input
                type="text"
                required
                placeholder="e.g. INFLUENCER20"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-admin-bg border border-admin-border rounded-lg px-3 py-2 text-sm text-admin-text focus:outline-none focus:border-admin-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-admin-text-muted mb-1">Coupon Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full bg-admin-bg border border-admin-border rounded-lg px-3 py-2 text-sm text-admin-text focus:outline-none focus:border-admin-accent"
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
                className="w-full bg-admin-bg border border-admin-border rounded-lg px-3 py-2 text-sm text-admin-text focus:outline-none focus:border-admin-accent"
              >
                <option value="fixed">Fixed (INR)</option>
                <option value="percentage">Percentage (%)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-admin-text-muted mb-1">Discount Value</label>
              <input
                type="number"
                required
                min="0"
                value={discountValue}
                onChange={(e) => setDiscountValue(Number(e.target.value))}
                className="w-full bg-admin-bg border border-admin-border rounded-lg px-3 py-2 text-sm text-admin-text focus:outline-none focus:border-admin-accent"
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
                className="w-full bg-admin-bg border border-admin-border rounded-lg px-3 py-2 text-sm text-admin-text focus:outline-none focus:border-admin-accent"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-admin-accent hover:bg-admin-accent/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Coupon'}
          </button>
        </form>
      )}

      <div className="bg-admin-card border border-admin-border rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-admin-text-muted">Loading coupons...</div>
        ) : coupons.length === 0 ? (
          <div className="p-12 text-center text-admin-text-muted">
            <Tag className="mx-auto w-12 h-12 mb-4 opacity-20" />
            <p>No coupons found. Generate one above.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-admin-bg border-b border-admin-border text-xs font-semibold text-admin-text-muted uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Code</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Discount</th>
                <th className="px-6 py-4">Usage</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-admin-bg/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-mono font-bold text-admin-text">{c.code}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-admin-text capitalize">
                    {c.type === 'early-bird' ? 'Early Bird' : 'Influencer'}
                  </td>
                  <td className="px-6 py-4 text-sm text-admin-text font-semibold">
                    {c.discountType === 'percentage' ? `${c.discountValue}%` : `₹${c.discountValue}`}
                  </td>
                  <td className="px-6 py-4 text-sm text-admin-text">
                    {c.currentUses} / {c.maxUses}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleActive(c.id, c.isActive)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition-colors ${
                        c.isActive 
                          ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20' 
                          : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                      }`}
                    >
                      {c.isActive ? (
                        <>
                          <Check size={10} /> Active
                        </>
                      ) : (
                        <>
                          <X size={10} /> Inactive
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-500/10 transition-colors"
                      title="Delete Coupon"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
