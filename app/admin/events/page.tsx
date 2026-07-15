"use client";

import { useState } from 'react';
import { Inter_Tight } from 'next/font/google';
import { 
  Users, UserCheck, Mic, Award, ArrowUpRight, ArrowDownRight, 
  Calendar, MoreVertical, Search, Filter, Plus
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

// Mock Data
const registrationsOverTime = [
  { name: 'May 1', value: 10 },
  { name: 'May 5', value: 50 },
  { name: 'May 10', value: 120 },
  { name: 'May 15', value: 250 },
  { name: 'May 20', value: 400 },
  { name: 'May 25', value: 500 },
];

const registrationsByType = [
  { name: 'Full Pass', value: 250, color: '#3b82f6' },
  { name: 'Student', value: 150, color: '#00B8F0' },
  { name: 'Workshop', value: 70, color: '#eab308' },
  { name: 'VIP', value: 30, color: '#22c55e' },
];

const RECENT_REGISTRATIONS = [
  { id: 1, name: 'Sagar Kumar', type: 'Full Pass', date: 'May 25, 2025' },
  { id: 2, title: 'Aditi Patel', type: 'Student', date: 'May 25, 2025' },
  { id: 3, title: 'Kunal Varma', type: 'Workshop', date: 'May 24, 2025' },
  { id: 4, title: 'Neha Gupta', type: 'Full Pass', date: 'May 24, 2025' },
];

const TOP_SESSIONS = [
  { id: 1, title: 'Building Scalable AI Systems', attendees: 240 },
  { id: 2, title: 'RAG in Production', attendees: 180 },
  { id: 3, title: 'AI Agents Deep Dive', attendees: 150 },
  { id: 4, title: 'LLM Evaluation', attendees: 120 },
];

export default function EventsDashboard() {
  return (
    <div className={`${interTight.className} p-6 max-w-[1600px] mx-auto space-y-6`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-admin-text">Event Dashboard</h1>
          <p className="text-sm text-admin-text-muted mt-1">Overview of the upcoming AI Frontier 2025 event.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-admin-card border border-admin-border px-4 py-2 rounded-lg text-sm text-admin-text-muted font-medium">
            <Calendar size={14} />
            <span>May 24 - May 25, 2025</span>
          </div>
          <button className="bg-admin-accent hover:bg-admin-accent/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Plus size={16} /> New Event
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Registrations" value="500+" trend="+15.8%" isPositive={true} icon={Users} />
        <MetricCard title="Attendees (Checked In)" value="420" trend="+12.4%" isPositive={true} icon={UserCheck} />
        <MetricCard title="Speakers" value="40" trend="+10.0%" isPositive={true} icon={Mic} />
        <MetricCard title="Sponsors" value="15" trend="+7.3%" isPositive={true} icon={Award} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Line Chart */}
        <div className="lg:col-span-2 bg-admin-card border border-admin-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-admin-text">Registrations Over Time</h2>
            <button className="text-admin-text-muted hover:text-admin-text"><MoreVertical size={16} /></button>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={registrationsOverTime} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-admin-border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--color-admin-text-muted)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--color-admin-text-muted)' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-admin-bg)', borderColor: 'var(--color-admin-border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--color-admin-text)' }}
                />
                <Line type="monotone" dataKey="value" stroke="var(--color-admin-accent)" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: 'var(--color-admin-accent)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="lg:col-span-1 bg-admin-card border border-admin-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-admin-text">Registrations by Type</h2>
            <button className="text-admin-text-muted hover:text-admin-text"><MoreVertical size={16} /></button>
          </div>
          <div className="flex flex-col items-center justify-center h-[250px]">
            <div className="w-[140px] h-[140px] relative mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={registrationsByType} innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
                    {registrationsByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-admin-text">500</span>
                <span className="text-[10px] text-admin-text-muted uppercase tracking-widest">Total</span>
              </div>
            </div>
            <div className="w-full space-y-2">
              {registrationsByType.map((d) => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-xs text-admin-text-muted">{d.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-admin-text">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Registrations */}
        <div className="bg-admin-card border border-admin-border rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-admin-border flex items-center justify-between">
            <h2 className="text-sm font-semibold text-admin-text">Recent Registrations</h2>
            <button className="text-xs text-admin-accent hover:underline">View all</button>
          </div>
          <div className="divide-y divide-admin-border">
            {RECENT_REGISTRATIONS.map((reg, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-admin-bg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-admin-bg flex items-center justify-center text-xs font-bold text-admin-text border border-admin-border">
                    {(reg.name || reg.title || 'U').charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-admin-text">{reg.name || reg.title}</p>
                    <p className="text-xs text-admin-text-muted mt-0.5">{reg.type}</p>
                  </div>
                </div>
                <span className="text-xs text-admin-text-muted">{reg.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Sessions */}
        <div className="bg-admin-card border border-admin-border rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-admin-border flex items-center justify-between">
            <h2 className="text-sm font-semibold text-admin-text">Top Sessions</h2>
            <button className="text-xs text-admin-accent hover:underline">View all</button>
          </div>
          <div className="divide-y divide-admin-border">
            {TOP_SESSIONS.map((session, i) => (
              <div key={session.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-admin-bg transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-admin-text-muted w-4">{i + 1}</span>
                  <p className="text-sm font-medium text-admin-text">{session.title}</p>
                </div>
                <span className="text-xs font-semibold text-admin-text">{session.attendees} <span className="font-normal text-admin-text-muted">attending</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, isPositive, icon: Icon }: { title: string, value: string, trend: string, isPositive: boolean, icon: any }) {
  return (
    <div className="bg-admin-card border border-admin-border rounded-xl p-5 shadow-sm flex flex-col justify-between">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-admin-text-muted">{title}</h3>
        <Icon size={16} className="text-admin-text-muted" />
      </div>
      <div>
        <p className="text-2xl font-bold text-admin-text tracking-tight">{value}</p>
        <div className="flex items-center gap-1.5 mt-2">
          <span className={`flex items-center text-[11px] font-bold px-1.5 py-0.5 rounded ${isPositive ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'}`}>
            {isPositive ? <ArrowUpRight size={12} className="mr-0.5" /> : <ArrowDownRight size={12} className="mr-0.5" />}
            {trend}
          </span>
          <span className="text-[11px] text-admin-text-muted">vs last month</span>
        </div>
      </div>
    </div>
  );
}
