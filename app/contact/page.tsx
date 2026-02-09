"use client";
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { Mail, MailOpen, Trash2, Clock, X, ExternalLink } from 'lucide-react';
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
        <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
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
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              filter === tab
                ? 'bg-black text-white shadow-lg'
                : 'bg-white text-gray-600 hover:text-black border border-gray-200 hover:border-gray-300'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab === 'unread' && contacts.filter((c) => c.status === 'unread').length > 0 && (
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                filter === tab ? 'bg-white text-black' : 'bg-red-100 text-red-600'
              }`}>
                {contacts.filter((c) => c.status === 'unread').length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {filteredContacts.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <Mail size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="font-medium text-gray-900">No messages found</p>
            <p className="text-sm text-gray-500 mt-1">Messages will appear here when received</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-6 hover:bg-gray-50 transition-all duration-200 cursor-pointer ${
                  contact.status === 'unread' ? 'bg-blue-50/30' : ''
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
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${
                    contact.status === 'unread' 
                      ? 'from-blue-500 to-blue-600' 
                      : 'from-gray-200 to-gray-300'
                  } flex items-center justify-center shadow-sm`}>
                    {contact.status === 'unread' ? (
                      <Mail size={20} className="text-white" />
                    ) : (
                      <MailOpen size={20} className="text-gray-600" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={`font-semibold text-gray-900 ${contact.status === 'unread' ? 'font-bold' : ''}`}>
                          {contact.name}
                        </h3>
                        <p className="text-sm text-gray-500">{contact.email}</p>
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        <span className="text-xs text-gray-500 flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-full">
                          <Clock size={12} />
                          {formatDate(contact.createdAt)}
                        </span>
                        {contact.status === 'unread' && (
                          <span className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{contact.message}</p>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteContact(contact.id);
                    }}
                    className="flex-shrink-0 p-2.5 hover:bg-red-50 rounded-lg transition-colors group"
                  >
                    <Trash2 size={16} className="text-gray-400 group-hover:text-red-500" />
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedContact(null)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedContact.name}</h2>
                <a 
                  href={`mailto:${selectedContact.email}`} 
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 group"
                >
                  {selectedContact.email}
                  <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <p className="text-sm text-gray-500 mt-2 flex items-center gap-1.5">
                  <Clock size={14} />
                  {formatDate(selectedContact.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            {/* Message */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Message</h3>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedContact.message}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => window.location.href = `mailto:${selectedContact.email}`}
                className="flex-1 bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors"
              >
                Reply via Email
              </button>
              <button
                onClick={() => setSelectedContact(null)}
                className="px-6 bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}