/** @type {import('tailwindcss').Config} */
export default { content: ['./index.html','./src/**/*.{js,jsx}'], theme: { extend: {
  colors: { ink:'#0c0a09', brass:'#c9893b', cream:'#f7f1e6', ash:'#a8a29e' },
  fontFamily: { display: ['"Fraunces"','serif'], body: ['Inter','sans-serif'] }
}}, plugins: [] }
