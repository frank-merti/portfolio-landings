# Logística Python — Data Structures & OOP (CLI)

Aplicación de consola en **Python** para gestión de hubs, rutas, inventario y envíos. Incluye **tests unitarios** con `unittest` (biblioteca estándar, sin dependencias).

## Estructuras de datos utilizadas

- `dict` — grafo de adyacencia, inventario
- `heapq` (min-heap) — cola de prioridad para envíos
- `collections.deque` — BFS
- `list` + Merge Sort — listado ordenado de envíos

## Algoritmos

- **Dijkstra** para ruta más corta entre hubs
- **BFS** para hubs alcanzables
- **Merge Sort** para ordenar envíos por prioridad
- **Binary Search** para localizar un envío por ID

## POO

Clases: `Shipment`, `Graph`, `LogisticsManager`, además de funciones de algoritmos separadas. Encapsulación y separación entre entidades, algoritmos y lógica de negocio.

## Ejecutar

Requiere Python 3.10+.

```bash
cd 14-python-logistics
python main.py
```

## Ejecutar tests

```bash
cd 14-python-logistics
python tests/test_algorithms.py
```

## Menú

1. Ver inventario · 2. Agregar stock · 3. Ruta más corta (Dijkstra) · 4. Hubs alcanzables (BFS) · 5. Registrar envío · 6. Procesar próximo envío (Priority Queue) · 7. Listar envíos por prioridad (Merge Sort) · 8. Buscar envío por ID (Binary Search) · 9. Salir
