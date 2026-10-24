/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        graphite: { 950: "#070b11", 900: "#0d131c", 800: "#141d28", 700: "#1d2a38" },
        signal: { cyan: "#22d3ee", amber: "#f59e0b", red: "#f87171", green: "#34d399" },
      },
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui"], mono: ["JetBrains Mono", "ui-monospace", "monospace"] },
    },
  },
  plugins: [],
};
