"""Geo entities and small helpers for the logistics app."""
from __future__ import annotations
from dataclasses import dataclass
from typing import Optional


@dataclass
class Shipment:
    shipment_id: str
    customer: str
    destination: str
    priority: int  # higher = more urgent

    def __lt__(self, other: "Shipment") -> bool:
        return self.priority > other.priority


class Graph:
    """Weighted directed graph represented with adjacency lists."""

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
