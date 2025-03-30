namespace Project_YourInterviewBuddy.com.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using Npgsql;
    using Project_YourInterviewBuddy.com.Models;

    public class InterviewQuestionRepository: IInterviewQuestionRepository
    {
        private readonly IConfiguration _configuration;

        public InterviewQuestionRepository(IConfiguration connectionString)
        {
            _configuration = connectionString;
        }

        // Method to fetch all interview questions
        public List<InterviewQuestionDto> GetInterviewQuestions()
        {
            var interviewQuestions = new List<InterviewQuestionDto>();
            var _connectionString= _configuration["MySettings:CockroachDb"];
            using (var conn = new NpgsqlConnection(_connectionString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("SELECT * FROM interview_questions", conn))
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var question = new InterviewQuestionDto
                        {
                            Id = reader.GetGuid(reader.GetOrdinal("id")),
                            Question = reader.GetString(reader.GetOrdinal("question")),
                            Answer = reader.GetString(reader.GetOrdinal("answer")),
                            TechnologyId = reader.GetGuid(reader.GetOrdinal("technology")),
                            DifficultyLevel = reader.GetString(reader.GetOrdinal("difficulty_level")),
                            CreatedAt = reader.GetDateTime(reader.GetOrdinal("created_at")),
                            technology_type = reader.GetString(reader.GetOrdinal("technology_type")).ToString()
                        };
                        interviewQuestions.Add(question);
                    }
                }
            }

            return interviewQuestions;
        }

        // Method to fetch a single interview question by ID
        public InterviewQuestionDto GetInterviewQuestionById(Guid id)
        {
            var _connectionString = _configuration["MySettings:CockroachDb"];
            using (var conn = new NpgsqlConnection(_connectionString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("SELECT * FROM interview_questions WHERE id = @id", conn))
                {
                    cmd.Parameters.AddWithValue("@id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new InterviewQuestionDto
                            {
                                Id = reader.GetGuid(reader.GetOrdinal("id")),
                                Question = reader.GetString(reader.GetOrdinal("question")),
                                Answer = reader.GetString(reader.GetOrdinal("answer")),
                                TechnologyId = reader.GetGuid(reader.GetOrdinal("technology")),
                                DifficultyLevel = reader.GetString(reader.GetOrdinal("difficulty_level")),
                                CreatedAt = reader.GetDateTime(reader.GetOrdinal("created_at"))
                            };
                        }
                    }
                }
            }

            return null; // Return null if no question is found
        }
    }
}
