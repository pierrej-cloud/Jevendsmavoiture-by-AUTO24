import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#185ADB",
          dark: "#1249B8",
          light: "#2E6FE8",
          50: "#EEF3FC",
          100: "#D5E3F8",
          200: "#8FB3F9",
          300: "#5A8DF5",
          400: "#2E6FEE",
          500: "#185ADB",
          600: "#1249B8",
          700: "#0F3FA8",
          800: "#0A2D7A",
          900: "#061C4D",
        },
        neutral: {
          dark: "#1A1A2E",
          medium: "#6B7280",
          light: "#F3F4F6",
        },
        background: "#FAFBFC",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
      },
      fontFamily: {
        sans: ["Gilroy", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 4px 16px rgba(0, 0, 0, 0.1)",
        button: "0 2px 4px rgba(24, 90, 219, 0.25)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
