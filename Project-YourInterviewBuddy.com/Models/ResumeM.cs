using System.Collections.Generic;
using System.Text.Json.Serialization;

public class ResumeRequest
{
    [JsonPropertyName("resumes")]
    public List<string> Resumes { get; set; }

    [JsonPropertyName("job_description")]
    public string JobDescription { get; set; }
}

public class RankedResume
{
    [JsonPropertyName("resume")]
    public string Resume { get; set; }

    [JsonPropertyName("skill_match")]
    public double SkillMatch { get; set; }

    [JsonPropertyName("job_desc_match")]
    public double JobDescMatch { get; set; }
}

