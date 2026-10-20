# Nebula Studio · Agency Landing

[![Live demo](https://img.shields.io/badge/Live%20demo-ff4d8d?style=for-the-badge)](https://frank-merti.github.io/portfolio-landings/01-agency-next/)
[![CI](https://github.com/frank-merti/portfolio-landings/actions/workflows/ci.yml/badge.svg)](https://github.com/frank-merti/portfolio-landings/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-16a34a?style=for-the-badge)](LICENSE)

Digital agency landing built with Next.js 14 (App Router), TypeScript and Tailwind CSS, with an ES/EN language switch and static export for GitHub Pages.

**Landing de agencia digital con Next.js 14 (App Router), TypeScript y Tailwind, con cambio de idioma ES/EN y export estático para GitHub Pages.**

---

## ES

### Funcionalidad
- Hero, servicios, trabajo seleccionado, sección "Nosotros" y contacto.
- Conmutador ES/EN con contenido tipado y tipado estricto de las claves.
- Metadatos SEO (title, description, Open Graph) y export estático.
- Tema oscuro con acentos candy/aqua y tipografía Sora + Inter.

### Stack
Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS 3 · ESLint

### Ejecutar
```bash
cd 01-agency-next
npm install
npm run dev     # http://localhost:3000
npm run build   # export estático en ./out
npm run lint
```

### Estructura
```text
01-agency-next/
├── app/
│   ├── layout.tsx        # metadata + root layout
│   ├── page.tsx          # UI (client component con i18n)
│   └── globals.css       # tailwind + fuentes
├── next.config.js        # output: export + basePath en CI
├── tailwind.config.js
└── package.json
```

### Qué aprendí
- El App Router permite separar el servidor y el cliente: esta landing necesita cliente solo por el conmutador de idioma.
- `basePath` + `output: 'export'` permiten publicar un proyecto Next.js dentro de una subcarpeta de GitHub Pages sin romper los assets.
- Separar el contenido en un diccionario tipado evita `any` y hace que falte una clave detectable.

## EN

### Features
- Hero, services, selected work, "About" and contact sections.
- ES/EN switch with typed content and strict key typing.
- SEO metadata (title, description, Open Graph) and static export.
- Dark theme with candy/aqua accents and Sora + Inter typography.

### Stack
Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS 3 · ESLint

### Run
```bash
cd 01-agency-next
npm install
npm run dev     # http://localhost:3000
npm run build   # static export in ./out
npm run lint
```

### Structure
```text
01-agency-next/
├── app/
│   ├── layout.tsx        # metadata + root layout
│   ├── page.tsx          # UI (client component with i18n)
│   └── globals.css       # tailwind + fonts
├── next.config.js        # output: export + basePath in CI
├── tailwind.config.js
└── package.json
```

### What I learned
- The App Router lets you split server and client code: this landing only needs the client for the language switch.
- `basePath` + `output: 'export'` allow publishing a Next.js app inside a GitHub Pages subfolder without breaking assets.
- Keeping content in a typed dictionary avoids `any` and makes missing keys detectable.

## Licencia
[MIT](LICENSE) © 2026 Francisco Merti
