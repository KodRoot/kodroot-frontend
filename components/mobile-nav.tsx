"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AppLink } from "@/components/app-link";
import { Logo } from "@/components/logo";
import { TextLink } from "@/components/ui/text-link";
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
        className="inline-flex min-h-11 min-w-11 items-center justify-end text-[13px] font-semibold uppercase tracking-label text-muted hover:text-ink motion-safe:transition-colors"
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
              className="inline-flex min-h-11 min-w-11 items-center justify-end text-[13px] font-semibold uppercase tracking-label text-muted hover:text-ink motion-safe:transition-colors"
              onClick={closeMenu}
            >
              Close
            </button>
          </div>
          <div className="relative mt-[1.125rem]" aria-hidden="true">
            <div className="h-px bg-ink/12" />
            <div className="absolute top-0 left-0 h-[2px] w-10 bg-mark" />
          </div>

          <h2 id={titleId} className="sr-only">
            Site menu
          </h2>

          <nav className="mt-16 flex flex-1 flex-col" aria-label="Primary">
            <ul className="flex flex-col border-t border-ink/12">
              {navItems.map((item) => (
                <li key={item.href} className="border-b border-ink/12">
                  <AppLink
                    href={item.href}
                    className="flex min-h-14 items-center py-4 text-3xl font-semibold tracking-tight"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </AppLink>
                </li>
              ))}
            </ul>
            <TextLink
              href={navCta.href}
              className="mt-10 w-fit"
              onClick={closeMenu}
            >
              {navCta.label}
            </TextLink>
          </nav>

          <p className="mt-auto pt-16 pb-8 text-muted">{site.tagline}</p>
        </div>
      </dialog>
    </div>
  );
}
