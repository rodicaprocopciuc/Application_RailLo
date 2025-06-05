using MyBackend.Models;
using MyBackend.Repositories.Interafces;
using MyBackend.Services.Interfaces;

namespace MyBackend.Services
{
    public class TrainService: ITrainService
    {
        private readonly ITrainRepository _trainRepository;

        public TrainService(ITrainRepository trainRepository)
        {
            _trainRepository = trainRepository;
        }

        public async Task<List<Train>> GetAllTrainsAsync()
        {
            return await _trainRepository.GetAllTrainsAsync();
        }

        public async Task<Train> GetTrainByIdAsync(int id)
        {
            return await _trainRepository.GetTrainByIdAsync(id);
        }

        public async Task AddTrainAsync(Train train)
        {
            await _trainRepository.AddTrainAsync(train);
        }

        public async Task UpdateTrainAsync(Train train)
        {
            await _trainRepository.UpdateTrainAsync(train);
        }

        public async Task DeleteTrainAsync(int id)
        {
            await _trainRepository.DeleteTrainAsync(id);
        }

    }
}
