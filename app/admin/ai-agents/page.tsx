import { redirect } from "next/navigation";

export default function AdminAiAgentsRedirect() {
  redirect("/admin/projects");
}
