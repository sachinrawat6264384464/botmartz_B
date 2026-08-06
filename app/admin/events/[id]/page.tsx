"use client";

import { useState, useEffect, use } from 'react';
import { Inter_Tight } from 'next/font/google';
import { Save, ArrowLeft, Image as ImageIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const isNew = resolvedParams.id === 'new';
  const router = useRouter();
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    date: '',
    location: '',
    badge: 'Upcoming',
    status: 'upcoming',
    shortDescription: '',
    coverImage: '',
    content: '',
    entryFee: 0
  });

  useEffect(() => {
    if (!isNew) {
      const fetchEvent = async () => {
        try {
          const docSnap = await getDoc(doc(db, "events", resolvedParams.id));
          if (docSnap.exists()) {
            setFormData(docSnap.data() as any);
          } else {
            setError("Event not found");
          }
        } catch (e) {
          setError("Failed to load event");
        }
        setLoading(false);
      };
      fetchEvent();
    }
  }, [resolvedParams.id, isNew]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadProgress(0);

    try {
      const storageRef = ref(storage, `events/cover_images/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(Math.round(progress));
        },
        (error) => {
          console.error("Firebase upload error:", error);
          alert("Failed to upload image. Check security rules or file size.");
          setUploadingImage(false);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          handleChange("coverImage", downloadUrl);
          setUploadingImage(false);
        }
      );
    } catch (err) {
      console.error(err);
      alert("Error initializing upload.");
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.slug) {
      alert("Title and Slug are required.");
      return;
    }
    
    setSaving(true);
    try {
      if (isNew) {
        await addDoc(collection(db, "events"), {
          ...formData,
          entryFee: Number(formData.entryFee || 0),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      } else {
        await setDoc(doc(db, "events", resolvedParams.id), {
          ...formData,
          entryFee: Number(formData.entryFee || 0),
          updatedAt: serverTimestamp()
        }, { merge: true });
      }
      router.push('/admin/events');
    } catch (e: any) {
      setError(e.message || "Failed to save event");
    }
    setSaving(false);
  };

  if (loading) return <div className="p-12 text-center text-admin-text-muted">Loading...</div>;

  return (
    <div className={`${interTight.className} p-6 max-w-[1000px] mx-auto space-y-6 pb-24`}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/events" className="p-2 bg-admin-bg border border-admin-border rounded-lg text-admin-text-muted hover:text-white hover:border-admin-text-muted transition-colors">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-admin-text">{isNew ? 'Create New Event' : 'Edit Event'}</h1>
            <p className="text-sm text-admin-text-muted mt-1">{isNew ? 'Publish a new community event.' : `Updating ${formData.title}`}</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-admin-accent hover:bg-admin-accent/90 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Save size={16} /> {saving ? 'Saving...' : 'Save Event'}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-admin-card border border-admin-border rounded-xl p-6 space-y-4">
            <h2 className="text-base font-semibold text-admin-text mb-4">Event Details</h2>
            
            <div>
              <label className="block text-sm font-medium text-admin-text mb-1">Event Title *</label>
              <input 
                type="text" 
                value={formData.title} 
                onChange={e => handleChange('title', e.target.value)}
                className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent" 
                placeholder="e.g. AI Frontier 2026"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-admin-text mb-1">URL Slug *</label>
              <input 
                type="text" 
                value={formData.slug} 
                onChange={e => handleChange('slug', e.target.value)}
                className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent" 
                placeholder="e.g. ai-frontier-2026"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-admin-text mb-1">Short Description</label>
              <textarea 
                value={formData.shortDescription} 
                onChange={e => handleChange('shortDescription', e.target.value)}
                rows={3}
                className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent" 
                placeholder="Brief summary for the event cards..."
              />
            </div>
          </div>

          <div className="bg-admin-card border border-admin-border rounded-xl p-6 space-y-4">
            <h2 className="text-base font-semibold text-admin-text mb-4">Event Content (Markdown)</h2>
            <textarea 
              value={formData.content} 
              onChange={e => handleChange('content', e.target.value)}
              rows={20}
              className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent font-mono" 
              placeholder="# Welcome to AI Frontier\n\nJoin us for..."
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-admin-card border border-admin-border rounded-xl p-6 space-y-4">
            <h2 className="text-base font-semibold text-admin-text mb-4">Metadata</h2>
            
            <div>
              <label className="block text-sm font-medium text-admin-text mb-1">Date</label>
              <input 
                type="text" 
                value={formData.date} 
                onChange={e => handleChange('date', e.target.value)}
                className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent" 
                placeholder="e.g. August 23, 2026"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-admin-text mb-1">Location</label>
              <input 
                type="text" 
                value={formData.location} 
                onChange={e => handleChange('location', e.target.value)}
                className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent" 
                placeholder="e.g. Indore, India"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-admin-text mb-1">Badge</label>
              <input 
                type="text" 
                value={formData.badge} 
                onChange={e => handleChange('badge', e.target.value)}
                className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent" 
                placeholder="e.g. Flagship"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-admin-text mb-1">Status</label>
              <select 
                value={formData.status} 
                onChange={e => handleChange('status', e.target.value)}
                className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent"
              >
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-admin-text mb-1">Entry Fee (INR)</label>
              <input 
                type="number" 
                value={formData.entryFee || 0} 
                onChange={e => handleChange('entryFee', e.target.value)}
                className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent" 
                placeholder="e.g. 100 (0 for Free)"
              />
            </div>
          </div>

          <div className="bg-admin-card border border-admin-border rounded-xl p-6 space-y-4">
            <h2 className="text-base font-semibold text-admin-text mb-4">Cover Image</h2>
            
            {formData.coverImage ? (
              <div className="relative w-full h-32 rounded-lg overflow-hidden border border-admin-border mb-2">
                <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
                <button 
                  type="button" 
                  onClick={() => handleChange('coverImage', '')}
                  className="absolute top-2 right-2 bg-black/60 hover:bg-black text-white p-1.5 rounded-full text-xs transition-colors"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="w-full h-32 rounded-lg border-2 border-dashed border-admin-border flex flex-col items-center justify-center text-admin-text-muted mb-2">
                <ImageIcon size={24} className="mb-2 opacity-50" />
                <span className="text-xs">No image provided</span>
              </div>
            )}
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-admin-text-muted mb-1">Upload File (Firebase Storage)</label>
                <label className="flex items-center justify-center border border-admin-border rounded-lg bg-admin-bg hover:bg-admin-border/50 py-2.5 px-4 cursor-pointer text-xs font-semibold text-admin-text transition-colors">
                  {uploadingImage ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading ({uploadProgress}%)
                    </span>
                  ) : (
                    <span>Choose Image</span>
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    disabled={uploadingImage}
                    onChange={handleFileUpload} 
                    className="hidden" 
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-medium text-admin-text-muted mb-1">Or, Paste Image URL</label>
                <input 
                  type="text" 
                  value={formData.coverImage} 
                  onChange={e => handleChange('coverImage', e.target.value)}
                  className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent" 
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
