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
        primary: {
          DEFAULT: "#082D68",
          hover: "#062352",
        },
        navy: {
          DEFAULT: "#082D68",
          deep: "#06275B",
          dark: "#051D44",
          light: "#103E8A",
        },
        royal: {
          DEFAULT: "#1554B8",
          hover: "#114494",
          light: "#2563EB",
        },
        sky: {
          soft: "#EAF3FF",
          light: "#F0F7FF",
        },
        gold: {
          DEFAULT: "#F5AE25",
          hover: "#D99516",
          light: "#FEF3C7",
        },
        school: {
          text: "#172B4D",
          muted: "#5E6C84",
          bg: "#F7FAFF",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        heading: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(8, 45, 104, 0.08)",
        card: "0 10px 30px -4px rgba(8, 45, 104, 0.08)",
        nav: "0 2px 15px -3px rgba(8, 45, 104, 0.07)",
        elevated: "0 20px 40px -8px rgba(8, 45, 104, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
