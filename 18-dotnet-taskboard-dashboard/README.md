# Taskboard Dashboard — Blazor Server + ASP.NET Core 8

[![CI](https://github.com/frank-merti/portfolio-landings/actions/workflows/dotnet.yml/badge.svg)](https://github.com/frank-merti/portfolio-landings/actions/workflows/dotnet.yml)
[![Tests](https://img.shields.io/badge/tests-6%20passing-512BD4?style=for-the-badge)](tests)
[![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge)](https://dotnet.microsoft.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-16a34a?style=for-the-badge)](LICENSE)

Blazor Server dashboard for the Taskboard API, built with **spec-driven development**
(`docs/spec.md` first, then implementation).

**Dashboard Blazor Server para la Taskboard API, construido con desarrollo guiado por especificaciones
(`docs/spec.md` primero y después la implementación).**

---

## ES

### Funcionalidad

- **Página de inicio** (`/`) con llamada a acción al login.
- **Login** (`/login`) con email/password, llama a `POST /api/auth/login` y guarda el token.
- **Tableros** (`/boards`): lista los tableros del usuario autenticado, estado vacío y prompt de login.
- **Detalle de tablero** (`/boards/{boardId}`): tablero con sus tareas, alta de tareas y cambios de estado.
- **Componentes reutilizables**: `BoardCard` y `TaskCard`.
- **Cliente HTTP tipado** (`IHttpClientFactory`) que replica los endpoints de la API Taskboard.

### Stack

C# 12 · Blazor Server (.NET 8) · `HttpClientFactory` + `System.Net.Http.Json` · Bootstrap 5 · bUnit + xUnit

### Ejecutar

```bash
cd 18-dotnet-taskboard-dashboard
dotnet run --project src\TaskboardDashboard
```

- Dashboard: http://localhost:5060
- API (debe estar corriendo en `http://localhost:5000`): http://localhost:5000/swagger

### Tests

```bash
dotnet test
```

Los tests usan **bUnit** para renderizar los componentes Blazor (`TaskCard`, `BoardCard`, `Boards`,
`Login`) con un `NavigationManager` stub y un fake de la API.

### Estructura

```text
18-dotnet-taskboard-dashboard/
├── TaskboardDashboard.sln
├── docs/spec.md                        # Especificación (SDD): vision, US-1..US-6, NFRs
├── src/TaskboardDashboard/
│   ├── Program.cs                      # Blazor Server + HttpClientFactory tipado
│   ├── Components/                     # App, Routes, Layout, Pages, BoardCard, TaskCard
│   ├── Models/ApiModels.cs             # DTOs compartidos con la API
│   ├── Services/TaskboardApi.cs       # Cliente HTTP tipado de la API
│   ├── Services/AuthService.cs        # Sesión (token) del usuario
│   └── wwwroot/                        # app.css + Bootstrap 5
└── tests/TaskboardDashboard.Tests/   # Tests bUnit de componentes
```

### Qué aprendí

- En **Blazor Server**, `@inject NavigationManager` resuelve desde el namespace
  `Microsoft.AspNetCore.Components` (no `Microsoft.AspNetCore.Components.Routing`).
- `NavigateTo` de Blazor **no devuelve `Task`**, y el stub de test debe sobreescribir
  `NavigateToCore(string, bool)`.
- Con **bUnit**, registrar `NavigationManager`, `AuthService` e `ITaskboardApi` en el `TestContext`
  antes de renderizar componentes que los consumen.

## EN

### Features

- **Home page** (`/`) with a call to action to log in.
- **Login** (`/login`) with email/password, calls `POST /api/auth/login` and stores the token.
- **Boards** (`/boards`): lists the authenticated user's boards, empty state and login prompt.
- **Board detail** (`/boards/{boardId}`): board with its tasks, task creation and status changes.
- **Reusable components**: `BoardCard` and `TaskCard`.
- **Typed HTTP client** (`IHttpClientFactory`) that mirrors the Taskboard API endpoints.

### Stack

C# 12 · Blazor Server (.NET 8) · `HttpClientFactory` + `System.Net.Http.Json` · Bootstrap 5 · bUnit + xUnit

### Run

```bash
cd 18-dotnet-taskboard-dashboard
dotnet run --project src/TaskboardDashboard
```

- Dashboard: http://localhost:5060
- API (must be running at `http://localhost:5000`): http://localhost:5000/swagger

### Tests

```bash
dotnet test
```

Tests use **bUnit** to render Blazor components (`TaskCard`, `BoardCard`, `Boards`, `Login`) with a
stubbed `NavigationManager` and a fake API.

### What I learned

- In **Blazor Server**, `@inject NavigationManager` lives in the namespace
  `Microsoft.AspNetCore.Components` (not `Microsoft.AspNetCore.Components.Routing`).
- Blazor's `NavigateTo` does **not** return a `Task`, and the test stub must override
  `NavigateToCore(string, bool)`.
- With **bUnit**, register `NavigationManager`, `AuthService` and `ITaskboardApi` in the `TestContext`
  before rendering components that consume them.

## Licencia

[MIT](LICENSE) © 2026 Francisco Merti
