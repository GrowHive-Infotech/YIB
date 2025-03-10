using Project_YourInterviewBuddy.com.Models;
using Project_YourInterviewBuddy.com.Repositories;

namespace Project_YourInterviewBuddy.com.Providers
{
    public class UserProvider : IUserProvider
    {
        private readonly IUserRepo _userRepo;
        public UserProvider(IUserRepo userrepo)
        {
            _userRepo = userrepo;
        }
        public async Task<bool> createuser(Users user)
        {
            return await _userRepo.createUser(user);
        }

        public UserOutput? login(LoginModal input)
        {
            return _userRepo.Login(input);
        }
    }
}
