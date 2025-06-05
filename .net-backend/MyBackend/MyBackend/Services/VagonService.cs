using MyBackend.Models;
using MyBackend.Repositories.Interafces;
using MyBackend.Services.Interfaces;

namespace MyBackend.Services
{
    public class VagonService: IVagonService
    {
        private readonly IVagonRepository _repository;

        public VagonService(IVagonRepository repository)
        {
            _repository = repository;
        }

        public Task<List<Vagon>> GetAllAsync() => _repository.GetAllAsync();

        public Task<Vagon?> GetByIdAsync(long id) => _repository.GetByIdAsync(id);

        public Task<Vagon> AddAsync(Vagon vagon) => _repository.AddAsync(vagon);

        public Task<Vagon> UpdateAsync(Vagon vagon) => _repository.UpdateAsync(vagon);

        public Task DeleteAsync(long id) => _repository.DeleteAsync(id);
    }
}
