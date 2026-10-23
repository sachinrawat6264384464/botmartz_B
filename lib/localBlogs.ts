import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface LocalBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  content: string;
  author: string;
  category: string;
  tags?: string[];
  date: string;
  createdAt: string;
  updatedAt: string;
  readTime: string;
  readTimeMinutes: number;
  featured?: boolean;
  featuredImage?: string;
  colabLink?: string;
  notebookLink?: string;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .trim();
}

function getMdFiles(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getMdFiles(full));
    } else if (file.endsWith(".md")) {
      results.push(full);
    }
  }
  return results;
}

let cachedBlogs: LocalBlog[] | null = null;
let blogsBySlug: Map<string, LocalBlog> | null = null;

export function getAllLocalBlogs(): LocalBlog[] {
  if (cachedBlogs) return cachedBlogs;

  const blogsDir = path.join(process.cwd(), "blogs");
  const files = getMdFiles(blogsDir);
  const blogs: LocalBlog[] = [];
  const map = new Map<string, LocalBlog>();

  for (const file of files) {
    try {
      const raw = fs.readFileSync(file, "utf-8");
      const { data, content } = matter(raw);
      if (!data.title) continue;

      const title = String(data.title).trim();
      const slug = data.slug || slugify(title);
      const excerpt = data.excerpt || "";
      const author = data.authorName || data.author || "Botmartz Team";
      
      const rawCategory = data.category || path.basename(path.dirname(file)) || "AI Engineering";
      const category = rawCategory
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c: string) => c.toUpperCase());
        
      const dateStr = data.date || (data.publishedAt ? new Date(data.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent");
      const readMinutes = data.readTime || Math.max(3, Math.ceil(content.split(/\s+/).length / 200));

      const blog: LocalBlog = {
        id: `local-${slug}`,
        title,
        slug,
        excerpt,
        description: excerpt,
        content,
        author,
        category,
        tags: Array.isArray(data.tags) ? data.tags : [],
        date: dateStr,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        readTime: `${readMinutes} min read`,
        readTimeMinutes: readMinutes,
        featured: !!data.featured,
        featuredImage: data.featuredImage || data.coverImage || "",
        notebookLink: data.colab_notebook || data.notebookLink || "",
        colabLink: data.colab_notebook || data.colabLink || "",
      };

      blogs.push(blog);
      map.set(slug, blog);
    } catch (e) {
      console.error("Error parsing local blog:", file, e);
    }
  }

  cachedBlogs = blogs;
  blogsBySlug = map;
  return blogs;
}

export function getLocalBlogBySlug(slug: string): LocalBlog | null {
  if (!blogsBySlug) {
    getAllLocalBlogs();
  }
  return blogsBySlug?.get(slug) || null;
}
