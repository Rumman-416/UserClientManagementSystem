/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  theme: {
    extend: {
      colors: {
        mainColor: "#08B1F0",
      },
    },
  },
  plugins: [require("daisyui")],
};
