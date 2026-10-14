/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b0f1a',
        panel: '#11162a',
        candy: '#ff4d8d',
        aqua: '#4dd4ff',
        pearl: '#f5f7fa'
      },
      fontFamily: { display: ['"Sora"', 'sans-serif'], body: ['Inter', 'sans-serif'] }
    }
  },
  plugins: []
}
