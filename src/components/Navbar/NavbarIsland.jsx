import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scrollToSection } from "../Scroll/controller";
import useNavigationState, { sections, labelMotion } from "./useNavigationState";
import "./navbar-island.css";

export default function NavbarIsland() {
  const [collapsed, setCollapsed] = useState(false);
  const { active, reduced, tone } = useNavigationState();
  const toggle = useRef(null);

  const navigate = id => {
    if (matchMedia("(max-width: 1023px)").matches) {
      setCollapsed(true);
      toggle.current?.focus({ preventScroll: true });
    }
    scrollToSection(id, id === "hero" ? 0 : 100);
  };

  const onKeyDown = event => {
    if (event.key === "Escape" && !collapsed) {
      setCollapsed(true); toggle.current?.focus();
    }
  };

  return <header className="ni-header" data-tone={tone} onKeyDown={onKeyDown}>
    <div className="ni-island" data-collapsed={collapsed}>
      <motion.div className="ni-expanded" inert={collapsed ? true : undefined} aria-hidden={collapsed} initial={false}
        animate={{ opacity: collapsed ? 0 : 1 }} transition={{ delay: reduced || collapsed ? 0 : .2, duration: reduced ? 0 : collapsed ? .12 : .25 }}>
          <button type="button" className="ni-brand" aria-label="Return to homepage" onClick={() => navigate("hero")}>UNBOX<span>.</span></button>
          <nav id="ni-section-links" className="ni-links" aria-label="Primary navigation">
            {sections.slice(1).map(section => <button type="button" key={section.id} aria-current={active.id === section.id ? "location" : undefined} onClick={() => navigate(section.id)}>{section.nav}<i aria-hidden="true" /></button>)}
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
