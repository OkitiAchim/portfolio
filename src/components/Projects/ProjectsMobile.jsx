import { useRef, useEffect } from "react";

export default function ProjectsMobile() {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const rafRef = useRef(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const glowPosRef = useRef({ x: 0, y: 0 });

  const projects = [
    {
      id: "01",
      shortTitle: "GERD",
      title: "Geospatial Environmental Risk Dashboard",
      description:
        "An interactive dashboard for exploring environmental risk through geospatial data, map-based visualization, and contextual environmental indicators.",
      technologies: ["React", "React Leaflet", "Zustand", "Tailwind CSS"],
      image: "/projects/gerd-map.png",
      secondaryImage: "/projects/gerd-details.png",
      link: "https://geo-risk-dashboard.netlify.app/",
    },

    {
      id: "02",
      shortTitle: "SIMS",
      title: "Student Information Management System",
      description:
        "A management dashboard for student records, attendance, finance, timetables, notifications, and administrative workflows.",
      technologies: ["React", "TypeScript", "Redux", "Material UI"],
      image: "/projects/sims-dashboard.png",
      secondaryImage: "/projects/sims-students.png",
      link: "",
    },
  ];

  /* ───────────────── MOBILE POINTER GLOW ───────────────── */

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

    section.addEventListener("mousemove", handleMouseMove);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#000000] text-white"
    >
      {/* ── SUBTLE POINTER GLOW ── */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute z-0"
        style={{
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.12), rgba(6,182,212,0.06), transparent 70%)",
          willChange: "left, top",
        }}
      />

      {/* ── AMBIENT GLOW ── */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-[-5%] h-[320px] w-[500px] -translate-x-1/2 opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.16), rgba(6,182,212,0.08), transparent 70%)",
          }}
        />
      </div>

      {/* ── MOBILE GRID ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── CONTENT ── */}
      <div className="relative z-10 px-5 pb-24 pt-24">
        {/* ── HEADER ── */}
        <div className="mb-16">
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-indigo-300/70">
            Work & Experiences
          </p>

          <h1 className="font-syne text-[2.6rem] font-bold leading-[1.02] tracking-tight">
            Selected
            <br />
            Work
          </h1>

          <div className="mt-6 h-px w-24 bg-gradient-to-r from-indigo-500/60 via-cyan-400/70 to-transparent" />

          <p className="mt-7 max-w-[340px] text-[15px] leading-7 text-white/50">
            A selection of interfaces, systems, and research-driven projects
            built around thoughtful interaction and practical problem solving.
          </p>
        </div>

        {/* ── PROJECT LIST ── */}
        <div className="space-y-24">
          {projects.map((project) => (
            <article key={project.id} className="relative">
              {/* ── PROJECT NUMBER ── */}
              <div className="mb-4 flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.28em] text-indigo-300/60">
                  {project.id}
                </span>

                <span className="h-px w-6 bg-white/10" />

                <span className="text-[10px] uppercase tracking-[0.28em] text-white/30">
                  {project.shortTitle}
                </span>
              </div>

              {/* ── MAIN IMAGE ── */}
              <div className="overflow-hidden border border-white/10 bg-white/[0.025]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} interface`}
                    className="h-full w-full object-cover object-center"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>
              </div>

              {/* ── PROJECT TITLE ── */}
              <div className="mt-7">
                <h2 className="font-syne text-[1.75rem] font-bold leading-[1.12] tracking-tight text-white/95">
                  {project.title}
                </h2>
              </div>

              {/* ── DESCRIPTION ── */}
              <p className="mt-4 text-[14px] leading-7 text-white/50">
                {project.description}
              </p>

              {/* ── TECHNOLOGIES ── */}
              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="border border-white/10 bg-white/[0.025] px-2.5 py-1.5 text-[9px] uppercase tracking-[0.14em] text-white/40"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              {/* ── SECONDARY SCREEN ── */}
              {project.secondaryImage && (
                <div className="mt-8">
                  <p className="mb-3 text-[9px] uppercase tracking-[0.25em] text-white/25">
                    Interface Detail
                  </p>

                  <div className="overflow-hidden border border-white/10 bg-white/[0.02]">
                    <img
                      src={project.secondaryImage}
                      alt={`${project.title} detail view`}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* ── ACTION ── */}
              <div className="mt-7">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-between border border-white/10 bg-white/[0.025] px-5 py-4 text-[10px] uppercase tracking-[0.22em] text-white/60 transition active:border-indigo-400/40 active:text-white"
                  >
                    <span>Explore Project</span>

                    <span className="text-base text-white/50">↗</span>
                  </a>
                ) : (
                  <span className="inline-flex w-full items-center justify-between border border-white/5 bg-white/[0.015] px-5 py-4 text-[10px] uppercase tracking-[0.22em] text-white/20">
                    <span>Project Preview</span>

                    <span className="text-base">→</span>
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* ── FUTURE WORK ── */}
        <div className="mt-24 border-t border-white/5 pt-6">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.25em] text-white/20">
              More work in progress
            </span>

            <span className="text-[9px] uppercase tracking-[0.25em] text-white/15">
              03 / —
            </span>
          </div>
          <div className="relative mt-7 h-10 w-full overflow-hidden">
            {/* Quiet monitor line */}
            <div className="absolute top-1/2 left-0 h-px w-full bg-white/10" />

            {/* Moving ECG pulse */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 1200 40"
              preserveAspectRatio="none"
            >
              <path
                className="ecg-trace"
                d="
                    M -160 20
                    H -40
                    H 470
                    L 482 20
                    L 490 20
                    L 499 6
                    L 508 34
                    L 517 20
                    H 1360
                  "
                fill="none"
                stroke="rgba(129, 140, 248, 0.9)"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
