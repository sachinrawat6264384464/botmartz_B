"use client";
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { Mail, MailOpen, Trash2, Clock } from 'lucide-react';
import { Inter_Tight } from 'next/font/google';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600'] });

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: any;
  status: 'read' | 'unread';
}

export default function ContactsList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    const contactsRef = collection(db, 'contacts');
    const q = query(contactsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const contactsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Contact[];
      
      setContacts(contactsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const markAsRead = async (contactId: string) => {
    const contactRef = doc(db, 'contacts', contactId);
    await updateDoc(contactRef, { status: 'read' });
  };

  const deleteContact = async (contactId: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      // Implement delete functionality
      console.log('Delete:', contactId);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    if (filter === 'all') return true;
    return contact.status === filter;
  });

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Just now';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={interTight.className}>
      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {(['all', 'unread', 'read'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filter === tab
                ? 'bg-white text-black'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab === 'unread' && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {contacts.filter((c) => c.status === 'unread').length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Messages List */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
        {filteredContacts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Mail size={48} className="mx-auto mb-4 opacity-50" />
            <p>No messages found</p>
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-6 hover:bg-white/5 transition-all duration-200 cursor-pointer ${
                  contact.status === 'unread' ? 'bg-white/[0.02]' : ''
                }`}
                onClick={() => {
                  setSelectedContact(contact);
                  if (contact.status === 'unread') {
                    markAsRead(contact.id);
                  }
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center ${
                    contact.status === 'unread' ? 'ring-2 ring-white/30' : ''
                  }`}>
                    {contact.status === 'unread' ? (
                      <Mail size={20} className="text-white" />
                    ) : (
                      <MailOpen size={20} className="text-gray-500" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={`font-semibold ${contact.status === 'unread' ? 'text-white' : 'text-gray-400'}`}>
                          {contact.name}
                        </h3>
                        <p className="text-sm text-gray-500">{contact.email}</p>
                      </div>
                      <div className="flex items-center gap-4 ml-4">
                        <span className="text-xs text-gray-600 flex items-center gap-1">
                          <Clock size={12} />
                          {formatDate(contact.createdAt)}
                        </span>
                        {contact.status === 'unread' && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2">{contact.message}</p>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteContact(contact.id);
                    }}
                    className="flex-shrink-0 p-2 hover:bg-red-500/10 rounded-lg transition-colors group"
                  >
                    <Trash2 size={16} className="text-gray-600 group-hover:text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedContact && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedContact(null)}
        >
          <div
            className="bg-black/90 border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">{selectedContact.name}</h2>
              <a href={`mailto:${selectedContact.email}`} className="text-blue-400 hover:underline">
                {selectedContact.email}
              </a>
              <p className="text-sm text-gray-500 mt-2">
                {formatDate(selectedContact.createdAt)}
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Message</h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {selectedContact.message}
              </p>
            </div>

            <button
              onClick={() => setSelectedContact(null)}
              className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}