import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#0D1117",
          900: "#111820",
          800: "#171F2B",
          700: "#1E2D3E",
          600: "#253344",
        },
        sage: {
          400: "#A8DBBF",
          500: "#7EC8A4",
          600: "#4AA882",
          700: "#2E7A5C",
          800: "#1E3A2E",
        },
        stone: {
          100: "#E8E3DA",
          200: "#C8C2B7",
          300: "#A09890",
          400: "#6B6560",
        },
        altitude: {
          easy: "#7EC8A4",
          moderate: "#EF9F27",
          hard: "#F0997B",
          expert: "#E24B4A",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
