/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'bg-color': 'var(--bg-color)',
        'text-color': 'var(--text-color)',
        'icon-color': 'var(--icon-color)',
        'logo-color': 'var(--logo-color)',
        'input-color': 'var(--input-color)',
      },
      boxShadow: {
        'custom-green': '0 10px 15px -3px rgba(109, 190, 59, 0.5), 0 4px 6px -2px rgba(109, 190, 59, 0.25)',
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
