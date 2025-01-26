using Microsoft.AspNetCore.Mvc;
using Npgsql;
using Project_YourInterviewBuddy.com.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.Data;

namespace Project_YourInterviewBuddy.com.Repositories
{
    public class UserRepo : IUserRepo
    {
        private readonly IConfiguration _configuration;

        public UserRepo(IConfiguration config)
        {
            _configuration = config;
        }
        public async Task<Boolean> createUser(Users user)
        {
            var connectionString = _configuration["MySettings:NeonDb"];
            using (var conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();
                var query = @"
                        INSERT INTO users (email, password, role, is_active, created_at, updated_at)
                        VALUES (@Email, @Password, @Role, @is_active, NOW(), NOW());
                    ";

                using (var command = new NpgsqlCommand(query, conn))
                {
                    command.Parameters.AddWithValue("@Email", user.Email);
                    command.Parameters.AddWithValue("@Password", user.Password);
                    command.Parameters.AddWithValue("@Role", user.Role);
                    command.Parameters.AddWithValue("@is_active", user.is_active);

                    var rowsAffected = await command.ExecuteNonQueryAsync();
                    return true;
                }
            }
        }

        public async Task<bool> Login(InputUser user)
        {
            var connectionString = _configuration["MySettings:NeonDb"];
            using (var conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();

                var query = "SELECT COUNT(*) FROM users WHERE email = @Email AND password = @Password;";
                using var command = new NpgsqlCommand(query, conn);
                command.Parameters.AddWithValue("@Email", user.Email);
                command.Parameters.AddWithValue("@Password", user.Password);

                // Execute the query and retrieve the count
                var count = (long)await command.ExecuteScalarAsync();

                return count > 0;
            }
        }
    }
}
