import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Insights",
  description: "Read our latest publications on Artificial Intelligence, neural systems, automated agent workflows, and modern high-performance web development.",
  keywords: [
    "Botmartz Blog",
    "AI News Indore",
    "Generative AI Insights",
    "Software Engineering Trends"
  ],
  openGraph: {
    title: "Engineering Insights",
    description: "Read our latest publications on Artificial Intelligence, neural systems, automated agent workflows, and modern high-performance web development.",
    url: "https://www.botmartz.com/insights",
    type: "website",
  },
  alternates: {
    canonical: "https://www.botmartz.com/insights",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
