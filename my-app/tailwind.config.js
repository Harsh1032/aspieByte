/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    options: {
      safelist: [
        // Add dynamic class prefixes here
        /^bg-/, // Preserve background color classes
        /^text-/, // Preserve text color classes
        // Add more dynamic class prefixes as needed
      ],
    },
  },
  darkMode: "class",
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      }
    },
  },
  plugins: [
    function({ addUtilities}){
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar":{
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        }
      };

      addUtilities(newUtilities);
    }
  ],
}
