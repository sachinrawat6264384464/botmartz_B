"use client";

import { useState, useEffect, useRef } from "react";
import { X, RefreshCw } from "lucide-react";
import { db } from "@/lib/firebase";
import {
  doc,
  updateDoc,
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useEditor, EditorContent, mergeAttributes } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Heading from "@tiptap/extension-heading";
import FontFamily from "@tiptap/extension-font-family";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import ImageSelectionModal, { ImageMetadata } from "./ImageSelectionModal";
import ImageEditModal from "./ImageEditModal";
import EditorToolbar from "./EditorToolbar";
import BlogMetadataForm, { BlogFormData, CATEGORIES } from "./BlogMetadataForm";

import {
  uploadToCloudinary,
  blobUrlToFile,
  deleteCloudinaryImage,
  extractImagesFromHTML,
} from "@/lib/cloudinary-utils";

const lowlight = createLowlight(common);

function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error" | "loading";
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed top-4 right-4 z-[100] flex items-center gap-3 p-4 rounded-lg border shadow-lg animate-slide-in ${
        type === "success"
          ? "bg-green-50 border-green-200"
          : type === "error"
            ? "bg-red-50 border-red-200"
            : "bg-blue-50 border-blue-200"
      }`}
    >
      <div className="flex-shrink-0">
        {type === "success" ? (
          <svg
            className="w-5 h-5 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : type === "error" ? (
          <svg
            className="w-5 h-5 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <RefreshCw size={20} className="text-blue-600 animate-spin" />
        )}
      </div>
      <p className="text-sm font-medium text-gray-900">{message}</p>
      {type !== "loading" && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

function CodeBlockModal({
  onInsert,
  onCancel,
  initialCode = "",
  initialLanguage = "javascript",
}: {
  onInsert: (code: string, language: string) => void;
  onCancel: () => void;
  initialCode?: string;
  initialLanguage?: string;
}) {
  const [code, setCode] = useState(initialCode);
  const [language, setLanguage] = useState(initialLanguage);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl shadow-2xl">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Insert Code Block</h3>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-gray-900"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="bash">Bash</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Code
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 resize-none font-mono text-sm text-gray-900"
              placeholder="Paste or type your code here..."
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 text-sm font-medium rounded-lg transition-colors border border-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => onInsert(code, language)}
            disabled={!code.trim()}
            className="px-8 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Insert Code
          </button>
        </div>
      </div>
    </div>
  );
}

const FontSize = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: null,
        parseHTML: (element) => element.style.fontSize || null,
        renderHTML: (attributes) => {
          if (!attributes.fontSize) return {};
          return { style: `font-size: ${attributes.fontSize}` };
        },
      },
    };
  },
});

const CustomHeading = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const hasLevels = this.options.levels && this.options.levels.length > 0;
    const level =
      hasLevels && this.options.levels.includes(node.attrs.level)
        ? node.attrs.level
        : hasLevels
          ? this.options.levels[0]
          : node.attrs.level;

    const classes: { [key: number]: string } = {
      1: "text-4xl font-bold mb-6 mt-10 text-gray-900 leading-tight",
      2: "text-3xl font-bold mb-5 mt-8 text-gray-900 leading-tight",
      3: "text-2xl font-bold mb-4 mt-6 text-gray-900 leading-snug",
    };

    const className = classes[level] || classes[3];

    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: className,
      }),
      0,
    ];
  },
});

const calculateReadingTime = (content: string): number => {
  const text = content.replace(/<[^>]*>/g, "");
  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  return Math.max(1, Math.ceil(wordCount / 200));
};

const generateSlugRaw = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  featuredImageAlt?: string;
  featuredImageName?: string;
  status: string;
  createdAt: string;
  publishedAt?: string;
  likes?: number;
}

interface BlogEditorModalProps {
  blog: BlogPost | null;
  onClose: () => void;
  onSave: () => void;
}

interface LocalImage {
  tempUrl: string;
  file: File;
  metadata: ImageMetadata;
  type: "featured" | "editor";
}

export default function BlogEditorModal({
  blog,
  onClose,
  onSave,
}: BlogEditorModalProps) {
  const [formData, setFormData] = useState<BlogFormData>({
    title: blog?.title || "",
    slug: blog?.slug || "",
    excerpt: blog?.excerpt || "",
    author: blog?.author || "",
    category: blog?.category || "Technology",
    customCategory: "",
    featuredImage: blog?.featuredImage || "",
    featuredImageAlt: blog?.featuredImageAlt || "",
    featuredImageName: blog?.featuredImageName || "",
    status: (blog?.status || "draft") as "draft" | "published",
  });

  const [tags, setTags] = useState<string[]>(blog?.tags || []);
  const [tagInput, setTagInput] = useState("");

  const [useCustomSlug, setUseCustomSlug] = useState(false);
  const [isSlugUnique, setIsSlugUnique] = useState(true);
  const [slugChecking, setSlugChecking] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "loading";
  } | null>(null);

  const [selectionModalOpen, setSelectionModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [cropType, setCropType] = useState<"featured" | "editor">("featured");
  const [pendingImageFile, setPendingImageFile] = useState<File | null>(null);
  const [showCodeModal, setShowCodeModal] = useState(false);

  const [editingImage, setEditingImage] = useState<{
    src: string;
    alt: string;
    title: string;
  } | null>(null);

  const [localImages, setLocalImages] = useState<LocalImage[]>([]);

  const originalFeaturedImage = useRef<string>(blog?.featuredImage || "");
  const originalContentImages = useRef<string[]>([]);

  // Tab Manager
  const [activeTab, setActiveTab] = useState<'meta' | 'details' | 'content'>('meta');

  // Detailed Section fields
  const [colabLink, setColabLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [failureModes, setFailureModes] = useState(5);
  const [codeSnippets, setCodeSnippets] = useState(3);
  const [runnableNotebooks, setRunnableNotebooks] = useState(1);
  const [tocInput, setTocInput] = useState("");
  const [closingPoints, setClosingPoints] = useState("");

  useEffect(() => {
    if (blog) {
      if (blog.category && !CATEGORIES.includes(blog.category)) {
        setFormData((prev) => ({
          ...prev,
          category: "Custom",
          customCategory: blog.category,
        }));
      }

      if (blog.content) {
        originalContentImages.current = extractImagesFromHTML(blog.content);
      }

      // Load extra detail fields
      const anyBlog = blog as any;
      if (anyBlog.colabLink) setColabLink(anyBlog.colabLink);
      if (anyBlog.githubLink) setGithubLink(anyBlog.githubLink);
      if (anyBlog.failureModes) setFailureModes(anyBlog.failureModes);
      if (anyBlog.codeSnippets) setCodeSnippets(anyBlog.codeSnippets);
      if (anyBlog.runnableNotebooks) setRunnableNotebooks(anyBlog.runnableNotebooks);
      if (anyBlog.toc) setTocInput(Array.isArray(anyBlog.toc) ? anyBlog.toc.join(', ') : anyBlog.toc);
      if (anyBlog.closingPoints) setClosingPoints(Array.isArray(anyBlog.closingPoints) ? anyBlog.closingPoints.join('\n') : anyBlog.closingPoints);
    }
  }, [blog]);

  useEffect(() => {
    return () => {
      localImages.forEach((img) => {
        if (img.tempUrl.startsWith("blob:")) {
          URL.revokeObjectURL(img.tempUrl);
        }
      });
    };
  }, [localImages]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        bulletList: { HTMLAttributes: { class: "list-disc pl-6 my-6 space-y-3" } },
        orderedList: { HTMLAttributes: { class: "list-decimal pl-6 my-6 space-y-3" } },
        listItem: { HTMLAttributes: { class: "text-gray-900 text-lg leading-relaxed" } },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "rounded-lg border border-gray-300 bg-gray-900 text-gray-100 p-4 my-6 overflow-x-auto font-mono text-sm",
        },
        languageClassPrefix: "language-",
      }),
      CustomHeading.configure({ levels: [1, 2, 3] }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "border-collapse w-full my-8",
          style: "border: 2px solid #000000;",
        },
      }),
      TableRow.configure({ HTMLAttributes: { style: "border: 2px solid #000000;" } }),
      TableHeader.configure({
        HTMLAttributes: {
          style: "border: 2px solid #000000; padding: 12px; background-color: #755eb1; color: white; font-weight: bold;",
        },
      }),
      TableCell.configure({
        HTMLAttributes: { style: "border: 2px solid #000000; padding: 12px; min-width: 100px;" },
      }),
      Image.extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            width: {
              default: null,
              parseHTML: (element) => element.getAttribute("width"),
              renderHTML: (attributes) => attributes.width ? { width: attributes.width } : {},
            },
            height: {
              default: null,
              parseHTML: (element) => element.getAttribute("height"),
              renderHTML: (attributes) => attributes.height ? { height: attributes.height } : {},
            },
            loading: { default: "eager" },
          };
        },
      }).configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg my-8 shadow-md cursor-pointer hover:shadow-xl transition-shadow",
        },
        inline: false,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-[#755eb1] underline hover:text-[#6b54a5] font-medium" },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      FontSize,
      Color,
      Highlight.configure({ multicolor: true }),
      FontFamily.configure({ types: ["textStyle"] }),
    ],
    content: blog?.content || "<p>Start writing your blog post...</p>",
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none min-h-[400px] px-4 py-3 text-gray-900 prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1 prose-code:rounded",
      },
      handleClickOn: (view, pos, node, nodePos, event) => {
        if (node.type.name === "image") {
          event.preventDefault();
          setEditingImage({
            src: node.attrs.src || "",
            alt: node.attrs.alt || "",
            title: node.attrs.title || "",
          });
          return true;
        }
        return false;
      },
    },
  });

  const showToast = (message: string, type: "success" | "error" | "loading") => {
    setToast({ message, type });
    if (type !== "loading") setTimeout(() => setToast(null), 5000);
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => {
      const newState = { ...prev, title };
      if (!useCustomSlug) newState.slug = generateSlugRaw(title);
      return newState;
    });
  };

  const checkSlugUniqueness = async (slugToCheck: string) => {
    if (!slugToCheck) return;
    setSlugChecking(true);
    try {
      const q = query(collection(db, "blog-posts"), where("slug", "==", slugToCheck));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setIsSlugUnique(true);
      } else {
        const isCurrentDoc = blog && snapshot.docs[0].id === blog.id;
        setIsSlugUnique(!!isCurrentDoc);
      }
    } catch (error) {
      console.error("Error checking slug:", error);
    } finally {
      setSlugChecking(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.slug) checkSlugUniqueness(formData.slug);
    }, 500);
    return () => clearTimeout(timer);
  }, [formData.slug]);

  const handleFeaturedImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageToCrop(e.target?.result as string);
      setCropType("featured");
      setSelectionModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFeaturedImage = () => {
    const imageToRemove = formData.featuredImage;
    setFormData((prev) => ({ ...prev, featuredImage: "", featuredImageAlt: "", featuredImageName: "" }));
    if (imageToRemove.startsWith("blob:")) {
      setLocalImages((prev) => prev.filter((img) => img.tempUrl !== imageToRemove));
      URL.revokeObjectURL(imageToRemove);
    }
  };

  const handleEditorImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageToCrop(e.target?.result as string);
      setCropType("editor");
      setSelectionModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url && editor) editor.chain().focus().setLink({ href: url }).run();
  };

  const handleAddDirectly = async (imageUrl: string, metadata: ImageMetadata) => {
    setSelectionModalOpen(false);
    if (!pendingImageFile) return;
    const blobUrl = URL.createObjectURL(pendingImageFile);
    const localImage: LocalImage = { tempUrl: blobUrl, file: pendingImageFile, metadata, type: cropType };
    setLocalImages((prev) => [...prev, localImage]);

    if (cropType === "featured") {
      setLocalImages((prev) => prev.filter((img) => !(img.type === "featured" && img.tempUrl !== blobUrl)));
      setFormData((prev) => ({
        ...prev,
        featuredImage: blobUrl,
        featuredImageAlt: metadata.altText,
        featuredImageName: metadata.name,
      }));
    } else if (cropType === "editor" && editor) {
      editor.chain().focus().setImage({ src: blobUrl, alt: metadata.altText, title: metadata.name }).run();
    }
    setImageToCrop(null);
    setPendingImageFile(null);
  };

  const handleCropComplete = async (croppedImageUrl: string, metadata: ImageMetadata) => {
    setSelectionModalOpen(false);
    try {
      const croppedFile = await blobUrlToFile(croppedImageUrl, pendingImageFile?.name || "cropped.jpg");
      const blobUrl = URL.createObjectURL(croppedFile);
      const localImage: LocalImage = { tempUrl: blobUrl, file: croppedFile, metadata, type: cropType };
      setLocalImages((prev) => [...prev, localImage]);

      if (cropType === "featured") {
        setLocalImages((prev) => prev.filter((img) => !(img.type === "featured" && img.tempUrl !== blobUrl)));
        setFormData((prev) => ({
          ...prev,
          featuredImage: blobUrl,
          featuredImageAlt: metadata.altText,
          featuredImageName: metadata.name,
        }));
      } else if (cropType === "editor" && editor) {
        editor.chain().focus().setImage({ src: blobUrl, alt: metadata.altText, title: metadata.name }).run();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setImageToCrop(null);
      setPendingImageFile(null);
    }
  };

  const handleSelectionCancel = () => {
    setSelectionModalOpen(false);
    setImageToCrop(null);
    setPendingImageFile(null);
  };

  const handleImageEditSave = (metadata: { altText: string; title: string }) => {
    if (!editor || !editingImage) return;
    const { state } = editor;
    const { doc } = state;
    let imagePos: number | null = null;
    doc.descendants((node, pos) => {
      if (node.type.name === "image" && node.attrs.src === editingImage.src) {
        imagePos = pos;
        return false;
      }
    });

    if (imagePos !== null) {
      editor
        .chain()
        .focus()
        .setNodeSelection(imagePos)
        .updateAttributes("image", { alt: metadata.altText, title: metadata.title || metadata.altText })
        .run();
    }
    setEditingImage(null);
  };

  const handleCancel = () => {
    localImages.forEach((img) => {
      if (img.tempUrl.startsWith("blob:")) URL.revokeObjectURL(img.tempUrl);
    });
    onClose();
  };

  const handleInsertCode = (code: string, language: string) => {
    if (editor) {
      editor
        .chain()
        .focus()
        .insertContent(`<pre><code class="language-${language}">${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`)
        .run();
    }
    setShowCodeModal(false);
  };

  const handleSave = async () => {
    if (!formData.title) {
      alert("Title is required");
      return;
    }
    if (!isSlugUnique) {
      alert("Slug already taken.");
      return;
    }

    setSaving(true);
    showToast("Saving blog post...", "loading");

    try {
      const urlMap = new Map<string, string>();
      for (const img of localImages) {
        const uploadedUrl = await uploadToCloudinary(img.file);
        urlMap.set(img.tempUrl, uploadedUrl);
      }

      let finalContent = editor?.getHTML() || "";
      urlMap.forEach((uploadedUrl, blobUrl) => {
        finalContent = finalContent.replaceAll(blobUrl, uploadedUrl);
      });

      let finalFeaturedImage = formData.featuredImage;
      if (formData.featuredImage.startsWith("blob:")) {
        finalFeaturedImage = urlMap.get(formData.featuredImage) || "";
      }

      const blogData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        author: formData.author,
        category: formData.category === "Custom" ? formData.customCategory : formData.category,
        tags: tags,
        featuredImage: finalFeaturedImage,
        image: finalFeaturedImage,
        coverImage: finalFeaturedImage,
        featuredImageAlt: formData.featuredImageAlt,
        featuredImageName: formData.featuredImageName,
        status: formData.status,
        content: finalContent,
        readTime: editor ? calculateReadingTime(editor.getText()) : 5,
        updatedAt: serverTimestamp(),
        // Extra detail fields
        colabLink: colabLink || "",
        notebookLink: colabLink || "",
        githubLink: githubLink || "",
        codeLink: githubLink || "",
        failureModes: Number(failureModes) || 0,
        codeSnippets: Number(codeSnippets) || 0,
        runnableNotebooks: Number(runnableNotebooks) || 0,
        toc: tocInput.split(',').map(t => t.trim()).filter(Boolean),
        closingPoints: closingPoints.split('\n').map(l => l.trim()).filter(Boolean),
        ...(formData.status === "published" && !blog?.publishedAt && { publishedAt: serverTimestamp() }),
      };

      if (blog) {
        await updateDoc(doc(db, "blog-posts", blog.id), blogData);
        showToast("Blog post updated successfully! 🎉", "success");
      } else {
        await addDoc(collection(db, "blog-posts"), {
          ...blogData,
          createdAt: serverTimestamp(),
        });
        showToast("Blog post created successfully! 🎉", "success");
      }

      setTimeout(onSave, 1500);
    } catch (e: any) {
      showToast("Error saving: " + e.message, "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[80] flex items-center justify-center p-4">
      <div className="bg-paper border border-line rounded-2xl w-full max-w-7xl h-[95vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-line flex justify-between items-center bg-paper">
          <div>
            <h2 className="text-lg font-bold text-white">
              {blog ? "Edit Article" : "Create Article"}
            </h2>
            <p className="text-xs text-ink-soft">Configure parameters and content</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/[0.05] rounded-lg text-ink-soft hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-line px-6 bg-paper gap-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('meta')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer ${activeTab === 'meta' ? 'border-white text-white' : 'border-transparent text-ink-soft hover:text-white'}`}
          >
            Basic Metadata
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer ${activeTab === 'details' ? 'border-white text-white' : 'border-transparent text-ink-soft hover:text-white'}`}
          >
            Layout Sections (Advanced)
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer ${activeTab === 'content' ? 'border-white text-white' : 'border-transparent text-ink-soft hover:text-white'}`}
          >
            Rich Editor Content
          </button>
        </div>

        {/* Content panel */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'meta' && (
            <BlogMetadataForm
              formData={formData}
              setFormData={setFormData}
              tags={tags}
              setTags={setTags}
              tagInput={tagInput}
              setTagInput={setTagInput}
              useCustomSlug={useCustomSlug}
              setUseCustomSlug={setUseCustomSlug}
              isSlugUnique={isSlugUnique}
              slugChecking={slugChecking}
              uploadingFeaturedImage={false}
              onTitleChange={handleTitleChange}
              onFeaturedImageUpload={handleFeaturedImageUpload}
              onRemoveFeaturedImage={handleRemoveFeaturedImage}
              generateSlugRaw={generateSlugRaw}
              colabLink={colabLink}
              setColabLink={setColabLink}
              githubLink={githubLink}
              setGithubLink={setGithubLink}
              failureModes={failureModes}
              setFailureModes={setFailureModes}
              codeSnippets={codeSnippets}
              setCodeSnippets={setCodeSnippets}
              runnableNotebooks={runnableNotebooks}
              setRunnableNotebooks={setRunnableNotebooks}
            />
          )}

          {activeTab === 'details' && (
            <div className="space-y-6 text-white max-w-4xl font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">Google Colab Link</label>
                  <input 
                    type="text" 
                    value={colabLink} 
                    onChange={e => setColabLink(e.target.value)}
                    placeholder="https://colab.research.google.com/..." 
                    className="w-full bg-ink border border-line rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">GitHub Code Repository Link</label>
                  <input 
                    type="text" 
                    value={githubLink} 
                    onChange={e => setGithubLink(e.target.value)}
                    placeholder="https://github.com/..." 
                    className="w-full bg-ink border border-line rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">Failure Modes Count</label>
                  <input 
                    type="number" 
                    value={failureModes} 
                    onChange={e => setFailureModes(Number(e.target.value))}
                    placeholder="e.g. 5" 
                    className="w-full bg-ink border border-line rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">Code Snippets Count</label>
                  <input 
                    type="number" 
                    value={codeSnippets} 
                    onChange={e => setCodeSnippets(Number(e.target.value))}
                    placeholder="e.g. 3" 
                    className="w-full bg-ink border border-line rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">Runnable Notebooks Count</label>
                  <input 
                    type="number" 
                    value={runnableNotebooks} 
                    onChange={e => setRunnableNotebooks(Number(e.target.value))}
                    placeholder="e.g. 1" 
                    className="w-full bg-ink border border-line rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">Table of Contents Labels (Comma separated)</label>
                <input 
                  type="text" 
                  value={tocInput} 
                  onChange={e => setTocInput(e.target.value)}
                  placeholder="Retrieval Quality, Chunking Strategy, Hybrid Search, Evaluation" 
                  className="w-full bg-ink border border-line rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">Closing Takeaways (One point per line)</label>
                <textarea 
                  rows={4}
                  value={closingPoints} 
                  onChange={e => setClosingPoints(e.target.value)}
                  placeholder="Measure retrieval precision and recall in isolation before touching the model&#10;Chunk along document structure, not arbitrary character counts" 
                  className="w-full bg-ink border border-line rounded-lg p-4 text-xs text-white font-mono focus:outline-none focus:border-white leading-relaxed"
                />
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="border border-line rounded-xl overflow-hidden">
              <EditorToolbar
                editor={editor}
                uploadingImage={false}
                onImageUpload={handleEditorImageUpload}
                onLinkAdd={addLink}
                onCodeBlockClick={() => setShowCodeModal(true)}
              />
              <div className="p-4 bg-ink border-t border-line min-h-[400px] text-white overflow-x-auto">
                <EditorContent editor={editor} />
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="px-6 py-4 border-t border-line flex justify-end gap-3 bg-paper">
          <button onClick={onClose} className="px-5 py-2.5 border border-line rounded-lg hover:bg-white/[0.03] text-ink-soft text-sm font-medium transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving} className="px-8 py-2.5 bg-white hover:bg-gray-200 text-ink rounded-lg text-sm font-bold disabled:opacity-50 transition-colors">
            {saving ? "Saving..." : "Save Article"}
          </button>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      {selectionModalOpen && imageToCrop && pendingImageFile && (
        <ImageSelectionModal
          imageFile={pendingImageFile}
          imageUrl={imageToCrop}
          onCropComplete={handleCropComplete}
          onAddDirectly={handleAddDirectly}
          onCancel={handleSelectionCancel}
          defaultAspectRatio={cropType === "featured" ? 16 / 9 : undefined}
          type={cropType}
        />
      )}

      {showCodeModal && (
        <CodeBlockModal
          onInsert={handleInsertCode}
          onCancel={() => setShowCodeModal(false)}
          initialLanguage="python"
        />
      )}
    </div>
  );
}
