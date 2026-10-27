using Bunit;
using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.DependencyInjection;
using TaskboardDashboard.Components;
using TaskboardDashboard.Components.Pages;
using TaskboardDashboard.Models;
using TaskboardDashboard.Services;
using Xunit;

namespace TaskboardDashboard.Tests;

internal sealed class FakeTaskboardApi : ITaskboardApi
{
    public Task<AuthResponseDto?> LoginAsync(string email, string password) => Task.FromResult<AuthResponseDto?>(null);

    public Task<List<BoardDto>> ListBoardsAsync(string token) => Task.FromResult(new List<BoardDto>());

    public Task<BoardDetailDto?> GetBoardAsync(string token, Guid boardId) => Task.FromResult<BoardDetailDto?>(null);

    public Task<BoardDto?> CreateBoardAsync(string token, string name, string? description, string? color) => Task.FromResult<BoardDto?>(null);

    public Task<TaskDto?> CreateTaskAsync(string token, Guid boardId, string title, string? notes, string? priority, string? status) => Task.FromResult<TaskDto?>(null);

    public Task<TaskDto?> UpdateTaskAsync(string token, Guid taskId, string? title, string? notes, string? priority, string? status) => Task.FromResult<TaskDto?>(null);

    public Task<bool> DeleteTaskAsync(string token, Guid taskId) => Task.FromResult(false);
}

public class TaskCardTests : TestContext
{
    [Fact]
    public void TaskCard_renders_title_priority_and_status()
    {
        var task = new TaskDto(Guid.NewGuid(), "Escribir documentación", "Detalle", "Doing", "High", DateTime.UtcNow, DateTime.UtcNow);

        var cut = RenderComponent<TaskCard>(parameters => parameters
            .Add(p => p.Task, task));

        Assert.Contains("Escribir documentación", cut.Markup);
        Assert.Contains("High", cut.Markup);
        Assert.Contains("Estado: Doing", cut.Markup);
    }

    [Fact]
    public void TaskCard_renders_notes_when_present()
    {
        var task = new TaskDto(Guid.NewGuid(), "Revisar PR", "Falta el test del caso borde", "Todo", "Low", DateTime.UtcNow, DateTime.UtcNow);

        var cut = RenderComponent<TaskCard>(parameters => parameters
            .Add(p => p.Task, task));

        Assert.Contains("Falta el test del caso borde", cut.Markup);
    }
}

public class BoardCardTests : TestContext
{
    [Fact]
    public void BoardCard_renders_name_and_task_count()
    {
        var board = new BoardDto(Guid.NewGuid(), "Sprint 1", "Demo", "emerald", 3, DateTimeOffset.UtcNow);

        var cut = RenderComponent<BoardCard>(parameters => parameters
            .Add(p => p.Board, board));

        Assert.Contains("Sprint 1", cut.Markup);
    }
}

public class LoginTests : TestContext
{
    private readonly AuthService _auth = new(new FakeTaskboardApi());

    [Fact]
    public void Login_renders_email_password_and_submit()
    {
        Services.AddSingleton<AuthService>(_auth);
        Services.AddSingleton<Microsoft.AspNetCore.Components.NavigationManager>(new StubNavigationManager());

        var cut = RenderComponent<Login>();

        Assert.Contains("Email", cut.Markup);
        Assert.Contains("Password", cut.Markup);
        Assert.Contains("Entrar", cut.Markup);
    }

    private sealed class StubNavigationManager : Microsoft.AspNetCore.Components.NavigationManager
    {
        public StubNavigationManager()
        {
            Initialize("http://localhost/", "http://localhost/");
        }

        protected override void NavigateToCore(string uri, bool forceLoad)
        {
        }
    }
}

public class BoardsTests : TestContext
{
    private readonly AuthService _auth = new(new FakeTaskboardApi());

    [Fact]
    public void Boards_shows_login_prompt_when_not_authenticated()
    {
        Services.AddSingleton<AuthService>(_auth);
        Services.AddSingleton<ITaskboardApi>(new FakeTaskboardApi());
        Services.AddSingleton<Microsoft.AspNetCore.Components.NavigationManager>(new StubNavigationManager());

        var cut = RenderComponent<Boards>();

        Assert.Contains("Debes iniciar sesión", cut.Markup);
    }

    [Fact]
    public void Boards_shows_empty_state_when_there_are_no_boards()
    {
        _auth.User = new UserDto(Guid.NewGuid(), "tester@test.dev", "Tester");
        Services.AddSingleton<AuthService>(_auth);
        Services.AddSingleton<ITaskboardApi>(new FakeTaskboardApi());
        Services.AddSingleton<Microsoft.AspNetCore.Components.NavigationManager>(new StubNavigationManager());

        var cut = RenderComponent<Boards>();

        Assert.Contains("Aún no tienes tableros.", cut.Markup);
    }

    private sealed class StubNavigationManager : Microsoft.AspNetCore.Components.NavigationManager
    {
        public StubNavigationManager()
        {
            Initialize("http://localhost/", "http://localhost/");
        }

        protected override void NavigateToCore(string uri, bool forceLoad)
        {
        }
    }
}
