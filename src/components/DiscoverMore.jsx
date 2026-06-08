import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import discoverBg from "../assets/discover-bg.jpg";

export default function DiscoverMore() {
  const sectionRef = useRef(null);

  const [isFullyVisible, setIsFullyVisible] = useState(false);
  const [scrollAttempts, setScrollAttempts] = useState(0);

  // scroll to next section
  const goToNextSection = () => {
    const nextSection = sectionRef.current?.nextElementSibling;

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setScrollAttempts(0);
  };

  // ─────────────────────────────────────────────
  // DETECT FULL VIEWPORT VISIBILITY
  // ─────────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 0.85 = 85% visible threshold (almost full screen)
        setIsFullyVisible(entry.intersectionRatio >= 0.85);
      },
      {
        threshold: [0, 0.5, 0.85, 1],
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // ─────────────────────────────────────────────
  // ONLY TRACK SCROLL WHEN FULLY VISIBLE
  // ─────────────────────────────────────────────
  useEffect(() => {
    const handleWheel = (e) => {
      if (!isFullyVisible) return;
      if (e.deltaY > 0) {
        setScrollAttempts((prev) => prev + 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => window.removeEventListener("wheel", handleWheel);
  }, [isFullyVisible]);

  // ─────────────────────────────────────────────
  // SNAP AFTER 2 ATTEMPTS (ONLY IF FULLY VISIBLE)
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (isFullyVisible && scrollAttempts >= 4) {
      goToNextSection();
    }
  }, [scrollAttempts, isFullyVisible]);

  return (
    <section
      ref={sectionRef}
      onClick={goToNextSection}
      className="relative w-full overflow-hidden cursor-pointer bg-[#030305]"
      style={{ minHeight: "100vh" }}
    >
      {/* BACKGROUND */}
      <img
        src={discoverBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[85vh] px-6">
        <motion.p
          className="text-white/60 uppercase tracking-[0.35em] text-[11px]"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Scroll to explore
        </motion.p>

        <motion.h2
          className="font-syne font-bold text-white leading-none mt-8"
          style={{
            fontSize: "clamp(4rem, 12vw, 6rem)",
          }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          DISCOVER
          <br />
          MORE
        </motion.h2>

        <motion.p
          className="mt-10 max-w-2xl text-white/70 leading-relaxed text-base lg:text-lg"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          Intentional digital work exploring interaction, motion, and
          system-driven interface design.
        </motion.p>
      </div>
    </section>
  );
}
