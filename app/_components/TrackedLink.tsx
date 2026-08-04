"use client";

import React from "react";
import Link, { LinkProps } from "next/link";
import { trackEvent } from "@/lib/analytics";

interface TrackedLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
  children: React.ReactNode;
  eventName?: any;
  eventData?: any;
}

export default function TrackedLink({
  children,
  eventName = "link_click",
  eventData,
  onClick,
  ...props
}: TrackedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    trackEvent(eventName, eventData);
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
