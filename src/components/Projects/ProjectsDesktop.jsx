import { useRef, useEffect } from "react";

export default function Projects() {
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
      link: "",
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

  /* ───────────────── POINTER GLOW ───────────────── */

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
      id="work"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#000000] text-white"
    >
      {/* ── POINTER GLOW ── */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute z-0"
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

      {/* ── AMBIENT BACKGROUND GLOW ── */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-[-10%] h-[500px] w-[900px] -translate-x-1/2 blur-3xl opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.18), rgba(6,182,212,0.10), rgba(168,85,247,0.08), transparent 75%)",
          }}
        />
      </div>

      {/* ── GRID ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── CONTENT ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-10 py-32">
        {/* ── HEADER ── */}
        <div className="mb-24 max-w-3xl">
          <p className="mb-5 text-[9px] uppercase tracking-[0.35em] text-indigo-300/70">
            Work & Experiences
          </p>

          <h1
            className="font-syne font-bold leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 5vw, 3rem)" }}
          >
            Selected Work
          </h1>

          <div className="mt-8 h-px w-40 bg-gradient-to-r from-indigo-500/60 via-cyan-400/70 to-purple-500/40" />

          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/55">
            A selection of interfaces, systems, and research-driven projects
            built around thoughtful interaction, visual clarity, and practical
            problem solving.
          </p>
        </div>

        {/* ── PROJECTS ── */}
        <div className="space-y-32">
          {projects.map((project, index) => (
            <article key={project.id} className="group relative">
              {/* ── PROJECT VISUAL ── */}
              <div className="relative overflow-hidden border border-white/10 bg-white/[0.025]">
                {/* Main image */}
                <div className="relative aspect-[16/8] overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} interface`}
                    className="h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-[1.015]"
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Project number */}
                  <div className="absolute left-8 top-8">
                    <span className="font-syne text-sm tracking-[0.25em] text-white/50">
                      {project.id}
                    </span>
                  </div>

                  {/* Secondary screenshot */}
                  {project.secondaryImage && (
                    <div
                      className={`absolute bottom-8 ${
                        index % 2 === 0 ? "right-8" : "left-8"
                      } w-[34%] overflow-hidden border border-white/15 bg-[#080b12]/90 shadow-2xl transition duration-700 ease-out group-hover:translate-y-[-6px]`}
                    >
                      <img
                        src={project.secondaryImage}
                        alt={`${project.title} detail view`}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* ── PROJECT INFORMATION ── */}
              <div className="mt-8 flex items-start justify-between gap-16">
                <div className="max-w-3xl">
                  <div className="mb-3 flex items-center gap-4">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-indigo-300/60">
                      {project.id}
                    </span>

                    <span className="h-px w-8 bg-white/10" />

                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                      {project.shortTitle}
                    </span>
                  </div>

                  <h2 className="font-syne text-4xl font-bold leading-tight tracking-tight text-white/95">
                    {project.title}
                  </h2>

                  <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/50">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mt-7 flex gap-3">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white/45"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── PROJECT ACTION ── */}
                <div className="pt-2">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center gap-4 whitespace-nowrap text-[11px] uppercase tracking-[0.25em] text-white/55 transition duration-300 hover:text-white"
                    >
                      <span>Explore Project</span>

                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition duration-300 group-hover/link:border-indigo-400/40 group-hover/link:bg-indigo-500/10">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <span className="flex items-center gap-4 whitespace-nowrap text-[11px] uppercase tracking-[0.25em] text-white/20">
                      <span>Project Preview</span>

                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/5">
                        →
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── FUTURE PROJECT SPACE ── */}
        <div className="relative mt-24 overflow-hidden">
          <div className="flex items-end justify-between">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
              More work in progress
            </p>

            <span className="font-mono text-xs text-white/20">03</span>
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
