using Microsoft.AspNetCore.Mvc;
using Project_YourInterviewBuddy.com.Models;

namespace Project_YourInterviewBuddy.com.Repositories
{
   public  interface IPostRepository
    {
        IActionResult CreatePost(Post inputPosts);

        List<Post> GetPost();
    }
}
