using MyBackend.Models;

namespace MyBackend.Repositories.Interafces
{
    public interface ITrainRepository
    {
        Task<List<Train>> GetAllTrainsAsync();
        Task<Train> GetTrainByIdAsync(int id);
        Task AddTrainAsync(Train train);
        Task UpdateTrainAsync(Train train);
        Task DeleteTrainAsync(int id);
    }
}
