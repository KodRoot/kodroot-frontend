"use client";

import type { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToSection } from "@/lib/scroll-to-section";

type AppLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

function homeHashId(href: string) {
  if (href.startsWith("/#")) {
    return href.slice(2);
  }
  if (href.startsWith("#")) {
    return href.slice(1);
  }
  return null;
}

export function AppLink({ href, className, children, onClick }: AppLinkProps) {
  const pathname = usePathname();
  const hashId = homeHashId(href);

  if (hashId) {
    const sectionId = hashId;

    function handleClick(event: MouseEvent<HTMLAnchorElement>) {
      if (pathname !== "/") {
        return;
      }

      if (!document.getElementById(sectionId)) {
        return;
      }

      event.preventDefault();
      onClick?.();
      window.history.pushState(null, "", `/#${sectionId}`);
      window.requestAnimationFrame(() => {
        scrollToSection(sectionId);
      });
    }

    return (
      <a href={`/#${sectionId}`} className={className} onClick={handleClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
