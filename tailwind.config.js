/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './views/*/*.handlebars',
    './views/*.handlebars',
    './public/*/*.js'
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      neutral: colors.neutral,
      orange: colors.orange,
      lime: colors.lime,
      cyan: colors.cyan,
      indigo: colors.indigo
    },
    fontFamily: {
      sans: ['Century Gothic', 'CenturyGothic', 'AppleGothic', 'sans-serif'],
      serif: ['Didot', 'Didot LT STD', 'Hoefler Text', 'Garamond', 'Calisto MT', 'Times New Roman', 'serif']
    },
    extend: {},
  },
  plugins: [],
}

