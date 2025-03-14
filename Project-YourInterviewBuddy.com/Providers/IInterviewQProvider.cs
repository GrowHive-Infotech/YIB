using Project_YourInterviewBuddy.com.Models;

namespace Project_YourInterviewBuddy.com.Providers
{
    public interface IInterviewQProvider
    {
        List<InterviewQuestionDto> GetInterviewQuestions();

        InterviewQuestionDto GetInterviewQuestionById(Guid id);
    }
}
