import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#080c10",
          surface: "#0d1117",
          card: "#111820",
          border: "#1e2d3d",
        },
        accent: {
          cyan: "#00d4ff",
          violet: "#8b5cf6",
          emerald: "#10b981",
          amber: "#f59e0b",
          rose: "#f43f5e",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        pulse_glow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite linear",
        pulse_glow: "pulse_glow 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
        "mesh-gradient":
          "radial-gradient(ellipse at top left, rgba(0,212,255,0.08) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(139,92,246,0.08) 0%, transparent 50%)",
      },
      backgroundSize: {
        "grid-size": "40px 40px",
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(0,212,255,0.15), 0 0 40px rgba(0,212,255,0.05)",
        "glow-violet": "0 0 20px rgba(139,92,246,0.15), 0 0 40px rgba(139,92,246,0.05)",
        "glow-emerald": "0 0 20px rgba(16,185,129,0.15), 0 0 40px rgba(16,185,129,0.05)",
        "card-hover": "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,212,255,0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
