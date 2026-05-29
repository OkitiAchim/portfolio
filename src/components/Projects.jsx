import { useRef, useEffect, useState } from "react";

export default function Projects() {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const rafRef = useRef(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const glowPosRef = useRef({ x: 0, y: 0 });

  const projects = [
    {
      id: "01",
      title: "Frontend Engineering",
      description:
        "Interactive interfaces, motion-driven experiences, responsive systems, and immersive UI architecture.",
    },
    {
      id: "02",
      title: "Creative Development",
      description:
        "Experimental visuals, cinematic transitions, modern web animations, and immersive storytelling.",
    },
    {
      id: "03",
      title: "Geology & Research",
      description:
        "Scientific research, environmental analysis, geospatial interpretation, and technical documentation.",
    },
    {
      id: "04",
      title: "Geology & Research",
      description:
        "Scientific research, environmental analysis, geospatial interpretation, and technical documentation.",
    },
    {
      id: "05",
      title: "Geology & Research",
      description:
        "Scientific research, environmental analysis, geospatial interpretation, and technical documentation.",
    },
    {
      id: "06",
      title: "Geology & Research",
      description:
        "Scientific research, environmental analysis, geospatial interpretation, and technical documentation.",
    },
  ];

  /* ───────────────── HERO-STYLE GLOW ENGINE ───────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      glowPosRef.current.x = lerp(
        glowPosRef.current.x,
        mouseRef.current.x,
        0.08,
      );

      glowPosRef.current.y = lerp(
        glowPosRef.current.y,
        mouseRef.current.y,
        0.08,
      );

      if (glowRef.current) {
        glowRef.current.style.left = `${glowPosRef.current.x}px`;
        glowRef.current.style.top = `${glowPosRef.current.y}px`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();

      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleLeave = () => {
      const rect = section.getBoundingClientRect();

      mouseRef.current = {
        x: rect.width / 2,
        y: rect.height / 2,
      };
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleLeave);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#030305] text-white"
    >
      {/* ── HERO-STYLE POINTER GLOW (FIXED ENGINE) ── */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none z-0"
        style={{
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.18), rgba(6,182,212,0.10), transparent 70%)",
          willChange: "left, top",
        }}
      />

      {/* ── BACKGROUND GLOW ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] blur-3xl opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.18), rgba(6,182,212,0.1), rgba(168,85,247,0.08), transparent 75%)",
          }}
        />
      </div>

      {/* ── GRID ── */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── CONTENT ── */}
      <div
        id="projects"
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-32"
      >
        {/* HEADER */}
        <div className="max-w-3xl mb-24">
          <p className="text-[11px] tracking-[0.35em] uppercase text-indigo-300/70 mb-5">
            Selected Work & Experiences
          </p>

          <h1
            className="font-syne font-bold tracking-tight leading-[1.05]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            Projects
          </h1>

          <div className="mt-8 h-px w-40 bg-gradient-to-r from-indigo-500/60 via-cyan-400/70 to-purple-500/40" />

          <p className="mt-10 text-white/55 text-lg leading-relaxed max-w-2xl">
            A curated collection of creative development, frontend engineering,
            motion design, and research-driven projects focused on immersive
            digital experiences and modern interface systems.
          </p>
        </div>

        {/* ── PROJECT GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 x2:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-[32px] border border-white/5 bg-white/[0.03] backdrop-blur-md"
            >
              <div className="relative z-10 flex flex-col h-full p-10 lg:p-12">
                {/* ID */}
                <span className="text-white/15 text-4xl font-black">
                  {project.id}
                </span>

                {/* TITLE */}
                <h2 className="mt-4 text-3xl font-bold text-white/90">
                  {project.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="mt-6 text-white/50 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex-1" />

                {/* BUTTON */}
                <button className="mt-10 self-start rounded-full border border-white/10 px-8 py-4 text-sm uppercase tracking-[0.25em] text-white/70 hover:text-white hover:border-indigo-400/40 transition">
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* ── Bottom Caption (Refined Minimal Version) ── */}
        <div className="mt-28 flex flex-col items-center text-center opacity-90">
          {/* vertical accent line */}
          <div className="w-px h-20 bg-gradient-to-b from-indigo-400/40 via-cyan-400/20 to-transparent mb-6" />

          {/* small label */}
          <p className="text-white/30 uppercase tracking-[0.35em] text-[10px] inline-block animate-float-slow">
            Continue Exploring
          </p>

          {/* main line */}
          <h3 className="mt-3 text-xl lg:text-3xl font-syne font-bold text-white/80 tracking-tight">
            Every interface tells a story.
          </h3>
        </div>
      </div>
    </section>
  );
}
