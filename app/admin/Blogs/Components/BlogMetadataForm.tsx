"use client";

import { useState } from "react";
import { X, Upload, RefreshCw, CheckCircle, AlertCircle, Code, Terminal, Link as LinkIcon, Image as ImageIcon } from "lucide-react";

// Real Engineering Insights Categories
export const CATEGORIES = [
  "TENSORFLOW",
  "PYTORCH",
  "RESEARCH EXPLAINED",
  "RAG & AGENTS",
  "LLM ARCHITECTURE",
  "COMPUTER VISION",
  "SYSTEM DESIGN",
  "AI ENGINEERING",
  "FINE-TUNING",
  "AUTONOMOUS AGENTS",
  "Custom",
];

export interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  customCategory: string;
  featuredImage: string;
  featuredImageAlt: string;
  featuredImageName: string;
  status: "draft" | "published";
  colabLink?: string;
  githubLink?: string;
}

interface BlogMetadataFormProps {
  formData: BlogFormData;
  setFormData: React.Dispatch<React.SetStateAction<BlogFormData>>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  tagInput: string;
  setTagInput: React.Dispatch<React.SetStateAction<string>>;
  useCustomSlug: boolean;
  setUseCustomSlug: React.Dispatch<React.SetStateAction<boolean>>;
  isSlugUnique: boolean;
  slugChecking: boolean;
  uploadingFeaturedImage: boolean;
  onTitleChange: (title: string) => void;
  onFeaturedImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFeaturedImage: () => void;
  generateSlugRaw: (title: string) => string;
  colabLink?: string;
  setColabLink?: (v: string) => void;
  githubLink?: string;
  setGithubLink?: (v: string) => void;
  failureModes?: number;
  setFailureModes?: (v: number) => void;
  codeSnippets?: number;
  setCodeSnippets?: (v: number) => void;
  runnableNotebooks?: number;
  setRunnableNotebooks?: (v: number) => void;
}

