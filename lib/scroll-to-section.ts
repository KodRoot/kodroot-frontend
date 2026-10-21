export function scrollToSection(id: string, behavior: ScrollBehavior = "auto") {
  const target = document.getElementById(id);
  if (!target) {
    return;
  }

  const header = document.querySelector("header");
  const offset = header?.getBoundingClientRect().height ?? 0;
  const top = window.scrollY + target.getBoundingClientRect().top - offset;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({
    top: Math.max(0, top),
    behavior: reduce ? "auto" : behavior,
  });
}
