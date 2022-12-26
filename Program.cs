using InternshipRT.DataBaseContext;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

//service to add serialization and deserialization specially for update operation
builder.Services.AddControllersWithViews().AddNewtonsoftJson(
                 opt => opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);


//add service for databse connection 
builder.Services.AddDbContext<DataCtxt>(optn => optn.UseSqlServer(builder.Configuration.GetConnectionString("ConString")));


builder.Services.AddCors(builder => builder.AddPolicy(
    "Corspolicy", option => option.AllowAnyHeader()
                                  .AllowAnyMethod()
                                  .AllowAnyOrigin()
                                   ));


var app = builder.Build();
app.UseCors("Corspolicy");

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
 
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
