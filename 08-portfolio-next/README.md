# Developer Portfolio · Next.js

[![Live demo](https://img.shields.io/badge/Live%20demo-6366f1?style=for-the-badge)](https://frank-merti.github.io/portfolio-landings/08-portfolio-next/)
[![CI](https://github.com/frank-merti/portfolio-landings/actions/workflows/ci.yml/badge.svg)](https://github.com/frank-merti/portfolio-landings/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-16a34a?style=for-the-badge)](LICENSE)

Personal developer portfolio built with Next.js 14 (App Router), TypeScript and Tailwind: profile, skills, project catalogue, experience timeline, blog preview and contact.

**Portafolio personal con Next.js 14 (App Router), TypeScript y Tailwind: perfil, skills, catálogo de proyectos, experiencia, blog y contacto.**

---

## ES

### Funcionalidad
- Hero, "Sobre mí", stack, catálogo de 12 proyectos, línea de tiempo de experiencia, blog y contacto.
- Conmutador ES/EN con contenido tipado.
- Tarjetas de proyecto con degradado, stack tags y enlace a cada repositorio.
- Metadata SEO y export estático para GitHub Pages.

### Stack
Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS 3 · ESLint

### Ejecutar
```bash
cd 08-portfolio-next
npm install
npm run dev     # http://localhost:3000
npm run build   # export estático en ./out
npm run lint
```

### Qué aprendí
- Un portafolio es un producto: la sección "Sobre mí" y las métricas de cada proyecto pesan más que el diseño.
- Mantener el catálogo de proyectos en un array tipado hace fácil agregar o quitar proyectos sin tocar JSX.
- Un solo proyecto de portfolio sirve como "home" de todos los demás: reduce la fricción para quien revisa.

## EN

### Features
- Hero, "About", stack, 12-project catalogue, experience timeline, blog and contact.
- ES/EN switch with typed content.
- Project cards with gradient, stack tags and links to each repository.
- SEO metadata and static export for GitHub Pages.

### Stack
Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS 3 · ESLint

### Run
```bash
cd 08-portfolio-next
npm install
npm run dev     # http://localhost:3000
npm run build   # static export in ./out
npm run lint
```

### What I learned
- A portfolio is a product: the "About" section and the metrics behind each project matter more than the design.
- Keeping the project catalogue in a typed array makes it easy to add or remove projects without touching JSX.
- A single portfolio project acts as the "home" of all the others, reducing friction for reviewers.

## Licencia
[MIT](LICENSE) © 2026 Francisco Merti
