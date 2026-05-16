/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'islamic-gold': '#C9A84C',
        'islamic-green': '#1B4332',
        'desert-sand': '#E8D5A3',
        'dark-bg': '#0f172a',
        'dark-panel': '#1e293b'
      },
      fontFamily: {
        'arabic': ['Amiri', 'Noto Naskh Arabic', 'serif'],
        'sans': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
