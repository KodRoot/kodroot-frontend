"use client";

import { useEffect, useRef } from "react";

export function ScrollReplay() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stage = ref.current?.parentElement;
    if (!stage) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    stage.classList.add("scroll-stage");
    let away = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }
        if (entry.intersectionRatio <= 0.2) {
          away = true;
          stage.dataset.phase = "away";
          return;
        }
        if (away) {
          stage.dataset.phase = "play";
          away = false;
        }
      },
      { threshold: [0, 0.2, 0.45, 0.75, 1] },
    );
    observer.observe(stage);

    return () => {
      observer.disconnect();
      stage.classList.remove("scroll-stage");
      delete stage.dataset.phase;
    };
  }, []);

  return <span ref={ref} hidden />;
}
