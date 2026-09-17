import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        "bg-base": "#FFFFFF",
        "indigo-500": "#6366F1",
        "indigo-50": "#EEF2FF",
        "text-heading": "#111827",
        "text-muted": "#6B7280",
        "border-subtle": "#E5E7EB",
        success: "#10B981",
        danger: "#EF4444",
      },
      boxShadow: {
        card: "0 4px 24px rgba(17,24,39,0.06)",
        "card-hover": "0 8px 32px rgba(17,24,39,0.1)",
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
