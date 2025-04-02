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
    private readonly IConfiguration _configuration;

    public JobController(IConfiguration config)
    {
        _configuration = config;
    }


    [HttpPost]
    public async Task<IActionResult> PostJob([FromBody] Job job)
    {
        var connectionString = _configuration["MySettings:CockroachDb"];
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            using (var conn = new NpgsqlConnection(connectionString))
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

    [HttpGet]

    public async Task<IActionResult> GetJobs()
    {
        var res=GetAllJobspvt();
        return Ok(res);
    }

    [HttpGet]
    [Route("Technologies")]
    public async Task<IActionResult> GetTechnologies()
    {
        var res = GetAllTechnologies();
        return Ok(res);
    }


    private List<Job> GetAllJobspvt()
    {
        var jobs = new List<Job>();
        var _connectionString = _configuration["MySettings:CockroachDb"];
        using (var conn = new NpgsqlConnection(_connectionString))
        {
            conn.Open();
            using (var cmd = new NpgsqlCommand("SELECT * FROM jobs", conn))
            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    var job = new Job
                    {
                        JobTitle = reader.GetString(reader.GetOrdinal("job_title")),
                        CompanyName = reader.GetString(reader.GetOrdinal("company_name")),
                        Location = reader.IsDBNull(reader.GetOrdinal("location")) ? null : reader.GetString(reader.GetOrdinal("location")),
                        EmploymentType = reader.GetString(reader.GetOrdinal("employment_type")),
                        SalaryRange = reader.IsDBNull(reader.GetOrdinal("salary_range")) ? null : reader.GetString(reader.GetOrdinal("salary_range")),
                        ExperienceRequired = reader.IsDBNull(reader.GetOrdinal("experience_required")) ? 0 : reader.GetInt32(reader.GetOrdinal("experience_required")),
                        SkillsRequired = reader.IsDBNull(reader.GetOrdinal("skills_required")) ? Array.Empty<string>() : (string[])reader["skills_required"],
                        JobDescription = reader.GetString(reader.GetOrdinal("job_description")),
                        ApplicationDeadline = reader.IsDBNull(reader.GetOrdinal("application_deadline")) ? (DateTime?)null : reader.GetDateTime(reader.GetOrdinal("application_deadline")),
                        JobUrl = reader.GetString(reader.GetOrdinal("job_url"))
                    };
                    jobs.Add(job);
                }
            }
        }

        return jobs;
    }

    private List<Technology> GetAllTechnologies()
    {
        var technologies = new List<Technology>();
        var _connectionString = _configuration["MySettings:CockroachDb"];

        using (var conn = new NpgsqlConnection(_connectionString))
        {
            conn.Open();
            using (var cmd = new NpgsqlCommand("SELECT * FROM technologies", conn))
            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    var technology = new Technology
                    {
                        Id = reader.GetGuid(reader.GetOrdinal("id")),
                        Name = reader.GetString(reader.GetOrdinal("name")),
                        Count = reader.IsDBNull(reader.GetOrdinal("count")) ? 0 : reader.GetInt64(reader.GetOrdinal("count")),
                    };
                    technologies.Add(technology);
                }
            }
        }

        return technologies;
    }
}
