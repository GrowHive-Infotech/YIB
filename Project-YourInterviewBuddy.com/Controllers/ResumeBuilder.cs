using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.IO;
using System.Threading.Tasks;

namespace ResumeBuilderAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResumeController : ControllerBase
    {
        private readonly string _storagePath = "Resumes";

        public ResumeController()
        {
            if (!Directory.Exists(_storagePath))
            {
                Directory.CreateDirectory(_storagePath);
            }
        }

        [HttpPost]
        public async Task<IActionResult> SaveResume([FromBody] ResumeData data)
        {
            try
            {
                var fileName = $"resume_{Guid.NewGuid()}.json";
                var filePath = Path.Combine(_storagePath, fileName);

                await System.IO.File.WriteAllTextAsync(filePath, JsonSerializer.Serialize(data));

                return Ok(new { message = "Resume saved successfully", id = fileName });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error saving resume", error = ex.Message });
            }
        }

        [HttpGet("latest")]
        public IActionResult GetLatestResume()
        {
            try
            {
                var files = Directory.GetFiles(_storagePath, "*.json")
                    .OrderByDescending(f => new FileInfo(f).CreationTime)
                    .FirstOrDefault();

                if (files == null)
                {
                    return NotFound(new { message = "No resume found" });
                }

                var jsonData = System.IO.File.ReadAllText(files);
                var resumeData = JsonSerializer.Deserialize<ResumeData>(jsonData);

                return Ok(resumeData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving resume", error = ex.Message });
            }
        }

        [HttpPost("generate")]
        public async Task<IActionResult> GenerateResume([FromBody] GenerateRequest request)
        {
            try
            {
                // In a real implementation, you would use a PDF generation library
                // like iTextSharp, QuestPDF, or a templating engine
                // This is a simplified version that returns a dummy PDF

                var template = GetTemplateById(request.TemplateId);
                if (template == null)
                {
                    return BadRequest(new { message = "Invalid template ID" });
                }

                // Generate PDF (simplified)
                var pdfBytes = GeneratePdfBytes(request.Data, template);

                return File(pdfBytes, "application/pdf", "resume.pdf");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error generating resume", error = ex.Message });
            }
        }

        private Template GetTemplateById(int id)
        {
            // In a real app, this would come from a database
            return new Template { Id = id, Name = $"Template {id}" };
        }

        private byte[] GeneratePdfBytes(ResumeData data, Template template)
        {
            // This is a placeholder - implement actual PDF generation
            using var memoryStream = new MemoryStream();
            using var writer = new StreamWriter(memoryStream);
            writer.WriteLine($"RESUME - {template.Name}");
            writer.WriteLine($"Name: {data.PersonalInfo.FirstName} {data.PersonalInfo.LastName}");
            // Add all other resume data
            writer.Flush();
            return memoryStream.ToArray();
        }
    }

    public class ResumeData
    {
        public PersonalInfo PersonalInfo { get; set; }
        public List<Education> Education { get; set; }
        public List<WorkExperience> WorkExperience { get; set; }
        public List<Skill> Skills { get; set; }
        public List<Project> Projects { get; set; }
        public List<Activity> Activities { get; set; }
    }

    public class GenerateRequest
    {
        public int TemplateId { get; set; }
        public ResumeData Data { get; set; }
    }

    // Define all your DTO classes (PersonalInfo, Education, WorkExperience, etc.)
}