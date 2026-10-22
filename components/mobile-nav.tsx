"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AppLink } from "@/components/app-link";
import { Logo } from "@/components/logo";
import { TextLink } from "@/components/ui/text-link";
import { navCta, navItems } from "@/lib/navigation";

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
    const dialog = dialogRef.current;
    if (!dialog?.open) {
      return;
    }

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      dialog.close();
      return;
    }

    dialog.dataset.closing = "true";
    let finished = false;
    function finish() {
      if (finished) {
        return;
      }
      finished = true;
      delete dialog?.dataset.closing;
      if (dialog?.open) {
        dialog.close();
      }
    }

    dialog.addEventListener("animationend", finish, { once: true });
    window.setTimeout(finish, 320);
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

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-end text-[13px] font-semibold uppercase tracking-label text-paper/70 hover:text-paper motion-safe:transition-colors"
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
        className="fixed inset-0 z-50 m-0 h-full max-h-none w-full max-w-none border-0 bg-night p-0 text-paper backdrop:bg-night"
      >
        <div className="flex min-h-full flex-col bg-night px-5 py-5 text-paper sm:px-8">
          <div className="flex items-center justify-between gap-6">
            <Logo variant="dark" />
            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-end text-[13px] font-semibold uppercase tracking-label text-paper/70 hover:text-paper motion-safe:transition-colors"
              onClick={closeMenu}
            >
              Close
            </button>
          </div>
          <div className="mt-5 h-px bg-paper/15" aria-hidden="true" />

          <h2 id={titleId} className="sr-only">
            Site menu
          </h2>

          <nav className="mt-12 flex flex-1 flex-col" aria-label="Primary">
            <ul className="flex flex-col border-t border-paper/15">
              {navItems.map((item, index) => (
                <li
                  key={item.href}
                  className="menu-rise border-b border-paper/15"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <AppLink
                    href={item.href}
                    className="flex min-h-16 items-baseline justify-between gap-6 py-4"
                    onClick={closeMenu}
                  >
                    <span className="text-4xl leading-none font-semibold tracking-[-0.04em]">
                      {item.label}
                    </span>
                    <span className="text-[11px] font-semibold tracking-label text-paper/45">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </AppLink>
                </li>
              ))}
            </ul>
            <TextLink
              href={navCta.href}
              surface="night"
              className="mt-10 w-fit"
              onClick={closeMenu}
            >
              {navCta.label}
            </TextLink>
          </nav>
        </div>
      </dialog>
    </div>
  );
}
