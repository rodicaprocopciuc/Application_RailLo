using Microsoft.AspNetCore.Mvc;
using MyBackend.Models;
using MyBackend.Services;
using MyBackend.Services.Interfaces;

namespace MyBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userStore)
        {
            _userService = userStore;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _userService.GetAllUsers();
            return Ok(users);
        }

        [HttpGet("{email}")]
        public async Task<IActionResult> GetUser(string email)
        {
            var user = await _userService.GetUserAsync(email);
            if (user == null)
                return NotFound("User not found");

            return Ok(new
            {
                user.Name,
                user.Email,
                user.Role
            });
        }

        [HttpPut("{email}")]
        public async Task<IActionResult> UpdateUser(string email, [FromBody] UpdateUserRequest update)
        {
            var success = await _userService.UpdateUserAsync(email, update);
            if (!success)
                return NotFound("User not found");

            var response = new
            {
                message = "User updated successfully"
            };
            return Ok(response);
        }

        [HttpPut("id/{id}")]
        public async Task<IActionResult> UpdateUserById(int id, [FromBody] User update)
        {
            var success = await _userService.UpdateUserAsyncByID(id, update);
            if (!success)
                return NotFound("User not found");

            var response = new
            {
                message = "User updated successfully"
            };
            return Ok(response);
        }
    }
}
