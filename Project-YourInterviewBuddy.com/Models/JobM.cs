using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Project_YourInterviewBuddy.com.Models
{
    public class JobMatchRequest
    {
        [JsonPropertyName("resume")]
        public string Resume { get; set; }

        [JsonPropertyName("job_descriptions")]
        public List<string> JobDescriptions { get; set; }
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
        [JsonPropertyName("skill_match")]
        public float SkillMatch { get; set; }

        [JsonPropertyName("job_desc_match")]
        public float JobDescMatch { get; set; }
    }

    public class JobMatchResponse
    {
        [JsonPropertyName("matched_jobs")]
        public List<MatchedJob> MatchedJobs { get; set; }
    }


}

