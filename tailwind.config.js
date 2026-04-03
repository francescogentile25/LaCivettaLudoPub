/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui';
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'blumelli': 'var(--blumelli)',
        'brandBlue': '#0088cc',
        'brandBlack': '#111111',
        'brandWhite': '#ffffff',
      },
      fontFamily: {
        heading: ['Archivo Black', 'sans-serif'],
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'brutal-white': '4px 4px 0px 0px rgba(255, 255, 255, 1)',
        'brutal-blue': '4px 4px 0px 0px #0088cc',
      }
    },
  },
  plugins: [
    PrimeUI
  ],
}

