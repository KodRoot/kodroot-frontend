"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function RevealGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    if (CSS.supports("animation-timeline: view()")) {
      return;
    }

    const items = [...node.querySelectorAll<HTMLElement>(".replay")];
    const targets = items.length > 0 ? items : [node];
    node.dataset.arm = "true";

    for (const item of targets) {
      const rect = item.getBoundingClientRect();
      const visible = rect.top < window.innerHeight * 0.88 && rect.bottom > 0;
      if (visible) {
        item.dataset.seen = "true";
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const item = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            item.dataset.seen = "true";
          } else if (entry.boundingClientRect.top >= 0) {
            delete item.dataset.seen;
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );

    for (const item of targets) {
      observer.observe(item);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal-group ${className}`.trim()}>
      {children}
    </div>
  );
}
