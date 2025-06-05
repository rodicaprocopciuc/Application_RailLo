using MyBackend.Models;

namespace MyBackend.Repositories.Interafces
{
    public interface IVagonRepository
    {
        Task<List<Vagon>> GetAllAsync();
        Task<Vagon?> GetByIdAsync(long id);
        Task<Vagon> AddAsync(Vagon vagon);
        Task<Vagon> UpdateAsync(Vagon vagon);
        Task DeleteAsync(long id);
    }
}
