/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        dm: ["DM Sans", "sans-serif"],
        montreal: ["Neue Montreal", "sans-serif"],
      },
      colors: {
        indigo: {
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
        },
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
        },
        purple: {
          400: "#c084fc",
          500: "#a855f7",
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        "float-slow": "floatSlow 4s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        drift: "drift linear infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },

        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },

        drift: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0.7" },
          "100%": { transform: "translateY(-200px) scale(0)", opacity: "0" },
        },

        shimmer: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      backgroundImage: {
        "mesh-indigo":
          "radial-gradient(ellipse at top left, rgba(99,102,241,0.2) 0%, transparent 60%)",
        "mesh-cyan":
          "radial-gradient(ellipse at bottom right, rgba(6,182,212,0.15) 0%, transparent 60%)",
        "mesh-purple":
          "radial-gradient(ellipse at center, rgba(168,85,247,0.1) 0%, transparent 60%)",
      },
    },
  },
  plugins: [],
};
