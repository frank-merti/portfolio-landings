namespace Algorithms.Cli.Graphs;

public sealed class Graph<T> where T : notnull
{
    private readonly Dictionary<T, List<(T Neighbor, int Weight)>> _adjacency = new();

    public IReadOnlyCollection<T> Nodes => _adjacency.Keys;

    public void AddNode(T node) => _adjacency.TryAdd(node, []);

    public void AddEdge(T source, T target, int weight)
    {
        AddNode(source);
        AddNode(target);
        _adjacency[source].Add((target, weight));
    }

    public IReadOnlyList<(T Neighbor, int Weight)> Neighbors(T node) =>
        _adjacency.TryGetValue(node, out var edges) ? edges : [];
}
