using MyBackend.Models;

namespace MyBackend.Services.Interfaces
{
    public interface IUserService
    {
        Task<bool> RegisterUserAsync(RegisterRequest request);
        Task<User?> GetUserAsync(string email);
        Task<bool> UpdateUserAsync(string email, UpdateUserRequest update);

        Task<bool> UpdateUserAsyncByID(int id, User update);
        Task<List<User>> GetAllUsers();
    }
}
