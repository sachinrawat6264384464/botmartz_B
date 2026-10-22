"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  AlertCircle,
  Code,
  Terminal,
  Share2,
  Heart,
  Eye,
  Check,
  Copy,
  ArrowUp,
  Github,
  Sparkles,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import FloatingSideBar from "./_components/FloatingSideBar";
import SchemaMarkup from "@/app/_components/SchemaMarkup";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: any;
  category: string;
  tags?: string[];
  featuredImage?: string;
  featuredImageAlt?: string;
  image?: string;
  coverImage?: string;
  createdAt?: string;
  publishedAt?: string;
  updatedAt?: string;
  likes?: number;
  views?: number;
  authorId?: string;
  authorPhotoURL?: string;
  authorImage?: string;
  colabLink?: string;
  notebookLink?: string;
  githubLink?: string;
  codeLink?: string;
  readTime?: number;
  failureModes?: number;
  codeSnippets?: number;
  runnableNotebooks?: number;
  toc?: string[];
}

interface InsightsDetailClientProps {
  post: BlogPost;
  initialRelated?: any[];
}

function TwitterXIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18.9 3H21l-4.58 5.24L22 21h-4.4l-3.45-4.52L10.2 21H8.1l4.9-5.6L2 3h4.5l3.12 4.1L13.5 3h5.4Z" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.2c0-.9.3-1.5 1.6-1.5h1.3V5c-.2 0-.9-.1-1.8-.1-2.2 0-3.6 1.3-3.6 3.8V11H9v3h2.2v7h2.3Z" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.2 8.6a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4ZM4.8 19.5h2.8v-9H4.8v9Zm7.2 0h2.8v-4.8c0-1.3.5-2.2 1.8-2.2s1.7 1 1.7 2.3v4.7H21v-5.2c0-2.8-1.5-4.1-3.6-4.1-1.7 0-2.4.9-2.8 1.6v-1.4H12c0 .9 0 9 0 9Z" fill="currentColor" />
    </svg>
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function AuthorAvatar({
  src,
  name,
  initials,
  sizeClassName = "w-[48px] h-[48px]",
  textClassName = "font-bold text-[14px] text-white",
}: {
  src?: string;
  name: string;
  initials: string;
  sizeClassName?: string;
  textClassName?: string;
}) {
  const [imgError, setImgError] = useState(false);
  const fallbackSrc = name?.toLowerCase().includes("soham") ? "/soham-founder.png" : undefined;
  const currentSrc = !imgError ? (src || fallbackSrc) : (src && src !== fallbackSrc ? fallbackSrc : undefined);

  return (
    <div
      className={`${sizeClassName} rounded-full overflow-hidden bg-gradient-to-br from-[#007BFF] to-[#00C6FF] flex items-center justify-center ${textClassName} shrink-0 select-none shadow-sm relative`}
    >
      {currentSrc ? (
        <img
          src={currentSrc}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}

export default function InsightsDetailClient({
  post,
  initialRelated = [],
}: InsightsDetailClientProps) {
  const [likes, setLikes] = useState(post.likes ?? 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const featuredImg = post.featuredImage || post.image || post.coverImage || "";
  const colabLink = post.colabLink || post.notebookLink || (post.content?.includes("colab.research.google.com") ? post.content.match(/https:\/\/colab\.research\.google\.com[^\s"'>)]+/)?.[0] : "https://colab.research.google.com");
  const githubLink = post.githubLink || post.codeLink || (post.content?.includes("github.com") ? post.content.match(/https:\/\/github\.com\/[^\s"'>)]+/)?.[0] : "https://github.com/botmartz");
  const hasNotebook = Boolean(post.colabLink || post.notebookLink || post.content?.includes("colab.research.google.com"));

  const words = (post.content || "").split(/\s+/).length;
  const readTime = post.readTime || Math.max(4, Math.ceil(words / 220));
  const codeSnippets = post.codeSnippets || (post.content?.match(/```|<pre/g) || []).length || 3;
  const failureModes = post.failureModes || 5;
  const runnableNotebooks = post.runnableNotebooks || (hasNotebook ? 1 : 0);

  // Extract TOC items
  const toc = useMemo(() => {
    if (post.toc && post.toc.length > 0) return post.toc;
    const headings: string[] = [];
    const htmlMatches = post.content?.matchAll(/<h[2-3][^>]*>(.*?)<\/h[2-3]>/gi) || [];
    for (const m of htmlMatches) {
      const text = m[1].replace(/<[^>]*>/g, "").trim();
      if (text) headings.push(text);
    }
    if (headings.length === 0) {
      const mdMatches = post.content?.matchAll(/^##\s+(.*$)/gim) || [];
      for (const m of mdMatches) {
        const text = m[1].trim();
        if (text) headings.push(text);
      }
    }
    return headings.length > 0 ? headings.slice(0, 10) : [
      "Architecture Overview",
      "Core Components",
      "Production Implementation",
      "Evaluation & Best Practices"
    ];
  }, [post.content, post.toc]);

  const rawAuthor: any = post.author;
  const authorName: string = typeof rawAuthor === "string" ? rawAuthor : (rawAuthor?.name || "Botmartz Team");
  const authorRole: string = typeof rawAuthor === "object" && rawAuthor?.role ? rawAuthor.role : "AI Engineer, Botmartz";
  const authorBio: string = typeof rawAuthor === "object" && rawAuthor?.bio ? rawAuthor.bio : "Leading AI systems research, enterprise RAG, and multi-agent workflow architecture at Botmartz AI Solutions.";
  const authorPhoto: string | undefined =
    (typeof rawAuthor === "object" && rawAuthor?.avatar) ||
    post.authorPhotoURL ||
    post.authorImage ||
    (authorName.toLowerCase().includes("soham") ? "/soham-founder.png" : undefined);

  const authorInitials = useMemo(() => {
    const raw = typeof rawAuthor === "string" ? rawAuthor : (rawAuthor?.name || "Botmartz Team");
    const parts = String(raw).trim().split(/\s+/);
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return parts[0].slice(0, 2).toUpperCase();
  }, [rawAuthor]);

  const formattedDate = useMemo(() => {
    try {
      const raw = post.publishedAt || post.createdAt;
      if (!raw) return "Oct 20, 2026";
      const d = new Date(raw);
      if (isNaN(d.getTime())) return "Oct 20, 2026";
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      }).format(d);
    } catch {
      return "Oct 20, 2026";
    }
  }, [post.publishedAt, post.createdAt]);

  const tags = post.tags && post.tags.length > 0 ? post.tags : [
    post.category || "AI Engineering",
    "Production AI",
    "Deep Dive"
  ];

  // Reading progress
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const pct = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
          setReadingProgress(Math.min(pct, 100));
          setShowScrollTop(window.scrollY > 500);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // View tracking
  useEffect(() => {
    if (!post.id) return;
    const viewedKey = `blog_viewed_${post.id}`;
    if (typeof window !== "undefined" && !sessionStorage.getItem(viewedKey)) {
      setTimeout(async () => {
        try {
          await fetch("/api/blogs/view", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ blogId: post.id }),
          });
          sessionStorage.setItem(viewedKey, "true");
        } catch (e) {}
      }, 2500);
    }
  }, [post.id]);

  // Check liked state
  useEffect(() => {
    if (typeof document === "undefined" || !post.id) return;
    const cookieVal = document.cookie
      .split("; ")
      .find((row) => row.startsWith("liked_posts="))
      ?.split("=")[1];
    if (cookieVal && cookieVal.split(",").includes(post.id)) {
      setHasLiked(true);
    }
  }, [post.id]);

  const handleLike = async () => {
    if (hasLiked || isLiking || !post.id) return;
    setIsLiking(true);
    setLikes((prev) => prev + 1);
    setHasLiked(true);

    try {
      const response = await fetch(`/api/blogs/${post.id}/like`, { method: "POST" });
      const data = await response.json();
      if (data.alreadyLiked) {
        setLikes(data.likes);
        setHasLiked(true);
        return;
      }
      if (!response.ok) throw new Error("Failed");
      if (typeof data.likes === "number") setLikes(data.likes);
    } catch {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } finally {
      setIsLiking(false);
    }
  };

  const sharePost = (platform: string) => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    const title = post?.title || "";
    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  const copyLink = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareButtons = [
    { label: "Twitter", color: "#1DA1F2", icon: <TwitterXIcon size={15} />, fn: () => sharePost("twitter") },
    { label: "Facebook", color: "#1877F2", icon: <FacebookIcon size={15} />, fn: () => sharePost("facebook") },
    { label: "LinkedIn", color: "#0A66C2", icon: <LinkedInIcon size={15} />, fn: () => sharePost("linkedin") },
    { label: "Copy link", color: "#00C6FF", icon: copied ? <Check size={15} /> : <Copy size={15} />, fn: copyLink },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Schema Markup for SEO */}
      <SchemaMarkup
        type="Article"
        data={{
          headline: post.title,
          description: post.excerpt,
          image: featuredImg || "https://www.botmartz.com/og-image.png",
          datePublished: post.createdAt,
          dateModified: post.updatedAt || post.createdAt,
          author: {
            "@type": "Person",
            name: post.author || "Botmartz Engineering Team"
          },
          publisher: {
            "@type": "Organization",
            name: "Botmartz",
            logo: {
              "@type": "ImageObject",
              url: "https://www.botmartz.com/Logo.png"
            }
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://www.botmartz.com/insights/${post.slug}`
          }
        }}
      />

      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] origin-left h-[3px] bg-gradient-to-r from-[#00C6FF] via-[#0066FF] to-[#00B8F0]"
        style={{ transform: `scaleX(${readingProgress / 100})`, willChange: "transform" }}
      />

      {/* Scroll-to-top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed right-6 bottom-6 z-50 w-11 h-11 rounded-full flex items-center justify-center shadow-2xl bg-[#060C1F] text-white border border-white/20 hover:scale-105 transition-all cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Side Action Bar */}
      <FloatingSideBar
        shareButtons={shareButtons}
        hasLiked={hasLiked}
        isLiking={isLiking}
        likes={likes}
        onLike={handleLike}
      />

      {/* ═══════════════════════════════════════════════════════════════
          HERO BANNER (DARK TECH / BLUEPRINT)
      ═══════════════════════════════════════════════════════════════ */}
      <div className="bg-[#060C1F] relative overflow-hidden pt-32 pb-20 px-6 sm:px-10 text-white">
        {/* Blueprint cyan grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(0,198,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,198,255,0.06) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse 80% 60% at 65% 30%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 65% 30%, black, transparent)",
          }}
        />
        <div className="absolute w-[460px] h-[460px] rounded-full bg-[#0066FF]/20 -top-36 -right-20 blur-3xl pointer-events-none" />

        <div className="w-full max-w-[1300px] mx-auto relative z-10">
          {/* Breadcrumbs */}
          <div className="font-semibold text-[12.5px] text-[#5B6B85] mb-6 tracking-wide flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <Link href="/insights" className="hover:text-white transition-colors">Engineering Insights</Link>
            <span>›</span>
            <span className="text-[#00C6FF]">{post.category || "AI Architecture"}</span>
          </div>

          {/* Category Pill */}
          <span className="inline-block font-bold text-[10.5px] tracking-wider text-[#00C6FF] bg-[#00C6FF]/12 border border-[#00C6FF]/25 px-3 py-1 rounded-[6px] uppercase font-mono">
            {post.category || "AI Architecture"}
          </span>

          {/* Title */}
          <h1 className="font-extrabold text-[32px] sm:text-[46px] leading-[1.18] text-white mt-5 max-w-5xl tracking-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="font-medium text-[15px] sm:text-[17px] leading-[1.75] text-[#8FA3C4] mt-4 max-w-4xl">
              {post.excerpt}
            </p>
          )}

          {/* Author & Share Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white/[0.04] border border-white/10 rounded-[14px] p-4.5 mt-8">
            <div className="flex items-center gap-3.5">
              <AuthorAvatar
                src={authorPhoto}
                name={authorName}
                initials={authorInitials}
                sizeClassName="w-[48px] h-[48px]"
                textClassName="font-bold text-[14px] text-white"
              />
              <div>
                <div className="font-bold text-[14px] text-white">{authorName}</div>
                <div className="font-medium text-[11.5px] text-[#7C8CAD]">
                  {authorRole} · {formattedDate} · {readTime} min read
                </div>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={copyLink}
                className="w-10 h-10 border border-white/14 bg-white/6 hover:bg-white/12 text-[#C7D6EE] font-bold text-[11px] flex items-center justify-center rounded-[9px] transition-all cursor-pointer"
                title="Copy Link"
              >
                {copied ? <Check size={15} className="text-[#00C6FF]" /> : <Copy size={15} />}
              </button>
              {shareButtons.slice(0, 3).map((s) => (
                <button
                  key={s.label}
                  onClick={s.fn}
                  title={`Share on ${s.label}`}
                  className="w-10 h-10 border border-white/14 bg-white/6 hover:bg-white/12 text-[#C7D6EE] font-bold text-[11px] flex items-center justify-center rounded-[9px] transition-all cursor-pointer"
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* ACTION BUTTONS: Google Colab & GitHub */}
          <div className="flex gap-3 mt-6 flex-wrap">
            <a
              href={colabLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#F9AB00",
                color: "#0B1220",
                fontWeight: "700",
                fontSize: "13px",
                padding: "13px 22px",
                borderRadius: "9px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s",
                boxShadow: "0 8px 24px rgba(249,171,0,0.25)",
                cursor: "pointer",
                border: "none",
                textDecoration: "none",
              }}
              className="hover:scale-[1.02]"
            >
              ◈ Open in Google Colab
            </a>
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                color: "#FFFFFF",
                fontWeight: "700",
                fontSize: "13px",
                padding: "13px 22px",
                borderRadius: "9px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                cursor: "pointer",
                textDecoration: "none",
              }}
              className="hover:bg-white/10"
            >
              ⌥ View Code on GitHub
            </a>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              THE 4 METRIC STATS CARDS
          ═══════════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {/* Card 1: Read Time */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                transition: "all 0.3s",
              }}
              className="hover:bg-white/[0.06] hover:border-white/15"
            >
              <div className="flex items-center justify-between text-[#8FA3C4]">
                <span className="font-semibold text-[11px] uppercase tracking-wider">Read Time</span>
                <Clock className="w-4 h-4 text-[#00C6FF]" />
              </div>
              <div className="font-extrabold text-[22px] text-white mt-1">{readTime} min</div>
            </div>

            {/* Card 2: Failure Modes */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                transition: "all 0.3s",
              }}
              className="hover:bg-white/[0.06] hover:border-white/15"
            >
              <div className="flex items-center justify-between text-[#8FA3C4]">
                <span className="font-semibold text-[11px] uppercase tracking-wider">Failure Modes</span>
                <AlertCircle className="w-4 h-4 text-[#FF5C35]" />
              </div>
              <div className="font-extrabold text-[22px] text-white mt-1">{failureModes}</div>
            </div>

            {/* Card 3: Code Snippets */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                transition: "all 0.3s",
              }}
              className="hover:bg-white/[0.06] hover:border-white/15"
            >
              <div className="flex items-center justify-between text-[#8FA3C4]">
                <span className="font-semibold text-[11px] uppercase tracking-wider">Code Snippets</span>
                <Code className="w-4 h-4 text-[#00C6FF]" />
              </div>
              <div className="font-extrabold text-[22px] text-white mt-1">{codeSnippets}</div>
            </div>

            {/* Card 4: Runnable Notebook */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                transition: "all 0.3s",
              }}
              className="hover:bg-white/[0.06] hover:border-white/15"
            >
              <div className="flex items-center justify-between text-[#8FA3C4]">
                <span className="font-semibold text-[11px] uppercase tracking-wider">Runnable Notebook</span>
                <Terminal className="w-4 h-4 text-[#00C6FF]" />
              </div>
              <div className="font-extrabold text-[22px] text-white mt-1">{runnableNotebooks}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── COVER IMAGE HERO ── */}
      <div className="w-full max-w-[1300px] mx-auto px-6 sm:px-10">
        <div className="h-[280px] sm:h-[400px] rounded-[18px] overflow-hidden -mt-10 relative shadow-[0_20px_50px_rgba(6,12,31,0.25)] border-[6px] border-white bg-slate-900">
          {featuredImg ? (
            <Image
              fill
              src={featuredImg}
              alt={post.title}
              className="object-cover object-center"
              priority
              unoptimized
            />
          ) : (
            <div
              style={{
                background: "linear-gradient(135deg, #060C1F 0%, #0A1630 100%)",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <div className="w-16 h-16 rounded-2xl bg-[#00C6FF]/10 flex items-center justify-center border border-[#00C6FF]/25 mb-3">
                <Sparkles size={28} className="text-[#00C6FF]" />
              </div>
              <div className="font-extrabold text-[18px] tracking-widest text-[#00C6FF] uppercase">
                {post.category || "Botmartz Engineering Insight"}
              </div>
              <div className="font-medium text-[12px] text-slate-400 mt-1">
                Production AI Architecture & Engineering Deep Dive
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          ARTICLE BODY & SIDEBAR
      ═══════════════════════════════════════════════════════════════ */}
      <div className="w-full max-w-[1300px] mx-auto px-6 sm:px-10 pt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Content */}
          <div className="lg:col-span-8">
            <article className="prose prose-lg max-w-none text-slate-800 leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({ node, children, ...props }) => {
                    const id = slugify(String(children));
                    return <h1 id={id} className="text-3xl font-extrabold text-slate-900 mt-12 mb-5 tracking-tight" {...props}>{children}</h1>;
                  },
                  h2: ({ node, children, ...props }) => {
                    const id = slugify(String(children));
                    return <h2 id={id} className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-200 tracking-tight" {...props}>{children}</h2>;
                  },
                  h3: ({ node, children, ...props }) => {
                    const id = slugify(String(children));
                    return <h3 id={id} className="text-xl font-bold text-[#0066FF] mt-9 mb-3 tracking-tight" {...props}>{children}</h3>;
                  },
                  h4: ({ node, ...props }) => <h4 className="text-lg font-bold text-slate-900 mt-6 mb-2" {...props} />,
                  p: ({ node, ...props }) => <p className="text-[16.5px] leading-[1.85] text-slate-700 mb-6 font-normal" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700 text-[16px]" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-slate-700 text-[16px]" {...props} />,
                  li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-bold text-slate-900" {...props} />,
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-[#00B8F0] bg-slate-50 pl-5 py-4 my-6 italic text-slate-700 rounded-r-xl" {...props} />
                  ),
                  pre: ({ node, children, ...props }: any) => {
                    return (
                      <div className="relative my-7 rounded-xl overflow-hidden border border-slate-800 bg-[#0B132B] shadow-lg group">
                        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                            <span className="ml-2 text-slate-300 font-semibold">Code Snippet</span>
                          </span>
                          <button
                            onClick={(e) => {
                              const btn = e.currentTarget;
                              const pre = btn.closest(".group")?.querySelector("pre");
                              if (pre) {
                                navigator.clipboard.writeText(pre.innerText);
                                btn.innerText = "Copied!";
                                setTimeout(() => { btn.innerText = "Copy"; }, 2000);
                              }
                            }}
                            className="text-xs px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer border border-white/15"
                          >
                            Copy
                          </button>
                        </div>
                        <pre className="p-5 overflow-x-auto text-[14px] font-mono leading-relaxed text-slate-200 bg-[#0B132B] m-0" {...props}>
                          {children}
                        </pre>
                      </div>
                    );
                  },
                  code: ({ node, inline, className, children, ...props }: any) => {
                    if (inline) {
                      return (
                        <code className="px-2 py-0.5 rounded bg-blue-50 text-[#0066FF] font-mono text-[0.9em] font-semibold border border-blue-100" {...props}>
                          {children}
                        </code>
                      );
                    }
                    return <code className={className} {...props}>{children}</code>;
                  },
                  a: ({ node, href, children, ...props }: any) => {
                    const isColab = href?.includes("colab.research.google.com");
                    if (isColab) {
                      return (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center my-6 no-underline group transition-transform duration-300 hover:scale-[1.04]"
                          {...props}
                        >
                          {children}
                        </a>
                      );
                    }
                    return (
                      <a href={href} className="text-[#0066FF] hover:underline font-semibold" {...props}>
                        {children}
                      </a>
                    );
                  },
                  img: ({ node, src, alt, ...props }: any) => {
                    const isColabBadge = src?.includes("colab-badge.svg") || alt?.toLowerCase().includes("colab");
                    if (isColabBadge) {
                      return (
                        <img
                          src={src}
                          alt={alt || "Open In Google Colab"}
                          className="h-[54px] sm:h-[62px] w-auto max-w-full object-contain rounded-xl shadow-[0_10px_25px_rgba(249,171,0,0.3)] hover:shadow-[0_15px_35px_rgba(249,171,0,0.45)] transition-all duration-300 border-2 border-[#F9AB00]/50"
                          style={{
                            height: "58px",
                            width: "auto",
                            minHeight: "52px",
                            display: "inline-block",
                            borderRadius: "12px",
                          }}
                          {...props}
                        />
                      );
                    }
                    return (
                      <img
                        className="rounded-xl shadow-lg my-8 max-w-full h-auto mx-auto border border-slate-200"
                        src={src}
                        alt={alt}
                        {...props}
                      />
                    );
                  },
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 shadow-sm">
                      <table className="w-full border-collapse text-left text-sm" {...props} />
                    </div>
                  ),
                  th: ({ node, ...props }) => <th className="bg-slate-100 px-4 py-3 font-bold text-slate-900 border-b border-slate-200" {...props} />,
                  td: ({ node, ...props }) => <td className="px-4 py-3 border-b border-slate-100 text-slate-700" {...props} />,
                }}
              >
                {post.content || ""}
              </ReactMarkdown>
            </article>

            {/* Try It Yourself Callout */}
            <div
              style={{
                backgroundColor: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "14px",
                padding: "26px",
              }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-5 justify-between shadow-sm"
            >
              <div className="flex-1">
                <div className="font-bold text-[16px] text-slate-900">Try It Yourself</div>
                <div className="font-medium text-[13px] leading-[1.6] text-slate-600 mt-1.5">
                  A runnable Google Colab notebook with interactive architecture implementation and code from this insight.
                </div>
              </div>
              <div className="flex gap-2.5 shrink-0">
                <a
                  href={colabLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: "#F9AB00",
                    color: "#0B1220",
                    fontWeight: "700",
                    fontSize: "12.5px",
                    padding: "11px 18px",
                    borderRadius: "8px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s",
                    boxShadow: "0 4px 12px rgba(249,171,0,0.2)",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                  className="hover:scale-[1.02]"
                >
                  ◈ Open in Colab
                </a>
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: "#F1F5F9",
                    color: "#0F172A",
                    fontWeight: "700",
                    fontSize: "12.5px",
                    padding: "11px 18px",
                    borderRadius: "8px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s",
                    border: "1px solid #CBD5E1",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                  className="hover:bg-[#E2E8F0]"
                >
                  ⌥ GitHub Repo
                </a>
              </div>
            </div>

            {/* Topic Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {tags.map((tag, idx) => (
                <span
                  key={`tag-${idx}`}
                  style={{
                    fontWeight: "600",
                    fontSize: "12px",
                    color: "#475569",
                    backgroundColor: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    padding: "6px 14px",
                    borderRadius: "6px",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Likes Counter & Button */}
            <div className="flex items-center gap-4 mt-8 border-t border-slate-200 pt-6 justify-between">
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-[#0066FF]" />
                  {(post.views || 1).toLocaleString()} views
                </span>
              </div>
              <button
                onClick={handleLike}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  fontWeight: "700",
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                className={
                  hasLiked
                    ? "bg-pink-500/10 border border-pink-500/30 text-pink-500"
                    : "bg-white border border-slate-200 text-slate-600 hover:text-pink-500 hover:border-pink-500/30 hover:bg-pink-500/5"
                }
              >
                <Heart className={`w-3.5 h-3.5 ${hasLiked ? "fill-pink-500 text-pink-500" : ""}`} />
                <span>{likes.toLocaleString()} Likes</span>
              </button>
            </div>

            {/* Author Bio Card */}
            <div
              style={{
                backgroundColor: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "14px",
                padding: "24px",
              }}
              className="mt-10 flex gap-4 items-center"
            >
              <AuthorAvatar
                src={authorPhoto}
                name={authorName}
                initials={authorInitials}
                sizeClassName="w-[56px] h-[56px]"
                textClassName="font-bold text-[16px] text-white"
              />
              <div>
                <div className="font-bold text-[15px] text-slate-900">{authorName}</div>
                <div className="font-medium text-[13px] leading-[1.6] text-slate-600 mt-1">
                  {authorBio}
                </div>
              </div>
            </div>

          </div>

          {/* Right Sidebar - Sticky pinned while left article scrolls */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-5 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
              {/* Sticky Colab Notebook Card */}
              {hasNotebook && (
                <a
                  href={colabLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 w-full px-5 py-4 rounded-2xl no-underline text-white transition-all hover:scale-[1.02] group"
                  style={{
                    background: "linear-gradient(135deg, #060C1F, #0A1630)",
                    border: "1px solid rgba(249, 171, 0, 0.4)",
                    boxShadow: "0 8px 32px rgba(249, 171, 0, 0.15)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 shrink-0">
                      {/* Google Colab Logo: Interlocking Yellow/Orange and Blue Loops */}
                      <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                        <path d="M11.6 19.4c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4c1.8 0 3.4 1.1 4.1 2.7.4.9 1.4 1.4 2.3 1.1.9-.4 1.4-1.4 1.1-2.3C17.7 8.5 14.8 6.8 11.6 6.8 7.1 6.8 3.4 10.5 3.4 15s3.7 8.2 8.2 8.2c3.2 0 6.1-1.7 7.5-4.6.4-.9 0-1.9-.9-2.3-.9-.4-1.9 0-2.3.9-.7 1.6-2.3 2.7-4.3 2.7z" fill="#F9AB00" />
                        <path d="M20.4 12.6c2.4 0 4.4 2 4.4 4.4s-2 4.4-4.4 4.4c-1.8 0-3.4-1.1-4.1-2.7-.4-.9-1.4-1.4-2.3-1.1-.9.4-1.4 1.4-1.1 2.3 1.4 3.6 4.3 5.3 7.5 5.3 4.5 0 8.2-3.7 8.2-8.2s-3.7-8.2-8.2-8.2c-3.2 0-6.1 1.7-7.5 4.6-.4.9 0 1.9.9 2.3.9.4 1.9 0 2.3-.9.7-1.6 2.3-2.7 4.3-2.7z" fill="#1A73E8" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-sm leading-tight text-white m-0 group-hover:text-[#F9AB00] transition-colors">Open Notebook</p>
                      <p className="text-[11px] text-[#F9AB00] mt-0.5 m-0 font-medium">Run interactive Google Colab</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-white/60 shrink-0 group-hover:translate-x-1 transition-transform" />
                </a>
              )}

              {/* Sticky GitHub Card */}
              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 w-full px-5 py-4 rounded-2xl no-underline text-white transition-all hover:scale-[1.02]"
                  style={{
                    background: "#0A0A0A",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/10 text-white">
                      <Github size={17} />
                    </div>
                    <div>
                      <p className="font-bold text-sm leading-tight text-white m-0">View Repository</p>
                      <p className="text-[11px] text-white/60 mt-0.5 m-0">GitHub code & architecture</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-white/60 shrink-0" />
                </a>
              )}

              {/* Sticky Table of Contents Card */}
              {toc.length > 0 && (
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "16px",
                    padding: "22px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#00C6FF]" />
                    <h3 className="font-bold text-sm text-slate-900 m-0 uppercase tracking-wider text-[11px]">
                      Article Outline
                    </h3>
                  </div>
                  <nav className="space-y-1">
                    {toc.map((t, idx) => (
                      <a
                        key={`side-toc-${idx}`}
                        href={`#${slugify(t)}`}
                        className="block py-1.5 px-2.5 rounded-lg text-[13px] text-slate-600 hover:text-[#0066FF] hover:bg-slate-50 transition-colors font-medium no-underline"
                      >
                        {t}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Consultation / Talk to Architect CTA */}
              <div
                style={{
                  background: "linear-gradient(135deg, #060C1F 0%, #0A1630 100%)",
                  border: "1px solid rgba(0, 198, 255, 0.25)",
                  borderRadius: "16px",
                  padding: "24px",
                  color: "#FFFFFF",
                  boxShadow: "0 10px 30px rgba(6, 12, 31, 0.2)",
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#00C6FF]/15 flex items-center justify-center border border-[#00C6FF]/25 mb-4">
                  <Sparkles size={18} className="text-[#00C6FF]" />
                </div>
                <h4 className="font-bold text-[16px] text-white mb-2">Build Production AI with Botmartz</h4>
                <p className="text-[12.5px] text-[#8FA3C4] leading-relaxed mb-5">
                  Evaluating an Enterprise RAG or Multi-Agent system? Get an architectural review and 24h feasibility verdict from our principal engineers.
                </p>
                <Link
                  href="/contact"
                  className="block text-center py-2.5 px-4 rounded-xl text-white font-bold text-xs bg-gradient-to-r from-[#007BFF] to-[#00C6FF] hover:opacity-90 transition-opacity no-underline shadow-md"
                >
                  Talk to an AI Architect →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          RELATED POSTS SECTION
      ═══════════════════════════════════════════════════════════════ */}
      {initialRelated.length > 0 && (
        <section className="bg-[#F8FAFC] border-t border-slate-200 py-20 px-6 sm:px-10">
          <div className="max-w-[1300px] mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#0066FF] font-bold">
                  Continue Reading
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Related Engineering Insights</h2>
              </div>
              <Link
                href="/insights"
                className="hidden sm:inline-flex items-center gap-1.5 font-bold text-sm text-[#0066FF] hover:underline"
              >
                Browse all insights <ChevronRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {initialRelated.slice(0, 3).map((rp, i) => (
                <Link
                  key={rp.id || rp.slug || i}
                  href={`/insights/${rp.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col no-underline"
                >
                  <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                    {rp.featuredImage ? (
                      <img
                        src={rp.featuredImage}
                        alt={rp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#060C1F] to-[#0A1630] text-white/30 font-bold font-mono text-xl">
                        BOTMARTZ
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#00C6FF] bg-[#060C1F]/80 backdrop-blur-md rounded-md border border-[#00C6FF]/30">
                        {rp.category || "AI"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-xs text-slate-500 mb-2 font-medium">
                      {rp.readTime || 8} min read · {typeof rp.author === "string" ? rp.author : (rp.author?.name || "Botmartz Team")}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors leading-snug line-clamp-2 mb-3">
                      {rp.title}
                    </h3>
                    <div className="mt-auto pt-3 flex items-center gap-1 text-xs font-bold text-[#0066FF]">
                      <span>Read insight</span>
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
