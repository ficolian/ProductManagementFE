const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        serif: ['Philosopher', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        'app-matte-black': '#333333',
        'app-grey': '#707070',
        'app-light-grey': '#DDDDDD',
        'app-green': '#7AAC47',
        'app-yellow': '#FFB931',
        'app-red': '#B22101',
      },
    },
  },
  plugins: [],
};
