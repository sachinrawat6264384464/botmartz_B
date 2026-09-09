import { Metadata } from "next";
import InsuranceLabClient from "./InsuranceLabClient";

export const metadata: Metadata = {
  title: "Insurance Intelligence Lab [Reference Implementation]",
  description: "A production reference implementation for multi-document insurance policy comparison, clause discrepancy analysis, and strict citation grounding over complex regulatory filings.",
  openGraph: {
    title: "Insurance Intelligence Lab [Reference Implementation]",
    description: "Multi-document policy comparison, clause variance extraction, and zero-hallucination citation enforcement for insurance and financial services.",
    url: "https://www.botmartz.com/work/labs/insurance-intelligence",
    type: "article",
  },
  alternates: {
    canonical: "https://www.botmartz.com/work/labs/insurance-intelligence",
  },
};

export default function InsuranceLabPage() {
  return <InsuranceLabClient />;
}
