/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light : "#1C639D",
          hover: "#312e81"
        },
        secondary: "#8DADCA",
        accent: "#c89df5",
        warn: {
          light: "#ef4444",
          hover: "#991b1b"
        },
        success:  {
          light: "#16a34a",
          hover: "#166534"
        }
      },
    },
  },
  plugins: [],
};

