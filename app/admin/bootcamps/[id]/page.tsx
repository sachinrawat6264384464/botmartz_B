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

export default function EditBootcampPage({ params }: { params: Promise<{ id: string }> }) {
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
    time: '',
    format: 'Live Online',
    price: 199,
    status: 'Upcoming',
    shortDescription: '',
    instructorName: '',
    instructorTitle: '',
    instructorImage: '',
    techStack: '', // comma separated initially
  });

  useEffect(() => {
    if (!isNew) {
      const fetchBootcamp = async () => {
        try {
          const docSnap = await getDoc(doc(db, "bootcamps", resolvedParams.id));
          if (docSnap.exists()) {
            const data = docSnap.data();
            setFormData({
              ...data,
              techStack: Array.isArray(data.techStack) ? data.techStack.join(', ') : data.techStack || '',
            } as any);
          } else {
            setError("Bootcamp not found");
          }
        } catch (e) {
          setError("Failed to load bootcamp");
        }
        setLoading(false);
      };
      fetchBootcamp();
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
      const storageRef = ref(storage, `bootcamps/instructor_images/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(Math.round(progress));
        },
        (error) => {
          console.error("Firebase upload error:", error);
          alert("Failed to upload image.");
          setUploadingImage(false);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          handleChange("instructorImage", downloadUrl);
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
      const techStackArray = formData.techStack.split(',').map(s => s.trim()).filter(s => s);
      const dataToSave = {
        ...formData,
        price: Number(formData.price || 0),
        techStack: techStackArray,
        updatedAt: serverTimestamp()
      };

      if (isNew) {
        await addDoc(collection(db, "bootcamps"), {
          ...dataToSave,
          createdAt: serverTimestamp(),
        });
      } else {
        await setDoc(doc(db, "bootcamps", resolvedParams.id), dataToSave, { merge: true });
      }
      router.push('/admin/bootcamps');
    } catch (e: any) {
      setError(e.message || "Failed to save bootcamp");
    }
    setSaving(false);
  };

  if (loading) return <div className="p-12 text-center text-[#64748B]">Loading...</div>;

  return (
    <div className={`${interTight.className} p-6 max-w-[1000px] mx-auto space-y-6 pb-24`}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/bootcamps" className="p-2 bg-white border border-[#E2E8F0] rounded-lg text-[#64748B] hover:text-[#0B1C2C] hover:border-[#CBD5E1] transition-colors">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#0B1C2C]">{isNew ? 'Create New Bootcamp' : 'Edit Bootcamp'}</h1>
            <p className="text-sm text-[#64748B] mt-1">{isNew ? 'Launch a new AI Frontier bootcamp.' : `Updating ${formData.title}`}</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Save size={16} /> {saving ? 'Saving...' : 'Save Bootcamp'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-4 shadow-sm">
            <h2 className="text-base font-bold text-[#0B1C2C] mb-4">Core Details</h2>
            
            <div>
              <label className="block text-sm font-semibold text-[#334155] mb-1">Bootcamp Title *</label>
              <input 
                type="text" 
                value={formData.title} 
                onChange={e => handleChange('title', e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0B1C2C] focus:outline-none focus:border-[#0066FF]" 
                placeholder="e.g. Build Your First AI Full-Stack App"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#334155] mb-1">URL Slug *</label>
              <input 
                type="text" 
                value={formData.slug} 
                onChange={e => handleChange('slug', e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0B1C2C] focus:outline-none focus:border-[#0066FF]" 
                placeholder="e.g. build-your-first-ai-full-stack-app"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#334155] mb-1">Short Description</label>
              <textarea 
                value={formData.shortDescription} 
                onChange={e => handleChange('shortDescription', e.target.value)}
                rows={3}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0B1C2C] focus:outline-none focus:border-[#0066FF]" 
                placeholder="Build an AI-powered application from scratch..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-[#334155] mb-1">Tech Stack (comma separated)</label>
              <input 
                type="text" 
                value={formData.techStack} 
                onChange={e => handleChange('techStack', e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0B1C2C] focus:outline-none focus:border-[#0066FF]" 
                placeholder="ChatGPT, Claude, Cursor, LangChain"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-4 shadow-sm">
            <h2 className="text-base font-bold text-[#0B1C2C] mb-4">Event Logistics</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#334155] mb-1">Date</label>
                <input 
                  type="text" 
                  value={formData.date} 
                  onChange={e => handleChange('date', e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0B1C2C] focus:outline-none focus:border-[#0066FF]" 
                  placeholder="e.g. 9 August 2026 (Sat)"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#334155] mb-1">Time</label>
                <input 
                  type="text" 
                  value={formData.time} 
                  onChange={e => handleChange('time', e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0B1C2C] focus:outline-none focus:border-[#0066FF]" 
                  placeholder="e.g. 10:00 AM - 1:00 PM (IST)"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#334155] mb-1">Format</label>
                <input 
                  type="text" 
                  value={formData.format} 
                  onChange={e => handleChange('format', e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0B1C2C] focus:outline-none focus:border-[#0066FF]" 
                  placeholder="Live Online"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#334155] mb-1">Price (INR)</label>
                <input 
                  type="number" 
                  value={formData.price} 
                  onChange={e => handleChange('price', e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0B1C2C] focus:outline-none focus:border-[#0066FF]" 
                  placeholder="199"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-[#334155] mb-1">Status</label>
              <select 
                value={formData.status} 
                onChange={e => handleChange('status', e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0B1C2C] focus:outline-none focus:border-[#0066FF]"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-4 shadow-sm">
            <h2 className="text-base font-bold text-[#0B1C2C] mb-4">Instructor</h2>
            
            <div>
              <label className="block text-sm font-semibold text-[#334155] mb-1">Instructor Name</label>
              <input 
                type="text" 
                value={formData.instructorName} 
                onChange={e => handleChange('instructorName', e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0B1C2C] focus:outline-none focus:border-[#0066FF]" 
                placeholder="e.g. Soham Sharma"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#334155] mb-1">Instructor Title</label>
              <input 
                type="text" 
                value={formData.instructorTitle} 
                onChange={e => handleChange('instructorTitle', e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0B1C2C] focus:outline-none focus:border-[#0066FF]" 
                placeholder="e.g. Founder, Botmartz"
              />
            </div>
            
            <div className="pt-2">
              <label className="block text-sm font-semibold text-[#334155] mb-2">Instructor Image</label>
              {formData.instructorImage ? (
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#0B1C2C] mb-4">
                  <img src={formData.instructorImage} alt="Instructor" className="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    onClick={() => handleChange('instructorImage', '')}
                    className="absolute inset-0 bg-black/50 text-white opacity-0 hover:opacity-100 flex items-center justify-center text-xs transition-opacity"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#CBD5E1] flex flex-col items-center justify-center text-[#64748B] mb-4">
                  <ImageIcon size={20} className="opacity-50" />
                </div>
              )}
              
              <label className="inline-flex items-center justify-center border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] py-2 px-4 cursor-pointer text-xs font-semibold text-[#334155] transition-colors">
                {uploadingImage ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading ({uploadProgress}%)
                  </span>
                ) : (
                  <span>Upload Image</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}
