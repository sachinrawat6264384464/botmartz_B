"use client";

import * as Icons from "lucide-react";

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function DynamicIcon({ name, className, size }: DynamicIconProps) {
  // Safe resolver for lucide icons
  const IconComponent = (Icons as any)[name];

  if (!IconComponent) {
    // Return a default fallback icon if the icon key is invalid or missing
    return <Icons.HelpCircle className={className} size={size} />;
  }

  return <IconComponent className={className} size={size} />;
}
