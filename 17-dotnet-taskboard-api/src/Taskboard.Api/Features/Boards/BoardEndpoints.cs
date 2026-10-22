using Microsoft.EntityFrameworkCore;
using Taskboard.Api.Data;
using Taskboard.Api.Domain;
using Taskboard.Api.Infrastructure;

namespace Taskboard.Api.Features.Boards;

public sealed record CreateBoardRequest(string Name, string? Description, string? Color);
public sealed record BoardSummaryResponse(Guid Id, string Name, string? Description, string Color, int TaskCount, DateTime CreatedAt);
public sealed record BoardDetailResponse(Guid Id, string Name, string? Description, string Color, DateTime CreatedAt, IReadOnlyList<TaskResponse> Tasks);

public sealed record TaskResponse(Guid Id, string Title, string? Notes, string Status, string Priority, DateTime CreatedAt, DateTime UpdatedAt);

public static class BoardEndpoints
{
    private static readonly string[] AllowedColors = ["indigo", "emerald", "amber", "rose"];

    public static RouteGroupBuilder MapBoardEndpoints(this RouteGroupBuilder group)
    {
        group.MapGet("/", ListBoardsAsync).RequireAuthorization();
        group.MapPost("/", CreateBoardAsync).RequireAuthorization();
        group.MapGet("/{boardId:guid}", GetBoardAsync).RequireAuthorization();
        return group;
    }

    private static async Task<IResult> ListBoardsAsync(
        AppDbContext db,
        HttpContext context,
        CancellationToken cancellationToken)
    {
        var ownerId = context.User.GetUserId();

        var boards = await db.Boards
            .AsNoTracking()
            .Where(board => board.OwnerId == ownerId)
            .OrderBy(board => board.CreatedAt)
            .Select(board => new BoardSummaryResponse(
                board.Id,
                board.Name,
                board.Description,
                board.Color,
                board.Tasks.Count,
                board.CreatedAt))
            .ToListAsync(cancellationToken);

        return Results.Ok(boards);
    }

    private static async Task<IResult> CreateBoardAsync(
        CreateBoardRequest request,
        AppDbContext db,
        HttpContext context,
        CancellationToken cancellationToken)
    {
        var errors = new Dictionary<string, string[]>();
        if (string.IsNullOrWhiteSpace(request.Name) || request.Name.Trim().Length is < 2 or > 80)
        {
            errors[nameof(CreateBoardRequest.Name)] = ["Board name must be between 2 and 80 characters."];
        }

        if (request.Description?.Length > 240)
        {
            errors[nameof(CreateBoardRequest.Description)] = ["Description cannot exceed 240 characters."];
        }

        var color = string.IsNullOrWhiteSpace(request.Color) ? "indigo" : request.Color.Trim().ToLowerInvariant();
        if (!AllowedColors.Contains(color))
        {
            errors[nameof(CreateBoardRequest.Color)] = [$"Color must be one of: {string.Join(", ", AllowedColors)}."];
        }

        if (errors.Count > 0)
        {
            return Results.ValidationProblem(errors);
        }

        var board = new Board
        {
            Name = request.Name.Trim(),
            Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim(),
            Color = color,
            OwnerId = context.User.GetUserId()
        };

        db.Boards.Add(board);
        await db.SaveChangesAsync(cancellationToken);

        return Results.Created($"/api/boards/{board.Id}", new BoardSummaryResponse(board.Id, board.Name, board.Description, board.Color, 0, board.CreatedAt));
    }

    private static async Task<IResult> GetBoardAsync(
        Guid boardId,
        AppDbContext db,
        HttpContext context,
        CancellationToken cancellationToken)
    {
        var ownerId = context.User.GetUserId();

        var board = await db.Boards
            .AsNoTracking()
            .Where(candidate => candidate.Id == boardId && candidate.OwnerId == ownerId)
            .Select(candidate => new BoardDetailResponse(
                candidate.Id,
                candidate.Name,
                candidate.Description,
                candidate.Color,
                candidate.CreatedAt,
                candidate.Tasks
                    .OrderBy(task => task.Status)
                    .ThenBy(task => task.Priority)
                    .Select(task => new TaskResponse(
                        task.Id,
                        task.Title,
                        task.Notes,
                        task.Status.ToString(),
                        task.Priority.ToString(),
                        task.CreatedAt,
                        task.UpdatedAt))
                    .ToList()))
            .FirstOrDefaultAsync(cancellationToken);

        return board is null ? Results.NotFound() : Results.Ok(board);
    }
}
