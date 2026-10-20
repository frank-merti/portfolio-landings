# La Brasa · Restaurant Landing

[![Live demo](https://img.shields.io/badge/Live%20demo-ff4d8d?style=for-the-badge)](https://frank-merti.github.io/portfolio-landings/03-restaurante/)
[![License: MIT](https://img.shields.io/badge/License-MIT-16a34a?style=for-the-badge)](LICENSE)

Landing page for a wood-fired restaurant: menu, gallery and a working reservation form with ES/EN language switch.

**Landing para un restaurante de fuego: menú, galería y formulario de reservas funcional, con cambio de idioma ES/EN.**

---

## ES

### Funcionalidad
- Hero con CTA, sección "Nosotros" con estadísticas y galería masonry.
- Menú en tarjetas (6 platos) con precios.
- Formulario de reservas con validación visual y mensaje de confirmación.
- Conmutador ES/EN con persistencia en `localStorage`.

### Stack
HTML5 semántico · Tailwind CSS (CDN) · JavaScript vanilla · Google Fonts

### Ejecutar
```bash
cd 03-restaurante
# abre index.html directamente, o sirve la carpeta:
npx serve 03-restaurante
```

### Qué aprendí
- Tailwind vía CDN acelera el prototipado, pero en producción conviene un build step (CSP, purga de clases, hashing).
- `localStorage` + `data-i18n` es un patrón simple y sin dependencias para i18n estático.
- El `alt` en imágenes y el HTML semántico (`header`, `main`, `section`, `footer`) mejora accesibilidad y SEO.

## EN

### Features
- Hero with CTA, "About" section with stats and masonry gallery.
- Card-based menu (6 dishes) with pricing.
- Reservation form with visual validation and confirmation state.
- ES/EN switch persisted in `localStorage`.

### Stack
Semantic HTML5 · Tailwind CSS (CDN) · Vanilla JavaScript · Google Fonts

### Run
```bash
cd 03-restaurante
npx serve 03-restaurante
```

### What I learned
- Tailwind via CDN speeds up prototyping, but production needs a build step (CSP, purging, hashing).
- `localStorage` + `data-i18n` is a dependency-free pattern for static i18n.
- Image `alt` text and semantic HTML (`header`, `main`, `section`, `footer`) improve accessibility and SEO.

## Licencia
[MIT](LICENSE) © 2026 Francisco Merti
