# Aether H1 · Product Launch Landing

[![Live demo](https://img.shields.io/badge/Live%20demo-c9893b?style=for-the-badge)](https://frank-merti.github.io/portfolio-landings/07-producto-react/)
[![CI](https://github.com/frank-merti/portfolio-landings/actions/workflows/ci.yml/badge.svg)](https://github.com/frank-merti/portfolio-landings/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-16a34a?style=for-the-badge)](LICENSE)

Product launch page for premium headphones: specs, colour picker, cart state and ES/EN switch, built with React 18 + Vite + Tailwind.

**Landing de lanzamiento de audífonos premium: specs, selector de color, estado de carrito y cambio ES/EN, con React 18 + Vite + Tailwind.**

---

## ES

### Funcionalidad
- Hero con imagen de producto, CTA doble y nota de garantía.
- Features, tabla de especificaciones, selector de color y reseñas.
- Carrito con estado en React (contador, cantidad y confirmación de agregado).
- Conmutador ES/EN con contenido tipado por componente.

### Stack
React 18 · Vite 5 · Tailwind CSS 3 · JavaScript (JSX)

### Ejecutar
```bash
cd 07-producto-react
npm install
npm run dev      # http://localhost:5173
npm run build    # bundle de producción en ./dist
npm run preview
```

### Estructura
```text
07-producto-react/
├── src/
│   ├── App.jsx        # UI + estado (useState)
│   ├── main.jsx       # punto de entrada
│   └── index.css      # tailwind + fuentes
├── vite.config.js    # base path configurable para Pages
└── package.json
```

### Qué aprendí
- `useState` separado por responsabilidad (idioma, color, cantidad, carrito) evita re-renders innecesarios.
- El `base` de Vite es el detalle que más se olvida al publicar en un subdirectorio: sin él, los assets 404.
- Un carrito sin backend es un buen ejercicio de modelado de estado: cada acción es un evento explícito.

## EN

### Features
- Hero with product image, dual CTA and warranty note.
- Features, spec table, colour picker and reviews.
- React state for the cart (counter, quantity and added confirmation).
- ES/EN switch with typed content per component.

### Stack
React 18 · Vite 5 · Tailwind CSS 3 · JavaScript (JSX)

### Run
```bash
cd 07-producto-react
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in ./dist
npm run preview
```

### Structure
```text
07-producto-react/
├── src/
│   ├── App.jsx        # UI + state (useState)
│   ├── main.jsx       # entry point
│   └── index.css      # tailwind + fonts
├── vite.config.js    # configurable base path for Pages
└── package.json
```

### What I learned
- Splitting `useState` by responsibility (language, colour, quantity, cart) avoids unnecessary re-renders.
- Vite's `base` is the detail most people forget when publishing to a subdirectory: without it assets 404.
- A cart without a backend is a good state-modelling exercise: every action is an explicit event.

## Licencia
[MIT](LICENSE) © 2026 Francisco Merti
