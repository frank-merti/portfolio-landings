# Logistics CLI — Python · Data Structures & OOP

Console application for hub routing, inventory and shipment management.
Written with the Python standard library only, with a bilingual interface
(Spanish / English) and unit tests included.

<!-- ES -->
## Español

Aplicación de consola para gestión de rutas entre hubs, inventario y envíos.
Hecha solo con la biblioteca estándar de Python, con interfaz bilingüe
(ES/EN) y pruebas unitarias incluidas.

### Funcionalidad

- Consulta y actualización del inventario.
- Ruta más corta entre hubs (Dijkstra).
- Hubs alcanzables desde un origen (BFS).
- Registro de envíos y procesamiento por prioridad.
- Búsqueda de envíos por ID.
- Interfaz bilingüe (ES/EN) con opción de cambio de idioma en el menú.

### Estructuras de datos

| Estructura | Uso |
|---|---|
| `dict` | Listas de adyacencia del grafo e inventario |
| `heapq` (min-heap) | Cola de prioridad de envíos |
| `collections.deque` | Cola FIFO del recorrido BFS |
| `list` | Histórico de envíos |

### Algoritmos

| Algoritmo | Complejidad | Descripción |
|---|---|---|
| Dijkstra | O((V + E) log V) | Distancia mínima desde un nodo, con reconstrucción de ruta |
| BFS | O(V + E) | Recorrido en anchura con `deque` |
| Merge Sort | O(n log n) | Ordenamiento estable implementado desde cero |
| Búsqueda binaria | O(log n) | Búsqueda de envíos sobre una copia ordenada por ID |

### Diseño (POO)

| Clase / módulo | Responsabilidad |
|---|---|
| `entities.Shipment` | Entidad de envío (dataclass) |
| `entities.Graph` | Grafo dirigido con pesos |
| `algorithms` | Funciones puras de algoritmos, sin estado |
| `manager.LogisticsManager` | Lógica de negocio: inventario, envíos, rutas |
| `i18n` | Catálogos de textos ES/EN para la interfaz |
| `cli` | Menú de consola; no contiene lógica de negocio |

### Estructura del proyecto

```
14-python-logistics/
├── algorithms.py
├── cli.py
├── entities.py
├── i18n.py
├── main.py
├── manager.py
├── tests/
│   └── test_algorithms.py
└── README.md
```

### Ejecución

Requiere Python 3.10 o superior.

```bash
cd 14-python-logistics
python main.py
```

### Pruebas

```bash
cd 14-python-logistics
python -m unittest discover -s tests -v
```

<!-- EN -->
## English

Console application for hub routing, inventory and shipment management.
Built with the Python standard library only, with a bilingual interface
(ES/EN) and unit tests included.

### Features

- Inventory query and updates.
- Shortest route between hubs (Dijkstra).
- Hubs reachable from an origin (BFS).
- Shipment registration and priority processing.
- Shipment lookup by ID.
- Bilingual interface (ES/EN) with an in-menu language switch.

### Data structures

| Structure | Purpose |
|---|---|
| `dict` | Graph adjacency lists and inventory |
| `heapq` (min-heap) | Shipment priority queue |
| `collections.deque` | FIFO queue used by BFS |
| `list` | Shipment history |

### Algorithms

| Algorithm | Complexity | Description |
|---|---|---|
| Dijkstra | O((V + E) log V) | Shortest distances from a node with path reconstruction |
| BFS | O(V + E) | Breadth-first traversal using `deque` |
| Merge Sort | O(n log n) | Stable sort implemented from scratch |
| Binary search | O(log n) | Shipment lookup over a copy sorted by ID |

### OOP design

| Class / module | Responsibility |
|---|---|
| `entities.Shipment` | Shipment entity (dataclass) |
| `entities.Graph` | Directed weighted graph |
| `algorithms` | Pure algorithm functions, no state |
| `manager.LogisticsManager` | Business logic: inventory, shipments, routes |
| `i18n` | ES/EN string catalogs for the UI |
| `cli` | Console menu; contains no business logic |

### Run

Requires Python 3.10 or newer.

```bash
cd 14-python-logistics
python main.py
```

### Tests

```bash
cd 14-python-logistics
python -m unittest discover -s tests -v
```
