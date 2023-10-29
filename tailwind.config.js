/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Spectral", "serif"],
      },
      width: {
        normal: "1260px",
        tight: "840px",
      },
      maxWidth: {
        normal: "1260px",
        tight: "840px",
      },
    },
  },
  plugins: [],
};
