/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        "3xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
        "4xl": [
          "0 35px 35px rgba(0, 0, 0, 0.25)",
          "0 45px 65px rgba(0, 0, 0, 0.15)",
        ],
      },
    },
    colors: {
      cyan: "#22d3ee",
      green: "#86efac",
      blue: "#1d4ed8",
      white: "#f9fafb",
      red: "#b91c1c",
    },
  },
  plugins: [],
};
