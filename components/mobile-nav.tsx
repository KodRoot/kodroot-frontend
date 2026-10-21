"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { navCta, navItems } from "@/lib/navigation";
import { site } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  function openMenu() {
    dialogRef.current?.showModal();
    setOpen(true);
  }

  function closeMenu() {
    dialogRef.current?.close();
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    function handleClose() {
      setOpen(false);
      buttonRef.current?.focus();
    }

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        dialogRef.current?.close();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-end text-[13px] font-semibold uppercase tracking-label text-muted"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-haspopup="dialog"
        onClick={openMenu}
      >
        Menu
      </button>
      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        aria-labelledby={titleId}
        className="fixed inset-0 z-50 m-0 h-full max-h-none w-full max-w-none border-0 bg-paper p-0 text-ink backdrop:bg-paper"
      >
        <div className="flex min-h-full flex-col bg-paper px-6 py-[1.125rem] text-ink">
          <div className="flex items-center justify-between gap-6">
            <Logo />
            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-end text-[13px] font-semibold uppercase tracking-label text-muted"
              onClick={closeMenu}
            >
              Close
            </button>
          </div>

          <h2 id={titleId} className="sr-only">
            Site menu
          </h2>

          <nav className="mt-16 flex flex-1 flex-col" aria-label="Primary">
            <ul className="flex flex-col border-t border-ink/12">
              {navItems.map((item) => (
                <li key={item.href} className="border-b border-ink/12">
                  <Link
                    href={item.href}
                    className="flex min-h-14 items-center py-4 text-3xl font-semibold tracking-tight"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={navCta.href}
              className="mt-10 inline-flex w-fit border-b-2 border-mark pb-1 text-[13px] font-semibold uppercase tracking-label"
              onClick={closeMenu}
            >
              {navCta.label}
            </Link>
          </nav>

          <p className="mt-auto pb-8 pt-16 text-muted">{site.tagline}</p>
        </div>
      </dialog>
    </div>
  );
}
