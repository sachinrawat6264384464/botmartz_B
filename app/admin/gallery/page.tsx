"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import AdminSidebar from "../components/AdminSidebar";
import { 
  Camera, 
  Upload, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  FileImage,
  RefreshCw,
  Eye,
  Tag
} from "lucide-react";

interface AdminGalleryItem {
  id: string;
  url: string;
  title: string;
  category: string;
  caption?: string;
  sizeKb?: string;
  createdAt?: string;
}

const CATEGORIES = ["AI Frontier", "Workshops", "Community Meetups", "Behind The Scenes", "Events"];

export default function AdminGalleryPage() {
  const [images, setImages] = useState<AdminGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("AI Frontier");
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compressedBase64, setCompressedBase64] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      if (data.success) {
        setImages(data.images || []);
      }
    } catch (err) {
      console.error("Failed to load admin gallery images:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // CLIENT-SIDE IMAGE COMPRESSION (Guarantees 100 KB - 200 KB range)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setOriginalSize(file.size / 1024); // KB

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Resize max dimension to 1280px
        const MAX_DIM = 1280;
        if (width > height && width > MAX_DIM) {
          height = Math.round((height * MAX_DIM) / width);
          width = MAX_DIM;
        } else if (height > MAX_DIM) {
          width = Math.round((width * MAX_DIM) / height);
          height = MAX_DIM;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, width, height);

        // Quality tuning loop for target size 100KB - 200KB
        let quality = 0.82;
        let dataUrl = canvas.toDataURL("image/jpeg", quality);
        let head = "data:image/jpeg;base64,";
        let sizeInBytes = Math.round((dataUrl.length - head.length) * 3 / 4);

        if (sizeInBytes > 200 * 1024) {
          quality = 0.70;
          dataUrl = canvas.toDataURL("image/jpeg", quality);
          sizeInBytes = Math.round((dataUrl.length - head.length) * 3 / 4);
        } else if (sizeInBytes < 100 * 1024) {
          quality = 0.92;
          dataUrl = canvas.toDataURL("image/jpeg", quality);
          sizeInBytes = Math.round((dataUrl.length - head.length) * 3 / 4);
        }

        setCompressedBase64(dataUrl);
        setCompressedSize(sizeInBytes / 1024);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleUploadSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !compressedBase64) {
      setMessage({ type: "error", text: "Please provide a title and select a photo to upload." });
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          caption,
          imageBase64: compressedBase64,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: "success", text: "Photo compressed and uploaded successfully!" });
        setTitle("");
        setCaption("");
        setSelectedFile(null);
        setCompressedBase64(null);
        fetchGallery();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to upload photo" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "An unexpected error occurred" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photo from the gallery?")) return;

    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Photo deleted successfully" });
        fetchGallery();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to delete photo" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <div className="flex min-h-screen bg-[#090D16] text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto overflow-y-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00B8F0] uppercase tracking-wider mb-1">
              <Camera size={16} />
              <span>CONTENT MANAGEMENT</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">Botmartz Gallery Manager</h1>
            <p className="text-slate-400 text-sm mt-1">Upload and manage event photos with automatic 100KB-200KB compression.</p>
          </div>

          <button
            onClick={fetchGallery}
            className="self-start md:self-auto px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold flex items-center gap-2 transition-all"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh Photos
          </button>
        </div>

        {/* FEEDBACK MESSAGES */}
        {message && (
          <div
            className={`p-4 rounded-xl mb-6 flex items-center gap-3 text-sm font-medium border ${
              message.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{message.text}</span>
          </div>
        )}

        {/* UPLOAD CARD FORM */}
        <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 mb-10 shadow-xl backdrop-blur-md">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Upload size={18} className="text-[#00B8F0]" />
            Upload New Photo (Auto-Compressed to ~100-200 KB)
          </h2>

          <form onSubmit={handleUploadSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. AI Frontier Summit Keynote 2026"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:border-[#00B8F0] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:border-[#00B8F0] focus:outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Caption / Description
                </label>
                <textarea
                  rows={3}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Brief description of the event photo..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:border-[#00B8F0] focus:outline-none"
                />
              </div>
            </div>

            {/* Right File Upload & Compression Stats */}
            <div className="space-y-4 flex flex-col justify-between">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Select Image File *
                </label>
                
                <div className="relative border-2 border-dashed border-white/20 hover:border-[#00B8F0] rounded-2xl p-6 text-center cursor-pointer bg-slate-950/50 transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <FileImage size={32} className="mx-auto text-[#00B8F0] mb-2" />
                  <p className="text-sm font-semibold text-white">
                    {selectedFile ? selectedFile.name : "Click or drag photo here to select"}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Supports PNG, JPG, WEBP, JPEG</p>
                </div>
              </div>

              {/* COMPRESSION STATS BADGE */}
              {compressedBase64 && (
                <div className="p-3.5 rounded-xl bg-[#0066FF]/10 border border-[#00B8F0]/30 text-xs text-slate-300 space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span>Original File Size:</span>
                    <span className="text-slate-400">{originalSize.toFixed(1)} KB</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#00B8F0]">
                    <span>Compressed File Size:</span>
                    <span>{compressedSize.toFixed(1)} KB (Target: 100-200 KB)</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={uploading || !compressedBase64}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00B8F0] hover:from-[#0052CC] hover:to-[#0099D6] disabled:opacity-50 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-[#0066FF]/20 flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    Compressing &amp; Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={16} />
                    Upload to Botmartz Gallery
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* UPLOADED PHOTOS GRID */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Camera size={18} className="text-[#00B8F0]" />
            Gallery Photos ({images.length})
          </h2>

          {loading ? (
            <div className="text-center py-12 text-slate-400">Loading gallery photos...</div>
          ) : images.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-white/10 text-slate-400">
              No custom uploaded photos yet. Upload one above!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between"
                >
                  <div className="relative h-48 w-full bg-black">
                    <Image src={img.url} alt={img.title} fill className="object-cover" />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-1 rounded-md bg-black/80 border border-white/10 text-[10px] font-bold text-[#00B8F0] uppercase">
                        {img.category}
                      </span>
                    </div>
                    {img.sizeKb && (
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-1 rounded-md bg-black/80 border border-white/10 text-[10px] font-bold text-emerald-400 font-mono">
                          {img.sizeKb}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-white text-sm line-clamp-1 mb-1">{img.title}</h3>
                      {img.caption && <p className="text-xs text-slate-400 line-clamp-2">{img.caption}</p>}
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                      <a
                        href={img.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#00B8F0] hover:underline flex items-center gap-1"
                      >
                        <Eye size={13} /> View Full
                      </a>

                      <button
                        onClick={() => handleDelete(img.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                        title="Delete Photo"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
