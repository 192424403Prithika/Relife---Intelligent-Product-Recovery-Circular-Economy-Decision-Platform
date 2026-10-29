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
        background: "#F4F7F5",
        surface: "#FFFFFF",
        primary: {
          DEFAULT: "#073E2E", // Deep forest green from Finora
          hover: "#053023",
          light: "#0A4E3B",
          dark: "#04281E",
        },
        mint: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
        },
        gold: {
          DEFAULT: "#F59E0B",
          light: "#FBBF24",
          dark: "#D97706",
          bg: "#FEF3C7",
        },
        accent: {
          orange: "#F97316",
          cyan: "#06B6D4",
          purple: "#8B5CF6",
          emerald: "#10B981",
          rose: "#F43F5E",
        },
        slate: {
          850: "#172033",
        }
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      boxShadow: {
        'card': '0 2px 16px -2px rgba(16, 24, 40, 0.05), 0 1px 4px -1px rgba(16, 24, 40, 0.03)',
        'card-hover': '0 12px 28px -4px rgba(16, 24, 40, 0.08), 0 4px 8px -2px rgba(16, 24, 40, 0.04)',
        'hero': '0 10px 30px -5px rgba(7, 62, 46, 0.3)',
      }
    },
  },
  plugins: [],
};
export default config;
