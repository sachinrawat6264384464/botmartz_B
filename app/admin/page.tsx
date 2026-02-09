"use client";
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Mail, TrendingUp, Clock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Inter_Tight } from 'next/font/google';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

interface Stats {
  total: number;
  unread: number;
  today: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ total: 0, unread: 0, today: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const contactsRef = collection(db, 'contacts');
        
        const allContacts = await getDocs(contactsRef);
        const total = allContacts.size;
        
        const unreadQuery = query(contactsRef, where('status', '==', 'unread'));
        const unreadDocs = await getDocs(unreadQuery);
        const unread = unreadDocs.size;
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayQuery = query(contactsRef, where('createdAt', '>=', today));
        const todayDocs = await getDocs(todayQuery);
        const todayCount = todayDocs.size;
        
        setStats({ total, unread, today: todayCount });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { 
      label: 'Total Messages', 
      value: stats.total, 
      icon: Mail, 
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      label: 'Unread Messages', 
      value: stats.unread, 
      icon: TrendingUp, 
      color: 'bg-red-500',
      lightColor: 'bg-red-50',
      textColor: 'text-red-600'
    },
    { 
      label: 'Today', 
      value: stats.today, 
      icon: Clock, 
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
  ];

  if (loading) {
    return (
      <div className={`${interTight.className} p-8`}>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className={`${interTight.className} p-8`}>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Monitor your customer inquiries and engagement metrics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.lightColor} p-3 rounded-xl`}>
                  <Icon size={24} className={stat.textColor} />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  +12%
                </span>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.label}
                </p>
                <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/contacts"
            className="group flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-black hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-lg border border-gray-200 group-hover:border-black transition-colors">
                <Mail size={20} className="text-gray-700" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">View All Messages</p>
                <p className="text-sm text-gray-500">Check and respond to inquiries</p>
              </div>
            </div>
            <ArrowUpRight size={20} className="text-gray-400 group-hover:text-black transition-colors" />
          </Link>

          <div className="group flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-black hover:shadow-md transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-lg border border-gray-200 group-hover:border-black transition-colors">
                <TrendingUp size={20} className="text-gray-700" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Export Reports</p>
                <p className="text-sm text-gray-500">Download CSV or PDF</p>
              </div>
            </div>
            <ArrowUpRight size={20} className="text-gray-400 group-hover:text-black transition-colors" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New message received</p>
                <p className="text-xs text-gray-500">{i} hour{i > 1 ? 's' : ''} ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}