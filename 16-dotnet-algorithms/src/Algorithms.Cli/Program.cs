using Algorithms.Cli.Collections;
using Algorithms.Cli.Graphs;
using Algorithms.Cli.Models;
using Algorithms.Cli.Searching;
using Algorithms.Cli.Sorting;

namespace Algorithms.Cli;

public static class Program
{
    public static void Main()
    {
        var tasks = BuildSampleTasks();
        var graph = BuildSampleGraph();

        while (true)
        {
            PrintMenu();
            var option = ReadLine(Messages.T("prompt.option"));

            switch (option)
            {
                case "1":
                    ShowSorting(tasks);
                    break;
                case "2":
                    ShowBinarySearch(tasks);
                    break;
                case "3":
                    ShowDijkstra(graph);
                    break;
                case "4":
                    ShowBreadthFirstSearch(graph);
                    break;
                case "5":
                    ShowLruCache();
                    break;
                case "6":
                    Messages.ToggleLanguage();
                    Console.WriteLine(Messages.T("msg.language_changed"));
                    break;
                case "7":
                    Console.WriteLine(Messages.T("msg.goodbye"));
                    return;
                default:
                    Console.WriteLine(Messages.T("msg.invalid_option"));
                    break;
            }

            Console.WriteLine();
        }
    }

    private static void PrintMenu()
    {
        Console.WriteLine(Messages.T("app.title"));
        Console.WriteLine(Messages.T("menu.sort"));
        Console.WriteLine(Messages.T("menu.search"));
        Console.WriteLine(Messages.T("menu.graph"));
        Console.WriteLine(Messages.T("menu.bfs"));
        Console.WriteLine(Messages.T("menu.lru"));
        Console.WriteLine(Messages.T("menu.language"));
        Console.WriteLine(Messages.T("menu.exit"));
    }

    private static string ReadLine(string label)
    {
        Console.Write($"{label}: ");
        return Console.ReadLine()?.Trim() ?? string.Empty;
    }

    private static void ShowSorting(IReadOnlyList<TaskItem> tasks)
    {
        var stable = MergeSort.Sort(tasks, Comparer<TaskItem>.Create((a, b) => a.Priority.CompareTo(b.Priority)));
        var unstable = QuickSort.Sort(tasks, Comparer<TaskItem>.Create((a, b) => a.Priority.CompareTo(b.Priority)));

        Console.WriteLine(Messages.T("msg.sorted"));
        foreach (var task in stable)
        {
            Console.WriteLine($"  [{task.Priority}] {task.Title} ({task.Status})");
        }

        Console.WriteLine(Messages.T("msg.sorted_unstable"));
        Console.WriteLine("  " + string.Join(", ", unstable.Select(task => task.Id)));
    }

    private static void ShowBinarySearch(IReadOnlyList<TaskItem> tasks)
    {
        var sorted = MergeSort.Sort(tasks, Comparer<TaskItem>.Create((a, b) => a.Priority.CompareTo(b.Priority)));
        var input = ReadLine(Messages.T("prompt.priority"));

        if (!int.TryParse(input, out var priority))
        {
            Console.WriteLine(Messages.T("msg.invalid_option"));
            return;
        }

        var index = BinarySearch.IndexOf(sorted, priority, task => task.Priority);
        if (index < 0)
        {
            Console.WriteLine(Messages.T("msg.not_found"));
            return;
        }

        Console.WriteLine(Messages.T("msg.found"), sorted[index].Title);
    }

    private static void ShowDijkstra(Graph<string> graph)
    {
        var origin = ReadLine(Messages.T("prompt.city"));
        var destination = ReadLine(Messages.T("prompt.city"));

        var (distances, previous) = Dijkstra.ShortestPaths(graph, origin);
        var path = Dijkstra.ReconstructPath(previous, origin, destination);

        if (path.Count == 0 || !distances.TryGetValue(destination, out var distance) || distance == int.MaxValue)
        {
            Console.WriteLine(Messages.T("msg.no_route"));
            return;
        }

        Console.WriteLine(Messages.T("msg.route"), distance, string.Join(" -> ", path));
    }

    private static void ShowBreadthFirstSearch(Graph<string> graph)
    {
        var origin = ReadLine(Messages.T("prompt.city"));
        var order = BreadthFirstSearch.Traverse(graph, origin);
        Console.WriteLine(Messages.T("msg.reachable"), string.Join(", ", order));
    }

    private static void ShowLruCache()
    {
        var cache = new LruCache<string, int>(3);
        cache.Set("a", 1);
        cache.Set("b", 2);
        cache.Set("c", 3);
        cache.TryGet("a", out _);
        cache.Set("d", 4);

        Console.WriteLine(Messages.T("msg.lru"), string.Join(", ", cache.KeysInUsageOrder()));
    }

    private static List<TaskItem> BuildSampleTasks() =>
    [
        new("T-01", "Diseñar la API", 3, WorkStatus.Done),
        new("T-02", "Escribir tests", 5, WorkStatus.InProgress),
        new("T-03", "Revisar el pull request", 1, WorkStatus.Todo),
        new("T-04", "Actualizar documentación", 2, WorkStatus.Todo),
        new("T-05", "Desplegar a producción", 4, WorkStatus.Todo)
    ];

    private static Graph<string> BuildSampleGraph()
    {
        var graph = new Graph<string>();
        graph.AddEdge("CDMX", "Toluca", 65);
        graph.AddEdge("CDMX", "Puebla", 130);
        graph.AddEdge("Toluca", "Querétaro", 150);
        graph.AddEdge("Puebla", "Querétaro", 190);
        graph.AddEdge("Querétaro", "Guadalajara", 280);
        graph.AddEdge("Querétaro", "Aguascalientes", 620);
        graph.AddEdge("Guadalajara", "Monterrey", 750);
        return graph;
    }
}
