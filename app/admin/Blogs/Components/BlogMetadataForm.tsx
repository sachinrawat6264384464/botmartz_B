"use client";

import { X, Upload, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

// Categories
export const CATEGORIES = [
  "Technology",
  "Sustainability",
  "Policy",
  "Research",
  "ESG",
  "Climate",
  "Inclusion",
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
}: BlogMetadataFormProps) {
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column */}
      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 text-lg"
            placeholder="Enter an engaging title"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            URL Slug *
          </label>
          <div className="space-y-2">
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
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 text-gray-900 ${!useCustomSlug ? "bg-gray-50 text-gray-500" : "bg-white"}`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {slugChecking ? (
                    <RefreshCw size={16} className="animate-spin text-gray-400" />
                  ) : isSlugUnique ? (
                    <CheckCircle size={16} className="text-green-500" />
                  ) : (
                    <AlertCircle size={16} className="text-red-500" />
                  )}
                </div>
              </div>
              <button
                onClick={() => setUseCustomSlug(!useCustomSlug)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 font-medium"
              >
                {useCustomSlug ? "Auto" : "Custom"}
              </button>
            </div>
            {!isSlugUnique && (
              <p className="text-xs text-red-500 font-medium">
                This slug is already in use.
              </p>
            )}
            <p className="text-xs text-gray-500">
              Preview: /blogs/{formData.slug}
            </p>
          </div>
        </div>

        {/* Author & Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Author *
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-gray-900"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status *
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  status: e.target.value as "draft" | "published",
                }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-gray-900 bg-white"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                category: e.target.value,
              }))
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-gray-900 bg-white mb-2"
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
              className="w-full px-4 py-2 border border-purple-300 bg-purple-50 rounded-lg focus:ring-2 focus:ring-purple-500 text-purple-900 placeholder-purple-300"
            />
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tags
          </label>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleTagInputKeyPress}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-gray-900"
              placeholder="Type a tag and press Enter"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-[#755eb1] hover:bg-[#6b54a5] text-white font-medium rounded-lg transition-colors"
            >
              Add
            </button>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-br from-[#c7d6c1]/30 to-[#c1b4df]/30 text-[#2b2e34] text-sm font-medium rounded-full border border-gray-200"
                >
                  <span>#{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-600 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-gray-500 mt-2">
            {tags.length === 0
              ? "No tags added yet"
              : `${tags.length} tag${tags.length !== 1 ? "s" : ""} added`}
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Featured Image */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Featured Image
          </label>
          <div className="space-y-3">
            {formData.featuredImage ? (
              <div className="space-y-2">
                <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm group">
                  <img
                    src={formData.featuredImage}
                    alt={formData.featuredImageAlt || "Featured"}
                    className="w-full h-56 object-cover"
                  />
                  <button
                    onClick={onRemoveFeaturedImage}
                    disabled={uploadingFeaturedImage}
                    className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
                    aria-label="Remove featured image"
                  >
                    <X size={16} />
                  </button>
                </div>
                {/* Display Alt Text */}
                {formData.featuredImageAlt && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-xs font-bold text-green-900 mb-1">
                      ✅ Alt Text:
                    </p>
                    <p className="text-xs text-green-800">
                      {formData.featuredImageAlt}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-2 w-full h-56 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-500 hover:bg-gray-50 cursor-pointer transition-all">
                <div className="p-3 bg-gray-100 rounded-full">
                  <Upload size={24} className="text-gray-500" />
                </div>
                <div className="text-center">
                  <span className="text-sm font-medium text-gray-700 block">
                    {uploadingFeaturedImage
                      ? "Uploading..."
                      : "Click to upload & add alt text"}
                  </span>
                  <span className="text-xs text-gray-500">
                    SVG, PNG, JPG or GIF (max. 5MB)
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
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Excerpt / Subtitle *
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                excerpt: e.target.value,
              }))
            }
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 resize-none text-gray-900"
            placeholder="Brief description of the blog post..."
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Used for SEO and blog cards</span>
            <span>{formData.excerpt.length} chars</span>
          </div>
        </div>
      </div>
    </div>
  );
}