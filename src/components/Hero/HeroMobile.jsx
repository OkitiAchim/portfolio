import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ─── WebGL shader sources ────────────────────────────────────────────────
const VERT_SRC = `
  attribute vec2 a_pos;

  void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

const FRAG_SRC = `
  precision highp float;

  uniform float u_time;
  uniform vec2 u_res;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(
      mix(a, b, f.x),
      mix(c, d, f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    float freq = 1.0;

    for (int i = 0; i < 6; i++) {
      v += amp * noise(p * freq);
      amp *= 0.5;
      freq *= 2.1;
    }

    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_res;

    float asp = u_res.x / u_res.y;

    vec2 st = uv;
    st.x *= asp;

    float t = u_time * 0.14;

    // Domain warp
    vec2 q = vec2(
      fbm(st + vec2(0.0, t)),
      fbm(st + vec2(5.2, 1.3) + t * 0.7)
    );

    vec2 r = vec2(
      fbm(st + 2.8 * q + vec2(1.7, 9.2) + t * 0.4),
      fbm(st + 2.8 * q + vec2(8.3, 2.8) + t * 0.3)
    );

    float f = fbm(st + 3.0 * r + t * 0.2);

    // Central vertical beam
    float cx = st.x - asp * 0.5;

    float beam = exp(-cx * cx / 0.28);

    float curtain = pow(f, 1.4) * beam;

    // Keep the visual weight toward the upper portion
    float vMask =
      smoothstep(0.0, 0.6, 1.0 - uv.y) *
      smoothstep(1.0, 0.1, 1.0 - uv.y);

    curtain *= vMask * 1.6;

    // Colour
    float wave = fbm(st * 1.8 + t * 0.5);
    float tone = clamp(wave * 2.0, 0.0, 1.0);

    vec3 icy = vec3(0.85, 0.92, 1.00);
    vec3 pure = vec3(1.00, 1.00, 1.00);
    vec3 periwinkle = vec3(0.72, 0.82, 0.94);

    vec3 col = mix(icy, pure, tone);

    col = mix(
      periwinkle,
      col,
      smoothstep(0.3, 0.8, f)
    );

    // Glow
    float glow1 = curtain * curtain * 1.4;
    float glow2 = pow(curtain, 3.0) * 2.0;

    vec3 out_col = col * (glow1 + glow2);

    // Vignette
    vec2 vg = uv * 2.0 - 1.0;

    float vig =
      1.0 -
      dot(
        vg * vec2(0.5, 0.7),
        vg * vec2(0.5, 0.7)
      );

    vig = clamp(vig, 0.0, 1.0);

    out_col *= vig * vig * 1.3;

    // Film grain
    float grain = hash(st + fract(t)) * 0.04 - 0.02;

    out_col += grain;

    gl_FragColor = vec4(out_col, 1.0);
  }
`;

// ─── Animation ───────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.35,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// ─── Shader helper ──────────────────────────────────────────────────────
function mkShader(gl, type, src) {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("Mobile hero shader error:", gl.getShaderInfoLog(shader));
  }

  return shader;
}

// ─── Mobile Hero ─────────────────────────────────────────────────────────
export default function HeroMobile({
  tagline = "Frontend Developer & UI Engineer",

  subCopy = "Crafting high-performance web applications, geospatial platforms, and AI-powered experiences.",

  primaryCta = "View Work",

  secondaryCta = "About me",

  onPrimary = () => {
    document.getElementById("work")?.scrollIntoView({
      behavior: "smooth",
    });
  },

  onSecondary = () => {
    document.getElementById("about")?.scrollIntoView({
      behavior: "smooth",
    });
  },
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const gl = canvas.getContext("webgl");

    if (!gl) {
      console.warn("WebGL not supported — mobile hero canvas will be blank.");
      return;
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;

      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resize);

    resize();

    // Program
    const prog = gl.createProgram();

    gl.attachShader(prog, mkShader(gl, gl.VERTEX_SHADER, VERT_SRC));

    gl.attachShader(prog, mkShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC));

    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Full-screen quad
    const buf = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buf);

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1, 1, -1, -1, 1,

        -1, 1, 1, -1, 1, 1,
      ]),
      gl.STATIC_DRAW,
    );

    const aPos = gl.getAttribLocation(prog, "a_pos");

    gl.enableVertexAttribArray(aPos);

    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");

    const uRes = gl.getUniformLocation(prog, "u_res");

    const start = performance.now();

    const tick = () => {
      const time = (performance.now() - start) / 1000;

      gl.uniform1f(uTime, time);

      gl.uniform2f(uRes, canvas.width, canvas.height);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);

      window.removeEventListener("resize", resize);

      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, []);

  useEffect(() => {
    const cleanup = initWebGL();

    return cleanup;
  }, [initWebGL]);

  return (
    <section
      className="
        relative
        flex
        min-h-[100svh]
        w-full
        flex-col
        justify-end
        overflow-hidden
        bg-black
      "
    >
      {/* ── WebGL background ───────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        className="
          absolute
          inset-0
          h-full
          w-full
        "
        aria-hidden="true"
      />

      {/* ── Background fade ────────────────────────────────────── */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-[3]
          h-[55%]
        "
        style={{
          background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
        }}
      />

      {/* ── Additional mobile vignette ─────────────────────────── */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
        "
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.15), transparent 35%, rgba(0,0,0,0.35))",
        }}
      />

      {/* ── Main content ───────────────────────────────────────── */}
      <motion.div
        className="
          relative
          z-[10]
          flex
          min-h-[100svh]
          w-full
          flex-col
          justify-end
          px-5
          pb-[10vh]
          pt-20
        "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.p
          variants={itemVariants}
          className="
            mb-5
            font-dm
            text-[10px]
            font-light
            uppercase
            tracking-[0.22em]
            text-white/35
          "
        >
          {tagline}
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="
            mb-5
            w-full
            font-syne
            text-[clamp(2.5rem,11vw,4rem)]
            font-semibold
            leading-[1.02]
            tracking-[-0.035em]
            text-white
          "
        >
          Building
          <br />
          Systems That
          <br />
          <span className="text-white/25">Think,</span>
          <br />
          <span className="whitespace-nowrap">Scale &amp; Endure</span>
        </motion.h1>

        {/* Supporting copy */}
        <motion.p
          variants={itemVariants}
          className="
            mb-8
            max-w-[330px]
            font-dm
            text-[13px]
            font-light
            leading-[1.7]
            text-white/40
          "
        >
          {subCopy}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="
            flex
            items-center
            gap-5
          "
        >
          <button
            onClick={onPrimary}
            className="
              rounded-none
              bg-white
              px-6
              py-3
              font-dm
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.06em]
              text-black
              transition-transform
              active:scale-95
            "
          >
            {primaryCta}
          </button>

          <button
            onClick={onSecondary}
            className="
              flex
              items-center
              gap-2
              bg-transparent
              py-3
              font-dm
              text-[12px]
              font-normal
              tracking-[0.04em]
              text-white/40
              transition-colors
              active:text-white
            "
          >
            <span>{secondaryCta}</span>

            <ArrowRight size={14} />
          </button>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ───────────────────────────────────── */}
      <motion.div
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.2,
          duration: 0.7,
        }}
        className="
          pointer-events-none
          absolute
          bottom-5
          right-5
          z-[10]
          flex
          items-center
          gap-3
        "
        aria-hidden="true"
      >
        <span
          className="
            block
            h-px
            w-8
            bg-white/15
          "
        />

        <span
          className="
            font-dm
            text-[9px]
            font-normal
            uppercase
            tracking-[0.18em]
            text-white/20
          "
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
