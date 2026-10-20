"""Domain entities for the logistics application."""
from __future__ import annotations
from dataclasses import dataclass


@dataclass
class Shipment:
    shipment_id: str
    customer: str
    destination: str
    priority: int

    def __lt__(self, other: "Shipment") -> bool:
        return self.priority > other.priority


class Graph:
    """Directed weighted graph stored as adjacency lists."""

    def __init__(self) -> None:
        self.adjacency: dict[str, list[tuple[str, int]]] = {}

    def add_node(self, node: str) -> None:
        self.adjacency.setdefault(node, [])

    def add_edge(self, source: str, target: str, weight: int) -> None:
        self.add_node(source)
        self.add_node(target)
        self.adjacency[source].append((target, weight))

    def nodes(self) -> list[str]:
        return list(self.adjacency.keys())

    def neighbors(self, node: str) -> list[tuple[str, int]]:
        return self.adjacency.get(node, [])
