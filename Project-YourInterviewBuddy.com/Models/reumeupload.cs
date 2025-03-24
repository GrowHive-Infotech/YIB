using System.ComponentModel.DataAnnotations;

namespace Project_YourInterviewBuddy.com.Models
{
    public class ResumeUploadRequest
    {
        [Required]
        public IFormFile Resume { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string YOE { get; set; }
    }

}
