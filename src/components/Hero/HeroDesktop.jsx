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
  uniform vec2 u_mouse;

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

    vec2 m = u_mouse / u_res;
    m.x *= asp;

    // Two-layer domain warp
    vec2 q = vec2(
      fbm(st + vec2(0.0, t)),
      fbm(st + vec2(5.2, 1.3) + t * 0.7)
    );

    vec2 r = vec2(
      fbm(st + 2.8 * q + vec2(1.7, 9.2) + t * 0.4),
      fbm(st + 2.8 * q + vec2(8.3, 2.8) + t * 0.3)
    );

    float f = fbm(st + 3.0 * r + t * 0.2);

    // Vertical beam — mouse interaction
    float cx = st.x - asp * 0.5;

    float mouseInfluence =
      smoothstep(0.6, 0.0, distance(st, m)) * 0.35;

    float beam =
      exp(-cx * cx / (0.28 + mouseInfluence));

    float curtain = pow(f, 1.4) * beam;

    // Aurora hangs from the top
    float vMask =
      smoothstep(0.0, 0.6, 1.0 - uv.y) *
      smoothstep(1.0, 0.1, 1.0 - uv.y);

    curtain *= vMask * 1.6;

    // Colour
    float wave = fbm(st * 1.8 + t * 0.5);

    float tone =
      clamp(wave * 2.0, 0.0, 1.0);

    vec3 icy =
      vec3(0.85, 0.92, 1.00);

    vec3 pure =
      vec3(1.00, 1.00, 1.00);

    vec3 periwinkle =
      vec3(0.72, 0.82, 0.94);

    vec3 col =
      mix(icy, pure, tone);

    col =
      mix(
        periwinkle,
        col,
        smoothstep(0.3, 0.8, f)
      );

    // Double glow bloom
    float glow1 =
      curtain * curtain * 1.4;

    float glow2 =
      pow(curtain, 3.0) * 2.0;

    vec3 out_col =
      col * (glow1 + glow2);

    // Radial vignette
    vec2 vg =
      uv * 2.0 - 1.0;

    float vig =
      1.0 -
      dot(
        vg * vec2(0.5, 0.7),
        vg * vec2(0.5, 0.7)
      );

    vig =
      clamp(vig, 0.0, 1.0);

    out_col *=
      vig * vig * 1.3;

    // Subtle film grain
    float grain =
      hash(st + fract(t)) * 0.04 - 0.02;

    out_col += grain;

    gl_FragColor =
      vec4(out_col, 1.0);
  }
`;

// ─── Animation ───────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
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
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// ─── WebGL helper ────────────────────────────────────────────────────────
function mkShader(gl, type, src) {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("Shader error:", gl.getShaderInfoLog(shader));
  }

  return shader;
}

// ─── Desktop Hero ────────────────────────────────────────────────────────
export default function HeroDesktop({
  tagline = "Frontend Developer & UI Engineer",

  subCopy = "Crafting high-performance web applications, geospatial platforms, and AI-powered experiences.",

  primaryCta = "View Work",

  secondaryCta = "About me",

  onPrimary = () => {
    document.getElementById("projects")?.scrollIntoView({
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
  const mouseRef = useRef({
    x: 0,
    y: 0,
  });

  const rafRef = useRef(null);

  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const gl = canvas.getContext("webgl");

    if (!gl) {
      console.warn("WebGL not supported — hero canvas will be blank.");

      return;
    }

    // ── Resize ──────────────────────────────────────────────────
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      gl.viewport(0, 0, canvas.width, canvas.height);

      mouseRef.current = {
        x: canvas.width * 0.5,
        y: canvas.height * 0.5,
      };
    };

    window.addEventListener("resize", resize);

    resize();

    // ── Compile & link ──────────────────────────────────────────
    const prog = gl.createProgram();

    gl.attachShader(prog, mkShader(gl, gl.VERTEX_SHADER, VERT_SRC));

    gl.attachShader(prog, mkShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC));

    gl.linkProgram(prog);

    gl.useProgram(prog);

    // ── Full-screen quad ────────────────────────────────────────
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

    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    // ── Animation ───────────────────────────────────────────────
    const start = performance.now();

    const tick = () => {
      const t = (performance.now() - start) / 1000;

      gl.uniform1f(uTime, t);

      gl.uniform2f(uRes, canvas.width, canvas.height);

      // Flip Y for WebGL coordinates
      gl.uniform2f(
        uMouse,
        mouseRef.current.x,
        canvas.height - mouseRef.current.y,
      );

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    // ── Mouse tracking ──────────────────────────────────────────
    const section = canvas.closest("section") || canvas.parentElement;

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();

      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    section.addEventListener("mousemove", onMove);

    // ── Cleanup ─────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafRef.current);

      window.removeEventListener("resize", resize);

      section.removeEventListener("mousemove", onMove);

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
        min-h-screen
        w-full
        items-end
        overflow-hidden
        bg-black
      "
    >
      {/* ── WebGL background ─────────────────────────────────── */}
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

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-[7%]
          right-[7%]
          z-[4]
        "
        style={{
          writingMode: "vertical-rl",
        }}
        aria-hidden="true"
      >
        <div className="flex items-center gap-[10px]">
          <span
            className="block"
            style={{
              width: "1px",
              height: "50px",
              background: "rgba(255,255,255,0.15)",
            }}
          />

          <span
            className="
              font-dm
              font-normal
            "
            style={{
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            Scroll
          </span>
        </div>
      </div>

      {/* ── Bottom gradient ──────────────────────────────────── */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-[3]
          h-48
        "
        style={{
          background: "linear-gradient(transparent, rgba(0,0,0,0.75))",
        }}
      />

      {/* ── Main copy ─────────────────────────────────────────── */}
      <motion.div
        className="
          relative
          z-[10]
          w-full
          px-[7%]
          pb-[9%]
          pt-32
        "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.p
          variants={itemVariants}
          className="
            mb-6
            font-dm
            font-light
          "
          style={{
            fontSize: "11px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          {tagline}
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="
            mb-7
            max-w-[620px]
            font-syne
            font-bold
            leading-none
          "
          style={{
            fontSize: "4rem",
            letterSpacing: "-0.03em",
            color: "#ffffff",
          }}
        >
          Building
          <br />
          Systems That
          <br />
          <span
            style={{
              color: "rgba(255,255,255,0.38)",
            }}
          >
            Think,
          </span>
          <br />
          Scale &amp; Endure
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          variants={itemVariants}
          className="
            mb-11
            max-w-[360px]
            font-dm
            font-light
          "
          style={{
            fontSize: "14px",
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.38)",
          }}
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
              cursor-pointer
              font-dm
              font-semibold
              transition-opacity
              hover:opacity-80
              active:scale-95
            "
            style={{
              background: "#ffffff",
              color: "#000000",
              padding: "13px 28px",
              fontSize: "12px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              border: "none",
            }}
          >
            {primaryCta}
          </button>

          <button
            onClick={onSecondary}
            className="
              flex
              cursor-pointer
              items-center
              gap-2
              font-dm
              font-normal
              transition-colors
              hover:text-white
              active:scale-95
            "
            style={{
              background: "transparent",
              color: "rgba(255,255,255,0.4)",
              fontSize: "13px",
              letterSpacing: "0.04em",
              border: "none",
              padding: "13px 0",
            }}
          >
            <span>{secondaryCta}</span>

            <ArrowRight size={14} />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
