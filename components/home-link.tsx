"use client";

import type { MouseEvent, ReactNode } from "react";
import Link from "next/link";

type HomeLinkProps = {
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

export function HomeLink({
  className,
  children,
  "aria-label": ariaLabel,
}: HomeLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (window.location.pathname !== "/" || !window.location.hash) {
      return;
    }
    event.preventDefault();
    window.history.pushState(null, "", "/");
    window.scrollTo(0, 0);
  }

  return (
    <Link
      href="/"
      aria-label={ariaLabel}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
