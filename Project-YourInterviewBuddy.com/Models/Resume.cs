using Supabase;
using Supabase.Storage;
namespace Project_YourInterviewBuddy.com.Models
{
    public class Resume
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string ResumeUrl { get; set; }
        public DateTime UploadedAt { get; set; }
    }
}
