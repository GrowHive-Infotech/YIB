using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Ocsp;
using Project_YourInterviewBuddy.com.Models;
using Supabase.Gotrue;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;


[Route("api/resume")]
[ApiController]
public class JobsController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public JobsController(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    [HttpGet("match-jobs")]
    public async Task<IActionResult> MatchJobs(string email)
    {
        ResumeParser rp = new ResumeParser();
        var resumeData = rp.GetAllInformation(email);

        string resumeText = resumeData.Resume;
        string[] resumeSkills = resumeData.Skills.ToLower().Split(',').Select(s => s.Trim()).ToArray();
        List<JobDescription> jobs = resumeData.Jobs;

        // Step 2: Embed text into fake 384-dim vector for simulation
        List<MatchedJob> results = new();

        foreach (var job in jobs)
        {
            string[] jobSkills = job.Skills.ToLower().Split(',').Select(s => s.Trim()).ToArray();
            var intersectSkills = resumeSkills.Intersect(jobSkills);

            double skillMatchPercent = (double)intersectSkills.Count() / jobSkills.Length * 100.0;

            // Fake embeddings with deterministic randomness
            var resumeVec = GetFakeEmbedding(resumeText);
            var jobVec = GetFakeEmbedding(job.Description);
            double descSimilarity = CalculateCosineSimilarity(resumeVec, jobVec);

            results.Add(new MatchedJob
            {
                JobTitle = job.JobTitle,
                Company = job.CompanyName,
                JobUrl = job.job_url,
                SkillMatch = (float)Math.Round(skillMatchPercent, 2),
                JobDescMatch = (float)Math.Round(descSimilarity * 100, 2)
            });
        }

        var sortedResults = results.OrderByDescending(r => r.SkillMatch).ToList();

        foreach (var job in sortedResults)
        {
            Console.WriteLine($"Skill Match: {job.SkillMatch}, Job Desc Match: {job.JobDescMatch}");
        }

        return Ok(new JobMatchResponse { MatchedJobs = sortedResults });
    }

    [HttpGet("match-nonresumejobs")]
    public IActionResult MatchJobs(
     [FromQuery] string techStack,
     [FromQuery] string experience,
     [FromQuery] string location)
    {
        if (string.IsNullOrEmpty(techStack))
        {
            return BadRequest("TechStack is required.");
        }

        try
        {
            ResumeParser rp = new ResumeParser();
            var request = rp.GetAllInformation("demo@yib.com");
            request.Skills = techStack;
            request.Resume = null;  // Resume optional

            var results = new List<MatchedJob>();
            float[] resumeEmbedding = null;

            if (!string.IsNullOrWhiteSpace(request.Resume))
            {
                resumeEmbedding = GetEmbedding(request.Resume);
            }

            foreach (var job in request.Jobs)
            {
                if (string.IsNullOrWhiteSpace(job.Skills)) continue;

                double skillMatch = CalculateSkillMatch(request.Skills, job.Skills);
                double jobDescMatch = 0.0;

                if (resumeEmbedding != null && !string.IsNullOrWhiteSpace(job.Description))
                {
                    var jobEmbedding = GetEmbedding(job.Description);
                    jobDescMatch = Math.Round(CalculateCosineSimilarity(resumeEmbedding, jobEmbedding) * 100, 2);
                }

                results.Add(new MatchedJob
                {
                    JobTitle = job.JobTitle,
                    Company = job.CompanyName,
                    JobUrl = job.job_url,
                    SkillMatch = (float)skillMatch,
                    JobDescMatch = (float)jobDescMatch
                });
            }

            var sorted = results
                .OrderByDescending(x => x.SkillMatch)
                .ThenByDescending(x => x.JobDescMatch)
                .ToList();

            return Ok(new JobMatchResponse { MatchedJobs = sorted });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal error: {ex.Message}");
        }
    }

    private double[] GetFakeEmbedding(string text)
    {
        var hash = text.GetHashCode();
        var random = new Random(hash);
        return Enumerable.Range(0, 384).Select(_ => random.NextDouble()).ToArray();
    }

    private double CalculateCosineSimilarity(double[] vec1, double[] vec2)
    {
        double dot = 0.0;
        double norm1 = 0.0;
        double norm2 = 0.0;

        for (int i = 0; i < vec1.Length; i++)
        {
            dot += vec1[i] * vec2[i];
            norm1 += vec1[i] * vec1[i];
            norm2 += vec2[i] * vec2[i];
        }

        return dot / (Math.Sqrt(norm1) * Math.Sqrt(norm2));
    }

    private List<string> NormalizeSkills(string skills)
    {
        return skills.Split(' ', StringSplitOptions.RemoveEmptyEntries)
                     .Select(s => s.Trim().ToLower())
                     .ToList();
    }

    private double CalculateSkillMatch(string candidateSkills, string jobSkills)
    {
        var candidateList = NormalizeSkills(candidateSkills);
        var jobList = NormalizeSkills(jobSkills);

        if (jobList.Count == 0) return 0.0;

        var overlap = candidateList.Intersect(jobList).Count();
        return Math.Round((double)overlap / jobList.Count * 100, 2);
    }
    private float[] GetEmbedding(string text)
    {
        // For now, generate fake embedding vector based on text hash
        Random rng = new Random(text.GetHashCode());
        return Enumerable.Range(0, 384).Select(_ => (float)rng.NextDouble()).ToArray();
    }

    private double CalculateCosineSimilarity(float[] v1, float[] v2)
    {
        if (v1.Length != v2.Length) return 0.0;

        double dot = 0, mag1 = 0, mag2 = 0;

        for (int i = 0; i < v1.Length; i++)
        {
            dot += v1[i] * v2[i];
            mag1 += v1[i] * v1[i];
            mag2 += v2[i] * v2[i];
        }

        if (mag1 == 0 || mag2 == 0) return 0.0;

        return dot / (Math.Sqrt(mag1) * Math.Sqrt(mag2));
    }

}

