// app/_components/NavbarWrapper.tsx
// Server Component — fetches nav config from Firestore, passes to client Navbar

import { getCachedNavbarConfig } from "@/lib/fetch-helpers";
import Navbar, { NavItem } from "./navbar";

const DEFAULT_ITEMS: NavItem[] = [
  { name: "Home", path: "/" },
  {
    name: "Services", path: "/services",
    dropdown: [
      { name: "Enterprise RAG", path: "/services/enterprise-rag" },
      { name: "AI Agents", path: "/services/ai-agents" },
    ],
  },
  {
    name: "Work", path: "/work",
    dropdown: [
      { name: "Labs", path: "/work/labs" },
      { name: "Open Source", path: "/work/open-source" },
    ],
  },
  {
    name: "Engineering Insights", path: "/insights",
  },
  {
    name: "Community", path: "https://community.botmartz.com",
  },
];

export default async function NavbarWrapper({ settings }: { settings?: any }) {
  let navItems: NavItem[] = [];
  // Logo uses settings or falls back
  const logoUrl = "/Logo-removebg-preview.png";

  try {
    const cachedItems = await getCachedNavbarConfig();
    if (cachedItems) {
      navItems = cachedItems as NavItem[];
    }
  } catch (err) {
    console.warn("NavbarWrapper: Could not fetch config, using defaults:", err);
  }

  return <Navbar navItems={navItems.length > 0 ? navItems : DEFAULT_ITEMS} logoUrl={logoUrl} />;
}
