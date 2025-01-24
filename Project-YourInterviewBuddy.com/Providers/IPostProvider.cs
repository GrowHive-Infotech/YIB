using Microsoft.AspNetCore.Mvc;
using Project_YourInterviewBuddy.com.Models;

namespace Project_YourInterviewBuddy.com.Providers
{
    public interface IPostProvider
    {
        IActionResult createpost(Post Inputpost);

        List<Post> getPost();
    }
}
