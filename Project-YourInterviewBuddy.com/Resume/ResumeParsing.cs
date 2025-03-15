using System;
using System.IO;
using System.Text.RegularExpressions;
using iTextSharp.text.pdf;
using iTextSharp.text.pdf.parser;
using System.Collections.Generic;
using Newtonsoft.Json;
using Npgsql;
using Project_YourInterviewBuddy.com.Models;

class ResumeParser
{
    public static string ExtractTextFromPdf(Stream pdfStream)
    {
        using (PdfReader reader = new PdfReader(pdfStream))
        {
            ITextExtractionStrategy strategy = new SimpleTextExtractionStrategy();
            string text = "";

            for (int i = 1; i <= reader.NumberOfPages; i++)
            {
                text += PdfTextExtractor.GetTextFromPage(reader, i, strategy) + "\n";
            }
            return text;
        }
    }

    public static string ExtractEmail(string text)
    {
        Match match = Regex.Match(text, @"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}");
        return match.Success ? match.Value : "Not Found";
    }

    public static string ExtractPhoneNumber(string text)
    {
        Match match = Regex.Match(text, @"\b\d{10}\b"); // Matches 10-digit phone numbers
        return match.Success ? match.Value : "Not Found";
    }

    public static int ExtractExperience(string text)
    {
        MatchCollection matches = Regex.Matches(text, @"(\d+)\s*(?:years|yrs|year|yr)\s*(?:of)?\s*(?:experience|exp)", RegexOptions.IgnoreCase);
        List<int> experienceYears = new List<int>();

        foreach (Match match in matches)
        {
            if (int.TryParse(match.Groups[1].Value, out int years))
                experienceYears.Add(years);
        }

        return experienceYears.Count > 0 ? experienceYears.Max() : 0;
    }

    public static Dictionary<string, string> ExtractRolesAndResponsibilities(string text)
    {
        Dictionary<string, string> rolesMap = new Dictionary<string, string>();
        string[] lines = text.Split('\n');

        string currentRole = "";
        string responsibilities = "";

        bool insideWorkExperience = false;
        bool capturingResponsibilities = false;
        bool skipFirstLine = false; // Flag to skip first responsibility line

        string[] techKeywords = { "Tech Stack"};

        foreach (string line in lines)
        {
            string trimmedLine = line.Trim();

            // Detect Work Experience section
            if (Regex.IsMatch(trimmedLine, @"(Work Experience|Professional Experience|Work History)", RegexOptions.IgnoreCase))
            {
                insideWorkExperience = true;
                continue;
            }

            // Identify job titles (starting point for responsibilities)
            if (insideWorkExperience && Regex.IsMatch(trimmedLine, @"(Engineer|Developer|Lead|Manager|Analyst)", RegexOptions.IgnoreCase))
            {
                // Store previous role & responsibilities before moving to the next
                if (!string.IsNullOrEmpty(currentRole))
                {
                    rolesMap[currentRole] = responsibilities.Trim();
                    responsibilities = "";
                }

                // Set new current role and start capturing text below it
                currentRole = trimmedLine;
                capturingResponsibilities = true;
                skipFirstLine = true; // Set flag to skip the next line
            }
            // Capture responsibilities (excluding first line and lines with tech stack)
            else if (capturingResponsibilities)
            {
                // Stop capturing if we encounter another section or a blank line (section separator)
                if (string.IsNullOrWhiteSpace(trimmedLine) || Regex.IsMatch(trimmedLine, @"(Education|Skills|Projects|Certifications)", RegexOptions.IgnoreCase))
                {
                    capturingResponsibilities = false;
                    continue;
                }

                // Skip the first line after the job title
                if (skipFirstLine)
                {
                    skipFirstLine = false;
                    continue;
                }

                // Exclude lines containing tech stack keywords
                if (!Array.Exists(techKeywords, keyword => trimmedLine.Contains(keyword, StringComparison.OrdinalIgnoreCase)))
                {
                    responsibilities += trimmedLine + " ";
                }
            }
        }

        // Store last detected role and responsibilities
        if (!string.IsNullOrEmpty(currentRole) && !string.IsNullOrEmpty(responsibilities))
        {
            rolesMap[currentRole] = responsibilities.Trim();
        }

        return rolesMap;
    }




    public static List<string> ExtractTechStack(string text)
    {
        List<string> techStack = new List<string>();
        string[] lines = text.Split('\n');

        bool insideSkillsSection = false;

        foreach (string line in lines)
        {
            string trimmedLine = line.Trim();

            // Detect the start of the "Skills" section
            if (Regex.IsMatch(trimmedLine, @"\bSkills\b", RegexOptions.IgnoreCase))
            {
                insideSkillsSection = true;
                continue;
            }

            // Stop extracting when another section starts
            if (insideSkillsSection && Regex.IsMatch(trimmedLine, @"(Education|Work Experience|Projects|Certifications|Languages)", RegexOptions.IgnoreCase))
            {
                insideSkillsSection = false;
                continue;
            }

            // Extract skills only if inside the Skills section
            if (insideSkillsSection && !string.IsNullOrWhiteSpace(trimmedLine))
            {
                string[] skills = trimmedLine.Split(new char[] { ',', '-', '|', '/' }, StringSplitOptions.RemoveEmptyEntries);

                foreach (string skill in skills)
                {
                    string formattedSkill = skill.Trim();
                    if (!string.IsNullOrEmpty(formattedSkill) && !techStack.Contains(formattedSkill))
                    {
                        techStack.Add(formattedSkill);
                    }
                }
            }
        }

        return techStack;
    }


