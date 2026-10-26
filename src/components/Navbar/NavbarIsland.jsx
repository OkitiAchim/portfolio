import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scrollToSection } from "../Scroll/controller";
import "./navbar-island.css";

const sections = [
  { id: "hero", label: "UNBOX", nav: "Home" },
  { id: "about", label: "About", nav: "About" },
  { id: "services", label: "Services", nav: "Services" },
  { id: "projects", label: "Projects", nav: "Work" },
  { id: "contact", label: "Contact", nav: "Contact" },
];
const labelMotion = {
  enter: direction => ({ y: direction * 10, opacity: 0, filter: "blur(3px)" }),
  center: { y: 0, opacity: 1, filter: "blur(0px)" },
  exit: direction => ({ y: -direction * 10, opacity: 0, filter: "blur(3px)" }),
};

export default function NavbarIsland() {
  const [collapsed, setCollapsed] = useState(false);
  const [reduced, setReduced] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [active, setActive] = useState({ ...sections[0], direction: 1 });
  const [tone, setTone] = useState("dark");
  const activeIndex = useRef(0);
  const toggle = useRef(null);

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

  const onKeyDown = event => {
    if (event.key === "Escape" && !collapsed) {
      setCollapsed(true); toggle.current?.focus();
    }
  };

  return <header className="ni-header" data-tone={tone} onKeyDown={onKeyDown}>
    <div className="ni-island" data-collapsed={collapsed}>
      <motion.div className="ni-expanded" inert={collapsed ? true : undefined} aria-hidden={collapsed} initial={false}
        animate={{ opacity: collapsed ? 0 : 1 }} transition={{ delay: reduced || collapsed ? 0 : .2, duration: reduced ? 0 : collapsed ? .12 : .25 }}>
          <button type="button" className="ni-brand" aria-label="Return to homepage" onClick={() => scrollToSection("hero", 0)}>UNBOX<span>.</span></button>
          <nav id="ni-section-links" className="ni-links" aria-label="Primary navigation">
            {sections.slice(1).map(section => <button type="button" key={section.id} aria-current={active.id === section.id ? "location" : undefined} onClick={() => scrollToSection(section.id)}>{section.nav}<i aria-hidden="true" /></button>)}
          </nav>
      </motion.div>
      <button type="button" ref={toggle} className="ni-toggle" aria-expanded={!collapsed} aria-controls="ni-section-links"
        aria-label={collapsed ? `Expand navigation, current section: ${active.label}` : "Collapse navigation"} onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <><span className="ni-status-dot" aria-hidden="true" /><span className="ni-label-window">
          <AnimatePresence initial={false} mode="wait" custom={active.direction}>
            <motion.span key={active.id} className={`ni-label ${active.id === "hero" ? "ni-label-brand" : ""}`} custom={active.direction}
              variants={labelMotion} initial="enter" animate="center" exit="exit" transition={{ duration: reduced ? 0 : .23, ease: [.22, 1, .36, 1] }}>{active.label}</motion.span>
          </AnimatePresence>
        </span></> : null}
        {collapsed
          ? <svg className="ni-expand-icon" width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M7 6 3 10l4 4M13 6l4 4-4 4" /></svg>
          : <svg className="ni-collapse-icon" width="24" height="18" viewBox="0 0 28 20" fill="none" aria-hidden="true"><path d="m4 5 5 5-5 5m20-10-5 5 5 5" /><path className="ni-center-line" d="M14 6v8" /></svg>}
      </button>
    </div>
  </header>;
}
