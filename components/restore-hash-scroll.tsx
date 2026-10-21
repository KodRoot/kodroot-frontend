"use client";

import { useLayoutEffect } from "react";
import { scrollToSection } from "@/lib/scroll-to-section";

const PENDING_HASH_KEY = "kodroot-pending-hash";

function takeHashId() {
  try {
    const pending = sessionStorage.getItem(PENDING_HASH_KEY);
    if (pending) {
      sessionStorage.removeItem(PENDING_HASH_KEY);
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}${pending}`,
      );
      return pending.slice(1);
    }
  } catch {
    // Ignore storage access errors and fall back to the current hash.
  }

  return window.location.hash.slice(1);
}

function reveal() {
  document.documentElement.style.visibility = "";
}

function pin(id: string) {
  const target = document.getElementById(id);
  const active = document.activeElement;
  if (target && active instanceof HTMLElement && target.contains(active)) {
    active.blur();
  }
  scrollToSection(id);
}

function syncHash() {
  const id = takeHashId();
  if (id) {
    pin(id);
  }
  return id;
}

export function RestoreHashScroll() {
  useLayoutEffect(() => {
    const id = syncHash();
    const frame = window.requestAnimationFrame(() => {
      if (id) {
        pin(id);
      }
      reveal();
    });

    function onHashChange() {
      const current = window.location.hash.slice(1);
      if (current) {
        pin(current);
      }
    }

    window.addEventListener("popstate", onHashChange);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("popstate", onHashChange);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return null;
}
