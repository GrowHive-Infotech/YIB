using Microsoft.AspNetCore.Mvc;
using Project_YourInterviewBuddy.com.Models;

namespace Project_YourInterviewBuddy.com.Providers
{
    public interface IUserProvider
    {
        Task<bool> createuser(Users user);

        UserOutput? login(LoginModal input);
    }
}
