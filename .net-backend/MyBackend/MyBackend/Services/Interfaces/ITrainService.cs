using MyBackend.Models;

namespace MyBackend.Services.Interfaces
{
    public interface ITrainService
    {
        Task<List<Train>> GetAllTrainsAsync();
        Task<Train> GetTrainByIdAsync(int id);
        Task AddTrainAsync(Train train);
        Task UpdateTrainAsync(Train train);
        Task DeleteTrainAsync(int id);
    }
}
