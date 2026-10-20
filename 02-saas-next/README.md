# Flowboard · SaaS Landing

[![Live demo](https://img.shields.io/badge/Live%20demo-7cff6b?style=for-the-badge)](https://frank-merti.github.io/portfolio-landings/02-saas-next/)
[![CI](https://github.com/frank-merti/portfolio-landings/actions/workflows/ci.yml/badge.svg)](https://github.com/frank-merti/portfolio-landings/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-16a34a?style=for-the-badge)](LICENSE)

Product marketing landing for a project management SaaS: features, pricing tiers, testimonials and FAQ, with an ES/EN switch.

**Landing de producto para un SaaS de gestión de proyectos: features, planes, testimonios y FAQ, con cambio ES/EN.**

---

## ES

### Funcionalidad
- Hero con captura de producto, CTA doble y nota de prueba gratuita.
- Cuatro features, tres planes de precio (básico, pro, empresa) y testimonios.
- FAQ desplegable usando `<details>` nativo (accesible sin JavaScript).
- Conmutador ES/EN con contenido tipado y export estático.

### Stack
Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS 3 · ESLint

### Ejecutar
```bash
cd 02-saas-next
npm install
npm run dev     # http://localhost:3000
npm run build   # export estático en ./out
npm run lint
```

### Qué aprendí
- `<details>` / `<summary>` da un acordeón accesible por teclado sin una sola línea de JavaScript.
- En una landing SaaS, la nota "sin tarjeta de crédito" bajo el CTA reduce la fricción más que cualquier otro texto.
- Los planes se comparan mejor con la misma estructura de lista (mismos bullets) que con listas de distinta longitud.

## EN

### Features
- Hero with product shot, dual CTA and free-trial note.
- Four features, three pricing tiers (basic, pro, enterprise) and testimonials.
- FAQ accordion built with native `<details>` (accessible without JavaScript).
- ES/EN switch with typed content and static export.

### Stack
Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS 3 · ESLint

### Run
```bash
cd 02-saas-next
npm install
npm run dev     # http://localhost:3000
npm run build   # static export in ./out
npm run lint
```

### What I learned
- `<details>` / `<summary>` gives a keyboard-accessible accordion without a single line of JavaScript.
- On a SaaS landing, the "no credit card required" note under the CTA reduces friction more than any other line.
- Pricing tiers compare better when every list has the same structure than when they differ in length.

## Licencia
[MIT](LICENSE) © 2026 Francisco Merti
