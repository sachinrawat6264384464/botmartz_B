import { Metadata } from "next";
import AISolutionsClient from "./AISolutionsClient";

export const metadata: Metadata = {
  title: "Generative AI Solutions & Custom AI Agents",
  description: "Accelerate operational efficiency with custom-trained AI agents, semantic RAG systems, context-aware LLMs, and multi-agent workflow automations.",
  keywords: [
    "Generative AI Solutions",
    "Enterprise AI Agents",
    "Retrieval-Augmented Generation",
    "Custom RAG Pipeline",
    "LLM Fine Tuning",
    "Workflow Automation Indore",
    "Botmartz AI Solutions",
    "Agentic AI Development",
    "Semantic Search Systems",
    "Custom GPT development",
    "Pinecone vector index integration",
    "FAISS Milvus setup",
    "Context aware LLM models"
  ],
  openGraph: {
    title: "Generative AI Solutions & Neural Automation | Botmartz",
    description: "Accelerate operational efficiency with custom-trained AI agents, semantic RAG systems, context-aware LLMs, and multi-agent workflow automations.",
    url: "https://botmartz.com/services/ai-solutions",
    type: "website",
  }
};

export default function AISolutionsPage() {
  return <AISolutionsClient />;
}
