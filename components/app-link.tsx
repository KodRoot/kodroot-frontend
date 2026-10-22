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
  "aria-label"?: string;
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

export function AppLink({
  href,
  className,
  children,
  onClick,
  "aria-label": ariaLabel,
}: AppLinkProps) {
  const pathname = usePathname();
  const hashId = homeHashId(href);

  const currentPage = !hashId && href === pathname;

  if (hashId) {
    const sectionId = hashId;

    function handleHashClick(event: MouseEvent<HTMLAnchorElement>) {
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
        scrollToSection(sectionId, "smooth");
      });
    }

    return (
      <a
        href={`/#${sectionId}`}
        className={className}
        aria-label={ariaLabel}
        onClick={handleHashClick}
      >
        {children}
      </a>
    );
  }

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (href === "/" && pathname === "/" && window.location.hash) {
      event.preventDefault();
      onClick?.();
      window.history.pushState(null, "", "/");
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      return;
    }

    onClick?.();
  }

  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      aria-current={currentPage ? "page" : undefined}
      transitionTypes={[href === "/" ? "nav-back" : "nav-forward"]}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
