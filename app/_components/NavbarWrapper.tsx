// app/_components/NavbarWrapper.tsx
// Server Component — fetches nav config from Firestore, passes to client Navbar

import { adminDb } from "@/lib/firebase-admin";
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
    name: "Industries", path: "/industries",
    dropdown: [
      { name: "Healthcare", path: "/industries/healthcare" },
      { name: "Education", path: "/industries/education" },
      { name: "Logistics", path: "/industries/logistics" },
    ],
  },
  {
    name: "Work", path: "/work",
    dropdown: [
      { name: "Case Studies", path: "/work/case-studies" },
      { name: "Labs", path: "/work/labs" },
      { name: "Open Source", path: "/work/open-source" },
    ],
  },
  {
    name: "Engineering Insights", path: "/insights",
    dropdown: [
      { name: "New Updates", path: "/insights/updates" },
      { name: "All Insights", path: "/insights" },
    ],
  },
  {
    name: "Community", path: "/community",
    dropdown: [
      { name: "Events", path: "/community/events" },
      { name: "Discord & Forum", path: "/community" },
    ],
  },
  {
    name: "Careers", path: "/careers",
    dropdown: [
      { name: "Apply Now", path: "/careers#apply" },
    ],
  },
];

export default async function NavbarWrapper() {
  let navItems: NavItem[] = [];

  try {
    const docSnap = await adminDb.collection("site_config").doc("navbar").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      if (Array.isArray(data?.items) && data.items.length > 0) {
        navItems = data.items as NavItem[];
      }
    }
  } catch (err) {
    console.warn("NavbarWrapper: Could not fetch navbar config, using defaults:", err);
  }

  return <Navbar navItems={navItems.length > 0 ? navItems : DEFAULT_ITEMS} />;
}
