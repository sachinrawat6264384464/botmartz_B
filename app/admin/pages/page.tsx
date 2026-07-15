"use client";

import { Suspense } from "react";
import PagesTab from "./PagesTab";

export default function PagesAdminPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center h-96">
        <div className="w-5 h-5 border-2 border-zinc-700 border-t-admin-accent rounded-full animate-spin mb-4" />
        <p className="text-xs text-admin-text-muted font-mono">Loading Page Manager...</p>
      </div>
    }>
      <PagesTab />
    </Suspense>
  );
}
