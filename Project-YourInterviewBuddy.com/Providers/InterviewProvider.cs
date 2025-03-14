using Project_YourInterviewBuddy.com.Models;
using Project_YourInterviewBuddy.com.Repositories;

namespace Project_YourInterviewBuddy.com.Providers
{
    public class InterviewProvider : IInterviewQProvider
    {
        public readonly IInterviewQuestionRepository _QuestionRepository;
        public InterviewProvider(IInterviewQuestionRepository QuestionRepository) {
            _QuestionRepository= QuestionRepository;
        }
       public InterviewQuestionDto GetInterviewQuestionById(Guid id)
        {
            return _QuestionRepository.GetInterviewQuestionById(id);
        }

       public List<InterviewQuestionDto> GetInterviewQuestions()
        {
           return _QuestionRepository.GetInterviewQuestions();
        }
    }
}
