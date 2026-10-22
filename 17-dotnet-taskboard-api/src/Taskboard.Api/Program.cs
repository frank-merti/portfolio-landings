using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Taskboard.Api.Data;
using Taskboard.Api.Features.Auth;
using Taskboard.Api.Features.Boards;
using Taskboard.Api.Features.Tasks;
using Taskboard.Api.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection(JwtOptions.SectionName));
builder.Services.Configure<DatabaseOptions>(builder.Configuration.GetSection(DatabaseOptions.SectionName));

var connectionString = builder.Configuration.GetConnectionString("Taskboard")
    ?? builder.Configuration["Database:ConnectionString"]
    ?? "Data Source=taskboard.db";

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite(connectionString));

var jwtOptions = builder.Configuration.GetSection(JwtOptions.SectionName).Get<JwtOptions>() ?? new JwtOptions();
var signingKey = jwtOptions.SigningKey;

if (string.IsNullOrWhiteSpace(signingKey))
{
    if (!builder.Environment.IsDevelopment())
    {
        throw new InvalidOperationException(
            "Jwt:SigningKey is required outside development. Set it with the Jwt__SigningKey environment variable.");
    }

    signingKey = "development-only-signing-key-do-not-use-in-production-0123456789";
}

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = jwtOptions.Issuer,
            ValidateAudience = true,
            ValidAudience = jwtOptions.Audience,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey)),
            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromSeconds(30)
        };

        // Resolved on every request so a rotated key is picked up without a restart.
        options.TokenValidationParameters.IssuerSigningKeyResolver = (_, _, _, _) =>
        {
            var currentKey = builder.Configuration["Jwt:SigningKey"];
            if (string.IsNullOrWhiteSpace(currentKey))
            {
                currentKey = signingKey;
            }

            return new SecurityKey[] { new SymmetricSecurityKey(Encoding.UTF8.GetBytes(currentKey)) };
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddSingleton<IPasswordHasher, Pbkdf2PasswordHasher>();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddProblemDetails();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new() { Title = "Taskboard API", Version = "v1", Description = "REST API for boards and tasks." });
    options.AddSecurityDefinition("Bearer", new()
    {
        Name = "Authorization",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        Description = "Paste the token returned by /api/auth/login."
    });
    options.AddSecurityRequirement(new()
    {
        [new Microsoft.OpenApi.Models.OpenApiSecurityScheme
        {
            Reference = new Microsoft.OpenApi.Models.OpenApiReference
            {
                Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                Id = "Bearer"
            }
        }] = Array.Empty<string>()
    });
});

var app = builder.Build();

if (string.IsNullOrWhiteSpace(builder.Configuration["Jwt:SigningKey"]))
{
    app.Logger.LogWarning("Using a development signing key. Configure Jwt__SigningKey before deploying.");
}

app.UseExceptionHandler();
app.UseStatusCodePages();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));
app.MapGet("/api/me", (HttpContext context) => Results.Ok(new { id = context.User.GetUserId() })).RequireAuthorization();

app.MapGroup("/api/auth").MapAuthEndpoints();
app.MapGroup("/api/boards").MapBoardEndpoints();
app.MapGroup("/api").MapTaskEndpoints();

await using (var scope = app.Services.CreateAsyncScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await db.Database.EnsureCreatedAsync();
}

app.Run();

public partial class Program;
