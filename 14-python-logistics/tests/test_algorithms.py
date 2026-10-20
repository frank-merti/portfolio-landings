"""Unit tests for the algorithms module."""
import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from algorithms import binary_search_shipments, bfs, dijkstra, merge_sort, reconstruct_path
from entities import Graph, Shipment


class TestAlgorithms(unittest.TestCase):

    def setUp(self):
        self.graph = Graph()
        for hub in ["A", "B", "C", "D"]:
            self.graph.add_node(hub)
        self.graph.add_edge("A", "B", 4)
        self.graph.add_edge("A", "C", 2)
        self.graph.add_edge("C", "B", 1)
        self.graph.add_edge("B", "D", 3)
        self.graph.add_edge("C", "D", 6)

    def test_dijkstra_shortest_path(self):
        distances, previous = dijkstra(self.graph, "A")
        self.assertEqual(distances["B"], 3)
        self.assertEqual(distances["D"], 6)
        self.assertEqual(reconstruct_path(previous, "A", "D"), ["A", "C", "B", "D"])

    def test_bfs_visits_reachable_nodes(self):
        order = bfs(self.graph, "A")
        self.assertEqual(order[0], "A")
        self.assertIn("D", order)

    def test_merge_sort_returns_sorted_copy(self):
        items = [3, 1, 4, 1, 5]
        self.assertEqual(merge_sort(items), [1, 1, 3, 4, 5])
        self.assertEqual(items, [3, 1, 4, 1, 5])

    def test_binary_search_shipments(self):
        shipments = [
            Shipment("S001", "a", "X", 1),
            Shipment("S002", "b", "Y", 2),
            Shipment("S003", "c", "Z", 3),
        ]
        self.assertEqual(binary_search_shipments(shipments, "S002"), 1)
        self.assertEqual(binary_search_shipments(shipments, "S999"), -1)


if __name__ == "__main__":
    unittest.main()
