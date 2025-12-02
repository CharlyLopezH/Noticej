using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using NoticeAPI;
using NoticeAPI.Endpoints;
using NoticeAPI.Repositorios;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var ambiente = builder.Configuration.GetValue<string>("ambiente");
var frontend_url = builder.Configuration.GetValue<string>("frontend_url") ?? "http://localhost:5173";



//Servicios
// Configuración correcta del DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(opciones =>
{
    opciones.AddPolicy("CorsPolicy", policy =>
    {
        var frontendURL = builder.Configuration.GetValue<string>("frontend_url");
        policy.WithOrigins(frontend_url)
          .AllowAnyHeader()
          .AllowAnyMethod()
          .WithExposedHeaders(new string[] { "cantidadtotalregistros" })
          .AllowCredentials(); // Si usas cookies/auth

        // Para desarrollo, puedes permitir varios orígenes:
        if (builder.Environment.IsDevelopment())
        {
            policy.WithOrigins(
                frontend_url,
                "http://localhost:5173",
                "https://localhost:5173",
                "http://127.0.0.1:5173"
            );
        }
    });
});

builder.Services.AddOutputCache();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Servicio de Automaper
builder.Services.AddAutoMapper(typeof(Program));

//Servicios de Seguridad para protección de endpoints
builder.Services.AddAuthentication().AddJwtBearer();
builder.Services.AddAuthorization();

//Repositorios
builder.Services.AddScoped<IRepositorioNotificaciones, RepositorioNotificaciones>();
builder.Services.AddScoped<IRepositorioEntes, RepositorioEntes>();
builder.Services.AddHttpContextAccessor();

//Fin de la configuración de servicios

var app = builder.Build();

//Sección de middlewares
app.UseHttpsRedirection();
app.UseRouting();


//Llamado a los servicios


app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("CorsPolicy");
app.UseOutputCache();
app.UseAuthorization();
//app.UseAuthentication();

//Uso de la autenticación y autorización


app.MapGet("/test-cors", () => "CORS funciona!").RequireCors("CorsPolicy");
//app.MapGet("/", () => "Hello World! ").RequireCors("CorsPolicy");
app.MapGroup("/entes").MapEntes();
app.MapGroup("/notificaciones").MapNotificaciones();
app.Run();
