import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function DiscoverMore() {
  const sectionRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Scroll-triggered fade for the orb
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const orbOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 0.6, 0.6, 0],
  );

  // Smooth scroll to next section
  const handleClick = () => {
    const nextSection = sectionRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={sectionRef}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full overflow-hidden cursor-pointer"
      style={{
        height: "350px",
        background:
          "linear-gradient(180deg, #06060a 0%, #030305 30%, #02020a 100%)",
      }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient orb glow - appears on hover */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ opacity: orbOpacity }}
      >
        <div
          className="rounded-full"
          style={{
            width: "700px",
            height: "240px",
            background:
              "radial-gradient(ellipse, rgba(99,102,241,0.16) 0%, rgba(6,182,212,0.1) 40%, rgba(168,85,247,0.08) 60%, transparent 75%)",
            filter: "blur(40px)",
          }}
        />
      </motion.div>

      {/* Top vignette fade from hero */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "60px",
          background: "linear-gradient(rgba(6,6,10,0.85), transparent)",
        }}
      />

      {/* Main content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        {/* Label */}
        <motion.span
          className="text-[11px] tracking-[0.25em] uppercase font-medium"
          style={{
            color: isHovered
              ? "rgba(129,140,248,0.75)"
              : "rgba(99,102,241,0.25)",
            transition: "color 0.5s ease",
          }}
        >
          Scroll to explore
        </motion.span>

        {/* Main text - using Syne to match hero */}
        <motion.h2
          className="font-syne font-bold tracking-tight select-none"
          style={{
            fontSize: "clamp(2.8rem, 6vw, 4.2rem)",
            lineHeight: 1,
            color: isHovered
              ? "rgba(255,255,255,0.92)"
              : "rgba(255,255,255,0.04)",
            textShadow: isHovered
              ? "0 0 40px rgba(99,102,241,0.55), 0 0 80px rgba(6,182,212,0.3), 0 0 120px rgba(168,85,247,0.2)"
              : "none",
            transition: "color 0.65s ease, text-shadow 0.65s ease",
          }}
        >
          DISCOVER MORE
        </motion.h2>

        {/* Animated chevron */}
        <motion.div
          className="flex items-center justify-center rounded-full"
          style={{
            width: "40px",
            height: "40px",
            border: `1px solid ${isHovered ? "rgba(99,102,241,0.45)" : "rgba(255,255,255,0.06)"}`,
            boxShadow: isHovered ? "0 0 20px rgba(99,102,241,0.35)" : "none",
            transition:
              "border-color 0.5s ease, box-shadow 0.5s ease, transform 0.4s ease",
          }}
          animate={{
            y: isHovered ? [0, 4, 0] : 0,
          }}
          transition={{
            y: {
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut",
            },
          }}
        >
          <ChevronDown
            size={18}
            style={{
              color: isHovered
                ? "rgba(129,140,248,0.85)"
                : "rgba(255,255,255,0.12)",
              transition: "color 0.5s ease",
            }}
          />
        </motion.div>
      </div>

      {/* Bottom vignette fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "50px",
          background: "linear-gradient(transparent, rgba(2,2,10,0.95))",
        }}
      />

      {/* Glowing seam line at top */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: "1px", overflow: "visible" }}
      >
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.3) 20%, rgba(6,182,212,0.4) 50%, rgba(168,85,247,0.3) 80%, transparent 100%)",
            boxShadow:
              "0 0 12px rgba(99,102,241,0.3), 0 0 24px rgba(6,182,212,0.15)",
          }}
        />
      </div>
    </section>
  );
}
