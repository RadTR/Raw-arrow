export default {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Archivo', 'sans-serif'],
      },
      colors: {
        raw: {
          yellow: '#D4AF37', // Muted, premium gold/yellow
        }
      }
    }
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
