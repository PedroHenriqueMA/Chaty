import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        wine: "var(--wine)",
        salmon: {
          light: "var(--salmon-light)",
          DEFAULT: "var(--salmon-default)",
          dark: "var(--salmon-dark)"
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
