# Algorithms CLI — C# / .NET

[![CI](https://github.com/frank-merti/portfolio-landings/actions/workflows/ci.yml/badge.svg)](https://github.com/frank-merti/portfolio-landings/actions/workflows/ci.yml)
[![Tests](https://img.shields.io/badge/tests-21%20passing-512BD4?style=for-the-badge)](tests)
[![License: MIT](https://img.shields.io/badge/License-MIT-16a34a?style=for-the-badge)](LICENSE)

Console application in C# that implements classic algorithms and data structures from
scratch, with a bilingual (ES/EN) interface and xUnit tests.

**Aplicación de consola en C# que implementa algoritmos y estructuras de datos clásicos desde cero, con interfaz bilingüe (ES/EN) y tests xUnit.**

---

## ES

### Funcionalidad

- Ordenamiento con **Merge Sort** (estable) y **Quick Sort**, genéricos con `IComparer<T>`.
- **Búsqueda binaria** sobre colecciones ordenadas, con comparer y con selector de clave.
- **Dijkstra** sobre grafo dirigido con pesos, usando `PriorityQueue<TElement,TPriority>`.
- **BFS** para recorrido en anchura con `Queue<T>`.
- **Caché LRU** implementada con `Dictionary` + `LinkedList` y política de expulsión.
- Interfaz bilingüe ES/EN con persistencia en memoria durante la sesión.

### Stack

C# 12 · .NET 8 (LTS) · xUnit · nullable reference types habilitados · `TreatWarningsAsErrors`

### Ejecutar

```bash
cd 16-dotnet-algorithms
dotnet restore
dotnet run --project src/Algorithms.Cli
```

### Tests

```bash
cd 16-dotnet-algorithms
dotnet test
```

### Estructura

```text
16-dotnet-algorithms/
├── Algorithms.sln
├── src/Algorithms.Cli/
│   ├── Program.cs                 # Menú de consola
│   ├── Messages.cs                # Catálogos ES/EN
│   ├── Collections/LruCache.cs    # Caché LRU
│   ├── Graphs/                    # Graph, Dijkstra, BFS
│   ├── Models/TaskItem.cs         # Modelo de dominio
│   ├── Searching/BinarySearch.cs  # Búsqueda binaria
│   └── Sorting/                   # Merge Sort, Quick Sort
└── tests/Algorithms.Tests/        # 21 tests xUnit
```

### Qué aprendí

- Los genéricos de C# (`IComparer<T>`, `Func<T, TKey>`) permiten escribir un único algoritmo
  que sirve para cualquier tipo, sin duplicar código.
- `PriorityQueue<TElement, TPriority>` viene en .NET y es exactamente lo que Dijkstra necesita:
  saber siempre el nodo más cercano sin Implementing la cola a mano.
- `TreatWarningsAsErrors` + nullable reference types convierten las advertencias del compilador
  en errores, lo que elimina una categoría entera de bugs en runtime.
- `record` describe los datos de forma concisa y genera igualdad por valor sin boilerplate.

## EN

### Features

- Sorting with **Merge Sort** (stable) and **Quick Sort**, generic over `IComparer<T>`.
- **Binary search** over sorted collections, with a comparer and with a key selector.
- **Dijkstra** over a directed weighted graph using `PriorityQueue<TElement, TPriority>`.
- **BFS** breadth-first traversal with `Queue<T>`.
- **LRU cache** built with `Dictionary` + `LinkedList` and an eviction policy.
- Bilingual ES/EN interface.

### Stack

C# 12 · .NET 8 (LTS) · xUnit · nullable reference types enabled · `TreatWarningsAsErrors`

### Run

```bash
cd 16-dotnet-algorithms
dotnet restore
dotnet run --project src/Algorithms.Cli
```

### Tests

```bash
cd 16-dotnet-algorithms
dotnet test
```

### Structure

```text
16-dotnet-algorithms/
├── Algorithms.sln
├── src/Algorithms.Cli/
│   ├── Program.cs                 # Console menu
│   ├── Messages.cs                # ES/EN catalogs
│   ├── Collections/LruCache.cs    # LRU cache
│   ├── Graphs/                    # Graph, Dijkstra, BFS
│   ├── Models/TaskItem.cs         # Domain model
│   ├── Searching/BinarySearch.cs  # Binary search
│   └── Sorting/                   # Merge Sort, Quick Sort
└── tests/Algorithms.Tests/        # 21 xUnit tests
```

### What I learned

- C# generics (`IComparer<T>`, `Func<T, TKey>`) let a single algorithm serve any type without
  duplicating code.
- `PriorityQueue<TElement, TPriority>` ships with .NET and is exactly what Dijkstra needs: always
  pop the closest node without hand-rolling the queue.
- `TreatWarningsAsErrors` plus nullable reference types turns compiler warnings into errors and
  removes a whole category of runtime bugs.
- `record` describes data concisely and generates value equality without boilerplate.

## Licencia

[MIT](LICENSE) © 2026 Francisco Merti
