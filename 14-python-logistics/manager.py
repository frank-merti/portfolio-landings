"""Business logic glue: inventory, shipments and routing."""
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
    def __init__(self) -> None:
        self.graph = Graph()
        self.inventory: dict[str, int] = {}
        self.shipments: list[Shipment] = []
        self.priority_queue: list[tuple[int, int, Shipment]] = []  # heapq (negative priority, counter, shipment)
        self._counter = 0

    # ---- graph ----
    def add_hub(self, name: str) -> None:
        self.graph.add_node(name)

    def add_route(self, source: str, target: str, km: int) -> None:
        self.graph.add_edge(source, target, km)

    def shortest_route(self, start: str, end: str) -> tuple[int, list[str]]:
        dist, prev = dijkstra(self.graph, start)
        path = reconstruct_path(prev, start, end)
        if not path:
            return 0, []
        return int(dist[end]), path

    def reachable_hubs(self, start: str) -> list[str]:
        return bfs(self.graph, start)

    # ---- inventory ----
    def add_stock(self, product: str, qty: int) -> None:
        self.inventory[product] = self.inventory.get(product, 0) + qty

    def remove_stock(self, product: str, qty: int) -> bool:
        if self.inventory.get(product, 0) < qty:
            return False
        self.inventory[product] -= qty
        return True

    # ---- shipments ----
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
        ordered = self.sorted_shipments(key=lambda s: s.shipment_id)
        idx = binary_search_shipments(ordered, shipment_id)
        return ordered[idx] if idx != -1 else None
