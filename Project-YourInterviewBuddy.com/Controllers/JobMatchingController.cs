using Microsoft.AspNetCore.Mvc;
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

    [HttpPost("match-jobs")]
    public async Task<IActionResult> MatchJobs([FromBody] JobMatchRequest request)
    {
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
            PropertyNameCaseInsensitive = true
        };
        
        JobMatchResponse match_response = JsonSerializer.Deserialize<JobMatchResponse>(responseText, options); 

        foreach (var job in match_response.MatchedJobs)
        {
            Console.WriteLine($"Skill Match: {job.SkillMatch}, Job Desc Match: {job.JobDescMatch}");
        };

        return Ok(match_response);
    }
}
