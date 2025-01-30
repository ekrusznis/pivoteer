/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6C63FF",
        secondary: "#4B4EFC",
        darkBg: "#1E1E2D",
        darkCard: "#292943",
        lightText: "#F8F8FF",
      },
    },
  },
  plugins: [],
};
