# Taskboard API — ASP.NET Core 8

[![CI](https://github.com/frank-merti/portfolio-landings/actions/workflows/dotnet.yml/badge.svg)](https://github.com/frank-merti/portfolio-landings/actions/workflows/dotnet.yml)
[![Tests](https://img.shields.io/badge/tests-12%20passing-512BD4?style=for-the-badge)](tests)
[![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge)](https://dotnet.microsoft.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-16a34a?style=for-the-badge)](LICENSE)

REST API for boards and tasks built with ASP.NET Core 8 (Minimal APIs), Entity Framework
Core, SQLite and JWT authentication, covered by integration tests with xUnit.

**API REST para tableros y tareas con ASP.NET Core 8 (Minimal APIs), Entity Framework Core, SQLite y autenticación JWT, con tests de integración en xUnit.**

---

## ES

### Funcionalidad

- **Autenticación JWT**: registro e inicio de sesión, contraseñas con PBKDF2 (210 000 iteraciones, salt aleatorio) y comparación en tiempo constante.
- **Tableros**: alta, listado y detalle, filtrados siempre por propietario.
- **Tareas**: alta, actualización (estado, prioridad, título, notas) y borrado, con validación de entrada.
- **Documentación OpenAPI** en `/swagger` con autenticación JWT integrada.
- **Manejo de errores** con `ProblemDetails` y `UseExceptionHandler`.
- **Configuración por opciones** (`JwtOptions`, `DatabaseOptions`) y variables de entorno.

### Endpoints

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| `GET` | `/health` | — | Estado del servicio |
| `GET` | `/api/me` | ✅ | Usuario del token |
| `POST` | `/api/auth/register` | — | Crea la cuenta y devuelve token |
| `POST` | `/api/auth/login` | — | Inicia sesión y devuelve token |
| `GET` | `/api/boards` | ✅ | Lista los tableros del usuario |
| `POST` | `/api/boards` | ✅ | Crea un tablero |
| `GET` | `/api/boards/{id}` | ✅ | Detalle del tablero con sus tareas |
| `POST` | `/api/boards/{id}/tasks` | ✅ | Crea una tarea |
| `PATCH` | `/api/tasks/{id}` | ✅ | Actualiza una tarea |
| `DELETE` | `/api/tasks/{id}` | ✅ | Elimina una tarea |

### Stack

C# 12 · ASP.NET Core 8 (Minimal APIs) · Entity Framework Core 8 + SQLite · JWT Bearer · Swashbuckle/OpenAPI · xUnit + WebApplicationFactory

### Ejecutar

```bash
cd 17-dotnet-taskboard-api
dotnet restore
dotnet run --project src/Taskboard.Api
```

- API: http://localhost:5000
- Swagger: http://localhost:5000/swagger
- Usuario de prueba: `POST /api/auth/register` con `{ "email": "...", "displayName": "...", "password": "..." }`

> Fuera de `Development` la API **exige** la variable `Jwt__SigningKey`; en desarrollo usa una
> clave temporal y lo advierte en el log.

### Tests

```bash
cd 17-dotnet-taskboard-api
dotnet test
```

Los tests usan `WebApplicationFactory` con una base SQLite en memoria: cubren registro, login,
email duplicado, validación de payload, endpoints protegidos, aislamiento entre usuarios y el
ciclo completo de vida de una tarea.

### Estructura

```text
17-dotnet-taskboard-api/
├── TaskboardApi.sln
├── src/Taskboard.Api/
│   ├── Program.cs                     # Hosting, DI, JWT, Swagger
│   ├── Domain/Entities.cs             # User, Board, BoardTask
│   ├── Data/AppDbContext.cs           # EF Core + índices y cascadas
│   ├── Features/Auth/AuthEndpoints.cs
│   ├── Features/Boards/BoardEndpoints.cs
│   ├── Features/Tasks/TaskEndpoints.cs
│   └── Infrastructure/                # PBKDF2, JWT, opciones
└── tests/Taskboard.Api.Tests/         # 12 tests de integración
```

### Qué aprendí

- **Minimal APIs** permiten escribir un endpoint completo (validación + persistencia + respuesta)
  en pocas líneas, sin controladores ni atributos.
- El **patrón Options** (`IOptions<T>`) mantiene la configuración fuera del código y permite
  sobreescribirla por entorno o en los tests.
- `Rfc2898DeriveBytes` con salt por usuario y `CryptographicOperations.FixedTimeEquals` dan
  contraseñas seguras sin depender de.Identity.
- SQLite **no soporta `ORDER BY` sobre `DateTimeOffset`**: usar `DateTime` en UTC evitó un 500
  silencioso en el listado de tableros.
- Resolver la clave de firma **por request** (`IssuerSigningKeyResolver`) permite rotarla sin
  reiniciar y hace que la configuración de los tests se aplique de verdad.

## EN

### Features

- **JWT authentication**: sign up and sign in, PBKDF2 password hashing (210 000 iterations,
  random salt) and constant-time comparison.
- **Boards**: create, list and detail, always filtered by owner.
- **Tasks**: create, update (status, priority, title, notes) and delete, with input validation.
- **OpenAPI documentation** at `/swagger` with JWT authentication wired in.
- **Error handling** with `ProblemDetails` and `UseExceptionHandler`.
- **Options pattern** (`JwtOptions`, `DatabaseOptions`) backed by environment variables.

### Endpoints

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/health` | — | Service status |
| `GET` | `/api/me` | ✅ | Token owner |
| `POST` | `/api/auth/register` | — | Creates the account and returns a token |
| `POST` | `/api/auth/login` | — | Signs in and returns a token |
| `GET` | `/api/boards` | ✅ | Lists the user's boards |
| `POST` | `/api/boards` | ✅ | Creates a board |
| `GET` | `/api/boards/{id}` | ✅ | Board detail with its tasks |
| `POST` | `/api/boards/{id}/tasks` | ✅ | Creates a task |
| `PATCH` | `/api/tasks/{id}` | ✅ | Updates a task |
| `DELETE` | `/api/tasks/{id}` | ✅ | Deletes a task |

### Stack

C# 12 · ASP.NET Core 8 (Minimal APIs) · Entity Framework Core 8 + SQLite · JWT Bearer · Swashbuckle/OpenAPI · xUnit + WebApplicationFactory

### Run

```bash
cd 17-dotnet-taskboard-api
dotnet restore
dotnet run --project src/Taskboard.Api
```

- API: http://localhost:5000
- Swagger: http://localhost:5000/swagger

> Outside `Development` the API **requires** the `Jwt__SigningKey` environment variable.

### Tests

```bash
cd 17-dotnet-taskboard-api
dotnet test
```

Tests use `WebApplicationFactory` with an in-memory SQLite database and cover registration,
login, duplicate email, payload validation, protected endpoints, per-user isolation and the
full task lifecycle.

### What I learned

- **Minimal APIs** let a full endpoint (validation, persistence, response) fit in a few lines,
  without controllers or attributes.
- The **Options pattern** (`IOptions<T>`) keeps configuration out of the code and lets tests
  override it.
- `Rfc2898DeriveBytes` with a per-user salt and `CryptographicOperations.FixedTimeEquals` give
  secure passwords without pulling in Identity.
- SQLite **does not support `ORDER BY` on `DateTimeOffset`**: switching to UTC `DateTime` removed
  a silent 500 in the board listing.
- Resolving the signing key **per request** (`IssuerSigningKeyResolver`) allows rotation without
  a restart and makes test configuration actually apply.

## Licencia

[MIT](LICENSE) © 2026 Francisco Merti
