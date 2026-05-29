import { useRef, useEffect, useMemo, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ExternalLink, Code2, Layers, Zap } from "lucide-react";

// ─── Particle data generated once on mount ────────────────────────────────────
function useParticles(count = 28) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.8,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 10,
        color: ["#6366f1", "#06b6d4", "#a855f7", "#818cf8", "#22d3ee"][
          Math.floor(Math.random() * 5)
        ],
        opacity: Math.random() * 0.5 + 0.2,
      })),
    [count],
  );
}

// ─── Stagger animation variants ───────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 60, scale: 0.92 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 },
  },
};

// ─── Main Hero component ───────────────────────────────────────────────────────
export default function Hero() {
  const heroRef = useRef(null);
  const glowRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const glowPosRef = useRef({ x: 0, y: 0 });
  const colorIdxRef = useRef(0);
  const particles = useParticles(28);

  // Framer motion values for parallax
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 60, damping: 25, mass: 1 });
  const springY = useSpring(rawY, { stiffness: 60, damping: 25, mass: 1 });

  // Derived parallax transforms for different layers
  const bgX = useTransform(springX, (v) => v * 0.015);
  const bgY = useTransform(springY, (v) => v * 0.015);
  const cardX = useTransform(springX, (v) => v * -0.025);
  const cardY = useTransform(springY, (v) => v * -0.025);
  const headlineX = useTransform(springX, (v) => v * 0.008);
  const headlineY = useTransform(springY, (v) => v * 0.008);

  // Glow color cycle
  const glowColors = [
    "radial-gradient(circle at center, rgba(99,102,241,0.18) 0%, rgba(6,182,212,0.08) 45%, transparent 70%)",
    "radial-gradient(circle at center, rgba(6,182,212,0.18) 0%, rgba(99,102,241,0.08) 45%, transparent 70%)",
    "radial-gradient(circle at center, rgba(168,85,247,0.16) 0%, rgba(99,102,241,0.08) 45%, transparent 70%)",
  ];

  // rAF loop for smooth glow interpolation
  const animateGlow = useCallback(() => {
    const lerp = (a, b, t) => a + (b - a) * t;
    glowPosRef.current.x = lerp(
      glowPosRef.current.x,
      mouseRef.current.x,
      0.065,
    );
    glowPosRef.current.y = lerp(
      glowPosRef.current.y,
      mouseRef.current.y,
      0.065,
    );

    if (glowRef.current) {
      glowRef.current.style.left = `${glowPosRef.current.x}px`;
      glowRef.current.style.top = `${glowPosRef.current.y}px`;
    }
    rafRef.current = requestAnimationFrame(animateGlow);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Initialise glow position at centre
    const rect = hero.getBoundingClientRect();
    mouseRef.current = { x: rect.width / 2, y: rect.height / 2 };
    glowPosRef.current = { x: rect.width / 2, y: rect.height / 2 };

    const handleMouseMove = (e) => {
      const r = hero.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      mouseRef.current = { x, y };

      // Normalise to [-1, 1] for parallax
      rawX.set(x - r.width / 2);
      rawY.set(y - r.height / 2);
    };

    const handleMouseLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);
    rafRef.current = requestAnimationFrame(animateGlow);

    // Cycle glow color every 2.5s
    const colorTimer = setInterval(() => {
      colorIdxRef.current = (colorIdxRef.current + 1) % glowColors.length;
      if (glowRef.current) {
        glowRef.current.style.background = glowColors[colorIdxRef.current];
      }
    }, 2500);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
      clearInterval(colorTimer);
    };
  }, [animateGlow, rawX, rawY]);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen overflow-hidden bg-[#030305] flex items-center"
    >
      {/* ── Background mesh gradients (parallax) ─────────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ x: bgX, y: bgY }}
      >
        {/* Primary indigo orb – top left */}
        <div
          className="absolute rounded-full"
          style={{
            width: "680px",
            height: "680px",
            top: "-180px",
            left: "-160px",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.22) 0%, rgba(99,102,241,0.06) 50%, transparent 72%)",
          }}
        />
        {/* Cyan orb – bottom right */}
        <div
          className="absolute rounded-full"
          style={{
            width: "540px",
            height: "540px",
            bottom: "-120px",
            right: "-80px",
            background:
              "radial-gradient(circle, rgba(6,182,212,0.18) 0%, rgba(6,182,212,0.05) 50%, transparent 72%)",
          }}
        />
        {/* Purple orb – center */}
        <div
          className="absolute rounded-full"
          style={{
            width: "420px",
            height: "420px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)",
          }}
        />
        {/* Small accent – top right */}
        <div
          className="absolute rounded-full animate-pulse-slow"
          style={{
            width: "200px",
            height: "200px",
            top: "10%",
            right: "18%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* ── Grid overlay ─────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Cursor glow (DOM-driven via rAF for 60fps) ───────────────── */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none z-[3]"
        style={{
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background: glowColors[0],
          transition: "background 1.5s ease",
          willChange: "left, top",
        }}
      />

      {/* ── Ambient particles ─────────────────────────────────────────── */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              bottom: `${p.y % 80}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              opacity: p.opacity,
            }}
            animate={{
              y: [0, -180 - Math.random() * 100],
              opacity: [p.opacity, 0],
              scale: [1, 0.2],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* ── Cinematic vignette ────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(3,3,5,0.6) 75%, rgba(3,3,5,0.92) 100%)",
        }}
      />
      {/* ── Bottom fade into DiscoverMore ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[2] pointer-events-none"
        style={{ background: "linear-gradient(transparent, rgba(3,3,5,0.9))" }}
      />

      {/* ── Main content grid ─────────────────────────────────────────── */}
      <div className="relative z-[10] w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-24 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen lg:min-h-0 lg:py-32">
          {/* ── LEFT – Copy ──────────────────────────────────────────── */}
          <motion.div
            className="flex flex-col gap-6"
            style={{ x: headlineX, y: headlineY }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-syne font-bold leading-[1.02] tracking-tight"
              style={{ fontSize: "clamp(3rem, 6vw, 4rem)" }}
            >
              Building Systems
              <br />
              That <span className="text-gradient">Think,</span>
              <br />
              Scale &amp; Endure
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              variants={itemVariants}
              className="text-[15px] leading-relaxed font-light max-w-[420px]"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Crafting high-performance web applications, interactive geospatial
              platforms, and AI-powered experiences for ambitious products and
              teams.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 mt-2"
            >
              <a href="#projects">
                <button className="btn-gradient inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-white glow-indigo">
                  View Projects
                  <ArrowRight size={15} />
                </button>
              </a>
              <button className="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-white/60">
                <ExternalLink size={15} />
                Let's Talk
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={itemVariants}
              className="flex gap-8 pt-4 border-t mt-2"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              {[
                { num: "2+", label: "Years Building" },
                { num: "12+", label: "Projects Shipped" },
                { num: "5+", label: "Active Projects" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span className="font-syne font-bold text-2xl text-white">
                    {s.num}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
