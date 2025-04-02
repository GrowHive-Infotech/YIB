using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Project_YourInterviewBuddy.com.Models
{
    public class JobMatchRequest
    {
        [JsonPropertyName("resume")]
        public string Resume { get; set; }

        [JsonPropertyName("skills")]
        public string Skills { get; set; }  // Candidate's skills

        [JsonPropertyName("jobs")]
        public List<JobDescription> Jobs { get; set; }  // List of job descriptions
    }

    public class JobDescription
    {
        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("skills")]
        public string Skills { get; set; }  // Required skills for the job
        [JsonPropertyName("job_title")]
        public string JobTitle { get; set; }

        [JsonPropertyName("company_name")]
        public string CompanyName { get; set; }

        public string job_url { get; set; }
    }


    public class RankedJob
    {
        [JsonPropertyName("job_description")]
        public string JobDescription { get; set; }

        [JsonPropertyName("match_percent")]
        public double MatchPercent { get; set; }
    }
    public class JobMatch
    {
        public float Skill_Match { get; set; }
        public float Job_Desc_Match { get; set; }
    }

    public class MatchResponse
    {
        public List<JobMatch> Matched_Jobs { get; set; }
    }

public class MatchedJob
    {

        [JsonPropertyName("job_title")]
        public string JobTitle { get; set; } // Job title from API response

        [JsonPropertyName("company_name")]
        public string Company { get; set; } // Company name from API response
        [JsonPropertyName("skill_match")]
        public float SkillMatch { get; set; }

        [JsonPropertyName("job_desc_match")]
        public float JobDescMatch { get; set; }

        [JsonPropertyName("job_url")]

        public string JobUrl { get; set; }
    }

    public class JobMatchResponse
    {
        [JsonPropertyName("matched_jobs")]
        public List<MatchedJob> MatchedJobs { get; set; }
    }


}

