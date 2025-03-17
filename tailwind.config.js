module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "confirm-green": "#01D25B",
        "highlight-teal": "#00FFD1",
      },
      screens: {
        "2xl": "1800px",
        "3xl": "2300px",
      },
      backgroundOpacity: {
        85: "0.85",
      },
      scale: {
        '30': '.30',
        '35': '.35',
        '40': '.40',
        '45': '.45',
        '50': '.50',
        '55': '.55',
        '60': '.60',
        '65': '.65',
        '70': '.70',
        '80': '.80',
        '85': '.85',
        '200': '2.0',
      },
      height: {
        '84': '21rem',
        '88': '22.0rem',
      },
      width: {
        '78': '19.4rem',
        '88': '22rem',
        '104': '26rem',
        '124': '30rem',
      },
      minWidth: {
        fit: 'fit-content',
      },
      margin: {
        '89': '23rem',
        '104': '26rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem'
      }
    },
    minWidth: {
      '8': '2.0rem',
      '32': '8.0rem',
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.hide-scrollbar': {
          /* Hide scrollbar for Chrome, Safari, and Opera */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          /* Hide scrollbar for IE, Edge, and Firefox */
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
        },
        '.line-clamp-2': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '2',
          'line-clamp': '2',
        },
        '.line-clamp-3': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '3',
          'line-clamp': '3',
        },
      });
    },
  ],
};
