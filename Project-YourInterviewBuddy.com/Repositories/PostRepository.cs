using Microsoft.AspNetCore.Mvc;
using Npgsql;
using Project_YourInterviewBuddy.com.Data;
using Project_YourInterviewBuddy.com.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Project_YourInterviewBuddy.com.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly IConfiguration _configuration;

        public PostRepository(IConfiguration config)
        {
            _configuration = config;
        }
        public IActionResult CreatePost(Post inputPost)
        {
            try
            {
                var result = new Object();
                var connectionString = _configuration["MySettings:CockroachDb"];
                using (var conn = new NpgsqlConnection(connectionString))
                {
                    conn.Open();
                    using var command = new NpgsqlCommand(Constants.INSERT_POST, conn);
                    command.Parameters.AddWithValue("@Title", inputPost.Title ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@Description", inputPost.Description ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@Author", inputPost.Author ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@Createday", inputPost.Createday);
                    command.Parameters.AddWithValue("@Updateday", inputPost.Updateday);
                    command.Parameters.AddWithValue("@lastUpdatedBy", inputPost.lastUpdatedBy ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@likes", inputPost.likes);
                    command.Parameters.AddWithValue("@tags", inputPost.tags);
                    // Execute the query
                    command.ExecuteNonQuery();
                    Console.WriteLine("Data inserted successfully.");

                }


                return (IActionResult)result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }

        }

        public List<Post> GetPost()
        {
            List<Post> result = new List<Post>();
            var connectionString = _configuration["MySettings:CockroachDb"];
            using (var conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();
                using var command = new NpgsqlCommand(Constants.GET_POST, conn);
                using (NpgsqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Console.WriteLine(reader["Id"]);
                        Post posts = new Post();
                        posts.Id = reader["Id"] != DBNull.Value ? Convert.ToInt64(reader["Id"]) : 0;
                        posts.Title = reader["Title"]?.ToString() ?? string.Empty;
                        posts.Description = reader["Description"]?.ToString() ?? string.Empty;
                        posts.Author = reader["Author"]?.ToString() ?? string.Empty;
                        posts.Createday = Convert.ToDateTime(reader["Createday"]);
                        posts.Updateday = Convert.ToDateTime(reader["Updateday"]);
                        posts.likes = reader["likes"] != DBNull.Value ? Convert.ToInt32(reader["likes"]) : 0;
                        posts.tags = reader["tags"] != DBNull.Value ? Convert.ToInt32(reader["tags"]) : 0;
                        result.Add(posts);
                    }
                }
                
                Console.WriteLine("Data fetched successfully.");
                return result;
            }

        }
    }
}
