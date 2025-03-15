using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_YourInterviewBuddy.com.Models;
using Project_YourInterviewBuddy.com.Providers;

namespace Project_YourInterviewBuddy.com.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly IUserProvider _userprovider;
        public UsersController(IUserProvider userProvider)
        {
            _userprovider = userProvider;
        }
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] InputUser userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new Users()
            {
                Email = userDto.Email,
                Password = userDto.Password,
                Role = "User",
                is_active = true,
                Name=userDto.UserName,
            };
            var resp= await _userprovider.createuser(user);
            return Ok(resp);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginModal userDto)
        {
            if (!ModelState.IsValid)
            { 
                return BadRequest(ModelState);
            }

            var resp = _userprovider.login(userDto);
            if(resp!=null)
            {
                return Ok(resp);
            }
            return BadRequest(ModelState);
        }
    }
}
