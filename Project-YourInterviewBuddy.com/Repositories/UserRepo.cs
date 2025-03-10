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
            var connectionString = _configuration["MySettings:CockroachDb"];
            using (var conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();
                var query = @"
                        INSERT INTO users (email, password, role, is_active, created_at, updated_at,name)
                        VALUES (@Email, @Password, @Role, @is_active, NOW(), NOW(),@Name);
                    ";

                using (var command = new NpgsqlCommand(query, conn))
                {
                    command.Parameters.AddWithValue("@Email", user.Email);
                    command.Parameters.AddWithValue("@Password", user.Password);
                    command.Parameters.AddWithValue("@Role", user.Role);
                    command.Parameters.AddWithValue("@is_active", user.is_active);
                    command.Parameters.AddWithValue("@Name", user.Name);
                    var rowsAffected = await command.ExecuteNonQueryAsync();
                    return true;
                }
            }
        }

        public UserOutput? Login(LoginModal user)
        {
            // this is not working
            UserOutput userOutput = new UserOutput();
            if (user == null || string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password))
            {
                throw new ArgumentException("User credentials cannot be null or empty");
            }

            var connectionString = _configuration["MySettings:CockroachDb"];

            using (var conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();

                var query = "SELECT name FROM users WHERE email = @Email and password =@password;";
                using var command = new NpgsqlCommand(query, conn);
                command.Parameters.AddWithValue("@Email", user.Email);
                command.Parameters.AddWithValue("@password", user.Password);
                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read()) // Ensure there's at least one row
                    {
                        string name = reader["name"].ToString();
                        userOutput.Name = name;
                        userOutput.Email = user.Email;
                        return userOutput;
                    }
                    else
                    {
                        // Handle the case where no user is found
                        throw new UnauthorizedAccessException("Invalid email or password.");
                    }
                }
            }

        }
    }
}
