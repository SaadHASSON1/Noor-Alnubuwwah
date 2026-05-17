/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'islamic-gold':  '#C9A84C',
        'islamic-green': '#1B4332',
        'desert-sand':   '#E8D5A3',
        'desert-warm':   '#C4A882',
        'dark-bg':       '#030813',
        'dark-panel':    '#0d1b2a',
      },
      fontFamily: {
        'noto':  ['"Scheherazade New"', 'serif'],
        'kufi':  ['"Reem Kufi"', 'serif'],
        'amiri': ['Amiri', 'serif'],
        'sans':  ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(3.5rem, 10vw, 9rem)', { lineHeight: '1.05' }],
        'hero':    ['clamp(5rem, 18vw, 16rem)', { lineHeight: '1' }],
      },
    },
  },
  plugins: [],
}
