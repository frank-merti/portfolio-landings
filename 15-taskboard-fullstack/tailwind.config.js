/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b1020',
        panel: '#121a2e',
        edge: 'rgba(255,255,255,.08)',
        accent: '#6366f1',
        pearl: '#eef2ff'
      },
      fontFamily: { display: ['"Sora"', 'sans-serif'], body: ['Inter', 'sans-serif'] }
    }
  },
  plugins: []
};
