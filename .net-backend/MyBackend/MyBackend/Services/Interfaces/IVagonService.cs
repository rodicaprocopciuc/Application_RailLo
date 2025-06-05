using MyBackend.Models;
using MyBackend.Repositories.Interafces;

namespace MyBackend.Services.Interfaces
{
    public interface IVagonService
    {

         public Task<List<Vagon>> GetAllAsync();

        public Task<Vagon?> GetByIdAsync(long id);

        public Task<Vagon> AddAsync(Vagon vagon);

        public Task<Vagon> UpdateAsync(Vagon vagon);

        public Task DeleteAsync(long id);
    }
}
