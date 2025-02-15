using System;
using System.Data;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using Project_YourInterviewBuddy.com.Models;

[Route("api/jobs")]
[ApiController]
public class JobController : ControllerBase
{

    [HttpPost]
    public async Task<IActionResult> PostJob([FromBody] Job job)
    {
        var _connectionString = "Host=wise-mumbai-7178.j77.aws-ap-south-1.cockroachlabs.cloud;Port=26257;Database=yib;Username=master-db;Password=C78QCSTTn9ZwDjJdQYD2Jg;SSL Mode=VerifyFull";
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            using (var conn = new NpgsqlConnection(_connectionString))
            {
                await conn.OpenAsync();
                string query = @"
                    INSERT INTO jobs 
                    (job_title, company_name, location, employment_type, salary_range, experience_required, skills_required, job_description, application_deadline, job_url) 
                    VALUES 
                    (@JobTitle, @CompanyName, @Location, @EmploymentType, @SalaryRange, @ExperienceRequired, @SkillsRequired, @JobDescription, @ApplicationDeadline, @JobUrl)";

                using (var cmd = new NpgsqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@JobTitle", job.JobTitle);
                    cmd.Parameters.AddWithValue("@CompanyName", job.CompanyName);
                    cmd.Parameters.AddWithValue("@Location", (object?)job.Location ?? DBNull.Value);
                    cmd.Parameters.AddWithValue("@EmploymentType", job.EmploymentType);
                    cmd.Parameters.AddWithValue("@SalaryRange", (object?)job.SalaryRange ?? DBNull.Value);
                    cmd.Parameters.AddWithValue("@ExperienceRequired", job.ExperienceRequired);
                    cmd.Parameters.AddWithValue("@SkillsRequired", job.SkillsRequired ?? new string[] { }); // Store as an array
                    cmd.Parameters.AddWithValue("@JobDescription", job.JobDescription);
                    cmd.Parameters.AddWithValue("@ApplicationDeadline", (object?)job.ApplicationDeadline ?? DBNull.Value);
                    cmd.Parameters.AddWithValue("@JobUrl", job.JobUrl);

                    await cmd.ExecuteNonQueryAsync();
                }
            }

            return Ok(new { message = "Job posted successfully!" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Database error", details = ex.Message });
        }
    }
}
