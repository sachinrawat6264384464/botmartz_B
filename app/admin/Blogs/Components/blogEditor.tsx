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

// Add this Toast component after imports
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
// ============================================
// CUSTOM EXTENSIONS
// ============================================

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

// ============================================
// HELPER FUNCTIONS
// ============================================

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

// ============================================
// TYPES
// ============================================

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

// Local image tracking
interface LocalImage {
  tempUrl: string; // blob URL for preview
  file: File; // actual file
  metadata: ImageMetadata;
  type: "featured" | "editor";
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function BlogEditorModal({
  blog,
  onClose,
  onSave,
}: BlogEditorModalProps) {
  // ==========================================
  // STATE
  // ==========================================

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
  // Image selection/crop state
  const [selectionModalOpen, setSelectionModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [cropType, setCropType] = useState<"featured" | "editor">("featured");
  const [pendingImageFile, setPendingImageFile] = useState<File | null>(null);
  const [showCodeModal, setShowCodeModal] = useState(false);
  // Image edit state
  const [editingImage, setEditingImage] = useState<{
    src: string;
    alt: string;
    title: string;
  } | null>(null);

  // Local images storage (NEW)
  const [localImages, setLocalImages] = useState<LocalImage[]>([]);

  // Track original images for cleanup
  const originalFeaturedImage = useRef<string>(blog?.featuredImage || "");
  const originalContentImages = useRef<string[]>([]);

  // ==========================================
  // EFFECTS
  // ==========================================

  useEffect(() => {
    if (blog?.category && !CATEGORIES.includes(blog.category)) {
      setFormData((prev) => ({
        ...prev,
        category: "Custom",
        customCategory: blog.category,
      }));
    }

    if (blog?.content) {
      originalContentImages.current = extractImagesFromHTML(blog.content);
    }
  }, [blog]);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      localImages.forEach((img) => {
        if (img.tempUrl.startsWith("blob:")) {
          URL.revokeObjectURL(img.tempUrl);
        }
      });
    };
  }, [localImages]);

  // ==========================================
  // TIPTAP EDITOR SETUP
  // ==========================================

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false, // Disable default code block
        bulletList: {
          HTMLAttributes: { class: "list-disc pl-6 my-6 space-y-3" },
        },
        orderedList: {
          HTMLAttributes: { class: "list-decimal pl-6 my-6 space-y-3" },
        },
        listItem: {
          HTMLAttributes: { class: "text-gray-900 text-lg leading-relaxed" },
        },
      }),
     CodeBlockLowlight.configure({
  lowlight,
  HTMLAttributes: {
    class:
      "rounded-lg border border-gray-300 bg-gray-900 text-gray-100 p-4 my-6 overflow-x-auto font-mono text-sm",
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
      TableRow.configure({
        HTMLAttributes: {
          style: "border: 2px solid #000000;",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          style:
            "border: 2px solid #000000; padding: 12px; background-color: #755eb1; color: white; font-weight: bold;",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          style: "border: 2px solid #000000; padding: 12px; min-width: 100px;",
        },
      }),
      Image.extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            width: {
              default: null,
              parseHTML: (element) => element.getAttribute("width"),
              renderHTML: (attributes) => {
                if (!attributes.width) return {};
                return { width: attributes.width };
              },
            },
            height: {
              default: null,
              parseHTML: (element) => element.getAttribute("height"),
              renderHTML: (attributes) => {
                if (!attributes.height) return {};
                return { height: attributes.height };
              },
            },
            loading: {
              default: "eager",
            },
          };
        },
      }).configure({
        HTMLAttributes: {
          class:
            "max-w-full h-auto rounded-lg my-8 shadow-md cursor-pointer hover:shadow-xl transition-shadow",
        },
        inline: false,
        allowBase64: true, // Allow base64 for local preview
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[#755eb1] underline hover:text-[#6b54a5] font-medium",
        },
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
        class:
          "prose prose-lg max-w-none focus:outline-none min-h-[400px] px-4 py-3 text-gray-900 prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1 prose-code:rounded",
      },
      handleKeyDown: (view, event) => {
        if (event.key === "Backspace") {
          const { state } = view;
          const { selection } = state;
          const { $from } = selection;

          if ($from.node(-1)?.type.name === "table") {
            const cell = $from.node(0);
            if (cell && cell.textContent === "") {
              editor?.chain().focus().deleteTable().run();
              return true;
            }
          }
        }
        return false;
      },
      handleClickOn: (view, pos, node, nodePos, event) => {
        if (node.type.name === "image") {
          event.preventDefault();
          const attrs = node.attrs;
          setEditingImage({
            src: attrs.src || "",
            alt: attrs.alt || "",
            title: attrs.title || "",
          });
          return true;
        }
        return false;
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    const makeTablesAccessible = () => {
      const editorElement = document.querySelector(".ProseMirror");
      if (!editorElement) return;

      const tables = editorElement.querySelectorAll("table");
      tables.forEach((table) => {
        if (table.scrollWidth > table.clientWidth) {
          table.setAttribute("tabindex", "0");
          table.setAttribute("role", "region");
          table.setAttribute(
            "aria-label",
            "Scrollable data table - use arrow keys to scroll",
          );
        }
      });
    };

    makeTablesAccessible();

    const observer = new MutationObserver(makeTablesAccessible);
    const editorElement = document.querySelector(".ProseMirror");

    if (editorElement) {
      observer.observe(editorElement, {
        childList: true,
        subtree: true,
      });
    }

    return () => observer.disconnect();
  }, [editor]);

  // ==========================================
  // HANDLERS
  // ==========================================

  // Helper function to show toast
  const showToast = (
    message: string,
    type: "success" | "error" | "loading",
  ) => {
    setToast({ message, type });
    if (type !== "loading") {
      setTimeout(() => setToast(null), 5000);
    }
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => {
      const newState = { ...prev, title };
      if (!useCustomSlug) {
        newState.slug = generateSlugRaw(title);
      }
      return newState;
    });
  };

  const checkSlugUniqueness = async (slugToCheck: string) => {
    if (!slugToCheck) return;
    setSlugChecking(true);
    try {
      const q = query(
        collection(db, "blog-posts"),
        where("slug", "==", slugToCheck),
      );
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

  // Featured Image Upload (LOCAL STORAGE)
  const handleFeaturedImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
      alert("Please upload a valid image under 5MB");
      return;
    }

    setPendingImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageToCrop(e.target?.result as string);
      setCropType("featured");
      setSelectionModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  // Editor Image Upload (LOCAL STORAGE)
  const handleEditorImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
      alert("Please upload a valid image under 5MB");
      return;
    }

    setPendingImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageToCrop(e.target?.result as string);
      setCropType("editor");
      setSelectionModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  // Add image directly (LOCAL - NO UPLOAD YET)
  const handleAddDirectly = async (
    imageUrl: string,
    metadata: ImageMetadata,
  ) => {
    setSelectionModalOpen(false);

    if (!pendingImageFile) {
      alert("No file selected");
      return;
    }

    // Create blob URL for preview
    const blobUrl = URL.createObjectURL(pendingImageFile);

    // Store locally
    const localImage: LocalImage = {
      tempUrl: blobUrl,
      file: pendingImageFile,
      metadata,
      type: cropType,
    };

    setLocalImages((prev) => [...prev, localImage]);

    if (cropType === "featured") {
      // Remove old featured image from local storage if it was added this session
      setLocalImages((prev) =>
        prev.filter(
          (img) => !(img.type === "featured" && img.tempUrl !== blobUrl),
        ),
      );

      setFormData((prev) => ({
        ...prev,
        featuredImage: blobUrl,
        featuredImageAlt: metadata.altText,
        featuredImageName: metadata.name,
      }));
    } else if (cropType === "editor" && editor) {
      const img = new window.Image();
      img.onload = () => {
        editor
          .chain()
          .focus()
          .setImage({
            src: blobUrl,
            alt: metadata.altText,
            title: metadata.name || metadata.altText,
            width: img.naturalWidth,
            height: img.naturalHeight,
          })
          .run();
      };
      img.src = blobUrl;
    }

    setImageToCrop(null);
    setPendingImageFile(null);
  };

  // Handle cropped image (LOCAL - NO UPLOAD YET)
  const handleCropComplete = async (
    croppedImageUrl: string,
    metadata: ImageMetadata,
  ) => {
    setSelectionModalOpen(false);

    try {
      const croppedFile = await blobUrlToFile(
        croppedImageUrl,
        pendingImageFile?.name || "cropped-image.jpg",
      );

      // Create blob URL for preview
      const blobUrl = URL.createObjectURL(croppedFile);

      // Store locally
      const localImage: LocalImage = {
        tempUrl: blobUrl,
        file: croppedFile,
        metadata,
        type: cropType,
      };

      setLocalImages((prev) => [...prev, localImage]);

      if (cropType === "featured") {
        // Remove old featured image from local storage
        setLocalImages((prev) =>
          prev.filter(
            (img) => !(img.type === "featured" && img.tempUrl !== blobUrl),
          ),
        );

        setFormData((prev) => ({
          ...prev,
          featuredImage: blobUrl,
          featuredImageAlt: metadata.altText,
          featuredImageName: metadata.name,
        }));
      } else if (cropType === "editor" && editor) {
        const img = new window.Image();
        img.onload = () => {
          editor
            .chain()
            .focus()
            .setImage({
              src: blobUrl,
              alt: metadata.altText,
              title: metadata.name || metadata.altText,
              width: img.naturalWidth,
              height: img.naturalHeight,
            })
            .run();
        };
        img.src = blobUrl;
      }
    } catch (error) {
      console.error("Error processing cropped image:", error);
      alert("Failed to process cropped image. Please try again.");
    } finally {
      setImageToCrop(null);
      setPendingImageFile(null);
      URL.revokeObjectURL(croppedImageUrl);
    }
  };

  const handleSelectionCancel = async () => {
    setSelectionModalOpen(false);
    setImageToCrop(null);
    setPendingImageFile(null);
  };

  const handleImageEditSave = (metadata: {
    altText: string;
    title: string;
  }) => {
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
        .updateAttributes("image", {
          alt: metadata.altText,
          title: metadata.title || metadata.altText,
        })
        .run();

      // Update local image metadata if it's a blob URL
      if (editingImage.src.startsWith("blob:")) {
        setLocalImages((prev) =>
          prev.map((img) =>
            img.tempUrl === editingImage.src
              ? {
                  ...img,
                  metadata: {
                    ...img.metadata,
                    altText: metadata.altText,
                    name: metadata.title,
                  },
                }
              : img,
          ),
        );
      }
    }

    setEditingImage(null);
  };

  const handleRemoveFeaturedImage = () => {
    const imageToRemove = formData.featuredImage;

    setFormData((prev) => ({
      ...prev,
      featuredImage: "",
      featuredImageAlt: "",
      featuredImageName: "",
    }));

    // Remove from local images
    if (imageToRemove.startsWith("blob:")) {
      setLocalImages((prev) =>
        prev.filter((img) => img.tempUrl !== imageToRemove),
      );
      URL.revokeObjectURL(imageToRemove);
    }
  };

  const handleCancel = () => {
    // Cleanup all blob URLs
    localImages.forEach((img) => {
      if (img.tempUrl.startsWith("blob:")) {
        URL.revokeObjectURL(img.tempUrl);
      }
    });

    onClose();
  };

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url && editor) editor.chain().focus().setLink({ href: url }).run();
  };
