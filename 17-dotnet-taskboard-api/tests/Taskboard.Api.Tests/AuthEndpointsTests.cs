using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;

namespace Taskboard.Api.Tests;

[Collection("api")]
public sealed class AuthEndpointsTests(TaskboardApiFactory factory)
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    private HttpClient CreateClient() => factory.CreateClient();

    [Fact]
    public async Task Register_returns_a_token_and_creates_the_user()
    {
        using var client = CreateClient();
        using var response = await client.PostAsJsonAsync("/api/auth/register", new
        {
            email = "nuevo@taskboard.dev",
            displayName = "Nuevo Usuario",
            password = "super-secreto-123"
        });

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);

        var payload = await response.Content.ReadFromJsonAsync<JsonElement>();
        Assert.False(string.IsNullOrWhiteSpace(payload.GetProperty("token").GetString()));
        Assert.Equal("nuevo@taskboard.dev", payload.GetProperty("user").GetProperty("email").GetString());
    }

    [Fact]
    public async Task Register_rejects_a_duplicate_email()
    {
        using var client = CreateClient();
        var body = new { email = "duplicado@taskboard.dev", displayName = "Duplicado", password = "super-secreto-123" };

        using var first = await client.PostAsJsonAsync("/api/auth/register", body);
        using var second = await client.PostAsJsonAsync("/api/auth/register", body);

        Assert.Equal(HttpStatusCode.Created, first.StatusCode);
        Assert.Equal(HttpStatusCode.Conflict, second.StatusCode);
    }

    [Fact]
    public async Task Register_validates_the_payload()
    {
        using var client = CreateClient();

        using var response = await client.PostAsJsonAsync("/api/auth/register", new
        {
            email = "not-an-email",
            displayName = "X",
            password = "123"
        });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Login_returns_a_token_for_valid_credentials()
    {
        using var client = CreateClient();
        await client.PostAsJsonAsync("/api/auth/register", new
        {
            email = "login@taskboard.dev",
            displayName = "Login User",
            password = "super-secreto-123"
        });

        using var response = await client.PostAsJsonAsync("/api/auth/login", new
        {
            email = "login@taskboard.dev",
            password = "super-secreto-123"
        });

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var payload = await response.Content.ReadFromJsonAsync<JsonElement>();
        Assert.False(string.IsNullOrWhiteSpace(payload.GetProperty("token").GetString()));
    }

    [Fact]
    public async Task Login_rejects_wrong_credentials()
    {
        using var client = CreateClient();
        await client.PostAsJsonAsync("/api/auth/register", new
        {
            email = "malo@taskboard.dev",
            displayName = "Malo",
            password = "super-secreto-123"
        });

        using var response = await client.PostAsJsonAsync("/api/auth/login", new
        {
            email = "malo@taskboard.dev",
            password = "contrasena-equivocada"
        });

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task Protected_endpoints_require_a_token()
    {
        using var client = CreateClient();

        using var response = await client.GetAsync("/api/boards");

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task Authenticated_requests_are_accepted()
    {
        using var client = CreateClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", await RegisterAndGetTokenAsync(client));

        using var response = await client.GetAsync("/api/me");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    internal static async Task<string> RegisterAndGetTokenAsync(HttpClient client)
    {
        using var response = await client.PostAsJsonAsync("/api/auth/register", new
        {
            email = $"{Guid.NewGuid()}@taskboard.dev",
            displayName = "Usuario Prueba",
            password = "super-secreto-123"
        });

        response.EnsureSuccessStatusCode();
        var payload = await response.Content.ReadFromJsonAsync<JsonElement>(JsonOptions);
        return payload.GetProperty("token").GetString()!;
    }
}
