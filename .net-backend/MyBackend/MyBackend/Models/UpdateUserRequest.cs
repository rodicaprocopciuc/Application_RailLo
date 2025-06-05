namespace MyBackend.Models
{

    public class UpdateUserRequest
    {
        public string? Name { get; set; }
        public string? Role { get; set; }
        public string? Password { get; set; }
    }
}
