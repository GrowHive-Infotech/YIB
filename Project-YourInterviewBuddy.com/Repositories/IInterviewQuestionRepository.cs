using Project_YourInterviewBuddy.com.Models;

namespace Project_YourInterviewBuddy.com.Repositories
{
    public interface IInterviewQuestionRepository
    {
        List<InterviewQuestionDto> GetInterviewQuestions();

        InterviewQuestionDto GetInterviewQuestionById(Guid id);

    }
}