    public void  ParseResume(Stream pdfStream)
    {
        // Extract text from the PDF
        string text = ExtractTextFromPdf(pdfStream);

        // Extract fields
        string email = ExtractEmail(text);
        string phone = ExtractPhoneNumber(text);
        int experience = ExtractExperience(text);
        Dictionary<string, string> rolesAndResponsibilities = ExtractRolesAndResponsibilities(text);
        List<string> techStack = ExtractTechStack(text);

        // Insert parsed data into CockroachDB
        InsertParsedResume(email, phone, experience, rolesAndResponsibilities, techStack);
    }


    public static void InsertParsedResume(string email, string phone, int experience, Dictionary<string, string> rolesAndResponsibilities, List<string> techStack)
    {
        var connectionString = "Host=wool-piranha-8162.j77.aws-ap-south-1.cockroachlabs.cloud;Port=26257;Database=yib;Username=master-db;Password=1Y5QZVlJWJa_OQ06WAaZNw;SSL Mode=VerifyFull";
        try
        {
            using (var conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();

                string query = @"
                    INSERT INTO parsed_resumes (email, phone, experience, roles_and_responsibilities, tech_stack)
                    VALUES (@Email, @Phone, @Experience, @RolesAndResponsibilities, @TechStack)";

                using (var cmd = new NpgsqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@Email", email);
                    cmd.Parameters.AddWithValue("@Phone", string.IsNullOrEmpty(phone) ? (object)DBNull.Value : phone);
                    cmd.Parameters.AddWithValue("@Experience", experience);
                    cmd.Parameters.AddWithValue("@RolesAndResponsibilities", JsonConvert.SerializeObject(rolesAndResponsibilities));
                    cmd.Parameters.AddWithValue("@TechStack", techStack.ToArray());

                    cmd.ExecuteNonQuery();
                }
            }

            Console.WriteLine("Resume data inserted successfully!");
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error inserting resume data: " + ex.Message);
        }
    }

    public JobMatchRequest GetAllInformation(string email)
    {
        //aim is to get the skills, description for the person whose resume is this.
        //aim 2 is like get all the jobs in the db in format of 
        var connectionString = "Host=wool-piranha-8162.j77.aws-ap-south-1.cockroachlabs.cloud;Port=26257;Database=yib;Username=master-db;Password=1Y5QZVlJWJa_OQ06WAaZNw;SSL Mode=VerifyFull";
        try
        {
            List<JobDescription> jd = new List<JobDescription>();
            string skillset = string.Empty;
            string personwd= string.Empty;
            using (var conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();

                string query = @"Select roles_and_responsibilities,tech_stack from parsed_resumes where Email=@Email";
                using (var cmd = new NpgsqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@Email", email);
                    using (var reader = cmd.ExecuteReader()) // Execute the query and read results
                    {
                        while (reader.Read())
                        {
                            string rolesAndResponsibilities = reader["roles_and_responsibilities"].ToString();
                            string[] techStackArray = reader.GetFieldValue<string[]>(reader.GetOrdinal("tech_stack"));


                            // Convert list to a space-separated string
                            string spaceSeparatedSkillsforResume = string.Join(" ", techStackArray);
                            personwd = rolesAndResponsibilities;
                            skillset = spaceSeparatedSkillsforResume;


                        }
                    }
                }

                string query2 = @"Select skills_required,job_description,company_name,job_title from public.jobs";
                using (var cmd = new NpgsqlCommand(query2, conn))
                {
                    using (var reader = cmd.ExecuteReader()) // Execute the query and read results
                    {
                        while (reader.Read())
                        {
                          string[] techStackArray = reader.GetFieldValue<string[]>(reader.GetOrdinal("skills_required"));

                            // Convert list to a space-separated string
                            string spaceSeparatedSkills = string.Join(" ", techStackArray);
                            string job_description = reader["job_description"].ToString();
                            string company_name = reader["company_name"].ToString();
                            string job_title = reader["job_title"].ToString();
                            JobDescription job = new JobDescription()
                            {
                                Description = job_description,
                                Skills = spaceSeparatedSkills,
                                CompanyName=company_name,
                                JobTitle=job_title

                            };
                            jd.Add(job);
                            
                        }
                    }
                }
            }
            JobMatchRequest match = new JobMatchRequest()
            {
                Jobs = jd,
                Skills = skillset,
                Resume = personwd
             };

            return match;

        }
            
        catch
        {
            return null;
        }

    }
        }
