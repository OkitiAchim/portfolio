import { useEffect, useRef, useState } from "react";

export const sections = [
  { id: "hero", label: "UNBOX", nav: "Home" },
  { id: "about", label: "About", nav: "About" },
  { id: "services", label: "Services", nav: "Services" },
  { id: "projects", label: "Projects", nav: "Work" },
  { id: "contact", label: "Contact", nav: "Contact" },
];
export const labelMotion = {
  enter: direction => ({ y: direction * 10, opacity: 0, filter: "blur(3px)" }),
  center: { y: 0, opacity: 1, filter: "blur(0px)" },
  exit: direction => ({ y: -direction * 10, opacity: 0, filter: "blur(3px)" }),
};

export default function useNavigationState() {
  const [reduced, setReduced] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [active, setActive] = useState({ ...sections[0], direction: 1 });
  const [tone, setTone] = useState("dark");
  const activeIndex = useRef(0);

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(preference.matches);
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let positions = [], raf = 0, alive = true;
    const update = () => {
      raf = 0;
      const line = window.scrollY + Math.min(window.innerHeight * .25, 160);
      let index = 0;
      positions.forEach((position, i) => { if (line >= position) index = i; });
      // Contrast follows the surface under the navbar, independently of the label.
      const navLine = window.scrollY + 55;
      setTone(navLine >= positions[2] && navLine < positions[3] ? "light" : "dark");
      if (index !== activeIndex.current) {
        const direction = index > activeIndex.current ? 1 : -1;
        activeIndex.current = index;
        setActive({ ...sections[index], direction });
      }
    };
    const measure = () => {
      if (!alive) return;
      positions = sections.map(section => {
        const element = document.getElementById(section.id);
        return element ? element.getBoundingClientRect().top + window.scrollY : Infinity;
      });
      update();
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(update); };
    const observer = new ResizeObserver(measure);
    sections.forEach(section => { const element = document.getElementById(section.id); if (element) observer.observe(element); });
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    document.fonts?.ready.then(measure);
    measure();
    return () => { alive = false; cancelAnimationFrame(raf); observer.disconnect(); window.removeEventListener("scroll", queue); window.removeEventListener("resize", measure); };
  }, []);

  return { active, reduced, tone };
}
