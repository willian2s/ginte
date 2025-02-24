import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    ".src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        zinc: {
          50: "#fafafa",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
          950: "#09090b",
        },
        stone: {
          50: "#fafaf9",
        },
        green: {
          900: "#14532d",
        },
        red: {
          600: "#dc2626",
        },
        neutral: {
          50: "#fafafa",
          300: "#d4d4d4",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
