# Biblioteca Java — Data Structures & OOP (CLI)

Aplicación de consola en **Java** que modela una biblioteca. Diseñada para mostrar **POO** y **estructuras de datos y algoritmos** de forma clara, sin dependencias externas.

## Estructuras de datos utilizadas

- `ArrayList<Book>` — catálogo
- `HashMap<String, Book>` — búsqueda O(1) por ISBN
- `HashMap<String, User>` — usuarios
- `Queue<Loan>` (LinkedList) — cola de préstamos (FIFO)
- `Deque<String>` (ArrayDeque) — pila de deshacer (LIFO)
- `HashSet<String>` — categorías únicas

## Algoritmos

- **Merge Sort** por título y por autor
- **Binary Search** por ISBN (sobre copia ordenada)
- **Linear Search** por autor

## POO

Clases: `Book`, `User`, `Loan`, `LibraryService` (lógica), `Main` (UI de consola). Encapsulación, métodos y separación de responsabilidades.

## Ejecutar

Requiere Java 8+ (probado con Java 23).

```bash
cd 13-java-biblioteca
mkdir out            # En Windows: New-Item -ItemType Directory -Force out
javac -d out -encoding UTF-8 src\*.java
java -cp out Main
```

En Linux/macOS:

```bash
cd 13-java-biblioteca
mkdir -p out
javac -d out -encoding UTF-8 src/*.java
java -cp out Main
```

## Menú

1. Registrar libro · 2. Registrar usuario · 3. Buscar por ISBN (binaria) · 4. Buscar por autor (lineal) · 5. Ordenar por título · 6. Ordenar por autor · 7. Prestar libro · 8. Devolver libro · 9. Deshacer último préstamo · 10. Listar libros · 11. Listar usuarios · 12. Salir
