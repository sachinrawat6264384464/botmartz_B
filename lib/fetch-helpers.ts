import { cache } from "react";
import { unstable_cache } from "next/cache";
import { adminDb } from "@/lib/firebase-admin";

/**
 * High-performance server-side caching layer for Botmartz.
 * Combines `React.cache()` (deduplicates requests during a single server render lifecycle)
 * with Next.js `unstable_cache` (persists data across requests with revalidation).
 */

// 1. Global Settings Cache (Used in RootLayout and Metadata)
export const getCachedGlobalSettings = cache(async () => {
  return unstable_cache(
    async () => {
      try {
        const docSnap = await adminDb.collection("settings").doc("global").get();
        if (docSnap.exists) {
          return docSnap.data();
        }
      } catch (err) {
        console.warn("Failed to fetch global settings from cache:", err);
      }
      return {};
    },
    ["settings-global-cache"],
    { revalidate: 3600, tags: ["settings"] }
  )();
});

// 2. Navbar Config Cache (Used in NavbarWrapper)
export const getCachedNavbarConfig = cache(async () => {
  return unstable_cache(
    async () => {
      try {
        const docSnap = await adminDb.collection("site_config").doc("navbar").get();
        if (docSnap.exists) {
          const data = docSnap.data();
          if (Array.isArray(data?.items) && data.items.length > 0) {
            return data.items;
          }
        }
      } catch (err) {
        console.warn("Failed to fetch navbar config from cache:", err);
      }
      return null;
    },
    ["site-config-navbar-cache"],
    { revalidate: 3600, tags: ["site_config"] }
  )();
});

// 3. Dynamic Page Metadata and Content Cache (Used across page.tsx and generateMetadata)
export const getCachedDynamicPage = cache(async (slug: string) => {
  return unstable_cache(
    async () => {
      try {
        const docSnap = await adminDb.collection("dynamic_pages").doc(slug).get();
        if (docSnap.exists) {
          return docSnap.data();
        }
      } catch (err) {
        console.warn(`Failed to fetch dynamic page (${slug}) from cache:`, err);
      }
      return null;
    },
    [`dynamic-page-cache-${slug}`],
    { revalidate: 600, tags: ["dynamic_pages", slug] }
  )();
});
