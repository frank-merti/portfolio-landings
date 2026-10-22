using Algorithms.Cli.Models;
using Algorithms.Cli.Sorting;

namespace Algorithms.Tests;

public class SortingTests
{
    private static readonly IComparer<TaskItem> ByPriority =
        Comparer<TaskItem>.Create((a, b) => a.Priority.CompareTo(b.Priority));

    [Fact]
    public void MergeSort_orders_by_priority()
    {
        var tasks = new List<TaskItem>
        {
            new("T-1", "One", 3, WorkStatus.Todo),
            new("T-2", "Two", 1, WorkStatus.Done),
            new("T-3", "Three", 2, WorkStatus.Todo)
        };

        var sorted = MergeSort.Sort(tasks, ByPriority);

        Assert.Equal(new[] { 1, 2, 3 }, sorted.Select(task => task.Priority).ToArray());
    }

    [Fact]
    public void MergeSort_is_stable_for_equal_priorities()
    {
        var tasks = new List<TaskItem>
        {
            new("A", "First", 2, WorkStatus.Todo),
            new("B", "Second", 2, WorkStatus.Todo),
            new("C", "Third", 2, WorkStatus.Todo)
        };

        var sorted = MergeSort.Sort(tasks, ByPriority);

        Assert.Equal(new[] { "A", "B", "C" }, sorted.Select(task => task.Id).ToArray());
    }

    [Fact]
    public void MergeSort_does_not_mutate_the_source()
    {
        var tasks = new List<TaskItem>
        {
            new("T-1", "One", 5, WorkStatus.Todo),
            new("T-2", "Two", 1, WorkStatus.Todo)
        };

        MergeSort.Sort(tasks, ByPriority);

        Assert.Equal(5, tasks[0].Priority);
    }

    [Fact]
    public void MergeSort_handles_empty_and_single_element_inputs()
    {
        Assert.Empty(MergeSort.Sort(Array.Empty<int>()));
        Assert.Equal(new[] { 42 }, MergeSort.Sort(new[] { 42 }));
    }

    [Fact]
    public void QuickSort_orders_by_priority()
    {
        var tasks = new List<TaskItem>
        {
            new("T-1", "One", 3, WorkStatus.Todo),
            new("T-2", "Two", 1, WorkStatus.Done),
            new("T-3", "Three", 2, WorkStatus.Todo)
        };

        var sorted = QuickSort.Sort(tasks, ByPriority);

        Assert.Equal(new[] { 1, 2, 3 }, sorted.Select(task => task.Priority).ToArray());
    }

    [Fact]
    public void QuickSort_handles_duplicates()
    {
        var sorted = QuickSort.Sort(new[] { 4, 4, 2, 2, 9, 1 });

        Assert.Equal(new[] { 1, 2, 2, 4, 4, 9 }, sorted);
    }
}
