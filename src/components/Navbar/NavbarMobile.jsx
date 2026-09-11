import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = ["About", "Services", "Work", "Contact"];

const SECTION_MAP = {
  About: "about",
  Services: "services",
  Work: "projects",
  Contact: "contact",
};

const menuVariants = {
  closed: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.2,
    },
  },

  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const itemVariants = {
  closed: {
    opacity: 0,
    y: 12,
  },

  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function NavbarMobile() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const sections = [
      { id: "about", label: "About" },
      { id: "services", label: "Services" },
      { id: "projects", label: "Work" },
      { id: "contact", label: "Contact" },
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY + 180;

      let found = null;

      for (const section of sections) {
        const element = document.getElementById(section.id);

        if (!element) continue;

        if (scrollY >= element.offsetTop) {
          found = section.label;
        }
      }

      setActive(found);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNav = (link) => {
    setActive(link);
    setMenuOpen(false);

    const sectionId = SECTION_MAP[link];
    const element = document.getElementById(sectionId);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleLogoClick = () => {
    setActive(null);
    setMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* ── Mobile header ───────────────────────────────────────── */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed inset-x-0 top-0 z-[60] px-4 pt-4"
      >
        <div
          className={`
            flex
            h-[58px]
            w-full
            items-center
            justify-between
            rounded-2xl
            px-5
            transition-all
            duration-500
            ${
              scrolled || menuOpen
                ? "border border-white/[0.08] bg-black/45 backdrop-blur-2xl shadow-[0_8px_35px_rgba(0,0,0,0.35)]"
                : "border border-transparent bg-transparent"
            }
          `}
        >
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="
              select-none
              font-display
              text-[15px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-white/90
            "
            aria-label="Return to homepage"
          >
            unbox<span className="text-indigo-400/80">.</span>
          </button>

          {/* Menu button */}
          <button
            onClick={() => setMenuOpen((value) => !value)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/[0.08]
              bg-white/[0.025]
            "
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
          >
            <span className="relative flex h-4 w-5 flex-col justify-center">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                transition={{
                  duration: 0.25,
                }}
                className="
                  absolute
                  left-0
                  block
                  h-px
                  w-5
                  origin-center
                  bg-white/65
                "
              />

              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{
                  duration: 0.15,
                }}
                className="
                  absolute
                  left-0
                  block
                  h-px
                  w-5
                  bg-white/65
                "
              />

              <motion.span
                animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                transition={{
                  duration: 0.25,
                }}
                className="
                  absolute
                  left-0
                  block
                  h-px
                  w-5
                  origin-center
                  bg-white/65
                "
              />
            </span>
          </button>
        </div>
      </motion.header>

      {/* ── Mobile navigation ───────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="
              fixed
              inset-0
              z-50
              bg-black/92
              backdrop-blur-2xl
            "
          >
            <div
              className="
                flex
                min-h-full
                flex-col
                px-7
                pb-10
                pt-32
              "
            >
              {/* Menu label */}
              <motion.p
                variants={itemVariants}
                className="
                  mb-10
                  font-dm
                  text-[9px]
                  font-light
                  uppercase
                  tracking-[0.28em]
                  text-white/25
                "
              >
                Navigation
              </motion.p>

              {/* Links */}
              <nav className="flex flex-col" aria-label="Mobile navigation">
                {NAV_LINKS.map((link, index) => {
                  const isActive = active === link;

                  return (
                    <motion.button
                      key={link}
                      variants={itemVariants}
                      custom={index}
                      onClick={() => handleNav(link)}
                      className="
                        group
                        flex
                        min-h-[64px]
                        items-center
                        justify-between
                        border-b
                        border-white/[0.07]
                        text-left
                      "
                    >
                      <span
                        className={`
                          font-dm
                          text-[clamp(1.15rem,5vw,1.4rem)]
                          font-light
                          tracking-[-0.01em]
                          transition-colors
                          duration-300
                          ${
                            isActive
                              ? "text-white"
                              : "text-white/45 group-active:text-white"
                          }
                        `}
                      >
                        {link}
                      </span>

                      <span
                        className={`
                          text-[10px]
                          tracking-[0.15em]
                          transition-opacity
                          duration-300
                          ${
                            isActive ? "opacity-100 text-white/40" : "opacity-0"
                          }
                        `}
                      >
                        0{index + 1}
                      </span>
                    </motion.button>
                  );
                })}
              </nav>

              {/* Bottom detail */}
              <motion.div
                variants={itemVariants}
                className="
                  mt-auto
                  flex
                  items-end
                  justify-between
                  pt-12
                "
              >
                <span
                  className="
                    font-dm
                    text-[9px]
                    font-light
                    uppercase
                    tracking-[0.2em]
                    text-white/20
                  "
                >
                  Frontend Developer
                </span>

                <span
                  className="
                    font-dm
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-white/20
                  "
                >
                  2026
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
