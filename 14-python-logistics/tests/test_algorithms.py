import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from algorithms import binary_search_shipments, bfs, dijkstra, merge_sort, reconstruct_path
from entities import Graph, Shipment


class TestAlgorithms(unittest.TestCase):
    def setUp(self):
        self.g = Graph()
        for hub in ["A", "B", "C", "D"]:
            self.g.add_node(hub)
        self.g.add_edge("A", "B", 4)
        self.g.add_edge("A", "C", 2)
        self.g.add_edge("C", "B", 1)
        self.g.add_edge("B", "D", 3)
        self.g.add_edge("C", "D", 6)

    def test_dijkstra_shortest(self):
        dist, prev = dijkstra(self.g, "A")
        self.assertEqual(dist["B"], 3)  # A -> C -> B
        self.assertEqual(dist["D"], 6)  # A -> C -> B -> D
        self.assertEqual(reconstruct_path(prev, "A", "D"), ["A", "C", "B", "D"])

    def test_bfs(self):
        order = bfs(self.g, "A")
        self.assertEqual(order[0], "A")
        self.assertIn("D", order)

    def test_merge_sort(self):
        items = [3, 1, 4, 1, 5]
        self.assertEqual(merge_sort(items), [1, 1, 3, 4, 5])

    def test_binary_search(self):
        shipments = [
            Shipment("S001", "a", "X", 1),
            Shipment("S002", "b", "Y", 2),
            Shipment("S003", "c", "Z", 3),
        ]
        self.assertEqual(binary_search_shipments(shipments, "S002"), 1)
        self.assertEqual(binary_search_shipments(shipments, "S999"), -1)


if __name__ == "__main__":
    unittest.main()
