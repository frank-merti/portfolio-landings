# Spec — Taskboard Dashboard (.NET / Blazor Server)

> Estado: **borrador de spec (SDD)** — producto pensado para implementar hoy.
> Versión de la spec: 1.0

## 1. Visión

Convertir la API REST de Taskboard (`17-dotnet-taskboard-api`) en un **dashboard web de gestión de
tableros y tareas** ejecutado en **Blazor Server**, consumiendo la API a través de `HttpClient`.

El objetivo es cerrar el ciclo full-stack con el stack de Microsoft: **Blazor Server (C#) → ASP.NET Core Minimal APIs → EF Core → JWT**.

## 2. Problemática

- La API de Taskboard existe y está verificada (12 tests de integración), pero no tiene cliente web.
- Un dashboard permite demostrar el patrón completo: autenticación con JWT, llamadas a API,
  estado de sesión en servidor y UI reaccionaria.

## 3. Usuarios

- Dueño del tablero: crea tableros, crea tareas, cambia estados y prioridades.

## 4. Requisitos funcionales

### FR-1 — Autenticación (`POST /api/auth/login`)
- **US-1**: El usuario ingresa email + contraseña y recibe token JWT.
- **Criterios de aceptación**:
  - El token se guarda en el estado del circuito de Blazor Server (servidor).
  - No se persiste en `localStorage` ni cookies.
  - Cerrar sesión limpia el token.
  - Accesos a rutas protegidas sin token redirigen a `/login`.

### FR-2 — Listar tableros
- **US-2**: El usuario ve la lista de sus tableros con conteo de tareas.
- **Criterios de aceptación**:
  - `GET /api/boards` responde 200 con array de tableros.
  - Si no hay tableros, la UI muestra estado vacío.

### FR-3 — Crear tablero
- **US-3**: El usuario crea un tablero con nombre y descripción opcional.
- **Criterios de aceptación**:
  - `POST /api/boards` con `{ name, description?, color? }`.
  - El color aceptado es uno de: `indigo`, `emerald`, `amber`, `rose`.

### FR-4 — Detalle de tablero con tareas
- **US-4**: El usuario abre un tablero y ve sus tareas.
- **Criterios de aceptación**:
  - `GET /api/boards/{id}` devuelve el tablero con sus tareas.
  - Las tareas se listan ordenadas por status/prioridad.

### FR-5 — Crear tarea
- **US-5**: El usuario agrega una tarea a un tablero.
- **Criterios de aceptación**:
  - `POST /api/boards/{boardId}/tasks` con `{ title, notes?, priority?, status? }`.
  - Validaciones: título 2–120 caracteres, prioridad `Low|Medium|High`, estado `Todo|Doing|Done`.

### FR-6 — Actualizar y eliminar tarea
- **US-6**: El usuario cambia estado/prioridad/título/notas y elimina tareas.
- **Criterios de aceptación**:
  - `PATCH /api/tasks/{id}` actualiza solo los campos enviados.
  - `DELETE /api/tasks/{id}` elimina.

## 5. Requisitos no funcionales

### NFR-1 — Seguridad
- El token JWT viaja por el circuito Blazor Server (nunca expuesto al navegador como secreto de almacenamiento).
- Las llamadas a la API incluyen `Authorization: Bearer <token>`.

### NFR-2 — Rendimiento
- Blazor Server usa SignalR; cada interacción puede multiplexar llamadas HTTP.
- El estado vive en el servidor: sin recargas de página (SPA por SignalR).

### NFR-3 — Testing
- Tests de componentes con **bUnit** (`TaskboardDashboard.Tests`).
- Tests de integración de la API ya existen (`Taskboard.Api.Tests`).

### NFR-4 — Compatibilidad
- .NET 8 (LTS), C# 12.

## 6. Fuera de alcance

- Registro de usuarios desde el dashboard (la API ya expone `/api/auth/register`).
- Panel de administración.

## 7. Definición de hecho

- [ ] Spec aprobada (esta página).
- [ ] Dashboard compila (`dotnet build`).
- [ ] Tests de componentes pasan (bUnit).
- [ ] Smoke: levantar API + Dashboard, login, lista de tableros.
- [ ] Integrar al portafolio (README, contenido del sitio, deploy sources).

## 8. Preguntas abiertas

- ¿Mostrar token en la UI para pruebas? → **No** (solo para debug local con header manual).
