import { Suspense } from "react";
import CRMTab from "./CRMTab";

export default function AdminCRMPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-96 text-admin-text-muted text-sm">Loading...</div>}>
      <CRMTab />
    </Suspense>
  );
}
