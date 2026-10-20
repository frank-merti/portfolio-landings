"""Business logic: inventory, shipments and routing."""
from __future__ import annotations
import heapq
from typing import Optional

from algorithms import (
    bfs,
    binary_search_shipments,
    dijkstra,
    merge_sort,
    reconstruct_path,
)
from entities import Graph, Shipment


class LogisticsManager:
    """Coordinates inventory, shipments and the hub network."""

    def __init__(self) -> None:
        self.graph = Graph()
        self.inventory: dict[str, int] = {}
        self.shipments: list[Shipment] = []
        self.priority_queue: list[tuple[int, int, Shipment]] = []
        self._counter = 0

    def add_hub(self, name: str) -> None:
        self.graph.add_node(name)

    def add_route(self, source: str, target: str, km: int) -> None:
        self.graph.add_edge(source, target, km)

    def shortest_route(self, start: str, end: str) -> tuple[int, list[str]]:
        distances, previous = dijkstra(self.graph, start)
        path = reconstruct_path(previous, start, end)
        if not path:
            return 0, []
        return int(distances[end]), path

    def reachable_hubs(self, start: str) -> list[str]:
        return bfs(self.graph, start)

    def add_stock(self, product: str, quantity: int) -> None:
        self.inventory[product] = self.inventory.get(product, 0) + quantity

    def remove_stock(self, product: str, quantity: int) -> bool:
        if self.inventory.get(product, 0) < quantity:
            return False
        self.inventory[product] -= quantity
        return True

    def register_shipment(self, shipment: Shipment) -> None:
        self.shipments.append(shipment)
        heapq.heappush(self.priority_queue, (-shipment.priority, self._counter, shipment))
        self._counter += 1

    def next_shipment(self) -> Optional[Shipment]:
        if not self.priority_queue:
            return None
        _, _, shipment = heapq.heappop(self.priority_queue)
        return shipment

    def sorted_shipments(self, key) -> list[Shipment]:
        return merge_sort(self.shipments, key=key)

    def find_shipment(self, shipment_id: str) -> Optional[Shipment]:
        ordered = self.sorted_shipments(key=lambda shipment: shipment.shipment_id)
        index = binary_search_shipments(ordered, shipment_id)
        return ordered[index] if index != -1 else None
