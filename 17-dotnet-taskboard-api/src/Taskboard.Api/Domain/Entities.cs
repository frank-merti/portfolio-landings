namespace Taskboard.Api.Domain;

public sealed class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Email { get; set; }
    public required string DisplayName { get; set; }
    public required string PasswordHash { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public ICollection<Board> Boards { get; set; } = new List<Board>();
}

public sealed class Board
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Name { get; set; }
    public string? Description { get; set; }
    public string Color { get; set; } = "indigo";
    public Guid OwnerId { get; set; }
    public User Owner { get; set; } = null!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public ICollection<BoardTask> Tasks { get; set; } = new List<BoardTask>();
}

public sealed class BoardTask
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Title { get; set; }
    public string? Notes { get; set; }
    public WorkItemStatus Status { get; set; } = WorkItemStatus.Todo;
    public WorkItemPriority Priority { get; set; } = WorkItemPriority.Medium;
    public Guid BoardId { get; set; }
    public Board Board { get; set; } = null!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public enum WorkItemStatus
{
    Todo,
    Doing,
    Done
}

public enum WorkItemPriority
{
    Low,
    Medium,
    High
}

