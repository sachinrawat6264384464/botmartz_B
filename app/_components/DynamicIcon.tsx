"use client";

import dynamic from 'next/dynamic';
import { HelpCircle } from "lucide-react";

// Using next/dynamic with dynamicIconImports prevents loading the entire icon library
import dynamicIconImports from 'lucide-react/dynamicIconImports';

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function DynamicIcon({ name, className, size }: DynamicIconProps) {
  // Convert PascalCase to kebab-case for dynamicIconImports (e.g. HelpCircle -> help-circle)
  const kebabName = name
    ? name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase().replace(/^-/, '')
    : '';

  // Check if the icon exists in the dynamic imports map
  if (kebabName && (dynamicIconImports as any)[kebabName]) {
    const IconComponent = dynamic((dynamicIconImports as any)[kebabName]) as any;
    return <IconComponent className={className} size={size} />;
  }

  // Fallback icon
  return <HelpCircle className={className} size={size} />;
}
