"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function HeroPointer({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) {
      return;
    }

    function move(event: PointerEvent) {
      const current = ref.current;
      if (!current) {
        return;
      }
      const rect = current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      current.style.setProperty("--mx", x.toFixed(3));
      current.style.setProperty("--my", y.toFixed(3));
    }

    function leave() {
      const current = ref.current;
      if (!current) {
        return;
      }
      current.style.setProperty("--mx", "0");
      current.style.setProperty("--my", "0");
    }

    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", leave);
    return () => {
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className="hero-pointer flex min-h-full flex-1 flex-col">
      {children}
    </div>
  );
}
