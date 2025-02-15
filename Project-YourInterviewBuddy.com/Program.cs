
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Project_YourInterviewBuddy.com.Providers;
using Project_YourInterviewBuddy.com.Repositories;
using System.Reflection;
using System.Runtime;
using Microsoft.Extensions.Configuration;
using Project_YourInterviewBuddy.com.OTPService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy
            .WithOrigins("http://localhost:5174") // React app URL
            .AllowAnyMethod()
            .AllowAnyHeader());
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMemoryCache();  // Add in-memory cache
builder.Services.AddScoped<IOTPService,OTPService>();
builder.Services.AddTransient<IPostRepository, PostRepository>();
builder.Services.AddTransient<IPostProvider, PostProvider>();
builder.Services.AddTransient<IUserRepo, UserRepo>();
builder.Services.AddTransient<IUserProvider, UserProvider>();
IConfiguration configuration = builder.Configuration;
var settingValue = configuration["MySettings:CockroachDb"];
Console.WriteLine($"Setting Value: {settingValue}");
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowReactApp");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
