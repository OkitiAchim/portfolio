import { useEffect, useState } from "react";
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
// Mobile About
// ─────────────────────────────────────────────

export default function AboutMobile() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 120);

    return () => clearTimeout(timer);
  }, []);

  const values = [
    {
      title: "Precision",
      text: "Every interaction is designed with clarity, responsiveness, and intentional structure.",
    },
    {
      title: "Motion",
      text: "Interfaces should feel alive — subtle movement creates emotion, direction, and immersion.",
    },
    {
      title: "Systems",
      text: "Beyond visuals, I focus on scalable architecture and sustainable frontend engineering.",
    },
  ];

  return (
    <motion.section
      id="about"
      initial={{
        y: 100,
        opacity: 0,
        borderTopLeftRadius: "50px",
        borderTopRightRadius: "50px",
      }}
      animate={
        visible
          ? {
              y: 0,
              opacity: 1,
              borderTopLeftRadius: "0px",
              borderTopRightRadius: "0px",
            }
          : {}
      }
      transition={{
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-[#f5f5f3]
        text-black
      "
    >
      {/* ─────────────────────────────────────────
         GRID BACKGROUND
      ───────────────────────────────────────── */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none
          opacity-50
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      {/* ─────────────────────────────────────────
         TOP TRANSITION
      ───────────────────────────────────────── */}

      <div
        className="
          absolute
          top-0
          left-0
          right-0
          h-20
          pointer-events-none
        "
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.07), transparent)",
        }}
      />

      {/* ─────────────────────────────────────────
         MAIN CONTENT
      ───────────────────────────────────────── */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
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
           INTRO
        ───────────────────────────────────── */}

        <motion.div
          variants={itemVariants}
          className="
            flex
            flex-col
            items-start
            text-left
          "
        >
          <p
            className="
              mb-5
              font-dm
              text-[9px]
              font-medium
              uppercase
              tracking-[0.28em]
              text-black/40
            "
          >
            About &amp; Capabilities
          </p>

          <h2
            className="
              max-w-[340px]
              font-syne
              text-[1.8rem]
              font-bold
              leading-[1.03]
              tracking-[-0.045em]
              text-black
            "
          >
            <span className="whitespace-nowrap">Crafting immersive</span>
            <br />
            digital systems
            <br />
            with precision.
          </h2>

          <div
            className="
              mt-7
              h-px
              w-28
              bg-gradient-to-r
              from-black/50
              via-black/20
              to-transparent
            "
          />

          <p
            className="
              mt-7
              max-w-[350px]
              font-dm
              text-[14px]
              font-light
              leading-[1.75]
              text-black/60
              justify
            "
          >
            I create immersive frontend experiences and scalable digital systems
            that combine visual precision, interaction design, and modern web
            engineering. My work lives at the intersection of creativity,
            performance, and structure — crafting interfaces that feel fluid,
            intentional, and deeply human.
          </p>
        </motion.div>

        {/* ─────────────────────────────────────
           PHILOSOPHY
        ───────────────────────────────────── */}

        <motion.div
          variants={itemVariants}
          className="
            flex
            flex-col
            items-start
            text-left
          "
        >
          <h2
            className="
              font-syne
              text-[1.8rem]
              font-bold
              leading-[1.04]
              tracking-[-0.045em]
              text-black
              pt-5
            "
          >
            Experiences
            <br />
            that feel
            <br />
            alive.
          </h2>

          <div
            className="
              mt-7
              h-px
              w-28
              bg-gradient-to-r
              from-black/50
              via-black/20
              to-transparent
            "
          />

          <p
            className="
              mt-7
              max-w-[350px]
              font-dm
              text-[14px]
              font-light
              leading-[1.75]
              text-black/55
            "
          >
            Every interaction should feel intentional. Every transition should
            carry weight. I approach interfaces as living systems — blending
            motion, rhythm, typography, and engineering into experiences that
            communicate beyond visuals alone.
          </p>
        </motion.div>

        {/* ─────────────────────────────────────
           VALUES
        ───────────────────────────────────── */}

        <motion.div
          variants={itemVariants}
          className="
            mt-20
            flex
            flex-col
            gap-4
          "
        >
          {values.map((item) => (
            <div
              key={item.title}
              className="
                relative
                overflow-hidden
                rounded-[22px]
                border
                border-black/[0.06]
                bg-white/45
                p-6
                shadow-[0_8px_30px_rgba(0,0,0,0.05)]
                backdrop-blur-xl
              "
            >
              <div
                className="
                  absolute
                  inset-0
                  pointer-events-none
                  bg-gradient-to-br
                  from-black/[0.02]
                  to-transparent
                "
              />

              <div className="relative z-10">
                <h3
                  className="
                    font-syne
                    text-[1.35rem]
                    font-bold
                    tracking-[-0.02em]
                    text-black/85
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-3
                    max-w-[320px]
                    font-dm
                    text-[13px]
                    font-light
                    leading-[1.7]
                    text-black/55
                  "
                >
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ─────────────────────────────────────────
         BOTTOM FADE
      ───────────────────────────────────────── */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-24
          pointer-events-none
        "
        style={{
          background:
            "linear-gradient(to top, rgba(255,255,255,0.9), transparent)",
        }}
      />
    </motion.section>
  );
}
