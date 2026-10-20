# Library CLI — Java · Data Structures & OOP

Console application that models a small library. Written in plain Java (no
external dependencies) with a bilingual interface (Spanish / English).

<!-- ES -->
## Español

Aplicación de consola que modela una biblioteca, orientada a demostrar
**POO**, **estructuras de datos** y **algoritmos** clásicos.

### Funcionalidad

- Alta de libros y socios.
- Búsqueda de libros por ISBN (binaria) y por autor (lineal).
- Ordenamiento del catálogo por título o autor.
- Préstamos y devoluciones.
- Deshacer la última acción.
- Interfaz bilingüe (ES/EN) con opción de cambio de idioma en el menú.

### Estructuras de datos

| Estructura | Uso |
|---|---|
| `ArrayList<Book>` | Catálogo (permite ordenar y recorrer) |
| `HashMap<String, Book>` | Índice ISBN → libro (búsqueda O(1)) |
| `HashMap<String, User>` | Socios registrados |
| `Queue<Loan>` (LinkedList) | Cola de préstamos (FIFO) |
| `Deque<String>` (ArrayDeque) | Pila de acciones para deshacer (LIFO) |
| `HashSet<String>` | Categorías sin duplicados |

### Algoritmos

| Algoritmo | Complejidad | Descripción |
|---|---|---|
| Merge Sort (título / autor / ISBN) | O(n log n) | Ordenamiento estable, implementado desde cero |
| Búsqueda binaria (ISBN) | O(log n) | Sobre una copia del catálogo ordenada por ISBN |
| Búsqueda lineal (autor) | O(n) | Recorrido secuencial con coincidencia parcial |
| Cola FIFO | O(1) | Registro y atención de préstamos en orden de llegada |
| Pila LIFO | O(1) | Deshacer la última acción registrada |

### Diseño (POO)

| Clase | Responsabilidad |
|---|---|
| `Book` | Entidad de libro, con estado de disponibilidad |
| `User` | Entidad de socio y sus préstamos |
| `Loan` | Entidad de préstamo (inmutable) |
| `LibraryService` | Lógica de dominio: catálogo, préstamos, algoritmos |
| `Messages` | Catálogos de textos ES/EN para la interfaz |
| `Main` | Interfaz de consola; no contiene lógica de negocio |

### Estructura del proyecto

```
13-java-biblioteca/
├── src/
│   ├── Book.java
│   ├── User.java
│   ├── Loan.java
│   ├── LibraryService.java
│   ├── Messages.java
│   └── Main.java
└── README.md
```

### Ejecución

Requiere Java 11 o superior.

```bash
cd 13-java-biblioteca
mkdir out
javac -d out -encoding UTF-8 src/*.java
java -cp out Main
```

En Windows PowerShell:

```powershell
cd 13-java-biblioteca
New-Item -ItemType Directory -Force out
javac -d out -encoding UTF-8 src\*.java
java -cp out Main
```

### Ejemplo de sesión

```
=== Biblioteca (Java + Estructuras de Datos) ===
3. Buscar libro por ISBN (búsqueda binaria)
...
ISBN: 978-2
[978-2] Clean Code - Robert C. Martin (available)
```

<!-- EN -->
## English

Console application that models a small library, focused on **OOP**,
**data structures** and classic **algorithms**.

### Features

- Register books and members.
- Search books by ISBN (binary) and by author (linear).
- Sort the catalog by title or author.
- Loans and returns.
- Undo the last action.
- Bilingual interface (ES/EN) with an in-menu language switch.

### Data structures

| Structure | Purpose |
|---|---|
| `ArrayList<Book>` | Catalog (supports sorting and traversal) |
| `HashMap<String, Book>` | ISBN → book index (O(1) lookup) |
| `HashMap<String, User>` | Registered members |
| `Queue<Loan>` (LinkedList) | Loan queue (FIFO) |
| `Deque<String>` (ArrayDeque) | Undo stack (LIFO) |
| `HashSet<String>` | Deduplicated categories |

### Algorithms

| Algorithm | Complexity | Description |
|---|---|---|
| Merge Sort (title / author / ISBN) | O(n log n) | Stable sort implemented from scratch |
| Binary search (ISBN) | O(log n) | Runs over a catalog copy sorted by ISBN |
| Linear search (author) | O(n) | Sequential scan with partial matching |
| FIFO queue | O(1) | Loans are served in arrival order |
| LIFO stack | O(1) | Undoes the most recent action |

### OOP design

| Class | Responsibility |
|---|---|
| `Book` | Book entity with availability state |
| `User` | Member entity and its active loans |
| `Loan` | Loan entity (immutable) |
| `LibraryService` | Domain logic: catalog, loans, algorithms |
| `Messages` | ES/EN string catalogs for the UI |
| `Main` | Console interface; contains no business logic |

### Run

Requires Java 11 or newer.

```bash
cd 13-java-biblioteca
mkdir out
javac -d out -encoding UTF-8 src/*.java
java -cp out Main
```

Windows PowerShell:

```powershell
cd 13-java-biblioteca
New-Item -ItemType Directory -Force out
javac -d out -encoding UTF-8 src\*.java
java -cp out Main
```

### Sample session

```
=== Library (Java + Data Structures) ===
3. Search book by ISBN (binary search)
...
ISBN: 978-2
[978-2] Clean Code - Robert C. Martin (available)
```
