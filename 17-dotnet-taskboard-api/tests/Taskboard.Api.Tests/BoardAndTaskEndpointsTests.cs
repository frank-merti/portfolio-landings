using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;

namespace Taskboard.Api.Tests;

[Collection("api")]
public sealed class BoardAndTaskEndpointsTests(TaskboardApiFactory factory)
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    [Fact]
    public async Task Create_list_and_read_a_board()
    {
        using var client = factory.CreateClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", await AuthEndpointsTests.RegisterAndGetTokenAsync(client));

        using var created = await client.PostAsJsonAsync("/api/boards", new { name = "Sprint 1", description = "Demo", color = "emerald" });
        Assert.Equal(HttpStatusCode.Created, created.StatusCode);

        var board = await created.Content.ReadFromJsonAsync<JsonElement>(JsonOptions);
        var boardId = board.GetProperty("id").GetGuid();

        using var list = await client.GetAsync("/api/boards");
        Assert.Equal(HttpStatusCode.OK, list.StatusCode);
        var boards = await list.Content.ReadFromJsonAsync<List<JsonElement>>(JsonOptions);
        Assert.NotNull(boards);
        Assert.Contains(boards, item => item.GetProperty("id").GetGuid() == boardId);

        using var detail = await client.GetAsync($"/api/boards/{boardId}");
        Assert.Equal(HttpStatusCode.OK, detail.StatusCode);
    }

    [Fact]
    public async Task Board_creation_validates_the_payload()
    {
        using var client = factory.CreateClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", await AuthEndpointsTests.RegisterAndGetTokenAsync(client));

        using var response = await client.PostAsJsonAsync("/api/boards", new { name = "A", color = "not-a-color" });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Boards_of_other_users_are_not_visible()
    {
        using var firstClient = factory.CreateClient();
        firstClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", await AuthEndpointsTests.RegisterAndGetTokenAsync(firstClient));

        using var created = await firstClient.PostAsJsonAsync("/api/boards", new { name = "Privado" });
        var board = await created.Content.ReadFromJsonAsync<JsonElement>(JsonOptions);
        var boardId = board.GetProperty("id").GetGuid();

        using var secondClient = factory.CreateClient();
        secondClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", await AuthEndpointsTests.RegisterAndGetTokenAsync(secondClient));

        using var response = await secondClient.GetAsync($"/api/boards/{boardId}");
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task Create_update_and_delete_a_task()
    {
        using var client = factory.CreateClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", await AuthEndpointsTests.RegisterAndGetTokenAsync(client));

        using var boardResponse = await client.PostAsJsonAsync("/api/boards", new { name = "Sprint QA" });
        var board = await boardResponse.Content.ReadFromJsonAsync<JsonElement>(JsonOptions);
        var boardId = board.GetProperty("id").GetGuid();

        using var taskResponse = await client.PostAsJsonAsync($"/api/boards/{boardId}/tasks", new
        {
            title = "Escribir documentación",
            notes = "Detalle",
            priority = "High",
            status = "Todo"
        });

        Assert.Equal(HttpStatusCode.Created, taskResponse.StatusCode);
        var task = await taskResponse.Content.ReadFromJsonAsync<JsonElement>(JsonOptions);
        var taskId = task.GetProperty("id").GetGuid();
        Assert.Equal("High", task.GetProperty("priority").GetString());

        using var update = await client.PatchAsJsonAsync($"/api/tasks/{taskId}", new { status = "Done" });
        Assert.Equal(HttpStatusCode.OK, update.StatusCode);
        var updated = await update.Content.ReadFromJsonAsync<JsonElement>(JsonOptions);
        Assert.Equal("Done", updated.GetProperty("status").GetString());

        using var delete = await client.DeleteAsync($"/api/tasks/{taskId}");
        Assert.Equal(HttpStatusCode.NoContent, delete.StatusCode);

        using var missing = await client.PatchAsJsonAsync($"/api/tasks/{taskId}", new { status = "Doing" });
        Assert.Equal(HttpStatusCode.NotFound, missing.StatusCode);
    }

    [Fact]
    public async Task Task_creation_validates_status_and_priority()
    {
        using var client = factory.CreateClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", await AuthEndpointsTests.RegisterAndGetTokenAsync(client));

        using var boardResponse = await client.PostAsJsonAsync("/api/boards", new { name = "Sprint Validación" });
        var board = await boardResponse.Content.ReadFromJsonAsync<JsonElement>(JsonOptions);
        var boardId = board.GetProperty("id").GetGuid();

        using var response = await client.PostAsJsonAsync($"/api/boards/{boardId}/tasks", new
        {
            title = "Tarea",
            priority = "Urgent",
            status = "Archived"
        });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
}
