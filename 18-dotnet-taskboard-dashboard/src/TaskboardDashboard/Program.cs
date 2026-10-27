using TaskboardDashboard.Components;
using TaskboardDashboard.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

builder.Services.AddHttpClient<TaskboardApiClient>("TaskboardApi", client =>
{
    client.BaseAddress = new Uri(builder.Configuration["TaskboardApi:BaseUrl"] ?? "http://localhost:5000/");
});
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<ITaskboardApi, TaskboardApiClient>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAntiforgery();

app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();

public partial class Program { }
