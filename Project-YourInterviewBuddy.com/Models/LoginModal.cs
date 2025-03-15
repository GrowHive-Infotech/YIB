using System.ComponentModel.DataAnnotations;

namespace Project_YourInterviewBuddy.com.Models
{
    public class LoginModal
    {
        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
