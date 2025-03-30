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
      
            var request = rp.GetAllInformation(email);
            var jsonContent = new StringContent(
                JsonSerializer.Serialize(request),
                Encoding.UTF8,
                "application/json"
            );
       

        var response = await _httpClient.PostAsync("http://localhost:8000/match-resume/", jsonContent);

        if (!response.IsSuccessStatusCode)
        {
            return StatusCode((int)response.StatusCode, "Failed to fetch job matches from AI service.");
        }

        var responseText = await response.Content.ReadAsStringAsync();
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = false
        };
        
        JobMatchResponse match_response = JsonSerializer.Deserialize<JobMatchResponse>(responseText, options); 

        foreach (var job in match_response.MatchedJobs)
        {
            Console.WriteLine($"Skill Match: {job.SkillMatch}, Job Desc Match: {job.JobDescMatch}");
        };

        return Ok(match_response);
    }

    [HttpGet("match-nonresumejobs")]
    public async Task<IActionResult> MatchJobs(
        [FromQuery] string techStack ,
        [FromQuery] string experience ,
        [FromQuery] string location )
    {
        // 1. Validate required parameters
        if (string.IsNullOrEmpty(techStack))
        {
            return BadRequest("Email is required.");
        }

        // 2. Process the request (replace with your actual logic)
        try
        {
            // Example: Query a database or external service
            ResumeParser rp = new ResumeParser();

            var request = rp.GetAllInformation("demo@yib.com");
            request.Skills = techStack;
            request.Resume = null;
            var jsonContent = new StringContent(
                JsonSerializer.Serialize(request),
                Encoding.UTF8,
                "application/json"
            );

             var response = await _httpClient.PostAsync("http://localhost:8001/match-resume/", jsonContent);

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Failed to fetch job matches from AI service.");
            }

            var responseText = await response.Content.ReadAsStringAsync();
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = false
            };

            JobMatchResponse match_response = JsonSerializer.Deserialize<JobMatchResponse>(responseText, options);

            foreach (var job in match_response.MatchedJobs)
            {
                Console.WriteLine($"Skill Match: {job.SkillMatch}, Job Desc Match: {job.JobDescMatch}");
            };

            return Ok(match_response);

            // 3. Return the results

        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }


   
}
