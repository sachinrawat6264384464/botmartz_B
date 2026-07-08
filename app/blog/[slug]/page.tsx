"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, limit, addDoc, orderBy, serverTimestamp, updateDoc, increment, doc } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen, AlertCircle, MessageSquare, Send, CheckCircle, Eye, Heart } from "lucide-react";
import SchemaMarkup from "@/app/_components/SchemaMarkup";

const inter = Inter_Tight({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "900"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  featuredImage?: string;
  createdAt: any;
  readTime?: number;
  views?: number;
  likes?: number;
  status: string;
  updatedAt?: any;
}

export default function BlogSlugPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Comments state
  interface BlogComment {
    id: string;
    name: string;
    content: string;
    createdAt: any;
    status: string;
  }

  const [comments, setComments] = useState<BlogComment[]>([]);
  const [commentForm, setCommentForm] = useState({ name: "", email: "", content: "" });
  const [commentStatus, setCommentStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [commentError, setCommentError] = useState("");

  // Views & Likes state
  const [viewCount, setViewCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
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
    if (!slug) return;

    async function fetchComments() {
      try {
        const commentsRef = collection(db, "comments");
        const q = query(
          commentsRef,
          where("postSlug", "==", slug)
        );
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as BlogComment[];

        // Filter by approved status and sort by createdAt client-side (avoids index creation requirement)
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
  }, [slug, commentStatus]); // refetch on slug change or after a new comment submission status resets

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
        postSlug: slug,
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

  useEffect(() => {
    if (!slug) return;

    async function fetchPostBySlug() {
      try {
        const postsRef = collection(db, "blog-posts");
        const q = query(
          postsRef,
          where("slug", "==", slug),
          where("status", "==", "published"),
          limit(1)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError(true);
        } else {
          const doc = querySnapshot.docs[0];
          setPost({ id: doc.id, ...doc.data() } as BlogPost);
        }
      } catch (err) {
        console.error("Error fetching single post:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPostBySlug();
  }, [slug]);

  // Auto-increment view count once when post loads
  useEffect(() => {
    if (!post?.id) return;

    // Set initial counts from post data
    setViewCount(post.views ?? 0);
    setLikeCount(post.likes ?? 0);

    // Increment view count in Firestore (no duplicate guard needed — each page load = 1 view)
    const postRef = doc(db, "blog-posts", post.id);
    updateDoc(postRef, { views: increment(1) }).catch((err) =>
      console.error("Failed to increment view:", err)
    );
    setViewCount((prev) => prev + 1);
  }, [post?.id]);

  const handleLike = async () => {
    if (!post?.id || likeLoading) return;
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

  // Copy Link Alert Action
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Article link copied to clipboard!");
  };

  if (loading) {
    return (
      <main className={`${inter.className} min-h-screen bg-[#050505] text-white pt-36 flex flex-col items-center justify-center`}>
        <div className="w-10 h-10 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin mb-4" />
        <p className="font-mono text-xs uppercase tracking-widest text-gray-500">Retrieving Transmission...</p>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className={`${inter.className} min-h-screen bg-[#050505] text-white pt-36 px-6 flex flex-col items-center justify-center text-center`}>
        <AlertCircle className="w-12 h-12 text-red-500/80 mb-4 animate-bounce" />
        <h1 className="text-3xl font-bold uppercase mb-2">Transmission Lost</h1>
        <p className="text-gray-500 font-light max-w-sm mb-8">
          The requested article could not be resolved or has been retracted by network administration.
        </p>
        <Link href="/blog">
          <button className="px-6 py-3 border border-white/20 text-white font-bold uppercase text-xs tracking-widest rounded-full hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </button>
        </Link>
      </main>
    );
  }

  const formattedDate = post.createdAt?.seconds 
    ? new Date(post.createdAt.seconds * 1000).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric"
      })
    : "Recent";

  return (
    <main className={`${inter.className} min-h-screen bg-[#050505] text-white pt-36 pb-24 px-6 overflow-x-hidden`}>
      <SchemaMarkup
        type="Article"
        data={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          featuredImage: post.featuredImage,
          author: post.author,
          createdAt: post.createdAt?.seconds 
            ? new Date(post.createdAt.seconds * 1000).toISOString() 
            : new Date().toISOString(),
          updatedAt: post.updatedAt?.seconds 
            ? new Date(post.updatedAt.seconds * 1000).toISOString() 
            : undefined,
        }}
      />
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#D4AF37] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Embedded CSS for prose styling */}
      <style jsx global>{`
        .blog-content p {
          margin-bottom: 1.75rem;
          line-height: 1.8;
          color: #ccc;
          font-weight: 300;
        }
        .blog-content h2 {
          font-size: 1.75rem;
          font-weight: 800;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          border-left: 3px solid #D4AF37;
          padding-left: 1rem;
        }
        .blog-content h3 {
          font-size: 1.4rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #fff;
        }
        .blog-content ul {
          list-style-type: square;
          padding-left: 1.5rem;
          margin-bottom: 1.75rem;
          color: #ccc;
          font-weight: 300;
        }
        .blog-content ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1.75rem;
          color: #ccc;
          font-weight: 300;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
          line-height: 1.7;
        }
        .blog-content pre {
          background-color: #0A0A0A;
          padding: 1.5rem;
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow-x: auto;
          margin-bottom: 1.75rem;
          font-family: monospace;
          color: #e5e7eb;
        }
        .blog-content code {
          background-color: rgba(255, 255, 255, 0.06);
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-family: monospace;
          font-size: 0.9em;
          color: #D4AF37;
        }
        .blog-content img {
          border-radius: 1rem;
          margin: 2rem auto;
          max-width: 100%;
          height: auto;
          display: block;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>

      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#D4AF37]/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#D4AF37] transition-colors mb-10 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to transmissions</span>
        </Link>

        {/* Article Header */}
        <header className="mb-10">
          <span className={`${mono.className} text-[10px] tracking-widest uppercase border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] px-3 py-1 rounded-full mb-6 inline-block`}>
            {post.category || "General"}
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] uppercase text-white mb-6">
            {post.title}
          </h1>

          {/* Article Info Bar */}
            <div className="flex flex-wrap items-center justify-between gap-6 border-y border-white/10 py-6">
            <div className="flex items-center gap-6 text-gray-400 text-xs font-mono uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#D4AF37]" />
                {post.author || "Soham Sharma"}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                {formattedDate}
              </span>
              {post.readTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  {post.readTime} min read
                </span>
              )}
              <span className="flex items-center gap-1.5 text-[#D4AF37]/70">
                <Eye className="w-4 h-4" />
                {viewCount.toLocaleString()} views
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Like Button */}
              <button
                onClick={handleLike}
                disabled={likeLoading}
                className={`flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider cursor-pointer transition-all duration-300 px-3 py-1.5 rounded-full border ${
                  liked
                    ? "text-pink-400 border-pink-400/40 bg-pink-400/10 hover:bg-pink-400/20"
                    : "text-gray-400 border-white/10 hover:text-pink-400 hover:border-pink-400/30 bg-transparent"
                } disabled:opacity-50`}
              >
                <Heart className={`w-3.5 h-3.5 transition-all ${liked ? "fill-pink-400" : ""}`} />
                <span>{likeCount.toLocaleString()}</span>
              </button>

              {/* Share Button */}
              <button 
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#D4AF37] font-mono uppercase tracking-wider cursor-pointer transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative h-64 md:h-[400px] w-full overflow-hidden rounded-3xl border border-white/10 mb-12 shadow-2xl">
            <Image
              fill
              src={post.featuredImage}
              alt={post.title}
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Excerpt panel */}
        <div className="border-l-2 border-[#D4AF37] pl-6 mb-10 italic text-gray-400 text-lg font-light leading-relaxed">
          {post.excerpt}
        </div>

        {/* Main Content */}
        <article 
          className="blog-content text-gray-300 font-light leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Comments Section */}
        <div className="mt-16 pt-16 border-t border-white/10">
          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-2xl font-bold uppercase tracking-tight text-white">
              Discussion ({comments.length})
            </h2>
          </div>

          {/* Comments List */}
          <div className="space-y-6 mb-12">
            {comments.length === 0 ? (
              <p className="text-gray-500 font-light text-sm italic">
                No approved comments on this transmission yet. Be the first to share your thoughts!
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
                    className="flex gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02]"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-xs font-bold text-[#D4AF37] flex-shrink-0">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <span className="text-sm font-semibold text-white truncate">{c.name}</span>
                        <span className="text-[10px] font-mono text-gray-500">{dateStr}</span>
                      </div>
                      <p className="text-sm text-gray-400 font-light leading-relaxed whitespace-pre-wrap">
                        {c.content}
                      </p>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Comment Form */}
          <div className="rounded-3xl border border-white/10 bg-white/3 p-6 md:p-8">
            <h3 className="text-lg font-bold text-white mb-2 uppercase">Leave a Comment</h3>
            <p className="text-xs text-gray-500 mb-6 font-light">
              Your email address will not be published. Required fields are marked *
            </p>

            {commentStatus === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center gap-4 py-8"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white uppercase mb-1">Comment Submitted</h4>
                  <p className="text-xs text-gray-400 font-light max-w-sm">
                    Thank you! Your comment is pending moderator approval and will be visible shortly.
                  </p>
                </div>
                <button 
                  onClick={() => setCommentStatus("idle")}
                  className="px-6 py-2 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#D4AF37]/10 transition-all duration-300"
                >
                  Write Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`${mono.className} block text-[9px] text-gray-500 uppercase tracking-wider mb-1.5`}>
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={commentForm.name}
                      onChange={(e) => setCommentForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-[#D4AF37]/5 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className={`${mono.className} block text-[9px] text-gray-500 uppercase tracking-wider mb-1.5`}>
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={commentForm.email}
                      onChange={(e) => setCommentForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="you@company.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-[#D4AF37]/5 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className={`${mono.className} block text-[9px] text-gray-500 uppercase tracking-wider mb-1.5`}>
                    Comment *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={commentForm.content}
                    onChange={(e) => setCommentForm(f => ({ ...f, content: e.target.value }))}
                    placeholder="Share your thoughts on this transmission..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-[#D4AF37]/5 transition-all duration-300 resize-none"
                  />
                </div>

                {commentStatus === "error" && (
                  <p className="text-red-400 text-xs font-light">⚠️ {commentError}</p>
                )}

                <button
                  type="submit"
                  disabled={commentStatus === "submitting"}
                  className="px-6 py-3 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-yellow-300 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 flex items-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
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

        {/* Footer */}
        <div className="border-t border-white/10 mt-16 pt-10 text-center">
          <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/20 mx-auto mb-4">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold uppercase mb-2">End of Transmission</h3>
          <p className="text-gray-500 font-light text-sm max-w-sm mx-auto mb-6">
            Subscribe to our newsletter for more Generative AI insights and system updates.
          </p>
          <Link href="/contact">
            <button className="px-8 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-[#D4AF37] transition-colors cursor-pointer rounded-full">
              Get in Touch
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
