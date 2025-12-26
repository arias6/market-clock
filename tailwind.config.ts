/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--brand-primary)",
          secondary: "var(--brand-secondary)",
          accent: "var(--brand-accent)",
        },
        text: {
          main: "var(--text-main)",
          muted: "var(--text-muted)",
          light: "var(--text-light)",
        },
        surface: {
          primary: "var(--surface-primary)",
          soft: "var(--surface-soft)",
          border: "var(--surface-border)",
        },
        state: {
          open: "var(--state-open)",
          closed: "var(--state-closed)",
          warning: "var(--state-warning)",
        },
      },
      fontFamily: {
        fa: ["var(--font-fa)"],
        en: ["var(--font-en)"],
      },
      animation: {
        fadeIn: "fade-in 0.6s ease-out forwards",
        slideUp: "slide-up 0.5s ease-out forwards",
        pulseSoft: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};