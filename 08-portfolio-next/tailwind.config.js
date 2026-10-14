/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {
    colors: { void:'#030712', panel:'#0f172a', indigo:'#6366f1', mint:'#34d399', pearl:'#f1f5f9' },
    fontFamily: { display: ['"Plus Jakarta Sans"','sans-serif'], body: ['Inter','sans-serif'] }
  }},
  plugins: []
}
