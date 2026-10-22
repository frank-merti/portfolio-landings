using Microsoft.EntityFrameworkCore;
using Taskboard.Api.Domain;

namespace Taskboard.Api.Data;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Board> Boards => Set<Board>();
    public DbSet<BoardTask> Tasks => Set<BoardTask>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(user => user.Id);
            entity.HasIndex(user => user.Email).IsUnique();
            entity.Property(user => user.Email).HasMaxLength(180);
            entity.Property(user => user.DisplayName).HasMaxLength(80);
        });

        modelBuilder.Entity<Board>(entity =>
        {
            entity.HasKey(board => board.Id);
            entity.Property(board => board.Name).HasMaxLength(80);
            entity.Property(board => board.Description).HasMaxLength(240);
            entity.Property(board => board.Color).HasMaxLength(20);
            entity.HasIndex(board => board.OwnerId);
            entity.HasOne(board => board.Owner)
                .WithMany(user => user.Boards)
                .HasForeignKey(board => board.OwnerId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<BoardTask>(entity =>
        {
            entity.HasKey(task => task.Id);
            entity.Property(task => task.Title).HasMaxLength(120);
            entity.Property(task => task.Notes).HasMaxLength(500);
            entity.HasIndex(task => task.BoardId);
            entity.HasOne(task => task.Board)
                .WithMany(board => board.Tasks)
                .HasForeignKey(task => task.BoardId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
