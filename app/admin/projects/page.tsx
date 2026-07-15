import { Suspense } from "react";
import ProjectsTab from "./ProjectsTab";

export default function AdminProjectsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-96 text-admin-text-muted text-sm">Loading...</div>}>
      <ProjectsTab />
    </Suspense>
  );
}
