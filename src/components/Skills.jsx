import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { useRef, useEffect, useCallback } from "react";

export default function Skills() {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const rafRef = useRef(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const glowPosRef = useRef({ x: 0, y: 0 });

  /* PARALLAX MOTION VALUES */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, {
    stiffness: 60,
    damping: 25,
    mass: 1,
  });

  const springY = useSpring(rawY, {
    stiffness: 60,
    damping: 25,
    mass: 1,
  });

  const bgX = useTransform(springX, (v) => v * 0.015);
  const bgY = useTransform(springY, (v) => v * 0.015);

  /* SMOOTH POINTER GLOW */
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
    const section = sectionRef.current;

    if (!section) return;

    const rect = section.getBoundingClientRect();

    mouseRef.current = {
      x: rect.width / 2,
      y: rect.height / 2,
    };

    glowPosRef.current = {
      x: rect.width / 2,
      y: rect.height / 2,
    };

    const handleMouseMove = (e) => {
      const r = section.getBoundingClientRect();

      const x = e.clientX - r.left;
      const y = e.clientY - r.top;

      mouseRef.current = { x, y };

      rawX.set(x - r.width / 2);
      rawY.set(y - r.height / 2);
    };

    const handleMouseLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    rafRef.current = requestAnimationFrame(animateGlow);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);

      cancelAnimationFrame(rafRef.current);
    };
  }, [animateGlow, rawX, rawY]);

  const skills = [
    {
      title: "Frontend Engineering",
      items: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "Motion & Interaction",
      items: [
        "Framer Motion",
        "UI Animation",
        "Micro-interactions",
        "UX Flow",
        "Scroll-driven Effects",
        "Interactive Hover Systems",
      ],
    },
    {
      title: "System Design",
      items: [
        "Component Architecture",
        "Scalable UI Systems",
        "State Design",
        "Design Systems",
        "Performance Optimization",
      ],
    },
  ];

  const marqueeSkills = [
    "React",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Creative Development",
    "UI Engineering",
    "Responsive Design",
    "Motion Systems",
    "Frontend Architecture",
    "Performance Optimization",
    "Git & GitHub",
    "API Integration",
    "Geospatial Systems",
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen w-full overflow-hidden bg-[#030305] text-white"
    >
      {/* BACKGROUND MESH GRADIENTS */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ x: bgX, y: bgY }}
      >
        {/* INDIGO ORB */}
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

        {/* CYAN ORB */}
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

        {/* PURPLE ORB */}
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
      </motion.div>

      {/* GRID OVERLAY */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* POINTER GLOW */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none z-[3]"
        style={{
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle at center, rgba(99,102,241,0.18) 0%, rgba(6,182,212,0.08) 45%, transparent 70%)",
          transition: "background 1.5s ease",
          willChange: "left, top",
        }}
      />

      {/* VIGNETTE */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(3,3,5,0.6) 75%, rgba(3,3,5,0.92) 100%)",
        }}
      />

      {/* TOP FADE */}
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(2,2,10,1), rgba(2,2,10,0))",
        }}
      />

      {/* KEEP EVERYTHING BELOW THIS EXACTLY THE SAME */}
      {/* MAIN CONTENT */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 py-32">
        {/* HEADER */}
        <div className="max-w-3xl mb-24">
          <p className="text-[11px] tracking-[0.35em] uppercase text-indigo-300/70 mb-5">
            Technical Expertise
          </p>

          <h1
            className="font-syne font-bold"
            style={{ fontSize: "clamp(3rem, 7vw, 4rem)" }}
          >
            Skills
          </h1>

          <div className="mt-8 h-px w-44 bg-gradient-to-r from-indigo-500/60 via-cyan-400/70 to-purple-500/40" />

          <p className="mt-10 text-white/55 text-lg leading-relaxed max-w-2xl font-dm">
            A combination of engineering precision, design intuition, and motion
            systems focused on building scalable, performant, and immersive
            digital products.
          </p>
        </div>

        {/* FIXED MARQUEE SECTION */}

        <div className="relative mb-10 py-14">
          {/* LEFT FADE */}
          <div className="absolute left-0 top-0 z-20 h-full w-40 bg-gradient-to-r from-[#030305] via-[#030305]/95 to-transparent pointer-events-none" />

          {/* RIGHT FADE */}
          <div className="absolute right-0 top-0 z-20 h-full w-40 bg-gradient-to-l from-[#030305] via-[#030305]/95 to-transparent pointer-events-none" />

          {/* OUTER WRAPPER */}
          <div className="overflow-hidden  mt-0 py-6">
            {/* TRACK */}
            <div className="marquee-track flex items-center gap-6 w-max">
              {[...marqueeSkills, ...marqueeSkills].map((skill, index) => (
                <div
                  key={index}
                  className="
            group
            relative
            flex-shrink-0
            rounded-full
            border
            border-white/10
            bg-white/[0.03]
            px-8
            py-4
            backdrop-blur-md
            transition-all
            duration-700
            hover:-translate-y-2
            hover:border-indigo-400/40
            hover:bg-white/[0.05]
          "
                >
                  {/* GLOW */}
                  <div
                    className="
              absolute
              inset-0
              rounded-full
              opacity-0
              blur-xl
              transition-opacity
              duration-500
              group-hover:opacity-100
            "
                    style={{
                      background:
                        "radial-gradient(circle, rgba(99,102,241,0.18), rgba(6,182,212,0.08), transparent 70%)",
                    }}
                  />

                  {/* TEXT */}
                  <span
                    className="
              relative
              z-10
              font-dm
              text-sm
              tracking-wide
              text-white/75
              transition-colors
              duration-500
              group-hover:text-white
            "
                  >
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* SKILLS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4 }}
              className="group relative overflow-hidden rounded-[32px] border border-white/5 bg-white/[0.03] backdrop-blur-md p-10"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700"
                style={{
                  background:
                    "radial-gradient(circle at top left, rgba(99,102,241,0.10), transparent 50%), radial-gradient(circle at bottom right, rgba(6,182,212,0.08), transparent 55%)",
                }}
              />

              <div className="relative z-10">
                <h2 className="font-syne text-2xl font-bold text-white/90">
                  {skill.title}
                </h2>

                <ul className="mt-6 space-y-3 text-white/50 font-dm text-sm">
                  {skill.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="hover:text-white/80 transition-colors"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        <div
          onClick={() =>
            document.getElementById("contact")?.scrollIntoView({
              behavior: "smooth",
            })
          }
          className="mt-40 flex flex-col items-center text-center opacity-90 cursor-pointer group transition-transform duration-300 hover:-translate-y-1"
        >
          {/* vertical accent line */}
          <div className="w-px h-20 bg-gradient-to-b from-indigo-400/40 via-cyan-400/20 to-transparent mb-6" />

          {/* small label */}
          <p className="text-white/30 uppercase tracking-[0.35em] text-[10px] inline-block animate-float-slow group-hover:text-white/60 transition">
            Continue Exploring
          </p>

          {/* main line */}
          <h3 className="mt-3 text-xl lg:text-2xl font-syne font-bold text-white/80 tracking-tight group-hover:text-white transition">
            The next experience starts with a conversation..
          </h3>
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to top, rgba(2,2,10,1), transparent)",
        }}
      />
    </section>
  );
}
