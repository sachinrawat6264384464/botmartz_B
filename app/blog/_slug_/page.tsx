"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen, AlertCircle } from "lucide-react";

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
  status: string;
}

export default function BlogSlugPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Scroll Progress Bar Setup
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
            </div>

            <button 
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#D4AF37] font-mono uppercase tracking-wider cursor-pointer transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
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
