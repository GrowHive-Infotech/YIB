using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Text.Json.Serialization;

[Route("api/[controller]")]
[ApiController]
public class ResumeMController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public ResumeMController(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    [HttpPost("shortlist")]
    public async Task<IActionResult> ShortlistResumes([FromBody] ResumeRequest request)
    {
        try
        {
            // Serialize request object to JSON
            var jsonString = JsonSerializer.Serialize(request, new JsonSerializerOptions { DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull });
            Console.WriteLine($"Serialized JSON: {jsonString}"); // Debugging line

            var jsonContent = new StringContent(jsonString, Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync("http://localhost:8000/rank-resumes/", jsonContent);

            // Print the error message if request fails
            var responseText = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"Response: {response.StatusCode} - {responseText}");

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, $"Failed to fetch ranking: {responseText}");
            }
            var jsonResponse = JsonSerializer.Deserialize<Dictionary<string, List<RankedResume>>>(
     responseText,
     new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
 );

            if (jsonResponse != null && jsonResponse.ContainsKey("ranked_resumes"))
            {
                var rankedResumes = jsonResponse["ranked_resumes"];
                return Ok(rankedResumes);
            }
            else
            {
                return BadRequest("Invalid API response format.");
            }

        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        }
    }
}
