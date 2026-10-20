# Altura Homes · Real Estate Landing

[![Live demo](https://img.shields.io/badge/Live%20demo-c9a961?style=for-the-badge)](https://frank-merti.github.io/portfolio-landings/05-inmobiliaria/)
[![License: MIT](https://img.shields.io/badge/License-MIT-16a34a?style=for-the-badge)](LICENSE)

Premium real estate landing: property catalogue, services, agents and a visit-request form with ES/EN switch.

**Landing de bienes raíces premium: catálogo de propiedades, servicios, agentes y formulario de visita con cambio ES/EN.**

---

## ES

### Funcionalidad
- Hero full-screen con overlay y estadísticas del negocio.
- Catálogo de 6 propiedades (venta / renta / inversión) con filtros visuales.
- Sección de servicios (compra, venta, inversión) y agentes con foto.
- Formulario de solicitud de visita con confirmación.
- Conmutador ES/EN con persistencia en `localStorage`.

### Stack
HTML5 semántico · Tailwind CSS (CDN) · JavaScript vanilla · CSS Grid

### Ejecutar
```bash
cd 05-inmobiliaria
npx serve 05-inmobiliaria
```

### Qué aprendí
- Los overlays con `radial-gradient` + `background-blur` dan profundidad sin texturas pesadas.
- Filtrar por cards (sin recargar) es preferible a recargar la página: mejor rendimiento percibido.
- Separar el contenido del marcado (diccionario i18n) facilita mantener precios y textos en un solo lugar.

## EN

### Features
- Full-screen hero with overlay and business metrics.
- Catalogue of 6 properties (sale / rent / investment) with visual filters.
- Services section (buying, selling, investing) and agent profiles.
- Visit request form with confirmation state.
- ES/EN switch persisted in `localStorage`.

### Stack
Semantic HTML5 · Tailwind CSS (CDN) · Vanilla JavaScript · CSS Grid

### Run
```bash
cd 05-inmobiliaria
npx serve 05-inmobiliaria
```

### What I learned
- Gradients plus backdrop blur add depth without heavy textures.
- Client-side filtering feels faster than a page reload (better perceived performance).
- Keeping content in a separate i18n dictionary makes prices and copy maintainable in one place.

## Licencia
[MIT](LICENSE) © 2026 Francisco Merti
