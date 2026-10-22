using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Taskboard.Api.Data;

namespace Taskboard.Api.Tests;

public sealed class TaskboardApiFactory : WebApplicationFactory<Program>
{
    private const string ConnectionString = "DataSource=taskboard-tests;Mode=Memory;Cache=Shared";

    private readonly SqliteConnection _keepAliveConnection;

    public TaskboardApiFactory()
    {
        // The connection stays open so the in-memory database survives between requests.
        _keepAliveConnection = new SqliteConnection(ConnectionString);
        _keepAliveConnection.Open();
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Development");
        builder.ConfigureAppConfiguration((_, configuration) =>
        {
            configuration.AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["ConnectionStrings:Taskboard"] = ConnectionString,
                ["Jwt:SigningKey"] = "test-signing-key-0123456789-0123456789-0123456789"
            });
        });

        builder.ConfigureServices(services =>
        {
            var descriptor = services.SingleOrDefault(
                service => service.ServiceType == typeof(DbContextOptions<AppDbContext>));

            if (descriptor is not null)
            {
                services.Remove(descriptor);
            }

            services.AddDbContext<AppDbContext>(options => options.UseSqlite(ConnectionString));
        });
    }

    protected override void Dispose(bool disposing)
    {
        base.Dispose(disposing);

        if (disposing)
        {
            _keepAliveConnection.Dispose();
        }
    }
}

[CollectionDefinition("api")]
public sealed class ApiCollection : ICollectionFixture<TaskboardApiFactory>;
