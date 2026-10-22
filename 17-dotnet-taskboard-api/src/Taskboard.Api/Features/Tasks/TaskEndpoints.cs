using Microsoft.EntityFrameworkCore;
using Taskboard.Api.Data;
using Taskboard.Api.Domain;
using Taskboard.Api.Features.Boards;
using Taskboard.Api.Infrastructure;

namespace Taskboard.Api.Features.Tasks;

public sealed record CreateTaskRequest(string Title, string? Notes, string? Priority, string? Status);
public sealed record UpdateTaskRequest(string? Title, string? Notes, string? Priority, string? Status);

public static class TaskEndpoints
{
    public static RouteGroupBuilder MapTaskEndpoints(this RouteGroupBuilder group)
    {
        group.MapPost("/boards/{boardId:guid}/tasks", CreateTaskAsync).RequireAuthorization();
        group.MapPatch("/tasks/{taskId:guid}", UpdateTaskAsync).RequireAuthorization();
        group.MapDelete("/tasks/{taskId:guid}", DeleteTaskAsync).RequireAuthorization();
        return group;
    }

    private static async Task<IResult> CreateTaskAsync(
        Guid boardId,
        CreateTaskRequest request,
        AppDbContext db,
        HttpContext context,
        CancellationToken cancellationToken)
    {
        var ownerId = context.User.GetUserId();

        var boardExists = await db.Boards.AnyAsync(board => board.Id == boardId && board.OwnerId == ownerId, cancellationToken);
        if (!boardExists)
        {
            return Results.NotFound();
        }

        var errors = new Dictionary<string, string[]>();
        if (string.IsNullOrWhiteSpace(request.Title) || request.Title.Trim().Length is < 2 or > 120)
        {
            errors[nameof(CreateTaskRequest.Title)] = ["Task title must be between 2 and 120 characters."];
        }

        if (request.Notes?.Length > 500)
        {
            errors[nameof(CreateTaskRequest.Notes)] = ["Notes cannot exceed 500 characters."];
        }

        if (!TryParsePriority(request.Priority, out var priority))
        {
            errors[nameof(CreateTaskRequest.Priority)] = ["Priority must be one of: Low, Medium, High."];
        }

        if (!TryParseStatus(request.Status, out var status))
        {
            errors[nameof(CreateTaskRequest.Status)] = ["Status must be one of: Todo, Doing, Done."];
        }

        if (errors.Count > 0)
        {
            return Results.ValidationProblem(errors);
        }

        var task = new BoardTask
        {
            Title = request.Title.Trim(),
            Notes = string.IsNullOrWhiteSpace(request.Notes) ? null : request.Notes.Trim(),
            Priority = priority,
            Status = status,
            BoardId = boardId
        };

        db.Tasks.Add(task);
        await db.SaveChangesAsync(cancellationToken);

        var response = new TaskResponse(task.Id, task.Title, task.Notes, task.Status.ToString(), task.Priority.ToString(), task.CreatedAt, task.UpdatedAt);
        return Results.Created($"/api/tasks/{task.Id}", response);
    }

    private static async Task<IResult> UpdateTaskAsync(
        Guid taskId,
        UpdateTaskRequest request,
        AppDbContext db,
        HttpContext context,
        CancellationToken cancellationToken)
    {
        var ownerId = context.User.GetUserId();

        var task = await db.Tasks
            .FirstOrDefaultAsync(candidate => candidate.Id == taskId && candidate.Board.OwnerId == ownerId, cancellationToken);

        if (task is null)
        {
            return Results.NotFound();
        }

        if (request.Title is not null)
        {
            if (request.Title.Trim().Length is < 2 or > 120)
            {
                return Results.ValidationProblem(new Dictionary<string, string[]>
                {
                    [nameof(UpdateTaskRequest.Title)] = ["Task title must be between 2 and 120 characters."]
                });
            }

            task.Title = request.Title.Trim();
        }

        if (request.Notes is not null)
        {
            if (request.Notes.Length > 500)
            {
                return Results.ValidationProblem(new Dictionary<string, string[]>
                {
                    [nameof(UpdateTaskRequest.Notes)] = ["Notes cannot exceed 500 characters."]
                });
            }

            task.Notes = string.IsNullOrWhiteSpace(request.Notes) ? null : request.Notes.Trim();
        }

        if (request.Priority is not null)
        {
            if (!TryParsePriority(request.Priority, out var priority))
            {
                return Results.ValidationProblem(new Dictionary<string, string[]>
                {
                    [nameof(UpdateTaskRequest.Priority)] = ["Priority must be one of: Low, Medium, High."]
                });
            }

            task.Priority = priority;
        }

        if (request.Status is not null)
        {
            if (!TryParseStatus(request.Status, out var status))
            {
                return Results.ValidationProblem(new Dictionary<string, string[]>
                {
                    [nameof(UpdateTaskRequest.Status)] = ["Status must be one of: Todo, Doing, Done."]
                });
            }

            task.Status = status;
        }

        task.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync(cancellationToken);

        return Results.Ok(new TaskResponse(task.Id, task.Title, task.Notes, task.Status.ToString(), task.Priority.ToString(), task.CreatedAt, task.UpdatedAt));
    }

    private static async Task<IResult> DeleteTaskAsync(
        Guid taskId,
        AppDbContext db,
        HttpContext context,
        CancellationToken cancellationToken)
    {
        var ownerId = context.User.GetUserId();

        var task = await db.Tasks
            .FirstOrDefaultAsync(candidate => candidate.Id == taskId && candidate.Board.OwnerId == ownerId, cancellationToken);

        if (task is null)
        {
            return Results.NotFound();
        }

        db.Tasks.Remove(task);
        await db.SaveChangesAsync(cancellationToken);
        return Results.NoContent();
    }

    private static bool TryParsePriority(string? value, out WorkItemPriority priority)
    {
        priority = WorkItemPriority.Medium;
        if (string.IsNullOrWhiteSpace(value))
        {
            return true;
        }

        return Enum.TryParse(value.Trim(), ignoreCase: true, out priority);
    }

    private static bool TryParseStatus(string? value, out WorkItemStatus status)
    {
        status = WorkItemStatus.Todo;
        if (string.IsNullOrWhiteSpace(value))
        {
            return true;
        }

        return Enum.TryParse(value.Trim(), ignoreCase: true, out status);
    }
}
