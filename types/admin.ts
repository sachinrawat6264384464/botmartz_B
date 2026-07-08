// types/admin.ts

export interface BlogPost {
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
  status: "draft" | "published";
  createdAt: any; // Firebase Timestamp
  updatedAt?: any;
  publishedAt?: any;
  readTime?: number;
  views?: number;
  likes?: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  clientName?: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  featuredImageAlt?: string;
  featuredImageName?: string;
  status: "draft" | "published";
  createdAt: any; // Firebase Timestamp
  updatedAt?: any;
  publishedAt?: any;
  readTime?: number;
  views?: number;
  likes?: number;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: "new" | "read";
  createdAt: any;
}

export interface Subscriber {
  id: string;
  name: string;
  email: string;
  subscribedAt: any;
  source?: string;
  status: "active" | "unsubscribed";
}

export interface Comment {
  id: string;
  blogId: string;
  blogTitle?: string;
  author: string;
  email: string;
  content: string;
  status: "pending" | "approved" | "rejected";
  createdAt: any;
}