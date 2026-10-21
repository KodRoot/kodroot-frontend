export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) {
    return;
  }

  const header = document.querySelector("header");
  const offset = header?.getBoundingClientRect().height ?? 0;
  const top = window.scrollY + target.getBoundingClientRect().top - offset;
  window.scrollTo(0, Math.max(0, top));
}
