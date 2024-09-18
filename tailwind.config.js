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
        quickscript_white:"#E9EFE6",
      },
      boxShadow: {
        'custom-green': '0 10px 15px -3px rgba(109, 190, 59, 0.5), 0 4px 6px -2px rgba(109, 190, 59, 0.25)', // Ajuste de la sombra
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities(
        {
          '.no-scrollbar': {
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none', 
          },
          '.no-scrollbar::-webkit-scrollbar': {
            'display': 'none',  
          },
        },
        ['responsive', 'hover']
      );
    },
  ],
};
