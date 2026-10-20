"""Graph and sorting algorithms implemented from scratch."""
from __future__ import annotations
import heapq
from collections import deque
from typing import Optional

from entities import Graph


def dijkstra(graph: Graph, start: str) -> tuple[dict[str, float], dict[str, Optional[str]]]:
    """Returns shortest distances and predecessors for every node reachable from start."""
    nodes = graph.nodes()
    infinity = float("inf")
    distances: dict[str, float] = {node: infinity for node in nodes}
    previous: dict[str, Optional[str]] = {node: None for node in nodes}

    if start not in distances:
        return distances, previous

    distances[start] = 0
    visited: set[str] = set()
    queue: list[tuple[float, str]] = [(0, start)]

    while queue:
        current_distance, node = heapq.heappop(queue)
        if node in visited:
            continue
        visited.add(node)

        for neighbor, weight in graph.neighbors(node):
            candidate = current_distance + weight
            if candidate < distances.get(neighbor, infinity):
                distances[neighbor] = candidate
                previous[neighbor] = node
                heapq.heappush(queue, (candidate, neighbor))

    return distances, previous


def reconstruct_path(previous: dict[str, Optional[str]], start: str, end: str) -> list[str]:
    """Rebuilds the shortest path between two nodes using the predecessor map."""
    path: list[str] = []
    cursor: Optional[str] = end
    while cursor is not None:
        path.append(cursor)
        cursor = previous.get(cursor)
    path.reverse()

    if not path or path[0] != start:
        return []
    return path


def bfs(graph: Graph, start: str) -> list[str]:
    """Returns the nodes reachable from start in breadth-first order."""
    if start not in graph.adjacency:
        return []

    visited: set[str] = {start}
    order: list[str] = []
    queue: deque[str] = deque([start])

    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor, _ in graph.neighbors(node):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order


def merge_sort(items: list, key=lambda item: item) -> list:
    """Stable merge sort that returns a new sorted list."""
    if len(items) <= 1:
        return list(items)

    middle = len(items) // 2
    left = merge_sort(items[:middle], key)
    right = merge_sort(items[middle:], key)
    return _merge(left, right, key)


def _merge(left: list, right: list, key) -> list:
    merged: list = []
    left_index = right_index = 0

    while left_index < len(left) and right_index < len(right):
        if key(left[left_index]) <= key(right[right_index]):
            merged.append(left[left_index])
            left_index += 1
        else:
            merged.append(right[right_index])
            right_index += 1

    merged.extend(left[left_index:])
    merged.extend(right[right_index:])
    return merged


def binary_search_shipments(sorted_shipments: list, target_id: str) -> int:
    """Returns the index of target_id in a list sorted by shipment_id, or -1."""
    low, high = 0, len(sorted_shipments) - 1
    while low <= high:
        middle = (low + high) // 2
        current = sorted_shipments[middle].shipment_id
        if current == target_id:
            return middle
        if current < target_id:
            low = middle + 1
        else:
            high = middle - 1
    return -1
