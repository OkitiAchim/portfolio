import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scrollToSection } from "../Scroll/controller";
import useNavigationState, { sections, labelMotion } from "./useNavigationState";
import "./navbar-mobile.css";

export default function NavbarMobile() {
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { active, reduced, tone } = useNavigationState();
  const root = useRef(null);
  const toggle = useRef(null);
  const menuToggle = useRef(null);
  const menu = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const oldOverflow = document.body.style.overflow;
    const content = sections.map(section => document.getElementById(section.id)).filter(Boolean);
    const oldInert = content.map(element => element.inert);
    document.body.style.overflow = "hidden";
    content.forEach(element => { element.inert = true; });
    menu.current?.querySelector("button")?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = oldOverflow;
      content.forEach((element, index) => { element.inert = oldInert[index]; });
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    menuToggle.current?.focus({ preventScroll: true });
  };
  const navigate = id => {
    closeMenu();
    scrollToSection(id, id === "hero" ? 0 : 100);
  };
  const onKeyDown = event => {
    if (event.key === "Escape") {
      if (menuOpen) closeMenu();
      else { setCollapsed(true); toggle.current?.focus({ preventScroll: true }); }
    }
    if (menuOpen && event.key === "Tab") {
      const buttons = [...root.current.querySelectorAll("button:not([disabled])")].filter(button => button.getClientRects().length);
      const first = buttons[0], last = buttons.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  };

  return <div className="nm-navigation" ref={root} onKeyDown={onKeyDown} role={menuOpen ? "dialog" : undefined} aria-modal={menuOpen || undefined} aria-label={menuOpen ? "Mobile navigation" : undefined}>
    <header className="nm-header" data-tone={menuOpen ? "dark" : tone}>
      <div className="nm-shell" data-collapsed={collapsed}>
        <motion.div className="nm-expanded" inert={collapsed ? true : undefined} aria-hidden={collapsed} initial={false}
          animate={{ opacity: collapsed ? 0 : 1 }} transition={{ duration: reduced ? 0 : .18, delay: collapsed || reduced ? 0 : .16 }}>
          <button type="button" className="nm-brand" aria-label="Return to homepage" onClick={() => navigate("hero")}>UNBOX<span>.</span></button>
          <button type="button" className="nm-menu-toggle" ref={menuToggle} aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="nm-menu" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {menuOpen ? <path d="m5 5 14 14M19 5 5 19" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
            </svg>
          </button>
        </motion.div>
        <button type="button" className="nm-collapse" ref={toggle} aria-expanded={!collapsed} aria-label={collapsed ? `Expand navigation, current section: ${active.label}` : "Collapse navigation"} onClick={() => { if (menuOpen) setMenuOpen(false); setCollapsed(!collapsed); }}>
          {collapsed ? <><span className="nm-dot" aria-hidden="true" /><span className="nm-label-window">
            <AnimatePresence initial={false} mode="wait" custom={active.direction}>
              <motion.span className={`nm-label ${active.id === "hero" ? "nm-label-brand" : ""}`} key={active.id} custom={active.direction} variants={labelMotion}
                initial="enter" animate="center" exit="exit" transition={{ duration: reduced ? 0 : .23, ease: [.22, 1, .36, 1] }}>{active.label}</motion.span>
            </AnimatePresence>
          </span><svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M7 6 3 10l4 4M13 6l4 4-4 4" /></svg></>
            : <svg width="22" height="18" viewBox="0 0 28 20" fill="none" aria-hidden="true"><path d="m4 5 5 5-5 5m20-10-5 5 5 5M14 6v8" /></svg>}
        </button>
      </div>
    </header>
    <AnimatePresence>
      {menuOpen && <motion.div className="nm-menu" id="nm-menu" ref={menu} data-lenis-prevent initial={{ opacity: 0, y: reduced ? 0 : -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -8 }} transition={{ duration: reduced ? 0 : .25 }}>
        <p className="nm-menu-caption">Navigation</p>
        <nav aria-label="Mobile section links">
          {sections.slice(1).map((section, index) => <motion.button type="button" key={section.id} aria-current={active.id === section.id ? "location" : undefined} onClick={() => navigate(section.id)}
            initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : index * .045, duration: reduced ? 0 : .3 }}>
            <span>{section.nav}</span><small aria-hidden="true">0{index + 1}</small>
          </motion.button>)}
        </nav>
        <div className="nm-menu-footer"><span>Frontend developer</span><span>{new Date().getFullYear()}</span></div>
      </motion.div>}
    </AnimatePresence>
  </div>;
}
