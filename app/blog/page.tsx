"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy, doc, updateDoc, increment } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Calendar, Clock, ArrowRight, BookMarked, Eye, Heart } from "lucide-react";

const inter = Inter_Tight({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "900"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  featuredImage?: string;
  createdAt: any;
  readTime?: number;
  views?: number;
  likes?: number;
  status: string;
}

export default function BlogIndexPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  // Track which post IDs the user has liked in this session
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [likingPost, setLikingPost] = useState<string | null>(null);

  const handleCardLike = async (e: React.MouseEvent, post: BlogPost) => {
    e.preventDefault(); // don't navigate to article
    e.stopPropagation();
    if (likingPost === post.id) return;

    setLikingPost(post.id);
    const postRef = doc(db, "blog-posts", post.id);
    const isLiked = likedPosts.has(post.id);

    try {
      await updateDoc(postRef, { likes: increment(isLiked ? -1 : 1) });
      // Optimistic update
      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id
            ? { ...p, likes: Math.max(0, (p.likes ?? 0) + (isLiked ? -1 : 1)) }
            : p
        )
      );
      setLikedPosts((prev) => {
        const next = new Set(prev);
        isLiked ? next.delete(post.id) : next.add(post.id);
        return next;
      });
    } catch (err) {
      console.error("Failed to update likes:", err);
    } finally {
      setLikingPost(null);
    }
  };

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const postsRef = collection(db, "blog-posts");
        const q = query(
          postsRef,
          where("status", "==", "published"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const fetchedPosts: BlogPost[] = [];
        querySnapshot.forEach((doc) => {
          fetchedPosts.push({ id: doc.id, ...doc.data() } as BlogPost);
        });
        setPosts(fetchedPosts);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogPosts();
  }, []);

  return (
    <main className={`${inter.className} min-h-screen bg-[#050505] text-white pt-36 pb-24 px-6 md:px-10 lg:px-16`}>
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/3 w-[800px] h-[350px] bg-[#D4AF37]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-[#D4AF37]/3 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Eyebrow & Title */}
        <div className="mb-16 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`inline-flex items-center gap-2 text-[#D4AF37] ${mono.className} text-xs tracking-widest mb-4`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>TRANSITIONS_AND_TRANSMISSIONS // THE_BLOG</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9] uppercase"
          >
            Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-white">Perspectives</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mt-6"
          >
            Deep dives into workflow automation, agentic neural models, high-performance web optimization, and modern software architecture.
          </motion.p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border border-white/5 bg-white/[0.01] rounded-2xl p-6 h-[400px] flex flex-col justify-between animate-pulse">
                <div className="w-full h-48 bg-white/5 rounded-xl mb-4" />
                <div className="space-y-3">
                  <div className="h-4 bg-white/10 w-1/4 rounded" />
                  <div className="h-6 bg-white/10 w-3/4 rounded" />
                  <div className="h-4 bg-white/10 w-5/6 rounded" />
                </div>
                <div className="h-6 bg-white/10 w-1/3 rounded mt-4" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 border border-white/5 bg-white/[0.01] rounded-3xl"
          >
            <BookOpen className="w-16 h-16 text-[#D4AF37] mx-auto mb-4 opacity-40 animate-pulse" />
            <h2 className="text-2xl font-bold uppercase mb-2">No Transmissions Yet</h2>
            <p className="text-gray-500 font-light max-w-sm mx-auto">
              We are currently drafting technical guides. Check back soon for first-edition publishing.
            </p>
          </motion.div>
        ) : (
          /* Blog Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => {
              const formattedDate = post.createdAt?.seconds 
                ? new Date(post.createdAt.seconds * 1000).toLocaleDateString("en-US", {
                    year: "numeric", month: "short", day: "numeric"
                  })
                : "Recent";

              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative flex flex-col border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-[#D4AF37]/20 rounded-2xl overflow-hidden transition-all duration-300 h-full"
                >
                  {/* Card Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-white/5">
                    {post.featuredImage ? (
                      <Image
                        fill
                        src={post.featuredImage}
                        alt={post.title}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#D4AF37]/5 to-transparent">
                        <BookOpen className="w-12 h-12 text-[#D4AF37]/25" />
                      </div>
                    )}
                    <span className={`absolute top-4 left-4 ${mono.className} text-[9px] tracking-widest uppercase border border-[#D4AF37]/30 bg-black/60 backdrop-blur-md text-[#D4AF37] px-2.5 py-1 rounded`}>
                      {post.category || "General"}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-gray-500 text-[10px] font-mono uppercase tracking-wider mb-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {formattedDate}
                        </span>
                        {post.readTime && (
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime} min read
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-[#D4AF37]/60">
                          <Eye className="w-3.5 h-3.5" />
                          {(post.views ?? 0).toLocaleString()}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug mb-3">
                        {post.title}
                      </h3>

                      <p className="text-gray-400 text-sm font-light leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Bottom Bar: Read + Like */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:text-white transition-colors">
                        <span>Read Article</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      {/* Like Button */}
                      <button
                        onClick={(e) => handleCardLike(e, post)}
                        disabled={likingPost === post.id}
                        className={`flex items-center gap-1.5 text-xs font-mono transition-all duration-300 px-2.5 py-1.5 rounded-full border ${
                          likedPosts.has(post.id)
                            ? "text-pink-400 border-pink-400/30 bg-pink-400/10"
                            : "text-gray-500 border-white/10 hover:text-pink-400 hover:border-pink-400/30"
                        } disabled:opacity-50 cursor-pointer`}
                      >
                        <Heart
                          className={`w-3 h-3 transition-all ${
                            likedPosts.has(post.id) ? "fill-pink-400" : ""
                          }`}
                        />
                        <span>{(post.likes ?? 0).toLocaleString()}</span>
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
