import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function DiscoverMore() {
  const sectionRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const orbOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 0.7, 0.7, 0],
  );

  const handleClick = () => {
    const nextSection = sectionRef.current?.nextElementSibling;

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full overflow-hidden cursor-pointer bg-[#030305]"
      style={{
        minHeight: "85vh",
      }}
    >
      {/* ── Grid Overlay ───────────────────────────── */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Large Ambient Glow ───────────────────── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: orbOpacity }}
      >
        <div
          className="rounded-full blur-3xl"
          style={{
            width: "900px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.16) 0%, rgba(6,182,212,0.1) 35%, rgba(168,85,247,0.08) 60%, transparent 75%)",
          }}
        />
      </motion.div>

      {/* ── Floating Particle Core ───────────────── */}
      <motion.div
        className="absolute left-1/2 top-1/2 pointer-events-none"
        animate={{
          y: [0, -18, 0],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="rounded-full blur-2xl opacity-80"
          style={{
            width: "420px",
            height: "420px",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(99,102,241,0.12) 35%, rgba(6,182,212,0.08) 55%, transparent 75%)",
          }}
        />

        {/* floating particles */}
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            animate={{
              y: [0, -120 - i * 2],
              opacity: [0.8, 0],
              scale: [1, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.15,
            }}
            style={{
              width: `${4 + (i % 4)}px`,
              height: `${4 + (i % 4)}px`,
              background:
                i % 2 === 0 ? "rgba(255,255,255,0.8)" : "rgba(129,140,248,0.7)",
              left: `${Math.random() * 400 - 200}px`,
              top: `${Math.random() * 220 - 100}px`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </motion.div>

      {/* ── Main Content ─────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[85vh] px-6">
        {/* label */}
        <motion.p
          className="label text-indigo-300/60 mb-6"
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Scroll to explore
        </motion.p>

        {/* heading */}
        <motion.h2
          className="font-syne font-bold tracking-tight leading-none"
          style={{
            fontSize: "clamp(4rem, 12vw, 8rem)",
          }}
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          DISCOVER
          <br />
          MORE
        </motion.h2>

        {/* subcopy */}
        <motion.p
          className="mt-10 max-w-2xl text-white/40 leading-relaxed text-base lg:text-lg"
          animate={{
            opacity: [0.45, 0.7, 0.45],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          A deeper exploration into immersive interfaces, cinematic motion,
          experimental systems, and research-driven digital experiences.
        </motion.p>

        {/* Chevron */}
        <motion.div
          className="mt-14 flex items-center justify-center rounded-full border border-white/10 w-14 h-14"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown size={20} className="text-indigo-300/80" />
        </motion.div>
      </div>

      {/* ── Bottom Fade ─────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(2,2,10,1), rgba(2,2,10,0))",
        }}
      />
    </section>
  );
}
