using MyBackend.Models;
using MyBackend.Repositories;
using MyBackend.Repositories.Interafces;
using MyBackend.Services.Interfaces;
using System.Security.Cryptography;
using System.Text;

namespace MyBackend.Services
{
    public class UserService: IUserService
    {
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }
        public async Task<List<User>> GetAllUsers()
        {
            return await _repository.GetAllUsers();
        }

        public async Task<bool> RegisterUserAsync(RegisterRequest request)
        {
            var existingUser = await _repository.GetByEmailAsync(request.Email);
            if (existingUser != null) return false;

            var hashedPassword = HashPassword(request.Password);

            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                PasswordHash = hashedPassword,
                Role = request.Role
            };

            await _repository.AddUserAsync(user);
            return true;
        }

        public async Task<User?> GetUserAsync(string email)
        {
            return await _repository.GetByEmailAsync(email);
        }

        public async Task<bool> UpdateUserAsync(string email, UpdateUserRequest update)
        {
            var user = await _repository.GetByEmailAsync(email);
            if (user == null) return false;

            if (!string.IsNullOrWhiteSpace(update.Name))
                user.Name = update.Name;

            if (!string.IsNullOrWhiteSpace(update.Role))
                user.Role = update.Role;

            if (!string.IsNullOrWhiteSpace(update.Password))
                user.PasswordHash = HashPassword(update.Password);

            await _repository.UpdateUserAsync(user);
            return true;
        }

        

        public async Task<bool> UpdateUserAsyncByID(int id, User update)
        {
            var user = await _repository.GetByIdAsync(id);
            if (user == null) return false;

            if (!string.IsNullOrWhiteSpace(update.Name))
                user.Name = update.Name;

            if (!string.IsNullOrWhiteSpace(update.Role))
                user.Role = update.Role;

            await _repository.UpdateUserAsync(user);
            return true;
        }

        private static string HashPassword(string password)
        {
            using var sha = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            return Convert.ToBase64String(sha.ComputeHash(bytes));
        }
    }
}
