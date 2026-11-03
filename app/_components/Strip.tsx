import React from "react";

export default function Strip() {
  return (
    <div className="w-full bg-white border-b border-[#E2E8F0]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <span className="font-bold tracking-wider text-[#64748B] uppercase">
          ENGINEERING PRIORITIES
        </span>
        <span className="text-[#334155] font-medium flex items-center gap-1.5">
          <b className="text-[#0284C7] text-sm leading-none">↗</b> Built around your data
        </span>
        <span className="text-[#334155] font-medium flex items-center gap-1.5">
          <b className="text-[#0284C7] text-sm leading-none">↗</b> Tested against real questions
        </span>
        <span className="text-[#334155] font-medium flex items-center gap-1.5">
          <b className="text-[#0284C7] text-sm leading-none">↗</b> Designed for controlled deployment
        </span>
      </div>
    </div>
  );
}
