namespace TaskboardDashboard.Models;

public sealed record UserDto(Guid Id, string Email, string DisplayName);
public sealed record AuthResponseDto(string Token, UserDto User);
public sealed record BoardDto(Guid Id, string Name, string? Description, string Color, int TaskCount, DateTimeOffset CreatedAt);
public sealed record TaskDto(Guid Id, string Title, string? Notes, string Status, string Priority, DateTime CreatedAt, DateTime UpdatedAt);

public sealed record BoardDetailDto
{
    public Guid Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public string? Description { get; init; }
    public string Color { get; init; } = string.Empty;
    public DateTime CreatedAt { get; init; }
    public IReadOnlyList<TaskDto> Tasks { get; set; } = new List<TaskDto>();
}
public sealed record LoginRequest(string Email, string Password);
public sealed record CreateBoardRequest(string Name, string? Description, string? Color);
public sealed record CreateTaskRequest(string Title, string? Notes, string? Priority, string? Status);
public sealed record UpdateTaskRequest(string? Title, string? Notes, string? Priority, string? Status);
