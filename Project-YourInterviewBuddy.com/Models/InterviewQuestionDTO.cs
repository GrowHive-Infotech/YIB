namespace Project_YourInterviewBuddy.com.Models
{
    using System;

    public class InterviewQuestionDto
    {
        public Guid Id { get; set; } // UUID for the question
        public string Question { get; set; } // The interview question
        public string Answer { get; set; } // The answer to the question
        public Guid TechnologyId { get; set; } // Foreign key to the technologies table
        public string DifficultyLevel { get; set; } // Difficulty level (Easy, Medium, Hard)
        public DateTime CreatedAt { get; set; } // Timestamp when the question was created
    }
}
