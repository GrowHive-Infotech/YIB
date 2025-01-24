using Microsoft.AspNetCore.Mvc;
using Project_YourInterviewBuddy.com.Models;
using Project_YourInterviewBuddy.com.Repositories;

namespace Project_YourInterviewBuddy.com.Providers
{
    public class PostProvider : IPostProvider
    {
        private readonly IPostRepository _repository;
        public PostProvider(IPostRepository repo) {
            _repository = repo;
        }
        public IActionResult createpost(Post Inputpost)
        {
           return _repository.CreatePost(Inputpost);
        }

        public List<Post> getPost()
        {
            return _repository.GetPost();
        }
    }
}
