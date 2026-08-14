"use client";

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Calendar, MapPin, Eye } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';

const interTight = { className: "" };

export default function EventsDashboard() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "events"), orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(data);
    } catch (e) {
      console.error("Error fetching events:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      try {
        await deleteDoc(doc(db, "events", id));
        setEvents(events.filter(e => e.id !== id));
      } catch (e) {
        console.error("Error deleting event:", e);
      }
    }
  };

  return (
    <div className={`${interTight.className} p-6 max-w-[1200px] mx-auto space-y-6`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-admin-text">Events Management</h1>
          <p className="text-sm text-admin-text-muted mt-1">Manage all Botmartz community events, meetups, and conferences.</p>
        </div>
        <Link 
          href="/admin/events/new"
          className="bg-admin-accent hover:bg-admin-accent/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> New Event
        </Link>
      </div>

      <div className="bg-admin-card border border-admin-border rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-admin-text-muted">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="p-12 text-center text-admin-text-muted">
            <Calendar className="mx-auto w-12 h-12 mb-4 opacity-20" />
            <p>No events found. Create your first event to get started.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-admin-bg border-b border-admin-border text-xs font-semibold text-admin-text-muted uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Event Name</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border">
              {events.map((evt) => (
                <tr key={evt.id} className="hover:bg-admin-bg/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-admin-text">{evt.title}</div>
                    <div className="text-xs text-admin-text-muted font-mono">{evt.slug}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-admin-text">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-admin-text-muted" />
                      {evt.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-admin-text">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-admin-text-muted" />
                      {evt.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded ${
                      evt.status === 'upcoming' ? 'bg-admin-accent/20 text-admin-accent' : 'bg-admin-border text-admin-text-muted'
                    }`}>
                      {evt.status || 'upcoming'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/community/events/${evt.slug}`} target="_blank" className="p-2 text-admin-text-muted hover:text-white bg-admin-bg hover:bg-admin-border rounded-lg transition-colors">
                        <Eye size={16} />
                      </Link>
                      <Link href={`/admin/events/${evt.id}`} className="p-2 text-admin-text-muted hover:text-white bg-admin-bg hover:bg-admin-border rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </Link>
                      <button onClick={() => handleDelete(evt.id)} className="p-2 text-red-500/70 hover:text-red-500 bg-admin-bg hover:bg-admin-border rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
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
