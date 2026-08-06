"use client";

import React from "react";
import * as LucideIcons from "lucide-react";
import { HelpCircle } from "lucide-react";

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function DynamicIcon({ name, className, size = 24 }: DynamicIconProps) {
  if (!name) return <HelpCircle className={className} size={size} />;

  // Map common PascalCase or kebab-case icon names to Lucide icon components
  const PascalName = name
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

  const IconComponent =
    (LucideIcons as any)[name] ||
    (LucideIcons as any)[PascalName] ||
    LucideIcons.HelpCircle;

  const Component = typeof IconComponent === "function" ? IconComponent : HelpCircle;
  return <Component className={className} size={size} />;
}
