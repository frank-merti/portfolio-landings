namespace Algorithms.Cli.Graphs;

public static class Dijkstra
{
    public static (IReadOnlyDictionary<T, int> Distances, IReadOnlyDictionary<T, T?> Previous) ShortestPaths<T>(
        Graph<T> graph,
        T start) where T : notnull
    {
        ArgumentNullException.ThrowIfNull(graph);

        var distances = graph.Nodes.ToDictionary(node => node, _ => int.MaxValue);
        var previous = graph.Nodes.ToDictionary(node => node, _ => (T?)default(T));
        var visited = new HashSet<T>();
        var queue = new PriorityQueue<T, int>();

        distances[start] = 0;
        queue.Enqueue(start, 0);

        while (queue.TryDequeue(out var node, out var currentDistance))
        {
            if (!visited.Add(node))
            {
                continue;
            }

            foreach (var (neighbor, weight) in graph.Neighbors(node))
            {
                var candidate = currentDistance + weight;
                if (candidate < distances[neighbor])
                {
                    distances[neighbor] = candidate;
                    previous[neighbor] = node;
                    queue.Enqueue(neighbor, candidate);
                }
            }
        }

        return (distances, previous);
    }

    public static IReadOnlyList<T> ReconstructPath<T>(IReadOnlyDictionary<T, T?> previous, T start, T end)
        where T : notnull
    {
        var path = new List<T>();
        var current = end;

        while (current is not null && !EqualityComparer<T>.Default.Equals(current, default))
        {
            path.Add(current);
            if (!previous.TryGetValue(current, out var parent) || parent is null)
            {
                break;
            }

            current = parent;
        }

        path.Reverse();
        return path.Count > 0 && EqualityComparer<T>.Default.Equals(path[0], start) ? path : [];
    }
}
