using Microsoft.EntityFrameworkCore;
using MyBackend.Models;

namespace MyBackend.Data
{
    public class DatabaseContext: DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Train> Trains { get; set; }

        public DbSet<Vagon> Vagons { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Fluent API relationships
            modelBuilder.Entity<Train>()
                .HasMany(t => t.Vagoane)
                .WithOne(v => v.Train)
                .HasForeignKey(v => v.TrainId);
        }

    }
}
