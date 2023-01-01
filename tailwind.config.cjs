/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#fce36c',
        },
      },
    ],
  },
  theme: {
    extend: {
      colors: {
        ['light-background']: '#f8f3ef',
        ['dark-background']: '#1f1f1f',
        highlight: '#3f3f3f',
        primary: '#fce36c',
      },
      fontFamily: {
        logo: 'Nabla, cursive',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('daisyui'),
    require('tailwindcss-highlights'),
  ],
};
