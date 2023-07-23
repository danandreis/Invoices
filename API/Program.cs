using API.Middleware;
using Application.Core;
using Application.Customers;
using Domain;
using FluentValidation;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(opt =>
{

    opt.AddPolicy("CorsPolicy", policy =>
    {

        policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");

    });
});

builder.Services.AddMediatR(typeof(List.Handler));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(opt =>
{

    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));

});


builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<Customer>();

builder.Services.AddControllers().AddNewtonsoftJson();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");
app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();

var services = scope.ServiceProvider;

try
{

    var context = services.GetRequiredService<DataContext>();
    context.Database.Migrate();
    await Seed.SeedCustomers(context);
    await Seed.SeedProducts(context);


}
catch (Exception ex)
{

    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "A intervenit o eroare la crearea bazei de date");
}

app.Run();
