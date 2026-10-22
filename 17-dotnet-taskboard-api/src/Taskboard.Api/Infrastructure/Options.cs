namespace Taskboard.Api.Infrastructure;

public sealed class JwtOptions
{
    public const string SectionName = "Jwt";

    public string Issuer { get; set; } = "taskboard-api";
    public string Audience { get; set; } = "taskboard-clients";
    public string SigningKey { get; set; } = string.Empty;
    public int ExpirationHours { get; set; } = 8;
}

public sealed class DatabaseOptions
{
    public const string SectionName = "Database";

    public string ConnectionString { get; set; } = "Data Source=taskboard.db";
}
