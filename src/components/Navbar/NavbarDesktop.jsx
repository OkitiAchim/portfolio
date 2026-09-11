import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = ["About", "Services", "Work", "Contact"];

const SECTION_MAP = {
  About: "about",
  Services: "services",
  Work: "projects",
  Contact: "contact",
};

export default function NavbarDesktop() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /**
   * NAVIGATION
   */
  const handleNav = (link) => {
    setActive(link);

    const sectionId = SECTION_MAP[link];
    const el = document.getElementById(sectionId);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  /**
   * SCROLL SPY
   */
  useEffect(() => {
    const sections = [
      { id: "about", label: "About" },
      { id: "services", label: "Services" },
      { id: "projects", label: "Work" },
      { id: "contact", label: "Contact" },
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY + 200;

      let found = null;

      for (const section of sections) {
        const el = document.getElementById(section.id);

        if (!el) continue;

        if (scrollY >= el.offsetTop) {
          found = section.label;
        }
      }

      if (found) {
        setActive(found);
      } else {
        setActive(null);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        fixed
        top-0
        left-0
        right-0
        z-50
        flex
        justify-center
        px-6
        pt-5
      "
    >
      <div
        className={`
          flex
          w-full
          max-w-6xl
          items-center
          justify-between
          rounded-3xl
          px-7
          py-4
          transition-all
          duration-500
          ${
            scrolled
              ? "border border-white/[0.07] bg-black/35 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
              : "border border-transparent bg-transparent"
          }
        `}
      >
        {/* ── Logo ── */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          onClick={() => {
            setActive(null);

            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          className="
            cursor-pointer
            select-none
            font-display
            text-xl
            font-semibold
            uppercase
            tracking-[0.18em]
            text-white/88
          "
          aria-label="Return to homepage"
        >
          unbox<span className="text-indigo-400/80">.</span>
        </motion.button>

        {/* ── Desktop navigation ── */}
        <nav
          className="flex items-center gap-1"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map((link, i) => (
            <motion.button
              key={link}
              onClick={() => handleNav(link)}
              initial={{
                opacity: 0,
                y: -12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.15 * i + 0.35,
                duration: 0.5,
                ease: "easeOut",
              }}
              className="group relative px-5 py-2.5"
              aria-label={`Navigate to ${link} section`}
            >
              {/* Active indicator */}
              {active === link && (
                <motion.span
                  layoutId="nav-pill"
                  className="
                    absolute
                    inset-0
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-white/[0.05]
                  "
                  transition={{
                    type: "spring",
                    bounce: 0.25,
                    duration: 0.6,
                  }}
                />
              )}

              {/* Link text */}
              <span
                className={`
                  relative
                  z-10
                  font-sans
                  text-[10px]
                  font-light
                  uppercase
                  tracking-[0.22em]
                  transition-colors
                  duration-300
                  ${
                    active === link
                      ? "text-white/90"
                      : "text-white/70 group-hover:text-white/65"
                  }
                `}
              >
                {link}
              </span>

              {/* Hover underline */}
              <span
                className="
                  absolute
                  bottom-1
                  left-1/2
                  h-px
                  w-0
                  -translate-x-1/2
                  rounded-full
                  bg-gradient-to-r
                  from-indigo-500
                  to-cyan-400
                  transition-all
                  duration-300
                  group-hover:w-5
                "
              />
            </motion.button>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
