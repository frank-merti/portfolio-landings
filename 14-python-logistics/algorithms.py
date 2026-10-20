"""Algoritmos implementados a mano (sin usar librerías de ordenamiento).

Incluye:
  - Dijkstra  : ruta más corta desde un nodo (usa heapq como cola de prioridad).
  - BFS       : recorrido en anchura con ``collections.deque``.
  - Merge Sort: ordenamiento estable por clave (implementado desde cero).
  - Búsqueda binaria sobre envíos ordenados por id.
"""
from __future__ import annotations
import heapq
from collections import deque
from typing import Optional

from entities import Graph


def dijkstra(graph: Graph, start: str) -> tuple[dict[str, float], dict[str, Optional[str]]]:
    """Calcula la distancia mínima desde ``start`` a todos los nodos.

    Devuelve dos diccionarios:
      - ``dist``: distancia mínima acumulada a cada nodo (float("inf") si no es alcanzable).
      - ``prev``: predecesor de cada nodo, usado para reconstruir la ruta.

    Complejidad: O((V + E) log V) usando un heap binario como cola de prioridad.
    """
    nodes = graph.nodes()
    INF = float("inf")
    dist: dict[str, float] = {n: INF for n in nodes}
    prev: dict[str, Optional[str]] = {n: None for n in nodes}

    # Si el nodo inicial no existe en el grafo no hay nada que calcular
    if start not in dist:
        return dist, prev

    dist[start] = 0
    visited: set[str] = set()
    # El heap guarda (distancia_acumulada, nodo). El nodo más cercano siempre
    # queda en la cima, por eso heapq es eficiente para Dijkstra.
    heap: list[tuple[float, str]] = [(0, start)]

    while heap:
        current_dist, node = heapq.heappop(heap)

        # Si el nodo ya fue procesado, se ignora (evita reprocesarlo)
        if node in visited:
            continue
        visited.add(node)

        # Se relajan las aristas salientes: si encontramos un camino más corto
        # hacia un vecino, actualizamos su distancia y su predecesor.
        for neighbor, weight in graph.neighbors(node):
            new_dist = current_dist + weight
            if new_dist < dist.get(neighbor, INF):
                dist[neighbor] = new_dist
                prev[neighbor] = node
                heapq.heappush(heap, (new_dist, neighbor))

    return dist, prev


def reconstruct_path(prev: dict[str, Optional[str]], start: str, end: str) -> list[str]:
    """Reconstruye la ruta más corta usando el diccionario de predecesores.

    Se camina hacia atrás desde ``end`` hasta llegar a ``start`` y luego se
    invierte la lista. Si no hay camino se devuelve una lista vacía.
    """
    path: list[str] = []
    cursor: Optional[str] = end
    while cursor is not None:
        path.append(cursor)
        cursor = prev.get(cursor)
    path.reverse()

    # Validación: la ruta debe empezar en el origen solicitado
    if not path or path[0] != start:
        return []
    return path


def bfs(graph: Graph, start: str) -> list[str]:
    """Recorrido en anchura (BFS) que devuelve los nodos en orden de visita.

    Usa ``deque`` porque ofrece ``popleft()`` en O(1): insertar y quitar
    elementos por ambos extremos es más eficiente que en una lista.
    Complejidad: O(V + E).
    """
    if start not in graph.adjacency:
        return []

    visited: set[str] = {start}  # evita ciclos en grafos con bucles
    order: list[str] = []
    queue: deque[str] = deque([start])

    while queue:
        node = queue.popleft()   # se saca el más antiguo (FIFO)
        order.append(node)
        for neighbor, _ in graph.neighbors(node):
            if neighbor not in visited:
                visited.add(neighbor)  # se marca al encolar para no repetirlo
                queue.append(neighbor)
    return order


def merge_sort(items: list, key=lambda x: x) -> list:
    """Merge Sort estable: divide, ordena cada mitad y mezcla.

    Se implementa desde cero (no se usa ``sorted``) para mostrar el
    algoritmo en la práctica. Complejidad: O(n log n) en tiempo, O(n) en memoria.
    """
    # Caso base: un arreglo de 0 o 1 elementos ya está ordenado
    if len(items) <= 1:
        return list(items)

    mid = len(items) // 2
    left = merge_sort(items[:mid], key)    # mitad izquierda ordenada
    right = merge_sort(items[mid:], key)   # mitad derecha ordenada
    return _merge(left, right, key)


def _merge(left, right, key):
    """Mezcla dos listas ya ordenadas en una sola lista ordenada."""
    result: list = []
    i = j = 0
    while i < len(left) and j < len(right):
        # "<=" mantiene la estabilidad: en empate gana el elemento de la izquierda
        if key(left[i]) <= key(right[j]):
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    # Se agregan los elementos que sobraron de cada lista
    result.extend(left[i:])
    result.extend(right[j:])
    return result


def binary_search_shipments(sorted_shipments, target_id: str) -> int:
    """Búsqueda binaria sobre envíos ordenados por ``shipment_id``.

    Devuelve el índice del envío o -1 si no existe.
    Complejidad: O(log n) (la lista debe estar ordenada previamente).
    """
    low, high = 0, len(sorted_shipments) - 1
    while low <= high:
        mid = (low + high) // 2
        current = sorted_shipments[mid].shipment_id
        if current == target_id:
            return mid
        if current < target_id:
            low = mid + 1   # el id buscado es mayor: buscar a la derecha
        else:
            high = mid - 1  # el id buscado es menor: buscar a la izquierda
    return -1
