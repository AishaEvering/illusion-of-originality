/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        night: "#050816",
        "night-soft": "#0B1020",
        ink: "#F9FAFB",
        "ink-muted": "#9CA3AF",
        "card-border": "#111827",

        // match these EXACT names to your classes:
        "grad-blue": "#2D3DFF",
        "grad-indigo": "#5A24D8",
        "grad-purple": "#A03AD8",
        "grad-pink": "#E0468B",
        "grad-orange": "#FF8A2A",
        "grad-yellow": "#FFC833",
      },
      fontFamily: {
        display: ["Georgia", "ui-serif", "serif"],
        body: ["system-ui", "ui-sans-serif", "sans-serif"],
      },
    },
  },
  plugins: [],
};
