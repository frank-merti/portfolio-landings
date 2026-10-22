namespace Algorithms.Cli.Models;

public enum WorkStatus
{
    Todo,
    InProgress,
    Done
}

public sealed record TaskItem(string Id, string Title, int Priority, WorkStatus Status)
{
    public int CompareTo(TaskItem other) => Priority.CompareTo(other.Priority);
}

public sealed record City(string Name, int Population, string Country);
