using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using TaskboardDashboard.Models;

namespace TaskboardDashboard.Services;

public interface ITaskboardApi
{
    Task<AuthResponseDto?> LoginAsync(string email, string password);
    Task<List<BoardDto>> ListBoardsAsync(string token);
    Task<BoardDetailDto?> GetBoardAsync(string token, Guid boardId);
    Task<BoardDto?> CreateBoardAsync(string token, string name, string? description, string? color);
    Task<TaskDto?> CreateTaskAsync(string token, Guid boardId, string title, string? notes, string? priority, string? status);
    Task<TaskDto?> UpdateTaskAsync(string token, Guid taskId, string? title, string? notes, string? priority, string? status);
    Task<bool> DeleteTaskAsync(string token, Guid taskId);
}

public sealed class TaskboardApiClient : ITaskboardApi
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    private readonly HttpClient _http;

    public TaskboardApiClient(IHttpClientFactory factory)
    {
        _http = factory.CreateClient("TaskboardApi");
    }

    public Task<AuthResponseDto?> LoginAsync(string email, string password) =>
        SendAsync<AuthResponseDto?>(token: null, HttpMethod.Post, "/api/auth/login", new LoginRequest(email, password));

    public async Task<List<BoardDto>> ListBoardsAsync(string token)
    {
        var boards = await SendAsync<List<BoardDto>>(token, HttpMethod.Get, "/api/boards");
        return boards ?? new List<BoardDto>();
    }

    public async Task<BoardDetailDto?> GetBoardAsync(string token, Guid boardId) =>
        await SendAsync<BoardDetailDto?>(token, HttpMethod.Get, $"/api/boards/{boardId}");

    public Task<BoardDto?> CreateBoardAsync(string token, string name, string? description, string? color) =>
        SendAsync<BoardDto?>(token, HttpMethod.Post, "/api/boards", new CreateBoardRequest(name, description, color));

    public Task<TaskDto?> CreateTaskAsync(string token, Guid boardId, string title, string? notes, string? priority, string? status) =>
        SendAsync<TaskDto?>(token, HttpMethod.Post, $"/api/boards/{boardId}/tasks", new CreateTaskRequest(title, notes, priority, status));

    public Task<TaskDto?> UpdateTaskAsync(string token, Guid taskId, string? title, string? notes, string? priority, string? status) =>
        SendAsync<TaskDto?>(token, HttpMethod.Patch, $"/api/tasks/{taskId}", new UpdateTaskRequest(title, notes, priority, status));

    public async Task<bool> DeleteTaskAsync(string token, Guid taskId)
    {
        using var response = await SendAsyncRaw(token, HttpMethod.Delete, $"/api/tasks/{taskId}");
        return response.IsSuccessStatusCode;
    }

    private async Task<T?> SendAsync<T>(string? token, HttpMethod method, string url, object? body = null, CancellationToken cancellationToken = default)
    {
        using var request = new HttpRequestMessage(method, url);
        if (token is not null)
        {
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
        }

        if (body is not null)
        {
            request.Content = JsonContent.Create(body);
        }

        using var response = await _http.SendAsync(request, cancellationToken);
        if (!response.IsSuccessStatusCode)
        {
            return default;
        }

        if (response.StatusCode == HttpStatusCode.NoContent)
        {
            return default;
        }

        return await response.Content.ReadFromJsonAsync<T>(JsonOptions, cancellationToken);
    }

    private async Task<HttpResponseMessage> SendAsyncRaw(string? token, HttpMethod method, string url, object? body = null, CancellationToken cancellationToken = default)
    {
        using var request = new HttpRequestMessage(method, url);
        if (token is not null)
        {
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
        }

        if (body is not null)
        {
            request.Content = JsonContent.Create(body);
        }

        return await _http.SendAsync(request, cancellationToken);
    }
}
