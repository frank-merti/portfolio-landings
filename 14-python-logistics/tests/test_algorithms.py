"""Pruebas unitarias de los algoritmos.

Se ejecutan con:  python tests/test_algorithms.py
"""
import os
import sys
import unittest

# Se agrega la carpeta raíz del proyecto al path para poder importar los módulos
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from algorithms import binary_search_shipments, bfs, dijkstra, merge_sort, reconstruct_path
from entities import Graph, Shipment


class TestAlgorithms(unittest.TestCase):
    """Casos de prueba para verificar el comportamiento de los algoritmos."""

    def setUp(self):
        """Grafo de prueba: A -> B (4), A -> C (2), C -> B (1), B -> D (3), C -> D (6)."""
        self.g = Graph()
        for hub in ["A", "B", "C", "D"]:
            self.g.add_node(hub)
        self.g.add_edge("A", "B", 4)
        self.g.add_edge("A", "C", 2)
        self.g.add_edge("C", "B", 1)
        self.g.add_edge("B", "D", 3)
        self.g.add_edge("C", "D", 6)

    def test_dijkstra_shortest(self):
        """La ruta más corta a B es A->C->B (3) y a D es A->C->B->D (6)."""
        dist, prev = dijkstra(self.g, "A")
        self.assertEqual(dist["B"], 3)
        self.assertEqual(dist["D"], 6)
        self.assertEqual(reconstruct_path(prev, "A", "D"), ["A", "C", "B", "D"])

    def test_bfs(self):
        """BFS visita el nodo inicial y alcanza los demás."""
        order = bfs(self.g, "A")
        self.assertEqual(order[0], "A")
        self.assertIn("D", order)

    def test_merge_sort(self):
        """Merge Sort ordena correctamente y no modifica la lista original."""
        items = [3, 1, 4, 1, 5]
        self.assertEqual(merge_sort(items), [1, 1, 3, 4, 5])
        self.assertEqual(items, [3, 1, 4, 1, 5])

    def test_binary_search(self):
        """La búsqueda binaria encuentra el envío y devuelve -1 si no existe."""
        shipments = [
            Shipment("S001", "a", "X", 1),
            Shipment("S002", "b", "Y", 2),
            Shipment("S003", "c", "Z", 3),
        ]
        self.assertEqual(binary_search_shipments(shipments, "S002"), 1)
        self.assertEqual(binary_search_shipments(shipments, "S999"), -1)


if __name__ == "__main__":
    unittest.main()
