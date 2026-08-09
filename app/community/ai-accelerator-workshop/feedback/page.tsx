import { redirect } from "next/navigation";

// Redirect /community/ai-accelerator-workshop/feedback
// to the actual feedback page for the AI Frontier 2026 event
export default function WorkshopFeedbackRedirect() {
  redirect("/community/events/ai-frontier-2026/feedback");
}
