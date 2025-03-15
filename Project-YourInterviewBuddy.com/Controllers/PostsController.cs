using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_YourInterviewBuddy.com.Models;
using Project_YourInterviewBuddy.com.Providers;

namespace Project_YourInterviewBuddy.com.Controllers
{
    [Route("api/posts")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IPostProvider _postprovider;
        private readonly IInterviewQProvider _interviewQProvider;
        public PostsController(IPostProvider postProvider, IInterviewQProvider interviewQProvider)
        {
            _postprovider = postProvider;
            _interviewQProvider = interviewQProvider;
        }
        [HttpGet]
        [Route("GetAllPosts")]
        public IActionResult GetAllPost() {

            var res = _postprovider.getPost();
            return Ok(res);
        }

        [HttpPost]
        [Route("CreatePost")]
        public IActionResult CreatePost([FromBody] Post inputPosts)
        {
            var res= _postprovider.createpost(inputPosts);
            return Ok(res);
        }


        [HttpPut]
        [Route("UpdatePost")]
        public IActionResult EditPost()
        {
            return Ok();
        }

        [HttpGet]
        [Route("GetAllIQ")]
        public IActionResult GetAllInterviewQuestions()
        {

            var res = _interviewQProvider.GetInterviewQuestions();
            return Ok(res);
        }
    }
}
