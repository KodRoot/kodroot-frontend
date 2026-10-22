export function revealInquiry(
  panel: HTMLElement | null,
  focus: HTMLElement | null,
) {
  if (!panel) {
    return;
  }

  const active = document.activeElement;
  if (active instanceof HTMLElement && active !== focus) {
    active.blur();
  }

  const margin =
    Number.parseFloat(getComputedStyle(panel).scrollMarginTop) || 0;
  const top = Math.max(
    0,
    window.scrollY + panel.getBoundingClientRect().top - margin,
  );
  window.scrollTo({ top, behavior: "auto" });
  focus?.focus({ preventScroll: true });
}