const handleInsertCode = (code: string, language: string) => {
  if (editor) {
    editor
      .chain()
      .focus()
      .insertContent(
        `<pre><code class="language-${language}">${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`
      )
      .run();
  }
  setShowCodeModal(false);
};
  // SAVE HANDLER - Upload all images at once
  const handleSave = async () => {
    if (!formData.title || !editor?.getHTML()) {
      alert("Title and content are required");
      return;
    }

    if (!isSlugUnique) {
      alert("This URL slug is already taken. Please choose another.");
      return;
    }

    if (formData.category === "Custom" && !formData.customCategory) {
      alert("Please enter a custom category name");
      return;
    }

    if (formData.featuredImage && !formData.featuredImageAlt) {
      alert(
        "⚠️ Featured image is missing alt text. Please provide it for accessibility.",
      );
      return;
    }

    const currentContent = editor.getHTML();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = currentContent;
    const contentImages = tempDiv.querySelectorAll("img");

    const imagesWithoutAlt: string[] = [];
    contentImages.forEach((img) => {
      const alt = img.getAttribute("alt");
      const src = img.getAttribute("src");
      if (!alt || alt.trim() === "") {
        const urlPreview = src
          ? src.startsWith("blob:")
            ? "New image"
            : new URL(src).pathname.split("/").pop()?.substring(0, 30)
          : "Unknown";
        imagesWithoutAlt.push(urlPreview || "Unknown image");
      }
    });

    if (imagesWithoutAlt.length > 0) {
      alert(
        `⚠️ ${imagesWithoutAlt.length} image(s) in content are missing alt text:\n\n${imagesWithoutAlt.join("\n")}\n\nAll images must have alt text for accessibility.\n\nClick on images in the editor to add alt text.`,
      );
      return;
    }

    setSaving(true);
    const imageCount = localImages.length;
    showToast(
      imageCount > 0
        ? `Uploading ${imageCount} image${imageCount !== 1 ? "s" : ""}...`
        : "Saving blog post...",
      "loading",
    );
    try {
      // Map blob URLs to uploaded URLs
      const urlMap = new Map<string, string>();

      // Upload all local images
      for (const localImage of localImages) {
        try {
          const uploadedUrl = await uploadToCloudinary(localImage.file);
          urlMap.set(localImage.tempUrl, uploadedUrl);
        } catch (error) {
          console.error("Failed to upload image:", error);
          throw new Error(`Failed to upload ${localImage.metadata.name}`);
        }
      }

      // Replace blob URLs with uploaded URLs in content
      let finalContent = currentContent;
      urlMap.forEach((uploadedUrl, blobUrl) => {
        finalContent = finalContent.replaceAll(blobUrl, uploadedUrl);
      });

      // Replace featured image URL if needed
      let finalFeaturedImage = formData.featuredImage;
      if (formData.featuredImage.startsWith("blob:")) {
        finalFeaturedImage = urlMap.get(formData.featuredImage) || "";
      }

      const tagsArray = tags;
      const finalCategory =
        formData.category === "Custom"
          ? formData.customCategory
          : formData.category;
      const readTime = calculateReadingTime(editor.getText());

      const blogData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        author: formData.author,
        category: finalCategory,
        tags: tagsArray,
        featuredImage: finalFeaturedImage,
        featuredImageAlt: formData.featuredImageAlt,
        featuredImageName: formData.featuredImageName,
        status: formData.status,
        content: finalContent,
        readTime: readTime,
        updatedAt: serverTimestamp(),
        ...(formData.status === "published" &&
          !blog?.publishedAt && { publishedAt: serverTimestamp() }),
      };

      if (blog) {
        // Cleanup old images
        if (
          originalFeaturedImage.current &&
          originalFeaturedImage.current !== finalFeaturedImage &&
          finalFeaturedImage
        ) {
          deleteCloudinaryImage(originalFeaturedImage.current).catch((err) =>
            console.error("Failed to cleanup old featured image:", err),
          );
        }

        const currentContentImages = extractImagesFromHTML(finalContent);
        const unusedImages = originalContentImages.current.filter(
          (img) =>
            !currentContentImages.includes(img) && img !== finalFeaturedImage,
        );

        if (unusedImages.length > 0) {
          Promise.all(
            unusedImages.map((img) => deleteCloudinaryImage(img)),
          ).catch((err) =>
            console.error("Failed to cleanup unused images:", err),
          );
        }

        await updateDoc(doc(db, "blog-posts", blog.id), blogData);
        showToast("Blog post updated successfully! 🎉", "success");
      } else {
        await addDoc(collection(db, "blog-posts"), {
          ...blogData,
          createdAt: serverTimestamp(),
        });
        showToast("Blog post created successfully! 🎉", "success");
      }

      // Cleanup blob URLs
      localImages.forEach((img) => {
        if (img.tempUrl.startsWith("blob:")) {
          URL.revokeObjectURL(img.tempUrl);
        }
      });

      setTimeout(() => {
        onSave();
      }, 1500);
    } catch (error) {
      console.error("Error saving blog:", error);
      showToast(
        "Failed to save blog post: " + (error as Error).message,
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // RENDER
  // ==========================================

  if (!editor) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-lg w-full max-w-6xl my-8 shadow-2xl">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10 rounded-t-lg">
            <h2 className="text-xl font-bold text-gray-900">
              {blog ? "Edit Blog Post" : "Create New Blog Post"}
            </h2>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors"
              aria-label="Close editor"
            >
              <X size={24} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="px-6 py-6 space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto">
            {/* Loading Overlay */}

            {/* Metadata Form Component */}
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
            />

            <hr className="border-gray-200" />

            {/* Editor Area */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Content *
                </label>
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5">
                  <p className="text-xs font-medium text-blue-900">
                    💡 Click images to edit alt text
                    {localImages.length > 0 && !saving && (
                      <>
                        {" "}
                        • {localImages.length} image
                        {localImages.length !== 1 ? "s" : ""} ready to upload
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Editor Toolbar Component */}
              <EditorToolbar
                editor={editor}
                uploadingImage={false}
                onImageUpload={handleEditorImageUpload}
                onLinkAdd={addLink}
                onCodeBlockClick={() => setShowCodeModal(true)}
              />

              {/* Editor Input */}
              <div className="border border-t-0 border-gray-300 rounded-b-lg bg-white min-h-[400px] overflow-x-auto">
                <EditorContent editor={editor} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3 bg-gray-50 rounded-b-lg">
            <div className="text-sm text-gray-600">
              {localImages.length > 0 && (
                <p className="font-medium">
                  {localImages.length} image
                  {localImages.length !== 1 ? "s" : ""} will be uploaded on save
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 text-sm font-medium rounded-lg transition-colors border border-gray-300"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !isSlugUnique}
                className="px-8 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                type="button"
              >
                {saving ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    Saving & Uploading...
                  </>
                ) : blog ? (
                  "Update Post"
                ) : (
                  "Create Post"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Selection Modal */}
      {selectionModalOpen && imageToCrop && pendingImageFile && (
        <ImageSelectionModal
          imageFile={pendingImageFile}
          imageUrl={imageToCrop}
          onAddDirectly={handleAddDirectly}
          onCropComplete={handleCropComplete}
          onCancel={handleSelectionCancel}
          defaultAspectRatio={cropType === "featured" ? 16 / 9 : undefined}
          type={cropType}
        />
      )}
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {showCodeModal && (
        <CodeBlockModal
          onInsert={handleInsertCode}
          onCancel={() => setShowCodeModal(false)}
        />
      )}

      {/* Image Edit Modal */}
      {editingImage && (
        <ImageEditModal
          imageUrl={editingImage.src}
          currentAlt={editingImage.alt}
          currentTitle={editingImage.title}
          onSave={handleImageEditSave}
          onCancel={() => setEditingImage(null)}
        />
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
