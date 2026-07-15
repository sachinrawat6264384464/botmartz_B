// app/admin/Blogs/page.tsx
// Auth + permission guard is handled by AdminShell — no local auth check needed.
"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { BlogPost } from "@/types/admin";
import BlogsTab from "./BlogsTab";
import BlogEditorModal from "./Components/blogEditor";

export default function BlogsPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBlogEditor, setShowBlogEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  // Fetch blog posts
  useEffect(() => {
    const q = query(collection(db, "blog-posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData: BlogPost[] = [];
      snapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() } as BlogPost);
      });
      setBlogPosts(postsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDeleteBlog = async (id: string) => {
    try {
      await deleteDoc(doc(db, "blog-posts", id));
    } catch (error) {
      console.error("Error deleting blog:", error);
      throw error;
    }
  };

  const handleEditBlog = (blog: BlogPost) => {
    setEditingBlog(blog);
    setShowBlogEditor(true);
  };

  const handleNewBlog = () => {
    setEditingBlog(null);
    setShowBlogEditor(true);
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-line border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <BlogsTab
        blogPosts={blogPosts}
        onDeleteBlog={handleDeleteBlog}
        onEditBlog={handleEditBlog}
        onNewBlog={handleNewBlog}
        formatDate={formatDate}
      />

      {showBlogEditor && (
        <BlogEditorModal
          blog={editingBlog}
          onClose={() => {
            setShowBlogEditor(false);
            setEditingBlog(null);
          }}
          onSave={() => {
            setShowBlogEditor(false);
            setEditingBlog(null);
          }}
        />
      )}
    </>
  );
}