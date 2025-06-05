using MyBackend.Models;

namespace MyBackend.Repositories.Interafces
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllUsers();
        Task<User?> GetByEmailAsync(string email);

        Task<User?> GetByIdAsync(int id);
        Task AddUserAsync(User user);

        Task UpdateUserAsync(User user);
    }
}
