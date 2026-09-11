import { motion } from "framer-motion";

// ─────────────────────────────────────────────
// Animation
// ─────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ─────────────────────────────────────────────
// Mobile Services
// ─────────────────────────────────────────────

export default function ServicesMobile() {
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

  return (
    <motion.section
      id="services"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-black
        text-white
      "
    >
      {/* ─────────────────────────────────────────
         GRID
      ───────────────────────────────────────── */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none
          opacity-40
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      {/* ─────────────────────────────────────────
         CONTENT
      ───────────────────────────────────────── */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[520px]
          px-5
          py-24
        "
      >
        {/* ─────────────────────────────────────
           HEADER
        ───────────────────────────────────── */}

        <motion.div variants={itemVariants} className="max-w-[370px]">
          <p
            className="
              mb-5
              font-dm
              text-[9px]
              font-medium
              uppercase
              tracking-[0.28em]
              text-white/40
            "
          >
            Web Development Services
          </p>

          <h1
            className="
              font-syne
              text-[1.8rem]
              font-bold
              leading-[1.03]
              tracking-[-0.045em]
              text-white
            "
          >
            Your vision,
            <br />
            brought online.
          </h1>

          <div
            className="
              mt-7
              h-px
              w-28
              bg-gradient-to-r
              from-white/50
              via-white/20
              to-transparent
            "
          />

          <p
            className="
              mt-7
              max-w-[360px]
              font-dm
              text-[14px]
              font-light
              leading-[1.75]
              text-white/55
            "
          >
            Need a website for your business, portfolio, or product? I handle
            the entire process from design to development, creating polished,
            responsive experiences that help you present your brand with
            confidence.
          </p>
        </motion.div>

        {/* ─────────────────────────────────────
           SERVICE CARDS
        ───────────────────────────────────── */}

        <div className="mt-14 flex flex-col gap-5">
          {services.map((service) => (
            <motion.article
              key={service.title}
              variants={itemVariants}
              className="
                relative
                overflow-hidden
                rounded-[22px]
                border
                border-white/[0.07]
                bg-white/[0.035]
                p-6
                backdrop-blur-md
                shadow-[0_12px_35px_rgba(0,0,0,0.18)]
              "
            >
              {/* Card glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-br
                  from-white/[0.025]
                  via-transparent
                  to-transparent
                "
              />

              <div className="relative z-10">
                {/* Title */}

                <h2
                  className="
                        w-full
                        text-center
                        font-syne
                        text-[1.35rem]
                        font-bold
                        leading-[1.15]
                        tracking-[-0.025em]
                        text-white/90
                    "
                >
                  {service.title}
                </h2>

                {/* Description */}

                <p
                  className="
                    mt-4
                    font-dm
                    text-[13px]
                    font-light
                    leading-[1.75]
                    text-justify
                    text-white/50
                  "
                >
                  {service.text}
                </p>

                {/* Skills */}

                <div className="mt-6 flex flex-wrap gap-2">
                  {service.skills.map((skill) => (
                    <span
                      key={skill}
                      className="
                        rounded-full
                        border
                        border-white/[0.09]
                        px-3
                        py-1.5
                        font-dm
                        text-[10px]
                        font-light
                        tracking-[0.02em]
                        text-white/55
                      "
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────
         BOTTOM FADE
      ───────────────────────────────────────── */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          h-24
        "
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
        }}
      />
    </motion.section>
  );
}
