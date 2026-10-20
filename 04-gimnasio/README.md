# IronForge · Gym Landing

[![Live demo](https://img.shields.io/badge/Live%20demo-c6ff00?style=for-the-badge)](https://frank-merti.github.io/portfolio-landings/04-gimnasio/)
[![License: MIT](https://img.shields.io/badge/License-MIT-16a34a?style=for-the-badge)](LICENSE)

Landing page for a strength & conditioning gym: programs, pricing tiers, trainers and an ES/EN language switch.

**Landing para un gimnasio de fuerza y acondicionamiento: programas, planes, entrenadores y cambio de idioma ES/EN.**

---

## ES

### Funcionalidad
- Hero con métricas (24/7, miembros, clases por semana).
- Cuatro programas (Fuerza, HIIT, Movilidad, Boxeo) en tarjetas.
- Tres planes de precio con opción destacada y lista de beneficios.
- Galería de entrenadores con roles y especialidad.
- Conmutador ES/EN con persistencia en `localStorage`.

### Stack
HTML5 semántico · Tailwind CSS (CDN) · JavaScript vanilla · Google Fonts

### Ejecutar
```bash
cd 04-gimnasio
npx serve 04-gimnasio
```

### Qué aprendí
- Una tabla de precios se vuelve más legible cuando el plan destacado se escala y se diferencia por color, no solo por tamaño.
- Las micro-interacciones (hover, transiciones de color) comunican interactividad sin JavaScript.
- Un sistema de color basado en `tailwind.config` permite mantener consistencia entre las 12 landings.

## EN

### Features
- Hero with metrics (24/7 access, members, weekly classes).
- Four programs (Strength, HIIT, Mobility, Boxing) in cards.
- Three pricing tiers with a highlighted option and benefit lists.
- Trainer gallery with roles and specialties.
- ES/EN switch persisted in `localStorage`.

### Stack
Semantic HTML5 · Tailwind CSS (CDN) · Vanilla JavaScript · Google Fonts

### Run
```bash
cd 04-gimnasio
npx serve 04-gimnasio
```

### What I learned
- A pricing table becomes readable when the featured plan is differentiated by color, not only by size.
- Micro-interactions (hover, color transitions) communicate interactivity without JavaScript.
- A color system defined in `tailwind.config` keeps all 12 landings visually consistent.

## Licencia
[MIT](LICENSE) © 2026 Francisco Merti
