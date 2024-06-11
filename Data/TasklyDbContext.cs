using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Taskly.Models;
using Microsoft.AspNetCore.Identity;

namespace Taskly.Data;
public class TasklyDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
    public DbSet<TaskObj> Tasks { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<TaskCategories> TaskCategories { get; set; }
    public DbSet<UserProfile> UserProfiles { get; set; }

    public TasklyDbContext(DbContextOptions<TasklyDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "AngRod",
            Email = "AngRod@icloud.com",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });
        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916bb6g",
            UserName = "JRamirez",
            Email = "Jramirez@icloud.com",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Angie",
            LastName = "Rodriguez",
            Address = "101 Main Street",
        });
         modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 2,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916bb6g",
            FirstName = "Jose",
            LastName = "Ramirez",
            Address = "Lothric way",
        });

        modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, CategoryName = "Work" },
                new Category { Id = 2, CategoryName = "Personal" },
                new Category { Id = 3, CategoryName = "Hobby" }
            );
        modelBuilder.Entity<TaskObj>().HasData(
               new TaskObj { Id = 1, UserId = 1, Title = "Develop Landing Page", Description = "Create a responsive landing page for the website.", Date = DateTime.Now, CompletedTask = false, IsImportantTask = true },
               new TaskObj { Id = 2, UserId = 1, Title = "Fix Backend Bug", Description = "Resolve the issue with the user authentication module.", Date = DateTime.Now, CompletedTask = false, IsImportantTask = false },
               new TaskObj { Id = 3, UserId = 1, Title = "Nashville Marathon", Description = "Pick up friend at 7am to get to the marathon on time", Date = DateTime.Now, CompletedTask = false, IsImportantTask = true },
               new TaskObj { Id = 4, UserId = 1, Title = "Dogs", Description = "Take Dogs to groomers at 11am", Date = DateTime.Now, CompletedTask = true, IsImportantTask = false },
               new TaskObj { Id = 5, UserId = 1, Title = "Pick up son", Description = "Pick up son from moms house", Date = DateTime.Now, CompletedTask = false, IsImportantTask = true },
               new TaskObj { Id = 6, UserId = 2, Title = "Clean the House", Description = "Vacuum and dust all rooms.", Date = DateTime.Now, CompletedTask = false, IsImportantTask = false },
               new TaskObj { Id = 7, UserId = 2, Title = "Grocery Shopping", Description = "Buy groceries for the week.", Date = DateTime.Now, CompletedTask = false, IsImportantTask = true },
               new TaskObj { Id = 8, UserId = 2, Title = "Son's Homework", Description = "Help son with his math homework.", Date = DateTime.Now, CompletedTask = true, IsImportantTask = false },
               new TaskObj { Id = 9, UserId = 1, Title = "Family Dinner", Description = "Prepare a special family dinner.", Date = DateTime.Now, CompletedTask = false, IsImportantTask = true },
               new TaskObj { Id = 10, UserId = 2, Title = "Work Emails ", Description = "Respond to work emails", Date = DateTime.Now, CompletedTask = true, IsImportantTask = true },
               new TaskObj { Id = 11, UserId = 2, Title = "Laundry", Description = "Do the laundry for the week.", Date = DateTime.Now, CompletedTask = false, IsImportantTask = true },
               new TaskObj { Id = 12, UserId = 2, Title = "Morning Run", Description = "Meet Jose at Avenue for morning run", Date = DateTime.Now, CompletedTask = true, IsImportantTask = false }
           );
        modelBuilder.Entity<TaskCategories>().HasData(
           new TaskCategories { CategoryId = 1, TaskId = 1 },
           new TaskCategories { CategoryId = 1, TaskId = 2 },
           new TaskCategories { CategoryId = 3, TaskId = 3 },
           new TaskCategories { CategoryId = 2, TaskId = 4 },
           new TaskCategories { CategoryId = 2, TaskId = 5 },
           new TaskCategories { CategoryId = 2, TaskId = 6 },
           new TaskCategories { CategoryId = 2, TaskId = 7 },
           new TaskCategories { CategoryId = 2, TaskId = 8 },
           new TaskCategories { CategoryId = 2, TaskId = 9 },
           new TaskCategories { CategoryId = 1, TaskId = 10 },
           new TaskCategories { CategoryId = 2, TaskId = 11 },
           new TaskCategories { CategoryId = 3, TaskId = 12 }
       );

        modelBuilder.Entity<TaskCategories>().HasKey(tc => new { tc.TaskId, tc.CategoryId });

        // Configure the relationships
        modelBuilder.Entity<TaskCategories>()
            .HasOne(tc => tc.TaskObj)
            .WithMany(t => t.TaskCategories)
            .HasForeignKey(tc => tc.TaskId);

        modelBuilder.Entity<TaskCategories>()
            .HasOne(tc => tc.Category)
            .WithMany(c => c.TaskCategories)
            .HasForeignKey(tc => tc.CategoryId);

    }

}