export default function BlogMetadataForm({
  formData,
  setFormData,
  tags,
  setTags,
  tagInput,
  setTagInput,
  useCustomSlug,
  setUseCustomSlug,
  isSlugUnique,
  slugChecking,
  uploadingFeaturedImage,
  onTitleChange,
  onFeaturedImageUpload,
  onRemoveFeaturedImage,
  generateSlugRaw,
  colabLink = "",
  setColabLink,
  githubLink = "",
  setGithubLink,
  failureModes = 5,
  setFailureModes,
  codeSnippets = 3,
  setCodeSnippets,
  runnableNotebooks = 1,
  setRunnableNotebooks,
}: BlogMetadataFormProps) {
  const [imageInputMode, setImageInputMode] = useState<"url" | "upload">("url");

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-slate-800">
      {/* ── LEFT COLUMN: METADATA & LINKS ── */}
      <div className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Article Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 text-base font-semibold"
            placeholder="e.g. Keras Functional API: Multi-Input/Output Models & Branching"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            URL Slug *
          </label>
          <div className="space-y-1.5">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      slug: generateSlugRaw(e.target.value),
                    }))
                  }
                  disabled={!useCustomSlug}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 text-xs text-gray-900 ${
                    !useCustomSlug ? "bg-gray-50 text-gray-500" : "bg-white"
                  }`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {slugChecking ? (
                    <RefreshCw size={14} className="animate-spin text-gray-400" />
                  ) : isSlugUnique ? (
                    <CheckCircle size={14} className="text-green-500" />
                  ) : (
                    <AlertCircle size={14} className="text-red-500" />
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setUseCustomSlug(!useCustomSlug)}
                className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 font-medium"
              >
                {useCustomSlug ? "Auto" : "Custom"}
              </button>
            </div>
            <p className="text-[11px] text-gray-500">
              Live URL: <code className="text-[#0092D7]">/insights/{formData.slug || "slug"}</code>
            </p>
          </div>
        </div>

        {/* Author & Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Author Name *
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  author: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-xs text-gray-900 font-medium"
              placeholder="e.g. Dr. Aris Thorne"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Publish Status *
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  status: e.target.value as "draft" | "published",
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-xs text-gray-900 bg-white font-medium"
            >
              <option value="draft">Draft (Unpublished)</option>
              <option value="published">Published (Live)</option>
            </select>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Engineering Insights Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                category: e.target.value,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-xs text-gray-900 bg-white mb-2 font-medium"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {formData.category === "Custom" && (
            <input
              type="text"
              value={formData.customCategory}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  customCategory: e.target.value,
                }))
              }
              placeholder="Enter custom category name"
              className="w-full px-3 py-2 border border-purple-300 bg-purple-50 rounded-lg focus:ring-2 focus:ring-purple-500 text-xs text-purple-900 placeholder-purple-300"
            />
          )}
        </div>

        {/* ── INTERACTIVE NOTEBOOK & CODE LINKS ── */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3.5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <Terminal size={14} className="text-[#00B8F0]" />
            <span>Interactive Notebook & Code Repository</span>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <span>Google Colab Notebook URL</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-normal">Runnable in browser</span>
            </label>
            <input
              type="url"
              value={colabLink}
              onChange={(e) => setColabLink?.(e.target.value)}
              placeholder="https://colab.research.google.com/drive/..."
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00B8F0] font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              GitHub Repository / Code Link
            </label>
            <input
              type="url"
              value={githubLink}
              onChange={(e) => setGithubLink?.(e.target.value)}
              placeholder="https://github.com/botmartz/..."
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00B8F0] font-mono"
            />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
          <div>
            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
              Failure Modes
            </label>
            <input
              type="number"
              value={failureModes}
              onChange={(e) => setFailureModes?.(Number(e.target.value) || 0)}
              className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded text-xs font-bold text-slate-900"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
              Code Snippets
            </label>
            <input
              type="number"
              value={codeSnippets}
              onChange={(e) => setCodeSnippets?.(Number(e.target.value) || 0)}
              className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded text-xs font-bold text-slate-900"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
              Runnable Colabs
            </label>
            <input
              type="number"
              value={runnableNotebooks}
              onChange={(e) => setRunnableNotebooks?.(Number(e.target.value) || 0)}
              className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded text-xs font-bold text-slate-900"
            />
          </div>
        </div>

      </div>

      {/* ── RIGHT COLUMN: IMAGE, EXCERPT, TAGS ── */}
      <div className="space-y-5">
        
        {/* Cover / Featured Image */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Cover Image / Thumbnail *
            </label>
            <div className="flex gap-1 text-[11px] font-semibold bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => setImageInputMode("url")}
                className={`px-2.5 py-1 rounded cursor-pointer transition-colors ${imageInputMode === "url" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"}`}
              >
                Paste URL
              </button>
              <button
                type="button"
                onClick={() => setImageInputMode("upload")}
                className={`px-2.5 py-1 rounded cursor-pointer transition-colors ${imageInputMode === "upload" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"}`}
              >
                Upload File
              </button>
            </div>
          </div>

          {imageInputMode === "url" && (
            <div className="mb-2.5">
              <div className="relative">
                <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={formData.featuredImage}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featuredImage: e.target.value }))}
                  placeholder="https://images.unsplash.com/... or /eng-i-removebg-preview.png"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
            </div>
          )}

          <div className="space-y-3">
            {formData.featuredImage ? (
              <div className="space-y-2">
                <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm group bg-slate-900">
                  <img
                    src={formData.featuredImage}
                    alt={formData.featuredImageAlt || "Featured"}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={onRemoveFeaturedImage}
                    disabled={uploadingFeaturedImage}
                    className="absolute top-2 right-2 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors cursor-pointer shadow-md"
                    aria-label="Remove image"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-2 w-full h-44 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-500 hover:bg-gray-50 cursor-pointer transition-all">
                <div className="p-3 bg-gray-100 rounded-full">
                  <Upload size={20} className="text-gray-500" />
                </div>
                <div className="text-center">
                  <span className="text-xs font-semibold text-gray-700 block">
                    {uploadingFeaturedImage ? "Uploading..." : "Click to upload image"}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    PNG, JPG, WebP, SVG (max 5MB)
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onFeaturedImageUpload}
                  disabled={uploadingFeaturedImage}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Excerpt / Article Abstract *
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                excerpt: e.target.value,
              }))
            }
            rows={4}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 resize-none text-xs text-gray-900 font-medium leading-relaxed"
            placeholder="A technical synopsis explaining the architecture, key bottlenecks addressed, and production results..."
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Tags & Keywords
          </label>

          <div className="flex gap-2 mb-2.5">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleTagInputKeyPress}
              className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-xs text-gray-900"
              placeholder="e.g. PyTorch, DistributedTraining, CUDA"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-3 py-1.5 bg-[#0092D7] hover:bg-[#0678BE] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Add Tag
            </button>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-full border border-slate-200"
                >
                  <span>#{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}