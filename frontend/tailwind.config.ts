import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // "Night flight" palette — deep-space navy grounds a warm, golden-hour
        // accent. Values are driven by CSS variables so both dark (default)
        // and light themes can share the same token names.
        void: "rgb(var(--c-void) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        surface2: "rgb(var(--c-surface2) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        amber: {
          DEFAULT: "#E8934A",
          soft: "#F3B27A",
        },
        aqua: {
          DEFAULT: "#2DD4BF",
          soft: "#7EEAE0",
        },
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        mute: "rgb(var(--c-mute) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(ellipse at center, rgba(232,147,74,0.08) 0%, rgba(11,17,32,0) 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
