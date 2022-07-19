/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        xl: "4rem 0 0 0 rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
