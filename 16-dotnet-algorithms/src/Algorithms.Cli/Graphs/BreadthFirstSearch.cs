namespace Algorithms.Cli.Graphs;

public static class BreadthFirstSearch
{
    public static IReadOnlyList<T> Traverse<T>(Graph<T> graph, T start) where T : notnull
    {
        ArgumentNullException.ThrowIfNull(graph);

        if (!graph.Nodes.Contains(start))
        {
            return [];
        }

        var visited = new HashSet<T> { start };
        var order = new List<T>();
        var queue = new Queue<T>();
        queue.Enqueue(start);

        while (queue.Count > 0)
        {
            var node = queue.Dequeue();
            order.Add(node);

            foreach (var (neighbor, _) in graph.Neighbors(node))
            {
                if (visited.Add(neighbor))
                {
                    queue.Enqueue(neighbor);
                }
            }
        }

        return order;
    }
}
