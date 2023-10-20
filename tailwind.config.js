/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#1C639D",
        secondary: "#8DADCA",
        accent: "#c89df5",
        warn: "#EC3B3B",
      },
    },
  },
  plugins: [],
};
