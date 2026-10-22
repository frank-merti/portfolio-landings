using Algorithms.Cli.Graphs;

namespace Algorithms.Tests;

public class GraphTests
{
    private static Graph<string> BuildGraph()
    {
        var graph = new Graph<string>();
        graph.AddEdge("A", "B", 4);
        graph.AddEdge("A", "C", 2);
        graph.AddEdge("C", "B", 1);
        graph.AddEdge("B", "D", 3);
        graph.AddEdge("C", "D", 6);
        return graph;
    }

    [Fact]
    public void Dijkstra_computes_shortest_distances()
    {
        var (distances, _) = Dijkstra.ShortestPaths(BuildGraph(), "A");

        Assert.Equal(3, distances["B"]);
        Assert.Equal(6, distances["D"]);
        Assert.Equal(0, distances["A"]);
    }

    [Fact]
    public void Dijkstra_reconstructs_the_shortest_path()
    {
        var (distances, previous) = Dijkstra.ShortestPaths(BuildGraph(), "A");

        var path = Dijkstra.ReconstructPath(previous, "A", "D");

        Assert.Equal(new[] { "A", "C", "B", "D" }, path.ToArray());
        Assert.Equal(6, distances["D"]);
    }

    [Fact]
    public void Dijkstra_marks_unreachable_nodes()
    {
        var (distances, _) = Dijkstra.ShortestPaths(BuildGraph(), "D");

        Assert.Equal(int.MaxValue, distances["A"]);
    }

    [Fact]
    public void BreadthFirstSearch_visits_in_breadth_first_order()
    {
        var order = BreadthFirstSearch.Traverse(BuildGraph(), "A");

        Assert.Equal("A", order[0]);
        Assert.Equal(new[] { "A", "B", "C", "D" }, order.ToArray());
    }

    [Fact]
    public void BreadthFirstSearch_returns_empty_for_unknown_nodes()
    {
        Assert.Empty(BreadthFirstSearch.Traverse(BuildGraph(), "Z"));
    }
}
