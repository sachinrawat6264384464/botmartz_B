"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { db } from "@/lib/firebase";
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  addDoc, 
  serverTimestamp, 
  updateDoc, 
  increment, 
  doc 
} from "firebase/firestore";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  AlertCircle, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  Eye, 
  Heart,
  ChevronDown,
  Code,
  Terminal
} from "lucide-react";
import SchemaMarkup from "@/app/_components/SchemaMarkup";

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  readTime: number;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  featuredImage?: string;
  createdAt?: string;
  updatedAt?: string;
  readTime?: number;
  views?: number;
  likes?: number;
  
  // Custom detail layout fields
  colabLink?: string;
  githubLink?: string;
  failureModes?: number;
  codeSnippets?: number;
  runnableNotebooks?: number;
  toc?: string[];
  closingPoints?: string[];
  tags?: string[];
}

interface BlogComment {
  id: string;
  name: string;
  content: string;
  createdAt: any;
  status: string;
}

export default function InsightsDetailClient({ 
  post, 
  initialRelated 
}: { 
  post: BlogPost; 
  initialRelated: RelatedPost[]; 
}) {
  const router = useRouter();
  
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [commentForm, setCommentForm] = useState({ name: "", email: "", content: "" });
  const [commentStatus, setCommentStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [commentError, setCommentError] = useState("");

  const [viewCount, setViewCount] = useState(post.views ?? 0);
  const [likeCount, setLikeCount] = useState(post.likes ?? 0);
  const [liked, setLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  // Scroll Progress Bar Setup
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    async function fetchComments() {
      try {
        const commentsRef = collection(db, "comments");
        const q = query(commentsRef, where("postSlug", "==", post.slug));
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as BlogComment[];

        const approvedSorted = items
          .filter((c) => c.status === "approved")
          .sort((a, b) => {
            const timeA = a.createdAt?.seconds || 0;
            const timeB = b.createdAt?.seconds || 0;
            return timeA - timeB;
          });

        setComments(approvedSorted);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    }

    fetchComments();
  }, [post.slug, commentStatus]);

  // Increment views once on load
  useEffect(() => {
    if (!post.id) return;
    const postRef = doc(db, "blog-posts", post.id);
    updateDoc(postRef, { views: increment(1) }).catch((err) =>
      console.error("Failed to increment view:", err)
    );
    setViewCount((prev) => prev + 1);
  }, [post.id]);

  const handleLike = async () => {
    if (!post.id || likeLoading) return;
    setLikeLoading(true);
    const postRef = doc(db, "blog-posts", post.id);
    try {
      if (liked) {
        await updateDoc(postRef, { likes: increment(-1) });
        setLikeCount((prev) => Math.max(0, prev - 1));
        setLiked(false);
      } else {
        await updateDoc(postRef, { likes: increment(1) });
        setLikeCount((prev) => prev + 1);
        setLiked(true);
      }
    } catch (err) {
      console.error("Failed to update likes:", err);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentForm.name.trim() || !commentForm.email.trim() || !commentForm.content.trim()) return;

    setCommentStatus("submitting");
    setCommentError("");

    try {
      const commentsRef = collection(db, "comments");
      await addDoc(commentsRef, {
        name: commentForm.name.trim(),
        email: commentForm.email.trim(),
        content: commentForm.content.trim(),
        postSlug: post.slug,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setCommentStatus("success");
      setCommentForm({ name: "", email: "", content: "" });
    } catch (err: any) {
      console.error("Error submitting comment:", err);
      setCommentStatus("error");
      setCommentError(err.message || "Failed to submit comment. Please try again.");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Article link copied to clipboard!");
  };

  // Parsing & Fallbacks
  const parseList = (val: any): string[] => {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string' && val.trim()) {
      return val.split('\n').map(l => l.replace(/^[•\-*+✓\s]+/, '').trim()).filter(Boolean);
    }
    return [];
  };

  const colabLink = post.colabLink || "#";
  const githubLink = post.githubLink || "#";
  const failureModes = post.failureModes || 5;
  const codeSnippets = post.codeSnippets || 3;
  const runnableNotebooks = post.runnableNotebooks || 1;
  const readTime = post.readTime || 12;

  const toc = post.toc && post.toc.length ? post.toc : [
    'Retrieval Quality', 
    'Chunking Strategy', 
    'Hybrid Search', 
    'Continuous Evaluation', 
    'Guardrails', 
    'Takeaways'
  ];

  const closingPoints = parseList(post.closingPoints).length ? parseList(post.closingPoints) : [
    'Measure retrieval precision and recall in isolation before touching the model.',
    'Chunk along document structure, not arbitrary character counts.',
    'Combine vector and keyword search — hybrid retrieval beats either alone.',
    'Treat evaluation as continuous infrastructure, not a launch-week report.'
  ];

  const tags = post.tags && post.tags.length ? post.tags : parseList(post.tags).length ? parseList(post.tags) : [
    'Enterprise RAG', 
    'Evaluation', 
    'Production AI', 
    'LangChain'
  ];

  const formattedDate = post.createdAt 
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric"
      })
    : "Jul 12, 2026";

  const authorInitials = post.author
    ? post.author.split(' ').map(n => n[0]).join('').toUpperCase()
    : "AI";

  const shareLinks = [
    { label: 'LinkedIn', glyph: 'in' },
    { label: 'X / Twitter', glyph: 'X' },
    { label: 'WhatsApp', glyph: 'WA' },
    { label: 'Email', glyph: '@' },
  ];

  return (
    <main className="bg-[#050B14] min-h-screen text-[#C7D6EE] font-sans pb-24 overflow-x-hidden">
      <SchemaMarkup
        type="Article"
        data={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          featuredImage: post.featuredImage,
          author: post.author,
          createdAt: post.createdAt || new Date().toISOString(),
          updatedAt: post.updatedAt || undefined,
        }}
      />
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#00C6FF] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Embedded CSS for prose styling in rich article body */}
      <style jsx global>{`
        .blog-content p {
          margin-bottom: 1.75rem;
          line-height: 1.9;
          color: #A3B3CC;
          font-weight: 400;
          font-size: 15.5px;
        }
        .blog-content h2 {
          font-size: 1.6rem;
          font-weight: 800;
          margin-top: 2.75rem;
          margin-bottom: 1.25rem;
          color: #FFFFFF;
          line-height: 1.4;
          letter-spacing: -0.01em;
        }
        .blog-content h3 {
          font-size: 1.3rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #00C6FF;
        }
        .blog-content ul {
          list-style-type: square;
          padding-left: 1.5rem;
          margin-bottom: 1.75rem;
          color: #A3B3CC;
          font-weight: 400;
        }
        .blog-content ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1.75rem;
          color: #A3B3CC;
          font-weight: 400;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
          line-height: 1.75;
          font-size: 14.5px;
        }
        .blog-content pre {
          background-color: #060C1F;
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow-x: auto;
          margin: 28px 0;
          font-family: monospace;
          color: #C7D6EE;
          font-size: 12.5px;
          line-height: 1.7;
        }
        .blog-content code {
          background-color: rgba(0, 198, 255, 0.08);
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-family: monospace;
          font-size: 0.9em;
          color: #00C6FF;
        }
        .blog-content img {
          border-radius: 12px;
          margin: 2rem auto;
          max-width: 100%;
          height: auto;
          display: block;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
      `}</style>

      {/* ── HEADER BANNER ── */}
      <div className="bg-[#060C1F] relative overflow-hidden pt-32 pb-16 px-6 sm:px-10">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,198,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,198,255,0.06) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 65% 30%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 65% 30%, black, transparent)'
          }}
        />
        <div className="absolute w-[420px] h-[420px] rounded-full bg-radial-gradient from-[#007BFF]/28 to-transparent -top-36 -right-20 filter blur-xl pointer-events-none" />
        
        <div className="max-w-[820px] mx-auto relative z-10">
          <div className="font-semibold text-[12.5px] text-[#5B6B85] mb-6 tracking-wide flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <Link href="/insights" className="hover:text-white transition-colors">Engineering Insights</Link>
            <span>›</span>
            <span className="text-[#00C6FF]">{post.category || 'General'}</span>
          </div>

          <span className="inline-block font-bold text-[10.5px] tracking-wider text-[#00C6FF] bg-[#00C6FF]/12 px-2.5 py-1 rounded-[5px] uppercase">
            {post.category || 'General'}
          </span>

          <h1 className="font-extrabold text-[32px] sm:text-[44px] leading-[1.18] text-white mt-5">
            {post.title.includes('in') ? (
              <>
                {post.title.split('in')[0]} in <span className="text-[#00C6FF]">{post.title.split('in').slice(1).join('in')}</span>
              </>
            ) : (
              post.title
            )}
          </h1>

          <p className="font-medium text-[15px] sm:text-[15.5px] leading-[1.75] text-[#8FA3C4] mt-4 max-w-[660px]">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 bg-white/[0.04] border border-white/10 rounded-[14px] p-4.5 mt-8">
            <div className="flex items-center gap-3.5">
              <div className="w-[48px] h-[48px] rounded-full bg-gradient-to-br from-[#007BFF] to-[#00C6FF] flex items-center justify-center font-bold text-[14px] text-white">
                {authorInitials}
              </div>
              <div>
                <div className="font-bold text-[13.5px] text-white">{post.author || 'AI Engineer'}</div>
                <div className="font-medium text-[11px] text-[#7C8CAD]">AI Engineer, Botmartz · {formattedDate} · {readTime} min read</div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={handleShare}
                className="w-10 h-10 border border-white/14 bg-white/6 hover:bg-white/12 text-[#C7D6EE] font-bold text-[11px] flex items-center justify-center rounded-[9px] transition-all cursor-pointer"
                title="Copy Link"
              >
                <Share2 size={15} />
              </button>
              {shareLinks.map((s, idx) => (
                <button 
                  key={idx}
                  onClick={handleShare}
                  title={`Share on ${s.label}`}
                  className="w-10 h-10 border border-white/14 bg-white/6 hover:bg-white/12 text-[#C7D6EE] font-bold text-[11px] flex items-center justify-center rounded-[9px] transition-all cursor-pointer"
                >
                  {s.glyph}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-5 flex-wrap">
            <a 
              href={colabLink} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#F9AB00',
                color: '#0B1220',
                fontWeight: '700',
                fontSize: '13px',
                padding: '13px 22px',
                borderRadius: '9px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s',
                boxShadow: '0 8px 24px rgba(249,171,0,0.25)',
                cursor: 'pointer',
                border: 'none'
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
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                color: '#FFFFFF',
                fontWeight: '700',
                fontSize: '13px',
                padding: '13px 22px',
                borderRadius: '9px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                cursor: 'pointer'
              }}
              className="hover:bg-white/10"
            >
              ⌥ View Code on GitHub
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div 
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                transition: 'all 0.3s'
              }}
              className="hover:bg-white/[0.06] hover:border-white/15"
            >
              <div className="flex items-center justify-between text-[#8FA3C4]">
                <span className="font-semibold text-[11px] uppercase tracking-wider">Read Time</span>
                <Clock className="w-4 h-4 text-[#00C6FF]" />
              </div>
              <div className="font-extrabold text-[22px] text-white mt-1">{readTime} min</div>
            </div>

            <div 
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                transition: 'all 0.3s'
              }}
              className="hover:bg-white/[0.06] hover:border-white/15"
            >
              <div className="flex items-center justify-between text-[#8FA3C4]">
                <span className="font-semibold text-[11px] uppercase tracking-wider">Failure Modes</span>
                <AlertCircle className="w-4 h-4 text-[#FF5C35]" />
              </div>
              <div className="font-extrabold text-[22px] text-white mt-1">{failureModes}</div>
            </div>

            <div 
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                transition: 'all 0.3s'
              }}
              className="hover:bg-white/[0.06] hover:border-white/15"
            >
              <div className="flex items-center justify-between text-[#8FA3C4]">
                <span className="font-semibold text-[11px] uppercase tracking-wider">Code Snippets</span>
                <Code className="w-4 h-4 text-[#00C6FF]" />
              </div>
              <div className="font-extrabold text-[22px] text-white mt-1">{codeSnippets}</div>
            </div>

            <div 
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                transition: 'all 0.3s'
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
      <div className="max-w-[820px] mx-auto px-6 sm:px-10">
        <div className="h-[280px] rounded-[18px] overflow-hidden -mt-10 relative shadow-[0_20px_50px_rgba(6,12,31,0.25)] border-[6px] border-white bg-slate-900">
          {post.featuredImage ? (
            <Image 
              fill
              src={post.featuredImage} 
              alt={post.title}
              className="object-cover object-center"
              priority
            />
          ) : (
            <div 
              style={{
                background: 'linear-gradient(135deg, #060C1F 0%, #0A1630 100%)',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Tech blueprint background effect */}
              <div 
                style={{
                  position: 'absolute',
                  inset: '0',
                  backgroundImage: 'linear-gradient(rgba(0,198,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,198,255,0.04) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                  pointerEvents: 'none'
                }}
              />
              {/* Glowing ambient light */}
              <div style={{
                position: 'absolute',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0, 198, 255, 0.08) 0%, transparent 70%)',
                filter: 'blur(30px)',
                pointerEvents: 'none'
              }} />
              
              <AlertCircle className="w-10 h-10 text-[#00C6FF]/40 mb-3 relative z-10" />
              <div className="font-extrabold text-[15px] tracking-widest text-[#00C6FF]/60 uppercase relative z-10">
                Botmartz AI Insight
              </div>
              <div className="font-medium text-[11px] text-[#8FA3C4]/50 mt-1 relative z-10">
                Evaluating Retrieval, Chunking, and Generation in Production
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── ARTICLE PROSE BODY ── */}
      <div className="max-w-[820px] mx-auto px-6 sm:px-10 pt-12">
        {/* Table of Contents anchors */}
        <div className="flex gap-2 flex-wrap mb-9">
          {toc.map((t, idx) => (
            <a 
              key={idx}
              href={`#${t.toLowerCase().replace(/\s+/g, '-')}`}
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: '700',
                fontSize: '12px',
                color: '#8FA3C4',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                padding: '8px 14px',
                borderRadius: '7px',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              className="hover:text-[#00C6FF] hover:bg-[#00C6FF]/10 hover:border-[#00C6FF]/20"
            >
              {t}
            </a>
          ))}
        </div>

        {/* Content Render */}
        <article 
          className="blog-content text-gray-300 font-light leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Key Takeaways */}
        {closingPoints.length > 0 && (
          <div className="mt-11" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '14px',
            padding: '24px'
          }}>
            <h2 className="font-extrabold text-[22px] text-white mb-5 mt-0">Closing Takeaways</h2>
            <div className="flex flex-col gap-4">
              {closingPoints.map((pt, idx) => (
                <div key={idx} className="flex gap-3.5 items-start">
                  <div 
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      color: '#10B981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: '11px',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  >
                    ✓
                  </div>
                  <div className="font-medium text-[14.5px] leading-[1.7] text-[#A3B3CC]">{pt}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Try it yourself callout */}
        <div 
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '14px',
            padding: '26px'
          }}
          className="mt-9 flex flex-col sm:flex-row items-center gap-5 justify-between shadow-lg"
        >
          <div className="flex-1">
            <div className="font-bold text-[15px] text-white">Try It Yourself</div>
            <div className="font-medium text-[12.5px] leading-[1.6] text-[#8FA3C4] mt-1.5">A runnable Google Colab notebook with the eval harness and hybrid search code from this post.</div>
          </div>
          <div className="flex gap-2 shrink-0">
            <a 
              href={colabLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{
                backgroundColor: '#F9AB00',
                color: '#0B1220',
                fontWeight: '700',
                fontSize: '12.5px',
                padding: '11px 18px',
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(249,171,0,0.2)',
                cursor: 'pointer',
                border: 'none'
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
                backgroundColor: '#0B1220',
                color: '#FFFFFF',
                fontWeight: '700',
                fontSize: '12.5px',
                padding: '11px 18px',
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                cursor: 'pointer'
              }}
              className="hover:bg-[#1A2333]"
            >
              ⌥ GitHub Repo
            </a>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-9">
          {tags.map((tag, idx) => (
            <span 
              key={idx} 
              style={{
                fontWeight: '600',
                fontSize: '11.5px',
                color: '#8FA3C4',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                padding: '6px 12px',
                borderRadius: '6px'
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Likes / Views count */}
        <div className="flex items-center gap-4 mt-8 border-t border-white/10 pt-6 justify-between">
          <div className="flex items-center gap-4 text-xs font-semibold text-[#8FA3C4]">
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-[#00C6FF]" />
              {viewCount.toLocaleString()} views
            </span>
          </div>
          <button 
            onClick={handleLike}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: '700',
              padding: '8px 16px',
              borderRadius: '9999px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            className={liked 
              ? 'bg-pink-500/10 border border-pink-500/30 text-pink-500' 
              : 'bg-white/5 border border-white/10 text-[#8FA3C4] hover:text-pink-500 hover:border-pink-500/30 hover:bg-pink-500/5'
            }
          >
            <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-pink-500 text-pink-500' : ''}`} />
            <span>{likeCount.toLocaleString()} Likes</span>
          </button>
        </div>

        {/* Author Bio Box */}
        <div 
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '14px',
            padding: '24px'
          }}
          className="mt-11 flex gap-4.5 items-center"
        >
          <div className="w-[56px] h-[56px] rounded-full bg-gradient-to-br from-[#007BFF] to-[#00C6FF] flex items-center justify-center font-bold text-[16px] text-white shrink-0">
            {authorInitials}
          </div>
          <div>
            <div className="font-bold text-[15px] text-white">{post.author}</div>
            <div className="font-medium text-[13px] leading-[1.6] text-[#8FA3C4] mt-1">AI Engineer at Botmartz, building enterprise RAG and agent systems in production. Contributing to open-source libraries.</div>
          </div>
        </div>

        {/* Discussion / Comments Section */}
        <div className="mt-12 pt-12 border-t border-white/10">
          <div className="flex items-center gap-2.5 mb-7">
            <MessageSquare className="w-5 h-5 text-[#00C6FF]" />
            <h2 className="text-xl font-bold tracking-tight text-white m-0">
              Discussion ({comments.length})
            </h2>
          </div>

          {/* Comments List */}
          <div className="space-y-4 mb-9">
            {comments.length === 0 ? (
              <p className="text-[#8FA3C4] font-medium text-xs italic">
                No approved comments yet. Be the first to share your thoughts!
              </p>
            ) : (
              comments.map((c) => {
                const initials = c.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2) || "U";
                const dateStr = c.createdAt?.seconds 
                  ? new Date(c.createdAt.seconds * 1000).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric"
                    })
                  : "Recent";

                return (
                  <motion.div 
                    key={c.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.01)',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                    className="flex gap-3.5 p-4 rounded-xl shadow-sm"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#00C6FF]/10 border border-[#00C6FF]/20 flex items-center justify-center text-xs font-bold text-[#00C6FF] flex-shrink-0">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-1.5">
                        <span className="text-sm font-bold text-white truncate">{c.name}</span>
                        <span className="text-[10px] font-semibold text-[#8FA3C4]/60">{dateStr}</span>
                      </div>
                      <p className="text-xs text-[#8FA3C4] font-medium leading-relaxed whitespace-pre-wrap">
                        {c.content}
                      </p>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Comment Form */}
          <div 
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '16px',
              padding: '24px'
            }}
            className="shadow-sm"
          >
            <h3 className="text-[15px] font-bold text-white mb-1.5 uppercase tracking-wider mt-0">Leave a Comment</h3>
            <p className="text-xs text-[#8FA3C4]/70 mb-5 font-semibold">
              Your email address will not be published. Required fields are marked *
            </p>

            {commentStatus === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center gap-3 py-6"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase mb-1">Comment Submitted</h4>
                  <p className="text-xs text-[#8FA3C4] font-semibold max-w-xs">
                    Thank you! Your comment is pending moderator approval and will be visible shortly.
                  </p>
                </div>
                <button 
                  onClick={() => setCommentStatus("idle")}
                  className="px-5 py-2 border border-[#00C6FF] text-[#00C6FF] text-xs font-bold uppercase rounded-lg hover:bg-[#00C6FF]/10 transition-all cursor-pointer bg-transparent"
                >
                  Write Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#8FA3C4] uppercase tracking-wider mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={commentForm.name}
                      onChange={(e) => setCommentForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="John Doe"
                      style={{
                        backgroundColor: '#060C1F',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#FFFFFF'
                      }}
                      className="w-full rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-[#00C6FF] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#8FA3C4] uppercase tracking-wider mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={commentForm.email}
                      onChange={(e) => setCommentForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="you@company.com"
                      style={{
                        backgroundColor: '#060C1F',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#FFFFFF'
                      }}
                      className="w-full rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-[#00C6FF] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#8FA3C4] uppercase tracking-wider mb-1">
                    Comment *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={commentForm.content}
                    onChange={(e) => setCommentForm(f => ({ ...f, content: e.target.value }))}
                    placeholder="Share your thoughts on this transmission..."
                    style={{
                      backgroundColor: '#060C1F',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#FFFFFF'
                    }}
                    className="w-full rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-[#00C6FF] transition-all resize-none"
                  />
                </div>

                {commentStatus === "error" && (
                  <p className="text-red-500 text-xs font-semibold">⚠️ {commentError}</p>
                )}

                <button
                  type="submit"
                  disabled={commentStatus === "submitting"}
                  style={{
                    backgroundColor: '#00C6FF',
                    color: '#050B14',
                    border: 'none',
                    fontWeight: '700',
                    fontSize: '12px',
                    letterSpacing: '0.05em',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 12px rgba(0, 198, 255, 0.2)'
                  }}
                  className="hover:scale-[1.02] disabled:opacity-50"
                >
                  {commentStatus === "submitting" ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit Comment</span>
                      <Send className="w-3 h-3" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Related Insights Grid */}
        <div className="border-t border-white/10 mt-14 pt-11">
          <div className="font-bold text-[12px] tracking-[0.1em] text-[#00C6FF] uppercase mb-4.5">More Engineering Insights</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {initialRelated.map((r, idx) => (
              <div 
                key={idx} 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
                className="rounded-xl overflow-hidden flex flex-col hover:border-[#00C6FF]/30 transition-all"
              >
                <div className="h-[100px] bg-gradient-to-br from-[#060C1F] to-[#0A1630]" />
                <div className="p-4.5 flex-1 flex flex-col gap-2">
                  <span className="font-bold text-[9px] tracking-wide text-[#00C6FF] uppercase">{r.category}</span>
                  <Link href={`/insights/${r.slug}`} className="font-bold text-[13px] leading-snug text-white hover:text-[#00C6FF] transition-colors block flex-1">
                    {r.title}
                  </Link>
                  <div className="font-medium text-[11px] text-[#8FA3C4]/60 mt-1.5">{r.author} · {r.readTime} min read</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
