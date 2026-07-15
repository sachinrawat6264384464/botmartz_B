import { Suspense } from "react";
import LabsTab from "./LabsTab";

export default function AdminLabsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-96 text-admin-text-muted text-sm">Loading...</div>}>
      <LabsTab />
    </Suspense>
  );
}
