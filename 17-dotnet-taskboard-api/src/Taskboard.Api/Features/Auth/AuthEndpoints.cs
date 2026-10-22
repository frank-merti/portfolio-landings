using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using Taskboard.Api.Data;
using Taskboard.Api.Domain;
using Taskboard.Api.Infrastructure;

namespace Taskboard.Api.Features.Auth;

public sealed record RegisterRequest(string Email, string DisplayName, string Password);
public sealed record LoginRequest(string Email, string Password);
public sealed record UserResponse(Guid Id, string Email, string DisplayName);
public sealed record AuthResponse(string Token, UserResponse User);

public static partial class AuthEndpoints
{
    public static RouteGroupBuilder MapAuthEndpoints(this RouteGroupBuilder group)
    {
        group.MapPost("/register", RegisterAsync).AllowAnonymous();
        group.MapPost("/login", LoginAsync).AllowAnonymous();
        return group;
    }

    private static async Task<IResult> RegisterAsync(
        RegisterRequest request,
        AppDbContext db,
        IPasswordHasher passwordHasher,
        IJwtTokenService tokenService,
        CancellationToken cancellationToken)
    {
        var errors = Validate(request.Email, request.DisplayName, request.Password, requireDisplayName: true);
        if (errors.Count > 0)
        {
            return Results.ValidationProblem(errors);
        }

        var email = request.Email.Trim().ToLowerInvariant();
        var existingUser = await db.Users.AnyAsync(user => user.Email == email, cancellationToken);
        if (existingUser)
        {
            return Results.Conflict(new { error = "email_already_registered" });
        }

        var user = new User
        {
            Email = email,
            DisplayName = request.DisplayName.Trim(),
            PasswordHash = passwordHasher.Hash(request.Password)
        };

        db.Users.Add(user);
        await db.SaveChangesAsync(cancellationToken);

        var response = new AuthResponse(
            tokenService.CreateToken(user),
            new UserResponse(user.Id, user.Email, user.DisplayName));

        return Results.Created($"/api/users/{user.Id}", response);
    }

    private static async Task<IResult> LoginAsync(
        LoginRequest request,
        AppDbContext db,
        IPasswordHasher passwordHasher,
        IJwtTokenService tokenService,
        CancellationToken cancellationToken)
    {
        var errors = Validate(request.Email, string.Empty, request.Password, requireDisplayName: false);
        if (errors.Count > 0)
        {
            return Results.ValidationProblem(errors);
        }

        var email = request.Email.Trim().ToLowerInvariant();
        var user = await db.Users.FirstOrDefaultAsync(candidate => candidate.Email == email, cancellationToken);

        if (user is null || !passwordHasher.Verify(request.Password, user.PasswordHash))
        {
            return Results.Json(new { error = "invalid_credentials" }, statusCode: StatusCodes.Status401Unauthorized);
        }

        var response = new AuthResponse(
            tokenService.CreateToken(user),
            new UserResponse(user.Id, user.Email, user.DisplayName));

        return Results.Ok(response);
    }

    private static Dictionary<string, string[]> Validate(string email, string displayName, string password, bool requireDisplayName)
    {
        var errors = new Dictionary<string, string[]>();

        if (string.IsNullOrWhiteSpace(email) || !EmailPattern().IsMatch(email))
        {
            errors[nameof(RegisterRequest.Email)] = ["A valid email address is required."];
        }

        if (requireDisplayName && (string.IsNullOrWhiteSpace(displayName) || displayName.Trim().Length is < 2 or > 80))
        {
            errors[nameof(RegisterRequest.DisplayName)] = ["Display name must be between 2 and 80 characters."];
        }

        if (string.IsNullOrWhiteSpace(password) || password.Length < 8)
        {
            errors[nameof(RegisterRequest.Password)] = ["Password must be at least 8 characters long."];
        }

        return errors;
    }

    [GeneratedRegex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", RegexOptions.CultureInvariant)]
    private static partial Regex EmailPattern();
}
