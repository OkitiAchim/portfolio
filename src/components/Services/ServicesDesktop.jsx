import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { useRef } from "react";

export default function ServicesDesktop() {
  const sectionRef = useRef(null);

  /* ─────────────────────────────
     FIX: better trigger threshold
  ───────────────────────────── */
  const isInView = useInView(sectionRef, {
    amount: 0.5, // ✅ FIXED (was 1)
    once: false,
  });

  /* ─────────────────────────────
     CURSOR GLOW
  ───────────────────────────── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 90,
    damping: 25,
    mass: 0.8,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 90,
    damping: 25,
    mass: 0.8,
  });

  const handleMouseMove = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const services = [
    {
      title: "Website Development",
      skills: ["React", "JavaScript", "TypeScript", "Next.js", "Tailwind CSS"],
      text: "I design and develop structured, high-performance websites tailored to your brand and objectives. Each build is engineered with scalable architecture, reusable components, and a focus on long-term maintainability.",
    },
    {
      title: "Modern Web Design",
      skills: ["Framer Motion", "CSS", "UI Systems", "Responsive Design"],
      text: "I create refined, user-centered interfaces that balance clarity, usability, and visual hierarchy. Every experience is designed with smooth interaction patterns and consistent behavior across all devices.",
    },
    {
      title: "Build & Deployment",
      skills: ["Git", "GitHub", "SEO", "Web Vitals", "Vercel"],
      text: "I optimize and deploy production-ready applications focused on speed, accessibility, and search performance. Each project is version-controlled and deployed with reliable, CI-ready workflows.",
    },
  ];

  /* ─────────────────────────────
     VARIANTS (UNCHANGED LOGIC)
  ───────────────────────────── */
  const cardVariants = {
    stacked: (i) => ({
      x: 0,
      y: i * 22,
      rotate: i === 0 ? -5 : i === 2 ? 5 : 0,
      scale: 1,
      zIndex: 10 - i,
    }),

    expanded: (i) => ({
      x: (i - 1) * 380,
      y: 0,
      rotate: 0,
      scale: 1,
      zIndex: 20,
    }),
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-black text-white"
    >
      {/* GRID */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* CURSOR */}
      <motion.div
        className="absolute pointer-events-none z-[1]"
        style={{
          x: smoothX,
          y: smoothY,
          width: 420,
          height: 420,
          borderRadius: "999px",
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(6,182,212,0.08) 45%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-32">
        {/* HEADER */}
        <div className="max-w-3xl mb-4">
          <p className="text-[11px] tracking-[0.35em] uppercase text-white/40 mb-5">
            Web Development Services
          </p>

          <h1
            className="font-syne font-bold leading-[1.02]"
            style={{ fontSize: "clamp(3rem, 6vw, 3rem)" }}
          >
            Your vision,
            <br />
            brought online.
          </h1>

          <p className="mt-10 text-white/55 text-lg max-w-2xl">
            Need a website for your business, portfolio, or product? I handle
            the entire process from design to development,creating polished,
            responsive experiences that help you present your brand with
            confidence.
          </p>
        </div>

        {/*DESKTOP ANIMATION SYSTEM */}
        <div className="hidden md:flex relative h-[420px] items-center justify-center">
          {services.map((service, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="stacked"
              animate={isInView ? "expanded" : "stacked"}
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 18,
                mass: 1.2,
              }}
              className="absolute w-[360px]"
            >
              <div className="group relative overflow-hidden rounded-[28px] border border-white/5 bg-white/[0.03] backdrop-blur-md p-8 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0.5,0.8,0.1)] transition-all duration-500">
                <h2 className="font-syne text-2xl font-bold text-white/90">
                  {service.title}
                </h2>

                <p className="mt-5 text-white/50 text-left leading-8">
                  {service.text}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {service.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-3 py-1 rounded-full border border-white/10 text-white/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/*MOBILE STATIC SYSTEM*/}
        <div className="md:hidden mt-16 space-y-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-[28px] border border-white/5 bg-white/[0.03] backdrop-blur-md p-8"
            >
              <h2 className="font-syne text-2xl font-bold text-white/90">
                {service.title}
              </h2>

              <p className="mt-5 text-white/50 text-left leading-8">
                {service.text}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {service.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-3 py-1 rounded-full border border-white/10 text-white/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* bottom caption */}
        <div
          onClick={() =>
            document.getElementById("projects")?.scrollIntoView({
              behavior: "smooth",
            })
          }
          className="mt-20 flex flex-col items-center text-center opacity-90 cursor-pointer group transition-transform duration-300 hover:-translate-y-1"
        >
          {/* vertical accent line */}
          <div className="w-px h-20 bg-gradient-to-b from-indigo-400/40 via-cyan-400/20 to-transparent mb-6" />

          {/* small label */}
          <p className="text-white uppercase tracking-[0.35em] text-[10px] animate-float-slow">
            Continue Exploring
          </p>

          {/* main line */}
          <h3 className="mt-3  text-xl lg:text-3xl font-syne font-bold text-white tracking-tight group-hover:text-slate-300 transition">
            See ideas come to life
          </h3>
        </div>
      </div>
    </section>
  );
}
