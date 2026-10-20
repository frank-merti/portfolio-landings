<div align="center">

# Portfolio Landings · Web, Java & Python

**Colección de landing pages, aplicaciones web y programas de consola — con i18n ES/EN, CI/CD y despliegue automático a GitHub Pages.**

[![Live Demo](https://img.shields.io/badge/Live%20demo-ff4d8d?style=for-the-badge)](https://frank-merti.github.io/portfolio-landings/)
[![CI](https://github.com/frank-merti/portfolio-landings/actions/workflows/ci.yml/badge.svg)](https://github.com/frank-merti/portfolio-landings/actions/workflows/ci.yml)
[![Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-111827?style=for-the-badge&logo=github)](https://frank-merti.github.io/portfolio-landings/)
[![License: MIT](https://img.shields.io/badge/License-MIT-16a34a?style=for-the-badge)](LICENSE)
[![Last commit](https://img.shields.io/github/last-commit/frank-merti/portfolio-landings?style=for-the-badge)](https://github.com/frank-merti/portfolio-landings/commits/main)

</div>

---

## Español

Repositorio con **14 proyectos**: 12 landings y aplicaciones web (Next.js, React + Vite y HTML/Tailwind) y 2 aplicaciones de consola en **Java** y **Python** que demuestran POO, estructuras de datos y algoritmos.

**Demo en vivo:** https://frank-merti.github.io/portfolio-landings/

### Proyectos web

| # | Proyecto | Stack | Demo |
|---|---|---|---|
| 01 | Nebula Studio — agencia digital | Next.js 14, TypeScript, Tailwind | [Ver](https://frank-merti.github.io/portfolio-landings/01-agency-next/) |
| 02 | Flowboard — SaaS de gestión de proyectos | Next.js 14, TypeScript, Tailwind | [Ver](https://frank-merti.github.io/portfolio-landings/02-saas-next/) |
| 03 | La Brasa — restaurante | HTML, Tailwind | [Ver](https://frank-merti.github.io/portfolio-landings/03-restaurante/) |
| 04 | IronForge — gimnasio | HTML, Tailwind | [Ver](https://frank-merti.github.io/portfolio-landings/04-gimnasio/) |
| 05 | Altura Homes — bienes raíces | HTML, Tailwind | [Ver](https://frank-merti.github.io/portfolio-landings/05-inmobiliaria/) |
| 06 | DevConf 2026 — conferencia tech | HTML, Tailwind | [Ver](https://frank-merti.github.io/portfolio-landings/06-evento/) |
| 07 | Aether H1 — lanzamiento de producto | React 18, Vite, Tailwind | [Ver](https://frank-merti.github.io/portfolio-landings/07-producto-react/) |
| 08 | Portafolio personal del desarrollador | Next.js 14, TypeScript, Tailwind | [Ver](https://frank-merti.github.io/portfolio-landings/08-portfolio-next/) |
| 09 | Origen Café — cafetería | HTML, Tailwind | [Ver](https://frank-merti.github.io/portfolio-landings/09-cafe/) |
| 10 | Nomad Routes — agencia de viajes | HTML, Tailwind | [Ver](https://frank-merti.github.io/portfolio-landings/10-travel/) |
| 11 | SkillStack Academy — plataforma educativa | HTML, Tailwind | [Ver](https://frank-merti.github.io/portfolio-landings/11-academy/) |
| 12 | NovaClinic — clínica médica | HTML, Tailwind | [Ver](https://frank-merti.github.io/portfolio-landings/12-clinic/) |

### Aplicaciones de consola

| # | Proyecto | Stack | Conceptos |
|---|---|---|---|
| 13 | Library CLI | Java 11+ | POO, `ArrayList`, `HashMap`, `Queue`, `Deque`, `HashSet`, Merge Sort, búsqueda binaria |
| 14 | Logistics CLI | Python 3.10+ | POO, grafo, Dijkstra, BFS, Merge Sort, búsqueda binaria, `heapq`, `unittest` |
| 15 | Taskboard | Next.js 14, Prisma, SQLite, Zod | API REST, autenticación con scrypt, sesiones, i18n ES/EN, 21 tests |

### Qué demuestra este repositorio

- **Diseño de producto**: landing pages con jerarquía visual, CTA y formularios funcionales.
- **i18n real**: cada proyecto incluye conmutador ES/EN con persistencia en `localStorage`.
- **Responsive y accesible**: diseño mobile-first, navegación por teclado y HTML semántico.
- **Calidad de código**: ESLint, tests (Vitest / unittest), `prettier`-style formatting y `.editorconfig`.
- **CI/CD**: `ci.yml` valida lint + tests en cada push; `deploy.yml` publica en GitHub Pages.
- **Fundamentos de CS**: algoritmos implementados desde cero, con OOP y estructuras de datos clásicas.

### Inicio rápido

```bash
# Landing estática (HTML + Tailwind CDN)
open 03-restaurante/index.html          # macOS
start 03-restaurante\index.html         # Windows

# Next.js (01, 02, 08)
cd 01-agency-next && npm install && npm run dev   # http://localhost:3000

# React + Vite (07)
cd 07-producto-react && npm install && npm run dev # http://localhost:5173

# Java (13)
cd 13-java-biblioteca && javac -d out -encoding UTF-8 src/*.java && java -cp out Main

# Python (14)
cd 14-python-logistics && python main.py

# Full-stack (15)
cd 15-taskboard-fullstack && npm install && npm run db:push && npm run dev
```

### Estructura

```text
portfolio-landings/
├── 01-agency-next/      # Next.js + Tailwind
├── 02-saas-next/        # Next.js + Tailwind
├── 03-restaurante/      # HTML + Tailwind
├── 04-gimnasio/         # HTML + Tailwind
├── 05-inmobiliaria/     # HTML + Tailwind
├── 06-evento/           # HTML + Tailwind
├── 07-producto-react/   # React + Vite + Tailwind
├── 08-portfolio-next/   # Next.js + Tailwind
├── 09-cafe/             # HTML + Tailwind
├── 10-travel/           # HTML + Tailwind
├── 11-academy/          # HTML + Tailwind
├── 12-clinic/           # HTML + Tailwind
├── 13-java-biblioteca/  # Java (POO + DSA)
├── 14-python-logistics/ # Python (POO + DSA)
├── 15-taskboard-fullstack/ # Next.js + Prisma (API, auth, DB, tests)
├── .github/workflows/   # CI + deploy a GitHub Pages
├── index.html           # Índice del sitio desplegado
└── LICENSE              # MIT
```

### Stack

**Frontend:** Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Vite
**Calidad:** ESLint · Vitest · Testing Library · unittest · EditorConfig
**Backend/algoritmos:** Java (colecciones, genéricos, interfaces) · Python (grafos, heaps, dataclasses)
**Infraestructura:** GitHub Actions · GitHub Pages

### Contribución

Lee [CONTRIBUTING.md](CONTRIBUTING.md). Cada proyecto es independiente: puedes clonar solo la carpeta que necesites.

### Licencia

[MIT](LICENSE) © 2026 Francisco Merti

---

## English

A repository with **14 projects**: 12 landing pages and web applications (Next.js, React + Vite and HTML/Tailwind) plus 2 console applications in **Java** and **Python** showcasing OOP, data structures and algorithms.

**Live demo:** https://frank-merti.github.io/portfolio-landings/

### Web projects

| # | Project | Stack | Demo |
|---|---|---|---|
| 01 | Nebula Studio — digital agency | Next.js 14, TypeScript, Tailwind | [Open](https://frank-merti.github.io/portfolio-landings/01-agency-next/) |
| 02 | Flowboard — project management SaaS | Next.js 14, TypeScript, Tailwind | [Open](https://frank-merti.github.io/portfolio-landings/02-saas-next/) |
| 03 | La Brasa — restaurant | HTML, Tailwind | [Open](https://frank-merti.github.io/portfolio-landings/03-restaurante/) |
| 04 | IronForge — gym | HTML, Tailwind | [Open](https://frank-merti.github.io/portfolio-landings/04-gimnasio/) |
| 05 | Altura Homes — real estate | HTML, Tailwind | [Open](https://frank-merti.github.io/portfolio-landings/05-inmobiliaria/) |
| 06 | DevConf 2026 — tech conference | HTML, Tailwind | [Open](https://frank-merti.github.io/portfolio-landings/06-evento/) |
| 07 | Aether H1 — product launch | React 18, Vite, Tailwind | [Open](https://frank-merti.github.io/portfolio-landings/07-producto-react/) |
| 08 | Developer portfolio | Next.js 14, TypeScript, Tailwind | [Open](https://frank-merti.github.io/portfolio-landings/08-portfolio-next/) |
| 09 | Origen Café — coffee shop | HTML, Tailwind | [Open](https://frank-merti.github.io/portfolio-landings/09-cafe/) |
| 10 | Nomad Routes — travel agency | HTML, Tailwind | [Open](https://frank-merti.github.io/portfolio-landings/10-travel/) |
| 11 | SkillStack Academy — e-learning platform | HTML, Tailwind | [Open](https://frank-merti.github.io/portfolio-landings/11-academy/) |
| 12 | NovaClinic — medical clinic | HTML, Tailwind | [Open](https://frank-merti.github.io/portfolio-landings/12-clinic/) |

### Console applications

| # | Project | Stack | Concepts |
|---|---|---|---|
| 13 | Library CLI | Java 11+ | OOP, `ArrayList`, `HashMap`, `Queue`, `Deque`, `HashSet`, Merge Sort, binary search |
| 14 | Logistics CLI | Python 3.10+ | OOP, graph, Dijkstra, BFS, Merge Sort, binary search, `heapq`, `unittest` |
| 15 | Taskboard | Next.js 14, Prisma, SQLite, Zod | REST API, scrypt auth, sessions, ES/EN i18n, 21 tests |

### What this repository demonstrates

- **Product design**: landing pages with clear visual hierarchy, CTAs and working forms.
- **Real i18n**: every project ships an ES/EN switch persisted in `localStorage`.
- **Responsive and accessible**: mobile-first layouts, keyboard navigation, semantic HTML.
- **Code quality**: ESLint, tests (Vitest / unittest), consistent formatting and `.editorconfig`.
- **CI/CD**: `ci.yml` runs lint + tests on every push; `deploy.yml` publishes to GitHub Pages.
- **CS fundamentals**: algorithms implemented from scratch, with OOP and classic data structures.

### Quick start

```bash
# Static landing (HTML + Tailwind CDN)
open 03-restaurante/index.html          # macOS
start 03-restaurante\index.html         # Windows

# Next.js (01, 02, 08)
cd 01-agency-next && npm install && npm run dev   # http://localhost:3000

# React + Vite (07)
cd 07-producto-react && npm install && npm run dev # http://localhost:5173

# Java (13)
cd 13-java-biblioteca && javac -d out -encoding UTF-8 src/*.java && java -cp out Main

# Python (14)
cd 14-python-logistics && python main.py

# Full-stack (15)
cd 15-taskboard-fullstack && npm install && npm run db:push && npm run dev
```

### Tech stack

**Frontend:** Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Vite
**Quality:** ESLint · Vitest · Testing Library · unittest · EditorConfig
**Backend/algorithms:** Java (collections, generics, interfaces) · Python (graphs, heaps, dataclasses)
**Infrastructure:** GitHub Actions · GitHub Pages

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Every project is self-contained: clone only the folder you need.

### License

[MIT](LICENSE) © 2026 Francisco Merti
