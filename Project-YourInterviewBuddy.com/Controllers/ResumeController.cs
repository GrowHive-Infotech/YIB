using Microsoft.AspNetCore.Mvc;
using Supabase;
using Supabase.Storage;
using System;
using System.IO;
using System.Threading.Tasks;
using Npgsql;
using FileOptions = Supabase.Storage.FileOptions;
using Project_YourInterviewBuddy.com.Models;
using Supabase.Gotrue;


[Route("api/resume")]
[ApiController]
public class ResumeController : ControllerBase
{
    private readonly string supabaseUrl = "https://dktsijqnewqxkqnvholn.supabase.co";
    private readonly string supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrdHNpanFuZXdxeGtxbnZob2xuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTUyMjA5MSwiZXhwIjoyMDU1MDk4MDkxfQ.I06b4LVv7dqHS1KBNqbfq9zts-z37akETnHUGEiDvMw";
    private readonly string connectionString = "Host=db.dktsijqnewqxkqnvholn.supabase.co;Database=postgres;Username=postgres;Password=ZD-7k3@NamP44Ej;SSL Mode=Require;Trust Server Certificate=true";

    [HttpPost("upload")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadResume([FromForm] ResumeUploadRequest request)
    {
        if (request.Resume == null || request.Resume.Length == 0)
            return BadRequest("No file uploaded.");

        try
        {
            // Initialize Supabase Client
            var supabase = new Supabase.Client(supabaseUrl, supabaseKey);
            await supabase.InitializeAsync();

            // Convert file to byte array
            using var memoryStream = new MemoryStream();
            await request.Resume.CopyToAsync(memoryStream);
            byte[] fileBytes = memoryStream.ToArray();
            ResumeParser resumeparsing = new ResumeParser();
           
            // Define bucket and file path
            var storage = supabase.Storage;
            string bucketName = "resumes"; // Ensure this bucket exists in Supabase
            string filePath = $"{request.Email}/{Guid.NewGuid()}.pdf"; // File path in Supabase storage
            using (Stream stream = request.Resume.OpenReadStream()) // ✅ Correct way to get stream from IFormFile
            {
                resumeparsing.ParseResume(stream,request.YOE);
            }
           
            // ✅ Using Upload() method that accepts byte[] data
            await storage.From(bucketName).Upload(fileBytes, filePath, new FileOptions { ContentType = "application/pdf" });

            // Generate public URL
            string fileUrl = storage.From(bucketName).GetPublicUrl(filePath);
            var parameters = new { p_email = request.Email, p_resume_url = fileUrl };
            await supabase.Rpc("insert_resume", parameters);

            return Ok(new { message = "Resume uploaded successfully", url = fileUrl });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error uploading file", error = ex.Message });
        }
    }
}
