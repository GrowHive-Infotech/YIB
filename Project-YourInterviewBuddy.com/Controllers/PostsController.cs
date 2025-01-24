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
        public PostsController(IPostProvider postProvider) {
            _postprovider = postProvider;
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

    }
}
