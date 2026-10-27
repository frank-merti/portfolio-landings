using TaskboardDashboard.Models;

namespace TaskboardDashboard.Services;

public interface IAuthService
{
    UserDto? User { get; set; }
    string? Token { get; set; }
    Task<bool> LoginAsync(string email, string password);
    Task LogoutAsync();
}

public sealed class AuthService : IAuthService
{
    public UserDto? User { get; set; }
    public string? Token { get; set; }

    private readonly ITaskboardApi _api;

    public AuthService(ITaskboardApi api)
    {
        _api = api;
    }

    public async Task<bool> LoginAsync(string email, string password)
    {
        var response = await _api.LoginAsync(email, password);
        if (response is null)
        {
            return false;
        }

        User = response.User;
        Token = response.Token;
        return true;
    }

    public Task LogoutAsync()
    {
        User = null;
        Token = null;
        return Task.CompletedTask;
    }
}
