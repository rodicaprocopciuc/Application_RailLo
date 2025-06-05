using Microsoft.EntityFrameworkCore;
using MyBackend.Data;
using MyBackend.Models;
using MyBackend.Repositories.Interafces;

namespace MyBackend.Repositories
{
    public class TrainRepository: ITrainRepository
    {
        private readonly DatabaseContext _context;

        public TrainRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<List<Train>> GetAllTrainsAsync()
        {
            return await _context.Trains.ToListAsync();
        }

        public async Task<Train> GetTrainByIdAsync(int id)
        {
            return await _context.Trains.FindAsync(id);
        }

        public async Task AddTrainAsync(Train train)
        {
            await _context.Trains.AddAsync(train);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateTrainAsync(Train train)
        {
            _context.Trains.Update(train);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTrainAsync(int id)
        {
            var train = await _context.Trains.FindAsync(id);
            if (train != null)
            {
                _context.Trains.Remove(train);
                await _context.SaveChangesAsync();
            }
        }

    }
}
