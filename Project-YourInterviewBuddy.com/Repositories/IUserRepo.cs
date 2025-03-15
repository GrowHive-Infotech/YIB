using Microsoft.AspNetCore.Mvc;
using Project_YourInterviewBuddy.com.Models;

namespace Project_YourInterviewBuddy.com.Repositories
{
    public interface IUserRepo
    {
        Task<bool> createUser(Users user);
        UserOutput? Login(LoginModal user);
    }
}
