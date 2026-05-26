import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = ["Work", "About", "Skills", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (link) => {
    setActive(link);
    setMenuOpen(false);
    const el = document.getElementById(link.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pt-5"
      >
        <div
          className={`
            w-full max-w-6xl flex items-center justify-between
            px-7 py-4 rounded-3xl
            transition-all duration-500
            ${
              scrolled
                ? "bg-black/35 backdrop-blur-2xl border border-white/[0.07] shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
                : "bg-transparent border border-transparent"
            }
          `}
        >
          {/* ── Logo ── */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display text-xl font-semibold tracking-[0.18em] uppercase text-white/88 cursor-pointer select-none"
          >
            OV<span className="text-indigo-400/80">.</span>
          </motion.div>

          {/* ── Desktop links ── */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link}
                onClick={() => handleNav(link)}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15 * i + 0.35,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="relative px-5 py-2.5 group"
                aria-label={`Navigate to ${link} section`}
              >
                {/* Active indicator */}
                {active === link && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl bg-white/[0.05] border border-white/[0.08]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}

                <span
                  className={`
                    relative z-10 text-[10px] tracking-[0.22em] uppercase font-sans font-light
                    transition-colors duration-300
                    ${active === link ? "text-white/90" : "text-white/70 group-hover:text-white/65"}
                  `}
                >
                  {link}
                </span>

                {/* Underline hover */}
                <span
                  className="
                    absolute bottom-1 left-1/2 -translate-x-1/2
                    h-px w-0 group-hover:w-5
                    bg-gradient-to-r from-indigo-500 to-cyan-400
                    transition-all duration-300 rounded-full
                  "
                />
              </motion.button>
            ))}
          </nav>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1px] bg-white/50 origin-center transition-all"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-[1px] bg-white/50"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1px] bg-white/50 origin-center transition-all"
            />
          </button>
        </div>
      </motion.header>

      {/* ── Mobile menu overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="
              fixed top-24 left-4 right-4 z-40
              bg-black/75 backdrop-blur-2xl
              border border-white/[0.08] rounded-2xl
              flex flex-col py-4 md:hidden
            "
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => handleNav(link)}
                className="
                  py-4 text-[10px] tracking-[0.28em] uppercase font-light
                  text-white/45 hover:text-white/80 transition-colors
                  border-b border-white/[0.05] last:border-none mx-6
                "
              >
                {link}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
