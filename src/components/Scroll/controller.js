let engine = null;

export function setScrollEngine(value) { engine = value; }

export function scrollToSection(id, offset = 100) {
  const target = document.getElementById(id);
  if (!target) return;
  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
  if (engine) engine.scrollTo(top, { duration: .85 });
  else window.scrollTo({ top, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
}
