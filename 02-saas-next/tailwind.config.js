/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {
    colors: { ink:'#0a0f1c', card:'#11182c', lime:'#7cff6b', ocean:'#38bdf8', pearl:'#eef2ff' },
    fontFamily: { display: ['"Manrope"','sans-serif'], body: ['Inter','sans-serif'] }
  }},
  plugins: []
}
