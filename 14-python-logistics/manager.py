"""Lógica de negocio: inventario, envíos y rutas.

``LogisticsManager`` es la clase que coordina las entidades con los
algoritmos. Concentra el conocimiento del dominio y expone métodos
simples de alto nivel (registrar envío, calcular ruta, procesar cola).
"""
from __future__ import annotations

import heapq
from typing import Optional

from entities import Graph, Shipment
from algorithms import (
    bfs,
    binary_search_shipments,
    dijkstra,
    merge_sort,
    reconstruct_path,
)


class LogisticsManager:
    """Gestor central de la operación logística."""

    def __init__(self) -> None:
        # Grafo de rutas entre hubs
        self.graph = Graph()

        # Inventario: producto -> cantidad disponible (búsqueda O(1))
        self.inventory: dict[str, int] = {}

        # Histórico de envíos
        self.shipments: list[Shipment] = []

        # Cola de prioridad (heapq). Guardamos (-prioridad, contador, envío)
        # porque heapq es un min-heap: negar la prioridad hace que salga
        # primero la de mayor urgencia. El contador evita comparar envíos.
        self.priority_queue: list[tuple[int, int, Shipment]] = []
        self._counter = 0

    # ---------------- Grafo y rutas ----------------

    def add_hub(self, name: str) -> None:
        """Registra un hub (nodo) en el grafo."""
        self.graph.add_node(name)

    def add_route(self, source: str, target: str, km: int) -> None:
        """Conecta dos hubs con una ruta de ``km`` kilómetros."""
        self.graph.add_edge(source, target, km)

    def shortest_route(self, start: str, end: str) -> tuple[int, list[str]]:
        """Ruta más corta entre dos hubs usando Dijkstra.

        Devuelve (kilómetros, lista de hubs). Si no hay ruta, devuelve (0, []).
        """
        dist, prev = dijkstra(self.graph, start)
        path = reconstruct_path(prev, start, end)
        if not path:
            return 0, []
        return int(dist[end]), path

    def reachable_hubs(self, start: str) -> list[str]:
        """Hubs alcanzables desde un origen usando BFS."""
        return bfs(self.graph, start)

    # ---------------- Inventario ----------------

    def add_stock(self, product: str, qty: int) -> None:
        """Agrega existencias de un producto al inventario."""
        self.inventory[product] = self.inventory.get(product, 0) + qty

    def remove_stock(self, product: str, qty: int) -> bool:
        """Descuenta existencias. Devuelve False si no hay stock suficiente."""
        if self.inventory.get(product, 0) < qty:
            return False
        self.inventory[product] -= qty
        return True

    # ---------------- Envíos ----------------

    def register_shipment(self, shipment: Shipment) -> None:
        """Registra un envío y lo encola en la cola de prioridad."""
        self.shipments.append(shipment)
        heapq.heappush(self.priority_queue, (-shipment.priority, self._counter, shipment))
        self._counter += 1

    def next_shipment(self) -> Optional[Shipment]:
        """Saca de la cola el envío más urgente. None si la cola está vacía."""
        if not self.priority_queue:
            return None
        _, _, shipment = heapq.heappop(self.priority_queue)
        return shipment

    def sorted_shipments(self, key) -> list[Shipment]:
        """Lista de envíos ordenada con Merge Sort (no modifica la original)."""
        return merge_sort(self.shipments, key=key)

    def find_shipment(self, shipment_id: str) -> Optional[Shipment]:
        """Busca un envío por id: ordena una copia y hace búsqueda binaria."""
        ordered = self.sorted_shipments(key=lambda s: s.shipment_id)
        idx = binary_search_shipments(ordered, shipment_id)
        return ordered[idx] if idx != -1 else None
