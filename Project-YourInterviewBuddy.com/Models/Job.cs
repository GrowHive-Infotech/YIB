using System;
using System.ComponentModel.DataAnnotations;
namespace Project_YourInterviewBuddy.com.Models
{
   

    public class Job
    {
        [Required]
        public string JobTitle { get; set; }

        [Required]
        public string CompanyName { get; set; }

        public string Location { get; set; }

        [Required]
        [RegularExpression("Full-time|Part-time|Contract|Internship|Freelance|Temporary", ErrorMessage = "Invalid Employment Type")]
        public string EmploymentType { get; set; }

        public string SalaryRange { get; set; } // Example: "10-15 LPA"

        [Range(0, 50, ErrorMessage = "Experience should be between 0-50 years")]
        public int ExperienceRequired { get; set; }

        public string[] SkillsRequired { get; set; }

        [Required]
        public string JobDescription { get; set; }

        public DateTime? ApplicationDeadline { get; set; }

        [Required]
        [Url]
        public string JobUrl { get; set; }
    }

}
