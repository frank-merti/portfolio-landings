# Taskboard · Full-Stack Kanban

[![CI](https://github.com/frank-merti/portfolio-landings/actions/workflows/ci.yml/badge.svg)](https://github.com/frank-merti/portfolio-landings/actions/workflows/ci.yml)
[![Tests](https://img.shields.io/badge/tests-21%20passing-16a34a?style=for-the-badge)](15-taskboard-fullstack/lib)
[![License: MIT](https://img.shields.io/badge/License-MIT-16a34a?style=for-the-badge)](LICENSE)

Task management app with authentication, relational data, a REST API and a
bilingual (ES/EN) interface. Built with Next.js 14 (App Router), Prisma and
SQLite, with automated tests.

**App de gestión de tareas con autenticación, datos relacionales, API REST e interfaz bilingüe (ES/EN). Next.js 14 (App Router) + Prisma + SQLite, con tests automatizados.**

---

## ES

### Funcionalidad

- Registro e inicio de sesión con contraseñas cifradas con **scrypt** y sal aleatoria.
- Sesiones persistentes en base de datos con expiración de 7 días y cookie `httpOnly`.
- Tableros por usuario: alta, listado y vista de detalle.
- Tareas con estado (`todo` / `doing` / `done`) y prioridad (`low` / `medium` / `high`).
- Columnas tipo kanban ordenadas por prioridad, creación y movimiento de tareas.
- API REST para autenticación, tableros y tareas.
- Interfaz bilingüe ES/EN resuelta en servidor mediante cookie.

### Stack

Next.js 14 (App Router) · React 18 · TypeScript (modo estricto) · Prisma 5 · SQLite · Zod · Tailwind CSS · Vitest

### API

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/api/auth/register` | Crea la cuenta e inicia sesión |
| `POST` | `/api/auth/login` | Inicia sesión |
| `POST` | `/api/auth/logout` | Cierra la sesión |
| `GET` | `/api/boards` | Lista los tableros del usuario |
| `POST` | `/api/boards` | Crea un tablero |
| `GET` | `/api/boards/:id/tasks` | Lista las tareas de un tablero |
| `POST` | `/api/boards/:id/tasks` | Crea una tarea |
| `PATCH` | `/api/tasks/:id` | Actualiza estado, prioridad o título |
| `DELETE` | `/api/tasks/:id` | Elimina una tarea |

Todas las rutas exigen sesión válida (`401`) y verifican la pertenencia del recurso (`404`).

### Puesta en marcha

```bash
cd 15-taskboard-fullstack
npm install
cp .env.example .env      # ajusta DATABASE_URL y SESSION_SECRET
npm run db:push           # crea el esquema SQLite
npm run db:seed           # datos de ejemplo (demo@taskboard.dev / taskboard123)
npm run dev               # http://localhost:3000
```

### Scripts

```bash
npm run dev         # servidor de desarrollo
npm run build       # build de producción
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
npm test            # Vitest (21 tests)
npm run db:studio   # Prisma Studio para inspeccionar la base
```

### Estructura

```text
15-taskboard-fullstack/
├── app/
│   ├── api/                # API REST (auth, boards, tasks)
│   ├── boards/             # Listado y detalle de tableros
│   ├── login/ register/    # Autenticación
│   ├── layout.tsx          # Metadata + navegación
│   └── page.tsx            # Landing
├── components/             # Nav, formularios y tablero kanban
├── lib/
│   ├── auth.ts             # scrypt, sesiones, cookies
│   ├── db.ts               # Cliente Prisma (singleton)
│   ├── i18n.ts             # Diccionarios ES/EN
│   ├── session.ts          # Sesión actual
│   ├── tasks.ts            # Dominio puro de tareas
│   └── validation.ts       # Esquemas Zod
├── prisma/
│   ├── schema.prisma       # User, Session, Board, Task
│   └── seed.js
└── .env.example
```

### Modelo de datos

```text
User 1───* Session
User 1───* Board 1───* Task
```

### Qué aprendí

- El hash con `scrypt` y `timingSafeEqual` evita tanto el robo de contraseñas como los ataques de temporización.
- Validar en el servidor con **Zod** y en el cliente con los atributos nativos del formulario evita duplicar reglas.
- Separar el **dominio puro** (`lib/tasks.ts`) de la persistencia permite testear la lógica sin base de datos.
- Next.js App Router: las cookies solo se leen en Server Components; los Client Components reciben los datos por props.

## EN

### Features

- Sign up and sign in with **scrypt** hashed passwords and random salt.
- Database backed sessions with a 7 day expiry and an `httpOnly` cookie.
- Boards per user: create, list and detail view.
- Tasks with status (`todo` / `doing` / `done`) and priority (`low` / `medium` / `high`).
- Kanban columns sorted by priority, task creation and status changes.
- REST API for authentication, boards and tasks.
- Bilingual ES/EN interface resolved on the server through a cookie.

### Stack

Next.js 14 (App Router) · React 18 · TypeScript (strict) · Prisma 5 · SQLite · Zod · Tailwind CSS · Vitest

### Getting started

```bash
cd 15-taskboard-fullstack
npm install
cp .env.example .env      # set DATABASE_URL and SESSION_SECRET
npm run db:push           # create the SQLite schema
npm run db:seed           # sample data (demo@taskboard.dev / taskboard123)
npm run dev               # http://localhost:3000
```

### Scripts

```bash
npm run dev         # development server
npm run build       # production build
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
npm test            # Vitest (21 tests)
npm run db:studio   # Prisma Studio
```

### Data model

```text
User 1───* Session
User 1───* Board 1───* Task
```

### What I learned

- `scrypt` with `timingSafeEqual` protects both stored passwords and comparison timing.
- Validating on the server with **Zod** and on the client with native form attributes avoids duplicated rules.
- Keeping the **pure domain** (`lib/tasks.ts`) apart from persistence makes the logic testable without a database.
- Next.js App Router: cookies are read only in Server Components; Client Components receive data as props.

## Licencia

[MIT](LICENSE) © 2026 Francisco Merti
