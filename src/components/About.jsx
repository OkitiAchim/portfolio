import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import phoneView from "../assets/phoneView.jpg";

export default function About() {
  const sectionRef = useRef(null);

  /* ─────────────────────────────────────────────
     MOUSE POSITION
  ───────────────────────────────────────────── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  /* smooth liquid lag */
  const smoothX = useSpring(mouseX, {
    stiffness: 90,
    damping: 22,
    mass: 0.6,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 90,
    damping: 22,
    mass: 0.6,
  });

  const handleMouseMove = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();

    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  /* intro animation */
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 120);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      id="about"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      initial={{
        y: 180,
        scale: 0.96,
        opacity: 0,
        borderTopLeftRadius: "80px",
        borderTopRightRadius: "80px",
      }}
      animate={
        visible
          ? {
              y: 0,
              scale: 1,
              opacity: 1,
              borderTopLeftRadius: "0px",
              borderTopRightRadius: "0px",
            }
          : {}
      }
      transition={{
        duration: 1.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative min-h-screen overflow-hidden bg-[#f5f5f3] text-black"
    >
      {/* ─────────────────────────────────────────
         GRID OVERLAY
      ───────────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* LIQUID RIPPLE LAYER*/}

      {/* Main soft liquid glow */}
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
            "radial-gradient(circle, rgba(0,0,0,0.10) 0%, rgba(120,120,120,0.08) 35%, rgba(255,255,255,0.02) 65%, transparent 75%)",
          filter: "blur(50px)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Secondary ripple */}
      <motion.div
        className="absolute pointer-events-none z-[1]"
        style={{
          x: smoothX,
          y: smoothY,
          width: 180,
          height: 180,
          borderRadius: "999px",
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(90,90,90,0.10) 0%, rgba(255,255,255,0.02) 70%, transparent 100%)",
          filter: "blur(20px)",
        }}
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/*TOP SHADOW TRANSITION*/}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.08), transparent)",
        }}
      />

      {/* CONTENT*/}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-32">
        {/* heading + image grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          {/* LEFT SIDE — TEXT */}
          <div className="max-w-3xl">
            <p className="text-[11px] tracking-[0.35em] uppercase text-black/40 mb-5 font-medium">
              About & Capabilities
            </p>
            <h1
              className="font-syne font-bold tracking-tight leading-[1.02]"
              style={{
                fontSize: "clamp(3rem, 6vw, 3rem)",
              }}
            >
              Building immersive
              <br />
              digital systems
              <br />
              with precision.
            </h1>

            <div className="mt-8 h-px w-44 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

            <p className="mt-10 text-black/60 text-lg leading-relaxed max-w-2xl font-dm">
              I build immersive frontend experiences and scalable digital
              systems that combine visual precision, interaction design, and
              modern web engineering. My work lives at the intersection of
              creativity, performance, and structure — crafting interfaces that
              feel fluid, intentional, and deeply human.
            </p>
            {/* values / philosophy */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-5 mt-10">
              <h1
                className="font-syne font-bold tracking-tight leading-[1.02]"
                style={{
                  fontSize: "clamp(3rem, 6vw, 3rem)",
                }}
              >
                Experiences
                <br />
                that feels
                <br />
                alive.
              </h1>
              <div className="mt-8 h-px w-44 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
              <p className="mt-0 text-black/55 leading-relaxed text-lg max-w-xl">
                Every interaction should feel intentional. Every transition
                should carry weight. I approach interfaces as living systems —
                blending motion, rhythm, typography, and engineering into
                experiences that communicate beyond visuals alone.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE — IMAGE */}
          <div className="relative w-full flex justify-center lg:justify-end">
            <motion.div
              initial={{
                opacity: 0,
                x: 250,
                scale: 0.9,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              viewport={{
                once: false,
                amount: 0.3,
              }}
              transition={{
                duration: 2.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative w-full max-w-[480px]"
            >
              <img
                src={phoneView}
                alt="Phone mockup"
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
        {/* values / philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-24 shadow-sm">
          {[
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
          ].map((item, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-[28px] border border-black/6 bg-white/40 backdrop-blur-xl p-8
                        transition-all duration-500 ease-out shadow-lg
                        hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] to-transparent" />

              <div className="relative z-10">
                <h3 className="font-syne text-2xl font-bold text-black/85">
                  {item.title}
                </h3>

                <p className="mt-5 text-black/55 leading-relaxed font-dm">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* bottom caption */}
        <div
          onClick={() =>
            document.getElementById("skills")?.scrollIntoView({
              behavior: "smooth",
            })
          }
          className="mt-28 flex flex-col items-center text-center opacity-90 cursor-pointer group transition-transform duration-300 hover:-translate-y-1"
        >
          {/* vertical accent line */}
          <div className="w-px h-20 bg-gradient-to-b from-indigo-400/40 via-cyan-400/20 to-transparent mb-6" />

          {/* small label */}
          <p className="text-black/35 uppercase tracking-[0.35em] text-[10px] animate-float-slow">
            Continue Exploring
          </p>

          {/* main line */}
          <h3 className="mt-3 mb-1 text-xl lg:text-3xl font-syne font-bold text-black/75 tracking-tight group-hover:text-black/90 transition">
            Designed with intention,built to endure.
          </h3>
        </div>
      </div>

      {/* ─────────────────────────────────────────
         BOTTOM FADE
      ───────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(255,255,255,0.95), transparent)",
        }}
      />
    </motion.section>
  );
}
