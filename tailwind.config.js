/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        quickscript_green: "#6DBE3B",
        quickscript_dark_gray: "#1C292F",
        quickscript_gray: "#1B3238",
        quickscript_light_gray: "#1F5E6B",
      },
    },
  },
  plugins: [],
};
