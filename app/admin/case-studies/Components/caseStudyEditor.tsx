"use client";

import { useState, useEffect, useRef } from "react";
import { X, RefreshCw, Plus, Trash2 } from "lucide-react";
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

import ImageSelectionModal, { ImageMetadata } from "@/app/admin/Blogs/Components/ImageSelectionModal";
import ImageEditModal from "@/app/admin/Blogs/Components/ImageEditModal";
import EditorToolbar from "@/app/admin/Blogs/Components/EditorToolbar";
import CaseStudyMetadataForm, { CaseStudyFormData, CATEGORIES } from "./CaseStudyMetadataForm";
import { CaseStudy } from "@/types/admin";

import {
  uploadToCloudinary,
  blobUrlToFile,
  deleteCloudinaryImage,
  extractImagesFromHTML,
} from "@/lib/cloudinary-utils";

const lowlight = createLowlight(common);

interface ApproachStep {
  n: string;
  title: string;
  desc: string;
}

interface TeamMember {
  initials: string;
  name: string;
  role: string;
}

interface RelatedCase {
  industry: string;
  title: string;
  result: string;
}

interface MetricItem {
  value: string;
  label: string;
}

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
      className={`fixed top-4 right-4 z-[100] flex items-center gap-3 p-4 rounded-lg border shadow-lg ${
        type === "success"
          ? "bg-green-50 border-green-200"
          : type === "error"
            ? "bg-red-550 border-red-200"
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

interface CaseStudyEditorModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onSave: () => void;
}

interface LocalImage {
  tempUrl: string;
  file: File;
  metadata: ImageMetadata;
  type: "featured" | "editor";
}

export default function CaseStudyEditorModal({
  caseStudy,
  onClose,
  onSave,
}: CaseStudyEditorModalProps) {
  const [formData, setFormData] = useState<CaseStudyFormData>({
    title: caseStudy?.title || "",
    slug: caseStudy?.slug || "",
    excerpt: caseStudy?.excerpt || "",
    clientName: caseStudy?.clientName || "",
    category: caseStudy?.category || "Technology",
    customCategory: "",
    featuredImage: caseStudy?.featuredImage || "",
    featuredImageAlt: caseStudy?.featuredImageAlt || "",
    featuredImageName: caseStudy?.featuredImageName || "",
    status: (caseStudy?.status || "draft") as "draft" | "published",
  });

  const [tags, setTags] = useState<string[]>(caseStudy?.tags || []);
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

  const originalFeaturedImage = useRef<string>(caseStudy?.featuredImage || "");
  const originalContentImages = useRef<string[]>([]);

  // Tab Manager
  const [activeTab, setActiveTab] = useState<'meta' | 'details' | 'content'>('meta');

  // Detailed Section fields
  const [challenge, setChallenge] = useState("");
  const [outcome, setOutcome] = useState("");
  const [visualType, setVisualType] = useState<"dashboard" | "workflow" | "document" | "map">("dashboard");
  const [timeline, setTimeline] = useState("12 Weeks");
  const [teamSize, setTeamSize] = useState("3 Engineers");
  const [lessonsInput, setLessonsInput] = useState("");
  const [clientQuoteText, setClientQuoteText] = useState("");
  const [clientQuoteAuthor, setClientQuoteAuthor] = useState("");
  const [clientQuoteRole, setClientQuoteRole] = useState("");
  const [techStackInput, setTechStackInput] = useState("");

  const [approach, setApproach] = useState<ApproachStep[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [relatedCases, setRelatedCases] = useState<RelatedCase[]>([]);
  const [metrics, setMetrics] = useState<MetricItem[]>([]);

  useEffect(() => {
    if (caseStudy) {
      if (caseStudy.category && !CATEGORIES.includes(caseStudy.category)) {
        setFormData((prev) => ({
          ...prev,
          category: "Custom",
          customCategory: caseStudy.category,
        }));
      }

      if (caseStudy.content) {
        originalContentImages.current = extractImagesFromHTML(caseStudy.content);
      }

      // Load extra detail fields
      const anyCS = caseStudy as any;
      if (anyCS.challenge) setChallenge(anyCS.challenge);
      if (anyCS.outcome) setOutcome(anyCS.outcome);
      if (anyCS.visualType) setVisualType(anyCS.visualType);
      if (anyCS.timeline) setTimeline(anyCS.timeline);
      if (anyCS.teamSize) setTeamSize(anyCS.teamSize);
      if (anyCS.lessons) setLessonsInput(Array.isArray(anyCS.lessons) ? anyCS.lessons.join('\n') : anyCS.lessons);
      if (anyCS.clientQuote) {
        setClientQuoteText(anyCS.clientQuote.text || "");
        setClientQuoteAuthor(anyCS.clientQuote.author || "");
        setClientQuoteRole(anyCS.clientQuote.role || "");
      }
      if (anyCS.stack) {
        setTechStackInput(Array.isArray(anyCS.stack) ? anyCS.stack.join(', ') : anyCS.stack);
      }
      if (anyCS.approach) setApproach(anyCS.approach);
      if (anyCS.team) setTeam(anyCS.team);
      if (anyCS.relatedCases) setRelatedCases(anyCS.relatedCases);
      if (anyCS.metrics) setMetrics(anyCS.metrics);
    }
  }, [caseStudy]);

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
    content: caseStudy?.content || "<p>Start writing your Case Study...</p>",
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
      const q = query(collection(db, "case-studies"), where("slug", "==", slugToCheck));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setIsSlugUnique(true);
      } else {
        const isCurrentDoc = caseStudy && snapshot.docs[0].id === caseStudy.id;
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

  // Approach steps manager
  const handleApproachChange = (index: number, key: keyof ApproachStep, value: string) => {
    const updated = [...approach];
    updated[index] = { ...updated[index], [key]: value };
    setApproach(updated);
  };
  const addApproachStep = () => setApproach([...approach, { n: (approach.length + 1).toString(), title: '', desc: '' }]);
  const removeApproachStep = (index: number) => setApproach(approach.filter((_, i) => i !== index));

  // Team list manager
  const handleTeamChange = (index: number, key: keyof TeamMember, value: string) => {
    const updated = [...team];
    updated[index] = { ...updated[index], [key]: value };
    setTeam(updated);
  };
  const addTeamMember = () => setTeam([...team, { initials: '', name: '', role: '' }]);
  const removeTeamMember = (index: number) => setTeam(team.filter((_, i) => i !== index));

  // Related Cases manager
  const handleRelatedChange = (index: number, key: keyof RelatedCase, value: string) => {
    const updated = [...relatedCases];
    updated[index] = { ...updated[index], [key]: value };
    setRelatedCases(updated);
  };
  const addRelatedCase = () => setRelatedCases([...relatedCases, { industry: '', title: '', result: '' }]);
  const removeRelatedCase = (index: number) => setRelatedCases(relatedCases.filter((_, i) => i !== index));

  // Metrics list manager
  const handleMetricChange = (index: number, key: keyof MetricItem, value: string) => {
    const updated = [...metrics];
    updated[index] = { ...updated[index], [key]: value };
    setMetrics(updated);
  };
  const addMetric = () => setMetrics([...metrics, { value: '', label: '' }]);
  const removeMetric = (index: number) => setMetrics(metrics.filter((_, i) => i !== index));

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
    showToast("Saving case study...", "loading");

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

      const caseStudyData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        clientName: formData.clientName,
        category: formData.category === "Custom" ? formData.customCategory : formData.category,
        tags: tags,
        featuredImage: finalFeaturedImage,
        featuredImageAlt: formData.featuredImageAlt,
        featuredImageName: formData.featuredImageName,
        status: formData.status,
        content: finalContent,
        readTime: editor ? calculateReadingTime(editor.getText()) : 5,
        updatedAt: serverTimestamp(),
        // Extra detail fields
        challenge,
        outcome,
        visualType,
        timeline,
        teamSize,
        approach,
        lessons: lessonsInput.split('\n').map(l => l.trim()).filter(Boolean),
        clientQuote: {
          text: clientQuoteText,
          author: clientQuoteAuthor,
          role: clientQuoteRole
        },
        stack: techStackInput.split(',').map(s => s.trim()).filter(Boolean),
        team,
        relatedCases,
        metrics
      };

      if (caseStudy) {
        await updateDoc(doc(db, "case-studies", caseStudy.id), caseStudyData);
        showToast("Case Study updated! 🎉", "success");
      } else {
        await addDoc(collection(db, "case-studies"), {
          ...caseStudyData,
          createdAt: serverTimestamp(),
        });
        showToast("Case Study created! 🎉", "success");
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
              {caseStudy ? "Edit Case Study" : "Create Case Study"}
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
            <CaseStudyMetadataForm
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
          )}

          {activeTab === 'details' && (
            <div className="space-y-6 text-white max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">Visual Graphic Type</label>
                  <select 
                    value={visualType} 
                    onChange={e => setVisualType(e.target.value as any)}
                    className="w-full bg-ink border border-line rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                  >
                    <option value="dashboard">Dashboard Overview</option>
                    <option value="workflow">Classifier / Agent Workflow</option>
                    <option value="document">OCR Document Extraction</option>
                    <option value="map">Route Shipping Map</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">Timeline</label>
                  <input 
                    type="text" 
                    value={timeline} 
                    onChange={e => setTimeline(e.target.value)}
                    placeholder="e.g. 12 Weeks" 
                    className="w-full bg-ink border border-line rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">Team Size</label>
                  <input 
                    type="text" 
                    value={teamSize} 
                    onChange={e => setTeamSize(e.target.value)}
                    placeholder="e.g. 3 Engineers" 
                    className="w-full bg-ink border border-line rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">Core Technologies (Comma separated)</label>
                <input 
                  type="text" 
                  value={techStackInput} 
                  onChange={e => setTechStackInput(e.target.value)}
                  placeholder="LangChain, Pinecone, FastAPI, Docker, AWS" 
                  className="w-full bg-ink border border-line rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">The Challenge</label>
                <textarea 
                  rows={4}
                  value={challenge} 
                  onChange={e => setChallenge(e.target.value)}
                  placeholder="Describe the client's problem, constraints, and starting context..." 
                  className="w-full bg-ink border border-line rounded-lg p-4 text-xs text-white focus:outline-none focus:border-white leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">Outcomes & Impact</label>
                <textarea 
                  rows={4}
                  value={outcome} 
                  onChange={e => setOutcome(e.target.value)}
                  placeholder="Describe the final results, metrics improvements, and business value generated..." 
                  className="w-full bg-ink border border-line rounded-lg p-4 text-xs text-white focus:outline-none focus:border-white leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">Key Lessons Learned (Enter one per line)</label>
                <textarea 
                  rows={3}
                  value={lessonsInput} 
                  onChange={e => setLessonsInput(e.target.value)}
                  placeholder="Vector search alone is insufficient for structured customs queries&#10;Chunking must align with layout structures" 
                  className="w-full bg-ink border border-line rounded-lg p-4 text-xs text-white font-mono focus:outline-none focus:border-white leading-relaxed"
                />
              </div>

              {/* Client Quote Box */}
              <div className="border border-line rounded-xl p-5 bg-ink/40 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-ink-soft">Client Quote</h3>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-ink-soft mb-1">Quote Text</label>
                  <textarea 
                    rows={2}
                    value={clientQuoteText} 
                    onChange={e => setClientQuoteText(e.target.value)}
                    placeholder="The custom search engine built by Botmartz changed how our operations team works..." 
                    className="w-full bg-ink border border-line rounded-lg p-3 text-xs text-white focus:outline-none focus:border-white leading-relaxed"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-ink-soft mb-1">Quote Author</label>
                    <input 
                      type="text" 
                      value={clientQuoteAuthor} 
                      onChange={e => setClientQuoteAuthor(e.target.value)}
                      placeholder="e.g. Markus Vance" 
                      className="w-full bg-ink border border-line rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-ink-soft mb-1">Author Role / Designation</label>
                    <input 
                      type="text" 
                      value={clientQuoteRole} 
                      onChange={e => setClientQuoteRole(e.target.value)}
                      placeholder="e.g. VP of Operations" 
                      className="w-full bg-ink border border-line rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                    />
                  </div>
                </div>
              </div>

              {/* Metrics list manager */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft">Performance Metrics</label>
                  <button onClick={addMetric} className="text-xs text-[#00B8F0] hover:underline flex items-center gap-1"><Plus size={14} /> Add Metric</button>
                </div>
                {metrics.length === 0 ? (
                  <div className="text-xs text-ink-soft bg-ink/40 p-3 rounded-lg border border-line border-dashed text-center">No custom metrics. Standard default metrics will be loaded.</div>
                ) : (
                  <div className="space-y-2">
                    {metrics.map((m, idx) => (
                      <div key={idx} className="flex gap-3 bg-ink/50 p-2.5 rounded-lg border border-line items-center">
                        <input className="w-24 bg-paper border border-line rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-white" placeholder="Value (70%)" value={m.value} onChange={e => handleMetricChange(idx, 'value', e.target.value)} />
                        <input className="flex-1 bg-paper border border-line rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-white" placeholder="Metric label (Faster retrieval)" value={m.label} onChange={e => handleMetricChange(idx, 'label', e.target.value)} />
                        <button onClick={() => removeMetric(idx)} className="p-1.5 text-red-500 hover:text-red-400 bg-paper border border-line rounded"><Trash2 size={13} /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Approach list manager */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft">Approach Steps</label>
                  <button onClick={addApproachStep} className="text-xs text-[#00B8F0] hover:underline flex items-center gap-1"><Plus size={14} /> Add Step</button>
                </div>
                {approach.length === 0 ? (
                  <div className="text-xs text-ink-soft bg-ink/40 p-3 rounded-lg border border-line border-dashed text-center">No custom approach steps. Standard default steps will be loaded.</div>
                ) : (
                  <div className="space-y-2">
                    {approach.map((step, idx) => (
                      <div key={idx} className="flex gap-3 bg-ink/50 p-3 rounded-lg border border-line items-start">
                        <input className="w-10 bg-paper border border-line rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-white text-center shrink-0" placeholder="#" value={step.n} onChange={e => handleApproachChange(idx, 'n', e.target.value)} />
                        <input className="w-1/3 bg-paper border border-line rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white shrink-0" placeholder="Step Title" value={step.title} onChange={e => handleApproachChange(idx, 'title', e.target.value)} />
                        <input className="flex-1 bg-paper border border-line rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white" placeholder="Step description details" value={step.desc} onChange={e => handleApproachChange(idx, 'desc', e.target.value)} />
                        <button onClick={() => removeApproachStep(idx)} className="p-1.5 text-red-500 hover:text-red-400 bg-paper border border-line rounded"><Trash2 size={13} /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Project team manager */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft">Project Team Members</label>
                  <button onClick={addTeamMember} className="text-xs text-[#00B8F0] hover:underline flex items-center gap-1"><Plus size={14} /> Add Team Member</button>
                </div>
                {team.length === 0 ? (
                  <div className="text-xs text-ink-soft bg-ink/40 p-3 rounded-lg border border-line border-dashed text-center">No custom team. Standard default team will be loaded.</div>
                ) : (
                  <div className="space-y-2">
                    {team.map((t, idx) => (
                      <div key={idx} className="flex gap-3 bg-ink/50 p-2.5 rounded-lg border border-line items-center">
                        <input className="w-16 bg-paper border border-line rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-white text-center shrink-0" placeholder="HS" value={t.initials} onChange={e => handleTeamChange(idx, 'initials', e.target.value)} />
                        <input className="w-1/3 bg-paper border border-line rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white shrink-0" placeholder="Harsh Sahu" value={t.name} onChange={e => handleTeamChange(idx, 'name', e.target.value)} />
                        <input className="flex-1 bg-paper border border-line rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white" placeholder="AI Engineer" value={t.role} onChange={e => handleTeamChange(idx, 'role', e.target.value)} />
                        <button onClick={() => removeTeamMember(idx)} className="p-1.5 text-red-500 hover:text-red-400 bg-paper border border-line rounded"><Trash2 size={13} /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Related case studies manager */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft">Related Case Studies</label>
                  <button onClick={addRelatedCase} className="text-xs text-[#00B8F0] hover:underline flex items-center gap-1"><Plus size={14} /> Add Related Case</button>
                </div>
                {relatedCases.length === 0 ? (
                  <div className="text-xs text-ink-soft bg-ink/40 p-3 rounded-lg border border-line border-dashed text-center">No custom related cases. Standard default cases will be loaded.</div>
                ) : (
                  <div className="space-y-2">
                    {relatedCases.map((rc, idx) => (
                      <div key={idx} className="flex gap-3 bg-ink/50 p-2.5 rounded-lg border border-line items-center">
                        <input className="w-1/4 bg-paper border border-line rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-white shrink-0" placeholder="SaaS & Support" value={rc.industry} onChange={e => handleRelatedChange(idx, 'industry', e.target.value)} />
                        <input className="flex-1 bg-paper border border-line rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white" placeholder="Case Study Title" value={rc.title} onChange={e => handleRelatedChange(idx, 'title', e.target.value)} />
                        <input className="w-1/4 bg-paper border border-line rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-white shrink-0" placeholder="45% Auto-Resolution" value={rc.result} onChange={e => handleRelatedChange(idx, 'result', e.target.value)} />
                        <button onClick={() => removeRelatedCase(idx)} className="p-1.5 text-red-500 hover:text-red-400 bg-paper border border-line rounded"><Trash2 size={13} /></button>
                      </div>
                    ))}
                  </div>
                )}
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
            {saving ? "Saving..." : "Save Case Study"}
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
          onCancel={() => setSelectionModalOpen(false)}
          defaultAspectRatio={cropType === "featured" ? 16 / 9 : undefined}
          type={cropType}
        />
      )}

      {showCodeModal && (
        <CodeBlockModal
          onInsert={(code, language) => {
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
          }}
          onCancel={() => setShowCodeModal(false)}
        />
      )}
    </div>
  );
}
