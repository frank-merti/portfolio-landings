"""Entidades de dominio de la app de logística.

Este módulo agrupa las clases que representan los datos del negocio
(modelo de dominio). Se mantienen separadas de los algoritmos y de la
interfaz de usuario para respetar el principio de "Separation of Concerns"
y facilitar las pruebas unitarias.
"""
from __future__ import annotations
from dataclasses import dataclass
from typing import Optional


@dataclass
class Shipment:
    """Envío (paquete) que debe llegar a un destino.

    Se usa ``@dataclass`` para generar automáticamente el constructor,
    ``__repr__`` y ``__eq__``: menos código repetitivo y menos errores.
    """

    shipment_id: str  # identificador único del envío
    customer: str     # cliente destinatario
    destination: str  # hub de destino
    priority: int     # prioridad: mientras más alta, más urgente

    def __lt__(self, other: "Shipment") -> bool:
        """Permite comparar envíos por prioridad (de mayor a menor).

        Python usa este método en ``sorted()`` y en ``heapq``, por lo que
        resulta útil para ordenar la cola de envíos.
        """
        return self.priority > other.priority


class Graph:
    """Grafo dirigido con pesos representado con listas de adyacencia.

    ``adjacency`` es un ``dict`` que guarda, para cada nodo, la lista de
    vecinos con el costo (kilómetros) de llegar a ellos.

    Ejemplo::

        adjacency = {"CDMX": [("Toluca", 65)], "Toluca": []}
    """

    def __init__(self) -> None:
        self.adjacency: dict[str, list[tuple[str, int]]] = {}

    def add_node(self, node: str) -> None:
        """Agrega un nodo si no existe (setdefault no duplica la clave)."""
        self.adjacency.setdefault(node, [])

    def add_edge(self, source: str, target: str, weight: int) -> None:
        """Agrega una arista dirigida ``source -> target`` con costo ``weight``."""
        self.add_node(source)
        self.add_node(target)
        self.adjacency[source].append((target, weight))

    def nodes(self) -> list[str]:
        """Devuelve todos los nodos del grafo."""
        return list(self.adjacency.keys())

    def neighbors(self, node: str) -> list[tuple[str, int]]:
        """Devuelve los vecinos de un nodo como lista de tuplas (vecino, peso)."""
        return self.adjacency.get(node, [])
