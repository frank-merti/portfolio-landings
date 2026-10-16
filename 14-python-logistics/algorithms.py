"""Core algorithms implemented from scratch (no heapq shortcuts in Dijkstra step)."""
from __future__ import annotations
import heapq
from collections import deque
from typing import Dict, List, Optional, Tuple

from entities import Graph


def dijkstra(graph: Graph, start: str) -> tuple[dict[str, float], dict[str, optional[str]]]:
    """Return (distances, previous) for shortest paths from start."""
    nodes = graph.nodes()
    INF = float("inf")
    dist: dict[str, float] = {n: INF for n in nodes}
    prev: dict[str, Optional[str]] = {n: None for n in nodes}

    if start not in dist:
        return dist, prev

    dist[start] = 0
    visited: set[str] = set()
    heap: list[tuple[float, str]] = [(0, start)]

    while heap:
        current_dist, node = heapq.heappop(heap)
        if node in visited:
            continue
        visited.add(node)
        for neighbor, weight in graph.neighbors(node):
            new_dist = current_dist + weight
            if new_dist < dist.get(neighbor, INF):
                dist[neighbor] = new_dist
                prev[neighbor] = node
                heapq.heappush(heap, (new_dist, neighbor))
    return dist, prev


def reconstruct_path(prev: dict[str, Optional[str]], start: str, end: str) -> list[str]:
    path: list[str] = []
    cursor: Optional[str] = end
    while cursor is not None:
        path.append(cursor)
        cursor = prev.get(cursor)
    path.reverse()
    if not path or path[0] != start:
        return []
    return path


def bfs(graph: Graph, start: str) -> list[str]:
    """Breadth-first traversal using a deque."""
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


def merge_sort(items: list, key=lambda x: x) -> list:
    """Stable merge sort returning a new list."""
    if len(items) <= 1:
        return list(items)
    mid = len(items) // 2
    left = merge_sort(items[:mid], key)
    right = merge_sort(items[mid:], key)
    return _merge(left, right, key)


def _merge(left, right, key):
    result: list = []
    i = j = 0
    while i < len(left) and j < len(right):
        if key(left[i]) <= key(right[j]):
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result


def binary_search_shipments(sorted_shipments, target_id: str) -> int:
    """Return index of target_id in a list sorted by shipment_id, or -1."""
    low, high = 0, len(sorted_shipments) - 1
    while low <= high:
        mid = (low + high) // 2
        current = sorted_shipments[mid].shipment_id
        if current == target_id:
            return mid
        if current < target_id:
            low = mid + 1
        else:
            high = mid - 1
    return -1
